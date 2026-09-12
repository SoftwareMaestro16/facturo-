import { setRequestLocale } from 'next-intl/server';

import { daysUntilMandate, LandingView } from '@/views/landing';

/// A route file assembles a view and sets metadata. Any logic here belongs in
/// a layer instead — reading the clock is the route's job because it is the
/// request boundary, and passing the result down keeps the view pure.
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LandingView daysUntilMandate={daysUntilMandate(new Date())} />;
}
