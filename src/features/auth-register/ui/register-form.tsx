'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { ApiError } from '@/shared/api';
import { Link, useRouter } from '@/shared/i18n';
import { Button, ErrorState, Field, Input } from '@/shared/ui';

import { useRegister } from '../api/use-register';
import { registerSchema, type RegisterValues } from '../model/schema';

/// Sign-up form. The server tells us the specific reason it refused; we map
/// each code to a sentence in the interface language.
export function RegisterForm() {
  const t = useTranslations('auth.register');
  const register = useRegister();
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      companyName: '',
      idno: '',
      vatCode: '',
      email: '',
      phone: '',
      fullName: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await register.mutateAsync({
        companyName: values.companyName,
        idno: values.idno,
        vatCode: values.vatCode,
        email: values.email,
        phone: values.phone,
        fullName: values.fullName,
        password: values.password,
      });
      router.push('/invoices');
    } catch (error) {
      if (error instanceof ApiError) {
        const message = t(`errors.${error.code}`, { default: t('errors.generic') });

        // Attach to a specific field when the code names one, so the customer
        // sees the message next to what they have to fix.
        const field = fieldFor(error.code);

        if (field) {
          form.setError(field, { message });

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
      <Field
        label={t('companyName')}
        error={errors.companyName && t(`errors.${errors.companyName.message}`)}
        required
      >
        {(props) => <Input {...props} {...form.register('companyName')} autoComplete="organization" />}
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

      <Field label={t('fullName')} error={errors.fullName && t(`errors.${errors.fullName.message}`)} required>
        {(props) => <Input {...props} {...form.register('fullName')} autoComplete="name" />}
      </Field>

      <Field label={t('email')} error={errors.email && t(`errors.${errors.email.message}`)} required>
        {(props) => (
          <Input {...props} {...form.register('email')} type="email" autoComplete="email" inputMode="email" />
        )}
      </Field>

      <Field label={t('phone')} error={errors.phone && t(`errors.${errors.phone.message}`)}>
        {(props) => (
          <Input {...props} {...form.register('phone')} type="tel" autoComplete="tel" inputMode="tel" />
        )}
      </Field>

      <Field
        label={t('password')}
        hint={t('passwordHint')}
        error={errors.password && t(`errors.${errors.password.message}`)}
        required
      >
        {(props) => (
          <Input {...props} {...form.register('password')} type="password" autoComplete="new-password" />
        )}
      </Field>

      {errors.root ? (
        <ErrorState
          message={errors.root.message ?? t('errors.network')}
          retryLabel={t('retry')}
          onRetry={() => form.clearErrors('root')}
        />
      ) : null}

      <Button type="submit" size="lg" isLoading={register.isPending}>
        {t('submit')}
      </Button>

      <p className="text-sm text-ink-muted">
        {t.rich('haveAccount', {
          login: (chunks) => (
            <Link href="/login" className="underline">
              {chunks}
            </Link>
          ),
        })}
      </p>
    </form>
  );
}

/// Which field to draw a red outline around when the server rejects the request.
function fieldFor(code: string): keyof RegisterValues | undefined {
  switch (code) {
    case 'email_taken':
      return 'email';
    case 'company_exists':
      return 'idno';
    case 'password_too_short':
    case 'password_is_phone':
      return 'password';
    default:
      return undefined;
  }
}
