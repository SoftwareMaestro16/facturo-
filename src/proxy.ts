import createMiddleware from 'next-intl/middleware';

import { routing } from '@/shared/i18n';

/// Next.js 16 renamed the middleware file convention to "proxy". Same job:
/// redirect a request without a language prefix to one of /ro or /ru, so every
/// page has an address a search engine can index per language.
export default createMiddleware(routing);

export const config = {
  // Everything except Next.js internals, the API proxy and static files.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
