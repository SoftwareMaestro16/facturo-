#!/usr/bin/env bash
# PostToolUse hook: formats and lints only the file that was just touched.
#
# A deterministic answer in a few hundred milliseconds costs far less than the
# assistant re-reading files to reassure itself, and it catches the FSD layering
# violations immediately instead of at review.
set -uo pipefail

FILE=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)

case "$FILE" in
  *.ts|*.tsx|*.css) ;;
  *) exit 0 ;;
esac

[ -f "$FILE" ] || exit 0

OUTPUT=$(npx --no-install prettier --write "$FILE" 2>&1) || { echo "$OUTPUT" >&2; exit 2; }

case "$FILE" in
  *.ts|*.tsx)
    OUTPUT=$(npx --no-install eslint --fix "$FILE" 2>&1) || { echo "$OUTPUT" >&2; exit 2; }
    ;;
esac

exit 0
