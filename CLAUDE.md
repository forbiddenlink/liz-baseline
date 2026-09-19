# liz-baseline

Day-0 Next.js template with quality gates pre-wired. Use it as a GitHub template
repo for new personal SaaS projects:

```bash
gh repo create forbiddenlink/NEW-NAME --template forbiddenlink/liz-baseline --private --clone
cd NEW-NAME
pnpm install
cp .env.example .env.local   # fill from Vercel
pnpm dev
```

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4
- pnpm (`packageManager` pinned to `pnpm@10.34.5`), never npm/yarn
- Biome (never ESLint/Prettier)
- Vitest for tests
- Sentry (`@sentry/nextjs`, client/server/edge configs) + OpenTelemetry
  (`@vercel/otel` via `instrumentation.ts`)
- Resend, PostHog (`posthog-node`), Langfuse helpers pre-wired in `src/lib/`
- Shadcn/ui is not installed yet; add components on demand with the shadcn CLI

## Commands

- `pnpm dev` - start dev server
- `pnpm build` - production build (`next build --webpack`)
- `pnpm start` - start production server
- `pnpm test` / `pnpm test:watch` - Vitest
- `pnpm check` - Biome format + lint with autofix (`biome check --write .`)
- `pnpm ci` - Biome verify, no writes (`biome ci .`); used in CI
- `pnpm typecheck` - `tsc --noEmit`

## Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components (empty placeholder; nothing added yet)
- `src/lib/` - `resend.ts`, `posthog-server.ts`, `langfuse.ts` helpers
- `tests/` - Vitest tests
- `instrumentation.ts` / `instrumentation-client.ts` - OTel + Sentry runtime registration
- `sentry.{server,edge}.config.ts` - Sentry SDK init per runtime

## Conventions

- Functional components with hooks
- Server Components by default; `"use client"` only when needed
- Tailwind for styling, no CSS modules
- `async`/`await` over `.then()`
- Double quotes, semicolons, trailing commas (enforced by Biome)
- `import type` for type-only imports (enforced by Biome)

## Environment

Names from `.env.example` (copy to `.env.local`, or `vercel env pull .env.local`
for a deployed project); never commit `.env*` except `.env.example`:

`SENTRY_DSN`, `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`,
`SENTRY_PROJECT`, `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`,
`RESEND_API_KEY`, `LANGFUSE_SECRET_KEY`, `LANGFUSE_PUBLIC_KEY`,
`LANGFUSE_BASE_URL`, `DATABASE_URL`, `OTEL_SERVICE_NAME`

## Quality gates

- CI (`.github/workflows/ci.yml`): Biome check (`pnpm ci`), typecheck, test, build
- `.github/workflows/ally-a11y.yml` - accessibility checks
- `.github/workflows/codeql.yml`, `scorecard.yml` - security scanning
- `.github/workflows/sentry-release.yml` - Sentry release tracking
- Dependabot (`.github/dependabot.yml`) handles dependency updates, not Renovate
- Gitleaks scans for secrets pre-commit (`.gitleaks.toml`, global hook chain)

## Database

No ORM is wired up yet; `DATABASE_URL` exists as an env var placeholder only.
When a project needs one: Drizzle for Neon, Prisma for Supabase. Migrations
only, never raw schema edits.

## After-clone checklist

- `pnpm install`
- `vercel env pull .env.local` (or copy from `.env.example`)
- Set `SENTRY_PROJECT` and `SENTRY_DSN`
- In the GitHub repo: set `SENTRY_AUTH_TOKEN` (secret) and `SENTRY_ENABLED=true`
  (var) if using the release workflow
