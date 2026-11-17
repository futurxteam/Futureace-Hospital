import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Scale,
  Activity,
  HeartPulse,
  Printer,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Stethoscope,
  Info,
} from 'lucide-react';
import ConsultationLeadForm from './ConsultationLeadForm';
import { trackCustom } from '../../utils/metaPixel';

const RISK_LEVEL_ML = {
  'Standard Metabolic Profile': 'സാധാരണ മെറ്റബോളിക് പ്രൊഫൈൽ (Standard)',
  'Moderate Metabolic Risk': 'മിതമായ മെറ്റബോളിക് റിസ്ക് (Moderate)',
  'Elevated Metabolic Risk': 'കൂടിയ മെറ്റബോളിക് റിസ്ക് (Elevated)',
};

const CONDITION_NAMES_ML = {
  'Type 2 Diabetes': 'ടൈപ്പ് 2 പ്രമേഹം (Type 2 Diabetes)',
  'High Blood Pressure': 'ഉയർന്ന രക്തസമ്മർദ്ദം (High Blood Pressure)',
  'PCOD / PCOS': 'പി.സി.ഒ.ഡി / പി.സി.ഒ.എസ് (PCOD/PCOS)',
  'Fatty Liver': 'ഫാറ്റി ലിവർ (Fatty Liver)',
  'High Triglycerides': 'ഉയർന്ന ട്രൈഗ്ലിസറൈഡ്സ് (High Triglycerides)',
  'Thyroid Disorder': 'തൈറോയ്ഡ് തകരാറുകൾ (Thyroid Disorder)',
};

/**
 * MetabolicRiskResults Component (Section 4 & 6)
 * Dedicated, comprehensive Metabolic Risk Assessment Report.
 * Completely independent of the BMI report.
 * Full bilingual English & Malayalam support.
 */
export default function MetabolicRiskResults({ result, onConsultationClick }) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  if (!result || !result.success) return null;

  const reportDate = (result.timestamp || new Date()).toLocaleString(isMl ? 'ml-IN' : 'en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const handlePrint = () => {
    try {
      trackCustom('ReportDownloaded', { tool: 'Metabolic' });
    } catch {
      /* ignore analytics error */
    }
    window.print();
  };

  const {
    riskClassification,
    measurements,
    bmi,
    bmiCategory,
    wthResult,
    waistResult,
    conditionDetailsList,
    elevatedIndicators,
    optimalIndicators,
    recommendedNextSteps,
    hasWaistMeasurement,
    personalDetails,
  } = result;

  const riskLabel = isMl && RISK_LEVEL_ML[riskClassification?.levelLabel]
    ? RISK_LEVEL_ML[riskClassification?.levelLabel]
    : riskClassification?.levelLabel || 'Screening Evaluation';

  return (
    <article
      className="hc-report-card hc-report-printable hc-metabolic-report"
      id="metabolic-assessment-report"
      aria-label={t('healthCalculator.metabolic.resultsTitle')}
    >
      {/* ── Report Header ── */}
      <header className="hc-report-header" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #0e4d3e 100%)' }}>
        <div className="hc-report-branding">
          <img
            src="/FH.png"
            alt="FutureAce Hospital Logo"
            className="hc-report-logo"
          />
          <div className="hc-report-title-area">
            <h2>{t('healthCalculator.metabolic.resultsTitle')}</h2>
            <p className="hc-report-meta">
              {isMl
                ? 'ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റൽ • പ്രിവന്റീവ് ഹെൽത്ത് ആൻഡ് കാർഡിയോമെറ്റബോളിക് വെൽനസ് വിഭാഗം'
                : 'FutureAce Hospital • Department of Preventive Health & Cardiometabolic Wellness'}
            </p>
          </div>
        </div>

        <div className="hc-report-badge" style={{ background: 'rgba(255, 255, 255, 0.15)', color: '#ffffff' }}>
          <Calendar size={16} />
          <span>{reportDate} IST</span>
        </div>
      </header>

      {/* ── Report Body ── */}
      <div className="hc-report-body">
        {/* Recipient note if name was provided */}
        {personalDetails?.fullName && (
          <div style={{ marginBottom: '24px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isMl ? 'തയ്യാറാക്കിയത്:' : 'Assessment Prepared For:'}
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>
              {personalDetails.fullName}
            </div>
          </div>
        )}

        {/* ============================================================
            1. ASSESSMENT SUMMARY & OVERALL RISK CLASSIFICATION
           ============================================================ */}
        <section className="hc-metabolic-summary-banner" aria-label="Assessment Summary">
          <div className="hc-metabolic-banner-top">
            <div>
              <span className="hc-status-pill">
                <CheckCircle2 size={14} /> {isMl ? 'സ്ക്രീനിംഗ് പൂർത്തിയായി' : 'Screening Completed'}
              </span>
              <h3 className="hc-metabolic-risk-title">
                {riskLabel}
              </h3>
            </div>

            <div
              className="hc-risk-level-badge"
              style={{
                backgroundColor: riskClassification?.badgeBg || '#f0fdf4',
                color: riskClassification?.badgeColor || '#16a34a',
                border: `1.5px solid ${riskClassification?.badgeBorder || '#bbf7d0'}`,
              }}
            >
              <Activity size={18} />
              <span>{riskLabel}</span>
            </div>
          </div>

          <p className="hc-metabolic-summary-text">
            {riskClassification?.summaryText}
          </p>

          <div className="hc-metabolic-scope-note">
            <Info size={16} style={{ color: '#0284c7', flexShrink: 0, marginTop: '2px' }} />
            <span>
              <strong>{isMl ? 'പരിശോധനാ പരിധി:' : 'Scope of this evaluation:'}</strong>{' '}
              {isMl
                ? 'ഈ പരിശോധന ദക്ഷിണേഷ്യൻ ജനങ്ങളുടെ ശരീര അളവുകളും നൽകിയ ആരോഗ്യ വിവരങ്ങളും അടിസ്ഥാനമാക്കിയുള്ളതാണ്. ഇത് ഒരു മെഡിക്കൽ രോഗനിർണ്ണയമല്ല, ലാബ് പരിശോധനകൾക്ക് (ലിപിഡ് പ്രൊഫൈൽ, HbA1c, ഷുഗർ) പകരമാവില്ല.'
                : 'This assessment evaluates South Asian anthropometric central adiposity markers and self-reported clinical history. It is an informational screening aid and does not constitute a clinical diagnosis or replace biochemical blood panels (such as lipid profiles, HbA1c, or fasting glucose).'}
            </span>
          </div>
        </section>

        {/* ============================================================
            2. MEASUREMENT RESULTS (Clinical Measurements Breakdown)
           ============================================================ */}
        <section style={{ margin: '32px 0 24px' }} aria-label="Measurement Results">
          <h3 className="hc-section-subheading">
            <Scale size={20} style={{ color: '#0e4d3e' }} />
            <span>{isMl ? 'ശരീര അളവുകളുടെ പരിശോധനാ ഫലങ്ങൾ' : 'Anthropometric & Clinical Measurement Results'}</span>
          </h3>

          <div className="hc-measurement-cards-grid">
            {/* Card 1: BMI & Weight */}
            <div className="hc-measure-card">
              <span className="hc-measure-card-label">{t('healthCalculator.bmiResult.calcBmiLabel')}</span>
              <div className="hc-measure-card-val">
                {bmi} <span className="hc-measure-unit">{t('common.units.kgm2')}</span>
              </div>
              <div
                className="hc-measure-tag"
                style={{
                  backgroundColor: bmiCategory?.badgeBg || '#f0fdf4',
                  color: bmiCategory?.badgeColor || '#16a34a',
                }}
              >
                {bmiCategory?.label || 'Assessed'}
              </div>
              <div className="hc-measure-detail">
                {t('healthCalculator.bmiResult.table.height')}: <strong>{measurements.heightCm} {t('common.units.cm')}</strong> • {t('healthCalculator.bmiResult.table.weight')}: <strong>{measurements.weightKg} {t('common.units.kg')}</strong>
              </div>
              <div className="hc-measure-ref">
                {isMl ? 'ആരോഗ്യകരമായ പരിധി: 18.5 – 22.9 kg/m²' : 'South Asian Healthy Reference: 18.5 – 22.9 kg/m²'}
              </div>
            </div>

            {/* Card 2: Waist Circumference */}
            <div className="hc-measure-card">
              <span className="hc-measure-card-label">{t('healthCalculator.metabolic.waistLabel')}</span>
              <div className="hc-measure-card-val">
                {hasWaistMeasurement ? (
                  <>
                    {measurements.waistCm} <span className="hc-measure-unit">{t('common.units.cm')}</span>
                  </>
                ) : (
                  <span style={{ fontSize: '1.4rem', color: '#94a3b8' }}>{isMl ? 'നൽകിയിട്ടില്ല' : 'Not provided'}</span>
                )}
              </div>
              {hasWaistMeasurement ? (
                <div
                  className="hc-measure-tag"
                  style={{
                    backgroundColor: waistResult?.isElevated ? '#fef2f2' : '#f0fdf4',
                    color: waistResult?.isElevated ? '#dc2626' : '#16a34a',
                  }}
                >
                  {waistResult?.isElevated
                    ? (isMl ? 'കൂടിയ അളവ് (Elevated)' : 'Elevated Adiposity')
                    : (isMl ? 'സാധാരണ പരിധിയിൽ' : 'Within Reference')}
                </div>
              ) : (
                <div className="hc-measure-tag" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
                  {isMl ? 'ഐച്ഛിക സൂചകം' : 'Optional Indicator'}
                </div>
              )}
              <div className="hc-measure-detail">
                {hasWaistMeasurement
                  ? waistResult?.description
                  : (isMl ? 'അരക്കെട്ടിന്റെ അളവ് നൽകിയിട്ടില്ല.' : 'Waist circumference was not entered; central adiposity could not be directly evaluated.')}
              </div>
              <div className="hc-measure-ref">
                {isMl ? 'റഫറൻസ്: പുരുഷന്മാർ < 90 cm • സ്ത്രീകൾ < 80 cm' : 'Reference: Men < 90 cm • Women < 80 cm'}
              </div>
            </div>

            {/* Card 3: Waist-to-Height Ratio (WHtR) */}
            <div className="hc-measure-card">
              <span className="hc-measure-card-label">
                {isMl ? 'അരക്കെട്ട്-ഉയര അനുപാതം (WHtR)' : 'Waist-to-Height Ratio (WHtR)'}
              </span>
              <div className="hc-measure-card-val">
                {wthResult && wthResult.ratioFormatted !== 'N/A' ? (
                  wthResult.ratioFormatted
                ) : (
                  <span style={{ fontSize: '1.4rem', color: '#94a3b8' }}>{isMl ? 'ലഭ്യമല്ല' : 'Not calculated'}</span>
                )}
              </div>
              {wthResult && wthResult.ratioFormatted !== 'N/A' ? (
                <div
                  className="hc-measure-tag"
                  style={{
                    backgroundColor: wthResult.isElevated ? '#fef2f2' : '#f0fdf4',
                    color: wthResult.isElevated ? '#dc2626' : '#16a34a',
                  }}
                >
                  {wthResult.isElevated
                    ? (isMl ? 'കൂടിയ നിരക്ക് (≥ 0.50)' : 'Elevated (≥ 0.50)')
                    : (isMl ? 'മികച്ച നിരക്ക് (< 0.50)' : 'Optimal (< 0.50)')}
                </div>
              ) : (
                <div className="hc-measure-tag" style={{ backgroundColor: '#f1f5f9', color: '#64748b' }}>
                  {isMl ? 'അരക്കെട്ടിന്റെ അളവ് ആവശ്യമാണ്' : 'Requires Waist & Height'}
                </div>
              )}
              <div className="hc-measure-detail">
                {wthResult && wthResult.ratioFormatted !== 'N/A'
                  ? wthResult.description
                  : (isMl ? 'അരക്കെട്ടിന്റെ അളവ് കൂടി നൽകിയാൽ മാത്രമേ ഇത് കണക്കാക്കാനാകൂ.' : 'Requires waist circumference measurement.')}
              </div>
              <div className="hc-measure-ref">
                {isMl ? 'ശുപാർശ ചെയ്യുന്ന നിരക്ക്: < 0.50' : 'Screening Threshold: < 0.50'}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            3. METABOLIC RISK INDICATORS & REPORTED CONDITIONS
           ============================================================ */}
        <section style={{ margin: '32px 0 24px' }} aria-label="Metabolic Risk Indicators">
          <h3 className="hc-section-subheading">
            <HeartPulse size={20} style={{ color: '#0e4d3e' }} />
            <span>{isMl ? 'നിലവിലുള്ള രോഗാവസ്ഥകളും മെഡിക്കൽ ചരിത്രവും' : 'Self-Reported Medical History & Comorbidity Context'}</span>
          </h3>

          <p style={{ fontSize: '0.94rem', color: '#64748b', marginBottom: '14px', lineHeight: 1.5 }}>
            {isMl
              ? 'നിങ്ങൾ സ്വയം രേഖപ്പെടുത്തിയ രോഗാവസ്ഥകൾ താഴെ നൽകുന്നു. ഇത് മൊത്തത്തിലുള്ള മെറ്റബോളിക് റിസ്ക് വിലയിരുത്തുന്നതിന് സഹായിക്കുന്നു.'
              : 'The following conditions were self-reported. Reported medical history is clinically distinct from calculated anthropometric results and provides essential context for overall cardiometabolic risk.'}
          </p>

          {conditionDetailsList && conditionDetailsList.length > 0 ? (
            <div className="hc-conditions-detail-grid">
              {conditionDetailsList.map((cond) => {
                const titleText = isMl && CONDITION_NAMES_ML[cond.title]
                  ? CONDITION_NAMES_ML[cond.title]
                  : cond.title;
                return (
                  <div key={cond.title} className="hc-condition-detail-card">
                    <div className="hc-condition-detail-header">
                      <span className="hc-condition-detail-title">{titleText}</span>
                      <span className="hc-condition-detail-cat">{cond.category}</span>
                    </div>
                    <p className="hc-condition-detail-note">{cond.clinicalNote}</p>
                    <div className="hc-condition-detail-guidance">
                      <strong>{isMl ? 'നിർദ്ദേശം:' : 'Clinical Guidance:'}</strong> {cond.clinicalGuidance}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="hc-no-conditions-box">
              <CheckCircle2 size={20} style={{ color: '#16a34a' }} />
              <span>{isMl ? 'വിട്ടുമാറാത്ത രോഗാവസ്ഥകളൊന്നും രേഖപ്പെടുത്തിയിട്ടില്ല.' : 'No existing chronic medical conditions were self-reported.'}</span>
            </div>
          )}
        </section>

        {/* ============================================================
            4. RISK INTERPRETATION (Individual Findings Breakdown)
           ============================================================ */}
        <section style={{ margin: '32px 0 24px' }} aria-label="Risk Interpretation">
          <h3 className="hc-section-subheading">
            <Stethoscope size={20} style={{ color: '#0e4d3e' }} />
            <span>{isMl ? 'പരിശോധനാ ഫലങ്ങളുടെ വിശകലനം' : 'Screening Findings & Clinical Interpretation'}</span>
          </h3>

          <div className="hc-summary-box">
            <p className="hc-summary-text" style={{ fontSize: '1.02rem', color: '#1e293b', marginBottom: '18px' }}>
              {riskClassification?.clinicalExplanation}
            </p>

            <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              {isMl ? 'സൂചകങ്ങളുടെ വിശദാംശങ്ങൾ:' : 'Indicator-by-Indicator Clinical Review:'}
            </h4>

            <div className="hc-indicators-review-list">
              {elevatedIndicators.length > 0 && (
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#dc2626', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isMl
                      ? `ശ്രദ്ധിക്കേണ്ട ഉയർന്ന റിസ്ക് സൂചകങ്ങൾ (${elevatedIndicators.length})`
                      : `Indicators Warranting Clinical Attention (${elevatedIndicators.length})`}
                  </div>
                  <ul className="hc-next-steps-list">
                    {elevatedIndicators.map((ind, idx) => (
                      <li key={idx} className="hc-next-steps-item">
                        <span className="hc-next-steps-bullet" style={{ background: '#dc2626' }}>!</span>
                        <div>
                          <strong>{ind.label} ({ind.value}):</strong> {ind.clinicalReason}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {optimalIndicators.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#16a34a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {isMl
                      ? `സാധാരണ നിലയിലുള്ള സൂചകങ്ങൾ (${optimalIndicators.length})`
                      : `Indicators Within Standard Reference Ranges (${optimalIndicators.length})`}
                  </div>
                  <ul className="hc-next-steps-list">
                    {optimalIndicators.map((ind, idx) => (
                      <li key={idx} className="hc-next-steps-item">
                        <span className="hc-next-steps-bullet" style={{ background: '#16a34a' }}>✓</span>
                        <div>
                          <strong>{ind.label} ({ind.value}):</strong> {ind.clinicalReason}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ============================================================
            5. RECOMMENDED NEXT STEPS
           ============================================================ */}
        <section style={{ margin: '32px 0 24px' }} aria-label="Recommended Next Steps">
          <h3 className="hc-section-subheading">
            <ShieldCheck size={20} style={{ color: '#0e4d3e' }} />
            <span>{isMl ? 'പ്രതിരോധ ആരോഗ്യത്തിനായുള്ള തുടർനടപടികൾ' : 'Recommended Preventative Next Steps'}</span>
          </h3>

          <div className="hc-summary-box" style={{ background: '#f8fafc', borderColor: '#e2e8f0' }}>
            <ul className="hc-next-steps-list">
              {(recommendedNextSteps || []).map((step, idx) => (
                <li key={idx} className="hc-next-steps-item">
                  <span className="hc-next-steps-bullet" style={{ background: '#0e4d3e' }}>{idx + 1}</span>
                  <span style={{ fontSize: '0.96rem', color: '#1e293b' }}>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ============================================================
            6. MEDICAL DISCLAIMER
           ============================================================ */}
        <div className="hc-disclaimer-box">
          <AlertTriangle className="hc-disclaimer-icon" />
          <div>
            <div className="hc-disclaimer-title">
              {isMl ? 'മെഡിക്കൽ സ്ക്രീനിംഗ് നിബന്ധനകൾ' : 'Medical Screening & Assessment Disclaimer'}
            </div>
            <p className="hc-disclaimer-text">
              {isMl
                ? 'ഈ മെറ്റബോളിക് റിസ്ക് അസസ്മെന്റ് ദക്ഷിണേഷ്യൻ ജനങ്ങളുടെ മാർഗ്ഗനിർദ്ദേശങ്ങൾ അടിസ്ഥാനമാക്കിയുള്ള ഒരു വിദ്യാഭ്യാസപരമായ ആരോഗ്യ സ്ക്രീനിംഗ് ടൂൾ മാത്രമാണ്. ഇത് സമഗ്രമായ ഡോക്ടർ പരിശോധനയ്ക്കോ രക്തപരിശോധനകൾക്കോ പകരമാവില്ല. ഹൃദ്രോഗമോ പ്രമേഹമോ പൂർണ്ണമായി നിർണ്ണയിക്കാനോ തള്ളിക്കളയാനോ ഈ ടൂളിനാവില്ല. ഭക്ഷണത്തിലോ വ്യായാമത്തിലോ മരുന്നുകളിലോ മാറ്റം വരുത്തുന്നതിന് മുൻപ് ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റലിലെ ഡോക്ടറെ കാണുക.'
                : 'This Metabolic Risk Assessment is designed exclusively as an educational screening tool using consensus criteria for South Asian adults. It does not replace a comprehensive physician consultation, physical examination, or laboratory investigations (such as lipid profiles, fasting glucose, HbA1c, or kidney/liver function tests). This tool does not diagnose, confirm, or rule out cardiovascular disease, diabetes, or metabolic syndrome. Always consult a qualified physician at FutureAce Hospital before making changes to medications, diet, or exercise.'}
            </p>
          </div>
        </div>

        {/* ── Report Actions ── */}
        <div className="hc-report-actions no-print">
          <button
            type="button"
            className="hc-report-btn-download"
            onClick={handlePrint}
            id="hc-btn-download-metabolic-report"
          >
            <Printer size={18} />
            <span>{t('common.downloadReport')}</span>
          </button>

          <Link
            to="/book-consultation"
            className="hc-report-btn-consult"
            id="hc-btn-metabolic-book-consult"
            onClick={onConsultationClick}
          >
            <span>{t('common.requestConsultation')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* ── Optional Consultation Follow-Up Form ── */}
        <div className="no-print" style={{ marginTop: '36px' }}>
          <ConsultationLeadForm result={result} calculatorType="metabolic_risk" />
        </div>
      </div>
    </article>
  );
}
