import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { LoginView } from '@/views/auth-login';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginView />;
}
