/**
 * Workout Program PDF exporter.
 *
 * Uses the same html2canvas + jsPDF pattern as meal-plan-pdf.ts so it
 * inherits proven Arabic glyph handling: an off-screen div is styled
 * with the system Arabic font stack and direction=rtl, then rasterized
 * into a PDF page. One PDF includes a cover summary plus one page per
 * training day with sets, reps, RPE, rest, notes, and 3 weeks of empty
 * log boxes for the user to fill in.
 */

import type {
  WorkoutProgram,
  WorkoutDay,
} from '../data/workout-programs';
import {
  GOAL_LABEL_AR,
  GOAL_LABEL_EN,
  LEVEL_LABEL_AR,
  LEVEL_LABEL_EN,
  SPLIT_LABEL_AR,
  SPLIT_LABEL_EN,
} from '../data/workout-programs';

type Lang = 'en' | 'ar';

const T = {
  en: {
    tagline: 'Cook beautifully. Train beautifully.',
    program: 'Training program',
    by: 'by',
    progressionRule: 'Progression rule',
    week: 'Week',
    day: 'Day',
    exercise: 'Exercise',
    sets: 'Sets',
    reps: 'Reps',
    rpe: 'RPE',
    rest: 'Rest',
    weight: 'Weight',
    notes: 'Notes',
    youtube: 'Full video and form cues on zaytoun.online',
    level: 'Level',
    goal: 'Goal',
    split: 'Split',
    daysPerWeek: 'Days per week',
    duration: 'Duration',
    weeks: 'weeks',
  },
  ar: {
    tagline: 'اطبخ بأناقة. تدرّب بأناقة.',
    program: 'برنامج تدريبي',
    by: 'من',
    progressionRule: 'قاعدة التقدم',
    week: 'أسبوع',
    day: 'يوم',
    exercise: 'التمرين',
    sets: 'مجموعات',
    reps: 'تكرارات',
    rpe: 'RPE',
    rest: 'راحة',
    weight: 'وزن',
    notes: 'ملاحظات',
    youtube: 'فيديو كامل وتقنية على zaytoun.online',
    level: 'مستوى',
    goal: 'هدف',
    split: 'تقسيم',
    daysPerWeek: 'أيام بالأسبوع',
    duration: 'مدة',
    weeks: 'أسابيع',
  },
};

const ARABIC_FONTS =
  "'IBM Plex Sans Arabic', 'Geeza Pro', 'Segoe UI Arabic', 'Tahoma', system-ui, sans-serif";
const LATIN_FONTS =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', system-ui, sans-serif";

const PAGE_W_MM = 210;
const PAGE_H_MM = 297;

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

interface Ctx {
  lang: Lang;
  isAr: boolean;
  font: string;
  dir: 'rtl' | 'ltr';
  align: 'right' | 'left';
}

function buildCtx(lang: Lang): Ctx {
  const isAr = lang === 'ar';
  return {
    lang,
    isAr,
    font: isAr ? ARABIC_FONTS : LATIN_FONTS,
    dir: isAr ? 'rtl' : 'ltr',
    align: isAr ? 'right' : 'left',
  };
}

// ============================================================
// Cover page
// ============================================================

function renderCover(program: WorkoutProgram, ctx: Ctx): string {
  const labels = T[ctx.lang];
  const level = ctx.isAr ? LEVEL_LABEL_AR[program.level] : LEVEL_LABEL_EN[program.level];
  const goal = ctx.isAr ? GOAL_LABEL_AR[program.goal] : GOAL_LABEL_EN[program.goal];
  const split = ctx.isAr ? SPLIT_LABEL_AR[program.split] : SPLIT_LABEL_EN[program.split];
  const name = ctx.isAr ? program.nameAr : program.name;

  return `
    <div style="
      width: 800px;
      min-height: 1131px;
      box-sizing: border-box;
      padding: 80px 70px;
      background: #FBF6EF;
      color: #13110F;
      font-family: ${ctx.font};
      direction: ${ctx.dir};
      text-align: ${ctx.align};
    ">
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 56px;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #13110F; display: grid; place-items: center; color: #FBF6EF; font-weight: 700;">Z</div>
        <div>
          <div style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Zaytoun</div>
          <div style="font-size: 12px; color: #56524D;">${esc(labels.tagline)}</div>
        </div>
      </div>

      <div style="font-size: 13px; color: #B83D2E; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 16px;">
        ${esc(labels.program)}
      </div>
      <div style="font-size: 52px; font-weight: 700; letter-spacing: -2px; line-height: 1.05; margin-bottom: 12px;">
        ${esc(name)}
      </div>
      <div style="font-size: 16px; color: #56524D; margin-bottom: 50px;">
        ${esc(labels.by)} ${esc(program.author)}
      </div>

      <div style="background: #13110F; color: #FBF6EF; padding: 32px; border-radius: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        ${stat(labels.level, level)}
        ${stat(labels.goal, goal)}
        ${stat(labels.split, split)}
        ${stat(labels.daysPerWeek, String(program.daysPerWeek))}
        ${stat(labels.duration, `${program.weeks} ${labels.weeks}`)}
        ${stat('Days', String(program.days.length))}
      </div>

      <div style="margin-top: 36px; padding: 24px; border: 1px solid #EAE2D5; border-radius: 16px; background: #FFFFFF;">
        <div style="font-size: 11px; color: #B83D2E; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px;">
          ${esc(labels.progressionRule)}
        </div>
        <div style="font-size: 14px; line-height: 1.6; color: #28251F;">
          ${esc(ctx.isAr ? program.progressionAr : program.progression)}
        </div>
      </div>

      <div style="margin-top: 36px; font-size: 13px; color: #A09A93;">
        ${esc(labels.youtube)}
      </div>
    </div>
  `;
}

function stat(label: string, value: string): string {
  return `
    <div>
      <div style="font-size: 10px; color: rgba(251,246,239,0.5); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px;">
        ${esc(label)}
      </div>
      <div style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">${esc(value)}</div>
    </div>
  `;
}

// ============================================================
// Day page
// ============================================================

function renderDay(day: WorkoutDay, dayIndex: number, program: WorkoutProgram, ctx: Ctx): string {
  const labels = T[ctx.lang];
  const dayName = ctx.isAr ? day.nameAr : day.name;
  const programName = ctx.isAr ? program.nameAr : program.name;

  const rows = day.exercises.map((e) => {
    const name = ctx.isAr ? e.nameAr : e.name;
    const notes = ctx.isAr ? (e.notesAr ?? e.notes) : e.notes;
    return `
      <tr style="border-bottom: 1px solid #EAE2D5;">
        <td style="padding: 12px 10px; vertical-align: top;">
          <div style="font-weight: 600; font-size: 14px; color: #13110F;">${esc(name)}</div>
          ${notes ? `<div style="font-size: 11px; color: #56524D; margin-top: 3px;">${esc(notes)}</div>` : ''}
        </td>
        <td style="padding: 12px 6px; text-align: center; font-size: 13px; color: #28251F; white-space: nowrap;">${e.sets} x ${esc(e.reps)}</td>
        <td style="padding: 12px 6px; text-align: center; font-size: 13px; color: #28251F;">${esc(e.rpe)}</td>
        <td style="padding: 12px 6px; text-align: center; font-size: 12px; color: #28251F;">${esc(ctx.isAr ? e.restAr : e.rest)}</td>
        <td style="padding: 12px 6px;">
          <div style="display: flex; gap: 6px; justify-content: center;">
            ${[1, 2, 3].map(() => `<div style="width: 38px; height: 26px; border: 1px solid #EAE2D5; border-radius: 4px; background: #FFFFFF;"></div>`).join('')}
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div style="
      width: 800px;
      min-height: 1131px;
      box-sizing: border-box;
      padding: 50px 56px;
      background: #FBF6EF;
      color: #13110F;
      font-family: ${ctx.font};
      direction: ${ctx.dir};
      text-align: ${ctx.align};
    ">
      <header style="display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid #EAE2D5; margin-bottom: 24px;">
        <div>
          <div style="font-size: 11px; color: #B83D2E; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">
            ${esc(labels.day)} ${dayIndex + 1}
          </div>
          <div style="font-size: 30px; font-weight: 700; letter-spacing: -1px; margin-top: 4px;">
            ${esc(dayName)}
          </div>
        </div>
        <div style="text-align: ${ctx.isAr ? 'left' : 'right'}; font-size: 12px; color: #56524D;">
          <div style="font-weight: 600; color: #28251F;">${esc(programName)}</div>
          <div style="margin-top: 2px;">${esc(program.author)}</div>
        </div>
      </header>

      <table style="width: 100%; border-collapse: collapse; background: #FFFFFF; border: 1px solid #EAE2D5; border-radius: 12px; overflow: hidden;">
        <thead>
          <tr style="background: #F5F0E8;">
            <th style="padding: 10px; text-align: ${ctx.align}; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #56524D; width: 32%;">${esc(labels.exercise)}</th>
            <th style="padding: 10px 6px; text-align: center; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #56524D;">${esc(labels.sets)} x ${esc(labels.reps)}</th>
            <th style="padding: 10px 6px; text-align: center; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #56524D;">${esc(labels.rpe)}</th>
            <th style="padding: 10px 6px; text-align: center; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #56524D;">${esc(labels.rest)}</th>
            <th style="padding: 10px 6px; text-align: center; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: #56524D; width: 24%;">${esc(labels.weight)} (W1/W2/W3)</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <div style="margin-top: 24px; padding: 18px; background: #FFFFFF; border: 1px solid #EAE2D5; border-radius: 12px;">
        <div style="font-size: 10px; color: #56524D; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px;">
          ${esc(labels.notes)}
        </div>
        ${[1, 2, 3, 4].map(() => '<div style="height: 24px; border-bottom: 1px dashed #EAE2D5; margin-bottom: 8px;"></div>').join('')}
      </div>

      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #EAE2D5; display: flex; justify-content: space-between; font-size: 11px; color: #A09A93;">
        <div>Zaytoun · zaytoun.online</div>
        <div>${esc(labels.day)} ${dayIndex + 1} / ${program.days.length}</div>
      </div>
    </div>
  `;
}

// ============================================================
// Render and export
// ============================================================

async function renderToCanvas(html: string): Promise<HTMLCanvasElement> {
  const html2canvas = (await import('html2canvas')).default;
  const container = document.createElement('div');
  container.style.cssText = 'position: fixed; top: -10000px; left: 0; z-index: -1;';
  container.innerHTML = html;
  document.body.appendChild(container);
  try {
    const target = container.firstElementChild as HTMLElement;
    const canvas = await html2canvas(target, {
      backgroundColor: '#FBF6EF',
      scale: 2,
      useCORS: true,
      logging: false,
    });
    return canvas;
  } finally {
    container.remove();
  }
}

export async function exportWorkoutProgramPDF(program: WorkoutProgram, lang: Lang): Promise<void> {
  const ctx = buildCtx(lang);
  const { default: jsPDF } = await import('jspdf');
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  const cover = await renderToCanvas(renderCover(program, ctx));
  addCanvas(pdf, cover, false);

  for (let i = 0; i < program.days.length; i++) {
    const canvas = await renderToCanvas(renderDay(program.days[i], i, program, ctx));
    addCanvas(pdf, canvas, true);
  }

  const slug = program.id;
  pdf.save(`zaytoun-program-${slug}-${lang}.pdf`);
}

function addCanvas(pdf: import('jspdf').jsPDF, canvas: HTMLCanvasElement, addPageFirst: boolean) {
  if (addPageFirst) pdf.addPage();
  const img = canvas.toDataURL('image/jpeg', 0.9);
  const aspect = canvas.height / canvas.width;
  const w = PAGE_W_MM;
  const h = w * aspect;
  const drawH = Math.min(h, PAGE_H_MM);
  const drawW = drawH === PAGE_H_MM ? PAGE_H_MM / aspect : w;
  const x = (PAGE_W_MM - drawW) / 2;
  const y = (PAGE_H_MM - drawH) / 2;
  pdf.addImage(img, 'JPEG', x, y, drawW, drawH);
}
