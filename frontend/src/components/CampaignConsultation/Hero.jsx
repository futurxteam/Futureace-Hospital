import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   HERO — Campaign Landing Page Hero
   Props:
     config  — one consultation type config object from consultationTypes.js
───────────────────────────────────────────────────────────────────────────── */

const TRUST_BADGES = [
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: 'NABH Accredited',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: '24/7 Support',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: 'Expert Specialists',
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    label: '100% Confidential',
  },
];

export default function Hero({ config }) {
  if (!config) return null;

  return (
    <section className="bk-hero" aria-label={`${config.department} consultation hero`}>
      <div className="bk-hero-inner">

        {/* Department badge */}
        <div className="bk-hero-badge">
          <span className="bk-hero-badge-dot" aria-hidden="true" />
          {config.department}
        </div>

        {/* Title */}
        <h1>{config.title}</h1>

        {/* Subtitle */}
        <p className="bk-hero-subtitle">{config.subtitle}</p>

        {/* Trust row */}
        <div className="bk-trust-row" role="list" aria-label="Hospital accreditations and features">
          {TRUST_BADGES.map((badge) => (
            <span key={badge.label} className="bk-trust-badge" role="listitem">
              {badge.icon}
              {badge.label}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
