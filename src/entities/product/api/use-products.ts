'use client';

import { useQuery } from '@tanstack/react-query';

import { productsControllerList } from '@/shared/api/generated/products/products';
import type { ProductsControllerListParams } from '@/shared/api/generated/model';

export interface ProductsQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  includeArchived?: boolean;
}

export const productsQueryKey = (params: ProductsQuery) => ['products', 'list', params] as const;

export function useProducts(params: ProductsQuery = {}) {
  return useQuery({
    queryKey: productsQueryKey(params),
    queryFn: async ({ signal }) => {
      const response = await productsControllerList(params as unknown as ProductsControllerListParams, {
        signal,
      });

      return response.data;
    },
  });
}
