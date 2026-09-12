import { useTranslations } from 'next-intl';

import { Link } from '@/shared/i18n';
import { Badge, Button, HeroCanvas, LocaleSwitcher, Logo } from '@/shared/ui';

import { FeatureBento } from './feature-bento';

/// The public page. Designed at 400px first: the audience opens links from
/// WhatsApp on a phone, not from a monitor.
///
/// The hero sits outside the `max-w-6xl` content container so the dark canvas
/// reaches both edges of the viewport — a hero that stops short of the edge
/// reads as a card floating in the middle of the page, not as a hero.
export function LandingView() {
  const t = useTranslations('landing');

  return (
    <div className="min-h-dvh">
      <HeroCanvas height="auto" className="text-white">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
          <Logo inverted />
          <div className="flex items-center gap-4">
            <LocaleSwitcher inverted />
            <Link
              href="/login"
              className="rounded-(--radius-control) px-3 py-2 text-body font-semibold text-white/80 hover:text-white"
            >
              {t('nav.login')}
            </Link>
          </div>
        </header>

        <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 pt-10 sm:pb-24 sm:pt-16">
          <Badge tone="brand">{t('hero.badge')}</Badge>

          <h1 className="max-w-3xl text-4xl sm:text-5xl">{t('hero.title')}</h1>

          <p className="max-w-2xl text-body-lg text-white/80">{t('hero.subtitle')}</p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                {t('hero.primaryCta')}
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                size="lg"
                variant="secondary"
                className="w-full border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                {t('hero.secondaryCta')}
              </Button>
            </Link>
          </div>

          <p className="text-sm text-white/70">{t('hero.note')}</p>

          {/* Consent sits under the button that creates the account, where the
              person actually agrees, not only in the footer. */}
          <p className="text-sm text-white/70">
            {t.rich('hero.consent', {
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
        </section>
      </HeroCanvas>

      <main className="mx-auto w-full max-w-6xl px-4 pb-20 pt-16">
        <FeatureBento />
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:justify-between">
          <span>{t('footer.company')}</span>
          <nav className="flex items-center gap-4">
            <Link href="/terms">{t('footer.terms')}</Link>
            <Link href="/privacy">{t('footer.privacy')}</Link>
            <LocaleSwitcher />
          </nav>
        </div>
      </footer>
    </div>
  );
}
