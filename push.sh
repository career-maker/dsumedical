#!/usr/bin/env bash
# Usage: ./push.sh "commit message"   (reads token from gitignored .github.local)
set -e
cd "$(dirname "$0")"
source ./.github.local
git add -A
git diff --cached --quiet || git commit -m "${1:-update}"
git push "https://${GH_USER}:${GH_PAT}@${GH_REPO#https://}" "HEAD:${GH_BRANCH}"
