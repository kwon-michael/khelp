import translations from '@/data/translations.json';
import Home from '@/views/Home';
import type { Metadata } from 'next';

interface PageProps {
  params: { lang: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const lang = params.lang === 'en' ? 'en' : 'ko';
  const t = (translations as Record<string, Record<string, string>>)[lang] || (translations as Record<string, Record<string, string>>).ko;
  return {
    title: `${t.nav_home} | ${t.site_name}`,
    description: t.site_tagline,
  };
}

export default function HomePage() {
  return <Home />;
}
