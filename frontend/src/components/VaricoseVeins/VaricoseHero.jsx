import React from 'react';
import { CalendarCheck, Stethoscope, ClipboardList, ShieldCheck } from 'lucide-react';
import varicoseVeinsConfig from '../../config/varicoseVeinsConfig';
import WhatsAppButton from './WhatsAppButton';
import { scrollToLeadForm } from './scrollToLeadForm';

const HIGHLIGHTS = [
  { icon: Stethoscope, text: 'Consultation with our team' },
  { icon: ClipboardList, text: 'Personalised assessment of your condition' },
  { icon: ShieldCheck, text: 'Treatment options explained clearly' },
];

export default function VaricoseHero() {
  const { cta, whatsappMessages } = varicoseVeinsConfig;

  return (
    <section className="vv-hero" aria-labelledby="vv-hero-title">
      <div className="vv-container vv-hero__grid">
        <div className="vv-hero__content">
          <span className="vv-eyebrow">FutureAce Hospital · Vascular Care</span>
          <h1 id="vv-hero-title" className="vv-hero__title">
            Varicose Veins Treatment – Take the First Step Towards Healthier Legs
          </h1>
          <p className="vv-hero__sub">
            Get expert consultation and explore suitable treatment options for varicose veins.
          </p>

          <div className="vv-hero__actions">
            <button type="button" className="vv-btn vv-btn--primary" onClick={scrollToLeadForm}>
              <CalendarCheck size={20} aria-hidden="true" />
              <span>{cta.heroBook}</span>
            </button>
            <WhatsAppButton
              message={whatsappMessages.hero}
              label={cta.heroWhatsApp}
              placement="hero"
              variant="solid"
            />
          </div>
        </div>

        <aside className="vv-hero__card" aria-label="What to expect from your consultation">
          <h2 className="vv-hero__card-title">What to expect</h2>
          <ul className="vv-hero__list">
            {HIGHLIGHTS.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span className="vv-hero__list-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <p className="vv-hero__card-note">
            Whether treatment is needed — and which option suits you — is decided by the specialist after examining you.
          </p>
        </aside>
      </div>
    </section>
  );
}

