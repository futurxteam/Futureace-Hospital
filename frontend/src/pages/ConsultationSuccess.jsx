import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/consultation.css';

/* ─────────────────────────────────────────────────────────────
   CONSULTATION SUCCESS PAGE
   Route: /consultation-success
   FormSubmit redirects here after a successful submission.
───────────────────────────────────────────────────────────── */
export default function ConsultationSuccess() {
  const cardRef = useRef(null);

  /* Spawn a handful of confetti-style dots for delight */
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const colours = ['#48cae4', '#00b4d8', '#0077b6', '#90e0ef', '#caf0f8'];
    const dots = Array.from({ length: 18 }, (_, i) => {
      const dot = document.createElement('div');
      dot.className = 'confetti-dot';
      const size = Math.random() * 10 + 6;
      dot.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${-(Math.random() * 60 + 20)}px;
        background: ${colours[i % colours.length]};
        animation-duration: ${Math.random() * 3 + 3}s;
        animation-delay: ${Math.random() * 2}s;
        opacity: 0.7;
      `;
      card.appendChild(dot);
      return dot;
    });

    return () => dots.forEach((d) => d.remove());
  }, []);

  return (
    <div className="success-page" aria-label="Consultation submitted successfully">
      <div className="success-card" ref={cardRef}>

        {/* Icon */}
        <div className="success-icon-wrap" aria-hidden="true">
          <span className="success-checkmark">✓</span>
        </div>

        {/* Heading */}
        <h1>
          Thank <span>You!</span>
        </h1>

        {/* Message */}
        <p className="success-message">
          Your consultation request has been submitted successfully.
        </p>
        <p className="success-message">
          Our healthcare team will review your request and{' '}
          <strong style={{ color: '#0077b6' }}>contact you shortly</strong>.
        </p>

        {/* Highlights */}
        <div className="success-highlights">
          <span className="success-highlight-pill">📧 Confirmation email sent</span>
          <span className="success-highlight-pill">⏱ Response within 24 hours</span>
          <span className="success-highlight-pill">🔒 Your data is secure</span>
        </div>

        {/* What happens next */}
        <div style={{
          background: '#f0f9ff',
          border: '1px solid rgba(14,165,233,0.15)',
          borderRadius: '16px',
          padding: '20px 24px',
          textAlign: 'left',
          marginBottom: '8px',
        }}>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>
            📋 What happens next?
          </p>
          {[
            'Our coordinator will review your request',
            'We\'ll call or email you to confirm your appointment',
            'You\'ll receive details about your assigned specialist',
            'Prepare any existing reports for your consultation',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #48cae4, #0077b6)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: '700',
                flexShrink: 0,
              }}>{i + 1}</span>
              <span style={{ fontSize: '0.85rem', color: '#475569', lineHeight: '1.5' }}>{step}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="success-actions">
          <Link to="/" className="success-btn-primary" id="return-to-home">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Return to Home
          </Link>
          <Link to="/book-consultation" className="success-btn-secondary" id="submit-another">
            Submit Another Request
          </Link>
        </div>

        {/* Footer note */}
        <p style={{ marginTop: '28px', fontSize: '0.75rem', color: '#b0bec5', lineHeight: '1.5' }}>
          Need immediate assistance?{' '}
          <a
            href="tel:+918589003330"
            style={{ color: '#0077b6', fontWeight: '600', textDecoration: 'none' }}
          >
            Call us at +91 85890 03330
          </a>{' '}
          or reach us on{' '}
          <a
            href="https://wa.me/918589003330"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#16a34a', fontWeight: '600', textDecoration: 'none' }}
          >
            WhatsApp
          </a>.
        </p>

      </div>
    </div>
  );
}
