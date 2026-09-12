'use client';

import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';

/// Main navigation. Five items, nouns for things the person owns, not
/// abstractions. Long translated labels wrap into a grid on phones and a
/// side column on wider screens, without horizontal page scrolling.
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
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-1">
        {ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <li key={item.key} className="min-w-0">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex min-h-(--size-control) items-center justify-start rounded-(--radius-control) px-4 py-2 text-body font-medium transition-colors',
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
