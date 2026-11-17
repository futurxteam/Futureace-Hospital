import React from 'react';
import varicoseVeinsConfig from '../../config/varicoseVeinsConfig';
import SymptomsAndTreatment from './SymptomsAndTreatment';

export default function AboutVaricoseVeins() {
  const { about } = varicoseVeinsConfig.images;

  return (
    <section className="vv-section" aria-labelledby="vv-about-title">
      <div className="vv-container">
        <div className="vv-about">
          <div className="vv-about__text">
            <span className="vv-eyebrow">Understanding the condition</span>
            <h2 id="vv-about-title" className="vv-h2">What Are Varicose Veins?</h2>
            <p className="vv-lead">
              Varicose veins are enlarged, twisted veins that commonly appear in the legs. They may cause
              discomfort, swelling, heaviness or visible changes in the veins.
            </p>
            <p className="vv-muted">
              Every patient is different. A consultation helps you understand your condition and whether any
              treatment is suitable for you.
            </p>
          </div>

          <figure className="vv-about__figure">
            <img
              src={about.src}
              alt={about.alt}
              width={about.width}
              height={about.height}
              loading="lazy"
              decoding="async"
              className="vv-about__img"
            />
          </figure>
        </div>

        <SymptomsAndTreatment />
      </div>
    </section>
  );
}

