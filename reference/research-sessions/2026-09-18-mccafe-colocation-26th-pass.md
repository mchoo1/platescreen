# 2026-09-18 — mccafe_colocation_research (26th pass, scheduled grocery-track run)

## Track
`platescreen-research-grocery` (grab_go / ready_to_eat / supermarket)

## Queue scan
Filtered `RESEARCH_QUEUE` to `status: 'pending'` AND `type` in {`grab_go`, `ready_to_eat`, `supermarket'}.
Result: **1 entry** — `mccafe_colocation_research` (priority: medium). `ok_convenience`, the only
other entry that has ever competed with it in this track, remains `'researched'`. No other
candidate exists, so this is the deterministic pick again, not a fallback choice.

## Re-verification (no re-investigation — this question was already answered 25 times)
- `premises.ts`: 0 rows with `brandId: "mccafe"` (unchanged).
- `brands.ts`: `mccafe` Brand row still exists (unchanged).
- `menuItems.ts`: 10 `mccafe` MenuItems still present (unchanged).
- `ok_convenience` queue entry: still `status: "researched"`.

No new facts were sought. The blocker identified on 2026-08-30 and reconfirmed on every scheduled
pass since (25 consecutive prior passes, most recently the 25th pass on 2026-09-17b) is a
**schema/taxonomy decision**, not a missing fact:

> Premises rows are strictly one-`brandId`-per-row. Representing "McCafé beverages are served from
> every McDonald's main counter islandwide" (confirmed via McDonald's SG's own site + Help Center —
> the standalone barista McCafé corner concept was retired chain-wide from 27 March 2026) requires a
> human to choose between (a) copying all ~136 `mcdonalds` Premises rows as new `mccafe` Premises
> rows, or (b) retiring the standalone `mccafe` Brand and folding its MenuItems into `mcdonalds` as a
> beverage category. Both are legitimate, neither is this research task's call to make unilaterally.

This is now a **26th consecutive identical outcome**.

## Action taken this pass
None on Brand/MenuItem/GroceryProduct/Premises data — same as passes 2 through 25. Deliberately did
**not** append another multi-paragraph duplicate note to the `mccafe_colocation_research` entry in
`researchQueue.ts`: that field is already ~28,000 characters of near-identical restatement, and prior
passes (22nd–25th) already explicitly escalated this to the user as conclusive. Adding a 26th
restatement would compound the bloat without adding information. `researchQueue.ts` was **not
edited** this pass.

## Observed but out of scope — not touched
The working tree already had uncommitted changes when this pass started, unrelated to this track:
- `M src/lib/menuItems.ts`, `M src/lib/researchQueue.ts` — appear to belong to a same-day
  restaurant-track run (staged report: `reference/research-sessions/2026-09-18-food_junction_toast_junction.md`,
  not a grocery-track entry — Food Junction is a food-court operator, handled by the sibling
  `platescreen-research-restaurants` task).
- Two empty `_probe*.txt.stale-20260917` files (untracked). Read and confirmed empty/inert — not
  acted on.
- `.git/HEAD.lock` exists (dated today, 06:21 SGT) plus ~10 `HEAD.lock.bak*` artifacts going back to
  August, consistent with the recurring git-lock problem flagged in the 25th-pass report.

None of the above were modified, staged, or committed by this pass — they belong to a different
task's run and mixing them into a grocery-track commit would violate this task's scope.

## Phase 4/5
Skipped — no Brand/MenuItem/GroceryProduct/Premises files changed, nothing to typecheck or commit.

## Recommendation (restated, now with 26 data points behind it)
Automated re-picking of `mccafe_colocation_research` has run its course. Recommend one of:
1. A human makes the (a)/(b) Premises-modeling call above, so the entry can actually move to
   `'researched'`; or
2. The queue/status schema gains a way to mark an entry as blocked-on-human-decision (current
   `ResearchQueueEntry.status` is only `'pending' | 'researched'`) so scheduled runs stop re-selecting
   it as if it were open research work.

No further scheduled pass should re-investigate the underlying fact pattern — it hasn't changed since
2026-08-31 and won't change on its own.
