'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import logoNoBg from '@/assets/logo-full-no-bg.png';
import './Navbar.css';

interface NavItem {
  key: string;
  path: string;
}

const navItems: NavItem[] = [
  { key: 'nav_home', path: '' },
  { key: 'nav_about', path: 'about' },
  { key: 'nav_events', path: 'events' },
  { key: 'nav_health_info', path: 'health-information' },
  { key: 'nav_faq', path: 'faq' },
  { key: 'nav_contact', path: 'contact-us' },
];

export default function Navbar() {
  const { language, otherLang, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageToggle = () => {
    const pathWithoutLang = pathname.replace(/^\/(en|ko)/, '');
    router.push(`/${otherLang}${pathWithoutLang || '/'}`);
  };

  const isActive = (path: string) => {
    const fullPath = `/${language}/${path}`;
    if (path === '') {
      return pathname === `/${language}` || pathname === `/${language}/`;
    }
    return pathname.startsWith(fullPath);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-inner">
        <Link href={`/${language}/`} className="navbar-logo" aria-label="K-HELP Home">
          <img src={logoNoBg.src} alt="K-HELP" className="navbar-logo-img" />
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`} role="menubar">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${language}/${item.path}`}
              className={`navbar-link ${isActive(item.path) ? 'active' : ''}`}
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {t(item.key)}
            </Link>
          ))}
          <button
            className="lang-toggle mobile-lang"
            onClick={() => { handleLanguageToggle(); setMenuOpen(false); }}
            aria-label={`Switch to ${otherLang === 'en' ? 'English' : '한국어'}`}
          >
            {t('lang_toggle')}
          </button>
          <button
            className="menu-close-btn"
            onClick={() => setMenuOpen(false)}
            aria-label={t('close_menu')}
          >
            ✕ {t('close_menu')}
          </button>
        </div>

        <div className="navbar-actions">
          <button
            className="lang-toggle desktop-lang"
            onClick={handleLanguageToggle}
            aria-label={`Switch to ${otherLang === 'en' ? 'English' : '한국어'}`}
          >
            {t('lang_toggle')}
          </button>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t('menu_label')}
          >
            {t('menu_label')} ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </nav>
  );
}
