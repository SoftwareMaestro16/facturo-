'use client';

import { useQuery } from '@tanstack/react-query';

import { ApiError } from '@/shared/api';
import { authControllerDescribe } from '@/shared/api/generated/auth/auth';

import type { CurrentUser } from '../model/types';

export const currentUserQueryKey = ['auth', 'me'] as const;

/// Reads /auth/me and returns null for a signed-out visitor, without spamming
/// the sign-in page with retries.
export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: async ({ signal }): Promise<CurrentUser | null> => {
      try {
        const response = await authControllerDescribe({ signal });

        return response.data;
      } catch (error) {
        // Not signed in is not an error to retry; the interface treats it as a
        // known state and redirects.
        if (error instanceof ApiError && error.status === 401) {
          return null;
        }

        throw error;
      }
    },
    // The current user does not change on its own during a browser tab's life.
    staleTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });
}
