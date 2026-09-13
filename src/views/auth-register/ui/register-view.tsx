import { useTranslations } from 'next-intl';
import { SignInPage } from '@/components/ui/sign-in-flow-1';
import { GoogleAuth } from '@/features/auth-google';
import { Link } from '@/shared/i18n';
import { LocaleSwitcher, Logo } from '@/shared/ui';
export function RegisterView() {
  const t = useTranslations('auth.register');
  const legal = useTranslations('auth.register');
  const footer = useTranslations('landing.footer');
  return (
    <SignInPage
      navigation={
        <>
          <Link href="/" aria-label={t('backToLanding')}>
            <Logo inverted />
          </Link>
          <div className="flex items-center gap-4">
            <LocaleSwitcher inverted />
            <span className="hidden text-sm text-white/45 sm:inline">{t('haveAccountShort')}</span>
            <Link
              href="/login"
              className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70 hover:text-white"
            >
              {t('signIn')}
            </Link>
          </div>
        </>
      }
      footer={
        <div className="mx-auto flex max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <span>{footer('company')}</span>
          <nav className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white">
              {footer('terms')}
            </Link>
            <Link href="/privacy" className="hover:text-white">
              {footer('privacy')}
            </Link>
          </nav>
        </div>
      }
    >
      <p className="mb-6 text-xs tracking-[0.2em] text-white/45 uppercase">{t('eyebrow')}</p>
      <h1 className="text-5xl leading-[1.1] font-medium tracking-tight">{t('title')}</h1>
      <p className="mt-5 text-lg leading-8 font-light text-white/55">{t('subtitle')}</p>
      <div className="mt-10">
        <GoogleAuth mode="register" />
      </div>
      <p className="mt-6 text-sm text-white/55">
        {t.rich('haveAccount', {
          login: (chunks) => (
            <Link href="/login" className="font-medium text-white underline underline-offset-4">
              {chunks}
            </Link>
          ),
        })}
      </p>
      <p className="mt-6 text-xs leading-6 text-white/40">
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
