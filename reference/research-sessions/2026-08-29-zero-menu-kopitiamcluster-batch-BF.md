# Batch BF: kopitiam_ cluster resolution — Yishun 507, Rivervale Plaza, Bidadari 106, Keat Hong, FairPrice Hub — 2026-08-29

Task #65. Resolves the "kopitiam_"-prefixed shared-prefix cluster flagged as a
future-pass item in Batches BD and BE, rather than leaving it uncovered.

## What the cluster actually was

Investigation showed this wasn't a data-quality bug (shared brand *ids* across
venues) as the Batch BD note assumed — only `kopitiam_kopi_kiosk` is a genuine
single multi-location brand (Kopitiam's own in-house coffee-and-toast concept,
correctly one id at 5 venues). Every other "kopitiam_"-prefixed brand at these 5
venues has its own unique, venue-specific id; they only share the "kopitiam_"
prefix because they're all Kopitiam-operated stalls (`operatorId: "kopitiam"`),
and their `cuisine` field happens to be a broad food-type category (Seafood,
Western, Mala/Hotpot, Korean, Noodles) rather than a specific dish — which is why
they looked like a homogenous "skip" cluster in Batches BB-BE's cuisine-tag-based
approach.

Because `operatorId` is `kopitiam`, cross-referencing against
`reference/data/kopitiam-stall-dishes.json` (Kopitiam's own site scrape, the same
source used successfully in Batches C/D/G) resolved every uncovered brand at all 5
venues with real per-stall dish names — no cuisine-tag guessing needed, no brands
left generic-skipped.

## Venues and results (26 of 26 remaining uncovered brands covered)

| Venue | Covered |
|---|---|
| Yishun 507 | 5/5 |
| Rivervale Plaza | 5/5 |
| Bidadari 106 | 5/5 |
| Keat Hong Food Centre and Market | 5/5 |
| FairPrice Hub | 6/6 |
| **Total** | **26/26** |

One flagship dish picked per stall from its real scraped dish list (same
one-item-per-brand convention as every prior batch): Rayeesa's Malay Kitchen →
Nasi Sambal Goreng; Roasted Item and Herbal Soup / Hk Roasted Delight / Roasted
Delights / Wang Wang Roasted → Duck Rice; Indian Muslim Food → Roti Prata; Xing
Long Fish Soup → Fish Soup; Tenderbest → Chicken Bolognese (avoided the scrape's
other listed item, Turkey Bacon Aglio Olio, which is pork-adjacent); Ban Mian/fish
Soup → Ban Mian; Yong Tau foo/Mala / Qiu Lim Hakka Yong Tau Foo → Yong Tau Foo; RV
Pancakes / Yummy Pancake → Min Jiang Kueh; HK Style Steamed Fish & Braised Meat /
Fishin with u → Steamed Fish; Tek Tek → Minced Chicken Indomie; Tenderfresh Western
Cuisine / Comfirm + Chop → Chicken Chop; King Omar → Nasi Briyani; Bai Sheng Noodle
→ Meatball Noodles; Taliwang Nasi Lemak → Nasi Lemak; Japanese & Korean →
Bibimbap; Fu Wei Chicken Rice → Chicken Rice; Bak Kut Teh → Bak Kut Teh; Banmian →
Ban Mian; Abang 991 Nasi Padang → Nasi Padang.

## New dish types

- `Chicken Bolognese` — 🍝, Western, $6.5, 550 cal, 28g protein.
- `Minced Chicken Indomie` — 🍜, Local Hawker, $4.5, 480 cal, 20g protein.
- `Meatball Noodles` — 🍜, Noodles, $5.0, 460 cal, 22g protein (meatball protein
  source not inferable from the name alone — beef/pork/fish meatballs all exist).

## Diet tags (compatibleWith), set at creation time

Tagged: Nasi Sambal Goreng/Nasi Lemak/Nasi Briyani/Nasi Padang → halal + no_pork;
Roti Prata → halal + no_pork + vegetarian; Duck Rice (×4)/Chicken Rice/Chicken
Chop (×2)/Minced Chicken Indomie/Yong Tau Foo (×2) → no_pork; Fish Soup/Steamed
Fish (×2) → no_pork + pescatarian; Min Jiang Kueh (×2) → no_pork + vegetarian.

Left untagged (standing conservative rules): Ban Mian (×2, skip-list), Meatball
Noodles (ambiguous protein), Bibimbap (ambiguous protein, commonly beef). "Bak Kut
Teh" (FairPrice Hub) carries no compatibleWith at all — literally pork-named,
categorically excluded from no_pork consideration, same treatment as every prior
Bak Kut Teh/Pig Organ Soup/Pork Congee encountered this session.

## Verification

- Item count: 2,317 → 2,343 (+26).
- 0 duplicate ids, 0 orphaned items, all 26 target brands confirmed covered
  (1:1, no double-coverage).
- Zero-menu-brand count: 311 → 285 (−26), total brand count unchanged at 1,749.
- Spot checks: Bak Kut Teh → no compatibleWith (correct), Roti Prata →
  `["halal", "no_pork", "vegetarian"]`.
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +26 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +3 dish types ("Batch BF additions" block).

## Follow-up note

The Pasir Ris West Plaza / Clementi 209B / Ghim Moh Link 29 / Simei 248 cluster
noted in Batch BE has different brands (not `operatorId: "kopitiam"`), so this
same kopitiam-scrape shortcut won't apply there — still needs individual research
or a different operator-specific data source, and remains on the follow-up
worklist.
