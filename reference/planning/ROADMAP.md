# PlateScreen — Roadmap & Current Status

**Last updated:** 2026-08-30. This is the entry point for "what's the state of
this project and what should happen next" — read this before the other files
in this folder, which are point-in-time strategy docs that may have stale
numbers (each is dated; treat the numbers in this file as current).

See `../../CLAUDE.md` for architecture and operating rules. This file is
about priorities and sequencing, not how the codebase works.

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

The core data-completeness problem flagged in `launch-guide-2026-08-22.md`
("4 out of 5 listed places have nothing to screen") is **effectively solved**
— menu coverage went from 20% to 95.8% across dozens of research batches
(full history in `../research-sessions/`). The launch-guide's other two
findings (homepage's "top picks" surfaced raw grocery ingredients instead of
meals; the results table doesn't reflow on mobile) have **not been
re-verified** — check the live app before assuming either is still true or
still false.

**Deploy status, checked directly against Vercel on 2026-08-30:** `main` is
pushed and production is live and in sync — the latest deployment
(`dpl_3J7rBucrRmbhfVERpsc11WaKES3Z`) is `READY` at commit `b80bec1` (this
doc's own commit), auto-deployed via the GitHub integration as expected. No
runtime errors in the last 7 days. **Web Analytics is confirmed still not
enabled** on the project (`web_analytics_not_enabled` from the API) — this
was flagged as missing in `growth-strategy-2026-08-22.md` over a week ago and
still hasn't been turned on; it's a one-click toggle in the Vercel dashboard
(Project → Analytics tab) and nothing in this repo can turn it on for you.

---

## Active / near-term (in priority order)

1. **Verify the two remaining launch-guide UI issues are actually fixed or
   not** (grocery-ingredients-as-top-picks; mobile table reflow). Quick to
   check, blocks confidently calling the app launch-ready.
2. **Decide on task #29** (Google Maps/Street View escalation for the ~12
   remaining SFA-licensee-name brands text search can't identify) — either
   commit to doing it (requires a tool/workflow this session doesn't have
   yet — visual map identification, not text search) or explicitly accept
   those ~12 brands as permanently out of scope for menu coverage.
3. **Diet-tag coverage decision**: 52.0% may already be near the ceiling
   given the conservative tagging rules (`CLAUDE.md` section 5.1) — before
   running another backfill batch, do a sampling audit of untagged items to
   estimate how many are "legitimately untaggable" vs "overlooked." Don't
   assume the number itself is a problem.
4. **Grocery SKUs** (`GroceryProduct`, currently 0 rows) — real per-package
   research for FairPrice/Cold Storage/Giant/Sheng Siong/Don Don Donki is
   unstarted. Low urgency unless growth plans specifically want to compare
   packaged groceries, since it's a genuinely different data shape from
   everything else in the app (per-100g + package size vs one dish/one
   serving).
5. **Turn on Vercel Web Analytics** — confirmed still off as of 2026-08-30
   (see deploy-status note above). This blocks every growth decision below
   it (you can't act on "what are people searching for" without it), and
   it's the single easiest item on this whole list — no code change, just a
   dashboard toggle.

## Not started, lower priority

- Per-brand/per-dish SEO pages (`/brand/mcdonalds`, etc.) — the
  highest-leverage growth idea in `growth-strategy-2026-08-22.md`, since the
  data to populate hundreds of indexable pages already exists. This is a
  product change (new Next.js routes + sitemap), not a content task.
- The `platescreen-post-copilot` automation referenced in
  `growth-content-ideas.md` (a system that would compute leaderboard/ranking
  posts live from the data) doesn't exist as a built skill yet — see
  `AUTOMATION_PROPOSAL.md` for what that would take.
- `reference/planning/database-restructure-proposal-2026-08-20.md` is
  **DONE** — the Brand/Premises/MenuItem split it proposed was implemented
  (this is now just historical record of the design rationale, not an open
  proposal).

---

## How to pick this up in a fresh session

1. Read `../../CLAUDE.md` in full (architecture + the "never fabricate" rule
   + diet-tag rules + the batch verification pipeline).
2. Read this file.
3. Skim the 3-5 most recent files in `../research-sessions/` (sorted by
   filename date) for anything-in-flight context this file doesn't capture.
4. Check the in-app Cowork task list for granular in-progress items — task
   history through #77 as of this writing tracks essentially the entire
   project history at a finer grain than this file does.
