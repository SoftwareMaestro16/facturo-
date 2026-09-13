'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useProducts } from '@/entities/product';
import { CatalogImport } from '@/features/catalog-import';
import { Link, type Locale } from '@/shared/i18n';
import { formatMoney } from '@/shared/lib';
import {
  Badge,
  EmptyState,
  ErrorState,
  IconPlus,
  Input,
  PageHeader,
  Skeleton,
  buttonClassName,
} from '@/shared/ui';

interface ProductRow {
  id: string;
  code: string | null;
  name: string;
  unit: string;
  priceNet: string;
  vatRate: string;
  isArchived: boolean;
}

export function ProductsListView({ locale }: { locale: Locale }) {
  const t = useTranslations('products');
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, refetch } = useProducts({ search: search.trim() || undefined });
  const items = (data?.items ?? ([] as unknown)) as ProductRow[];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Link href="/products/new" className={buttonClassName('primary', 'lg', 'w-full sm:w-auto')}>
            <IconPlus className="size-5" />
            {t('create')}
          </Link>
        }
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">
        <label className="w-full lg:max-w-sm">
          <span className="sr-only">{t('search.label')}</span>
          <Input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('search.placeholder')}
          />
        </label>
        <div className="w-full lg:flex-1">
          <CatalogImport kind="PRODUCTS" />
        </div>
      </div>

      {isError ? (
        <ErrorState
          message={t('errors.load')}
          retryLabel={t('errors.retry')}
          onRetry={() => {
            void refetch();
          }}
        />
      ) : isLoading ? (
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((row) => (
            <Skeleton key={row} className="h-16 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
          action={
            <Link href="/products/new" className={buttonClassName()}>
              {t('create')}
            </Link>
          }
        />
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-(--radius-card) border border-line bg-surface">
          {items.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">{entry.name}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
                  {entry.code ? <span className="tabular-nums">{entry.code}</span> : null}
                  <span>{t('vat', { rate: entry.vatRate })}</span>
                  {entry.isArchived ? <Badge tone="neutral">{t('badges.archived')}</Badge> : null}
                </div>
              </div>
              <p className="shrink-0 text-body font-semibold tabular-nums text-ink">
                {formatMoney(entry.priceNet, locale)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
