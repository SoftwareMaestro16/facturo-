---
name: design-system
description: The Facturo visual system — tokens, typography, spacing, motion, the four states, and what makes an interface trustworthy for this audience. Use when styling anything or when a screen looks wrong.
---

# The visual system

## Who this is for

A company director or a chief accountant, often over forty, opening the product
on a phone, under time pressure, dealing with a legal document. The interface
has to read as *reliable* before it reads as *modern*. Clean, calm, generous
spacing, obvious next step. Not playful, not dense, not clever.

## Tokens

Everything comes from the `@theme` block in `src/app/globals.css`:

```
--color-brand-50 … --color-brand-900     one scale, 600 is the action colour
--color-success-* --color-warning-* --color-danger-*
--color-ink --color-ink-muted            text
--color-line                             borders and dividers
--color-surface --color-surface-sunken   cards and the page behind them
--radius-control --radius-card
--shadow-card --shadow-raised --shadow-button
--size-control (44px) --size-control-lg (56px)
```

A hex value or a pixel radius written inside a component is a defect, not a
shortcut. When the brand changes, tokens are one file and hard-coded values are
a hundred.

## Typography

Inter, via `next/font`, self-hosted at build time. Subsets: `latin`,
`latin-ext` (ă â î ș ț) and `cyrillic`. Body text 15–16px and never smaller.
Headings at weight 700–800 with `-0.02em` tracking, and `text-wrap: balance` so
a two-line heading does not leave one orphan word.

Numbers in tables use `tabular-nums` so columns of money line up.

## Layout

- Spacing in multiples of 4.
- Content column capped around 72rem, with 16px side padding at every width.
- Cards carry `--shadow-card` at rest and `--shadow-raised` only when actually
  lifted. Shadows are not decoration.
- One primary action per screen. Everything else is `secondary` or `ghost`.

## The four states

Every screen: loading, empty, error, data. See the `new-screen` skill.

## Motion

- 150–300ms, opacity plus an 8–12px offset. Nothing longer, nothing bouncier.
- Lists stagger about 45ms per item, and stop staggering after roughly ten.
- The whole app sits inside `MotionConfig reducedMotion="user"`, so the system
  setting turns animation off (WCAG 2.3.3).
- **Animation never delays an action.** The customer is not waiting for beauty.

## Accessibility, the parts that get skipped

- Every input has a real `<label>`; `Field` wires `aria-describedby` and
  `aria-invalid` for you — use it rather than reimplementing it.
- Focus is visible: a 2px brand outline with 2px offset, set once in the base
  layer. Do not remove it.
- Colour is never the only signal. A rejected invoice says "Respinsă" as well as
  being red.
- Text contrast at least 4.5:1 against its surface.

## Things that look fine and are not

- A spinner covering the page instead of a skeleton: it hides the layout and
  makes a 300ms load feel like a failure.
- An error toast that disappears: the customer was looking at the form, not the
  corner.
- A table that scrolls the whole page sideways on a phone.
- A disabled submit button with no explanation of what is missing.
