# Agent Instructions

Single source of truth for AI coding agents (Claude Code, Cursor, Aider, Codex, etc.).
`CLAUDE.md` is symlinked to this file.

## Stack

- Next.js 16 (App Router)
- React 19, TypeScript (strict)
- Tailwind CSS v4
- Shadcn/ui (add components on demand)
- pnpm (never npm/yarn)
- Biome (never ESLint/Prettier)
- Vitest for tests
- Sentry + OpenTelemetry for observability

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm test` — Vitest
- `pnpm check` — Biome format + lint with autofix
- `pnpm ci` — Biome verify (CI mode, no writes)
- `pnpm typecheck` — `tsc --noEmit`

## Structure

- `src/app/` — Next.js App Router pages and layouts
- `src/components/` — React components
- `src/lib/` — Utilities (resend, posthog-server, langfuse already provided)
- `src/types/` — Shared TypeScript types
- `tests/` — Vitest tests
- `instrumentation.ts` — OTel + Sentry runtime registration
- `sentry.{client,server,edge}.config.ts` — Sentry SDK init per runtime

## Conventions

- Functional components with hooks
- Server Components by default; `"use client"` only when needed
- Tailwind for styling, no CSS modules
- `async`/`await` over `.then()`
- Explicit return types on exported functions
- Double quotes, semicolons, trailing commas (enforced by Biome)
- Import type with `import type` (enforced by Biome)

## Environment

- Copy `.env.example` to `.env.local`
- For Vercel projects: `vercel env pull .env.local`
- Never commit `.env*` files except `.env.example`

## Quality gates

- Biome runs on every commit (via global gitleaks pre-commit hook chain)
- CI runs: Biome check, typecheck, vitest, build
- Renovate handles dependency updates Mondays before 9am
- Gitleaks scans for secrets pre-commit (global hook)

## Database

- Drizzle (preferred for Neon) or Prisma (preferred for Supabase)
- Migrations only — never raw schema edits
- Set `DATABASE_URL` in `.env.local`

## Change discipline

- Every changed line should trace to the request — no drive-by improvements
- Match existing style even if you'd do it differently
- Mention unrelated issues, don't fix them silently
- Remove only what your changes made unused
