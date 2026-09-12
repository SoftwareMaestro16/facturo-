import { useTranslations } from 'next-intl';

import type { InvoiceListItem } from '@/entities/invoice';
import { Link } from '@/shared/i18n';
import { Button, EmptyState } from '@/shared/ui';
import { InvoiceTable } from '@/widgets/invoice-table';

interface InvoicesListViewProps {
  invoices: readonly InvoiceListItem[];
  isLoading?: boolean;
}

/// Every screen carries all four states, not just the happy one: loading,
/// empty, error and data. The error state is owned by the route's error
/// boundary; the other three live here.
export function InvoicesListView({ invoices, isLoading = false }: InvoicesListViewProps) {
  const t = useTranslations('invoices');

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl">{t('title')}</h1>
        <Link href="/invoices/new">
          <Button className="w-full sm:w-auto">{t('create')}</Button>
        </Link>
      </header>

      {!isLoading && invoices.length === 0 ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
          action={
            <Link href="/invoices/new">
              <Button>{t('create')}</Button>
            </Link>
          }
        />
      ) : (
        <InvoiceTable invoices={invoices} isLoading={isLoading} />
      )}
    </div>
  );
}
