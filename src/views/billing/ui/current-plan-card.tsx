'use client';

import { useFormatter, useTranslations } from 'next-intl';

import { SubscriptionStatusBadge, remainingInvoices, type Subscription } from '@/entities/subscription';
import { Card, Skeleton } from '@/shared/ui';

/// The first thing the owner wants from this screen: which plan he is on and
/// how much of this month's allowance is gone. The loading twin below occupies
/// the same height, so nothing jumps when the answer arrives.
export function CurrentPlanCard({ subscription }: { subscription: Subscription }) {
  const t = useTranslations('billing.current');
  const plans = useTranslations('billing.plans');
  const format = useFormatter();

  const { invoiceQuota, invoicesUsed, status } = subscription;
  const left = remainingInvoices(invoiceQuota, invoicesUsed);
  const usedShare =
    invoiceQuota === null || invoiceQuota === 0 ? 0 : Math.min(invoicesUsed / invoiceQuota, 1);

  return (
    <Card className="flex flex-col gap-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium text-ink-muted">{t('title')}</h2>
        <SubscriptionStatusBadge status={status} />
      </div>

      <p className="text-2xl font-bold text-ink">{plans(subscription.plan)}</p>

      {invoiceQuota === null ? (
        <p className="text-body text-ink">{t('unlimited', { used: invoicesUsed })}</p>
      ) : (
        <div className="flex flex-col gap-2">
          <div aria-hidden="true" className="h-2 w-full overflow-hidden rounded-full bg-surface-sunken">
            <div className="h-full rounded-full bg-ink" style={{ width: `${usedShare * 100}%` }} />
          </div>
          <p className="text-body text-ink">{t('used', { used: invoicesUsed, total: invoiceQuota })}</p>
          {left !== null && left > 0 ? (
            <p className="text-sm text-ink-muted">{t('left', { count: left })}</p>
          ) : null}
        </div>
      )}

      <p className="text-sm text-ink-muted">
        {t('renews', {
          date: format.dateTime(new Date(subscription.currentPeriodEnd), { dateStyle: 'short' }),
        })}
      </p>

      {left === 0 ? <p className="text-body text-ink">{t('exhausted')}</p> : null}
      {status === 'PAST_DUE' ? <p className="text-body text-danger-700">{t('pastDue')}</p> : null}
    </Card>
  );
}

export function CurrentPlanCardSkeleton() {
  return (
    <Card className="flex flex-col gap-4 sm:p-6">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-2 w-full" />
      <Skeleton className="h-5 w-56" />
      <Skeleton className="h-4 w-44" />
    </Card>
  );
}
