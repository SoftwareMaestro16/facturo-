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
    } finally {
      // Land on the sign-in screen even if the server call failed: the local
      // session is already cleared.
      router.push('/login');
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={() => {
        void runLogout();
      }}
      isLoading={logout.isPending}
    >
      {t('submit')}
    </Button>
  );
}
