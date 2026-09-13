'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useCounterparties } from '@/entities/counterparty';
import { CatalogImport } from '@/features/catalog-import';
import { Link } from '@/shared/i18n';
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

interface CounterpartyRow {
  id: string;
  name: string;
  idno: string;
  vatCode: string | null;
  isVatPayer: boolean;
  isArchived: boolean;
}

/// Directory of buyers and suppliers. Heading uses the plain words
/// "Cumpărători și furnizori" / "Покупатели и поставщики", not "Contragenți".
export function CounterpartiesListView() {
  const t = useTranslations('counterparties');
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, refetch } = useCounterparties({ search: search.trim() || undefined });

  const items = (data?.items ?? ([] as unknown)) as CounterpartyRow[];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        actions={
          <Link href="/counterparties/new" className={buttonClassName('primary', 'lg', 'w-full sm:w-auto')}>
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
          <CatalogImport kind="COUNTERPARTIES" />
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
        <div className="grid gap-3 md:grid-cols-2">
          {[0, 1, 2, 3].map((row) => (
            <Skeleton key={row} className="h-20 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
          action={
            <Link href="/counterparties/new" className={buttonClassName()}>
              {t('create')}
            </Link>
          }
        />
      ) : (
        <ul className="grid gap-3 md:grid-cols-2">
          {items.map((entry) => (
            <li
              key={entry.id}
              className="flex items-center gap-4 rounded-(--radius-card) border border-line bg-surface p-4"
            >
              <span
                aria-hidden="true"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface-sunken font-bold text-ink"
              >
                {entry.name.trim().charAt(0).toUpperCase()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{entry.name}</p>
                <p className="text-sm text-ink-muted tabular-nums">
                  {t('idno')} {entry.idno}
                </p>
                {entry.isArchived || entry.isVatPayer ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {entry.isVatPayer ? <Badge tone="brand">{t('badges.vat')}</Badge> : null}
                    {entry.isArchived ? <Badge tone="neutral">{t('badges.archived')}</Badge> : null}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
