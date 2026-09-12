import type { ReactNode } from 'react';

import { AppHeader } from '@/widgets/app-header';
import { AppNav } from '@/widgets/app-sidebar';

/// Wraps every workspace route. Header on top, main navigation on the side at
/// desktop width and along the bottom on a phone. Kept as a server component:
/// the widgets below decide for themselves whether they need to be client.
export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface-sunken">
      <AppHeader />

      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 sm:flex-row">
        <aside className="w-full sm:w-56 sm:shrink-0">
          <AppNav />
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
