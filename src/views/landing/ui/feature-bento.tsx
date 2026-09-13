import { useTranslations } from 'next-intl';
import { BentoCard } from '@/components/ui/bento';
import { NebulaField } from '@/shared/ui';

export function FeatureBento() {
  const t = useTranslations('landing.features');
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-6">
      {(['speed', 'import', 'companies', 'languages', 'errors'] as const).map((key, index) => (
        <BentoCard
          key={key}
          className={index < 2 ? 'md:col-span-3' : 'md:col-span-2'}
          eyebrow={t(key + '.eyebrow')}
          title={t(key + '.title')}
          description={t(key + '.body')}
          graphic={<FeatureGraphic index={index} label={t(key + '.visual')} />}
        />
      ))}
    </section>
  );
}

function FeatureGraphic({ index, label }: { index: number; label: string }) {
  if (index === 0)
    return (
      <>
        <NebulaField className="inset-y-0 left-0 w-3/5 opacity-35" />
        <div className="relative flex h-full w-full max-w-xs items-center justify-center">
          <div className="w-full rotate-[-5deg] rounded-2xl border border-white/25 bg-white/10 p-6 transition-transform duration-300 group-hover:rotate-0 group-hover:scale-[1.03]">
            <div className="flex justify-between text-sm">
              <span>FAC / 001</span>
              <span>↗</span>
            </div>
            <div className="mt-5 space-y-2">
              {[90, 70, 80].map((n) => (
                <div key={n} className="h-1 rounded-full bg-white/20" style={{ width: n + '%' }} />
              ))}
            </div>
            <div className="mt-5 flex justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-white/50">{label}</span>
              <span>3 000,00 L</span>
            </div>
          </div>
        </div>
      </>
    );
  if (index === 1)
    return (
      <>
        <NebulaField className="inset-y-0 right-0 w-3/5 opacity-35" />
        <div className="relative flex h-full w-full max-w-sm items-center justify-center">
          <div className="w-full rounded-xl border border-white/15 bg-white/5 transition-transform duration-300 group-hover:-translate-y-1">
            <div className="border-b border-white/10 p-3 text-xs text-white/50">{label} · .xlsx</div>
            {[0, 1, 2, 3].map((row) => (
              <div
                key={row}
                className="grid grid-cols-[24px_1fr_1fr_20px] items-center gap-4 border-b border-white/5 px-4 py-3"
              >
                <span className="text-xs text-white/25">{row + 1}</span>
                <span className="h-1.5 rounded-full bg-white/25" />
                <span className="h-1.5 rounded-full bg-white/10" />
                <span className="text-xs text-white/70">✓</span>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  if (index === 2)
    return (
      <div className="flex h-full w-full max-w-xs items-center justify-center">
        <div className="relative w-full">
          <div className="absolute inset-x-4 top-0 h-20 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 group-hover:-top-2" />
          <div className="relative mt-3 rounded-xl border border-white/25 bg-black p-5 transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">A</span>
              <span className="text-sm">Atelier Nord SRL</span>
              <span className="ml-auto">✓</span>
            </div>
            <div className="mt-5 flex items-center gap-3 text-sm text-white/40">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10">
                +
              </span>
              {label}
            </div>
          </div>
        </div>
      </div>
    );
  if (index === 3)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/10 transition-transform duration-300 group-hover:scale-105">
          <div className="absolute h-32 w-32 rounded-full border border-white/10" />
          <div className="relative flex -rotate-6 gap-3 rounded-2xl border border-white/20 bg-black p-4 transition-transform duration-300 group-hover:rotate-0">
            <span className="rounded-lg bg-white px-4 py-3 text-black">RO</span>
            <span className="px-4 py-3 text-white/50">RU</span>
          </div>
        </div>
      </div>
    );
  return (
    <div className="flex h-full w-full max-w-xs items-center justify-center">
      <div className="w-full rounded-2xl border border-white/20 bg-white/5 p-5 transition-transform duration-300 group-hover:-translate-y-1">
        <div className="mb-5 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30">
            i
          </span>
          <span className="text-sm">{label}</span>
        </div>
        <div className="space-y-2">
          <div className="h-1.5 w-full rounded-full bg-white/20" />
          <div className="h-1.5 w-3/4 rounded-full bg-white/20" />
        </div>
        <div className="mt-5 h-6 w-24 rounded-full bg-white/15" />
      </div>
    </div>
  );
}
