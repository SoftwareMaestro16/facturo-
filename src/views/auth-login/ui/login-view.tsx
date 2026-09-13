import { useTranslations } from 'next-intl';
import { SignInPage } from '@/components/ui/sign-in-flow-1';
import { GoogleAuth } from '@/features/auth-google';
import { Link } from '@/shared/i18n';
import { LocaleSwitcher, Logo } from '@/shared/ui';
export function LoginView() {
  const t = useTranslations('auth.login');
  const legal = useTranslations('auth.register');
  return (
    <SignInPage
      navigation={
        <>
          <Link href="/" aria-label={t('backToLanding')}>
            <Logo inverted />
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher inverted />
            <Link
              href="/register"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 hover:text-white"
            >
              {t('createAccount')}
            </Link>
          </div>
        </>
      }
    >
      <p className="mb-6 text-xs tracking-[0.2em] text-white/45 uppercase">{t('eyebrow')}</p>
      <h1 className="text-5xl leading-[1.1] font-medium tracking-tight">{t('title')}</h1>
      <p className="mt-5 text-lg leading-8 font-light text-white/55">{t('subtitle')}</p>
      <div className="mt-10 rounded-3xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-sm">
        <GoogleAuth mode="login" />
      </div>
      <p className="mt-10 text-xs leading-6 text-white/40">
        {legal.rich('consent', {
          terms: (chunks) => (
            <Link href="/terms" className="underline underline-offset-4 hover:text-white">
              {chunks}
            </Link>
          ),
          privacy: (chunks) => (
            <Link href="/privacy" className="underline underline-offset-4 hover:text-white">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </SignInPage>
  );
}
