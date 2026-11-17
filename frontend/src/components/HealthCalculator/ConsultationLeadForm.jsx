import React, { useState, useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle2, AlertCircle, Shield, Loader2 } from 'lucide-react';
import { submitEnquiry } from '../../api/enquiryApi';
import { trackLead, trackCustom } from '../../utils/metaPixel';

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * ConsultationLeadForm Component (Section 9)
 * Voluntary consultation request form displayed beneath either assessment report.
 * Uses the established FutureAce backend API and Google Sheets integration.
 * Records 'preferredLanguage': 'English' | 'Malayalam'.
 */
export default function ConsultationLeadForm({ result, calculatorType = 'bmi' }) {
  const uid = useId();
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  // Capture UTM parameters silently from URL search params
  const [utm] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return {
        source: params.get('utm_source') || params.get('source') || '',
        medium: params.get('utm_medium') || params.get('medium') || '',
        campaign: params.get('utm_campaign') || params.get('campaign') || '',
        content: params.get('utm_content') || params.get('content') || '',
      };
    } catch {
      return { source: '', medium: '', campaign: '', content: '' };
    }
  });

  const [form, setForm] = useState({
    patientName: '',
    mobile: '',
    email: '',
    privacyConsent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  // Pre-fill contact details if already entered in Metabolic Section A
  useEffect(() => {
    if (result?.personalDetails) {
      setForm((prev) => ({
        ...prev,
        patientName: result.personalDetails.fullName || prev.patientName,
        mobile: result.personalDetails.phone || prev.mobile,
        email: result.personalDetails.email || prev.email,
      }));
    }
  }, [result]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!form.patientName.trim()) {
      errs.patientName = isMl ? 'ദയവായി നിങ്ങളുടെ പൂർണ്ണമായ പേര് നൽകുക.' : 'Please enter your full name.';
    }

    const cleanMobile = form.mobile.replace(/[\s\-+()]/g, '');
    if (!cleanMobile) {
      errs.mobile = isMl ? 'മൊബൈൽ നമ്പർ നൽകേണ്ടതുണ്ട്.' : 'Mobile number is required.';
    } else if (cleanMobile.length === 10 && !INDIAN_MOBILE_REGEX.test(cleanMobile)) {
      errs.mobile = isMl ? 'സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.' : 'Enter a valid 10-digit Indian mobile number (starts with 6–9).';
    } else if (cleanMobile.length < 7 || cleanMobile.length > 15) {
      errs.mobile = isMl ? 'സാധുവായ ഫോൺ നമ്പർ നൽകുക.' : 'Enter a valid phone number (7 to 15 digits).';
    }

    if (form.email.trim() && !EMAIL_REGEX.test(form.email.trim())) {
      errs.email = isMl ? 'ശരിയായ ഇമെയിൽ വിലാസം നൽകുക.' : 'Please enter a valid email address.';
    }

    if (!form.privacyConsent) {
      errs.privacyConsent = isMl
        ? 'തുടർ സേവനത്തിനായി പ്രൈവസി പോളിസിയും നിബന്ധനകളും അംഗീകരിക്കേണ്ടതുണ്ട്.'
        : 'You must agree to the Privacy Policy and Terms & Conditions to request follow-up.';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSubmitting(true);

    try {
      const isMetabolic = calculatorType === 'metabolic_risk' || result?.calculatorType === 'metabolic_risk';
      const cleanMobile = form.mobile.replace(/[\s\-+()]/g, '');

      const height = isMetabolic ? result?.measurements?.heightCm : result?.heightCm;
      const weight = isMetabolic ? result?.measurements?.weightKg : result?.weightKg;
      const age = isMetabolic ? result?.measurements?.age : result?.age;
      const gender = isMetabolic ? result?.measurements?.gender : result?.gender;
      const waist = isMetabolic && result?.measurements?.waistCm ? result.measurements.waistCm : null;

      const selectedLanguage = isMl ? 'Malayalam' : 'English';

      // Construct dynamicFields matching the backend & Google Sheets integration
      const dynamicFields = {
        source: 'health_calculator',
        calculatorType: isMetabolic ? 'metabolic_risk' : 'bmi',
        assessmentType: isMetabolic ? 'Metabolic Risk Assessment' : 'BMI Screening Assessment',
        preferredLanguage: selectedLanguage,
        bmi: result?.bmi ?? null,
        bmiCategory: result?.bmiCategory?.label || result?.category?.label || 'Assessed',
        heightCm: height || null,
        weightKg: weight || null,
        waistCircumferenceCm: waist ? `${waist} cm` : 'Not supplied',
        waistToHeightRatio: result?.wthResult?.ratioFormatted || 'Not calculated',
        selectedConditions: result?.selectedConditions || [],
        riskClassification: isMetabolic
          ? result?.riskClassification?.levelLabel || 'Assessed'
          : result?.category?.label || 'Assessed',
        assessmentSummary: isMetabolic
          ? result?.riskClassification?.summaryText || 'Metabolic Assessment Completed'
          : `Calculated BMI: ${result?.bmi} (${result?.category?.label})`,
      };

      const payload = {
        consultationType: 'Health Calculator Consultation',
        patientName: form.patientName.trim(),
        mobile: cleanMobile,
        email: form.email.trim() || undefined,
        age: age ? Number(age) : undefined,
        gender: gender || undefined,
        city: '',
        preferredDate: '',
        preferredLanguage: selectedLanguage,
        notes: isMetabolic
          ? `User requested consultation follow-up after completing the Metabolic Risk Assessment (Risk Level: ${result?.riskClassification?.levelLabel || 'Standard'}). [Language: ${selectedLanguage}]`
          : `User requested consultation follow-up after completing the BMI Screening Assessment (BMI: ${result?.bmi}). [Language: ${selectedLanguage}]`,
        privacyConsent: true,
        dynamicFields,
        utm: {
          source: utm?.source || '',
          medium: utm?.medium || '',
          campaign: utm?.campaign || '',
          content: utm?.content || '',
        },
      };

      await submitEnquiry(payload);

      // Meta Pixel Lead tracking (fired strictly on confirmed API success)
      try {
        trackLead({
          consultation_type: 'Health Calculator Consultation',
        });
        trackCustom('ConsultationLeadSubmitted', {
          source: 'health_calculator',
          assessment_type: isMetabolic ? 'metabolic_risk' : 'bmi',
          preferred_language: selectedLanguage,
        });
      } catch {
        /* ignore analytics error */
      }

      setSubmitSuccess(true);
    } catch (err) {
      setApiError(
        err.message || t('healthCalculator.leadForm.errorMsg')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div
        className="hc-lead-success-card"
        id="consultation-followup-form"
        role="region"
        aria-label={t('healthCalculator.leadForm.successTitle')}
      >
        <div className="hc-lead-success-icon" aria-hidden="true">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="hc-lead-success-title">{t('healthCalculator.leadForm.successTitle')}</h3>
        <p className="hc-lead-success-text">
          {t('healthCalculator.leadForm.successMsg')}
        </p>
        <div style={{ marginTop: '20px' }}>
          <a
            href="tel:+918589003330"
            className="hc-hero-btn-primary"
            style={{ display: 'inline-flex', padding: '10px 24px', fontSize: '0.95rem', textDecoration: 'none' }}
          >
            <span>{t('common.callDesk')}: +91 85890 03330</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <section
      className="hc-lead-card"
      id="consultation-followup-form"
      aria-label={t('healthCalculator.leadForm.heading')}
    >
      <div className="hc-lead-header">
        <div className="hc-lead-badge">
          <Shield size={16} />
          <span>{isMl ? 'വിദഗ്ദ്ധ ഡോക്ടർ പരിശോധന' : 'Doctor-Guided Next Steps'}</span>
        </div>
        <h3 className="hc-lead-title">{t('healthCalculator.leadForm.heading')}</h3>
        <p className="hc-lead-sub">
          {t('healthCalculator.leadForm.sub')}
        </p>
      </div>

      {apiError && (
        <div className="hc-field-error" style={{ marginBottom: '16px', fontSize: '0.95rem' }} role="alert">
          <AlertCircle size={18} />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="hc-grid-2col">
          {/* Patient Name */}
          <div className="hc-field-group">
            <label htmlFor={`${uid}-lead-name`} className="hc-label">
              <span>
                {t('healthCalculator.leadForm.name')}{' '}
                <span className="hc-required-star" aria-hidden="true">*</span>
              </span>
            </label>
            <input
              id={`${uid}-lead-name`}
              name="patientName"
              type="text"
              autoComplete="name"
              placeholder={isMl ? 'ഉദാ: രാഹുൽ ശർമ്മ' : 'e.g. Rahul Sharma'}
              className={`hc-input ${errors.patientName ? 'has-error' : ''}`}
              value={form.patientName}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.patientName}
              aria-describedby={errors.patientName ? `${uid}-lead-name-err` : undefined}
            />
            {errors.patientName && (
              <div className="hc-field-error" id={`${uid}-lead-name-err`} role="alert">
                <AlertCircle size={14} />
                <span>{errors.patientName}</span>
              </div>
            )}
          </div>

          {/* Mobile Number */}
          <div className="hc-field-group">
            <label htmlFor={`${uid}-lead-mobile`} className="hc-label">
              <span>
                {t('healthCalculator.leadForm.phone')}{' '}
                <span className="hc-required-star" aria-hidden="true">*</span>
              </span>
            </label>
            <input
              id={`${uid}-lead-mobile`}
              name="mobile"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              placeholder="e.g. 9876543210"
              className={`hc-input ${errors.mobile ? 'has-error' : ''}`}
              value={form.mobile}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.mobile}
              aria-describedby={errors.mobile ? `${uid}-lead-mobile-err` : undefined}
            />
            {errors.mobile && (
              <div className="hc-field-error" id={`${uid}-lead-mobile-err`} role="alert">
                <AlertCircle size={14} />
                <span>{errors.mobile}</span>
              </div>
            )}
          </div>

          {/* Email Address */}
          <div className="hc-field-group full-width">
            <label htmlFor={`${uid}-lead-email`} className="hc-label">
              <span>{t('healthCalculator.leadForm.email')}</span>
              <span className="hc-optional-tag">{t('common.optional')}</span>
            </label>
            <input
              id={`${uid}-lead-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. rahul@example.com"
              className={`hc-input ${errors.email ? 'has-error' : ''}`}
              value={form.email}
              onChange={handleChange}
              aria-describedby={errors.email ? `${uid}-lead-email-err` : undefined}
            />
            {errors.email && (
              <div className="hc-field-error" id={`${uid}-lead-email-err`} role="alert">
                <AlertCircle size={14} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Privacy & Terms Consent Checkbox ── */}
        <div style={{ margin: '16px 0 24px' }}>
          <label className="hc-consent-label" htmlFor={`${uid}-lead-consent`}>
            <input
              id={`${uid}-lead-consent`}
              name="privacyConsent"
              type="checkbox"
              className="hc-consent-checkbox"
              checked={form.privacyConsent}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.privacyConsent}
              aria-describedby={errors.privacyConsent ? `${uid}-lead-consent-err` : undefined}
            />
            <span>
              {isMl ? (
                <>
                  ഞാൻ{' '}
                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    പ്രൈവസി പോളിസിയും
                  </Link>{' '}
                  <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    നിബന്ധനകളും
                  </Link>{' '}
                  വായിച്ചു മനസ്സിലാക്കി സമ്മതിക്കുന്നു, കൺസൾട്ടേഷനായി എന്നെ ബന്ധപ്പെടാൻ അനുവാദം നൽകുന്നു.
                </>
              ) : (
                <>
                  I have read and agree to the{' '}
                  <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/terms-conditions" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                    Terms &amp; Conditions
                  </Link>
                  , and I consent to FutureAce Hospital using the information I submit to respond to my consultation request.
                </>
              )}
            </span>
          </label>
          {errors.privacyConsent && (
            <div className="hc-field-error" id={`${uid}-lead-consent-err`} role="alert">
              <AlertCircle size={14} />
              <span>{errors.privacyConsent}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="hc-lead-submit-btn"
          disabled={isSubmitting}
          id="hc-btn-submit-consultation"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>{t('healthCalculator.leadForm.submitting')}</span>
            </>
          ) : (
            <>
              <span>{t('healthCalculator.leadForm.btnSubmit')}</span>
              <Send size={18} />
            </>
          )}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#64748b', marginTop: '12px' }}>
          🔒 {isMl
            ? 'നിങ്ങളുടെ വിവരങ്ങൾ തികച്ചും സുരക്ഷിതമാണ്, കൺസൾട്ടേഷൻ ക്രമീകരിക്കുന്നതിന് മാത്രമായി ഉപയോഗിക്കുന്നു.'
            : 'Your contact details are secure and strictly utilized for consultation scheduling. No medical data is sold or shared.'}
        </p>
      </form>
    </section>
  );
}
