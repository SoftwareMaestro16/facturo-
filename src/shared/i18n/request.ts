import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';

import { routing } from './routing';

/// The dynamic import is untyped, so the cast happens once here rather than
/// spreading `any` through the request config.
async function loadMessages(locale: string): Promise<Record<string, unknown>> {
  const loaded = (await import(`../../../messages/${locale}.json`)) as {
    default: Record<string, unknown>;
  };

  return loaded.default;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
    // Regional tag, not the country of the language. With ro-RO a price renders
    // as "850,00 MDL"; with ro-MD it renders as "850,00 L", which is what the
    // customer's own paperwork says.
    formats: {
      number: {
        currency: { style: 'currency', currency: 'MDL', minimumFractionDigits: 2 },
      },
    },
  };
});
