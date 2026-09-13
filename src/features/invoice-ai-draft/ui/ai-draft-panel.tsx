'use client';

import { useMutation } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useId, useState } from 'react';

import { useAiStatus } from '@/entities/ai-assistant';
import { ApiError } from '@/shared/api';
import { aiControllerDraftInvoice } from '@/shared/api/generated/ai/ai';
import type { InvoiceDraftResponse } from '@/shared/api/generated/model';
import { Link } from '@/shared/i18n';
import { Button, HeroCanvas, IconSparkles, Skeleton } from '@/shared/ui';

const ERRORS = [
  'ai_disabled',
  'ai_quota_exceeded',
  'ai_unavailable',
  'ai_busy',
  'ai_refused',
  'ai_failed',
  'ai_nothing_found',
] as const;
const WARNINGS = [
  'buyer_not_found',
  'buyer_ambiguous',
  'price_missing',
  'vat_assumed',
  'lines_truncated',
  'line_dropped',
] as const;

const isKnown = <T extends string>(list: readonly T[], value: string): value is T =>
  (list as readonly string[]).includes(value);

/// Describe the sale in a sentence, get the form filled in. The panel only ever
/// proposes: the form below stays the place where the invoice is checked and
/// saved. Hidden entirely where no assistant is connected, so nobody is offered
/// a button that cannot work.
export function AiDraftPanel({ onDraft }: { onDraft: (draft: InvoiceDraftResponse) => void }) {
  const t = useTranslations('ai.draft');
  const locale = useLocale();
  const id = useId();
  const status = useAiStatus();
  const [text, setText] = useState('');
  const draft = useMutation({
    mutationFn: async () => {
      const response = await aiControllerDraftInvoice({
        text: text.trim(),
        locale: locale === 'ru' ? 'ru' : 'ro',
      });
      if (!response.data) throw new Error('Empty draft');
      return response.data;
    },
    onSuccess: onDraft,
  });

  if (status.isPending) return <Skeleton className="h-36 w-full" />;
  if (status.isError || !status.data.available) return null;

  const errorCode =
    draft.error instanceof ApiError && isKnown(ERRORS, draft.error.code) ? draft.error.code : 'generic';
  const warnings = (draft.data?.warnings ?? []).filter((warning) => isKnown(WARNINGS, warning));
  const canSubmit = text.trim().length >= 3;

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="relative isolate overflow-hidden rounded-(--radius-card) border border-line bg-surface p-4 sm:p-5"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-20">
        <HeroCanvas
          height="100%"
          speed={0.35}
          grain={0.1}
          colors={['#aaaaaa', '#666666', '#1a1a1a', '#000000']}
        />
      </div>
      <div className="flex items-center gap-2">
        <IconSparkles className="size-5 shrink-0" />
        <h2 id={`${id}-title`} className="text-lg">
          {t('title')}
        </h2>
      </div>

      {status.data.enabled ? (
        <form
          className="mt-3 flex flex-col gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            if (canSubmit && !draft.isPending) draft.mutate();
          }}
        >
          <label htmlFor={`${id}-text`} className="text-body text-ink-muted">
            {t('label')}
          </label>
          <textarea
            id={`${id}-text`}
            rows={3}
            maxLength={1000}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder={t('placeholder')}
            className="w-full rounded-(--radius-control) border border-line bg-surface px-3 py-2 text-body text-ink placeholder:text-ink-muted"
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-muted">{t('review')}</p>
            <Button
              type="submit"
              variant="secondary"
              isLoading={draft.isPending}
              disabled={!canSubmit}
              className="w-full sm:w-auto"
            >
              <IconSparkles className="size-4" />
              {t('submit')}
            </Button>
          </div>
          {draft.isError ? (
            <p role="alert" className="text-sm text-danger-700">
              {t(`errors.${errorCode}`)}
            </p>
          ) : null}
          {draft.isSuccess ? (
            <div role="status" className="flex flex-col gap-1 text-sm">
              <p className="font-medium text-ink">{t('filled')}</p>
              {warnings.map((warning) => (
                <p key={warning} className="text-warning-700">
                  {t(`warnings.${warning}`, { name: draft.data.buyerName ?? '' })}
                </p>
              ))}
            </div>
          ) : null}
        </form>
      ) : (
        <p className="mt-2 text-body text-ink-muted">
          {t.rich('disabled', {
            link: (chunks) => (
              <Link href="/settings" className="underline underline-offset-4 hover:text-ink">
                {chunks}
              </Link>
            ),
          })}
        </p>
      )}
    </section>
  );
}
