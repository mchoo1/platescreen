# 2026-09-13 — grocery-track research run: mccafe_colocation_research, 16th consecutive pass (same-day duplicate)

**Task:** `platescreen-research-grocery` scheduled run (GRAB & GO / READY-TO-EAT /
SUPERMARKET track).

## Phase 1 — selection

Parsed `src/lib/researchQueue.ts` (131 total entries) programmatically rather
than relying on the file's own prose: filtered to `type` in
`grab_go`/`ready_to_eat`/`supermarket`, 9 entries match, and of those exactly
1 has `status: 'pending'` — `mccafe_colocation_research` (type `grab_go`,
priority `medium`). `ok_convenience`, the track's only other historically
notable entry, is confirmed `status: 'researched'`. This is a fully
deterministic pick — no other candidate existed to choose between.

This is a **same-day duplicate run**: a "15th pass" reconfirmation of this
exact entry was already logged and committed today at 2026-09-13 (commit
`9c61e03`, see `2026-09-13-mccafe-colocation-15th-pass.md`), roughly earlier
in the day per the git log. This session ran independently and reached the
same result before discovering that.

## Phase 1 step 5 — id collision check

`mccafe_colocation_research` (the queue entry id) does not exist as a Brand
id in `brands.ts`. The `mccafe` Brand does already exist (id `"mccafe"`,
distinct from the queue entry's id, 10 `MenuItem`s, 0 `Premises` rows) —
consistent with every prior pass; this queue entry researches an existing
Brand's location coverage, it doesn't introduce a new Brand under its own id.

## Phase 2/3 — why no data-file edit was made (re-verified, not re-investigated)

Re-confirmed via grep, independent of the file's own prose:
- `premises.ts`: 0 rows for `brandId: "mccafe"` (unchanged)
- `brands.ts`: `mccafe` Brand record unchanged (10 platforms/aliases fields
  identical to prior passes)
- `menuItems.ts`: 10 `mccafe` MenuItems, count unchanged

The substantive blocker, first identified 2026-08-30 and empirically
resolved 2026-08-31 (McDonald's SG retired dedicated McCafé service
counters chain-wide from 27 Mar 2026; beverages now served islandwide from
the main counter — confirmed via McDonald's own site language, unchanged
today), is a **data-modeling decision**, not a missing fact: this project's
`Premises` schema is one-`brandId`-per-row with no shared/concession
mechanism, so representing "mccafe exists everywhere mcdonalds does"
requires a human to choose between (a) copying all ~145 `mcdonalds`
Premises rows as new `mccafe` Premises rows, or (b) folding `mccafe`'s 10
MenuItems into the `mcdonalds` Brand as a beverage category and retiring
the standalone Brand. Both are schema/taxonomy calls on an existing,
populated Brand — outside this task's normal scope (append records to one
queue entry), and 15 prior independent passes (2026-08-30 through today's
earlier run) have all reached the same conclusion. Not resolving
unilaterally, per that established precedent.

No `Brand`/`MenuItem`/`GroceryProduct`/`Premises` files touched this run.

## Phase 3 — write

Appended a one-line reconfirmation to `mccafe_colocation_research`'s `notes`
field in `researchQueue.ts` (tagged `UPDATE 2026-09-13b, 16th pass`), per
that entry's own standing convention for repeat blocked passes. Queue
`status` left `'pending'` — not flipped, since nothing was actually
resolved.

## Phase 4 — verify

`/sessions` (the default sandbox disk) was at 100% (37M free) — confirmed
via `df -h`, matching several other same-day automated reports on this
project. Unlike those reports, did not treat this as a hard blocker: `/tmp`
sits on a separate filesystem with ~3.4G free, so ran the scratch build
there instead (copied the project excluding `node_modules`/`.next`/`out`/
`.git`/`reference` into `/tmp/ps_check`, pointed `HOME` and the npm cache at
`/tmp` to avoid the full disk, then `npm install` + `npx tsc --noEmit`).

First `tsc` run failed on a real but pre-existing issue unrelated to this
run's own one-line edit: `node_modules/tailwind-merge`'s installed copy was
missing `dist/types.d.ts` and `dist/bundle-mjs.mjs` (likely a partial
extraction from an earlier disk-pressure incident on this project, not
something this session caused — the file's `package.json`/lockfile both
list it normally). Reinstalled just that one package
(`npm install tailwind-merge@2.6.1 --no-save`), which restored the missing
files. Re-ran `npx tsc --noEmit`: **clean, zero errors.**

## Commit

Committed only the `researchQueue.ts` one-line note addition locally (no
data files changed). Not pushing, per task rules.

## Escalation (repeating prior passes' recommendation)

This is the 16th consecutive pass — across two scheduled tasks running the
same day — reaching an identical conclusion on `mccafe_colocation_research`.
Every other entry in this track is `'researched'`, so every future
scheduled run of this track will keep re-selecting and re-confirming this
same entry until a human either makes the (a)/(b) taxonomy call above,
reprioritizes/removes the queue entry, or the `ResearchQueueEntry.status`
enum gains a `'blocked'` state so automated runs stop re-selecting it
(`src/types/db.ts` currently only supports `'pending' | 'researched'`).

## Unrelated observation (not acted on)

`/sessions`' root filesystem (9.8G, 100% full, 37M free) appears to be a
recurring constraint across multiple automated PlateScreen sessions today
(disk-exhaustion reports from `platescreen-improve-app` and
`platescreen-research-restaurants` runs earlier the same day). This run
worked around it by using `/tmp` (a separate, mostly-free filesystem) for
all install/build-check work instead of the project's usual in-`/sessions`
scratch location — future runs hitting the same `/sessions`-full condition
could do the same rather than treating it as unrecoverable, though the
underlying disk pressure on `/sessions` itself is still worth the user's
attention if it's a mounted-folder sizing issue as previously flagged.
