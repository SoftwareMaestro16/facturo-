import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { env } from '@/shared/config';
import { routing } from '@/shared/i18n';
import { QueryProvider } from '@/shared/api';

import '../globals.css';
import { MotionProvider } from './motion-provider';

/// One font for the whole product, self-hosted at build time by next/font.
/// Latin-ext carries the Romanian diacritics (ă â î ș ț) and cyrillic carries
/// the Russian interface — a font missing either shows boxes to half the users.
const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(env.siteUrl),
    title: { default: t('title'), template: `%s — Facturo` },
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      // The full cluster, mutually consistent, on every variant. A partial one
      // is treated as no cluster at all.
      languages: {
        ro: '/ro',
        ru: '/ru',
        'x-default': '/ro',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ru' ? 'ru_MD' : 'ro_MD',
      url: `${env.siteUrl}/${locale}`,
      title: t('title'),
      description: t('description'),
      images: [{ url: `/og/${locale}.png`, width: 1200, height: 630 }],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <QueryProvider>
            <MotionProvider>{children}</MotionProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
