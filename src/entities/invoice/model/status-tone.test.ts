import { describe, expect, it } from 'vitest';

import { needsAttention, toneForStatus } from './status-tone';
import type { InvoiceStatus } from './types';

const ALL: InvoiceStatus[] = [
  'DRAFT',
  'SIGNED',
  'SENT',
  'RECEIVED',
  'FINISHED',
  'CANCELLATION_REQUESTED',
  'CANCELLED',
  'ERROR',
];

describe('toneForStatus', () => {
  it('has a colour for every status the API can return', () => {
    for (const status of ALL) {
      expect(toneForStatus(status)).toBeTruthy();
    }
  });

  it('reads a finished document as success and a failed send as danger', () => {
    expect(toneForStatus('FINISHED')).toBe('success');
    expect(toneForStatus('ERROR')).toBe('danger');
  });
});

describe('needsAttention', () => {
  it('picks out the documents the customer still has to do something about', () => {
    expect(needsAttention('DRAFT')).toBe(true);
    expect(needsAttention('ERROR')).toBe(true);
    expect(needsAttention('CANCELLATION_REQUESTED')).toBe(true);
  });

  it('leaves documents that are on their way or done alone', () => {
    expect(needsAttention('SENT')).toBe(false);
    expect(needsAttention('FINISHED')).toBe(false);
  });
});
