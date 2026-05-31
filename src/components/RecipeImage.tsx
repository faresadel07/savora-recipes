import { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface Props {
  src?: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

/**
 * Image with shimmer placeholder, fade-in, and tasteful fallback.
 */
export default function RecipeImage({ src, alt, className = '', eager = false }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-cream-200 to-cream-300 text-ink-400 ${className}`}
        role="img"
        aria-label={alt}
      >
        <UtensilsCrossed className="h-10 w-10 opacity-50" strokeWidth={1.4} />
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          aria-hidden
          className={`${className} bg-gradient-to-br from-cream-200 to-cream-100`}
          style={{
            backgroundImage:
              'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.5) 50%, transparent 80%), linear-gradient(to bottom right, #EDE6D3, #F6F2E9)',
            backgroundSize: '300% 100%, 100% 100%',
            animation: 'shimmer 1.6s linear infinite',
            position: 'absolute',
            inset: 0,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
      />
    </>
  );
}
