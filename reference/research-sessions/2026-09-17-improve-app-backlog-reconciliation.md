# 2026-09-17 — `platescreen-improve-app` — backlogged automation output reconciled and committed; stale git locks cleared

## Why

Scheduled `platescreen-improve-app` run. Before picking a new hand-authored
data-quality change, checked repo state per this task's own read-first
instructions (CLAUDE.md, ROADMAP.md, 5 most recent `research-sessions/`
files). `git status` showed several days' worth of legitimate, already
fully-researched automation output sitting uncommitted — a `Premises`
addition plus queue-note updates and their matching session reports —
blocked not by any content problem but by the recurring stale
`.git/index.lock` / `.git/HEAD.lock` issue ROADMAP item 7 has been tracking
since 2026-08-31. Three separate same-day runs (`mccafe-colocation-23rd-pass`,
`branches-queue-status-2nd-run`, `branches-queue-status-3rd-run`) had each
independently hit this lock, confirmed it wasn't safe to force at the time,
and left their work uncommitted with an explicit note asking a future run to
land it once clear. This run's first job was reconciling that backlog —
the same shape of task the 2026-09-15 `improve-app` run did — rather than
forcing a new blind data-quality edit before checking for it, consistent
with ROADMAP item 2's standing note that "the pipeline does not fully
self-tidy."

## What was found

- `git status`: 3 modified data files (`branchQueue.ts`, `premises.ts`,
  `researchQueue.ts`) and 6 untracked research-session reports + 1
  Comment-Copilot digest, all dated 2026-09-16.
- `.git/index.lock` and `.git/HEAD.lock`, both ~25h old (first observed by
  the 2nd branches run at 06:12 that date). `fuser` confirmed no process
  held either.
- 2 empty (0-byte) stray files, `_probe.txt` and
  `reference/research-sessions/_probe2.txt` — filesystem write-probe
  artifacts from an earlier session, not real content.

## Method

1. Read every pending diff and every untracked report in full before staging
   anything, checking each against CLAUDE.md section 5 (never-fabricate) and
   5.1 (diet-tag rules):
   - `premises.ts`: exactly one new row, `king_of_fried_rice_hws_p4` (Square
     2, Hawkers' Street) — an existing chain Brand gaining a new location,
     address/postal/coordinates reused verbatim from two sibling Square 2
     rows added the same day (sourced from Little Day Out / Eatbook.sg
     venue-opening coverage per that row's own report). No fabrication.
   - `branchQueue.ts` / `researchQueue.ts`: notes-only text updates recording
     negative research results (bonchon/grain/nourish_bowl leads exhausted,
     mccafe co-location restated as an unresolved human taxonomy call for the
     22nd/23rd consecutive time) — no structural or status changes.
   - The 6 reports + 1 digest: all describe either the above, or no-op
     reconfirmation runs that made no data changes and correctly declined to
     act without qualifying findings (the Comment-Copilot digest found no
     usable thread and drafted nothing, consistent with the task's own
     "report rather than fabricate" fallback).
2. Tried to remove the 2 empty probe files (`rm`) — failed with `Operation
   not permitted`, the same OneDrive-mount unlink restriction ROADMAP item 7
   documents for `.git/` files. Renamed them out of the way instead
   (`_probe.txt.stale-20260917`) rather than leaving them under their
   original names; left untracked (not committed) either way since they
   carry no real content.
3. Confirmed the two git locks were stale (age + `fuser`) and applied the
   documented 2026-09-04/06/08 rename-workaround (`mv` to
   `.stale-20260917` suffixes, not `rm`) rather than forcing a delete.
4. Set up a build mirror at `/tmp/platescreen-mirror` (root disk, not the
   full `/sessions` disk — per the 2026-09-16 disk-workaround report) with
   `npm_config_cache=/tmp/npm-cache`. `npm install` succeeded (394 packages,
   15s).
5. `npx tsc --noEmit` — clean, exit 0. Real `tsc`, not the Node-native
   substitute.
6. Wrote a throwaway `integrity_check.mjs` (Node 22 native TS import,
   deleted after use) checking duplicate ids, orphaned `brandId`/
   `operatorId` references across Brands/Premises/MenuItems/GroceryProducts,
   price outliers, and specifically confirming `king_of_fried_rice_hws_p4`
   resolves to a real Brand and appears exactly once.
7. `git add` + `git commit` the reconciled files. Hit the stale
   `refs/heads/main.lock` (separately stale, ~13h old, unheld) and a
   transient `HEAD.lock` recreated by the first failed commit attempt —
   both renamed out of the way the same way, then the commit succeeded
   cleanly (`188792e`).
8. `git fsck`: clean aside from expected dangling objects/commits left over
   from other sessions' earlier aborted commit attempts against the same
   locks (consistent with the 2026-09-06 report's precedent) — `HEAD`
   advanced correctly, working tree clean apart from the two harmless
   stale probe files.
9. Deleted the `/tmp/platescreen-mirror` build mirror, `npm-cache`, and the
   temporary `integrity_check.mjs` script afterward.

## Result

| Metric | Before this run | After this run |
|---|---|---|
| Brands | 1,726 | 1,727 (unchanged by this run — landed pre-existing automation output) |
| Premises | 4,662 (ROADMAP snapshot) / 4,664 live | 4,665 (+1, `king_of_fried_rice_hws_p4`) |
| Menu items | 2,665 | 2,668 (unchanged by this run) |
| Grocery products | 19 | 19 (unchanged) |
| Diet-tag coverage | 1,731/2,668 | 1,731/2,668 (64.9%, unchanged — no tag edits this pass) |
| Duplicate ids / orphaned brandId / orphaned operatorId | — | 0 / 0 / 0 (re-verified) |
| Price outliers | — | 0 |
| Uncommitted automation backlog | 3 data files + 7 docs | 0 (all landed in commit `188792e`) |

No new hand-authored data-quality edit was made this pass — the entire scope
was reconciling and verifying already-completed, already-reviewed automation
output that had a clean bill of health except for the commit-blocking lock.

## Verification

- `npx tsc --noEmit` in `/tmp/platescreen-mirror`: clean, exit 0.
- Runtime integrity check (`integrity_check.mjs`, deleted after use):
  `BRANDS: 1727 rows, 0 duplicate ids`; `PREMISES: 4665 rows, 0 duplicate
  ids`; `MENU_ITEMS: 2668 rows, 0 duplicate ids`; `GROCERY_PRODUCTS: 19 rows,
  0 duplicate ids`; `Orphaned Premises.brandId: 0`; `Orphaned
  MenuItems.brandId: 0`; `Orphaned GroceryProduct.brandId: 0`; `Orphaned
  Brands.operatorId: 0`; `king_of_fried_rice_hws_p4 present: true
  king_of_fried_rice_hws`, count 1; `Price outliers (<=0 or >100): 0`.
- `npm run build` not run this pass (not needed — `tsc --noEmit` is the
  documented real verification gate per the 2026-09-16 disk-workaround
  report, and this pass made no new hand-typed edits that would need a full
  build to catch beyond what `tsc` already covers).
- `git fsck`: clean (dangling objects only, no ref corruption, `HEAD`
  correct).
- `git status` after commit: clean except the 2 harmless stale-renamed probe
  files (untracked, not committed, contain no data).

## Not done

- No new hand-authored data-quality change this pass (see Result above for
  why — the backlog reconciliation was the bounded item this run).
- Did not delete the 2 empty probe files — filesystem `unlink` is blocked on
  this OneDrive-mounted folder (same restriction as `.git/` locks); renamed
  them instead. They carry no content and aren't tracked by git, so they
  have no effect on the app or repo.
- Did not attempt the `GroceryProduct` chain-expansion item (Cold Storage/
  Giant/Sheng Siong/Don Don Donki) — the 2026-09-05 attempt's blocker
  (needing a connected-browser session to read a retailer's own product
  page for an admissible price) wasn't re-attempted this pass; worth a
  future session with browser access, per that report's own recommendation.
- Did not touch the 2 borderline pork/offal diet-tag cases
  (`lps_fx_organ_porridge`, `ss_roast_pork`) flagged 2026-09-16 for a human
  decision.
- Did not push (per standing rule — commits are local only).

## Commit

Committed locally as `188792e`, "Research: land backlogged automation
output (2026-09-16 runs)". **Not pushed.**

```bash
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen" && git pull origin main && git push origin main
```
