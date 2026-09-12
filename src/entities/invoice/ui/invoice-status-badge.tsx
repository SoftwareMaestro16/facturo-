import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/ui';

import { toneForStatus } from '../model/status-tone';
import type { InvoiceStatus } from '../model/types';

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const t = useTranslations('invoice.status');

  return <Badge tone={toneForStatus(status)}>{t(status)}</Badge>;
}
