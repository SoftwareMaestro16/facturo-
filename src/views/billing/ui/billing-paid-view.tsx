'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { useSubscription } from '@/entities/subscription';
import { Link } from '@/shared/i18n';
import { Card, ErrorState, PageHeader, Skeleton, buttonClassName } from '@/shared/ui';

/// Where the payment page sends the browser back to. By the time this loads the
/// money has already been confirmed against the server, so the screen only has
/// to say so and get out of the way — no waiting, no spinner over the page.
export function BillingPaidView({ hasPayment }: { hasPayment: boolean }) {
  const t = useTranslations('billing.paid');
  const plans = useTranslations('billing.plans');
  const billing = useTranslations('billing');
  const { data: subscription, isLoading, isError, refetch } = useSubscription();

  if (!hasPayment) {
    return (
      <Layout title={t('missing.title')} description={t('missing.description')}>
        <Link href="/billing" className={buttonClassName('primary', 'lg', 'w-full sm:w-auto')}>
          {t('back')}
        </Link>
      </Layout>
    );
  }

  return (
    <Layout title={t('title')} description={t('description')}>
      <Card className="flex flex-col gap-3 sm:p-6">
        <h2 className="text-sm font-medium text-ink-muted">{billing('current.title')}</h2>
        {isError ? (
          <ErrorState
            message={billing('errors.load')}
            retryLabel={billing('errors.retry')}
            onRetry={() => {
              void refetch();
            }}
          />
        ) : isLoading || !subscription ? (
          <Skeleton className="h-8 w-48" />
        ) : (
          <p className="text-2xl font-bold text-ink">{plans(subscription.plan)}</p>
        )}
      </Card>

      <Link href="/billing" className={buttonClassName('primary', 'lg', 'w-full sm:w-auto')}>
        {t('back')}
      </Link>
    </Layout>
  );
}

function Layout({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader title={title} description={description} />
      {children}
    </div>
  );
}
