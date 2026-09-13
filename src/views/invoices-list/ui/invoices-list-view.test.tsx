import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import messages from '../../../../messages/ro.json';
import { InvoicesListView } from './invoices-list-view';

const list = vi.fn();
const sync = vi.fn();

vi.mock('@/shared/api/generated/invoices/invoices', () => ({
  invoicesControllerList: (params: unknown) => list(params) as unknown,
  invoicesControllerSummary: () =>
    Promise.resolve({
      data: {
        attentionCount: 0,
        draftCount: 0,
        errorCount: 0,
        awaitingBuyerCount: 0,
        awaitingBuyerTotal: '0.00',
        monthIssuedCount: 0,
        monthIssuedTotal: '0.00',
        monthFinishedCount: 0,
      },
    }),
  incomingInvoicesControllerSync: () => sync() as unknown,
  invoiceExchangeControllerAccept: vi.fn(),
  invoiceExchangeControllerReject: vi.fn(),
}));

const INCOMING = {
  id: 'in-1',
  direction: 'INCOMING',
  status: 'RECEIVED',
  disputedAt: null,
  cycle: 'LONG',
  series: 'FURN',
  number: 42,
  issueDate: '2026-09-10',
  counterpartyName: 'Furnizor Bun SRL',
  total: '1200.00',
  currency: 'MDL',
};

function renderView() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return render(
    <NextIntlClientProvider locale="ro" messages={messages}>
      <QueryClientProvider client={client}>
        <InvoicesListView />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );
}

beforeEach(() => {
  list.mockReset();
  sync.mockReset();
  list.mockResolvedValue({ data: { items: [INCOMING], meta: { page: 1, pageSize: 25, total: 1 } } });
  sync.mockResolvedValue({ data: { created: 0 } });
});

describe('InvoicesListView', () => {
  it('opens on the invoices the company issued', async () => {
    renderView();

    await waitFor(() => expect(list).toHaveBeenCalled());
    expect(list.mock.calls[0]?.[0]).toMatchObject({ direction: 'OUTGOING' });
  });

  it('switches to what suppliers sent, with the two answers on the row', async () => {
    renderView();

    fireEvent.click(screen.getByRole('button', { name: 'Primite' }));

    await waitFor(() =>
      expect(
        list.mock.calls.some((call) => (call[0] as { direction: string }).direction === 'INCOMING'),
      ).toBe(true),
    );

    expect(await screen.findAllByText('Așteaptă răspunsul dumneavoastră')).not.toHaveLength(0);
    expect(screen.getAllByRole('button', { name: 'Acceptați factura' })).not.toHaveLength(0);
    expect(screen.getAllByRole('button', { name: 'Nu sunt de acord' })).not.toHaveLength(0);
  });

  it('reads "nothing new" as an ordinary answer, not as a failure', async () => {
    renderView();
    fireEvent.click(screen.getByRole('button', { name: 'Primite' }));

    fireEvent.click(await screen.findByRole('button', { name: 'Vedeți dacă au venit facturi noi' }));

    const answer = await screen.findByText('Nu a venit nimic nou.');
    expect(answer).toBeInTheDocument();
    expect(answer).toHaveAttribute('role', 'status');
  });
});
