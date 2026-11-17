import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const STORAGE_KEY = 'futureace_language';

/**
 * LanguageSelector Component
 * Displays "English | മലയാളം" with active states.
 * Allows instant, non-destructive switching between languages without page reload.
 */
export default function LanguageSelector({ variant = 'header', showIcon = true }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language === 'ml' ? 'ml' : 'en';

  const switchLanguage = (lang) => {
    if (lang === currentLang) return;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore storage error */
    }
    i18n.changeLanguage(lang);
  };

  return (
    <nav
      className={`fa-lang-selector fa-lang-${variant}`}
      aria-label="Language selection"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: variant === 'bar' ? '6px 14px' : '4px 10px',
        borderRadius: '9999px',
        background: variant === 'bar' ? '#f8fafc' : 'rgba(255, 255, 255, 0.9)',
        border: '1px solid rgba(226, 232, 240, 0.85)',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
      }}
    >
      {showIcon && (
        <Globe
          size={15}
          style={{
            color: '#0e4d3e',
            flexShrink: 0,
            marginRight: '2px',
          }}
          aria-hidden="true"
        />
      )}

      {/* English Option */}
      <button
        type="button"
        onClick={() => switchLanguage('en')}
        className={`fa-lang-btn ${currentLang === 'en' ? 'active' : ''}`}
        aria-pressed={currentLang === 'en'}
        aria-label="Switch language to English"
        style={{
          border: 'none',
          background: currentLang === 'en' ? '#0e4d3e' : 'transparent',
          color: currentLang === 'en' ? '#ffffff' : '#475569',
          fontWeight: currentLang === 'en' ? 700 : 500,
          fontSize: '0.84rem',
          padding: '4px 9px',
          borderRadius: '9999px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          outline: 'none',
        }}
      >
        English
      </button>

      {/* Divider */}
      <span
        style={{
          color: '#cbd5e1',
          fontSize: '0.82rem',
          userSelect: 'none',
          padding: '0 1px',
        }}
        aria-hidden="true"
      >
        |
      </span>

      {/* Malayalam Option */}
      <button
        type="button"
        onClick={() => switchLanguage('ml')}
        className={`fa-lang-btn ${currentLang === 'ml' ? 'active' : ''}`}
        aria-pressed={currentLang === 'ml'}
        aria-label="മലയാളത്തിലേക്ക് മാറ്റുക (Switch language to Malayalam)"
        style={{
          border: 'none',
          background: currentLang === 'ml' ? '#0e4d3e' : 'transparent',
          color: currentLang === 'ml' ? '#ffffff' : '#475569',
          fontWeight: currentLang === 'ml' ? 700 : 500,
          fontSize: '0.84rem',
          padding: '4px 9px',
          borderRadius: '9999px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          outline: 'none',
          fontFamily: "'Noto Sans Malayalam', sans-serif",
        }}
      >
        മലയാളം
      </button>
    </nav>
  );
}

