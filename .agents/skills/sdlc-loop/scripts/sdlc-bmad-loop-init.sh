#!/usr/bin/env bash
# Sets up bmad-loop in this repo without putting a personal path in a shared
# file. See the docstring of sdlc_bmad_loop_init.py, beside this script, for what it does and why.
#
# Same responsibility split as init.sh: this script's only job is checking
# that `uv` exists, then handing off to sdlc_bmad_loop_init.py via `uv run`.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if ! command -v uv >/dev/null 2>&1; then
  cat >&2 <<'EOF'
error: 'uv' is required but not found on PATH.

This script won't install it for you. Install it yourself, then re-run:

  macOS (Homebrew):     brew install uv
  pipx:                 pipx install uv
  Official instructions (review before running, don't pipe blind):
                        https://docs.astral.sh/uv/getting-started/installation/

After installing, restart your shell so the updated PATH takes effect,
EOF
  echo "then re-run: $0" >&2
  exit 1
fi

exec uv run "$SCRIPT_DIR/sdlc_bmad_loop_init.py" "$@"
