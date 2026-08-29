# Batch BE: 8-venue push — Pek Kio, Telok Blangah Rise, Empress Road, Jurong West Street 52 Blk 505, Chong Boon, Cheng San, ION Orchard, EastPoint Mall — 2026-08-29

Task #65, fourth wide-push batch (same methodology as Batches BB/BC/BD). Re-audited
after Batch BD (340 zero-menu brands). This tier of the long tail is now dominated
by corporate-entity brands (McDonald's, Pizza Hut, Cold Storage, Foodfare
Co-Operative, etc. — correctly out of scope) and broad-category cuisine tags rather
than the "6 clean dish-named brands per venue" pattern of earlier batches, so this
batch is narrower (8 venues, 30 brands) — picked only venues where every remaining
brand's cuisine tag names an actual dish.

## Venues and results (29 of 30 brands covered)

| Venue | Covered | Skipped (generic tag) |
|---|---|---|
| Pek Kio Market & Food Centre | 4/4 | — |
| Telok Blangah Rise Market & Food Centre | 4/4 | — |
| Empress Road Market & Food Centre | 3/4 | Meng Kee (Local Snacks) |
| Jurong West Street 52 Blk 505 | 4/4 | — |
| Chong Boon Market & Food Centre | 4/4 | — |
| Cheng San Market & Cooked Food Centre | 4/4 | — |
| ION Orchard | 3/3 | — |
| EastPoint Mall | 3/3 | — |
| **Total** | **29/30** | **1 skipped** |

Dual-concept cuisine tags resolved to one primary dish (same approach as prior
batches): "Noodles / Mee Kia & Mee Pok" → Mee Pok; "Lor Mee & Laksa" → Lor Mee;
"Economic Bee Hoon & Nasi Lemak" → Nasi Lemak; "Vegetarian / Bee Hoon & Kway Chap"
→ Vegetarian Bee Hoon (new dish type, given the brand's own name is "Tian Yi
Vegetarian Food"); "Roasted Meats / Noodles" → Roasted Meats; "Ban Mian / Noodles"
→ Ban Mian.

## Venues deliberately not picked this batch

The re-audit surfaced several other apparently-"clean" venues (Pasir Ris West
Plaza, Clementi 209B, Ghim Moh Link 29, Simei 248) whose brands carry only broad
food-type category tags (Western, Mala/Hotpot, Chicken Rice/Poultry, Japanese,
Seafood, Noodles as a bare category rather than a dish) with no single identifiable
dish — the same data shape as the "kopitiam_"-prefixed cluster flagged in Batch BD
(Yishun 507, Rivervale Plaza, Bidadari 106, Keat Hong, FairPrice Hub, plus newly
noticed here: Kopitiam @ Mapletree Business City, Upper Serangoon 476D, Bagus @
Northshore Plaza II). All of these are left for the same dedicated future pass
rather than guessed at individually.

## New dish types

- `Chee Cheong Fun` — 🥟, Dim Sum, $4.0, 320 cal, 8g protein (steamed rice-noodle
  rolls with sweet/savory sauce, no meat implied by the name alone).
- `Pork Rib Prawn Noodles` — 🍜, Noodles, $6.0, 520 cal, 28g protein (explicitly
  pork-named — never a no_pork candidate).
- `Coffee & Toast` — ☕, Beverages, $3.5, 320 cal, 8g protein (kopitiam coffee +
  kaya/butter toast set, no meat).
- `Tutu Kueh` — 🥟, Local Hawker, $2.0, 180 cal, 4g protein (steamed rice-flour
  kueh, traditional fillings are peanut or coconut — both vegetarian/vegan).
- `Vegetarian Bee Hoon` — 🥦, Local Hawker, $3.5, 380 cal, 12g protein (vegetable/
  tofu-based mixed bee hoon, no dairy).

## Diet tags (compatibleWith), set at creation time

Tagged: Soya Sauce Chicken Rice/Chicken Rice/Duck Rice (from Braised Duck) →
no_pork; Coffee & Toast → no_pork + vegetarian; Chwee Kueh (×2) → no_pork +
vegetarian; Tutu Kueh → no_pork + vegetarian + vegan; Nasi Lemak → halal + no_pork;
Fried Fish Soup → no_pork + pescatarian; Vegetarian Bee Hoon → no_pork + vegetarian
+ vegan; Yong Tau Foo (×2) → no_pork.

Left untagged (standing conservative rules): Pork Rib Prawn Noodles (explicitly
pork-named, never a candidate), Fried Prawn Noodles/Big Prawn Noodle (mapped to
Prawn Noodles), Wanton Mee, Fishball Noodle (×3), Cantonese Porridge (mapped to
Porridge), Mee Pok, Lor Mee, Bak Chor Mee, Curry Rice, Fried Hokkien Mee, Roasted
Meats, Ban Mian.

## Verification

- Item count: 2,288 → 2,317 (+29).
- 0 duplicate ids, 0 orphaned items, skipped brand (Meng Kee) confirmed still
  zero-menu.
- Zero-menu-brand count: 340 → 311 (−29), total brand count unchanged at 1,749.
- Spot checks: Pork Rib Prawn Noodles → no compatibleWith, Tutu Kueh →
  `["no_pork", "vegetarian", "vegan"]`.
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +29 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +5 dish types ("Batch BE additions" block).

## Follow-up worklist (cumulative)

Generic-tag skips: Wow Wow West, Nusa & Tara, Kassim Stall, Pondok Makan Indonesia,
Kee Hiong Food Stall, Soon Heng Food Delights, Fang Kee (Batch BB); Neptune Hong
Kong Dim Sum, Rotitiam, Hong Mei Western Delights, Mei Zhen Hakka Delicacies, Wak
Limah Stall, Chocolat N' Spice, No.1 Western Food, Xin's TzeChar, Uncle Kun's
Delicacies, Qiang Ji Dessert Store, Wang Jiao Kitchen (Batch BC); 9 Plus Bistro,
Huang Da Fu, Tian Yi, Yummy Nyonya Peranakan, Selera Menanti Traditional Malay
Cuisine (Batch BD); Meng Kee (Batch BE).

Shared-brand-id / broad-category-tag clusters flagged for a dedicated future pass
(not individual skips, since they need a different approach): the "kopitiam_"
cluster (Yishun 507, Rivervale Plaza, Bidadari 106, Keat Hong, FairPrice Hub,
Kopitiam @ Mapletree Business City, Upper Serangoon 476D, Bagus @ Northshore Plaza
II) and the newly-noticed Pasir Ris West Plaza / Clementi 209B / Ghim Moh Link 29 /
Simei 248 cluster.
