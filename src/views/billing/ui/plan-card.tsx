'use client';

import { useTranslations } from 'next-intl';

import { isPaidPlan, isUpgrade, type PlanCode } from '@/entities/subscription';
import { CheckoutButton } from '@/features/billing-checkout';
import { cn } from '@/shared/lib';
import { Badge, Skeleton } from '@/shared/ui';

interface PlanCardProps {
  plan: PlanCode;
  currentPlan: PlanCode;
  /// The one card allowed to carry the screen's primary button: the plan
  /// directly above the current one.
  isRecommended: boolean;
}

/// One plan, with its price, what it allows, and — unless the company is
/// already on it — a button to move to it.
export function PlanCard({ plan, currentPlan, isRecommended }: PlanCardProps) {
  const t = useTranslations('billing');
  const isCurrent = plan === currentPlan;
  const canBuy = isPaidPlan(plan) && isUpgrade(currentPlan, plan);

  return (
    <li
      className={cn(
        'flex flex-col gap-3 rounded-(--radius-card) border bg-surface p-5 sm:p-6',
        isCurrent ? 'border-ink bg-surface-sunken' : 'border-line',
      )}
    >
      <h3 className="text-xl font-bold text-ink">{t(`plans.${plan}`)}</h3>
      <p className="text-lg font-semibold text-ink">{t(`price.${plan}`)}</p>
      <p className="text-body text-ink">{t(`allowance.${plan}`)}</p>
      <p className="text-body leading-7 text-ink-muted">{t(`details.${plan}`)}</p>

      <div className="mt-auto pt-2">
        {isCurrent ? (
          <Badge tone="brand">{t('currentBadge')}</Badge>
        ) : canBuy ? (
          <CheckoutButton plan={plan} planName={t(`plans.${plan}`)} isPrimary={isRecommended} />
        ) : (
          <p className="text-sm text-ink-muted">{t('includedBelow')}</p>
        )}
      </div>
    </li>
  );
}

export function PlanCardSkeleton() {
  return (
    <li className="flex flex-col gap-3 rounded-(--radius-card) border border-line bg-surface p-5 sm:p-6">
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-5 w-44" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="mt-auto h-(--size-control) w-full" />
    </li>
  );
}
