'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { useInvoiceList, type InvoiceListItem, type InvoiceListParams } from '@/entities/invoice';
import { Link } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { EmptyState, ErrorState, IconPlus, Input, PageHeader, buttonClassName } from '@/shared/ui';
import { InvoiceSummary } from '@/widgets/invoice-summary';
import { InvoiceTable } from '@/widgets/invoice-table';

type StatusFilter = NonNullable<InvoiceListParams['status']> | 'ALL';
const FILTERS: readonly StatusFilter[] = ['ALL', 'DRAFT', 'SENT', 'FINISHED', 'ERROR'];

/// The first screen after sign-in. Numbers first, then the list the numbers
/// describe. Four states, one per branch; an empty filter result gets its own
/// sentence, because "no invoices yet" would be a lie when the filter hid them.
export function InvoicesListView() {
  const t = useTranslations('invoices');
  const statuses = useTranslations('invoice.status');
  const [status, setStatus] = useState<StatusFilter>('ALL');
  const [search, setSearch] = useState('');
  const isFiltered = status !== 'ALL' || search.trim() !== '';
  const { data, isLoading, isError, refetch } = useInvoiceList({
    pageSize: 25,
    status: status === 'ALL' ? undefined : status,
    search: search.trim() || undefined,
  });
  const items = (data?.items ?? ([] as unknown)) as InvoiceListItem[];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Link href="/invoices/new" className={buttonClassName('primary', 'lg', 'w-full sm:w-auto')}>
            <IconPlus className="size-5" />
            {t('create')}
          </Link>
        }
      />

      <InvoiceSummary />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label={t('filters.label')}
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={status === filter}
              onClick={() => setStatus(filter)}
              className={cn(
                'min-h-(--size-control) shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors',
                status === filter
                  ? 'border-ink bg-ink text-surface'
                  : 'border-line bg-surface text-ink-muted hover:text-ink',
              )}
            >
              {filter === 'ALL' ? t('filters.all') : statuses(filter)}
            </button>
          ))}
        </div>
        <label className="w-full lg:max-w-xs">
          <span className="sr-only">{t('search.label')}</span>
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('search.placeholder')}
          />
        </label>
      </div>

      {isError ? (
        <ErrorState
          message={t('errors.load')}
          retryLabel={t('errors.retry')}
          onRetry={() => {
            void refetch();
          }}
        />
      ) : !isLoading && items.length === 0 ? (
        isFiltered ? (
          <EmptyState title={t('filteredEmpty.title')} description={t('filteredEmpty.description')} />
        ) : (
          <EmptyState
            title={t('empty.title')}
            description={t('empty.description')}
            action={
              <Link href="/invoices/new" className={buttonClassName()}>
                {t('create')}
              </Link>
            }
          />
        )
      ) : (
        <InvoiceTable invoices={items} isLoading={isLoading} />
      )}
    </div>
  );
}
