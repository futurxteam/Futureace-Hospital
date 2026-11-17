import React, { useState, useId } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  HeartPulse,
  User,
  RotateCcw,
  ArrowRight,
  AlertCircle,
  Check,
  Info,
} from 'lucide-react';
import {
  calculateMetabolicRisk,
  EXISTING_CONDITIONS_LIST,
  MUTUALLY_EXCLUSIVE_OPTIONS,
} from '../../utils/healthCalculations';
import { trackCustom } from '../../utils/metaPixel';

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * MetabolicRiskCalculator Component (Section 6)
 * Multi-section assessment referencing the supplied clinical form design.
 * Warm light theme, dark green banners, checkbox cards, prominent orange button.
 * Preserves all inputs across language transitions.
 */
export default function MetabolicRiskCalculator({
  onCalculateResult,
  onResetResult,
  onInputChange,
  prefilledContact = null,
}) {
  const uid = useId();
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  // Section A: Personal Details (Optional for report personalization / follow-up)
  const [personalDetails, setPersonalDetails] = useState({
    fullName: prefilledContact?.patientName || '',
    phone: prefilledContact?.mobile || '',
    email: prefilledContact?.email || '',
  });

  // Section B: Clinical Measurements
  const [measurements, setMeasurements] = useState({
    age: '',
    gender: 'male', // 'male' | 'female' | 'prefer-not-to-say'
    weightKg: '',
    heightCm: '',
    waistCm: '',
  });

  // Section C: Existing Conditions
  const [selectedConditions, setSelectedConditions] = useState([]);

  // Errors & UI state
  const [errors, setErrors] = useState({});

  // ── Input Handlers ──
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (onInputChange) onInputChange();
  };

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (onInputChange) onInputChange();
  };

  // ── Mutually Exclusive Checkbox Handler ──
  const handleConditionToggle = (condition) => {
    if (onInputChange) onInputChange();
    setSelectedConditions((prev) => {
      // If toggling 'None of the above'
      if (condition === MUTUALLY_EXCLUSIVE_OPTIONS.NONE) {
        if (prev.includes(MUTUALLY_EXCLUSIVE_OPTIONS.NONE)) {
          return [];
        }
        return [MUTUALLY_EXCLUSIVE_OPTIONS.NONE];
      }

      // If toggling 'Prefer not to say'
      if (condition === MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY) {
        if (prev.includes(MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY)) {
          return [];
        }
        return [MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY];
      }

      // If toggling any specific condition
      const cleanPrev = prev.filter(
        (c) =>
          c !== MUTUALLY_EXCLUSIVE_OPTIONS.NONE &&
          c !== MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY
      );

      if (cleanPrev.includes(condition)) {
        return cleanPrev.filter((c) => c !== condition);
      }
      return [...cleanPrev, condition];
    });
  };

  // ── Validation ──
  const validate = () => {
    const errs = {};

    // Age is required for metabolic evaluation
    if (!measurements.age || String(measurements.age).trim() === '') {
      errs.age = isMl ? 'മെറ്റബോളിക് അസസ്മെന്റിന് പ്രായം രേഖപ്പെടുത്തേണ്ടതുണ്ട്.' : 'Age is required for metabolic assessment.';
    } else {
      const a = parseInt(measurements.age, 10);
      if (isNaN(a) || a < 1 || a > 120) {
        errs.age = t('healthCalculator.bmiForm.valAgeRange');
      }
    }

    // Height
    if (!measurements.heightCm || String(measurements.heightCm).trim() === '') {
      errs.heightCm = t('healthCalculator.bmiForm.valHeightReq');
    } else {
      const h = parseFloat(measurements.heightCm);
      if (isNaN(h) || h <= 0) {
        errs.heightCm = t('healthCalculator.bmiForm.valHeightPositive');
      } else if (h < 50 || h > 250) {
        errs.heightCm = t('healthCalculator.bmiForm.valHeightRange');
      }
    }

    // Weight
    if (!measurements.weightKg || String(measurements.weightKg).trim() === '') {
      errs.weightKg = t('healthCalculator.bmiForm.valWeightReq');
    } else {
      const w = parseFloat(measurements.weightKg);
      if (isNaN(w) || w <= 0) {
        errs.weightKg = t('healthCalculator.bmiForm.valWeightPositive');
      } else if (w < 15 || w > 300) {
        errs.weightKg = t('healthCalculator.bmiForm.valWeightRange');
      }
    }

    // Waist circumference (optional, but validated if provided)
    if (measurements.waistCm && String(measurements.waistCm).trim() !== '') {
      const wc = parseFloat(measurements.waistCm);
      if (isNaN(wc) || wc <= 0) {
        errs.waistCm = isMl ? 'അരക്കെട്ടിന്റെ അളവ് കൃത്യമായ സംഖ്യയായിരിക്കണം.' : 'Waist circumference must be a positive number.';
      } else if (wc < 30 || wc > 200) {
        errs.waistCm = t('healthCalculator.metabolic.valWaistRange');
      }
    }

    // Optional phone validation if user chose to type it in Section A
    if (personalDetails.phone.trim()) {
      const digitsOnly = personalDetails.phone.replace(/[\s\-+()]/g, '');
      if (digitsOnly.length === 10 && !INDIAN_MOBILE_REGEX.test(digitsOnly)) {
        errs.phone = isMl ? 'സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ രേഖപ്പെടുത്തുക.' : 'Please enter a valid 10-digit mobile number.';
      } else if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        errs.phone = isMl ? 'ശരിയായ ഫോൺ നമ്പർ രേഖപ്പെടുത്തുക.' : 'Please enter a valid phone number format.';
      }
    }

    // Optional email validation if typed
    if (personalDetails.email.trim() && !EMAIL_REGEX.test(personalDetails.email.trim())) {
      errs.email = t('healthCalculator.metabolic.valEmail');
    }

    return errs;
  };

  // ── Calculation ──
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});

    const result = calculateMetabolicRisk({
      personalDetails,
      measurements,
      selectedConditions,
    });

    if (!result.success) {
      setErrors({ form: result.error });
      return;
    }

    // Track analytics event (no personal medical data)
    try {
      trackCustom('CalculatorCompleted', { tool: 'Metabolic' });
    } catch {
      /* ignore analytics error */
    }

    onCalculateResult(result);
  };

  const handleReset = () => {
    setPersonalDetails({ fullName: '', phone: '', email: '' });
    setMeasurements({ age: '', gender: 'male', weightKg: '', heightCm: '', waistCm: '' });
    setSelectedConditions([]);
    setErrors({});
    if (onResetResult) onResetResult();
  };

  const conditionLabels = {
    'Type 2 Diabetes': t('healthCalculator.metabolic.conditions.diabetes'),
    'High Blood Pressure': t('healthCalculator.metabolic.conditions.hypertension'),
    'PCOD / PCOS': t('healthCalculator.metabolic.conditions.pcod'),
    'Fatty Liver': t('healthCalculator.metabolic.conditions.fattyLiver'),
    'High Triglycerides': t('healthCalculator.metabolic.conditions.triglycerides'),
    'Thyroid Disorder': t('healthCalculator.metabolic.conditions.thyroid'),
  };

  return (
    <div className="hc-form-container" id="metabolic-calculator-card" aria-label={t('healthCalculator.metabolic.bannerTitle')}>
      {/* Dark Green Banner Header */}
      <div className="hc-form-section-banner">
        <div className="hc-form-section-icon" aria-hidden="true">
          <HeartPulse size={20} />
        </div>
        <div>
          <h2 className="hc-form-section-title">{t('healthCalculator.metabolic.bannerTitle')}</h2>
          <p className="hc-form-section-sub">
            {t('healthCalculator.metabolic.bannerSub')}
          </p>
        </div>
      </div>

      <div className="hc-form-body">
        <form onSubmit={handleSubmit} noValidate>
          {/* ============================================================
              SECTION A: PERSONAL DETAILS
             ============================================================ */}
          <div className="hc-form-section-divider" style={{ marginTop: 0 }}>
            <span className="hc-form-section-divider-title">
              <User size={18} /> {t('healthCalculator.metabolic.secA')}
            </span>
            <span className="hc-optional-tag">{t('common.optional')}</span>
          </div>
          <p className="hc-field-helper" style={{ marginBottom: '16px' }}>
            {t('healthCalculator.metabolic.secASub')}
          </p>

          <div className="hc-grid-2col">
            {/* Full Name */}
            <div className="hc-field-group">
              <label htmlFor={`${uid}-fullName`} className="hc-label">
                <span>{t('healthCalculator.metabolic.fullName')}</span>
                <span className="hc-optional-tag">{t('common.optional')}</span>
              </label>
              <input
                id={`${uid}-fullName`}
                name="fullName"
                type="text"
                autoComplete="name"
                placeholder={isMl ? 'ഉദാ: രാഹുൽ ശർമ്മ' : 'e.g. Rahul Sharma'}
                className="hc-input"
                value={personalDetails.fullName}
                onChange={handlePersonalChange}
              />
            </div>

            {/* Phone */}
            <div className="hc-field-group">
              <label htmlFor={`${uid}-phone`} className="hc-label">
                <span>{t('healthCalculator.metabolic.mobile')}</span>
                <span className="hc-optional-tag">{t('common.optional')}</span>
              </label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="e.g. 9876543210"
                className={`hc-input ${errors.phone ? 'has-error' : ''}`}
                value={personalDetails.phone}
                onChange={handlePersonalChange}
              />
              {errors.phone && (
                <div className="hc-field-error" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.phone}</span>
                </div>
              )}
            </div>

            {/* Email Address */}
            <div className="hc-field-group full-width">
              <label htmlFor={`${uid}-email`} className="hc-label">
                <span>{t('healthCalculator.metabolic.email')}</span>
                <span className="hc-optional-tag">{t('common.optional')}</span>
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="e.g. rahul@example.com"
                className={`hc-input ${errors.email ? 'has-error' : ''}`}
                value={personalDetails.email}
                onChange={handlePersonalChange}
              />
              {errors.email && (
                <div className="hc-field-error" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================
              SECTION B: CLINICAL MEASUREMENTS
             ============================================================ */}
          <div className="hc-form-section-divider">
            <span className="hc-form-section-divider-title">
              <Activity size={18} /> {t('healthCalculator.metabolic.secB')}
            </span>
          </div>

          <div className="hc-grid-2col">
            {/* Age in Years */}
            <div className="hc-field-group">
              <label htmlFor={`${uid}-age`} className="hc-label">
                <span>
                  {t('healthCalculator.bmiForm.ageLabel')}{' '}
                  <span className="hc-required-star" aria-hidden="true">*</span>
                </span>
                <span className="hc-optional-tag" style={{ background: '#ecfdf5', color: '#047857' }}>
                  {t('common.required')}
                </span>
              </label>
              <div className="hc-input-wrap">
                <input
                  id={`${uid}-age`}
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  inputMode="numeric"
                  placeholder="e.g. 42"
                  className={`hc-input ${errors.age ? 'has-error' : ''}`}
                  value={measurements.age}
                  onChange={handleMeasurementChange}
                  aria-required="true"
                  aria-describedby={errors.age ? `${uid}-age-err` : undefined}
                />
                <span className="hc-input-unit">{t('common.units.yrs')}</span>
              </div>
              {errors.age && (
                <div className="hc-field-error" id={`${uid}-age-err`} role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.age}</span>
                </div>
              )}
            </div>

            {/* Gender */}
            <div className="hc-field-group">
              <label className="hc-label">
                <span>{t('common.gender.label')}</span>
              </label>
              <div className="hc-radio-group" role="radiogroup" aria-label={t('common.gender.label')}>
                <label className={`hc-radio-pill ${measurements.gender === 'male' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={`${uid}-calc-gender`}
                    value="male"
                    checked={measurements.gender === 'male'}
                    onChange={() => {
                      setMeasurements((prev) => ({ ...prev, gender: 'male' }));
                      if (onInputChange) onInputChange();
                    }}
                  />
                  <span>{t('common.gender.male')}</span>
                </label>
                <label className={`hc-radio-pill ${measurements.gender === 'female' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={`${uid}-calc-gender`}
                    value="female"
                    checked={measurements.gender === 'female'}
                    onChange={() => {
                      setMeasurements((prev) => ({ ...prev, gender: 'female' }));
                      if (onInputChange) onInputChange();
                    }}
                  />
                  <span>{t('common.gender.female')}</span>
                </label>
                <label className={`hc-radio-pill ${measurements.gender === 'prefer-not-to-say' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={`${uid}-calc-gender`}
                    value="prefer-not-to-say"
                    checked={measurements.gender === 'prefer-not-to-say'}
                    onChange={() => {
                      setMeasurements((prev) => ({ ...prev, gender: 'prefer-not-to-say' }));
                      if (onInputChange) onInputChange();
                    }}
                  />
                  <span>{t('common.gender.preferNotToSay')}</span>
                </label>
              </div>
            </div>

            {/* Weight (kg) */}
            <div className="hc-field-group">
              <label htmlFor={`${uid}-weightKg`} className="hc-label">
                <span>
                  {t('healthCalculator.bmiForm.weightLabel')}{' '}
                  <span className="hc-required-star" aria-hidden="true">*</span>
                </span>
                <span className="hc-optional-tag" style={{ background: '#ecfdf5', color: '#047857' }}>
                  {t('common.required')}
                </span>
              </label>
              <div className="hc-input-wrap">
                <input
                  id={`${uid}-weightKg`}
                  name="weightKg"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  placeholder="e.g. 74"
                  className={`hc-input ${errors.weightKg ? 'has-error' : ''}`}
                  value={measurements.weightKg}
                  onChange={handleMeasurementChange}
                  aria-required="true"
                  aria-describedby={errors.weightKg ? `${uid}-weightKg-err` : undefined}
                />
                <span className="hc-input-unit">{t('common.units.kg')}</span>
              </div>
              {errors.weightKg && (
                <div className="hc-field-error" id={`${uid}-weightKg-err`} role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.weightKg}</span>
                </div>
              )}
            </div>

            {/* Height (cm) */}
            <div className="hc-field-group">
              <label htmlFor={`${uid}-heightCm`} className="hc-label">
                <span>
                  {t('healthCalculator.bmiForm.heightLabel')}{' '}
                  <span className="hc-required-star" aria-hidden="true">*</span>
                </span>
                <span className="hc-optional-tag" style={{ background: '#ecfdf5', color: '#047857' }}>
                  {t('common.required')}
                </span>
              </label>
              <div className="hc-input-wrap">
                <input
                  id={`${uid}-heightCm`}
                  name="heightCm"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  placeholder="e.g. 172"
                  className={`hc-input ${errors.heightCm ? 'has-error' : ''}`}
                  value={measurements.heightCm}
                  onChange={handleMeasurementChange}
                  aria-required="true"
                  aria-describedby={errors.heightCm ? `${uid}-heightCm-err` : undefined}
                />
                <span className="hc-input-unit">{t('common.units.cm')}</span>
              </div>
              {errors.heightCm && (
                <div className="hc-field-error" id={`${uid}-heightCm-err`} role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.heightCm}</span>
                </div>
              )}
            </div>

            {/* Waist Circumference (Optional) */}
            <div className="hc-field-group full-width">
              <label htmlFor={`${uid}-waistCm`} className="hc-label">
                <span>{t('healthCalculator.metabolic.waistLabel')}</span>
                <span className="hc-optional-tag">{t('common.optional')}</span>
              </label>
              <div className="hc-input-wrap">
                <input
                  id={`${uid}-waistCm`}
                  name="waistCm"
                  type="number"
                  step="any"
                  inputMode="decimal"
                  placeholder="e.g. 86"
                  className={`hc-input ${errors.waistCm ? 'has-error' : ''}`}
                  value={measurements.waistCm}
                  onChange={handleMeasurementChange}
                  aria-describedby={`${uid}-waist-guide`}
                />
                <span className="hc-input-unit">{t('common.units.cm')}</span>
              </div>
              <p className="hc-field-helper" id={`${uid}-waist-guide`}>
                <Info size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-2px' }} />
                {t('healthCalculator.metabolic.waistHelper')}
              </p>
              {errors.waistCm && (
                <div className="hc-field-error" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.waistCm}</span>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================
              SECTION C: EXISTING CONDITIONS (Checkbox Cards)
             ============================================================ */}
          <div className="hc-form-section-divider">
            <span className="hc-form-section-divider-title">
              {t('healthCalculator.metabolic.secC')}
            </span>
            <span className="hc-optional-tag">{t('common.optional')}</span>
          </div>
          <p className="hc-field-helper" style={{ marginBottom: '14px' }}>
            {t('healthCalculator.metabolic.secCSub')}
          </p>

          <fieldset className="hc-checkbox-grid" aria-label={t('healthCalculator.metabolic.secC')}>
            {EXISTING_CONDITIONS_LIST.map((condition) => {
              const isChecked = selectedConditions.includes(condition);
              const labelText = conditionLabels[condition] || condition;
              return (
                <label
                  key={condition}
                  className={`hc-checkbox-card ${isChecked ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleConditionToggle(condition)}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  />
                  <div className="hc-checkbox-box" aria-hidden="true">
                    {isChecked && <Check size={14} strokeWidth={3} />}
                  </div>
                  <span className="hc-checkbox-label">{labelText}</span>
                </label>
              );
            })}

            {/* Mutually Exclusive: None of the above */}
            <label
              className={`hc-checkbox-card ${
                selectedConditions.includes(MUTUALLY_EXCLUSIVE_OPTIONS.NONE) ? 'checked' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={selectedConditions.includes(MUTUALLY_EXCLUSIVE_OPTIONS.NONE)}
                onChange={() => handleConditionToggle(MUTUALLY_EXCLUSIVE_OPTIONS.NONE)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <div className="hc-checkbox-box" aria-hidden="true">
                {selectedConditions.includes(MUTUALLY_EXCLUSIVE_OPTIONS.NONE) && (
                  <Check size={14} strokeWidth={3} />
                )}
              </div>
              <span className="hc-checkbox-label" style={{ fontWeight: 600 }}>
                {t('healthCalculator.metabolic.conditions.none')}
              </span>
            </label>

            {/* Mutually Exclusive: Prefer not to say */}
            <label
              className={`hc-checkbox-card ${
                selectedConditions.includes(MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY) ? 'checked' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={selectedConditions.includes(MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY)}
                onChange={() => handleConditionToggle(MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY)}
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <div className="hc-checkbox-box" aria-hidden="true">
                {selectedConditions.includes(MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY) && (
                  <Check size={14} strokeWidth={3} />
                )}
              </div>
              <span className="hc-checkbox-label">
                {t('healthCalculator.metabolic.conditions.preferNot')}
              </span>
            </label>
          </fieldset>

          {/* ============================================================
              SECTION D: CALCULATE BUTTON (Prominent Full-Width Orange)
             ============================================================ */}
          <div className="hc-calc-btn-wrap">
            <button
              type="submit"
              className="hc-calc-btn"
              id="hc-btn-calculate-metabolic"
            >
              <span>{t('healthCalculator.metabolic.calculateBtn')}</span>
              <ArrowRight size={20} />
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: '14px' }}>
            <button
              type="button"
              className="hc-form-reset-btn"
              onClick={handleReset}
            >
              <RotateCcw size={14} />
              <span>{t('common.reset')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
