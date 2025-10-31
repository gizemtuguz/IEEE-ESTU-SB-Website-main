import { Schema, model, type Document } from "mongoose";

export interface BlogPostDoc extends Document {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  author?: string;
  publishedAt?: Date;
  status: "draft" | "published";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<BlogPostDoc>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    coverImage: { type: String },
    author: { type: String },
    publishedAt: { type: Date },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
);

blogPostSchema.index({ status: 1, publishedAt: -1 });

export const BlogPost = model<BlogPostDoc>("BlogPost", blogPostSchema);
