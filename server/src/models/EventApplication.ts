import { Schema, model, type Document, type Types } from "mongoose";

interface Answer {
  fieldId: string;
  question: string;
  value: string | string[];
}

export interface EventApplicationDoc extends Document {
  event: Types.ObjectId;
  fullName: string;
  email: string;
  phone?: string;
  studentId?: string;
  department?: string;
  year?: string;
  eventInterest?: string;
  experienceLevel?: string;
  message?: string;
  answers: Answer[];
  googleRowId?: string;
  confirmationEmailSentAt?: Date;
  submittedAt: Date;
  metadata?: {
    ip?: string;
    userAgent?: string;
    language?: string;
  };
}

const answerSchema = new Schema<Answer>(
  {
    fieldId: { type: String, required: true },
    question: { type: String, required: true },
    value: { type: Schema.Types.Mixed, required: true }
  },
  { _id: false }
);

const eventApplicationSchema = new Schema<EventApplicationDoc>(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    studentId: { type: String },
    department: { type: String },
    year: { type: String },
    eventInterest: { type: String },
    experienceLevel: { type: String },
    message: { type: String },
    answers: { type: [answerSchema], default: [] },
    googleRowId: { type: String },
    confirmationEmailSentAt: { type: Date },
    submittedAt: { type: Date, default: Date.now },
    metadata: {
      ip: { type: String },
      userAgent: { type: String },
      language: { type: String }
    }
  },
  { timestamps: true }
);

eventApplicationSchema.index({ event: 1, submittedAt: -1 });
eventApplicationSchema.index({ email: 1, event: 1 });

export const EventApplication = model<EventApplicationDoc>(
  "EventApplication",
  eventApplicationSchema
);
