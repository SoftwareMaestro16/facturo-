'use client';

import { useTranslations } from 'next-intl';

import { ApiError } from '@/shared/api';

/// Turns whatever the server refused with into a sentence. The customer never
/// sees the code itself — it exists so the two sides can agree on which
/// sentence to show.
export function useErrorSentence(): (cause: unknown) => string {
  const t = useTranslations('invoiceIncoming.decide.errors');

  return (cause) => {
    const code = cause instanceof ApiError ? cause.code : 'generic';

    return t.has(code) ? t(code) : t('generic');
  };
}
