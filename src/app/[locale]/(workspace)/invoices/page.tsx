import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { InvoicesListView } from '@/views/invoices-list';

/// One company's documents. `Disallow` in robots.txt is not a guarantee of
/// absence from an index when external links exist, so the page says so itself.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function InvoicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <InvoicesListView />;
}
