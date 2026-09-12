'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { invoicesControllerPreview } from '@/shared/api/generated/invoices/invoices';
import type { InvoiceLineDto } from '@/shared/api/generated/model';

/// Recomputes totals on the server as the customer types. Debounced by
/// `enabled`: the form only triggers this once every line is filled in enough
/// to be a valid payload.
export function usePreviewTotals(lines: readonly Partial<InvoiceLineDto>[]) {
  return useQuery({
    queryKey: ['invoices', 'preview', lines],
    queryFn: async ({ signal }) => {
      const response = await invoicesControllerPreview({ lines: lines as InvoiceLineDto[] }, { signal });

      return response.data;
    },
    enabled: lines.length > 0 && lines.every((line) => line.priceNet && line.quantity),
    // Keep the previous totals on screen while the new ones are computed, so
    // numbers do not blink to zero every keystroke.
    placeholderData: keepPreviousData,
    staleTime: 0,
  });
}
