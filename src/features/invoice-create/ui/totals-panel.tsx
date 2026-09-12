'use client';

import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { formatMoney } from '@/shared/lib';
import type { Locale } from '@/shared/i18n';
import { Card } from '@/shared/ui';

import type { InvoiceValues } from '../model/schema';
import { usePreviewTotals } from '../api/use-preview-totals';

/// Live subtotal, VAT and total, computed on the server so the number that
/// shows on the form is exactly what the invoice will store. Doing the maths
/// on the client would drift by a ban on rounding, and the customer would
/// notice when the receipt does not match.
export function TotalsPanel({
  control,
  locale,
}: {
  control: UseFormReturn<InvoiceValues>['control'];
  locale: Locale;
}) {
  const t = useTranslations('invoiceCreate.totals');
  const lines = useWatch({ control, name: 'lines' }) ?? [];
  const preview = usePreviewTotals(lines);

  const totals = preview.data ?? { subtotal: '0.00', vatTotal: '0.00', total: '0.00' };

  return (
    <Card className="flex flex-col gap-2">
      <Row label={t('subtotal')} value={formatMoney(totals.subtotal, locale)} />
      <Row label={t('vat')} value={formatMoney(totals.vatTotal, locale)} />
      <div className="mt-2 border-t border-line pt-2">
        <Row label={t('total')} value={formatMoney(totals.total, locale)} bold />
      </div>
    </Card>
  );
}

function Row({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-body text-ink-muted">{label}</span>
      <span
        className={
          bold ? 'text-xl font-bold tabular-nums text-ink' : 'text-body font-medium tabular-nums text-ink'
        }
      >
        {value}
      </span>
    </div>
  );
}
