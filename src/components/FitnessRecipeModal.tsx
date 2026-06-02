import { useEffect, useState } from 'react';
import { Clock, Download, Share2, Users, X, Check } from 'lucide-react';
import type { FitnessRecipe } from '../data/fitness-recipes';
import { useTranslation } from '../i18n';
import RecipeImage from './RecipeImage';

interface Props {
  recipe: FitnessRecipe | null;
  onClose: () => void;
}

export default function FitnessRecipeModal({ recipe, onClose }: Props) {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const [pdfBusy, setPdfBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  // Lock body scroll while the modal is open. Also close on Escape.
  useEffect(() => {
    if (!recipe) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [recipe, onClose]);

  if (!recipe) return null;

  const title = isAr ? recipe.titleAr : recipe.title;
  const blurb = isAr ? recipe.blurbAr : recipe.blurb;
  const ingredients = isAr ? recipe.ingredientsAr : recipe.ingredients;
  const steps = isAr ? recipe.stepsAr : recipe.steps;
  const labels = isAr
    ? {
        ingredients: 'المكوّنات',
        method: 'الطريقة',
        servings: 'حصص',
        minutes: 'دقيقة',
        calories: 'سعرات',
        protein: 'بروتين',
        carbs: 'كربوهيدرات',
        fat: 'دهون',
        gram: 'جرام',
        download: 'تنزيل PDF',
        share: 'مشاركة',
        copied: 'تم النسخ',
        building: 'جاري التحضير',
        watch: 'شاهد التحضير',
        close: 'إغلاق',
        from: 'من زيتون',
      }
    : {
        ingredients: 'Ingredients',
        method: 'Method',
        servings: 'Servings',
        minutes: 'min',
        calories: 'Calories',
        protein: 'Protein',
        carbs: 'Carbs',
        fat: 'Fat',
        gram: 'g',
        download: 'Download PDF',
        share: 'Share',
        copied: 'Link copied',
        building: 'Building PDF',
        watch: 'Watch the technique',
        close: 'Close',
        from: 'From Zaytoun',
      };

  async function handleDownload() {
    if (!recipe) return;
    setPdfBusy(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      // Build an off-screen styled card. Browser handles the Arabic glyphs
      // and RTL layout; html2canvas snapshots it; jsPDF embeds the image. No
      // jsPDF font issues this way.
      const fontStack = isAr
        ? "'IBM Plex Sans Arabic', 'Geeza Pro', 'Segoe UI Arabic', system-ui, sans-serif"
        : "'Inter', 'SF Pro Text', system-ui, sans-serif";
      const escape = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

      const container = document.createElement('div');
      container.style.cssText = [
        'position: fixed',
        'top: -10000px',
        'left: 0',
        'width: 780px',
        'padding: 56px 48px',
        'background: #fbf9f4',
        'color: #1f1c18',
        `font-family: ${fontStack}`,
        `direction: ${isAr ? 'rtl' : 'ltr'}`,
        `text-align: ${isAr ? 'right' : 'left'}`,
      ].join('; ');

      const macroChip = (label: string, value: number, unit: string, color: string) =>
        `<div style="flex: 1; padding: 14px; border-radius: 14px; background: #fff; text-align: center;">
          <p style="margin: 0; font-size: 11px; color: ${color}; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 700;">${escape(label)}</p>
          <p style="margin: 6px 0 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em;">${value}<span style="font-size: 13px; color: #6c655c;"> ${escape(unit)}</span></p>
        </div>`;

      container.innerHTML = `
        <h1 style="font-size: 42px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 6px; color: #1f1c18; line-height: 1.05;">
          ${escape(title)}
        </h1>
        <p style="font-size: 14px; color: #b8632e; margin: 0 0 22px; font-style: italic;">
          ${escape(blurb)}
        </p>

        <div style="display: flex; gap: 10px; margin-bottom: 28px;">
          ${macroChip(labels.calories, recipe.calories, labels.calories === 'سعرات' ? 'كيلوكالوري' : 'kcal', '#B83D2E')}
          ${macroChip(labels.protein, recipe.protein, labels.gram, '#7A9362')}
          ${macroChip(labels.carbs, recipe.carbs, labels.gram, '#D6A547')}
          ${macroChip(labels.fat, recipe.fat, labels.gram, '#3A352E')}
        </div>

        <p style="font-size: 12px; color: #9a948a; margin: 0 0 28px;">
          ${recipe.servings} ${escape(labels.servings)} ${' · '} ${recipe.minutes} ${escape(labels.minutes)}
        </p>

        <h2 style="font-size: 14px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #b8632e; margin: 0 0 14px;">
          ${escape(labels.ingredients)}
        </h2>
        <ul style="padding: 0; margin: 0 0 32px; list-style: none;">
          ${ingredients
            .map(
              (i) =>
                `<li style="padding: 6px 0; font-size: 15px; line-height: 1.55; color: #3a352e; border-bottom: 1px solid #efeae0;">
                  <span style="color: #b8632e; font-weight: 700; ${isAr ? 'margin-left: 8px;' : 'margin-right: 8px;'}">•</span>${escape(i)}
                </li>`,
            )
            .join('')}
        </ul>

        <h2 style="font-size: 14px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #b8632e; margin: 0 0 14px;">
          ${escape(labels.method)}
        </h2>
        <ol style="padding: 0; margin: 0 0 36px; list-style: none;">
          ${steps
            .map(
              (s, idx) =>
                `<li style="padding: 10px 0; font-size: 15px; line-height: 1.65; color: #3a352e; display: flex; gap: 14px; ${isAr ? 'flex-direction: row-reverse;' : ''}">
                  <span style="flex: none; width: 26px; height: 26px; border-radius: 999px; background: #1f1c18; color: #fbf9f4; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center;">${idx + 1}</span>
                  <span style="flex: 1; padding-top: 3px;">${escape(s)}</span>
                </li>`,
            )
            .join('')}
        </ol>

        <hr style="border: none; border-top: 1px solid #e6dfd1; margin: 0 0 16px;">
        <p style="font-size: 11px; color: #9a948a; margin: 0; letter-spacing: 0.04em;">
          ${escape(labels.from)} ${' · '} zaytoun.online/fitness
        </p>
      `;

      document.body.appendChild(container);
      try {
        const canvas = await html2canvas(container, {
          backgroundColor: '#fbf9f4',
          scale: 2,
          useCORS: true,
          logging: false,
        });
        const imgData = canvas.toDataURL('image/jpeg', 0.92);
        const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
        const pageW = pdf.internal.pageSize.getWidth();
        const pageH = pdf.internal.pageSize.getHeight();
        const ratio = canvas.width / canvas.height;
        const m = 28;
        let imgW = pageW - m * 2;
        let imgH = imgW / ratio;
        if (imgH > pageH - m * 2) {
          imgH = pageH - m * 2;
          imgW = imgH * ratio;
        }
        pdf.addImage(imgData, 'JPEG', (pageW - imgW) / 2, m, imgW, imgH);
        pdf.save(`${recipe.id}.pdf`);
      } finally {
        document.body.removeChild(container);
      }
    } finally {
      setPdfBusy(false);
    }
  }

  async function handleShare() {
    if (!recipe) return;
    const url = `${window.location.origin}/fitness#recipe-${recipe.id}`;
    const data = { title, text: blurb, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }
    } catch {
      /* user cancelled or share failed */
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-sm"
      />
      <div className="relative flex h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-cream-50 md:h-auto md:max-h-[88vh] md:max-w-3xl md:rounded-3xl">
        {/* Sticky close + hero image */}
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream-50/95 text-ink-900 backdrop-blur transition-colors hover:bg-ink-900 hover:text-cream-50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-[16/10] flex-none bg-ink-900 md:aspect-[16/8]">
          <RecipeImage
            src={recipe.image}
            alt={title}
            eager
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold leading-tight tracking-tighter text-cream-50">
              {title}
            </h2>
            <p className="mt-2 text-sm italic leading-snug text-cream-100/85 md:text-base">
              {blurb}
            </p>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8">
          {/* Macros + meta strip */}
          <div className="flex flex-wrap gap-3 border-b border-ink-100 pb-6">
            <div className="flex items-center gap-1.5 text-sm text-ink-600">
              <Users className="h-3.5 w-3.5" />
              {recipe.servings} {labels.servings}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-ink-600">
              <Clock className="h-3.5 w-3.5" />
              {recipe.minutes} {labels.minutes}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <MacroChip label={labels.calories} value={recipe.calories} unit={isAr ? 'كيلوكالوري' : 'kcal'} color="terracotta" />
            <MacroChip label={labels.protein} value={recipe.protein} unit={labels.gram} color="sage" />
            <MacroChip label={labels.carbs} value={recipe.carbs} unit={labels.gram} color="gold" />
            <MacroChip label={labels.fat} value={recipe.fat} unit={labels.gram} color="ink" />
          </div>

          {recipe.videoId && (
            <div className="mt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta-500">
                {labels.watch}
              </p>
              <div className="mt-3 aspect-video w-full overflow-hidden rounded-2xl bg-ink-900">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${recipe.videoId}?rel=0&modestbranding=1`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta-500">
                {labels.ingredients}
              </h3>
              <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-ink-700 md:text-[15px]">
                {ingredients.map((ing) => (
                  <li key={ing} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-terracotta-500" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-7">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta-500">
                {labels.method}
              </h3>
              <ol className="mt-4 space-y-4 text-[14px] leading-relaxed text-ink-700 md:text-[15px]">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-ink-900 text-[12px] font-bold text-cream-50">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        {/* Sticky action bar */}
        <div className="flex-none border-t border-ink-100 bg-cream-50 px-6 py-4 md:px-8">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={pdfBusy}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-semibold tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500 disabled:opacity-60"
            >
              <Download className="h-4 w-4" />
              {pdfBusy ? labels.building : labels.download}
            </button>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
            >
              {copied ? <Check className="h-4 w-4 text-sage-600" /> : <Share2 className="h-4 w-4" />}
              {copied ? labels.copied : labels.share}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MacroChip({
  label,
  value,
  unit,
  color,
}: {
  label: string;
  value: number;
  unit: string;
  color: 'terracotta' | 'sage' | 'gold' | 'ink';
}) {
  const tint = {
    terracotta: 'text-terracotta-500',
    sage: 'text-sage-600',
    gold: 'text-gold-600',
    ink: 'text-ink-700',
  }[color];
  return (
    <div className="rounded-2xl border border-ink-100 bg-cream-50 p-4 text-center">
      <p className={`text-[10px] font-semibold uppercase tracking-widest ${tint}`}>{label}</p>
      <p className="mt-2 text-2xl font-bold tracking-tighter text-ink-900">
        {value}
        <span className="ml-1 text-[11px] font-medium tracking-tight text-ink-400">{unit}</span>
      </p>
    </div>
  );
}
