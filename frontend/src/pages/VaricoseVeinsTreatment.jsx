import React, { useEffect, useRef, useState } from 'react';
import varicoseVeinsConfig, { LEAD_FORM_ID } from '../config/varicoseVeinsConfig';
import { captureAttribution } from '../utils/campaignAttribution';
import { trackConsultationView } from '../utils/metaPixel';
import VaricoseHero from '../components/VaricoseVeins/VaricoseHero';
import AboutVaricoseVeins from '../components/VaricoseVeins/AboutVaricoseVeins';
import BeforeAfterGallery from '../components/VaricoseVeins/BeforeAfterGallery';
import MidPageCTA from '../components/VaricoseVeins/MidPageCTA';
import VaricoseLeadForm from '../components/VaricoseVeins/VaricoseLeadForm';
import WhyChooseUs from '../components/VaricoseVeins/WhyChooseUs';
import VaricoseFAQs from '../components/VaricoseVeins/VaricoseFAQs';
import WhatsAppButton from '../components/VaricoseVeins/WhatsAppButton';
import '../styles/varicose-veins.css';

/** Sets/updates a <meta> or <link> tag and returns a function that restores it. */
function upsertHeadTag(tagName, attrName, attrValue, contentAttr, content) {
  let el = document.head.querySelector(`${tagName}[${attrName}="${attrValue}"]`);
  const created = !el;
  const previous = el ? el.getAttribute(contentAttr) : null;

  if (!el) {
    el = document.createElement(tagName);
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute(contentAttr, content);

  return () => {
    if (created) el.remove();
    else if (previous !== null) el.setAttribute(contentAttr, previous);
  };
}

/**
 * Varicose Veins Treatment — paid-advertising landing page.
 * Route: /varicose-veins-treatment
 *
 * Header, footer, Meta Pixel PageView tracking (MetaPixelTracker) and the
 * enquiry backend are shared with the rest of the site.
 */
export default function VaricoseVeinsTreatment() {
  const { seo, consultationType, whatsappMessages } = varicoseVeinsConfig;
  const [formInView, setFormInView] = useState(false);
  const viewTrackedRef = useRef(false);

  /* ── Campaign attribution: capture UTMs as soon as the page loads ─────── */
  useEffect(() => {
    captureAttribution();
  }, []);

  /* ── Meta Pixel ViewContent (once per visit; PageView is handled by the
        existing MetaPixelTracker + base snippet) ─────────────────────────── */
  useEffect(() => {
    if (viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    trackConsultationView(consultationType);
  }, [consultationType]);

  /* ── SEO ──────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const previousTitle = document.title;
    document.title = seo.title;

    const restorers = [
      upsertHeadTag('meta', 'name', 'description', 'content', seo.description),
      upsertHeadTag('link', 'rel', 'canonical', 'href', seo.canonical),
      upsertHeadTag('meta', 'property', 'og:title', 'content', seo.title),
      upsertHeadTag('meta', 'property', 'og:description', 'content', seo.description),
      upsertHeadTag('meta', 'property', 'og:url', 'content', seo.canonical),
      upsertHeadTag('meta', 'property', 'og:type', 'content', 'website'),
      upsertHeadTag('meta', 'property', 'og:image', 'content', seo.ogImage),
    ];

    return () => {
      document.title = previousTitle;
      restorers.forEach((restore) => restore());
    };
  }, [seo]);

  /* ── Hide the floating WhatsApp button while the form is on screen so it
        never covers fields or the submit button (mainly matters on mobile) ── */
  useEffect(() => {
    const target = document.getElementById(LEAD_FORM_ID);
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="vv-page">
      <VaricoseHero />
      <AboutVaricoseVeins />
      <BeforeAfterGallery midCta={<MidPageCTA />} />
      <VaricoseLeadForm />
      <WhyChooseUs />
      <VaricoseFAQs />

      <WhatsAppButton
        variant="floating"
        placement="floating"
        message={whatsappMessages.floating}
        hidden={formInView}
      />
    </main>
  );
}

