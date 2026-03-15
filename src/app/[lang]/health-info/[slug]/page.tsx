import translations from '@/data/translations.json';
import articlesData from '@/data/articles.json';
import ArticleDetail from '@/views/ArticleDetail';
import type { Metadata } from 'next';
import type { Article } from '@/types';

interface PageProps {
  params: { lang: string; slug: string };
}

export function generateMetadata({ params }: PageProps): Metadata {
  const lang = params.lang === 'en' ? 'en' : 'ko';
  const t = (translations as Record<string, Record<string, string>>)[lang] || (translations as Record<string, Record<string, string>>).ko;
  const article = (articlesData as Article[]).find(a => a.slug === params.slug);

  if (!article) {
    return { title: `Article Not Found | ${t.site_name}` };
  }

  const title = (article[`title_${lang}`] as string) || article.title_en;
  const description = (article[`excerpt_${lang}`] as string) || article.excerpt_en;
  return {
    title: `${title} | ${t.site_name}`,
    description,
  };
}

export default function ArticleDetailPage() {
  return <ArticleDetail />;
}
