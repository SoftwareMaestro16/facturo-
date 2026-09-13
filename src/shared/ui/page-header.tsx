import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  /// One sentence on what this screen is for. Optional, but a screen a person
  /// opens rarely should say why they are here.
  description?: string;
  /// The screen's one primary action, plus at most one secondary.
  actions?: ReactNode;
  /// A back link, rendered above the title.
  back?: ReactNode;
}

/// Every workspace screen starts the same way, so the eye learns where the
/// title and the main action are and stops looking for them.
export function PageHeader({ title, description, actions, back }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      {back}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl leading-tight">{title}</h1>
          {description ? <p className="mt-2 max-w-2xl text-body text-ink-muted">{description}</p> : null}
        </div>
        {actions ? <div className="flex shrink-0 flex-col gap-2 sm:flex-row">{actions}</div> : null}
      </div>
    </header>
  );
}
