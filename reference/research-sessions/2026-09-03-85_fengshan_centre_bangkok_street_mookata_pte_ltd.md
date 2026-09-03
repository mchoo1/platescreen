# 2026-09-03 — Scheduled restaurant-track run: 85_fengshan_centre_bangkok_street_mookata_pte_ltd

**Task:** `platescreen-research-restaurants` scheduled task (restaurant/food_court/hawker/coffeeshop/canteen track).

## Phase 1 — Target selection

Filtered `RESEARCH_QUEUE` to pending entries of type `restaurant`/`food_court`/`hawker`/
`coffeeshop`/`canteen` (77 pending), sorted by priority (high → medium → low, list order
preserved within a tier).

Before picking, found the working tree already had two entries from an earlier same-day run
flipped to `researched` but **uncommitted** (`tgi_fridays`, `eighteen_chefs` — see
`git status`/`git log` at session start: 4 local commits ahead of origin, plus a large set of
unstaged changes across `brands.ts`/`menuItems.ts`/`researchQueue.ts`/`branchQueue.ts` and
several untracked session-report files from prior grocery-track/branch-track runs today and
yesterday). Treated the on-disk state as ground truth per the task's own instructions (read the
queue fresh) — both entries are correctly excluded from this run's pending pool as a result.

Re-tested this session's browser access directly (`mcp__Claude_Browser preview_start` to
`https://www.google.com`) — denied ("navigation ... was denied or failed"), confirming the same
unattended-session browser-navigation gate every prior scheduled run this week (2026-08-22
through 2026-09-03) has hit. This reconfirms — rather than blindly repeats — that `kopitiam`,
`koufu`, `foodfare`, `hawkers_street` (the top 4 pending entries) and the ~65 medium-priority
"task #29" bare-SFA-licensee-name / corporate-duplicate-name entries below them have no new
addressable Phase 2 gap this specific browser-dependent path could close today.

Rather than re-walk that entire already-categorized bucket one-by-one again, scanned the pending
list's `name` field for any entry that itself directly names a specific, identifiable dish (per
CLAUDE.md section 5 sourcing rule #2), since that signal is orthogonal to the "task #29 personal
name" and "corporate-duplicate" categories already exhausted this week. First such match in
priority+list order: **`85_fengshan_centre_bangkok_street_mookata_pte_ltd`** — "Bangkok Street
Mookata" directly names "mookata," a specific, real Thai BBQ-hotpot style, not a generic
corporate string. (For completeness: `85_fengshan_centre_j_k_kings_prata_pte_ltd`, which
similarly names "Prata," and two low-priority "Prata Palace"/"Prata.com" entries further down,
are equally promising follow-up candidates for a future run.)

Confirmed via the queue entry's own `notes` field (Phase 1 step 5 case): the Brand row already
exists (added in the 2026-08-20 SFA hawker restructuring, `sfaLicenceNo: "E84169N004"`, location
85 Fengshan Centre) with 0 MenuItems — this run's job is Phase 2 (research) + writing MenuItems
only, no new Brand/Premises.

## Phase 2 — Research

WebSearch confirmed "Bangkok Street Mookata" is a real, currently-operating Singapore chain (10
outlets — Jurong West, Ang Mo Kio, Sembawang, Bedok, and others per Facebook/Tripadvisor/Quandoo
listings), with its own official ordering website, `bangkokstreetmookata.com.sg`. Fengshan is a
subzone of Bedok, and the SFA licensee name on this Premises row ("Bangkok Street Mookata Pte.
Ltd.") is a distinctive multi-word trade name that exactly matches the chain's branding — not a
coincidental substring match like the project's known "Grain"/"Aston"-in-"Gaston" false-positive
cases — so treated as a high-confidence match.

Fetched the official site's product pages directly (`mcp__workspace__web_fetch`, hit the tool's
rate limit twice mid-session — resolved by waiting ~15-45s between calls, no missing data as a
result):

- `/product-category/set-menu/` and `/product/mookata-set-platter/` — the site's "Mookata Set
  Platter for 2/3-4/5-6/7-8" ($38/$58/$88/$128), each with a full official ingredient list (17
  components: assorted marinated meats, smoked duck, prawns, scallops, salmon, fishball,
  crabstick, vegetables, mushrooms, corn, egg, instant noodles, glass noodles).
- `/product-category/chicken/`, `/product-category/pork/`, `/product-category/beef/` — individual
  a-la-carte add-on items, each with a real name and a real starting SGD price (small/medium/large
  variants where applicable; A4 Japanese Wagyu Beef is single-SKU, no variant).

**Items added (6, all confidence `"estimated"` — no nutrition source exists for raw BBQ/hotpot
ingredients anywhere checked):**

| Item | Price | Cal | Protein | Carbs | Fat | Basis |
|---|---|---|---|---|---|---|
| Marinated Chicken (Small) | $8.00 | 230 | 25g | 3g | 12g | Official site "Small" starting price; typical ~110-120g raw chicken thigh, grilled, marinade sugar |
| Basil Chicken (Small) | $8.00 | 240 | 25g | 4g | 13g | Same basis, basil/oil slightly richer |
| Marinated Pork Collar (Small) | $8.00 | 320 | 20g | 3g | 24g | Fattier marbled cut, ~110-120g raw |
| Marinated Pork Belly (Small) | $8.00 | 420 | 15g | 2g | 38g | Fattiest cut on the menu, ~110-120g raw |
| Marinated Beef (Small) | $9.00 | 260 | 26g | 2g | 17g | Thin hotpot-style beef slices, ~110-120g raw |
| A4 Japanese Wagyu Beef | $28.80 | 380 | 18g | 1g | 34g | Single-SKU premium item, reasoned smaller ~90g portion given price point and wagyu's very high fat marbling |

All 6 prices are the site's own confirmed listed price (the "Small"-tier starting price for the
4 variant items — Medium/Large weights/prices aren't disclosed on the product pages, so only
Small was used rather than guessing the other tiers). Macros are reasoned estimates from typical
raw-portion weights for a small mookata add-on plate (~100-120g, a standard convention at
Singapore mookata stalls) and each cut's known typical cooked macros, cross-checked for rough
scale against this DB's pre-existing generic `"Mookata"` per-pax dish-lookup entry
(650 cal/35g protein/40g carbs/38g fat @ $12, `Local Hawker`) in
`reference/data/dish-macro-lookup.py`.

**Diet tags:** Marinated Pork Collar and Marinated Pork Belly get **no `compatibleWith` array at
all**, per CLAUDE.md section 5.1 (dishes explicitly named for pork/offal are categorically
excluded, not merely skipped). The other 4 (chicken x2, beef x2) get `"no_pork"` — named protein
is chicken or beef, no pork. No `halal` tag applied anywhere — this is a shared pork-and-non-pork
BBQ/hotpot grill, not confirmed halal-certified by any source checked.

**Deliberately excluded:**
- The 4 multi-pax "Mookata Set Platter for 2/3-4/5-6/7-8" sharing sets — a shared platter across
  17 components has no credible single-serving basis without guessing how it's divided per
  person, the same reasoning that excluded eighteen_chefs' Salted Egg Snack Platter in the prior
  scheduled run.
- Marinated Garlic Chicken, Marinated Garlic Pork Collar, Basil Chicken's near-duplicates — kept
  only one basil/garlic variant per protein category rather than every garlic/basil permutation.
- Streaky Bacon, Pig Liver, Pork Ball, Luncheon Meat, Sirloin Beef Cube, Beef Short Plate,
  Marinated Beef Short Plate — real named items with real prices, but left out to keep this
  batch at 6 well-differentiated items rather than an exhaustive 13-item near-duplicate sweep of
  every raw-ingredient add-on the site lists; a future pass could add these.

## Phase 3 — SFA registration

Skipped — this Brand's Premises row already carries real SFA data (`sfaLicenceNo: "E84169N004"`)
from the 2026-08-20 restructure, per the task's own Phase 1 step 5 / Phase 3 preamble ("skip this
phase entirely if the Brand already existed").

## Phase 4 — Records written

- **No new Brand or Premises** — both already existed.
- **6 MenuItems** added to `src/lib/menuItems.ts` (single flat array, appended before the closing
  `];`), each `brandId: "85_fengshan_centre_bangkok_street_mookata_pte_ltd"`: `bsm_marinated_chicken`,
  `bsm_basil_chicken`, `bsm_marinated_pork_collar`, `bsm_marinated_pork_belly`, `bsm_marinated_beef`,
  `bsm_a4_wagyu_beef`.
- `src/lib/researchQueue.ts`: this entry flipped `status: "pending"` → `"researched"`, `notes`
  updated with the full rationale above.
- `reference/data/dish-macro-lookup.py` — **not touched**. These are brand-specific raw-ingredient
  add-on items (not from the `kopitiam-stall-dishes.json` scrape pipeline this file primarily
  serves), same precedent as the prior `eighteen_chefs` run.

## Phase 5 — Verification

**Could not run a full `npx tsc --noEmit` / `npm run build` in the `~/build/platescreen` mirror.**
`rsync -a --delete src/ ~/build/platescreen/src/` and same for `reference/` succeeded, but
`npm install` failed with `ENOSPC` (`npm warn tar TAR_ENTRY_ERROR ENOSPC: no space left on
device`) — `df -h` showed the sandbox's `/sessions` mount at 99-100% full (as little as 0 bytes
free mid-install). This is the same disk-quota issue documented in
`2026-09-02-restaurant-track-run3-bare-licensee-sweep.md` (that run saw `2.2G nominally free`
per `df` yet still hit `ENOSPC`, suggesting a container-level write-quota rather than a literally
full disk) — not something this session's tooling can resolve. Removed the partial
`node_modules` afterward to free space back up (`rm -rf ~/build/platescreen/node_modules`,
`df -h` recovered to 116M free).

In place of a full build, ran the following manual checks against the live files:

- **Syntax:** `node --check` on both edited files (with `import`/`export` stripped, since plain
  Node doesn't parse ES module syntax) — both pass cleanly.
- **Duplicate ids:** each of the 6 new MenuItem ids (`bsm_marinated_chicken`, `bsm_basil_chicken`,
  `bsm_marinated_pork_collar`, `bsm_marinated_pork_belly`, `bsm_marinated_beef`,
  `bsm_a4_wagyu_beef`) → exactly 1 occurrence each in `menuItems.ts`, no collisions.
- **No orphaned brandId:** `85_fengshan_centre_bangkok_street_mookata_pte_ltd` → exactly 1
  occurrence in `brands.ts` (the pre-existing Brand row), matching all 6 new MenuItems'
  `brandId`.
- **Brace/bracket balance:** whole-file count on `menuItems.ts` — 2570 `{` / 2570 `}`, 2104 `[` /
  2104 `]`, balanced.
- **Type/enum validity (checked by hand against `src/types/db.ts`/`src/types/index.ts`):**
  `"no_pork"` is a valid `DietaryFlag`; `confidence: "estimated"` is valid; no `type`/
  `priceRange`/`platforms` fields were touched on the Brand (unchanged).
- **Mirror diff:** `diff` between the live `menuItems.ts`/`researchQueue.ts` and the
  `~/build/platescreen` mirror copies — byte-identical for both.

This is a real gap relative to the task's normal verification bar (no live `tsc`/`npm run build`
confirmation) — flagged honestly, consistent with the 2026-09-02 and 2026-09-03 (`eighteen_chefs`)
precedents, rather than claiming a build that didn't actually run. A future session with a
non-full sandbox disk should run `npx tsc --noEmit` and `npm run build` in the build mirror
against current `brands.ts`/`menuItems.ts`/`researchQueue.ts` to close this gap — and ideally
also verify/commit the other prior runs' still-uncommitted work sitting in this same working
tree (see Commit section below).

## Commit

Per task instructions, attempted to stage and commit locally — **not pushed** (pushing is the
user's job, per CLAUDE.md section 8). Scoped the commit to only this run's own files
(`src/lib/menuItems.ts`, `src/lib/researchQueue.ts`, this report), not the other tracks' unrelated
uncommitted work already sitting in the tree (see below).

**Hit the same stale-`.git/index.lock`/`.git/HEAD.lock` issue documented in
`2026-09-02-restaurant-track-run3-bare-licensee-sweep.md`, but got further this time** — this
session does have working shell/git access (unlike the immediately preceding restaurant-track
run, which had none at all):

1. Plain `git add` failed immediately (`fatal: Unable to create '.git/index.lock': File exists`)
   — same stale lock from 2026-09-02, still un-clearable (`rm`/`os.remove` both fail with `EPERM`,
   confirmed again this run, not just asserted from the old report).
2. Worked around the index lock the same way as the 2026-09-02 report (`GIT_INDEX_FILE` pointed
   at a temp copy of `.git/index`) — `git add` + `git write-tree` succeeded (with the same
   non-fatal `unable to unlink tmp_obj_*` warnings while git wrote objects, tolerated by git).
3. `git commit` failed at the `HEAD` ref-update step, same as 2026-09-02 (`fatal: cannot lock ref
   'HEAD'`) — `.git/HEAD.lock` is still stale and still can't be removed.
4. **New this run:** rather than stopping there, manually built the commit via `git commit-tree`
   (which doesn't touch `HEAD` at all) to get a real commit object into the object database, then
   tried `git update-ref refs/heads/main <sha>` — this *also* failed with the same `cannot lock
   ref 'HEAD'` error, because updating the branch `HEAD` currently points to still requires
   locking `HEAD` itself for the reflog. So `main` could not be fast-forwarded directly.
5. **Unblocked by pointing at a new ref instead of `main`:** `git update-ref
   refs/heads/pending-2026-09-03-bangkok-street-mookata <sha>` succeeded — a brand-new ref file
   only needs its own (non-stale) lock, not `HEAD.lock`. This is the same pattern an earlier
   session already used for the same problem (see the pre-existing `main.lock.old` branch in this
   repo, "chore: gitignore stray test files from automated session (undeletable on this mount)").

**Result:** this run's 3 files are committed and safely referenced at commit `a58a179` on a new
branch `pending-2026-09-03-bangkok-street-mookata` (parent: `8910776`, current `main` tip) —
**not on `main`, and not pushed.** `git fsck` confirms `main` itself is unaffected/unchanged and
no corruption was introduced. `git log`/`git branch -v` both show the new branch and its commit.

**Action needed from the user:** once `.git/HEAD.lock`/`.git/index.lock` are cleared (deleting
them from Windows Explorer isn't subject to this Linux sandbox's `EPERM`-on-delete restriction,
per the 2026-09-02 report's suggestion), fast-forward `main` onto this branch, e.g.:
```
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen"
git merge --ff-only pending-2026-09-03-bangkok-street-mookata
git branch -d pending-2026-09-03-bangkok-street-mookata
git push origin main
```
The working tree still has these same file changes present as uncommitted modifications relative
to `main` (expected, since `main` itself wasn't moved) — the `git merge --ff-only` above is safe
and won't conflict with them since they're identical content.

## Status / next steps for whoever picks this up next

- `npx tsc --noEmit` / `npm run build` verification for this batch could not be completed this
  run (sandbox disk full) — should be run manually or by a future run with more disk headroom
  before fully trusting this batch compiles.
- A large backlog of **other tracks'** uncommitted work (grocery-track, branch-track, and an
  earlier restaurant-track batch from earlier today) remains sitting in this working tree,
  untouched by this run — see `git status` for the full list (`branchQueue.ts`, additional
  `brands.ts`/`menuItems.ts`/`researchQueue.ts` hunks beyond this run's own diff,
  `CONTENT_QUEUE.md`, `ROADMAP.md`, and several untracked `research-sessions/*.md` files). A
  future session should review and commit those separately rather than assuming they're lost —
  they are real completed work, just not committed yet.
- `85_fengshan_centre_j_k_kings_prata_pte_ltd` (also at 85 Fengshan Centre, name directly names
  "Prata") and the two low-priority "Prata Palace"/"Prata.com" hawker entries
  (`one_punggol_hawker_centre_haji_karim_prata_palace_pte_ltd`,
  `punggol_coast_hawker_centre_srisun_prata_com_food_holding_s_pte_ltd`) are good candidates for
  the next scheduled run using this same "name directly names a dish" selection heuristic.
- Bangkok Street Mookata has 7 more real, priced a-la-carte items not yet added (garlic variants,
  streaky bacon, pig liver, pork ball, luncheon meat, sirloin beef cube, beef short plate
  variants) that a future pass could add for fuller menu coverage.
