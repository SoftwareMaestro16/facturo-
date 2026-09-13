'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { sessionDestination } from '@/entities/session';
import { ApiError } from '@/shared/api';
import { googleControllerAuthenticate } from '@/shared/api/generated/auth/auth';
import { LEGAL_VERSION } from '@/shared/config';
import { useRouter } from '@/shared/i18n';
import { GoogleButton } from '@/shared/ui';

/// One button for sign-in and registration alike: Google already tells the
/// server whether this person is new.
export function GoogleAuth() {
  const t = useTranslations('auth.google');
  const router = useRouter();
  const cache = useQueryClient();
  const [error, setError] = useState('');

  const mutation = useMutation({
    mutationFn: (code: string) =>
      googleControllerAuthenticate(
        { code, termsVersion: LEGAL_VERSION },
        { headers: { 'X-Requested-With': 'XMLHttpRequest' } },
      ),
    onSuccess: async (response) => {
      if (!response.data) throw new Error('Missing session');
      await cache.cancelQueries();
      cache.clear();
      router.replace(sessionDestination(response.data));
      router.refresh();
    },
    onError: (cause) => {
      const code = cause instanceof ApiError ? cause.code : 'generic';
      setError(t.has(code) ? t(code) : t('generic'));
    },
  });

  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) return null;

  return (
    <div className="flex flex-col gap-3">
      <GoogleButton
        disabled={mutation.isPending}
        onCode={(code) => {
          setError('');
          mutation.mutate(code);
        }}
        onError={() => setError(t('generic'))}
      />
      {mutation.isPending ? (
        <p role="status" className="text-sm text-white/60">
          {t('loading')}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-danger-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
