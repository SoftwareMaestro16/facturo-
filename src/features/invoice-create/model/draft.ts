import type { InvoiceValues } from './schema';

/// A proposal for the form from outside it — today the AI assistant. Kept to
/// the fields the form owns, so the assistant's wire format can change without
/// touching the form.
export interface InvoiceDraft {
  counterpartyId: string | null;
  notes: string | null;
  lines: { name: string; quantity: string; priceNet: string | null; vatRate: '20' | '8' | '0' }[];
}

/// Replaces the lines, and fills the buyer and the note only where the draft has
/// them: a buyer the person already picked is not wiped by a draft that could
/// not recognise one. The issue date and cycle are never the draft's to decide.
export function applyDraft(current: InvoiceValues, draft: InvoiceDraft): InvoiceValues {
  return {
    ...current,
    counterpartyId: draft.counterpartyId ?? current.counterpartyId,
    notes: draft.notes ?? current.notes,
    lines: draft.lines.map((line) => ({
      name: line.name,
      quantity: line.quantity,
      priceNet: line.priceNet ?? '',
      vatRate: line.vatRate,
      unit: 'H87',
    })),
  };
}
