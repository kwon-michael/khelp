'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { GlassArticleCard } from '@/components/ui/glass-article-card';
import articlesData from '@/data/articles.json';
import type { Article } from '@/types';
import './HealthInfo.css';

// Fallback image when article has no thumbnail
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function HealthInfo() {
  const { language, t, getLocalizedField } = useLanguage();
  const [visible, setVisible] = useState(9);

  const articles = [...(articlesData as Article[])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      {/* Page Hero */}
      <motion.section
        className="page-hero"
        aria-labelledby="health-info-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-hero-inner">
          <h1 id="health-info-heading" className="page-hero-title">{t('health_info_title')}</h1>
          <p className="page-hero-subtitle">{t('health_info_subtitle')}</p>
        </div>
      </motion.section>

      <div className="page-container">

        <section className="section" aria-label="Health articles">
          <motion.div className="article-glass-grid" {...fadeUp}>
            {articles.slice(0, visible).map((article) => (
              <Link
                key={article.id}
                href={`/${language}/health-info/${article.slug}`}
                className="article-glass-link"
              >
                <GlassArticleCard
                  title={getLocalizedField(article, 'title')}
                  excerpt={getLocalizedField(article, 'excerpt')}
                  image={article.thumbnail || FALLBACK_IMAGE}
                  date={article.date}
                  formattedDate={formatDate(article.date)}
                  author={article.author}
                  tags={article.tags}
                />
              </Link>
            ))}
          </motion.div>
          {visible < articles.length && (
            <motion.div className="text-center mt-4" {...fadeUp}>
              <button
                className="btn btn-secondary"
                onClick={() => setVisible(prev => prev + 9)}
              >
                {t('health_info_load_more')}
              </button>
            </motion.div>
          )}
        </section>
      </div>
    </>
  );
}
