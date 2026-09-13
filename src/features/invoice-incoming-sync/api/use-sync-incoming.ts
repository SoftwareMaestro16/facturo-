'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { invoiceQueryKeyRoot } from '@/entities/invoice';
import { incomingInvoicesControllerSync } from '@/shared/api/generated/invoices/invoices';

/// Asks the tax platform whether suppliers have sent anything new. Finding
/// nothing is the ordinary answer, not a failure: it returns how many documents
/// arrived, and zero is a number.
export function useSyncIncoming() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => (await incomingInvoicesControllerSync()).data,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: invoiceQueryKeyRoot });
    },
  });
}
