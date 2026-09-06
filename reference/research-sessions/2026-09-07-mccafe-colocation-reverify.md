# 2026-09-07 — Grocery-track scheduled run — mccafe_colocation_research (re-verify only)

## Track
`platescreen-research-grocery` (grab_go / ready_to_eat / supermarket queue entries only)

## Selection (Phase 1)
Filtered `RESEARCH_QUEUE` to `status: 'pending'` and `type` in `grab_go`/`ready_to_eat`/`supermarket`.
Only one match: `mccafe_colocation_research` (grab_go, priority medium). This is the sole
candidate in this track — every other entry with a matching type is already `'researched'`
(confirmed via grep, matching the state recorded by every scheduled run since 2026-09-03).

## Why no new records were added
This entry is not a normal "research a brand's menu" gap. The `mccafe` Brand already exists in
`brands.ts` with 10 real MenuItems (verified/estimated confidence). The empirical question —
does McCafé still operate as a physical subset of outlets, or is it available everywhere — was
already resolved on 2026-08-31: McDonald's Singapore retired dedicated McCafé service counters
islandwide on 27 March 2026; McCafé beverages are now served from the main counter at every
McDonald's location. Re-confirmed today via grep that `premises.ts` still has 0 rows for
`brandId: "mccafe"` and the `mccafe` Brand definition is unchanged — no drift since 2026-08-31.

What remains genuinely unresolved is a **data-modeling decision**, not a research gap: this
project's `Premises` schema is strictly one-`brandId`-per-row, so representing "McCafé exists
everywhere McDonald's does" requires choosing between:
- **(a)** copying all ~145 existing `mcd` Premises rows as new `mccafe` Premises rows, or
- **(b)** folding `mccafe`'s 10 MenuItems into the `mcd` Brand as a beverage category and
  deleting the standalone `mccafe` Brand.

This is the 11th consecutive scheduled run to reach this exact conclusion (see the full history
inline in `researchQueue.ts`'s `mccafe_colocation_research` entry, 2026-08-30 through today).
Ten independent prior passes — several with full browser/bash access and more context than this
one — each declined to make this call unilaterally, on the grounds that it means bulk-duplicating
or deleting data for an **existing, already-populated** Brand, which sits outside this task's
normal scope (research one queue entry, append records for it). I'm following that same judgment
this run rather than being the first to override it, since nothing about the underlying facts has
changed to justify a different call today.

## Action taken
- Re-verified current state only (grep against live `brands.ts`/`premises.ts`); no new
  WebSearch/browser investigation, since the facts haven't changed since 2026-08-31.
- Added one concise `UPDATE 2026-09-07` note to the queue entry (kept short, per the prior note's
  own request not to keep re-bloating the entry with a full restatement each time).
- Flagged for the record: `ResearchQueueEntry.status` (`src/types/db.ts`) only supports
  `'pending' | 'researched'` — there's no schema-supported way for a research task to mark this
  "blocked on a product decision" so future scheduled runs stop re-selecting it. A human should
  either make the (a)/(b) call directly, remove/reprioritize this queue entry, or extend the
  status enum.
- No Brand / MenuItem / GroceryProduct / Premises files touched.

## Verification
- Confirmed `researchQueue.ts` still parses as valid JS/TS after the edit (loaded it directly in
  Node from a scratch copy — 131 entries, no syntax errors).
- No other source files were modified, so a full `tsc --noEmit` pass wasn't necessary this run.

## Status
`mccafe_colocation_research` left `'pending'`. No fallback entry was researched in its place —
per Phase 1, this is the only candidate in the grocery/ready-to-eat/supermarket track.

## Recommendation
Same as the last several runs, stated once more for the record: a human should make the (a)/(b)
taxonomy call, or de-scope/reprioritize this entry, so future scheduled runs stop repeating this
same reconfirmation.
