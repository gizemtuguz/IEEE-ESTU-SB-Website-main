import { z } from "zod";

export const sponsorshipLeadSchema = z.object({
  email: z.string().email(),
  organization: z.string().optional(),
  contactName: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional(),
  recaptchaToken: z.string().optional()
});
