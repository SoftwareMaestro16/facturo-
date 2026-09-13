import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib';
import { Card, PageHeader } from '@/shared/ui';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function BillingPage() {
  const t = await getTranslations('billing');

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader title={t('title')} description={t('intro')} />
      <ul className="grid gap-3 lg:grid-cols-3">
        {(['FREE', 'STARTER', 'BUSINESS'] as const).map((plan) => (
          <li
            key={plan}
            className={cn(
              'flex flex-col gap-4 rounded-(--radius-card) border bg-surface p-5 sm:p-6',
              plan === 'STARTER' ? 'border-ink-muted' : 'border-line',
            )}
          >
            <span className="text-xs font-semibold tracking-widest text-ink-muted">{plan}</span>
            <h2 className="text-2xl">{t(`plans.${plan}`)}</h2>
            <p className="text-body leading-7 text-ink-muted">{t(`details.${plan}`)}</p>
            <span className="mt-auto rounded-full border border-line px-3 py-2 text-center text-sm text-ink-muted">
              {t('preview')}
            </span>
          </li>
        ))}
      </ul>
      <Card className="sm:p-6">
        <h2 className="text-lg">{t('payments')}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-ink-muted">{t('unavailable')}</p>
      </Card>
    </div>
  );
}
