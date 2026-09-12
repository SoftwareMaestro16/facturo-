import type { Locale } from '@/shared/i18n';

/// Regional tag, never the language's home country.
///
/// Intl.NumberFormat with "ro-RO" renders 850 MDL as "850,00 MDL"; with "ro-MD"
/// it renders "850,00 L", which is what every invoice and bank statement the
/// customer already has uses. The same applies to "ru-MD" versus "ru-RU".
const REGIONAL: Record<Locale, string> = {
  ro: 'ro-MD',
  ru: 'ru-MD',
};

/// Amounts arrive from the API as fixed-scale strings, not numbers: a Decimal
/// that passed through JSON as a float has already lost the trailing zero.
export function formatMoney(amount: string, locale: Locale, currency = 'MDL'): string {
  return new Intl.NumberFormat(REGIONAL[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
}

export function formatQuantity(quantity: string, locale: Locale): string {
  return new Intl.NumberFormat(REGIONAL[locale], {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(Number(quantity));
}

export function formatDate(value: string | Date, locale: Locale): string {
  return new Intl.DateTimeFormat(REGIONAL[locale], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}
