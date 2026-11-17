/* =============================================================================
   CAMPAIGN ATTRIBUTION  —  src/utils/campaignAttribution.js
   =============================================================================
   Captures UTM parameters, landing page and referrer when a visitor arrives
   from a paid campaign and keeps them for the rest of the browser session, so
   attribution survives reading the page, in-page navigation and slow form
   completion.

   • Stored in sessionStorage only (cleared when the tab closes).
   • New UTM parameters in the URL replace previously stored values.
   • Referrer / landing page are captured once per session (first touch).
   • Contains no personal or health information.
============================================================================= */

const STORAGE_KEY = 'fa_campaign_attribution';

const EMPTY = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmContent: '',
  utmTerm: '',
  landingPage: '',
  referrer: '',
};

function readStored() {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : null;
  } catch {
    return null;
  }
}

function writeStored(value) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable (private mode) — attribution simply isn't persisted */
  }
}

/**
 * Reads the current URL, merges with anything stored this session and returns
 * the attribution object. Safe to call repeatedly.
 */
export function captureAttribution() {
  if (typeof window === 'undefined') return { ...EMPTY };

  const params = new URLSearchParams(window.location.search);
  const fromUrl = {
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
  };
  const hasUrlUtm = Object.values(fromUrl).some(Boolean);

  const stored = readStored();
  const merged = {
    ...EMPTY,
    ...(stored || {}),
    ...(hasUrlUtm ? fromUrl : {}),
  };

  /* First touch: remember where the visitor landed and who referred them */
  if (!stored) {
    merged.landingPage = `${window.location.origin}${window.location.pathname}${window.location.search}`;
    merged.referrer = document.referrer || '';
  }

  writeStored(merged);
  return merged;
}

/** Returns stored attribution (capturing it first if nothing is stored yet). */
export function getAttribution() {
  return readStored() || captureAttribution();
}

