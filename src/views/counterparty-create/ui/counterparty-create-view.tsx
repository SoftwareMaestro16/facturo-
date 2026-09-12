import { useTranslations } from 'next-intl';

import { CounterpartyForm } from '@/features/counterparty-create';
import { Link } from '@/shared/i18n';
import { Card } from '@/shared/ui';

export function CounterpartyCreateView() {
  const t = useTranslations('counterparty.create');

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-8">
      <Link href="/counterparties" className="text-sm text-ink-muted hover:text-ink">
        {t('back')}
      </Link>
      <Card>
        <h1 className="text-2xl">{t('title')}</h1>
        <p className="mt-1 text-body text-ink-muted">{t('subtitle')}</p>
        <div className="mt-6">
          <CounterpartyForm />
        </div>
      </Card>
    </div>
  );
}
