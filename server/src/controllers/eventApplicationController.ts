import type { Request, Response } from "express";
import { Event } from "../models/Event.js";
import { EventApplication } from "../models/EventApplication.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyRecaptcha } from "../services/recaptchaService.js";
import { appendRowToSheet } from "../services/googleSheetsService.js";
import { enqueueJob } from "../jobs/asyncJobs.js";
import { sendEmail } from "../services/emailService.js";
import { eventApplicationConfirmation } from "../templates/emailTemplates.js";
import { logger } from "../utils/logger.js";

export const submitEventApplication = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const payload = req.body as any;

  const event = await Event.findOne({ slug, status: { $ne: "archived" } });
  if (!event || event.status !== "published") {
    return res.status(404).json({ message: "Event not available" });
  }

  const isRecaptchaValid = await verifyRecaptcha(payload.recaptchaToken, req.ip);
  if (!isRecaptchaValid) {
    return res.status(400).json({ message: "reCAPTCHA validation failed" });
  }

  const application = await EventApplication.create({
    event: event.id,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    studentId: payload.studentId,
    department: payload.department,
    year: payload.year,
    eventInterest: payload.eventInterest,
    experienceLevel: payload.experience,
    message: payload.message,
    answers: payload.answers,
    metadata: {
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      language: payload.language
    }
  });

  enqueueJob(async () => {
    if (event.googleSheetId) {
      await appendRowToSheet(event.googleSheetId, {
        "Full Name": application.fullName,
        Email: application.email,
        Phone: application.phone ?? "",
        "Submitted At": application.submittedAt.toISOString()
      });
    }

    const emailSent = await sendEmail({
      to: application.email,
      subject: `${event.translations.tr.title} Başvurunuz Alındı`,
      html: eventApplicationConfirmation(
        event.translations.tr.title,
        application.answers.map((answer) => ({
          question: answer.question,
          value: answer.value
        }))
      )
    });

    if (emailSent) {
      application.confirmationEmailSentAt = new Date();
      await application.save();
    } else {
      logger.warn(
        { applicationId: application.id },
        "Event application confirmation email failed"
      );
    }
  });

  res.status(201).json({ message: "Application received" });
});

export const listEventApplications = asyncHandler(async (req: Request, res: Response) => {
  const { eventId } = req.query as { eventId?: string };
  const filter = eventId ? { event: eventId } : {};
  const applications = await EventApplication.find(filter)
    .sort({ submittedAt: -1 })
    .lean();
  res.json(applications);
});
