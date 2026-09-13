import { useTranslations } from 'next-intl';

import { Badge } from '@/shared/ui';

import type { SubscriptionStatus } from '../model/types';

const TONES: Record<SubscriptionStatus, 'success' | 'danger' | 'neutral'> = {
  ACTIVE: 'success',
  PAST_DUE: 'danger',
  CANCELLED: 'neutral',
};

export function SubscriptionStatusBadge({ status }: { status: SubscriptionStatus }) {
  const t = useTranslations('subscription.status');

  return <Badge tone={TONES[status]}>{t(status)}</Badge>;
}
