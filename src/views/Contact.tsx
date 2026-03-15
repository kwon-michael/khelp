'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactForm, string>>;
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const { t } = useLanguage();

  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = t('contact_validation_name');
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = t('contact_validation_email');
    }
    if (!form.subject) errs.subject = t('contact_validation_subject');
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = t('contact_validation_message');
    }
    return errs;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('submitting');
    setErrors({});

    try {
      // TODO: Replace with Formspree or Netlify Forms endpoint
      console.log('Form submission:', form);

      // Simulate submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Form submission error:', err);
      setStatus('error');
    }
  };

  const subjectOptions = [
    { value: '', label: `-- ${t('contact_subject')} --` },
    { value: 'general', label: t('contact_subject_general') },
    { value: 'newsletter', label: t('contact_subject_newsletter') },
    { value: 'booking', label: t('contact_subject_booking') },
    { value: 'other', label: t('contact_subject_other') },
  ];

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" aria-labelledby="contact-heading">
        <div className="page-hero-inner">
          <h1 id="contact-heading" className="page-hero-title">{t('contact_title')}</h1>
          <p className="page-hero-subtitle">{t('contact_description')}</p>
        </div>
      </section>

      <div className="page-container">

        <section className="section">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              {status === 'success' ? (
                <div className="contact-success" role="status" aria-live="polite">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p>{t('contact_success')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">
                      {t('contact_name')} <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      value={form.name}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && (
                      <p className="form-error" id="name-error" role="alert">{errors.name}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">
                      {t('contact_email')} <span className="required" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      value={form.email}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                    {errors.email && (
                      <p className="form-error" id="email-error" role="alert">{errors.email}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">
                      {t('contact_phone')}
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">
                      {t('contact_subject')} <span className="required" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      className={`form-select ${errors.subject ? 'error' : ''}`}
                      value={form.subject}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                    >
                      {subjectOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <p className="form-error" id="subject-error" role="alert">{errors.subject}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message" className="form-label">
                      {t('contact_message')} <span className="required" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className={`form-textarea ${errors.message ? 'error' : ''}`}
                      value={form.message}
                      onChange={handleChange}
                      required
                      aria-required="true"
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      rows={5}
                    />
                    {errors.message && (
                      <p className="form-error" id="message-error" role="alert">{errors.message}</p>
                    )}
                  </div>

                  {status === 'error' && (
                    <div className="contact-error-msg" role="alert">
                      {t('contact_error')}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary contact-submit"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? t('contact_submitting') : t('contact_submit')}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <aside className="contact-info">
              <h2 className="contact-info-heading">{t('contact_info_title')}</h2>

              <div className="contact-info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href={`mailto:${t('contact_info_email')}`}>{t('contact_info_email')}</a>
              </div>

              <div className="contact-info-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>{t('contact_info_phone')}</span>
              </div>

              <div className="contact-info-social">
                <h3>{t('contact_info_social')}</h3>
                <div className="social-links">
                  <a href="#" aria-label="Facebook" className="social-icon-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="social-icon-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
}
