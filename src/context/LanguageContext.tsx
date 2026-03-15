'use client';

import { createContext, useState, useCallback, useEffect, useMemo, type ReactNode } from 'react';
import translations from '../data/translations.json';
import type { Language } from '@/types';

export interface LanguageContextType {
  language: Language;
  otherLang: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  getLocalizedField: (obj: Record<string, unknown>, fieldBase: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

interface LanguageProviderProps {
  children: ReactNode;
  initialLang?: Language;
}

export function LanguageProvider({ children, initialLang = 'ko' }: LanguageProviderProps) {
  // Always start with initialLang to match server render and avoid hydration mismatch
  const [language, setLanguage] = useState<Language>(initialLang);
  const [hydrated, setHydrated] = useState(false);

  // After hydration, sync from localStorage if a saved preference exists
  useEffect(() => {
    try {
      const saved = localStorage.getItem('khelp-lang');
      if ((saved === 'en' || saved === 'ko') && saved !== language) {
        setLanguage(saved as Language);
      }
    } catch (e) { /* ignore */ }
    setHydrated(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    document.documentElement.lang = language;
    if (hydrated) {
      try {
        localStorage.setItem('khelp-lang', language);
      } catch (e) { /* ignore */ }
    }
  }, [language, hydrated]);

  const t = useCallback((key: string): string => {
    const langTranslations = (translations as Record<string, Record<string, string>>)[language];
    const value = langTranslations?.[key];
    if (!value) {
      console.warn(`Missing translation: ${language}.${key}`);
      return (translations as Record<string, Record<string, string>>)['en']?.[key] || key;
    }
    return value;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
  }, []);

  const getLocalizedField = useCallback((obj: Record<string, unknown>, fieldBase: string): string => {
    if (!obj) return '';
    return (obj[`${fieldBase}_${language}`] as string) || (obj[`${fieldBase}_en`] as string) || '';
  }, [language]);

  const otherLang: Language = language === 'ko' ? 'en' : 'ko';

  const value = useMemo(() => ({
    language,
    otherLang,
    setLanguage,
    toggleLanguage,
    t,
    getLocalizedField,
  }), [language, otherLang, setLanguage, toggleLanguage, t, getLocalizedField]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
