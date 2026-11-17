import React from 'react';
import { useTranslation } from 'react-i18next';
import { HeartPulse, AlertCircle, Info, ShieldAlert } from 'lucide-react';

/**
 * MedicalStep Component (Step 3)
 * Question 3: Diagnosed medical conditions or regular medications.
 * Enforces mutual exclusivity with "No known conditions" and provides optional description field.
 */
export default function MedicalStep({ answers, errors, onAnswerChange }) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  const conditionOptions = [
    {
      value: 'No known conditions or regular medications',
      label: t('dietician.q3.opt1'),
      desc: t('dietician.q3.opt1Desc'),
    },
    {
      value: 'Diabetes',
      label: t('dietician.q3.opt2'),
      desc: t('dietician.q3.opt2Desc'),
    },
    {
      value: 'Thyroid disorder or PCOS/PCOD',
      label: t('dietician.q3.opt3'),
      desc: t('dietician.q3.opt3Desc'),
    },
    {
      value: 'High cholesterol or other medical conditions',
      label: t('dietician.q3.opt4'),
      desc: t('dietician.q3.opt4Desc'),
    },
  ];

  const currentConditions = Array.isArray(answers.medicalConditions)
    ? answers.medicalConditions
    : answers.medicalConditions ? [answers.medicalConditions] : [];

  const handleToggle = (value) => {
    let updated;
    const NO_CONDITIONS = 'No known conditions or regular medications';

    if (value === NO_CONDITIONS) {
      updated = [NO_CONDITIONS];
      onAnswerChange('otherMedicalConditions', '');
    } else {
      const withoutNone = currentConditions.filter((c) => c !== NO_CONDITIONS);
      if (withoutNone.includes(value)) {
        updated = withoutNone.filter((c) => c !== value);
      } else {
        updated = [...withoutNone, value];
      }
    }

    onAnswerChange('medicalConditions', updated);
  };

  const isOtherSelected = currentConditions.includes('High cholesterol or other medical conditions');

  return (
    <div className="dp-step-content" aria-label={t('dietician.steps.step3')}>
      <div className="dp-step-header">
        <h2 className="dp-step-title">
          <HeartPulse size={26} style={{ color: '#0e4d3e' }} />
          <span>{isMl ? 'ഘട്ടം 3: രോഗാവസ്ഥകളും മരുന്നുകളും' : 'Step 3: Medical Context & Medications'}</span>
        </h2>
        <p className="dp-step-subtitle">
          {isMl
            ? 'ആരോഗ്യസ്ഥിതിയും പതിവായി കഴിക്കുന്ന മരുന്നുകളും ഭക്ഷണക്രമീകരണത്തിൽ പ്രധാന പങ്കുവഹിക്കുന്നു.'
            : 'Health conditions and regular medications influence nutrient utilization and metabolic safety.'}
        </p>
      </div>

      <div className="dp-notice-card info" style={{ marginBottom: '20px' }}>
        <Info size={20} className="dp-notice-icon" />
        <div>
          <strong>{isMl ? 'എന്തുകൊണ്ടാണ് ഈ വിവരങ്ങൾ ശേഖരിക്കുന്നത്?' : 'Why is this information collected?'}</strong>
          <p style={{ margin: '4px 0 0', fontSize: '0.88rem' }}>
            {isMl
              ? 'ചില ഭക്ഷണങ്ങൾ കഴിക്കുന്ന മരുന്നുകളുമായോ രോഗാവസ്ഥകളുമായോ പ്രതികരിച്ചേക്കാം. ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റൽ ഈ ടൂളിലൂടെ മരുന്നുകളിൽ മാറ്റം വരുത്താൻ നിർദ്ദേശിക്കുന്നില്ല.'
              : 'Certain foods may interact with prescription therapies or specific clinical conditions. FutureAce Hospital never prescribes medication changes through this self-assessment tool.'}
          </p>
        </div>
      </div>

      {/* QUESTION 3 */}
      <div className="dp-field-group">
        <label className="dp-label" id="dp-q3-label">
          <span>
            {t('dietician.q3.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="group" aria-labelledby="dp-q3-label">
          {conditionOptions.map((opt) => {
            const isChecked = currentConditions.includes(opt.value);
            return (
              <label
                key={opt.value}
                className={`dp-option-card ${isChecked ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  name="medicalConditions"
                  value={opt.value}
                  checked={isChecked}
                  onChange={() => handleToggle(opt.value)}
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
        {errors.medicalConditions && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.medicalConditions}</span>
          </div>
        )}
      </div>

      {/* Optional Other Description */}
      {isOtherSelected && (
        <div className="dp-field-group" style={{ marginTop: '12px' }}>
          <label htmlFor="dp-otherMedicalConditions" className="dp-label">
            <span>{isMl ? 'മറ്റ് രോഗങ്ങളോ മരുന്നുകളോ ഉണ്ടെങ്കിൽ രേഖപ്പെടുത്തുക' : 'Please describe other conditions or medications (Optional)'}</span>
            <span className="dp-optional-tag">{t('common.optional')}</span>
          </label>
          <input
            id="dp-otherMedicalConditions"
            name="otherMedicalConditions"
            type="text"
            placeholder={t('dietician.q3.otherConditionsPlaceholder')}
            className="dp-input"
            value={answers.otherMedicalConditions || ''}
            onChange={(e) => onAnswerChange('otherMedicalConditions', e.target.value)}
          />
          <span className="dp-field-hint">
            {isMl
              ? 'രക്തസമ്മർദ്ദം, കൊളസ്ട്രോൾ, ഫാറ്റി ലിവർ അല്ലെങ്കിൽ സ്ഥിരമായി കഴിക്കുന്ന മരുന്നുകൾ എന്നിവ രേഖപ്പെടുത്താം.'
              : 'Include regular prescriptions, blood pressure notes, or liver/kidney observations.'}
          </span>
        </div>
      )}

      {currentConditions.some((c) => c !== 'No known conditions or regular medications') && (
        <div className="dp-notice-card warning" style={{ marginTop: '16px' }}>
          <ShieldAlert size={18} className="dp-notice-icon" />
          <div style={{ fontSize: '0.86rem' }}>
            <strong>{isMl ? 'ക്ലിനിക്കൽ അവലോകന നിർദ്ദേശം:' : 'Clinical Review Advisory:'}</strong>{' '}
            {isMl
              ? 'രേഖപ്പെടുത്തിയ രോഗാവസ്ഥകൾ നിങ്ങളുടെ ഡയറ്റ് റിപ്പോർട്ടിൽ ഉൾപ്പെടുത്തും. ഭക്ഷണക്രമത്തിൽ മാറ്റം വരുത്തും മുൻപ് ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റലിലെ ഡയറ്റീഷ്യനുമായോ ഡോക്ടറുമായോ സംസാരിക്കാൻ ശുപാർശ ചെയ്യുന്നു.'
              : 'Reported medical conditions will be highlighted in your diet plan report. We strongly recommend having your plan reviewed by a registered dietician or your attending physician at FutureAce Hospital.'}
          </div>
        </div>
      )}
    </div>
  );
}
