'use client';

import { useTranslations } from 'next-intl';

import { PLAN_ORDER, nextPlanAfter, useSubscription } from '@/entities/subscription';
import { ErrorState, PageHeader } from '@/shared/ui';

import { CurrentPlanCard, CurrentPlanCardSkeleton } from './current-plan-card';
import { PlanCard, PlanCardSkeleton } from './plan-card';

/// Plan and payment. There is no empty state here: every company is given the
/// free plan the moment it is created, so the screen has a loading shape, a
/// failure sentence and the answer.
///
/// The prices in messages/*.json mirror the server's plan table
/// (`modules/billing/model/plans.ts`). They are shown here because asking
/// someone to press a pay button without saying what it costs is not something
/// this product does; if a price changes there, it changes here in the same
/// commit.
export function BillingView() {
  const t = useTranslations('billing');
  const { data: subscription, isLoading, isError, refetch } = useSubscription();

  if (isError) {
    return (
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
        <PageHeader title={t('title')} description={t('intro')} />
        <ErrorState
          message={t('errors.load')}
          retryLabel={t('errors.retry')}
          onRetry={() => {
            void refetch();
          }}
        />
      </div>
    );
  }

  const recommended = subscription ? nextPlanAfter(subscription.plan) : null;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader title={t('title')} description={t('intro')} />

      {isLoading || !subscription ? (
        <>
          <CurrentPlanCardSkeleton />
          <ul className="grid gap-3 lg:grid-cols-3">
            {PLAN_ORDER.map((plan) => (
              <PlanCardSkeleton key={plan} />
            ))}
          </ul>
        </>
      ) : (
        <>
          <CurrentPlanCard subscription={subscription} />
          <ul className="grid gap-3 lg:grid-cols-3">
            {PLAN_ORDER.map((plan) => (
              <PlanCard
                key={plan}
                plan={plan}
                currentPlan={subscription.plan}
                isRecommended={plan === recommended}
              />
            ))}
          </ul>
        </>
      )}

      <p className="max-w-2xl text-sm leading-6 text-ink-muted">{t('cardNote')}</p>
    </div>
  );
}
