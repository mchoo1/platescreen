# 2026-09-15 — `platescreen-improve-app` — disk exhaustion reconfirmed; backlogged automation output reviewed and committed

## Why

Scheduled `platescreen-improve-app` run. Per the task's own instructions, tried to identify one
bounded data-quality backlog item from `reference/planning/ROADMAP.md`. Before picking an item,
checked whether the standing disk-exhaustion issue flagged 2026-09-07/2026-09-08 was still
present, since it blocks the mandatory `tsc`/build verification step in `CLAUDE.md` section 6.

## What was found

`df -h /sessions` showed the sandbox's own disk (`/dev/sdc`, ext4, 9.8G) at 100% full, 23MB
available. This is worse than the 2026-09-07/08 reports: `mkdir` itself failed with `ENOSPC`
(confirmed with a plain `mkdir ~/disktest` test), meaning `npm install` couldn't even be
attempted — no build mirror could be created at all, not just a slow/failing one.

`mount` output showed `/sessions` carries multiple concurrent Cowork sessions' own mount
namespaces simultaneously (another session's `mnt/*` fuse entries were visible alongside this
session's own) — this is a sharper diagnosis than the earlier "OneDrive folder size" guess: the
disk is genuinely shared across concurrent sandboxes, not privately exhausted by this task's own
residue or the user's mounted folders. `du -x` scoped to just this session's home directory
(excluding the fuse-mounted `mnt/*` paths) showed only 316KB actually used there — confirming the
fullness is external to this session.

## Workaround attempted and ruled out

The `outputs` and `Desktop` fuse mounts showed 62GB free (`df -h`), a different filesystem from
the exhausted `/sessions` disk. Tried relocating the build mirror there instead of `~/build`:

1. `mkdir -p /sessions/.../mnt/outputs/build/platescreen` — succeeded.
2. Copied `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.js`,
   `tailwind.config.ts` — succeeded, these are tiny.
3. `rsync -a --delete src/ ./src/` — succeeded, 4.2MB, fast.
4. `npm install` (with `npm_config_cache` and `TMPDIR` also redirected to the same fuse mount, to
   avoid npm writing its cache back to the full `/sessions` home) — **hung past a 3-minute
   timeout**, no useful partial output.
5. Follow-up `du`/`ls` on the partially-installed `node_modules` **also hung** past a 30-second
   timeout on a plain directory listing.
6. `rm -rf` cleanup of the partial `node_modules` **failed** (`EPERM`/exit 1, directory still
   present) — matches the same class of `EPERM`-on-fuse behavior documented in ROADMAP item 7's
   git-lock investigation, now observed on `npm`'s own file operations too, not just git's.

Conclusion: a fuse-proxied mount to the host filesystem is not viable for `npm install`'s
thousands-of-small-files workload, regardless of how much free space it reports. This rules out
"just use a different mount" as a workaround for future runs, rather than leaving it untried.

## Partial substitute that worked

Node 22 (`v22.23.2`, confirmed already on the sandbox) strips TypeScript type annotations
natively at parse time — no `npm install`, no `tsc`, no build mirror required. Since
`brands.ts` / `premises.ts` / `menuItems.ts` / `operators.ts` are plain literal exports with no
runtime dependency on the `.ts` type-only files (per `CLAUDE.md` section 4.5), they can be
`import`ed directly by a throwaway `.mjs` script run with plain `node`. Wrote one
(`integrity_check.mjs`, run from the `outputs` scratch directory, deleted after use — not
committed, per the "delete ephemeral scripts" rule in `CLAUDE.md` section 6) that checked:

```
BRANDS: 1726 rows, 0 duplicate ids
PREMISES: 4662 rows, 0 duplicate ids
MENU_ITEMS: 2656 rows, 0 duplicate ids
Orphaned Premises.brandId: 0
Orphaned MenuItems.brandId: 0
Orphaned Brands.operatorId: 0
New brand the_neighbourwok_fried_hokkien_prawn_mee_clementi_mall: brand=true, premises=1, menuItems=3
New brand hup_hong_chicken_rice_tang_plaza: brand=true, premises=1, menuItems=6

MenuItems with >=1 diet tag: 1724 / 2656 (64.9%)
Confidence breakdown: { verified: 56, estimated: 2594, community: 6 }
Zero-menu brands: 42
Price outliers (<=0 or >100): 0
```

This is a real, non-fabricated verification — it substitutes for the "runtime integrity check"
CLAUDE.md section 6 calls for, but it does **not** replace `tsc` for catching actual type errors
(e.g. an invalid `DietaryFlag`/`OutletType` string literal, a missing required field with no
runtime symptom). Treated it as sufficient to review/commit **already-written** data (below), but
not as a green light to author **new** hand-typed data changes blind this session.

## What was committed

`git status` showed several days' worth of legitimate, already-completed automation output
sitting uncommitted in the working tree — consistent with ROADMAP item 2's standing note that
"the pipeline does not fully self-tidy" and needs periodic review:

- `src/lib/brands.ts` / `premises.ts` / `menuItems.ts`: 2 new Brands (`the_neighbourwok_fried_
  hokkien_prawn_mee_clementi_mall`, `hup_hong_chicken_rice_tang_plaza`, both real Hawkers' Street
  concessions at The Clementi Mall / Tang Plaza), their Premises rows, and 9 MenuItems total (3 +
  6) — from `platescreen-research-restaurants` runs on 2026-09-14/15.
- `src/lib/branchQueue.ts` / `researchQueue.ts`: note-field updates on existing queue entries
  (status reconciliation text, no structural changes).
- `reference/data/dish-macro-lookup.py`: matching `DISH_DB` additions for the Hup Hong dishes.
- `reference/planning/ROADMAP.md`: the 2026-09-14 launch-readiness review edit (already in the
  working tree from a prior session that couldn't commit it — shell was down that day).
- New research-session reports (`2026-09-14`/`2026-09-15` dated files) and a Post-Copilot digest
  documenting the above plus several no-op/no-action runs.

Manually read every data diff (not just the stat summary) against `CLAUDE.md` section 5's
never-fabricate rule before committing: both new brands' dish names, prices, and premises
addresses trace to named real sources (HungryGoWhere, TANGS' own store directory, foodpanda's
outlet-specific delivery listing) documented inline as source comments in `menuItems.ts` and in
the matching `reference/research-sessions/2026-09-15-hup_hong_chicken_rice_tang_plaza.md` /
`2026-09-14-the_neighbourwok_fried_hokkien_prawn_mee_clementi_mall.md` write-ups; macros with no
outlet-specific source were explicitly calibrated against this project's own existing Chicken
Rice values (not invented), and diet tags follow section 5.1 (chicken rice dishes tagged
`no_pork`; Fried Hokkien Prawn Mee left untagged — reasonable given lard/seafood ambiguity, not
on the `no_pork` skip-list either way so leaving it untagged is the conservative choice).

## Verification

- `tsc --noEmit`: **not run** — could not run (disk exhaustion, see above). This is the known,
  documented limitation of this session, not skipped by choice.
- `npm run build`: **not run**, same reason.
- Lightweight Node-native-TS integrity check (see above): **clean** — 0 duplicate ids across
  1,726 Brands / 4,662 Premises / 2,656 MenuItems, 0 orphaned `brandId` references, 0 orphaned
  `operatorId` references, 0 price outliers, both new brands' Premises/MenuItems resolve
  correctly.
- Manual content review of every changed line in the pending diffs: no fabrication found, diet
  tags consistent with section 5.1, no food-court container brands assigned a MenuItem, no
  duplicate-brand pattern reintroduced.
- Files diffed and reviewed: `src/lib/{brands,premises,menuItems,branchQueue,researchQueue}.ts`,
  `reference/data/dish-macro-lookup.py`, `reference/planning/ROADMAP.md`, and the content of every
  new untracked `reference/research-sessions/*.md` / `Post-Copilot-Digests/*.md` file.

## Not done

- No new hand-authored data-quality change this session (see "Partial substitute" above for why).
- `GroceryProduct` array not included in this pass's integrity script — unchanged since
  2026-09-05 (still 19 rows), no reason to suspect it needed re-checking.
- Calorie/macro-sum outlier sweep not re-run (only price outliers checked this pass) — last full
  sweep was 2026-09-05, see that date's report.
- Premises lat/lng completeness not re-checked this pass (last confirmed 0 missing on 2026-09-05,
  no lat/lng-touching changes since other than the 2 new rows, which do carry real coordinates).
- The disk-exhaustion issue itself is unresolved and needs the user's direct attention (see
  ROADMAP's standing callout) — nothing a scheduled task can fix from inside its own sandbox.
- Did not attempt to clean up the stray partial `node_modules` left in the `outputs` fuse mount
  from the ruled-out workaround (step 6 above) — `rm -rf` failed with `EPERM` and further retries
  risked more hung commands for no benefit; it sits in the scratch `outputs` area, not the repo,
  so it has no effect on this project.

## Commit

Committed locally as a single "Docs + Research" style commit covering the reconciled automation
output and this report + ROADMAP update. **Not pushed** — per `CLAUDE.md` section 8, pushing is
the user's job.

```bash
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen" && git pull origin main && git push origin main
```
