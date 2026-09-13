import { describe, expect, it } from 'vitest';

import { isPaidPlan, isUpgrade, nextPlanAfter, remainingInvoices } from './plan-order';

describe('isUpgrade', () => {
  it('only counts a move to a larger plan', () => {
    expect(isUpgrade('FREE', 'STARTER')).toBe(true);
    expect(isUpgrade('FREE', 'BUSINESS')).toBe(true);
    expect(isUpgrade('STARTER', 'BUSINESS')).toBe(true);
  });

  it('refuses the same plan and anything smaller', () => {
    expect(isUpgrade('STARTER', 'STARTER')).toBe(false);
    expect(isUpgrade('BUSINESS', 'STARTER')).toBe(false);
    expect(isUpgrade('STARTER', 'FREE')).toBe(false);
  });
});

describe('nextPlanAfter', () => {
  it('names the plan one step up', () => {
    expect(nextPlanAfter('FREE')).toBe('STARTER');
    expect(nextPlanAfter('STARTER')).toBe('BUSINESS');
  });

  it('has nothing above the largest plan', () => {
    expect(nextPlanAfter('BUSINESS')).toBeNull();
  });
});

describe('isPaidPlan', () => {
  it('leaves the free plan without a pay button', () => {
    expect(isPaidPlan('FREE')).toBe(false);
    expect(isPaidPlan('STARTER')).toBe(true);
  });
});

describe('remainingInvoices', () => {
  it('counts down from the monthly allowance', () => {
    expect(remainingInvoices(10, 3)).toBe(7);
  });

  it('never goes below zero, even after a mid-month plan change', () => {
    expect(remainingInvoices(10, 14)).toBe(0);
  });

  it('reports no number at all when the plan has no limit', () => {
    expect(remainingInvoices(null, 120)).toBeNull();
  });
});
