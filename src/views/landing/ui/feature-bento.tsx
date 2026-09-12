'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

type FeatureKey = 'speed' | 'import' | 'errors';

/// Dark cards on the light page body: an eyebrow, a title, a body, and a
/// self-drawn graphic — no hotlinked image, so nothing here can break on a
/// blocked CDN or go missing when a URL rots. The graphic is CSS and one
/// inline SVG grid, built from design tokens rather than arbitrary hex, so a
/// future brand change moves it along with everything else.
const CARDS: readonly { key: FeatureKey; span: string; graphic: ReactNode }[] = [
  { key: 'speed', span: 'lg:col-span-2 lg:row-span-2', graphic: <SpeedGraphic /> },
  { key: 'import', span: 'lg:col-span-1', graphic: <ImportGraphic /> },
  { key: 'errors', span: 'lg:col-span-1', graphic: <ErrorsGraphic /> },
];

export function FeatureBento() {
  const t = useTranslations('landing.features');

  return (
    <section className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:grid-rows-2">
      {CARDS.map((card) => (
        <motion.article
          key={card.key}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-(--radius-card) bg-ink shadow-card',
            card.span,
          )}
        >
          <div className="absolute inset-0">{card.graphic}</div>

          <div className="relative z-10 bg-gradient-to-t from-ink via-ink/90 to-transparent p-6 pt-16">
            <p className="text-sm font-semibold uppercase tracking-wide text-white/60">
              {t(`${card.key}.eyebrow`)}
            </p>
            <h2 className="mt-1 text-xl font-bold text-white">{t(`${card.key}.title`)}</h2>
            <p className="mt-2 max-w-sm text-body text-white/70">{t(`${card.key}.body`)}</p>
          </div>
        </motion.article>
      ))}
    </section>
  );
}

/// A grid of thin lines plus a brand-coloured glow — stands in for "speed"
/// without needing a photograph of anyone's hand on a phone.
function SpeedGraphic() {
  return (
    <div className="absolute inset-0">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/40 blur-3xl transition-transform duration-300 group-hover:scale-110" />
      <GridLines />
    </div>
  );
}

/// Rows of little blocks flowing into one, standing in for many spreadsheet
/// rows collapsing into the product's own list.
function ImportGraphic() {
  return (
    <div className="absolute inset-0">
      <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-success-600/30 blur-3xl" />
      <div className="absolute left-6 top-8 flex flex-col gap-1.5 opacity-70">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="h-2 w-24 rounded-full bg-white/25"
            style={{ width: `${60 + row * 14}px` }}
          />
        ))}
      </div>
    </div>
  );
}

/// A single flagged line among calm ones, standing in for one explained error
/// among documents that otherwise went through cleanly.
function ErrorsGraphic() {
  return (
    <div className="absolute inset-0">
      <div className="absolute -right-10 top-4 h-40 w-40 rounded-full bg-danger-600/30 blur-3xl" />
      <div className="absolute right-6 top-8 flex flex-col items-end gap-1.5 opacity-70">
        <div className="h-2 w-16 rounded-full bg-white/25" />
        <div className="h-2 w-20 rounded-full bg-danger-600/70" />
        <div className="h-2 w-14 rounded-full bg-white/25" />
      </div>
    </div>
  );
}

function GridLines() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-[0.15]"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="feature-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#feature-grid)" />
    </svg>
  );
}
