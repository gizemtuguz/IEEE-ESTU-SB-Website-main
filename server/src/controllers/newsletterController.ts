import type { Request, Response } from "express";
import { NewsletterSubscriber } from "../models/NewsletterSubscriber.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyRecaptcha } from "../services/recaptchaService.js";
import { enqueueJob } from "../jobs/asyncJobs.js";
import { appendRowToSheet } from "../services/googleSheetsService.js";
import { sendEmail } from "../services/emailService.js";
import { newsletterWelcome } from "../templates/emailTemplates.js";
import { addMemberToGroup } from "../services/googleGroupsService.js";
import { env } from "../config/env.js";

export const subscribeToNewsletter = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as any;

  const isRecaptchaValid = await verifyRecaptcha(payload.recaptchaToken, req.ip);
  if (!isRecaptchaValid) {
    return res.status(400).json({ message: "reCAPTCHA validation failed" });
  }

  const existing = await NewsletterSubscriber.findOne({ email: payload.email.toLowerCase() });
  if (existing) {
    return res.status(200).json({ message: "You are already subscribed" });
  }

  const subscriber = await NewsletterSubscriber.create({
    email: payload.email.toLowerCase()
  });

  enqueueJob(async () => {
    if (env.GOOGLE_SHEETS_NEWSLETTER_ID) {
      await appendRowToSheet(env.GOOGLE_SHEETS_NEWSLETTER_ID, {
        Email: subscriber.email,
        "Subscribed At": subscriber.subscribedAt.toISOString()
      });
    }

    await addMemberToGroup(subscriber.email);

    await sendEmail({
      to: subscriber.email,
      subject: "IEEE ESTU Bültenine Hoş Geldin",
      html: newsletterWelcome()
    });
  });

  res.status(201).json({ message: "Subscribed successfully" });
});

export const listNewsletterSubscribers = asyncHandler(async (_req: Request, res: Response) => {
  const subscribers = await NewsletterSubscriber.find().sort({ subscribedAt: -1 }).lean();
  res.json(subscribers);
});
