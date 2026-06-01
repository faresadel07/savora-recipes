import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import {
  ArrowUpRight,
  AlertTriangle,
  Check,
  Clock,
  GraduationCap,
  Lightbulb,
  Play,
  Search,
  Sparkles,
  Target,
  Trophy,
  X,
} from 'lucide-react';
import {
  COOKING_SKILLS,
  FEATURED_SKILLS,
  LEARNING_PATHS,
  LEVEL_META,
  SKILL_CATEGORIES,
  categoryTotalMinutes,
  pathTotalMinutes,
  type CookingSkill,
  type LearningPath,
  type SkillCategory,
  type SkillLevel,
} from '../data/skills-academy';

type CategoryFilter = 'all' | SkillCategory;
type LevelFilter = 'all' | SkillLevel;

const STORAGE_KEY = 'zaytoun:academy:watched';

const CATEGORY_FILTERS: { id: CategoryFilter; name: string }[] = [
  { id: 'all', name: 'All skills' },
  ...SKILL_CATEGORIES.map((c) => ({ id: c.id as CategoryFilter, name: c.name })),
];

const LEVEL_FILTERS: { id: LevelFilter; name: string }[] = [
  { id: 'all', name: 'Any level' },
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' },
];

const TOTAL_MINUTES = COOKING_SKILLS.reduce((sum, s) => {
  if (!s.runtime) return sum;
  const m = parseInt(s.runtime.match(/\d+/)?.[0] ?? '0', 10);
  return sum + (Number.isFinite(m) ? m : 0);
}, 0);

function formatMinutes(min: number): string {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const rem = min - h * 60;
  return rem === 0 ? `${h} hr` : `${h} hr ${rem} min`;
}

function useWatched() {
  const [watched, setWatched] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return new Set<string>(raw ? JSON.parse(raw) : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(watched)));
    } catch {
      /* ignore */
    }
  }, [watched]);

  function toggle(id: string) {
    setWatched((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function reset() {
    setWatched(new Set());
  }

  return { watched, toggle, reset };
}

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
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/55 via-transparent to-ink-900/10" />
      <span className="relative grid h-16 w-16 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-2xl transition-transform group-hover:scale-110 md:h-20 md:w-20">
        <Play className="h-7 w-7 translate-x-0.5 fill-current md:h-8 md:w-8" strokeWidth={1.5} />
      </span>
    </button>
  );
}

function LevelPill({ level }: { level: SkillLevel }) {
  const meta = LEVEL_META[level];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${meta.bg} px-2.5 py-1 text-[11px] font-medium tracking-tight ${meta.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.text.replace('text-', 'bg-')}`} />
      {meta.name}
    </span>
  );
}

function WatchedToggle({
  isWatched,
  onToggle,
  size = 'md',
}: {
  isWatched: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md';
}) {
  const dim = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9';
  const iconDim = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        onToggle();
      }}
      title={isWatched ? 'Mark as not watched' : 'Mark as watched'}
      aria-label={isWatched ? 'Mark as not watched' : 'Mark as watched'}
      className={`grid ${dim} flex-none place-items-center rounded-full border transition-all ${
        isWatched
          ? 'border-sage-500 bg-sage-500 text-cream-50 hover:bg-sage-600'
          : 'border-ink-200 bg-cream-50 text-ink-400 hover:border-ink-900 hover:text-ink-900'
      }`}
    >
      <Check className={iconDim} strokeWidth={2.5} />
    </button>
  );
}

function SkillCard({
  skill,
  isWatched,
  onToggleWatched,
}: {
  skill: CookingSkill;
  isWatched: boolean;
  onToggleWatched: () => void;
}) {
  const { pl, language } = useTranslation();
  const isAr = language === 'ar';
  const name = pl(skill.name, skill.nameAr);
  const description = pl(skill.description, skill.descriptionAr);
  const whenToUse = pl(skill.whenToUse, skill.whenToUseAr);
  const commonMistake = skill.commonMistake ? pl(skill.commonMistake, skill.commonMistakeAr) : undefined;
  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-3xl border bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] ${
        isWatched ? 'border-sage-500/40' : 'border-ink-100 hover:border-ink-900'
      }`}
    >
      <div className="relative aspect-video bg-ink-900">
        <YoutubeLite videoId={skill.videoId} title={name} />
        <div className="absolute left-3 top-3">
          <LevelPill level={skill.level} />
        </div>
        <div className="absolute right-3 top-3">
          <WatchedToggle isWatched={isWatched} onToggle={onToggleWatched} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-tight text-ink-400">
          <span className="font-medium text-ink-700">{skill.channel}</span>
          {skill.runtime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {skill.runtime}
            </span>
          )}
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight md:text-xl">
          {name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{description}</p>

        <div className="mt-5 space-y-3 border-t border-ink-100 pt-4 text-sm leading-relaxed text-ink-700">
          <div className="flex items-start gap-2.5">
            <Target className="mt-0.5 h-4 w-4 flex-none text-gold-600" />
            <p>
              <span className="font-semibold text-ink-900">{isAr ? 'متى:' : 'When:'}</span> {whenToUse}
            </p>
          </div>
          {commonMistake && (
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-terracotta-500" />
              <p>
                <span className="font-semibold text-ink-900">{isAr ? 'احذر:' : 'Watch out:'}</span> {commonMistake}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function PathCard({
  path,
  watched,
  onToggleWatched,
  isOpen,
  onToggleOpen,
}: {
  path: LearningPath;
  watched: Set<string>;
  onToggleWatched: (id: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}) {
  const skills = path.skillIds
    .map((sid) => COOKING_SKILLS.find((s) => s.id === sid))
    .filter((s): s is CookingSkill => Boolean(s));
  const completed = skills.filter((s) => watched.has(s.id)).length;
  const total = skills.length;
  const totalMin = pathTotalMinutes(path);
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stripe =
    path.accent === 'gold' ? 'bg-gold-500'
    : path.accent === 'sage' ? 'bg-sage-500'
    : 'bg-terracotta-500';
  const badgeBg =
    path.accent === 'gold' ? 'bg-gold-500/15 text-gold-700'
    : path.accent === 'sage' ? 'bg-sage-50 text-sage-700'
    : 'bg-terracotta-50 text-terracotta-600';

  return (
    <article className="relative overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className={`absolute inset-x-0 top-0 h-1 ${stripe}`} />
      <div className="p-6 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-tight ${badgeBg}`}>
              <Sparkles className="h-3 w-3" /> Path
            </span>
            <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight md:text-2xl">{path.name}</h3>
            <p className="mt-1 text-sm italic tracking-tight text-ink-500">{path.goal}</p>
          </div>
          {completed === total && total > 0 && (
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-sage-500 text-cream-50" title="Path complete">
              <Trophy className="h-4 w-4" />
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink-600">{path.blurb}</p>

        <div className="mt-5 flex items-center justify-between text-[12px] font-medium tracking-tight text-ink-500">
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" /> {total} lessons
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {formatMinutes(totalMin)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-sage-600" /> {completed} / {total}
          </span>
        </div>

        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
          <div className={`h-full ${stripe} transition-all duration-500`} style={{ width: `${pct}%` }} />
        </div>

        <button
          type="button"
          onClick={onToggleOpen}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink-900 px-5 py-2.5 text-[12px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
        >
          {isOpen ? 'Hide lessons' : 'See the path'}
          <ArrowUpRight className={`rtl-flip h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>

        {isOpen && (
          <ol className="mt-6 space-y-3 border-t border-ink-100 pt-5">
            {skills.map((skill, i) => {
              const skillWatched = watched.has(skill.id);
              return (
                <li
                  key={skill.id}
                  className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${
                    skillWatched ? 'border-sage-500/40 bg-sage-50/30' : 'border-ink-100 bg-cream-50'
                  }`}
                >
                  <span className={`grid h-7 w-7 flex-none place-items-center rounded-full text-[12px] font-semibold ${
                    skillWatched ? 'bg-sage-500 text-cream-50' : 'bg-ink-100 text-ink-700'
                  }`}>
                    {skillWatched ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium tracking-tight text-ink-900">{skill.name}</p>
                    <p className="text-[11px] tracking-tight text-ink-400">
                      {skill.channel}
                      {skill.runtime ? ` · ${skill.runtime}` : ''}
                    </p>
                  </div>
                  <WatchedToggle
                    isWatched={skillWatched}
                    onToggle={() => onToggleWatched(skill.id)}
                    size="sm"
                  />
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </article>
  );
}

function SkillHeroCard({
  skill,
  isWatched,
  onToggleWatched,
}: {
  skill: CookingSkill;
  isWatched: boolean;
  onToggleWatched: () => void;
}) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-ink-900 text-cream-50 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-[16/9] md:aspect-[16/7]">
        <YoutubeLite videoId={skill.videoId} title={skill.name} />
        <div className="absolute left-4 top-4">
          <LevelPill level={skill.level} />
        </div>
        <div className="absolute right-4 top-4">
          <WatchedToggle isWatched={isWatched} onToggle={onToggleWatched} />
        </div>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tracking-tight text-cream-100/70">
          <span className="font-medium text-gold-400">{skill.channel}</span>
          {skill.runtime && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {skill.runtime}
            </span>
          )}
        </div>
        <h3 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-tighter">
          {skill.name}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream-100/80 md:text-base">
          {skill.description}
        </p>
        <div className="mt-5 inline-flex items-start gap-2.5 rounded-2xl border border-cream-50/15 bg-cream-50/5 p-4 text-sm leading-relaxed text-cream-100/85">
          <Lightbulb className="mt-0.5 h-4 w-4 flex-none text-gold-400" />
          <p>{skill.whenToUse}</p>
        </div>
      </div>
    </article>
  );
}

export default function SkillsAcademyPage() {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [level, setLevel] = useState<LevelFilter>('all');
  const [query, setQuery] = useState('');
  const [openPath, setOpenPath] = useState<string | null>(null);
  const { watched, toggle: toggleWatched, reset: resetWatched } = useWatched();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COOKING_SKILLS.filter((s) => {
      if (category !== 'all' && s.category !== category) return false;
      if (level !== 'all' && s.level !== level) return false;
      if (!q) return true;
      const haystack = [s.name, s.channel, s.description, s.whenToUse].join(' ').toLowerCase();
      return haystack.includes(q);
    });
  }, [category, level, query]);

  const showCategoryGroups = category === 'all' && level === 'all' && !query;
  const featured = FEATURED_SKILLS[0];
  const watchedCount = watched.size;
  const totalCount = COOKING_SKILLS.length;
  const progressPct = totalCount === 0 ? 0 : Math.round((watchedCount / totalCount) * 100);

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-cream-50 pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="container-wide relative z-10">
          <div className="grid items-end gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1] tracking-tighter text-ink-900">
                Skills Academy.
                <br />
                <span className="text-gold-600">{COOKING_SKILLS.length} lessons. {LEARNING_PATHS.length} paths. Free.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                A real curriculum, not just a video library. Six curated paths
                walk you from knife basics to mother sauces, each path is a
                weekend project. Jacques Pépin on omelets, Kenji on
                reverse-sear, Epicurious on knife skills, King Arthur on
                baguettes. Your progress saves on this device.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#paths"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Start a path
                </a>
                <a
                  href="#academy"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                >
                  Browse all lessons
                </a>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-4 gap-2">
                <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
                  <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{totalCount}</p>
                  <p className="mt-1 text-xs tracking-tight text-ink-500">Lessons</p>
                </div>
                <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
                  <p className="text-xl font-bold tracking-tighter text-sage-600 md:text-2xl">{watchedCount}/{totalCount}</p>
                  <p className="mt-1 text-xs tracking-tight text-ink-500">Watched</p>
                </div>
                <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
                  <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{LEARNING_PATHS.length}</p>
                  <p className="mt-1 text-xs tracking-tight text-ink-500">Paths</p>
                </div>
                <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
                  <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{Math.round(TOTAL_MINUTES / 60)}</p>
                  <p className="mt-1 text-xs tracking-tight text-ink-500">Hours</p>
                </div>
              </div>

              {watchedCount > 0 && (
                <div className="mt-6 max-w-md">
                  <div className="mb-1.5 flex items-center justify-between text-[11px] tracking-tight text-ink-500">
                    <span>Your progress</span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
                    <div
                      className="h-full bg-sage-500 transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {FEATURED_SKILLS.slice(0, 4).map((s, i) => (
                  <a
                    key={s.id}
                    href="#academy"
                    onClick={() => setCategory(s.category)}
                    className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${s.videoId}/maxresdefault.jpg`}
                      onLoad={(e) => {
                        const t = e.currentTarget;
                        if (t.naturalWidth > 120) return;
                        if (t.src.includes('maxresdefault')) {
                          t.src = `https://img.youtube.com/vi/${s.videoId}/sddefault.jpg`;
                        } else if (t.src.includes('sddefault')) {
                          t.src = `https://img.youtube.com/vi/${s.videoId}/hqdefault.jpg`;
                        }
                      }}
                      onError={(e) => {
                        const t = e.currentTarget;
                        if (t.src.includes('maxresdefault')) {
                          t.src = `https://img.youtube.com/vi/${s.videoId}/sddefault.jpg`;
                        } else if (t.src.includes('sddefault')) {
                          t.src = `https://img.youtube.com/vi/${s.videoId}/hqdefault.jpg`;
                        }
                      }}
                      alt={s.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[9px] font-medium tracking-tight text-gold-400">{s.channel}</p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold tracking-tight text-cream-50">{s.name}</p>
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

      {/* ============ LEARNING PATHS ============ */}
      <section id="paths" className="border-t border-ink-100 py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                Learning paths
              </h2>
              <p className="mt-2 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                Six curated sequences of lessons that build on each other. Each
                path is a single project you can finish in a weekend.
              </p>
            </div>
            {watchedCount > 0 && (
              <button
                type="button"
                onClick={resetWatched}
                className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 px-4 py-2 text-[12px] font-medium tracking-tight text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
                title="Clear all your watched marks on this device"
              >
                <X className="h-3.5 w-3.5" /> Reset progress
              </button>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {LEARNING_PATHS.map((path) => (
              <PathCard
                key={path.id}
                path={path}
                watched={watched}
                onToggleWatched={toggleWatched}
                isOpen={openPath === path.id}
                onToggleOpen={() => setOpenPath(openPath === path.id ? null : path.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURED LESSON ============ */}
      {featured && (
        <section className="border-t border-ink-100 py-12 md:py-16">
          <div className="container-wide">
            <div className="mb-6 flex items-baseline justify-between gap-4">
              <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                Today's lesson
              </h2>
              <p className="text-sm tracking-tight text-ink-500">One technique, mastered well</p>
            </div>
            <SkillHeroCard
              skill={featured}
              isWatched={watched.has(featured.id)}
              onToggleWatched={() => toggleWatched(featured.id)}
            />
          </div>
        </section>
      )}

      {/* ============ ACADEMY GRID ============ */}
      <section id="academy" className="border-t border-ink-100 bg-cream-100/40 py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                The academy
              </h2>
              <p className="mt-2 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                {COOKING_SKILLS.length} lessons across {SKILL_CATEGORIES.length} categories. Filter by topic, by level,
                or search for what you need to learn next.
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search technique, chef, dish"
                className="w-full rounded-full border border-ink-200 bg-cream-50 py-3 pl-11 pr-10 text-sm tracking-tight text-ink-900 placeholder:text-ink-400 focus:border-ink-900 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-900"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((c) => {
              const isActive = category === c.id;
              const count =
                c.id === 'all'
                  ? COOKING_SKILLS.length
                  : COOKING_SKILLS.filter((s) => s.category === c.id).length;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`rounded-full border px-4 py-2 text-[13px] font-medium tracking-tight transition-colors ${
                    isActive
                      ? 'border-ink-900 bg-ink-900 text-cream-50'
                      : 'border-ink-200 bg-cream-50 text-ink-700 hover:border-ink-900'
                  }`}
                >
                  {c.name}
                  <span className={`ml-2 text-[11px] ${isActive ? 'text-cream-100/60' : 'text-ink-400'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {LEVEL_FILTERS.map((l) => {
              const isActive = level === l.id;
              return (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLevel(l.id)}
                  className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-tight transition-colors ${
                    isActive
                      ? 'border-gold-600 bg-gold-500/15 text-gold-700'
                      : 'border-ink-100 bg-cream-50 text-ink-500 hover:border-ink-900 hover:text-ink-900'
                  }`}
                >
                  {l.name}
                </button>
              );
            })}
          </div>

          {showCategoryGroups ? (
            <div className="space-y-16 md:space-y-20">
              {SKILL_CATEGORIES.map((cat) => {
                const items = COOKING_SKILLS.filter((s) => s.category === cat.id);
                if (items.length === 0) return null;
                const catWatched = items.filter((s) => watched.has(s.id)).length;
                const catMin = categoryTotalMinutes(cat.id);
                return (
                  <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                          {cat.name}
                        </h3>
                        <p className="mt-1 text-sm tracking-tight text-ink-500">{cat.tagline}</p>
                      </div>
                      <p className="text-right text-sm tracking-tight text-ink-500">
                        {items.length} lessons · {formatMinutes(catMin)}
                        <br />
                        <span className="text-sage-600">{catWatched}/{items.length} watched</span>
                      </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((s) => (
                        <SkillCard
                          key={s.id}
                          skill={s}
                          isWatched={watched.has(s.id)}
                          onToggleWatched={() => toggleWatched(s.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-ink-100 bg-cream-50 p-12 text-center">
              <p className="text-base text-ink-600">No lessons match those filters.</p>
              <button
                type="button"
                onClick={() => {
                  setCategory('all');
                  setLevel('all');
                  setQuery('');
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-2 text-sm font-medium tracking-tight text-ink-900 hover:border-ink-900"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((s) => (
                <SkillCard
                  key={s.id}
                  skill={s}
                  isWatched={watched.has(s.id)}
                  onToggleWatched={() => toggleWatched(s.id)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="container-wide pb-20 pt-16">
        <div className="overflow-hidden rounded-3xl bg-ink-900 px-7 py-14 text-center text-cream-50 md:px-16 md:py-20">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500/25 text-gold-400">
            <GraduationCap className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <h3 className="mx-auto mt-6 max-w-2xl text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">
            One technique a week. By the end of the year, a different cook.
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-cream-100/70 md:text-base">
            Each of these lessons is taught by a credible chef on a credible channel.
            Mark them watched as you go. Your progress lives on this device, with you.
          </p>
          <Link
            to="/films"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-7 py-3.5 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:bg-gold-400"
          >
            Watch the film library
            <ArrowUpRight className="rtl-flip h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
