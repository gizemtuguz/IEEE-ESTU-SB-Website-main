import { Router } from "express";
import {
  listPublicEvents,
  getPublicEvent
} from "../controllers/eventController.js";
import { submitEventApplication } from "../controllers/eventApplicationController.js";
import { listPublicBlogPosts } from "../controllers/blogController.js";
import {
  submitMembershipApplication,
  submitCommitteeSelection
} from "../controllers/membershipController.js";
import { submitSponsorshipLead } from "../controllers/sponsorshipController.js";
import { submitContactMessage } from "../controllers/contactController.js";
import { subscribeToNewsletter } from "../controllers/newsletterController.js";
import { validateBody } from "../middleware/validateResource.js";
import { eventApplicationSchema } from "../validators/eventApplicationSchemas.js";
import { membershipApplicationSchema, committeeSelectionSchema } from "../validators/membershipSchemas.js";
import { sponsorshipLeadSchema } from "../validators/sponsorshipSchemas.js";
import { contactMessageSchema } from "../validators/contactSchemas.js";
import { newsletterSubscribeSchema } from "../validators/newsletterSchemas.js";
import { formSubmissionLimiter } from "../middleware/rateLimiters.js";

const router = Router();

router.get("/events", listPublicEvents);
router.get("/events/:slug", getPublicEvent);
router.post(
  "/events/:slug/applications",
  formSubmissionLimiter,
  validateBody(eventApplicationSchema),
  submitEventApplication
);

router.get("/blog", listPublicBlogPosts);

router.post(
  "/membership/apply",
  formSubmissionLimiter,
  validateBody(membershipApplicationSchema),
  submitMembershipApplication
);

router.post(
  "/membership/committee",
  formSubmissionLimiter,
  validateBody(committeeSelectionSchema),
  submitCommitteeSelection
);

router.post(
  "/sponsorship",
  formSubmissionLimiter,
  validateBody(sponsorshipLeadSchema),
  submitSponsorshipLead
);

router.post(
  "/contact",
  formSubmissionLimiter,
  validateBody(contactMessageSchema),
  submitContactMessage
);

router.post(
  "/newsletter/subscribe",
  formSubmissionLimiter,
  validateBody(newsletterSubscribeSchema),
  subscribeToNewsletter
);

export const publicRouter = router;
