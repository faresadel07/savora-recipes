import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cookie, Heart, Mail, Send } from 'lucide-react';
import { useTranslation } from '../i18n';

interface NavItem {
  to: string;
  labelKey: string;
}

// Recipe-focused entry points. The user is here to cook or to flip pages.
const DISCOVER_LINKS: NavItem[] = [
  { to: '/recipes', labelKey: 'footer.allRecipes' },
  { to: '/videos', labelKey: 'footer.videoLibrary' },
  { to: '/magazines', labelKey: 'footer.magazineRack' },
  { to: '/favorites', labelKey: 'footer.yourFavorites' },
];

// Curated sections we have built: cinematic, editorial libraries.
const CURATED_LINKS: NavItem[] = [
  { to: '/arab-cuisine', labelKey: 'footer.arabCuisine' },
  { to: '/arab-cuisine#palestine', labelKey: 'footer.palestinianKitchen' },
  { to: '/films', labelKey: 'footer.filmLibrary' },
  { to: '/academy', labelKey: 'footer.skillsAcademy' },
  { to: '/markets', labelKey: 'footer.worldMarkets' },
  { to: '/chefs', labelKey: 'footer.chefHall' },
  { to: '/drinks', labelKey: 'footer.drinksLibrary' },
];

const FITNESS_LINKS: NavItem[] = [
  { to: '/fitness', labelKey: 'footer.fitnessHome' },
  { to: '/fitness#calculator', labelKey: 'footer.macroCalculator' },
  { to: '/fitness#plans', labelKey: 'footer.goalPlans' },
  { to: '/fitness#workout', labelKey: 'footer.workoutMeals' },
  { to: '/fitness#mealprep', labelKey: 'footer.mealPrep' },
  { to: '/fitness#drinks', labelKey: 'footer.proteinDrinks' },
  { to: '/fitness#protein', labelKey: 'footer.protein101' },
];

const CATEGORIES: { to: string; key: string }[] = [
  { to: '/category/breakfast', key: 'breakfast' },
  { to: '/category/chicken', key: 'chicken' },
  { to: '/category/pasta', key: 'pasta' },
  { to: '/category/seafood', key: 'seafood' },
  { to: '/category/vegetarian', key: 'vegetarian' },
  { to: '/category/dessert', key: 'dessert' },
];

const CATEGORY_LABELS_EN: Record<string, string> = {
  breakfast: 'Breakfast',
  chicken: 'Chicken',
  pasta: 'Pasta',
  seafood: 'Seafood',
  vegetarian: 'Vegetarian',
  dessert: 'Desserts',
};

const CATEGORY_LABELS_AR: Record<string, string> = {
  breakfast: 'الفطور',
  chicken: 'الدجاج',
  pasta: 'الباستا',
  seafood: 'المأكولات البحرية',
  vegetarian: 'النباتي',
  dessert: 'الحلويات',
};

const CUISINES_EN = [
  { to: '/recipes?area=Italian', label: 'Italian' },
  { to: '/recipes?area=French', label: 'French' },
  { to: '/recipes?area=Japanese', label: 'Japanese' },
  { to: '/recipes?area=Mexican', label: 'Mexican' },
  { to: '/recipes?area=Indian', label: 'Indian' },
  { to: '/recipes?area=Moroccan', label: 'Moroccan' },
  { to: '/recipes?area=Greek', label: 'Greek' },
  { to: '/recipes?area=Turkish', label: 'Turkish' },
];

const CUISINES_AR = [
  { to: '/recipes?area=Italian', label: 'الإيطالي' },
  { to: '/recipes?area=French', label: 'الفرنسي' },
  { to: '/recipes?area=Japanese', label: 'الياباني' },
  { to: '/recipes?area=Mexican', label: 'المكسيكي' },
  { to: '/recipes?area=Indian', label: 'الهندي' },
  { to: '/recipes?area=Moroccan', label: 'المغربي' },
  { to: '/recipes?area=Greek', label: 'اليوناني' },
  { to: '/recipes?area=Turkish', label: 'التركي' },
];

const SUPPORT_LINKS: NavItem[] = [
  { to: '/donate', labelKey: 'footer.donate' },
  { to: '/donate', labelKey: 'footer.about' },
  { to: 'mailto:miggajigga6767@gmail.com', labelKey: 'footer.contact' },
];

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  if (to.startsWith('mailto:') || to.startsWith('http')) {
    return (
      <a href={to} className="link-underline text-cream-50/90 transition-colors hover:text-cream-50">
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className="link-underline text-cream-50/90 transition-colors hover:text-cream-50">
      {children}
    </Link>
  );
}

export default function Footer() {
  const { t, language } = useTranslation();
  const categoryLabels = language === 'ar' ? CATEGORY_LABELS_AR : CATEGORY_LABELS_EN;
  const cuisineItems = language === 'ar' ? CUISINES_AR : CUISINES_EN;

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [cookieReset, setCookieReset] = useState(false);

  function submitNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    try {
      localStorage.setItem('zaytoun:newsletter:email', email.trim());
    } catch { /* ignore */ }
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 6000);
  }

  function resetCookieConsent() {
    try {
      localStorage.removeItem('zaytoun:cookies:accepted');
    } catch { /* ignore */ }
    setCookieReset(true);
    setTimeout(() => {
      window.location.reload();
    }, 700);
  }

  return (
    <footer className="mt-24 bg-ink-900 text-cream-100">
      {/* TOP BAND: NEWSLETTER */}
      <div className="border-b border-cream-100/10">
        <div className="container-wide grid items-center gap-8 py-12 md:grid-cols-2 md:gap-12 md:py-14">
          <div>
            <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-cream-100/60">
              <Mail className="h-3 w-3" /> {t('footer.newsletterTitle')}
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tighter text-cream-50 md:text-3xl">
              {t('footer.newsletterTitle')}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-cream-100/70">
              {t('footer.newsletterBody')}
            </p>
          </div>
          <form onSubmit={submitNewsletter} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('footer.newsletterPlaceholder')}
              className="flex-1 rounded-full border border-cream-100/15 bg-cream-50/5 px-5 py-3 text-sm tracking-tight text-cream-50 placeholder:text-cream-100/40 focus:border-cream-50/40 focus:outline-none"
              aria-label={t('footer.newsletterPlaceholder')}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cream-50 px-6 py-3 text-[13px] font-medium tracking-tight text-ink-900 transition-all hover:bg-terracotta-500 hover:text-cream-50 active:scale-[0.98]"
            >
              <Send className="h-3.5 w-3.5" />
              {subscribed ? t('footer.newsletterThanks') : t('footer.newsletterSubscribe')}
            </button>
          </form>
        </div>
      </div>

      {/* MIDDLE BAND: BRAND + LINKS (6 columns on desktop) */}
      <div className="container-wide py-14 md:py-16">
        {/* Brand row — full width */}
        <div className="mb-12 grid items-end gap-6 border-b border-cream-100/10 pb-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <Link to="/" className="inline-flex items-center gap-2.5 text-3xl font-semibold tracking-tighter text-cream-50">
              <img src="/zaytoun-logo.jpg" alt="" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
              Zaytoun
            </Link>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-cream-100/70">
              {t('footer.blurb')}
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full border border-cream-100/20 bg-cream-50/5 px-5 py-2.5 text-[12px] font-medium tracking-tight text-cream-50 transition-colors hover:border-terracotta-500 hover:bg-terracotta-500 hover:text-cream-50"
            >
              <Heart className="h-3.5 w-3.5" fill="currentColor" />
              {t('footer.supportProject')}
              <ArrowUpRight className="rtl-flip h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Links grid — 6 columns on desktop */}
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-8 lg:grid-cols-6">
          {/* Discover */}
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-widest text-cream-100/50">
              {t('footer.discover')}
            </h4>
            <ul className="mt-5 space-y-2.5 text-[15px] font-medium tracking-tight">
              {DISCOVER_LINKS.map((item) => (
                <li key={item.labelKey}>
                  <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Curated sections */}
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-widest text-cream-100/50">
              {t('footer.curated')}
            </h4>
            <ul className="mt-5 space-y-2.5 text-[15px] font-medium tracking-tight">
              {CURATED_LINKS.map((item) => (
                <li key={item.labelKey}>
                  <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Fitness */}
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-widest text-cream-100/50">
              {t('footer.fitness')}
            </h4>
            <ul className="mt-5 space-y-2.5 text-[15px] font-medium tracking-tight">
              {FITNESS_LINKS.map((item) => (
                <li key={item.labelKey + item.to}>
                  <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-widest text-cream-100/50">
              {t('footer.categories')}
            </h4>
            <ul className="mt-5 space-y-2.5 text-[15px] font-medium tracking-tight">
              {CATEGORIES.map((c) => (
                <li key={c.to}>
                  <FooterLink to={c.to}>{categoryLabels[c.key]}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Cuisines */}
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-widest text-cream-100/50">
              {t('footer.cuisines')}
            </h4>
            <ul className="mt-5 space-y-2.5 text-[15px] font-medium tracking-tight">
              {cuisineItems.map((c) => (
                <li key={c.to}>
                  <FooterLink to={c.to}>{c.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] font-medium uppercase tracking-widest text-cream-100/50">
              {t('footer.support')}
            </h4>
            <ul className="mt-5 space-y-2.5 text-[15px] font-medium tracking-tight">
              {SUPPORT_LINKS.map((item, i) => (
                <li key={`${item.labelKey}-${i}`}>
                  <FooterLink to={item.to}>{t(item.labelKey)}</FooterLink>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={resetCookieConsent}
                  className="link-underline inline-flex items-center gap-1.5 text-left text-cream-50/90 transition-colors hover:text-cream-50"
                >
                  <Cookie className="h-3.5 w-3.5" />
                  {cookieReset ? t('footer.cookieReset') : t('footer.cookieSettings')}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* DATA SOURCE BAND */}
      <div className="border-t border-cream-100/10">
        <div className="container-wide flex flex-wrap items-center justify-between gap-4 py-5 text-[11px] uppercase tracking-widest text-cream-100/40">
          <p>{t('footer.dataBy')}</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-sage-400" />
            {t('footer.madeWith')}
          </p>
        </div>
      </div>

      {/* BOTTOM BAND */}
      <div className="border-t border-cream-100/10">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-5 text-xs tracking-tight text-cream-100/50 md:flex-row md:items-center">
          <p>{t('footer.rights', { year: new Date().getFullYear() })}</p>
          <p className="font-display italic text-cream-100/70">{t('footer.cookBeautifully')}</p>
        </div>
      </div>
    </footer>
  );
}
