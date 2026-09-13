'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import type { PaidPlanCode } from '@/entities/subscription';
import { ApiError } from '@/shared/api';
import { Button } from '@/shared/ui';

import { useCheckout } from '../api/use-checkout';

interface CheckoutButtonProps {
  plan: PaidPlanCode;
  /// The plan's name as the customer reads it on the card above the button, so
  /// the label says where the button leads.
  planName: string;
  /// One plan per screen carries the screen's single primary button.
  isPrimary?: boolean;
}

/// Starts a payment for a plan and hands the browser over to the bank's page.
/// `window.location` rather than the app router on purpose: the address belongs
/// to the payment provider, and a client-side navigation cannot go there.
export function CheckoutButton({ plan, planName, isPrimary = false }: CheckoutButtonProps) {
  const t = useTranslations('billingCheckout');
  const [error, setError] = useState('');
  // Kept separate from the mutation: the browser is already on its way out, and
  // a button that turns clickable again for that half second invites a second
  // payment.
  const [isLeaving, setIsLeaving] = useState(false);

  const checkout = useCheckout();

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant={isPrimary ? 'primary' : 'secondary'}
        className="w-full"
        isLoading={checkout.isPending || isLeaving}
        onClick={() => {
          setError('');
          checkout.mutate(plan, {
            onSuccess: (response) => {
              setIsLeaving(true);
              window.location.href = response.checkoutUrl;
            },
            onError: (cause) => {
              const code = cause instanceof ApiError ? cause.code : 'generic';
              setError(t.has(`errors.${code}`) ? t(`errors.${code}`) : t('errors.generic'));
            },
          });
        }}
      >
        {checkout.isPending || isLeaving ? t('pending') : t('action', { plan: planName })}
      </Button>

      {error ? (
        <p role="alert" className="text-sm text-danger-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
