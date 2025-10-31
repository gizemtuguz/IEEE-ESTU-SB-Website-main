import { google } from "googleapis";
import { env } from "../config/env.js";
import { getGoogleAuth } from "./googleClient.js";
import { logger } from "../utils/logger.js";

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  cc?: string | string[];
  replyTo?: string;
}

function formatAddress(address: string | string[]) {
  if (Array.isArray(address)) {
    return address.join(",");
  }
  return address;
}

export async function sendEmail(options: EmailOptions) {
  const auth = getGoogleAuth();
  if (!auth || !env.GMAIL_SENDER) {
    logger.warn("Skipping Gmail send: missing auth or sender");
    return false;
  }

  const gmail = google.gmail({ version: "v1", auth });

  const messageParts = [
    `From: IEEE ESTU SB <${env.GMAIL_SENDER}>`,
    `To: ${formatAddress(options.to)}`,
    options.cc ? `Cc: ${formatAddress(options.cc)}` : undefined,
    `Subject: ${options.subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "",
    options.html
  ]
    .filter(Boolean)
    .join("\n");

  const encodedMessage = Buffer.from(messageParts)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedMessage
      }
    });
    return true;
  } catch (error) {
    logger.error({ err: error }, "Failed to send email via Gmail API");
    return false;
  }
}
