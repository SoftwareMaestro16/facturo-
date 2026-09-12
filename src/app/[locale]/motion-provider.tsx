'use client';

import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

/// Honours the operating system's "reduce motion" setting for every animation
/// in the product at once (WCAG 2.3.3). Remembering it per component is how one
/// gets missed.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
