import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import {
  Activity,
  ChefHat,
  ChevronDown,
  Droplets,
  Dumbbell,
  Film,
  GlassWater,
  GraduationCap,
  Heart,
  HeartHandshake,
  Home,
  Info,
  MapPin,
  Zap,
  Menu,
  Moon,
  Newspaper,
  Search,
  Shuffle,
  Star,
  Sun,
  Tv,
  Utensils,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useTheme } from '../hooks/useTheme';
import { useSurpriseRecipe } from '../hooks/useSurpriseRecipe';
import { useTranslation } from '../i18n';
import SmartSearchInput from './SmartSearchInput';

interface NavItem {
  to: string;
  key: string;
  icon: LucideIcon;
}

// Every route the user can reach via the chrome.
const NAV_ITEMS: NavItem[] = [
  { to: '/', key: 'nav.home', icon: Home },
  { to: '/recipes', key: 'nav.recipes', icon: Utensils },
  { to: '/arab-cuisine', key: 'nav.arabCuisine', icon: Star },
  { to: '/drinks', key: 'nav.drinks', icon: GlassWater },
  { to: '/sauces', key: 'nav.sauces', icon: Droplets },
  { to: '/shorts', key: 'nav.shorts', icon: Zap },
  { to: '/films', key: 'nav.films', icon: Film },
  { to: '/academy', key: 'nav.academy', icon: GraduationCap },
  { to: '/chefs', key: 'nav.chefs', icon: ChefHat },
  { to: '/markets', key: 'nav.markets', icon: MapPin },
  { to: '/videos', key: 'nav.videos', icon: Tv },
  { to: '/magazines', key: 'nav.magazines', icon: Newspaper },
  { to: '/fitness', key: 'nav.fitness', icon: Activity },
  { to: '/workouts', key: 'nav.workouts', icon: Dumbbell },
];

// Items always visible in the top bar (the core editorial pillars).
const CORE_NAV_KEYS = new Set([
  'nav.home', 'nav.recipes', 'nav.arabCuisine', 'nav.drinks', 'nav.sauces', 'nav.fitness',
]);
const CORE_NAV = NAV_ITEMS.filter((n) => CORE_NAV_KEYS.has(n.key));
const MORE_NAV = NAV_ITEMS.filter((n) => !CORE_NAV_KEYS.has(n.key));

// Mobile menu groups the nav items into editorial sections so the drawer
// reads like a table of contents instead of one long list.
const MOBILE_GROUPS: { titleKey: string; itemKeys: string[] }[] = [
  { titleKey: 'nav.browse', itemKeys: ['nav.home', 'nav.recipes'] },
  {
    titleKey: 'nav.training',
    itemKeys: ['nav.fitness', 'nav.workouts'],
  },
  {
    titleKey: 'nav.curated',
    itemKeys: ['nav.arabCuisine', 'nav.drinks', 'nav.sauces', 'nav.shorts', 'nav.films', 'nav.academy', 'nav.chefs', 'nav.markets'],
  },
  {
    titleKey: 'nav.more',
    itemKeys: ['nav.videos', 'nav.magazines'],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const { favorites } = useFavorites();
  const { theme, toggle: toggleTheme } = useTheme();
  const { surprise, loading: surpriseLoading } = useSurpriseRecipe();
  const { t, language, toggle: toggleLanguage } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-3 z-40 px-3 md:top-4 md:px-6">
      <div
        className={`mx-auto max-w-[1480px] overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 transition-shadow duration-300 ${
          scrolled
            ? 'shadow-[0_12px_36px_-12px_rgba(0,0,0,0.18)]'
            : 'shadow-[0_4px_16px_-6px_rgba(0,0,0,0.08)]'
        }`}
      >
      <div className="flex h-14 items-center justify-between gap-2 px-4 md:h-16 md:px-5 xl:px-6">
        <Link to="/" className="flex flex-none items-center gap-2 group" aria-label="Zaytoun home">
          <img src="/zaytoun-logo.jpg" alt="" width={28} height={28} className="h-6 w-6 rounded-full object-cover md:h-7 md:w-7" />
          <span className="text-lg font-semibold tracking-tighter md:text-xl">Zaytoun</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-0.5 xl:gap-1 lg:flex">
          {CORE_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight transition-all xl:px-4 ${
                  isActive
                    ? 'bg-ink-100 text-ink-900 dark:bg-cream-50/10 dark:text-cream-50'
                    : 'text-ink-500 hover:bg-ink-100/60 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-cream-50/5 dark:hover:text-cream-50'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
          <MoreNav items={MORE_NAV} />
        </nav>

        <div className="flex flex-none items-center gap-0.5 sm:gap-1">
          <Link
            to="/donate"
            className="hidden items-center gap-1.5 rounded-full bg-terracotta-500/10 px-3.5 py-1.5 text-[12px] font-medium tracking-tight text-terracotta-600 transition-colors hover:bg-terracotta-500 hover:text-cream-50 md:inline-flex"
            aria-label={t('nav.supportZaytoun')}
          >
            <HeartHandshake className="h-3.5 w-3.5" strokeWidth={2} />
            {t('nav.donate')}
          </Link>
          <button
            type="button"
            onClick={toggleLanguage}
            className="rounded-full p-2 text-ink-900 transition-colors hover:bg-ink-900/5 dark:text-cream-50 dark:hover:bg-cream-50/10"
            aria-label={language === 'ar' ? 'English' : 'العربية'}
            title={language === 'ar' ? 'English' : 'العربية'}
          >
            <span className="block text-[12px] font-semibold tracking-tight">
              {language === 'ar' ? 'EN' : 'ع'}
            </span>
          </button>
          <button
            type="button"
            onClick={() => surprise()}
            disabled={surpriseLoading}
            className="rounded-full p-2 text-ink-900 transition-all hover:bg-ink-900/5 disabled:cursor-wait dark:text-cream-50 dark:hover:bg-cream-50/10"
            aria-label={t('common.surpriseMe')}
            title={t('common.surpriseMe')}
          >
            <Shuffle className={`h-4 w-4 ${surpriseLoading ? 'animate-spin' : ''}`} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full p-2 text-ink-900 transition-colors hover:bg-ink-900/5 dark:text-cream-50 dark:hover:bg-cream-50/10"
            aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
            title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" strokeWidth={1.8} /> : <Moon className="h-4 w-4" strokeWidth={1.8} />}
          </button>
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2 text-ink-900 transition-colors hover:bg-ink-900/5 dark:text-cream-50 dark:hover:bg-cream-50/10"
            aria-label="Search recipes"
          >
            <Search className="h-4 w-4" strokeWidth={1.8} />
          </button>
          <Link
            to="/favorites"
            className="relative rounded-full p-2 text-ink-900 transition-colors hover:bg-ink-900/5 dark:text-cream-50 dark:hover:bg-cream-50/10"
            aria-label={`${t('nav.favorites')} (${favorites.length})`}
          >
            <Heart className="h-4 w-4" strokeWidth={1.8} />
            {favorites.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-terracotta-500 px-1 text-[10px] font-semibold text-cream-50">
                {favorites.length > 99 ? '99+' : favorites.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-2 text-ink-900 transition-colors hover:bg-ink-900/5 dark:text-cream-50 dark:hover:bg-cream-50/10 lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-4 w-4" strokeWidth={1.8} />
          </button>
        </div>
      </div>

        <div
          className={`transition-[max-height,opacity] duration-300 ${
            searchOpen ? 'max-h-32 border-t border-ink-100/60 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-3.5 md:px-6">
            <SmartSearchInput
              value={q}
              onChange={setQ}
              placeholder={t('common.searchRecipes')}
              autoFocus={searchOpen}
              variant="header"
              onClose={() => {
                setSearchOpen(false);
                setQ('');
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-ink-900/30 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream-50 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Sticky header inside the drawer */}
          <div className="flex flex-none items-center justify-between border-b border-ink-100 px-6 py-4">
            <Link to="/" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2.5">
              <img src="/zaytoun-logo.jpg" alt="" width={28} height={28} className="h-7 w-7 rounded-full object-cover" />
              <span className="text-xl font-semibold tracking-tighter text-ink-900">Zaytoun</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/5"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" strokeWidth={1.8} />
            </button>
          </div>

          {/* Sticky search inside the drawer */}
          <div className="flex flex-none items-center gap-2 border-b border-ink-100 px-6 py-3">
            <SmartSearchInput
              value={q}
              onChange={setQ}
              placeholder={t('common.searchRecipes')}
              onClose={() => {
                setMobileOpen(false);
                setQ('');
              }}
            />
          </div>

          {/* Scrollable nav body — compact grid so every feature is
              visible at once on a typical phone, with a soft scroll
              hint at the bottom if the screen is shorter than the
              grid. */}
          <nav className="relative flex-1 overflow-y-auto px-4 py-4">
            {MOBILE_GROUPS.map((group, gi) => (
              <div key={group.titleKey} className={gi === 0 ? '' : 'mt-4'}>
                <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                  {t(group.titleKey)}
                </p>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {group.itemKeys.map((key) => {
                    const item = NAV_ITEMS.find((n) => n.key === key);
                    if (!item) return null;
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === '/'}
                        onClick={() => setMobileOpen(false)}
                        className={({ isActive }) =>
                          `flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-all ${
                            isActive
                              ? 'border-ink-900 bg-ink-900 text-cream-50 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)]'
                              : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-300 hover:bg-cream-100'
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              className={`h-5 w-5 ${isActive ? 'text-gold-400' : 'text-terracotta-500'}`}
                              strokeWidth={1.8}
                            />
                            <span className="text-[11px] font-medium leading-tight tracking-tight">
                              {t(item.key)}
                            </span>
                          </>
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Personal: favorites + about + contact in one compact row */}
            <div className="mt-4">
              <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
                {t('nav.personal')}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <NavLink
                  to="/favorites"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `relative flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-all ${
                      isActive
                        ? 'border-ink-900 bg-ink-900 text-cream-50 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)]'
                        : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-300 hover:bg-cream-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Heart
                        className={`h-5 w-5 ${isActive ? 'text-gold-400' : 'text-terracotta-500'}`}
                        strokeWidth={1.8}
                      />
                      <span className="text-[11px] font-medium leading-tight tracking-tight">
                        {t('nav.favorites')}
                      </span>
                      {favorites.length > 0 && (
                        <span
                          className={`absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold ${
                            isActive ? 'bg-cream-50 text-ink-900' : 'bg-terracotta-500 text-cream-50'
                          }`}
                        >
                          {favorites.length > 99 ? '99+' : favorites.length}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
                <NavLink
                  to="/about"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 py-3 text-center transition-all ${
                      isActive
                        ? 'border-ink-900 bg-ink-900 text-cream-50 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)]'
                        : 'border-ink-100 bg-cream-50 text-ink-700 hover:border-ink-300 hover:bg-cream-100'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Info
                        className={`h-5 w-5 ${isActive ? 'text-gold-400' : 'text-sage-600'}`}
                        strokeWidth={1.8}
                      />
                      <span className="text-[11px] font-medium leading-tight tracking-tight">
                        {t('nav.about')}
                      </span>
                    </>
                  )}
                </NavLink>
              </div>
            </div>
          </nav>

          {/* Fixed bottom controls — kept compact so the grid above
              has room to breathe on shorter phones. */}
          <div className="flex-none border-t border-ink-100 bg-cream-50 px-4 pb-4 pt-3">
            <NavLink
              to="/donate"
              onClick={() => setMobileOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-terracotta-500 py-2.5 text-[13px] font-medium tracking-tight text-cream-50 transition-colors hover:bg-terracotta-600"
            >
              <HeartHandshake className="h-4 w-4" />
              {t('nav.supportZaytoun')}
            </NavLink>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  surprise();
                }}
                disabled={surpriseLoading}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink-200 bg-cream-50 py-2 text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900 disabled:opacity-50"
              >
                <Shuffle className={`h-3.5 w-3.5 ${surpriseLoading ? 'animate-spin' : ''}`} />
                {t('common.surpriseMe')}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink-200 bg-cream-50 py-2 text-[12px] font-medium tracking-tight text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
              >
                {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {theme === 'dark' ? t('nav.light') : t('nav.dark')}
              </button>
              {/* Mobile language toggle hidden until recipe-content translation lands. */}
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}

// ============================================================
// MoreNav: dropdown that surfaces secondary nav items on desktop
// so the top bar stays clean and readable on iPad-sized screens.
// ============================================================

function MoreNav({ items }: { items: NavItem[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; right: number; left: number } | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  function recalcCoords() {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const isRtl = document.documentElement.dir === 'rtl';
    setCoords({
      top: rect.bottom + 8,
      right: window.innerWidth - rect.right,
      left: isRtl ? rect.left : rect.left, // fallback when caller prefers left anchor
    });
  }

  // Re-compute on open, on scroll, on resize so the dropdown stays glued
  // to the trigger even with sticky headers and orientation changes.
  useEffect(() => {
    if (!open) return;
    recalcCoords();
    window.addEventListener('scroll', recalcCoords, true);
    window.addEventListener('resize', recalcCoords);
    return () => {
      window.removeEventListener('scroll', recalcCoords, true);
      window.removeEventListener('resize', recalcCoords);
    };
  }, [open]);

  // Close on click outside or on Escape.
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      const target = e.target as Node;
      if (btnRef.current?.contains(target)) return;
      if (menuRef.current?.contains(target)) return;
      setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const here = window.location.pathname;
  const isActive = items.some((it) => it.to === here);
  const isRtl = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';

  const dropdown = open && coords ? (
    <div
      ref={menuRef}
      role="menu"
      style={{
        position: 'fixed',
        top: coords.top,
        ...(isRtl ? { left: coords.left } : { right: coords.right }),
        zIndex: 100,
      }}
      className="w-64 overflow-hidden rounded-2xl border border-ink-100 bg-cream-50 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.25)] dark:border-cream-50/10 dark:bg-ink-800"
    >
      <ul className="grid grid-cols-1 py-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive: navActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium tracking-tight transition-colors ${
                    navActive
                      ? 'bg-ink-100 text-ink-900 dark:bg-cream-50/10 dark:text-cream-50'
                      : 'text-ink-700 hover:bg-ink-100/60 hover:text-ink-900 dark:text-ink-200 dark:hover:bg-cream-50/5 dark:hover:text-cream-50'
                  }`
                }
              >
                <Icon className="h-4 w-4 text-ink-300" strokeWidth={1.8} />
                {t(item.key)}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight transition-all xl:px-4 ${
          isActive || open
            ? 'bg-ink-100 text-ink-900 dark:bg-cream-50/10 dark:text-cream-50'
            : 'text-ink-500 hover:bg-ink-100/60 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-cream-50/5 dark:hover:text-cream-50'
        }`}
      >
        {t('nav.more')}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} strokeWidth={2.5} />
      </button>
      {dropdown && createPortal(dropdown, document.body)}
    </>
  );
}
