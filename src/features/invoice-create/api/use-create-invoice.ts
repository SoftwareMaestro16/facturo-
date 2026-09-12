'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { invoiceListQueryKey } from '@/entities/invoice';
import { invoicesControllerCreate } from '@/shared/api/generated/invoices/invoices';
import type { CreateInvoiceDto } from '@/shared/api/generated/model';

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateInvoiceDto) => invoicesControllerCreate(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: invoiceListQueryKey({}).slice(0, 2) as unknown as ReadonlyArray<unknown>,
      });
    },
  });
}
