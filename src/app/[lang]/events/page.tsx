import translations from '@/data/translations.json';
import Events from '@/views/Events';
import type { Metadata } from 'next';

interface PageProps {
  params: { lang: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const lang = params.lang === 'en' ? 'en' : 'ko';
  const t = (translations as Record<string, Record<string, string>>)[lang] || (translations as Record<string, Record<string, string>>).ko;
  return {
    title: `${t.nav_events} | ${t.site_name}`,
    description: t.site_tagline,
  };
}

export default function EventsPage() {
  return <Events />;
}
