---
name: i18n-parity
description: Rules for Romanian and Russian copy in the Facturo client — key parity, diacritics, regional number formatting, tone. Use after any change to user-facing text.
---

# Two languages, one product

## Parity

```bash
npm run check:i18n
```

Compares `messages/ro.json` and `messages/ru.json` key by key. A key present in
one and missing from the other renders as the raw key string — `invoices.empty.title`
on screen — and neither TypeScript nor eslint can see it.

Add keys to both files in the same commit. Not "Romanian now, Russian later":
later never comes, and half the audience is Russian-speaking.

## Romanian diacritics

The letters are **ă â î ș ț**. The ș and ț are comma-below characters
(U+0219, U+021B), not the cedilla forms ş and ţ (U+015F, U+0163). The cedilla
forms are a Turkish legacy of old code pages and read as careless.

Check: `Respinsă`, `Ciornă`, `Factură`, `Contragent`, `Stare`.

## Regional formatting

Always `ro-MD` and `ru-MD`, never `ro-RO` or `ru-RU`.

```ts
new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'MDL' }).format(850);  // "850,00 MDL"
new Intl.NumberFormat('ro-MD', { style: 'currency', currency: 'MDL' }).format(850);  // "850,00 L"
```

Every customer's own invoices say "L". Go through `shared/lib/format.ts`; do not
construct `Intl` formatters at call sites.

## Tone

The reader is a director or an accountant under time pressure, not a developer.

- Say what to do, not what happened. "Verificați IDNO în fișa contragentului",
  not "Validation failed".
- No error codes on screen. The server sends a stable `code`; the translation is
  the sentence.
- No English left in place as a placeholder. An untranslated string ships.

## Length

Romanian and Russian both run longer than English. A label that fits a 44px
control in one language may not in the other — check at 400px width.
