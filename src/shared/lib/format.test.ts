import { describe, expect, it } from 'vitest';

import { formatDate, formatMoney, formatQuantity } from './format';

describe('formatMoney', () => {
  it('renders lei the way a Moldovan invoice does, not as an ISO code', () => {
    const formatted = formatMoney('850.00', 'ro');

    expect(formatted).toContain('850');
    expect(formatted).not.toContain('MDL');
  });

  it('always shows two decimals so a round amount still reads as money', () => {
    expect(formatMoney('25.00', 'ro')).toMatch(/25[.,]00/);
  });
});

describe('formatQuantity', () => {
  it('keeps up to three decimals and drops trailing noise', () => {
    expect(formatQuantity('2.500', 'ro')).toMatch(/2[.,]5$/);
    expect(formatQuantity('3', 'ro')).toBe('3');
  });
});

describe('formatDate', () => {
  it('uses day-first order in both interface languages', () => {
    expect(formatDate('2026-10-01', 'ro')).toMatch(/^01/);
    expect(formatDate('2026-10-01', 'ru')).toMatch(/^01/);
  });
});
