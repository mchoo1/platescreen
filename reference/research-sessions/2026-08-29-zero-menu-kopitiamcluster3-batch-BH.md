# Batch BH: kopitiam_ cluster resolution, third wave + mixed venue sweep — 2026-08-29

Task #65. Third wave of the kopitiam-stall-dishes.json resolution (Batches BF/BG),
combined with a re-audit sweep of other small remaining venues surfaced once the
kopitiam clusters were cleared.

## Venues and results (26 of 27 remaining uncovered brands covered)

| Venue | Covered | Skipped |
|---|---|---|
| Kopitiam @ Mapletree Business City | 4/4 | — |
| Upper Serangoon 476D | 4/4 | — |
| Bagus @ Northshore Plaza II | 5/5 | — |
| Changi General Hospital Medical Centre | 2/2 | — |
| Tampines 878C | 2/2 | — |
| NEX / Junction 8 (Food Junction) | 3/4 | Ke/Quench (Drinks/Dessert, no single dish) |
| China Square Food Centre | 2/2 | — |
| Teck Ghee Square | 2/2 | — |
| 505 Jurong West Market & Food Centre | 2/2 | — |
| **Total** | **26/27** | **1 skipped** |

The first 5 venues are all `operatorId: "kopitiam"`, resolved via
`kopitiam-stall-dishes.json` exactly like Batches BF/BG. "Go Teppan Go" (Food
Junction) has the same brand id at both NEX and Junction 8, so covering it once
resolves both venues simultaneously. The remaining 4 venues (China Square, Teck
Ghee Square, 505 Jurong West) had no operator match but already carried real,
specific dish-descriptive cuisine tags, so no additional research was needed.

Dish picks: Fish Soup Ban Mian / Cui Liang Yu Fen → Fish Soup; Mala Tang → Golden
Broth Ramen (new dish type, from the scrape's "Golden Broth Ramen with
Chicken/Pork"); Steam Fish & Soup / Steam Fish Delight → Steamed Fish; Ju Bao Xuan
Mala / Mala Claypot → Mala Xiang Guo; Tender Fresh / Fat Baby Rotisserie & Western
Cuisine → Chicken Chop; Al Mokial Indian Muslim → Chicken Biryani (new dish type,
distinct from the existing Indonesian/Malay-style Nasi Briyani); Beehoon & Nasi
Lemak → Nasi Lemak; Wok Delight → Fried Hokkien Mee; Haji Karim Indian Muslim Food
/ Indian Stall → Roti Prata; Hong Le Japanese & Korean → Bibimbap; Head Chefz
Western Food → Chicken Steak Aglio Olio (reused existing entry); PX Chicken Rice →
Chicken Rice; Go Teppan Go → Teppanyaki Bento (reused existing entry); Toast
Junction → Coffee & Toast; Fireyaki → Fireyaki Grill Set (new); Hock Go → Char
Kway Teow; Tiffin Makan → Korean Fried Chicken; Steakgrill Steak House → Grilled
Steak (new); Jie Mei Yong Tau Foo → Yong Tau Foo; 37 Porridge → Porridge;
Traditional Hakka Lui Cha → Hakka Thunder Tea Rice.

## New dish types

- `Golden Broth Ramen` — 🍜, Noodles, $7.0, 550 cal, 24g protein (source dish name
  explicitly lists both chicken and pork as protein options — never a no_pork
  candidate).
- `Chicken Biryani` — 🍛, Indian, $6.0, 620 cal, 28g protein.
- `Fireyaki Grill Set` — 🔥, Japanese, $9.5, 650 cal, 34g protein (ambiguous
  protein — teppanyaki/grill sets vary by order).
- `Grilled Steak` — 🥩, Western, $9.0, 650 cal, 40g protein.

## Diet tags (compatibleWith), set at creation time

Tagged: Fish Soup (×2)/Steamed Fish (×2) → no_pork + pescatarian; Chicken
Chop (×2)/Chicken Biryani/Nasi Lemak/Roti Prata (×2)/Chicken Steak Aglio
Olio/Chicken Rice/Korean Fried Chicken/Grilled Steak/Yong Tau Foo/Hakka Thunder
Tea Rice/Coffee & Toast → no_pork (plus halal for Chicken Biryani, Nasi Lemak,
Roti Prata; plus vegetarian for Roti Prata, Hakka Thunder Tea Rice, Coffee &
Toast).

Left untagged (standing conservative rules): Mala Xiang Guo (×2, ambiguous mixed
protein), Fried Hokkien Mee, Bibimbap, Char Kway Teow (skip-list), Teppanyaki
Bento (ambiguous protein), Fireyaki Grill Set (ambiguous protein). Golden Broth
Ramen carries no compatibleWith at all — its source name explicitly includes pork
as an option, the same categorical-exclusion treatment as every Bak Kut Teh/Pig
Organ Soup/Pork Congee this session.

## Verification

- Item count: 2,356 → 2,382 (+26).
- 0 duplicate ids, 0 orphaned items, skipped brand (Ke/Quench) confirmed still
  zero-menu.
- Zero-menu-brand count: 272 → 246 (−26), total brand count unchanged at 1,749.
- Spot checks: Golden Broth Ramen → no compatibleWith (correct).
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +26 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +4 dish types ("Batch BH additions" block).

## Status

All 3 known kopitiam_ broad-category clusters are now fully resolved. Remaining
246 zero-menu brands are corporate entities (out of scope) or individually-named
stalls requiring per-brand research; no further operator-wide shortcuts are known
to remain.
