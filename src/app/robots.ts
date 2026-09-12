import type { MetadataRoute } from 'next';

import { env } from '@/shared/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // The workspace holds one company's invoices. Disallow is not a guarantee
      // of absence from an index, so those routes also carry noindex.
      disallow: ['/ro/invoices', '/ru/invoices', '/ro/settings', '/ru/settings', '/api/'],
    },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
