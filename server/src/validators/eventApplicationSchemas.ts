import { z } from "zod";

export const eventApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  studentId: z.string().optional(),
  department: z.string().optional(),
  year: z.string().optional(),
  eventInterest: z.string().optional(),
  experience: z.string().optional(),
  message: z.string().optional(),
  answers: z
    .array(
      z.object({
        fieldId: z.string(),
        question: z.string(),
        value: z.union([z.string(), z.array(z.string())])
      })
    )
    .min(1),
  language: z.string().optional(),
  recaptchaToken: z.string().optional()
});
