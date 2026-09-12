'use client';

import { useDispatch, useSelector, useStore } from 'react-redux';

import type { AppDispatch, AppStore, RootState } from './store';

/// Typed replacements for the react-redux hooks. Using the untyped originals
/// puts `any` back into every component that touches the store.
///
/// Marked as client code because the server build of react-redux is a stripped
/// stub: pulling this module into a server component fails the production build
/// with "withTypes is not a function" rather than at any point in development.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
