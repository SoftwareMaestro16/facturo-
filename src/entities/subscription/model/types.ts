/// The words the interface uses about what a company pays for.
///
/// The plan codes match the server's plan table (`modules/billing/model/plans.ts`)
/// because the customer's payment, his invoice allowance and this screen all
/// have to mean the same thing. What he *reads* is plain language; see
/// messages/*.json.

export type PlanCode = 'FREE' | 'STARTER' | 'BUSINESS';

/// The plans that cost money. FREE is given to every company on sign-up and
/// never goes through a payment.
export type PaidPlanCode = Exclude<PlanCode, 'FREE'>;

export type SubscriptionStatus =
  /// Paid for, or free, and working.
  | 'ACTIVE'
  /// The renewal did not go through. Old documents stay; new ones are blocked.
  | 'PAST_DUE'
  /// Stopped, by the customer or by us.
  | 'CANCELLED';

export interface Subscription {
  plan: PlanCode;
  status: SubscriptionStatus;
  /// How many documents this plan allows per month. `null` means no limit.
  invoiceQuota: number | null;
  invoicesUsed: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}
