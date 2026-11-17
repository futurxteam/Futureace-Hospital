import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flame, Users, Sparkles, ArrowRight } from 'lucide-react';

const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/GxoCtC2xZamIfB7N2E1iRR';

/**
 * WhatsApp SVG Official Icon
 */
const WhatsAppIcon = ({ size = 22, color = 'currentColor' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={color}
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

/**
 * WhatsAppFatLossSection Component
 * Feature 1: Fat Loss Challenge WhatsApp Group Integration.
 * Responsive, hospital brand-aligned invitation banner with official WhatsApp CTA.
 */
export default function WhatsAppFatLossSection({ className = '' }) {
  const { t } = useTranslation();

  return (
    <section
      className={`fa-whatsapp-challenge-section no-print ${className}`}
      aria-label={t('whatsapp.heading')}
      style={{
        margin: '40px auto 36px',
        maxWidth: '1060px',
        position: 'relative',
        borderRadius: '24px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #064e3b 0%, #0e4d3e 50%, #0b3d32 100%)',
        color: '#ffffff',
        padding: '36px 32px',
        boxShadow: '0 20px 35px -10px rgba(14, 77, 62, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
      }}
    >
      {/* Background Decorative Glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-40px',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37, 211, 102, 0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-50px',
          left: '10%',
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 180, 216, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        {/* Top Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'rgba(37, 211, 102, 0.2)',
              border: '1px solid rgba(37, 211, 102, 0.4)',
              borderRadius: '9999px',
              color: '#4ade80',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}
          >
            <Flame size={14} />
            <span>{t('whatsapp.groupName')}</span>
          </span>

          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              color: '#e2e8f0',
              fontSize: '0.82rem',
              fontWeight: 600,
            }}
          >
            <Users size={14} />
            <span>{t('whatsapp.badge')}</span>
          </span>
        </div>

        {/* Content & CTA Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'center',
            gap: '28px',
          }}
        >
          {/* Text Area */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                fontWeight: 800,
                color: '#ffffff',
                margin: '0 0 12px',
                lineHeight: 1.25,
                letterSpacing: '-0.02em',
              }}
            >
              {t('whatsapp.heading')}
            </h2>

            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.65,
                color: '#cbd5e1',
                margin: 0,
                maxWidth: '560px',
              }}
            >
              {t('whatsapp.description')}
            </p>

            {/* Micro feature pills */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '18px',
                flexWrap: 'wrap',
                fontSize: '0.82rem',
                color: '#94a3b8',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={13} style={{ color: '#25D366' }} />
                <span>{t('whatsapp.features.f1')}</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={13} style={{ color: '#25D366' }} />
                <span>{t('whatsapp.features.f2')}</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Sparkles size={13} style={{ color: '#25D366' }} />
                <span>{t('whatsapp.features.f3')}</span>
              </span>
            </div>
          </div>

          {/* Action Button Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="btn-join-whatsapp-fat-loss"
              className="fa-whatsapp-cta-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                background: '#25D366',
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '1.08rem',
                padding: '16px 28px',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -4px rgba(37, 211, 102, 0.45)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                cursor: 'pointer',
                border: 'none',
                minWidth: '220px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1EBE5D';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 14px 28px -4px rgba(37, 211, 102, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#25D366';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px -4px rgba(37, 211, 102, 0.45)';
              }}
            >
              <WhatsAppIcon size={24} color="#ffffff" />
              <span>{t('whatsapp.button')}</span>
              <ArrowRight size={18} />
            </a>

            <span
              style={{
                fontSize: '0.78rem',
                color: '#94a3b8',
                marginTop: '10px',
                paddingLeft: '4px',
              }}
            >
              Opens in WhatsApp • Group: Fat Lose Challenge
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

