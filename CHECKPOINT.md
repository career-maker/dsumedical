# Checkpoint — 2026-10-17

## Done
- Fixed global CSS overrides (`src/styles/globals.scss`): link-underline and button-shimmer rules now use `:where()` so component padding/position/background win (fixed lost padding, "Enquire Now" colour, misplaced section buttons).
- Matched 1920px layout to reference PDF (`D:\downloads\Ddu medical.pdf`, 1920x10521; page height matches exactly).
- Responsive fixes: Research (checks box offset), Departments (tabs), Community (banner), Journey heading weight 500.
- Header icons `public/icons/home.png` and `phone-header.png`: removed baked-in opaque background (now transparent orange glyphs).
- Beta blocking: `src/app/robots.ts` (Disallow: /), `robots` metadata noindex/nofollow in `layout.tsx`, `X-Robots-Tag` header in `next.config.ts`. Remove all three at go-live.
- Pushed to https://github.com/career-maker/dsumedical (branch `main`). Push with `./push.sh "message"`; token lives in gitignored `.github.local`. See `DEPLOY.md`.
- Cloned on cPanel: `~/wp.intersmarthosting.in/dsumedical`.

## Pending / next
1. Host is upgrading server Node to **22 LTS** (server had v12; Next 16 needs >= 20.9). Waiting for their confirmation.
2. After upgrade: cPanel > Setup Node.js App > edit `dsumedical` > select Node 22 > Save. Then in terminal:
   ```
   source /home/franciscaninter/nodevenv/wp.intersmarthosting.in/dsumedical/22/bin/activate && cd /home/franciscaninter/wp.intersmarthosting.in/dsumedical
   node -v   # must be v22.x
   rm -rf node_modules && npm ci && npm run build
   ```
   If build is killed for memory: `NODE_OPTIONS=--max-old-space-size=2048 npm run build`.
3. Add `server.js` (custom Next server using `process.env.PORT`), push, `git pull` on server, set Startup file = `server.js`, Restart.
4. Verify site URL and `/robots.txt` shows `Disallow: /`.
5. Rotate the GitHub PAT (it was pasted in chat), then update `GH_PAT` in `.github.local`.

## Notes
- Port 3001 `next start` on the local machine serves an old build; rebuild/restart it, or use `npm run dev`.
- Local dev for checks: `npx next dev -p 3100`.
- Screenshot/diff tooling lived in the session scratchpad (not in repo).
