/**
 * Workout exercises data loader.
 *
 * Source: yuhonas/free-exercise-db, 873 exercises with images and
 * step-by-step instructions, Unlicense (public domain). Served via
 * jsDelivr CDN with `Access-Control-Allow-Origin: *` so it loads
 * straight into the browser without a backend.
 *
 * The full payload is ~1 MB JSON. We fetch once per session and cache
 * the parsed result so subsequent visits to the workout pages are
 * instant.
 */

export type Force = 'pull' | 'push' | 'static' | null;
export type Level = 'beginner' | 'intermediate' | 'expert';
export type Mechanic = 'compound' | 'isolation' | null;
export type Equipment =
  | 'barbell' | 'dumbbell' | 'body only' | 'machine' | 'cable'
  | 'kettlebells' | 'bands' | 'medicine ball' | 'exercise ball'
  | 'foam roll' | 'e-z curl bar' | 'other' | null;

export interface Exercise {
  id: string;
  name: string;
  force: Force;
  level: Level;
  mechanic: Mechanic;
  equipment: Equipment;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  instructions: string[];
  category: string;
  images: string[];
}

const SOURCE_URL =
  'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/dist/exercises.json';
const IMAGE_BASE =
  'https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/';

let cachePromise: Promise<Exercise[]> | null = null;

export function loadExercises(): Promise<Exercise[]> {
  if (!cachePromise) {
    cachePromise = fetch(SOURCE_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`exercises HTTP ${r.status}`);
        return r.json();
      })
      .then((data: Exercise[]) => data);
  }
  return cachePromise;
}

export function exerciseImageUrl(relPath: string): string {
  return IMAGE_BASE + relPath;
}

// ============================================================
// Bilingual labels (concise, the same vocabulary fitness creators
// reach for in Arabic-speaking gyms).
// ============================================================

export const MUSCLE_LABEL_AR: Record<string, string> = {
  quadriceps: 'الرباعية',
  shoulders: 'الأكتاف',
  abdominals: 'البطن',
  chest: 'الصدر',
  hamstrings: 'الخلفية',
  triceps: 'ترايسبس',
  biceps: 'بايسبس',
  lats: 'الظهر العريض',
  'middle back': 'الظهر الأوسط',
  calves: 'السمانة',
  'lower back': 'أسفل الظهر',
  forearms: 'الساعد',
  glutes: 'المؤخرة',
  traps: 'المغذي',
  adductors: 'المقربات',
  abductors: 'المبعدات',
  neck: 'الرقبة',
};

export const EQUIPMENT_LABEL_AR: Record<string, string> = {
  barbell: 'بار',
  dumbbell: 'دامبل',
  'body only': 'الجسم فقط',
  machine: 'آلة',
  cable: 'كابل',
  kettlebells: 'كيتل',
  bands: 'حبال مطاط',
  'medicine ball': 'كرة طبية',
  'exercise ball': 'كرة سويسرية',
  'foam roll': 'فوم رول',
  'e-z curl bar': 'بار EZ',
  other: 'أخرى',
};

export const LEVEL_LABEL_AR: Record<Level, string> = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  expert: 'متقدم',
};

export const FORCE_LABEL_AR: Record<string, string> = {
  pull: 'سحب',
  push: 'دفع',
  static: 'ثابت',
};

export const CATEGORY_LABEL_AR: Record<string, string> = {
  strength: 'قوة',
  stretching: 'تمدد',
  plyometrics: 'بليومتركس',
  strongman: 'سترونغمان',
  powerlifting: 'باور ليفتنغ',
  cardio: 'كارديو',
  olympic_weightlifting: 'رفع أولمبي',
};

// ============================================================
// Aggregations used by the filter UI
// ============================================================

export interface FilterCounts {
  muscles: Record<string, number>;
  equipment: Record<string, number>;
  levels: Record<Level, number>;
  total: number;
}

export function computeCounts(exercises: Exercise[]): FilterCounts {
  const out: FilterCounts = {
    muscles: {},
    equipment: {},
    levels: { beginner: 0, intermediate: 0, expert: 0 },
    total: exercises.length,
  };
  for (const e of exercises) {
    for (const m of e.primaryMuscles) {
      out.muscles[m] = (out.muscles[m] ?? 0) + 1;
    }
    if (e.equipment) {
      out.equipment[e.equipment] = (out.equipment[e.equipment] ?? 0) + 1;
    }
    if (e.level) out.levels[e.level] += 1;
  }
  return out;
}

export interface ExerciseFilters {
  query: string;
  muscle: string | 'any';
  equipment: Equipment | 'any';
  level: Level | 'any';
}

export const DEFAULT_FILTERS: ExerciseFilters = {
  query: '',
  muscle: 'any',
  equipment: 'any',
  level: 'any',
};

export function filterExercises(all: Exercise[], filters: ExerciseFilters): Exercise[] {
  const q = filters.query.trim().toLowerCase();
  return all.filter((e) => {
    if (filters.muscle !== 'any' && !e.primaryMuscles.includes(filters.muscle)) return false;
    if (filters.equipment !== 'any' && e.equipment !== filters.equipment) return false;
    if (filters.level !== 'any' && e.level !== filters.level) return false;
    if (q && !e.name.toLowerCase().includes(q)) return false;
    return true;
  });
}
