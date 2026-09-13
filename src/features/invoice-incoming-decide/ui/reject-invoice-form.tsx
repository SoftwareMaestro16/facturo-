'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button, Field, Textarea } from '@/shared/ui';

import { useRejectInvoice } from '../api/use-decide-incoming';
import { REASON_MAX_LENGTH, checkReason, type ReasonProblem } from '../model/reason';
import { useErrorSentence } from './use-error-sentence';

interface RejectInvoiceFormProps {
  invoiceId: string;
  onClose: () => void;
}

/// Opens in place of the two buttons, on the row itself. The note goes no
/// further than Facturo, and the hint says so — promising the supplier will
/// read it would be a lie the customer only discovers in an argument.
export function RejectInvoiceForm({ invoiceId, onClose }: RejectInvoiceFormProps) {
  const t = useTranslations('invoiceIncoming.decide');
  const [reason, setReason] = useState('');
  const [problem, setProblem] = useState<ReasonProblem | null>(null);
  const [error, setError] = useState('');
  const sentenceFor = useErrorSentence();
  const reject = useRejectInvoice();

  return (
    <form
      className="flex w-full flex-col gap-2 sm:min-w-72"
      onSubmit={(event) => {
        event.preventDefault();
        const found = checkReason(reason);
        setProblem(found);
        setError('');
        if (found) return;

        reject.mutate(
          { id: invoiceId, reason: reason.trim() },
          { onError: (cause) => setError(sentenceFor(cause)) },
        );
      }}
    >
      <Field
        label={t('reasonLabel')}
        hint={t('reasonHint')}
        error={problem ? t(`errors.${problem}`) : undefined}
      >
        {(props) => (
          <Textarea
            {...props}
            value={reason}
            maxLength={REASON_MAX_LENGTH}
            placeholder={t('reasonPlaceholder')}
            onChange={(event) => {
              setReason(event.target.value);
              setProblem(null);
            }}
          />
        )}
      </Field>

      <Button type="submit" isLoading={reject.isPending} className="w-full">
        {t('rejectConfirm')}
      </Button>
      <Button type="button" variant="ghost" className="w-full" onClick={onClose}>
        {t('close')}
      </Button>

      {error ? (
        <p role="alert" className="text-sm text-danger-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}
