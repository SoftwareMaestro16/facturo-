import { describe, expect, it } from 'vitest';

import { REASON_MAX_LENGTH, checkReason } from './reason';

describe('checkReason', () => {
  it('accepts a short sentence', () => {
    expect(checkReason('Cantitatea nu corespunde')).toBeNull();
  });

  it('treats whitespace as nothing written', () => {
    expect(checkReason('   \n ')).toBe('empty');
    expect(checkReason('')).toBe('empty');
  });

  it('stops at the length the server accepts', () => {
    expect(checkReason('x'.repeat(REASON_MAX_LENGTH))).toBeNull();
    expect(checkReason('x'.repeat(REASON_MAX_LENGTH + 1))).toBe('tooLong');
  });
});
