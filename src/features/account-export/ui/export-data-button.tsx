'use client';

import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { authControllerExportPersonalData } from '@/shared/api/generated/auth/auth';
import { Button } from '@/shared/ui';

/// Hands the person a file with the data kept about their account. Built in the
/// browser from the JSON response, so nothing about it is cached on the way.
export function ExportDataButton() {
  const t = useTranslations('account.export');
  const download = useMutation({
    mutationFn: async () => (await authControllerExportPersonalData()).data,
    onSuccess: (data) => {
      const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = `facturo-${data.exportedAt.slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="secondary"
        className="w-full sm:w-fit"
        isLoading={download.isPending}
        onClick={() => download.mutate()}
      >
        {t('button')}
      </Button>
      {download.isError ? (
        <p role="alert" className="text-sm text-danger-700">
          {t('failed')}
        </p>
      ) : null}
    </div>
  );
}
