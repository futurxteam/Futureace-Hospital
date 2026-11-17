import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Printer,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import BMIVisualScale from './BMIVisualScale';
import { trackCustom } from '../../utils/metaPixel';

/**
 * HealthReport Component (Section 8)
 * Frontend generated, professional clinical assessment report for BMI or Metabolic Risk.
 * Fully print-friendly with Save as PDF support.
 */
export default function HealthReport({ result, onConsultationClick }) {
  if (!result) return null;

  const isBMI = result.calculatorType === 'bmi';
  const reportDate = (result.timestamp || new Date()).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });

  const handlePrint = () => {
    try {
      trackCustom('ReportDownloaded', { tool: isBMI ? 'BMI' : 'Metabolic' });
    } catch (_) {}
    window.print();
  };

  return (
    <article
      className="hc-report-card hc-report-printable"
      id="health-assessment-report"
      aria-label="Health Assessment Report"
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
            <h2>
              {isBMI
                ? 'BMI Screening Assessment Report'
                : 'Metabolic Risk Screening Assessment Report'}
            </h2>
            <p className="hc-report-meta">
              FutureAce Hospital • Department of Preventive Health &amp; Wellness
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
        {result.personalDetails?.fullName && (
          <div style={{ marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Assessment Prepared For:</span>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
              {result.personalDetails.fullName}
            </div>
          </div>
        )}

        {/* ── Primary Result Highlight Box ── */}
        <div className="hc-result-highlight-box">
          <div className="hc-result-val-wrap">
            <span className="hc-result-val-label">Calculated Body Mass Index (BMI)</span>
            <div className="hc-result-val-number">
              {result.bmi}
              <span className="hc-result-val-unit">kg/m²</span>
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
              <span>{result.category?.label || 'Assessed'}</span>
            </span>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px' }}>
              Reference Range: {result.category?.rangeLabel || 'South Asian Adult Guidelines'}
            </div>
          </div>
        </div>

        {/* ── Visual Scale Indicator ── */}
        <BMIVisualScale bmi={result.bmi} isPediatric={result.category?.isPediatric} />

        {/* ── Detailed Anthropometric Measurements Table ── */}
        <div className="hc-table-wrap">
          <table className="hc-table" aria-label="Clinical measurements summary">
            <thead>
              <tr>
                <th scope="col">Measurement Parameter</th>
                <th scope="col">Recorded Value</th>
                <th scope="col">South Asian Clinical Reference</th>
                <th scope="col">Screening Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Height */}
              <tr>
                <td><strong>Height</strong></td>
                <td>{isBMI ? result.heightCm : result.measurements?.heightCm} cm</td>
                <td>Standard anthropometric screening</td>
                <td>
                  <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                    Recorded
                  </span>
                </td>
              </tr>

              {/* Weight */}
              <tr>
                <td><strong>Weight</strong></td>
                <td>{isBMI ? result.weightKg : result.measurements?.weightKg} kg</td>
                <td>Standard anthropometric screening</td>
                <td>
                  <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                    Recorded
                  </span>
                </td>
              </tr>

              {/* Age */}
              <tr>
                <td><strong>Age</strong></td>
                <td>
                  {isBMI
                    ? (result.age ? `${result.age} years` : 'Not provided')
                    : (result.measurements?.age ? `${result.measurements.age} years` : 'Not provided')}
                </td>
                <td>Adult guidelines applicable ≥ 18 years</td>
                <td>
                  {(isBMI ? result.age : result.measurements?.age) &&
                  (isBMI ? result.age : result.measurements?.age) < 18 ? (
                    <span className="hc-indicator-pill" style={{ background: '#eef2ff', color: '#6366f1' }}>
                      Pediatric
                    </span>
                  ) : (
                    <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                      Standard Adult
                    </span>
                  )}
                </td>
              </tr>

              {/* Gender */}
              <tr>
                <td><strong>Biological Sex / Gender</strong></td>
                <td>
                  {isBMI
                    ? (result.gender ? (result.gender === 'male' ? 'Male' : result.gender === 'female' ? 'Female' : 'Not specified') : 'Not provided')
                    : (result.measurements?.gender ? (result.measurements.gender === 'male' ? 'Male' : result.measurements.gender === 'female' ? 'Female' : 'Not specified') : 'Not provided')}
                </td>
                <td>Sex-specific abdominal obesity cutoffs</td>
                <td>
                  <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                    Contextual
                  </span>
                </td>
              </tr>

              {/* Waist Circumference (Metabolic only) */}
              {!isBMI && (
                <tr>
                  <td><strong>Waist Circumference</strong></td>
                  <td>
                    {result.measurements?.waistCm ? `${result.measurements.waistCm} cm` : 'Not provided'}
                  </td>
                  <td>
                    {result.waistResult?.threshold
                      ? `< ${result.waistResult.threshold}`
                      : 'Men: < 90 cm | Women: < 80 cm'}
                  </td>
                  <td>
                    {result.measurements?.waistCm ? (
                      result.waistResult?.isElevated ? (
                        <span className="hc-indicator-pill" style={{ background: '#fff7ed', color: '#c2410c' }}>
                          Elevated Cutoff
                        </span>
                      ) : result.waistResult?.isElevated === false ? (
                        <span className="hc-indicator-pill" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                          Within Reference
                        </span>
                      ) : (
                        <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#475569' }}>
                          Recorded
                        </span>
                      )
                    ) : (
                      <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#94a3b8' }}>
                        Not Provided
                      </span>
                    )}
                  </td>
                </tr>
              )}

              {/* Waist-to-Height Ratio (Metabolic only) */}
              {!isBMI && (
                <tr>
                  <td><strong>Waist-to-Height Ratio (WHtR)</strong></td>
                  <td>
                    {result.wthResult?.ratioFormatted
                      ? result.wthResult.ratioFormatted
                      : 'Not calculated (Waist not provided)'}
                  </td>
                  <td>Screening threshold &lt; 0.50</td>
                  <td>
                    {result.wthResult ? (
                      result.wthResult.isElevated ? (
                        <span className="hc-indicator-pill" style={{ background: '#fff7ed', color: '#c2410c' }}>
                          Elevated (≥ 0.50)
                        </span>
                      ) : (
                        <span className="hc-indicator-pill" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                          Optimal (&lt; 0.50)
                        </span>
                      )
                    ) : (
                      <span className="hc-indicator-pill" style={{ background: '#f1f5f9', color: '#94a3b8' }}>
                        Optional
                      </span>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── Self-Reported Conditions Summary (Metabolic Assessment) ── */}
        {!isBMI && (
          <div style={{ margin: '24px 0' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
              Self-Reported Health Indicators &amp; Context
            </h3>
            {result.selectedConditions && result.selectedConditions.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.selectedConditions.map((cond) => (
                  <span
                    key={cond}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '9999px',
                      padding: '6px 14px',
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      color: '#1e293b',
                    }}
                  >
                    • {cond}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
                No existing medical conditions self-reported.
              </p>
            )}
          </div>
        )}

        {/* ── Transparent Screening Interpretation (No fake percentages) ── */}
        <div className="hc-summary-box">
          <div className="hc-summary-title">
            <ShieldCheck size={22} style={{ color: '#0e4d3e' }} />
            <span>
              {isBMI
                ? `Clinical Assessment: ${result.category?.label}`
                : result.metabolicSummary?.headline}
            </span>
          </div>
          <p className="hc-summary-text">
            {isBMI
              ? result.category?.description
              : result.metabolicSummary?.explanation}
          </p>

          <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
            Recommended Preventative Next Steps:
          </h4>
          <ul className="hc-next-steps-list">
            {(isBMI
              ? [
                  result.category?.recommendation,
                  'Schedule routine biometric checkups (fasting blood glucose, lipid profile, blood pressure) to evaluate metabolic indicators beyond weight alone.',
                  'For personalized guidance, consult a FutureAce physician or clinical dietitian.',
                ]
              : result.metabolicSummary?.nextSteps || []
            ).map((step, idx) => (
              <li key={idx} className="hc-next-steps-item">
                <span className="hc-next-steps-bullet">{idx + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Official Medical Disclaimer ── */}
        <div className="hc-disclaimer-box">
          <AlertTriangle className="hc-disclaimer-icon" />
          <div>
            <div className="hc-disclaimer-title">Medical Screening Disclaimer</div>
            <p className="hc-disclaimer-text">
              This health assessment is an informational screening tool based on recognized South Asian adult clinical reference parameters. It is not an individual medical diagnosis and does not evaluate biochemical parameters (e.g., HbA1c, fasting lipid profiles, liver transaminases). Please consult a qualified FutureAce Hospital physician before starting, stopping, or altering any medication, exercise regimen, or dietary program.
            </p>
          </div>
        </div>

        {/* ── Report Actions (Print / Save as PDF & Consultation CTA) ── */}
        <div className="hc-report-actions no-print">
          <button
            type="button"
            className="hc-report-btn-download"
            onClick={handlePrint}
            id="hc-btn-download-report"
          >
            <Printer size={18} />
            <span>Download / Print Report (PDF)</span>
          </button>

          <Link
            to="/book-consultation"
            className="hc-report-btn-consult"
            id="hc-btn-report-book-consult"
            onClick={onConsultationClick}
          >
            <span>Book a Hospital Consultation</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
