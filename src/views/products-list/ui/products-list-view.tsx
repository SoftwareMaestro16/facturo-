'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useProducts } from '@/entities/product';
import { formatMoney } from '@/shared/lib';
import type { Locale } from '@/shared/i18n';
import { Badge, Button, Card, EmptyState, ErrorState, Field, Input, Skeleton } from '@/shared/ui';
import { Link } from '@/shared/i18n';

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
  const { data, isLoading, isError, refetch } = useProducts({ search: search || undefined });
  const items = (data?.items ?? ([] as unknown)) as ProductRow[];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl">{t('title')}</h1>
        <Link href="/products/new">
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
          {[0, 1, 2].map((row) => (
            <Skeleton key={row} className="h-16 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title={t('empty.title')}
          description={t('empty.description')}
          action={
            <Link href="/products/new">
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
                    {entry.code ? <span className="text-sm text-ink-muted">{entry.code}</span> : null}
                    {entry.isArchived ? <Badge tone="neutral">{t('badges.archived')}</Badge> : null}
                  </div>
                  <p className="text-sm text-ink-muted">{t('vat', { rate: entry.vatRate })}</p>
                </div>
                <p className="text-body font-semibold tabular-nums text-ink">
                  {formatMoney(entry.priceNet, locale)}
                </p>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
