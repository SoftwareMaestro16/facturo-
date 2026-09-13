import type { ReactNode } from 'react';

import { AppFooter } from '@/widgets/app-footer';
import { AppHeader } from '@/widgets/app-header';
import { AppNav } from '@/widgets/app-sidebar';
import { SessionBoundary } from '@/entities/session';

/// Wraps every workspace route. Sticky header on top; navigation in a side
/// column from tablet width and in a bottom bar on a phone. The aside turns
/// into `display: contents` on a phone so the fixed bottom bar inside it is not
/// hidden along with an empty column. Bottom padding keeps the last row of any
/// page clear of that bar.
export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <SessionBoundary>
      <div className="workspace-theme relative flex min-h-dvh flex-col bg-surface-sunken">
        <div
          aria-hidden="true"
          className="workspace-backdrop pointer-events-none absolute inset-x-0 top-0 h-96"
        />
        <AppHeader />

        <div className="relative mx-auto flex w-full max-w-[1600px] flex-1 gap-6 px-0 pt-2 pb-24 sm:px-6 sm:pt-6 sm:pb-10">
          <aside className="max-sm:contents sm:sticky sm:top-22 sm:h-fit sm:w-60 sm:shrink-0 sm:rounded-(--radius-card) sm:border sm:border-line sm:bg-surface sm:p-2">
            <AppNav />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-10">
            <main className="min-w-0 flex-1">{children}</main>
            <AppFooter />
          </div>
        </div>
      </div>
    </SessionBoundary>
  );
}
