import { z } from "zod";

export const blogPostSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  body: z.string().min(50),
  coverImage: z.string().url().optional(),
  author: z.string().optional(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
  tags: z.array(z.string()).optional()
});

export const updateBlogPostSchema = blogPostSchema.partial();
