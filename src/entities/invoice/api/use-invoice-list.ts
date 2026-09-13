'use client';

import { useQuery } from '@tanstack/react-query';

import { invoicesControllerList } from '@/shared/api/generated/invoices/invoices';
import type { InvoicesControllerListParams } from '@/shared/api/generated/model';

/// The invoice list is what the customer sees most often, so it goes through a
/// tight wrapper that hands back the shape the screens want and nothing else.
/// The generated envelope stays inside `shared/api`.
export interface InvoiceListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  direction?: 'OUTGOING' | 'INCOMING';
  status?:
    'DRAFT' | 'SIGNED' | 'SENT' | 'RECEIVED' | 'FINISHED' | 'CANCELLATION_REQUESTED' | 'CANCELLED' | 'ERROR';
}

/// The prefix every invoice query shares. Anything that changes a document —
/// sending it, accepting one that came in — invalidates this one key, and both
/// the list and the summary above it refetch.
export const invoiceQueryKeyRoot = ['invoices'] as const;

export const invoiceListQueryKey = (params: InvoiceListParams) => ['invoices', 'list', params] as const;

export function useInvoiceList(params: InvoiceListParams = {}) {
  return useQuery({
    queryKey: invoiceListQueryKey(params),
    queryFn: async ({ signal }) => {
      const response = await invoicesControllerList(params as unknown as InvoicesControllerListParams, {
        signal,
      });

      return response.data;
    },
  });
}
