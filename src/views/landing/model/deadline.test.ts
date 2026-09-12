import { describe, expect, it } from 'vitest';

import { daysUntilMandate } from './deadline';

describe('daysUntilMandate', () => {
  it('counts whole days remaining before the mandate', () => {
    expect(daysUntilMandate(new Date('2026-09-12T00:00:00+03:00'))).toBe(19);
  });

  it('goes to zero or below once the mandate is in force', () => {
    expect(daysUntilMandate(new Date('2026-10-01T00:00:00+03:00'))).toBe(0);
    expect(daysUntilMandate(new Date('2026-11-01T00:00:00+03:00'))).toBeLessThan(0);
  });
});
