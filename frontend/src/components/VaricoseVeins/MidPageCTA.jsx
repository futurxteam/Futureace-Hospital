import React from 'react';
import { CalendarCheck } from 'lucide-react';
import varicoseVeinsConfig from '../../config/varicoseVeinsConfig';
import WhatsAppButton from './WhatsAppButton';
import { scrollToLeadForm } from './scrollToLeadForm';

export default function MidPageCTA() {
  const { cta, whatsappMessages } = varicoseVeinsConfig;

  return (
    <aside className="vv-midcta" aria-labelledby="vv-midcta-title">
      <h2 id="vv-midcta-title" className="vv-midcta__title">Concerned About Varicose Veins?</h2>
      <p className="vv-midcta__text">
        Speak with our team and book a consultation to learn about your treatment options.
      </p>
      <div className="vv-midcta__actions">
        <button type="button" className="vv-btn vv-btn--light" onClick={scrollToLeadForm}>
          <CalendarCheck size={20} aria-hidden="true" />
          <span>{cta.midBook}</span>
        </button>
        <WhatsAppButton
          message={whatsappMessages.midPage}
          label={cta.midWhatsApp}
          placement="mid-page"
          variant="solid"
        />
      </div>
    </aside>
  );
}

