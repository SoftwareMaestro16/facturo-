import type { MetadataRoute } from 'next';

import { env } from '@/shared/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The workspace holds one company's own data. Disallow is not a
      // guarantee of absence from an index on its own, so every one of these
      // routes also carries its own noindex meta tag.
      disallow: [
        '/ro/invoices',
        '/ru/invoices',
        '/ro/counterparties',
        '/ru/counterparties',
        '/ro/products',
        '/ru/products',
        '/ro/billing',
        '/ru/billing',
        '/ro/onboarding',
        '/ru/onboarding',
        '/ro/settings',
        '/ru/settings',
        '/api/',
      ],
    },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
