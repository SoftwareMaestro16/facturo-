'use client';

import Script from 'next/script';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

interface CodeClient {
  requestCode: () => void;
}

interface GoogleOAuthApi {
  accounts: {
    oauth2: {
      initCodeClient: (config: {
        client_id: string;
        scope: string;
        ux_mode: 'popup';
        select_account: boolean;
        callback: (response: { code?: string; error?: string }) => void;
        error_callback: (error: { type: string }) => void;
      }) => CodeClient;
    };
  };
}

/// Our own button, not Google's rendered widget: that widget lives in a Google
/// iframe whose colours and focus ring no stylesheet of ours can reach. It
/// still follows Google's branding rules — the four-colour G on white, and
/// "Sign in with Google" in the reader's language. The focus ring shows for
/// keyboard users only, never on a mouse click.
export function GoogleButton({
  onCode,
  onError,
  disabled = false,
}: {
  onCode: (code: string) => void;
  onError: () => void;
  disabled?: boolean;
}) {
  const t = useTranslations('auth.google');
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const client = useRef<CodeClient | null>(null);
  const handlers = useRef({ onCode, onError });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    handlers.current = { onCode, onError };
  }, [onCode, onError]);

  useEffect(() => {
    const google = (window as Window & { google?: GoogleOAuthApi }).google;
    if (!ready || !google || !clientId) return;
    client.current = google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: 'openid email profile',
      ux_mode: 'popup',
      select_account: true,
      callback: (response) => {
        if (response.code) handlers.current.onCode(response.code);
        else if (response.error !== 'access_denied') handlers.current.onError();
      },
      // Closing the popup is a choice, not a failure worth a red sentence.
      error_callback: (error) => {
        if (error.type !== 'popup_closed') handlers.current.onError();
      },
    });
  }, [ready, clientId]);

  if (!clientId) return null;

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
        onError={onError}
      />
      <button
        type="button"
        disabled={!ready || disabled}
        onClick={() => client.current?.requestCode()}
        className="flex h-14 w-full items-center justify-center gap-3 rounded-full border border-black/10 bg-white px-6 text-base font-semibold text-neutral-900 shadow-sm transition-colors outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black active:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <GoogleLogo />
        {ready ? t('button') : t('loading')}
      </button>
    </>
  );
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5 shrink-0">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}
