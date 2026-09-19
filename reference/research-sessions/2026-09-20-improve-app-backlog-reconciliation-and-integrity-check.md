# 2026-09-20 — backlog reconciliation (stale git locks) + fresh runtime integrity check

**Task:** `platescreen-improve-app` (scheduled/unattended run)

## Why

Following the last several `improve-app` runs' recurring pattern
(2026-09-15, -17, -18, -19), this session's `git status` at the start of
the run again showed legitimate, already-written same-day (2026-09-19)
output from the `platescreen-research-branches` and
`platescreen-research-grocery` tracks sitting uncommitted, blocked by a
fresh stale `.git/index.lock` (~4h old) + `.git/next-index-3.lock` (~20h
old) pair. Confirmed both were genuinely stale (no process holding either
via `fuser`, no `git`/`node` process visible in `ps aux`) before touching
them, per CLAUDE.md/ROADMAP item 7's standing caution.

No other open ROADMAP item was safe to act on unattended this run (see
"Not done" below), so this pass's scope was housekeeping — landing the
backlog and re-verifying the dataset — rather than a new hand-authored
data change.

## Method

1. Reviewed every pending diff/untracked file against CLAUDE.md sections
   5/5.1 before touching git:
   - `src/lib/branchQueue.ts` — a single `notes` string field on the
     `bonchon` `BRANCH_QUEUE` entry extended with the 3rd 2026-09-19
     branches run's findings (browser-access wall reconfirmed via both the
     in-app Browser pane and Claude in Chrome; SFA live API reconfirmed
     zero results for `BONCHON`/licence `CE12104B000`). String-only, no
     shape/type impact, no fabricated data.
   - `reference/research-sessions/2026-09-19-branches-blocked-run.md` —
     updated by its own run to record that its commit attempt had failed
     with a hard `HEAD.lock` error, not the usual stale-index-lock case.
   - Two new untracked reports (`2026-09-19-branches-bonchon-3rd-run.md`,
     `2026-09-19-mccafe-colocation-27th-pass.md`) — both pure research
     logs, no Brand/Premises/MenuItem/GroceryProduct rows touched, no new
     Premises added, mccafe's 27-run-old taxonomy question still correctly
     left for a human.
2. Renamed (not deleted) the two stale lock files:
   `.git/index.lock` → `.git/index.lock.stale-<timestamp>`,
   `.git/next-index-3.lock` → `.git/next-index-3.lock.stale-<timestamp>`,
   per the documented rename-not-delete workaround (ROADMAP item 7).
3. `git add` + `git commit` — hit the same known filesystem quirk described
   in ROADMAP item 7's 2026-09-04 finding: the commit's own transient
   `index.lock`/`HEAD.lock`/`objects/*/tmp_obj_*` files couldn't be
   `unlink()`'d (`Operation not permitted`, non-fatal `warning:` noise) and
   the very first `git commit` attempt hard-failed once because its own
   just-created `index.lock` collided before cleanup. Renamed that fresh
   lock out of the way and retried — succeeded (`7bd785e`), with the same
   class of non-fatal unlink warnings as every prior successful instance of
   this workaround (2026-09-06, -08, -17, -18).
4. `git fsck` — clean aside from expected dangling objects from earlier
   sessions' aborted commit attempts (pre-existing, not from this run).
5. Attempted the `/tmp`-mirror + real `npx tsc --noEmit` verification
   recommended in the 2026-09-16 report (mirroring off the 100%-full
   `/sessions` disk onto `/dev/sda1`, which had ~2.0G free at the start of
   this run). `npm install` made real but very slow progress across three
   separate attempts (this sandbox's per-command execution cap is ~178s,
   shorter than a full `npm install` here) — package count climbed 0 → 337
   across the attempts, but `/dev/sda1` free space fell from 2.0G to 1.4G
   over the same three attempts with `node_modules` still incomplete.
   **Stopped rather than continuing to spend the diminishing free root-disk
   space chasing a full `tsc` pass this run** — this now looks like the
   same disk-pressure pattern flagged 2026-09-07/08/15/16, just manifesting
   as a slow `npm install` instead of an immediate `ENOSPC`. Deleted the
   partial mirror and npm cache afterward to return `/dev/sda1` to its
   starting ~2.0G free.
6. Fell back to the documented Node 22 native-TS-type-stripping substitute
   (no `npm install` needed — `brands.ts`/`premises.ts`/`menuItems.ts`/
   `operators.ts`/`groceryProducts.ts` are plain literal exports with no
   runtime dependency on the `.ts` type files) to get a real,
   non-fabricated integrity re-check anyway. Script:
   `integrity-check.mjs` (not committed to the repo — ephemeral, run from
   the Cowork session's own scratch directory, per CLAUDE.md's "delete
   temporary verify/audit scripts" rule).

## Result

Commit `7bd785e` landed the 4-file backlog described above. No Brand/
Premises/MenuItem/GroceryProduct rows were added, removed, or edited by
this run itself — only already-written automation output was reviewed and
committed.

Fresh integrity check (via Node native TS stripping), current as of this
run:

| Check | Result |
|---|---|
| Total brands | 1,727 |
| Total premises | 4,668 (+1 vs. last reported 4,667 — a same-day Premises addition from another track, already committed) |
| Total menu items | 2,695 (unchanged) |
| Operators | 8 |
| GroceryProduct rows | 19 (unchanged) |
| Duplicate ids (brands/premises/menuItems/operators/groceryProducts) | 0 / 0 / 0 / 0 / 0 |
| Orphaned `Premises.brandId` | 0 |
| Orphaned `MenuItem.brandId` | 0 |
| Orphaned `GroceryProduct.brandId` | 0 |
| Orphaned `Brand.operatorId` | 0 |
| Price outliers (≤0 or >$100) | 0 |
| Macro-sum outliers (stated calories vs. 4P+4C+9F, >150kcal AND >35% off) | 0 |
| Menu items with ≥1 diet tag | 1,762 / 2,695 (65.4%, unchanged) |
| Zero-menu brands (excluding the 6 known food-court container brands) | **35** — down from the last-confirmed 42 (2026-09-16), i.e. 7 previously-empty brands picked up their first MenuItem via other same-day/same-week research-track automation since then |

Dataset is clean on every axis this check covers. The zero-menu-brand drop
(42 → 35) is a genuine improvement from the research tasks' own ongoing
work, not something this run did directly — noted here since it hadn't
been independently re-tallied since 2026-09-16.

## Verification

- `git status` → clean working tree, `HEAD` at `7bd785e`, 28 commits ahead
  of `origin/main` (not pushed, per standing rule).
- `git fsck` → clean (only pre-existing dangling objects, unrelated to this
  run).
- Runtime integrity check above (Node native TS stripping) → 0 duplicate
  ids / 0 orphaned refs / 0 price outliers / 0 macro-sum outliers across
  all 5 data arrays.
- Real `tsc --noEmit` was **not** achieved this run (see Method step 5) —
  same partial-substitute caveat as 2026-09-15/16: sufficient for
  reviewing/committing already-written data (what this run did), not a
  green light for authoring new hand-typed data changes blind.
- Deleted the ephemeral `integrity-check.mjs` script and the partial `/tmp`
  mirror/npm-cache after use — nothing ephemeral left in the repo or
  sandbox.

## Not done

Reviewed every other open ROADMAP item for unattended-safety and found
nothing else actionable this run:

- **Mobile table reflow (item 6/14), `Brand.dietTags` not read by
  `applyFilters` (item 14)** — both require editing `.tsx`/`screener.ts`
  application code, out of this task's explicit scope.
- **Task #29 / item 8 (SFA-licensee-name brands needing Street View
  identification)** — needs a visual-identification capability this task
  doesn't have.
- **Item 10 (GroceryProduct expansion for Cold Storage/Giant/Sheng
  Siong/Don Don Donki)** — not re-attempted this run; the standing blocker
  (bot-challenge on `shengsiong.com.sg` via `web_fetch`, in-app Browser
  pane access declined at the session level for unattended runs) is a
  browser/fetch-access problem, not something a fresh attempt without a
  connected browser would resolve differently.
- **Diet-tag "genuinely ambiguous" backlog from the 2026-09-01 audit** —
  looked for a fresh, narrow slice worth a closer look (the audit's own
  framing for what a future pass could safely do) but the zero-menu-brand
  count check above and the backlog reconciliation consumed this run's
  safe time/disk budget; deferred rather than rushed.
- No new hand-typed MenuItem/Brand/Premises/GroceryProduct data was
  authored this run, consistent with not having a real `tsc` pass
  available to verify it against.

## For a human

1. `cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen" && git pull && git push`
   — 28 local commits (through `7bd785e`) are ready to publish.
2. The `/tmp`-mirror disk-pressure pattern from 2026-09-16 appears to be
   recurring in a new shape: not an immediate `ENOSPC`, but `npm install`
   now takes long enough that this sandbox's ~178s per-command execution
   cap prevents it from ever finishing in one shot, even mirroring off the
   full `/sessions` disk. Worth a human's attention if a future run needs a
   real `tsc`/`build` pass rather than the lightweight substitute.
3. Zero-menu brands are now down to 35 (from 42) — the research tasks are
   making real progress; no action needed, just flagging the improved
   number since it hadn't been re-tallied in a few days.
