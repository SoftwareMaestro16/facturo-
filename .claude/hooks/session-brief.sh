#!/usr/bin/env bash
# SessionStart hook: states the shape of the repository up front, so a fresh
# session does not spend thousands of tokens rediscovering it.
cat <<'BRIEF'
facturo (client) — Next.js 16 App Router + Feature-Sliced Design + RTK Query.
Rules in CLAUDE.md, plan in PLAN.md.

Layers, imports flow downward only and the linter enforces it:
  src/app      routes, providers, globals.css (design tokens live here)
  src/views    whole pages
  src/widgets  self-contained page blocks
  src/features user actions
  src/entities business objects
  src/shared   ui / lib / api / config / i18n / store

A slice exposes only what its index.ts exports. Cross-layer imports go through
the @/ alias.

Commands:
  npm run verify       format -> lint -> lint:fsd -> typecheck -> test -> build
  npm run lint:fsd     structural FSD checks
  npm run api:generate regenerate the data layer from ../facturo-server/openapi.json

Data: RTK Query only. No second cache. Endpoints are generated, never hand-written.
Money arrives as a string and stays one until formatMoney renders it with ro-MD / ru-MD.
Both messages/ro.json and messages/ru.json are filled in the same commit.
BRIEF
