'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';

/// "What is coming, and on what condition."
///
/// Every card names what the product does today before it names what will be
/// switched on. Written this way on purpose: a landing page that promises a
/// feature by a date is the reason a customer feels cheated later, and this
/// product is bought by people who are already afraid of a fine.
const items = ['efactura', 'payment', 'assistant', 'verified'] as const;

export function LandingRoadmap() {
  const t = useTranslations('landing.roadmap');
  const reducedMotion = useReducedMotion();

  return (
    <section id="roadmap" className="mt-24 scroll-mt-10 border-t border-white/10 pt-20 sm:mt-32">
      <p className="text-xs tracking-[0.2em] text-white/45 uppercase">{t('label')}</p>
      <h2 className="mt-5 max-w-2xl text-4xl font-medium tracking-tight sm:text-5xl">{t('title')}</h2>
      <p className="mt-5 max-w-2xl leading-7 text-white/55">{t('intro')}</p>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <motion.article
            key={item}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.25, delay: index * 0.045 }}
            className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"
          >
            <h3 className="text-xl leading-tight font-medium">{t(`${item}.title`)}</h3>
            <dl className="mt-7 flex flex-col gap-6">
              <div>
                <dt className="text-xs tracking-[0.16em] text-white/40 uppercase">{t('nowLabel')}</dt>
                <dd className="mt-2 leading-7 text-white/55">{t(`${item}.now`)}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-[0.16em] text-white/40 uppercase">{t('nextLabel')}</dt>
                <dd className="mt-2 leading-7 text-white/75">{t(`${item}.next`)}</dd>
              </div>
            </dl>
          </motion.article>
        ))}
      </div>
      <p className="mt-8 max-w-2xl text-xs leading-6 text-white/40">{t('note')}</p>
    </section>
  );
}
