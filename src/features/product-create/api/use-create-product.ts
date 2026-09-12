'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { productsQueryKey } from '@/entities/product';
import { productsControllerCreate } from '@/shared/api/generated/products/products';
import type { CreateProductDto } from '@/shared/api/generated/model';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateProductDto) => productsControllerCreate(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: productsQueryKey({}).slice(0, 2) as unknown as ReadonlyArray<unknown>,
      });
    },
  });
}
