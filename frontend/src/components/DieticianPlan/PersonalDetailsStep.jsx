import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, AlertCircle, Info } from 'lucide-react';

/**
 * PersonalDetailsStep Component (Step 1)
 * Collects name, age (>=18 eligibility), sex (male/female), height, weight, mobile, and optional email.
 * Preserves all values when switching language.
 */
export default function PersonalDetailsStep({ form, errors, onChange }) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';
  const isMinor = form.age !== '' && !isNaN(Number(form.age)) && Number(form.age) < 18;

  return (
    <div className="dp-step-content" aria-label={t('dietician.steps.step1')}>
      <div className="dp-step-header">
        <h2 className="dp-step-title">
          <User size={26} style={{ color: '#0e4d3e' }} />
          <span>{isMl ? 'ഘട്ടം 1: നിങ്ങളുടെ വിവരങ്ങൾ' : 'Step 1: Your Personal Details'}</span>
        </h2>
        <p className="dp-step-subtitle">
          {isMl
            ? 'നിങ്ങളുടെ പ്രായത്തിനും ലിംഗത്തിനും അനുയോജ്യമായ ഡയറ്റ് പ്ലാൻ നിശ്ചയിക്കാൻ ഈ വിവരങ്ങൾ ആവശ്യമാണ്.'
            : 'These baseline measurements allow us to identify the appropriate diet plan for your age and sex group.'}
        </p>
      </div>

      <div className="dp-grid-2col">
        {/* Full Name */}
        <div className="dp-field-group">
          <label htmlFor="dp-fullName" className="dp-label">
            <span>
              {t('healthCalculator.metabolic.fullName')}{' '}
              <span className="dp-required-star" aria-hidden="true">*</span>
            </span>
          </label>
          <input
            id="dp-fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder={isMl ? 'ഉദാ: മീര നായർ' : 'e.g. Meera Nair'}
            className={`dp-input ${errors.fullName ? 'has-error' : ''}`}
            value={form.fullName}
            onChange={onChange}
            aria-required="true"
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'dp-fullName-err' : undefined}
          />
          {errors.fullName && (
            <div className="dp-field-error" id="dp-fullName-err" role="alert">
              <AlertCircle size={14} />
              <span>{errors.fullName}</span>
            </div>
          )}
        </div>

        {/* Age */}
        <div className="dp-field-group">
          <label htmlFor="dp-age" className="dp-label">
            <span>
              {t('healthCalculator.bmiForm.ageLabel')}{' '}
              <span className="dp-required-star" aria-hidden="true">*</span>
            </span>
            <span className="dp-optional-tag">{isMl ? '18+ ആയിരിക്കണം' : 'Must be 18+'}</span>
          </label>
          <input
            id="dp-age"
            name="age"
            type="number"
            min="1"
            max="120"
            inputMode="numeric"
            placeholder="e.g. 34"
            className={`dp-input ${errors.age ? 'has-error' : ''}`}
            value={form.age}
            onChange={onChange}
            aria-required="true"
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? 'dp-age-err' : undefined}
          />
          {errors.age && (
            <div className="dp-field-error" id="dp-age-err" role="alert">
              <AlertCircle size={14} />
              <span>{errors.age}</span>
            </div>
          )}
          {isMinor && !errors.age && (
            <div className="dp-field-error" role="alert" style={{ color: '#b45309' }}>
              <Info size={14} />
              <span>
                {isMl
                  ? 'മുതിർന്നവർക്ക് മാത്രമുള്ളതാണ്. 18 വയസ്സിന് താഴെയുള്ളവർ പീഡിയാട്രിക് ഡയറ്റീഷ്യനെ കാണുക.'
                  : 'Adult guidance only. For individuals under 18, please seek clinical pediatric dietary evaluation.'}
              </span>
            </div>
          )}
        </div>

        {/* Sex Selection */}
        <div className="dp-field-group">
          <label className="dp-label" id="dp-sex-label">
            <span>
              {isMl ? 'ലിംഗഭേദം' : 'Sex (for plan matching)'}{' '}
              <span className="dp-required-star" aria-hidden="true">*</span>
            </span>
          </label>
          <div
            className="dp-options-grid"
            style={{ gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '0' }}
            role="radiogroup"
            aria-labelledby="dp-sex-label"
          >
            <label
              className={`dp-option-card ${form.sex === 'male' ? 'selected' : ''}`}
              style={{ padding: '10px 14px' }}
            >
              <input
                type="radio"
                name="sex"
                value="male"
                checked={form.sex === 'male'}
                onChange={onChange}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{t('common.gender.male')}</div>
              </div>
            </label>

            <label
              className={`dp-option-card ${form.sex === 'female' ? 'selected' : ''}`}
              style={{ padding: '10px 14px' }}
            >
              <input
                type="radio"
                name="sex"
                value="female"
                checked={form.sex === 'female'}
                onChange={onChange}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{t('common.gender.female')}</div>
              </div>
            </label>
          </div>
          {errors.sex && (
            <div className="dp-field-error" role="alert">
              <AlertCircle size={14} />
              <span>{errors.sex}</span>
            </div>
          )}
        </div>

        {/* Height in cm */}
        <div className="dp-field-group">
          <label htmlFor="dp-heightCm" className="dp-label">
            <span>
              {t('healthCalculator.bmiForm.heightLabel')}{' '}
              <span className="dp-required-star" aria-hidden="true">*</span>
            </span>
          </label>
          <input
            id="dp-heightCm"
            name="heightCm"
            type="number"
            step="0.5"
            min="50"
            max="250"
            inputMode="decimal"
            placeholder="e.g. 165"
            className={`dp-input ${errors.heightCm ? 'has-error' : ''}`}
            value={form.heightCm}
            onChange={onChange}
            aria-required="true"
            aria-invalid={!!errors.heightCm}
            aria-describedby={errors.heightCm ? 'dp-heightCm-err' : undefined}
          />
          {errors.heightCm && (
            <div className="dp-field-error" id="dp-heightCm-err" role="alert">
              <AlertCircle size={14} />
              <span>{errors.heightCm}</span>
            </div>
          )}
        </div>

        {/* Weight in kg */}
        <div className="dp-field-group">
          <label htmlFor="dp-weightKg" className="dp-label">
            <span>
              {t('healthCalculator.bmiForm.weightLabel')}{' '}
              <span className="dp-required-star" aria-hidden="true">*</span>
            </span>
          </label>
          <input
            id="dp-weightKg"
            name="weightKg"
            type="number"
            step="0.1"
            min="15"
            max="300"
            inputMode="decimal"
            placeholder="e.g. 68.5"
            className={`dp-input ${errors.weightKg ? 'has-error' : ''}`}
            value={form.weightKg}
            onChange={onChange}
            aria-required="true"
            aria-invalid={!!errors.weightKg}
            aria-describedby={errors.weightKg ? 'dp-weightKg-err' : undefined}
          />
          {errors.weightKg && (
            <div className="dp-field-error" id="dp-weightKg-err" role="alert">
              <AlertCircle size={14} />
              <span>{errors.weightKg}</span>
            </div>
          )}
        </div>

        {/* Mobile Number */}
        <div className="dp-field-group">
          <label htmlFor="dp-mobile" className="dp-label">
            <span>
              {t('healthCalculator.metabolic.mobile')}{' '}
              <span className="dp-required-star" aria-hidden="true">*</span>
            </span>
          </label>
          <input
            id="dp-mobile"
            name="mobile"
            type="tel"
            autoComplete="tel"
            inputMode="numeric"
            placeholder="e.g. 9876543210"
            className={`dp-input ${errors.mobile ? 'has-error' : ''}`}
            value={form.mobile}
            onChange={onChange}
            aria-required="true"
            aria-invalid={!!errors.mobile}
            aria-describedby={errors.mobile ? 'dp-mobile-err' : undefined}
          />
          {errors.mobile && (
            <div className="dp-field-error" id="dp-mobile-err" role="alert">
              <AlertCircle size={14} />
              <span>{errors.mobile}</span>
            </div>
          )}
          <span className="dp-field-hint">
            {isMl
              ? 'കൺസൾട്ടേഷൻ വിവരങ്ങൾ അറിയിക്കാൻ ഉപയോഗിക്കുന്നു.'
              : 'Used to verify and communicate your consultation details.'}
          </span>
        </div>

        {/* Email Address */}
        <div className="dp-field-group full-width">
          <label htmlFor="dp-email" className="dp-label">
            <span>{t('healthCalculator.metabolic.email')}</span>
            <span className="dp-optional-tag">{t('common.optional')}</span>
          </label>
          <input
            id="dp-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. meera@example.com"
            className={`dp-input ${errors.email ? 'has-error' : ''}`}
            value={form.email}
            onChange={onChange}
            aria-describedby={errors.email ? 'dp-email-err' : undefined}
          />
          {errors.email && (
            <div className="dp-field-error" id="dp-email-err" role="alert">
              <AlertCircle size={14} />
              <span>{errors.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
