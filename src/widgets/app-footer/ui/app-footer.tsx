'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/shared/i18n';

/// Who provides the service and where the rules are, on every workspace
/// screen. An information-society service has to identify its provider in a
/// place a customer can find without leaving the product.
export function AppFooter() {
  const t = useTranslations('workspace.footer');
  const legal = useTranslations('landing.footer');

  return (
    <footer className="mx-auto w-full max-w-6xl border-t border-line px-4 pt-5 text-sm text-ink-muted sm:px-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>{t('operator')}</p>
        <nav aria-label={t('label')} className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/terms" className="hover:text-ink">
            {legal('terms')}
          </Link>
          <Link href="/privacy" className="hover:text-ink">
            {legal('privacy')}
          </Link>
          <a href={`mailto:${t('email')}`} className="hover:text-ink">
            {t('contact')}
          </a>
        </nav>
      </div>
    </footer>
  );
}
