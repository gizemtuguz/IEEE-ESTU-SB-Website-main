import { google } from "googleapis";
import { getGoogleAuth } from "./googleClient.js";
import { env } from "../config/env.js";
import { logger } from "../utils/logger.js";

export async function addMemberToGroup(email: string) {
  const auth = getGoogleAuth();
  if (!auth || !env.GOOGLE_GROUP_EMAIL) {
    logger.warn("Skipping Google Group sync: credentials or group email missing");
    return false;
  }

  const admin = google.admin({ version: "directory_v1", auth });

  try {
    await admin.members.insert({
      groupKey: env.GOOGLE_GROUP_EMAIL,
      requestBody: {
        email,
        role: "MEMBER"
      }
    });
    return true;
  } catch (error) {
    logger.error({ err: error, email }, "Failed to add member to Google Group");
    return false;
  }
}
