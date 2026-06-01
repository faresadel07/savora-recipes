import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Check,
  Mail,
  MessageSquare,
  Send,
} from 'lucide-react';

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.16c-3.2.7-3.88-1.36-3.88-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.18.91-.25 1.89-.38 2.86-.39.97.01 1.95.14 2.86.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.57.23 2.73.11 3.02.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.27 5.68.42.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}
import { useTranslation } from '../i18n';

const EMAIL = 'miggajigga6767@gmail.com';
const GITHUB = 'https://github.com/faresadel07';

export default function ContactPage() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('general');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const canSubmit = name.trim().length > 0 && message.trim().length > 0;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    const subject = `[Zaytoun · ${topic}] from ${name.trim()}`;
    const body = `${message.trim()}\n\n--\n${name.trim()}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <div>
      {/* HERO */}
      <section className="bg-cream-50 pt-10 pb-16 md:pt-16 md:pb-20">
        <div className="container-narrow text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            {t('contact.eyebrow')}
          </p>
          <h1 className="mt-5 text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tighter text-ink-900">
            {t('contact.title1')}
            <br />
            <span className="text-terracotta-500">{t('contact.title2')}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-600 md:text-lg">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="container-wide -mt-4 md:-mt-6">
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          <a
            href={`mailto:${EMAIL}`}
            className="group flex items-start gap-4 rounded-3xl border border-ink-100 bg-cream-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] md:p-7"
          >
            <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-terracotta-50 text-terracotta-500">
              <Mail className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                {t('contact.emailLabel')}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-ink-900">{EMAIL}</p>
              <p className="mt-2 text-sm text-ink-600">{t('contact.emailNote')}</p>
            </div>
            <ArrowUpRight className="rtl-flip mt-1 h-4 w-4 text-ink-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-4 rounded-3xl border border-ink-100 bg-cream-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-900 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.18)] md:p-7"
          >
            <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-sage-50 text-sage-600">
              <GithubIcon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                {t('contact.githubLabel')}
              </p>
              <p className="mt-2 text-lg font-semibold tracking-tight text-ink-900">faresadel07</p>
              <p className="mt-2 text-sm text-ink-600">{t('contact.githubNote')}</p>
            </div>
            <ArrowUpRight className="rtl-flip mt-1 h-4 w-4 text-ink-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>

      {/* MESSAGE FORM */}
      <section className="container-narrow mt-16 md:mt-24">
        <div className="rounded-[28px] border border-ink-100 bg-cream-100/60 p-7 md:p-10">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-cream-50">
              <MessageSquare className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
                {t('contact.formEyebrow')}
              </p>
              <h2 className="text-xl font-semibold tracking-tighter text-ink-900 md:text-2xl">
                {t('contact.formTitle')}
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-[12px] font-semibold tracking-tight text-ink-900"
              >
                {t('contact.nameLabel')}
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('contact.namePlaceholder')}
                className="mt-2 w-full rounded-2xl border border-ink-100 bg-cream-50 px-4 py-3 text-[15px] tracking-tight text-ink-900 placeholder:text-ink-400 focus:border-terracotta-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label
                htmlFor="contact-topic"
                className="block text-[12px] font-semibold tracking-tight text-ink-900"
              >
                {t('contact.topicLabel')}
              </label>
              <select
                id="contact-topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-2 w-full appearance-none rounded-2xl border border-ink-100 bg-cream-50 px-4 py-3 text-[15px] tracking-tight text-ink-900 focus:border-terracotta-500 focus:outline-none"
              >
                <option value="general">{t('contact.topicGeneral')}</option>
                <option value="bug">{t('contact.topicBug')}</option>
                <option value="feature">{t('contact.topicFeature')}</option>
                <option value="recipe">{t('contact.topicRecipe')}</option>
                <option value="press">{t('contact.topicPress')}</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-[12px] font-semibold tracking-tight text-ink-900"
              >
                {t('contact.messageLabel')}
              </label>
              <textarea
                id="contact-message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('contact.messagePlaceholder')}
                className="mt-2 w-full resize-none rounded-2xl border border-ink-100 bg-cream-50 px-4 py-3 text-[15px] tracking-tight text-ink-900 placeholder:text-ink-400 focus:border-terracotta-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-[14px] font-semibold tracking-tight transition-all duration-300 ${
                canSubmit
                  ? 'bg-ink-900 text-cream-50 hover:bg-terracotta-500 active:scale-[0.99]'
                  : 'cursor-not-allowed bg-ink-100 text-ink-400'
              }`}
            >
              {sent ? (
                <>
                  <Check className="h-4 w-4" />
                  {t('contact.sent')}
                </>
              ) : (
                <>
                  {t('contact.send')}
                  <Send className="rtl-flip h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] tracking-tight text-ink-500">
              {t('contact.formNote')}
            </p>
          </form>
        </div>
      </section>

      {/* FAQ STRIP */}
      <section className="container-wide mt-20 md:mt-28">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-terracotta-500">
              {t('contact.faqResponseEyebrow')}
            </p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink-900">
              {t('contact.faqResponseTitle')}
            </h3>
            <p className="mt-2 text-sm text-ink-600">{t('contact.faqResponseBody')}</p>
          </div>
          <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sage-600">
              {t('contact.faqLanguageEyebrow')}
            </p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink-900">
              {t('contact.faqLanguageTitle')}
            </h3>
            <p className="mt-2 text-sm text-ink-600">{t('contact.faqLanguageBody')}</p>
          </div>
          <div className="rounded-3xl border border-ink-100 bg-cream-50 p-6 md:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
              {t('contact.faqPrivacyEyebrow')}
            </p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink-900">
              {t('contact.faqPrivacyTitle')}
            </h3>
            <p className="mt-2 text-sm text-ink-600">{t('contact.faqPrivacyBody')}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-narrow mt-20 py-16 text-center md:mt-28 md:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta-500">
          {t('contact.ctaEyebrow')}
        </p>
        <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-ink-900 md:text-3xl">
          {t('contact.ctaQuote')}
        </p>
        <Link to="/about" className="btn-primary mt-9">
          {t('contact.ctaAbout')}
          <ArrowUpRight className="rtl-flip h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
