'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authControllerLogin } from '@/shared/api/generated/auth/auth';
import type { LoginDto } from '@/shared/api/generated/model';

/// Wraps the generated mutation so the login screen does not depend on the
/// generated names, and so success invalidates the cached "who am I" query.
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: LoginDto) => authControllerLogin(dto),
    onSuccess: async () => {
      // The session changed; any cached data about the current user must go.
      await queryClient.invalidateQueries();
    },
  });
}
