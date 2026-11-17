/**
 * utils/healthCalculations.js
 *
 * Health screening calculations for adult South Asian / Indian clinical screening references.
 *
 * Clinical References & Sources:
 * 1. WHO Expert Consultation. Appropriate body-mass index for Asian populations
 *    and its implications for policy and intervention strategies. Lancet 2004; 363: 157–63.
 * 2. Consensus Guidelines for Asian Indians (Misra A, Chowbey P, Makkar BM, et al.
 *    Consensus statement for diagnosis of obesity, abdominal obesity and the metabolic
 *    syndrome for Asian Indians. Journal of the Association of Physicians of India. 2009; 57: 163-170):
 *      - Underweight: < 18.5 kg/m²
 *      - Reference Healthy: 18.5 – 22.9 kg/m²
 *      - Overweight: 23.0 – 24.9 kg/m²
 *      - Obesity: >= 25.0 kg/m²
 *      - Abdominal obesity cutoff (waist circumference): >= 90 cm (men), >= 80 cm (women)
 * 3. Waist-to-Height Ratio (Ashwell M, et al.):
 *      - Ratio >= 0.50 is an established screening threshold for central adiposity ("Keep waist to less than half height").
 * 4. NCEP ATP III & IDF Consensus for Metabolic Syndrome in South Asians.
 */

export const BMI_CATEGORIES = {
  UNDERWEIGHT: {
    key: 'underweight',
    label: 'Underweight Range',
    rangeLabel: '< 18.5 kg/m²',
    min: 0,
    max: 18.49,
    badgeColor: '#0284c7', // Sky Blue
    badgeBg: '#f0f9ff',
    badgeBorder: '#bae6fd',
    description:
      'Your calculated BMI is below the standard reference range for South Asian adults. Being underweight may be associated with insufficient nutritional intake, reduced bone density, or underlying medical factors. A clinical consultation is advised if this is unintentional or accompanied by fatigue.',
    recommendation:
      'Consider consulting a healthcare provider or registered dietitian to assess nutritional intake and rule out underlying deficiencies. Avoid unmonitored mass-gain diets.',
  },
  HEALTHY: {
    key: 'healthy',
    label: 'Reference Healthy-Weight Range',
    rangeLabel: '18.5 – 22.9 kg/m²',
    min: 18.5,
    max: 22.99,
    badgeColor: '#16a34a', // Emerald Green
    badgeBg: '#f0fdf4',
    badgeBorder: '#bbf7d0',
    description:
      'Your calculated BMI falls within the reference healthy-weight range for South Asian adults. Remember that BMI is a general screening metric; it does not measure body fat percentage or differentiate visceral from subcutaneous fat.',
    recommendation:
      'Maintain your active lifestyle with at least 150 minutes of moderate aerobic physical activity weekly, a balanced diet rich in whole foods, and routine annual wellness checkups.',
  },
  OVERWEIGHT: {
    key: 'overweight',
    label: 'Overweight Range',
    rangeLabel: '23.0 – 24.9 kg/m²',
    min: 23.0,
    max: 24.99,
    badgeColor: '#d97706', // Amber / Orange
    badgeBg: '#fffbeb',
    badgeBorder: '#fde68a',
    description:
      'Your calculated BMI falls in the overweight range for South Asian adults (Consensus Guidelines for Asian Indians). Clinical evidence demonstrates that metabolic risks (insulin resistance, dyslipidemia, fatty liver) emerge at lower BMI cutoffs in South Asians compared to Western populations.',
    recommendation:
      'A consultation with a physician can evaluate key metabolic parameters (blood pressure, lipid profile, HbA1c) and guide sustainable lifestyle or dietary modifications.',
  },
  OBESITY: {
    key: 'obesity',
    label: 'Obesity Range',
    rangeLabel: '≥ 25.0 kg/m²',
    min: 25.0,
    max: Infinity,
    badgeColor: '#dc2626', // Red
    badgeBg: '#fef2f2',
    badgeBorder: '#fecaca',
    description:
      'Your calculated BMI falls within the obesity screening range for South Asian adults. Elevated BMI is correlated with increased risk of Type 2 diabetes, hypertension, coronary artery disease, and metabolic-associated fatty liver disease.',
    recommendation:
      'We recommend discussing your results with a healthcare professional at FutureAce Hospital for a comprehensive cardiovascular and metabolic health evaluation.',
  },
};

export const EXISTING_CONDITIONS_LIST = [
  'Type 2 Diabetes',
  'High Blood Pressure',
  'PCOD / PCOS',
  'Fatty Liver',
  'High Triglycerides',
  'Thyroid Disorder',
];

export const MUTUALLY_EXCLUSIVE_OPTIONS = {
  NONE: 'None of the above',
  PREFER_NOT_TO_SAY: 'Prefer not to say',
};

/**
 * Clinical significance descriptions for self-reported conditions in South Asians.
 */
export const CONDITION_DETAILS = {
  'Type 2 Diabetes': {
    title: 'Type 2 Diabetes',
    category: 'Glycemic Regulation',
    severity: 'High',
    clinicalNote:
      'Directly indicates chronic insulin resistance or impaired beta-cell function. South Asians have a heightened genetic susceptibility to early-onset diabetes.',
    clinicalGuidance:
      'Regular HbA1c monitoring (every 3–6 months), annual diabetic kidney screening (uACR), and retinal evaluation are clinically indicated.',
  },
  'High Blood Pressure': {
    title: 'High Blood Pressure',
    category: 'Cardiovascular Risk',
    severity: 'High',
    clinicalNote:
      'A core vascular indicator of metabolic dysregulation. Significantly increases long-term risk of coronary artery disease and stroke.',
    clinicalGuidance:
      'Routine home blood pressure monitoring, low-sodium dietary habits, and periodic cardiac assessment are advised.',
  },
  'PCOD / PCOS': {
    title: 'PCOD / PCOS',
    category: 'Endocrine & Metabolic',
    severity: 'Moderate',
    clinicalNote:
      'Polycystic Ovarian Disease/Syndrome is strongly linked to hyperinsulinemia and central adiposity, predisposing individuals to early impaired glucose tolerance.',
    clinicalGuidance:
      'Endocrine and gynecological monitoring, regular fasting glucose checks, and targeted insulin-sensitizing lifestyle guidance are recommended.',
  },
  'Fatty Liver': {
    title: 'Fatty Liver (MASLD)',
    category: 'Hepatic Adiposity',
    severity: 'Moderate to High',
    clinicalNote:
      'Metabolic dysfunction-associated steatotic liver disease is the hepatic manifestation of metabolic syndrome, characterized by ectopic lipid accumulation.',
    clinicalGuidance:
      'Liver enzyme panels (ALT, AST), ultrasound elastography if indicated, and dietary optimization to reduce hepatic triglycerides.',
  },
  'High Triglycerides': {
    title: 'High Triglycerides',
    category: 'Atherogenic Dyslipidemia',
    severity: 'Moderate to High',
    clinicalNote:
      'A diagnostic hallmark of South Asian dyslipidemia (elevated triglycerides, low HDL, elevated small dense LDL particles).',
    clinicalGuidance:
      'Comprehensive fasting lipid profile review, reduction of refined carbohydrates and trans fats, and clinical lipid management.',
  },
  'Thyroid Disorder': {
    title: 'Thyroid Disorder',
    category: 'Metabolic Rate',
    severity: 'Contextual',
    clinicalNote:
      'Hypothyroidism reduces resting basal metabolic rate, often contributing to fatigue, dyslipidemia, and difficulty with weight management.',
    clinicalGuidance:
      'Periodic serum TSH and Free T4 monitoring to maintain euthyroid state under endocrinological supervision.',
  },
};

/**
 * Validates height and weight numbers defensively.
 */
export function validateAnthropometrics(weightKg, heightCm) {
  const w = parseFloat(weightKg);
  const h = parseFloat(heightCm);

  if (isNaN(w) || isNaN(h)) {
    return { valid: false, error: 'Please enter valid numeric values for height and weight.' };
  }
  if (w <= 0 || h <= 0) {
    return { valid: false, error: 'Height and weight must be positive numbers greater than zero.' };
  }
  if (h < 50 || h > 250) {
    return { valid: false, error: 'Please enter a plausible height between 50 cm and 250 cm.' };
  }
  if (w < 15 || w > 300) {
    return { valid: false, error: 'Please enter a plausible weight between 15 kg and 300 kg.' };
  }
  return { valid: true, weight: w, height: h };
}

/**
 * Resolves South Asian adult BMI category.
 */
export function getBMICategory(bmi, age = null) {
  const parsedAge = age !== null && age !== '' && !isNaN(Number(age)) ? Number(age) : null;

  if (parsedAge !== null && parsedAge < 18) {
    return {
      isPediatric: true,
      key: 'pediatric',
      label: 'Pediatric Assessment Required (< 18 years)',
      rangeLabel: 'Age- and sex-specific percentiles',
      badgeColor: '#6366f1',
      badgeBg: '#eef2ff',
      badgeBorder: '#c7d2fe',
      description:
        'Standard adult BMI screening categories do not apply to individuals under 18 years. Clinical evaluation for children and adolescents requires age- and sex-specific growth percentiles (IAP / WHO growth standards).',
      recommendation:
        'Please consult a pediatrician for an age- and sex-appropriate developmental and growth assessment. Do not apply adult BMI cutoffs to children.',
    };
  }

  if (bmi < 18.5) {
    return { ...BMI_CATEGORIES.UNDERWEIGHT, isPediatric: false };
  }
  if (bmi <= 22.9) {
    return { ...BMI_CATEGORIES.HEALTHY, isPediatric: false };
  }
  if (bmi <= 24.9) {
    return { ...BMI_CATEGORIES.OVERWEIGHT, isPediatric: false };
  }
  return { ...BMI_CATEGORIES.OBESITY, isPediatric: false };
}

/**
 * Independent BMI Calculator function.
 * Formula: weight (kg) / (height (m) ^ 2)
 *
 * Can accept either an object { weightKg, heightCm, age, gender } or positional args.
 *
 * @param {object|number} inputOrWeight
 * @param {number} [heightParam]
 * @param {number} [ageParam]
 * @param {string} [genderParam]
 * @returns {object} Full BMI calculation result object
 */
export function calculateBMI(inputOrWeight, heightParam, ageParam, genderParam) {
  let weightKg;
  let heightCm;
  let age = null;
  let gender = null;

  if (typeof inputOrWeight === 'object' && inputOrWeight !== null) {
    weightKg = inputOrWeight.weightKg ?? inputOrWeight.weight;
    heightCm = inputOrWeight.heightCm ?? inputOrWeight.height;
    age = inputOrWeight.age ?? null;
    gender = inputOrWeight.gender ?? null;
  } else {
    weightKg = inputOrWeight;
    heightCm = heightParam;
    age = ageParam ?? null;
    gender = genderParam ?? null;
  }

  const validation = validateAnthropometrics(weightKg, heightCm);
  if (!validation.valid) {
    return {
      success: false,
      bmi: null,
      error: validation.error,
    };
  }

  const { weight, height } = validation;
  const heightM = height / 100;
  const rawBmi = weight / (heightM * heightM);

  if (!isFinite(rawBmi) || isNaN(rawBmi)) {
    return {
      success: false,
      bmi: null,
      error: 'Calculation produced an invalid result. Please review inputs.',
    };
  }

  const bmi = Math.round(rawBmi * 10) / 10;
  const category = getBMICategory(bmi, age);

  return {
    success: true,
    calculatorType: 'bmi',
    bmi,
    category,
    heightCm: height,
    weightKg: weight,
    age: age ? parseInt(age, 10) : null,
    gender: gender || null,
    timestamp: new Date(),
    error: null,
  };
}

/**
 * Calculates Waist-to-Height Ratio (WHtR).
 * Formula: waist circumference (cm) / height (cm)
 */
export function calculateWaistToHeightRatio(waistCm, heightCm, age = null) {
  if (waistCm === null || waistCm === '' || waistCm === undefined) {
    return null;
  }

  const w = parseFloat(waistCm);
  const h = parseFloat(heightCm);
  const parsedAge = age !== null && age !== '' && !isNaN(Number(age)) ? Number(age) : null;

  if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
    return null;
  }

  if (parsedAge !== null && parsedAge < 18) {
    return {
      ratio: null,
      ratioFormatted: 'N/A',
      isElevated: false,
      isPediatric: true,
      threshold: '0.50 (adults)',
      description: 'Waist-to-height ratio thresholds are validated for adult populations.',
    };
  }

  const rawRatio = w / h;
  const ratio = Math.round(rawRatio * 100) / 100;
  const isElevated = ratio >= 0.5;

  return {
    ratio,
    ratioFormatted: ratio.toFixed(2),
    isElevated,
    isPediatric: false,
    threshold: '0.50',
    description: isElevated
      ? 'Your waist-to-height ratio is 0.50 or higher (South Asian screening threshold), indicating increased central/abdominal fat distribution.'
      : 'Your waist-to-height ratio is below 0.50, which falls within standard healthy screening limits.',
  };
}

/**
 * Evaluates Waist Circumference against South Asian adult consensus cutoffs:
 * Men: >= 90 cm
 * Women: >= 80 cm
 */
export function getWaistCircumferenceIndicator(waistCm, gender, age = null) {
  if (waistCm === null || waistCm === '' || waistCm === undefined) {
    return null;
  }

  const w = parseFloat(waistCm);
  const parsedAge = age !== null && age !== '' && !isNaN(Number(age)) ? Number(age) : null;

  if (isNaN(w) || w <= 0) {
    return null;
  }

  if (parsedAge !== null && parsedAge < 18) {
    return {
      waistCm: w,
      threshold: null,
      isElevated: false,
      isPediatric: true,
      genderSpecified: false,
      description: 'Adult waist circumference cutoffs do not apply under 18 years of age.',
    };
  }

  const normalizedGender = (gender || '').toLowerCase();

  if (normalizedGender === 'male') {
    const isElevated = w >= 90;
    return {
      waistCm: w,
      threshold: '90 cm',
      isElevated,
      isPediatric: false,
      genderSpecified: true,
      genderLabel: 'Male',
      description: isElevated
        ? `Waist circumference (${w} cm) exceeds the South Asian adult male reference threshold (≥ 90 cm), indicating abdominal adiposity.`
        : `Waist circumference (${w} cm) is within the reference cutoff (< 90 cm) for South Asian adult men.`,
    };
  }

  if (normalizedGender === 'female') {
    const isElevated = w >= 80;
    return {
      waistCm: w,
      threshold: '80 cm',
      isElevated,
      isPediatric: false,
      genderSpecified: true,
      genderLabel: 'Female',
      description: isElevated
        ? `Waist circumference (${w} cm) exceeds the South Asian adult female reference threshold (≥ 80 cm), indicating abdominal adiposity.`
        : `Waist circumference (${w} cm) is within the reference cutoff (< 80 cm) for South Asian adult women.`,
    };
  }

  // Gender not specified / prefer not to say
  return {
    waistCm: w,
    threshold: '90 cm (men) / 80 cm (women)',
    isElevated: w >= 90 ? true : w < 80 ? false : null,
    isPediatric: false,
    genderSpecified: false,
    genderLabel: 'Not specified',
    description: `Waist measurement: ${w} cm. South Asian adult reference cutoffs are 90 cm for men and 80 cm for women.`,
  };
}

/**
 * Independent Metabolic Risk Assessment Calculator.
 *
 * Implements a transparent, documented indicator-based clinical screening evaluation.
 * Does NOT invent arbitrary numerical percentage scores.
 *
 * Evaluates:
 * 1. BMI against South Asian adult thresholds (overweight >= 23.0, obesity >= 25.0)
 * 2. Waist circumference against South Asian adult cutoffs (men >= 90cm, women >= 80cm)
 * 3. Waist-to-Height Ratio (WHtR) against central adiposity threshold (>= 0.50)
 * 4. Self-reported metabolic conditions (Diabetes, Hypertension, PCOD, Fatty Liver, High Triglycerides, Thyroid)
 *
 * @param {object} inputs
 * @param {object} [inputs.personalDetails] - { fullName, phone, email }
 * @param {object} inputs.measurements - { age, gender, weightKg, heightCm, waistCm }
 * @param {string[]} [inputs.selectedConditions] - Array of condition strings
 * @returns {object} Complete Metabolic Risk Assessment result object
 */
export function calculateMetabolicRisk(inputs = {}) {
  const {
    personalDetails = {},
    measurements = {},
    selectedConditions = [],
  } = inputs;

  const age = measurements.age ? parseInt(measurements.age, 10) : null;
  const gender = measurements.gender || 'prefer-not-to-say';
  const weightKg = parseFloat(measurements.weightKg);
  const heightCm = parseFloat(measurements.heightCm);
  const waistCm = measurements.waistCm ? parseFloat(measurements.waistCm) : null;

  // Validation
  if (isNaN(age) || age < 1 || age > 120) {
    return {
      success: false,
      error: 'Please enter a valid age between 1 and 120 years.',
    };
  }

  const validation = validateAnthropometrics(weightKg, heightCm);
  if (!validation.valid) {
    return {
      success: false,
      error: validation.error,
    };
  }

  // Filter conditions
  const activeConditions = (selectedConditions || []).filter(
    (c) =>
      c !== MUTUALLY_EXCLUSIVE_OPTIONS.NONE &&
      c !== MUTUALLY_EXCLUSIVE_OPTIONS.PREFER_NOT_TO_SAY
  );

  // 1. BMI calculation (as one screening component)
  const bmiResult = calculateBMI({ weightKg, heightCm, age, gender });
  const bmi = bmiResult.bmi;
  const bmiCategory = bmiResult.category;

  // 2. Waist-to-Height Ratio
  const wthResult = calculateWaistToHeightRatio(waistCm, heightCm, age);

  // 3. Waist Circumference
  const waistResult = getWaistCircumferenceIndicator(waistCm, gender, age);

  // 4. Pediatric case check
  if (age < 18) {
    return {
      success: true,
      calculatorType: 'metabolic_risk',
      personalDetails: {
        fullName: personalDetails.fullName?.trim() || null,
        phone: personalDetails.phone?.trim() || null,
        email: personalDetails.email?.trim() || null,
      },
      measurements: {
        age,
        gender,
        heightCm,
        weightKg,
        waistCm,
      },
      bmi,
      bmiCategory,
      wthResult,
      waistResult,
      selectedConditions: activeConditions,
      conditionDetailsList: activeConditions.map((c) => CONDITION_DETAILS[c] || { title: c }),
      riskClassification: {
        levelKey: 'pediatric',
        levelLabel: 'Pediatric Assessment Required',
        badgeColor: '#6366f1',
        badgeBg: '#eef2ff',
        badgeBorder: '#c7d2fe',
        summaryText:
          'Adult metabolic screening criteria do not apply to children or adolescents under 18 years of age.',
        clinicalExplanation:
          'In children and adolescents, metabolic and anthropometric health is evaluated using age- and sex-specific percentile growth charts (IAP / WHO growth curves). We advise consulting a pediatrician for specialized guidance.',
      },
      elevatedIndicators: [],
      optimalIndicators: [],
      recommendedNextSteps: [
        'Schedule a pediatric wellness consultation at FutureAce Hospital.',
        'Avoid applying adult dietary or calorie restrictions to growing children without clinical oversight.',
      ],
      timestamp: new Date(),
    };
  }

  // 5. Evaluate individual screening indicators
  const elevatedIndicators = [];
  const optimalIndicators = [];

  // BMI evaluation
  if (bmi >= 25.0) {
    elevatedIndicators.push({
      key: 'bmi',
      label: 'Body Mass Index (Obesity Range)',
      value: `${bmi} kg/m²`,
      threshold: 'Healthy reference: 18.5 – 22.9 kg/m²',
      clinicalReason: 'BMI falls in the South Asian obesity screening range (≥ 25.0 kg/m²).',
      status: 'Elevated',
    });
  } else if (bmi >= 23.0) {
    elevatedIndicators.push({
      key: 'bmi',
      label: 'Body Mass Index (Overweight Range)',
      value: `${bmi} kg/m²`,
      threshold: 'Healthy reference: 18.5 – 22.9 kg/m²',
      clinicalReason: 'BMI falls in the South Asian overweight screening range (23.0 – 24.9 kg/m²).',
      status: 'Elevated',
    });
  } else if (bmi < 18.5) {
    elevatedIndicators.push({
      key: 'bmi',
      label: 'Body Mass Index (Underweight Range)',
      value: `${bmi} kg/m²`,
      threshold: 'Healthy reference: 18.5 – 22.9 kg/m²',
      clinicalReason: 'BMI is below the healthy reference range (< 18.5 kg/m²).',
      status: 'Underweight',
    });
  } else {
    optimalIndicators.push({
      key: 'bmi',
      label: 'Body Mass Index',
      value: `${bmi} kg/m²`,
      threshold: '18.5 – 22.9 kg/m²',
      clinicalReason: 'BMI falls within the South Asian adult reference healthy-weight range.',
      status: 'Optimal',
    });
  }

  // Waist circumference evaluation
  if (waistResult) {
    if (waistResult.isElevated) {
      elevatedIndicators.push({
        key: 'waist',
        label: 'Waist Circumference (Abdominal Adiposity)',
        value: `${waistResult.waistCm} cm`,
        threshold: `< ${waistResult.threshold}`,
        clinicalReason: waistResult.description,
        status: 'Elevated',
      });
    } else if (waistResult.isElevated === false) {
      optimalIndicators.push({
        key: 'waist',
        label: 'Waist Circumference',
        value: `${waistResult.waistCm} cm`,
        threshold: `< ${waistResult.threshold}`,
        clinicalReason: waistResult.description,
        status: 'Optimal',
      });
    }
  }

  // Waist-to-Height Ratio evaluation
  if (wthResult && !wthResult.isPediatric) {
    if (wthResult.isElevated) {
      elevatedIndicators.push({
        key: 'wthr',
        label: 'Waist-to-Height Ratio (WHtR)',
        value: wthResult.ratioFormatted,
        threshold: '< 0.50',
        clinicalReason:
          'Waist circumference exceeds 50% of height (ratio ≥ 0.50), indicating increased central fat accumulation.',
        status: 'Elevated',
      });
    } else {
      optimalIndicators.push({
        key: 'wthr',
        label: 'Waist-to-Height Ratio (WHtR)',
        value: wthResult.ratioFormatted,
        threshold: '< 0.50',
        clinicalReason: 'Waist circumference is less than half height (ratio < 0.50).',
        status: 'Optimal',
      });
    }
  }

  // Condition details list
  const conditionDetailsList = activeConditions.map(
    (c) =>
      CONDITION_DETAILS[c] || {
        title: c,
        category: 'Medical History',
        severity: 'Moderate',
        clinicalNote: 'Reported existing health condition relevant to metabolic context.',
        clinicalGuidance: 'Discuss with physician during clinical consultation.',
      }
  );

  // 6. Transparent Risk Classification
  // Based on validated South Asian consensus screening thresholds:
  // - Anthropometric flags: elevated BMI, elevated waist, elevated WHtR
  // - Medical conditions: each reported chronic metabolic condition
  const elevatedAnthropometricCount = elevatedIndicators.filter(
    (i) => i.key !== 'bmi' || bmi >= 23.0
  ).length;
  const conditionsCount = activeConditions.length;
  const totalRiskFactors = elevatedAnthropometricCount + conditionsCount;

  let riskClassification;
  let recommendedNextSteps;

  if (totalRiskFactors === 0) {
    riskClassification = {
      levelKey: 'standard',
      levelLabel: 'Low Metabolic Screening Risk',
      badgeColor: '#16a34a',
      badgeBg: '#f0fdf4',
      badgeBorder: '#bbf7d0',
      summaryText: 'All assessed screening indicators fall within standard clinical reference ranges.',
      clinicalExplanation:
        'Your recorded anthropometric measurements (BMI and waist metrics, if provided) and self-reported medical history show no elevated screening flags for central adiposity or metabolic syndrome. While this is reassuring, routine preventative checkups remain beneficial for monitoring internal biochemical parameters.',
    };
    recommendedNextSteps = [
      'Continue a balanced lifestyle with 150 minutes of weekly moderate aerobic physical activity.',
      'Maintain a nutrient-dense diet emphasizing fiber, lean proteins, legumes, and whole grains.',
      'Schedule annual preventative health wellness panels to track lipid profiles and fasting glucose.',
    ];
  } else if (totalRiskFactors === 1) {
    riskClassification = {
      levelKey: 'moderate',
      levelLabel: 'Moderate Metabolic Screening Risk',
      badgeColor: '#d97706',
      badgeBg: '#fffbeb',
      badgeBorder: '#fde68a',
      summaryText: 'One screening indicator or reported condition may deserve clinical attention.',
      clinicalExplanation:
        'A single screening indicator (such as an elevated waist measurement, overweight BMI range, or an existing reported condition) was identified. In South Asian adults, metabolic risks often develop gradually; taking early proactive measures can help prevent progressive metabolic dysregulation.',
    };
    recommendedNextSteps = [
      'Schedule a preventative consultation with a FutureAce Hospital physician to review your measurements.',
      'Obtain baseline screening laboratory tests (Fasting Blood Sugar / HbA1c, Lipid Profile).',
      'Adopt structured dietary and physical activity interventions guided by a healthcare professional.',
    ];
  } else {
    riskClassification = {
      levelKey: 'elevated',
      levelLabel: 'Elevated Metabolic Screening Risk',
      badgeColor: '#dc2626',
      badgeBg: '#fef2f2',
      badgeBorder: '#fecaca',
      summaryText:
        'Multiple screening indicators or existing conditions suggest that clinical consultation is warranted.',
      clinicalExplanation:
        'Two or more clinical screening indicators or active medical conditions are present. In South Asian populations, the coexistence of central adiposity and chronic conditions (such as diabetes or hypertension) is strongly linked to heightened cardiovascular and metabolic risks. A comprehensive medical assessment is recommended.',
    };
    recommendedNextSteps = [
      'Consult a physician or metabolic health specialist at FutureAce Hospital for an in-depth clinical evaluation.',
      'Complete comprehensive laboratory diagnostics: Extended Lipid Profile, HbA1c, Liver Function Panel, Kidney Profile, and Blood Pressure assessment.',
      'Develop an individualized medical and lifestyle treatment plan to manage and mitigate cardiovascular risks.',
    ];
  }

  return {
    success: true,
    calculatorType: 'metabolic_risk',
    personalDetails: {
      fullName: personalDetails.fullName?.trim() || null,
      phone: personalDetails.phone?.trim() || null,
      email: personalDetails.email?.trim() || null,
    },
    measurements: {
      age,
      gender,
      heightCm,
      weightKg,
      waistCm,
    },
    bmi,
    bmiCategory,
    wthResult,
    waistResult,
    selectedConditions: activeConditions,
    conditionDetailsList,
    riskClassification,
    elevatedIndicators,
    optimalIndicators,
    recommendedNextSteps,
    hasWaistMeasurement: waistCm !== null && waistCm > 0,
    timestamp: new Date(),
  };
}
