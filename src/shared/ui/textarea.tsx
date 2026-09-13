import type { TextareaHTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

/// The multi-line twin of Input, with the same border, radius and focus ring.
/// A textarea styled at the call site drifts from the inputs beside it within
/// two screens.
export function Textarea({ className, rows = 3, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...rest}
      rows={rows}
      className={cn(
        'w-full rounded-(--radius-control) border border-line bg-surface px-3 py-2',
        'text-body text-ink placeholder:text-ink-muted',
        'transition-colors focus:border-brand-500 aria-[invalid=true]:border-danger-600',
        className,
      )}
    />
  );
}
