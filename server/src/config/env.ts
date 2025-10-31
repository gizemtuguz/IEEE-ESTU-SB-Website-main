import { config as loadEnv } from "dotenv";
import { z } from "zod";

loadEnv();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  FRONTEND_URL: z.string().default("http://localhost:5173"),
  JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),
  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  GOOGLE_PROJECT_ID: z.string().optional(),
  GOOGLE_CLIENT_EMAIL: z.string().optional(),
  GOOGLE_PRIVATE_KEY: z.string().optional(),
  GOOGLE_SHEETS_MEMBERSHIP_ID: z.string().optional(),
  GOOGLE_SHEETS_CONTACT_ID: z.string().optional(),
  GOOGLE_SHEETS_SPONSOR_ID: z.string().optional(),
  GOOGLE_SHEETS_NEWSLETTER_ID: z.string().optional(),
  GOOGLE_SHEETS_COMMITTEE_ID: z.string().optional(),
  DEFAULT_INFO_EMAIL: z.string().email().optional(),
  SPONSORSHIP_CALENDAR_LINK: z.string().url().optional(),
  GOOGLE_GROUP_EMAIL: z.string().optional(),
  RECAPTCHA_SECRET_KEY: z.string().optional(),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info")
});

export const env = envSchema.parse(process.env);

export const isProd = env.NODE_ENV === "production";
