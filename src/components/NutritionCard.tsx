import { useMemo } from 'react';
import { Flame, Activity, Drumstick, Wheat, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  calculateRecipeNutrition,
  nutritionConfidence,
} from '../lib/nutrition-calculator';
import { useTranslation } from '../i18n';
import type { Ingredient } from '../types/recipe';

interface Props {
  ingredients: Ingredient[] | string[];
  servings: number;
}

/**
 * Stat row inside the card. Title on the left, value on the right, optional
 * tiny coloured bar at the bottom that fills proportional to the macro split.
 */
function MacroRow({
  icon,
  label,
  value,
  unit,
  barColor,
  barWidth,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit: string;
  barColor: string;
  barWidth: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-cream-100 text-ink-600">
            {icon}
          </span>
          <span className="text-[13px] font-medium tracking-tight text-ink-700">{label}</span>
        </div>
        <div className="text-end">
          <span className="text-lg font-bold tracking-tighter text-ink-900">{value}</span>
          <span className="ms-1 text-[11px] tracking-tight text-ink-400">{unit}</span>
        </div>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-cream-100">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${barWidth}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
}

export default function NutritionCard({ ingredients, servings }: Props) {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const est = useMemo(
    () => calculateRecipeNutrition(ingredients, servings),
    [ingredients, servings],
  );
  const confidence = nutritionConfidence(est);

  // Don't show the card at all if we matched fewer than 25% of the lines.
  // Showing wildly wrong numbers is worse than showing nothing.
  if (confidence < 0.25 || est.calories === 0) {
    return null;
  }

  // Calculate macro split percentages (4 kcal per gram of protein and carbs,
  // 9 per gram of fat). These drive the bar widths so the bars communicate
  // proportion at a glance.
  const proteinCal = est.protein * 4;
  const carbsCal = est.carbs * 4;
  const fatCal = est.fat * 9;
  const macroSum = Math.max(1, proteinCal + carbsCal + fatCal);
  const proteinPct = Math.round((proteinCal / macroSum) * 100);
  const carbsPct = Math.round((carbsCal / macroSum) * 100);
  const fatPct = Math.round((fatCal / macroSum) * 100);

  const labels = isAr
    ? {
        title: 'القيم الغذائية',
        perServing: 'لكل حصّة',
        calories: 'سعرات',
        kcal: 'كيلوكالوري',
        protein: 'بروتين',
        carbs: 'كربوهيدرات',
        fat: 'دهون',
        gram: 'جرام',
        estimated: 'قيم تقديرية بناءً على المكوّنات.',
        macroNote: 'بدّك توصل هدفك اليومي؟',
        track: 'احسب الماكروز',
      }
    : {
        title: 'Nutrition',
        perServing: 'per serving',
        calories: 'Calories',
        kcal: 'kcal',
        protein: 'Protein',
        carbs: 'Carbs',
        fat: 'Fat',
        gram: 'g',
        estimated: 'Estimated from the ingredient list.',
        macroNote: 'Tracking your daily targets?',
        track: 'Macro calculator',
      };

  return (
    <section className="mt-12 md:mt-16" data-hide-on-print="true">
      <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-8">
        <div className="mb-6 flex items-baseline justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta-500">
              {labels.title}
            </p>
            <p className="mt-1 text-sm tracking-tight text-ink-500">{labels.perServing}</p>
          </div>
          <div className="text-end">
            <p className="text-[clamp(2rem,4vw,2.75rem)] font-bold leading-none tracking-tighter text-ink-900">
              {est.calories}
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-ink-400">
              {labels.kcal}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <MacroRow
            icon={<Flame className="h-3.5 w-3.5" strokeWidth={1.8} />}
            label={labels.calories}
            value={est.calories}
            unit={labels.kcal}
            barColor="#B83D2E"
            barWidth={100}
          />
          <MacroRow
            icon={<Drumstick className="h-3.5 w-3.5" strokeWidth={1.8} />}
            label={labels.protein}
            value={est.protein}
            unit={labels.gram}
            barColor="#7A9362"
            barWidth={proteinPct}
          />
          <MacroRow
            icon={<Wheat className="h-3.5 w-3.5" strokeWidth={1.8} />}
            label={labels.carbs}
            value={est.carbs}
            unit={labels.gram}
            barColor="#D6A547"
            barWidth={carbsPct}
          />
          <MacroRow
            icon={<Activity className="h-3.5 w-3.5" strokeWidth={1.8} />}
            label={labels.fat}
            value={est.fat}
            unit={labels.gram}
            barColor="#3A352E"
            barWidth={fatPct}
          />
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-5">
          <p className="text-[11px] tracking-tight text-ink-400">{labels.estimated}</p>
          <Link
            to="/fitness#calculator"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-tight text-terracotta-500 transition-colors hover:text-terracotta-600"
          >
            {labels.track}
            <ArrowUpRight className="rtl-flip h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
