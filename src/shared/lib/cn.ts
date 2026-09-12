/// Joins class names, dropping anything falsy. Deliberately not a dependency:
/// this is the whole of what clsx does that the project uses.
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
