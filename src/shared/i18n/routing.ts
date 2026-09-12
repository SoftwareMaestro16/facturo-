import { defineRouting } from 'next-intl/routing';

/// Language lives in the URL, not in a cookie. A search engine handed one
/// address whose content changes by cookie counts a single version of the site,
/// and half the audience searches in the other language.
export const routing = defineRouting({
  locales: ['ro', 'ru'],
  defaultLocale: 'ro',
  // Romanian is the default but still carries its prefix, so /ro and /ru are
  // two addressable pages and the root can canonicalise to one of them.
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
