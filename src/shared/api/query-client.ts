import { QueryClient, isServer } from '@tanstack/react-query';

import { ApiError } from './custom-fetch';

/// A client with defaults chosen for this product rather than for a demo.
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Invoice statuses change on the tax platform's schedule, not ours, so
        // data goes stale quickly. A minute is short enough to feel live and
        // long enough to survive a person tabbing back and forth.
        staleTime: 60 * 1000,
        retry: (failureCount, error) =>
          // Retrying a 4xx repeats a request the server already refused. Only a
          // network or server failure is worth trying again, and twice is
          // enough before telling the person something is wrong.
          !(error instanceof ApiError && error.status < 500) && failureCount < 2,
        refetchOnWindowFocus: true,
      },
      mutations: {
        // Sending a fiscal document twice is worse than sending it once and
        // failing. Mutations never retry on their own.
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

/// One client per request on the server, one shared client in the browser.
///
/// A module-level client on the server is shared between users, which leaks one
/// company's cached invoices into another's first render.
export function getQueryClient(): QueryClient {
  if (isServer) {
    return makeQueryClient();
  }

  browserQueryClient ??= makeQueryClient();

  return browserQueryClient;
}
