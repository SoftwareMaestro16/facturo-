'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { counterpartiesQueryKey } from '@/entities/counterparty';
import { counterpartiesControllerCreate } from '@/shared/api/generated/counterparties/counterparties';
import type { CreateCounterpartyDto } from '@/shared/api/generated/model';

export function useCreateCounterparty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateCounterpartyDto) => counterpartiesControllerCreate(dto),
    onSuccess: async () => {
      // Every counterparties query — with any filter — has to reload.
      await queryClient.invalidateQueries({
        queryKey: counterpartiesQueryKey({}).slice(0, 2) as unknown as ReadonlyArray<unknown>,
      });
    },
  });
}
