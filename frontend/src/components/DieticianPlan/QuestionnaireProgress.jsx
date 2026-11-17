import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * QuestionnaireProgress Component
 * Renders an accessible, responsive progress bar with step details.
 */
export default function QuestionnaireProgress({ currentStep, totalSteps, stepTitle }) {
  const { i18n } = useTranslation();
  const isMl = i18n.language === 'ml';
  const percent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div
      className="dp-progress-wrap no-print"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Questionnaire progress: step ${currentStep} of ${totalSteps}`}
    >
      <div className="dp-progress-meta">
        <span className="dp-progress-step-label">
          {isMl ? `ഘട്ടം ${currentStep} / ${totalSteps}: ` : `Step ${currentStep} of ${totalSteps}: `}
          <strong>{stepTitle}</strong>
        </span>
        <span className="dp-progress-percent">
          {percent}% {isMl ? 'പൂർത്തിയായി' : 'Completed'}
        </span>
      </div>

      <div className="dp-progress-bar-bg">
        <div
          className="dp-progress-bar-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
