import { Link } from 'react-router-dom';
import { Clock, Heart, Users } from 'lucide-react';
import type { RecipeSummary } from '../types/recipe';
import { useFavorites } from '../hooks/useFavorites';
import { minutesToText } from '../lib/format';
import RecipeImage from './RecipeImage';

interface Props {
  recipe: RecipeSummary;
  variant?: 'default' | 'large' | 'horizontal' | 'compact';
  index?: number;
  eager?: boolean;
}

export default function RecipeCard({ recipe, variant = 'default', index = 0, eager = false }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(recipe.id);
  const meta = recipe.area || recipe.category;

  if (variant === 'horizontal') {
    return (
      <article className="group grid grid-cols-[112px_1fr] gap-4 sm:grid-cols-[160px_1fr] sm:gap-5" style={{ animationDelay: `${index * 40}ms` }}>
        <Link to={`/recipe/${recipe.id}`} className="relative aspect-square overflow-hidden rounded-xl bg-cream-200">
          <RecipeImage src={recipe.image} alt={recipe.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </Link>
        <div className="flex flex-col justify-center">
          <Link to={`/recipe/${recipe.id}`}>
            <h3 className="text-base font-semibold leading-snug tracking-tight transition-colors group-hover:text-terracotta-500 sm:text-lg">
              {recipe.title}
            </h3>
          </Link>
          {meta && (
            <p className="mt-1 text-[11px] uppercase tracking-widest text-ink-400">{meta}</p>
          )}
        </div>
      </article>
    );
  }

  const isLarge = variant === 'large';
  const isCompact = variant === 'compact';

  return (
    <article className="group relative flex flex-col animate-fade-up" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
      <Link
        to={`/recipe/${recipe.id}`}
        className={`relative block overflow-hidden rounded-2xl bg-cream-200 ${
          isLarge ? 'aspect-[4/5]' : isCompact ? 'aspect-square' : 'aspect-[4/5]'
        }`}
      >
        <RecipeImage
          src={recipe.image}
          alt={recipe.title}
          eager={eager}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </Link>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(recipe);
        }}
        aria-label={fav ? 'Remove from favorites' : 'Save to favorites'}
        className={`absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full backdrop-blur-md transition-all duration-300 ${
          fav ? 'bg-terracotta-500 text-cream-50 scale-100' : 'bg-cream-50/85 text-ink-900 hover:bg-cream-50 hover:scale-110'
        }`}
      >
        <Heart className="h-3.5 w-3.5" fill={fav ? 'currentColor' : 'none'} strokeWidth={1.8} />
      </button>

      <div className={`mt-4 ${isCompact ? 'space-y-1' : ''}`}>
        <div className="mb-2 flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-ink-400">
          {meta && <span>{meta}</span>}
          {meta && recipe.readyInMinutes != null && (
            <span className="h-0.5 w-0.5 rounded-full bg-ink-400/50" />
          )}
          {recipe.readyInMinutes != null && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" strokeWidth={1.5} />
              {minutesToText(recipe.readyInMinutes)}
            </span>
          )}
          {recipe.servings != null && (
            <>
              <span className="h-0.5 w-0.5 rounded-full bg-ink-400/50" />
              <span className="inline-flex items-center gap-1.5">
                <Users className="h-3 w-3" strokeWidth={1.5} />
                {recipe.servings}
              </span>
            </>
          )}
        </div>
        <Link to={`/recipe/${recipe.id}`}>
          <h3
            className={`font-semibold leading-snug tracking-tight text-ink-900 transition-colors group-hover:text-terracotta-500 ${
              isLarge ? 'text-xl md:text-2xl' : isCompact ? 'text-sm md:text-base' : 'text-base md:text-lg'
            }`}
          >
            {recipe.title}
          </h3>
        </Link>
      </div>
    </article>
  );
}
