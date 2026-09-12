import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { ProductCreateView } from '@/views/product-create';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function NewProductPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProductCreateView />;
}
