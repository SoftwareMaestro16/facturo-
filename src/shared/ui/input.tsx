import type { InputHTMLAttributes } from 'react';

import { cn } from '@/shared/lib';

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className={cn(
        'h-(--size-control) w-full rounded-(--radius-control) border border-line bg-surface px-3',
        'text-body text-ink placeholder:text-ink-muted',
        'transition-colors focus:border-brand-500 aria-[invalid=true]:border-danger-600',
        className,
      )}
    />
  );
}
