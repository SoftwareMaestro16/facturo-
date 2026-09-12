/// The date B2B electronic invoicing becomes mandatory in Moldova.
const MANDATE_DATE = new Date('2026-10-01T00:00:00+03:00');
const MS_PER_DAY = 24 * 60 * 60 * 1000;

/// Takes the current moment as an argument instead of reading the clock, so it
/// is callable from a route, testable without faking timers, and never makes a
/// component impure.
export function daysUntilMandate(now: Date): number {
  return Math.ceil((MANDATE_DATE.getTime() - now.getTime()) / MS_PER_DAY);
}
