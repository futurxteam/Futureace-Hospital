import React, { useState, useRef, useId } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, Lock, Send } from 'lucide-react';
import varicoseVeinsConfig, { LEAD_FORM_ID, VARICOSE_ROUTE } from '../../config/varicoseVeinsConfig';
import { submitEnquiry } from '../../api/enquiryApi';
import { getAttribution } from '../../utils/campaignAttribution';
import { trackLead } from '../../utils/metaPixel';
import { trackGoogleAdsLead } from '../../utils/googleAds';

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

const INITIAL_FORM = {
  patientName: '',
  mobile: '',
  age: '',
  city: '',
  preferredDate: '',
  notes: '',
  privacyConsent: false, // must be ticked explicitly by the visitor
};

/** Local-time YYYY-MM-DD (toISOString would shift the date in IST mornings). */
function todayISO() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

/** Accepts 10-digit numbers with optional +91 / 91 / 0 prefix; returns 10 digits or null. */
function normaliseMobile(raw) {
  let digits = String(raw || '').replace(/[\s\-().]/g, '');
  if (digits.startsWith('+91')) digits = digits.slice(3);
  else if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return INDIAN_MOBILE_REGEX.test(digits) ? digits : null;
}

export default function VaricoseLeadForm() {
  const uid = useId();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState('');

  /* Synchronous guards — state updates are async, refs are not */
  const submittingRef = useRef(false);
  const leadFiredRef = useRef(false);

  const { consultationType, cta, successMessage, googleAds } = varicoseVeinsConfig;
  const fieldId = (key) => `${uid}-${key}`;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev));
  };

  const validate = () => {
    const next = {};

    if (!form.patientName.trim()) next.patientName = 'Please enter your full name.';

    if (!form.mobile.trim()) next.mobile = 'Please enter your mobile number.';
    else if (!normaliseMobile(form.mobile)) {
      next.mobile = 'Enter a valid 10-digit Indian mobile number (optionally with +91).';
    }

    if (!form.city.trim()) next.city = 'Please enter your location or city.';

    if (form.age !== '') {
      const age = Number(form.age);
      if (!Number.isInteger(age) || age < 1 || age > 120) {
        next.age = 'Enter a valid age between 1 and 120.';
      }
    }

    if (form.preferredDate && form.preferredDate < todayISO()) {
      next.preferredDate = 'Please choose today or a future date.';
    }

    if (!form.privacyConsent) {
      next.privacyConsent = 'Please agree to the Privacy Policy and Terms & Conditions to continue.';
    }

    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current || submitted) return; // duplicate-submit guard

    setApiError('');
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      const firstKey = Object.keys(validation)[0];
      const el = document.getElementById(fieldId(firstKey));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      }
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);

    try {
      const attribution = getAttribution();

      await submitEnquiry({
        consultationType,
        patientName: form.patientName.trim(),
        mobile: normaliseMobile(form.mobile),
        email: '',
        age: form.age === '' ? null : Number(form.age),
        city: form.city.trim(),
        preferredDate: form.preferredDate || '',
        notes: form.notes.trim(),
        dynamicFields: { landingPage: VARICOSE_ROUTE },
        privacyConsent: true,
        attribution,
      });

      /* ── Backend confirmed success ─────────────────────────────────────
         Lead events fire exactly once per successful submission and carry NO
         personal or health data — only the consultation type. */
      if (!leadFiredRef.current) {
        leadFiredRef.current = true;
        trackLead({ consultation_type: consultationType });
        trackGoogleAdsLead(googleAds);
      }

      setSubmitted(true);
      setForm(INITIAL_FORM); // cleared only after confirmed success
    } catch (err) {
      const isNetwork = err instanceof TypeError || err?.name === 'SyntaxError';
      setApiError(
        isNetwork || !err?.message
          ? 'We could not submit your enquiry right now. Please check your connection and try again, or contact us on WhatsApp.'
          : err.message
      );
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const startAnother = () => {
    leadFiredRef.current = false;
    setSubmitted(false);
    setApiError('');
    setErrors({});
  };

  const renderError = (name) =>
    errors[name] ? (
      <p className="vv-field__error" id={`${fieldId(name)}-error`} role="alert">
        <AlertCircle size={14} aria-hidden="true" />
        <span>{errors[name]}</span>
      </p>
    ) : null;

  const describedBy = (name) => (errors[name] ? `${fieldId(name)}-error` : undefined);

  return (
    <section className="vv-section vv-section--form" id={LEAD_FORM_ID} aria-labelledby="vv-form-title">
      <div className="vv-container vv-container--narrow">
        <div className="vv-form-card">
          <h2 id="vv-form-title" className="vv-h2 vv-form-card__title">
            Book Your Varicose Veins Consultation
          </h2>
          <p className="vv-form-card__sub">
            Fill in your details and our team will contact you to assist with your consultation enquiry.
          </p>

          {submitted ? (
            <div className="vv-success" role="status" aria-live="polite">
              <CheckCircle2 size={44} aria-hidden="true" />
              <p>{successMessage}</p>
              <button type="button" className="vv-btn vv-btn--ghost" onClick={startAnother}>
                Submit another enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate aria-label="Varicose veins consultation form">
              {apiError && (
                <div className="vv-form-error" role="alert">
                  <AlertCircle size={18} aria-hidden="true" />
                  <span>{apiError}</span>
                </div>
              )}

              <div className="vv-form-grid">
                <div className="vv-field">
                  <label htmlFor={fieldId('patientName')}>
                    Full Name <span className="vv-req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={fieldId('patientName')}
                    name="patientName"
                    type="text"
                    autoComplete="name"
                    value={form.patientName}
                    onChange={handleChange}
                    className={errors.patientName ? 'has-error' : ''}
                    placeholder="Your full name"
                    maxLength={100}
                    aria-required="true"
                    aria-invalid={!!errors.patientName}
                    aria-describedby={describedBy('patientName')}
                  />
                  {renderError('patientName')}
                </div>

                <div className="vv-field">
                  <label htmlFor={fieldId('mobile')}>
                    Mobile Number <span className="vv-req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={fieldId('mobile')}
                    name="mobile"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.mobile}
                    onChange={handleChange}
                    className={errors.mobile ? 'has-error' : ''}
                    placeholder="e.g. 9876543210 or +91 9876543210"
                    maxLength={16}
                    aria-required="true"
                    aria-invalid={!!errors.mobile}
                    aria-describedby={describedBy('mobile')}
                  />
                  {renderError('mobile')}
                </div>

                <div className="vv-field">
                  <label htmlFor={fieldId('city')}>
                    Location / City <span className="vv-req" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={fieldId('city')}
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={form.city}
                    onChange={handleChange}
                    className={errors.city ? 'has-error' : ''}
                    placeholder="e.g. Kochi"
                    maxLength={100}
                    aria-required="true"
                    aria-invalid={!!errors.city}
                    aria-describedby={describedBy('city')}
                  />
                  {renderError('city')}
                </div>

                <div className="vv-field">
                  <label htmlFor={fieldId('age')}>
                    Age <span className="vv-opt">Optional</span>
                  </label>
                  <input
                    id={fieldId('age')}
                    name="age"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    max="120"
                    value={form.age}
                    onChange={handleChange}
                    className={errors.age ? 'has-error' : ''}
                    placeholder="e.g. 45"
                    aria-invalid={!!errors.age}
                    aria-describedby={describedBy('age')}
                  />
                  {renderError('age')}
                </div>

                <div className="vv-field vv-field--full">
                  <label htmlFor={fieldId('preferredDate')}>
                    Preferred Consultation Date <span className="vv-opt">Optional</span>
                  </label>
                  <input
                    id={fieldId('preferredDate')}
                    name="preferredDate"
                    type="date"
                    min={todayISO()}
                    value={form.preferredDate}
                    onChange={handleChange}
                    className={errors.preferredDate ? 'has-error' : ''}
                    aria-invalid={!!errors.preferredDate}
                    aria-describedby={describedBy('preferredDate')}
                  />
                  {renderError('preferredDate')}
                </div>

                <div className="vv-field vv-field--full">
                  <label htmlFor={fieldId('notes')}>
                    Message / Symptoms <span className="vv-opt">Optional</span>
                  </label>
                  <textarea
                    id={fieldId('notes')}
                    name="notes"
                    rows={4}
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Briefly tell us about your enquiry (no need to share detailed medical history)"
                    maxLength={1000}
                  />
                </div>
              </div>

              <div className="vv-consent">
                <label className={`vv-consent__label ${errors.privacyConsent ? 'has-error' : ''}`}>
                  <input
                    id={fieldId('privacyConsent')}
                    name="privacyConsent"
                    type="checkbox"
                    checked={form.privacyConsent}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.privacyConsent}
                    aria-describedby={describedBy('privacyConsent')}
                  />
                  <span>
                    I have read and agree to the{' '}
                    <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>{' '}
                    and{' '}
                    <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</Link>,
                    and consent to being contacted regarding my enquiry.
                  </span>
                </label>
                {renderError('privacyConsent')}
              </div>

              <button
                type="submit"
                className="vv-btn vv-btn--primary vv-btn--block"
                disabled={submitting}
                aria-busy={submitting}
              >
                {submitting ? (
                  <>
                    <span className="vv-spinner" aria-hidden="true" />
                    <span>SUBMITTING…</span>
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    <span>{cta.submit}</span>
                  </>
                )}
              </button>

              <p className="vv-secure-note">
                <Lock size={14} aria-hidden="true" />
                <span>Your details are used only to respond to your enquiry.</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

