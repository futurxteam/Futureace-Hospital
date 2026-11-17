import React, { useState, useCallback, useId } from 'react';
import { Link } from 'react-router-dom';
import { submitEnquiry } from '../../api/enquiryAPI';
import { trackLead } from '../../utils/metaPixel';

/* ─────────────────────────────────────────────────────────────────────────────
   VALIDATION HELPERS
───────────────────────────────────────────────────────────────────────────── */
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONSULTATION FORM — Campaign Landing Page
   Props:
     config  — one consultation type config object
     utm     — { source, medium, campaign, content }
     onSuccess — callback fired after successful API submission
───────────────────────────────────────────────────────────────────────────── */
export default function ConsultationForm({ config, utm, onSuccess }) {
  const uid = useId(); // stable prefix for all ids on this form instance

  /* ── Form state ──────────────────────────────────────────────────────── */
  const [form, setForm] = useState({
    patientName: '',
    mobile: '',
    email: '',
    age: '',
    city: '',
    preferredDate: '',
    notes: '',
    privacyConsent: false,
  });

  const [dynamicValues, setDynamicValues] = useState(() => {
    const init = {};
    (config?.dynamicFields || []).forEach((f) => { init[f.key] = ''; });
    return init;
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  /* Reset dynamic values when config (type) changes */
  React.useEffect(() => {
    const init = {};
    (config?.dynamicFields || []).forEach((f) => { init[f.key] = ''; });
    setDynamicValues(init);
    setErrors({});
    setApiError('');
  }, [config]);

  /* ── Change handlers ─────────────────────────────────────────────────── */
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }, []);

  const handleDynamic = useCallback((key, value) => {
    setDynamicValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  }, []);

  /* ── Validation ──────────────────────────────────────────────────────── */
  const validate = () => {
    const errs = {};

    /* Patient Name */
    if (!form.patientName.trim()) errs.patientName = 'Patient name is required.';

    /* Mobile — Indian 10-digit starting 6-9 */
    if (!form.mobile.trim()) {
      errs.mobile = 'Mobile number is required.';
    } else if (!INDIAN_MOBILE_REGEX.test(form.mobile.replace(/\s/g, ''))) {
      errs.mobile = 'Enter a valid 10-digit Indian mobile number (starts with 6–9).';
    }

    /* Email — optional, but format-checked if provided */
    if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim())) {
      errs.email = 'Enter a valid email address.';
    }

    /* Age */
    if (form.age !== '') {
      const ageNum = Number(form.age);
      if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
        errs.age = 'Age must be between 1 and 120.';
      }
    }

    /* Preferred Date — must not be in the past */
    if (form.preferredDate) {
      if (form.preferredDate < getTodayISO()) {
        errs.preferredDate = 'Please select a date that is today or in the future.';
      }
    }

    /* Dynamic required fields */
    (config?.dynamicFields || []).forEach((field) => {
      if (field.required && !dynamicValues[field.key]?.trim()) {
        errs[field.key] = `${field.label} is required.`;
      }
    });

    /* Privacy Consent */
    if (!form.privacyConsent) {
      errs.privacyConsent = 'Please read and agree to the Privacy Policy and Terms & Conditions.';
    }

    return errs;
  };

  /* ── Submit ──────────────────────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      /* Scroll to first error field */
      const firstKey = Object.keys(errs)[0];
      const el = document.getElementById(`${uid}-field-${firstKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        consultationType: config.backendConsultationType,
        patientName: form.patientName.trim(),
        mobile: form.mobile.replace(/\s/g, ''),
        email: form.email.trim() || undefined,
        age: form.age ? Number(form.age) : undefined,
        city: form.city.trim() || undefined,
        preferredDate: form.preferredDate || undefined,
        notes: form.notes.trim() || undefined,
        dynamicFields: { ...dynamicValues },
        privacyConsent: true,
        utm: {
          source: utm?.source || '',
          medium: utm?.medium || '',
          campaign: utm?.campaign || '',
          content: utm?.content || '',
        },
      };

      await submitEnquiry(payload);

      /* ── Meta Pixel: Lead ──────────────────────────────────────────────
         Fired ONLY after the backend confirms success. If submitEnquiry() throws,
         execution jumps to the catch block and this line is never reached.
         Wrapped in its own try/catch so an analytics failure cannot prevent
         onSuccess() from running. */
      try {
        trackLead({
          consultation_type: config.backendConsultationType,
          city:              form.city.trim() || undefined,
          preferred_date:    form.preferredDate || undefined,
        });
      } catch (_) {
        /* Analytics errors are swallowed — never block the user flow */
      }

      onSuccess?.();
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Render helpers ──────────────────────────────────────────────────── */
  const fieldId = (key) => `${uid}-field-${key}`;
  const inputId = (key) => `${uid}-input-${key}`;

  const FieldError = ({ name }) =>
    errors[name] ? (
      <div className="bk-field-error" role="alert" id={`${uid}-err-${name}`}>
        <ErrorIcon />
        {errors[name]}
      </div>
    ) : null;

  /* ── Dynamic Field Renderer ──────────────────────────────────────────── */
  const renderDynamicField = (field) => {
    const value = dynamicValues[field.key] ?? '';
    const hasError = !!errors[field.key];

    if (field.type === 'select') {
      return (
        <div key={field.key} className="bk-field-group" id={fieldId(field.key)}>
          <label htmlFor={inputId(field.key)}>
            {field.label}
            {field.required && <span className="bk-required-star" aria-hidden="true">*</span>}
            {!field.required && <span className="bk-optional-tag">Optional</span>}
          </label>
          <div className="bk-select-wrap">
            <select
              id={inputId(field.key)}
              className={`bk-select ${hasError ? 'bk-error' : ''}`}
              value={value}
              onChange={(e) => handleDynamic(field.key, e.target.value)}
              aria-describedby={hasError ? `${uid}-err-${field.key}` : undefined}
            >
              <option value="">— Select an option —</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
          <FieldError name={field.key} />
        </div>
      );
    }

    if (field.type === 'radio') {
      return (
        <div key={field.key} className="bk-field-group" id={fieldId(field.key)}>
          <label as="span">
            {field.label}
            {field.required && <span className="bk-required-star" aria-hidden="true">*</span>}
            {!field.required && <span className="bk-optional-tag">Optional</span>}
          </label>
          <div className="bk-radio-group" role="radiogroup" aria-label={field.label}>
            {field.options.map((opt) => (
              <label key={opt} className="bk-radio-label">
                <input
                  type="radio"
                  name={`dynamic-${field.key}`}
                  value={opt}
                  checked={value === opt}
                  onChange={() => handleDynamic(field.key, opt)}
                  aria-describedby={hasError ? `${uid}-err-${field.key}` : undefined}
                />
                <span className="bk-radio-pill">{opt}</span>
              </label>
            ))}
          </div>
          <FieldError name={field.key} />
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.key} className="bk-field-group" id={fieldId(field.key)}>
          <label htmlFor={inputId(field.key)}>
            {field.label}
            {field.required && <span className="bk-required-star" aria-hidden="true">*</span>}
            {!field.required && <span className="bk-optional-tag">Optional</span>}
          </label>
          <textarea
            id={inputId(field.key)}
            className={`bk-textarea ${hasError ? 'bk-error' : ''}`}
            placeholder={field.placeholder || ''}
            value={value}
            onChange={(e) => handleDynamic(field.key, e.target.value)}
            aria-describedby={hasError ? `${uid}-err-${field.key}` : undefined}
          />
          <FieldError name={field.key} />
        </div>
      );
    }

    /* Default: text */
    return (
      <div key={field.key} className="bk-field-group" id={fieldId(field.key)}>
        <label htmlFor={inputId(field.key)}>
          {field.label}
          {field.required && <span className="bk-required-star" aria-hidden="true">*</span>}
          {!field.required && <span className="bk-optional-tag">Optional</span>}
        </label>
        <input
          id={inputId(field.key)}
          type="text"
          className={`bk-input ${hasError ? 'bk-error' : ''}`}
          placeholder={field.placeholder || ''}
          value={value}
          onChange={(e) => handleDynamic(field.key, e.target.value)}
          aria-describedby={hasError ? `${uid}-err-${field.key}` : undefined}
        />
        <FieldError name={field.key} />
      </div>
    );
  };

  /* ────────────────────────────────────────────────────────────────────── */
  return (
    <div className="bk-form-card" role="main">
      <h2 className="bk-form-card-title">Request Your Consultation</h2>
      <p className="bk-form-card-sub">
        Fields marked <span aria-hidden="true">*</span> are required. We'll contact you within 24 hours.
      </p>

      {/* API Error Banner */}
      {apiError && (
        <div className="bk-form-error-banner" role="alert">
          <ErrorIcon />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label="Consultation request form">

        {/* ── Row: Patient Name + Mobile ─────────────────────────────── */}
        <div className="bk-row">
          <div className="bk-field-group" id={fieldId('patientName')}>
            <label htmlFor={inputId('patientName')}>
              Patient Name <span className="bk-required-star" aria-hidden="true">*</span>
            </label>
            <input
              id={inputId('patientName')}
              name="patientName"
              type="text"
              autoComplete="name"
              className={`bk-input ${errors.patientName ? 'bk-error' : ''}`}
              placeholder="e.g. Rahul Sharma"
              value={form.patientName}
              onChange={handleChange}
              aria-required="true"
              aria-describedby={errors.patientName ? `${uid}-err-patientName` : undefined}
            />
            <FieldError name="patientName" />
          </div>

          <div className="bk-field-group" id={fieldId('mobile')}>
            <label htmlFor={inputId('mobile')}>
              Mobile Number <span className="bk-required-star" aria-hidden="true">*</span>
            </label>
            <input
              id={inputId('mobile')}
              name="mobile"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              className={`bk-input ${errors.mobile ? 'bk-error' : ''}`}
              placeholder="e.g. 9876543210"
              value={form.mobile}
              onChange={handleChange}
              aria-required="true"
              aria-describedby={errors.mobile ? `${uid}-err-mobile` : undefined}
            />
            <FieldError name="mobile" />
          </div>
        </div>

        {/* ── Row: Email + Age ───────────────────────────────────────── */}
        <div className="bk-row">
          <div className="bk-field-group" id={fieldId('email')}>
            <label htmlFor={inputId('email')}>
              Email Address <span className="bk-optional-tag">Optional</span>
            </label>
            <input
              id={inputId('email')}
              name="email"
              type="email"
              autoComplete="email"
              className={`bk-input ${errors.email ? 'bk-error' : ''}`}
              placeholder="e.g. rahul@example.com"
              value={form.email}
              onChange={handleChange}
              aria-describedby={errors.email ? `${uid}-err-email` : undefined}
            />
            <FieldError name="email" />
          </div>

          <div className="bk-field-group" id={fieldId('age')}>
            <label htmlFor={inputId('age')}>
              Age <span className="bk-optional-tag">Optional</span>
            </label>
            <input
              id={inputId('age')}
              name="age"
              type="number"
              min="1"
              max="120"
              inputMode="numeric"
              className={`bk-input ${errors.age ? 'bk-error' : ''}`}
              placeholder="e.g. 45"
              value={form.age}
              onChange={handleChange}
              aria-describedby={errors.age ? `${uid}-err-age` : undefined}
            />
            <FieldError name="age" />
          </div>
        </div>

        {/* ── Row: City + Preferred Date ─────────────────────────────── */}
        <div className="bk-row">
          <div className="bk-field-group" id={fieldId('city')}>
            <label htmlFor={inputId('city')}>
              City <span className="bk-optional-tag">Optional</span>
            </label>
            <input
              id={inputId('city')}
              name="city"
              type="text"
              autoComplete="address-level2"
              className={`bk-input ${errors.city ? 'bk-error' : ''}`}
              placeholder="e.g. Kochi"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="bk-field-group" id={fieldId('preferredDate')}>
            <label htmlFor={inputId('preferredDate')}>
              Preferred Date <span className="bk-optional-tag">Optional</span>
            </label>
            <input
              id={inputId('preferredDate')}
              name="preferredDate"
              type="date"
              min={getTodayISO()}
              className={`bk-input ${errors.preferredDate ? 'bk-error' : ''}`}
              value={form.preferredDate}
              onChange={handleChange}
              aria-describedby={errors.preferredDate ? `${uid}-err-preferredDate` : undefined}
            />
            <FieldError name="preferredDate" />
          </div>
        </div>

        {/* ── Dynamic Fields (type-specific) ──────────────────── */}
        {config?.dynamicFields?.length > 0 && (
          <>
            <div className="bk-section-divider" aria-hidden="true">
              {config.department} Details
            </div>
            {config.dynamicFields.map(renderDynamicField)}
          </>
        )}

        {/* ── Additional Notes ───────────────────────────────────────── */}
        <div className="bk-section-divider" aria-hidden="true">Additional Information</div>

        <div className="bk-field-group" id={fieldId('notes')}>
          <label htmlFor={inputId('notes')}>
            Additional Notes <span className="bk-optional-tag">Optional</span>
          </label>
          <textarea
            id={inputId('notes')}
            name="notes"
            className="bk-textarea"
            placeholder="Any additional information, concerns, or questions you'd like to share with our team."
            value={form.notes}
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* ── Privacy & Terms Consent Checkbox ── */}
        <div className="bk-field-group" id={fieldId('privacyConsent')}>
          <label
            className={`bk-consent-label ${errors.privacyConsent ? 'bk-error-border' : ''}`}
            htmlFor={inputId('privacyConsent')}
          >
            <input
              id={inputId('privacyConsent')}
              name="privacyConsent"
              type="checkbox"
              className="bk-consent-checkbox"
              checked={form.privacyConsent}
              onChange={handleChange}
              aria-required="true"
              aria-describedby={errors.privacyConsent ? `${uid}-err-privacyConsent` : undefined}
            />
            <span className="bk-consent-text">
              I have read and agree to the{' '}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer">
                Terms &amp; Conditions
              </Link>.
            </span>
          </label>
          <FieldError name="privacyConsent" />
        </div>

        {/* ── Submit ────────────────────────────────────────────────── */}
        <div className="bk-submit-wrap">
          <button
            type="submit"
            className="bk-submit-btn"
            disabled={submitting}
            id="bk-submit-consultation"
            aria-busy={submitting}
          >
            {submitting ? (
              <>
                <span className="bk-btn-spinner" aria-hidden="true" />
                Submitting…
              </>
            ) : (
              <>
                Request Consultation
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </>
            )}
          </button>
          <p className="bk-submit-note">
            🔒 Your information is secure and confidential. We never share your data.
          </p>
        </div>

      </form>
    </div>
  );
}

/* ── Error icon ─────────────────────────────────────────────────────────── */
function ErrorIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
