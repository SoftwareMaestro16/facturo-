'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { cn } from '@/shared/lib';

/// Adapted from an open-source bento card (MIT): graphic above a translucent
/// text panel. Attribution in THIRD_PARTY_NOTICES.md.
export function BentoCard({
  eyebrow,
  title,
  description,
  graphic,
  className,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  graphic: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-black text-white',
        className,
      )}
    >
      <div
        className="relative flex h-52 items-center justify-center overflow-hidden px-6 py-8 sm:h-60"
        aria-hidden="true"
      >
        {graphic}
      </div>
      <div className="relative flex-1 border-t border-white/10 bg-white/[0.035] p-7 backdrop-blur-xl sm:p-8">
        <p className="text-xs font-medium tracking-[0.13em] text-white/40 uppercase">{eyebrow}</p>
        <h3 className="mt-3 text-2xl leading-tight font-medium tracking-tight">{title}</h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-white/55">{description}</p>
      </div>
    </motion.article>
  );
}
