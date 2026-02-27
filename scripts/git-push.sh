#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MESSAGE="${1:-chore: quick sync $(date '+%Y-%m-%d %H:%M')}"

git add -A

# Keep local/system files out of commits by default.
git restore --staged -- \
  .DS_Store \
  images/.DS_Store \
  react-app/.DS_Store \
  react-app/public/.DS_Store \
  react-app/public/images/.DS_Store \
  react-app/public/images/icons/.DS_Store \
  react-app/public/images/icons/split_svg/.DS_Store \
  react-app/src/.DS_Store \
  react-app/.env.local 2>/dev/null || true

if git diff --cached --quiet; then
  echo "No changes to commit."
  exit 0
fi

git commit -m "$MESSAGE"
CURRENT_BRANCH="$(git branch --show-current)"
git push origin "$CURRENT_BRANCH"

echo "Done: pushed $CURRENT_BRANCH @ $(git rev-parse --short HEAD)"
