import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { env } from '@/shared/config/env';

/// The single RTK Query endpoint container.
///
/// No endpoint is written here by hand. `npm run api:generate` reads the
/// server's OpenAPI document and injects every endpoint, its arguments and its
/// response type into this slice. That keeps one definition of the contract
/// instead of two that drift, and means adding a server route costs a codegen
/// run rather than a hand-written fetch wrapper plus a hand-copied type.
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: env.apiUrl,
    // Auth is httpOnly cookies; there is no token for JavaScript to attach.
    credentials: 'include',
  }),
  tagTypes: ['Invoice', 'Counterparty', 'Product', 'Company', 'Subscription', 'Session'],
  endpoints: () => ({}),
});
