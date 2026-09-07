# 2026-09-07 (restaurant-track scheduled run) — Rong Cheng Rou Gu Cha, Hawkers' Street @ The Clementi Mall

**Track:** restaurant/food_court/hawker/coffeeshop/canteen (scheduled task
`platescreen-research-restaurants`).

## Selection (Phase 1)

Per the deterministic priority-then-array-order rule, re-checked the 3 high-priority operator
entries directly against the live dataset (not just prior notes) before moving down the queue:

- **kopitiam** — 831 operatorId-tagged Brand rows, 3 still zero-menu (`kopitiam_king_grouper`,
  `kopitiam_china_food`, `kopitiam_cheers`) — unchanged since 2026-09-06's runs; all three are dead
  ends or out of this task's write scope per prior passes (Brand-merge restructure, unresolved
  bare-category scrape signal, non-food concession).
- **koufu** — 0 Brand rows tagged `operatorId: "koufu"` — no addressable gap under this queue entry.
- **foodfare** — 0 Brand rows tagged `operatorId: "foodfare"`, and separately still deprioritized
  per the 2026-08-23 user instruction (unresolved B2B-catering scope question).

Swept to **hawkers_street** (medium priority, 4th overall). All 31 of its current operatorId-tagged
Brand rows now have ≥1 MenuItem (confirmed directly against `menuItems.ts`), but its notes list 5
further newer-venue leads identified by name only: Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew
Fishball Noodle, The Neighbourwok Fried Hokkien Prawn Mee (all Clementi Mall), and Hup Hong Chicken
Rice (Tang Plaza). Picked the first-listed per the one-outlet-per-run rule: **Rong Cheng Rou Gu
Cha**.

## Research (Phase 2)

Confirmed via two independent Oct/Nov 2025 opening-coverage articles — **greatdeals.com.sg**
("Hawkers' Street Opens Its Largest Outlet at The Clementi Mall Featuring 5 Michelin Bib Gourmand
Eateries") and **alvinology.com** (near-identical coverage) — that Rong Cheng Rou Gu Cha is one of
the 11 heritage hawker brands at Hawkers' Street @ The Clementi Mall (3155 Commonwealth Ave W,
#04-20/21/22, Singapore 129588 — the same address already on file for this project's
`wok_hei_hor_fun_p1`/`hjh_maimunah_clementi_mall_p1`/`tartini_grill_pasta_clementi_mall_p1`
Premises rows). Both articles describe it as "a name synonymous with Singapore's Bak Kut Teh story,"
founded by pioneer Lim Hai Chay in 1976, credited with introducing meaty loin ("dragon") ribs to the
peppery broth.

No Clementi-Mall-specific menu or pricing was found for this stall (the chain publishes one standing
menu across branches, same situation as `hjh_maimunah_clementi_mall` and
`tartini_grill_pasta_clementi_mall`). The most complete real menu/pricing source found was
**Eatbook.sg**'s Nov 2021 media-tasting review of the chain's flagship relaunch (Ang Mo Kio outlet,
Blk 505 Ang Mo Kio Ave 8), which names and prices 7 distinct real dishes:

**Menu (7 items, all confidence "estimated" — no official/HPB nutrition source exists for this
stall or chain):**

| Dish | Price | Category |
|---|---|---|
| Dragon Rib Soup | $9.00 | Local Hawker |
| Bak Kut Teh | $6.50 | Local Hawker |
| Pig Trotters | $6.50 | Local Hawker |
| Rice | $0.50 | Sides |
| Mui Choy | $2.00 | Sides |
| You Tiao | $1.50 | Sides |
| Braised Peanuts | $2.00 | Sides |

All 7 are distinct, non-overlapping dishes (no near-duplicates to skip) — this is the review's full
food-and-side list, used as-is.

Macros were calibrated against this project's own existing entries rather than fabricated:

- **Bak Kut Teh** — reused this project's own standing `DISH_DB` calibration verbatim
  (420/28/10/28 @ $6.50 — the price already matches Eatbook's figure exactly, so no adjustment
  needed).
- **Pig Trotters** — reused the existing `kopitiam_shi_nian` "Pig Trotters" analog verbatim
  (580/32/15/38); its $7.00 source price is close to Eatbook's $6.50, kept Eatbook's own price.
- **Dragon Rib Soup** — no existing analog (a premium/larger BKT variant with meatier loin ribs);
  reasoned as a scaled-up Bak Kut Teh, roughly proportional to its $9.00-vs-$6.50 price ratio
  (~1.35x): 580/36/12/36.
- **You Tiao** — reused the existing `bgk_15` "You Tiao" analog (180/4/25/7), at Eatbook's own
  $1.50 price.
- **Rice, Mui Choy, Braised Peanuts** — no existing analog in this database and no official/HPB
  source (standard BKT side dishes); reasoned estimates from typical per-serving composition at the
  small sizes implied by Eatbook's prices: Rice 190/4/42/0.5 (a $0.50 topping-sized bowl, ~150g
  cooked), Mui Choy 35/1/6/1 (a small preserved-mustard-greens side), Braised Peanuts 170/7/10/12
  (a small $2 side bowl of braised peanuts).

New dish-price-macro tuples (Dragon Rib Soup, Rice, Mui Choy, Braised Peanuts) were added to
`reference/data/dish-macro-lookup.py`'s `DISH_DB` under a new
`# --- Batch 2026-09-07 additions (restaurant-track scheduled run) ---` header; Bak Kut Teh, Pig
Trotters, and You Tiao were left untouched since they already exist there.

### Diet tags (CLAUDE.md §5.1)

- Bak Kut Teh, Dragon Rib Soup, and Pig Trotters get **no `compatibleWith` array at all** — Bak Kut
  Teh is explicitly listed in CLAUDE.md §5.1's pork-exclusion list; Dragon Rib Soup is the same
  explicit pork-rib-soup dish under a heritage/marketing name, so treated identically; Pig Trotters
  is literally named "Pig."
- Rice, Mui Choy, You Tiao, and Braised Peanuts are plant-based sides — tagged
  `["no_pork", "vegetarian", "vegan"]`, matching this project's existing `You Tiao`
  (`bgk_15`) convention.
- No `halal` tag — this is a pork-based Bak Kut Teh stall, not Muis-certified; `dietTags: []` at
  Brand level.
- `gluten_free`/`dairy_free`/`nut_free`/`lactose_free` not attempted — never inferred from
  dish-name alone per CLAUDE.md (Braised Peanuts is a nut-containing dish but this project doesn't
  attempt `nut_free`/allergen tagging from name inference in either direction).

## SFA registration (Phase 3) — skipped

Same reasoning as this venue's other 4 Hawkers' Street concessions (`wok_hei_hor_fun`,
`hjh_maimunah_clementi_mall`, `springleaf_prata_place`, `tartini_grill_pasta_clementi_mall`): this
Brand's type is `food_court_stall` with `operatorId: "hawkers_street"` — a mall-food-court
concession, not an independently SFA-licensed hawker-centre stall. The mall/food-court operator
holds one master licence covering the whole unit, not per-concession licences discoverable via
data.gov.sg's per-stall dataset. `sfa: null` on the Premises row, `source: "operator_official_site"`.

## Records written (Phase 4)

- **Brand** (`brands.ts`, `BRANDS_4`): `rong_cheng_rou_gu_cha_clementi_mall` — type
  `food_court_stall`, cuisine "Bak Kut Teh", `operatorId: "hawkers_street"`, `dietTags: []`,
  priceRange `$`, platforms `["dine_in", "grab_go"]` (no delivery platform confirmed for this
  stall/venue), aliases covering the plain, Bak-Kut-Teh, and short forms of the name.
- **Premises** (`premises.ts`, `PREMISES_13`): `rong_cheng_rou_gu_cha_clementi_mall_p1` — The
  Clementi Mall, address/postal/lat/lng copied from this project's existing Clementi Mall Premises
  rows for this same venue, `sfa: null`.
- **MenuItems** (`menuItems.ts`): `rcrgc_1`–`rcrgc_7`, 7 items, all `confidence: "estimated"`.
- **`reference/data/dish-macro-lookup.py`**: new `DISH_DB` batch for the 4 dish names without an
  existing entry (Dragon Rib Soup, Rice, Mui Choy, Braised Peanuts).
- **`researchQueue.ts`**: appended a dated UPDATE to the `hawkers_street` entry's notes documenting
  this run's findings (kopitiam/koufu/foodfare re-check results, Rong Cheng Rou Gu Cha added, 4
  leads still outstanding, plus a spelling correction: "The Neighbourwok," not "The
  Neighbourwork," per both opening-coverage sources). Status left `pending`.

## Verify (Phase 5)

This sandbox's `/sessions` filesystem was at 100% full (pre-existing condition, unrelated to this
run's edits) — `npm install` there failed with `ENOSPC`. Removed the partial install and built the
mirror at `/tmp/ps-build/platescreen` instead (`/` had ~1.3 GB free, sufficient for the full
pipeline):

1. `rsync -a` of the whole repo (excluding `node_modules`, `.next`, `out`, `.git`) into the mirror.
2. `npm install --cache /tmp/npm-cache` — 394 packages installed cleanly.
3. `npx tsc --noEmit` — **silent, 0 errors**.
4. `npm run build` — **compiled successfully**, types checked, and **all 4,367 static pages
   generated** (brand pages including the new `rong_cheng_rou_gu_cha_clementi_mall`, plus
   item-detail pages including the 7 new `rcrgc_*` items), no errors.
5. Node-based integrity check (loading the live `BRANDS`/`MENU_ITEMS` arrays directly from the
   mirror, stripping `export`/`@ts-nocheck` since they're untyped plain-object literals): 0
   duplicate brand ids, 0 duplicate menu-item ids, 0 orphaned `brandId` references across all 2,639
   menu items; item count deltas: brands 1721→1722 (+1), menuItems 2632→2639 (+7); the new Brand
   resolves to exactly 1 Premises and 7 MenuItems with the expected fields.
6. `diff` of all 5 touched files (`brands.ts`, `premises.ts`, `menuItems.ts`, `researchQueue.ts`,
   `reference/data/dish-macro-lookup.py`) between the live repo and the mirror — **byte-identical**
   on every file.

Deleted the temporary Node verification scripts and the `/tmp/ps-build` mirror after use, per the
methodology's "delete ephemeral scripts" step.

## Status

`rong_cheng_rou_gu_cha_clementi_mall` is new and fully populated (Brand + 1 Premises + 7 MenuItems,
all "estimated" confidence, no fabrication — every dish name and price traces to a real, cited
source: Eatbook.sg's flagship media-tasting review, cross-referenced against two independent
opening-coverage articles confirming this brand's presence at the Clementi Mall venue).
`hawkers_street` queue entry left `pending` with 4 further leads recorded for a future run: Malalah!,
Lixin Teochew Fishball Noodle, The Neighbourwok Fried Hokkien Prawn Mee (all Clementi Mall), Hup
Hong Chicken Rice (Tang Plaza) — plus Square 2's stall roster still unidentified.

## Files touched

- `src/lib/brands.ts` — +1 Brand (`rong_cheng_rou_gu_cha_clementi_mall`)
- `src/lib/premises.ts` — +1 Premises (`rong_cheng_rou_gu_cha_clementi_mall_p1`)
- `src/lib/menuItems.ts` — +7 MenuItems (`rcrgc_1`–`rcrgc_7`) + dated comment block
- `src/lib/researchQueue.ts` — appended UPDATE note to the `hawkers_street` entry
- `reference/data/dish-macro-lookup.py` — new `DISH_DB` batch for this run's 4 new dish names
- `reference/research-sessions/2026-09-07-rong_cheng_rou_gu_cha_clementi_mall.md` — this file
