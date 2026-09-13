'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { AiDraftPanel } from '@/features/invoice-ai-draft';
import { InvoiceForm, type InvoiceDraft } from '@/features/invoice-create';
import { Link } from '@/shared/i18n';
import type { Locale } from '@/shared/i18n';
import { IconArrowLeft, PageHeader } from '@/shared/ui';

/// The assistant and the form are separate features; this screen is where
/// one hands its proposal to the other.
export function InvoiceCreateView({ locale }: { locale: Locale }) {
  const t = useTranslations('invoiceCreate');
  const [draft, setDraft] = useState<InvoiceDraft>();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-4 sm:px-0 sm:py-2">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        back={
          <Link
            href="/invoices"
            className="inline-flex min-h-(--size-control) w-fit items-center gap-2 text-sm text-ink-muted hover:text-ink"
          >
            <IconArrowLeft className="size-4" />
            {t('back')}
          </Link>
        }
      />
      <AiDraftPanel onDraft={setDraft} />
      <InvoiceForm locale={locale} draft={draft} />
    </div>
  );
}
