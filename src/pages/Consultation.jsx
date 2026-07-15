import React from 'react';
import ConsultationForm from '../components/ConsultationForm';
import '../styles/consultation.css';

/* ─────────────────────────────────────────────────────────────
   CONSULTATION PAGE
   Route: /consultation
───────────────────────────────────────────────────────────── */
export default function Consultation() {
  return (
    <main>
      {/* ── Hero ───────────────────────────────── */}
      <section className="consult-hero" aria-label="Consultation hero">
        <div className="consult-hero-content">
          <span className="consult-hero-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Expert Healthcare Consultation
          </span>

          <h1>
            Request a{' '}
            <span>Consultation</span>
          </h1>

          <p>
            Complete the form below and one of our healthcare specialists will contact
            you shortly. Your health is our priority.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="consult-hero-scroll" aria-hidden="true">
          <span />
          Scroll
        </div>
      </section>

      {/* ── Progress Steps ─────────────────────── */}
      <section className="consult-steps" aria-label="Consultation process steps">
        <div className="container">
          <div className="steps-track">
            <div className="step-item">
              <div className="step-circle active">1</div>
              <span className="step-label active">Fill Form</span>
            </div>
            <div className="step-connector" />
            <div className="step-item">
              <div className="step-circle">2</div>
              <span className="step-label">Review</span>
            </div>
            <div className="step-connector" />
            <div className="step-item">
              <div className="step-circle">3</div>
              <span className="step-label">Team Contacts You</span>
            </div>
            <div className="step-connector" />
            <div className="step-item">
              <div className="step-circle">4</div>
              <span className="step-label">Consultation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ───────────────────────── */}
      <section className="consult-main" aria-label="Consultation form section">
        <div className="container">
          <div className="consult-layout">

            {/* Left — Form */}
            <ConsultationForm />

            {/* Right — Sidebar */}
            <aside className="consult-sidebar" aria-label="Consultation information">

              {/* Why Choose Us */}
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Why Choose Us
                </h3>
                <div className="why-items">
                  {WHY_ITEMS.map((item) => (
                    <div key={item.title} className="why-item">
                      <div className="why-icon">{item.icon}</div>
                      <div className="why-text">
                        <p>{item.title}</p>
                        <span>{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="sidebar-card">
                <h3 className="sidebar-card-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.72-.9a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Contact Us Directly
                </h3>
                <div>
                  {CONTACT_ITEMS.map((c) => (
                    <div key={c.label} className="contact-item">
                      <div className="contact-item-icon">{c.icon}</div>
                      <div>
                        <div className="contact-item-label">{c.label}</div>
                        <a href={c.href}>{c.value}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>



            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Static data ───────────────────────────────── */
const WHY_ITEMS = [
  { icon: '🏆', title: 'Expert Specialists', desc: 'Board-certified doctors across all major departments' },
  { icon: '⚡', title: 'Quick Response', desc: 'We contact you within 24 hours of your request' },
  { icon: '🔒', title: 'Private & Secure', desc: 'Your health data is fully confidential' },
  { icon: '💙', title: 'Patient-First Care', desc: 'Compassionate, personalised treatment plans' },
];

const CONTACT_ITEMS = [
  { label: 'Phone / WhatsApp', value: '+91 85890 03330', href: 'tel:+918589003330', icon: '📞' },
  { label: 'Email', value: 'console@futureacehospital.com', href: 'mailto:console@futureacehospital.com', icon: '✉️' },
];
