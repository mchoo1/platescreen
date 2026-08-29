# Batch BC: 14-venue push — Marine Parade Central, Upper Boon Keng, Geylang Bahru, Shunfu Mart, Margaret Drive, Pasir Panjang, Bukit Merah Central, Bedok Food Centre, Chong Pang, Toa Payoh Vista, Bedok Reservoir Rd Blk 630, Circuit Rd Blk 79/79A, Circuit Rd Blk 89, 353 Clementi Ave 2 — 2026-08-29

Task #65, second wide-push batch (same methodology as Batch BB). Re-audited after
Batch BB (458 zero-menu brands) and picked 14 more 6-brand-tier venues with mostly
dish-descriptive cuisine tags.

## Venues and results (73 of 84 brands covered)

| Venue | Covered | Skipped (generic tag) |
|---|---|---|
| Marine Parade Central Market & Food Centre | 5/6 | Neptune Hong Kong Dim Sum (Dim Sum) |
| Upper Boon Keng Market & Food Centre | 5/6 | Rotitiam (Hawker Bakery / Buns) |
| Geylang Bahru Market & Food Centre | 5/6 | Hong Mei Western Delights (Western Food) |
| Shunfu Mart | 3/6 | Mei Zhen Hakka Delicacies (Hakka Cuisine), Wak Limah Stall (Malay Cuisine), Chocolat N' Spice (Muffins, flavor unspecified) |
| Margaret Drive Hawker Centre | 4/6 | No.1 Western Food (Western Food), Xin's TzeChar (Zi Char) |
| Pasir Panjang Food Centre | 6/6 | — |
| Bukit Merah Central Food Centre | 6/6 | — |
| Bedok Food Centre | 6/6 | — |
| Chong Pang Market and Food Centre | 6/6 | — |
| Toa Payoh Vista Market | 5/6 | Uncle Kun's Delicacies (Scallop Glutinous Rice — real but unique dish, skipped rather than fabricate a one-off macro estimate this batch) |
| Bedok Reservoir Road Blk 630 | 6/6 | — |
| Circuit Road Blk 79/79A | 4/6 | Qiang Ji Dessert Store (Dessert), Wang Jiao Kitchen (Zi Char) |
| Circuit Road Blk 89 | 6/6 | — |
| 353 Clementi Avenue 2 Market & Food Centre | 6/6 | — |
| **Total** | **73/84** | **11 skipped** |

As with Batch BB, every dish came directly from the brand's own cuisine field; the
11 skips are broad-category tags with no single identifiable dish, left as a
follow-up worklist rather than individually researched this batch.

Notable dual-concept cuisine tags resolved to one primary dish (same approach as
Batch BB): "Nasi Rawon & Mee Rebus" → Mee Rebus; "BBQ Stingray & Cereal Prawns" →
BBQ Stingray; "Herbal Mutton Soup" → Mutton Soup; "Curry Chicken Bee Hoon Mee" →
Curry Chicken; "Fish Soup & Seafood Pao Fan" → Fish Soup; "Yong Tau Foo & Fishball
Mee Pok" → Yong Tau Foo; "Minced Meat Mushroom Noodle" → Bak Chor Mee; "Prawn Mee &
Lor Mee" → Prawn Mee; "Malay & Muslim / Nasi Lemak" → Nasi Lemak; "Braised Duck Rice
& Kway Chap" → Duck Set Kway Chap; "Wanton Mee & Mee Pok" → Wanton Mee; "Fish
Porridge & Fish Soup" → Fish Porridge.

## New dish types

- `Ngoh Hiang` — 🌯, Chinese Roast, $4.5, 420 cal, 18g protein (five-spice
  meat-and-prawn roll, protein source not inferable from name alone)
- `Fried Chicken` — 🍗, Chicken Rice/Poultry, $5.5, 520 cal, 30g protein
- `Lontong` — 🍛, Indonesian/Malay, $4.5, 450 cal, 12g protein (rice cake in spiced
  coconut vegetable curry, halal Malay/Indonesian staple)

## Diet tags (compatibleWith), set at creation time

Notable calls: "Lao Liang Pork Porridge" mapped to the existing Pork Congee entry
and correctly left with no compatibleWith at all — it's literally named pork, never
a no_pork candidate (same logic as Pig Organ Soup in Batch BA). "Hua Fong Kee
Roasted Duck" (cuisine: "Chinese BBQ Pork & Roasted Duck," meaning this stall also
sells char siu) still got its duck item tagged no_pork — an ingredient-level claim
about that one dish, not a certification claim about the stall. Ngoh Hiang left
untagged (traditional filling can be pork or prawn, not inferable from the name).
Otherwise the same halal/no_pork/vegetarian/pescatarian rules as every prior batch.

## Verification

- Item count: 2,170 → 2,243 (+73).
- 0 duplicate ids, 0 orphaned items, all 11 skipped brands still zero-menu.
- Zero-menu-brand count: 458 → 385 (−73), total brand count unchanged at 1,749.
- Spot checks: Pork Congee (from "Lao Liang Pork Porridge") → no compatibleWith,
  Lontong → `["halal", "no_pork"]`.
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +73 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +3 dish types ("Batch BC additions" block).

## Follow-up worklist

11 generic-tag skips from this batch, same treatment recommendation as Batch BB's
follow-up list: Neptune Hong Kong Dim Sum, Rotitiam, Hong Mei Western Delights, Mei
Zhen Hakka Delicacies, Wak Limah Stall, Chocolat N' Spice, No.1 Western Food, Xin's
TzeChar, Uncle Kun's Delicacies, Qiang Ji Dessert Store, Wang Jiao Kitchen.
