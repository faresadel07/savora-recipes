import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Copy,
  Coffee,
  Download,
  Pause,
  Play,
  Star,
  Tv,
  Utensils,
  Volume2,
} from 'lucide-react';
import { searchRecipes } from '../api';
import { useTranslation } from '../i18n';
import {
  ARAB_CHANNELS,
  ARAB_COOKBOOKS,
  ARAB_REGIONS,
  ARAB_SITES,
  ARAB_SPICES,
  FAMOUS_DISHES,
  HERITAGE_NOTES,
  PALESTINIAN_DISHES,
  type ArabDish,
  type ArabRegion,
} from '../data/arab-cuisine';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';
import ArchiveReader from '../components/ArchiveReader';

const HERO_STATS = [
  { value: `${FAMOUS_DISHES.length + PALESTINIAN_DISHES.length}`, label: 'Recipes' },
  { value: `${FAMOUS_DISHES.length + PALESTINIAN_DISHES.length}`, label: 'Video tutorials' },
  { value: `${ARAB_COOKBOOKS.length}`, label: 'Cookbooks' },
  { value: '8', label: 'Regions' },
];

function dishToPlainText(d: ArabDish, isAr: boolean): string {
  const story = isAr && d.storyAr ? d.storyAr : d.story;
  const origin = isAr && d.originAr ? d.originAr : d.origin;
  const ingredients = isAr && d.ingredientsAr ? d.ingredientsAr : d.ingredients;
  const steps = isAr && d.stepsAr ? d.stepsAr : d.steps;
  const labels = isAr
    ? { ingredients: 'المكوّنات', method: 'الطريقة', video: 'فيديو الوصفة', from: 'من زيتون' }
    : { ingredients: 'INGREDIENTS', method: 'METHOD', video: 'Video tutorial', from: 'From Zaytoun' };
  return [
    `${d.name}  (${d.nameAr})`,
    origin,
    '',
    story,
    '',
    labels.ingredients,
    ...ingredients.map((i) => `• ${i}`),
    '',
    labels.method,
    ...steps.map((s, i) => `${i + 1}. ${s}`),
    '',
    `${labels.video}: https://www.youtube.com/watch?v=${d.videoId}`,
    `${labels.from}, zaytoun.online`,
  ].join('\n');
}

function dishToSpoken(d: ArabDish, isAr: boolean): string {
  const story = isAr && d.storyAr ? d.storyAr : d.story;
  const origin = isAr && d.originAr ? d.originAr : d.origin;
  const ingredients = isAr && d.ingredientsAr ? d.ingredientsAr : d.ingredients;
  const steps = isAr && d.stepsAr ? d.stepsAr : d.steps;
  if (isAr) {
    return [
      `وصفة ${d.nameAr}. ${origin}`,
      story,
      'المكوّنات:',
      ...ingredients,
      'الطريقة:',
      ...steps.map((s, i) => `الخطوة ${i + 1}. ${s}`),
    ].join('. ');
  }
  return [
    `Recipe for ${d.name}. ${origin}.`,
    story,
    'Ingredients:',
    ...ingredients,
    'Method:',
    ...steps.map((s, i) => `Step ${i + 1}. ${s}`),
  ].join('. ');
}

/**
 * Three actions per recipe: download as PDF, copy to clipboard, listen aloud.
 * PDF uses jsPDF dynamically imported so it does not weigh down the initial bundle.
 * Listen uses the browser's built-in SpeechSynthesis (works offline, no API key).
 */
function RecipeActions({ dish }: { dish: ArabDish }) {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [pdfBusy, setPdfBusy] = useState(false);

  const speaking = speakingId === dish.id;
  const origin = isAr && dish.originAr ? dish.originAr : dish.origin;
  const story = isAr && dish.storyAr ? dish.storyAr : dish.story;
  const ingredients = isAr && dish.ingredientsAr ? dish.ingredientsAr : dish.ingredients;
  const steps = isAr && dish.stepsAr ? dish.stepsAr : dish.steps;
  const labels = isAr
    ? { ingredients: 'المكوّنات', method: 'الطريقة', video: 'فيديو الوصفة', from: 'من زيتون' }
    : { ingredients: 'INGREDIENTS', method: 'METHOD', video: 'Video tutorial', from: 'From Zaytoun' };

  async function handleDownload() {
    setPdfBusy(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      // Build an off-screen printable card. The browser handles Arabic shaping
      // and RTL layout natively, so html2canvas captures it as a faithful
      // image. We embed that image in jsPDF, which sidesteps jsPDF's lack of
      // Arabic font support entirely.
      const displayName = isAr ? dish.nameAr : dish.name;
      const subName = isAr ? dish.name : dish.nameAr;
      const fontStack = isAr
        ? `'IBM Plex Sans Arabic', 'Geeza Pro', 'Segoe UI Arabic', system-ui, sans-serif`
        : `'Inter', 'SF Pro Text', system-ui, sans-serif`;
      const escapeHtml = (s: string) =>
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
      container.innerHTML = `
        <h1 style="font-size: 46px; font-weight: 700; letter-spacing: -0.02em; margin: 0 0 6px; color: #1f1c18; line-height: 1.05;">
          ${escapeHtml(displayName)}
        </h1>
        <p style="font-size: 22px; font-weight: 500; color: #6c655c; margin: 0 0 18px; line-height: 1.2;">
          ${escapeHtml(subName)}
        </p>
        <p style="font-size: 14px; font-weight: 500; color: #b8632e; margin: 0 0 22px; letter-spacing: 0.03em; text-transform: uppercase;">
          ${escapeHtml(origin)}
        </p>
        <hr style="border: none; border-top: 1px solid #e6dfd1; margin: 0 0 22px;">
        <p style="font-size: 16px; line-height: 1.7; color: #3a352e; margin: 0 0 36px;">
          ${escapeHtml(story)}
        </p>
        <h2 style="font-size: 14px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #b8632e; margin: 0 0 14px;">
          ${labels.ingredients}
        </h2>
        <ul style="padding: 0; margin: 0 0 32px; list-style: none;">
          ${ingredients
            .map(
              (i) =>
                `<li style="padding: 6px 0; font-size: 15px; line-height: 1.55; color: #3a352e; border-bottom: 1px solid #efeae0;">
                  <span style="color: #b8632e; font-weight: 700; ${isAr ? 'margin-left: 8px;' : 'margin-right: 8px;'}">•</span>${escapeHtml(i)}
                </li>`,
            )
            .join('')}
        </ul>
        <h2 style="font-size: 14px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #b8632e; margin: 0 0 14px;">
          ${labels.method}
        </h2>
        <ol style="padding: 0; margin: 0 0 36px; list-style: none; counter-reset: zaytoun-step;">
          ${steps
            .map(
              (s, idx) =>
                `<li style="padding: 10px 0; font-size: 15px; line-height: 1.65; color: #3a352e; display: flex; gap: 14px; ${isAr ? 'flex-direction: row-reverse;' : ''}">
                  <span style="flex: none; width: 26px; height: 26px; border-radius: 999px; background: #1f1c18; color: #fbf9f4; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center;">${idx + 1}</span>
                  <span style="flex: 1; padding-top: 3px;">${escapeHtml(s)}</span>
                </li>`,
            )
            .join('')}
        </ol>
        <hr style="border: none; border-top: 1px solid #e6dfd1; margin: 0 0 16px;">
        <p style="font-size: 11px; color: #9a948a; margin: 0; letter-spacing: 0.04em;">
          ${labels.video}: https://www.youtube.com/watch?v=${dish.videoId}
        </p>
        <p style="font-size: 11px; color: #9a948a; margin: 6px 0 0; letter-spacing: 0.04em;">
          ${labels.from} · zaytoun.online
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
        const horizontalMargin = 28;
        const verticalMargin = 28;
        let imgW = pageW - horizontalMargin * 2;
        let imgH = imgW / ratio;
        if (imgH > pageH - verticalMargin * 2) {
          imgH = pageH - verticalMargin * 2;
          imgW = imgH * ratio;
        }
        pdf.addImage(imgData, 'JPEG', (pageW - imgW) / 2, verticalMargin, imgW, imgH);
        const slug = (isAr ? dish.id : dish.name.replace(/\s+/g, '-').toLowerCase());
        pdf.save(`${slug}.pdf`);
      } finally {
        document.body.removeChild(container);
      }
    } finally {
      setPdfBusy(false);
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(dishToPlainText(dish, isAr));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  function handleListen() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(dishToSpoken(dish, isAr));
    utter.lang = isAr ? 'ar-SA' : 'en-US';
    utter.rate = 0.95;
    utter.pitch = 1;
    utter.onend = () => setSpeakingId((id) => (id === dish.id ? null : id));
    utter.onerror = () => setSpeakingId((id) => (id === dish.id ? null : id));
    window.speechSynthesis.speak(utter);
    setSpeakingId(dish.id);
  }
  void origin; void story; void ingredients; void steps; void labels;

  return (
    <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-5">
      <button
        type="button"
        onClick={handleDownload}
        disabled={pdfBusy}
        className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-4 py-2 text-[12px] font-medium tracking-tight text-ink-700 transition-all hover:border-ink-900 hover:text-ink-900 disabled:opacity-60"
      >
        <Download className="h-3.5 w-3.5" />
        {pdfBusy ? (isAr ? 'جاري التحضير' : 'Building PDF') : 'PDF'}
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-4 py-2 text-[12px] font-medium tracking-tight text-ink-700 transition-all hover:border-ink-900 hover:text-ink-900"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-sage-600" /> : <Copy className="h-3.5 w-3.5" />}
        {copied ? (isAr ? 'تم النسخ' : 'Copied') : isAr ? 'نسخ الوصفة' : 'Copy recipe'}
      </button>
      <button
        type="button"
        onClick={handleListen}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] font-medium tracking-tight transition-all ${
          speaking
            ? 'border-terracotta-500 bg-terracotta-500 text-cream-50'
            : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900 hover:text-ink-900'
        }`}
      >
        {speaking ? <Pause className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        {speaking ? (isAr ? 'إيقاف' : 'Stop') : isAr ? 'استمع' : 'Listen'}
      </button>
    </div>
  );
}

/**
 * Lite YouTube embed: shows the thumbnail (free, always loads from img.youtube.com)
 * until the user clicks Play, then swaps in the iframe with autoplay. This pattern
 * keeps the page fast even with many videos on a single route.
 */
function YoutubeLite({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${title}`}
      className="group absolute inset-0 flex items-center justify-center overflow-hidden bg-ink-900"
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
        onLoad={(e) => {
          const t = e.currentTarget;
          if (t.naturalWidth > 120) return;
                          if (t.src.includes('maxresdefault')) {
                            t.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
                          } else if (t.src.includes('sddefault')) {
                            t.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                          }
        }}
        onError={(e) => {
          const t = e.currentTarget;
          if (t.src.includes('maxresdefault')) {
            t.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
          } else if (t.src.includes('sddefault')) {
            t.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }
        }}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-ink-900/10" />
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-2xl transition-transform group-hover:scale-110 md:h-20 md:w-20">
        <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-8 md:w-8" strokeWidth={1.5} />
      </span>
    </button>
  );
}

function DishArticle({ dish, index, accent = 'gold' }: { dish: ArabDish; index: number; accent?: 'gold' | 'sage' }) {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const bullet = accent === 'sage' ? 'bg-sage-500' : 'bg-gold-500';
  const stepNum = accent === 'sage' ? 'bg-sage-500' : 'bg-ink-900';
  const displayName = isAr ? dish.nameAr : dish.name;
  const subName = isAr ? dish.name : dish.nameAr;
  const displayOrigin = isAr && dish.originAr ? dish.originAr : dish.origin;
  const displayStory = isAr && dish.storyAr ? dish.storyAr : dish.story;
  const displayIngredients = isAr && dish.ingredientsAr ? dish.ingredientsAr : dish.ingredients;
  const displaySteps = isAr && dish.stepsAr ? dish.stepsAr : dish.steps;

  return (
    <article
      id={`dish-${dish.id}`}
      className="grid scroll-mt-24 items-start gap-8 md:grid-cols-12 md:gap-12"
    >
      {/* TITLE always first in DOM, so mobile reads title before video. On desktop, alternate columns. */}
      <div className={`md:col-span-5 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
        <h3 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tighter">
          {displayName}
        </h3>
        <p className="mt-1 text-xl font-medium tracking-tight text-ink-500">{subName}</p>
        <p className="mt-4 text-[15px] font-medium tracking-tight text-ink-500">{displayOrigin}</p>
        <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">{displayStory}</p>
      </div>

      <div className="md:col-span-7">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-ink-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
          <YoutubeLite videoId={dish.videoId} title={displayName} />
        </div>
      </div>

      <div className="md:col-span-12">
        <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-4">
              <h4 className="text-base font-semibold tracking-tight text-ink-900">{isAr ? 'المكوّنات' : 'Ingredients'}</h4>
              <ul className="mt-4 space-y-2.5 text-[14px] leading-relaxed text-ink-700 md:text-[15px]">
                {displayIngredients.map((ing) => (
                  <li key={ing} className="flex gap-2.5">
                    <span className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${bullet}`} />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-8">
              <h4 className="text-base font-semibold tracking-tight text-ink-900">{isAr ? 'الطريقة' : 'Method'}</h4>
              <ol className="mt-4 space-y-4 text-[14px] leading-relaxed text-ink-700 md:text-[15px]">
                {displaySteps.map((s, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className={`grid h-7 w-7 flex-none place-items-center rounded-full ${stepNum} text-[12px] font-semibold text-cream-50`}>
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <RecipeActions dish={dish} />
        </div>
      </div>
    </article>
  );
}

export default function ArabCuisinePage() {
  const [activeRegion, setActiveRegion] = useState<ArabRegion>(ARAB_REGIONS[0]);

  const regionRecipesQ = useQuery({
    queryKey: ['arab-region', activeRegion.searchArea ?? activeRegion.id],
    queryFn: async () => {
      if (!activeRegion.searchArea) return { results: [], total: 0 };
      return searchRecipes({ area: activeRegion.searchArea, number: 9 });
    },
    enabled: Boolean(activeRegion.searchArea),
  });

  return (
    <div>
      {/* ============ HERO (light, editorial) ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                The Arab table.
                <br />
                <span className="text-gold-600">From the Atlantic to Oman.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                Twenty-three iconic recipes with full ingredients, method, and an
                embedded video tutorial for each. A dedicated Palestinian kitchen.
                Ten public-archive cookbooks you can read in place. The spice cabinet
                that powered it all. Take any recipe with you as a PDF, copied text,
                or read aloud.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#recipes"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
                >
                  <Utensils className="h-3.5 w-3.5" />
                  Jump to recipes
                </a>
                <a
                  href="#palestine"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                >
                  <Star className="h-3.5 w-3.5" />
                  Palestinian kitchen
                </a>
                <a
                  href="#cookbooks"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  Cookbooks
                </a>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-4 gap-2">
                {HERO_STATS.map((s) => (
                  <LightStat key={s.label} top={s.value} bottom={s.label} />
                ))}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {FAMOUS_DISHES.slice(0, 4).map((d, i) => (
                  <a
                    key={d.id}
                    href={`#dish-${d.id}`}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${d.videoId}/maxresdefault.jpg`}
                      onLoad={(e) => {
                        const t = e.currentTarget;
                        if (t.naturalWidth > 120) return;
                          if (t.src.includes('maxresdefault')) {
                            t.src = `https://img.youtube.com/vi/${d.videoId}/sddefault.jpg`;
                          } else if (t.src.includes('sddefault')) {
                            t.src = `https://img.youtube.com/vi/${d.videoId}/hqdefault.jpg`;
                          }
                      }}
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (t.src.includes('maxresdefault')) {
                          t.src = `https://img.youtube.com/vi/${d.videoId}/sddefault.jpg`;
                        } else if (t.src.includes('sddefault')) {
                          t.src = `https://img.youtube.com/vi/${d.videoId}/hqdefault.jpg`;
                        }
                      }}
                      alt={d.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[9px] uppercase tracking-widest text-cream-100/70">{d.nameAr}</p>
                      <p className="mt-1 text-sm font-semibold tracking-tight text-cream-50">{d.name}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-sage-400/15 blur-3xl" />
      </section>

      {/* ============ RECIPES (the main event) ============ */}
      <section id="recipes" className="border-t border-ink-100 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            title="Eighteen recipes, eighteen videos."
            body="Each dish gets the full treatment: a short story, the exact ingredients, step-by-step method, and an embedded cooking tutorial. Press play, watch, cook. Take it with you as a PDF, copy it to your clipboard, or have it read aloud."
          />

          <div className="space-y-16 md:space-y-24">
            {FAMOUS_DISHES.map((d, i) => (
              <DishArticle key={d.id} dish={d} index={i} accent="gold" />
            ))}
          </div>
        </div>
      </section>

      {/* ============ PALESTINIAN KITCHEN ============ */}
      <section id="palestine" className="relative overflow-hidden border-y border-sage-500/20 bg-sage-50/40 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sage-500 via-gold-500 to-terracotta-500" />
        <div className="container-wide">
          <div className="mb-12 max-w-3xl">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05] tracking-tighter text-ink-900">
              Five dishes from olive country.
              <span className="block text-sage-600">المطبخ الفلسطيني.</span>
            </h2>
            <p className="mt-5 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
              A dedicated section for Palestinian heritage cooking. The dishes here
              are tied to the land: olive oil from the autumn pressing, taboon bread
              baked in clay ovens, grape leaves rolled by hand in village courtyards.
              UNESCO recognizes the rolling of maftoul as intangible heritage.
              Every recipe below is a small act of preservation.
            </p>
          </div>

          <div className="space-y-16 md:space-y-24">
            {PALESTINIAN_DISHES.map((d, i) => (
              <DishArticle key={d.id} dish={d} index={i} accent="sage" />
            ))}
          </div>
        </div>
      </section>

      {/* ============ REGIONS (browse by) ============ */}
      <section id="regions" className="container-wide py-16 md:py-24">
        <SectionHead
          title="Eight kitchens, one heritage."
          body="The Arab world is not one cuisine, it is a constellation. Pick a region to see its signature dishes, its spice cabinet, and any recipes from our library that match."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {ARAB_REGIONS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveRegion(r)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                activeRegion.id === r.id
                  ? 'border-ink-900 bg-ink-900 text-cream-50'
                  : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
              }`}
            >
              {r.name}
              <span className="ml-2 text-[10px] opacity-60">{r.nameAr}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <h3 className="text-[clamp(1.875rem,3.5vw,3rem)] font-semibold leading-tight tracking-tighter">{activeRegion.name}</h3>
            <p className="mt-1 text-xl font-medium tracking-tight text-ink-500">{activeRegion.nameAr}</p>
            <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">{activeRegion.blurb}</p>

            <div className="mt-7">
              <h4 className="text-base font-semibold tracking-tight text-ink-900">Signature dishes</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeRegion.signatureDishes.map((d) => (
                  <span key={d} className="rounded-full bg-cream-100 px-3 py-1.5 text-[12px] font-medium tracking-tight text-ink-700">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-base font-semibold tracking-tight text-ink-900">Spice cabinet</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeRegion.signatureSpices.map((s) => (
                  <span
                    key={s}
                    className={`rounded-full border px-3 py-1.5 text-[12px] font-medium tracking-tight ${
                      activeRegion.accent === 'sage'
                        ? 'border-sage-500/30 bg-sage-50 text-sage-600'
                        : activeRegion.accent === 'gold'
                        ? 'border-gold-500/30 bg-cream-200 text-gold-600'
                        : activeRegion.accent === 'terracotta'
                        ? 'border-terracotta-500/30 bg-terracotta-50 text-terracotta-600'
                        : 'border-ink-200 bg-cream-100 text-ink-700'
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {regionRecipesQ.data && regionRecipesQ.data.results.length > 0 ? (
              <>
                <h4 className="mb-4 text-base font-semibold tracking-tight text-ink-900">Recipes from our library</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
                  {regionRecipesQ.data.results.slice(0, 9).map((r, i) => (
                    <RecipeCard key={r.id} recipe={r} index={i} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-ink-100 bg-cream-50 p-8">
                <h4 className="text-xl font-semibold leading-snug tracking-tight">
                  These dishes live in the recipes and videos above.
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  Our recipe API does not catalog every Arab region yet. Scroll back up
                  for the featured recipes, each with a full video tutorial.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ COOKBOOKS (read inside) ============ */}
      <section id="cookbooks" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            title="Ten cookbooks, read in place."
            body="Ten Arab-cuisine cookbooks hosted on Internet Archive. Open the reader and turn the pages right here, without leaving the site."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {ARAB_COOKBOOKS.map((b, i) => (
              <article
                key={b.id}
                className="flex flex-col gap-5 rounded-3xl border border-ink-100 bg-cream-50 p-6 md:flex-row md:p-7"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <a href={b.detailUrl} target="_blank" rel="noreferrer" className="relative block aspect-[3/4] w-full flex-none overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] md:w-44">
                  <RecipeImage src={b.coverUrl} alt={b.title} className="absolute inset-0 h-full w-full object-cover" />
                </a>
                <div className="flex flex-1 flex-col">
                  <h3 className="text-xl font-semibold leading-snug tracking-tight md:text-2xl">{b.title}</h3>
                  <p className="mt-1 text-sm tracking-tight text-ink-500">{b.author}, {b.year}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600">{b.blurb}</p>
                  <ArchiveReader embedUrl={b.embedUrl} detailUrl={b.detailUrl} title={b.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SPICES ============ */}
      <section id="spices" className="container-wide py-16 md:py-24">
        <SectionHead
          title="Nine spices that built a cuisine."
          body="Memorize this short list and you can read any Arab recipe. The whole Arab kitchen is variations on these aromatics."
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ARAB_SPICES.map((s) => (
            <article key={s.name} className="rounded-2xl border border-ink-100 bg-cream-50 p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl font-semibold tracking-tight">{s.name}</h3>
                <span className="text-base font-medium text-ink-400">{s.nameAr}</span>
              </div>
              <p className="mt-1 text-xs tracking-tight text-ink-400">{s.origin}</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-600">{s.description}</p>
              <p className="mt-4 border-t border-ink-100 pt-4 text-[13px] tracking-tight text-ink-600">
                <span className="font-semibold text-ink-900">Use:</span> {s.uses}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ============ HERITAGE NOTES ============ */}
      <section id="heritage" className="border-y border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            title="Six notes on heritage."
            body="The Arab kitchen carries a long memory. Six short notes that help explain why dishes taste the way they do."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {HERITAGE_NOTES.map((note, i) => (
              <article key={note.title} className="rounded-3xl border border-ink-100 bg-cream-50 p-7" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex items-start gap-4">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gold-500/15 text-gold-600">
                    <Star className="h-4 w-4" strokeWidth={1.6} />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-snug tracking-tight md:text-xl">{note.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{note.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CHANNELS (explore more) ============ */}
      <section id="channels" className="container-wide py-16 md:py-24">
        <SectionHead
          title="Seventeen channels to explore."
          body="Hand-picked YouTube channels covering Levantine, Egyptian, Maghrebi, Gulf, and pan-Arab cooking. All free, all public."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ARAB_CHANNELS.map((c, i) => (
            <ChannelCard key={c.id} channel={c} index={i} />
          ))}
        </div>
      </section>

      {/* ============ MODERN SITES ============ */}
      <section id="sites" className="border-t border-ink-100 bg-cream-100/40 py-16 md:py-24">
        <div className="container-wide">
          <SectionHead
            title="Where Arab chefs publish online."
            body="Five contemporary Arab and Arab-diaspora cooks whose websites and books are worth the bookmark."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {ARAB_SITES.map((s, i) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-gold-600">
                    {s.name}
                  </h3>
                  <ArrowUpRight className="rtl-flip h-4 w-4 flex-none text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{s.blurb}</p>
                <p className="mt-4 text-xs tracking-tight text-ink-400">
                  {s.language === 'ar' ? 'Arabic' : s.language === 'en' ? 'English' : 'Bilingual'}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-20 pt-16">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <Coffee className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            "Coffee is in two cups. The first is for the host, the second for the guest. Drink slowly and stay a while."
          </h3>
          <p className="mt-4 text-sm italic tracking-tight text-cream-100/70">Bedouin saying</p>
          <Link to="/recipes" className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400">
            Browse all recipes
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function SectionHead({ title, body }: { title: string; body?: string; icon?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">{title}</h2>
      {body && <p className="mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">{body}</p>}
    </div>
  );
}

function LightStat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
      <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{top}</p>
      <p className="mt-1 text-xs tracking-tight text-ink-500">{bottom}</p>
    </div>
  );
}

function ChannelCard({ channel: c, index }: { channel: (typeof ARAB_CHANNELS)[number]; index: number }) {
  const accentBg =
    c.accent === 'terracotta' ? 'bg-terracotta-50 text-terracotta-600'
    : c.accent === 'sage' ? 'bg-sage-50 text-sage-600'
    : c.accent === 'gold' ? 'bg-cream-200 text-gold-600'
    : 'bg-ink-50 text-ink-600';

  return (
    <a
      href={c.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col gap-4 rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${accentBg}`}>
          <Coffee className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="rtl-flip h-4 w-4 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
      </div>

      <div>
        <p className="text-xs tracking-tight text-ink-400">{c.region}</p>
        <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-gold-600 md:text-xl">
          {c.name}
        </h3>
        {c.nameAr && <p className="mt-0.5 text-[13px] tracking-tight text-ink-500">{c.nameAr}</p>}
        <p className="mt-0.5 text-[11px] tracking-tight text-ink-400">{c.handle}</p>
      </div>

      <p className="mt-auto text-sm leading-relaxed text-ink-600">{c.blurb}</p>

      <div className="mt-1 inline-flex items-center gap-1.5 text-xs tracking-tight text-ink-400">
        <Tv className="h-3 w-3" /> Open on YouTube
      </div>
    </a>
  );
}
