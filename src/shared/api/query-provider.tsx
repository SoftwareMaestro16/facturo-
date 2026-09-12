'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { getQueryClient } from './query-client';

/// Created by a lazy state initialiser rather than at module scope or in a ref.
/// Module scope shares one cache between users on the server; a ref has to be
/// read during render to be passed down, which React 19 rejects.
export function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(getQueryClient);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
