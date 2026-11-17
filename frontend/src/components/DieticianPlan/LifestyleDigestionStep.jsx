import React from 'react';
import { useTranslation } from 'react-i18next';
import { Activity, AlertCircle } from 'lucide-react';

/**
 * LifestyleDigestionStep Component (Step 5)
 * Questions 7, 8 & 9: Physical activity level, bowel habits, and digestive problems.
 */
export default function LifestyleDigestionStep({ answers, errors, onAnswerChange }) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  const activityOptions = [
    {
      value: 'Sedentary — mostly sitting with little exercise',
      label: t('dietician.q7.opt1'),
      desc: t('dietician.q7.opt1Desc'),
    },
    {
      value: 'Lightly active — occasional walking',
      label: t('dietician.q7.opt2'),
      desc: t('dietician.q7.opt2Desc'),
    },
    {
      value: 'Moderately active — regular walking or exercise',
      label: t('dietician.q7.opt3'),
      desc: t('dietician.q7.opt3Desc'),
    },
    {
      value: 'Highly active — physically demanding work or intensive exercise',
      label: t('dietician.q7.opt4'),
      desc: t('dietician.q7.opt4Desc'),
    },
  ];

  const bowelOptions = [
    {
      value: 'Regular and comfortable',
      label: t('dietician.q8.opt1'),
      desc: t('dietician.q8.opt1Desc'),
    },
    {
      value: 'Frequent constipation',
      label: t('dietician.q8.opt2'),
      desc: t('dietician.q8.opt2Desc'),
    },
    {
      value: 'Frequent loose stools',
      label: t('dietician.q8.opt3'),
      desc: t('dietician.q8.opt3Desc'),
    },
    {
      value: 'Alternating constipation and loose stools',
      label: t('dietician.q8.opt4'),
      desc: t('dietician.q8.opt4Desc'),
    },
  ];

  const digestiveOptions = [
    {
      value: 'Bloating or gas',
      label: t('dietician.q9.opt1'),
      desc: t('dietician.q9.opt1Desc'),
    },
    {
      value: 'Acidity or reflux',
      label: t('dietician.q9.opt2'),
      desc: t('dietician.q9.opt2Desc'),
    },
    {
      value: 'Diarrhoea',
      label: t('dietician.q9.opt3'),
      desc: t('dietician.q9.opt3Desc'),
    },
    {
      value: 'No significant digestive problems',
      label: t('dietician.q9.opt5'),
      desc: t('dietician.q9.opt5Desc'),
    },
    {
      value: 'Other digestive problems',
      label: t('dietician.q9.opt4'),
      desc: t('dietician.q9.opt4Desc'),
    },
  ];

  const isOtherDigestive = answers.digestiveProblems === 'Other digestive problems';

  return (
    <div className="dp-step-content" aria-label={t('dietician.steps.step5')}>
      <div className="dp-step-header">
        <h2 className="dp-step-title">
          <Activity size={26} style={{ color: '#0e4d3e' }} />
          <span>{isMl ? 'ഘട്ടം 5: ജീവിതശൈലിയും ദഹനാരോഗ്യവും' : 'Step 5: Lifestyle & Digestive Comfort'}</span>
        </h2>
        <p className="dp-step-subtitle">
          {isMl
            ? 'ശാരീരിക വ്യായാമവും ദഹനശീലങ്ങളും കുടലിന്റെ ആരോഗ്യത്തിന് ഇണങ്ങുന്ന ഭക്ഷണങ്ങൾ തിരഞ്ഞെടുക്കാൻ സഹായിക്കുന്നു.'
            : 'Physical activity dictates metabolic turnover, while gastrointestinal habits guide gut-soothing meal selections.'}
        </p>
      </div>

      {/* QUESTION 7 */}
      <div className="dp-field-group">
        <label className="dp-label" id="dp-q7-label">
          <span>
            {t('dietician.q7.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="radiogroup" aria-labelledby="dp-q7-label">
          {activityOptions.map((opt) => (
            <label
              key={opt.value}
              className={`dp-option-card ${answers.physicalActivityLevel === opt.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="physicalActivityLevel"
                value={opt.value}
                checked={answers.physicalActivityLevel === opt.value}
                onChange={() => onAnswerChange('physicalActivityLevel', opt.value)}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{opt.label}</div>
                <div className="dp-option-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.physicalActivityLevel && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.physicalActivityLevel}</span>
          </div>
        )}
      </div>

      {/* QUESTION 8 */}
      <div className="dp-field-group" style={{ marginTop: '24px' }}>
        <label className="dp-label" id="dp-q8-label">
          <span>
            {t('dietician.q8.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="radiogroup" aria-labelledby="dp-q8-label">
          {bowelOptions.map((opt) => (
            <label
              key={opt.value}
              className={`dp-option-card ${answers.bowelHabits === opt.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="bowelHabits"
                value={opt.value}
                checked={answers.bowelHabits === opt.value}
                onChange={() => onAnswerChange('bowelHabits', opt.value)}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{opt.label}</div>
                <div className="dp-option-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.bowelHabits && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.bowelHabits}</span>
          </div>
        )}
      </div>

      {/* QUESTION 9 */}
      <div className="dp-field-group" style={{ marginTop: '24px' }}>
        <label className="dp-label" id="dp-q9-label">
          <span>
            {t('dietician.q9.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="radiogroup" aria-labelledby="dp-q9-label">
          {digestiveOptions.map((opt) => (
            <label
              key={opt.value}
              className={`dp-option-card ${answers.digestiveProblems === opt.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="digestiveProblems"
                value={opt.value}
                checked={answers.digestiveProblems === opt.value}
                onChange={() => onAnswerChange('digestiveProblems', opt.value)}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{opt.label}</div>
                <div className="dp-option-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.digestiveProblems && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.digestiveProblems}</span>
          </div>
        )}
      </div>

      {/* Optional Other Description */}
      {isOtherDigestive && (
        <div className="dp-field-group" style={{ marginTop: '12px' }}>
          <label htmlFor="dp-otherDigestiveProblems" className="dp-label">
            <span>{isMl ? 'ദഹന പ്രശ്നങ്ങൾ വ്യക്തമാക്കുക' : 'Please describe your digestive symptoms'}</span>
          </label>
          <input
            id="dp-otherDigestiveProblems"
            name="otherDigestiveProblems"
            type="text"
            placeholder={t('dietician.q9.otherDigestivePlaceholder')}
            className="dp-input"
            value={answers.otherDigestiveProblems || ''}
            onChange={(e) => onAnswerChange('otherDigestiveProblems', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
