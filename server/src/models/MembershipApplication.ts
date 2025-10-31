import { Schema, model, type Document } from "mongoose";

export interface MembershipApplicationDoc extends Document {
  fullName: string;
  email: string;
  phone?: string;
  studentId?: string;
  department?: string;
  year?: string;
  motivation?: string;
  experience?: string;
  googleRowId?: string;
  status: "pending" | "accepted" | "rejected";
  submittedAt: Date;
}

const membershipApplicationSchema = new Schema<MembershipApplicationDoc>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    studentId: { type: String },
    department: { type: String },
    year: { type: String },
    motivation: { type: String },
    experience: { type: String },
    googleRowId: { type: String },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending"
    },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

membershipApplicationSchema.index({ email: 1, submittedAt: -1 });

export const MembershipApplication = model<MembershipApplicationDoc>(
  "MembershipApplication",
  membershipApplicationSchema
);
