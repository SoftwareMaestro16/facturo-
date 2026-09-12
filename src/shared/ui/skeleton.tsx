import { cn } from '@/shared/lib';

/// Loading shows the shape of what is coming, not an empty screen and not a
/// spinner covering the page.
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-(--radius-control) bg-line/70', className)} />;
}
