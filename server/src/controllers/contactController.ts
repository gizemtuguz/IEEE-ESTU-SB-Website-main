import type { Request, Response } from "express";
import { ContactMessage } from "../models/ContactMessage.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyRecaptcha } from "../services/recaptchaService.js";
import { appendRowToSheet } from "../services/googleSheetsService.js";
import { enqueueJob } from "../jobs/asyncJobs.js";
import { sendEmail } from "../services/emailService.js";
import { contactMessageNotification } from "../templates/emailTemplates.js";
import { env } from "../config/env.js";

export const submitContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as any;

  const isRecaptchaValid = await verifyRecaptcha(payload.recaptchaToken, req.ip);
  if (!isRecaptchaValid) {
    return res.status(400).json({ message: "reCAPTCHA validation failed" });
  }

  const message = await ContactMessage.create({
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    subject: payload.subject,
    message: payload.message
  });

  enqueueJob(async () => {
    if (env.GOOGLE_SHEETS_CONTACT_ID) {
      await appendRowToSheet(env.GOOGLE_SHEETS_CONTACT_ID, {
        Name: message.fullName,
        Email: message.email,
        Phone: message.phone ?? "",
        Subject: message.subject ?? "",
        Message: message.message,
        "Submitted At": message.submittedAt.toISOString()
      });
    }

    const recipients = env.DEFAULT_INFO_EMAIL ? [env.DEFAULT_INFO_EMAIL] : [];
    if (recipients.length > 0) {
      await sendEmail({
        to: recipients,
        subject: `Yeni İletişim Mesajı: ${message.fullName}`,
        html: contactMessageNotification(message.fullName, message.email, message.message)
      });
    }
  });

  res.status(201).json({ message: "Contact message received" });
});

export const listContactMessages = asyncHandler(async (_req: Request, res: Response) => {
  const messages = await ContactMessage.find().sort({ submittedAt: -1 }).lean();
  res.json(messages);
});
