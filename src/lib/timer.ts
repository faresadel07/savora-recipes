/**
 * Detect time references inside an instruction step. Returns an array of
 * detected durations (in seconds) so the UI can offer a one-tap timer.
 *
 * Matches phrases like:
 *   - "5 minutes" / "5 min" / "five minutes"
 *   - "1 hour" / "1 hr"
 *   - "30 seconds" / "30 sec"
 *   - "10-15 minutes" (uses the upper bound)
 */

const WORD_TO_NUM: Record<string, number> = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8,
  nine: 9, ten: 10, eleven: 11, twelve: 12, fifteen: 15, twenty: 20,
  thirty: 30, forty: 40, fifty: 50, sixty: 60,
};

const TIME_RE =
  /(\d+(?:\.\d+)?|[a-z]+)(?:\s*[-–to]+\s*(\d+(?:\.\d+)?|[a-z]+))?\s*(hours?|hrs?|minutes?|mins?|seconds?|secs?)\b/gi;

export interface DetectedTimer {
  label: string;
  seconds: number;
}

function toNum(s: string): number | null {
  const n = parseFloat(s);
  if (!isNaN(n)) return n;
  return WORD_TO_NUM[s.toLowerCase()] ?? null;
}

export function detectTimers(text: string): DetectedTimer[] {
  if (!text) return [];
  const out: DetectedTimer[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  TIME_RE.lastIndex = 0;
  while ((m = TIME_RE.exec(text))) {
    const [, a, b, unitRaw] = m;
    const upper = b ? toNum(b) : toNum(a);
    if (upper == null || upper <= 0) continue;
    const unit = unitRaw.toLowerCase();
    let seconds = upper;
    if (unit.startsWith('hour') || unit.startsWith('hr')) seconds = upper * 3600;
    else if (unit.startsWith('min')) seconds = upper * 60;
    else seconds = upper;

    if (seconds < 5 || seconds > 4 * 3600) continue;

    const label =
      seconds >= 3600
        ? `${(seconds / 3600).toFixed(seconds % 3600 === 0 ? 0 : 1)} h`
        : seconds >= 60
        ? `${Math.round(seconds / 60)} min`
        : `${seconds} sec`;
    if (seen.has(label)) continue;
    seen.add(label);
    out.push({ label, seconds });
  }
  return out;
}

export function fmtRemaining(secs: number): string {
  if (secs <= 0) return '0:00';
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
