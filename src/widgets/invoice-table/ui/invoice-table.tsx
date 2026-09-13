import { useFormatter, useTranslations } from 'next-intl';

import { InvoiceStatusBadge, type InvoiceListItem } from '@/entities/invoice';
import { Skeleton } from '@/shared/ui';

interface InvoiceTableProps {
  invoices: readonly InvoiceListItem[];
  isLoading?: boolean;
}

/// The only place invoices are laid out as rows. On a phone each invoice is a
/// card, because five columns do not fit a thumb's width; from tablet width it
/// is a real table, scrolling sideways only inside its own container.
export function InvoiceTable({ invoices, isLoading = false }: InvoiceTableProps) {
  const t = useTranslations('invoice.table');
  const format = useFormatter();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        {[0, 1, 2, 3, 4].map((row) => (
          <Skeleton key={row} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  const date = (value: string) => format.dateTime(new Date(value), { dateStyle: 'short' });
  const money = (value: string) => format.number(Number(value), 'currency');

  return (
    <>
      <ul className="flex flex-col gap-2 sm:hidden">
        {invoices.map((invoice) => (
          <li
            key={invoice.id}
            className="flex flex-col gap-3 rounded-(--radius-card) border border-line bg-surface p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">{invoice.counterpartyName}</p>
                <p className="text-sm text-ink-muted">
                  {invoice.series}-{invoice.number} · {date(invoice.issueDate)}
                </p>
              </div>
              <p className="shrink-0 font-semibold tabular-nums text-ink">{money(invoice.total)}</p>
            </div>
            <div>
              <InvoiceStatusBadge status={invoice.status} />
            </div>
          </li>
        ))}
      </ul>

      <div className="hidden overflow-x-auto rounded-(--radius-card) border border-line bg-surface sm:block">
        <table className="w-full min-w-[40rem] border-collapse text-left">
          <thead className="border-b border-line text-sm text-ink-muted">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                {t('number')}
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                {t('counterparty')}
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                {t('issueDate')}
              </th>
              <th scope="col" className="px-5 py-3 text-right font-medium">
                {t('total')}
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                {t('status')}
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice.id}
                className="border-b border-line transition-colors last:border-0 hover:bg-surface-sunken"
              >
                <td className="px-5 py-4 font-medium whitespace-nowrap text-ink">
                  {invoice.series}-{invoice.number}
                </td>
                <td className="px-5 py-4 text-ink">{invoice.counterpartyName}</td>
                <td className="px-5 py-4 whitespace-nowrap text-ink-muted">{date(invoice.issueDate)}</td>
                <td className="px-5 py-4 text-right font-semibold whitespace-nowrap tabular-nums text-ink">
                  {money(invoice.total)}
                </td>
                <td className="px-5 py-4">
                  <InvoiceStatusBadge status={invoice.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
