#!/usr/bin/env bash
# PostToolUse hook: refuses a message file edit that leaves the two languages
# out of step.
#
# A key present in one file and missing from the other renders as a raw key for
# half the audience, and nothing in the type system notices.
set -uo pipefail

FILE=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))' 2>/dev/null)

case "$FILE" in
  *messages/*.json) ;;
  *) exit 0 ;;
esac

OUTPUT=$(node "$CLAUDE_PROJECT_DIR/scripts/check-i18n.mjs" 2>&1) || { echo "$OUTPUT" >&2; exit 2; }
exit 0
