'use client';

import { useQuery } from '@tanstack/react-query';

import { aiControllerStatus } from '@/shared/api/generated/ai/ai';

export const aiStatusQueryKey = ['ai', 'status'] as const;

/// Whether the assistant is connected, whether the owner turned it on, and how
/// much of today's limit is left. Read by the settings card and the invoice form.
export function useAiStatus() {
  return useQuery({
    queryKey: aiStatusQueryKey,
    queryFn: async ({ signal }) => (await aiControllerStatus({ signal })).data,
  });
}
