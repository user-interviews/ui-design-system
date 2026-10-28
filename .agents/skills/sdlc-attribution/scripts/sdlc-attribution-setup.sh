#!/usr/bin/env bash
# Registers the attribution hooks for each chosen tool and activates the package's git hooks.
# Run it from anywhere inside the repository. It takes --tools=<list>, --check, --remove and --dry-run.
# This wrapper finds Python 3.11 or newer and hands every argument to the Python script beside it.
# Exit codes: 0 done, 1 an edit did not take, 2 bad arguments or not in a repository, 3 git hooks conflict.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SETUP="$HERE/sdlc_attribution_setup.py"

if command -v python3 >/dev/null 2>&1 && python3 -c 'import sys; sys.exit(0 if sys.version_info >= (3, 11) else 1)' 2>/dev/null; then
  exec python3 "$SETUP" "$@"
fi

if command -v uv >/dev/null 2>&1; then
  exec uv run --python 3.11 "$SETUP" "$@"
fi

echo "error: Python 3.11 or newer is required. Install it, or install uv (brew install uv), then run this again." >&2
exit 2
