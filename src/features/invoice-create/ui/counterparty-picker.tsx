'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useCounterparties } from '@/entities/counterparty';
import { Link } from '@/shared/i18n';
import { Button, EmptyState, Field, Input, Skeleton } from '@/shared/ui';
import { cn } from '@/shared/lib';

interface CounterpartyPickerProps {
  value: string;
  onChange: (id: string) => void;
  onCreateHref: string;
  error?: string;
}

interface Row {
  id: string;
  name: string;
  idno: string;
}

/// Picking the buyer of the invoice. Search on top, a scrollable list under
/// it. On a phone the whole picker takes the width of the form; on a wider
/// screen it stays the same width — the customer is picking one item, not
/// browsing.
export function CounterpartyPicker({ value, onChange, onCreateHref, error }: CounterpartyPickerProps) {
  const t = useTranslations('invoiceCreate.counterparty');
  const [search, setSearch] = useState('');
  const { data, isLoading } = useCounterparties({ search: search || undefined, pageSize: 20 });

  const items = (data?.items ?? []) as unknown as Row[];

  return (
    <Field label={t('label')} error={error}>
      {(props) => (
        <div className="flex flex-col gap-2">
          <Input
            {...props}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={t('search')}
            inputMode="search"
          />

          {isLoading ? (
            <Skeleton className="h-32 w-full" />
          ) : items.length === 0 ? (
            <EmptyState
              title={t('empty.title')}
              description={t('empty.description')}
              action={
                <Link href={onCreateHref}>
                  <Button variant="secondary">{t('add')}</Button>
                </Link>
              }
            />
          ) : (
            <ul className="max-h-72 overflow-y-auto rounded-(--radius-card) border border-line bg-surface">
              {items.map((entry) => {
                const selected = value === entry.id;

                return (
                  <li key={entry.id}>
                    <button
                      type="button"
                      onClick={() => onChange(entry.id)}
                      className={cn(
                        'flex w-full flex-col gap-0.5 border-b border-line px-4 py-3 text-left last:border-0',
                        selected ? 'bg-brand-50' : 'hover:bg-surface-sunken',
                      )}
                      aria-pressed={selected}
                    >
                      <span className="font-semibold text-ink">{entry.name}</span>
                      <span className="text-sm text-ink-muted">{entry.idno}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </Field>
  );
}
