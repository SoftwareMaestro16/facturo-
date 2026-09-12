import type { InvoiceStatus } from './types';

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger';

/// One mapping from status to colour, used by the badge, the table row and the
/// filter chips, so a rejected invoice is never amber in one place and red in
/// another.
const TONES: Record<InvoiceStatus, Tone> = {
  DRAFT: 'neutral',
  SIGNING: 'warning',
  SENT: 'brand',
  DELIVERED: 'brand',
  ACCEPTED: 'success',
  REJECTED: 'danger',
  CANCELLED: 'neutral',
  ERROR: 'danger',
};

export function toneForStatus(status: InvoiceStatus): Tone {
  return TONES[status];
}
