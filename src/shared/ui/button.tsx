import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/shared/lib';

/// The variant list is closed. A new look for a button is a new variant here,
/// never a className at the call site — that is how a design system stops being
/// one.
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size = 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-surface shadow-button hover:opacity-85 active:opacity-75',
  secondary: 'bg-surface text-ink border border-line hover:bg-surface-sunken',
  ghost: 'bg-transparent text-ink-muted hover:bg-surface-sunken hover:text-ink',
  danger: 'bg-danger-600 text-white hover:bg-danger-700',
  success: 'bg-success-600 text-white hover:bg-success-700',
};

/// 44px is the floor. The large size is for the mobile invoice form, used
/// standing up with one thumb.
const SIZES: Record<Size, string> = {
  md: 'h-(--size-control) px-4 text-body',
  lg: 'h-(--size-control-lg) px-6 text-body-lg',
};

/// The same look for a link that navigates. A `<button>` inside an `<a>` is
/// invalid HTML and announces twice to a screen reader, so links take the
/// classes instead of wrapping a button.
export function buttonClassName(variant: Variant = 'primary', size: Size = 'md', className?: string): string {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-(--radius-control) font-semibold',
    'transition-colors duration-150',
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled === true || isLoading}
      aria-busy={isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-(--radius-control) font-semibold',
        'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-55',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
