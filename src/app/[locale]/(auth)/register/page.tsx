import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { RegisterView } from '@/views/auth-register';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function RegisterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RegisterView />;
}
