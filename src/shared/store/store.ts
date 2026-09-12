import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { baseApi } from '@/shared/api';

export const makeStore = () =>
  configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(baseApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

/// Enables refetch-on-focus and refetch-on-reconnect. An invoice list left open
/// on a second screen should not show yesterday's statuses.
export const enableQueryListeners = (store: AppStore) => setupListeners(store.dispatch);
