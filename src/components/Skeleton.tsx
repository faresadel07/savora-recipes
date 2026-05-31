interface Props {
  className?: string;
  variant?: 'card' | 'line' | 'block';
}

export default function Skeleton({ className = '', variant = 'block' }: Props) {
  if (variant === 'card') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="aspect-[4/5] rounded-2xl bg-cream-200" />
        <div className="mt-5 space-y-3">
          <div className="h-3 w-24 rounded-full bg-cream-200" />
          <div className="h-6 w-5/6 rounded-lg bg-cream-200" />
          <div className="h-6 w-3/4 rounded-lg bg-cream-200" />
        </div>
      </div>
    );
  }

  if (variant === 'line') {
    return <div className={`h-4 animate-pulse rounded-full bg-cream-200 ${className}`} />;
  }

  return <div className={`animate-pulse rounded-2xl bg-cream-200 ${className}`} />;
}

export function RecipeGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} variant="card" />
      ))}
    </div>
  );
}
