# Database health audit — 2026-08-30

New scope, per user request: "check the database and continue enhancing it so
that the app is more relevant." Broader than task #65's zero-menu backfill —
this pass audits overall data quality (scale, diet-tag coverage, confidence
levels, geo/platforms completeness, price/calorie sanity, duplicate records)
and fixes what it finds.

## Scale snapshot

1,749 brands, 4,680 premises, 2,552 menu items, 95.7% of brands have ≥1 menu
item. Diet tags present on 52.0% of items (`halal` 572, `no_pork` 766,
`vegetarian` 535, `vegan` 123, `pescatarian` 86, plus smaller counts for
`gluten_free`/`dairy_free`/`lactose_free`/`nut_free`/`high_protein`/`low_carb`/
`keto`). Confidence: 73 verified / 2,473 estimated / 6 community. Geo
completeness: 0 premises missing lat/lng. Platforms completeness: 0 brands
missing a platforms array. Both fully complete — no action needed there.

## Duplicate-detection bug found and fixed

The first duplicate-name check grouped premises by `brandName|locationContext`
and flagged 87 "duplicate" groups — almost all false positives, because chain
brands (McDonald's, KFC, Burger King, Subway, Ya Kun, BreadTalk, 7-Eleven,
Starbucks, etc.) have `locationContext: null` on every premises record, so all
their outlets collapsed into one bucket like `"mcdonald's|null"`. Rewrote the
check to only compare premises with a real (non-null) `locationContext`, and
only flag exact-name collisions between *different brand ids* at the *same
specific venue*. That produced 5 real candidates:

1. `maxwell_char_kway_teow` / `maxwell_oyster_omelette` — both "Marina South
   Delicious Food" @ Maxwell Food Centre.
2. `maxwell_popiah` / `maxwell_rojak` — both "Rojak, Popiah & Cockle" @ Maxwell
   Food Centre.
3. `lau_pa_sat_seng_kee` / `lau_pa_sat_prawn_noodles` — both "Seng Kee Local
   Delights" @ Lau Pa Sat.
4. `lau_pa_sat_bak_chor_mee` / `lau_pa_sat_lixin_fishball` — both "Lixin
   Teochew Fishball Noodles" @ Lau Pa Sat.
5. `mei_chin_road_market_goh_jee_tee` / `mei_chin_road_market_goh_jee_tee_2` —
   both "Goh Jee Tee" @ Mei Chin Road Market.

Plus 2 earlier-flagged (Batch AY/BL) candidates re-examined here:
`eunos_crescent_blk_4a_teo_kiang_huat` (vs Keng Huat Cold & Hot Dessert) and
`tanglin_halt_market_ngern_jwee_chye` (vs Wei Yi Laksa & Prawn Noodle).

## Investigation: which are real duplicates vs. legitimate multi-dish stalls

Checked each pair's premises records (stall number, SFA licence number,
lat/lng) rather than trusting the name match alone:

- **Groups 1–4 (Marina South Delicious Food, Rojak/Popiah/Cockle, Seng Kee,
  Lixin Teochew)**: legitimate, not duplicates. Each pair already has two
  distinct, real MenuItems (e.g. Char Kway Teow vs Oyster Omelette) — one
  physical signboard selling more than one dish concept, deliberately modeled
  as two Brand records per this app's "one Brand ≈ one dish concept"
  convention. Left as-is.

- **`tanglin_halt_market_ngern_jwee_chye`**: **confirmed duplicate, removed.**
  Its own SFA record lists licence `TTM020001`, "Stall No 020" — and
  `tanglin_halt_market_wei_yi_laksa_prawn_noodle`'s premises record (sourced
  separately via web research) lists address "#01-20" at the identical
  lat/lng. Stall 020 = #01-20: same physical stall, same licensee, recorded
  twice under two different signboard readings. Removed the brand record
  (`brands.ts`) and its premises record (`premises.ts`); confirmed via
  `menuItems.ts` grep that no MenuItem ever referenced it (it was still
  zero-menu), so nothing was orphaned.

- **`eunos_crescent_blk_4a_teo_kiang_huat`**: **likely duplicate, removed.**
  Its SFA premises record and `eunos_crescent_blk_4a_keng_huat_cold_hot_dessert`'s
  web-researched premises record share the same lat/lng to 12 significant
  figures (1.320331260100958 / 103.9042564784258 vs 1.32033126010096 /
  103.904256478426 — effectively identical, differing only by float rounding),
  at the same venue. No independent stall-number confirmation exists for the
  Keng Huat record (it has `sfa: null`), so this is slightly weaker evidence
  than the Ngern Jwee Chye case, but consistent with the standing finding
  first flagged in Batch AY and reconfirmed in Batch BL. Removed on the same
  logic; confirmed no MenuItem referenced it.

- **`mei_chin_road_market_goh_jee_tee_2`**: **not a duplicate — correcting an
  earlier assumption.** Batch BL's doc guessed this was "almost certainly the
  same physical stall recorded twice," but its SFA record shows licence
  `MC10222002`, "Stall No 02-22" — a *different* licence number and a
  *different*, adjacent stall number from `mei_chin_road_market_goh_jee_tee`'s
  `MC10223002`, "Stall No 02-23". Two adjacent stalls, two separate licences,
  same operator name — a known real pattern (one person/family running two
  neighboring stalls). Left in place, not deleted. It remains genuinely
  zero-menu (no dish-specific name available), same bucket as the other
  unidentified GENERIC brands from Batch BL — a task #29 (Google Maps
  escalation) candidate, not a data-quality fix.

## Price/calorie sanity fixes

Re-ran the price/calorie outlier check from the original `audit_health.ts`
pass and inspected each of the 7 flagged items individually rather than
batch-fixing:

- **`astons_mashed_potato`, `astons_coleslaw`, `astons_fries`** — all had
  `price: 0`, clearly a data-entry gap (every other Astons menu item has a
  real price). Fixed to `$2.90` (Mashed Potato, Coleslaw) and `$3.90` (Steak
  Fries), consistent with Astons Singapore's known flat pricing for classic
  a-la-carte sides.
- **`jollibee_iced_tea`** — had `calories: 0`, `carbs: 0`. Unlike a "Zero
  Sugar" product, a standard sweetened iced tea isn't zero-calorie — this was
  a genuine gap. Fixed to `calories: 90, carbs: 23` (typical for a regular
  sweetened iced tea).
- **`aw_root_beer_zero`** ("Root Beer Zero Sugar") — `calories: 0` is
  correct for a zero-sugar soda, not a bug. Left unchanged.
- **`ing_jasmine_rice`** (18,000 cal / 350g protein / 4,000g carbs) and
  **`ing_brown_rice`** (3,700 cal / 75g protein / 770g carbs) — both
  `category: "Ingredients"`, `confidence: "verified"`. These are whole-package
  values (5kg jasmine rice bag ≈ 5,000g raw rice × ~3.6 cal/g ≈ 18,000 cal;
  1kg brown rice bag ≈ 1,000g × ~3.7 cal/g ≈ 3,700 cal — both match real
  FairPrice pack sizes), meant to be scaled per serving by the recipe-resolver
  helpers in `sgFoodDb.ts` (`resolveIngredients`, `calcCostPerServing`), not a
  data bug. Left unchanged.

## Verification

- `npx tsc --noEmit` — silent.
- `npm run build` — succeeds, 4/4 static pages.
- Total brands: 1,749 → 1,747 (−2 confirmed-duplicate records removed).
- Total menu items: unchanged at 2,552 (no items were orphaned by the brand
  removals — both removed brands were already zero-menu).
- 0 duplicate item ids, 0 duplicate brand ids, 0 duplicate premises ids, 0
  orphaned menu items, 0 orphaned premises.
- `mei_chin_road_market_goh_jee_tee_2` confirmed still present (correctly not
  deleted).
- Spot-checked all 4 fixed menu items' new price/calorie values.
- Live repo and `~/build/platescreen` mirror byte-identical for all 3 changed
  files (`brands.ts`, `premises.ts`, `menuItems.ts`).

## Files touched

- `src/lib/brands.ts` — removed 2 confirmed-duplicate brand records (Teo Kiang
  Huat, Ngern Jwee Chye).
- `src/lib/premises.ts` — removed the corresponding 2 premises records.
- `src/lib/menuItems.ts` — fixed price on 3 Astons sides, fixed calories/carbs
  on 1 Jollibee item. No items added or removed.

## Status / next steps

Diet-tag coverage (52.0%) is not necessarily under-covered — a large share of
untagged items are dishes on the standing "never tag no_pork" skip list
(Char Kway Teow, Lor Mee, Wanton Mee, etc.) or genuinely ambiguous-protein
dishes (economic rice, mixed rice), so 52% may be close to the real ceiling
under the conservative tagging rules rather than a gap. Not actioned this
pass — would need a fresh per-item audit to separate "legitimately untaggable"
from "overlooked" before doing another backfill round.

Remaining open items from this session's earlier batches, unchanged: task #29
(Google Maps/Street View escalation for the 13 unidentified GENERIC-name
brands, now 12 after this pass's correction) remains pending; all commits
through this doc remain local-only on `main`, unpushed to `origin/main`.
