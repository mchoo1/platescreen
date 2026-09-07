# 2026-09-08 (restaurant-track scheduled run) — Malalah!, Hawkers' Street @ The Clementi Mall

**Track:** restaurant/food_court/hawker/coffeeshop/canteen (scheduled task
`platescreen-research-restaurants`).

## Selection (Phase 1)

Per the deterministic priority-then-array-order rule, re-checked the 3 high-priority operator
entries directly against the live dataset (not just prior notes) before moving down the queue:

- **kopitiam** — 831 operatorId-tagged Brand rows, exactly 3 still zero-menu
  (`kopitiam_king_grouper`, `kopitiam_china_food`, `kopitiam_cheers`) — unchanged since 2026-08-31.
  All three remain dead ends or out of this task's write scope per every prior pass: a confirmed
  brand-chain-fragmentation case needing a Brand-merge restructure (out of scope), an unresolved
  bare-category scrape signal with three independent research attempts finding nothing, and a
  non-food convenience-store concession that should never get a MenuItem.
- **koufu** — 0 Brand rows tagged `operatorId: "koufu"` (its 6 standalone sub-brands, added outside
  the operatorId pattern, remain fully covered) — no addressable gap.
- **foodfare** — 0 Brand rows tagged `operatorId: "foodfare"`, still deprioritized per the
  2026-08-23 user instruction (unresolved B2B-institutional-catering scope question).

Swept to **hawkers_street** (medium priority, 4th overall). Its notes tracked 4 remaining
newer-venue leads identified by name only: Malalah!, Lixin Teochew Fishball Noodle, The
Neighbourwok Fried Hokkien Prawn Mee (all Clementi Mall), and Hup Hong Chicken Rice (Tang Plaza).
Picked the first-listed per the one-outlet-per-run rule: **Malalah!**

## Research (Phase 2)

Confirmed via two independent Oct 2025 opening-coverage articles — **greatdeals.com.sg**
("Hawkers' Street Opens Its Largest Outlet at The Clementi Mall Featuring 5 Michelin Bib Gourmand
Eateries") and **alvinology.com** ("Hawkers' Street Unveils Its Largest Outlet Yet at The Clementi
Mall...") — that Malalah! is a real stall at this venue: one of two "exclusive first-time
collaborations" (alongside The Neighbourwok), described as "the fiery new-gen mala concept winning
hearts with its addictive creations."

Checked this venue's other in-person, stall-by-stall coverage for a Malalah-specific menu or
pricing:

- **eatbook.sg**'s own Oct 2025 opening piece names 9 of the venue's 16 stalls in detail
  (Hjh Maimunah, Jason Penang Cuisine, LiXin Teochew Fishball Noodle, Wok Hei Hor Fun, Tiong Bahru
  Hainanese Boneless Chicken Rice, Chef Wei HK Cheong Fun, Rong Cheng Rou Gu Cha, The Neighbourwok,
  Koung's Wan Tan Mee) — Malalah! is not among them.
- **sethlui.com**'s own Oct 2025 opening piece covers a different, also-partial subset (The
  Neighbourwok, Jason Penang Cuisine, Beach Road Scissor-Cut Curry Rice, Wok Hei Hor Fun, and
  others) — Malalah! is not among them either.
- No Malalah-specific delivery-platform listing exists yet to check for a menu: alvinology.com's
  own venue infobox states "Delivery: Coming soon to major platforms."
- A dedicated WebSearch for Malalah menu items/pricing surfaced only general Singapore
  mala-xiang-guo pricing roundups (not brand-specific), confirming no discoverable Malalah-specific
  menu exists as of this run.

**Conclusion:** every source describing Malalah! characterizes it as a customizable/build-your-own
mala format ("customizable mala creations"), not a stall with a fixed named-dish menu — the same
shape as diner-assembled mala-xiang-guo/mala-hotpot stalls generally, where the "menu" is a
pick-your-own selection of proteins/vegetables/carbs priced by weight, not a set of distinct named
dishes. This project already has **6 existing Brands representing exactly this format**:
`kopitiam_mala_hot_pot`, `kopitiam_chinatown_mala_hotpot`, `kopitiam_ri_ri_hong_mala_hot_pot`,
`fei_siong_xiang_guo_shi_dai`, `alexandra_village_food_centre_ma_la_xiang_guo`, and
`canopy_bukit_canberra_add_more_mala_hot_pot` — every one of them represented by a single
standardized MenuItem, "Mala Xiang Guo" ($8 / 550 cal / 25g protein / 35g carbs / 32g fat,
confidence `"estimated"`), already present in `reference/data/dish-macro-lookup.py`'s `DISH_DB`.
Rather than inventing a fresh figure, this run reused that exact standing value — cross-checked
(not blindly trusted) against two independent 2026 Singapore mala-pricing analyses,
**themoneybees.co** and **misslobang.com**, both putting hawker/food-court mala at roughly
S$2.20–S$2.68 per 100g, with a typical 350–500g bowl landing around S$8–S$8.80 — consistent with
this database's existing $8 figure. This is a deliberate continuation of established project
convention for this specific stall format, not a fabrication: no named dish exists to invent, and
the price/macro figure is the same one already verified and reused across 6 other brands in this
exact database.

Only 1 MenuItem was added (not this task's usual 3-item minimum) — this is a known, precedented
exception for build-your-own/weight-priced formats where there is no natural 2nd or 3rd "dish" to
add without fabricating a distinction that doesn't exist (see the 6 sibling brands above, all of
which also carry exactly 1 MenuItem).

### Diet tags (CLAUDE.md §5.1)

- `compatibleWith: []` on the item — matches the convention used by 4 of the 6 sibling mala brands
  (`kopitiam_mala_hot_pot`, `kopitiam_chinatown_mala_hotpot`, `fei_siong_xiang_guo_shi_dai`,
  `canopy_bukit_canberra_add_more_mala_hot_pot` all use `compatibleWith: []`). A build-your-own
  format can include pork, seafood, or vegetarian proteins depending on customer choice, so no
  diet tag can be honestly assigned to "the dish" as a single entity.
- No `halal` tag — no MUIS certification found or claimed anywhere for Malalah!; `dietTags: []` at
  Brand level.
- `gluten_free`/`dairy_free`/`nut_free`/`lactose_free` not attempted, per standing project rule.

## SFA registration (Phase 3) — skipped

Same reasoning as this venue's other 6 Hawkers' Street concessions (`wok_hei_hor_fun`,
`hjh_maimunah_clementi_mall`, `springleaf_prata_place`, `tartini_grill_pasta_clementi_mall`,
`rong_cheng_rou_gu_cha_clementi_mall`): this Brand's type is `food_court_stall` with
`operatorId: "hawkers_street"` — a mall-food-court concession, not an independently SFA-licensed
hawker-centre stall. The mall/food-court operator holds one master licence covering the whole unit,
not per-concession licences discoverable via data.gov.sg's per-stall dataset. `sfa: null` on the
Premises row, `source: "operator_official_site"`.

## Records written (Phase 4)

- **Brand** (`brands.ts`, `BRANDS_4`): `malalah_clementi_mall` — type `food_court_stall`, cuisine
  "Mala/Hotpot", `operatorId: "hawkers_street"`, `dietTags: []`, priceRange `$`, platforms
  `["dine_in", "grab_go"]` (no delivery platform confirmed — alvinology.com's own infobox says
  delivery is "coming soon"), aliases covering the plain and exclamation-mark forms of the name.
- **Premises** (`premises.ts`, `PREMISES_13`): `malalah_clementi_mall_p1` — The Clementi Mall,
  address/postal/lat/lng copied from this project's existing Clementi Mall Premises rows for this
  same venue, `sfa: null`.
- **MenuItem** (`menuItems.ts`): `malalah_mala_xiang_guo` — 1 item, "Mala Xiang Guo", confidence
  `"estimated"`, values reused verbatim from this project's own standing weight-priced-mala
  calibration (see Research section above).
- **`reference/data/dish-macro-lookup.py`**: no change — "Mala Xiang Guo" already exists in
  `DISH_DB` from earlier batches, reused as-is.
- **`researchQueue.ts`**: appended a dated UPDATE to the `hawkers_street` entry's notes documenting
  this run's findings (kopitiam/koufu/foodfare re-check results, Malalah! added, 3 leads still
  outstanding). Status left `pending`.

## Verify (Phase 5)

This sandbox's `/sessions` filesystem was at 100% full (pre-existing condition, unrelated to this
run's edits, matching the same condition noted in the 2026-09-07 session) — built the mirror at
`/tmp/ps-build/platescreen` instead (`/` had sufficient free space):

1. `rsync -a` of the whole repo (excluding `node_modules`, `.next`, `out`, `.git`) into the mirror.
2. `npm install --cache /tmp/npm-cache` — 394 packages installed cleanly.
3. `npx tsc --noEmit` — **silent, 0 errors**.
4. `npm run build` — **compiled successfully**, types checked, and **all 4,369 static pages
   generated** (brand pages including the new `malalah_clementi_mall`, plus item-detail pages
   including the new `malalah_mala_xiang_guo` item), no errors.
5. Node-based integrity check (loading the live `BRANDS`/`PREMISES`/`MENU_ITEMS` arrays directly
   from the mirror, stripping `export`/`@ts-nocheck` since they're untyped plain-object literals):
   0 duplicate brand ids, 0 duplicate menu-item ids, 0 duplicate premises ids, 0 orphaned
   `brandId` references across all premises and menu items; item count deltas: brands 1722→1723
   (+1), menuItems 2639→2640 (+1), premises 4658→4659 (+1); the new Brand resolves to exactly 1
   Premises and 1 MenuItem with the expected fields.
6. `diff` of all touched files (`brands.ts`, `premises.ts`, `menuItems.ts`, `researchQueue.ts`,
   `reference/data/dish-macro-lookup.py`) between the live repo and the mirror — **byte-identical**
   on every file (the lookup file is untouched, as expected, since no new dish type was added).

Deleted the temporary Node verification scripts and the `/tmp/ps-build` mirror after use, per the
methodology's "delete ephemeral scripts" step.

## Status

`malalah_clementi_mall` is new and fully populated (Brand + 1 Premises + 1 MenuItem, confidence
"estimated", no fabrication — the format itself has no fixed named dishes to invent, and the single
price/macro figure used is this project's own already-verified standing calibration for this exact
stall format, reused rather than guessed fresh). `hawkers_street` queue entry left `pending` with 3
further leads recorded for a future run: Lixin Teochew Fishball Noodle, The Neighbourwok Fried
Hokkien Prawn Mee (both Clementi Mall), Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall
roster still unidentified.

## Files touched

- `src/lib/brands.ts` — +1 Brand (`malalah_clementi_mall`)
- `src/lib/premises.ts` — +1 Premises (`malalah_clementi_mall_p1`)
- `src/lib/menuItems.ts` — +1 MenuItem (`malalah_mala_xiang_guo`) + dated comment block
- `src/lib/researchQueue.ts` — appended UPDATE note to the `hawkers_street` entry
- `reference/research-sessions/2026-09-08-malalah_clementi_mall.md` — this file
