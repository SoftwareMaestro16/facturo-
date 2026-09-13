import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { BillingPaidView } from '@/views/billing';

export const metadata: Metadata = { robots: { index: false, follow: false } };

/// Where the payment page returns the browser to. The payment itself was
/// confirmed server-side before this address was ever handed out, so the route
/// only reports whether it was reached the normal way, with a payment attached.
export default async function BillingPaidPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ payment?: string | string[] }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { payment } = await searchParams;

  return <BillingPaidView hasPayment={typeof payment === 'string' && payment.length > 0} />;
}
