'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { aiStatusQueryKey, useAiStatus } from '@/entities/ai-assistant';
import { useCurrentUser } from '@/entities/session';
import { aiControllerUpdateSettings } from '@/shared/api/generated/ai/ai';
import { Link } from '@/shared/i18n';
import { Button, Card, IconSparkles, Skeleton } from '@/shared/ui';

/// The owner's decision to let typed text leave for OpenAI. What is sent and
/// what is not sits next to the switch itself, not behind a link.
export function AiSettingsCard() {
  const t = useTranslations('ai.settings');
  const cache = useQueryClient();
  const { data: user } = useCurrentUser();
  const status = useAiStatus();
  const toggle = useMutation({
    mutationFn: (enabled: boolean) => aiControllerUpdateSettings({ enabled }),
    onSuccess: (response) => cache.setQueryData(aiStatusQueryKey, response.data),
  });

  if (status.isPending) return <Skeleton className="h-56 w-full" />;

  if (status.isError) {
    return (
      <Card className="flex flex-col items-start gap-3 sm:p-6">
        <p role="alert" className="text-ink-muted">
          {t('loadFailed')}
        </p>
        <Button
          variant="ghost"
          onClick={() => {
            void status.refetch();
          }}
        >
          {t('retry')}
        </Button>
      </Card>
    );
  }

  const { enabled, available, usedToday, dailyLimit } = status.data;

  return (
    <Card className="flex flex-col gap-4 sm:p-6">
      <div className="flex items-center gap-2">
        <IconSparkles className="size-5 shrink-0" />
        <h2 className="text-lg">{t('title')}</h2>
      </div>
      <p className="text-ink-muted">{t('description')}</p>

      {available ? (
        <>
          <ul className="flex list-disc flex-col gap-2 pl-5 text-body text-ink">
            <li>{t('sent')}</li>
            <li>{t('notSent')}</li>
            <li>{t('provider')}</li>
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <div>
              <p className="font-medium">{enabled ? t('on') : t('off')}</p>
              {enabled ? (
                <p className="text-sm text-ink-muted">{t('usage', { used: usedToday, limit: dailyLimit })}</p>
              ) : null}
            </div>
            {user?.role === 'OWNER' ? (
              <Button
                variant={enabled ? 'secondary' : 'primary'}
                isLoading={toggle.isPending}
                onClick={() => toggle.mutate(!enabled)}
              >
                {enabled ? t('turnOff') : t('turnOn')}
              </Button>
            ) : (
              <p className="text-sm text-ink-muted">{t('ownerOnly')}</p>
            )}
          </div>
          {toggle.isError ? (
            <p role="alert" className="text-sm text-danger-700">
              {t('failed')}
            </p>
          ) : null}
          <p className="text-sm text-ink-muted">
            {t.rich('privacy', {
              link: (chunks) => (
                <Link href="/privacy" className="underline underline-offset-4 hover:text-ink">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </>
      ) : (
        <p className="text-ink-muted">{t('unavailable')}</p>
      )}
    </Card>
  );
}
