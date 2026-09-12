import { useFormatter, useTranslations } from 'next-intl';

import { InvoiceStatusBadge, type InvoiceListItem } from '@/entities/invoice';
import { Skeleton } from '@/shared/ui';

interface InvoiceTableProps {
  invoices: readonly InvoiceListItem[];
  isLoading?: boolean;
}

/// The only place invoices are laid out as rows. A table is the one thing
/// allowed to scroll sideways, and only inside its own container.
export function InvoiceTable({ invoices, isLoading = false }: InvoiceTableProps) {
  const t = useTranslations('invoice.table');
  const format = useFormatter();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((row) => (
          <Skeleton key={row} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-(--radius-card) border border-line bg-surface">
      <table className="w-full min-w-[40rem] border-collapse text-left">
        <thead className="border-b border-line text-sm text-ink-muted">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">
              {t('number')}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {t('counterparty')}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {t('issueDate')}
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              {t('total')}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {t('status')}
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3 font-medium text-ink">
                {invoice.series}-{invoice.number}
              </td>
              <td className="px-4 py-3 text-ink">{invoice.counterpartyName}</td>
              <td className="px-4 py-3 text-ink-muted">
                {format.dateTime(new Date(invoice.issueDate), { dateStyle: 'short' })}
              </td>
              <td className="px-4 py-3 text-right font-medium tabular-nums text-ink">
                {format.number(Number(invoice.total), 'currency')}
              </td>
              <td className="px-4 py-3">
                <InvoiceStatusBadge status={invoice.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
