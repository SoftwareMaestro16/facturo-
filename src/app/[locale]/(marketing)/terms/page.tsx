import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/shared/i18n';
import { legalDocument, LegalView } from '@/views/legal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: legalDocument('terms', locale).title,
    alternates: { canonical: `/${locale}/terms`, languages: { ro: '/ro/terms', ru: '/ru/terms' } },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal' });

  return <LegalView document={legalDocument('terms', locale)} backLabel={t('back')} />;
}
