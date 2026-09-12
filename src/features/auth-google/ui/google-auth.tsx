'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { ApiError } from '@/shared/api';
import {
  googleControllerChallenge,
  googleControllerLogin,
  googleControllerRegister,
} from '@/shared/api/generated/auth/auth';
import { Link, useRouter } from '@/shared/i18n';
import { Button, Field, GoogleButton, Input } from '@/shared/ui';

export function GoogleAuth({ mode }: { mode: 'login' | 'register' }) {
  const t = useTranslations('auth.google');
  const locale = useLocale();
  const router = useRouter();
  const cache = useQueryClient();
  const [credential, setCredential] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [idno, setIdno] = useState('');
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
    mutationFn: async (token: string) => {
      if (mode === 'login') await googleControllerLogin({ credential: token });
      else
        await googleControllerRegister({
          credential: token,
          companyName: companyName.trim(),
          idno,
          locale: locale === 'ru' ? 'ru' : 'ro',
        });
    },
    onSuccess: async () => {
      await cache.invalidateQueries();
      router.push('/invoices');
    },
    onError: (cause) => {
      const code = cause instanceof ApiError ? cause.code : 'generic';
      setError(t.has(code) ? t(code) : t('generic'));
      if (code === 'google_invalid') {
        setCredential('');
        void challenge.refetch();
      }
    },
  });

  if (!enabled) return null;
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-line pb-6">
      {credential && mode === 'register' ? (
        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setError('');
            mutation.mutate(credential);
          }}
        >
          <p className="text-body text-ink-muted">{t('companyDetails')}</p>
          <Field label={t('companyName')} required>
            {(props) => (
              <Input
                {...props}
                required
                minLength={2}
                maxLength={200}
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                autoComplete="organization"
              />
            )}
          </Field>
          <Field label="IDNO" required>
            {(props) => (
              <Input
                {...props}
                required
                pattern="\d{13}"
                maxLength={13}
                inputMode="numeric"
                value={idno}
                onChange={(event) => setIdno(event.target.value)}
              />
            )}
          </Field>
          <Button type="submit" size="lg" isLoading={mutation.isPending}>
            {t('createCompany')}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setCredential('');
              setError('');
              void challenge.refetch();
            }}
          >
            {t('chooseAnother')}
          </Button>
        </form>
      ) : (
        <GoogleButton
          nonce={challenge.data?.data.nonce ?? ''}
          onError={() => setError(t('generic'))}
          onCredential={(token) => {
            setError('');
            if (mode === 'login') mutation.mutate(token);
            else setCredential(token);
          }}
        />
      )}
      {mutation.isPending ? <p role="status">{t('loading')}</p> : null}
      {error || challenge.isError ? (
        <div role="alert" className="text-sm text-danger-700">
          <p>{error || t('generic')}</p>
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
          {mode === 'login' ? (
            <Link href="/register" className="underline">
              {t('register')}
            </Link>
          ) : null}
        </div>
      ) : null}
      <p className="text-sm text-ink-muted">{t('orEmail')}</p>
    </div>
  );
}
