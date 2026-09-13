'use client';

import { useTranslations } from 'next-intl';

import { useCurrentUser } from '@/entities/session';
import { LogoutButton } from '@/features/auth-logout';
import { Link } from '@/shared/i18n';
import { LocaleSwitcher, Logo, Skeleton } from '@/shared/ui';

/// Header for the workspace. The logo leads back to the public site, the chip
/// names the company whose documents are on screen — a person switching
/// between two firms must never wonder which one they are about to invoice
/// from — and it opens the place where the company is switched.
export function AppHeader() {
  const t = useTranslations('workspace.header');
  const roles = useTranslations('companies.roles');
  const { data, isLoading } = useCurrentUser();

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/" aria-label={t('home')} className="rounded-(--radius-control) px-1 py-1">
            <Logo />
          </Link>
          <span aria-hidden="true" className="hidden h-5 w-px bg-line sm:block" />
          <span className="hidden text-sm text-ink-muted sm:inline">{t('cabinet')}</span>
        </div>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {isLoading ? (
            <Skeleton className="h-10 w-40" />
          ) : data?.companyName ? (
            <Link
              href="/settings"
              title={t('switchCompany')}
              className="flex min-h-(--size-control) min-w-0 items-center gap-2.5 rounded-full border border-line bg-surface-sunken py-1 pr-3 pl-1 transition-colors hover:border-ink-muted"
            >
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-surface"
              >
                {data.companyName.trim().charAt(0).toUpperCase()}
              </span>
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="max-w-36 truncate text-sm font-semibold text-ink sm:max-w-64">
                  {data.companyName}
                </span>
                <span className="hidden text-xs text-ink-muted sm:block">{roles(data.role)}</span>
              </span>
            </Link>
          ) : null}

          <LocaleSwitcher className="hidden md:flex" />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
