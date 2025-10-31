import type { Request, Response } from "express";
import { BlogPost } from "../models/BlogPost.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { slugify } from "../utils/slugify.js";

export const listPublicBlogPosts = asyncHandler(async (_req: Request, res: Response) => {
  const posts = await BlogPost.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .select("title slug excerpt coverImage author publishedAt tags")
    .lean();
  res.json(posts);
});

export const listAdminBlogPosts = asyncHandler(async (_req: Request, res: Response) => {
  const posts = await BlogPost.find().sort({ createdAt: -1 }).lean();
  res.json(posts);
});

export const createBlogPost = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body as any;
  const slug = slugify(payload.slug ?? payload.title);

  const exists = await BlogPost.findOne({ slug });
  if (exists) {
    return res.status(400).json({ message: "Slug already exists" });
  }

  const post = await BlogPost.create({
    ...payload,
    slug,
    publishedAt:
      payload.status === "published"
        ? payload.publishedAt
          ? new Date(payload.publishedAt)
          : new Date()
        : null
  });
  res.status(201).json(post);
});

export const updateBlogPost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body as any;

  const post = await BlogPost.findById(id);
  if (!post) {
    return res.status(404).json({ message: "Blog post not found" });
  }

  if (payload.slug && payload.slug !== post.slug) {
    const newSlug = slugify(payload.slug);
    const exists = await BlogPost.exists({ slug: newSlug, _id: { $ne: post.id } });
    if (exists) {
      return res.status(400).json({ message: "Slug already in use" });
    }
    post.slug = newSlug;
  }

  post.title = payload.title ?? post.title;
  post.excerpt = payload.excerpt ?? post.excerpt;
  post.body = payload.body ?? post.body;
  post.coverImage = payload.coverImage ?? post.coverImage;
  post.author = payload.author ?? post.author;
  post.status = payload.status ?? post.status;
  post.tags = payload.tags ?? post.tags;
  if (payload.publishedAt) {
    post.publishedAt = new Date(payload.publishedAt);
  } else if (post.status === "published" && !post.publishedAt) {
    post.publishedAt = new Date();
  }

  await post.save();
  res.json(post);
});

export const deleteBlogPost = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await BlogPost.findById(id);
  if (!post) {
    return res.status(404).json({ message: "Blog post not found" });
  }
  await post.deleteOne();
  res.status(204).send();
});
