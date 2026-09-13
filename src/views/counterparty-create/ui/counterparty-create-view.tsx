import { useTranslations } from 'next-intl';

import { CounterpartyForm } from '@/features/counterparty-create';
import { Link } from '@/shared/i18n';
import { Card, IconArrowLeft, PageHeader } from '@/shared/ui';

export function CounterpartyCreateView() {
  const t = useTranslations('counterparty.create');

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        back={
          <Link
            href="/counterparties"
            className="inline-flex min-h-(--size-control) w-fit items-center gap-2 text-sm text-ink-muted hover:text-ink"
          >
            <IconArrowLeft className="size-4" />
            {t('back')}
          </Link>
        }
      />
      <Card className="sm:p-6">
        <CounterpartyForm />
      </Card>
    </div>
  );
}
