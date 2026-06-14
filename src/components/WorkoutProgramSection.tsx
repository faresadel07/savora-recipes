import { useMemo, useState } from 'react';
import { Calendar, ChevronRight, Clock, Download, Dumbbell, Filter, Layers, RefreshCw, Target, Trophy, X } from 'lucide-react';
import { useTranslation } from '../i18n';
import {
  GOAL_LABEL_AR,
  GOAL_LABEL_EN,
  LEVEL_LABEL_AR,
  LEVEL_LABEL_EN,
  SPLIT_LABEL_AR,
  SPLIT_LABEL_EN,
  WORKOUT_PROGRAMS,
  type ProgramLevel,
  type ProgramGoal,
  type WorkoutProgram,
} from '../data/workout-programs';
import { exportWorkoutProgramPDF } from '../lib/workout-pdf';

type LevelFilter = 'all' | ProgramLevel;
type GoalFilter = 'all' | ProgramGoal;

const SHELF: { id: 'main' | 'specialization'; labelEn: string; labelAr: string }[] = [
  { id: 'main', labelEn: 'Main programs', labelAr: 'البرامج الرئيسية' },
  { id: 'specialization', labelEn: 'Specialization', labelAr: 'برامج تخصصية' },
];

export default function WorkoutProgramSection() {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const [shelf, setShelf] = useState<'main' | 'specialization'>('main');
  const [level, setLevel] = useState<LevelFilter>('all');
  const [goal, setGoal] = useState<GoalFilter>('all');
  const [open, setOpen] = useState<WorkoutProgram | null>(null);

  const programs = useMemo(() => {
    return WORKOUT_PROGRAMS.filter((p) => {
      if (shelf === 'specialization' && p.split !== 'specialization') return false;
      if (shelf === 'main' && p.split === 'specialization') return false;
      if (level !== 'all' && p.level !== level) return false;
      if (goal !== 'all' && p.goal !== goal) return false;
      return true;
    });
  }, [shelf, level, goal]);

  return (
    <section id="programs" className="container-wide mt-16 md:mt-24">
      <div className="mb-8">
        <p className="eyebrow mb-3 inline-flex items-center gap-2">
          <Layers className="h-3 w-3" strokeWidth={2} />
          {isAr ? 'برامج جاهزة' : 'Ready to print programs'}
        </p>
        <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-tighter">
          {isAr ? '13 برنامج جيم احترافي بتنزيل PDF.' : '13 professional gym programs with PDF download.'}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-500 md:text-base">
          {isAr
            ? 'مأخوذة من Jeff Nippard وWendler و r/Fitness و Greg Nuckols و Bret Contreras وغيرهم. كل برنامج بكامل المجموعات والتكرارات والراحة والـ RPE وقابل للتنزيل PDF.'
            : 'Sourced from Jeff Nippard, Jim Wendler, r/Fitness, Greg Nuckols, Bret Contreras, and others. Each program has full sets, reps, rest, and RPE prescription, downloadable as PDF.'}
        </p>
      </div>

      {/* Shelf tabs */}
      <div className="mb-5 inline-flex gap-2 rounded-full bg-cream-100 p-1">
        {SHELF.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setShelf(s.id)}
            className={`rounded-full px-5 py-2 text-sm font-medium tracking-tight transition-colors ${
              shelf === s.id ? 'bg-ink-900 text-cream-50' : 'text-ink-700 hover:text-ink-900'
            }`}
          >
            {isAr ? s.labelAr : s.labelEn}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-ink-500">
          <Filter className="h-3 w-3" strokeWidth={2} />
          {isAr ? 'فلتر:' : 'Filter:'}
        </span>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as LevelFilter)}
          className="rounded-full border border-ink-100 bg-cream-50 px-3 py-1.5 text-sm focus:border-ink-900 focus:outline-none"
        >
          <option value="all">{isAr ? 'كل المستويات' : 'All levels'}</option>
          {(['beginner', 'intermediate', 'advanced'] as ProgramLevel[]).map((l) => (
            <option key={l} value={l}>{isAr ? LEVEL_LABEL_AR[l] : LEVEL_LABEL_EN[l]}</option>
          ))}
        </select>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value as GoalFilter)}
          className="rounded-full border border-ink-100 bg-cream-50 px-3 py-1.5 text-sm focus:border-ink-900 focus:outline-none"
        >
          <option value="all">{isAr ? 'كل الأهداف' : 'All goals'}</option>
          {(['strength', 'hypertrophy', 'both'] as ProgramGoal[]).map((g) => (
            <option key={g} value={g}>{isAr ? GOAL_LABEL_AR[g] : GOAL_LABEL_EN[g]}</option>
          ))}
        </select>
        <span className="ms-auto text-xs text-ink-500">
          {isAr ? `${programs.length} برنامج` : `${programs.length} programs`}
        </span>
      </div>

      {/* Program cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {programs.map((p) => (
          <ProgramCard key={p.id} program={p} isAr={isAr} onOpen={() => setOpen(p)} />
        ))}
      </div>

      {open && <ProgramDetailModal program={open} isAr={isAr} onClose={() => setOpen(null)} />}
    </section>
  );
}

// ============================================================
// Card
// ============================================================

function ProgramCard({ program, isAr, onOpen }: { program: WorkoutProgram; isAr: boolean; onOpen: () => void }) {
  const totalExercises = program.days.reduce((sum, d) => sum + d.exercises.length, 0);
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col items-start gap-4 rounded-3xl border border-ink-100 bg-cream-50 p-6 text-start transition-all hover:border-ink-300 hover:shadow-lg"
    >
      <div className="flex w-full items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-terracotta-500">
            {isAr ? SPLIT_LABEL_AR[program.split] : SPLIT_LABEL_EN[program.split]}
          </p>
          <h3 className="mt-1.5 text-lg font-semibold leading-snug tracking-tighter text-ink-900 group-hover:text-terracotta-500">
            {isAr ? program.nameAr : program.name}
          </h3>
          <p className="mt-1 text-xs tracking-tight text-ink-500">
            {isAr ? 'من ' : 'by '}
            <span className="font-medium text-ink-700">{program.author}</span>
          </p>
        </div>
        <ChevronRight className="h-5 w-5 flex-shrink-0 text-ink-300 transition-transform group-hover:translate-x-1 group-hover:text-ink-900 rtl:rotate-180" strokeWidth={2} />
      </div>

      <p className="line-clamp-3 text-sm leading-relaxed text-ink-700">
        {isAr ? program.blurbAr : program.blurb}
      </p>

      <div className="mt-auto flex flex-wrap gap-2">
        <Chip icon={<Trophy className="h-3 w-3" />} label={isAr ? LEVEL_LABEL_AR[program.level] : LEVEL_LABEL_EN[program.level]} />
        <Chip icon={<Target className="h-3 w-3" />} label={isAr ? GOAL_LABEL_AR[program.goal] : GOAL_LABEL_EN[program.goal]} />
        <Chip icon={<Calendar className="h-3 w-3" />} label={isAr ? `${program.daysPerWeek} أيام/أسبوع` : `${program.daysPerWeek} days/week`} />
        <Chip icon={<Dumbbell className="h-3 w-3" />} label={isAr ? `${totalExercises} تمرين` : `${totalExercises} exercises`} />
      </div>
    </button>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-medium text-ink-700">
      {icon}
      {label}
    </span>
  );
}

// ============================================================
// Detail modal
// ============================================================

function ProgramDetailModal({ program, isAr, onClose }: { program: WorkoutProgram; isAr: boolean; onClose: () => void }) {
  const [pdfBusy, setPdfBusy] = useState<'en' | 'ar' | null>(null);

  async function downloadPdf(lang: 'en' | 'ar') {
    setPdfBusy(lang);
    try {
      await exportWorkoutProgramPDF(program, lang);
    } catch (e) {
      console.error('PDF failed', e);
    } finally {
      setPdfBusy(null);
    }
  }

  return (
    <div role="dialog" aria-modal="true" onClick={onClose} className="fixed inset-0 z-50 grid place-items-center bg-ink-900/90 p-4 backdrop-blur-md">
      <div onClick={(e) => e.stopPropagation()} className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-cream-50">
        <button type="button" onClick={onClose} className="absolute end-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream-50/95 text-ink-900 shadow-md hover:bg-cream-100" aria-label="Close">
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <header className="bg-ink-900 p-7 text-cream-50 md:p-10">
          <p className="text-[11px] font-medium uppercase tracking-widest text-gold-400">
            {isAr ? SPLIT_LABEL_AR[program.split] : SPLIT_LABEL_EN[program.split]}
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tighter md:text-4xl">
            {isAr ? program.nameAr : program.name}
          </h2>
          <p className="mt-2 text-sm text-cream-100/70">
            {isAr ? 'من ' : 'by '}
            <a href={program.authorUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-cream-50 underline">
              {program.author}
            </a>
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <DarkChip label={isAr ? LEVEL_LABEL_AR[program.level] : LEVEL_LABEL_EN[program.level]} />
            <DarkChip label={isAr ? GOAL_LABEL_AR[program.goal] : GOAL_LABEL_EN[program.goal]} />
            <DarkChip label={isAr ? `${program.daysPerWeek} أيام/أسبوع` : `${program.daysPerWeek} days/week`} />
            <DarkChip label={isAr ? `${program.weeks} أسابيع` : `${program.weeks} weeks`} />
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream-100/80">
            {isAr ? program.blurbAr : program.blurb}
          </p>

          {/* PDF buttons */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => downloadPdf('en')}
              disabled={pdfBusy !== null}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-terracotta-600 disabled:opacity-60"
            >
              {pdfBusy === 'en' ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
              PDF · EN
            </button>
            <button
              type="button"
              onClick={() => downloadPdf('ar')}
              disabled={pdfBusy !== null}
              className="inline-flex items-center gap-2 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-medium text-cream-50 transition-colors hover:bg-terracotta-600 disabled:opacity-60"
            >
              {pdfBusy === 'ar' ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
              PDF · AR
            </button>
          </div>
        </header>

        {/* Progression rule */}
        <section className="border-b border-ink-100 bg-cream-100/40 p-7 md:p-10">
          <p className="text-[11px] font-medium uppercase tracking-widest text-terracotta-500">
            {isAr ? 'قاعدة التقدم' : 'Progression rule'}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-700 md:text-base">
            {isAr ? program.progressionAr : program.progression}
          </p>
        </section>

        {/* Days */}
        <section className="p-7 md:p-10">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-widest text-ink-500">
            {isAr ? `${program.days.length} يوم تدريب` : `${program.days.length} training days`}
          </p>
          <div className="space-y-6">
            {program.days.map((day, di) => (
              <article key={di} className="overflow-hidden rounded-2xl border border-ink-100">
                <header className="flex items-center justify-between gap-3 bg-cream-100 px-5 py-3">
                  <h3 className="text-sm font-semibold tracking-tight text-ink-900">
                    {isAr ? day.nameAr : day.name}
                  </h3>
                  <span className="text-xs text-ink-500">
                    {isAr ? `${day.exercises.length} تمرين` : `${day.exercises.length} exercises`}
                  </span>
                </header>
                <table className="w-full table-fixed text-sm">
                  <thead className="bg-cream-50 text-[11px] uppercase tracking-widest text-ink-400">
                    <tr>
                      <th className="px-4 py-2 text-start" style={{ width: '40%' }}>{isAr ? 'التمرين' : 'Exercise'}</th>
                      <th className="px-2 py-2 text-center">{isAr ? 'مج x تك' : 'Sets x Reps'}</th>
                      <th className="px-2 py-2 text-center">RPE</th>
                      <th className="px-2 py-2 text-center">{isAr ? 'راحة' : 'Rest'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.exercises.map((e, ei) => (
                      <tr key={ei} className="border-t border-ink-100">
                        <td className="px-4 py-3">
                          <p className="font-medium text-ink-900">{isAr ? e.nameAr : e.name}</p>
                          {(e.notes || e.notesAr) && (
                            <p className="mt-0.5 text-[11px] text-ink-500">
                              {isAr ? (e.notesAr ?? e.notes) : e.notes}
                            </p>
                          )}
                        </td>
                        <td className="px-2 py-3 text-center text-ink-700">{e.sets} x {e.reps}</td>
                        <td className="px-2 py-3 text-center text-ink-700">{e.rpe}</td>
                        <td className="px-2 py-3 text-center text-ink-700">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" strokeWidth={2} />
                            {isAr ? e.restAr : e.rest}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function DarkChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-cream-50/10 px-3 py-1 text-xs font-medium text-cream-50 backdrop-blur">
      {label}
    </span>
  );
}
