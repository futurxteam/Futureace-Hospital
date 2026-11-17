import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Activity,
  Scale,
  Utensils,
  ShieldCheck,
  ChevronDown,
  Heart,
  FileCheck,
} from 'lucide-react';
import CalculatorSelector from '../components/HealthCalculator/CalculatorSelector';
import BMICalculator from '../components/HealthCalculator/BMICalculator';
import MetabolicRiskCalculator from '../components/HealthCalculator/MetabolicRiskCalculator';
import BMIResults from '../components/HealthCalculator/BMIResults';
import MetabolicRiskResults from '../components/HealthCalculator/MetabolicRiskResults';
import HealthDisclaimer from '../components/HealthCalculator/HealthDisclaimer';
import LanguageSelectionModal from '../components/LanguageSelectionModal';
import WhatsAppFatLossSection from '../components/WhatsAppFatLossSection';
import { trackCustom } from '../utils/metaPixel';
import '../styles/healthCalculator.css';

const STORAGE_KEY = 'futureace_language';

/**
 * HealthCalculator Landing Page
 * Route: /health-calculator
 *
 * Enhanced with:
 * 1. WhatsApp Fat Loss Challenge group integration
 * 2. Complete English/Malayalam bilingual support via react-i18next
 * 3. First-visit Language Selection Popup
 * 4. In-page non-destructive language switcher
 */
export default function HealthCalculator() {
  const { t, i18n } = useTranslation();
  const [activeCalculator, setActiveCalculator] = useState('bmi'); // 'bmi' | 'metabolic'

  // Independent state variables for both tools
  const [bmiResult, setBmiResult] = useState(null);
  const [metabolicResult, setMetabolicResult] = useState(null);

  const [openFaq, setOpenFaq] = useState(null);
  const [showLanguageModal, setShowLanguageModal] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return false;
    }
  });

  const calculatorSectionRef = useRef(null);

  // ── SEO Management ──────────────────────────────────────────────────────────
  useEffect(() => {
    document.title = i18n.language === 'ml'
      ? 'ഹെൽത്ത് കാൽക്കുലേറ്റർ | BMI & മെറ്റബോളിക് റിസ്ക് അസസ്മെന്റ് | ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റൽ'
      : 'Health Calculators | BMI & Metabolic Risk Assessment | FutureAce Hospital';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      i18n.language === 'ml'
        ? "ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റലിന്റെ ലളിതമായ ഹെൽത്ത് കാൽക്കുലേറ്ററുകൾ ഉപയോഗിച്ച് നിങ്ങളുടെ ബി.എം.ഐ (BMI), മെറ്റബോളിക് ആരോഗ്യ സൂചകങ്ങൾ എന്നിവ പരിശോധിക്കൂ."
        : "Explore your BMI and selected metabolic health indicators with FutureAce Hospital's health calculators. View your results and request a consultation if you need further guidance."
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://futureacehospital.com/health-calculator');

    return () => {
      document.title = 'Futureace Hospital';
    };
  }, [i18n.language]);

  // ── Switch Calculator ───────────────────────────────────────────────────────
  const handleSelectCalculator = (type) => {
    setActiveCalculator(type);

    try {
      trackCustom('CalculatorStarted', { tool: type === 'bmi' ? 'BMI' : 'Metabolic' });
    } catch {
      /* ignore analytics error */
    }

    if (calculatorSectionRef.current) {
      calculatorSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ── Handle BMI Calculation ─────────────────────────────────────────────────
  const handleCalculateBMI = (result) => {
    setBmiResult(result);

    setTimeout(() => {
      const el = document.getElementById('bmi-assessment-report');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // ── Handle Metabolic Calculation ───────────────────────────────────────────
  const handleCalculateMetabolic = (result) => {
    setMetabolicResult(result);

    setTimeout(() => {
      const el = document.getElementById('metabolic-assessment-report');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      q: t('healthCalculator.faqs.q1'),
      a: t('healthCalculator.faqs.a1'),
    },
    {
      q: t('healthCalculator.faqs.q2'),
      a: t('healthCalculator.faqs.a2'),
    },
    {
      q: t('healthCalculator.faqs.q3'),
      a: t('healthCalculator.faqs.a3'),
    },
    {
      q: t('healthCalculator.faqs.q4'),
      a: t('healthCalculator.faqs.a4'),
    },
  ];

  return (
    <div className="hc-page-wrapper">
      {/* First-time visitor language modal */}
      <LanguageSelectionModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      <div className="hc-container">

        {/* =====================================================================
            SECTION A: HERO
           ===================================================================== */}
        <section className="hc-hero" aria-label="Health Calculators Introduction">
          <div className="hc-hero-badge">
            <span className="hc-hero-badge-dot" aria-hidden="true" />
            <span>{t('healthCalculator.hero.badge')}</span>
          </div>

          <h1 className="hc-hero-title">
            {t('healthCalculator.hero.title1')}{' '}
            <span className="hc-hero-title-highlight">{t('healthCalculator.hero.title2')}</span>
          </h1>

          <p className="hc-hero-subtitle">
            {t('healthCalculator.hero.subtitle')}
          </p>

          <div className="hc-hero-cta-group no-print">
            <button
              type="button"
              className="hc-hero-btn-primary"
              onClick={() => handleSelectCalculator('bmi')}
              id="hc-hero-cta-bmi"
            >
              <Scale size={20} />
              <span>{t('healthCalculator.hero.btnBmi')}</span>
            </button>

            <button
              type="button"
              className="hc-hero-btn-secondary"
              onClick={() => handleSelectCalculator('metabolic')}
              id="hc-hero-cta-metabolic"
            >
              <Activity size={20} />
              <span>{t('healthCalculator.hero.btnMetabolic')}</span>
            </button>

            <Link
              to="/dietician-plan"
              className="hc-hero-btn-secondary"
              id="hc-hero-cta-dietician"
            >
              <Utensils size={20} />
              <span>{t('healthCalculator.hero.btnDiet')}</span>
            </Link>
          </div>

          <div className="hc-hero-disclaimer-pill">
            <ShieldCheck size={16} style={{ color: '#059669', flexShrink: 0 }} />
            <span>{t('healthCalculator.hero.disclaimer')}</span>
          </div>
        </section>

        {/* =====================================================================
            SECTION B: CALCULATOR SELECTOR
           ===================================================================== */}
        <div className="no-print">
          <CalculatorSelector
            activeCalculator={activeCalculator}
            onSelect={handleSelectCalculator}
          />
        </div>

        {/* =====================================================================
            ACTIVE CALCULATOR SECTION (Independent inputs & execution)
           ===================================================================== */}
        <div ref={calculatorSectionRef} className="no-print">
          {activeCalculator === 'bmi' ? (
            <BMICalculator
              onCalculateResult={handleCalculateBMI}
              onResetResult={() => setBmiResult(null)}
              onInputChange={() => setBmiResult(null)}
            />
          ) : (
            <MetabolicRiskCalculator
              onCalculateResult={handleCalculateMetabolic}
              onResetResult={() => setMetabolicResult(null)}
              onInputChange={() => setMetabolicResult(null)}
              prefilledContact={metabolicResult?.personalDetails}
            />
          )}
        </div>

        {/* =====================================================================
            INDEPENDENT ASSESSMENT REPORTS
           ===================================================================== */}
        {activeCalculator === 'bmi' && bmiResult && (
          <BMIResults
            result={bmiResult}
            onConsultationClick={() => {
              const el = document.getElementById('consultation-followup-form');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          />
        )}

        {activeCalculator === 'metabolic' && metabolicResult && (
          <MetabolicRiskResults
            result={metabolicResult}
            onConsultationClick={() => {
              const el = document.getElementById('consultation-followup-form');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }}
          />
        )}

        {/* =====================================================================
            FEATURE 1: WHATSAPP FAT LOSS CHALLENGE GROUP CTA
            Placed prominently right after results/calculator
           ===================================================================== */}
        <WhatsAppFatLossSection />

        {/* =====================================================================
            EDUCATIONAL SECTION (Preventative health guidance)
           ===================================================================== */}
        <section className="hc-edu-section no-print" aria-label="Preventative Health Education">
          <div className="hc-edu-header">
            <h2>{t('healthCalculator.edu.heading')}</h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: 1.6 }}>
              {t('healthCalculator.edu.sub')}
            </p>
          </div>

          <div className="hc-edu-grid">
            <div className="hc-edu-card">
              <div className="hc-edu-icon-wrap" aria-hidden="true">
                <Heart size={24} />
              </div>
              <h3>{t('healthCalculator.edu.c1Title')}</h3>
              <p>
                {t('healthCalculator.edu.c1Desc')}
              </p>
            </div>

            <div className="hc-edu-card">
              <div className="hc-edu-icon-wrap" aria-hidden="true" style={{ background: '#f0fdf4', color: '#047857' }}>
                <Activity size={24} />
              </div>
              <h3>{t('healthCalculator.edu.c2Title')}</h3>
              <p>
                {t('healthCalculator.edu.c2Desc')}
              </p>
            </div>

            <div className="hc-edu-card">
              <div className="hc-edu-icon-wrap" aria-hidden="true" style={{ background: '#fffbeb', color: '#d97706' }}>
                <FileCheck size={24} />
              </div>
              <h3>{t('healthCalculator.edu.c3Title')}</h3>
              <p>
                {t('healthCalculator.edu.c3Desc')}
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================================
            FREQUENTLY ASKED QUESTIONS
           ===================================================================== */}
        <section className="hc-faq-section no-print" aria-label="Frequently Asked Questions">
          <div className="hc-edu-header" style={{ marginBottom: '24px' }}>
            <h2>{t('healthCalculator.faqs.heading')}</h2>
            <p style={{ color: '#64748b' }}>
              {t('healthCalculator.faqs.sub')}
            </p>
          </div>

          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="hc-faq-item">
                  <button
                    type="button"
                    className="hc-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    id={`hc-faq-q-${index}`}
                    aria-controls={`hc-faq-a-${index}`}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease',
                        flexShrink: 0,
                        marginLeft: '12px',
                        color: isOpen ? '#00b4d8' : '#94a3b8',
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className="hc-faq-answer"
                      id={`hc-faq-a-${index}`}
                      role="region"
                      aria-labelledby={`hc-faq-q-${index}`}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =====================================================================
            HEALTH DISCLAIMER
           ===================================================================== */}
        <div className="no-print">
          <HealthDisclaimer />
        </div>
      </div>
    </div>
  );
}
