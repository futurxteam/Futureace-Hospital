import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import DieticianHero from '../components/DieticianPlan/DieticianHero';
import DieticianHowItWorks from '../components/DieticianPlan/DieticianHowItWorks';
import QuestionnaireProgress from '../components/DieticianPlan/QuestionnaireProgress';
import PersonalDetailsStep from '../components/DieticianPlan/PersonalDetailsStep';
import GoalHabitsStep from '../components/DieticianPlan/GoalHabitsStep';
import MedicalStep from '../components/DieticianPlan/MedicalStep';
import NutritionHabitsStep from '../components/DieticianPlan/NutritionHabitsStep';
import LifestyleDigestionStep from '../components/DieticianPlan/LifestyleDigestionStep';
import AllergiesReviewStep from '../components/DieticianPlan/AllergiesReviewStep';
import DietPlanResult from '../components/DieticianPlan/DietPlanResult';
import DietPlanReport from '../components/DieticianPlan/DietPlanReport';
import DieticianConsultationCta from '../components/DieticianPlan/DieticianConsultationCta';
import LanguageSelectionModal from '../components/LanguageSelectionModal';
import WhatsAppFatLossSection from '../components/WhatsAppFatLossSection';

import { getDietPlan } from '../config/dietPlans';
import { calculateBMI } from '../utils/healthCalculations';
import { submitEnquiry } from '../api/enquiryApi';
import { trackLead, trackCustom, trackConsultationView } from '../utils/metaPixel';
import '../styles/dieticianPlan.css';

const TOTAL_QUESTIONNAIRE_STEPS = 6;
const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = 'futureace_language';

const STEP_TITLES_EN = [
  'Personal Details',
  'Weight Goals',
  'Medical History',
  'Eating Habits',
  'Lifestyle & Digestion',
  'Allergies & Review',
];

const STEP_TITLES_ML = [
  'വ്യക്തിഗത വിവരങ്ങൾ',
  'ഭാര നിയന്ത്രണ ലക്ഷ്യം',
  'മെഡിക്കൽ ചരിത്രം',
  'ഭക്ഷണശീലങ്ങൾ',
  'ജീവിതശൈലിയും ദഹനവും',
  'അലർജികളും വിവര പരിശോധനയും',
];

/**
 * DieticianPlan Page Component
 * Route: /dietician-plan
 *
 * Enhanced with:
 * 1. WhatsApp Fat Loss Challenge group integration
 * 2. Complete English/Malayalam bilingual support via react-i18next
 * 3. First-visit Language Selection Popup
 * 4. Non-destructive in-page language switcher
 */
export default function DieticianPlan() {
  const { t, i18n } = useTranslation();
  const isMl = i18n.language === 'ml';

  const [currentStep, setCurrentStep] = useState(1);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Step 1: Personal Details
  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    age: '',
    sex: '', // 'male' | 'female'
    heightCm: '',
    weightKg: '',
    mobile: '',
    email: '',
    privacyConsent: false,
  });

  // Steps 2 - 6: Questionnaire Answers (10 questions)
  const [answers, setAnswers] = useState({
    weightLossGoal: '',
    previousWeightLossAttempts: '',
    medicalConditions: [],
    otherMedicalConditions: '',
    dailyMainMeals: '',
    mealSkippingFrequency: '',
    foodPreference: '',
    physicalActivityLevel: '',
    bowelHabits: '',
    digestiveProblems: '',
    otherDigestiveProblems: '',
    foodAllergies: [],
    allergyDetails: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  // Resolved results state
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [bmiResult, setBmiResult] = useState(null);

  const questionnaireRef = useRef(null);
  const resultsRef = useRef(null);

  // Check for first-time visitor
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setShowLanguageModal(true);
      }
    } catch {
      /* ignore storage error */
    }
  }, []);

  // ── SEO & Page Tracking ───────────────────────────────────────────────────
  useEffect(() => {
    document.title = isMl
      ? 'വ്യക്തിഗത ഡയറ്റ് പ്ലാൻ | ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റൽ'
      : 'Personalized Dietician Plan | FutureAce Hospital';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      isMl
        ? 'നിങ്ങളുടെ പ്രായം, ലിംഗം, ജീവിതശൈലി, ഭക്ഷണ താല്പര്യങ്ങൾ എന്നിവയ്ക്കനുസരിച്ചുള്ള പ്രത്യേക സമീകൃത ഡയറ്റ് പ്ലാൻ ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റലിൽ നിന്ന് നേടൂ.'
        : 'Explore a personalized diet plan tailored to your age, sex, lifestyle, dietary preferences, and wellness goals at FutureAce Hospital.'
    );

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://futureacehospital.com/dietician-plan');

    // Fire ViewContent event safely
    try {
      trackConsultationView('Dietician Plan');
      trackCustom('DieticianPlanViewed', { source: 'dietician_plan_page' });
    } catch {
      /* ignore analytics error */
    }

    return () => {
      document.title = 'Futureace Hospital';
    };
  }, [isMl]);

  // ── Input Change Handlers ─────────────────────────────────────────────────
  const handlePersonalDetailsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePersonalDetailsDirect = (name, value) => {
    setPersonalDetails((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAnswerChange = (questionKey, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionKey]: value,
    }));
    if (errors[questionKey]) {
      setErrors((prev) => ({ ...prev, [questionKey]: '' }));
    }
  };

  // ── Step Validation Logic ─────────────────────────────────────────────────
  const validateStep = (stepNumber) => {
    const errs = {};

    if (stepNumber === 1) {
      if (!personalDetails.fullName.trim()) {
        errs.fullName = isMl ? 'ദയവായി നിങ്ങളുടെ പൂർണ്ണമായ പേര് നൽകുക.' : 'Please enter your full name.';
      }

      if (!personalDetails.age || isNaN(Number(personalDetails.age))) {
        errs.age = isMl ? 'പ്രായം നൽകേണ്ടതുണ്ട്.' : 'Age is required.';
      } else {
        const ageNum = Number(personalDetails.age);
        if (ageNum < 18) {
          errs.age = isMl ? 'മുതിർന്നവരുടെ ഡയറ്റ് പ്ലാനിന് 18 വയസ്സ് പൂർത്തിയായിരിക്കണം.' : 'This tool provides guidance for adults (age 18+).';
        } else if (ageNum > 120) {
          errs.age = isMl ? 'സാധുവായ പ്രായം നൽകുക.' : 'Please enter a valid age.';
        }
      }

      if (!personalDetails.sex) {
        errs.sex = isMl ? 'ദയവായി ലിംഗഭേദം തിരഞ്ഞെടുക്കുക.' : 'Please select your biological sex.';
      }

      if (!personalDetails.heightCm || isNaN(Number(personalDetails.heightCm))) {
        errs.heightCm = isMl ? 'ഉയരം നൽകേണ്ടതുണ്ട്.' : 'Height is required.';
      } else {
        const h = Number(personalDetails.heightCm);
        if (h < 50 || h > 250) {
          errs.heightCm = isMl ? 'സാധുവായ ഉയരം നൽകുക (50 - 250 cm).' : 'Please enter a plausible height between 50 cm and 250 cm.';
        }
      }

      if (!personalDetails.weightKg || isNaN(Number(personalDetails.weightKg))) {
        errs.weightKg = isMl ? 'ഭാരം നൽകേണ്ടതുണ്ട്.' : 'Weight is required.';
      } else {
        const w = Number(personalDetails.weightKg);
        if (w < 15 || w > 300) {
          errs.weightKg = isMl ? 'സാധുവായ ഭാരം നൽകുക (15 - 300 kg).' : 'Please enter a plausible weight between 15 kg and 300 kg.';
        }
      }

      const cleanMobile = personalDetails.mobile.replace(/[\s\-+()]/g, '');
      if (!cleanMobile) {
        errs.mobile = isMl ? 'മൊബൈൽ നമ്പർ നൽകേണ്ടതുണ്ട്.' : 'Mobile number is required.';
      } else if (cleanMobile.length === 10 && !INDIAN_MOBILE_REGEX.test(cleanMobile)) {
        errs.mobile = isMl ? 'സാധുവായ 10 അക്ക മൊബൈൽ നമ്പർ നൽകുക.' : 'Enter a valid 10-digit Indian mobile number.';
      } else if (cleanMobile.length < 7 || cleanMobile.length > 15) {
        errs.mobile = isMl ? 'സാധുവായ ഫോൺ നമ്പർ നൽകുക.' : 'Enter a valid mobile number (7 to 15 digits).';
      }

      if (personalDetails.email.trim() && !EMAIL_REGEX.test(personalDetails.email.trim())) {
        errs.email = isMl ? 'ശരിയായ ഇമെയിൽ വിലാസം നൽകുക.' : 'Please enter a valid email address.';
      }
    } else if (stepNumber === 2) {
      if (!answers.weightLossGoal) {
        errs.weightLossGoal = isMl ? 'ദയവായി നിങ്ങളുടെ ലക്ഷ്യം തിരഞ്ഞെടുക്കുക.' : 'Please select your primary weight-loss goal.';
      }
      if (!answers.previousWeightLossAttempts) {
        errs.previousWeightLossAttempts = isMl ? 'മുൻപ് ശ്രമിച്ചിട്ടുണ്ടോ എന്ന് വ്യക്തമാക്കുക.' : 'Please indicate if you have tried losing weight previously.';
      }
    } else if (stepNumber === 3) {
      const conditions = Array.isArray(answers.medicalConditions) ? answers.medicalConditions : [];
      if (conditions.length === 0) {
        errs.medicalConditions = isMl ? 'ഒരു ഓപ്ഷൻ തിരഞ്ഞെടുക്കുക (അല്ലെങ്കിൽ "രോഗാവസ്ഥകളില്ല").' : 'Please select an option (or "No known conditions").';
      }
    } else if (stepNumber === 4) {
      if (!answers.dailyMainMeals) {
        errs.dailyMainMeals = isMl ? 'പ്രതിദിന ഭക്ഷണങ്ങളുടെ എണ്ണം തിരഞ്ഞെടുക്കുക.' : 'Please indicate how many main meals you eat daily.';
      }
      if (!answers.mealSkippingFrequency) {
        errs.mealSkippingFrequency = isMl ? 'ഭക്ഷണം ഒഴിവാക്കാറുണ്ടോ എന്ന് തിരഞ്ഞെടുക്കുക.' : 'Please indicate how often you skip meals.';
      }
      if (!answers.foodPreference) {
        errs.foodPreference = isMl ? 'നിങ്ങളുടെ ഭക്ഷണ താല്പര്യം തിരഞ്ഞെടുക്കുക.' : 'Please select your current food preference.';
      }
    } else if (stepNumber === 5) {
      if (!answers.physicalActivityLevel) {
        errs.physicalActivityLevel = isMl ? 'ശാരീരിക വ്യായാമം എത്രത്തോളമെന്ന് തിരഞ്ഞെടുക്കുക.' : 'Please select your physical activity level.';
      }
      if (!answers.bowelHabits) {
        errs.bowelHabits = isMl ? 'മലശോധന എങ്ങനെയെന്ന് തിരഞ്ഞെടുക്കുക.' : 'Please select your usual bowel habits.';
      }
      if (!answers.digestiveProblems) {
        errs.digestiveProblems = isMl ? 'ദഹന പ്രശ്നങ്ങൾ ഉണ്ടോയെന്ന് തിരഞ്ഞെടുക്കുക.' : 'Please select how often you experience digestive problems.';
      }
    } else if (stepNumber === 6) {
      const allergies = Array.isArray(answers.foodAllergies) ? answers.foodAllergies : [];
      if (allergies.length === 0) {
        errs.foodAllergies = isMl ? 'അലർജികൾ തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ "അലർജികളില്ല" എന്നത് തിരഞ്ഞെടുക്കുക.' : 'Please select any food allergies or choose "None known".';
      }
      if (!personalDetails.privacyConsent) {
        errs.privacyConsent = isMl
          ? 'ഡയറ്റ് പ്ലാൻ ലഭിക്കുന്നതിനായി പ്രൈവസി പോളിസിയും നിബന്ധനകളും അംഗീകരിക്കേണ്ടതുണ്ട്.'
          : 'You must agree to the Privacy Policy and Terms & Conditions to generate your plan.';
      }
    }

    return errs;
  };

  // ── Navigation Functions ──
  const handleNext = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    if (questionnaireRef.current) {
      questionnaireRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBack = () => {
    setErrors({});
    const prevStep = Math.max(1, currentStep - 1);
    setCurrentStep(prevStep);

    if (questionnaireRef.current) {
      questionnaireRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNavigateToStep = (targetStep) => {
    setErrors({});
    setCurrentStep(targetStep);
    if (questionnaireRef.current) {
      questionnaireRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // ── Submission and Plan Generation ────────────────────────────────────────
  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setApiError('');

    // Comprehensive validation across all steps
    for (let s = 1; s <= 6; s++) {
      const stepErrs = validateStep(s);
      if (Object.keys(stepErrs).length > 0) {
        setErrors(stepErrs);
        setCurrentStep(s);
        return;
      }
    }

    // 1. Identify matching diet plan based on age and sex
    const resolvedPlan = getDietPlan(personalDetails.age, personalDetails.sex);

    if (!resolvedPlan) {
      setErrors({ age: isMl ? 'നൽകിയ പ്രായത്തിനും ലിംഗത്തിനും പ്ലാൻ ലഭ്യമല്ല. പ്രായം 18 അല്ലെങ്കിൽ അതിൽ കൂടുതലായിരിക്കണം.' : 'Unable to match diet plan for the entered age and sex. Age must be 18 or above.' });
      setCurrentStep(1);
      return;
    }

    // 2. Calculate BMI using established calculation utility
    const calculated = calculateBMI({
      weightKg: Number(personalDetails.weightKg),
      heightCm: Number(personalDetails.heightCm),
      age: Number(personalDetails.age),
      gender: personalDetails.sex,
    });

    setSelectedPlan(resolvedPlan);
    setBmiResult(calculated);

    // 3. Submit enquiry to existing FutureAce Google Sheets integration
    setIsSubmitting(true);

    try {
      const cleanMobile = personalDetails.mobile.replace(/[\s\-+()]/g, '');
      const medicalSummary = Array.isArray(answers.medicalConditions)
        ? answers.medicalConditions.join(', ')
        : answers.medicalConditions || 'None reported';
      const allergySummary = Array.isArray(answers.foodAllergies)
        ? answers.foodAllergies.join(', ')
        : answers.foodAllergies || 'None known';

      const selectedLanguage = isMl ? 'Malayalam' : 'English';

      const generatedNotes = `Source: Dietician Plan | Language: ${selectedLanguage} | Group: ${resolvedPlan.label} | Goal: ${answers.weightLossGoal} | Food Preference: ${answers.foodPreference} | Activity: ${answers.physicalActivityLevel} | Medical: ${medicalSummary}${answers.otherMedicalConditions ? ` (${answers.otherMedicalConditions})` : ''} | Digestion: ${answers.digestiveProblems} | Allergies: ${allergySummary}${answers.allergyDetails ? ` (${answers.allergyDetails})` : ''}`;

      const dynamicFields = {
        sourceFeature: 'Dietician Plan',
        preferredLanguage: selectedLanguage,
        ageGroup: resolvedPlan.label,
        sex: personalDetails.sex,
        heightCm: Number(personalDetails.heightCm),
        weightKg: Number(personalDetails.weightKg),
        bmi: calculated?.bmi ?? null,
        bmiCategory: calculated?.category?.label || 'Assessed',
        weightLossGoal: answers.weightLossGoal,
        previousWeightLossAttempts: answers.previousWeightLossAttempts,
        medicalConditions: answers.medicalConditions,
        otherMedicalConditions: answers.otherMedicalConditions || '',
        dailyMainMeals: answers.dailyMainMeals,
        mealSkippingFrequency: answers.mealSkippingFrequency,
        foodPreference: answers.foodPreference,
        physicalActivityLevel: answers.physicalActivityLevel,
        bowelHabits: answers.bowelHabits,
        digestiveProblems: answers.digestiveProblems,
        otherDigestiveProblems: answers.otherDigestiveProblems || '',
        foodAllergies: answers.foodAllergies,
        allergyDetails: answers.allergyDetails || '',
        privacyConsent: true,
      };

      const payload = {
        consultationType: 'Dietician Plan',
        patientName: personalDetails.fullName.trim(),
        mobile: cleanMobile,
        email: personalDetails.email.trim() || undefined,
        age: Number(personalDetails.age),
        city: '',
        preferredDate: '',
        preferredLanguage: selectedLanguage,
        notes: generatedNotes,
        privacyConsent: true,
        dynamicFields,
      };

      await submitEnquiry(payload);

      // Confirmed API success
      setSubmissionSuccess(true);

      try {
        trackLead({ consultation_type: 'Dietician Plan' });
        trackCustom('DieticianPlanLeadSubmitted', {
          age_group: resolvedPlan.label,
          food_preference: answers.foodPreference,
          preferred_language: selectedLanguage,
        });
      } catch {
        /* ignore analytics error */
      }
    } catch (err) {
      console.error('Lead submission failed:', err);
      // Keep plan available while showing retry option
      setApiError(
        err.message || (isMl ? 'വിവരങ്ങൾ രേഖപ്പെടുത്താൻ കഴിഞ്ഞില്ല. എങ്കിലും നിങ്ങളുടെ ഡയറ്റ് പ്ലാൻ താഴെ കാണാനും പ്രിന്റ് ചെയ്യാനും സാധിക്കും.' : 'Unable to store your lead details at this moment. You may still view and print your diet plan below.')
      );
    } finally {
      setIsSubmitting(false);
      setCurrentStep(7); // Advance to Results view

      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const handlePrint = () => {
    try {
      trackCustom('DietPlanReportPrinted', {
        age_group: selectedPlan?.label,
        food_preference: answers.foodPreference,
      });
    } catch {
      /* ignore analytics error */
    }
    window.print();
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setSelectedPlan(null);
    setBmiResult(null);
    setSubmissionSuccess(false);
    setApiError('');
    setPersonalDetails({
      fullName: '',
      age: '',
      sex: '',
      heightCm: '',
      weightKg: '',
      mobile: '',
      email: '',
      privacyConsent: false,
    });
    setAnswers({
      weightLossGoal: '',
      previousWeightLossAttempts: '',
      medicalConditions: [],
      otherMedicalConditions: '',
      dailyMainMeals: '',
      mealSkippingFrequency: '',
      foodPreference: '',
      physicalActivityLevel: '',
      bowelHabits: '',
      digestiveProblems: '',
      otherDigestiveProblems: '',
      foodAllergies: [],
      allergyDetails: '',
    });
    if (questionnaireRef.current) {
      questionnaireRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const stepTitles = isMl ? STEP_TITLES_ML : STEP_TITLES_EN;

  return (
    <div className="dp-page-wrapper">
      {/* First-time visitor language modal */}
      <LanguageSelectionModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      <div className="dp-container">

        {/* =====================================================================
            SECTION A: HERO
           ===================================================================== */}
        <DieticianHero
          onStartClick={() => {
            if (questionnaireRef.current) {
              questionnaireRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
        />

        {/* =====================================================================
            SECTION B: HOW IT WORKS
           ===================================================================== */}
        <DieticianHowItWorks />

        {/* =====================================================================
            SECTION C: MULTISTEP QUESTIONNAIRE (Steps 1 to 6)
           ===================================================================== */}
        {currentStep <= 6 && (
          <div ref={questionnaireRef} className="no-print">
            <div className="dp-questionnaire-card">
              <QuestionnaireProgress
                currentStep={currentStep}
                totalSteps={TOTAL_QUESTIONNAIRE_STEPS}
                stepTitle={stepTitles[currentStep - 1]}
              />

              {currentStep === 1 && (
                <PersonalDetailsStep
                  form={personalDetails}
                  errors={errors}
                  onChange={handlePersonalDetailsChange}
                />
              )}

              {currentStep === 2 && (
                <GoalHabitsStep
                  answers={answers}
                  errors={errors}
                  onAnswerChange={handleAnswerChange}
                />
              )}

              {currentStep === 3 && (
                <MedicalStep
                  answers={answers}
                  errors={errors}
                  onAnswerChange={handleAnswerChange}
                />
              )}

              {currentStep === 4 && (
                <NutritionHabitsStep
                  answers={answers}
                  errors={errors}
                  onAnswerChange={handleAnswerChange}
                />
              )}

              {currentStep === 5 && (
                <LifestyleDigestionStep
                  answers={answers}
                  errors={errors}
                  onAnswerChange={handleAnswerChange}
                />
              )}

              {currentStep === 6 && (
                <AllergiesReviewStep
                  form={personalDetails}
                  answers={answers}
                  errors={errors}
                  onAnswerChange={handleAnswerChange}
                  onFormChange={handlePersonalDetailsDirect}
                  onNavigateToStep={handleNavigateToStep}
                />
              )}

              {/* Questionnaire Navigation Buttons */}
              <div className="dp-actions-row">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    className="dp-btn-back"
                    onClick={handleBack}
                    id="dp-btn-back-step"
                  >
                    <ArrowLeft size={16} />
                    <span>{t('common.back')}</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 6 ? (
                  <button
                    type="button"
                    className="dp-btn-next"
                    onClick={handleNext}
                    id="dp-btn-next-step"
                  >
                    <span>{t('common.continue')}</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="dp-btn-submit"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    id="dp-btn-submit-questionnaire"
                    aria-busy={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>{isMl ? 'ഡയറ്റ് പ്ലാൻ തയ്യാറാക്കുന്നു…' : 'Generating Your Diet Plan…'}</span>
                      </>
                    ) : (
                      <>
                        <span>{isMl ? 'സമർപ്പിച്ച് ഡയറ്റ് പ്ലാൻ കാണുക' : 'Submit & View My Diet Plan'}</span>
                        <CheckCircle2 size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            SECTION D: RESULTS VIEW (Step 7)
           ===================================================================== */}
        {currentStep === 7 && selectedPlan && (
          <div ref={resultsRef}>
            {/* API Status Alerts */}
            {submissionSuccess && (
              <div className="dp-notice-card info no-print" style={{ marginBottom: '20px' }}>
                <CheckCircle2 size={20} className="dp-notice-icon" />
                <div>
                  <strong>{isMl ? 'കൺസൾട്ടേഷൻ അഭ്യർത്ഥന ലഭിച്ചു:' : 'Dietician Consultation Request Submitted:'}</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '0.88rem' }}>
                    {isMl
                      ? `നന്ദി, ${personalDetails.fullName}! നിങ്ങളുടെ വിവരങ്ങൾ ഫ്യൂച്ചർഏസ് ഹോസ്പിറ്റൽ വെൽനസ് ഡെസ്കിൽ വിജയകരമായി ലഭിച്ചിട്ടുണ്ട്.`
                      : `Thank you, ${personalDetails.fullName}! Your dietary preferences and contact details (${personalDetails.mobile}) have been received by the FutureAce Hospital wellness desk.`}
                  </p>
                </div>
              </div>
            )}

            {apiError && (
              <div className="dp-notice-card warning no-print" style={{ marginBottom: '20px' }}>
                <AlertCircle size={20} className="dp-notice-icon" />
                <div style={{ flex: 1 }}>
                  <strong>{isMl ? 'അറിയിപ്പ്:' : 'Lead Submission Notice:'}</strong>
                  <p style={{ margin: '4px 0 8px', fontSize: '0.88rem' }}>{apiError}</p>
                  <button
                    type="button"
                    className="dp-btn-back"
                    style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <RefreshCw size={14} />
                    <span>{isMl ? 'വീണ്ടും ശ്രമിക്കുക' : 'Retry Lead Submission'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Interactive Result Card */}
            <DietPlanResult
              plan={selectedPlan}
              form={personalDetails}
              answers={answers}
              bmiResult={bmiResult}
              onPrintClick={handlePrint}
              onRestartClick={handleRestart}
            />

            {/* Printable HTML Report (Visible in Print & Print Preview) */}
            <div className="dp-printable-report-wrapper">
              <DietPlanReport
                plan={selectedPlan}
                form={personalDetails}
                answers={answers}
                bmiResult={bmiResult}
              />
            </div>

            {/* =====================================================================
                SECTION E: CONSULTATION CTA
               ===================================================================== */}
            <div id="dp-consultation-cta-section">
              <DieticianConsultationCta
                onConsultationClick={() => {
                  window.location.href = '/book-consultation';
                }}
              />
            </div>

            {/* =====================================================================
                FEATURE 1: WHATSAPP FAT LOSS CHALLENGE GROUP
                Placed after Dietician Plan section & results as requested!
               ===================================================================== */}
            <WhatsAppFatLossSection />
          </div>
        )}
      </div>
    </div>
  );
}
