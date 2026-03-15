'use client';

import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useLanguage } from '@/hooks/useLanguage';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof ContactForm, string>>;
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export const Contact2 = () => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
      // TODO: Replace with real form endpoint (Formspree, Netlify Forms, etc.)
      console.log('Form submission:', form);
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-12 lg:flex-row lg:gap-20">
          {/* Left column — title + contact details */}
          <div className="mx-auto flex w-full max-w-md flex-col justify-between gap-10 lg:mx-0">
            <div className="text-center lg:text-left">
              <h1 className="mb-3 text-[32px] font-bold leading-tight text-foreground md:text-[40px]">
                {t('contact_title')}
              </h1>
              <p className="text-[20px] leading-relaxed text-muted-foreground">
                {t('contact_description')}
              </p>
            </div>

            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-[22px] font-semibold text-foreground lg:text-left">
                {t('contact_info_title')}
              </h3>
              <ul className="ml-5 list-disc space-y-3 text-[18px] text-foreground">
                <li>
                  <span className="font-bold">{t('contact_phone_label')}: </span>
                  {t('contact_info_phone')}
                </li>
                <li>
                  <span className="font-bold">{t('contact_email')}: </span>
                  <a
                    href={`mailto:${t('contact_info_email')}`}
                    className="text-primary underline underline-offset-2"
                  >
                    {t('contact_info_email')}
                  </a>
                </li>
                <li>
                  <span className="font-bold">{t('contact_web_label')}: </span>
                  <a
                    href="https://k-help.ca"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-2"
                  >
                    k-help.ca
                  </a>
                </li>
              </ul>

              {/* Social links */}
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="mb-4 text-[18px] font-semibold text-foreground">
                  {t('contact_info_social')}
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div className="mx-auto flex w-full max-w-screen-md flex-col gap-6 rounded-lg border border-border bg-white p-8 shadow-sm md:p-10">
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2E7D32"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-[20px] font-semibold text-[#2E7D32]">
                  {t('contact_success')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="mb-5 grid w-full items-center gap-2">
                  <Label htmlFor="contact-name">
                    {t('contact_name')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder={t('contact_name')}
                    value={form.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-[16px] text-destructive" id="name-error" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-5 grid w-full items-center gap-2">
                  <Label htmlFor="contact-email">
                    {t('contact_email')} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder={t('contact_email')}
                    value={form.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-[16px] text-destructive" id="email-error" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-5 grid w-full items-center gap-2">
                  <Label htmlFor="contact-phone">{t('contact_phone')}</Label>
                  <Input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    placeholder={t('contact_phone')}
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Subject */}
                <div className="mb-5 grid w-full items-center gap-2">
                  <Label htmlFor="contact-subject">
                    {t('contact_subject')} <span className="text-destructive">*</span>
                  </Label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.subject ? 'subject-error' : undefined}
                    className={`flex h-12 w-full rounded-md border px-4 py-3 text-[18px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                      errors.subject
                        ? 'border-destructive'
                        : 'border-input bg-background'
                    }`}
                  >
                    {subjectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="text-[16px] text-destructive" id="subject-error" role="alert">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-5 grid w-full gap-2">
                  <Label htmlFor="contact-message">
                    {t('contact_message')} <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    placeholder={t('contact_message')}
                    value={form.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={errors.message ? 'border-destructive' : ''}
                    rows={5}
                  />
                  {errors.message && (
                    <p className="text-[16px] text-destructive" id="message-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <div
                    className="mb-5 rounded-md border border-destructive bg-destructive/5 px-4 py-3 text-[16px] font-semibold text-destructive"
                    role="alert"
                  >
                    {t('contact_error')}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-[18px]"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? t('contact_submitting')
                    : t('contact_submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
