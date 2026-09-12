/// Compares the message files key by key.
///
/// A key that exists only in ro.json renders as the raw key string for every
/// Russian-speaking user, and neither TypeScript nor the linter can see it.
/// Run by CI and by a PostToolUse hook whenever a message file is edited.
import { readFileSync } from 'node:fs';

const LOCALES = ['ro', 'ru'];

function flatten(value, prefix = '') {
  if (typeof value !== 'object' || value === null) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, nested]) =>
    flatten(nested, prefix ? `${prefix}.${key}` : key),
  );
}

const keysByLocale = new Map(
  LOCALES.map((locale) => [
    locale,
    new Set(flatten(JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8')))),
  ]),
);

const problems = [];

for (const locale of LOCALES) {
  for (const other of LOCALES) {
    if (locale === other) continue;

    for (const key of keysByLocale.get(locale)) {
      if (!keysByLocale.get(other).has(key)) {
        problems.push(`${key} exists in ${locale}.json but not in ${other}.json`);
      }
    }
  }
}

if (problems.length > 0) {
  console.error(`Message files are out of step:\n${problems.map((p) => `  ${p}`).join('\n')}`);
  process.exit(1);
}

console.log(`Message files agree on ${keysByLocale.get('ro').size} keys.`);
