'use client';

import type { ReactNode } from 'react';
import { useFormatter, useTranslations } from 'next-intl';

import { useInvoiceSummary } from '@/entities/invoice';
import { cn } from '@/shared/lib';
import { Button, HeroCanvas, Skeleton } from '@/shared/ui';

/// The four numbers a director opens the workspace for: what is stuck on his
/// side, what waits on the buyer, and how the month is going. A failure here
/// must not hide the invoice list below it, so it shows a quiet line, not a
/// full error block.
export function InvoiceSummary() {
  const t = useTranslations('invoices.summary');
  const format = useFormatter();
  const { data, isLoading, isError, refetch } = useInvoiceSummary();

  if (isError) {
    return (
      <div role="alert" className="flex flex-wrap items-center gap-3 text-body text-ink-muted">
        {t('failed')}
        <Button
          variant="ghost"
          onClick={() => {
            void refetch();
          }}
        >
          {t('retry')}
        </Button>
      </div>
    );
  }

  const money = (amount: string) => format.number(Number(amount), 'currency');

  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Tile
        highlighted
        label={t('attention')}
        value={data?.attentionCount}
        hint={data ? t('attentionHint', { drafts: data.draftCount, errors: data.errorCount }) : undefined}
        isLoading={isLoading}
      />
      <Tile
        label={t('awaiting')}
        value={data?.awaitingBuyerCount}
        hint={data ? money(data.awaitingBuyerTotal) : undefined}
        isLoading={isLoading}
      />
      <Tile
        label={t('month')}
        value={data ? money(data.monthIssuedTotal) : undefined}
        hint={data ? t('monthHint', { count: data.monthIssuedCount }) : undefined}
        isLoading={isLoading}
      />
      <Tile
        label={t('finished')}
        value={data?.monthFinishedCount}
        hint={t('finishedHint')}
        isLoading={isLoading}
      />
    </ul>
  );
}

function Tile({
  label,
  value,
  hint,
  isLoading,
  highlighted = false,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  isLoading: boolean;
  highlighted?: boolean;
}) {
  return (
    <li
      className={cn(
        'relative isolate flex min-h-32 flex-col justify-between gap-3 overflow-hidden rounded-(--radius-card) border border-line bg-surface p-4 sm:p-5',
        highlighted && 'border-ink-muted/40',
      )}
    >
      {highlighted ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-35">
          <HeroCanvas
            height="100%"
            speed={0.4}
            grain={0.12}
            colors={['#bbbbbb', '#777777', '#1c1c1c', '#000000']}
          />
        </div>
      ) : null}
      <p className="text-sm font-medium text-ink-muted">{label}</p>
      {isLoading ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-4 w-28" />
        </div>
      ) : (
        <div className="min-w-0">
          <p className="truncate text-2xl font-bold tabular-nums text-ink sm:text-3xl">{value}</p>
          {hint ? <p className="mt-1 truncate text-sm text-ink-muted">{hint}</p> : null}
        </div>
      )}
    </li>
  );
}
