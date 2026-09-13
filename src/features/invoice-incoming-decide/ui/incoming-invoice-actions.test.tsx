import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ApiError } from '@/shared/api';

import messages from '../../../../messages/ro.json';
import { IncomingInvoiceActions } from './incoming-invoice-actions';

const accept = vi.fn();
const reject = vi.fn();

vi.mock('@/shared/api/generated/invoices/invoices', () => ({
  invoiceExchangeControllerAccept: (id: string) => accept(id) as unknown,
  invoiceExchangeControllerReject: (id: string, body: { reason: string }) => reject(id, body) as unknown,
}));

function renderActions() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return render(
    <NextIntlClientProvider locale="ro" messages={messages}>
      <QueryClientProvider client={client}>
        <IncomingInvoiceActions invoiceId="inv-1" />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );
}

beforeEach(() => {
  accept.mockReset();
  reject.mockReset();
  accept.mockResolvedValue({ data: { status: 'FINISHED' }, status: 200 });
  reject.mockResolvedValue({ data: undefined, status: 204 });
});

describe('IncomingInvoiceActions', () => {
  it('signs the document the supplier sent', async () => {
    renderActions();

    fireEvent.click(screen.getByRole('button', { name: 'Acceptați factura' }));

    await waitFor(() => expect(accept).toHaveBeenCalledWith('inv-1'));
  });

  it('turns a refusal from the server into a sentence, never a code', async () => {
    accept.mockRejectedValue(new ApiError(409, 'invoice_not_acceptable', 'Conflict'));

    renderActions();
    fireEvent.click(screen.getByRole('button', { name: 'Acceptați factura' }));

    expect(
      await screen.findByText(
        'Ați răspuns deja la această factură. Actualizați lista ca să vedeți starea ei.',
      ),
    ).toBeInTheDocument();
  });

  it('asks what is wrong before writing down a disagreement', async () => {
    renderActions();

    fireEvent.click(screen.getByRole('button', { name: 'Nu sunt de acord' }));
    fireEvent.click(screen.getByRole('button', { name: 'Salvați nota' }));

    expect(
      await screen.findByText('Scrieți câteva cuvinte despre ce nu este în regulă.'),
    ).toBeInTheDocument();
    expect(reject).not.toHaveBeenCalled();

    fireEvent.change(screen.getByLabelText('Scrieți ce nu este în regulă'), {
      target: { value: 'Cantitatea nu corespunde' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Salvați nota' }));

    await waitFor(() => expect(reject).toHaveBeenCalledWith('inv-1', { reason: 'Cantitatea nu corespunde' }));
  });
});
