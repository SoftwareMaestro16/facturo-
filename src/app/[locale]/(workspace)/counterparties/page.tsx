import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { CounterpartiesListView } from '@/views/counterparties-list';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CounterpartiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CounterpartiesListView />;
}
