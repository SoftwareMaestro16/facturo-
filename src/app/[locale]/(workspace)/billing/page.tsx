import { getTranslations } from 'next-intl/server';
import { Card } from '@/shared/ui';

export default async function BillingPage() {
  const t = await getTranslations('billing');
  return (
    <div className="space-y-8 px-4 py-8 sm:px-8">
      <header>
        <p className="mb-3 text-xs tracking-widest text-ink-muted uppercase">Facturo / Billing</p>
        <h1 className="text-3xl">{t('title')}</h1>
        <p className="mt-3 max-w-xl text-ink-muted">{t('intro')}</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-3">
        {(['FREE', 'STARTER', 'BUSINESS'] as const).map((plan) => (
          <Card key={plan} className="flex flex-col gap-5">
            <span className="text-xs tracking-widest text-ink-muted">{plan}</span>
            <h2 className="text-2xl">{t(`plans.${plan}`)}</h2>
            <p className="text-sm leading-7 text-ink-muted">{t(`details.${plan}`)}</p>
            <span className="mt-auto rounded-full border border-line px-3 py-2 text-center text-xs text-ink-muted">
              {t('preview')}
            </span>
          </Card>
        ))}
      </div>
      <Card>
        <h2 className="text-lg">{t('payments')}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-ink-muted">{t('unavailable')}</p>
      </Card>
    </div>
  );
}
