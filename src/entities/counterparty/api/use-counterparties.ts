'use client';

import { useQuery } from '@tanstack/react-query';

import { counterpartiesControllerList } from '@/shared/api/generated/counterparties/counterparties';
import type { CounterpartiesControllerListParams } from '@/shared/api/generated/model';

export interface CounterpartiesQuery {
  page?: number;
  pageSize?: number;
  search?: string;
}

export const counterpartiesQueryKey = (params: CounterpartiesQuery) =>
  ['counterparties', 'list', params] as const;

export function useCounterparties(params: CounterpartiesQuery = {}) {
  return useQuery({
    queryKey: counterpartiesQueryKey(params),
    queryFn: async ({ signal }) => {
      const response = await counterpartiesControllerList(
        params as unknown as CounterpartiesControllerListParams,
        { signal },
      );

      return response.data;
    },
  });
}
