import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { BillingView } from '@/views/billing';

/// One company's plan and payments. `Disallow` in robots.txt is not a guarantee
/// of absence from an index when external links exist, so the page says so
/// itself.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function BillingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BillingView />;
}
