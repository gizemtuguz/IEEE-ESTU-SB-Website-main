import { google } from "googleapis";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/gmail.send"
];

let authClient: ReturnType<typeof google.auth.fromJSON> | null = null;

export function getGoogleAuth() {
  if (!env.GOOGLE_CLIENT_EMAIL || !env.GOOGLE_PRIVATE_KEY) {
    logger.warn("Google credentials missing; skipping Google integrations");
    return null;
  }

  if (!authClient) {
    authClient = new google.auth.JWT(
      env.GOOGLE_CLIENT_EMAIL,
      undefined,
      env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      SCOPES
    );
  }

  return authClient;
}
