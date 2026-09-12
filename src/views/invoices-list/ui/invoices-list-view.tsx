'use client';

import { useTranslations } from 'next-intl';

import { useInvoiceList } from '@/entities/invoice';
import type { InvoiceListItem } from '@/entities/invoice';
import { Link } from '@/shared/i18n';
import { Button, EmptyState, ErrorState } from '@/shared/ui';
import { InvoiceTable } from '@/widgets/invoice-table';

/// Live invoices list. Four states, one per branch: loading, error, empty,
/// data. The route uses the client hook, so this view is client-side; the
/// error boundary above it catches thrown errors, this one shows the ordinary
/// "request failed" case that TanStack Query surfaces as `isError`.
export function InvoicesListView() {
  const t = useTranslations('invoices');
  const { data, isLoading, isError, refetch } = useInvoiceList({ pageSize: 25 });

  const items = (data?.items ?? ([] as unknown)) as InvoiceListItem[];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl">{t('title')}</h1>
        <Link href="/invoices/new">
          <Button className="w-full sm:w-auto">{t('create')}</Button>
        </Link>
      </header>

      {isError ? (
        <ErrorState
          message={t('errors.load')}
          retryLabel={t('errors.retry')}
          onRetry={() => {
            void refetch();
          }}
        />
      ) : !isLoading && items.length === 0 ? (
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
        <InvoiceTable invoices={items} isLoading={isLoading} />
      )}
    </div>
  );
}
