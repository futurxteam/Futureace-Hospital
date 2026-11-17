import React, { useState, useId } from 'react';
import { useTranslation } from 'react-i18next';
import { Scale, RotateCcw, ArrowRight, AlertCircle } from 'lucide-react';
import { calculateBMI } from '../../utils/healthCalculations';
import { trackCustom } from '../../utils/metaPixel';

/**
 * BMICalculator Component (Section 5)
 * Standalone, frontend-only calculation with South Asian screening standards.
 * Fully translated in English and Malayalam, preserving input data across language changes.
 */
export default function BMICalculator({ onCalculateResult, onResetResult, onInputChange }) {
  const uid = useId();
  const { t } = useTranslation();

  const [heightCm, setHeightCm] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};

    // Height validation
    if (!heightCm || String(heightCm).trim() === '') {
      errs.height = t('healthCalculator.bmiForm.valHeightReq');
    } else {
      const h = parseFloat(heightCm);
      if (isNaN(h)) {
        errs.height = t('healthCalculator.bmiForm.valHeightNum');
      } else if (h <= 0) {
        errs.height = t('healthCalculator.bmiForm.valHeightPositive');
      } else if (h < 50 || h > 250) {
        errs.height = t('healthCalculator.bmiForm.valHeightRange');
      }
    }

    // Weight validation
    if (!weightKg || String(weightKg).trim() === '') {
      errs.weight = t('healthCalculator.bmiForm.valWeightReq');
    } else {
      const w = parseFloat(weightKg);
      if (isNaN(w)) {
        errs.weight = t('healthCalculator.bmiForm.valWeightNum');
      } else if (w <= 0) {
        errs.weight = t('healthCalculator.bmiForm.valWeightPositive');
      } else if (w < 15 || w > 300) {
        errs.weight = t('healthCalculator.bmiForm.valWeightRange');
      }
    }

    // Optional Age validation
    if (age !== '' && age !== undefined) {
      const a = parseInt(age, 10);
      if (isNaN(a) || a < 1 || a > 120) {
        errs.age = t('healthCalculator.bmiForm.valAgeRange');
      }
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});

    const calc = calculateBMI({
      weightKg,
      heightCm,
      age: age ? parseInt(age, 10) : null,
      gender: gender || null,
    });

    if (!calc.success) {
      setErrors({ form: calc.error });
      return;
    }

    // Track analytics event (no personal health data sent)
    try {
      trackCustom('CalculatorCompleted', { tool: 'BMI' });
    } catch {
      /* ignore analytics error */
    }

    onCalculateResult(calc);
  };

  const handleReset = () => {
    setHeightCm('');
    setWeightKg('');
    setAge('');
    setGender('');
    setErrors({});
    if (onResetResult) onResetResult();
  };

  return (
    <div className="hc-form-container" id="bmi-calculator-card" aria-label={t('healthCalculator.bmiForm.bannerTitle')}>
      {/* Dark Green Section Banner */}
      <div className="hc-form-section-banner">
        <div className="hc-form-section-icon" aria-hidden="true">
          <Scale size={20} />
        </div>
        <div>
          <h2 className="hc-form-section-title">{t('healthCalculator.bmiForm.bannerTitle')}</h2>
          <p className="hc-form-section-sub">
            {t('healthCalculator.bmiForm.bannerSub')}
          </p>
        </div>
      </div>

      <div className="hc-form-body">
        {errors.form && (
          <div className="hc-field-error" style={{ marginBottom: '16px', fontSize: '0.95rem' }}>
            <AlertCircle size={16} />
            <span>{errors.form}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* ── Required Measurements ── */}
          <div className="hc-grid-2col">
            {/* Height (cm) */}
            <div className="hc-field-group">
              <label htmlFor={`${uid}-height`} className="hc-label">
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
                  id={`${uid}-height`}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  placeholder="e.g. 170"
                  className={`hc-input ${errors.height ? 'has-error' : ''}`}
                  value={heightCm}
                  onChange={(e) => {
                    setHeightCm(e.target.value);
                    if (errors.height) setErrors((prev) => ({ ...prev, height: '' }));
                    if (onInputChange) onInputChange();
                  }}
                  aria-required="true"
                  aria-invalid={!!errors.height}
                  aria-describedby={errors.height ? `${uid}-height-err` : undefined}
                />
                <span className="hc-input-unit">{t('common.units.cm')}</span>
              </div>
              {errors.height && (
                <div className="hc-field-error" id={`${uid}-height-err`} role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.height}</span>
                </div>
              )}
            </div>

            {/* Weight (kg) */}
            <div className="hc-field-group">
              <label htmlFor={`${uid}-weight`} className="hc-label">
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
                  id={`${uid}-weight`}
                  type="number"
                  step="any"
                  inputMode="decimal"
                  placeholder="e.g. 68"
                  className={`hc-input ${errors.weight ? 'has-error' : ''}`}
                  value={weightKg}
                  onChange={(e) => {
                    setWeightKg(e.target.value);
                    if (errors.weight) setErrors((prev) => ({ ...prev, weight: '' }));
                    if (onInputChange) onInputChange();
                  }}
                  aria-required="true"
                  aria-invalid={!!errors.weight}
                  aria-describedby={errors.weight ? `${uid}-weight-err` : undefined}
                />
                <span className="hc-input-unit">{t('common.units.kg')}</span>
              </div>
              {errors.weight && (
                <div className="hc-field-error" id={`${uid}-weight-err`} role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.weight}</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Optional Contextual Fields ── */}
          <div className="hc-form-section-divider">
            <span className="hc-form-section-divider-title">
              {t('healthCalculator.bmiForm.contextualDetails')}
            </span>
            <span className="hc-optional-tag">{t('common.optional')}</span>
          </div>

          <div className="hc-grid-2col">
            {/* Age */}
            <div className="hc-field-group">
              <label htmlFor={`${uid}-age`} className="hc-label">
                <span>{t('healthCalculator.bmiForm.ageLabel')}</span>
                <span className="hc-optional-tag">{t('common.optional')}</span>
              </label>
              <div className="hc-input-wrap">
                <input
                  id={`${uid}-age`}
                  type="number"
                  min="1"
                  max="120"
                  inputMode="numeric"
                  placeholder="e.g. 35"
                  className={`hc-input ${errors.age ? 'has-error' : ''}`}
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
                    if (onInputChange) onInputChange();
                  }}
                  aria-describedby={errors.age ? `${uid}-age-err` : undefined}
                />
                <span className="hc-input-unit">{t('common.units.yrs')}</span>
              </div>
              <p className="hc-field-helper">
                {t('healthCalculator.bmiForm.ageHelper')}
              </p>
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
                <span className="hc-optional-tag">{t('common.optional')}</span>
              </label>
              <div className="hc-radio-group" role="radiogroup" aria-label={t('common.gender.label')}>
                <label className={`hc-radio-pill ${gender === 'male' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={`${uid}-gender`}
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => {
                      setGender('male');
                      if (onInputChange) onInputChange();
                    }}
                  />
                  <span>{t('common.gender.male')}</span>
                </label>
                <label className={`hc-radio-pill ${gender === 'female' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={`${uid}-gender`}
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => {
                      setGender('female');
                      if (onInputChange) onInputChange();
                    }}
                  />
                  <span>{t('common.gender.female')}</span>
                </label>
                <label className={`hc-radio-pill ${gender === 'prefer-not-to-say' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name={`${uid}-gender`}
                    value="prefer-not-to-say"
                    checked={gender === 'prefer-not-to-say'}
                    onChange={() => {
                      setGender('prefer-not-to-say');
                      if (onInputChange) onInputChange();
                    }}
                  />
                  <span>{t('common.gender.preferNotToSay')}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Prominent Full-Width Orange Button */}
          <div className="hc-calc-btn-wrap">
            <button
              type="submit"
              className="hc-calc-btn"
              id="hc-btn-calculate-bmi"
            >
              <span>{t('healthCalculator.bmiForm.calculateBtn')}</span>
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
              <span>{t('healthCalculator.bmiForm.resetBtn')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
