import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────────────────────────
   FORMSUBMIT ENDPOINT — replace with verified email if needed
───────────────────────────────────────────────────────────── */
const FORM_ACTION = 'https://formsubmit.co/console@futureacehospital.com';
const SUCCESS_REDIRECT = `${window.location.origin}/consultation-success`;

/* ── Allowed file extensions ─────────────────── */
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const ALLOWED_EXT_LABEL = 'PDF, JPG, JPEG, PNG';

/* ── Simple phone regex (10-15 digits, optional +) ── */
const PHONE_REGEX = /^\+?[0-9]{7,15}$/;

/* ── Initial form state ──────────────────────── */
const INITIAL_STATE = {
  fullName: '',
  age: '',
  gender: '',
  mobile: '',
  description: '',
  consent: false,
};

/* ─────────────────────────────────────────────────────────────
   CONSULTATION FORM COMPONENT
───────────────────────────────────────────────────────────── */
export default function ConsultationForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [dragging, setDragging] = useState(false);

  /* Hidden UTM fields — read from URL query params */
  const [utm] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('source') || params.get('utm_source') || 'Website',
      medium: params.get('medium') || params.get('utm_medium') || '',
      campaign: params.get('campaign') || params.get('utm_campaign') || '',
      content: params.get('content') || params.get('utm_content') || '',
    };
  });

  const hiddenFormRef = useRef(null);
  const fileInputRef = useRef(null);

  /* ── Field change handler ──────────────────── */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /* ── File handling ─────────────────────────── */
  const validateFiles = (incoming) => {
    const valid = [];
    const msgs = [];
    incoming.forEach((f) => {
      if (ALLOWED_TYPES.includes(f.type)) {
        valid.push(f);
      } else {
        msgs.push(`"${f.name}" is not a supported format.`);
      }
    });
    if (msgs.length) setErrors((prev) => ({ ...prev, files: msgs.join(' ') }));
    else setErrors((prev) => ({ ...prev, files: '' }));
    return valid;  
  };

  const addFiles = (incoming) => {
    const valid = validateFiles([...incoming]);
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size));
      return [...prev, ...valid.filter((f) => !existing.has(f.name + f.size))];
    });
  };

  const handleFileChange = (e) => addFiles([...e.target.files]);
  const removeFile = (idx) => setFiles((prev) => prev.filter((_, i) => i !== idx));

  /* Drag-and-drop */
  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => { e.preventDefault(); setDragging(false); addFiles([...e.dataTransfer.files]); };

  /* ── Validation ────────────────────────────── */
  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!form.age || isNaN(form.age) || Number(form.age) < 1 || Number(form.age) > 120) {
      newErrors.age = 'Please enter a valid age between 1 and 120.';
    }
    if (!form.gender) newErrors.gender = 'Please select your gender.';
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required.';
    } else if (!PHONE_REGEX.test(form.mobile.replace(/\s/g, ''))) {
      newErrors.mobile = 'Enter a valid phone number (7–15 digits).';
    }
    if (!form.description.trim()) newErrors.description = 'Please describe your health concern.';
    if (!form.consent) newErrors.consent = 'Please read and agree to the Privacy Policy and Terms & Conditions.';
    return newErrors;
  };

  /* ── Submit ────────────────────────────────── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      /* Scroll to first error */
      const firstKey = Object.keys(validation)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);

    /*
      Submit via the native HTML form reference so that
      FormSubmit receives standard multipart/form-data
      (which also supports file attachments).
    */
    if (hiddenFormRef.current) {
      /* Sync file input */
      const dataTransfer = new DataTransfer();
      files.forEach((f) => dataTransfer.items.add(f));
      const fileInput = hiddenFormRef.current.querySelector('input[name="Medical Reports"]');
      if (fileInput) fileInput.files = dataTransfer.files;

      hiddenFormRef.current.submit();
    }
  };

  /* ── Render ────────────────────────────────── */
  return (
    <>
      {/* ── Visible UI form (controls UX/validation) ── */}
      <div className="consult-form-card">
        <h2 className="form-section-title">Tell Us About Yourself</h2>
        <p className="form-section-sub">
          All fields marked with <span style={{ color: '#ef4444' }}>*</span> are required.
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {/* ── Row: Full Name + Age ── */}
          <div className="consult-row">
            {/* Full Name */}
            <div className="consult-field-group" id="field-fullName">
              <label htmlFor="fullName">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                className={`consult-input ${errors.fullName ? 'error' : ''}`}
                placeholder="e.g. Rahul Sharma"
                value={form.fullName}
                onChange={handleChange}
              />
              {errors.fullName && (
                <div className="field-error">
                  <ErrorIcon /> {errors.fullName}
                </div>
              )}
            </div>

            {/* Age */}
            <div className="consult-field-group" id="field-age">
              <label htmlFor="age">
                Age <span className="required-star">*</span>
              </label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="120"
                className={`consult-input ${errors.age ? 'error' : ''}`}
                placeholder="e.g. 35"
                value={form.age}
                onChange={handleChange}
              />
              {errors.age && (
                <div className="field-error">
                  <ErrorIcon /> {errors.age}
                </div>
              )}
            </div>
          </div>

          {/* ── Gender ── */}
          <div className="consult-field-group" id="field-gender">
            <label>
              Gender <span className="required-star">*</span>
            </label>
            <div className="gender-options">
              {[
                { value: 'Male', icon: '♂️' },
                { value: 'Female', icon: '♀️' },
                { value: 'Other', icon: '⚧️' },
              ].map(({ value, icon }) => (
                <label key={value} className="gender-radio">
                  <input
                    type="radio"
                    name="gender"
                    value={value}
                    checked={form.gender === value}
                    onChange={handleChange}
                  />
                  <span className="gender-label">
                    <span className="gender-icon">{icon}</span>
                    {value}
                  </span>
                </label>
              ))}
            </div>
            {errors.gender && (
              <div className="field-error" style={{ marginTop: '10px' }}>
                <ErrorIcon /> {errors.gender}
              </div>
            )}
          </div>

          {/* ── Mobile Number ── */}
          <div className="consult-field-group" id="field-mobile">
            <label htmlFor="mobile">
              Mobile Number <span className="required-star">*</span>
            </label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              autoComplete="tel"
              className={`consult-input ${errors.mobile ? 'error' : ''}`}
              placeholder="e.g. +91 98765 43210"
              value={form.mobile}
              onChange={handleChange}
            />
            {errors.mobile && (
              <div className="field-error">
                <ErrorIcon /> {errors.mobile}
              </div>
            )}
          </div>

          {/* ── Description ── */}
          <div className="consult-field-group" id="field-description">
            <label htmlFor="description">
              How Can We Help You Today? <span className="required-star">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`consult-textarea ${errors.description ? 'error' : ''}`}
              placeholder="Please tell us about your symptoms, health concern, or the reason you'd like to consult with our specialists."
              value={form.description}
              onChange={handleChange}
            />
            {errors.description && (
              <div className="field-error">
                <ErrorIcon /> {errors.description}
              </div>
            )}
          </div>

          {/* ── File Upload ── */}
          <div className="consult-field-group" id="field-files">
            <label>
              Medical Reports
              <span className="optional-tag">Optional</span>
            </label>
            <div
              className={`file-upload-zone ${dragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <span className="upload-icon">📋</span>
              <p className="upload-title">Drag & drop files here, or click to browse</p>
              <p className="upload-hint">
                Accepted formats: <strong>{ALLOWED_EXT_LABEL}</strong> — Max 10 MB each
              </p>
            </div>

            {errors.files && (
              <div className="field-error" style={{ marginTop: '8px' }}>
                <ErrorIcon /> {errors.files}
              </div>
            )}

            {files.length > 0 && (
              <div className="file-list">
                {files.map((f, i) => (
                  <div key={i} className="file-chip">
                    <div className="file-chip-name">
                      <span>📄</span>
                      <span title={f.name}>{f.name}</span>
                      <span style={{ color: '#b0bec5', fontSize: '0.74rem' }}>
                        ({(f.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      className="file-chip-remove"
                      aria-label={`Remove ${f.name}`}
                      onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Consent ── */}
          <div className="consult-field-group" id="field-consent">
            <label
              className={`consent-label ${errors.consent ? 'error-border' : ''}`}
              htmlFor="consent"
            >
              <input
                id="consent"
                name="consent"
                type="checkbox"
                className="consent-checkbox"
                checked={form.consent}
                onChange={handleChange}
              />
              <span className="consent-text">
                I have read and agree to the{' '}
                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#00b4d8', textDecoration: 'underline' }}>
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer" style={{ color: '#00b4d8', textDecoration: 'underline' }}>
                  Terms &amp; Conditions
                </Link>.
              </span>
            </label>
            {errors.consent && (
              <div className="field-error" style={{ marginTop: '8px' }}>
                <ErrorIcon /> {errors.consent}
              </div>
            )}
          </div>

          {/* ── Submit ── */}
          <div className="consult-submit-wrap">
            <button
              type="submit"
              className="consult-submit-btn"
              disabled={submitting}
              id="submit-consultation"
            >
              {submitting ? (
                <>
                  <span className="btn-spinner" />
                  Submitting Request…
                </>
              ) : (
                <>
                  Send Consultation Request
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
            <p style={{ marginTop: '14px', fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center' }}>
              🔒 Your information is encrypted and secure. We never sell your data.
            </p>
          </div>

        </form>
      </div>

      {/* ── Hidden native form submitted to FormSubmit ── */}
      <form
        ref={hiddenFormRef}
        action={FORM_ACTION}
        method="POST"
        encType="multipart/form-data"
        style={{ display: 'none' }}
      >
        {/* Visible fields */}
        <input type="hidden" name="Full Name" value={form.fullName} />
        <input type="hidden" name="Age" value={form.age} />
        <input type="hidden" name="Gender" value={form.gender} />
        <input type="hidden" name="Mobile Number" value={form.mobile} />
        <input type="hidden" name="Health Concern" value={form.description} />
        <input type="hidden" name="Privacy Consent" value="Agreed (Privacy Policy & Terms)" />

        {/* FormSubmit meta */}
        <input type="hidden" name="_subject" value="🏥 New Consultation Request — FutureAce Hospital" />
        <input type="hidden" name="_next" value={SUCCESS_REDIRECT} />
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_autoresponse" value="Thank you for reaching out to FutureAce Hospital. We have received your consultation request and our team will contact you shortly." />

        {/* Campaign tracking */}
        <input type="hidden" name="Source" value={utm.source} />
        {utm.medium && <input type="hidden" name="Medium" value={utm.medium} />}
        {utm.campaign && <input type="hidden" name="Campaign" value={utm.campaign} />}
        {utm.content && <input type="hidden" name="Ad Content" value={utm.content} />}
        <input type="hidden" name="Project" value="FutureAce Hospital Portfolio" />

        {/* Honeypot spam protection */}
        <input type="text" name="_honey" style={{ display: 'none' }} />

        {/* File attachment field */}
        <input type="file" name="Medical Reports" multiple accept=".pdf,.jpg,.jpeg,.png" />
      </form>
    </>
  );
}

/* ── Tiny inline error icon ──────────────────── */
function ErrorIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
