import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserCheck, ClipboardList, Utensils } from 'lucide-react';

/**
 * DieticianHowItWorks Component (Section B)
 * Explains the 3 compact steps to receive a personalized diet plan.
 */
export default function DieticianHowItWorks() {
  const { t } = useTranslation();

  const steps = [
    {
      step: '01',
      icon: UserCheck,
      title: t('dietician.howItWorks.step1Title'),
      description: t('dietician.howItWorks.step1Desc'),
    },
    {
      step: '02',
      icon: ClipboardList,
      title: t('dietician.howItWorks.step2Title'),
      description: t('dietician.howItWorks.step2Desc'),
    },
    {
      step: '03',
      icon: Utensils,
      title: t('dietician.howItWorks.step3Title'),
      description: t('dietician.howItWorks.step3Desc'),
    },
  ];

  return (
    <section className="dp-how-section no-print" aria-label={t('dietician.howItWorks.heading')}>
      <div className="dp-how-header">
        <h2>{t('dietician.howItWorks.heading')}</h2>
        <p style={{ color: '#64748b', fontSize: '1rem' }}>
          {t('dietician.howItWorks.sub')}
        </p>
      </div>

      <div className="dp-how-grid">
        {steps.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.step} className="dp-how-card">
              <span className="dp-how-card-num" aria-hidden="true">{item.step}</span>
              <div className="dp-how-icon-wrap" aria-hidden="true">
                <IconComponent size={24} />
              </div>
              <h3 className="dp-how-card-title">{item.title}</h3>
              <p className="dp-how-card-desc">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
