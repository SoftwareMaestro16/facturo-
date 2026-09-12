'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { ApiError } from '@/shared/api';
import {
  companiesControllerCreate,
  companiesControllerList,
  companiesControllerSwitchTo,
} from '@/shared/api/generated/companies/companies';
import { Button, Card, Field, Input } from '@/shared/ui';

export function CompanyManager() {
  const t = useTranslations('companies');
  const locale = useLocale();
  const [companyName, setCompanyName] = useState('');
  const [idno, setIdno] = useState('');
  const [vatCode, setVatCode] = useState('');
  const list = useQuery({ queryKey: ['companies'], queryFn: () => companiesControllerList() });
  const finish = () => {
    try {
      // Storage events reach other tabs, never this document's session boundary.
      localStorage.setItem('facturo-session', crypto.randomUUID());
    } catch {
      /* Storage may be disabled; navigation must still complete. */
    }
    // Remount the entire query cache so the previous company's data cannot linger.
    window.location.replace(`/${locale}/invoices`);
  };
  const create = useMutation({
    mutationFn: () =>
      companiesControllerCreate({
        companyName: companyName.trim(),
        idno,
        vatCode: vatCode || undefined,
        locale: locale === 'ru' ? 'ru' : 'ro',
      }),
    onSuccess: finish,
  });
  const switchCompany = useMutation({
    mutationFn: (id: string) => companiesControllerSwitchTo(id),
    onSuccess: finish,
  });
  const busy = create.isPending || switchCompany.isPending;
  const error = create.error || switchCompany.error;
  const message = error instanceof ApiError && error.code === 'company_exists' ? t('exists') : t('failed');

  return (
    <div className="flex flex-col gap-6">
      {list.isPending ? (
        <p role="status">{t('loading')}</p>
      ) : list.isError ? (
        <div role="alert">
          <p>{t('failed')}</p>
          <Button
            variant="ghost"
            onClick={() => {
              void list.refetch();
            }}
          >
            {t('retry')}
          </Button>
        </div>
      ) : null}
      {list.data?.data.length ? (
        <Card>
          <h2 className="mb-4 text-xl">{t('yours')}</h2>
          <ul className="divide-y divide-line">
            {list.data.data.map((company) => (
              <li key={company.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-sm text-ink-muted">
                    IDNO {company.idno} · {t(`roles.${company.role}`)}
                  </p>
                </div>
                <Button
                  variant="secondary"
                  disabled={busy || company.isCurrent}
                  onClick={() => switchCompany.mutate(company.id)}
                >
                  {company.isCurrent ? t('active') : t('switch')}
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
      <Card>
        <h2 className="text-xl">{t('add')}</h2>
        <p className="mt-2 text-ink-muted">{t('hint')}</p>
        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            if (!busy) create.mutate();
          }}
        >
          <Field label={t('name')} required>
            {(props) => (
              <Input
                {...props}
                required
                minLength={2}
                maxLength={200}
                autoComplete="organization"
                value={companyName}
                onChange={(event) => setCompanyName(event.target.value)}
                disabled={busy}
              />
            )}
          </Field>
          <Field label="IDNO" hint={t('idnoHint')} required>
            {(props) => (
              <Input
                {...props}
                required
                pattern="[0-9]{13}"
                maxLength={13}
                inputMode="numeric"
                value={idno}
                onChange={(event) => setIdno(event.target.value)}
                disabled={busy}
              />
            )}
          </Field>
          <Field label={t('vat')} hint={t('vatHint')}>
            {(props) => (
              <Input
                {...props}
                pattern="[0-9]{6}"
                maxLength={6}
                inputMode="numeric"
                value={vatCode}
                onChange={(event) => setVatCode(event.target.value)}
                disabled={busy}
              />
            )}
          </Field>
          {error ? (
            <p role="alert" className="text-danger-700">
              {message}
            </p>
          ) : null}
          <Button
            type="submit"
            size="lg"
            isLoading={create.isPending}
            disabled={busy || companyName.trim().length < 2}
          >
            {t('create')}
          </Button>
        </form>
      </Card>
    </div>
  );
}
