import { z } from "zod";

export const newsletterSubscribeSchema = z.object({
  email: z.string().email(),
  recaptchaToken: z.string().optional()
});
