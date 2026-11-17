import React from 'react';
import { AlertCircle, Dna, UserRoundCheck, Syringe } from 'lucide-react';

/* NOTE: medical copy below is general patient information and must be
   reviewed by FutureAce's clinical team before the page goes live. */
const BLOCKS = [
  {
    icon: AlertCircle,
    title: 'Common Symptoms',
    intro: 'Varicose veins can affect people differently. Some people notice only the way the veins look, while others have symptoms such as:',
    items: [
      'Visible, twisted or bulging veins, often blue or purple',
      'Aching, heaviness or tiredness in the legs',
      'Swelling around the ankles or feet, often worse by evening',
      'Throbbing, cramping or a burning sensation',
      'Itching around the affected veins',
      'Changes in skin colour or texture near the ankles',
    ],
  },
  {
    icon: Dna,
    title: 'Possible Causes and Risk Factors',
    intro: 'Varicose veins develop when the valves inside leg veins do not work properly. Factors that may contribute include:',
    items: [
      'Family history of varicose veins',
      'Increasing age',
      'Standing or sitting for long periods',
      'Being overweight',
      'Pregnancy and hormonal changes',
      'A previous leg injury or vein condition',
    ],
  },
  {
    icon: UserRoundCheck,
    title: 'When to Consult a Specialist',
    intro: 'It is sensible to get your legs checked if you notice:',
    items: [
      'Pain, heaviness or swelling that keeps coming back',
      'Skin changes, rashes or sores near the ankle',
      'A vein that becomes red, hard, warm or tender',
      'Veins that bleed — seek urgent medical care',
      'Concern about how your legs look or feel',
    ],
  },
  {
    icon: Syringe,
    title: 'Available Treatment Options',
    intro: 'Not everyone with varicose veins needs a procedure. After assessment, your specialist may discuss options such as:',
    items: [
      'Lifestyle measures and compression support',
      'Triple Therapy',
      'Laser treatment',
      'Sclero Therapy',
      'Glue Therapy',
      'Radiofrequency Ablation (RFA)',
    ],
    footnote: 'The most suitable option depends on your individual condition.',
  },
];

export default function SymptomsAndTreatment() {
  return (
    <div className="vv-info-grid">
      {BLOCKS.map(({ icon: Icon, title, intro, items, footnote }) => (
        <article className="vv-info-card" key={title}>
          <span className="vv-info-card__icon" aria-hidden="true">
            <Icon size={26} />
          </span>
          <h3 className="vv-info-card__title">{title}</h3>
          <p className="vv-info-card__intro">{intro}</p>
          <ul className="vv-info-card__list">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {footnote && <p className="vv-info-card__foot">{footnote}</p>}
        </article>
      ))}
    </div>
  );
}

