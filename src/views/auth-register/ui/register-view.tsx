import { useTranslations } from 'next-intl';

import { RegisterForm } from '@/features/auth-register';
import { Link } from '@/shared/i18n';
import { Card, Logo } from '@/shared/ui';

export function RegisterView() {
  const t = useTranslations('auth.register');

  return (
    <div className="flex min-h-dvh flex-col items-center bg-surface-sunken px-4 py-10">
      <div className="mb-6">
        <Link href="/" aria-label={t('backToLanding')}>
          <Logo />
        </Link>
      </div>

      <Card className="w-full max-w-md">
        <h1 className="text-2xl">{t('title')}</h1>
        <p className="mt-1 text-body text-ink-muted">{t('subtitle')}</p>

        <div className="mt-6">
          <RegisterForm />
        </div>
      </Card>

      <p className="mt-4 max-w-md text-center text-sm text-ink-muted">
        {t.rich('consent', {
          terms: (chunks) => (
            <Link href="/terms" className="underline">
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link href="/privacy" className="underline">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </div>
  );
}
