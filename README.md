# liz-baseline

A Day-0 Next.js template with quality gates pre-wired. Every new personal site starts here, so you get linting, tests, error tracking, security scanning and SEO defaults before writing any product code. This repo is a GitHub template (`isTemplate` is true). It is not a deployed site, so there is no live URL.

## Use this template

Prerequisites: Node 20.11 or newer (`engines`) and pnpm (pinned by `packageManager` in `package.json`).

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
- Sentry (`@sentry/nextjs`: `instrumentation-client.ts` for the client, `sentry.server.config.ts` and `sentry.edge.config.ts` for the other runtimes)
- OpenTelemetry (`@vercel/otel` via `instrumentation.ts`)
- Resend, PostHog (server) and Langfuse helpers in `src/lib/`
- SEO defaults: `robots.ts`, `sitemap.ts`, `metadataBase` and a not-found page in `src/app/`; security headers in `src/lib/security-headers.ts`, applied in `next.config.ts`
- Dependabot (`.github/dependabot.yml`), with a CI-gated automerge workflow for patch/minor
- Gitleaks (`.gitleaks.toml`)
- GitHub Actions: CI (lint/typecheck/test/build), Sentry release (runs only when the repo variable `SENTRY_ENABLED` is `true`), accessibility (`ally-a11y`, report only), CodeQL and OpenSSF Scorecard security scanning, plus dependency override and lockfile helpers

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Start dev server |
| `pnpm build` | Production build (`next build --webpack`) |
| `pnpm start` | Serve the production build |
| `pnpm test` | Vitest run |
| `pnpm test:watch` | Vitest watch mode |
| `pnpm lint` / `pnpm lint:fix` | Biome lint, without or with fixes |
| `pnpm format` | Biome format, writes changes |
| `pnpm check` | Biome format + lint, write fixes |
| `pnpm ci` | Biome verify (no writes), used in CI |
| `pnpm typecheck` | `tsc --noEmit` |

## Environment variables

`.env.example` lists the names (values are never committed): `SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `RESEND_API_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_PUBLIC_KEY`, `LANGFUSE_BASE_URL`, `DATABASE_URL` and `OTEL_SERVICE_NAME`.

## After clone checklist

- [ ] `pnpm install`
- [ ] `vercel env pull .env.local` (or copy from `.env.example`)
- [ ] Set `SENTRY_PROJECT` and `SENTRY_DSN`
- [ ] In GitHub repo: set `SENTRY_AUTH_TOKEN` (secret) and `SENTRY_ENABLED=true` (var) if using release workflow

## Project structure

```
src/app/        # layout, page, not-found, global-error, robots, sitemap
src/lib/        # resend, posthog-server, langfuse, security-headers, site
src/components/ # placeholder
tests/          # Vitest tests (example, seo, security headers)
.github/        # CI, security and dependency workflows
```

## License

MIT. See `LICENSE`.
