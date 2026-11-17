import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  AlertTriangle,
  Printer,
  RotateCcw,
  Clock,
  Shield,
  Heart,
  Activity,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  filterDietPlanMeals,
  getMedicalConditionNotices,
  getDigestiveGuidanceNotes,
} from '../../config/dietPlans';

/**
 * DietPlanResult Component (Section D)
 * Renders the personalized diet plan, personal metrics, calculated BMI,
 * dietary filtering alerts, medical condition notices, digestive counseling,
 * and next step actions.
 */
export default function DietPlanResult({
  plan,
  form,
  answers,
  bmiResult,
  onPrintClick,
  onRestartClick,
}) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  const { filteredMeals, warnings, hasAllergyExclusions, requiresDietitianReview } =
    filterDietPlanMeals(plan.meals, answers.foodPreference, answers.foodAllergies);

  const medicalNotices = getMedicalConditionNotices(
    answers.medicalConditions,
    answers.otherMedicalConditions
  );

  const digestiveNotes = getDigestiveGuidanceNotes(
    answers.digestiveProblems,
    answers.bowelHabits,
    answers.otherDigestiveProblems
  );

  return (
    <div className="dp-results-wrap" id="dietician-plan-results" aria-label={t('dietician.results.guidanceReady')}>
      {/* ── Results Banner ── */}
      <div className="dp-results-banner">
        <div className="dp-results-banner-text">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', marginBottom: '4px', opacity: 0.9 }}>
            <Sparkles size={16} />
            <span>{t('dietician.results.guidanceReady')}</span>
          </div>
          <h2>{plan.title}</h2>
          <p>{plan.subtitle} • {t('dietician.results.matchedFor')} <strong>{plan.label}</strong></p>
        </div>

        <div className="dp-results-banner-badge">
          <Shield size={18} />
          <span>{plan.label}</span>
        </div>
      </div>

      {/* ── Section A: Personal Summary & Anthropometrics ── */}
      <div className="dp-summary-card">
        <h3 className="dp-summary-title">
          <Activity size={20} style={{ color: '#0e4d3e' }} />
          <span>{t('dietician.results.profileOverview')}</span>
        </h3>

        <div className="dp-summary-grid">
          <div className="dp-summary-item">
            <div className="dp-summary-item-label">{t('healthCalculator.metabolic.fullName')}</div>
            <div className="dp-summary-item-val">{form.fullName}</div>
          </div>

          <div className="dp-summary-item">
            <div className="dp-summary-item-label">{isMl ? 'പ്രായവും വിഭാഗവും' : 'Age & Sex Group'}</div>
            <div className="dp-summary-item-val">{form.age} {t('common.units.yrs')} • {plan.label}</div>
          </div>

          <div className="dp-summary-item">
            <div className="dp-summary-item-label">{isMl ? 'ഉയരവും ഭാരവും' : 'Height & Weight'}</div>
            <div className="dp-summary-item-val">{form.heightCm} {t('common.units.cm')} • {form.weightKg} {t('common.units.kg')}</div>
          </div>

          <div className="dp-summary-item">
            <div className="dp-summary-item-label">{isMl ? 'ഭക്ഷണ താല്പര്യം' : 'Food Preference'}</div>
            <div className="dp-summary-item-val">{answers.foodPreference}</div>
          </div>
        </div>

        {/* BMI Assessment Badge */}
        {bmiResult && bmiResult.bmi && (
          <div className="dp-bmi-box">
            <div>
              <strong style={{ color: '#0f172a', fontSize: '1rem' }}>
                {t('healthCalculator.bmiResult.calcBmiLabel')}: {bmiResult.bmi} {t('common.units.kgm2')}
              </strong>
              <span style={{ margin: '0 8px', color: '#94a3b8' }}>|</span>
              <span style={{ color: '#334155', fontWeight: 600 }}>
                {bmiResult.category?.label || 'Assessed Reference Range'}
              </span>
              <p style={{ margin: '4px 0 0', fontSize: '0.86rem', color: '#64748b' }}>
                {isMl
                  ? 'ദക്ഷിണേഷ്യൻ മുതിർന്നവർക്കായുള്ള ദേശീയ സമവായ മാനദണ്ഡങ്ങൾ അടിസ്ഥാനമാക്കി.'
                  : 'Based on South Asian adult reference screening cutoffs (Consensus Guidelines for Asian Indians).'}
              </p>
            </div>
            <div className="dp-bmi-pill">
              {bmiResult.category?.label?.replace(' Range', '') || 'Assessed'}
            </div>
          </div>
        )}
      </div>

      {/* ── Section C: Dietary Preference & Allergy Notices ── */}
      {hasAllergyExclusions && (
        <div className="dp-notice-card alert">
          <AlertTriangle size={20} className="dp-notice-icon" />
          <div>
            <strong>{t('dietician.results.allergiesNoted')}:</strong>
            <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '0.88rem' }}>
              {warnings.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {requiresDietitianReview && (
        <div className="dp-notice-card warning">
          <Info size={20} className="dp-notice-icon" />
          <div>
            <strong>{isMl ? 'ഡയറ്റീഷ്യന്റെ അവലോകനം ശുപാർശ ചെയ്യുന്നു:' : 'Hospital Dietitian Review Strongly Recommended:'}</strong>
            <p style={{ margin: '4px 0 0', fontSize: '0.88rem' }}>
              {isMl
                ? 'ഒന്നിലധികം ഭക്ഷണ അലർജികളോ നിയന്ത്രണങ്ങളോ ഉള്ളതിനാൽ പോഷകക്കുറവ് ഉണ്ടാകാതിരിക്കാൻ വ്യക്തിഗതമായി ഭക്ഷണങ്ങൾ ക്രമീകരിക്കാൻ ഡയറ്റീഷ്യനെ കാണുക.'
                : 'Due to multiple dietary restrictions or custom allergies reported, certain meals may require individualized culinary substitutions to prevent nutrient gaps.'}
            </p>
          </div>
        </div>
      )}

      {/* ── Section D: Health Information / Medical Notices ── */}
      {medicalNotices.length > 0 && (
        <div className="dp-notice-card warning">
          <Heart size={20} className="dp-notice-icon" />
          <div>
            <strong>{t('dietician.results.clinicalNotices')}:</strong>
            <ul style={{ margin: '6px 0 0', paddingLeft: '18px', fontSize: '0.88rem' }}>
              {medicalNotices.map((n, idx) => (
                <li key={idx}>{n}</li>
              ))}
            </ul>
            <p style={{ margin: '8px 0 0', fontSize: '0.84rem', color: '#78350f' }}>
              * {isMl
                ? 'ഈ ഭക്ഷണക്രമം മെഡിക്കൽ ചികിത്സയോ മരുന്നുകളോ മാറ്റാനുള്ളതല്ല. ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റലിലെ ഡോക്ടറുമായി സംസാരിക്കുക.'
                : 'This meal plan does not diagnose health conditions or alter prescribed pharmaceutical dosages. Discuss with your doctor at FutureAce Hospital.'}
            </p>
          </div>
        </div>
      )}

      {/* ── Section B: Structured Meals Schedule ── */}
      <div className="dp-meals-header">
        <div>
          <h3>{t('dietician.results.mealSchedule')}</h3>
          <p style={{ color: '#64748b', fontSize: '0.94rem', margin: '4px 0 0' }}>
            {isMl
              ? `നിങ്ങൾ തിരഞ്ഞെടുത്ത ${answers.foodPreference} രീതിക്ക് അനുയോജ്യമായ സമീകൃത ഭക്ഷണക്രമം`
              : `Structured, balanced meal portions filtered for ${answers.foodPreference} preference`}
          </p>
        </div>
      </div>

      <div className="dp-meals-container">
        {filteredMeals.map((meal, index) => (
          <div key={index} className="dp-meal-card">
            <div className="dp-meal-top">
              <div className="dp-meal-name-row">
                <span className="dp-meal-type-title">{meal.mealType}</span>
                <span className="dp-meal-time-badge">
                  <Clock size={13} />
                  <span>{meal.timeWindow}</span>
                </span>
              </div>
              <span className="dp-meal-target-energy">{meal.targetEnergy}</span>
            </div>

            <p className="dp-meal-guideline">{meal.guideline}</p>

            {meal.requiresCustomSubstitution ? (
              <div className="dp-notice-card warning" style={{ margin: '10px 0', padding: '12px 16px' }}>
                <Info size={16} />
                <span style={{ fontSize: '0.86rem' }}>
                  {isMl
                    ? 'അലർജി കാരണം ഈ സമയത്തെ സാധാരണ ഭക്ഷണങ്ങൾ ഒഴിവാക്കിയിരിക്കുന്നു. അനുയോജ്യമായ മറ്റ് ഭക്ഷണങ്ങൾക്കായി ഫ്യൂച്ചർഏസ് ഡയറ്റീഷ്യനുമായി സംസാരിക്കുക.'
                    : 'Standard options for this meal window were filtered based on your allergy profile. A registered dietitian at FutureAce will prescribe customized safe substitutions.'}
                </span>
              </div>
            ) : (
              <div className="dp-meal-options-list">
                {meal.options.map((opt, optIdx) => (
                  <div key={optIdx} className="dp-meal-option-item">
                    <div className="dp-meal-option-header">
                      <span className="dp-meal-option-name">{opt.name}</span>
                      <span className="dp-meal-option-portion">{opt.portion}</span>
                    </div>
                    {opt.description && (
                      <p className="dp-meal-option-desc">{opt.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Section E: Digestive & Lifestyle Notes ── */}
      {digestiveNotes.length > 0 && (
        <div className="dp-summary-card" style={{ marginTop: '24px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} style={{ color: '#00b4d8' }} />
            <span>{t('dietician.results.digestiveGuidance')}</span>
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
            {digestiveNotes.map((note, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{note}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Core Nutritional Emphasis */}
      {plan.nutritionalEmphasis && plan.nutritionalEmphasis.length > 0 && (
        <div className="dp-summary-card" style={{ marginTop: '20px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} style={{ color: '#059669' }} />
            <span>{isMl ? `${plan.label} വിഭാഗത്തിനായുള്ള പോഷക മുൻഗണനകൾ` : `Nutritional Focus for ${plan.label}`}</span>
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
            {plan.nutritionalEmphasis.map((item, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Section F: Action Buttons ── */}
      <div className="dp-result-actions no-print">
        <button
          type="button"
          className="dp-btn-print"
          onClick={onPrintClick}
          id="dp-btn-print-plan"
        >
          <Printer size={18} />
          <span>{t('dietician.results.printBtn')}</span>
        </button>

        <button
          type="button"
          className="dp-btn-restart"
          onClick={onRestartClick}
          id="dp-btn-restart-assessment"
        >
          <RotateCcw size={16} />
          <span>{t('common.startAgain')}</span>
        </button>
      </div>
    </div>
  );
}
