'use client';

import { useTranslations } from 'next-intl';
import { useCurrentUser } from '@/entities/session';
import { CompanyManager } from '@/features/company-manage';
import { Card, LocaleSwitcher } from '@/shared/ui';

export function AccountView({ onboarding = false }: { onboarding?: boolean }) {
  const t = useTranslations('account');
  const { data: user } = useCurrentUser();
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-2 py-6 sm:px-4">
      <header>
        <p className="mb-2 text-sm text-ink-muted">{t('eyebrow')}</p>
        <h1 className="text-3xl">{t(onboarding ? 'welcome' : 'title')}</h1>
        <p className="mt-3 text-ink-muted">{t(onboarding ? 'intro' : 'description')}</p>
      </header>
      <Card>
        <h2 className="text-lg">{user?.fullName}</h2>
        <p className="mt-1 break-all text-ink-muted">{user?.email}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <span>{t('language')}</span>
          <LocaleSwitcher />
        </div>
      </Card>
      <CompanyManager />
    </div>
  );
}
