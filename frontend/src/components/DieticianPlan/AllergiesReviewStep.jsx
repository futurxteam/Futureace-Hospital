import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, AlertCircle, AlertTriangle, CheckSquare, Eye } from 'lucide-react';

/**
 * AllergiesReviewStep Component (Step 6)
 * Question 10: Food allergies or intolerances (mutual exclusivity enforced).
 * Complete review of all entered details + explicit Privacy Policy and Terms consent checkbox.
 */
export default function AllergiesReviewStep({
  form,
  answers,
  errors,
  onAnswerChange,
  onFormChange,
  onNavigateToStep,
}) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  const allergyOptions = [
    {
      value: 'Milk or milk products',
      label: t('dietician.q10.opt1'),
      desc: t('dietician.q10.opt1Desc'),
    },
    {
      value: 'Wheat or gluten-containing foods',
      label: t('dietician.q10.opt2'),
      desc: t('dietician.q10.opt2Desc'),
    },
    {
      value: 'Certain pulses or legumes',
      label: t('dietician.q10.opt3'),
      desc: t('dietician.q10.opt3Desc'),
    },
    {
      value: 'Seafood or other foods',
      label: t('dietician.q10.opt4'),
      desc: t('dietician.q10.opt4Desc'),
    },
    {
      value: 'None known',
      label: t('dietician.q10.opt5'),
      desc: t('dietician.q10.opt5Desc'),
    },
  ];

  const currentAllergies = Array.isArray(answers.foodAllergies)
    ? answers.foodAllergies
    : answers.foodAllergies ? [answers.foodAllergies] : [];

  const handleAllergyToggle = (value) => {
    let updated;
    const NONE_KNOWN = 'None known';

    if (value === NONE_KNOWN) {
      updated = [NONE_KNOWN];
      onAnswerChange('allergyDetails', '');
    } else {
      const withoutNone = currentAllergies.filter((a) => a !== NONE_KNOWN);
      if (withoutNone.includes(value)) {
        updated = withoutNone.filter((a) => a !== value);
      } else {
        updated = [...withoutNone, value];
      }
    }

    onAnswerChange('foodAllergies', updated);
  };

  const hasSpecificAllergy = currentAllergies.some((a) => a !== 'None known');

  return (
    <div className="dp-step-content" aria-label={t('dietician.steps.step6')}>
      <div className="dp-step-header">
        <h2 className="dp-step-title">
          <ShieldCheck size={26} style={{ color: '#0e4d3e' }} />
          <span>{isMl ? 'ഘട്ടം 6: അലർജികളും വിവര പരിശോധനയും' : 'Step 6: Allergies & Final Review'}</span>
        </h2>
        <p className="dp-step-subtitle">
          {isMl
            ? 'നിങ്ങൾക്കായുള്ള ഭക്ഷണക്രമം തയ്യാറാക്കുന്നതിന് മുൻപ് എല്ലാ വിവരങ്ങളും ഒരിക്കൽ കൂടി പരിശോധിക്കുക.'
            : 'Ensure all potential dietary exclusions are recorded before generating your personalized meal plan.'}
        </p>
      </div>

      {/* QUESTION 10 */}
      <div className="dp-field-group">
        <label className="dp-label" id="dp-q10-label">
          <span>
            {t('dietician.q10.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="group" aria-labelledby="dp-q10-label">
          {allergyOptions.map((opt) => {
            const isChecked = currentAllergies.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`dp-option-card ${isChecked ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  name="foodAllergies"
                  value={opt.value}
                  checked={isChecked}
                  onChange={() => handleAllergyToggle(opt.value)}
                  className="dp-option-checkbox"
                />
                <div className="dp-option-content">
                  <div className="dp-option-title">{opt.label}</div>
                  <div className="dp-option-desc">{opt.desc}</div>
                </div>
              </label>
            );
          })}
        </div>
        {errors.foodAllergies && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.foodAllergies}</span>
          </div>
        )}
      </div>

      {/* Optional details for specific allergies */}
      {hasSpecificAllergy && (
        <div className="dp-field-group" style={{ marginTop: '12px' }}>
          <label htmlFor="dp-allergyDetails" className="dp-label">
            <span>{isMl ? 'അലർജിയെക്കുറിച്ചുള്ള കൂടുതൽ വിവരങ്ങൾ (ഐച്ഛികം)' : 'Specify allergy details or trigger foods (Optional)'}</span>
            <span className="dp-optional-tag">{t('common.optional')}</span>
          </label>
          <input
            id="dp-allergyDetails"
            name="allergyDetails"
            type="text"
            placeholder={t('dietician.q10.allergyPlaceholder')}
            className="dp-input"
            value={answers.allergyDetails || ''}
            onChange={(e) => onAnswerChange('allergyDetails', e.target.value)}
          />
          <span className="dp-field-hint">
            {isMl
              ? 'അലർജിയുണ്ടാക്കുന്ന ഭക്ഷണങ്ങൾ നിങ്ങളുടെ ഡയറ്റിൽ നിന്ന് ഒഴിവാക്കപ്പെടും.'
              : 'Identified trigger ingredients will be filtered from your meal options.'}
          </span>
        </div>
      )}

      {hasSpecificAllergy && (
        <div className="dp-notice-card alert" style={{ margin: '16px 0 24px' }}>
          <AlertTriangle size={20} className="dp-notice-icon" />
          <div style={{ fontSize: '0.86rem' }}>
            <strong>{isMl ? 'അലർജി മുന്നറിയിപ്പ്:' : 'Allergy Safety Warning:'}</strong>{' '}
            {isMl
              ? 'ഗുരുതരമായ അലർജിയുണ്ടാക്കുന്ന ഭക്ഷണങ്ങൾ പൂർണ്ണമായും ഒഴിവാക്കുക. കൃത്യമായ നിർദ്ദേശങ്ങൾക്കായി ക്ലിനിക്കൽ ഡയറ്റീഷ്യനുമായി സംസാരിക്കുക.'
              : 'Never consume foods containing an ingredient to which you have an allergy or anaphylactic response. While our automated filters exclude flagged items, cross-contamination or culinary variations can occur. Always verify recipe ingredients with your kitchen or a clinical dietitian.'}
          </div>
        </div>
      )}

      {/* ── SUMMARY REVIEW OF ALL ENTERED ANSWERS ── */}
      <div className="dp-review-summary">
        <div className="dp-review-title">
          <Eye size={18} style={{ color: '#0077b6' }} />
          <span>{t('dietician.review.title')}</span>
        </div>

        <div className="dp-review-grid">
          <div className="dp-review-row">
            <span className="dp-review-row-label">{isMl ? 'പേരും ലിംഗവും:' : 'Full Name & Sex:'}</span>
            <span className="dp-review-row-value">
              {form.fullName || '—'} ({form.sex ? (form.sex === 'male' ? t('common.gender.male') : t('common.gender.female')) : '—'})
            </span>
          </div>

          <div className="dp-review-row">
            <span className="dp-review-row-label">{isMl ? 'പ്രായം, ഉയരം, ഭാരം:' : 'Age, Height & Weight:'}</span>
            <span className="dp-review-row-value">
              {form.age || '—'} {t('common.units.yrs')} | {form.heightCm || '—'} {t('common.units.cm')} | {form.weightKg || '—'} {t('common.units.kg')}
            </span>
          </div>

          <div className="dp-review-row">
            <span className="dp-review-row-label">{isMl ? 'മൊബൈൽ നമ്പർ:' : 'Contact Mobile:'}</span>
            <span className="dp-review-row-value">{form.mobile || '—'}</span>
          </div>

          <div className="dp-review-row">
            <span className="dp-review-row-label">{isMl ? 'ഭക്ഷണ താല്പര്യം:' : 'Food Preference:'}</span>
            <span className="dp-review-row-value">{answers.foodPreference || '—'}</span>
          </div>

          <div className="dp-review-row">
            <span className="dp-review-row-label">{isMl ? 'പ്രധാന ലക്ഷ്യം:' : 'Primary Goal:'}</span>
            <span className="dp-review-row-value">{answers.weightLossGoal || '—'}</span>
          </div>

          <div className="dp-review-row">
            <span className="dp-review-row-label">{isMl ? 'വ്യായാമം / അധ്വാനം:' : 'Physical Activity:'}</span>
            <span className="dp-review-row-value">{answers.physicalActivityLevel || '—'}</span>
          </div>

          <div className="dp-review-row" style={{ gridColumn: '1 / -1' }}>
            <span className="dp-review-row-label">{isMl ? 'രോഗാവസ്ഥകൾ:' : 'Medical Conditions:'}</span>
            <span className="dp-review-row-value">
              {Array.isArray(answers.medicalConditions) && answers.medicalConditions.length > 0
                ? answers.medicalConditions.join(', ')
                : (isMl ? 'ഒന്നുമില്ല' : 'None selected')}
              {answers.otherMedicalConditions ? ` (${answers.otherMedicalConditions})` : ''}
            </span>
          </div>

          <div className="dp-review-row" style={{ gridColumn: '1 / -1' }}>
            <span className="dp-review-row-label">{isMl ? 'ഭക്ഷണ അലർജികൾ:' : 'Food Allergies / Intolerances:'}</span>
            <span className="dp-review-row-value">
              {currentAllergies.length > 0 ? currentAllergies.join(', ') : (isMl ? 'ഒന്നുമില്ല' : 'None selected')}
              {answers.allergyDetails ? ` (${answers.allergyDetails})` : ''}
            </span>
          </div>
        </div>

        <div style={{ marginTop: '14px', textAlign: 'right' }}>
          <button
            type="button"
            className="dp-btn-back"
            style={{ fontSize: '0.85rem', padding: '6px 14px' }}
            onClick={() => onNavigateToStep(1)}
          >
            {isMl ? 'വിവരങ്ങൾ മാറ്റുക (ഘട്ടം 1)' : 'Edit Details (Step 1)'}
          </button>
        </div>
      </div>

      {/* ── PRIVACY POLICY & TERMS CONSENT ── */}
      <div className="dp-consent-box">
        <label className="dp-consent-label" htmlFor="dp-privacyConsent">
          <input
            id="dp-privacyConsent"
            name="privacyConsent"
            type="checkbox"
            className="dp-option-checkbox"
            checked={form.privacyConsent}
            onChange={(e) => onFormChange('privacyConsent', e.target.checked)}
            aria-required="true"
            aria-invalid={!!errors.privacyConsent}
            aria-describedby={errors.privacyConsent ? 'dp-privacyConsent-err' : undefined}
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
                വായിച്ചു മനസ്സിലാക്കി സമ്മതിക്കുന്നു, വ്യക്തിഗത ഡയറ്റ് പ്ലാൻ ലഭിക്കുന്നതിനായി വിവരങ്ങൾ സമർപ്പിക്കുന്നു.
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
                , and I consent to FutureAce Hospital using the information I submit to provide my diet plan and process my consultation enquiry.
              </>
            )}
          </span>
        </label>
        {errors.privacyConsent && (
          <div className="dp-field-error" id="dp-privacyConsent-err" role="alert" style={{ marginTop: '8px' }}>
            <AlertCircle size={14} />
            <span>{errors.privacyConsent}</span>
          </div>
        )}
      </div>
    </div>
  );
}
