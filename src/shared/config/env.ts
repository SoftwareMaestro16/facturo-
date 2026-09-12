import { z } from 'zod';

/// Public configuration, validated once at module load. Next.js inlines
/// NEXT_PUBLIC_* at build time, so a missing value is a build failure here
/// rather than an undefined url in a fetch at runtime.
const schema = z.object({
  apiUrl: z.url(),
  siteUrl: z.url(),
  sentryDsn: z.string().optional(),
});

export const env = schema.parse({
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN || undefined,
});
