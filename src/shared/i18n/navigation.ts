import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/// Locale-aware replacements for next/link and next/navigation. Importing the
/// Next.js originals directly drops the language prefix.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
