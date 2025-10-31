import { Schema, model, type Document, type Types } from "mongoose";

export interface CommitteeSelectionDoc extends Document {
  membershipApplication?: Types.ObjectId;
  email: string;
  fullName?: string;
  primaryCommittee: string;
  secondaryCommittee?: string;
  motivations?: string;
  googleRowId?: string;
  submittedAt: Date;
}

const committeeSelectionSchema = new Schema<CommitteeSelectionDoc>(
  {
    membershipApplication: {
      type: Schema.Types.ObjectId,
      ref: "MembershipApplication"
    },
    email: { type: String, required: true },
    fullName: { type: String },
    primaryCommittee: { type: String, required: true },
    secondaryCommittee: { type: String },
    motivations: { type: String },
    googleRowId: { type: String },
    submittedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

committeeSelectionSchema.index({ email: 1, submittedAt: -1 });

export const CommitteeSelection = model<CommitteeSelectionDoc>(
  "CommitteeSelection",
  committeeSelectionSchema
);
