'use client';

import { useTranslations } from 'next-intl';

import { useCurrentUser } from '@/entities/session';
import { LogoutButton } from '@/features/auth-logout';
import { Link } from '@/shared/i18n';
import { Logo, Skeleton } from '@/shared/ui';

/// Header for the workspace. Shows the company name so the customer always
/// knows whose data they are looking at, and the sign-out control.
export function AppHeader() {
  const t = useTranslations('workspace.header');
  const { data, isLoading } = useCurrentUser();

  return (
    <header className="border-b border-line bg-surface">
      <div className="mx-auto flex w-full max-w-[1600px] items-center justify-between gap-4 px-6 py-5">
        <Link href="/invoices" aria-label={t('home')}>
          <Logo />
        </Link>

        <div className="flex items-center gap-3">
          {isLoading ? (
            <Skeleton className="h-5 w-32" />
          ) : data ? (
            <span className="hidden text-sm text-ink-muted sm:inline">{data.companyName}</span>
          ) : null}

          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
