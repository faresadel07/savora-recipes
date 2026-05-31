import Fraction from 'fraction.js';

/**
 * Quantity parsing + scaling + US ↔ metric conversion for recipe ingredients.
 *
 * Recipe sources give us messy strings like "1 1/2 cups", "½ tsp", "2.5 oz".
 * We parse the leading quantity, scale it by the servings factor, and
 * optionally convert the unit between US and metric.
 */

const UNICODE_FRACTIONS: Record<string, number> = {
  '½': 0.5, '⅓': 1 / 3, '⅔': 2 / 3,
  '¼': 0.25, '¾': 0.75,
  '⅕': 0.2, '⅖': 0.4, '⅗': 0.6, '⅘': 0.8,
  '⅙': 1 / 6, '⅚': 5 / 6,
  '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875,
};

// Matches: "1", "1.5", "1/2", "1 1/2", "½", "1 ½", "1 1 / 2"
const QTY_RE = /^\s*(?:(\d+)\s+)?(?:(\d+\s*\/\s*\d+)|(\d+(?:\.\d+)?)|([½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞]))\s*/;

export function parseQty(input: string): { value: number; rest: string } | null {
  if (!input) return null;
  const m = input.match(QTY_RE);
  if (!m) return null;
  const [, wholeStr, fracStr, decStr, unicodeStr] = m;
  let value = wholeStr ? parseInt(wholeStr, 10) : 0;
  if (fracStr) {
    try {
      value += new Fraction(fracStr.replace(/\s+/g, '')).valueOf();
    } catch {
      return null;
    }
  } else if (decStr) {
    value += parseFloat(decStr);
  } else if (unicodeStr) {
    value += UNICODE_FRACTIONS[unicodeStr] ?? 0;
  }
  return { value, rest: input.slice(m[0].length) };
}

export function formatQty(n: number): string {
  if (!isFinite(n) || n <= 0) return '';
  // Pure integer
  if (Math.abs(n - Math.round(n)) < 0.005) return String(Math.round(n));
  // Try a tidy fraction
  try {
    const f = new Fraction(n).simplify(0.01);
    const decimal = f.valueOf();
    if (Math.abs(decimal - n) < 0.05) {
      const whole = Math.trunc(decimal);
      const frac = new Fraction(decimal - whole);
      const fracStr = frac.valueOf() > 0 ? frac.toFraction(false) : '';
      if (whole === 0) return fracStr || decimal.toFixed(2);
      return fracStr ? `${whole} ${fracStr}` : String(whole);
    }
  } catch { /* fall through */ }
  return Number(n.toFixed(2)).toString();
}

interface UnitConversion {
  fromUnits: string[];
  toUnit: string;
  factor: number;
  round: number;
}

const US_TO_METRIC: UnitConversion[] = [
  // Volume
  { fromUnits: ['cup', 'cups', 'c'], toUnit: 'ml', factor: 240, round: 5 },
  { fromUnits: ['tablespoon', 'tablespoons', 'tbsp', 'tbs', 'tbl'], toUnit: 'ml', factor: 15, round: 1 },
  { fromUnits: ['teaspoon', 'teaspoons', 'tsp', 'ts'], toUnit: 'ml', factor: 5, round: 1 },
  { fromUnits: ['fl oz', 'fluid ounce', 'fluid ounces'], toUnit: 'ml', factor: 30, round: 1 },
  { fromUnits: ['quart', 'quarts', 'qt'], toUnit: 'l', factor: 0.946, round: 0.05 },
  { fromUnits: ['pint', 'pints', 'pt'], toUnit: 'ml', factor: 473, round: 5 },
  { fromUnits: ['gallon', 'gallons', 'gal'], toUnit: 'l', factor: 3.785, round: 0.05 },
  // Mass
  { fromUnits: ['ounce', 'ounces', 'oz'], toUnit: 'g', factor: 28.35, round: 1 },
  { fromUnits: ['pound', 'pounds', 'lb', 'lbs'], toUnit: 'g', factor: 454, round: 5 },
];

const METRIC_TO_US: UnitConversion[] = [
  { fromUnits: ['ml', 'milliliter', 'milliliters'], toUnit: 'tsp', factor: 1 / 5, round: 0.25 },
  { fromUnits: ['l', 'liter', 'liters'], toUnit: 'cup', factor: 4.227, round: 0.25 },
  { fromUnits: ['g', 'gram', 'grams'], toUnit: 'oz', factor: 1 / 28.35, round: 0.1 },
  { fromUnits: ['kg', 'kilogram', 'kilograms'], toUnit: 'lb', factor: 2.205, round: 0.1 },
];

function round(n: number, step: number): number {
  return Math.round(n / step) * step;
}

function findUnit(table: UnitConversion[], rest: string): { conv: UnitConversion; match: string; tail: string } | null {
  const lower = rest.toLowerCase().trimStart();
  // Try multi-word first (e.g. "fl oz")
  const sorted = [...table].sort((a, b) =>
    Math.max(...b.fromUnits.map((u) => u.length)) - Math.max(...a.fromUnits.map((u) => u.length)),
  );
  for (const conv of sorted) {
    for (const u of conv.fromUnits) {
      const re = new RegExp(`^${u.replace(/\s+/g, '\\s+')}\\b\\.?`, 'i');
      const m = lower.match(re);
      if (m) {
        return { conv, match: m[0], tail: rest.slice(m[0].length) };
      }
    }
  }
  return null;
}

export function convertMeasure(measure: string, system: 'us' | 'metric'): string {
  const parsed = parseQty(measure);
  if (!parsed) return measure;
  const { value, rest } = parsed;
  const table = system === 'metric' ? US_TO_METRIC : METRIC_TO_US;
  const found = findUnit(table, rest);
  if (!found) return `${formatQty(value)}${rest ? ' ' + rest.trim() : ''}`;
  const newValue = round(value * found.conv.factor, found.conv.round);
  return `${formatQty(newValue)} ${found.conv.toUnit}${found.tail}`;
}

export function scaleMeasure(measure: string, factor: number): string {
  const parsed = parseQty(measure);
  if (!parsed) return measure;
  const scaled = parsed.value * factor;
  return `${formatQty(scaled)}${parsed.rest ? ' ' + parsed.rest.trim() : ''}`;
}

/**
 * Apply both scaling and unit conversion to a measure string.
 */
export function transformMeasure(
  measure: string | undefined,
  factor: number,
  system: 'us' | 'metric' | 'original',
): string {
  if (!measure) return '';
  let out = scaleMeasure(measure, factor);
  if (system !== 'original') out = convertMeasure(out, system);
  return out;
}
