import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import InstallPrompt from './InstallPrompt';
import CookieBanner from './CookieBanner';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Hash links (#palestine, #calculator, #dish-mansaf, etc.). Wait one
      // frame for the route's content to mount, then scroll the target into
      // view. Two tries in case the element renders after a network round
      // trip on the new page.
      let attempts = 0;
      const target = hash.slice(1);
      const id = window.setInterval(() => {
        attempts += 1;
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.clearInterval(id);
        } else if (attempts >= 20) {
          window.clearInterval(id);
        }
      }, 80);
      return () => window.clearInterval(id);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <ScrollManager />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <InstallPrompt />
      <CookieBanner />
    </div>
  );
}
