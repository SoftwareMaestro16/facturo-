'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { ApiError } from '@/shared/api';
import type { CreateInvoiceDto } from '@/shared/api/generated/model';
import type { Locale } from '@/shared/i18n';
import { useRouter } from '@/shared/i18n';
import { Button, Card, ErrorState, Field, Input } from '@/shared/ui';

import { useCreateInvoice } from '../api/use-create-invoice';
import { useSendInvoice } from '../api/use-send-invoice';
import { applyDraft, type InvoiceDraft } from '../model/draft';
import { invoiceSchema, type InvoiceValues, normaliseQuantity } from '../model/schema';

import { CounterpartyPicker } from './counterparty-picker';
import { InvoiceLines } from './invoice-lines';
import { TotalsPanel } from './totals-panel';

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

/// The main invoice screen. Two things it makes sure of: the totals shown are
/// the totals stored (they come from the server), and "Save draft" and
/// "Send now" are two distinct actions, so nothing gets sent by a stray tap.
export function InvoiceForm({ locale, draft }: { locale: Locale; draft?: InvoiceDraft }) {
  const t = useTranslations('invoiceCreate');
  const router = useRouter();
  const create = useCreateInvoice();
  const send = useSendInvoice();

  const form = useForm<InvoiceValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      cycle: 'LONG',
      issueDate: today(),
      counterpartyId: '',
      notes: '',
      lines: [{ name: '', quantity: '1', priceNet: '', vatRate: '20', unit: 'H87' }],
    },
  });

  // Each new proposal replaces the lines once; later typing is the person's own.
  useEffect(() => {
    if (draft && draft.lines.length > 0) form.reset(applyDraft(form.getValues(), draft));
  }, [draft, form]);

  const submit = form.handleSubmit(async (values, event) => {
    const wantsSend =
      (event?.nativeEvent as SubmitEvent | undefined)?.submitter?.getAttribute('data-action') === 'send';

    try {
      const created = await create.mutateAsync(withNormalisedQuantities(values));

      if (wantsSend) {
        await send.mutateAsync(created.data.id);
      }

      router.push('/invoices');
    } catch (error) {
      if (error instanceof ApiError) {
        form.setError('root', {
          message: t(`errors.${error.code}`, { default: t('errors.generic') }),
        });

        return;
      }

      form.setError('root', { message: t('errors.network') });
    }
  });

  const errors = form.formState.errors;

  return (
    <form
      onSubmit={(event) => {
        void submit(event);
      }}
      className="flex flex-col gap-4"
      noValidate
    >
      <Card className="flex flex-col gap-4">
        <Field
          label={t('issueDate.label')}
          error={errors.issueDate && t(`errors.${errors.issueDate.message}`)}
          required
        >
          {(props) => <Input {...props} type="date" {...form.register('issueDate')} />}
        </Field>

        <CounterpartyField
          control={form.control}
          onChange={(id) => form.setValue('counterpartyId', id, { shouldValidate: true })}
          error={errors.counterpartyId && t(`errors.${errors.counterpartyId.message}`)}
        />
      </Card>

      <InvoiceLines form={form} />

      <TotalsPanel control={form.control} locale={locale} />

      <Field label={t('notes.label')}>
        {(props) => (
          <textarea
            {...props}
            {...form.register('notes')}
            rows={3}
            className="w-full rounded-(--radius-control) border border-line bg-surface px-3 py-2 text-body text-ink"
          />
        )}
      </Field>

      {errors.root ? (
        <ErrorState
          message={errors.root.message ?? t('errors.network')}
          retryLabel={t('errors.retry')}
          onRetry={() => form.clearErrors('root')}
        />
      ) : null}

      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <Button
          type="submit"
          variant="secondary"
          size="lg"
          isLoading={create.isPending && !send.isPending}
          data-action="draft"
        >
          {t('saveDraft')}
        </Button>
        <Button type="submit" size="lg" isLoading={create.isPending || send.isPending} data-action="send">
          {t('sendNow')}
        </Button>
      </div>
    </form>
  );
}

function withNormalisedQuantities(values: InvoiceValues): CreateInvoiceDto {
  return {
    ...values,
    lines: values.lines.map((line) => ({
      ...line,
      quantity: normaliseQuantity(line.quantity),
    })),
  } satisfies CreateInvoiceDto;
}

/// Subscribed to just the counterpartyId field, so the picker re-renders only
/// when the selection changes rather than on every keystroke elsewhere in the
/// form.
function CounterpartyField({
  control,
  onChange,
  error,
}: {
  control: ReturnType<typeof useForm<InvoiceValues>>['control'];
  onChange: (id: string) => void;
  error?: string;
}) {
  const value = useWatch({ control, name: 'counterpartyId' }) ?? '';

  return (
    <CounterpartyPicker value={value} onChange={onChange} error={error} onCreateHref="/counterparties/new" />
  );
}
