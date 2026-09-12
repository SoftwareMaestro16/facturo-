'use client';

import { useTranslations } from 'next-intl';

import { useRouter } from '@/shared/i18n';
import { Button } from '@/shared/ui';

import { useLogout } from '../api/use-logout';

/// A single button, because signing out is one action and a menu of one entry
/// is a menu that got in the way.
export function LogoutButton() {
  const t = useTranslations('auth.logout');
  const router = useRouter();
  const logout = useLogout();

  const runLogout = async () => {
    try {
      await logout.mutateAsync();
      try {
        localStorage.setItem('facturo-session', crypto.randomUUID());
      } catch {
        /* Storage may be disabled; logout still succeeds. */
      }
      router.replace('/login');
      router.refresh();
    } catch {
      // Keep the current page when the server did not clear HttpOnly cookies.
    }
  };

  return (
    <div>
      <Button
        variant="ghost"
        onClick={() => {
          void runLogout();
        }}
        isLoading={logout.isPending}
      >
        {t('submit')}
      </Button>
      {logout.isError ? (
        <p role="alert" className="text-sm text-danger-700">
          {t('error')}
        </p>
      ) : null}
    </div>
  );
}
