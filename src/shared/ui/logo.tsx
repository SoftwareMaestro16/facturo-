import { cn } from '@/shared/lib';

interface LogoProps {
  className?: string;
  /// For placement on a dark surface, such as the landing hero. Swaps the ink
  /// colour for white; the brand letter stays the same accent in both cases,
  /// since it is saturated enough to read on black.
  inverted?: boolean;
}

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <span className={className}>
      <span className={cn('text-lg font-extrabold tracking-[-0.03em]', inverted ? 'text-white' : 'text-ink')}>
        factur
      </span>
      <span className="text-lg font-extrabold tracking-[-0.03em] text-brand-600">o</span>
    </span>
  );
}
