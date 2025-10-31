import { google } from "googleapis";
import { env } from "../config/env.js";
import { getGoogleAuth } from "./googleClient.js";
import { logger } from "../utils/logger.js";

const tables = google.area120tables("v1alpha1");

export async function ensureEventTable(eventName: string) {
  const auth = getGoogleAuth();
  if (!auth || !env.GOOGLE_TABLES_WORKSPACE_ID) {
    logger.warn(
      { eventName },
      "Skipping Google Tables creation: credentials or workspace ID missing"
    );
    return null;
  }

  try {
    const response = await tables.tables.create({
      auth,
      parent: `workspaces/${env.GOOGLE_TABLES_WORKSPACE_ID}`,
      requestBody: {
        displayName: eventName,
        columns: [
          { name: "Full Name", type: "TEXT" },
          { name: "Email", type: "TEXT" },
          { name: "Phone", type: "TEXT" },
          { name: "Submitted At", type: "DATE" }
        ]
      }
    });
    return response.data.name ?? null;
  } catch (error) {
    logger.error({ err: error }, "Failed to create Google Table for event");
    return null;
  }
}

export async function appendRowToTable(tableId: string, values: Record<string, string>) {
  const auth = getGoogleAuth();
  if (!auth) {
    logger.warn("Skipping Google Tables append: credentials missing");
    return null;
  }

  try {
    await tables.rows.create({
      auth,
      parent: tableId,
      requestBody: {
        values
      }
    });
    return true;
  } catch (error) {
    logger.error({ err: error, tableId }, "Failed to append row to Google Table");
    return false;
  }
}
