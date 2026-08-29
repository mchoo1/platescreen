# Batch BD: 10-venue push — Beo Crescent, Redhill Food Centre, Commonwealth Crescent, Hong Lim, North Bridge Road, Market Street, Circuit Road Market & Food Centre, Yuhua Market & Hawker Centre, Marsiling Lane Blk 20/21, Ang Mo Kio Central — 2026-08-29

Task #65, third wide-push batch (same methodology as Batches BB/BC). Re-audited
after Batch BC (385 zero-menu brands) and picked 10 more venues at the 4-5 brand
tier with mostly dish-descriptive cuisine tags.

## Venues and results (45 of 50 brands covered)

| Venue | Covered | Skipped (generic tag) |
|---|---|---|
| Beo Crescent Market | 5/5 | — |
| Redhill Food Centre | 4/5 | 9 Plus Bistro (Zi Char) |
| Commonwealth Crescent Market | 4/5 | Huang Da Fu (Local Delights) |
| Hong Lim Market & Food Centre | 5/5 | — |
| North Bridge Road Market & Food Centre | 4/5 | Tian Yi (Chinese Cuisine) |
| Market Street Hawker Centre | 4/5 | Yummy Nyonya Peranakan (Peranakan — no single dish named) |
| Circuit Road Market & Food Centre | 5/5 | — (distinct venue from Circuit Rd Blk 79/79A and Blk 89, covered in Batch BC) |
| Yuhua Market & Hawker Centre | 5/5 | — |
| Marsiling Lane Blk 20/21 | 4/5 | Selera Menanti Traditional Malay Cuisine (Malay Cuisine) |
| Ang Mo Kio Central Market & Food Centre | 5/5 | — |
| **Total** | **45/50** | **5 skipped** |

As with prior wide-push batches, every dish came directly from the brand's own
cuisine field; the 5 skips are broad-category tags with no single identifiable
dish, added to the growing follow-up worklist rather than individually researched
this batch.

## Notable finding: `kopitiam_`-prefixed shared-brand-id cluster (not addressed this batch)

While re-auditing, noticed a distinct cluster of brands sharing `kopitiam_`-prefixed
ids (e.g. `kopitiam_kopi_kiosk`) that appear identically across at least 5 different
venues: Yishun 507, Rivervale Plaza, Bidadari 106, Keat Hong Food Centre and Market,
and FairPrice Hub. Their `cuisine` fields are broad macro-categories (Chinese Roast,
Seafood, Western, Mala/Hotpot) rather than specific dishes, and because the brand id
is shared across venues, any menu-item fix would need to either apply identically at
every venue or be reconsidered as a per-premises rather than per-brand concern. This
is flagged for a dedicated future pass rather than folded into this batch's ad hoc
skip handling.

## New dish types

- `Teochew Kueh` — 🥟, Local Hawker, $2.5, 280 cal, 6g protein, 40g carbs, 10g fat
  (savory glutinous rice/yam kueh, no meat implied by the name alone).
- `Vegetarian Satay` — 🍢, Local Hawker, $6.0, 320 cal, 18g protein, 20g carbs, 14g
  fat (mock-meat/tofu-based skewers).

## Diet tags (compatibleWith), set at creation time

Vegetarian Satay → `["no_pork", "vegetarian", "vegan"]` (explicitly vegetarian by
name, distinct from standard meat Satay which only gets halal + no_pork). Teochew
Kueh left untagged (filling not specified — could contain preserved radish, dried
shrimp, or other non-vegetarian ingredients). Bak Kut Teh (from one of this batch's
covered brands) correctly carries no compatibleWind at all — literally pork-named,
never a no_pork candidate, same treatment as Pig Organ Soup/Pork Congee in prior
batches. Bak Chor Mee again left with no compatibleWith per the standing skip-list
rule (pork-adjacent, ambiguous). Otherwise the same halal/no_pork/vegetarian/
pescatarian rules as every prior batch.

## Verification

- Item count: 2,243 → 2,288 (+45).
- 0 duplicate ids, 0 orphaned items, all 5 skipped brands confirmed still zero-menu.
- Zero-menu-brand count: 385 → 340 (−45), total brand count unchanged at 1,749.
- Spot checks: Bak Kut Teh → no compatibleWith (correct), Vegetarian Satay →
  `["no_pork", "vegetarian", "vegan"]`.
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +45 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +2 dish types ("Batch BD additions" block).

## Follow-up worklist (cumulative, generic-tag skips not yet individually researched)

From Batch BB: Wow Wow West, Nusa & Tara, Kassim Stall, Pondok Makan Indonesia, Kee
Hiong Food Stall, Soon Heng Food Delights, Fang Kee.
From Batch BC: Neptune Hong Kong Dim Sum, Rotitiam, Hong Mei Western Delights, Mei
Zhen Hakka Delicacies, Wak Limah Stall, Chocolat N' Spice, No.1 Western Food, Xin's
TzeChar, Uncle Kun's Delicacies, Qiang Ji Dessert Store, Wang Jiao Kitchen.
From Batch BD: 9 Plus Bistro, Huang Da Fu, Tian Yi, Yummy Nyonya Peranakan, Selera
Menanti Traditional Malay Cuisine.

Also flagged: the `kopitiam_`-prefixed shared-brand-id cluster (5 venues) noted
above, which needs a distinct approach since the brand ids are shared across
premises.
