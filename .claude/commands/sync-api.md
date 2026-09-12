---
description: Regenerate the data layer from the server's OpenAPI document and report what broke.
---

1. Confirm `../facturo-server/openapi.json` exists and is current. If it is
   stale, say so — it is regenerated with `npm run openapi:export` in the server
   repository.
2. Run `npm run api:generate`.
3. Run `npm run typecheck`.

Report which call sites no longer compile and why: a renamed field, a removed
endpoint, a response that changed shape. Those are contract changes on the
server, and the fix usually belongs on whichever side made the change
accidentally. Do not paper over one with a cast.
