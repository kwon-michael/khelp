'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';
import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import {
  IconEaseInOut,
  IconShieldCheck,
  IconUsers,
  IconAdjustmentsBolt,
  IconRouteAltLeft,
  IconBook,
  IconBolt,
  IconHeart,
} from '@tabler/icons-react';
import team from '@/data/team.json';
import type { TeamMember } from '@/types';
import './About.css';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function About() {
  const { language, t, getLocalizedField } = useLanguage();

  const values = [
    { title: t('about_value_1_title'), description: t('about_value_1_desc'), icon: <IconEaseInOut /> },
    { title: t('about_value_2_title'), description: t('about_value_2_desc'), icon: <IconShieldCheck /> },
    { title: t('about_value_3_title'), description: t('about_value_3_desc'), icon: <IconUsers /> },
    { title: t('about_value_4_title'), description: t('about_value_4_desc'), icon: <IconAdjustmentsBolt /> },
    { title: t('about_value_5_title'), description: t('about_value_5_desc'), icon: <IconRouteAltLeft /> },
    { title: t('about_value_6_title'), description: t('about_value_6_desc'), icon: <IconBook /> },
    { title: t('about_value_7_title'), description: t('about_value_7_desc'), icon: <IconBolt /> },
    { title: t('about_value_8_title'), description: t('about_value_8_desc'), icon: <IconHeart /> },
  ];

  return (
    <>
      {/* Page Hero */}
      <motion.section
        className="page-hero"
        aria-labelledby="about-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-hero-inner">
          <h1 id="about-heading" className="page-hero-title">{t('nav_about')}</h1>
          <p className="page-hero-subtitle">{t('about_mission_text')}</p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="section" aria-labelledby="mission-heading">
        <div className="page-container">
          <div className="about-mv-grid">
            <motion.div className="card about-mv-card" {...fadeUp}>
              <div className="about-mv-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <h2 id="mission-heading">{t('about_mission_title')}</h2>
              <p>{t('about_mission_text')}</p>
            </motion.div>
            <motion.div className="card about-mv-card" {...fadeUp} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="about-mv-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <h2 id="vision-heading">{t('about_vision_title')}</h2>
              <p>{t('about_vision_text')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section section-alt" aria-labelledby="history-heading">
        <div className="page-container">
          <motion.h2 id="history-heading" className="section-title text-center" {...fadeUp}>
            {t('about_history_title')}
          </motion.h2>
          <div className="about-history-timeline">
            {[
              { year: '2023', text: t('about_history_p1') },
              { year: '2023–24', text: t('about_history_p2') },
              { year: '2024', text: t('about_history_p3') },
              { year: '2025', text: t('about_history_p4') },
            ].map((item, i) => (
              <motion.div
                key={item.year}
                className="about-history-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="about-history-year">{item.year}</div>
                <div className="card about-history-card">
                  <p>{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <motion.section className="section" aria-labelledby="team-heading" {...fadeUp}>
        <div className="page-container">
          <h2 id="team-heading" className="section-title text-center">{t('about_team_title')}</h2>
          <p className="about-section-desc">{t('about_team_desc')}</p>
          <AnimatedTestimonials
            testimonials={(team as TeamMember[]).map((member) => ({
              name: getLocalizedField(member, 'name'),
              designation: getLocalizedField(member, 'title'),
              quote: getLocalizedField(member, 'bio'),
              src: member.src,
            }))}
            autoplay
          />
        </div>
      </motion.section>

      {/* Values */}
      <motion.section className="section section-alt" aria-labelledby="values-heading" {...fadeUp}>
        <div className="page-container">
          <h2 id="values-heading" className="section-title text-center">{t('about_values_title')}</h2>
          <p className="about-section-desc">{t('about_values_desc')}</p>
          <FeaturesSectionWithHoverEffects features={values} />
        </div>
      </motion.section>
    </>
  );
}
