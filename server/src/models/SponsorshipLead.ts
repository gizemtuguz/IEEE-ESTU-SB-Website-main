import { Schema, model, type Document } from "mongoose";

export interface SponsorshipLeadDoc extends Document {
  organization?: string;
  contactName?: string;
  email: string;
  phone?: string;
  notes?: string;
  calendarLinkSentAt?: Date;
  googleRowId?: string;
  submittedAt: Date;
}

const sponsorshipLeadSchema = new Schema<SponsorshipLeadDoc>(
  {
    organization: { type: String },
    contactName: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    notes: { type: String },
    calendarLinkSentAt: { type: Date },
    googleRowId: { type: String },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

sponsorshipLeadSchema.index({ email: 1, submittedAt: -1 });

export const SponsorshipLead = model<SponsorshipLeadDoc>(
  "SponsorshipLead",
  sponsorshipLeadSchema
);
