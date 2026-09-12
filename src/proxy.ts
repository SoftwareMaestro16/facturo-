import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';

import { routing } from '@/shared/i18n';

/// Next.js 16 renamed the middleware file convention to "proxy". Same job:
/// redirect a request without a language prefix to one of /ro or /ru, so every
/// page has an address a search engine can index per language.
const internationalize = createMiddleware(routing);
const privatePaths = /^\/(?:ro|ru)\/(?:invoices|counterparties|products|settings|onboarding|billing)(?:\/|$)/;

export default function proxy(request: NextRequest) {
  if (privatePaths.test(request.nextUrl.pathname) && !request.cookies.has('access_token')) {
    const locale = request.nextUrl.pathname.split('/')[1] ?? routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }
  const response = internationalize(request);
  if (privatePaths.test(request.nextUrl.pathname) || /\/(login|register)$/.test(request.nextUrl.pathname)) {
    response.headers.set('Cache-Control', 'private, no-store');
  }
  return response;
}

export const config = {
  // Everything except Next.js internals, the API proxy and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
