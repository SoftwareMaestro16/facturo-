'use client';

import { useLocale } from 'next-intl';

import { Link, routing, usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib';

interface LocaleSwitcherProps {
  className?: string;
  /// For placement on a dark surface, such as the landing hero.
  inverted?: boolean;
}

/// Two links to the same page in the other language, not a dropdown: there are
/// only two locales, and a dropdown would cost a click to open plus a click to
/// pick, for a choice that is one tap either way.
///
/// Works with no session at all — `usePathname` returns the current path with
/// the locale segment already stripped, and `Link`'s `locale` prop rewrites it.
/// This is what lets a visitor switch language on the landing page or the
/// sign-in screen, before they have ever created an account.
export function LocaleSwitcher({ className, inverted = false }: LocaleSwitcherProps) {
  const active = useLocale();
  const pathname = usePathname();

  const mutedTone = inverted ? 'text-white/70' : 'text-ink-muted';
  const activeTone = inverted ? 'text-white' : 'text-ink';

  return (
    <div className={cn('flex items-center gap-1', className)} aria-label="RO / RU">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 ? (
            <span className={mutedTone} aria-hidden="true">
              /
            </span>
          ) : null}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === active ? 'true' : undefined}
            className={cn(
              'rounded-(--radius-control) px-1.5 py-1 text-sm font-semibold uppercase transition-colors',
              locale === active
                ? activeTone
                : cn(mutedTone, inverted ? 'hover:text-white' : 'hover:text-ink'),
            )}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
