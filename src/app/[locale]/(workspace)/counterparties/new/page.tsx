import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { CounterpartyCreateView } from '@/views/counterparty-create';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function NewCounterpartyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CounterpartyCreateView />;
}
