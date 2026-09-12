'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { ApiError } from '@/shared/api';
import { useRouter } from '@/shared/i18n';
import { Button, ErrorState, Field, Input } from '@/shared/ui';

import { useCreateCounterparty } from '../api/use-create-counterparty';
import { counterpartySchema, type CounterpartyValues } from '../model/schema';

/// Form for adding a buyer or supplier. Same UX rules as everywhere: the label
/// says what the field is, the hint says what to fill in, the error says what
/// to fix — one sentence, no codes.
export function CounterpartyForm() {
  const t = useTranslations('counterparty.form');
  const router = useRouter();
  const create = useCreateCounterparty();

  const form = useForm<CounterpartyValues>({
    resolver: zodResolver(counterpartySchema),
    defaultValues: {
      name: '',
      idno: '',
      vatCode: '',
      email: '',
      phone: '',
      address: '',
      iban: '',
      bankName: '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await create.mutateAsync(values);
      router.push('/counterparties');
    } catch (error) {
      if (error instanceof ApiError) {
        const message = t(`errors.${error.code}`, { default: t('errors.generic') });

        if (error.code === 'counterparty_exists') {
          form.setError('idno', { message });

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
        {(props) => <Input {...props} {...form.register('name')} autoComplete="organization" />}
      </Field>

      <Field
        label={t('idno')}
        hint={t('idnoHint')}
        error={errors.idno && t(`errors.${errors.idno.message}`)}
        required
      >
        {(props) => (
          <Input {...props} {...form.register('idno')} inputMode="numeric" pattern="\d{13}" maxLength={13} />
        )}
      </Field>

      <Field
        label={t('vatCode')}
        hint={t('vatHint')}
        error={errors.vatCode && t(`errors.${errors.vatCode.message}`)}
      >
        {(props) => <Input {...props} {...form.register('vatCode')} inputMode="numeric" maxLength={6} />}
      </Field>

      <Field label={t('email')} error={errors.email && t(`errors.${errors.email.message}`)}>
        {(props) => <Input {...props} {...form.register('email')} type="email" autoComplete="email" />}
      </Field>

      <Field label={t('phone')} error={errors.phone && t(`errors.${errors.phone.message}`)}>
        {(props) => <Input {...props} {...form.register('phone')} type="tel" autoComplete="tel" />}
      </Field>

      <Field label={t('address')} error={errors.address && t(`errors.${errors.address.message}`)}>
        {(props) => <Input {...props} {...form.register('address')} autoComplete="street-address" />}
      </Field>

      <Field label={t('iban')} hint={t('ibanHint')} error={errors.iban && t(`errors.${errors.iban.message}`)}>
        {(props) => <Input {...props} {...form.register('iban')} inputMode="text" />}
      </Field>

      <Field label={t('bankName')} error={errors.bankName && t(`errors.${errors.bankName.message}`)}>
        {(props) => <Input {...props} {...form.register('bankName')} />}
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
