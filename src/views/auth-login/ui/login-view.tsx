import { useTranslations } from 'next-intl';

import { LoginForm } from '@/features/auth-login';
import { GoogleAuth } from '@/features/auth-google';
import { Link } from '@/shared/i18n';
import { Card, Logo } from '@/shared/ui';

export function LoginView() {
  const t = useTranslations('auth.login');

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-surface-sunken px-4 py-10">
      <div className="mb-6">
        <Link href="/" aria-label={t('backToLanding')}>
          <Logo />
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <h1 className="text-2xl">{t('title')}</h1>
        <p className="mt-1 text-body text-ink-muted">{t('subtitle')}</p>

        <div className="mt-6">
          <GoogleAuth mode="login" />
          <LoginForm />
        </div>

        <p className="mt-6 text-sm text-ink-muted">
          {t.rich('noAccount', {
            register: (chunks) => (
              <Link href="/register" className="underline">
                {chunks}
              </Link>
            ),
          })}
        </p>
      </Card>
    </div>
  );
}
