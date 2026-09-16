# mccafe_colocation_research — 22nd pass reconfirmation (2026-09-16)

## Scope
Scheduled grocery-track run (`grab_go`/`ready_to_eat`/`supermarket`). Phase 1 deterministic selection: `mccafe_colocation_research` is the sole `pending` entry in this track (`ok_convenience` remains `researched`).

## What was checked
- `brands.ts`: `mccafe` Brand still present, unchanged.
- `menuItems.ts`: still exactly 10 `mccafe`-tagged MenuItems.
- `premises.ts`: still 0 rows for `brandId: "mccafe"`.
- `researchQueue.ts`: `ok_convenience` still `researched` — confirmed `mccafe_colocation_research` is the only in-scope candidate.

No new facts and no schema change since 2026-08-30/31. This is the 22nd consecutive scheduled run reaching the identical conclusion.

## Why nothing was written
The blocker is not a missing fact — it's an unresolved product/schema decision on an **existing, populated** Brand:

- **(a)** Copy all ~145 `mcdonalds` Premises rows as new `mccafe` Premises rows (McCafé beverages are confirmed served islandwide from the main counter since the dedicated barista-corner service model was retired 27 Mar 2026), **or**
- **(b)** Fold `mccafe`'s 10 MenuItems into the `mcdonalds` Brand as a beverage category and drop the standalone `mccafe` Brand entirely.

Either option is a taxonomy/restructuring decision on an already-populated Brand, outside this task's normal per-entry "research and append" scope. Making that call unilaterally in an unattended run risks baking in the wrong data model for a Brand other automated passes (and the live app) already depend on.

## Note on repo state during this run
At the time of this run, `src/lib/premises.ts` and `src/lib/researchQueue.ts` had pre-existing uncommitted modifications unrelated to `mccafe` (consistent with a concurrent restaurant-track run — e.g. `lixin_teochew_fishball_noodle_square_2` / `545_whampoa_prawn_noodles_square_2` session reports dated the same day). This run did not stage, commit, or otherwise touch that unrelated work.

## Action taken
- Appended a short reconfirmation note to `mccafe_colocation_research` in `researchQueue.ts`.
- No Brand/MenuItem/GroceryProduct/Premises edits.
- Status left `pending`.
- Typecheck and git commit skipped (nothing in this task's scope changed).

## Recommendation (unchanged, restated with more urgency)
22 identical outcomes in a row is conclusive: this queue entry cannot be resolved by further scheduled research passes. A human should:
1. Make the (a)/(b) taxonomy call directly, or
2. Reprioritize/flag this entry (e.g. lower its priority, or extend `ResearchQueueEntry.status` with a `'blocked'` state) so automated runs stop re-selecting it every cycle.

Until one of those happens, every future scheduled grocery-track run will keep re-picking this same entry and re-confirming the same blocker.
