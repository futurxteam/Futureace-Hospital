import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldAlert } from 'lucide-react';

/**
 * HealthDisclaimer Component
 * Prominently presents the required medical safety notices and ethical boundaries.
 */
export default function HealthDisclaimer() {
  const { t } = useTranslation();

  return (
    <aside className="hc-disclaimer-box" aria-label={t('healthCalculator.disclaimer.title')}>
      <ShieldAlert className="hc-disclaimer-icon" />
      <div>
        <h4 className="hc-disclaimer-title">{t('healthCalculator.disclaimer.title')}</h4>
        <p className="hc-disclaimer-text">
          {t('healthCalculator.disclaimer.text')}
        </p>
      </div>
    </aside>
  );
}
