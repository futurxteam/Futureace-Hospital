import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, ShieldCheck, ArrowDown } from 'lucide-react';

/**
 * DieticianHero Component (Section A)
 * Displays hero header, value proposition, scroll CTA, and medical advisory pill.
 */
export default function DieticianHero({ onStartClick }) {
  const { t } = useTranslation();

  return (
    <section className="dp-hero" aria-label={t('dietician.hero.title2')}>
      <div className="dp-hero-badge">
        <span className="dp-hero-badge-dot" aria-hidden="true" />
        <span>{t('dietician.hero.badge')}</span>
      </div>

      <h1 className="dp-hero-title">
        {t('dietician.hero.title1')}{' '}
        <span className="dp-hero-title-highlight">{t('dietician.hero.title2')}</span>
      </h1>

      <p className="dp-hero-subtitle">
        {t('dietician.hero.subtitle')}
      </p>

      <div className="dp-hero-cta-group no-print">
        <button
          type="button"
          className="dp-hero-btn-primary"
          onClick={onStartClick}
          id="dp-btn-start-questionnaire"
        >
          <span>{t('dietician.hero.btnCreate')}</span>
          <ArrowDown size={18} />
        </button>
      </div>

      <div className="dp-hero-disclaimer-pill">
        <ShieldCheck size={16} style={{ color: '#059669', flexShrink: 0 }} />
        <span>
          {t('dietician.hero.pill')}
        </span>
      </div>
    </section>
  );
}
