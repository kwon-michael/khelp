'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { GlassEventCard } from '@/components/ui/glass-event-card';
import eventsData from '@/data/events.json';
import type { EventItem } from '@/types';
import './Events.css';

// Fallback image when event has no image
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function Events() {
  const { language, t, getLocalizedField } = useLanguage();
  const [pastVisible, setPastVisible] = useState(6);

  const upcoming = (eventsData as EventItem[])
    .filter(e => e.type === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = (eventsData as EventItem[])
    .filter(e => e.type === 'past')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getMonth = (dateStr: string) => {
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-CA', { month: 'short' });
  };

  const getDay = (dateStr: string) => {
    return new Date(dateStr + 'T00:00:00').getDate();
  };

  return (
    <>
      {/* Page Hero */}
      <motion.section
        className="page-hero"
        aria-labelledby="events-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-hero-inner">
          <h1 id="events-heading" className="page-hero-title">{t('nav_events')}</h1>
          <p className="page-hero-subtitle">{t('events_subtitle')}</p>
        </div>
      </motion.section>

      <div className="page-container">

        {/* Upcoming Events — Glass Cards */}
        <section className="section" aria-labelledby="upcoming-heading">
          <motion.h2 id="upcoming-heading" className="section-title" {...fadeUp}>
            {t('events_upcoming_title')}
          </motion.h2>
          {upcoming.length === 0 ? (
            <p className="events-empty">{t('events_no_upcoming')}</p>
          ) : (
            <motion.div className="events-grid-upcoming" {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
              {upcoming.map((event, index) => (
                <GlassEventCard
                  key={event.id}
                  title={getLocalizedField(event, 'title')}
                  description={getLocalizedField(event, 'description')}
                  image={event.image || FALLBACK_IMAGE}
                  date={event.date}
                  formattedDate={formatDate(event.date)}
                  location={getLocalizedField(event, 'location')}
                  tags={
                    language === 'ko'
                      ? (event.tags_ko as string[] | undefined)
                      : (event.tags_en as string[] | undefined)
                  }
                />
              ))}
            </motion.div>
          )}
        </section>

        {/* Past Events — Glass Cards (muted) */}
        {past.length > 0 && (
          <section className="section" aria-labelledby="past-heading">
            <motion.h2 id="past-heading" className="section-title" {...fadeUp}>
              {t('events_past_title')}
            </motion.h2>
            <motion.div className="events-grid-upcoming" {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
              {past.slice(0, pastVisible).map((event) => (
                <GlassEventCard
                  key={event.id}
                  title={getLocalizedField(event, 'title')}
                  description={getLocalizedField(event, 'description')}
                  image={event.image || FALLBACK_IMAGE}
                  date={event.date}
                  formattedDate={formatDate(event.date)}
                  location={getLocalizedField(event, 'location')}
                  isPast
                />
              ))}
            </motion.div>
            {pastVisible < past.length && (
              <motion.div className="text-center mt-4" {...fadeUp}>
                <button
                  className="btn btn-secondary"
                  onClick={() => setPastVisible(prev => prev + 6)}
                >
                  {t('events_load_more')}
                </button>
              </motion.div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
