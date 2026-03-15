'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import articles from '@/data/articles.json';
import events from '@/data/events.json';
import HeroSection9 from '@/components/ui/hero-section-9';
import type { Article, EventItem } from '@/types';
import './Home.css';

export default function Home() {
  const { language, t, getLocalizedField } = useLanguage();
  const [nlEmail, setNlEmail] = useState('');
  const [nlError, setNlError] = useState('');
  const [nlSubmitted, setNlSubmitted] = useState(false);

  // Featured article = most recent
  const featuredArticle = ([...(articles as Article[])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))[0];

  // Next upcoming event
  const now = new Date();
  const upcomingEvent = (events as EventItem[])
    .filter(e => e.type === 'upcoming' && new Date(e.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nlEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nlEmail)) {
      setNlError(t('contact_validation_email'));
      return;
    }
    setNlError('');
    // TODO: Integrate with Mailchimp or Buttondown
    console.log('Newsletter signup:', { email: nlEmail });
    setNlSubmitted(true);
    setNlEmail('');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /* Hero collage images — community & health themed Unsplash photos */
  const heroImages = [
    { src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=750&fit=crop', alt: 'Healthcare professional' },
    { src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop', alt: 'Doctor consultation' },
    { src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=300&h=300&fit=crop', alt: 'Community workshop' },
    { src: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=300&h=300&fit=crop', alt: 'Health education' },
    { src: 'https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=300&h=300&fit=crop', alt: 'Korean community gathering' },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection9
        badge={t('home_hero_badge')}
        heading={t('home_hero_heading')}
        description={t('home_hero_description')}
        actions={[
          { label: t('home_hero_cta_learn'), href: `/${language}/health-information`, variant: 'default' },
          { label: t('home_hero_cta_contact'), href: `/${language}/contact-us`, variant: 'outline' },
        ]}
        stats={[
          { value: '20+', label: t('home_hero_stat_workshops') },
          { value: '500+', label: t('home_hero_stat_attendees') },
          { value: '50+', label: t('home_hero_stat_resources') },
        ]}
        images={heroImages}
      />

      {/* Who We Are */}
      <motion.section
        className="section"
        aria-labelledby="who-we-are-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="page-container">
          <div className="who-we-are">
            <h2 id="who-we-are-heading" className="section-title">{t('home_who_we_are_title')}</h2>
            <p className="who-we-are-text">{t('home_who_we_are_text')}</p>
            <Link href={`/${language}/about`} className="who-we-are-link">
              {t('home_who_we_are_link')} →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Featured Article & Upcoming Event */}
      <motion.section
        className="section"
        aria-label="Featured content"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="page-container">
          <div className="home-cards-row">
            {/* Featured Article */}
            {featuredArticle && (
              <motion.div
                className="card home-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <h2 className="home-card-label">{t('home_featured_article_title')}</h2>
                <h3 className="home-card-title">
                  <Link href={`/${language}/health-info/${featuredArticle.slug}`}>
                    {getLocalizedField(featuredArticle, 'title')}
                  </Link>
                </h3>
                <p className="home-card-excerpt">
                  {getLocalizedField(featuredArticle, 'excerpt')}
                </p>
                <p className="text-caption">{formatDate(featuredArticle.date)}</p>
                <Link href={`/${language}/health-info/${featuredArticle.slug}`} className="btn btn-primary mt-2">
                  {t('read_more')}
                </Link>
              </motion.div>
            )}

            {/* Upcoming Event */}
            {upcomingEvent && (
              <motion.div
                className="card home-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <h2 className="home-card-label">{t('home_upcoming_event_title')}</h2>
                <div className="event-date-badge">
                  <span className="event-month">
                    {new Date(upcomingEvent.date + 'T00:00:00').toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-CA', { month: 'short' })}
                  </span>
                  <span className="event-day">
                    {new Date(upcomingEvent.date + 'T00:00:00').getDate()}
                  </span>
                </div>
                <h3 className="home-card-title">{getLocalizedField(upcomingEvent, 'title')}</h3>
                <p className="home-card-excerpt">
                  {getLocalizedField(upcomingEvent, 'description')}
                </p>
                <Link href={`/${language}/events`} className="btn btn-secondary mt-2">
                  {t('home_view_events')}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Signup */}
      <motion.section
        className="section section-highlight"
        aria-labelledby="newsletter-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="page-container">
          <div className="newsletter-box">
            <h2 id="newsletter-heading" className="section-title">{t('home_newsletter_title')}</h2>
            <p className="newsletter-desc">{t('home_newsletter_desc')}</p>

            {nlSubmitted ? (
              <div className="newsletter-success" role="status" aria-live="polite">
                <svg style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '8px' }} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2E7D32" strokeWidth="2" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('home_newsletter_success')}
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} noValidate>
                <div className="newsletter-fields">
                  <div className="form-group">
                    <label className="form-label" htmlFor="nl-email">
                      {t('home_newsletter_email')} <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="nl-email"
                      type="email"
                      className={`form-input${nlError ? ' error' : ''}`}
                      placeholder={t('home_newsletter_email')}
                      value={nlEmail}
                      onChange={(e) => {
                        setNlEmail(e.target.value);
                        if (nlError) setNlError('');
                      }}
                      required
                      aria-required="true"
                      aria-describedby={nlError ? 'nl-email-error' : undefined}
                    />
                    {nlError && (
                      <p className="form-error" id="nl-email-error" role="alert">{nlError}</p>
                    )}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-2)' }}>
                  {t('home_newsletter_submit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
}
