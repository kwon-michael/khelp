'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import faqData from '@/data/faq.json';
import type { FAQItem } from '@/types';
import './FAQ.css';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function FAQ() {
  const { t, getLocalizedField } = useLanguage();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Group by category
  const categories: Record<string, FAQItem[]> = {};
  (faqData as FAQItem[]).forEach(item => {
    const cat = getLocalizedField(item, 'category');
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(item);
  });

  const categoryList = Object.entries(categories);

  return (
    <>
      {/* Page Hero */}
      <motion.section
        className="page-hero"
        aria-labelledby="faq-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="page-hero-inner">
          <h1 id="faq-heading" className="page-hero-title">{t('faq_title')}</h1>
          <p className="page-hero-subtitle">{t('faq_subtitle')}</p>
        </div>
      </motion.section>

      <div className="page-container">

        <section className="section">
          {categoryList.map(([category, items], catIndex) => (
            <motion.div
              key={category}
              className="faq-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              {categoryList.length > 1 && (
                <h2 className="faq-category-title">{category}</h2>
              )}
              <div className="faq-list" role="list">
                {items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    className={`faq-item ${openItems[item.id] ? 'open' : ''}`}
                    role="listitem"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.05 }}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={openItems[item.id] || false}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <span className="faq-question-text">
                        {getLocalizedField(item, 'question')}
                      </span>
                      <span className="faq-icon" aria-hidden="true">
                        {openItems[item.id] ? '−' : '+'}
                      </span>
                    </button>
                    <div
                      id={`faq-answer-${item.id}`}
                      className="faq-answer"
                      role="region"
                      aria-labelledby={`faq-q-${item.id}`}
                      hidden={!openItems[item.id]}
                    >
                      <p>{getLocalizedField(item, 'answer')}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </>
  );
}
