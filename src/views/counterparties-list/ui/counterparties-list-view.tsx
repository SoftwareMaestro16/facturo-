'use client';

import { useTranslations, useFormatter } from 'next-intl';
import { useState } from 'react';

import { useCounterparties } from '@/entities/counterparty';
import { Link } from '@/shared/i18n';
import { Badge, Button, Card, EmptyState, ErrorState, Field, Input, Skeleton } from '@/shared/ui';

interface CounterpartyRow {
  id: string;
  name: string;
  idno: string;
  vatCode: string | null;
  isVatPayer: boolean;
  isArchived: boolean;
}

/// Directory of buyers and suppliers. Column heading uses the plain word
/// "Cumpărători și furnizori" / "Покупатели и поставщики", not "Contragenți",
/// because the audience reads the friendly word.
export function CounterpartiesListView() {
  const t = useTranslations('counterparties');
  const format = useFormatter();
  const [search, setSearch] = useState('');
  const { data, isLoading, isError, refetch } = useCounterparties({ search: search || undefined });

  const items = (data?.items ?? ([] as unknown)) as CounterpartyRow[];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl">{t('title')}</h1>
        <Link href="/counterparties/new">
          <Button className="w-full sm:w-auto">{t('create')}</Button>
        </Link>
      </header>

      <Field label={t('search.label')}>
        {(props) => (
          <Input
            {...props}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('search.placeholder')}
            inputMode="search"
          />
        )}
      </Field>

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
          {[0, 1, 2, 3, 4].map((row) => (
            <Skeleton key={row} className="h-16 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
          action={
            <Link href="/counterparties/new">
              <Button>{t('create')}</Button>
            </Link>
          }
        />
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((entry) => (
            <li key={entry.id}>
              <Card className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-ink">{entry.name}</p>
                    {entry.isArchived ? <Badge tone="neutral">{t('badges.archived')}</Badge> : null}
                    {entry.isVatPayer ? <Badge tone="brand">{t('badges.vat')}</Badge> : null}
                  </div>
                  <p className="text-sm text-ink-muted">
                    {t('idno')} {format.number(Number(entry.idno))}
                  </p>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
