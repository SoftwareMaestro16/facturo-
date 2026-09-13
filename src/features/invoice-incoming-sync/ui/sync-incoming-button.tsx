'use client';

import { useTranslations } from 'next-intl';

import { Button } from '@/shared/ui';

import { useSyncIncoming } from '../api/use-sync-incoming';

/// Checks for documents suppliers have sent. The answer is usually "nothing
/// new", so it is written as a calm line under the button rather than as an
/// alert — an ordinary result must never look like something went wrong.
export function SyncIncomingButton() {
  const t = useTranslations('invoiceIncoming.check');
  const sync = useSyncIncoming();
  const created = sync.data?.created ?? 0;

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="secondary"
        className="w-full sm:w-auto"
        isLoading={sync.isPending}
        onClick={() => {
          sync.mutate();
        }}
      >
        {sync.isPending ? t('pending') : t('action')}
      </Button>

      {sync.isSuccess ? (
        <p role="status" className="text-sm text-ink-muted">
          {created === 0 ? t('none') : t('found', { count: created })}
        </p>
      ) : null}

      {sync.isError ? (
        <p role="alert" className="text-sm text-danger-700">
          {t('failed')}
        </p>
      ) : null}
    </div>
  );
}
