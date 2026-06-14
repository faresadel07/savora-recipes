/**
 * Health calculator formulas. All client-side, no APIs.
 *
 * Sources:
 *   - BMI: standard NIH formula
 *   - Ideal Weight: Devine, Robinson, Miller, Hamwi (average for stability)
 *   - One-Rep Max: Epley, Brzycki, Lombardi, Wathen (4-formula average)
 *   - Body Fat: US Navy method (Hodgdon and Beckett, 1984)
 */

export type Sex = 'male' | 'female';
export type Unit = 'metric' | 'imperial';

// ============================================================
// BMI
// ============================================================

export interface BMIResult {
  value: number;
  category: 'underweight' | 'healthy' | 'overweight' | 'obese-1' | 'obese-2' | 'obese-3';
  healthyMinKg: number;
  healthyMaxKg: number;
}

export function bmi(weightKg: number, heightCm: number): BMIResult | null {
  if (weightKg <= 0 || heightCm <= 0) return null;
  const heightM = heightCm / 100;
  const value = weightKg / (heightM * heightM);
  let category: BMIResult['category'];
  if (value < 18.5) category = 'underweight';
  else if (value < 25) category = 'healthy';
  else if (value < 30) category = 'overweight';
  else if (value < 35) category = 'obese-1';
  else if (value < 40) category = 'obese-2';
  else category = 'obese-3';
  return {
    value: Math.round(value * 10) / 10,
    category,
    healthyMinKg: Math.round(18.5 * heightM * heightM),
    healthyMaxKg: Math.round(24.9 * heightM * heightM),
  };
}

// ============================================================
// Ideal Weight (average of four classic formulas)
// ============================================================

export interface IdealWeightResult {
  averageKg: number;
  devine: number;
  robinson: number;
  miller: number;
  hamwi: number;
}

/**
 * Each formula returns ideal weight in kg, given sex and height in cm.
 * All four use inches over 5 feet as their independent variable.
 */
export function idealWeight(sex: Sex, heightCm: number): IdealWeightResult | null {
  if (heightCm <= 120) return null;
  const inches = heightCm / 2.54;
  const over5ft = Math.max(0, inches - 60);

  const devine   = sex === 'male' ? 50   + 2.3  * over5ft : 45.5 + 2.3  * over5ft;
  const robinson = sex === 'male' ? 52   + 1.9  * over5ft : 49   + 1.7  * over5ft;
  const miller   = sex === 'male' ? 56.2 + 1.41 * over5ft : 53.1 + 1.36 * over5ft;
  const hamwi    = sex === 'male' ? 48   + 2.7  * over5ft : 45.5 + 2.2  * over5ft;

  const average = (devine + robinson + miller + hamwi) / 4;

  return {
    averageKg: Math.round(average * 10) / 10,
    devine: Math.round(devine * 10) / 10,
    robinson: Math.round(robinson * 10) / 10,
    miller: Math.round(miller * 10) / 10,
    hamwi: Math.round(hamwi * 10) / 10,
  };
}

// ============================================================
// One-Rep Max
// ============================================================

export interface OneRMResult {
  averageKg: number;
  epley: number;
  brzycki: number;
  lombardi: number;
  wathen: number;
}

export function oneRepMax(weightKg: number, reps: number): OneRMResult | null {
  if (weightKg <= 0) return null;
  const r = Math.max(1, Math.min(30, reps));
  if (r === 1) {
    // Each formula returns the weight unchanged at 1 rep.
    return {
      averageKg: Math.round(weightKg * 10) / 10,
      epley: weightKg,
      brzycki: weightKg,
      lombardi: weightKg,
      wathen: weightKg,
    };
  }
  const epley = weightKg * (1 + r / 30);
  const brzycki = weightKg * (36 / (37 - r));
  const lombardi = weightKg * Math.pow(r, 0.10);
  const wathen = (100 * weightKg) / (48.8 + 53.8 * Math.exp(-0.075 * r));
  const average = (epley + brzycki + lombardi + wathen) / 4;
  return {
    averageKg: Math.round(average * 10) / 10,
    epley: Math.round(epley * 10) / 10,
    brzycki: Math.round(brzycki * 10) / 10,
    lombardi: Math.round(lombardi * 10) / 10,
    wathen: Math.round(wathen * 10) / 10,
  };
}

/** Percentage table for set planning. */
export const RM_PERCENTAGES: { pct: number; reps: number; label: string }[] = [
  { pct: 1.00, reps: 1,  label: 'Max'        },
  { pct: 0.95, reps: 2,  label: 'Power'      },
  { pct: 0.90, reps: 4,  label: 'Strength'   },
  { pct: 0.85, reps: 6,  label: 'Strength'   },
  { pct: 0.80, reps: 8,  label: 'Hypertrophy'},
  { pct: 0.75, reps: 10, label: 'Hypertrophy'},
  { pct: 0.70, reps: 12, label: 'Hypertrophy'},
  { pct: 0.65, reps: 15, label: 'Endurance'  },
  { pct: 0.60, reps: 18, label: 'Endurance'  },
  { pct: 0.50, reps: 25, label: 'Warmup'     },
];

// ============================================================
// US Navy body fat method (Hodgdon and Beckett, 1984)
// ============================================================

export interface BodyFatResult {
  percent: number;
  fatMassKg: number;
  leanMassKg: number;
}

export function bodyFatUsNavy(
  sex: Sex,
  weightKg: number,
  heightCm: number,
  neckCm: number,
  waistCm: number,
  hipCm?: number,
): BodyFatResult | null {
  if (weightKg <= 0 || heightCm <= 0 || neckCm <= 0 || waistCm <= 0) return null;
  if (sex === 'female' && (!hipCm || hipCm <= 0)) return null;

  let bf: number;
  if (sex === 'male') {
    bf = 86.010 * log10(waistCm - neckCm) - 70.041 * log10(heightCm) + 36.76;
  } else {
    bf = 163.205 * log10(waistCm + (hipCm as number) - neckCm) - 97.684 * log10(heightCm) - 78.387;
  }
  bf = Math.max(2, Math.min(60, bf));
  const fatMassKg = (bf / 100) * weightKg;
  const leanMassKg = weightKg - fatMassKg;
  return {
    percent: Math.round(bf * 10) / 10,
    fatMassKg: Math.round(fatMassKg * 10) / 10,
    leanMassKg: Math.round(leanMassKg * 10) / 10,
  };
}

function log10(x: number): number {
  return Math.log(x) / Math.LN10;
}
