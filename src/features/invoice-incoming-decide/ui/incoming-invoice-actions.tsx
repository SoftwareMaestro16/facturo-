'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui';

import { useAcceptInvoice } from '../api/use-decide-incoming';
import { RejectInvoiceForm } from './reject-invoice-form';
import { useErrorSentence } from './use-error-sentence';

/// What the company can do with a document a supplier sent: sign it, or write
/// down that something is wrong with it. Both live on the row, because there is
/// nowhere else to put them — this application has no page for a single
/// document yet.
export function IncomingInvoiceActions({ invoiceId }: { invoiceId: string }) {
  const t = useTranslations('invoiceIncoming.decide');
  const [isWritingReason, setIsWritingReason] = useState(false);
  const [error, setError] = useState('');
  const sentenceFor = useErrorSentence();
  const accept = useAcceptInvoice();

  if (isWritingReason) {
    return <RejectInvoiceForm invoiceId={invoiceId} onClose={() => setIsWritingReason(false)} />;
  }

  return (
    <div className="flex w-full flex-col gap-2 sm:min-w-56">
      <Button
        className="w-full"
        isLoading={accept.isPending}
        onClick={() => {
          setError('');
          accept.mutate(invoiceId, { onError: (cause) => setError(sentenceFor(cause)) });
        }}
      >
        {t('accept')}
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        disabled={accept.isPending}
        onClick={() => {
          setError('');
          setIsWritingReason(true);
        }}
      >
        {t('reject')}
      </Button>

      {error ? (
        <p role="alert" className="text-sm text-danger-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
