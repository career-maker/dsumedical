# Deploy to the beta server

**To push: run `./deploy.sh` from the project root** (Git Bash / WSL / macOS / Linux). It uploads the code,
runs `npm ci`, builds with webpack, restarts pm2 and prints a health check.

| | |
|---|---|
| Server | `91.121.47.15`, SSH port 22, user `dev-inter-f3` |
| Live URL | https://dsumedical.intersmarthosting.in/ |
| Folder on server | `~/web/dsumedical.intersmarthosting.in/frontend` |
| Process | pm2 app `dsumedical`, Next.js on `127.0.0.1:3350` |
| Auth | SSH key `~/.ssh/dsumedical_deploy` (private key stays on the machine, never in git) |

## Notes
- Server is AlmaLinux 8 (old glibc): Next's native compiler/Turbopack don't run, so the build must use `next build --webpack`.
- Domain routing (nginx `proxy_pass http://127.0.0.1:3350`, HTTPS) and `pm2 startup` need root; ask the host admin.
- Beta: site sends noindex/nofollow (meta, `X-Robots-Tag`, `robots.txt` Disallow). Remove at go-live (`next.config.ts`, `src/app/layout.tsx`, `src/app/robots.ts`).
- On a new machine: copy the private key to `~/.ssh/dsumedical_deploy`, or generate one and have it added to `~/.ssh/authorized_keys` on the server.
- Logs: `ssh ... "source ~/.nvm/nvm.sh; pm2 logs dsumedical --lines 50 --nostream"`.

## Saved access
Host, port, user and password are stored in the git-ignored `.server.local` (project root). The SSH key is the normal login; the password is only a fallback (e.g. to install a key from a new machine). Never commit `.server.local`.
