import React from 'react';
import { useTranslation } from 'react-i18next';
import { PhoneCall, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * DieticianConsultationCta Component (Section E)
 * Provides the consultation request CTA beneath the results, linking to
 * the established FutureAce consultation workflow.
 */
export default function DieticianConsultationCta({ onConsultationClick }) {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  return (
    <section className="dp-consult-card no-print" aria-label={t('dietician.results.consultTitle')}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', color: '#0e4d3e', padding: '6px 14px', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '16px' }}>
        <ShieldCheck size={16} />
        <span>{isMl ? 'ഫ്യൂച്ചർഏസ് ക്ലിനിക്കൽ ഡയറ്റെറ്റിക്സ്' : 'FutureAce Clinical Dietetics'}</span>
      </div>

      <h3 className="dp-consult-title">{t('dietician.results.consultTitle')}</h3>

      <p className="dp-consult-desc">
        {t('dietician.results.consultDesc')}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Link
          to="/book-consultation"
          className="dp-consult-btn"
          id="dp-btn-request-consultation"
          onClick={onConsultationClick}
        >
          <span>{t('common.requestConsultation')}</span>
          <ArrowRight size={18} />
        </Link>

        <a
          href="tel:+918589003330"
          className="dp-btn-back"
          style={{ textDecoration: 'none', padding: '13px 24px' }}
        >
          <PhoneCall size={16} style={{ color: '#059669' }} />
          <span>{t('common.callDesk')}: +91 85890 03330</span>
        </a>
      </div>

      <p style={{ margin: '18px 0 0', fontSize: '0.82rem', color: '#94a3b8' }}>
        {isMl
          ? 'വ്യക്തിഗത കൺസൾട്ടേഷൻ • വിദഗ്ധ ഡയറ്റീഷ്യൻ സേവനം • കൊച്ചി, കേരളം'
          : 'Boutique healthcare • Confidential one-on-one dietitian consultation • Kochi, Kerala'}
      </p>
    </section>
  );
}
