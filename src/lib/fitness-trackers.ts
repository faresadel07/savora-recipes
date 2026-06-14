/**
 * Fitness trackers built on top of localStorage. Three separate stores:
 *
 *   - hydration: cups consumed for each day, last 30 days
 *   - macroLog: meals logged today, mapped against the user's macro
 *               target snapshot from the Calculator
 *   - streak: count of consecutive days the user logged anything
 *
 * Every store auto-prunes records older than 30 days so localStorage
 * never balloons. All API is sync because IndexedDB isn't needed at
 * this volume (~3 KB max).
 */

// ============================================================
// Helpers
// ============================================================

function todayKey(date: Date = new Date()): string {
  // ISO date in user's local timezone so a Ramadan tracker doesn't
  // jump at UTC midnight.
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function prune<T extends { date: string }>(items: T[], days: number): T[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffKey = todayKey(cutoff);
  return items.filter((i) => i.date >= cutoffKey);
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota exceeded — silently drop, the user will re-create what they
    // need on next interaction.
  }
}

// ============================================================
// Hydration tracker
// ============================================================

const HYDRATION_KEY = 'zaytoun:hydration:v1';

export interface HydrationEntry {
  date: string;
  cups: number;
  goal: number;
}

export function getHydrationToday(goal = 8): HydrationEntry {
  const entries = readJson<HydrationEntry[]>(HYDRATION_KEY, []);
  const key = todayKey();
  const existing = entries.find((e) => e.date === key);
  if (existing) return existing;
  return { date: key, cups: 0, goal };
}

export function addCup(): HydrationEntry {
  const entries = prune(readJson<HydrationEntry[]>(HYDRATION_KEY, []), 30);
  const key = todayKey();
  const idx = entries.findIndex((e) => e.date === key);
  if (idx === -1) {
    entries.push({ date: key, cups: 1, goal: 8 });
  } else {
    entries[idx] = { ...entries[idx], cups: entries[idx].cups + 1 };
  }
  writeJson(HYDRATION_KEY, entries);
  return entries[entries.findIndex((e) => e.date === key)];
}

export function removeCup(): HydrationEntry {
  const entries = prune(readJson<HydrationEntry[]>(HYDRATION_KEY, []), 30);
  const key = todayKey();
  const idx = entries.findIndex((e) => e.date === key);
  if (idx === -1) {
    const e = { date: key, cups: 0, goal: 8 };
    entries.push(e);
    writeJson(HYDRATION_KEY, entries);
    return e;
  }
  entries[idx] = { ...entries[idx], cups: Math.max(0, entries[idx].cups - 1) };
  writeJson(HYDRATION_KEY, entries);
  return entries[idx];
}

export function setHydrationGoal(goal: number): void {
  const entries = prune(readJson<HydrationEntry[]>(HYDRATION_KEY, []), 30);
  const key = todayKey();
  const idx = entries.findIndex((e) => e.date === key);
  if (idx === -1) {
    entries.push({ date: key, cups: 0, goal });
  } else {
    entries[idx] = { ...entries[idx], goal };
  }
  writeJson(HYDRATION_KEY, entries);
}

export function getHydrationHistory(): HydrationEntry[] {
  return prune(readJson<HydrationEntry[]>(HYDRATION_KEY, []), 30);
}

// ============================================================
// Macro logger
// ============================================================

const MACRO_LOG_KEY = 'zaytoun:macro-log:v1';

export interface MacroLogEntry {
  date: string;
  /** Free text entry — recipe name, fast food, anything. */
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: number;
}

export function getMacroLogToday(): MacroLogEntry[] {
  const entries = prune(readJson<MacroLogEntry[]>(MACRO_LOG_KEY, []), 30);
  const key = todayKey();
  return entries.filter((e) => e.date === key).sort((a, b) => a.timestamp - b.timestamp);
}

export function addMacroEntry(entry: Omit<MacroLogEntry, 'date' | 'timestamp'>): void {
  const entries = prune(readJson<MacroLogEntry[]>(MACRO_LOG_KEY, []), 30);
  entries.push({
    ...entry,
    date: todayKey(),
    timestamp: Date.now(),
  });
  writeJson(MACRO_LOG_KEY, entries);
}

export function removeMacroEntry(timestamp: number): void {
  const entries = readJson<MacroLogEntry[]>(MACRO_LOG_KEY, []);
  writeJson(MACRO_LOG_KEY, entries.filter((e) => e.timestamp !== timestamp));
}

export interface MacroTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function sumMacros(entries: MacroLogEntry[]): MacroTotals {
  return entries.reduce(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      carbs: acc.carbs + e.carbs,
      fat: acc.fat + e.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
}

// ============================================================
// Streak
// ============================================================

const STREAK_KEY = 'zaytoun:streak:v1';

export interface StreakState {
  /** Most recent day with at least one tracker action. */
  lastActiveDate: string;
  /** Consecutive days as of lastActiveDate. */
  current: number;
  /** All-time longest streak. */
  longest: number;
}

export function getStreak(): StreakState {
  return readJson<StreakState>(STREAK_KEY, {
    lastActiveDate: '',
    current: 0,
    longest: 0,
  });
}

export function bumpStreak(): StreakState {
  const today = todayKey();
  const state = getStreak();

  if (state.lastActiveDate === today) return state;

  // Did the user log yesterday? If yes, increment; otherwise restart.
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = todayKey(yesterday);

  const current = state.lastActiveDate === yesterdayKey ? state.current + 1 : 1;
  const longest = Math.max(current, state.longest);
  const next: StreakState = { lastActiveDate: today, current, longest };
  writeJson(STREAK_KEY, next);
  return next;
}
