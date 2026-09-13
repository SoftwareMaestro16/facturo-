'use client';

import { useQuery } from '@tanstack/react-query';

import { billingControllerGetSubscription } from '@/shared/api/generated/billing/billing';
import type { SubscriptionResponse } from '@/shared/api/generated/model';

import type { Subscription } from '../model/types';

export const subscriptionQueryKey = ['billing', 'subscription'] as const;

/// What the company pays for right now. Every screen that mentions the plan
/// reads this one query, so the plan on the billing page and the plan on the
/// payment-return page can never disagree.
export function useSubscription() {
  return useQuery({
    queryKey: subscriptionQueryKey,
    queryFn: async ({ signal }) => toSubscription((await billingControllerGetSubscription({ signal })).data),
  });
}

/// The contract sends "no limit" as a JSON null, which the generated types
/// widen to an object. Narrowing it here keeps the rest of the client working
/// with a plain `number | null`.
function toSubscription(response: SubscriptionResponse): Subscription {
  const quota: unknown = response.invoiceQuota;

  return {
    plan: response.plan,
    status: response.status,
    invoiceQuota: typeof quota === 'number' ? quota : null,
    invoicesUsed: response.invoicesUsed,
    currentPeriodStart: response.currentPeriodStart,
    currentPeriodEnd: response.currentPeriodEnd,
  };
}
