/**
 * Meal Plan PDF exporter.
 *
 * Uses the same html2canvas + jsPDF pattern as FitnessRecipeModal so it
 * inherits proven Arabic glyph handling: an off-screen div is styled
 * with the system Arabic font stack and direction=rtl, then rasterized
 * into a PDF page. One PDF can include 1, 3, or 7 day pages plus a
 * cover summary page.
 *
 * Both jsPDF and html2canvas are MIT licensed; both are already used
 * elsewhere on the site so no new dependency is introduced.
 */

import type { MealPlan, PlannedDay, PlannedMeal } from './meal-plan-generator';
import { SLOT_LABEL_AR, SLOT_LABEL_EN } from './meal-plan-generator';

type Lang = 'en' | 'ar';

const T = {
  en: {
    title: 'Your Personal Meal Plan',
    tagline: 'Cook beautifully. Eat slowly.',
    generatedOn: 'Generated on',
    dailyTarget: 'Daily target',
    kcal: 'kcal',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    day: 'Day',
    actual: 'Actual',
    target: 'Target',
    diff: 'Diff',
    serving: 'serving',
    servings: 'servings',
    minutes: 'min',
    portion: 'Portion',
    fromSite: 'Full recipe at zaytoun.online',
    cover: 'Meal plan cover',
  },
  ar: {
    title: 'جدولك الغذائي الشخصي',
    tagline: 'اطبخ بأناقة. كُل ببطء.',
    generatedOn: 'تم إنشاؤه في',
    dailyTarget: 'الهدف اليومي',
    kcal: 'كالوري',
    protein: 'بروتين',
    carbs: 'كاربس',
    fat: 'دهون',
    day: 'يوم',
    actual: 'الفعلي',
    target: 'الهدف',
    diff: 'الفرق',
    serving: 'حصة',
    servings: 'حصص',
    minutes: 'دقيقة',
    portion: 'الحصة',
    fromSite: 'الوصفة الكاملة على zaytoun.online',
    cover: 'غلاف الجدول',
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

interface RenderCtx {
  lang: Lang;
  isAr: boolean;
  font: string;
  dir: 'rtl' | 'ltr';
  align: 'right' | 'left';
}

function buildContext(lang: Lang): RenderCtx {
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
// Page templates
// ============================================================

function renderCoverPage(plan: MealPlan, ctx: RenderCtx): string {
  const labels = T[ctx.lang];
  const date = new Date(plan.generatedAt).toLocaleDateString(
    ctx.isAr ? 'ar' : 'en-GB',
    { year: 'numeric', month: 'long', day: 'numeric' },
  );

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
      <div style="display: flex; align-items: center; gap: 14px; margin-bottom: 64px;">
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #13110F; display: grid; place-items: center; color: #FBF6EF; font-weight: 700;">Z</div>
        <div>
          <div style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">Zaytoun</div>
          <div style="font-size: 12px; color: #56524D;">${esc(labels.tagline)}</div>
        </div>
      </div>

      <div style="font-size: 14px; color: #B83D2E; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 18px;">
        ${esc(labels.title)}
      </div>
      <div style="font-size: 56px; font-weight: 700; letter-spacing: -2px; line-height: 1.05; margin-bottom: 16px;">
        ${plan.preferences.days} ${esc(plan.preferences.days === 1 ? labels.day : labels.day)} &nbsp;·&nbsp; ${plan.preferences.mealsPerDay} ${ctx.isAr ? 'وجبات' : 'meals'}
      </div>
      <div style="font-size: 16px; color: #56524D; margin-bottom: 50px;">
        ${esc(labels.generatedOn)} ${esc(date)}
      </div>

      <div style="background: #13110F; color: #FBF6EF; padding: 36px; border-radius: 24px;">
        <div style="font-size: 11px; color: rgba(251,246,239,0.5); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 10px;">
          ${esc(labels.dailyTarget)}
        </div>
        <div style="font-size: 56px; font-weight: 700; letter-spacing: -2px; line-height: 1;">
          ${plan.targets.calories.toLocaleString()}
          <span style="font-size: 18px; color: rgba(251,246,239,0.55); font-weight: 400; letter-spacing: 0;">${esc(labels.kcal)}</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 28px;">
          ${macroBig(labels.protein, plan.targets.protein, '#D87760')}
          ${macroBig(labels.carbs,   plan.targets.carbs,   '#E2BC85')}
          ${macroBig(labels.fat,     plan.targets.fat,     '#9DB386')}
        </div>
      </div>

      <div style="margin-top: 60px; font-size: 13px; color: #A09A93;">
        ${esc(labels.fromSite)}
      </div>
    </div>
  `;
}

function macroBig(label: string, value: number, color: string): string {
  return `
    <div>
      <div style="font-size: 10px; color: rgba(251,246,239,0.5); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 6px;">
        ${esc(label)}
      </div>
      <div style="font-size: 30px; font-weight: 700; letter-spacing: -1px;">${value}<span style="font-size: 14px; font-weight: 400; color: rgba(251,246,239,0.55);">g</span></div>
      <div style="margin-top: 6px; height: 4px; background: rgba(251,246,239,0.12); border-radius: 2px; overflow: hidden;">
        <div style="height: 100%; width: 100%; background: ${color};"></div>
      </div>
    </div>
  `;
}

function renderDayPage(day: PlannedDay, plan: MealPlan, ctx: RenderCtx): string {
  const labels = T[ctx.lang];
  const dayLabel = `${labels.day} ${day.index + 1}`;
  const meals = day.meals.map((m) => renderMealRow(m, ctx)).join('');

  return `
    <div style="
      width: 800px;
      min-height: 1131px;
      box-sizing: border-box;
      padding: 60px 64px;
      background: #FBF6EF;
      color: #13110F;
      font-family: ${ctx.font};
      direction: ${ctx.dir};
      text-align: ${ctx.align};
    ">
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid #EAE2D5;">
        <div>
          <div style="font-size: 11px; color: #B83D2E; font-weight: 700; letter-spacing: 4px; text-transform: uppercase;">
            ${esc(dayLabel)}
          </div>
          <div style="font-size: 38px; font-weight: 700; letter-spacing: -1.5px; margin-top: 6px;">
            ${day.totals.calories.toLocaleString()} <span style="font-size: 16px; color: #56524D; font-weight: 400;">${esc(labels.kcal)}</span>
          </div>
        </div>
        <div style="text-align: ${ctx.isAr ? 'left' : 'right'}; font-size: 11px; color: #56524D;">
          <div style="margin-bottom: 4px;">${esc(labels.target)} ${plan.targets.calories.toLocaleString()} ${esc(labels.kcal)}</div>
          <div style="${day.diff.calories > 0 ? 'color: #B83D2E;' : day.diff.calories < -50 ? 'color: #56524D;' : 'color: #5E7549;'}">
            ${esc(labels.diff)} ${day.diff.calories > 0 ? '+' : ''}${day.diff.calories} ${esc(labels.kcal)}
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 18px; margin-bottom: 28px;">
        ${macroProgress(labels.protein, day.totals.protein, plan.targets.protein, '#D87760')}
        ${macroProgress(labels.carbs,   day.totals.carbs,   plan.targets.carbs,   '#E2BC85')}
        ${macroProgress(labels.fat,     day.totals.fat,     plan.targets.fat,     '#9DB386')}
      </div>

      <div style="display: flex; flex-direction: column; gap: 14px;">
        ${meals}
      </div>

      <div style="margin-top: 36px; padding-top: 18px; border-top: 1px solid #EAE2D5; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #A09A93;">
        <div>Zaytoun · zaytoun.online</div>
        <div>${esc(dayLabel)}</div>
      </div>
    </div>
  `;
}

function macroProgress(label: string, actual: number, target: number, color: string): string {
  const pct = target > 0 ? Math.min(110, Math.round((actual / target) * 100)) : 0;
  return `
    <div style="background: #FFFFFF; border: 1px solid #EAE2D5; border-radius: 14px; padding: 14px 16px;">
      <div style="display: flex; justify-content: space-between; font-size: 11px; color: #56524D; margin-bottom: 4px;">
        <span style="text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">${esc(label)}</span>
        <span>${Math.round(actual)}/${Math.round(target)}g</span>
      </div>
      <div style="height: 5px; background: #EAE2D5; border-radius: 3px; overflow: hidden; margin-top: 4px;">
        <div style="height: 100%; width: ${pct}%; background: ${color};"></div>
      </div>
    </div>
  `;
}

function renderMealRow(meal: PlannedMeal, ctx: RenderCtx): string {
  const labels = T[ctx.lang];
  const slotLabel = ctx.isAr ? SLOT_LABEL_AR[meal.slot] : SLOT_LABEL_EN[meal.slot];
  const title = ctx.isAr ? meal.recipe.titleAr : meal.recipe.title;
  const portionLabel = meal.portion === 1
    ? `1 ${labels.serving}`
    : `${meal.portion.toFixed(2)} ${labels.servings}`;

  return `
    <div style="display: flex; gap: 18px; padding: 16px; background: #FFFFFF; border: 1px solid #EAE2D5; border-radius: 16px;">
      <div style="flex: 0 0 96px;">
        <div style="width: 96px; height: 96px; border-radius: 12px; background: #EAE2D5; overflow: hidden;">
          <img src="${esc(meal.recipe.image)}" crossorigin="anonymous"
               style="width: 100%; height: 100%; object-fit: cover; display: block;" alt="" />
        </div>
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-size: 10px; color: #B83D2E; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">
          ${esc(slotLabel)} &nbsp;·&nbsp; ${meal.recipe.minutes} ${esc(labels.minutes)}
        </div>
        <div style="font-size: 18px; font-weight: 700; letter-spacing: -0.5px; margin-top: 4px; line-height: 1.25;">
          ${esc(title)}
        </div>
        <div style="font-size: 12px; color: #56524D; margin-top: 6px;">
          ${esc(labels.portion)}: ${esc(portionLabel)}
        </div>
        <div style="display: flex; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
          <span style="background: #13110F; color: #FBF6EF; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 999px;">${meal.calories} ${esc(labels.kcal)}</span>
          <span style="background: #FBEFEC; color: #B83D2E; font-size: 11px; padding: 4px 10px; border-radius: 999px;">P ${meal.protein}g</span>
          <span style="background: #F8ECD4; color: #A8763E; font-size: 11px; padding: 4px 10px; border-radius: 999px;">C ${meal.carbs}g</span>
          <span style="background: #F1F4EE; color: #5E7549; font-size: 11px; padding: 4px 10px; border-radius: 999px;">F ${meal.fat}g</span>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// MAIN EXPORT
// ============================================================

async function renderPageToCanvas(html: string): Promise<HTMLCanvasElement> {
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

export async function exportMealPlanPDF(plan: MealPlan, lang: Lang): Promise<void> {
  const ctx = buildContext(lang);
  const { default: jsPDF } = await import('jspdf');

  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

  // Cover page first.
  const coverCanvas = await renderPageToCanvas(renderCoverPage(plan, ctx));
  addCanvasAsPage(pdf, coverCanvas, false);

  for (const day of plan.days) {
    const dayCanvas = await renderPageToCanvas(renderDayPage(day, plan, ctx));
    addCanvasAsPage(pdf, dayCanvas, true);
  }

  const fname = `zaytoun-meal-plan-${plan.preferences.days}day-${lang}.pdf`;
  pdf.save(fname);
}

function addCanvasAsPage(pdf: import('jspdf').jsPDF, canvas: HTMLCanvasElement, addPageFirst: boolean) {
  if (addPageFirst) pdf.addPage();
  const imgData = canvas.toDataURL('image/jpeg', 0.92);
  const aspect = canvas.height / canvas.width;
  const w = PAGE_W_MM;
  const h = w * aspect;
  const drawH = Math.min(h, PAGE_H_MM);
  const drawW = drawH === PAGE_H_MM ? PAGE_H_MM / aspect : w;
  const x = (PAGE_W_MM - drawW) / 2;
  const y = (PAGE_H_MM - drawH) / 2;
  pdf.addImage(imgData, 'JPEG', x, y, drawW, drawH);
}
