import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/shared/i18n';
import { ProductsListView } from '@/views/products-list';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function ProductsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductsListView locale={locale} />;
}
