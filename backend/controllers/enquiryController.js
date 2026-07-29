/**
 * controllers/enquiryController.js
 *
 * Handles POST /api/enquiries
 */

import { saveEnquiry } from "../services/googleSheetsService.js";

const REQUIRED_FIELDS = ["patientName", "mobile", "consultationType"];

/**
 * POST /api/enquiries
 * Body: { consultationType, patientName, mobile, email?, age?, city?,
 *         preferredDate?, notes?, dynamicFields? }
 */
export async function createEnquiry(req, res) {
    // ── Basic validation ────────────────────────────────────────────────────
    const missing = REQUIRED_FIELDS.filter(
        (field) => !req.body[field] || String(req.body[field]).trim() === ""
    );

    if (missing.length > 0) {
        return res.status(400).json({
            success: false,
            message: `Missing required fields: ${missing.join(", ")}`,
        });
    }

    // ── Mobile format check (10-digit Indian mobile number) ─────────────────
    const mobile = String(req.body.mobile).trim();
    if (!/^\+?[0-9]{7,15}$/.test(mobile)) {
        return res.status(400).json({
            success: false,
            message: "Invalid mobile number format.",
        });
    }

    // ── Save to Google Sheets ───────────────────────────────────────────────
    try {
        await saveEnquiry(req.body);

        return res.status(200).json({
            success: true,
            message: "Enquiry submitted successfully.",
        });
    } catch (error) {
        // Log the full error server-side but never expose raw stack traces
        // or internal messages to the client.
        console.error("Enquiry submission failed:", error.message ?? error);

        return res.status(500).json({
            success: false,
            message: "Failed to submit enquiry. Please try again later.",
        });
    }
}