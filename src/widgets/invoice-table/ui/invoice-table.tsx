import { useFormatter, useTranslations } from 'next-intl';

import { InvoiceStatusBadge, type InvoiceDirection, type InvoiceListItem } from '@/entities/invoice';
import { IncomingInvoiceActions } from '@/features/invoice-incoming-decide';
import { Badge, Skeleton } from '@/shared/ui';

interface InvoiceTableProps {
  invoices: readonly InvoiceListItem[];
  /// Which side of the exchange the list is showing. It decides whether the
  /// other party is called a buyer or a supplier, and whether the row carries
  /// the accept and disagree actions.
  direction?: InvoiceDirection;
  isLoading?: boolean;
}

/// The only place invoices are laid out as rows. On a phone each invoice is a
/// card, because five columns do not fit a thumb's width; from tablet width it
/// is a real table, scrolling sideways only inside its own container.
export function InvoiceTable({ invoices, direction = 'OUTGOING', isLoading = false }: InvoiceTableProps) {
  const t = useTranslations('invoice.table');
  const format = useFormatter();
  const isIncoming = direction === 'INCOMING';

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
              <InvoiceStatusBadge status={invoice.status} direction={invoice.direction} />
            </div>
            <RowDecision invoice={invoice} />
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
                {isIncoming ? t('supplier') : t('counterparty')}
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
              {isIncoming ? (
                <th scope="col" className="px-5 py-3 font-medium">
                  {t('decision')}
                </th>
              ) : null}
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
                  <InvoiceStatusBadge status={invoice.status} direction={invoice.direction} />
                </td>
                {isIncoming ? (
                  <td className="px-5 py-4 align-top">
                    <RowDecision invoice={invoice} />
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/// A document a supplier sent is either still waiting for an answer, or it
/// already has one. Both look the same on the phone card and in the table cell.
function RowDecision({ invoice }: { invoice: InvoiceListItem }) {
  const t = useTranslations('invoice');

  if (invoice.direction !== 'INCOMING') return null;

  if (invoice.disputedAt) {
    return <Badge tone="warning">{t('disputed')}</Badge>;
  }

  if (invoice.status !== 'RECEIVED') return null;

  return <IncomingInvoiceActions invoiceId={invoice.id} />;
}
