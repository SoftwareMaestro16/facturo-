'use client';

import { useMutation } from '@tanstack/react-query';

import type { PaidPlanCode } from '@/entities/subscription';
import { billingControllerCheckout } from '@/shared/api/generated/billing/billing';

/// Asks the server to open a payment for a plan. The answer is an address to
/// send the browser to; nothing is paid on our side, and no card detail ever
/// passes through this application.
export function useCheckout() {
  return useMutation({
    mutationFn: async (plan: PaidPlanCode) => (await billingControllerCheckout({ plan })).data,
  });
}
