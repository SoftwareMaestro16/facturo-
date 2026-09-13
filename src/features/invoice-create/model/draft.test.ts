import { describe, expect, it } from 'vitest';

import { applyDraft } from './draft';
import type { InvoiceValues } from './schema';

const current: InvoiceValues = {
  cycle: 'LONG',
  issueDate: '2026-09-13',
  counterpartyId: 'picked-by-hand',
  notes: 'keep me',
  lines: [{ name: '', quantity: '1', priceNet: '', vatRate: '20', unit: 'H87' }],
};

describe('applyDraft', () => {
  it('replaces the lines and leaves an unknown price empty for the person to fill', () => {
    const next = applyDraft(current, {
      counterpartyId: 'b1',
      notes: null,
      lines: [{ name: 'Consultanță', quantity: '2', priceNet: null, vatRate: '8' }],
    });

    expect(next.lines).toEqual([
      { name: 'Consultanță', quantity: '2', priceNet: '', vatRate: '8', unit: 'H87' },
    ]);
    expect(next.counterpartyId).toBe('b1');
  });

  it('never wipes a buyer or a note the draft did not recognise', () => {
    const next = applyDraft(current, { counterpartyId: null, notes: null, lines: [] });

    expect(next.counterpartyId).toBe('picked-by-hand');
    expect(next.notes).toBe('keep me');
    expect(next.issueDate).toBe('2026-09-13');
  });
});
