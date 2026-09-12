---
name: fsd-layers
description: Where a piece of code belongs in the Feature-Sliced Design structure, and how the layering is enforced. Use when unsure which layer something goes in, or when the linter rejects an import.
---

# Feature-Sliced Design in this project

```
app → views → widgets → features → entities → shared
```

A layer imports from layers **below** it. Never upward. Never sideways into a
sibling slice of the same layer.

## Deciding where something goes

Ask what the thing *is*, not what it is about.

| It is… | Layer |
|---|---|
| A primitive with no business meaning — button, input, formatter | `shared` |
| A business object and how it is displayed — an invoice card, a status badge | `entities` |
| Something the user *does* — create an invoice, send it, log in | `features` |
| A self-contained block of a page — the header, the invoice table | `widgets` |
| A whole page | `views` |
| A URL and its metadata | `app` |

The commonest mistake is putting a form in `entities` because it is "about
invoices". A form is an action; it belongs in `features`.

## Public API

A slice exposes what its `index.ts` exports and nothing deeper:

```ts
import { InvoiceStatusBadge } from '@/entities/invoice';              // yes
import { InvoiceStatusBadge } from '@/entities/invoice/ui/badge';     // no
```

Inside its own slice, relative imports at any depth are fine.

`shared` is the exception to the sibling rule: its segments (`ui`, `lib`,
`config`, `i18n`, `store`) legitimately build on each other.

## How it is enforced

**`eslint.config.mjs`** generates a `no-restricted-imports` block per layer from
the `LAYERS` list. It matches the literal import text rather than resolving
modules, which is why every cross-layer import goes through the `@/` alias.

**`steiger.config.ts`** adds the structural checks a per-file linter cannot make:
missing public APIs, segments named after their shape rather than their purpose.
`npm run lint:fsd`.

## When the linter objects

It is almost always right. A rejected import means one of:

- The piece is in the wrong layer — move it down.
- Two slices need shared code — extract it to a lower layer, usually `shared/lib`
  or `entities`.
- A feature wants another feature — compose them in a widget or a view instead.

Do not add an exception to the config to make an import pass. If the rule is
genuinely wrong for this project, change the rule deliberately and write down
why, in `CLAUDE.md`.
