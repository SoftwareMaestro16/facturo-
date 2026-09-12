import { setRequestLocale } from 'next-intl/server';

import { LandingView } from '@/views/landing';

/// A route file assembles a view and sets metadata. Any logic here belongs in
/// a layer instead.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LandingView />;
}
