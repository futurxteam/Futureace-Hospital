import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/* Answers are general information, deliberately free of guarantees, and must
   be reviewed by the clinical team before publication. */
const FAQS = [
  {
    q: 'What causes varicose veins?',
    a: 'Varicose veins develop when the small valves inside the leg veins weaken or stop working properly, allowing blood to pool and the veins to enlarge. Family history, age, pregnancy, being overweight and long periods of standing or sitting can all contribute.',
  },
  {
    q: 'What are the common symptoms?',
    a: 'Common symptoms include visible twisted or bulging veins, aching or heavy legs, swelling around the ankles, cramps, itching and skin changes near the affected veins. Some people have very few symptoms. If you are unsure, a consultation can help.',
  },
  {
    q: 'Is varicose veins treatment painful?',
    a: 'Experiences differ from person to person and between procedures. Your specialist will explain what to expect for the option suggested for you, including how comfort is managed during and after treatment.',
  },
  {
    q: 'What treatment options are available?',
    a: 'Options may include lifestyle measures and compression support, as well as procedures such as Triple Therapy, laser treatment, Sclero Therapy, Glue Therapy and Radiofrequency Ablation (RFA). Which option, if any, is suitable depends on your individual assessment.',
  },
  {
    q: 'How long does recovery take?',
    a: 'Recovery varies depending on the treatment and the individual. Your specialist will give you guidance specific to your situation, including when you can return to your usual activities.',
  },
  {
    q: 'How can I book a consultation?',
    a: 'Fill in the consultation form on this page and our team will contact you, or message us on WhatsApp. We will help you arrange a consultation at a convenient time.',
  },
];

export default function VaricoseFAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="vv-section vv-section--tint" aria-labelledby="vv-faq-title">
      <div className="vv-container vv-container--narrow">
        <div className="vv-section__head">
          <span className="vv-eyebrow">Your questions answered</span>
          <h2 id="vv-faq-title" className="vv-h2">Frequently Asked Questions</h2>
        </div>

        <div className="vv-faq">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `vv-faq-panel-${index}`;
            const buttonId = `vv-faq-button-${index}`;

            return (
              <div className={`vv-faq__item ${isOpen ? 'is-open' : ''}`} key={item.q}>
                <h3 className="vv-faq__heading">
                  <button
                    type="button"
                    id={buttonId}
                    className="vv-faq__button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.q}</span>
                    <ChevronDown size={22} className="vv-faq__chevron" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="vv-faq__panel"
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

