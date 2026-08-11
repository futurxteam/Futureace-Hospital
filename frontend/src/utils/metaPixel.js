/* =============================================================================
   META PIXEL UTILITY  —  src/utils/metaPixel.js
   =============================================================================
   Single source of truth for all Meta (Facebook) Pixel events.

   RULES
   ─────
   • Components NEVER call window.fbq directly.
   • Every helper silently exits when the Pixel hasn't loaded (safe for SSR /
     ad-blocker / slow network scenarios) — zero runtime errors.
   • Analytics failures never interrupt the main application flow.
   • Future events (Schedule, Purchase, CompleteRegistration …) are added here
     without touching any component.

   USAGE
   ─────
     import { trackPageView, trackLead, trackConsultationView, trackCustom }
       from '../utils/metaPixel';

     trackPageView();
     trackConsultationView('Total Knee Replacement');
     trackLead({ consultation_type: 'Gynecomastia', city: 'Kochi', preferred_date: '2026-09-01' });
     trackCustom('DownloadBrochure', { treatment: 'TKR' });
============================================================================= */

/* ── Guard helper ───────────────────────────────────────────────────────────
   Returns true only when window.fbq is a callable function.
   Every exported helper calls this before doing anything.
─────────────────────────────────────────────────────────────────────────── */
function isPixelReady() {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
}

/* ── trackPageView ──────────────────────────────────────────────────────────
   Fires a standard Meta PageView event.
   Called by the SPA route-change tracker on every navigation.

   Meta's base snippet already fires this once on the initial hard load;
   subsequent SPA route changes must be tracked manually — that's what this
   function is for.
─────────────────────────────────────────────────────────────────────────── */
export function trackPageView() {
  try {
    if (!isPixelReady()) return;
    window.fbq('track', 'PageView');
  } catch (_) {
    /* Silently swallow — analytics must never break the app */
  }
}

/* ── trackConsultationView ──────────────────────────────────────────────────
   Fires a ViewContent event when a user lands on a specific consultation page.

   @param {string} contentName  — Human-readable treatment name from the
                                  config's backendConsultationType field.
                                  e.g. "Total Knee Replacement"
─────────────────────────────────────────────────────────────────────────── */
export function trackConsultationView(contentName) {
  try {
    if (!isPixelReady()) return;
    if (!contentName) return;

    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_category: 'Consultation',
    });
  } catch (_) {
    /* Silently swallow */
  }
}

/* ── trackLead ──────────────────────────────────────────────────────────────
   Fires a Lead event after a successful enquiry submission.
   Must ONLY be called after the backend confirms success — never on failure.

   @param {Object} payload
   @param {string} payload.consultation_type  — e.g. "Total Knee Replacement"
   @param {string} [payload.city]             — e.g. "Kochi"
   @param {string} [payload.preferred_date]   — ISO date string
─────────────────────────────────────────────────────────────────────────── */
export function trackLead(payload = {}) {
  try {
    if (!isPixelReady()) return;

    const eventData = {};

    if (payload.consultation_type) {
      eventData.consultation_type = payload.consultation_type;
    }
    if (payload.city) {
      eventData.city = payload.city;
    }
    if (payload.preferred_date) {
      eventData.preferred_date = payload.preferred_date;
    }

    window.fbq('track', 'Lead', eventData);
  } catch (_) {
    /* Silently swallow */
  }
}

/* ── trackContact ───────────────────────────────────────────────────────────
   Fires a Contact event (e.g. from the general contact-us form).
   Ready to use without any component changes.
─────────────────────────────────────────────────────────────────────────── */
export function trackContact(payload = {}) {
  try {
    if (!isPixelReady()) return;
    window.fbq('track', 'Contact', payload);
  } catch (_) {
    /* Silently swallow */
  }
}

/* ── trackSchedule ──────────────────────────────────────────────────────────
   Fires a Schedule event when an appointment is explicitly booked/confirmed.
   Future-ready — call this on a booking confirmation screen.
─────────────────────────────────────────────────────────────────────────── */
export function trackSchedule(payload = {}) {
  try {
    if (!isPixelReady()) return;
    window.fbq('track', 'Schedule', payload);
  } catch (_) {
    /* Silently swallow */
  }
}

/* ── trackCompleteRegistration ──────────────────────────────────────────────
   Fires a CompleteRegistration event (e.g. new patient account created).
   Future-ready.
─────────────────────────────────────────────────────────────────────────── */
export function trackCompleteRegistration(payload = {}) {
  try {
    if (!isPixelReady()) return;
    window.fbq('track', 'CompleteRegistration', payload);
  } catch (_) {
    /* Silently swallow */
  }
}

/* ── trackCustom ────────────────────────────────────────────────────────────
   Fires an arbitrary custom event.
   Use for non-standard events not covered by Meta's standard event list.

   @param {string} eventName  — e.g. "DownloadBrochure", "WatchVideo"
   @param {Object} [data]     — Any additional parameters
─────────────────────────────────────────────────────────────────────────── */
export function trackCustom(eventName, data = {}) {
  try {
    if (!isPixelReady()) return;
    if (!eventName) return;

    window.fbq('trackCustom', eventName, data);
  } catch (_) {
    /* Silently swallow */
  }
}
