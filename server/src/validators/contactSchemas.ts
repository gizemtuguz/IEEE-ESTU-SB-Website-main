import { z } from "zod";

export const contactMessageSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10),
  recaptchaToken: z.string().optional()
});
