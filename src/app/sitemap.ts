import type { MetadataRoute } from 'next';

import { env } from '@/shared/config';
import { routing } from '@/shared/i18n';

const PUBLIC_PATHS = ['', '/pricing', '/terms', '/privacy'];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    PUBLIC_PATHS.map((path) => ({
      url: `${env.siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((alternate) => [alternate, `${env.siteUrl}/${alternate}${path}`]),
        ),
      },
    })),
  );
}
