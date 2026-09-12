import type { InvoiceStatus } from './types';

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

/// One mapping from status to colour, used by the badge, the table row and the
/// filter chips, so a cancelled invoice is never amber in one place and red in
/// another.
///
/// Colour is never the only signal: each badge carries its own words as well,
/// for colour-blind readers and for anyone glancing at a phone in sunlight.
const TONES: Record<InvoiceStatus, Tone> = {
  DRAFT: 'neutral',
  SIGNED: 'warning',
  SENT: 'brand',
  RECEIVED: 'brand',
  FINISHED: 'success',
  CANCELLATION_REQUESTED: 'warning',
  CANCELLED: 'neutral',
  ERROR: 'danger',
};

export function toneForStatus(status: InvoiceStatus): Tone {
  return TONES[status];
}

/// Whether the customer still has something to do with this document. Drives
/// the "needs your attention" filter, which is the first thing most people open.
export function needsAttention(status: InvoiceStatus): boolean {
  return status === 'DRAFT' || status === 'ERROR' || status === 'CANCELLATION_REQUESTED';
}
