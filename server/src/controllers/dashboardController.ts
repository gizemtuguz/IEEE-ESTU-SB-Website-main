import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Event } from "../models/Event.js";
import { EventApplication } from "../models/EventApplication.js";
import { MembershipApplication } from "../models/MembershipApplication.js";
import { NewsletterSubscriber } from "../models/NewsletterSubscriber.js";
import { SponsorshipLead } from "../models/SponsorshipLead.js";

export const getDashboardMetrics = asyncHandler(async (_req: Request, res: Response) => {
  const [eventCount, applicationCount, membershipCount, subscriberCount, sponsorCount] =
    await Promise.all([
      Event.countDocuments(),
      EventApplication.countDocuments(),
      MembershipApplication.countDocuments(),
      NewsletterSubscriber.countDocuments(),
      SponsorshipLead.countDocuments()
    ]);

  res.json({
    events: eventCount,
    eventApplications: applicationCount,
    membershipApplications: membershipCount,
    newsletterSubscribers: subscriberCount,
    sponsorshipLeads: sponsorCount
  });
});
