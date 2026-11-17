import React from 'react';
import { useTranslation } from 'react-i18next';
import { UtensilsCrossed, AlertCircle } from 'lucide-react';

/**
 * NutritionHabitsStep Component (Step 4)
 * Questions 4, 5 & 6: Main meals per day, meal skipping frequency, and food preference.
 * Values remain constant while labels are translated.
 */
export default function NutritionHabitsStep({ answers, errors, onAnswerChange }) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  const mealCountOptions = [
    { value: '1–2 meals', label: t('dietician.q4.opt1'), desc: t('dietician.q4.opt1Desc') },
    { value: '3 meals', label: t('dietician.q4.opt2'), desc: t('dietician.q4.opt2Desc') },
    { value: '4 meals', label: t('dietician.q4.opt3'), desc: t('dietician.q4.opt3Desc') },
    { value: 'My meal timings vary daily', label: t('dietician.q4.opt4'), desc: t('dietician.q4.opt4Desc') },
  ];

  const skippingOptions = [
    { value: 'Never or rarely', label: t('dietician.q5.opt1'), desc: t('dietician.q5.opt1Desc') },
    { value: '1–2 times per week', label: t('dietician.q5.opt2'), desc: t('dietician.q5.opt2Desc') },
    { value: '3–4 times per week', label: t('dietician.q5.opt3'), desc: t('dietician.q5.opt3Desc') },
    { value: 'Almost every day', label: t('dietician.q5.opt4'), desc: t('dietician.q5.opt4Desc') },
  ];

  const preferenceOptions = [
    {
      value: 'Vegetarian',
      label: t('dietician.q6.opt1'),
      desc: t('dietician.q6.opt1Desc'),
    },
    {
      value: 'Non-vegetarian',
      label: t('dietician.q6.opt2'),
      desc: t('dietician.q6.opt2Desc'),
    },
    {
      value: 'Eggetarian',
      label: t('dietician.q6.opt3'),
      desc: t('dietician.q6.opt3Desc'),
    },
    {
      value: 'Vegan',
      label: t('dietician.q6.opt4'),
      desc: t('dietician.q6.opt4Desc'),
    },
  ];

  return (
    <div className="dp-step-content" aria-label={t('dietician.steps.step4')}>
      <div className="dp-step-header">
        <h2 className="dp-step-title">
          <UtensilsCrossed size={26} style={{ color: '#0e4d3e' }} />
          <span>{isMl ? 'ഘട്ടം 4: ദൈനംദിന ഭക്ഷണശീലങ്ങൾ' : 'Step 4: Daily Eating Habits'}</span>
        </h2>
        <p className="dp-step-subtitle">
          {isMl
            ? 'ഭക്ഷണത്തിന്റെ സമയക്രമവും ഭക്ഷണരീതിയും മനസ്സിലാക്കി ശുപാർശകൾ ക്രമീകരിക്കാൻ ഇത് സഹായിക്കുന്നു.'
            : 'Your meal frequency, consistency, and culinary preference shape how recommendations are organized.'}
        </p>
      </div>

      {/* QUESTION 4 */}
      <div className="dp-field-group">
        <label className="dp-label" id="dp-q4-label">
          <span>
            {t('dietician.q4.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="radiogroup" aria-labelledby="dp-q4-label">
          {mealCountOptions.map((opt) => (
            <label
              key={opt.value}
              className={`dp-option-card ${answers.dailyMainMeals === opt.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="dailyMainMeals"
                value={opt.value}
                checked={answers.dailyMainMeals === opt.value}
                onChange={() => onAnswerChange('dailyMainMeals', opt.value)}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{opt.label}</div>
                <div className="dp-option-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.dailyMainMeals && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.dailyMainMeals}</span>
          </div>
        )}
      </div>

      {/* QUESTION 5 */}
      <div className="dp-field-group" style={{ marginTop: '24px' }}>
        <label className="dp-label" id="dp-q5-label">
          <span>
            {t('dietician.q5.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="radiogroup" aria-labelledby="dp-q5-label">
          {skippingOptions.map((opt) => (
            <label
              key={opt.value}
              className={`dp-option-card ${answers.mealSkippingFrequency === opt.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="mealSkippingFrequency"
                value={opt.value}
                checked={answers.mealSkippingFrequency === opt.value}
                onChange={() => onAnswerChange('mealSkippingFrequency', opt.value)}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{opt.label}</div>
                <div className="dp-option-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.mealSkippingFrequency && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.mealSkippingFrequency}</span>
          </div>
        )}
      </div>

      {/* QUESTION 6 */}
      <div className="dp-field-group" style={{ marginTop: '24px' }}>
        <label className="dp-label" id="dp-q6-label">
          <span>
            {t('dietician.q6.title')}{' '}
            <span className="dp-required-star" aria-hidden="true">*</span>
          </span>
        </label>
        <div className="dp-options-grid" role="radiogroup" aria-labelledby="dp-q6-label">
          {preferenceOptions.map((opt) => (
            <label
              key={opt.value}
              className={`dp-option-card ${answers.foodPreference === opt.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="foodPreference"
                value={opt.value}
                checked={answers.foodPreference === opt.value}
                onChange={() => onAnswerChange('foodPreference', opt.value)}
                className="dp-option-radio"
              />
              <div className="dp-option-content">
                <div className="dp-option-title">{opt.label}</div>
                <div className="dp-option-desc">{opt.desc}</div>
              </div>
            </label>
          ))}
        </div>
        {errors.foodPreference && (
          <div className="dp-field-error" role="alert">
            <AlertCircle size={14} />
            <span>{errors.foodPreference}</span>
          </div>
        )}
      </div>
    </div>
  );
}
