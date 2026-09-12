'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authControllerRegister } from '@/shared/api/generated/auth/auth';
import type { RegisterDto } from '@/shared/api/generated/model';

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: RegisterDto) => authControllerRegister(dto),
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
}
