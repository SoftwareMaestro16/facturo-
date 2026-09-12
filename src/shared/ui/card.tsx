import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section
      className={cn('rounded-(--radius-card) border border-line bg-surface p-5 shadow-card', className)}
    >
      {children}
    </section>
  );
}
