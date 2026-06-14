import { ExternalLink, GraduationCap } from 'lucide-react';
import { useTranslation } from '../i18n';
import { FITNESS_COACHES, FOCUS_LABEL_AR, FOCUS_LABEL_EN } from '../data/fitness-coaches';

function initials(name: string): string {
  return name.split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
}

const GRADIENTS = [
  ['from-terracotta-500', 'to-gold-500'],
  ['from-sage-500', 'to-ink-700'],
  ['from-ink-700', 'to-ink-900'],
  ['from-gold-500', 'to-terracotta-500'],
  ['from-terracotta-400', 'to-terracotta-700'],
  ['from-sage-400', 'to-sage-600'],
] as const;

export default function FitnessCoachesSection() {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  return (
    <section id="coaches" className="container-wide mt-16 md:mt-24">
      <div className="mb-8">
        <p className="eyebrow mb-3 inline-flex items-center gap-2">
          <GraduationCap className="h-3 w-3" strokeWidth={2} />
          {isAr ? 'مدربون علميون' : 'Science coaches'}
        </p>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
          {isAr ? '6 أساتذة بالـ Iron Game.' : 'Six masters of the iron game.'}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
          {isAr
            ? 'مدربون منشورون بأبحاث علمية. كل واحد يفتح نوافذ لمحتوى مجاني عميق على يوتيوب ومدوّناتهم. ابن خبرتك من هنا.'
            : 'Coaches with peer-reviewed credentials. Each one opens a door to deep free content on YouTube and their blogs. Build your knowledge here.'}
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {FITNESS_COACHES.map((c, i) => {
          const [from, to] = GRADIENTS[i % GRADIENTS.length];
          return (
            <a
              key={c.id}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-4 overflow-hidden rounded-3xl border border-ink-100 bg-cream-50 p-6 transition-all hover:border-ink-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className={`grid h-16 w-16 flex-shrink-0 place-items-center rounded-full bg-gradient-to-br ${from} ${to} font-display text-lg font-semibold tracking-tight text-cream-50 shadow-sm`}>
                  {initials(c.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-terracotta-500">
                    {isAr ? FOCUS_LABEL_AR[c.focus] : FOCUS_LABEL_EN[c.focus]}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tighter text-ink-900 group-hover:text-terracotta-500">
                    {isAr ? c.nameAr : c.name}
                  </h3>
                  <p className="text-xs tracking-tight text-ink-500">{c.handle}</p>
                </div>
                <ExternalLink className="h-4 w-4 flex-shrink-0 text-ink-300 transition-colors group-hover:text-ink-900" strokeWidth={2} />
              </div>

              <p className="line-clamp-4 text-sm leading-relaxed text-ink-700">
                {isAr ? c.blurbAr : c.blurb}
              </p>

              <p className="border-t border-ink-100 pt-3 text-[11px] font-medium text-ink-500">
                {isAr ? c.credentialsAr : c.credentials}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
