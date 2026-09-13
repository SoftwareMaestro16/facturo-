'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Monochrome adaptation of the dot reveal sign-in reference. */
export function SignInPage({
  children,
  navigation,
  footer,
}: {
  children: ReactNode;
  navigation: ReactNode;
  footer?: ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-black text-white">
      <div aria-hidden="true" className="auth-dot-field pointer-events-none absolute inset-0 -z-10" />
      <header className="mx-auto mt-6 flex w-[calc(100%-3rem)] max-w-xl items-center justify-between gap-4 rounded-full border border-white/15 bg-white/5 px-6 py-3 backdrop-blur-xl">
        {navigation}
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md text-center"
        >
          {children}
        </motion.div>
      </main>
      {footer ? (
        <footer className="border-t border-white/10 px-6 py-5 text-xs text-white/40">{footer}</footer>
      ) : null}
    </div>
  );
}
