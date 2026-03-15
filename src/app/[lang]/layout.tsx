'use client';

import { useEffect } from 'react';
import { usePathname, useParams } from 'next/navigation';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLanguage } from '@/hooks/useLanguage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Language } from '@/types';

function LanguageSync() {
  const { setLanguage, language } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    const match = pathname.match(/^\/(en|ko)/);
    if (match && match[1] !== language) {
      setLanguage(match[1] as Language);
    }
  }, [pathname, setLanguage, language]);

  return null;
}

function ScrollToTop() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LangLayoutInner({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();

  return (
    <>
      <LanguageSync />
      <ScrollToTop />
      <a href="#main-content" className="skip-link">
        {t('skip_to_content')}
      </a>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}

export default function LangLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const lang: Language = params?.lang === 'en' ? 'en' : 'ko';

  return (
    <LanguageProvider initialLang={lang}>
      <LangLayoutInner>{children}</LangLayoutInner>
    </LanguageProvider>
  );
}
