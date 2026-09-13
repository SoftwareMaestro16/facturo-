'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { invoiceListQueryKey } from '@/entities/invoice';
import { invoiceExchangeControllerSubmit } from '@/shared/api/generated/invoices/invoices';

/// Sends a draft to the tax platform. The response is intentionally minimal —
/// success means the platform accepted it, the interface refetches the list.
export function useSendInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoiceExchangeControllerSubmit(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: invoiceListQueryKey({}).slice(0, 2) as unknown as ReadonlyArray<unknown>,
      });
    },
  });
}
