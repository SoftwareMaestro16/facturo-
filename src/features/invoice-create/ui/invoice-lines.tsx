'use client';

import { useTranslations } from 'next-intl';
import type { UseFormReturn } from 'react-hook-form';
import { useFieldArray, useWatch } from 'react-hook-form';

import { Button, Field, Input } from '@/shared/ui';
import { cn } from '@/shared/lib';

import type { InvoiceValues } from '../model/schema';

const VAT_RATES = ['20', '8', '0'] as const;

/// One line at a time on a phone, with a large delete target. The last line
/// cannot be removed — an invoice with zero lines is not a document.
export function InvoiceLines({ form }: { form: UseFormReturn<InvoiceValues> }) {
  const t = useTranslations('invoiceCreate.lines');
  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'lines' });

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg">{t('title')}</h2>
      </div>

      <ul className="flex flex-col gap-3">
        {fields.map((field, index) => (
          <li
            key={field.id}
            className="flex flex-col gap-3 rounded-(--radius-card) border border-line bg-surface p-4"
          >
            <Field label={t('name')} required>
              {(props) => <Input {...props} {...form.register(`lines.${index}.name`)} />}
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label={t('quantity')} required>
                {(props) => (
                  <Input
                    {...props}
                    {...form.register(`lines.${index}.quantity`)}
                    inputMode="decimal"
                    placeholder="1"
                  />
                )}
              </Field>
              <Field label={t('price')} required>
                {(props) => (
                  <Input
                    {...props}
                    {...form.register(`lines.${index}.priceNet`)}
                    inputMode="decimal"
                    placeholder="0.00"
                  />
                )}
              </Field>
            </div>

            <VatRateChoice control={form.control} index={index} setValue={form.setValue} />

            {fields.length > 1 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => remove(index)}
                className="self-start text-danger-700"
              >
                {t('remove')}
              </Button>
            ) : null}
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant="secondary"
        onClick={() => append({ name: '', quantity: '1', priceNet: '', vatRate: '20', unit: 'H87' })}
      >
        {t('add')}
      </Button>
    </section>
  );
}

function VatRateChoice({
  control,
  index,
  setValue,
}: {
  control: UseFormReturn<InvoiceValues>['control'];
  index: number;
  setValue: UseFormReturn<InvoiceValues>['setValue'];
}) {
  const t = useTranslations('invoiceCreate.lines');
  const current = useWatch({ control, name: `lines.${index}.vatRate` });

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-body font-medium text-ink">{t('vatRate')}</span>
      <div className="flex gap-2" role="radiogroup" aria-label={t('vatRate')}>
        {VAT_RATES.map((rate) => (
          <Button
            key={rate}
            type="button"
            variant={current === rate ? 'primary' : 'secondary'}
            onClick={() => setValue(`lines.${index}.vatRate`, rate, { shouldValidate: true })}
            className={cn('flex-1')}
          >
            {rate}%
          </Button>
        ))}
      </div>
    </div>
  );
}
