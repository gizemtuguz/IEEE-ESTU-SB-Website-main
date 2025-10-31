import { z } from "zod";

const translationSchema = z.object({
  title: z.string().min(1, "Başlık en az 1 karakter olmalıdır"),
  location: z.string().min(1, "Konum en az 1 karakter olmalıdır"),
  category: z.string().min(1, "Kategori en az 1 karakter olmalıdır"),
  description: z.string().min(1, "Açıklama en az 1 karakter olmalıdır"),
  participants: z.string().optional()
});

const formFieldSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(2),
  type: z.enum([
    "text",
    "textarea",
    "email",
    "phone",
    "number",
    "select",
    "radio",
    "checkbox",
    "date"
  ]),
  required: z.boolean().default(false),
  options: z.array(z.string()).optional(),
  helperText: z.string().optional(),
  order: z.number().int().optional()
});

export const createEventSchema = z.object({
  slug: z.string().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  coverImage: z.string().url().optional(),
  bannerImage: z.string().url().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  capacity: z.number().int().positive().optional(),
  translations: z.object({
    tr: translationSchema,
    en: translationSchema
  }),
  formFields: z.array(formFieldSchema).optional()
});

export const updateEventSchema = createEventSchema.partial();

export const formFieldsSchema = z.object({
  formFields: z.array(formFieldSchema)
});
