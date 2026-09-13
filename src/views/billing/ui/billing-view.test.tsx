import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';

import messages from '../../../../messages/ro.json';
import { BillingView } from './billing-view';

const getSubscription = vi.fn();

vi.mock('@/shared/api/generated/billing/billing', () => ({
  billingControllerGetSubscription: () => getSubscription() as unknown,
  billingControllerCheckout: vi.fn(),
}));

function renderView() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });

  return render(
    <NextIntlClientProvider locale="ro" messages={messages}>
      <QueryClientProvider client={client}>
        <BillingView />
      </QueryClientProvider>
    </NextIntlClientProvider>,
  );
}

describe('BillingView', () => {
  it('says how much of the month is used and offers the next plan up', async () => {
    getSubscription.mockResolvedValue({
      data: {
        plan: 'FREE',
        status: 'ACTIVE',
        invoiceQuota: 10,
        invoicesUsed: 7,
        currentPeriodStart: '2026-09-01T00:00:00.000Z',
        currentPeriodEnd: '2026-10-01T00:00:00.000Z',
      },
    });

    renderView();

    expect(await screen.findByText('7 din 10 facturi emise luna aceasta')).toBeInTheDocument();
    expect(screen.getByText('Au mai rămas 3 facturi.')).toBeInTheDocument();
    expect(screen.getByText('Planul dumneavoastră acum')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Treceți la „Activitate zilnică”' })).toBeInTheDocument();
  });

  it('tells the customer what to do instead of showing a failure code', async () => {
    getSubscription.mockRejectedValue(new Error('offline'));

    renderView();

    expect(
      await screen.findByText('Nu am putut afla ce plan aveți. Verificați conexiunea și încercați din nou.'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Încercați din nou' })).toBeInTheDocument();
  });
});
