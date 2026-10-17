# Deploy / push notes (for humans and AI agents)

- Repo: https://github.com/career-maker/dsumedical (branch `main`)
- Push: `./push.sh "message"` — reads the PAT from `.github.local` (gitignored, never commit it).
  If `.github.local` is missing, create it with `GH_REPO`, `GH_USER`, `GH_BRANCH`, `GH_PAT`.
- Beta stage: `src/app/robots.ts` disallows all crawling, `layout.tsx` sets `noindex,nofollow`,
  and `next.config.ts` sends `X-Robots-Tag`. Remove all three when going live.

## cPanel (Terminal)
    cd wp.intersmarthosting.in
    git clone https://github.com/career-maker/dsumedical.git dsumedical
    cd dsumedical && npm ci && npm run build
    # then start via cPanel "Setup Node.js App" (startup file: node_modules/next/dist/bin/next, args: start -p <port>)
