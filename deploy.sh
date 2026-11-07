#!/usr/bin/env bash
# Push this project to the beta server and restart it.  Usage: ./deploy.sh
# Auth: SSH key (default ~/.ssh/dsumedical_deploy). No password is stored anywhere in the repo.
set -euo pipefail

# Optional overrides live in the git-ignored .server.local (host, port, user, key, password).
[ -f "$(dirname "$0")/.server.local" ] && set -a && . "$(dirname "$0")/.server.local" && set +a

HOST="${DEPLOY_HOST:-91.121.47.15}"
USER_="${DEPLOY_USER:-dev-inter-f3}"
KEY="${DEPLOY_KEY:-$HOME/.ssh/dsumedical_deploy}"
DIR="web/dsumedical.intersmarthosting.in/frontend"   # relative to the remote home
PM2_NAME="dsumedical"
PORT=3350

[ -f "$KEY" ] || { echo "SSH key not found: $KEY (see DEPLOY-SERVER.md)"; exit 1; }
SSH=(ssh -p "${DEPLOY_PORT:-22}" -i "$KEY" -o BatchMode=yes -o StrictHostKeyChecking=accept-new "$USER_@$HOST")

echo "==> Pre-optimising images (server cannot run sharp)"
node scripts/optimize-images.mjs

echo "==> Uploading"
# Incremental: send only files changed since the last successful deploy (.deploy-stamp); full upload when no stamp.
# Files deleted locally are not removed on the server (delete .deploy-stamp for a full re-send).
STAMP=.deploy-stamp
NEWER=(); [ -f "$STAMP" ] && NEWER=(-newer "$STAMP")
touch .deploy-next
find . \( -name node_modules -o -name .next -o -name .next-prod -o -name .git -o -name .github.local -o -name docx -o -name changelog \) -prune -o \
  -type f "${NEWER[@]}" -print | grep -v -e '^\./\.deploy-' -e 'push\.sh$' -e 'tsbuildinfo$' -e 'Homepage_vs_Design' > .deploy-files || true
echo "files to upload: $(wc -l < .deploy-files)"
tar czf - -T .deploy-files | "${SSH[@]}" "mkdir -p $DIR && cd $DIR && tar xzf -"

echo "==> Install, build, restart"
# Server glibc is too old for Next's native SWC/Turbopack, so build with webpack (WASM SWC).
"${SSH[@]}" "source ~/.nvm/nvm.sh >/dev/null && cd $DIR && L=\$(md5sum package-lock.json | cut -d' ' -f1) \
  && ( [ \"\$L\" = \"\$(cat node_modules/.lock-sum 2>/dev/null)\" ] || ( (npm ci --no-audit --no-fund >/dev/null 2>&1 || npm install --no-audit --no-fund >/dev/null 2>&1) && echo \$L > node_modules/.lock-sum ) ) \
  && NEXT_PUBLIC_OPT_IMAGES=1 NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=4096 npx next build --webpack 2>&1 | tail -8 \
  && (pm2 describe $PM2_NAME >/dev/null 2>&1 && pm2 restart $PM2_NAME --update-env \
      || NEXT_TELEMETRY_DISABLED=1 pm2 start node_modules/next/dist/bin/next --name $PM2_NAME -- start -p $PORT) >/dev/null \
  && pm2 save >/dev/null && sleep 4 && curl -s -o /dev/null -w 'health: HTTP %{http_code}\n' http://127.0.0.1:$PORT/"
mv -f .deploy-next "$STAMP"; rm -f .deploy-files
echo "==> Done"
