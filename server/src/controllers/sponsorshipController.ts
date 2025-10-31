import type { Request, Response } from "express";
import { SponsorshipLead } from "../models/SponsorshipLead.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyRecaptcha } from "../services/recaptchaService.js";
import { enqueueJob } from "../jobs/asyncJobs.js";
import { appendRowToSheet } from "../services/googleSheetsService.js";
import { sendEmail } from "../services/emailService.js";
import { sponsorshipIntro } from "../templates/emailTemplates.js";
import { env } from "../config/env.js";

export const submitSponsorshipLead = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as any;

  const isRecaptchaValid = await verifyRecaptcha(payload.recaptchaToken, req.ip);
  if (!isRecaptchaValid) {
    return res.status(400).json({ message: "reCAPTCHA validation failed" });
  }

  const lead = await SponsorshipLead.create({
    email: payload.email,
    organization: payload.organization,
    contactName: payload.contactName,
    phone: payload.phone,
    notes: payload.notes
  });

  enqueueJob(async () => {
    if (env.GOOGLE_SHEETS_SPONSOR_ID) {
      await appendRowToSheet(env.GOOGLE_SHEETS_SPONSOR_ID, {
        Email: lead.email,
        Organization: lead.organization ?? "",
        "Contact Name": lead.contactName ?? "",
        Phone: lead.phone ?? "",
        "Submitted At": lead.submittedAt.toISOString()
      });
    }

    const emailSent = await sendEmail({
      to: lead.email,
      subject: "IEEE ESTU Sponsorluk Ekibi",
      html: sponsorshipIntro(lead.contactName ?? lead.organization, env.SPONSORSHIP_CALENDAR_LINK)
    });

    if (emailSent) {
      lead.calendarLinkSentAt = new Date();
      await lead.save();
    }
  });

  res.status(201).json({ message: "Sponsorship inquiry received" });
});

export const listSponsorshipLeads = asyncHandler(async (_req: Request, res: Response) => {
  const leads = await SponsorshipLead.find().sort({ submittedAt: -1 }).lean();
  res.json(leads);
});
