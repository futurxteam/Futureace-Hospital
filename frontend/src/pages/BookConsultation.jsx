import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getConsultationConfig } from '../config/consultationTypes';
import Hero from '../components/CampaignConsultation/Hero';
import ConsultationForm from '../components/CampaignConsultation/ConsultationForm';
import Sidebar from '../components/CampaignConsultation/Sidebar';
import SuccessModal from '../components/CampaignConsultation/SuccessModal';
import '../styles/bookConsultation.css';

/* ─────────────────────────────────────────────────────────────────────────────
   BOOK CONSULTATION PAGE
   Route: /book-consultation
   Supports: ?type=tkr | gynecomastia | adenoid | circumcision | aesthetics
   Used exclusively for ad campaign landing pages.
   The existing /consultation route is completely unaffected.
───────────────────────────────────────────────────────────────────────────── */
export default function BookConsultation() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || '';

  /* Resolve config from type param */
  const config = getConsultationConfig(type);

  /* Capture UTM params — stored silently, never displayed */
  const [utm] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      source:   params.get('utm_source')   || params.get('source')   || '',
      medium:   params.get('utm_medium')   || params.get('medium')   || '',
      campaign: params.get('utm_campaign') || params.get('campaign') || '',
      content:  params.get('utm_content')  || params.get('content')  || '',
    };
  });

  /* Success modal state */
  const [showSuccess, setShowSuccess] = useState(false);

  /* ── Dynamic SEO ──────────────────────────────────────────────────────── */
  useEffect(() => {
    /* Page title */
    document.title = config.seoTitle;

    /* Meta description */
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', config.seoDescription);

    /* Cleanup on unmount — restore default title */
    return () => {
      document.title = 'FutureAce Hospital | Expert Healthcare in Kochi';
    };
  }, [config]);

  /* ── Success handler ─────────────────────────────────────────────────── */
  const handleSuccess = () => setShowSuccess(true);
  const handleCloseModal = () => setShowSuccess(false);

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <>
      <div className="bk-page">
        {/* Hero — dynamic title/subtitle/department from config */}
        <Hero config={config} />

        {/* Main content: Form + Sidebar */}
        <div className="bk-content">
          <ConsultationForm
            config={config}
            utm={utm}
            onSuccess={handleSuccess}
          />
          <Sidebar />
        </div>
      </div>

      {/* Success modal — shown after API submission, no redirect */}
      <SuccessModal
        isOpen={showSuccess}
        config={config}
        onClose={handleCloseModal}
      />
    </>
  );
}
