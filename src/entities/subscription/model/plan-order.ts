import type { PaidPlanCode, PlanCode } from './types';

/// Plans from smallest to largest. One order, used by the cards, by the choice
/// of which card carries the single primary button, and by the check below —
/// so a plan never counts as an upgrade on one screen and a downgrade on
/// another.
export const PLAN_ORDER: readonly PlanCode[] = ['FREE', 'STARTER', 'BUSINESS'];

/// The plans a customer can pay for. FREE needs no payment, so it never gets a
/// pay button.
export const PAID_PLANS: readonly PaidPlanCode[] = ['STARTER', 'BUSINESS'];

export function isPaidPlan(plan: PlanCode): plan is PaidPlanCode {
  return plan !== 'FREE';
}

/// True when `plan` sits above `current`. Moving down is not offered: the
/// server has no downgrade endpoint, and a button that cannot work is worse
/// than no button.
export function isUpgrade(current: PlanCode, plan: PlanCode): boolean {
  return PLAN_ORDER.indexOf(plan) > PLAN_ORDER.indexOf(current);
}

/// The one plan directly above the current one. It is the card that gets the
/// screen's single primary button; every other pay button is secondary.
export function nextPlanAfter(current: PlanCode): PlanCode | null {
  return PLAN_ORDER[PLAN_ORDER.indexOf(current) + 1] ?? null;
}

/// How many documents are left this month. `null` when the plan has no limit.
/// Never negative: a company that changed plans mid-month can sit above its
/// own allowance, and "-3 left" reads as a bug.
export function remainingInvoices(quota: number | null, used: number): number | null {
  if (quota === null) return null;

  return Math.max(quota - used, 0);
}
