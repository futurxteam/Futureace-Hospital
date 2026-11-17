/* =============================================================================
   GOOGLE ADS CONVERSIONS  —  src/utils/googleAds.js
   =============================================================================
   Integration point for Google Ads conversion tracking.

   The site already loads gtag.js (Google tag) in index.html, so this helper
   re-uses window.gtag — it does NOT add another script.

   Nothing fires until a real conversion ID + label are provided in
   config/varicoseVeinsConfig.js (googleAds). No IDs are invented.

   PRIVACY: only the conversion destination is sent. No names, phone numbers,
   emails or health information are ever passed.
============================================================================= */

const configuredIds = new Set();

function send(googleAds, label) {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
    if (!googleAds?.conversionId || !label) return;

    /* Register the Ads account with the existing gtag instance once */
    if (!configuredIds.has(googleAds.conversionId)) {
      window.gtag('config', googleAds.conversionId);
      configuredIds.add(googleAds.conversionId);
    }

    window.gtag('event', 'conversion', {
      send_to: `${googleAds.conversionId}/${label}`,
    });
  } catch {
    /* analytics must never break the user flow */
  }
}

/** Primary conversion — call ONLY after the backend confirms the enquiry. */
export function trackGoogleAdsLead(googleAds) {
  send(googleAds, googleAds?.leadConversionLabel);
}

/** Secondary conversion — WhatsApp click (not a confirmed lead). */
export function trackGoogleAdsWhatsApp(googleAds) {
  send(googleAds, googleAds?.whatsappConversionLabel);
}

