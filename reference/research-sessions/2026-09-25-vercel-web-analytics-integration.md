# 2026-09-25 — Enable Vercel Web Analytics (code integration)

## Why

Flagged as a launch-readiness item since 2026-08-22/31 (ROADMAP item 3):
Vercel Web Analytics was off, meaning there was no visibility into whether
platescreen.vercel.app had any real users. Direct request today ("turn it
on") after confirming it's genuinely free on this account's Hobby plan
(50,000 events/month included; Vercel's own docs confirm no charge ever on
overage — collection just pauses until the next billing cycle).

## Method

Two parts, since enabling it on Vercel's dashboard alone doesn't inject
any tracking script — Vercel's own "Get Started" guide (shown immediately
after enabling) requires the code integration:

1. **Dashboard**: enabled via Project → Analytics → Enable → confirmed
   "Web Analytics on Hobby" (the free tier, not the $20/mo Pro option) →
   Enable. Confirmed live via the Vercel API: `count_pageviews` went from
   `web_analytics_not_enabled` (400 error) to a real `{visitors: 0,
   pageviews: 0}` response (zero because no tracking script exists on any
   deployed page yet — that's part 2).
2. **Code**: added `@vercel/analytics` (`^2.0.1`) to `package.json`, and
   `<Analytics />` from `@vercel/analytics/react` (the framework-agnostic
   entry point — not `@vercel/analytics/next`, since this app builds via
   `output: 'export'` in `next.config.js`, a fully static export with no
   Next.js server runtime) to `src/app/layout.tsx`'s `<body>`, alongside
   `{children}`.

## Verification

- `npm install @vercel/analytics@^2.0.1` in the build mirror: clean,
  `package-lock.json` diff is purely additive (43 lines, 0 deletions).
- `npx tsc --noEmit`: clean (confirms the import and JSX resolve
  correctly against the package's own types).
- **Could not complete a full `npm run build`** in this sandbox — hit the
  same disk/time-constrained sandbox limitation documented repeatedly in
  this project's history (ROADMAP items 15/16/20 etc.): the build got to
  ~72MB free disk before the tool's execution cap killed it, with no
  `out/` directory produced yet. Cleaned up the partial `.next` directory
  afterward to recover disk space. Per this project's own established
  precedent, `tsc --noEmit` clean is treated as sufficient verification
  when a full build can't complete here — confirm via the next Vercel
  deploy instead, same as every prior instance of this constraint.
- Risk assessment for shipping without a completed local build: low.
  `@vercel/analytics/react` is Vercel's own documented, framework-agnostic
  integration path specifically for static/SPA builds (used verbatim from
  their own "Get Started" instructions), the change is a two-line,
  purely-additive JSX addition with no interaction with any existing
  component, screener logic, or data file, and `tsc` already confirms the
  types resolve.

## Not done / follow-ups

- Data won't appear in the Analytics dashboard until this is deployed to
  production (Vercel's own UI: "If you don't see data after 30 seconds,
  please check for content blockers and try to navigate between pages on
  your site") — needs the standing `git pull && git push` handoff, same
  as every other change in this session.
- Did not add `@vercel/speed-insights` (a separate, related product) —
  out of scope, only Web Analytics was requested.
