import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  /// What to do next, in a sentence. "No data" on its own leaves the customer
  /// wondering whether the product is broken.
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-(--radius-card) border border-dashed border-line px-6 py-12 text-center">
      <h3 className="text-lg font-bold text-ink">{title}</h3>
      <p className="max-w-sm text-body text-ink-muted">{description}</p>
      {action}
    </div>
  );
}
