import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Printer,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import BMIVisualScale from './BMIVisualScale';
import ConsultationLeadForm from './ConsultationLeadForm';
import { trackCustom } from '../../utils/metaPixel';

const CATEGORY_TRANSLATIONS_ML = {
  underweight: {
    label: 'ഭാരക്കുറവ് (Underweight Range)',
    description:
      'നിങ്ങളുടെ ബി.എം.ഐ ദക്ഷിണേഷ്യൻ മുതിർന്നവർക്കായുള്ള സാധാരണ പരിധിയേക്കാൾ കുറവാണ്. ഇത് പോഷകാഹാരക്കുറവ് അല്ലെങ്കിൽ മറ്റ് ശാരീരിക കാരണങ്ങൾ കൊണ്ടാകാം. ക്ഷീണമോ അപ്രതീക്ഷിതമായി ഭാരം കുറയലോ ഉണ്ടെങ്കിൽ ഡോക്ടറെ കാണുക.',
    recommendation:
      'പോഷകാഹാരം ഉറപ്പാക്കുന്നതിനായി ഡോക്ടറുടെയോ ഡയറ്റീഷ്യന്റെയോ ഉപദേശം തേടുക. കൃത്യമായ നിർദ്ദേശമില്ലാതെ അമിതമായി ഭക്ഷണം കഴിച്ച് പെട്ടെന്ന് ഭാരം കൂട്ടാൻ ശ്രമിക്കാതിരിക്കുക.',
  },
  healthy: {
    label: 'ആരോഗ്യകരമായ ഭാരം (Healthy Weight Range)',
    description:
      'നിങ്ങളുടെ ബി.എം.ഐ ദക്ഷിണേഷ്യൻ മുതിർന്നവർക്കായുള്ള ആരോഗ്യകരമായ ഭാരപരിധിയിലാണ്. ബി.എം.ഐ ഒരു പ്രാഥമിക സൂചകം മാത്രമാണ്; ഇത് ശരീരത്തിലെ പേശികളും കൊഴുപ്പും തമ്മിലുള്ള വ്യത്യാസം കാണിക്കുന്നില്ല.',
    recommendation:
      'ആഴ്ചയിൽ കുറഞ്ഞത് 150 മിനിറ്റ് വ്യായാമം, സമീകൃതാഹാരം, വർഷം തോറുമുള്ള ആരോഗ്യ പരിശോധനകൾ എന്നിവയിലൂടെ ഈ ആരോഗ്യം നിലനിർത്തുക.',
  },
  overweight: {
    label: 'അമിതഭാരം (Overweight Range)',
    description:
      'നിങ്ങളുടെ ബി.എം.ഐ ദക്ഷിണേഷ്യൻ മുതിർന്നവർക്കായുള്ള അമിതഭാര പരിധിയിലാണ്. ദക്ഷിണേഷ്യൻ ജനങ്ങളിൽ കുറഞ്ഞ ബി.എം.ഐയിൽ തന്നെ ഇൻസുലിൻ പ്രതിരോധം, ഫാറ്റി ലിവർ, കൊളസ്ട്രോൾ തുടങ്ങിയവ വരാൻ സാധ്യത കൂടുതലാണ്.',
    recommendation:
      'രക്തസമ്മർദ്ദം, രക്തത്തിലെ പഞ്ചസാര, കൊളസ്ട്രോൾ എന്നിവ പരിശോധിച്ച് അനുയോജ്യമായ ഭക്ഷണക്രമവും വ്യായാമവും ക്രമീകരിക്കാൻ ഒരു ഫിസിഷ്യനെ കാണുക.',
  },
  obesity: {
    label: 'സ്ഥൂലത (Obesity Range)',
    description:
      'നിങ്ങളുടെ ബി.എം.ഐ ദക്ഷിണേഷ്യൻ മുതിർന്നവർക്കായുള്ള സ്ഥൂലതയുടെ പരിധിയിലാണ്. ഇത് ടൈപ്പ് 2 പ്രമേഹം, രക്തസമ്മർദ്ദം, ഹൃദ്രോഗങ്ങൾ, ഫാറ്റി ലിവർ എന്നിവയ്ക്കുള്ള സാധ്യത വർദ്ധിപ്പിക്കുന്നു.',
    recommendation:
      'ഹൃദയാരോഗ്യവും മെറ്റബോളിക് ആരോഗ്യവും സമഗ്രമായി വിലയിരുത്തുന്നതിന് ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റലിലെ ഡോക്ടറുമായി സംസാരിക്കുക.',
  },
};

/**
 * BMIResults Component
 * Dedicated report component for the BMI Calculator.
 * Renders ONLY the BMI assessment without metabolic condition fields.
 * Fully supports English & Malayalam.
 */
export default function BMIResults({ result, onConsultationClick }) {
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
      trackCustom('ReportDownloaded', { tool: 'BMI' });
    } catch {
      /* ignore analytics error */
    }
    window.print();
  };

  const catKey = result.category?.key || 'healthy';
  const categoryLabel = isMl && CATEGORY_TRANSLATIONS_ML[catKey]
    ? CATEGORY_TRANSLATIONS_ML[catKey].label
    : result.category?.label || 'Assessed';

  const categoryDesc = isMl && CATEGORY_TRANSLATIONS_ML[catKey]
    ? CATEGORY_TRANSLATIONS_ML[catKey].description
    : result.category?.description;

  const categoryRec = isMl && CATEGORY_TRANSLATIONS_ML[catKey]
    ? CATEGORY_TRANSLATIONS_ML[catKey].recommendation
    : result.category?.recommendation;

  const genderDisplay = result.gender === 'male'
    ? t('common.gender.male')
    : result.gender === 'female'
    ? t('common.gender.female')
    : result.gender
    ? t('common.gender.preferNotToSay')
    : t('healthCalculator.bmiResult.table.notProvided');

  return (
    <article
      className="hc-report-card hc-report-printable"
      id="bmi-assessment-report"
      aria-label={t('healthCalculator.bmiResult.reportTitle')}
    >
      {/* ── Report Header ── */}
      <header className="hc-report-header">
        <div className="hc-report-branding">
          <img
            src="/FH.png"
            alt="FutureAce Hospital Logo"
            className="hc-report-logo"
          />
          <div className="hc-report-title-area">
            <h2>{t('healthCalculator.bmiResult.reportTitle')}</h2>
            <p className="hc-report-meta">
              {t('healthCalculator.bmiResult.hospitalMeta')}
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
        {/* ── Primary BMI Metric Highlight Box ── */}
        <div className="hc-result-highlight-box">
          <div className="hc-result-val-wrap">
            <span className="hc-result-val-label">{t('healthCalculator.bmiResult.calcBmiLabel')}</span>
            <div className="hc-result-val-number">
              {result.bmi}
              <span className="hc-result-val-unit">{t('common.units.kgm2')}</span>
            </div>
          </div>

          <div>
            <span
              className="hc-result-category-pill"
              style={{
                backgroundColor: result.category?.badgeBg || '#f0fdf4',
                color: result.category?.badgeColor || '#16a34a',
                border: `1.5px solid ${result.category?.badgeBorder || '#bbf7d0'}`,
              }}
            >
              <CheckCircle2 size={18} />
              <span>{categoryLabel}</span>
            </span>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px' }}>
              {t('healthCalculator.bmiResult.referenceRange')}: {result.category?.rangeLabel || '18.5 – 22.9 kg/m²'}
            </div>
          </div>
        </div>

        {/* ── Visual Scale Indicator ── */}
        <BMIVisualScale bmi={result.bmi} isPediatric={result.category?.isPediatric} />

        {/* ── Recorded Anthropometrics Table ── */}
        <div className="hc-table-wrap">
          <table className="hc-table" aria-label={t('healthCalculator.bmiResult.table.title')}>
            <thead>
              <tr>
                <th scope="col">{t('healthCalculator.bmiResult.table.recordedMetric')}</th>
                <th scope="col">{t('healthCalculator.bmiResult.table.valueEntered')}</th>
                <th scope="col">{t('healthCalculator.bmiResult.table.clinicalContext')}</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>{t('healthCalculator.bmiResult.table.height')}</strong></td>
                <td>{result.heightCm} {t('common.units.cm')}</td>
                <td>{isMl ? 'സ്റ്റാൻഡേർഡ് ശരീര സ്ക്രീനിംഗ്' : 'Standard anthropometric screening'}</td>
                <td>
                  <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                    {isMl ? 'രേഖപ്പെടുത്തി' : 'Recorded'}
                  </span>
                </td>
              </tr>
              <tr>
                <td><strong>{t('healthCalculator.bmiResult.table.weight')}</strong></td>
                <td>{result.weightKg} {t('common.units.kg')}</td>
                <td>{isMl ? 'സ്റ്റാൻഡേർഡ് ശരീര സ്ക്രീനിംഗ്' : 'Standard anthropometric screening'}</td>
                <td>
                  <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                    {isMl ? 'രേഖപ്പെടുത്തി' : 'Recorded'}
                  </span>
                </td>
              </tr>
              {result.age && (
                <tr>
                  <td><strong>{t('healthCalculator.bmiResult.table.age')}</strong></td>
                  <td>{result.age} {t('common.units.yrs')}</td>
                  <td>{isMl ? 'മുതിർന്നവരുടെ മാനദണ്ഡം ≥ 18 വയസ്സ്' : 'Adult categories applicable ≥ 18 years'}</td>
                  <td>
                    {result.age < 18 ? (
                      <span className="hc-indicator-pill" style={{ background: '#eef2ff', color: '#6366f1' }}>
                        {isMl ? 'കുട്ടികൾ (< 18)' : 'Pediatric (< 18)'}
                      </span>
                    ) : (
                      <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                        {isMl ? 'മുതിർന്നവർ' : 'Standard Adult'}
                      </span>
                    )}
                  </td>
                </tr>
              )}
              {result.gender && (
                <tr>
                  <td><strong>{t('healthCalculator.bmiResult.table.gender')}</strong></td>
                  <td>{genderDisplay}</td>
                  <td>{isMl ? 'ലിംഗഭേദ വിവരങ്ങൾ' : 'Contextual screening demographic'}</td>
                  <td>
                    <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                      {isMl ? 'നൽകിയിട്ടുണ്ട്' : 'Contextual'}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Clinical Explanation & Recommendations ── */}
        <div className="hc-summary-box">
          <div className="hc-summary-title">
            <ShieldCheck size={22} style={{ color: '#0e4d3e' }} />
            <span>{isMl ? `വിഭാഗം വിശകലനം: ${categoryLabel}` : `Category Interpretation: ${categoryLabel}`}</span>
          </div>
          <p className="hc-summary-text">
            {categoryDesc}
          </p>

          <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
            {t('healthCalculator.bmiResult.recommendationsTitle')}:
          </h4>
          <ul className="hc-next-steps-list">
            <li className="hc-next-steps-item">
              <span className="hc-next-steps-bullet">1</span>
              <span>{categoryRec}</span>
            </li>
            <li className="hc-next-steps-item">
              <span className="hc-next-steps-bullet">2</span>
              <span>
                {isMl
                  ? 'ബി.എം.ഐ ഒരു പ്രാഥമിക അളവ് മാത്രമാണെന്നും ഇത് ശരീരത്തിലെ കൊഴുപ്പും പേശികളും തമ്മിലുള്ള വ്യത്യാസം നേരിട്ട് അളക്കുന്നില്ലെന്നും ഓർക്കുക.'
                  : 'Remember that BMI is an anthropometric screening tool that does not directly measure body fat percentage or differentiate fat from lean muscle mass.'}
              </span>
            </li>
            <li className="hc-next-steps-item">
              <span className="hc-next-steps-bullet">3</span>
              <span>
                {isMl
                  ? 'ശരീരഭാരത്തിനപ്പുറം മെറ്റബോളിക് ആരോഗ്യം കൃത്യമായി വിലയിരുത്തുന്നതിന് രക്തസമ്മർദ്ദം, രക്തത്തിലെ പഞ്ചസാര, ലിപിഡ് പ്രൊഫൈൽ തുടങ്ങിയ പതിവ് പരിശോധനകൾ നടത്തുക.'
                  : 'Schedule regular biometric checkups (blood pressure, fasting glucose, lipid profile) to assess overall metabolic health beyond body weight alone.'}
              </span>
            </li>
          </ul>
        </div>

        {/* ── Official Medical Disclaimer ── */}
        <div className="hc-disclaimer-box">
          <AlertTriangle className="hc-disclaimer-icon" />
          <div>
            <div className="hc-disclaimer-title">
              {isMl ? 'മെഡിക്കൽ സ്ക്രീനിംഗ് നിബന്ധന' : 'Medical Screening Disclaimer'}
            </div>
            <p className="hc-disclaimer-text">
              {isMl
                ? 'ഈ ബി.എം.ഐ പരിശോധന ദക്ഷിണേഷ്യൻ ജനവിഭാഗങ്ങൾക്കായുള്ള മാർഗ്ഗനിർദ്ദേശങ്ങൾ അടിസ്ഥാനമാക്കി തയ്യാറാക്കിയ പൊതുവായ ആരോഗ്യ വിവരങ്ങൾക്കായി മാത്രമുള്ളതാണ്. ഇത് പൂർണ്ണ രോഗനിർണ്ണയമോ ചികിത്സാ പദ്ധതിയോ അല്ല. ഭക്ഷണത്തിലോ മരുന്നുകളിലോ വ്യായാമത്തിലോ മാറ്റം വരുത്തുന്നതിന് മുൻപ് ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റലിലെ ഡോക്ടറുടെ ഉപദേശം തേടുക.'
                : 'This BMI calculation is provided for general health screening and educational purposes using consensus screening cutoffs for South Asian adults. It does not constitute a medical diagnosis or clinical treatment plan. Please consult a qualified FutureAce Hospital physician or clinical dietitian before initiating any weight-management program or altering medications.'}
            </p>
          </div>
        </div>

        {/* ── Report Actions ── */}
        <div className="hc-report-actions no-print">
          <button
            type="button"
            className="hc-report-btn-download"
            onClick={handlePrint}
            id="hc-btn-download-bmi-report"
          >
            <Printer size={18} />
            <span>{t('common.downloadReport')}</span>
          </button>

          <Link
            to="/book-consultation"
            className="hc-report-btn-consult"
            id="hc-btn-bmi-book-consult"
            onClick={onConsultationClick}
          >
            <span>{t('common.requestConsultation')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* ── Optional Consultation Follow-Up Form ── */}
        <div className="no-print" style={{ marginTop: '36px' }}>
          <ConsultationLeadForm result={result} calculatorType="bmi" />
        </div>
      </div>
    </article>
  );
}
