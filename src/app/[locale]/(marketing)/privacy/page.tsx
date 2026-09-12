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
    title: legalDocument('privacy', locale).title,
    alternates: { canonical: `/${locale}/privacy`, languages: { ro: '/ro/privacy', ru: '/ru/privacy' } },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'legal' });

  return <LegalView document={legalDocument('privacy', locale)} backLabel={t('back')} />;
}
