'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Link } from '@/shared/i18n';

const faqKeys = ['google', 'companies', 'import', 'payment', 'responsibility', 'ai'] as const;

// Preview of backend billing/model/plans.ts; checkout is not available yet.
const plans = [
  { code: 'FREE', price: '0', documents: 10, users: 1 },
  { code: 'STARTER', price: '249', documents: 100, users: 3 },
  { code: 'BUSINESS', price: '599', documents: null, users: null },
] as const;

export function LandingDetails() {
  const t = useTranslations('landingDetails');
  const [openFaq, setOpenFaq] = useState<(typeof faqKeys)[number] | null>(null);
  return (
    <>
      <section id="how-it-works" className="scroll-mt-10 border-t border-white/10 pt-20 mt-24 sm:mt-32">
        <p className="text-xs tracking-[0.2em] text-white/45 uppercase">{t('how.label')}</p>
        <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">{t('how.title')}</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {(['account', 'company', 'invoice'] as const).map((step, index) => (
            <article key={step} className="border-t border-white/20 pt-6">
              <span className="font-mono text-sm text-white/35">0{index + 1} /</span>
              <h3 className="mt-8 text-xl font-medium">{t(`how.${step}.title`)}</h3>
              <p className="mt-3 max-w-sm leading-7 text-white/55">{t(`how.${step}.body`)}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="pricing" className="mt-24 scroll-mt-10 sm:mt-32">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs tracking-[0.2em] text-white/45 uppercase">{t('pricing.label')}</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">
              {t('pricing.title')}
            </h2>
          </div>
          <span className="w-fit rounded-full border border-white/20 px-4 py-2 text-xs text-white/60">
            {t('pricing.preview')}
          </span>
        </div>
        <p className="mt-6 max-w-2xl leading-7 text-white/55">{t('pricing.intro')}</p>
        <div className="pricing-grid mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.code}
              className={`pricing-card relative isolate flex flex-col rounded-3xl border p-7 sm:p-8 ${plan.code === 'STARTER' ? 'pricing-featured border-white bg-white text-black' : 'border-white/15 bg-white/[0.025] text-white'}`}
            >
              {plan.code === 'STARTER' && (
                <span className="absolute -top-3 left-7 rounded-full border border-white/25 bg-black px-4 py-1 text-[11px] tracking-wider text-white">
                  {t('pricing.featured')}
                </span>
              )}
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium tracking-widest">{plan.code}</h3>
                <span className="text-xs opacity-50">{t(`pricing.${plan.code}.label`)}</span>
              </div>
              <p className="mt-8">
                <span className="text-6xl font-medium tracking-[-0.06em]">{plan.price}</span>
                <span className="ml-3 text-sm opacity-50">MDL / {t('pricing.month')}</span>
              </p>
              <p className="mt-5 min-h-14 text-sm leading-6 opacity-60">{t(`pricing.${plan.code}.body`)}</p>
              <ul className="my-8 space-y-4 border-t border-current/15 pt-7 text-sm">
                <li>
                  ✓{' '}
                  <span className="ml-2">
                    {plan.documents === null
                      ? t('pricing.unlimitedDocuments')
                      : t('pricing.documents', { count: plan.documents })}
                  </span>
                </li>
                <li>
                  ✓{' '}
                  <span className="ml-2">
                    {plan.users === null
                      ? t('pricing.unlimitedUsers')
                      : t('pricing.users', { count: plan.users })}
                  </span>
                </li>
                <li>
                  ✓ <span className="ml-2">{t('pricing.catalogs')}</span>
                </li>
                <li>
                  ✓ <span className="ml-2">{t('pricing.languages')}</span>
                </li>
              </ul>
              <Link
                href="/register"
                className={`pricing-cta mt-auto flex min-h-12 items-center justify-between rounded-full px-5 text-sm font-medium ${plan.code === 'STARTER' ? 'bg-black text-white' : 'border border-white/25'}`}
              >
                {t('pricing.cta')}{' '}
                <span aria-hidden="true" className="pricing-arrow">
                  ↗
                </span>
              </Link>
            </article>
          ))}
        </div>
        <p className="mt-5 max-w-3xl text-xs leading-6 text-white/40">{t('pricing.note')}</p>
      </section>
      <section
        id="faq"
        className="mt-24 grid scroll-mt-10 gap-10 border-t border-white/10 pt-16 sm:mt-32 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div>
          <p className="text-xs tracking-[0.2em] text-white/45 uppercase">FAQ</p>
          <h2 className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl">{t('faq.title')}</h2>
          <p className="mt-5 max-w-sm leading-7 text-white/55">{t('faq.intro')}</p>
        </div>
        <div>
          {faqKeys.map((key) => {
            const isOpen = openFaq === key;
            return (
              <div key={key} className="border-b border-white/15 first:border-t">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? null : key)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-lg"
                >
                  {t(`faq.${key}.q`)}
                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-white/40 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-5 leading-7 text-white/55">{t(`faq.${key}.a`)}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
