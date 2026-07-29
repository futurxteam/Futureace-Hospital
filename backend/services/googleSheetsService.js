/**
 * services/googleSheetsService.js
 *
 * Handles all Google Sheets interactions.
 * Uses getSheets() lazy factory so the Sheets client is only constructed
 * after all environment variables are confirmed to be loaded.
 */

import { getSheets } from "../config/google.js";

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = "Sheet1!A:Q";

/**
 * Appends an enquiry row to the Google Sheet.
 *
 * Column layout (A → Q):
 *  A  Timestamp
 *  B  Consultation Type
 *  C  Patient Name
 *  D  Mobile
 *  E  Email
 *  F  Age
 *  G  City
 *  H  Preferred Date
 *  I  Notes
 *  J  Dynamic Fields (JSON)
 *  K  Source
 *  L–P (reserved)
 *  Q  Status
 *
 * @param {object} data - Validated request body from the controller
 */
export async function saveEnquiry(data) {
    const row = [
        new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        data.consultationType ?? "",
        data.patientName       ?? "",
        data.mobile            ?? "",
        data.email             ?? "",
        data.age               ?? "",
        data.city              ?? "",
        data.preferredDate     ?? "",
        data.notes             ?? "",
        JSON.stringify(data.dynamicFields ?? {}),
        "Website",
        "", "", "", "",  // reserved columns L-P
        "New",           // status column Q
    ];

    await getSheets().spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: "USER_ENTERED",
        requestBody: { values: [row] },
    });
}