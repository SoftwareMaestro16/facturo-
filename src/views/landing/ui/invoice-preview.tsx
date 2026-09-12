import { useTranslations } from 'next-intl';

export function InvoicePreview() {
  const t = useTranslations('landing.preview');
  return (
    <div className="relative mx-auto w-full max-w-md lg:py-8">
      <div className="absolute inset-8 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="relative rounded-3xl border border-white/15 bg-white/[0.06] p-4 shadow-2xl backdrop-blur-xl sm:p-5">
        <div className="mb-5 flex items-center justify-between px-2 text-xs text-white/45">
          <span className="flex gap-1.5" aria-hidden="true">
            <i className="h-2 w-2 rounded-full bg-white/40" />
            <i className="h-2 w-2 rounded-full bg-white/20" />
            <i className="h-2 w-2 rounded-full bg-white/20" />
          </span>
          <span>{t('example')}</span>
        </div>
        <div className="rounded-2xl bg-white p-6 text-black sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="text-xl font-bold tracking-tight">facturo</span>
            <span className="rounded-full bg-black/5 px-3 py-1 text-xs">{t('draft')}</span>
          </div>
          <p className="mt-10 text-xs tracking-[0.15em] text-black/40 uppercase">{t('document')}</p>
          <p className="mt-2 text-2xl font-medium">FAC / 001</p>
          <div className="mt-6 flex justify-between gap-4 border-t border-black/10 pt-4 text-sm">
            <span className="text-black/45">{t('buyer')}</span>
            <span>Atelier Nord SRL</span>
          </div>
          <div className="mt-7 flex items-center justify-between border-b border-black/10 pb-4 text-sm">
            <span>{t('service')}</span>
            <span className="tabular-nums">2 500,00 L</span>
          </div>
          <div className="mt-4 flex justify-between text-sm text-black/45">
            <span>{t('vat')}</span>
            <span>500,00 L</span>
          </div>
          <div className="mt-6 flex items-end justify-between gap-2">
            <span className="text-sm">{t('total')}</span>
            <span className="text-3xl font-semibold tracking-tight">3 000,00 L</span>
          </div>
          <div className="mt-8 flex items-center justify-between rounded-xl bg-black px-4 py-3 text-sm text-white">
            <span>{t('ready')}</span>
            <span aria-hidden="true">✓</span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-2 pt-5 text-xs text-white/55">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20"
          >
            ✓
          </span>
          {t('caption')}
        </div>
      </div>
    </div>
  );
}
