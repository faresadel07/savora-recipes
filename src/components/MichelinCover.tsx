import { ChefHat } from 'lucide-react';
import { MICHELIN_RESTAURANTS, type MichelinRestaurant } from '../data/michelin-restaurants';

// Any image URL that is reused by more than one restaurant is treated as
// an unreliable stock photo and replaced by a typographic cover. Computed
// once at module load.
const _counts = new Map<string, number>();
for (const r of MICHELIN_RESTAURANTS) {
  if (r.image) _counts.set(r.image, (_counts.get(r.image) ?? 0) + 1);
}
export const DUPLICATE_IMAGES: ReadonlySet<string> = new Set(
  Array.from(_counts.entries()).filter(([, n]) => n > 1).map(([url]) => url),
);

export function hasUniqueImage(r: MichelinRestaurant): boolean {
  return !!r.image && !DUPLICATE_IMAGES.has(r.image);
}

type Region = MichelinRestaurant['region'];

const REGION_GRADIENT: Record<Region, string> = {
  asia: 'bg-gradient-to-br from-[#7a1e1e] via-[#3a1010] to-[#170707]',
  europe: 'bg-gradient-to-br from-[#2c2521] via-[#181311] to-[#0b0908]',
  americas: 'bg-gradient-to-br from-[#8a3a1f] via-[#3d1a0e] to-[#180a06]',
  'middle-east': 'bg-gradient-to-br from-[#3d4a1a] via-[#1f2410] to-[#0e0f06]',
  africa: 'bg-gradient-to-br from-[#9c5d1f] via-[#3d2510] to-[#170d06]',
  oceania: 'bg-gradient-to-br from-[#1f4045] via-[#0e2225] to-[#06181c]',
};

const REGION_ACCENT: Record<Region, string> = {
  asia: '#d4a02c',
  europe: '#c89a3a',
  americas: '#e2bc85',
  'middle-east': '#c89a3a',
  africa: '#e2bc85',
  oceania: '#a8b065',
};

interface Props {
  restaurant: MichelinRestaurant;
  isAr: boolean;
  size?: 'card' | 'hero';
}

export default function MichelinCover({ restaurant, isAr, size = 'card' }: Props) {
  if (hasUniqueImage(restaurant)) {
    return (
      <img
        src={restaurant.image}
        alt={isAr ? restaurant.nameAr : restaurant.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = 'none';
        }}
      />
    );
  }

  const name = isAr ? restaurant.nameAr : restaurant.name;
  const cuisine = isAr ? restaurant.cuisineAr : restaurant.cuisine;
  const chef = isAr && restaurant.chefAr ? restaurant.chefAr : restaurant.chef;
  const city = isAr ? restaurant.cityAr : restaurant.city;
  const initial = restaurant.name.trim().charAt(0).toUpperCase();
  const accent = REGION_ACCENT[restaurant.region];
  const gradient = REGION_GRADIENT[restaurant.region];

  const titleClass =
    size === 'hero'
      ? 'text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.02]'
      : 'text-[clamp(1.15rem,2.6vw,1.7rem)] leading-[1.08]';

  const padClass = size === 'hero' ? 'p-8 md:p-10' : 'p-5 md:p-6';

  return (
    <div className={`absolute inset-0 flex flex-col justify-between overflow-hidden ${gradient} ${padClass}`}>
      <div
        className="pointer-events-none absolute -end-16 -top-16 h-56 w-56 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: accent }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_60%)]" aria-hidden />

      <div className="relative flex items-start justify-between">
        <span
          className="grid h-10 w-10 place-items-center rounded-full border text-[13px] font-semibold tracking-tight"
          style={{ borderColor: accent, color: accent }}
        >
          {initial}
        </span>
        <ChefHat className="h-5 w-5" strokeWidth={1.5} style={{ color: accent }} />
      </div>

      <div className="relative">
        <p
          className="mb-2 text-[10px] font-medium uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          {city}
        </p>
        <h3 className={`font-bold tracking-tight text-cream-50 ${titleClass}`}>{name}</h3>
        <p className="mt-3 text-[12px] tracking-tight text-cream-50/70">{cuisine}</p>
        <div className="mt-4 flex items-center gap-2.5">
          <span className="h-px w-8" style={{ backgroundColor: accent }} aria-hidden />
          <p className="text-[12px] font-medium tracking-tight text-cream-50/85">{chef}</p>
        </div>
      </div>
    </div>
  );
}
