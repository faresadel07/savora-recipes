import { Clock, Flame } from 'lucide-react';
import type { FitnessRecipe } from '../data/fitness-recipes';
import { useTranslation } from '../i18n';
import RecipeImage from './RecipeImage';

interface Props {
  recipe: FitnessRecipe;
  onOpen: (r: FitnessRecipe) => void;
  index?: number;
}

export default function FitnessRecipeCard({ recipe, onOpen, index = 0 }: Props) {
  const { language } = useTranslation();
  const isAr = language === 'ar';
  const title = isAr ? recipe.titleAr : recipe.title;
  const blurb = isAr ? recipe.blurbAr : recipe.blurb;

  return (
    <button
      type="button"
      onClick={() => onOpen(recipe)}
      style={{ animationDelay: `${index * 40}ms` }}
      className="group flex flex-col text-start transition-all duration-500 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200">
        <RecipeImage
          src={recipe.image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        {/* Calorie pill */}
        <div className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-semibold tracking-tight text-ink-900 backdrop-blur">
          <Flame className="h-3 w-3 text-terracotta-500" />
          {recipe.calories} {isAr ? 'سعرة' : 'kcal'}
        </div>
        {/* Time pill */}
        <div className="absolute end-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/95 px-2.5 py-1 text-[11px] font-medium tracking-tight text-ink-700 backdrop-blur">
          <Clock className="h-3 w-3" />
          {recipe.minutes} {isAr ? 'د' : 'min'}
        </div>
        {/* Macros at bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <div className="flex justify-between text-[10px] font-semibold uppercase tracking-widest text-cream-50">
            <span>P {recipe.protein}g</span>
            <span>C {recipe.carbs}g</span>
            <span>F {recipe.fat}g</span>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-base font-semibold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-terracotta-500 md:text-lg">
          {title}
        </h3>
        <p className="mt-1 text-[13px] leading-snug text-ink-500">{blurb}</p>
      </div>
    </button>
  );
}
