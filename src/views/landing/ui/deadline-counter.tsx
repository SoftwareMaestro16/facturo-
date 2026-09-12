import { useTranslations } from 'next-intl';

/// The mandate date is the whole reason this product has a market, so the page
/// says how close it is rather than describing it in prose.
///
/// The clock is read by the route and handed in, not read here: a component
/// that reads the current time while rendering produces a different result on
/// the server than in the browser, and React 19 rejects it outright.
export function DeadlineCounter({ daysLeft }: { daysLeft: number }) {
  const t = useTranslations('landing.deadline');

  return (
    <p className="text-body font-semibold text-current">
      {daysLeft > 0 ? t('before', { days: daysLeft }) : t('after')}
    </p>
  );
}
