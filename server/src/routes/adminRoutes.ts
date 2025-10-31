import { Router } from "express";
import { authenticate, requireRole } from "../middleware/authenticate.js";
import {
  createEvent,
  deleteEvent,
  getAdminEventById,
  listAdminEvents,
  updateEvent,
  updateEventFormFields
} from "../controllers/eventController.js";
import { listEventApplications } from "../controllers/eventApplicationController.js";
import {
  createBlogPost,
  deleteBlogPost,
  listAdminBlogPosts,
  updateBlogPost
} from "../controllers/blogController.js";
import {
  listCommitteeSelections,
  listMembershipApplications
} from "../controllers/membershipController.js";
import { listSponsorshipLeads } from "../controllers/sponsorshipController.js";
import { listContactMessages } from "../controllers/contactController.js";
import { listNewsletterSubscribers } from "../controllers/newsletterController.js";
import { getDashboardMetrics } from "../controllers/dashboardController.js";
import { validateBody } from "../middleware/validateResource.js";
import {
  createEventSchema,
  formFieldsSchema,
  updateEventSchema
} from "../validators/eventSchemas.js";
import { blogPostSchema, updateBlogPostSchema } from "../validators/blogSchemas.js";

const router = Router();

router.use(authenticate, requireRole("super", "editor"));

router.get("/dashboard/metrics", getDashboardMetrics);

router.get("/events", listAdminEvents);
router.get("/events/:id", getAdminEventById);
router.post("/events", validateBody(createEventSchema), createEvent);
router.patch("/events/:id", validateBody(updateEventSchema), updateEvent);
router.put("/events/:id/form", validateBody(formFieldsSchema), updateEventFormFields);
router.delete("/events/:id", deleteEvent);

router.get("/event-applications", listEventApplications);

router.get("/blog", listAdminBlogPosts);
router.post("/blog", validateBody(blogPostSchema), createBlogPost);
router.patch("/blog/:id", validateBody(updateBlogPostSchema), updateBlogPost);
router.delete("/blog/:id", deleteBlogPost);

router.get("/membership-applications", listMembershipApplications);
router.get("/committee-selections", listCommitteeSelections);
router.get("/sponsorship-leads", listSponsorshipLeads);
router.get("/contact-messages", listContactMessages);
router.get("/newsletter-subscribers", listNewsletterSubscribers);

export const adminRouter = router;
