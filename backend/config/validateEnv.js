/**
 * validateEnv.js
 *
 * Validates all required environment variables at startup.
 * Call this once — early in server.js — before any service is used.
 * Throws a descriptive error and exits(1) if anything is missing.
 */

const REQUIRED_VARS = [
    "GOOGLE_CLIENT_EMAIL",
    "GOOGLE_PRIVATE_KEY",
    "GOOGLE_SHEET_ID",
];

export function validateEnv() {
    const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

    if (missing.length > 0) {
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.error("❌  Missing required environment variables:");
        missing.forEach((key) => console.error(`     • ${key}`));
        console.error("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        process.exit(1);
    }
}
