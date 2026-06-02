import { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ChefHat,
  ClipboardList,
  Download,
  ExternalLink,
  FileDown,
  Globe,
  Heart,
  Minus,
  Pause,
  Play,
  PlayCircle,
  Plus,
  Printer,
  Salad,
  Share2,
  Square,
  Tag,
  Timer as TimerIcon,
  Utensils,
  Volume2,
} from 'lucide-react';
import { getRecipeById, getSimilarRecipes } from '../api';
import { useFavorites } from '../hooks/useFavorites';
import { useCountdown } from '../hooks/useCountdown';
import { useTranslation } from '../i18n';
import { LOCAL_RECIPE_AR } from '../i18n/data-translations';
import { transformMeasure } from '../lib/scale';
import { buildRecipeSchema, injectSchema } from '../lib/schema';
import { createVoiceController, isVoiceSupported, type VoiceState } from '../lib/voice';
import { mdbArLookup } from '../api/mealdb';
import { detectTimers, fmtRemaining, type DetectedTimer } from '../lib/timer';
import type { Recipe } from '../types/recipe';
import RecipeCard from '../components/RecipeCard';
import RecipeImage from '../components/RecipeImage';
import YouTubeEmbed from '../components/YouTubeEmbed';
import NutritionCard from '../components/NutritionCard';
import Skeleton from '../components/Skeleton';
import ErrorState from '../components/ErrorState';

type UnitSystem = 'original' | 'us' | 'metric';

export default function RecipeDetailPage() {
  const { id = '' } = useParams<{ id: string }>();

  const recipeQ = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id),
    enabled: Boolean(id),
  });

  const similarQ = useQuery({
    queryKey: ['similar', id, recipeQ.data?.category],
    queryFn: () => getSimilarRecipes({ id, category: recipeQ.data?.category }, 4),
    enabled: Boolean(id) && Boolean(recipeQ.data?.category),
  });

  if (recipeQ.isLoading) {
    return (
      <div className="container-wide pt-8">
        <Skeleton className="h-[55vh] w-full" />
      </div>
    );
  }
  if (recipeQ.isError) {
    return (
      <div className="container-wide">
        <ErrorState error={recipeQ.error} onRetry={() => recipeQ.refetch()} />
      </div>
    );
  }
  if (!recipeQ.data) return null;

  return <RecipeView recipe={recipeQ.data} similar={similarQ.data ?? []} />;
}

function RecipeView({ recipe: r, similar }: { recipe: Recipe; similar: Recipe[] }) {
  const { t, language } = useTranslation();
  const isAr = language === 'ar';
  const localAr = LOCAL_RECIPE_AR[r.id];
  // Embedded Ar fields on LocalRecipe (Phase 4 translation)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lr = r as any;

  // For MealDB recipes, fetch the pre-translated Arabic version from the
  // bundled mealdb-cache-ar.json. The build-time script translated every
  // field through Google Translate so the result is grammatical Arabic
  // rather than the half-translated regex output we used to produce.
  const mealdbArQ = useQuery({
    queryKey: ['mealdb-ar', r.id],
    queryFn: () => mdbArLookup(r.id),
    enabled: isAr && r.source === 'mealdb',
    staleTime: Infinity,
  });
  const mealdbAr = mealdbArQ.data;

  const displayTitle = isAr
    ? lr.titleAr || localAr?.title || mealdbAr?.title || r.title
    : r.title;
  const displayCategory = isAr
    ? lr.categoryAr || mealdbAr?.category || r.category
    : r.category;
  const displayArea = isAr ? lr.areaAr || mealdbAr?.area || r.area : r.area;
  const displayIngredients = isAr
    ? lr.ingredientsAr || mealdbAr?.ingredients || r.ingredients
    : r.ingredients;
  const displaySteps = isAr
    ? lr.stepsAr || mealdbAr?.steps || r.steps
    : r.steps;
  const displayInstructions = isAr
    ? lr.instructionsAr || mealdbAr?.instructions || r.instructions
    : r.instructions;
  void displayInstructions;
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(r.id);

  const [system, setSystem] = useState<UnitSystem>('original');
  const baseServings = r.servings && r.servings > 0 ? r.servings : 4;
  const [servings, setServings] = useState(baseServings);
  const factor = servings / baseServings;

  // Voice
  const voiceRef = useRef(createVoiceController());
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  useEffect(() => {
    voiceRef.current.onState((s) => setVoiceState(s));
    return () => voiceRef.current.stop();
  }, []);

  // Schema.org JSON-LD
  useEffect(() => {
    const schema = buildRecipeSchema(r, window.location.href);
    return injectSchema(schema, 'recipe-schema');
  }, [r]);

  // Print
  const printableRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    // Use the browser print dialog with a print-tuned stylesheet (see <style> below)
    window.print();
  };

  // PDF — libs lazy-loaded so they only ship when someone clicks the button
  const [pdfBusy, setPdfBusy] = useState(false);
  const handlePdf = async () => {
    if (!printableRef.current) return;
    try {
      setPdfBusy(true);
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const canvas = await html2canvas(printableRef.current, {
        backgroundColor: '#FBF9F4',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      let imgW = pageW - 48;
      let imgH = imgW / ratio;
      if (imgH > pageH - 48) {
        imgH = pageH - 48;
        imgW = imgH * ratio;
      }
      pdf.addImage(imgData, 'JPEG', (pageW - imgW) / 2, 24, imgW, imgH);
      pdf.save(`${r.title.replace(/[^\w]+/g, '-').toLowerCase()}.pdf`);
    } finally {
      setPdfBusy(false);
    }
  };

  // Shopping list copy
  const [copied, setCopied] = useState(false);
  const handleCopyShoppingList = async () => {
    const lines = (r.ingredients ?? []).map((i) => {
      const measure = transformMeasure(i.measure, factor, system);
      return `• ${measure ? measure + ' ' : ''}${i.name}`;
    });
    const text = `${r.title}\nFor ${servings} ${servings === 1 ? 'serving' : 'servings'}\n\n${lines.join('\n')}\n\nFrom Zaytoun · ${window.location.href}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  // Share
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: r.title, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard.');
    }
  };

  const ingredientLines = useMemo(
    () =>
      (displayIngredients ?? []).map((i: { measure?: string; name: string }) => ({
        measure: transformMeasure(i.measure, factor, system),
        name: i.name,
      })),
    [displayIngredients, factor, system],
  );

  // Voice helpers
  const speakAll = () => {
    if (!displaySteps?.length) return;
    const stepWord = isAr ? 'الخطوة' : 'Step';
    const text = displaySteps.map((s: string, i: number) => `${stepWord} ${i + 1}. ${s}`).join(' ');
    voiceRef.current.speak(text);
  };
  const speakStep = (text: string) => voiceRef.current.speak(text);
  const pauseVoice = () => voiceRef.current.pause();
  const resumeVoice = () => voiceRef.current.resume();
  const stopVoice = () => voiceRef.current.stop();

  const hasSteps = (displaySteps?.length ?? 0) > 0;

  return (
    <article>
      {/* Print-only styles. Hides everything except the printable section. */}
      <style>{`
        @media print {
          body { background: #fff !important; }
          header, footer, [data-hide-on-print="true"] { display: none !important; }
          .print-area { background: #fff !important; padding: 0 !important; }
          .print-area * { color: #000 !important; }
          .print-area img { max-width: 320px !important; }
        }
      `}</style>

      <header className="relative">
        <div className="container-wide pt-5 md:pt-8" data-hide-on-print="true">
          <Link to="/recipes" className="link-underline text-[13px] tracking-tight text-ink-600">
            <ArrowLeft className="rtl-flip mr-1 inline h-3.5 w-3.5" /> {t('recipe.backToRecipes')}
          </Link>
        </div>

        <div className="container-wide mt-5 grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-cream-200">
              <RecipeImage src={r.image} alt={displayTitle} eager className="absolute inset-0 h-full w-full object-cover" />
              {r.youtube && (
                <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-cream-50/90 px-3 py-1.5 text-[11px] font-medium tracking-tight text-ink-900 backdrop-blur-md">
                  <PlayCircle className="h-3.5 w-3.5" />
                  {t('recipe.videoBelow')}
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-5 md:pt-6">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              {r.category && (
                <span className="eyebrow inline-flex items-center gap-1">
                  <Utensils className="h-3 w-3" /> {displayCategory}
                </span>
              )}
              {r.category && r.area && <span className="h-0.5 w-0.5 rounded-full bg-ink-300" />}
              {r.area && (
                <span className="eyebrow inline-flex items-center gap-1">
                  <Globe className="h-3 w-3" /> {displayArea}
                </span>
              )}
            </div>

            <h1 className="text-display-lg">{displayTitle}</h1>

            {r.publisher && (
              <p className="mt-5 text-sm tracking-tight text-ink-400">
                {t('recipe.recipeBy')} <span className="text-ink-600">{r.publisher}</span>
              </p>
            )}

            {/* PRIMARY ACTIONS */}
            <div className="mt-8 flex flex-wrap gap-3" data-hide-on-print="true">
              <button
                type="button"
                onClick={() => toggleFavorite(r)}
                className={`btn-primary ${fav ? '!bg-terracotta-500' : ''}`}
              >
                <Heart className="h-4 w-4" fill={fav ? 'currentColor' : 'none'} />
                {fav ? t('common.saved') : t('common.save')}
              </button>
              <button type="button" onClick={share} className="btn-outline">
                <Share2 className="h-4 w-4" />
                {t('common.share')}
              </button>
            </div>

            {/* SECONDARY TOOLBAR */}
            <div className="mt-4 flex flex-wrap gap-1.5" data-hide-on-print="true">
              <ToolButton onClick={handlePrint} icon={<Printer className="h-3.5 w-3.5" />} label={t('common.print')} />
              <ToolButton
                onClick={handlePdf}
                disabled={pdfBusy}
                icon={pdfBusy ? <Download className="h-3.5 w-3.5 animate-pulse" /> : <FileDown className="h-3.5 w-3.5" />}
                label={pdfBusy ? t('common.loading') : t('common.pdf')}
              />
              <ToolButton
                onClick={handleCopyShoppingList}
                icon={<ClipboardList className="h-3.5 w-3.5" />}
                label={copied ? t('common.copied') : t('common.shoppingList')}
              />
              {isVoiceSupported() && hasSteps && (
                <>
                  {voiceState === 'idle' && (
                    <ToolButton onClick={speakAll} icon={<Volume2 className="h-3.5 w-3.5" />} label={t('common.readAloud')} />
                  )}
                  {voiceState === 'speaking' && (
                    <ToolButton onClick={pauseVoice} icon={<Pause className="h-3.5 w-3.5" />} label={t('common.pause')} />
                  )}
                  {voiceState === 'paused' && (
                    <ToolButton onClick={resumeVoice} icon={<Play className="h-3.5 w-3.5" />} label={t('common.resume')} />
                  )}
                  {voiceState !== 'idle' && (
                    <ToolButton onClick={stopVoice} icon={<Square className="h-3.5 w-3.5" />} label={t('common.stop')} />
                  )}
                </>
              )}
            </div>

            {r.tags && r.tags.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-2" data-hide-on-print="true">
                {r.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-sage-50 px-3 py-1 text-xs font-medium tracking-tight text-sage-600">
                    <Tag className="h-3 w-3" /> {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* PRINTABLE AREA — wraps ingredients + instructions for clean print + PDF */}
      <div ref={printableRef} className="print-area">
        <div className="container-wide mt-16 grid gap-10 md:grid-cols-12 md:gap-14">
          {/* INGREDIENTS */}
          <aside className="md:col-span-4">
            <div className="md:sticky md:top-24">
              <p className="eyebrow mb-3">{t('recipe.youWillNeed')}</p>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{t('recipe.ingredients')}</h2>

              {/* Servings scaler */}
              <div className="mt-5 flex items-center gap-2 rounded-full border border-ink-100 bg-cream-50 p-1" data-hide-on-print="true">
                <button
                  type="button"
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-900 transition-colors hover:bg-ink-900 hover:text-cream-50 disabled:opacity-40"
                  disabled={servings <= 1}
                  aria-label="Decrease servings"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <div className="flex-1 text-center">
                  <span className="text-lg font-semibold tracking-tighter">{servings}</span>
                  <span className="ml-1.5 text-[11px] uppercase tracking-widest text-ink-400">
                    {servings === 1 ? t('common.serving') : t('common.servings')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setServings((s) => Math.min(99, s + 1))}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-900 transition-colors hover:bg-ink-900 hover:text-cream-50"
                  aria-label="Increase servings"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Unit toggle */}
              <div className="mt-3 inline-flex rounded-full border border-ink-100 bg-cream-50 p-1 text-[11px]" data-hide-on-print="true">
                {(['original', 'us', 'metric'] as const).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSystem(s)}
                    className={`rounded-full px-3 py-1.5 font-medium uppercase tracking-widest transition-colors ${
                      system === s ? 'bg-ink-900 text-cream-50' : 'text-ink-400 hover:text-ink-900'
                    }`}
                  >
                    {s === 'original' ? t('recipe.original') : s === 'us' ? t('recipe.us') : t('recipe.metric')}
                  </button>
                ))}
              </div>

              <p className="mt-3 text-[11px] tracking-tight text-ink-400" data-hide-on-print="true">
                {servings !== baseServings || system !== 'original'
                  ? `${t('recipe.scaledFrom', { n: baseServings, servings: baseServings === 1 ? t('common.serving') : t('common.servings') })}${system !== 'original' ? ` · ${t('recipe.scaledFromUnits', { system: system.toUpperCase() })}` : ''}`
                  : t('recipe.asWrittenFor', { n: baseServings, servings: baseServings === 1 ? t('common.serving') : t('common.servings') })}
              </p>

              <ul className="mt-7 divide-y divide-ink-100">
                {ingredientLines.length > 0 ? (
                  ingredientLines.map((line: { measure?: string; name: string }, i: number) => (
                    <li key={`${line.name}-${i}`} className="flex items-start gap-3.5 py-3">
                      <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-cream-100">
                        <Salad className="h-3.5 w-3.5 text-ink-400" />
                      </span>
                      <span className="pt-1.5 text-sm leading-snug tracking-tight text-ink-900">
                        {line.measure ? (
                          <>
                            <span className="font-medium">{line.measure}</span>
                            <span className="ml-1 text-ink-600">{line.name}</span>
                          </>
                        ) : (
                          line.name
                        )}
                      </span>
                    </li>
                  ))
                ) : (
                  <p className="mt-7 rounded-2xl bg-cream-100 p-5 text-sm text-ink-400">
                    {t('recipe.sourceFallback')}
                  </p>
                )}
              </ul>
            </div>
          </aside>

          {/* INSTRUCTIONS */}
          <section className="md:col-span-8 space-y-14">
            {r.youtube && (
              <div data-hide-on-print="true">
                <p className="eyebrow mb-3">{t('recipe.watchFirst')}</p>
                <h2 className="text-display-md mb-6">{t('recipe.videoGuide')}</h2>
                <YouTubeEmbed url={r.youtube} title={displayTitle} thumbnail={r.image} />
              </div>
            )}

            <div>
              <p className="eyebrow mb-3">{t('recipe.theMethod')}</p>
              <h2 className="text-display-md">{t('recipe.instructions')}</h2>

              {hasSteps ? (
                <ol className="mt-8 space-y-8">
                  {displaySteps!.map((step: string, i: number) => (
                    <StepRow
                      key={i}
                      step={step}
                      index={i}
                      onSpeak={() => speakStep(`${isAr ? 'الخطوة' : 'Step'} ${i + 1}. ${step}`)}
                      voiceState={voiceState}
                      voiceSupported={isVoiceSupported()}
                      readStepLabel={t('common.readStep')}
                    />
                  ))}
                </ol>
              ) : (
                <div className="mt-7 rounded-2xl bg-cream-100 p-6">
                  <p className="text-ink-600">
                    {t('recipe.noStepsBody')}
                  </p>
                  {r.sourceUrl && (
                    <a href={r.sourceUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium tracking-tight text-terracotta-500 hover:underline">
                      {t('recipe.openFullRecipe')} <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              )}
            </div>

            {r.sourceUrl && (
              <p className="text-sm tracking-tight text-ink-400">
                <ChefHat className="mr-2 inline h-3.5 w-3.5" />
                {t('recipe.originalAt')}{' '}
                <a href={r.sourceUrl} target="_blank" rel="noreferrer" className="link-underline text-ink-600">
                  {r.sourceName || t('recipe.theSource')}
                </a>
              </p>
            )}
          </section>
        </div>
      </div>

      <div className="container-wide">
        <NutritionCard ingredients={displayIngredients ?? []} servings={servings} />
      </div>

      {similar.length > 0 && (
        <section className="mt-24 md:mt-28" data-hide-on-print="true">
          <div className="container-wide">
            <p className="eyebrow mb-3">{t('recipe.youMightAlsoLike')}</p>
            <h2 className="text-display-md">{t('recipe.moreToCook')}</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
              {similar.map((s, i) => (
                <RecipeCard key={s.id} recipe={s} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

function ToolButton({
  onClick,
  icon,
  label,
  disabled,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink-100 bg-cream-50 px-3.5 py-2 text-[12px] font-medium tracking-tight text-ink-900 transition-all hover:border-ink-900 hover:bg-ink-900 hover:text-cream-50 disabled:opacity-50"
    >
      {icon}
      {label}
    </button>
  );
}

function StepRow({
  step,
  index,
  onSpeak,
  voiceState,
  voiceSupported,
  readStepLabel,
}: {
  step: string;
  index: number;
  onSpeak: () => void;
  voiceState: VoiceState;
  voiceSupported: boolean;
  readStepLabel: string;
}) {
  const timers = useMemo<DetectedTimer[]>(() => detectTimers(step), [step]);
  return (
    <li className="grid gap-3 sm:grid-cols-[64px_1fr] sm:gap-7">
      <div className="text-4xl font-light tracking-tighter text-terracotta-500">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div>
        <p className="text-base leading-relaxed tracking-tight text-ink-900 sm:text-lg">{step}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2" data-hide-on-print="true">
          {timers.map((tm, ti) => (
            <TimerChip key={ti} timer={tm} />
          ))}
          {voiceSupported && voiceState === 'idle' && (
            <button
              type="button"
              onClick={onSpeak}
              className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-2.5 py-1 text-[10px] uppercase tracking-widest text-ink-600 transition-colors hover:bg-ink-900 hover:text-cream-50"
            >
              <Volume2 className="h-3 w-3" /> {readStepLabel}
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

function TimerChip({ timer }: { timer: DetectedTimer }) {
  const { seconds, running, start, stop } = useCountdown();
  return (
    <button
      type="button"
      onClick={() => (running ? stop() : start(timer.seconds))}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors ${
        running
          ? 'bg-terracotta-500 text-cream-50'
          : 'bg-cream-100 text-ink-700 hover:bg-ink-900 hover:text-cream-50'
      }`}
    >
      <TimerIcon className="h-3 w-3" />
      {running ? fmtRemaining(seconds) : timer.label}
    </button>
  );
}
