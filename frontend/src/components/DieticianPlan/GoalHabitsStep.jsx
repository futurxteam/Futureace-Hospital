import React from 'react';
import { useTranslation } from 'react-i18next';
import { Target, AlertCircle } from 'lucide-react';

/**
 * GoalHabitsStep Component (Step 2)
 * Questions 1 & 2: Primary weight-loss goal and previous weight-loss attempts.
 * Preserves selected values while translating labels and descriptions.
 */
export default function GoalHabitsStep({ answers, errors, onAnswerChange }) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  const goalOptions = [
    {
      value: 'Lose 3–5 kg',
      label: t('dietician.q1.opt1'),
      desc: t('dietician.q1.opt1Desc'),
    },
    {
      value: 'Lose 5–10 kg',
      label: t('dietician.q1.opt2'),
      desc: t('dietician.q1.opt2Desc'),
    },
    {
      value: 'Lose more than 10 kg',
      label: t('dietician.q1.opt3'),
      desc: t('dietician.q1.opt3Desc'),
    },
    {
      value: 'Improve overall health and fitness',
      label: t('dietician.q1.opt4'),
      desc: t('dietician.q1.opt4Desc'),
    },
  ];

  const attemptOptions = [
    {
      value: 'No, this is my first attempt',
      label: t('dietician.q2.opt1'),
      desc: t('dietician.q2.opt1Desc'),
    },
    {
      value: 'Yes, with dietary changes',
      label: t('dietician.q2.opt2'),
      desc: t('dietician.q2.opt2Desc'),
    },
    {
      value: 'Yes, with professional guidance',
      label: t('dietician.q2.opt3'),
      desc: t('dietician.q2.opt3Desc'),
    },
    {
      value: 'Yes, but I did not achieve the desired results',
      label: t('dietician.q2.opt4'),
      desc: t('dietician.q2.opt4Desc'),
    },
  ];

  return (
    <div className="dp-step-content" aria-label={t('dietician.steps.step2')}>
      <div className="dp-step-header">
        <h2 className="dp-step-title">
          <Target size={26} style={{ color: '#0e4d3e' }} />
          <span>{isMl ? 'ഘട്ടം 2: ഭാര നിയന്ത്രണ ലക്ഷ്യങ്ങൾ' : 'Step 2: Weight & Health Goals'}</span>
        </h2>
        <p className="dp-step-subtitle">
          {isMl
            ? 'നിങ്ങളുടെ ലക്ഷ്യങ്ങളും മുൻകാല അനുഭവങ്ങളും മനസ്സിലാക്കുന്നത് അനുയോജ്യമായ ഭക്ഷണക്രമം നിർദ്ദേശിക്കാൻ സഹായിക്കും.'
            : 'Understanding your target outcomes and prior experiences helps tailor dietary progression.'}
        </p>
      </div>

      {/* QUESTION 1 */}
      <div className="dp-field-group">
        <label className="dp-label" id="dp-q1-label">
          <span>
            {t('dietician.q1.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="radiogroup" aria-labelledby="dp-q1-label">
          {goalOptions.map((opt) => (
            <label
              key={opt.value}
              className={`dp-option-card ${answers.weightLossGoal === opt.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="weightLossGoal"
                value={opt.value}
                checked={answers.weightLossGoal === opt.value}
                onChange={() => onAnswerChange('weightLossGoal', opt.value)}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{opt.label}</div>
                <div className="dp-option-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.weightLossGoal && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.weightLossGoal}</span>
          </div>
        )}
      </div>

      {/* QUESTION 2 */}
      <div className="dp-field-group" style={{ marginTop: '20px' }}>
        <label className="dp-label" id="dp-q2-label">
          <span>
            {t('dietician.q2.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="radiogroup" aria-labelledby="dp-q2-label">
          {attemptOptions.map((opt) => (
            <label
              key={opt.value}
              className={`dp-option-card ${answers.previousWeightLossAttempts === opt.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="previousWeightLossAttempts"
                value={opt.value}
                checked={answers.previousWeightLossAttempts === opt.value}
                onChange={() => onAnswerChange('previousWeightLossAttempts', opt.value)}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{opt.label}</div>
                <div className="dp-option-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.previousWeightLossAttempts && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.previousWeightLossAttempts}</span>
          </div>
        )}
      </div>
    </div>
  );
}
