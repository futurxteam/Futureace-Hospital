import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Scale, Activity, Utensils, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * CalculatorSelector Component (Section B)
 * Provides desktop 3-column / mobile stacked selection cards.
 */
export default function CalculatorSelector({ activeCalculator, onSelect }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="hc-selector-section" aria-label="Health Assessment Selection">
      <div className="hc-selector-grid">
        {/* BMI Calculator Card */}
        <div
          role="button"
          tabIndex={0}
          className={`hc-selector-card ${activeCalculator === 'bmi' ? 'active' : ''}`}
          onClick={() => onSelect('bmi')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect('bmi');
            }
          }}
          aria-pressed={activeCalculator === 'bmi'}
          aria-label={t('healthCalculator.selector.bmiTitle')}
        >
          <div>
            <div className="hc-selector-header">
              <div className="hc-selector-icon-wrap" aria-hidden="true">
                <Scale size={24} />
              </div>
              <span className="hc-selector-badge">
                {activeCalculator === 'bmi' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> {t('healthCalculator.selector.activeTool')}
                  </span>
                ) : (
                  t('healthCalculator.selector.quickScreening')
                )}
              </span>
            </div>
            <h2 className="hc-selector-title">{t('healthCalculator.selector.bmiTitle')}</h2>
            <p className="hc-selector-desc">
              {t('healthCalculator.selector.bmiDesc')}
            </p>
          </div>

          <button
            type="button"
            className="hc-selector-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect('bmi');
            }}
          >
            <span>{t('healthCalculator.selector.calculateBmi')}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Metabolic Risk Calculator Card */}
        <div
          role="button"
          tabIndex={0}
          className={`hc-selector-card ${activeCalculator === 'metabolic' ? 'active' : ''}`}
          onClick={() => onSelect('metabolic')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onSelect('metabolic');
            }
          }}
          aria-pressed={activeCalculator === 'metabolic'}
          aria-label={t('healthCalculator.selector.metabolicTitle')}
        >
          <div>
            <div className="hc-selector-header">
              <div className="hc-selector-icon-wrap" aria-hidden="true">
                <Activity size={24} />
              </div>
              <span className="hc-selector-badge">
                {activeCalculator === 'metabolic' ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={12} /> {t('healthCalculator.selector.activeTool')}
                  </span>
                ) : (
                  t('healthCalculator.selector.comprehensiveReview')
                )}
              </span>
            </div>
            <h2 className="hc-selector-title">{t('healthCalculator.selector.metabolicTitle')}</h2>
            <p className="hc-selector-desc">
              {t('healthCalculator.selector.metabolicDesc')}
            </p>
          </div>

          <button
            type="button"
            className="hc-selector-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect('metabolic');
            }}
          >
            <span>{t('healthCalculator.selector.assessMetabolic')}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 3rd Feature Card: Personalized Dietician Plan */}
        <div
          role="button"
          tabIndex={0}
          className="hc-selector-card"
          onClick={() => navigate('/dietician-plan')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              navigate('/dietician-plan');
            }
          }}
          aria-label={t('healthCalculator.selector.dietTitle')}
        >
          <div>
            <div className="hc-selector-header">
              <div className="hc-selector-icon-wrap" aria-hidden="true" style={{ background: '#f0fdf4', color: '#0e4d3e' }}>
                <Utensils size={24} />
              </div>
              <span className="hc-selector-badge">
                {t('healthCalculator.selector.personalizedNutrition')}
              </span>
            </div>
            <h2 className="hc-selector-title">{t('healthCalculator.selector.dietTitle')}</h2>
            <p className="hc-selector-desc">
              {t('healthCalculator.selector.dietDesc')}
            </p>
          </div>

          <button
            type="button"
            className="hc-selector-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/dietician-plan');
            }}
          >
            <span>{t('healthCalculator.selector.startDietPlan')}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
