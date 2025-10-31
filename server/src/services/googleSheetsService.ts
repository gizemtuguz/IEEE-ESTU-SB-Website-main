import { google } from "googleapis";
import { getGoogleAuth } from "./googleClient.js";
import { logger } from "../utils/logger.js";

export async function appendRowToSheet(
  spreadsheetId: string,
  values: Record<string, unknown>
) {
  const auth = getGoogleAuth();
  if (!auth) {
    logger.warn("Skipping Google Sheets append: missing auth");
    return;
  }

  try {
    const sheets = google.sheets({ version: "v4", auth });
    
    // Convert object values to array
    const rowValues = Object.values(values);
    
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:Z", // Append to first sheet
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowValues]
      }
    });

    logger.info({ spreadsheetId }, "Row appended to Google Sheet");
  } catch (error) {
    logger.error({ error, spreadsheetId }, "Failed to append row to Google Sheet");
    throw error;
  }
}

export async function getSheetData(
  spreadsheetId: string,
  range: string = "Sheet1!A:Z"
) {
  const auth = getGoogleAuth();
  if (!auth) {
    logger.warn("Skipping Google Sheets read: missing auth");
    return [];
  }

  try {
    const sheets = google.sheets({ version: "v4", auth });
    
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    return response.data.values ?? [];
  } catch (error) {
    logger.error({ error, spreadsheetId }, "Failed to read from Google Sheet");
    throw error;
  }
}
