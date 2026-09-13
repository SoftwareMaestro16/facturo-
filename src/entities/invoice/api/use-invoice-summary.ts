'use client';

import { useQuery } from '@tanstack/react-query';

import { invoicesControllerSummary } from '@/shared/api/generated/invoices/invoices';

export const invoiceSummaryQueryKey = ['invoices', 'summary'] as const;

/// Shares the `invoices` key prefix with the list, so anything that invalidates
/// invoices after a create or a send refreshes these numbers too.
export function useInvoiceSummary() {
  return useQuery({
    queryKey: invoiceSummaryQueryKey,
    queryFn: async ({ signal }) => (await invoicesControllerSummary({ signal })).data,
  });
}
