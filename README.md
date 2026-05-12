# liz-baseline

Day-0 Next.js template with quality gates pre-wired.

## Use this template

```bash
gh repo create forbiddenlink/NEW-NAME --template forbiddenlink/liz-baseline --private --clone
cd NEW-NAME
pnpm install
cp .env.example .env.local   # fill from Vercel
pnpm dev
```

## What's wired

- Next.js 16 + React 19 + TypeScript + Tailwind v4
- Biome (lint + format, replaces ESLint + Prettier)
- Vitest (unit tests)
- Sentry (`@sentry/nextjs` — client + server + edge configs)
- OpenTelemetry (`@vercel/otel` via `instrumentation.ts`)
- Resend, PostHog, Langfuse helpers in `src/lib/`
- Renovate (`renovate.json`)
- Gitleaks (`.gitleaks.toml`)
- GitHub Actions: CI (lint/typecheck/test/build) + Sentry release

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build |
| `pnpm test` | Vitest run |
| `pnpm check` | Biome format + lint, write fixes |
| `pnpm ci` | Biome verify (no writes) — used in CI |
| `pnpm typecheck` | `tsc --noEmit` |

## After clone checklist

- [ ] `pnpm install`
- [ ] `vercel env pull .env.local` (or copy from `.env.example`)
- [ ] Set `SENTRY_PROJECT` and `SENTRY_DSN`
- [ ] In GitHub repo: set `SENTRY_AUTH_TOKEN` (secret) and `SENTRY_ENABLED=true` (var) if using release workflow
- [ ] Enable Renovate on the new repo
