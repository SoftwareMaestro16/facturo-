'use client';

import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';

/// Main navigation. Five items, nouns for things the person owns, not
/// abstractions. On a phone this is a bottom bar; on a wider screen it is a
/// side column. Both are the same component, only the CSS differs.
const ITEMS = [
  { href: '/invoices', key: 'invoices' },
  { href: '/counterparties', key: 'counterparties' },
  { href: '/products', key: 'products' },
  { href: '/billing', key: 'billing' },
  { href: '/settings', key: 'settings' },
] as const;

export function AppNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  return (
    <nav aria-label={t('label')} className="w-full">
      <ul className="flex flex-row gap-1 sm:flex-col">
        {ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <li key={item.key} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex h-(--size-control) items-center justify-center rounded-(--radius-control) px-4 text-body font-medium transition-colors sm:justify-start',
                  active
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-ink-muted hover:bg-surface-sunken hover:text-ink',
                )}
              >
                {t(item.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
