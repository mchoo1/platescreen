# 2026-09-16 — Diet-tag categorical-exclusion audit (2 fixes) + sandbox disk-exhaustion workaround found

## Why

Routine `platescreen-improve-app` data-quality pass. Per CLAUDE.md section
5.1, dishes explicitly named for pork/offal (Bak Kut Teh, Pork Congee, Pig
Organ Soup, Sweet and Sour Pork Rice, Fried Shark Lor Mee, Golden Broth
Ramen, Pork Chop, Lotus Root Pork Ribs Soup) are supposed to get **no
`compatibleWith` array at all** — a categorical exclusion, not merely a
skip from `no_pork`. This rule hadn't been specifically audited for
compliance since it was written (2026-08-30); this pass checked it.

Also: this session's sandbox disk was, unusually, **not** exhausted the way
the previous three `platescreen-improve-app` runs (2026-09-07, 2026-09-08,
2026-09-15) found it — see "Disk-exhaustion workaround" below for why this
matters for every future run of this task.

## Disk-exhaustion workaround (found this session, not yet in CLAUDE.md)

`/sessions` (`/dev/sdc`) was still 100% full (18M free) exactly as the prior
three sessions found it — confirmed independently. But `$HOME` and the
previous sessions' `~/build` mirror both live under `/sessions`, which is
why every prior attempt to `npm install` there failed with `ENOSPC`. The
root filesystem (`/dev/sda1`, mounted at `/`) is a **separate, mostly-free
disk** (1.1G free at session start) that was never tried before. Building
the mirror at `/tmp/platescreen-mirror` (which lives on `/`, not
`/sessions`) and pointing npm's cache at `/tmp/npm-cache` (npm defaults its
cache under `$HOME/.npm`, which is also on the full `/sessions` disk, so
this redirect is required even after moving the mirror itself) let
`npm install` complete cleanly (394 packages, 18s) and `npx tsc --noEmit`
run for real — the first genuine `tsc` pass since 2026-09-08, versus the
Node-22-native-type-stripping partial substitute the last few sessions had
to fall back to.

`npm run build` also got **all the way through** compiling, type-checking,
and generating all 4,397 static pages successfully — it only hit `ENOSPC`
at the very last step (copying the exported HTML from `.next/server` to
`out/`), because the root disk has just over 500M free after
`node_modules`, and the full static export needs more than that. This is a
disk-*size* limit at the final copy step, not a build/content problem —
everything up to and including static-page generation succeeded. Cleaned up
`.next/`/`out/`/the mirror's `node_modules` afterward to leave no residue.

**Recommendation for future sessions of this task and the three research
tasks:** use `/tmp/<name>` (or another path under `/`, not `$HOME`/`~build`)
for the mirror, and set `npm_config_cache=/tmp/npm-cache` before `npm
install`. This unblocks real `tsc --noEmit` even while `/sessions` stays
full. A full `npm run build` through to a complete `out/` directory likely
still needs more free root-disk space than is reliably available (~500M
after install), so budget for `tsc --noEmit` (which fully succeeded) as the
real verification gate and treat `npm run build`'s final export-copy
`ENOSPC` the same way CLAUDE.md's own build-timeout allowance treats a
build that can't finish — not a sign of a real problem, given `tsc` was
clean and static-page generation itself succeeded for all 4,397 pages.

## Method

1. Synced `src/` into a mirror at `/tmp/platescreen-mirror` (not
   `~/build`, see above), ran `npm install` there.
2. Wrote a throwaway audit script (`audit_diettag_rules.mjs`, deleted after
   use) using Node 22's native TS import (and later plain `tsc`-verified
   edits) to check MenuItems against CLAUDE.md 5.1's rules:
   - Skip-list dishes (Char Kway Teow, Hor Fun, Porridge, Pizza, Wanton
     Mee, etc.) incorrectly carrying `no_pork`.
   - The 8 categorically-excluded pork/offal dish names carrying *any*
     `compatibleWith` array.
   - Any tag value outside the `DietaryFlag` type (typo check).
   - `halal`-tagged items whose name also matches a pork-named term.
   - `vegetarian`/`vegan`-tagged items whose name contains a meat word
     (to catch egg/plant-based-branded false positives vs. real errors).
3. **Manually reviewed every flagged candidate** before acting — per
   CLAUDE.md's mandatory step, since several categories here are exactly
   the kind of keyword-substring matching that has caused false positives
   in prior audits (see Results below for what this caught).

## Results

**Confirmed and fixed — 2 items, exact match to the categorical-exclusion
list:**

| id | name | before | after |
|---|---|---|---|
| `lps_fx_herbal_bkt` | Herbal Bak Kut Teh | `["lactose_free"]` | *(no `compatibleWith` field)* |
| `gmfc_bak_kut_teh` | Bak Kut Teh | `["gluten_free","lactose_free"]` | *(no `compatibleWith` field)* |

Both are literally named "Bak Kut Teh," one of the 8 exact names CLAUDE.md
5.1 says must carry no diet tags at all. Removed the `compatibleWith` field
entirely (matching the convention already used by the other ~23 pork-named
items in the dataset, rather than setting it to `[]`).

**Reviewed and confirmed correct, no action taken (9 candidates):**
`SKIP_LIST` substring matching flagged 9 items (`Vegetarian Char Kway Teow`,
`Beef Hor Fun`, `Fish Porridge` x3, `Seafood Hor Fun`, `Vegetarian Wanton
Mee`, and 2 pizzas) as potential false `no_pork` tags. All 9 turned out to
be correctly tagged on manual review: each dish name explicitly states a
non-pork protein or "Vegetarian," which is the actual reason `no_pork`/
`vegetarian` was assigned — the skip-list concern (pork/lard present
despite an unqualified generic name) doesn't apply once the dish name
itself rules it out. Not a bug in the false-positive sense, but this
distinction (explicit-protein-named vs. bare dish name) isn't written down
anywhere in CLAUDE.md 5.1 — worth adding as a clarifying note so a future
keyword-based audit doesn't need to re-derive it. Did not edit CLAUDE.md
this pass (out of this task's data-only scope) — flagging for whoever next
touches section 5.1.

**Reviewed and confirmed correct, no action taken (39 egg/plant-based
"vegetarian ingredient contains a meat word" checks):** all matched dishes
with `vegetarian`/`vegan` + an egg ingredient (standard ovo-vegetarian
convention, not a bug) or a plant-based product using a meat-mimicking
brand name ("Impossible Ground Beef," "Veg Butter Chicken"). No action.

**Flagged but NOT acted on — 2 borderline extensions of the categorical-
exclusion rule, left for a human decision:**
- `lps_fx_organ_porridge` ("Mixed Pig Organ Fried Porridge," `["lactose_free"]`)
  and `ss_roast_pork` ("Char Siu / Roast Pork Slice," `["gluten_free",
  "lactose_free"]`) are both unambiguously pork/offal dishes by name, but
  neither is one of the 8 *exact* dish names CLAUDE.md 5.1 lists for
  categorical exclusion ("Pig Organ Soup" ≠ "Pig Organ Fried Porridge";
  "Pork Chop" ≠ "Roast Pork Slice"). Extending the rule to them by analogy
  seemed reasonable but is a judgment call about how literally to read an
  explicit named list — exactly the kind of unilateral rule-extension this
  task's manual-review step exists to catch rather than wave through.
  Left both tagged as-is; noting here for a future pass or explicit
  CLAUDE.md update to either broaden the rule to a pattern-match or confirm
  the exact-list reading is intentional.

**Also checked, found clean, no action needed:**
- No invalid/typo `compatibleWith` or `Brand.dietTags` values anywhere in
  the dataset (checked against the full `DietaryFlag` union type).
- 0 `halal`-tagged items also matching a pork-named term.
- 0 price outliers (≤0 or >$100), 0 negative macro values.
- Calorie/macro-sum ratio check: 6 items flagged >35% off a
  protein×4+carbs×4+fat×9 estimate, all false positives — beverages
  (alcohol calories aren't captured by the 3-macro formula; e.g. "Beer"
  150 cal / 52 calc) or negligible-calorie black coffee where a 1-2
  calorie rounding produces a large *percentage* difference. No real
  calorie/macro mismatches found.
- Re-confirmed 0 duplicate ids within Brands/Premises/MenuItems, 0 orphaned
  `brandId` references (Premises, MenuItems, and `GroceryProduct` all
  checked) — matches the 2026-09-15 lightweight check, now re-verified via
  real `tsc`-backed data rather than the Node-native-import substitute.
- **Side-finding, not a bug:** 21 MenuItems (all single-item brands, e.g.
  `oar_char_kway_teow` naming both the Brand and its one MenuItem
  identically) reuse their parent Brand's `id` string as their own
  MenuItem `id`, instead of the distinct-suffix convention 1,408 other
  single-item brands use (e.g. `maxwell_wonton_mee` brand → `max_wonton_mee`
  item). Verified this causes no actual routing or lookup bug —
  `brandPages.ts` keeps separate `BRAND_BY_ID`/`MENU_ITEM_BY_ID` maps, and
  `/brand/[id]/[itemId]` treats `id`/`itemId` as independent route
  segments, so `/brand/oar_char_kway_teow/oar_char_kway_teow` is a valid,
  unique URL. Did not rename these — the per-brand/per-dish SEO pages have
  been live since 2026-08-31, so changing an item's `id` would 404 an
  already-indexed URL for a purely cosmetic naming-consistency gain with no
  functional bug behind it. Noting for awareness only.

## Verification

- `npx tsc --noEmit` in the `/tmp/platescreen-mirror` mirror: **clean**
  (real `tsc`, not the Node-native substitute — see disk-workaround section
  above).
- `npm run build`: compiled successfully, types checked, all 4,397 static
  pages generated successfully; failed only at the final export-copy step
  with `ENOSPC` (523M free on `/`, not enough for the full `out/` export).
  Not a content/build problem — see disk-workaround section.
- Runtime integrity script: 1,726 brands / 4,662 premises / 2,665 menu
  items. 0 duplicate ids (per-array), 0 orphaned `brandId` refs (Premises,
  MenuItems, GroceryProduct), 0 invalid `DietaryFlag` values, 0 price
  outliers, 0 negative macros.
- Confirmed both target items now import with `compatibleWith: undefined`
  and that 0 items remain matching the exact 8-name categorical-exclusion
  list with a non-empty tag array.
- Diet-tag coverage: 1,731 / 2,665 (65.0%) MenuItems carry ≥1 tag, down
  from 1,733/2,665 before this fix (2 tags removed, item count itself grew
  by ~9 since the 2026-09-15 snapshot from other automation runs, not this
  session).
- `diff`'d the live `src/lib/menuItems.ts` against the mirror's copy —
  byte-identical.
- Deleted all temporary audit/verify scripts from both the mirror and (none
  were ever written to) the live repo.

## Not done

- The 2 borderline extension candidates (`lps_fx_organ_porridge`,
  `ss_roast_pork`) — left tagged as-is, flagged above for a human decision
  on whether CLAUDE.md 5.1's categorical-exclusion list should be read as
  exact-match-only or extended to any dish unambiguously named for pork/
  offal.
- Did not update CLAUDE.md 5.1 with the "explicit-protein overrides the
  skip-list" clarification noted above — flagging in this report rather
  than editing docs outside this task's data-quality scope; whoever next
  touches section 5.1 should fold it in.
- Did not attempt the `GroceryProduct` chain-expansion item (Cold Storage/
  Giant/Sheng Siong/Don Don Donki) or any item requiring external research —
  this pass was existing-data audit only, no new sourcing.
- Did not push (per standing rule — commits are local only).
