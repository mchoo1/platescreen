# Batch BG: kopitiam_ cluster resolution, second wave — Pasir Ris West Plaza, Clementi 209B, Ghim Moh Link 29, Simei 248 — 2026-08-29

Task #65. Second wave of the same fix as Batch BF: these 4 venues were noted in
Batch BE as a second broad-category-tag cluster (Western, Mala/Hotpot, Chicken
Rice/Poultry, Japanese, Noodles-as-bare-category) alongside the original
kopitiam_ cluster. Confirmed all remaining uncovered brands here are also
`operatorId: "kopitiam"`, so the same `kopitiam-stall-dishes.json` lookup applied
directly — no new data source needed.

## Venues and results (13 of 13 remaining uncovered brands covered)

| Venue | Covered |
|---|---|
| Pasir Ris West Plaza | 3/3 |
| Clementi 209B | 4/4 |
| Ghim Moh Link 29 | 3/3 |
| Simei 248 | 3/3 |
| **Total** | **13/13** |

Dish picks (one flagship dish per stall from its real scraped list): Mings
Kitchen → Chilli Crab (over its other listed items, which include the explicitly
pork "Sweet & Sour Pork"); G Western → Chicken Chop; Mr. Prata → Roti Prata; Lao
Huo Tang → Bak Kut Teh (the stall's own name signals a Bak Kut Teh/pork-soup
specialist - its scrape list also includes "ABC Pork Rib Soup"); Mala & Seafood →
Mala Xiang Guo; Western Grill & Japanese Fusion → Beef Stew Garlic Rice (new dish
type, from its one listed item "Shabu Shabu Beef Stew Omelette Garlic Rice",
shortened); Nene Chicken → Korean Fried Chicken (new dish type, a known Korean
fried-chicken chain); Seafood Zhi Char → Chilli Crab (reused); Green Garden
Vegetarian → Vegetarian Char Kway Teow (new dish type, tagged vegetarian per the
stall's own name); Beuaty Nutritious Soup / Soup (Simei 248) → Herbal Chicken
Soup (reused, from each stall's "[Emperor/Special] Herbal Chicken Soup" listing);
Ban Mee → Ban Mian; Pancakes → Min Jiang Kueh.

## New dish types

- `Beef Stew Garlic Rice` — 🍚, Western, $7.0, 620 cal, 30g protein.
- `Korean Fried Chicken` — 🍗, Korean, $6.5, 580 cal, 30g protein.
- `Vegetarian Char Kway Teow` — 🍜, Local Hawker, $4.5, 500 cal, 10g protein.

## Diet tags (compatibleWith), set at creation time

Tagged: Chilli Crab (×2) → no_pork + pescatarian; Chicken Chop/Beef Stew Garlic
Rice/Korean Fried Chicken/Herbal Chicken Soup (×2) → no_pork; Roti Prata → halal +
no_pork + vegetarian; Vegetarian Char Kway Teow → no_pork + vegetarian; Min Jiang
Kueh → no_pork + vegetarian.

Left untagged (standing conservative rules): Ban Mian (skip-list), Mala Xiang Guo
(ambiguous mixed protein). "Bak Kut Teh" (from Lao Huo Tang) carries no
compatibleWith at all — same categorical exclusion applied to every explicitly
pork-named dish this session.

## Verification

- Item count: 2,343 → 2,356 (+13).
- 0 duplicate ids, 0 orphaned items, all 13 target brands confirmed covered
  (1:1, no double-coverage).
- Zero-menu-brand count: 285 → 272 (−13), total brand count unchanged at 1,749.
- Spot checks: Bak Kut Teh (Lao Huo Tang) → no compatibleWith (correct).
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +13 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +3 dish types ("Batch BG additions" block).

## Status

Both broad-category-tag clusters flagged in Batches BD/BE are now fully resolved.
No further `operatorId: "kopitiam"` clusters of this shape are known to remain in
the long tail; remaining zero-menu brands (272) are corporate entities (out of
scope) or individually-named stalls requiring per-brand research, per the
cumulative follow-up worklist in Batches BB-BE's docs.
