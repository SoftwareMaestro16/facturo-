import { useTranslations } from 'next-intl';

import Velaris from '@/components/ui/velaris';

import { Link } from '@/shared/i18n';
import { Badge, Button, Card, Logo } from '@/shared/ui';

import { DeadlineCounter } from './deadline-counter';

/// The public page. Designed at 400px first: the audience opens links from
/// WhatsApp on a phone, not from a monitor.
export function LandingView({ daysUntilMandate }: { daysUntilMandate: number }) {
  const t = useTranslations('landing');

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5">
        <Logo />
        <Link
          href="/login"
          className="rounded-(--radius-control) px-3 py-2 text-body font-semibold text-ink-muted hover:text-ink"
        >
          {t('nav.login')}
        </Link>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 pb-20">
        <Velaris height="auto" className="rounded-(--radius-card) mb-8 text-white">
          <section className="flex flex-col gap-6 bg-black/50 px-6 py-10 sm:px-10 sm:py-16 [&_.text-ink-muted]:text-white/80">
            <Badge tone="warning">{t('hero.badge')}</Badge>

            <h1 className="max-w-3xl text-4xl sm:text-5xl">{t('hero.title')}</h1>

            <p className="max-w-2xl text-body-lg text-ink-muted">{t('hero.subtitle')}</p>

            <DeadlineCounter daysLeft={daysUntilMandate} />

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  {t('hero.primaryCta')}
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {t('hero.secondaryCta')}
                </Button>
              </Link>
            </div>

            <p className="text-sm text-ink-muted">{t('hero.note')}</p>

            {/* Consent sits under the button that creates the account, where the
              person actually agrees, not only in the footer. */}
            <p className="text-sm text-ink-muted">
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
        </Velaris>

        <section className="grid gap-4 sm:grid-cols-3">
          {(['speed', 'import', 'errors'] as const).map((key) => (
            <Card key={key}>
              <h2 className="text-lg">{t(`features.${key}.title`)}</h2>
              <p className="mt-2 text-body text-ink-muted">{t(`features.${key}.body`)}</p>
            </Card>
          ))}
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:justify-between">
          <span>{t('footer.company')}</span>
          <nav className="flex gap-4">
            <Link href="/terms">{t('footer.terms')}</Link>
            <Link href="/privacy">{t('footer.privacy')}</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
