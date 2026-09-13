import { Badge } from '@/shared/ui';

import { toneForStatus } from '../model/status-tone';
import type { InvoiceDirection, InvoiceStatus } from '../model/types';
import { useInvoiceStatusLabel } from '../model/use-status-label';

export function InvoiceStatusBadge({
  status,
  direction = 'OUTGOING',
}: {
  status: InvoiceStatus;
  direction?: InvoiceDirection;
}) {
  const label = useInvoiceStatusLabel();

  return <Badge tone={toneForStatus(status)}>{label(status, direction)}</Badge>;
}
