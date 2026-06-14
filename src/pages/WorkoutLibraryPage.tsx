import { useEffect, useMemo, useState } from 'react';
import { Activity, Dumbbell, Filter, RefreshCw, Search, Sparkles, X } from 'lucide-react';
import { useTranslation } from '../i18n';
import {
  CATEGORY_LABEL_AR,
  DEFAULT_FILTERS,
  EQUIPMENT_LABEL_AR,
  FORCE_LABEL_AR,
  LEVEL_LABEL_AR,
  MUSCLE_LABEL_AR,
  computeCounts,
  exerciseImageUrl,
  filterExercises,
  loadExercises,
  type Exercise,
  type ExerciseFilters,
} from '../lib/workout-exercises';

const PAGE_SIZE = 24;

export default function WorkoutLibraryPage() {
  const { language } = useTranslation();
  const isAr = language === 'ar';

  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ExerciseFilters>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [openExercise, setOpenExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    loadExercises()
      .then(setExercises)
      .catch((e) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  const counts = useMemo(() => (exercises ? computeCounts(exercises) : null), [exercises]);
  const filtered = useMemo(
    () => (exercises ? filterExercises(exercises, filters) : []),
    [exercises, filters],
  );
  const visible = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);

  function reset() {
    setFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-ink-900 text-cream-50">
        <div className="container-wide py-16 md:py-24">
          <p className="eyebrow mb-5 inline-flex items-center gap-2 text-gold-400">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            {isAr ? 'مكتبة التمارين' : 'Workout library'}
          </p>
          <h1 className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tighter">
            {isAr ? '٨٧٣ تمرين، مع صور وتعليمات.' : '873 exercises, with images and instructions.'}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream-100/70 md:text-lg">
            {isAr
              ? 'مفتوحة المصدر بالكامل. مرتّبة بالعضلة، المعدّات، ومستوى الصعوبة. مجانية للأبد، بدون تسجيل، بدون إعلانات.'
              : 'Fully open source from yuhonas/free-exercise-db. Sorted by muscle, equipment, and difficulty. Free forever, no sign in, no ads.'}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {[
              { value: '873',  label: isAr ? 'تمرين'        : 'Exercises' },
              { value: '17',   label: isAr ? 'مجموعة عضلية' : 'Muscle groups' },
              { value: '12',   label: isAr ? 'معدّات'       : 'Equipment types' },
              { value: '100%', label: isAr ? 'مجاني'        : 'Free' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-cream-50/15 bg-cream-50/5 p-4 backdrop-blur-sm">
                <p className="text-3xl font-semibold tracking-tighter md:text-4xl">{s.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-cream-100/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FILTERS + GRID ============ */}
      <section className="container-wide py-16 md:py-20">
        {!exercises && !error && (
          <div className="grid place-items-center py-24">
            <div className="text-center">
              <RefreshCw className="mx-auto h-6 w-6 animate-spin text-ink-300" strokeWidth={1.8} />
              <p className="mt-3 text-sm text-ink-500">{isAr ? 'جاري تحميل التمارين...' : 'Loading exercises...'}</p>
            </div>
          </div>
        )}
        {error && (
          <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
            <p className="text-base text-ink-600">{isAr ? 'فشل تحميل التمارين.' : 'Failed to load exercises.'}</p>
            <p className="mt-2 text-xs text-ink-400">{error}</p>
          </div>
        )}

        {exercises && counts && (
          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* ===== Filters sidebar ===== */}
            <aside className="rounded-3xl border border-ink-100 bg-cream-50 p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink-900">
                <Filter className="h-4 w-4" strokeWidth={2} />
                {isAr ? 'الفلاتر' : 'Filters'}
              </div>

              {/* Search */}
              <div className="relative mb-5">
                <Search className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                <input
                  type="search"
                  value={filters.query}
                  onChange={(e) => {
                    setFilters((f) => ({ ...f, query: e.target.value }));
                    setPage(1);
                  }}
                  placeholder={isAr ? 'ابحث عن تمرين' : 'Search exercise'}
                  className="w-full rounded-xl border border-ink-100 bg-cream-50 py-2.5 ps-10 pe-3 text-sm tracking-tight text-ink-900 placeholder:text-ink-300 focus:border-ink-900 focus:outline-none"
                />
              </div>

              {/* Muscle group */}
              <FilterSelect
                label={isAr ? 'المجموعة العضلية' : 'Muscle group'}
                value={filters.muscle}
                onChange={(v) => {
                  setFilters((f) => ({ ...f, muscle: v as ExerciseFilters['muscle'] }));
                  setPage(1);
                }}
                options={[
                  { v: 'any', label: isAr ? 'الكل' : 'Any' },
                  ...Object.entries(counts.muscles)
                    .sort((a, b) => b[1] - a[1])
                    .map(([m, n]) => ({
                      v: m,
                      label: `${isAr ? MUSCLE_LABEL_AR[m] ?? m : capitalize(m)} (${n})`,
                    })),
                ]}
              />

              {/* Equipment */}
              <FilterSelect
                label={isAr ? 'المعدّات' : 'Equipment'}
                value={filters.equipment ?? 'any'}
                onChange={(v) => {
                  setFilters((f) => ({ ...f, equipment: v === 'any' ? 'any' : (v as ExerciseFilters['equipment']) }));
                  setPage(1);
                }}
                options={[
                  { v: 'any', label: isAr ? 'الكل' : 'Any' },
                  ...Object.entries(counts.equipment)
                    .sort((a, b) => b[1] - a[1])
                    .map(([eq, n]) => ({
                      v: eq,
                      label: `${isAr ? EQUIPMENT_LABEL_AR[eq] ?? eq : capitalize(eq)} (${n})`,
                    })),
                ]}
              />

              {/* Level */}
              <FilterSelect
                label={isAr ? 'الصعوبة' : 'Level'}
                value={filters.level}
                onChange={(v) => {
                  setFilters((f) => ({ ...f, level: v as ExerciseFilters['level'] }));
                  setPage(1);
                }}
                options={[
                  { v: 'any',           label: isAr ? 'الكل'    : 'Any' },
                  { v: 'beginner',      label: isAr ? LEVEL_LABEL_AR.beginner    : 'Beginner' },
                  { v: 'intermediate',  label: isAr ? LEVEL_LABEL_AR.intermediate : 'Intermediate' },
                  { v: 'expert',        label: isAr ? LEVEL_LABEL_AR.expert       : 'Expert' },
                ]}
              />

              <button
                type="button"
                onClick={reset}
                className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-ink-100 bg-cream-50 px-4 py-2 text-xs font-medium text-ink-700 hover:border-ink-300"
              >
                <X className="h-3 w-3" strokeWidth={2} />
                {isAr ? 'إعادة الضبط' : 'Reset filters'}
              </button>
            </aside>

            {/* ===== Results grid ===== */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-ink-700">
                  {isAr ? `${filtered.length} تمرين` : `${filtered.length} exercises`}
                </p>
              </div>

              {filtered.length === 0 ? (
                <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
                  <Activity className="mx-auto h-8 w-8 text-ink-300" strokeWidth={1.5} />
                  <p className="mt-3 text-base text-ink-600">
                    {isAr ? 'لا تمارين تطابق الفلاتر.' : 'No exercises match these filters.'}
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium text-ink-900 hover:border-ink-900"
                  >
                    {isAr ? 'إعادة الضبط' : 'Reset filters'}
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {visible.map((ex) => (
                      <ExerciseCard key={ex.id} ex={ex} isAr={isAr} onOpen={() => setOpenExercise(ex)} />
                    ))}
                  </div>

                  {visible.length < filtered.length && (
                    <div className="mt-8 grid place-items-center">
                      <button
                        type="button"
                        onClick={() => setPage((p) => p + 1)}
                        className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-medium text-cream-50 hover:bg-terracotta-500"
                      >
                        {isAr ? 'حمّل المزيد' : 'Load more'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {/* ============ DETAIL MODAL ============ */}
      {openExercise && (
        <ExerciseDetailModal ex={openExercise} isAr={isAr} onClose={() => setOpenExercise(null)} />
      )}
    </div>
  );
}

// ============================================================

function FilterSelect({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; label: string }[];
}) {
  return (
    <div className="mb-5">
      <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-ink-500">{label}</p>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink-100 bg-cream-50 px-3 py-2.5 text-sm tracking-tight text-ink-900 focus:border-ink-900 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.v} value={opt.v}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function ExerciseCard({ ex, isAr, onOpen }: { ex: Exercise; isAr: boolean; onOpen: () => void }) {
  const primaryMuscle = ex.primaryMuscles[0] ?? '';
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 text-start transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ink-100">
        {ex.images[0] ? (
          <img
            src={exerciseImageUrl(ex.images[0])}
            alt={ex.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-ink-300">
            <Dumbbell className="h-10 w-10" strokeWidth={1.5} />
          </div>
        )}
        <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-ink-900 backdrop-blur">
          {isAr ? LEVEL_LABEL_AR[ex.level] : ex.level}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-[10px] font-medium uppercase tracking-widest text-terracotta-500">
          {isAr ? MUSCLE_LABEL_AR[primaryMuscle] ?? primaryMuscle : capitalize(primaryMuscle)}
        </p>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-ink-900 group-hover:text-terracotta-500">
          {ex.name}
        </h3>
        <p className="text-xs text-ink-500">
          {isAr ? EQUIPMENT_LABEL_AR[ex.equipment ?? ''] ?? ex.equipment : capitalize(ex.equipment ?? '')}
          {ex.force ? ` · ${isAr ? FORCE_LABEL_AR[ex.force] ?? ex.force : capitalize(ex.force)}` : ''}
        </p>
      </div>
    </button>
  );
}

function ExerciseDetailModal({ ex, isAr, onClose }: { ex: Exercise; isAr: boolean; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const primary = ex.primaryMuscles[0] ?? '';
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/90 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden overflow-y-auto rounded-3xl bg-cream-50"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream-50/90 text-ink-900 hover:bg-cream-50"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {ex.images.length > 0 && (
          <div className="grid grid-cols-2 gap-2 bg-ink-100">
            {ex.images.slice(0, 2).map((img, i) => (
              <img key={i} src={exerciseImageUrl(img)} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
            ))}
          </div>
        )}

        <div className="p-6 md:p-8">
          <p className="text-[11px] font-medium uppercase tracking-widest text-terracotta-500">
            {isAr ? MUSCLE_LABEL_AR[primary] ?? primary : capitalize(primary)}
            {ex.category ? ` · ${isAr ? CATEGORY_LABEL_AR[ex.category] ?? ex.category : capitalize(ex.category)}` : ''}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tighter text-ink-900 md:text-3xl">{ex.name}</h2>

          <div className="mt-5 flex flex-wrap gap-2">
            <Chip label={isAr ? LEVEL_LABEL_AR[ex.level] : ex.level} />
            {ex.equipment && <Chip label={isAr ? EQUIPMENT_LABEL_AR[ex.equipment] ?? ex.equipment : capitalize(ex.equipment)} />}
            {ex.force && <Chip label={isAr ? FORCE_LABEL_AR[ex.force] ?? ex.force : capitalize(ex.force)} />}
            {ex.mechanic && <Chip label={capitalize(ex.mechanic)} />}
          </div>

          {ex.secondaryMuscles.length > 0 && (
            <div className="mt-6">
              <p className="text-[11px] font-medium uppercase tracking-widest text-ink-500">
                {isAr ? 'العضلات الثانوية' : 'Secondary muscles'}
              </p>
              <p className="mt-1 text-sm text-ink-700">
                {ex.secondaryMuscles.map((m) => (isAr ? MUSCLE_LABEL_AR[m] ?? m : capitalize(m))).join(', ')}
              </p>
            </div>
          )}

          <div className="mt-6">
            <p className="text-[11px] font-medium uppercase tracking-widest text-ink-500">
              {isAr ? 'التعليمات' : 'Instructions'}
            </p>
            <ol className="mt-3 space-y-3">
              {ex.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                  <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-terracotta-500 text-[11px] font-semibold text-cream-50">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-ink-100 px-3 py-1 text-xs font-medium text-ink-700">
      {label}
    </span>
  );
}

function capitalize(s: string): string {
  if (!s) return '';
  return s[0].toUpperCase() + s.slice(1);
}
