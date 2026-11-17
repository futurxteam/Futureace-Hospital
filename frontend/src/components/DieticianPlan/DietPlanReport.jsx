import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import {
  filterDietPlanMeals,
  getMedicalConditionNotices,
  getDigestiveGuidanceNotes,
} from '../../config/dietPlans';

/**
 * DietPlanReport Component
 * Dedicated printable HTML report conforming to Section 14 requirements.
 * Formatted cleanly for A4 printing and browser "Save as PDF".
 * Respects active language (English or Malayalam).
 */
export default function DietPlanReport({ plan, form, answers, bmiResult }) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  const reportDate = new Date().toLocaleString(isMl ? 'ml-IN' : 'en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

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
    <article
      className="dp-report-page"
      id="dietician-printable-report"
      aria-label={isMl ? 'ഡയറ്റ് & ന്യൂട്രിഷൻ അസസ്മെന്റ് റിപ്പോർട്ട്' : 'Diet & Nutrition Assessment Report'}
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '32px',
        marginTop: '24px',
        marginBottom: '32px',
      }}
    >
      {/* ── Report Header with Hospital Branding ── */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '2px solid #0e4d3e',
          paddingBottom: '20px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img
            src="/FH.png"
            alt="FutureAce Hospital Logo"
            style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
          />
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0e4d3e', margin: 0 }}>
              {isMl ? 'ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റൽ' : 'FutureAce Hospital'}
            </h1>
            <p style={{ margin: '2px 0 0', fontSize: '0.88rem', color: '#64748b' }}>
              {isMl
                ? 'ക്ലിനിക്കൽ ന്യൂട്രിഷൻ & പ്രിവന്റീവ് ഹെൽത്ത് വിഭാഗം'
                : 'Department of Clinical Nutrition & Preventive Health'}
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>
            {isMl ? 'വ്യക്തിഗത ഡയറ്റ് പ്ലാൻ റിപ്പോർട്ട്' : 'Personalized Diet Plan Report'}
          </div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: '#64748b', marginTop: '4px' }}>
            <Calendar size={14} />
            <span>{isMl ? 'തയ്യാറാക്കിയത്:' : 'Generated:'} {reportDate} IST</span>
          </div>
        </div>
      </header>

      {/* ── Patient Profile & Anthropometrics ── */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {isMl ? '1. രോഗിയുടെ വിവരങ്ങളും ശാരീരിക അളവുകളും' : '1. Patient Profile & Physical Parameters'}
        </h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', marginBottom: '12px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px 12px', color: '#64748b', width: '25%' }}>
                {isMl ? 'പേര്:' : 'Patient Name:'}
              </td>
              <td style={{ padding: '8px 12px', fontWeight: 700, color: '#0f172a', width: '25%' }}>{form.fullName}</td>
              <td style={{ padding: '8px 12px', color: '#64748b', width: '25%' }}>
                {isMl ? 'പ്രായവും ലിംഗവും:' : 'Age & Sex Group:'}
              </td>
              <td style={{ padding: '8px 12px', fontWeight: 700, color: '#0f172a', width: '25%' }}>
                {form.age} {t('common.units.yrs')} • {plan.label}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px 12px', color: '#64748b' }}>
                {isMl ? 'ഉയരവും ഭാരവും:' : 'Height & Weight:'}
              </td>
              <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>
                {form.heightCm} {t('common.units.cm')} • {form.weightKg} {t('common.units.kg')}
              </td>
              <td style={{ padding: '8px 12px', color: '#64748b' }}>
                {isMl ? 'കണക്കാക്കിയ ബി.എം.ഐ:' : 'Calculated BMI:'}
              </td>
              <td style={{ padding: '8px 12px', fontWeight: 700, color: '#0e4d3e' }}>
                {bmiResult?.bmi ? `${bmiResult.bmi} kg/m² (${bmiResult.category?.label || 'Assessed'})` : (isMl ? 'ലഭ്യമല്ല' : 'Not supplied')}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px 12px', color: '#64748b' }}>
                {isMl ? 'പ്രധാന ലക്ഷ്യം:' : 'Primary Goal:'}
              </td>
              <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{answers.weightLossGoal}</td>
              <td style={{ padding: '8px 12px', color: '#64748b' }}>
                {isMl ? 'ഭക്ഷണ താല്പര്യം:' : 'Food Preference:'}
              </td>
              <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{answers.foodPreference}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 12px', color: '#64748b' }}>
                {isMl ? 'വ്യായാമം:' : 'Activity Level:'}
              </td>
              <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>{answers.physicalActivityLevel}</td>
              <td style={{ padding: '8px 12px', color: '#64748b' }}>
                {isMl ? 'ഭക്ഷണ രീതി:' : 'Meal Pattern:'}
              </td>
              <td style={{ padding: '8px 12px', fontWeight: 600, color: '#0f172a' }}>
                {answers.dailyMainMeals}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* ── Clinical & Allergy Disclaimers in Report ── */}
      {(hasAllergyExclusions || medicalNotices.length > 0 || requiresDietitianReview) && (
        <section style={{ marginBottom: '24px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '16px' }}>
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#92400e', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} />
            <span>{isMl ? 'ക്ലിനിക്കൽ & അലർജി വിവരങ്ങൾ' : 'Clinical & Allergy Considerations'}</span>
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.85rem', color: '#78350f', lineHeight: 1.5 }}>
            {warnings.map((w, i) => (
              <li key={`w-${i}`} style={{ marginBottom: '4px' }}>{w}</li>
            ))}
            {medicalNotices.map((m, i) => (
              <li key={`m-${i}`} style={{ marginBottom: '4px' }}>{m}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Meal Schedule Breakdown ── */}
      <section style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {isMl
            ? `2. നിർദ്ദേശിച്ച ഭക്ഷണക്രമം (${plan.label} — ${answers.foodPreference})`
            : `2. Prescribed Meal Schedule (${plan.label} — ${answers.foodPreference})`}
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredMeals.map((meal, idx) => (
            <div
              key={idx}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 16px',
                background: '#ffffff',
                pageBreakInside: 'avoid',
                breakInside: 'avoid',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.96rem', color: '#0e4d3e' }}>
                  {meal.mealType} ({meal.timeWindow})
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                  {meal.targetEnergy}
                </span>
              </div>
              <p style={{ margin: '0 0 8px', fontSize: '0.82rem', color: '#64748b', fontStyle: 'italic' }}>
                {meal.guideline}
              </p>

              {meal.requiresCustomSubstitution ? (
                <p style={{ margin: 0, fontSize: '0.84rem', color: '#b45309' }}>
                  {isMl
                    ? '* അലർജി കാരണം ഈ സമയത്തെ സാധാരണ ഭക്ഷണങ്ങൾ ഒഴിവാക്കിയിരിക്കുന്നു. അനുയോജ്യമായ മറ്റ് ഭക്ഷണങ്ങൾക്കായി ഫ്യൂച്ചർഏസ് ഡയറ്റീഷ്യനുമായി സംസാരിക്കുക.'
                    : '* Options in this window filtered due to reported food allergies. Clinical dietitian consultation advised for custom substitutes.'}
                </p>
              ) : (
                <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.86rem', color: '#1e293b' }}>
                  {meal.options.map((opt, optI) => (
                    <li key={optI} style={{ marginBottom: '4px' }}>
                      <strong>{opt.name}</strong> — <em>{opt.portion}</em>
                      {opt.description && <span style={{ color: '#475569' }}> ({opt.description})</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Digestive Guidance ── */}
      {digestiveNotes.length > 0 && (
        <section style={{ marginBottom: '24px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {isMl ? '3. ദഹനാരോഗ്യ മാർഗ്ഗനിർദ്ദേശങ്ങൾ' : '3. Digestive Health & Hydration Guidance'}
          </h2>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.86rem', color: '#334155', lineHeight: 1.5 }}>
            {digestiveNotes.map((d, i) => (
              <li key={i} style={{ marginBottom: '4px' }}>{d}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Mandatory Medical Disclaimer ── */}
      <footer
        style={{
          borderTop: '1px solid #cbd5e1',
          paddingTop: '16px',
          marginTop: '24px',
          fontSize: '0.78rem',
          color: '#64748b',
          lineHeight: 1.5,
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
        }}
      >
        <p style={{ margin: '0 0 8px', fontWeight: 700, color: '#475569' }}>
          {isMl ? 'ക്ലിനിക്കൽ അറിയിപ്പ് & നിബന്ധനകൾ:' : 'CLINICAL NOTICE & DISCLAIMER:'}
        </p>
        <p style={{ margin: '0 0 10px' }}>
          {isMl
            ? 'ഈ ഡയറ്റ് പ്ലാൻ പൊതുവായ വിവരങ്ങൾക്കായി മാത്രമുള്ളതാണ്. ഇത് സമ്പൂർണ്ണ മെഡിക്കൽ രോഗനിർണ്ണയമോ ക്ലിനിക്കൽ ഡയറ്റീഷ്യന്റെ നേരിട്ടുള്ള പരിശോധനയ്ക്ക് പകരമോ അല്ല. പ്രത്യേക രോഗങ്ങളോ അലർജികളോ ഉള്ളവർ ഡയറ്റ് പിന്തുടരുന്നതിന് മുൻപ് വിദഗ്ദ്ധോപദേശം തേടുക.'
            : 'This diet plan is provided for general informational purposes based on the supplied dietary guidance and the information entered by the user. It is not a medical diagnosis or a substitute for individualized advice from a qualified dietitian or healthcare professional. People with medical conditions, food allergies, or special nutritional requirements should seek professional review before following a diet plan.'}
        </p>

        <div style={{ textAlign: 'center', paddingTop: '10px', borderTop: '1px dashed #e2e8f0', color: '#0e4d3e', fontWeight: 600 }}>
          FutureAce Hospital • Mamson Royale, Near Lulu Mall, Edapally, Ernakulam, Kerala – 682024<br />
          Appointments &amp; Dietary Desk: +91 85890 03330 • 0484-2735600 • console@futureacehospital.com
        </div>
      </footer>
    </article>
  );
}
