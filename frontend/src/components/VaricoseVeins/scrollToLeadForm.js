import { LEAD_FORM_ID } from '../../config/varicoseVeinsConfig';

/** Smooth-scrolls to the lead form and moves keyboard focus to its first field. */
export function scrollToLeadForm() {
  const section = document.getElementById(LEAD_FORM_ID);
  if (!section) return;

  section.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* Focus after the scroll starts; preventScroll stops the browser jumping */
  window.setTimeout(() => {
    const firstField = section.querySelector('input, textarea, select');
    if (firstField) firstField.focus({ preventScroll: true });
  }, 600);
}

