/**
 * config/google.js
 *
 * Provides a lazy `getSheets()` factory.
 *
 * WHY LAZY? In ES Modules, top-level `import` statements are hoisted and evaluated
 * before any imperative code (including dotenv.config()) runs. A module-level
 * singleton like `export const sheets = google.sheets(...)` would be constructed
 * with undefined credentials. A factory function defers construction until the
 * first actual API call, by which time env vars are guaranteed to be loaded.
 *
 * WHY CACHED? The googleapis client is stateless between calls — we only need one
 * instance. `_sheetsClient` memoises it after the first call.
 *
 * PRIVATE KEY NORMALISATION:
 * dotenv on Windows can produce either:
 *   - literal \\n in the string (needs replace)
 *   - real \n characters (already correct)
 * Render/Railway inject real newlines directly.
 * We normalise both cases, then strip any stray \r characters (Windows CRLF)
 * that cause OpenSSL's ERR_OSSL_UNSUPPORTED error.
 */

import { google } from "googleapis";

let _sheetsClient = null;

/**
 * Normalises a PEM private key regardless of how the hosting platform
 * stores or injects it into the environment.
 *
 * @param {string} raw - The raw value of process.env.GOOGLE_PRIVATE_KEY
 * @returns {string} A clean PEM string with Unix newlines only
 */
function normalisePrivateKey(raw) {
    return raw
        .replace(/\\n/g, "\n")   // convert escaped \\n → real newline
        .replace(/\r\n/g, "\n")  // convert Windows CRLF → Unix LF
        .replace(/\r/g, "\n");   // convert stray CR → Unix LF
}

/**
 * Returns a memoised Google Sheets v4 client authenticated with the
 * service account credentials from environment variables.
 *
 * @returns {import("googleapis").sheets_v4.Sheets}
 */
export function getSheets() {
    if (_sheetsClient) return _sheetsClient;

    const privateKey = normalisePrivateKey(process.env.GOOGLE_PRIVATE_KEY);

    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: privateKey,
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    _sheetsClient = google.sheets({ version: "v4", auth });
    return _sheetsClient;
}