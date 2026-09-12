'use client';

import { useState } from 'react';
import { Provider } from 'react-redux';

import { enableQueryListeners, makeStore } from './store';

/// A store per client instance, created by a lazy state initialiser.
///
/// Two things this avoids. A store created at module scope on the server is
/// shared between requests, which leaks one company's cached invoices into
/// another user's first render. A store created in a ref has to be read during
/// render to be passed down, which React 19 rejects.
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [store] = useState(() => {
    const created = makeStore();
    enableQueryListeners(created);

    return created;
  });

  return <Provider store={store}>{children}</Provider>;
}
