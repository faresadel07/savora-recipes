import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Heart, HeartHandshake, Menu, Moon, Search, Shuffle, Sun, X } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { useTheme } from '../hooks/useTheme';
import { useSurpriseRecipe } from '../hooks/useSurpriseRecipe';
import { useTranslation } from '../i18n';

const NAV_ITEMS: { to: string; key: string }[] = [
  { to: '/', key: 'nav.home' },
  { to: '/recipes', key: 'nav.recipes' },
  { to: '/videos', key: 'nav.videos' },
  { to: '/library', key: 'nav.library' },
  { to: '/magazines', key: 'nav.magazines' },
  { to: '/fitness', key: 'nav.fitness' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { theme, toggle: toggleTheme } = useTheme();
  const { surprise, loading: surpriseLoading } = useSurpriseRecipe();
  const { t } = useTranslation();

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

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/recipes?q=${encodeURIComponent(q.trim())}`);
    setSearchOpen(false);
    setMobileOpen(false);
    setQ('');
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-wide flex h-14 items-center justify-between gap-4 md:h-16">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Zaytoun home">
          <img src="/favicon.svg" alt="" width={22} height={22} className="h-5 w-5 md:h-[22px] md:w-[22px]" />
          <span className="text-lg font-semibold tracking-tighter md:text-xl">Zaytoun</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `text-[13px] font-medium tracking-tight transition-colors ${
                  isActive
                    ? 'text-ink-900 dark:text-cream-50'
                    : 'text-ink-400 hover:text-ink-900 dark:text-ink-300 dark:hover:text-cream-50'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <Link
            to="/donate"
            className="hidden items-center gap-1.5 rounded-full bg-terracotta-500/10 px-3.5 py-1.5 text-[12px] font-medium tracking-tight text-terracotta-600 transition-colors hover:bg-terracotta-500 hover:text-cream-50 md:inline-flex"
            aria-label={t('nav.supportSavora')}
          >
            <HeartHandshake className="h-3.5 w-3.5" strokeWidth={2} />
            {t('nav.donate')}
          </Link>
          {/* Language toggle temporarily hidden — recipe content still
              needs Arabic translation before this can be reopened. The
              i18n machinery + Arabic strings stay in place so we can
              just un-comment when ready. */}
          {/*
          <button
            type="button"
            onClick={toggleLanguage}
            className="hidden rounded-full p-2 text-ink-900 transition-colors hover:bg-ink-900/5 dark:text-cream-50 dark:hover:bg-cream-50/10 sm:block"
            aria-label={language === 'ar' ? t('common.english') : t('common.arabic')}
            title={language === 'ar' ? t('common.english') : t('common.arabic')}
          >
            <span className="block text-[11px] font-semibold tracking-tight">
              {language === 'ar' ? 'EN' : 'ع'}
            </span>
          </button>
          */}
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
        className={`overflow-hidden border-t border-ink-100/60 transition-[max-height,opacity] duration-300 ${
          searchOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-wide py-3.5">
          <form onSubmit={submitSearch} className="flex items-center gap-3">
            <Search className="h-4 w-4 text-ink-400" strokeWidth={1.8} />
            <input
              autoFocus={searchOpen}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('common.searchRecipes')}
              className="flex-1 bg-transparent text-base tracking-tight placeholder:text-ink-400 focus:outline-none md:text-lg"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="rounded-full p-1.5 text-ink-400 hover:text-ink-900"
              aria-label="Close search"
            >
              <X className="h-4 w-4" />
            </button>
          </form>
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
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-cream-50 px-7 py-5 shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-xl font-semibold tracking-tighter">
              <img src="/favicon.svg" alt="" width={20} height={20} />
              Zaytoun
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-full p-2 hover:bg-ink-900/5"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={submitSearch} className="mt-7 flex items-center gap-2 border-b border-ink-900 pb-2">
            <Search className="h-4 w-4 text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('common.searchRecipes')}
              className="flex-1 bg-transparent py-1 placeholder:text-ink-400 focus:outline-none"
            />
          </form>

          <nav className="mt-8 flex flex-col gap-0">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `border-b border-ink-100/70 py-3.5 text-xl font-semibold tracking-tight transition-colors ${
                    isActive ? 'text-terracotta-500' : 'text-ink-900'
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ))}
            <NavLink
              to="/favorites"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between border-b border-ink-100/70 py-3.5 text-xl font-semibold tracking-tight"
            >
              <span>{t('nav.favorites')}</span>
              {favorites.length > 0 && (
                <span className="rounded-full bg-terracotta-500 px-2 py-0.5 text-xs font-medium text-cream-50">
                  {favorites.length}
                </span>
              )}
            </NavLink>
            <NavLink
              to="/donate"
              onClick={() => setMobileOpen(false)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-terracotta-500 py-3.5 text-sm font-medium tracking-tight text-cream-50"
            >
              <HeartHandshake className="h-4 w-4" />
              {t('nav.supportSavora')}
            </NavLink>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  surprise();
                }}
                disabled={surpriseLoading}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 py-3 text-sm font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900 disabled:opacity-50"
              >
                <Shuffle className={`h-4 w-4 ${surpriseLoading ? 'animate-spin' : ''}`} />
                {t('common.surpriseMe')}
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 py-3 text-sm font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === 'dark' ? t('nav.light') : t('nav.dark')}
              </button>
              {/* Mobile language toggle hidden until recipe-content translation lands.
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-ink-200 py-3 text-[12px] font-medium tracking-tight text-ink-900 transition-colors hover:border-ink-900"
              >
                <Globe className="h-3.5 w-3.5" />
                {language === 'ar' ? 'English' : 'العربية'}
              </button> */}
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
}
