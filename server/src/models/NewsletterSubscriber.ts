import { Schema, model, type Document } from "mongoose";

export interface NewsletterSubscriberDoc extends Document {
  email: string;
  verified: boolean;
  verificationToken?: string;
  subscribedAt: Date;
  googleRowId?: string;
}

const newsletterSubscriberSchema = new Schema<NewsletterSubscriberDoc>(
  {
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: true },
    verificationToken: { type: String },
    subscribedAt: { type: Date, default: Date.now },
    googleRowId: { type: String }
  },
  { timestamps: true }
);

export const NewsletterSubscriber = model<NewsletterSubscriberDoc>(
  "NewsletterSubscriber",
  newsletterSubscriberSchema
);
