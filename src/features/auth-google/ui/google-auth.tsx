'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { sessionDestination } from '@/entities/session';
import { ApiError } from '@/shared/api';
import { googleControllerAuthenticate, googleControllerChallenge } from '@/shared/api/generated/auth/auth';
import { LEGAL_VERSION } from '@/shared/config';
import { useRouter } from '@/shared/i18n';
import { Button, GoogleButton } from '@/shared/ui';

export function GoogleAuth({ mode }: { mode: 'login' | 'register' }) {
  const t = useTranslations('auth.google');
  const router = useRouter();
  const cache = useQueryClient();
  const [error, setError] = useState('');
  const enabled = Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  const challenge = useQuery({
    queryKey: ['google-challenge', mode],
    queryFn: () => googleControllerChallenge(),
    enabled,
    staleTime: 0,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation({
    mutationFn: (credential: string) =>
      googleControllerAuthenticate({ credential, termsVersion: LEGAL_VERSION }),
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
      if (code === 'google_invalid') void challenge.refetch();
    },
  });
  if (!enabled) return null;
  return (
    <div className="flex flex-col gap-4">
      <div className={mutation.isPending ? 'pointer-events-none opacity-60' : ''}>
        <GoogleButton
          nonce={challenge.data?.data.nonce ?? ''}
          onError={() => setError(t('generic'))}
          onCredential={(credential) => {
            if (!mutation.isPending) {
              setError('');
              mutation.mutate(credential);
            }
          }}
        />
      </div>
      {mutation.isPending ? <p role="status">{t('loading')}</p> : null}
      {error || challenge.isError ? (
        <div role="alert">
          <p className="text-danger-700">{error || t('generic')}</p>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setError('');
              void challenge.refetch();
            }}
          >
            {t('retry')}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
