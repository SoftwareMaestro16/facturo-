'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authControllerLogout } from '@/shared/api/generated/auth/auth';

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authControllerLogout(),
    onSuccess: () => {
      // Every cached value assumed a session that no longer exists.
      queryClient.clear();
    },
  });
}
