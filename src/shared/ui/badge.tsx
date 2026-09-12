import type { ReactNode } from 'react';

import { cn } from '@/shared/lib';

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

const TONES: Record<Tone, string> = {
  neutral: 'bg-surface-sunken text-ink-muted border-line',
  brand: 'bg-brand-50 text-brand-700 border-brand-200',
  success: 'bg-success-50 text-success-700 border-success-600/20',
  warning: 'bg-warning-50 text-warning-700 border-warning-600/20',
  danger: 'bg-danger-50 text-danger-700 border-danger-600/20',
};

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-medium',
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
