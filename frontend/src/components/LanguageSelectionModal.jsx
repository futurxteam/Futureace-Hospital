import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check, X } from 'lucide-react';

const STORAGE_KEY = 'futureace_language';

/**
 * LanguageSelectionModal Component
 *
 * Appears when a visitor first visits the Health Assessment page.
 * Displays both English and Malayalam introductory headings and descriptions.
 * Saves user preference to localStorage and updates i18n without reloading.
 * Conforms to WCAG accessibility guidelines:
 * - ARIA modal attributes
 * - Focus trapping & Escape key support
 * - High contrast visual affordances
 */
export default function LanguageSelectionModal({ isOpen, onClose }) {
  const { i18n } = useTranslation();
  const modalRef = useRef(null);
  const firstBtnRef = useRef(null);

  const handleSelectLanguage = useCallback((lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore storage error */
    }
    i18n.changeLanguage(lang);
    if (onClose) onClose(lang);
  }, [i18n, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    // Trap focus inside modal
    const previousActiveElement = document.activeElement;
    if (firstBtnRef.current) {
      firstBtnRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        // Default to English if dismissed
        handleSelectLanguage(i18n.language || 'en');
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const firstEl = focusable[0];
        const lastEl = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousActiveElement && previousActiveElement.focus) {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, handleSelectLanguage, i18n.language]);

  if (!isOpen) return null;

  const currentLang = i18n.language;

  return (
    <div
      className="fa-lang-modal-overlay"
      role="presentation"
      onClick={() => handleSelectLanguage(currentLang || 'en')}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.25s ease-out',
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lang-modal-title"
        aria-describedby="lang-modal-desc"
        className="fa-lang-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '540px',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '32px 28px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          position: 'relative',
        }}
      >
        {/* Subtle Close Icon (Defaults to English if tapped) */}
        <button
          type="button"
          onClick={() => handleSelectLanguage('en')}
          aria-label="Close language selector"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#f1f5f9')}
        >
          <X size={18} />
        </button>

        {/* Modal Header Icon */}
        <div
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0e4d3e 0%, #00b4d8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            marginBottom: '20px',
            boxShadow: '0 8px 16px -4px rgba(0, 180, 216, 0.3)',
          }}
        >
          <Globe size={28} />
        </div>

        {/* Dual Language Header */}
        <div id="lang-modal-title" style={{ marginBottom: '14px' }}>
          <h2
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#0f172a',
              margin: '0 0 6px',
              lineHeight: 1.3,
            }}
          >
            Welcome to FutureAce Health Assessment
          </h2>
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#0e4d3e',
              margin: 0,
              lineHeight: 1.4,
              fontFamily: "'Noto Sans Malayalam', 'Outfit', sans-serif",
            }}
          >
            ഫ്യൂച്ചർഏസ് ഹെൽത്ത് അസസ്മെന്റിലേക്ക് സ്വാഗതം
          </h3>
        </div>

        {/* Dual Language Description */}
        <div id="lang-modal-desc" style={{ marginBottom: '28px', color: '#64748b', fontSize: '0.98rem', lineHeight: 1.5 }}>
          <p style={{ margin: '0 0 4px' }}>Choose your preferred language to continue.</p>
          <p
            style={{
              margin: 0,
              fontSize: '0.92rem',
              color: '#475569',
              fontFamily: "'Noto Sans Malayalam', 'Outfit', sans-serif",
            }}
          >
            തുടരുന്നതിനായി നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട ഭാഷ തിരഞ്ഞെടുക്കുക.
          </p>
        </div>

        {/* Interactive Language Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {/* ENGLISH CARD */}
          <button
            ref={firstBtnRef}
            type="button"
            onClick={() => handleSelectLanguage('en')}
            className="fa-lang-card-btn"
            style={{
              background: currentLang === 'en' ? '#f0fdf4' : '#ffffff',
              border: currentLang === 'en' ? '2px solid #059669' : '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px 18px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '120px',
              outline: 'none',
              boxShadow: currentLang === 'en' ? '0 8px 20px -6px rgba(5, 150, 105, 0.25)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (currentLang !== 'en') {
                e.currentTarget.style.borderColor = '#00b4d8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentLang !== 'en') {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 180, 216, 0.4)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = currentLang === 'en' ? '0 8px 20px -6px rgba(5, 150, 105, 0.25)' : 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#0284c7',
                  background: '#f0f9ff',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                }}
              >
                EN
              </span>
              {currentLang === 'en' && (
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#059669',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={14} />
                </div>
              )}
            </div>

            <div style={{ marginTop: '14px' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>English</div>
              <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
                Continue in English
              </div>
            </div>
          </button>

          {/* MALAYALAM CARD */}
          <button
            type="button"
            onClick={() => handleSelectLanguage('ml')}
            className="fa-lang-card-btn"
            style={{
              background: currentLang === 'ml' ? '#f0fdf4' : '#ffffff',
              border: currentLang === 'ml' ? '2px solid #059669' : '2px solid #e2e8f0',
              borderRadius: '16px',
              padding: '20px 18px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '120px',
              outline: 'none',
              boxShadow: currentLang === 'ml' ? '0 8px 20px -6px rgba(5, 150, 105, 0.25)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (currentLang !== 'ml') {
                e.currentTarget.style.borderColor = '#00b4d8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (currentLang !== 'ml') {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 180, 216, 0.4)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = currentLang === 'ml' ? '0 8px 20px -6px rgba(5, 150, 105, 0.25)' : 'none';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  fontFamily: "'Noto Sans Malayalam', sans-serif",
                }}
              >
                ML
              </span>
              {currentLang === 'ml' && (
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#059669',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={14} />
                </div>
              )}
            </div>

            <div style={{ marginTop: '14px' }}>
              <div
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: '#0f172a',
                  fontFamily: "'Noto Sans Malayalam', sans-serif",
                }}
              >
                മലയാളം
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                  marginTop: '2px',
                  fontFamily: "'Noto Sans Malayalam', sans-serif",
                }}
              >
                മലയാളത്തിൽ തുടരുക
              </div>
            </div>
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '22px' }}>
          <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}>
            You can switch language at any time from the top bar.
          </p>
        </div>
      </div>
    </div>
  );
}

