import type { Request, Response } from "express";
import { MembershipApplication } from "../models/MembershipApplication.js";
import { CommitteeSelection } from "../models/CommitteeSelection.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyRecaptcha } from "../services/recaptchaService.js";
import { appendRowToSheet } from "../services/googleSheetsService.js";
import { enqueueJob } from "../jobs/asyncJobs.js";
import { sendEmail } from "../services/emailService.js";
import {
  committeeSelectionConfirmation,
  membershipWelcome
} from "../templates/emailTemplates.js";
import { env } from "../config/env.js";

export const submitMembershipApplication = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as any;

  const isRecaptchaValid = await verifyRecaptcha(payload.recaptchaToken, req.ip);
  if (!isRecaptchaValid) {
    return res.status(400).json({ message: "reCAPTCHA validation failed" });
  }

  const application = await MembershipApplication.create({
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    studentId: payload.studentId,
    department: payload.department,
    year: payload.year,
    motivation: payload.motivation,
    experience: payload.experience
  });

  enqueueJob(async () => {
    if (env.GOOGLE_SHEETS_MEMBERSHIP_ID) {
      await appendRowToSheet(env.GOOGLE_SHEETS_MEMBERSHIP_ID, {
        "Full Name": application.fullName,
        Email: application.email,
        Phone: application.phone ?? "",
        Department: application.department ?? "",
        "Submitted At": application.submittedAt.toISOString()
      });
    }

    await sendEmail({
      to: application.email,
      subject: "IEEE ESTU Üyeliğine Hoş Geldin",
      html: membershipWelcome(application.fullName)
    });
  });

  res.status(201).json({ message: "Membership application received", membershipId: application.id });
});

export const submitCommitteeSelection = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as any;

  const isRecaptchaValid = await verifyRecaptcha(payload.recaptchaToken, req.ip);
  if (!isRecaptchaValid) {
    return res.status(400).json({ message: "reCAPTCHA validation failed" });
  }

  const committeeSelection = await CommitteeSelection.create({
    membershipApplication: payload.membershipId,
    email: payload.email,
    fullName: payload.fullName,
    primaryCommittee: payload.primaryCommittee,
    secondaryCommittee: payload.secondaryCommittee,
    motivations: payload.motivations
  });

  enqueueJob(async () => {
    if (env.GOOGLE_SHEETS_COMMITTEE_ID) {
      await appendRowToSheet(env.GOOGLE_SHEETS_COMMITTEE_ID, {
        Email: committeeSelection.email,
        "Primary Committee": committeeSelection.primaryCommittee,
        "Secondary Committee": committeeSelection.secondaryCommittee ?? "",
        "Submitted At": committeeSelection.submittedAt.toISOString()
      });
    }

    await sendEmail({
      to: committeeSelection.email,
      subject: "Komite Tercihin Alındı",
      html: committeeSelectionConfirmation(
        committeeSelection.fullName ?? "IEEE Üyesi",
        committeeSelection.primaryCommittee,
        committeeSelection.secondaryCommittee ?? undefined
      )
    });
  });

  res.status(201).json({ message: "Committee selection received" });
});

export const listMembershipApplications = asyncHandler(async (_req: Request, res: Response) => {
  const applications = await MembershipApplication.find().sort({ submittedAt: -1 }).lean();
  res.json(applications);
});

export const listCommitteeSelections = asyncHandler(async (_req: Request, res: Response) => {
  const selections = await CommitteeSelection.find()
    .sort({ submittedAt: -1 })
    .populate("membershipApplication", "fullName email")
    .lean();
  res.json(selections);
});
