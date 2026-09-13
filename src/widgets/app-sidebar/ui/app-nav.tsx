'use client';

import type { ComponentType, SVGProps } from 'react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';
import { IconBox, IconCard, IconInvoice, IconSettings, IconUsers } from '@/shared/ui';

/// Main navigation. Five items, nouns for things the person owns. A side
/// column from tablet width up; on a phone the same five items sit in a bar at
/// the bottom, where the thumb already is, rather than behind a hamburger.
const ITEMS: ReadonlyArray<{
  href: '/invoices' | '/counterparties' | '/products' | '/billing' | '/settings';
  key: 'invoices' | 'counterparties' | 'products' | 'billing' | 'settings';
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}> = [
  { href: '/invoices', key: 'invoices', icon: IconInvoice },
  { href: '/counterparties', key: 'counterparties', icon: IconUsers },
  { href: '/products', key: 'products', icon: IconBox },
  { href: '/billing', key: 'billing', icon: IconCard },
  { href: '/settings', key: 'settings', icon: IconSettings },
];

export function AppNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav aria-label={t('label')} className="hidden sm:block">
        <ul className="flex flex-col gap-1">
          {ITEMS.map(({ href, key, icon: Icon }) => {
            const active = isActive(href);

            return (
              <li key={key}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex min-h-(--size-control) items-center gap-3 rounded-(--radius-control) px-3 py-2 text-body font-medium transition-colors',
                    active ? 'bg-brand-50 text-ink' : 'text-ink-muted hover:bg-surface-sunken hover:text-ink',
                  )}
                >
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-2 left-0 w-0.5 rounded-full bg-ink"
                    />
                  ) : null}
                  <Icon className="size-5 shrink-0" />
                  <span className="min-w-0">{t(key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <nav
        aria-label={t('label')}
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl sm:hidden"
      >
        <ul className="grid grid-cols-5">
          {ITEMS.map(({ href, key, icon: Icon }) => {
            const active = isActive(href);

            return (
              <li key={key} className="min-w-0">
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex min-h-14 flex-col items-center justify-center gap-1 px-1 text-xs font-medium transition-colors',
                    active ? 'text-ink' : 'text-ink-muted',
                  )}
                >
                  <Icon className="size-5 shrink-0" />
                  <span className="max-w-full truncate">{t(`short.${key}`)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
