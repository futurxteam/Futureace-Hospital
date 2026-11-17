import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * BMIVisualScale Component
 * Visual horizontal bar representing South Asian adult screening ranges.
 * Non-reliance on color alone with explicit textual labels and clear numeric thresholds.
 */
export default function BMIVisualScale({ bmi, isPediatric = false }) {
  const { t } = useTranslation();

  // Map BMI onto a 0% - 100% position across the 4 segments:
  // Underweight: < 18.5 (segment 0 - 25%)
  // Healthy: 18.5 - 22.9 (segment 25 - 50%)
  // Overweight: 23.0 - 24.9 (segment 50 - 75%)
  // Obesity: >= 25.0 (segment 75 - 100%)
  const calculateNeedleLeft = (val) => {
    if (val === null || val === undefined || isNaN(val)) return 50;

    let left = 50;
    if (val < 18.5) {
      // Map 14 - 18.5 to 4% - 25%
      const clamped = Math.max(14, val);
      left = 4 + ((clamped - 14) / (18.5 - 14)) * 21;
    } else if (val < 23.0) {
      // Map 18.5 - 23.0 to 25% - 50%
      left = 25 + ((val - 18.5) / (23.0 - 18.5)) * 25;
    } else if (val < 25.0) {
      // Map 23.0 - 25.0 to 50% - 75%
      left = 50 + ((val - 23.0) / (25.0 - 23.0)) * 25;
    } else {
      // Map 25.0 - 35.0 to 75% - 96%
      const clamped = Math.min(35, val);
      left = 75 + ((clamped - 25.0) / (35.0 - 25.0)) * 21;
    }
    return Math.min(96, Math.max(4, left));
  };

  const needlePosition = bmi !== null ? calculateNeedleLeft(bmi) : null;

  return (
    <div className="hc-bmi-scale-wrap" aria-label={t('healthCalculator.bmiResult.scaleTitle')}>
      <div className="hc-bmi-scale-header">
        <span className="hc-bmi-scale-title">
          <span>{t('healthCalculator.bmiResult.scaleTitle')}</span>
        </span>
        <span className="hc-bmi-scale-note">{t('healthCalculator.bmiResult.southAsianStandard')}</span>
      </div>

      <div className="hc-bmi-bar-track" role="img" aria-label={`BMI scale showing result of ${bmi || 'N/A'}`}>
        <div className="hc-bmi-bar-segment seg-underweight" title="< 18.5" />
        <div className="hc-bmi-bar-segment seg-healthy" title="18.5 – 22.9" />
        <div className="hc-bmi-bar-segment seg-overweight" title="23.0 – 24.9" />
        <div className="hc-bmi-bar-segment seg-obesity" title="≥ 25.0" />

        {needlePosition !== null && !isPediatric && (
          <div
            className="hc-bmi-needle"
            style={{ left: `${needlePosition}%` }}
            aria-hidden="true"
          >
            <span className="hc-bmi-needle-badge">{bmi} {t('common.units.kgm2')}</span>
            <div className="hc-bmi-needle-pin" />
          </div>
        )}
      </div>

      <div className="hc-bmi-labels-grid">
        <div className="hc-bmi-label-item">
          <span className="hc-bmi-label-dot" style={{ background: '#38bdf8' }} />
          <span className="hc-bmi-label-name">{t('healthCalculator.bmiResult.categories.underweight')}</span>
          <span className="hc-bmi-label-range">&lt; 18.5</span>
        </div>
        <div className="hc-bmi-label-item">
          <span className="hc-bmi-label-dot" style={{ background: '#22c55e' }} />
          <span className="hc-bmi-label-name">{t('healthCalculator.bmiResult.categories.healthy')}</span>
          <span className="hc-bmi-label-range">18.5 – 22.9</span>
        </div>
        <div className="hc-bmi-label-item">
          <span className="hc-bmi-label-dot" style={{ background: '#f59e0b' }} />
          <span className="hc-bmi-label-name">{t('healthCalculator.bmiResult.categories.overweight')}</span>
          <span className="hc-bmi-label-range">23.0 – 24.9</span>
        </div>
        <div className="hc-bmi-label-item">
          <span className="hc-bmi-label-dot" style={{ background: '#ef4444' }} />
          <span className="hc-bmi-label-name">{t('healthCalculator.bmiResult.categories.obesity')}</span>
          <span className="hc-bmi-label-range">≥ 25.0</span>
        </div>
      </div>
    </div>
  );
}
