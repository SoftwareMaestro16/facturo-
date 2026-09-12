'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';

import { ApiError } from '@/shared/api';
import { useRouter } from '@/shared/i18n';
import { Button, ErrorState, Field, Input } from '@/shared/ui';

import { useLogin } from '../api/use-login';
import { loginSchema, type LoginValues } from '../model/schema';

/// Sign-in form. Both errors it can raise — one from the client validation, one
/// from the server — end up as a sentence, never as a code.
export function LoginForm() {
  const t = useTranslations('auth.login');
  const login = useLogin();
  const router = useRouter();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await login.mutateAsync(values);
      // /invoices is workspace-scoped; the middleware routes it through the
      // locale it should be.
      router.push('/invoices');
    } catch (error) {
      // The server folds unknown-address, wrong-password and locked account
      // into a single response so nobody can enumerate accounts. The UI does
      // the same: one sentence for all three.
      if (error instanceof ApiError && error.code === 'invalid_credentials') {
        form.setError('root', { message: t('errors.invalid') });

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
      <Field label={t('email')} error={errors.email && t(`errors.${errors.email.message}`)} required>
        {(props) => (
          <Input {...props} {...form.register('email')} type="email" autoComplete="email" inputMode="email" />
        )}
      </Field>

      <Field label={t('password')} error={errors.password && t(`errors.${errors.password.message}`)} required>
        {(props) => (
          <Input {...props} {...form.register('password')} type="password" autoComplete="current-password" />
        )}
      </Field>

      {errors.root ? (
        <ErrorState
          message={errors.root.message ?? t('errors.network')}
          retryLabel={t('retry')}
          onRetry={() => form.clearErrors('root')}
        />
      ) : null}

      <Button type="submit" size="lg" isLoading={login.isPending}>
        {t('submit')}
      </Button>
    </form>
  );
}
