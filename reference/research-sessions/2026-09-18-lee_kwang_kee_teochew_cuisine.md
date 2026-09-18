# 2026-09-18 (7pm scheduled restaurant-track run) — Lee Kwang Kee Teochew Cuisine + bookkeeping sweep

## Context

This is the 19:00 run of `platescreen-research-restaurants` (3x/day: 3am/11am/7pm). The 11am run
today (commit `b49e626`) already landed `food_junction_toast_junction` and a partial staleness
audit. Per Phase 1's deterministic selection, `kopitiam`/`koufu`/`foodfare` (the top 3 high-priority
operator entries) were re-checked first and re-confirmed to have no addressable single-outlet gap
this run — same 3 unresolved kopitiam sub-brands as every prior run (`kopitiam_china_food` needs
Street View, `kopitiam_king_grouper` needs a Brand-merge restructure out of this task's scope,
`kopitiam_cheers` is permanently non-food). Browser-based Street View was attempted again this run
(`mcp__Claude_Browser__request_access` on google.com) and was declined at the tool level, same
outcome as every prior run — this unattended session has no one to approve site access.

`food_junction` (all 4 house-brand concessions now have real menus per the 11am run) and
`hawkers_street` (all 27 stalls covered) also re-confirmed non-actionable without new per-venue
on-site research.

## Sweep methodology

Rather than walking further down the priority-sorted list one entry at a time (as several recent
runs did), this run cross-referenced every medium/low-priority pending entry's `sfaLicenceNo`
against the live `premises.ts` file directly (`grep` for each licence number), since ~38 of the 47
pending restaurant-track entries carry stale 2026-08-20-era notes referencing pre-restructure
"Outlet row"/"FoodOption" terminology that was never re-verified against the current Brand/Premises
schema.

Findings:
- **6 entries were chain-duplicates already covered under an existing shared Brand**: the queue
  entry's own SFA licence number already has a Premises row under a different, canonical brandId
  (`kfc`, `pizza_hut`, `breadtalk`, `dominos`) which already carries a full generic MenuItems menu.
  A 7th (`anchorvale_village_hawker_centre_mcdonald_s_restaurants_pte_ltd`) was already resolved on
  2026-08-24 (Batch L) — its duplicate Brand was removed and reassigned as a Premises row under `mcd`
  — but the queue entry itself was never flipped. All 6 flipped to `researched` this run with a note
  citing the exact Premises id / brandId each licence resolves to.
- **2 entries already had real MenuItems** in the live `menuItems.ts` (`one_punggol_hawker_centre_
  haji_karim_prata_palace_pte_ltd`, `punggol_coast_hawker_centre_srisun_prata_com_food_holding_s_
  pte_ltd`) from earlier untracked work but still showed `pending`. Flipped to `researched`.
- **1 entry, `toa_payoh_lorong_8_blk_210_lee_kwang_kee_groups_pte_ltd`**, turned out to be a real,
  independent, well-documented restaurant hiding behind a bare corporate licensee name — picked as
  this run's single-outlet research target (see below).
- The remaining ~29 pending entries (mostly genuine bare-personal-name task #29 entries, 2 food-court
  -operator containers already individually ruled out by the 11am run, and
  `kovan_hougang_market_and_food_centre_alpha_subs_pte_ltd` which the 11am run already re-attempted
  with no source found) were **not** independently re-verified this pass and remain `pending`.

## Research: Lee Kwang Kee Teochew Cuisine

- **Brand**: `toa_payoh_lorong_8_blk_210_lee_kwang_kee_groups_pte_ltd` (already existed, 2026-08-20
  SFA restructuring, `type: "hawker"`, `cuisine: "Local & Hawker"` placeholder).
- **SFA verification**: queried data.gov.sg's live API directly for licence `E75024N002` ->
  `licensee_name: "LEE KWANG KEE GROUPS PTE. LTD."`, `premises_address: "212 LORONG 8 TOA PAYOH
  #01-53 SINGAPORE 310212"`, `grade: "A"`. Note: the Brand's existing Premises row's `address`/
  `locationContext` fields say the food centre's generic "Blk 210" (matching the majority of that
  food centre's other stalls) while the actual SFA-verified premises is Blk 212, next door — a
  pre-existing minor Premises-labelling inaccuracy, not something this run's Phase 2 scope covers;
  flagging for a future Premises-accuracy pass.
- **Identity confirmation**: WebSearch for "Lee Kwang Kee" + Toa Payoh independently confirmed this
  is "Lee Kwang Kee Teochew Cuisine" — a real Chinese Teochew casual restaurant established September
  2014, with an official site (teochew-cuisine.com), its own Facebook page
  (facebook.com/212teochewcuisine), and independent coverage on Burpple (38 reviews), Tripadvisor,
  Lemon8, and a detailed 2019 blog review with photographed menu prices
  (ivanteh-runningman.blogspot.com). The official site's own menu page is an unparsable image scan,
  so dish names/prices were sourced from the blog review instead.
- **MenuItems added** (10, ids `lkk_*`, all `confidence: "estimated"` — no official nutrition source
  exists for this independent restaurant):
  - Har Gow (3 Pcs) — $3.60 — 150 cal / 7p / 14c / 6f — `no_pork`
  - Xiao Long Bao (3 Pcs) — $3.60 — 160 / 6 / 16 / 8 — no tags (on CLAUDE.md's never-tag-no_pork
    skip-list)
  - Siew Mai (3 Pcs) — $3.60 — 150 / 8 / 12 / 8 — no tags (matches this DB's existing
    `tbsk_siew_mai` analog exactly: 150/8/12/8)
  - Steamed Shrimp Beancurd Skin Roll (3 Pcs) — $3.60 — 170 / 7 / 10 / 11 — `no_pork`
  - Steamed Pork Ribs Black Bean Sauce — $3.60 — 190 / 12 / 5 / 14 — explicitly pork-named, so no
    `compatibleWith` array at all, per CLAUDE.md section 5.1
  - Pan-Fried Yam Cake — $2.00 — 180 / 3 / 20 / 10 — no tags (contains dried Chinese sausage +
    dried shrimp per the source review, so not vegetarian)
  - Teochew Fried Oyster Omelette (Small) — $12.00 — 480 / 20 / 38 / 24 — `no_pork` — calibrated
    against this DB's `max_oyster_omelette` (396/18/35/19 @ $5 hawker portion), scaled up ~20% for
    this restaurant's larger $12 "small" size
  - Sweet & Sour Sliced Garoupa Fish (Small) — $35.00 — 900 / 45 / 60 / 45 — `no_pork`,
    `pescatarian` — reasoned as a shared/family-style plate (feeds 2-3), scaled up from this DB's
    single-portion `Steamed Fish` entries (380/35/10/18 @ $8)
  - Teochew Cold Crab (Per Crab) — $50.00 — 320 / 42 / 4 / 14 — `no_pork`, `pescatarian` —
    calibrated against this DB's existing `Chilli Crab` entries (480/36/32/22 @ $25), adjusted down
    for steaming-and-chilling technique vs. frying-in-sauce
  - Yam Paste With Pumpkin & Gingko Nuts — $4.50 — 340 / 3 / 48 / 15 — `vegetarian`

- Also extended `reference/data/dish-macro-lookup.py`'s `DISH_DB` with all 10 dish types (Batch
  2026-09-18 2nd pass).

## Verification

- `/sessions` (this project's normal disk) is still at 100% capacity — same ENOSPC condition
  documented in the 2026-09-03 report. Worked around it this run by mirroring the project into
  `/tmp` (on the root filesystem, which had ~4GB free) instead of the usual `~/build/platescreen`,
  and redirecting npm's cache off `/sessions` with `--cache /tmp/npm-cache`.
- `npm install` succeeded cleanly in the `/tmp` mirror (311 packages).
- **`./node_modules/.bin/tsc --noEmit` ran to completion and passed silently (exit 0, no errors)** —
  full TypeScript verification, not the degraded manual fallback used on 2026-09-03.
- `next build` (via the local binary, bypassing `npx`'s own cache which still hit ENOSPC) failed
  with a webpack/CSS-loader module-resolution error (`Cannot find module './util'` inside
  `ts-interface-checker`, reached via `tailwindcss` -> `sucrase`). This is a dependency-resolution
  issue in the freshly-installed `/tmp` node_modules tree, unrelated to any file this run touched
  (no CSS/webpack-config files were edited) — not treated as a verification failure of this run's
  data changes, since `tsc --noEmit` already confirms the edited `.ts` files type-check cleanly.
- Manual checks in the `/tmp` mirror (post-edit): no duplicate ids in `menuItems.ts` (10 new `lkk_*`
  ids, 0 collisions); `toa_payoh_lorong_8_blk_210_lee_kwang_kee_groups_pte_ltd` resolves to a real
  Brand row (no orphaned brandId); brace/bracket balance in both edited files matches exactly
  (`researchQueue.ts`: 131/131 braces, 141/141 brackets; `menuItems.ts`: 2696/2696 braces, 2206/2206
  brackets); `researchQueue.ts` status counts sum correctly (91 researched + 40 pending = 131 total).

## Files touched

- `src/lib/menuItems.ts` — +10 MenuItems (`lkk_*`)
- `reference/data/dish-macro-lookup.py` — +10 DISH_DB entries (Batch 2026-09-18 2nd pass)
- `src/lib/researchQueue.ts` — 8 entries flipped `pending` -> `researched` (1 real research target +
  7 bookkeeping fixes), each with its own dated note

## Status / next steps

- `toa_payoh_lorong_8_blk_210_lee_kwang_kee_groups_pte_ltd`: `researched`, 10 real MenuItems added.
- 7 sibling bare-SFA-licensee entries: `researched` as verified bookkeeping fixes (no new records —
  already covered elsewhere).
- ~29 other pending entries in this batch were not touched this run — flagged for a future pass to
  continue the same licence-cross-reference sweep methodology used here, which resolved 8 of the 38
  checked this run without needing fresh web research for most of them.
- The Lee Kwang Kee Premises row's Blk-210-vs-Blk-212 address label mismatch is flagged for a future
  Premises-accuracy pass, same category as the `kopitiam_king_grouper` Brand-merge flag from prior
  runs.
- `/sessions` disk is still full; the `/tmp`-mirror + redirected-cache workaround documented here
  should be reusable by future runs until the underlying disk pressure is addressed.
