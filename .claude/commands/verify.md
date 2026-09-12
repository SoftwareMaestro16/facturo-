---
description: Run the same checks CI runs and report what actually failed.
---

Run `npm run verify` and report the real output.

That sequence is format, eslint, the FSD structural checks, message parity,
typecheck, tests and build. If something fails, fix the cause rather than the
symptom, then run it again. Do not report success until the command exits clean.
