---
name: new-screen
description: Checklist for adding a screen to the Facturo client — which layer each piece belongs in, the four required states, mobile rules, both languages. Use when creating or substantially changing a page.
---

# Adding a screen

## 1. Decide the layers before writing anything

| Piece | Layer | Example |
|---|---|---|
| The route and its metadata | `app/[locale]/...` | `(workspace)/invoices/page.tsx` |
| The page as a whole | `views/<name>` | `views/invoices-list` |
| A self-contained block | `widgets/<name>` | `widgets/invoice-table` |
| A user action | `features/<name>` | `features/invoice-send` |
| A business object and its display | `entities/<name>` | `entities/invoice` |
| A primitive with no domain | `shared/ui` | `Button`, `Field` |

Imports flow downward only. If a widget needs something from a feature, the
split is wrong — move the piece, do not add the import.

## 2. Write the route thin

```tsx
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function InvoicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <InvoicesListView />;
}
```

Logic in a route file is the single most common way this structure rots. The
route resolves params, sets metadata, and hands off.

Any page showing one company's data carries `robots: { index: false }`. A
`Disallow` in robots.txt does not guarantee absence from an index when external
links exist.

## 3. Build all four states

Loading (`Skeleton`), empty (`EmptyState` with a next step), error (`ErrorState`
with a sentence and a retry), data. A screen with only the fourth is half
written, and the half that is missing is the half customers hit on a bad
connection.

## 4. Obey the design system

- Colours, radii and shadows only from the `@theme` tokens in
  `src/app/globals.css`. No hex values, no pixel radii in components.
- New button look → a new variant in `shared/ui/button.tsx`, not a `className`
  at the call site.
- 44px minimum control height, 56px for one-handed use, 8px between adjacent
  buttons, spacing in multiples of 4.

## 5. Mobile first, literally

Lay it out at 400px, then widen. No horizontal scroll anywhere except a table in
its own `overflow-x: auto` container. Check it at 400px before reporting done,
and say that you did.

## 6. Both languages, same commit

Add keys to `messages/ro.json` and `messages/ru.json` together. Romanian
diacritics ă â î ș ț, with comma-below ș and ț. Run `npm run check:i18n`.

## 7. Verify

```bash
npm run verify
```

That runs format, eslint, the FSD structural checks, the message parity check,
typecheck, tests and build — the same sequence as CI.
