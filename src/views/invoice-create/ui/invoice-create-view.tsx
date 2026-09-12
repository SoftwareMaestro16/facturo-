import { useTranslations } from 'next-intl';

import { InvoiceForm } from '@/features/invoice-create';
import { Link } from '@/shared/i18n';
import type { Locale } from '@/shared/i18n';

export function InvoiceCreateView({ locale }: { locale: Locale }) {
  const t = useTranslations('invoiceCreate');

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-6">
      <Link href="/invoices" className="text-sm text-ink-muted hover:text-ink">
        {t('back')}
      </Link>
      <div>
        <h1 className="text-2xl">{t('title')}</h1>
        <p className="mt-1 text-body text-ink-muted">{t('subtitle')}</p>
      </div>
      <InvoiceForm locale={locale} />
    </div>
  );
}
