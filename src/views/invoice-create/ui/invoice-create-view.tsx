import { useTranslations } from 'next-intl';

import { InvoiceForm } from '@/features/invoice-create';
import { Link } from '@/shared/i18n';
import type { Locale } from '@/shared/i18n';
import { IconArrowLeft, PageHeader } from '@/shared/ui';

export function InvoiceCreateView({ locale }: { locale: Locale }) {
  const t = useTranslations('invoiceCreate');

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        back={
          <Link
            href="/invoices"
            className="inline-flex min-h-(--size-control) w-fit items-center gap-2 text-sm text-ink-muted hover:text-ink"
          >
            <IconArrowLeft className="size-4" />
            {t('back')}
          </Link>
        }
      />
      <InvoiceForm locale={locale} />
    </div>
  );
}
