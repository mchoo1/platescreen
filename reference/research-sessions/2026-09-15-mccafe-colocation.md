# 2026-09-15 — Scheduled grocery-track run (19th pass on `mccafe_colocation_research`)

**Track:** `grab_go` / `ready_to_eat` / `supermarket`
**Outcome:** No new Brand/MenuItem/GroceryProduct/Premises data added. Queue entry left `'pending'`. Build/typecheck and git commit skipped (nothing to verify or commit).

## Queue scan (Phase 1)

Parsed `src/lib/researchQueue.ts` (131 entries). Filtered to `status: 'pending'` AND `type` in `{grab_go, ready_to_eat, supermarket}`.

**Result: exactly one match** — `mccafe_colocation_research` (`type: grab_go`, `priority: medium`). `ok_convenience`, the only other entry that ever sat in this track, is `'researched'` (confirmed defunct business, see its notes). Every other in-scope entry is already `'researched'`. This is the 19th consecutive scheduled run to land on this same single candidate.

## Why nothing was added this pass

This entry's `notes` field (now ~22KB, 18 prior dated updates from 2026-08-24 through 2026-09-14b) documents a settled finding: the empirical question — does McCafé still operate in Singapore — was answered back on 2026-08-31 (yes, but via main-counter service since 27 Mar 2026, not dedicated McCafé corners; `mcdonalds.com.sg/mccafe` states "Available at all restaurants islandwide"). What's unresolved is a **schema/taxonomy decision**, not a research gap:

- **(a)** Copy all ~136–145 existing `mcdonalds` Premises rows as new `mccafe` Premises rows, or
- **(b)** Fold `mccafe`'s existing 10 MenuItems into the `mcdonalds` Brand as a beverage category and drop the standalone `mccafe` Brand.

Both options mean restructuring/bulk-editing an existing, already-populated Brand (`mcdonalds`) — outside this task's normal scope of "research one queue entry and append records for it." Every prior pass (dating back to 2026-08-30) independently reached the same conclusion and declined to make this call unilaterally. I re-verified rather than re-investigated and found no change:

- `brands.ts` — `mccafe` Brand still present, unchanged.
- `menuItems.ts` — still exactly 10 `mccafe` MenuItems.
- `premises.ts` — still 0 rows for `brandId: "mccafe"`.
- `researchQueue.ts` — `ok_convenience` still `'researched'`; no other in-scope entries exist.

No new facts would change this outcome, so I did not re-run the WebSearch investigation. I appended a single-line 19th-pass reconfirmation to the entry's `notes` field (per the standing guidance the 17th pass left in that same field: "future scheduled runs should record only a one-line reconfirmation here unless the underlying facts or schema change").

**Recommendation (unchanged, now reiterated a 19th time):** a human should either make the (a)/(b) taxonomy call directly, or change this entry's priority/status so automated runs stop re-selecting a decision they cannot make. `ResearchQueueEntry.status` only supports `'pending' | 'researched'` (`src/types/db.ts`) — there's no schema-supported "blocked" state to stop the re-pick loop.

## Repo hygiene note (separate from the above)

Before touching anything, `git status` showed a substantial pre-existing uncommitted diff (`reference/planning/ROADMAP.md`, `src/lib/branchQueue.ts`, `src/lib/brands.ts`, `src/lib/menuItems.ts`, `src/lib/premises.ts`, `src/lib/researchQueue.ts`) plus several untracked session-report files, all dated 2026-09-14. Inspecting the diffs, this is legitimate finished work from the **sibling restaurant-track task** (e.g. a new `the_neighbourwok_fried_hokkien_prawn_mee_clementi_mall` Brand/MenuItems/Premises) that was never committed — it appears an earlier run hit a stale `.git/HEAD.lock` (dated 2026-09-13, no git process was actually running) that blocked commits. I could `mv` the stale lock out of the way (file deletion is blocked on this mount — `rm` fails with "Operation not permitted" even on a fresh empty file; `mv`/rename works, which explains the long trail of `.bak`/`.stale`/`.tryrename` lock filenames already in `.git/` from prior recovery attempts) so `git` itself works again, but I did **not** commit or otherwise touch that pre-existing restaurant-track diff — it's outside this task's scope and I have no way to verify it here. It's still sitting uncommitted in the working tree. A human (or the next restaurant-track run) should review and commit it separately so it isn't lost.

## Phase 4 / 5

- **Typecheck:** skipped — no `Brand`/`MenuItem`/`GroceryProduct`/`Premises` data changed this pass.
- **Commit:** skipped — the only edit was the one-line notes reconfirmation in `researchQueue.ts`, on a line that was itself already part of the pre-existing uncommitted diff above. Committing now would have required either sweeping in the unrelated restaurant-track changes (`git add -A`) or hand-picking hunks in a file I can't fully verify. Left uncommitted, consistent with the 17th/18th pass precedent of skipping commit for no-op reconfirmations.
