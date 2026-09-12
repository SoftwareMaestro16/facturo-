'use client';

import Script from 'next/script';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

interface GoogleApi {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        nonce: string;
        auto_select: boolean;
        callback: (response: { credential: string }) => void;
      }) => void;
      renderButton: (
        element: HTMLElement,
        options: { theme: string; size: string; text: string; locale: string },
      ) => void;
    };
  };
}

/// Only the Google SDK UI lives here; domain requests belong to each auth feature.
export function GoogleButton({
  nonce,
  onCredential,
  onError,
}: {
  nonce: string;
  onCredential: (credential: string) => void;
  onError: () => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const callback = useRef(onCredential);
  const [ready, setReady] = useState(false);
  const locale = useLocale();
  const t = useTranslations('auth.google');
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    callback.current = onCredential;
  }, [onCredential]);
  useEffect(() => {
    const google = (window as Window & { google?: GoogleApi }).google;
    const element = container.current;
    if (!ready || !google || !element || !clientId || !nonce) return;
    google.accounts.id.initialize({
      client_id: clientId,
      nonce,
      auto_select: false,
      callback: (response) => callback.current(response.credential),
    });
    google.accounts.id.renderButton(element, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      locale,
    });
    return () => {
      element.replaceChildren();
    };
  }, [ready, clientId, nonce, locale]);

  if (!clientId) return null;
  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={onError}
      />
      <div ref={container} className="min-h-11" />
      {!ready || !nonce ? (
        <p role="status" className="text-sm text-ink-muted">
          {t('loading')}
        </p>
      ) : null}
    </>
  );
}
