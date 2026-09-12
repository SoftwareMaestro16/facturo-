'use client';

import { useEffect, type ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/shared/i18n';
import { ErrorState, Skeleton } from '@/shared/ui';
import { useCurrentUser } from '../api/use-current-user';
import { sessionDestination } from '../model/destination';

/// Cookie presence is only an optimistic proxy check. NestJS decides validity.
export function SessionBoundary({
  children,
  guestOnly = false,
}: {
  children: ReactNode;
  guestOnly?: boolean;
}) {
  const session = useCurrentUser();
  const { refetch } = session;
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations('session');
  const destination = !session.data ? '/login' : sessionDestination(session.data);
  const needsCompany = !['/onboarding', '/settings'].includes(path);
  const redirect =
    !session.isPending &&
    !session.isError &&
    (guestOnly ? Boolean(session.data) : !session.data || (needsCompany && !session.data.companyId));

  useEffect(() => {
    if (redirect) router.replace(destination);
  }, [redirect, router, destination]);
  useEffect(() => {
    const recheck = () => {
      void refetch();
    };
    window.addEventListener('pageshow', recheck);
    const sync = (event: StorageEvent) => {
      if (event.key === 'facturo-session') window.location.reload();
    };
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('pageshow', recheck);
      window.removeEventListener('storage', sync);
    };
  }, [refetch]);

  if (session.isError)
    return (
      <div className="mx-auto max-w-md p-6">
        <ErrorState
          message={t('error')}
          retryLabel={t('retry')}
          onRetry={() => {
            void session.refetch();
          }}
        />
      </div>
    );
  if (session.isPending || redirect)
    return (
      <div className="mx-auto w-full max-w-md p-8" role="status">
        <p className="mb-4 text-ink-muted">{t('loading')}</p>
        <Skeleton className="h-32 w-full" />
      </div>
    );
  return children;
}
