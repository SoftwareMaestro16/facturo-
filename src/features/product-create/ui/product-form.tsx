'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm, useWatch } from 'react-hook-form';

import { ApiError } from '@/shared/api';
import { useRouter } from '@/shared/i18n';
import { Button, ErrorState, Field, Input } from '@/shared/ui';

import { useCreateProduct } from '../api/use-create-product';
import { productSchema, type ProductValues } from '../model/schema';

const VAT_RATES = ['20', '8', '0'] as const;

/// Adds a product or service to the catalogue. Money stays as a string all the
/// way to the server: converting to a number loses the bani.
export function ProductForm() {
  const t = useTranslations('product.form');
  const router = useRouter();
  const create = useCreateProduct();

  const form = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { code: '', name: '', unit: 'H87', priceNet: '', vatRate: '20' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await create.mutateAsync(values);
      router.push('/products');
    } catch (error) {
      if (error instanceof ApiError) {
        const message = t(`errors.${error.code}`, { default: t('errors.generic') });

        if (error.code === 'product_code_exists') {
          form.setError('code', { message });

          return;
        }

        form.setError('root', { message });

        return;
      }

      form.setError('root', { message: t('errors.network') });
    }
  });

  const errors = form.formState.errors;

  return (
    <form
      onSubmit={(event) => {
        void onSubmit(event);
      }}
      className="flex flex-col gap-4"
      noValidate
    >
      <Field label={t('name')} error={errors.name && t(`errors.${errors.name.message}`)} required>
        {(props) => <Input {...props} {...form.register('name')} />}
      </Field>

      <Field label={t('code')} hint={t('codeHint')} error={errors.code && t(`errors.${errors.code.message}`)}>
        {(props) => <Input {...props} {...form.register('code')} />}
      </Field>

      <Field
        label={t('priceNet')}
        hint={t('priceHint')}
        error={errors.priceNet && t(`errors.${errors.priceNet.message}`)}
        required
      >
        {(props) => (
          <Input {...props} {...form.register('priceNet')} inputMode="decimal" placeholder="0.00" />
        )}
      </Field>

      <Field label={t('vatRate')} error={errors.vatRate && t(`errors.${errors.vatRate.message}`)} required>
        {(props) => (
          <VatRateChoice
            id={props.id}
            control={form.control}
            onSelect={(rate) => form.setValue('vatRate', rate, { shouldValidate: true })}
          />
        )}
      </Field>

      {errors.root ? (
        <ErrorState
          message={errors.root.message ?? t('errors.network')}
          retryLabel={t('retry')}
          onRetry={() => form.clearErrors('root')}
        />
      ) : null}

      <Button type="submit" size="lg" isLoading={create.isPending}>
        {t('submit')}
      </Button>
    </form>
  );
}

/// react-hook-form's `watch()` returns a function on every render, which the
/// compiler warns cannot be memoized. `useWatch` subscribes at the specific
/// field and re-renders only when that changes.
function VatRateChoice({
  id,
  control,
  onSelect,
}: {
  id: string;
  control: ReturnType<typeof useForm<ProductValues>>['control'];
  onSelect: (rate: (typeof VAT_RATES)[number]) => void;
}) {
  const current = useWatch({ control, name: 'vatRate' });

  return (
    <div className="flex gap-2" role="radiogroup" aria-labelledby={id}>
      {VAT_RATES.map((rate) => (
        <Button
          key={rate}
          type="button"
          variant={current === rate ? 'primary' : 'secondary'}
          onClick={() => onSelect(rate)}
        >
          {rate}%
        </Button>
      ))}
    </div>
  );
}
