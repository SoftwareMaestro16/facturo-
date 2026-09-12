import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/shared/i18n';
import { InvoiceCreateView } from '@/views/invoice-create';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function NewInvoicePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <InvoiceCreateView locale={locale} />;
}
