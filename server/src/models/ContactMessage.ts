import { Schema, model, type Document } from "mongoose";

export interface ContactMessageDoc extends Document {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  googleRowId?: string;
  deliveredAt?: Date;
  submittedAt: Date;
}

const contactMessageSchema = new Schema<ContactMessageDoc>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String },
    message: { type: String, required: true },
    googleRowId: { type: String },
    deliveredAt: { type: Date },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

contactMessageSchema.index({ email: 1, submittedAt: -1 });

export const ContactMessage = model<ContactMessageDoc>(
  "ContactMessage",
  contactMessageSchema
);
