/* ─────────────────────────────────────────────────────────────────────────────
   CONSULTATION TYPES — Master Configuration
   ─────────────────────────────────────────────────────────────────────────────
   To add a new consultation type:
     1. Add a new key to the CONSULTATION_TYPES object below.
     2. Fill in all required fields (see TYPE SHAPE below).
     3. That's it. No component changes needed.

   TYPE SHAPE
   ─────────────────────────────────────────────────────────────────────────────
   {
     title:                  string  — Hero h1 title
     subtitle:               string  — Hero subtitle paragraph
     department:             string  — Department badge text
     seoTitle:               string  — <title> tag value
     seoDescription:         string  — <meta name="description"> value
     backendConsultationType:string  — Value sent as `consultationType` to the API
     successTitle:           string  — Bold heading in the success modal
     successMessage:         string  — Body text in the success modal
     dynamicFields:          Array   — Extra fields injected below common fields
   }

   DYNAMIC FIELD SHAPE
   ─────────────────────────────────────────────────────────────────────────────
   {
     key:      string  — camelCase identifier used as form field key & payload key
     label:    string  — Field label text
     type:     'text' | 'select' | 'radio' | 'textarea'
     options:  string[] (only for 'select' and 'radio')
     required: boolean
     placeholder?: string (for text / textarea)
   }
───────────────────────────────────────────────────────────────────────────── */

const CONSULTATION_TYPES = {

  /* ── 1. Total Knee Replacement ─────────────────────────────────────────── */
  tkr: {
    title: 'Book a Knee Replacement Consultation',
    subtitle:
      'Are knee pain and stiffness affecting your daily life? Our orthopedic specialists are here to help you find the right treatment plan.',
    department: 'Orthopedics',
    seoTitle: 'Book Knee Replacement Consultation | FutureAce Hospital',
    seoDescription:
      'Schedule a consultation with our expert orthopedic specialists for Total Knee Replacement surgery at FutureAce Hospital, Kochi.',
    backendConsultationType: 'Total Knee Replacement',
    successTitle: 'Thank you!',
    successMessage:
      'Your enquiry has been received. Our Orthopedic Care Team will contact you shortly to schedule your consultation.',
    dynamicFields: [
      {
        key: 'affectedKnee',
        label: 'Which knee is affected?',
        type: 'radio',
        options: ['Left', 'Right', 'Both'],
        required: true,
      },
      {
        key: 'painDuration',
        label: 'How long have you been experiencing knee pain?',
        type: 'text',
        placeholder: 'e.g. 6 months, 2 years',
        required: false,
      },
    ],
  },

  /* ── 2. Gynecomastia ───────────────────────────────────────────────────── */
  gynecomastia: {
    title: 'Book a Confidential Consultation',
    subtitle:
      'Concerned about enlarged male chest? Speak with our experienced plastic surgeons for a confidential assessment.',
    department: 'Plastic Surgery',
    seoTitle: 'Book Gynecomastia Consultation | FutureAce Hospital',
    seoDescription:
      'Confidential gynecomastia consultation with expert plastic surgeons at FutureAce Hospital. Private, professional care.',
    backendConsultationType: 'Gynecomastia',
    successTitle: 'Thank you!',
    successMessage:
      'Your enquiry has been submitted successfully. Our Plastic Surgery Team will contact you soon. All enquiries remain completely confidential.',
    dynamicFields: [
      {
        key: 'conditionDuration',
        label: 'How long have you noticed the condition?',
        type: 'text',
        placeholder: 'e.g. 3 months, 1 year',
        required: false,
      },
      {
        key: 'previousTreatment',
        label: 'Have you received any previous treatment?',
        type: 'select',
        options: ['No', 'Yes — Medication', 'Yes — Surgery', 'Yes — Other'],
        required: false,
      },
    ],
  },

  /* ── 3. Adenoid / ENT ──────────────────────────────────────────────────── */
  adenoid: {
    title: 'Book an ENT Consultation',
    subtitle:
      'Persistent snoring, mouth breathing or frequent throat infections? Our ENT specialists are ready to help.',
    department: 'ENT',
    seoTitle: 'Book ENT Consultation | FutureAce Hospital',
    seoDescription:
      'Book an ENT consultation for snoring, adenoids, ear infections and throat problems at FutureAce Hospital, Kochi.',
    backendConsultationType: 'Adenoid',
    successTitle: 'Thank you!',
    successMessage:
      'Our ENT team will contact you shortly to assist with your appointment.',
    dynamicFields: [
      {
        key: 'guardianName',
        label: 'Parent / Guardian Name (if patient is a child)',
        type: 'text',
        placeholder: 'e.g. Priya Nair',
        required: false,
      },
      {
        key: 'primaryConcern',
        label: 'Primary Concern',
        type: 'select',
        options: [
          'Snoring',
          'Mouth Breathing',
          'Recurrent Ear Infection',
          'Frequent Cold',
          'Hearing Problem',
          'Other',
        ],
        required: true,
      },
    ],
  },

  /* ── 4. Circumcision ───────────────────────────────────────────────────── */
  circumcision: {
    title: 'Book a Private Consultation',
    subtitle:
      'Get expert advice on laser circumcision and other treatment options in a safe and confidential environment.',
    department: 'General Surgery',
    seoTitle: 'Book Circumcision Consultation | FutureAce Hospital',
    seoDescription:
      'Book a private, confidential circumcision consultation with experienced general surgeons at FutureAce Hospital.',
    backendConsultationType: 'Circumcision',
    successTitle: 'Thank you!',
    successMessage:
      'Our surgical care team will contact you soon. Your information will remain confidential.',
    dynamicFields: [
      {
        key: 'reasonForConsultation',
        label: 'Reason for Consultation',
        type: 'select',
        options: ['Phimosis', 'Recurrent Infection', 'Pain', 'Hygiene', 'Other'],
        required: true,
      },
    ],
  },

  /* ── 5. Aesthetics ─────────────────────────────────────────────────────── */
  aesthetics: {
    title: 'Book Your Aesthetic Consultation',
    subtitle:
      'Enhance your confidence with personalized aesthetic treatments from our expert specialists.',
    department: 'Aesthetic Surgery',
    seoTitle: 'Book Aesthetic Consultation | FutureAce Hospital',
    seoDescription:
      'Book your personalized aesthetic consultation at FutureAce Hospital. Expert care for rhinoplasty, liposuction, hair transplant and more.',
    backendConsultationType: 'Aesthetics',
    successTitle: "Thank you!",
    successMessage:
      "We've received your enquiry. Our Aesthetic Care Team will contact you shortly to help you book your consultation.",
    dynamicFields: [
      {
        key: 'interestedTreatment',
        label: 'Interested Treatment',
        type: 'select',
        options: [
          'Rhinoplasty',
          'Liposuction',
          'Tummy Tuck',
          'Gynecomastia',
          'Breast Surgery',
          'Hair Transplant',
          'Skin Treatments',
          'Botox',
          'Fillers',
          'Other',
        ],
        required: true,
      },
    ],
  },
};

/* ── Generic fallback (no ?type= supplied) ───────────────────────────────── */
export const GENERIC_TYPE = {
  title: 'Book a Consultation',
  subtitle:
    'Speak with our expert specialists for personalized medical advice and care. We are here to help you on your journey to better health.',
  department: 'General Medicine',
  seoTitle: 'Book a Consultation | FutureAce Hospital',
  seoDescription:
    'Schedule a medical consultation with expert specialists at FutureAce Hospital, Kochi. Personalized, compassionate care.',
  backendConsultationType: 'General Consultation',
  successTitle: 'Thank you!',
  successMessage:
    'Your enquiry has been received. Our team will contact you shortly to schedule your consultation.',
  dynamicFields: [],
};

/* ── Lookup helper ──────────────────────────────────────────────────────── */
export function getConsultationConfig(type) {
  if (!type) return GENERIC_TYPE;
  return CONSULTATION_TYPES[type.toLowerCase()] || GENERIC_TYPE;
}

export default CONSULTATION_TYPES;
