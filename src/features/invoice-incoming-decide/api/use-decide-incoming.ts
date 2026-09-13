'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { invoiceQueryKeyRoot } from '@/entities/invoice';
import {
  invoiceExchangeControllerAccept,
  invoiceExchangeControllerReject,
} from '@/shared/api/generated/invoices/invoices';

/// Signs a document a supplier sent. This is the buyer's half of the long
/// cycle: after it the document is finished and nobody has to touch it again.
export function useAcceptInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => invoiceExchangeControllerAccept(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: invoiceQueryKeyRoot });
    },
  });
}

/// Writes down that the company does not agree with a document. It stays here:
/// the tax platform has no action for a buyer refusing a document, so nothing
/// is sent anywhere and the document keeps the state the platform gave it.
export function useRejectInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      invoiceExchangeControllerReject(id, { reason }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: invoiceQueryKeyRoot });
    },
  });
}
