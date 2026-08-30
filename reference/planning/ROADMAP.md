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

**Decision made 2026-08-30 — all six re-enabled, per explicit user request
to "make it self run."** All six PlateScreen scheduled tasks are now active:

| Task | What it does | Status |
|---|---|---|
| `platescreen-research-restaurants` | 3x/day — researches restaurants/hawker/food-court menu items from the queue | **Enabled**, next run 2026-08-30 |
| `platescreen-research-grocery` | 3x/day — same, for grab & go / convenience / supermarket | **Enabled**, next run 2026-08-30 |
| `platescreen-research-branches` | 3x/day — backfills real branch locations (Premises) | **Enabled**, next run 2026-08-30 |
| `platescreen-sync-to-stride` | Weekly Sunday — draft-exports new data to Stride's schema for review | **Enabled**, next run 2026-09-06 |
| `platescreen-post-copilot` | Mon/Thu — drafts a real leaderboard post, types it into Reddit, stops before posting | **Enabled**, next run 2026-08-31 |
| `platescreen-comment-copilot` | Wed — finds relevant threads, drafts replies, stops before sending | **Enabled**, next run 2026-09-02 |

**What this does and doesn't make autonomous, stated plainly:** the three
research tasks and the Stride sync run fully unattended — they only write
to this repo and commit locally (never push), so there's nothing for a
human to approve mid-run. The two content tasks draft automatically on
schedule, but **the actual "Post"/"Send" click on Reddit is a hard stop
every single run, by design and by platform/safety rule — not a setting
that can be turned off.** Every run ends with a filled-in draft sitting in
an open browser tab (or the full text in that day's digest under
`Post-Copilot-Digests/`/`Comment-Copilot-Digests/`) waiting for a human
click. "Self-running content creation" means the drafting is unattended;
publishing never will be, on this or any platform's rules. Check
`Post-Copilot-Digests/` and `Comment-Copilot-Digests/` (created on first
run) regularly, or nothing actually reaches Reddit.

Local commits will now accumulate from the research/sync tasks running
unattended — remember to periodically `git pull && git push` (see section 8
of `CLAUDE.md`) so the live site actually reflects what the automation adds.

---

## Active / near-term (in priority order)

1. **Watch the first few automated runs before trusting the pipeline
   unattended.** All six tasks were just re-enabled 2026-08-30 with no
   interim verification run. Check the first research-task commits and the
   first post/comment-copilot digest for quality before assuming the
   pipeline is reliable at 3x/day/task volume — a bad run compounds fast if
   nobody checks it for a week.
2. **Turn on Vercel Web Analytics** — confirmed still off as of 2026-08-30.
   No code change, just a dashboard toggle (no API/tool can do this from
   here), and it blocks every data-informed growth decision after it —
   including whether the now-automated content posts are doing anything.
3. **Per-brand/per-dish SEO pages** (`/brand/mcdonalds`, etc.) — the
   highest-leverage *product* growth idea from the growth-strategy research,
   since the data to populate hundreds of indexable pages already exists.
   Still unbuilt as of 2026-08-30. A product change (new Next.js routes +
   sitemap), not something the content-drafting automation can produce.
4. **Verify the two still-open UI findings** from the retired launch guide
   (grocery-ingredients-as-top-picks; mobile table reflow) — quick to check,
   blocks confidently calling the app launch-ready end to end.
5. **Decide on task #29** (Google Maps/Street View escalation for the ~12
   remaining SFA-licensee-name brands text search can't identify) — either
   commit to doing it (needs a visual-identification workflow this session
   doesn't have) or explicitly accept those ~12 brands as permanently out of
   scope for menu coverage.
6. **Diet-tag coverage decision**: 52.0% may already be near the ceiling
   given the conservative tagging rules (`CLAUDE.md` section 5.1) — before
   running another backfill batch, sample untagged items to estimate how
   many are "legitimately untaggable" vs "overlooked." Don't assume the
   number itself is a problem.
7. **Grocery SKUs** (`GroceryProduct`, currently 0 rows) — real per-package
   research for FairPrice/Cold Storage/Giant/Sheng Siong/Don Don Donki is
   unstarted. Low urgency unless growth plans specifically want packaged-
   grocery comparisons, since it's a genuinely different data shape (per-100g
   + package size vs. one dish/one serving).

## Not started, lower priority

- A public feedback mechanism (even a footer `mailto:` or a linked form) —
  flagged as missing in the retired launch guide; status not re-checked.

## Historical / superseded, moved to archive/ (2026-08-30 restructure)

Since the six scheduled tasks are being redone from scratch anyway (priority
1 above), the old path-dependency that previously forced some dated docs to
stay in place is gone. `reference/planning/` now has clean-named, current
files at its root, with everything superseded moved to `archive/` rather
than deleted:

- `SCHEMA_HISTORY.md` (new) replaces `database-restructure-proposal-2026-08-20.md`
  (**DONE** — the Brand/Premises/MenuItem split it proposed was implemented;
  full original reasoning preserved in `archive/`).
- `GROWTH_STRATEGY.md` (new) replaces `growth-strategy-2026-08-22.md` — same
  strategic reasoning, current numbers instead of the stale "776 brands,
  growing 3x/day."
- `CONTENT_QUEUE.md` (new) replaces `growth-content-ideas.md` — identical
  content queue, just renamed.
- `launch-guide-2026-08-22.md` and `AUTOMATION_PROPOSAL.md` — retired
  entirely (their substance already lives in the sections above), moved to
  `archive/` rather than deleted.
- The 3 old scheduled tasks that referenced the pre-2026-08-30 file paths
  (`platescreen-research-restaurants`, `platescreen-post-copilot`,
  `platescreen-comment-copilot`) had their prompts updated to point at the
  new filenames — see each task's own definition for the current reference.

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
