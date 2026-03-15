'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useStorage } from '@/hooks/useStorage';
import articlesData from '@/data/articles.json';
import type { Article } from '@/types';
import './ArticleDetail.css';

/**
 * Simple Markdown-to-HTML renderer for article bodies.
 * Supports: headings (##, ###), bold (**), italic (*), links, lists, paragraphs.
 */
function renderMarkdown(md: string): string {
  if (!md) return '';

  const lines = md.split('\n');
  let html = '';
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Headings
    if (line.startsWith('### ')) {
      if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
      html += `<h3>${processInline(line.slice(4))}</h3>`;
      continue;
    }
    if (line.startsWith('## ')) {
      if (inList) { html += listType === 'ul' ? '</ul>' : '</ol>'; inList = false; }
      html += `<h2>${processInline(line.slice(3))}</h2>`;
      continue;
    }

    // Unordered list
    if (line.match(/^- /)) {
      if (!inList || listType !== 'ul') {
        if (inList) html += listType === 'ul' ? '</ul>' : '</ol>';
        html += '<ul>';
        inList = true;
        listType = 'ul';
      }
      html += `<li>${processInline(line.slice(2))}</li>`;
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\d+)\.\s+/);
    if (olMatch) {
      if (!inList || listType !== 'ol') {
        if (inList) html += listType === 'ul' ? '</ul>' : '</ol>';
        html += '<ol>';
        inList = true;
        listType = 'ol';
      }
      html += `<li>${processInline(line.slice(olMatch[0].length))}</li>`;
      continue;
    }

    // Close list if not a list item
    if (inList) {
      html += listType === 'ul' ? '</ul>' : '</ol>';
      inList = false;
    }

    // Empty line
    if (line.trim() === '') {
      continue;
    }

    // Paragraph
    html += `<p>${processInline(line)}</p>`;
  }

  if (inList) {
    html += listType === 'ul' ? '</ul>' : '</ol>';
  }

  return html;
}

function processInline(text: string): string {
  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic (single *)
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Links
  text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  return text;
}

interface VoteCounts {
  [articleId: string]: { likes: number; dislikes: number };
}

interface Votes {
  [articleId: string]: 'like' | 'dislike';
}

interface ViewCounts {
  [articleId: string]: number;
}

export default function ArticleDetail() {
  const { slug } = useParams() as { slug: string };
  const { language, t, getLocalizedField } = useLanguage();

  const article = (articlesData as Article[]).find(a => a.slug === slug);

  // Like/Dislike
  const [votes, setVotes] = useStorage<Votes>('khelp-votes', {});
  const [likeCounts, setLikeCounts] = useStorage<VoteCounts>('khelp-likes', {});

  // View counter (not displayed publicly)
  const [, setViewCounts] = useStorage<ViewCounts>('khelp-views', {});

  useEffect(() => {
    if (article) {
      // Increment view count
      setViewCounts(prev => ({
        ...prev,
        [article.id]: (prev[article.id] || 0) + 1,
      }));
      /**
       * ADMIN: To check view counts, run in browser console:
       * JSON.parse(localStorage.getItem('khelp-views'))
       */
    }
  }, [article?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const userVote = votes[article?.id as string]; // 'like' or 'dislike' or undefined

  const handleVote = (type: 'like' | 'dislike') => {
    if (!article) return;
    const currentVote = votes[article.id];
    if (currentVote === type) return; // already voted this way

    setVotes(prev => ({ ...prev, [article.id]: type }));

    setLikeCounts(prev => {
      // Deep-copy the article's counts to avoid mutating prev (strict mode safety)
      const current = prev[article.id] ? { ...prev[article.id] } : { likes: 0, dislikes: 0 };

      // Remove previous vote if any
      if (currentVote === 'like') current.likes = Math.max(0, current.likes - 1);
      if (currentVote === 'dislike') current.dislikes = Math.max(0, current.dislikes - 1);

      // Add new vote
      if (type === 'like') current.likes += 1;
      if (type === 'dislike') current.dislikes += 1;

      return { ...prev, [article.id]: current };
    });
  };

  const articleLikes = likeCounts[article?.id as string]?.likes || 0;
  const articleDislikes = likeCounts[article?.id as string]?.dislikes || 0;

  if (!article) {
    return (
      <div className="page-container">
        <div className="section text-center">
          <h1>Article Not Found</h1>
          <Link href={`/${language}/health-information`} className="btn btn-primary mt-3">
            {t('health_info_back')}
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const bodyHtml = useMemo(
    () => renderMarkdown(getLocalizedField(article, 'body')),
    [article, language] // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <>
      <article className="article-detail">
        <div className="content-container">
          <Link href={`/${language}/health-information`} className="article-back">
            ← {t('health_info_back')}
          </Link>

          <header className="article-header">
            <h1 className="article-title">{getLocalizedField(article, 'title')}</h1>
            <div className="article-meta">
              {article.author && (
                <span>{t('health_info_by')} {article.author}</span>
              )}
              <span>{t('health_info_published')} {formatDate(article.date)}</span>
            </div>
          </header>

          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          {/* Like / Dislike */}
          <div className="article-feedback" role="group" aria-label="Article feedback">
            <button
              className={`feedback-btn like-btn ${userVote === 'like' ? 'active' : ''}`}
              onClick={() => handleVote('like')}
              aria-pressed={userVote === 'like'}
              aria-label={`${t('health_info_like')} (${articleLikes})`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
              </svg>
              <span>{t('health_info_like')}</span>
              <span className="feedback-count">{articleLikes}</span>
            </button>
            <button
              className={`feedback-btn dislike-btn ${userVote === 'dislike' ? 'active' : ''}`}
              onClick={() => handleVote('dislike')}
              aria-pressed={userVote === 'dislike'}
              aria-label={`${t('health_info_dislike')} (${articleDislikes})`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10zM17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
              </svg>
              <span>{t('health_info_dislike')}</span>
              <span className="feedback-count">{articleDislikes}</span>
            </button>
          </div>

          <Link href={`/${language}/health-information`} className="article-back article-back-bottom">
            ← {t('health_info_back')}
          </Link>
        </div>
      </article>
    </>
  );
}
