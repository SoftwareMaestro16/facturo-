import { useLocale, useTranslations } from 'next-intl';
import { env } from '@/shared/config';
import { Link } from '@/shared/i18n';
import { HeroCanvas, LocaleSwitcher, Logo, TopoField } from '@/shared/ui';
import { FeatureBento } from './feature-bento';
import { InvoicePreview } from './invoice-preview';
import { LandingDetails } from './landing-details';
import { LandingRoadmap } from './landing-roadmap';

/// AI search and chat products read this before the page text, per the
/// project's own SEO rules — keep it truthful, not aspirational: a claim here
/// that outruns the product is exactly the "штраф за пугалку" the landing
/// copy is written to avoid.
function organizationJsonLd(locale: string, meta: { title: string; description: string }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Facturo',
        url: env.siteUrl,
        logo: `${env.siteUrl}/${locale}/opengraph-image`,
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Facturo',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: meta.description,
        url: `${env.siteUrl}/${locale}`,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'MDL' },
      },
    ],
    name: meta.title,
  };
}

export function LandingView() {
  const t = useTranslations('landing');
  const meta = useTranslations('meta');
  const locale = useLocale();

  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            organizationJsonLd(locale, { title: meta('title'), description: meta('description') }),
          ),
        }}
      />
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
              <a href="#pricing" className="hidden text-sm text-white/70 hover:text-white md:block">
                {t('nav.pricing')}
              </a>
              <Link
                href="/login"
                className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 text-sm font-medium transition-colors hover:bg-white hover:text-black"
              >
                {t('nav.login')}
              </Link>
            </div>
          </header>
          <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
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
            <div className="min-h-[360px] lg:min-h-[520px]">
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
      <main id="features" className="scroll-mt-6 bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
          <div className="mb-10 flex max-w-3xl flex-col gap-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-white/45 uppercase">
              {t('featuresLabel')}
            </p>
            <h2 className="text-4xl leading-tight font-medium tracking-tight sm:text-5xl">
              {t('featuresTitle')}
            </h2>
            <p className="max-w-xl text-lg text-white/55">{t('featuresIntro')}</p>
          </div>
          <FeatureBento />
          <LandingRoadmap />
          <LandingDetails />
        </div>
      </main>
      <section className="relative border-t border-white/10 bg-black text-white">
        <TopoField speed={0.4} density={0.7} className="opacity-70" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 bg-black/40 px-6 py-16 sm:flex-row sm:items-center sm:px-10 sm:py-20">
          <div>
            <h2 className="text-3xl">{t('closing.title')}</h2>
            <p className="mt-3 text-white/55">{t('closing.body')}</p>
          </div>
          <Link
            href="/register"
            className="inline-flex min-h-14 shrink-0 items-center gap-8 rounded-full bg-white px-7 font-semibold text-black transition-colors hover:bg-white/85"
          >
            {t('hero.primaryCta')}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <footer className="border-t border-white/10 bg-black text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 pt-10 pb-8 sm:grid-cols-2 sm:px-10">
          <div>
            <p className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              facturo<span className="text-white/30">.</span>
            </p>
            <p className="mt-4 max-w-sm leading-7 text-white/50">{t('hero.subtitle')}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {/* A statement of fact, not a badge: neither the tax service nor
                  the bank has certified or endorsed Facturo. */}
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs tracking-wide text-white/45">
                {t('footer.efactura')}
              </span>
              <span className="rounded-full border border-white/15 px-3 py-1.5 text-xs tracking-wide text-white/45">
                {t('footer.payments')}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <a href="#features" className="text-white/60 hover:text-white">
              {t('nav.features')}
            </a>
            <a href="#pricing" className="text-white/60 hover:text-white">
              {t('nav.pricing')}
            </a>
            <a href="#faq" className="text-white/60 hover:text-white">
              FAQ
            </a>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-6 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-10">
          <Logo inverted />
          <span>{t('footer.company')}</span>
          <nav className="flex flex-wrap items-center gap-5">
            <Link href="/terms">{t('footer.terms')}</Link>
            <Link href="/privacy">{t('footer.privacy')}</Link>
            <LocaleSwitcher inverted />
          </nav>
        </div>
      </footer>
    </div>
  );
}
