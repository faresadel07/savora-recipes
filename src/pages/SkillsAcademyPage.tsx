import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  AlertTriangle,
  Clock,
  GraduationCap,
  Lightbulb,
  Play,
  Search,
  Target,
  X,
} from 'lucide-react';
import {
  COOKING_SKILLS,
  FEATURED_SKILLS,
  LEVEL_META,
  SKILL_CATEGORIES,
  type CookingSkill,
  type SkillCategory,
  type SkillLevel,
} from '../data/skills-academy';

type CategoryFilter = 'all' | SkillCategory;
type LevelFilter = 'all' | SkillLevel;

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

const HERO_STATS = [
  { value: `${COOKING_SKILLS.length}`, label: 'Lessons' },
  { value: `${SKILL_CATEGORIES.length}`, label: 'Categories' },
  { value: `${new Set(COOKING_SKILLS.map((s) => s.channel)).size}`, label: 'Channels' },
  { value: '3', label: 'Levels' },
];

function YoutubeLite({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  if (playing) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
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
          if (t.naturalWidth <= 120 && !t.src.includes('sddefault')) {
            t.src = `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
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

function SkillCard({ skill }: { skill: CookingSkill }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-video bg-ink-900">
        <YoutubeLite videoId={skill.videoId} title={skill.name} />
        <div className="absolute left-3 top-3">
          <LevelPill level={skill.level} />
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
          {skill.name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{skill.description}</p>

        <div className="mt-5 space-y-3 border-t border-ink-100 pt-4 text-sm leading-relaxed text-ink-700">
          <div className="flex items-start gap-2.5">
            <Target className="mt-0.5 h-4 w-4 flex-none text-gold-600" />
            <p>
              <span className="font-semibold text-ink-900">When:</span> {skill.whenToUse}
            </p>
          </div>
          {skill.commonMistake && (
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-terracotta-500" />
              <p>
                <span className="font-semibold text-ink-900">Watch out:</span> {skill.commonMistake}
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function SkillHeroCard({ skill }: { skill: CookingSkill }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl bg-ink-900 text-cream-50 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
      <div className="relative aspect-[16/9] md:aspect-[16/7]">
        <YoutubeLite videoId={skill.videoId} title={skill.name} />
        <div className="absolute left-4 top-4">
          <LevelPill level={skill.level} />
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
                <span className="text-gold-600">{COOKING_SKILLS.length} masterclass lessons.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-ink-600 sm:text-lg">
                A free curriculum of cooking techniques. Each lesson is a short, focused
                video from a credible teacher: Jacques Pépin on omelets, Kenji on
                reverse-sear, Epicurious on knife skills, King Arthur Baking on baguettes,
                Bon Appétit on dry brining. With when to use the technique, and the
                mistake most home cooks make.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#academy"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-500"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  Start the academy
                </a>
                <a
                  href="#cat-knife"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
                >
                  Knife skills first
                </a>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-4 gap-2">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-ink-100 bg-cream-50 p-3 text-center">
                    <p className="text-xl font-bold tracking-tighter text-ink-900 md:text-2xl">{s.value}</p>
                    <p className="mt-1 text-xs tracking-tight text-ink-500">{s.label}</p>
                  </div>
                ))}
              </div>
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
                        if (t.naturalWidth <= 120 && !t.src.includes('sddefault')) {
                          t.src = `https://img.youtube.com/vi/${s.videoId}/sddefault.jpg`;
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
            <SkillHeroCard skill={featured} />
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
                return (
                  <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
                    <div className="mb-6 flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tighter">
                          {cat.name}
                        </h3>
                        <p className="mt-1 text-sm tracking-tight text-ink-500">{cat.tagline}</p>
                      </div>
                      <p className="text-sm tracking-tight text-ink-500">{items.length} lessons</p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((s) => (
                        <SkillCard key={s.id} skill={s} />
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
                <SkillCard key={s.id} skill={s} />
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
            Each of these lessons has been verified to exist and is taught by a credible
            teacher. Watch one a week and the recipes you cook will keep improving without
            you noticing.
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
