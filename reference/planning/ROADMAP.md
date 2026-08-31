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

## Where things stand (2026-08-31)

| Metric | Value |
|---|---|
| Total brands | 1,747 |
| Total premises | 4,680 |
| Total menu items | 2,560 |
| Brands with ≥1 menu item | 1,674 (95.8%) |
| Zero-menu brands remaining | 73 |
| Menu items with ≥1 diet tag | 1,330 (52.0%) |
| Confidence breakdown | 73 verified / 2,481 estimated / 6 community |
| Premises missing lat/lng | 0 |
| Duplicate ids / orphaned brandIds | 0 / 0 (brands, premises, menu items) |
| Grocery SKUs populated (dedicated `GroceryProduct` schema) | 0 |

**Launch-readiness review completed 2026-08-31** (code + database, requested
directly). Verdict: **the database and the codebase are launch-ready; one
real product-quality bug should be fixed first, and one known UX rough edge
is a judgment call.** Full findings:

- **Confirmed FIXED**: the 2026-08-22 fix that excluded `supermarket`
  outletType from the homepage "Top protein/$ picks" carousel holds — spot-
  checked live, the carousel shows real dishes only.
- **Confirmed STILL PRESENT, and worse than originally scoped — real bug,
  not just a UI nice-to-have**: 17 `MenuItem` rows (category `"Ingredients"`,
  brandId `fairprice`) store **whole-retail-package totals**, not per-serving
  macros — e.g. `ing_jasmine_rice`: 18,000 cal / 350g protein / $12 (a whole
  bag of rice, not a serving). These aren't excluded from the **main
  screener table** (only from the top-picks carousel), so a first-time
  visitor with no filters applied, sorting by the default Protein/$ column,
  sees a bag of rice ranked above every real dish in the database — directly
  undercutting the "real dishes, not confusing numbers" pitch. This is what
  `GroceryProduct` (per-100g + package size) was designed to model correctly;
  these 17 rows were never migrated to it. **Recommended before/shortly
  after launch:** either rescale these 17 items to a realistic single
  serving, or exclude `category: "Ingredients"` from the main table the same
  way `supermarket` is excluded from the carousel, until real
  `GroceryProduct` rows replace them properly.
- **Confirmed STILL PRESENT, cosmetic not broken**: the results table does
  not reflow into a card layout on mobile — it stays a horizontally-
  scrollable table, so a mobile visitor sees item name first and must swipe
  sideways to see calories/protein/price. Data is reachable, just not a
  great first impression on what's likely majority-mobile traffic. Lower
  priority than the ingredients bug above; a product polish item, not a
  launch blocker.
- **Database integrity, checked programmatically**: 0 duplicate ids and 0
  orphaned `brandId` references across all of Brands/Premises/MenuItems, 0
  premises missing coordinates, 0 price outliers (≤0 or >$100). The only
  `calories > 2000` items are legitimate family-size items (Jollibee 8pc
  bucket, KK dozen donuts) — not data errors.
- **Automation review** (first runs since the six scheduled tasks were
  re-enabled 2026-08-30): reviewed every commit and uncommitted change from
  the overnight runs. All of it held to the never-fabricate rule correctly
  — see the McCafe and content-queue entries below. Found and fixed a real
  hygiene issue: legitimate research output (2 Dosirak premises, a
  research-session report, a Post-Copilot digest) was sitting uncommitted,
  and 14 ephemeral `scratch_compute*.ts` debug scripts were left uncommitted
  in the repo root — committed the real work, deleted the scratch files
  (commit `e48d28f`). **Practical implication: someone needs to periodically
  check for and commit/clean up automation output** — it doesn't fully
  self-tidy yet.

The core data-completeness problem flagged in the (now-retired) launch
guide — "4 out of 5 listed places have nothing to screen" — remains
**effectively solved**: menu coverage is 95.8% across dozens of research
batches (full history in `../research-sessions/`).

**Deploy status, checked directly against Vercel on 2026-08-31:** `main` is
pushed and production is live and in sync — the latest deployment
(`dpl_F1E5qdwUq7CU4AErmZRy1wpvgBqw`) is `READY` at commit `b6efd11` (includes
the new SEO pages), build completed in 1 minute with all 4,305 static pages
generated cleanly, auto-deployed via the GitHub integration. No runtime
errors in the last 7 days. Note: an automated research task's own sandbox
hit an OOM crash (`SIGBUS`) trying to run `npm run build` locally on this
same commit and reasoned it was environmental rather than content-related —
**confirmed correct**: Vercel's own build of the identical commit succeeded
without issue, so this was a sandbox resource limit, not a real build
problem. **Web Analytics is confirmed still not enabled** on the
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

1. **Fix the 17 `Ingredients`-category `MenuItem` rows storing whole-package
   totals** (e.g. `ing_jasmine_rice`: 18,000 cal for $12) — found during the
   2026-08-31 launch-readiness review. These dominate the *main* screener
   table's default Protein/$ sort (not just the top-picks carousel, which
   was already fixed 2026-08-22), so a first-time visitor's very first
   impression is a bag of rice outranking every real dish. Two options:
   rescale to a realistic single serving, or exclude `category:
   "Ingredients"` from the main table until real `GroceryProduct` rows
   (per-100g + package size — the schema this data should actually live in)
   replace them. Highest-priority open item; everything else here is
   secondary to first-visitor experience.
2. ~~**Watch the first few automated runs before trusting the pipeline
   unattended.**~~ — **Done 2026-08-31.** Reviewed every commit + uncommitted
   change from the first overnight runs since re-enabling. Automation held
   the never-fabricate rule correctly throughout (see McCafe/content-queue
   entries above). Found one real gap: legitimate output was sitting
   uncommitted alongside 14 ephemeral debug scripts — committed the former,
   deleted the latter (`e48d28f`). **The pipeline does not fully self-tidy**
   — periodically check for and commit stray automation output; it won't
   reach production otherwise.
3. **Turn on Vercel Web Analytics** — confirmed still off as of 2026-08-31.
   No code change, just a dashboard toggle (no API/tool can do this from
   here), and it blocks every data-informed growth decision after it —
   including whether the now-automated content posts are doing anything.
4. ~~**Per-brand/per-dish SEO pages**~~ — **Done and LIVE as of 2026-08-31.**
   `/brand/[id]` (1,747 pages) and `/brand/[id]/[itemId]` (2,552 pages), plus
   `sitemap.ts`/`robots.ts`. Confirmed on Vercel: commit `b6efd11` deployed
   `READY`, build completed in 1 minute, all 4,305 pages generated; spot-
   checked live (`/brand/mcd/mcd_big_mac`, `/sitemap.xml`, `/robots.txt` all
   serving correctly). `ScreenerTable.tsx` links through to them. Vercel
   Analytics (still off, item 3 above) is the only way to later tell whether
   it's driving traffic.
5. ~~**Verify the two still-open UI findings**~~ — **Done 2026-08-31**, see
   the launch-readiness review above: grocery-ingredients issue confirmed
   present and escalated to item 1; mobile table reflow confirmed present,
   kept as lower-priority polish (item 6 below).
6. **Mobile table reflow** — results table stays a horizontally-scrollable
   table on mobile rather than reflowing to cards; data is reachable via
   swipe, just not a great first impression on likely-majority-mobile
   traffic. Polish, not a blocker.
8. **Decide on task #29** (Google Maps/Street View escalation for the ~12
   remaining SFA-licensee-name brands text search can't identify) — either
   commit to doing it (needs a visual-identification workflow this session
   doesn't have) or explicitly accept those ~12 brands as permanently out of
   scope for menu coverage.
9. **Diet-tag coverage decision**: 52.0% may already be near the ceiling
   given the conservative tagging rules (`CLAUDE.md` section 5.1) — before
   running another backfill batch, sample untagged items to estimate how
   many are "legitimately untaggable" vs "overlooked." Don't assume the
   number itself is a problem.
10. **Grocery SKUs** (`GroceryProduct`, currently 0 rows) — real per-package
    research for FairPrice/Cold Storage/Giant/Sheng Siong/Don Don Donki is
    unstarted. This is also the proper fix for item 1's 17 misshapen
    `Ingredients` rows — doing this well would let those 17 items migrate to
    the correct schema instead of just being hidden or rescaled.

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
