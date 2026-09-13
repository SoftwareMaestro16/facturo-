'use client';

import { useTranslations } from 'next-intl';

import type { InvoiceDirection, InvoiceStatus } from './types';

/// The same status means two different things depending on who sent the
/// document. "Primită" on an invoice the company issued says the buyer picked
/// it up; on an invoice a supplier sent it says the company still has to decide
/// about it. One hook so the badge and the filter above it never say different
/// words for the same row.
export function useInvoiceStatusLabel(): (status: InvoiceStatus, direction: InvoiceDirection) => string {
  const outgoing = useTranslations('invoice.status');
  const incoming = useTranslations('invoice.statusIncoming');

  return (status, direction) =>
    direction === 'INCOMING' && incoming.has(status) ? incoming(status) : outgoing(status);
}
