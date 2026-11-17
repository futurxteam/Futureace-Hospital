/* =============================================================================
   VARICOSE VEINS LANDING PAGE — CENTRAL CONFIGURATION
   Route: /varicose-veins-treatment

   Everything that may change without touching component code lives here:
   WhatsApp number/messages, SEO copy, consultation type, gallery images, CTA
   labels and Google Ads conversion identifiers.

   No secrets belong in this file — it ships to the browser.
============================================================================= */

export const VARICOSE_ROUTE = '/varicose-veins-treatment';
export const SITE_ORIGIN = 'https://futureacehospital.com';

const varicoseVeinsConfig = {
  /* Stored in the Google Sheet "Consultation Type" column */
  consultationType: 'Varicose Veins Treatment',

  /* ── WhatsApp ───────────────────────────────────────────────────────────
     Digits only, with country code, no "+" (wa.me format).
     This is the same hospital WhatsApp number already used by the site's
     floating button and appointment form (918589003330 = +91 858 900 3330).
     Change it here and every button on this page updates. */
  whatsappNumber: '918589003330',
  whatsappMessages: {
    hero: 'Hi, I would like to enquire about varicose veins treatment at FutureAce Hospital.',
    midPage: 'Hi, I would like to enquire about varicose veins treatment.',
    floating: 'Hi, I would like to enquire about varicose veins treatment at FutureAce Hospital.',
  },

  /* ── SEO ─────────────────────────────────────────────────────────────── */
  seo: {
    title: 'Varicose Veins Treatment | Book a Consultation | FutureAce Hospital',
    description:
      'Learn about varicose veins, common symptoms and available treatment options. Book a specialist consultation at FutureAce Hospital.',
    canonical: `${SITE_ORIGIN}${VARICOSE_ROUTE}`,
    ogImage: `${SITE_ORIGIN}/varicose%20vein/varicose_vein.jpeg`,
  },

  /* ── Images (existing files in frontend/public/varicose vein/) ──────── */
  images: {
    about: {
      src: '/varicose%20vein/varicose_vein.jpeg',
      width: 2048,
      height: 2560,
      alt: 'Illustration of a leg with visible varicose veins, with information on varicose vein treatment options at FutureAce Hospital',
    },
    beforeAfterPoster: {
      src: '/varicose%20vein/before%20and%20after.jpeg',
      width: 2048,
      height: 2560,
      alt: 'Illustrative before and after comparison of a leg with varicose veins, with treatment options listed by FutureAce Hospital',
    },
  },

  /* ── Approved before / after pairs ──────────────────────────────────────
     The supplied poster is a combined graphic and is shown as an image.
     Add SEPARATE before/after photographs here ONLY after the hospital has
     confirmed they are genuine and patient consent has been recorded.
     The gallery renders an interactive slider for each entry automatically:

     {
       id: 'case-1',
       before: '/varicose%20vein/approved/case-1-before.jpg',
       after:  '/varicose%20vein/approved/case-1-after.jpg',
       beforeAlt: 'Leg before varicose vein treatment',
       afterAlt:  'Leg after varicose vein treatment',
       treatment: 'Short, clinically approved description (optional)',
     }
  */
  approvedGalleryPairs: [],

  /* ── Google Ads (future-ready integration point) ────────────────────────
     Leave blank until the Google Ads account provides real values.
     conversionId   e.g. 'AW-XXXXXXXXX'
     *Label values  e.g. 'AbC-D_efG-h12_34-5' (from the conversion action)
     Conversions only fire after a successful backend submission (lead) or a
     WhatsApp click (secondary). Nothing fires while these are empty. */
  googleAds: {
    conversionId: '',
    leadConversionLabel: '',
    whatsappConversionLabel: '',
  },

  /* ── CTA labels ──────────────────────────────────────────────────────── */
  cta: {
    heroBook: 'BOOK A CONSULTATION',
    heroWhatsApp: 'ENQUIRE ON WHATSAPP',
    midBook: 'BOOK YOUR CONSULTATION',
    midWhatsApp: 'CHAT ON WHATSAPP',
    submit: 'REQUEST A CALLBACK',
  },

  successMessage:
    'Thank you for contacting FutureAce Hospital. Your enquiry has been submitted successfully. Our team will contact you soon.',

  galleryDisclaimer:
    'Treatment outcomes may vary from patient to patient. Individual results depend on clinical condition and treatment approach.',
};

export const LEAD_FORM_ID = 'vv-lead-form';

export default varicoseVeinsConfig;

