'use client';

import { useTranslations } from 'next-intl';

import { useCurrentUser } from '@/entities/session';
import { ExportDataButton } from '@/features/account-export';
import { CompanyManager } from '@/features/company-manage';
import { Link } from '@/shared/i18n';
import { Card, LocaleSwitcher, PageHeader, Skeleton } from '@/shared/ui';

export function AccountView({ onboarding = false }: { onboarding?: boolean }) {
  const t = useTranslations('account');
  const { data: user, isLoading } = useCurrentUser();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader
        title={t(onboarding ? 'welcome' : 'title')}
        description={t(onboarding ? 'intro' : 'description')}
      />

      <Card className="flex flex-col gap-5 sm:p-6">
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Skeleton className="size-14 rounded-full" />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-full bg-ink text-xl font-bold text-surface"
            >
              {user?.fullName.trim().charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            {isLoading ? (
              <Skeleton className="h-5 w-40" />
            ) : (
              <>
                <h2 className="truncate text-lg">{user?.fullName}</h2>
                <p className="break-all text-ink-muted">{user?.email}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <span className="font-medium">{t('language')}</span>
          <LocaleSwitcher />
        </div>
      </Card>

      <CompanyManager />

      <Card className="flex flex-col gap-3 sm:p-6">
        <h2 className="text-lg">{t('export.title')}</h2>
        <p className="text-ink-muted">{t('export.description')}</p>
        <ExportDataButton />
        <p className="text-sm text-ink-muted">
          {t.rich('export.privacy', {
            link: (chunks) => (
              <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </Card>
    </div>
  );
}
