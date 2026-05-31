import { useState } from 'react';
import { ArrowUpRight, BookOpen, ExternalLink, Globe2, Newspaper, ShieldCheck, Sparkles } from 'lucide-react';
import { ARCHIVE_MAGAZINES, MODERN_SITES } from '../data/magazines';
import { useTranslation } from '../i18n';
import { ARCHIVE_AR, MODERN_SITE_AR } from '../i18n/data-translations';
import ArchiveReader from '../components/ArchiveReader';
import RecipeImage from '../components/RecipeImage';

type FilterEra = 'all' | 'Victorian' | 'Edwardian' | 'Progressive';
type FilterCategory =
  | 'all'
  | 'general'
  | 'baking'
  | 'global'
  | 'healthy'
  | 'science'
  | 'community';

const HERO_COVERS = ARCHIVE_MAGAZINES.slice(0, 4);

export default function MagazinesPage() {
  const { t } = useTranslation();
  const [era, setEra] = useState<FilterEra>('all');
  const [siteCat, setSiteCat] = useState<FilterCategory>('all');

  const archiveFiltered = era === 'all' ? ARCHIVE_MAGAZINES : ARCHIVE_MAGAZINES.filter((m) => m.era === era);
  const sitesFiltered = siteCat === 'all' ? MODERN_SITES : MODERN_SITES.filter((m) => m.category === siteCat);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-cream-100 py-12 md:py-20">
        <div className="container-wide relative z-10">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-4 inline-flex items-center gap-2">
                <Newspaper className="h-3 w-3" /> {t('magazines.eyebrow')}
              </p>
              <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-tighter">
                {t('magazines.title1')}
                <br />
                <span className="text-terracotta-500">{t('magazines.title2')}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-[17px]">
                {t('magazines.body')}
              </p>

              <div className="mt-6 grid max-w-md grid-cols-3 gap-3">
                <Stat top={String(ARCHIVE_MAGAZINES.length)} bottom={t('magazines.statArchive')} />
                <Stat top={String(MODERN_SITES.length)} bottom={t('magazines.statModern')} />
                <Stat top="100%" bottom={t('magazines.statFreeRead')} />
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-ink-200 bg-cream-50 px-4 py-2 text-[12px] tracking-tight text-ink-600">
                <ShieldCheck className="h-3.5 w-3.5 text-sage-600" />
                {t('magazines.legalityBadge')}
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {HERO_COVERS.map((m, i) => (
                  <a
                    key={m.id}
                    href={m.detailUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <RecipeImage
                      src={m.coverUrl}
                      alt={m.title}
                      eager
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/15 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[10px] uppercase tracking-widest text-cream-100/75">
                        {m.year}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-tight tracking-tight text-cream-50">
                        {m.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-terracotta-500/8 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-gold-500/8 blur-3xl" />
      </section>

      {/* ARCHIVE */}
      <section className="container-wide py-16 md:py-24">
        <div className="mb-10 grid items-end gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <p className="eyebrow mb-3 inline-flex items-center gap-2">
              <BookOpen className="h-3 w-3" /> {t('magazines.archiveEyebrow')}
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
              {t('magazines.archiveTitle1')}
              <span className="text-terracotta-500"> {t('magazines.archiveTitle2')}</span>
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">
              {t('magazines.archiveBody')}
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="flex flex-wrap gap-2">
              {(['all', 'Victorian', 'Edwardian', 'Progressive'] as FilterEra[]).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEra(e)}
                  className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-tight transition-colors ${
                    era === e
                      ? 'border-ink-900 bg-ink-900 text-cream-50'
                      : 'border-ink-200 bg-cream-50 text-ink-600 hover:border-ink-900'
                  }`}
                >
                  {e === 'all' ? t('magazines.allEras') : e}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {archiveFiltered.map((m, i) => (
            <MagazineCard key={m.id} magazine={m} index={i} />
          ))}
        </div>
      </section>

      {/* MODERN SITES */}
      <section className="border-t border-ink-100 bg-cream-100/50 py-16 md:py-24">
        <div className="container-wide">
          <div className="mb-10 grid items-end gap-6 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p className="eyebrow mb-3 inline-flex items-center gap-2">
                <Globe2 className="h-3 w-3" /> {t('magazines.modernEyebrow')}
              </p>
              <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
                {t('magazines.modernTitle1')}
                <span className="text-terracotta-500"> {t('magazines.modernTitle2')}</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">
                {t('magazines.modernBody')}
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="flex flex-wrap gap-2">
                {(['all', 'general', 'baking', 'science', 'healthy', 'global', 'community'] as FilterCategory[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSiteCat(c)}
                    className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium tracking-tight capitalize transition-colors ${
                      siteCat === c
                        ? 'border-ink-900 bg-ink-900 text-cream-50'
                        : 'border-ink-200 bg-cream-50 text-ink-600 hover:border-ink-900'
                    }`}
                  >
                    {c === 'all' ? t('magazines.all') : c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sitesFiltered.map((s, i) => (
              <SiteCard key={s.id} site={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING NOTE */}
      <section className="container-wide py-16">
        <div className="rounded-3xl bg-cream-100 p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="md:col-span-2 text-center md:text-left">
              <div className="inline-grid h-14 w-14 place-items-center rounded-full bg-sage-100 text-sage-600">
                <Sparkles className="h-6 w-6" strokeWidth={1.5} />
              </div>
            </div>
            <div className="md:col-span-10 text-center md:text-left">
              <p className="eyebrow mb-2">{t('magazines.aboutEyebrow')}</p>
              <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {t('magazines.aboutTitle')}
              </h3>
              <p className="mx-auto mt-3 max-w-prose-wide text-sm leading-relaxed text-ink-600 sm:text-base">
                {t('magazines.aboutBody')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ top, bottom }: { top: string; bottom: string }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-cream-50 p-3.5 text-center">
      <p className="text-2xl font-bold tracking-tighter text-ink-900 md:text-3xl">{top}</p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-ink-400">{bottom}</p>
    </div>
  );
}

function MagazineCard({ magazine: m, index }: { magazine: typeof ARCHIVE_MAGAZINES[number]; index: number }) {
  const { language } = useTranslation();
  const ar = ARCHIVE_AR[m.id];
  const title = language === 'ar' && ar?.title ? ar.title : m.title;
  const issue = language === 'ar' && ar?.issue ? ar.issue : m.issue;
  const blurb = language === 'ar' && ar?.blurb ? ar.blurb : m.blurb;
  const era = language === 'ar' && ar?.eraLabel ? ar.eraLabel : m.era;

  const accentBg =
    m.accent === 'terracotta' ? 'bg-terracotta-50 text-terracotta-600'
    : m.accent === 'sage' ? 'bg-sage-50 text-sage-600'
    : m.accent === 'gold' ? 'bg-cream-200 text-gold-600'
    : 'bg-ink-50 text-ink-600';

  return (
    <article
      className="group flex flex-col gap-5 rounded-3xl border border-ink-100 bg-cream-50 p-6 transition-all duration-500 hover:border-ink-900 md:flex-row md:p-7"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <a
        href={m.detailUrl}
        target="_blank"
        rel="noreferrer"
        className="relative block aspect-[3/4] w-full flex-none overflow-hidden rounded-2xl bg-cream-200 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-1 md:w-44"
      >
        <RecipeImage
          src={m.coverUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </a>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest ${accentBg}`}>
            {era}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-ink-400">{m.year}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight md:text-2xl">
          {title}
        </h3>
        <p className="mt-1 text-[12px] tracking-tight text-ink-400">{issue}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-600">{blurb}</p>
        <ArchiveReader embedUrl={m.embedUrl} detailUrl={m.detailUrl} title={title} />
      </div>
    </article>
  );
}

function SiteCard({ site: s, index }: { site: typeof MODERN_SITES[number]; index: number }) {
  const { language } = useTranslation();
  const ar = MODERN_SITE_AR[s.id];
  const blurb = language === 'ar' && ar?.blurb ? ar.blurb : s.blurb;
  const region = language === 'ar' && ar?.region ? ar.region : s.region;
  const free = language === 'ar' && ar?.free ? ar.free : s.free;

  const accentBg =
    s.accent === 'terracotta' ? 'bg-terracotta-50 text-terracotta-600'
    : s.accent === 'sage' ? 'bg-sage-50 text-sage-600'
    : s.accent === 'gold' ? 'bg-cream-200 text-gold-600'
    : 'bg-ink-50 text-ink-600';

  return (
    <a
      href={s.url}
      target="_blank"
      rel="noreferrer"
      className="group relative flex flex-col gap-4 rounded-2xl border border-ink-100 bg-cream-50 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)]"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={`inline-flex h-10 w-10 items-center justify-center rounded-full ${accentBg}`}>
          <Newspaper className="h-4 w-4" strokeWidth={1.8} />
        </div>
        <ArrowUpRight className="h-4 w-4 text-ink-400 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-900" />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-ink-400">{region}</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-terracotta-500 md:text-xl">
          {s.name}
        </h3>
      </div>

      <p className="mt-auto text-sm leading-relaxed text-ink-600">{blurb}</p>

      <div className="flex items-center justify-between border-t border-ink-100 pt-3">
        <span className="text-[10px] uppercase tracking-widest text-ink-400">{free}</span>
        <span className="inline-flex items-center gap-1 text-[11px] font-medium tracking-tight text-ink-700">
          Visit site
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </a>
  );
}
