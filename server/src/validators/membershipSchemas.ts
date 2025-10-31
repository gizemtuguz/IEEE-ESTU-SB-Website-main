import { z } from "zod";

export const membershipApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  studentId: z.string().optional(),
  department: z.string().optional(),
  year: z.string().optional(),
  motivation: z.string().optional(),
  experience: z.string().optional(),
  recaptchaToken: z.string().optional()
});

export const committeeSelectionSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(2).optional(),
  membershipId: z.string().optional(),
  primaryCommittee: z.string().min(2),
  secondaryCommittee: z.string().optional(),
  motivations: z.string().optional(),
  recaptchaToken: z.string().optional()
});
