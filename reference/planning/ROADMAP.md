# PlateScreen — Roadmap & Current Status

**Last updated:** 2026-08-30. This is the entry point for "what's the state of
this project and what should happen next" — read this before the other files
in this folder, which are point-in-time strategy docs that may have stale
numbers (each is dated; treat the numbers in this file as current).

See `../../CLAUDE.md` for architecture and operating rules, and
`POSITIONING.md` for how to describe the product (introduction, research
value proposition, moat) — this file is about priorities and sequencing,
not how the codebase works or how to talk about it.

---

## Where things stand (2026-08-30)

| Metric | Value |
|---|---|
| Total brands | 1,747 |
| Total premises | 4,678 |
| Total menu items | 2,552 |
| Brands with ≥1 menu item | 1,673 (95.8%) |
| Zero-menu brands remaining | 74 |
| Menu items with ≥1 diet tag | 1,327 (52.0%) |
| Premises missing lat/lng | 0 |
| Grocery SKUs populated | 0 |

The core data-completeness problem flagged in the (now-retired) launch
guide — "4 out of 5 listed places have nothing to screen" — is **effectively
solved**: menu coverage went from 20% to 95.8% across dozens of research
batches (full history in `../research-sessions/`). Two smaller findings from
that same review have **not been re-verified since**: whether the
homepage's "top picks" still surfaces raw grocery ingredients instead of
meals, and whether the results table still fails to reflow on mobile. Check
the live app before assuming either is still true or still false.

**Deploy status, checked directly against Vercel on 2026-08-30:** `main` is
pushed and production is live and in sync — the latest deployment
(`dpl_3J7rBucrRmbhfVERpsc11WaKES3Z`) is `READY` at commit `b80bec1`,
auto-deployed via the GitHub integration as expected. No runtime errors in
the last 7 days. **Web Analytics is confirmed still not enabled** on the
project (`web_analytics_not_enabled` from the API) — flagged as missing in
the 2026-08-22 growth-strategy research over a week ago and still hasn't
been turned on; it's a one-click toggle in the Vercel dashboard (Project →
Analytics tab) and nothing in this repo can turn it on for you.

**Important correction, found 2026-08-30 — the growth/content automation
already exists, it's just switched off.** An earlier version of this
project's planning docs assumed content-drafting automation "doesn't exist
yet" and proposed building it. That was wrong. Checking the actual scheduled
task list found six PlateScreen tasks already built and fully wired up:

| Task | What it does | Status |
|---|---|---|
| `platescreen-research-restaurants` | 3x/day — researches restaurants/hawker/food-court menu items from the queue | Disabled, last ran 2026-08-23 |
| `platescreen-research-grocery` | 3x/day — same, for grab & go / convenience / supermarket | Disabled, last ran 2026-08-23 |
| `platescreen-research-branches` | 3x/day — backfills real branch locations (Premises) | Disabled, last ran 2026-08-23 |
| `platescreen-sync-to-stride` | Weekly — draft-exports new data to Stride's schema for review | Disabled, last ran 2026-08-22 |
| `platescreen-post-copilot` | Mon/Thu — drafts a real leaderboard post, types it into Reddit, stops before posting | Disabled, **never actually run** (no digest folder exists) |
| `platescreen-comment-copilot` | Wed — finds relevant threads, drafts replies, stops before sending | Disabled, never run |

All six were disabled around 2026-08-22/23 — the same window this project's
manual, Cowork-session batch research (documented in `../research-sessions/`,
batches A through BL) took over as the actual mechanism driving progress.
**Why they were turned off isn't recorded anywhere in this repo** — it may
have been a deliberate choice to keep tighter human oversight during the
zero-menu backfill push, or they may have just been paused for a specific
reason and not resumed. Don't assume either explanation; ask before
re-enabling anything, and see priority item 1 below.

---

## Active / near-term (in priority order)

1. **Decide what to do with the six disabled scheduled tasks above.** This
   is the highest-leverage open item on this whole list — it's already-built
   automation, not something to design or build from scratch. Options: leave
   the three research tasks off (manual batch work has been outperforming
   the "next queue entry" pace anyway) but re-enable `platescreen-post-
   copilot`/`-comment-copilot` now that there's real data worth posting
   (they were built when coverage was ~20-30%, useless to post from; at
   95.8% they'd actually work), or review all six with fresh eyes before
   touching any of them. Either way, a decision beats them sitting
   indefinitely idle and undocumented.
2. **Verify the two still-open UI findings** from the 2026-08-22 review
   (grocery-ingredients-as-top-picks; mobile table reflow) — quick to check,
   blocks confidently calling the app launch-ready end to end.
3. **Turn on Vercel Web Analytics** — confirmed still off as of 2026-08-30.
   No code change, just a dashboard toggle, and it blocks every
   data-informed growth decision after it.
4. **Decide on task #29** (Google Maps/Street View escalation for the ~12
   remaining SFA-licensee-name brands text search can't identify) — either
   commit to doing it (needs a visual-identification workflow this session
   doesn't have) or explicitly accept those ~12 brands as permanently out of
   scope for menu coverage.
5. **Diet-tag coverage decision**: 52.0% may already be near the ceiling
   given the conservative tagging rules (`CLAUDE.md` section 5.1) — before
   running another backfill batch, sample untagged items to estimate how
   many are "legitimately untaggable" vs "overlooked." Don't assume the
   number itself is a problem.
6. **Grocery SKUs** (`GroceryProduct`, currently 0 rows) — real per-package
   research for FairPrice/Cold Storage/Giant/Sheng Siong/Don Don Donki is
   unstarted. Low urgency unless growth plans specifically want packaged-
   grocery comparisons, since it's a genuinely different data shape (per-100g
   + package size vs. one dish/one serving).

## Not started, lower priority

- Per-brand/per-dish SEO pages (`/brand/mcdonalds`, etc.) — the
  highest-leverage *product* growth idea from the 2026-08-22 research, since
  the data to populate hundreds of indexable pages already exists. A product
  change (new Next.js routes + sitemap), not a content task.
- A public feedback mechanism (even a footer `mailto:` or a linked form) —
  flagged as missing in the retired launch guide; status not re-checked.

## Historical / superseded, kept for reference only

- `database-restructure-proposal-2026-08-20.md` — **DONE**, the Brand/
  Premises/MenuItem split it proposed was implemented. Kept in place (not
  deleted) because `platescreen-research-restaurants`'s own task definition
  points to it by path — don't rename or move this file without also
  updating that scheduled task.
- `growth-strategy-2026-08-22.md` and `growth-content-ideas.md` — kept in
  place for the same reason: `platescreen-post-copilot`'s task definition
  reads both by exact path. The strategy doc's numbers (776 brands, "growing
  3x/day") are stale per the corrected automation status above — the
  content queue itself is still a reasonable starting set of themes.
- The former `launch-guide-2026-08-22.md` and `AUTOMATION_PROPOSAL.md` have
  been retired and merged into this file (2026-08-30 consolidation) — their
  substance now lives in the sections above rather than as separate files.

---

## How to pick this up in a fresh session

1. Read `../../CLAUDE.md` in full (architecture + the "never fabricate" rule
   + diet-tag rules + the batch verification pipeline).
2. Read this file.
3. Skim the 3-5 most recent files in `../research-sessions/` (sorted by
   filename date) for anything-in-flight context this file doesn't capture.
4. Check the in-app Cowork task list for granular in-progress items, and
   `mcp__scheduled-tasks__list_scheduled_tasks` for the six PlateScreen
   automations above — both carry state this file doesn't duplicate.
