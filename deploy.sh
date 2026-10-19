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
tar czf - --exclude=node_modules --exclude=.next --exclude=.next-prod --exclude=.git \
  --exclude=.github.local --exclude=push.sh --exclude='*.pdf' --exclude=docx \
  --exclude=tsconfig.tsbuildinfo . | "${SSH[@]}" "mkdir -p $DIR && cd $DIR && tar xzf -"

echo "==> Install, build, restart"
# Server glibc is too old for Next's native SWC/Turbopack, so build with webpack (WASM SWC).
"${SSH[@]}" "source ~/.nvm/nvm.sh >/dev/null && cd $DIR && (npm ci --no-audit --no-fund >/dev/null 2>&1 || npm install --no-audit --no-fund >/dev/null 2>&1) \
  && NEXT_PUBLIC_OPT_IMAGES=1 NEXT_TELEMETRY_DISABLED=1 NODE_OPTIONS=--max-old-space-size=4096 npx next build --webpack 2>&1 | tail -8 \
  && (pm2 describe $PM2_NAME >/dev/null 2>&1 && pm2 restart $PM2_NAME --update-env \
      || NEXT_TELEMETRY_DISABLED=1 pm2 start node_modules/next/dist/bin/next --name $PM2_NAME -- start -p $PORT) >/dev/null \
  && pm2 save >/dev/null && sleep 4 && curl -s -o /dev/null -w 'health: HTTP %{http_code}\n' http://127.0.0.1:$PORT/"
echo "==> Done"
