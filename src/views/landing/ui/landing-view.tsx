import { useTranslations } from 'next-intl';
import { Link } from '@/shared/i18n';
import { HeroCanvas, LocaleSwitcher, Logo } from '@/shared/ui';
import { FeatureBento } from './feature-bento';
import { InvoicePreview } from './invoice-preview';

export function LandingView() {
  const t = useTranslations('landing');
  return (
    <div className="bg-surface">
      <HeroCanvas height="auto" speed={0.45} grain={0.2} className="min-h-dvh text-white">
        <div className="flex min-h-dvh flex-col bg-black/55">
          <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-10">
            <Link href="/" aria-label="Facturo">
              <Logo inverted />
            </Link>
            <div className="flex items-center gap-3 sm:gap-8">
              <a href="#features" className="hidden text-sm text-white/70 hover:text-white sm:block">
                {t('nav.features')}
              </a>
              <LocaleSwitcher inverted />
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 text-sm font-medium transition-colors hover:bg-white hover:text-black"
              >
                {t('nav.login')}
              </Link>
            </div>
          </header>
          <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 py-8 sm:px-10 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <p className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-xs tracking-wide text-white/75">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {t('hero.badge')}
              </p>
              <h1 className="max-w-3xl text-5xl leading-[1.04] font-medium tracking-[-0.055em] sm:text-6xl xl:text-7xl">
                {t('hero.title')}
                <span className="mt-2 block text-white/50">{t('hero.titleSecond')}</span>
              </h1>
              <p className="mt-7 max-w-lg text-base leading-7 text-white/65 sm:text-lg">
                {t('hero.subtitle')}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="inline-flex min-h-14 items-center justify-center gap-8 rounded-full bg-white px-7 font-semibold text-black transition-colors hover:bg-white/85"
                >
                  {t('hero.primaryCta')}
                  <span aria-hidden="true">↗</span>
                </Link>
                <a
                  href="#features"
                  className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 px-7 text-white/90 transition-colors hover:bg-white/10"
                >
                  {t('hero.secondaryCta')}
                </a>
              </div>
              <p className="mt-5 text-sm text-white/45">{t('hero.note')}</p>
            </div>
            <div className="hidden lg:block">
              <InvoicePreview />
            </div>
          </section>
          <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 py-5 text-xs tracking-wide text-white/45 sm:px-10">
            <span>{t('hero.bottomNote')}</span>
            <a href="#features" className="inline-flex min-h-11 items-center gap-4">
              {t('hero.explore')}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </HeroCanvas>
      <main id="features" className="mx-auto max-w-7xl scroll-mt-6 px-6 py-20 sm:px-10 sm:py-28">
        <div className="mb-10 flex max-w-3xl flex-col gap-4">
          <p className="text-xs font-semibold tracking-[0.16em] text-ink-muted uppercase">
            {t('featuresLabel')}
          </p>
          <h2 className="text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
            {t('featuresTitle')}
          </h2>
          <p className="max-w-xl text-lg text-ink-muted">{t('featuresIntro')}</p>
        </div>
        <FeatureBento />
        <section className="mt-20 flex flex-col items-start justify-between gap-7 border-t border-line pt-12 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl">{t('closing.title')}</h2>
            <p className="mt-3 text-ink-muted">{t('closing.body')}</p>
          </div>
          <Link
            href="/register"
            className="inline-flex min-h-14 shrink-0 items-center gap-8 rounded-full bg-ink px-7 font-semibold text-surface"
          >
            {t('hero.primaryCta')}
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <Logo />
          <span>{t('footer.company')}</span>
          <nav className="flex flex-wrap items-center gap-5">
            <Link href="/terms">{t('footer.terms')}</Link>
            <Link href="/privacy">{t('footer.privacy')}</Link>
            <LocaleSwitcher />
          </nav>
        </div>
      </footer>
    </div>
  );
}
