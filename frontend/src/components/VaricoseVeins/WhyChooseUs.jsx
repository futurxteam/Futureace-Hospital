import React from 'react';
import { Stethoscope, ClipboardCheck, HeartHandshake, CalendarClock } from 'lucide-react';

/* Only claims the hospital can substantiate: no success rates, procedure
   counts, named specialists, awards or recovery guarantees. */
const REASONS = [
  {
    icon: Stethoscope,
    title: 'Specialist Consultation',
    text: 'Discuss your symptoms and concerns with our medical team in a dedicated consultation.',
  },
  {
    icon: ClipboardCheck,
    title: 'Individual Treatment Assessment',
    text: 'Your condition is assessed individually so any suggested option is matched to your needs.',
  },
  {
    icon: HeartHandshake,
    title: 'Patient-Focused Care',
    text: 'We take time to explain your options clearly so you can make informed decisions.',
  },
  {
    icon: CalendarClock,
    title: 'Follow-Up Guidance',
    text: 'Receive guidance on follow-up and care so you know what to do after your consultation or treatment.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="vv-section" aria-labelledby="vv-why-title">
      <div className="vv-container">
        <div className="vv-section__head">
          <span className="vv-eyebrow">Our approach</span>
          <h2 id="vv-why-title" className="vv-h2">Why Choose FutureAce Hospital?</h2>
        </div>

        <div className="vv-why-grid">
          {REASONS.map(({ icon: Icon, title, text }) => (
            <article className="vv-why-card" key={title}>
              <span className="vv-why-card__icon" aria-hidden="true">
                <Icon size={28} />
              </span>
              <h3 className="vv-why-card__title">{title}</h3>
              <p className="vv-why-card__text">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

