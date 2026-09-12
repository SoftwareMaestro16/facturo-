import { describe, expect, it } from 'vitest';

import { toneForStatus } from './status-tone';
import type { InvoiceStatus } from './types';

const ALL: InvoiceStatus[] = [
  'DRAFT',
  'SIGNING',
  'SENT',
  'DELIVERED',
  'ACCEPTED',
  'REJECTED',
  'CANCELLED',
  'ERROR',
];

describe('toneForStatus', () => {
  it('has a colour for every status the API can return', () => {
    for (const status of ALL) {
      expect(toneForStatus(status)).toBeTruthy();
    }
  });

  it('reads acceptance as success and both failure states as danger', () => {
    expect(toneForStatus('ACCEPTED')).toBe('success');
    expect(toneForStatus('REJECTED')).toBe('danger');
    expect(toneForStatus('ERROR')).toBe('danger');
  });
});
