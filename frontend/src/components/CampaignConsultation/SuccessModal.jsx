import React from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   SUCCESS MODAL
   Props:
     isOpen       — boolean
     config       — consultation type config (for successTitle + successMessage)
     onClose      — callback to close modal and reset form
───────────────────────────────────────────────────────────────────────────── */
export default function SuccessModal({ isOpen, config, onClose }) {
  /* Close on ESC key */
  React.useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  /* Trap body scroll while open */
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !config) return null;

  return (
    <div
      className="bk-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bk-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bk-modal">

        {/* Green check circle */}
        <div className="bk-modal-check" aria-hidden="true">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="bk-modal-title" id="bk-modal-title">
          {config.successTitle}
        </h2>

        {/* Type-specific message */}
        <p className="bk-modal-message">
          {config.successMessage}
        </p>

        {/* Close */}
        <button
          className="bk-modal-close-btn"
          onClick={onClose}
          id="bk-modal-close"
          aria-label="Close confirmation and return to form"
        >
          Done
        </button>

      </div>
    </div>
  );
}
