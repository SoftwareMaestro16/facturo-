import type { ReactNode } from 'react';

import { AppHeader } from '@/widgets/app-header';
import { AppNav } from '@/widgets/app-sidebar';
import { SessionBoundary } from '@/entities/session';

/// Wraps every workspace route. Header on top, main navigation on the side at
/// desktop width and along the bottom on a phone. Kept as a server component:
/// the widgets below decide for themselves whether they need to be client.
export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <SessionBoundary>
      <div className="workspace-theme flex min-h-dvh flex-col bg-surface-sunken">
        <AppHeader />

        <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-4 py-6 sm:flex-row sm:px-6">
          <aside className="w-full rounded-3xl border border-line bg-surface p-3 sm:sticky sm:top-6 sm:h-fit sm:w-56 sm:shrink-0">
            <AppNav />
          </aside>

          <main className="min-w-0 flex-1 rounded-3xl border border-line bg-surface/90">{children}</main>
        </div>
      </div>
    </SessionBoundary>
  );
}
