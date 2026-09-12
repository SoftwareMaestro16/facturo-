'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { ApiError } from '@/shared/api';
import { importsControllerUpload } from '@/shared/api/generated/imports/imports';
import type { ImportUploadDto } from '@/shared/api/generated/model';
import { Button, Field, Input } from '@/shared/ui';

export function CatalogImport({ kind }: { kind: ImportUploadDto['kind'] }) {
  const t = useTranslations('imports');
  const cache = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const upload = useMutation({
    mutationFn: (selected: File) => importsControllerUpload({ kind, file: selected }),
    onSuccess: async () => {
      await cache.invalidateQueries();
    },
    onError: (cause) =>
      setError(
        t(cause instanceof ApiError && cause.code === 'import_invalid_file' ? 'invalidFile' : 'failed'),
      ),
  });
  const result = upload.data?.data;

  return (
    <details className="rounded-(--radius-card) border border-line bg-surface p-4">
      <summary className="min-h-11 cursor-pointer font-semibold">{t('title')}</summary>
      <form
        className="mt-3 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setError('');
          if (!file || !file.name.toLowerCase().endsWith('.xlsx') || file.size > 1024 * 1024) {
            setError(t('invalidFile'));
            return;
          }
          upload.mutate(file);
        }}
      >
        <p className="text-sm text-ink-muted">{t('instructions')}</p>
        <p className="text-sm break-words">
          {t(kind === 'COUNTERPARTIES' ? 'counterpartyColumns' : 'productColumns')}
        </p>
        <p className="text-sm text-ink-muted">{t('validationNote')}</p>
        <Field label={t('file')}>
          {(props) => (
            <Input
              {...props}
              type="file"
              accept=".xlsx"
              disabled={upload.isPending}
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);
                setError('');
                upload.reset();
              }}
            />
          )}
        </Field>
        {error ? (
          <p role="alert" className="text-danger-700">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="secondary" isLoading={upload.isPending} disabled={!file}>
          {t('upload')}
        </Button>
        {result ? (
          <div role="status" className="flex flex-col gap-2">
            <p>{t('result', { count: result.okRows, total: result.totalRows })}</p>
            {result.errors.length ? (
              <ul className="max-h-64 overflow-y-auto text-sm">
                {result.errors.map((issue, index) => (
                  <li key={`${issue.row}-${issue.field}-${index}`}>
                    {t('rowError', {
                      row: issue.row,
                      field: issue.field,
                      reason: t(issue.code === 'already_exists' ? 'duplicate' : 'invalidValue'),
                    })}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </form>
    </details>
  );
}
