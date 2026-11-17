import React from 'react';
import { MessageCircle } from 'lucide-react';
import varicoseVeinsConfig from '../../config/varicoseVeinsConfig';
import { trackCustom } from '../../utils/metaPixel';
import { trackGoogleAdsWhatsApp } from '../../utils/googleAds';

/**
 * Reusable WhatsApp CTA for the varicose veins landing page.
 *
 * Props
 *  - message    pre-filled WhatsApp text
 *  - label      button text
 *  - placement  'hero' | 'mid-page' | 'floating' (used only for tracking)
 *  - variant    'solid' | 'outline' | 'floating'
 *  - hidden     (floating only) hide while the lead form is in view
 *
 * A click is tracked as a separate custom event — it is NOT a confirmed lead.
 * No personal data is attached to the event.
 */
export default function WhatsAppButton({
  message,
  label,
  placement,
  variant = 'solid',
  hidden = false,
}) {
  const { whatsappNumber, googleAds } = varicoseVeinsConfig;
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    trackCustom('WhatsAppClick', { page: 'varicose-veins-treatment', placement });
    trackGoogleAdsWhatsApp(googleAds);
  };

  if (variant === 'floating') {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className={`vv-wa-float ${hidden ? 'vv-wa-float--hidden' : ''}`}
        aria-label="Chat with FutureAce Hospital on WhatsApp about varicose veins treatment"
        tabIndex={hidden ? -1 : 0}
      >
        <MessageCircle size={28} aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`vv-btn vv-btn--whatsapp ${variant === 'outline' ? 'vv-btn--whatsapp-outline' : ''}`}
    >
      <MessageCircle size={20} aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

