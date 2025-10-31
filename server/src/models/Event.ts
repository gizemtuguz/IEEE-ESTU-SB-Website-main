import { Schema, model, type Document, type Types } from "mongoose";

export type FormFieldType =
  | "text"
  | "textarea"
  | "email"
  | "phone"
  | "number"
  | "select"
  | "radio"
  | "checkbox"
  | "date";

export interface EventFormField {
  id: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  options?: string[];
  helperText?: string;
  order: number;
}

export interface EventTranslation {
  title: string;
  location: string;
  category: string;
  description: string;
  participants?: string;
}

export interface EventDoc extends Document {
  slug: string;
  status: "draft" | "published" | "archived";
  coverImage?: string;
  bannerImage?: string;
  startDate: Date;
  endDate?: Date;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  googleSheetId?: string;
  translations: {
    tr: EventTranslation;
    en: EventTranslation;
  };
  formFields: EventFormField[];
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const eventFormFieldSchema = new Schema<EventFormField>(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "text",
        "textarea",
        "email",
        "phone",
        "number",
        "select",
        "radio",
        "checkbox",
        "date"
      ],
      required: true
    },
    required: { type: Boolean, default: false },
    options: { type: [String], default: void 0 },
    helperText: { type: String },
    order: { type: Number, default: 0 }
  },
  { _id: false }
);

const translationSchema = new Schema<EventTranslation>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    participants: { type: String }
  },
  { _id: false }
);

const eventSchema = new Schema<EventDoc>(
  {
    slug: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft"
    },
    coverImage: { type: String },
    bannerImage: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    startTime: { type: String },
    endTime: { type: String },
    capacity: { type: Number },
    googleSheetId: { type: String },
    translations: {
      tr: { type: translationSchema, required: true },
      en: { type: translationSchema, required: true }
    },
    formFields: { type: [eventFormFieldSchema], default: [] },
    createdBy: { type: Schema.Types.ObjectId, ref: "AdminUser" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "AdminUser" }
  },
  { timestamps: true }
);

eventSchema.index({ status: 1, startDate: -1 });

export const Event = model<EventDoc>("Event", eventSchema);
