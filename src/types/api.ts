export interface EventTranslation {
  title: string;
  location: string;
  category: string;
  description: string;
  participants?: string;
}

export type EventStatus = "draft" | "published" | "archived";

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

export interface Event {
  _id: string;
  slug: string;
  status: EventStatus;
  coverImage?: string;
  bannerImage?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  translations: {
    tr: EventTranslation;
    en: EventTranslation;
  };
  formFields: EventFormField[];
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  author?: string;
  publishedAt?: string;
  status: "draft" | "published";
  tags: string[];
}

export interface DashboardMetrics {
  events: number;
  eventApplications: number;
  membershipApplications: number;
  newsletterSubscribers: number;
  sponsorshipLeads: number;
}
