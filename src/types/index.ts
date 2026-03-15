// ── Data types for JSON imports ──

export interface Article {
  id: string;
  slug: string;
  title_en: string;
  title_ko: string;
  excerpt_en: string;
  excerpt_ko: string;
  body_en?: string;
  body_ko?: string;
  author?: string;
  date: string;
  thumbnail?: string;
  tags?: string[];
  [key: string]: string | string[] | undefined;
}

export interface EventItem {
  id: string;
  type: 'upcoming' | 'past';
  date: string;
  title_en: string;
  title_ko: string;
  description_en: string;
  description_ko: string;
  location_en: string;
  location_ko: string;
  image?: string | null;
  tags_en?: string[];
  tags_ko?: string[];
  [key: string]: string | string[] | null | undefined;
}

export interface FAQItem {
  id: string;
  category_en: string;
  category_ko: string;
  question_en: string;
  question_ko: string;
  answer_en: string;
  answer_ko: string;
  [key: string]: string | undefined;
}

export interface TeamMember {
  name_en: string;
  name_ko: string;
  title_en: string;
  title_ko: string;
  bio_en: string;
  bio_ko: string;
  src: string;
  [key: string]: string | undefined;
}

export type Language = 'en' | 'ko';

export interface TranslationStrings {
  [key: string]: string;
}

export interface Translations {
  en: TranslationStrings;
  ko: TranslationStrings;
}
