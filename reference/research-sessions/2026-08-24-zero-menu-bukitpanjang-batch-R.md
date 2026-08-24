# 2026-08-24 — Zero-menu-item cleanup, Batch R: Bukit Panjang (task #65)

Eighteenth batch of the zero-menu-item cleanup, sixteenth long-tail venue batch. The most
operator-mixed venue tackled so far: 3 different `locationContext` labels (Bukit Panjang
Plaza, Bukit Panjang Hawker Centre, Bukit Panjang Hawker Centre & Market) spanning
`kopitiam`, `hawkers_street`, and no-operator brands, all at the same physical address
(2 Bukit Panjang Ring Road, Singapore 679947 / 1 Jelebu Road, Bukit Panjang Plaza).

## Selection

44 total premises rows, 44 unique brand ids, 36 zero-menu going in. Operator mix: 28
kopitiam, 10 hawkers_street, 6 no-operator.

## Duplicate check — 4 found and removed

Following the Batch M lesson (check for name-echoes even when a venue looks otherwise
routine), 4 pairs of suspiciously similar names were checked against Premises addresses:

- `kopitiam_you_xiang_teochew_noodles` vs `bukit_panjang_hawker_centre_you_xiang_teochew_noodles`
- `kopitiam_hainan_hometown_curry` vs `bukit_panjang_hawker_centre_hai_nan_hometown_curry`
- `kopitiam_yu_kee_braised_duck` vs `bukit_panjang_hawker_centre_yu_kee_duck_rice`
- `kopitiam_like_pudding_hot_and_cold_dessert` vs `bukit_panjang_hawker_centre_like_pudding`

All 4 pairs share the exact same address (2 Bukit Panjang Ring Road, Singapore 679947),
confirming each is the same physical stall recorded twice — once via the Kopitiam scrape,
once via a separate venue-specific import. Kept the `kopitiam_`-prefixed id in each pair
(consistent with the majority naming convention at this venue), removed the
`bukit_panjang_hawker_centre_`-prefixed duplicate Brand and Premises rows (4 of each).

## Sourcing

The 23 remaining kopitiam brands all matched directly in
`reference/data/kopitiam-stall-dishes.json`. The 7 hawkers_street brands (no cached JSON
for this operator) were sourced via Eatbook's "Hawkers' Street: New Bukit Panjang Plaza
Food Court" opening writeup plus targeted individual searches for Kaki Makan (Crispy
Lemongrass Chicken Nasi Lemak, a halal kopitiam-style chain), Jiak Song Mee Hoon Kway (a
well-known ex-MasterChef-finalist stall), Raja Wok (Home-Made Chili Egg Fried Rice, from
the King of Fried Rice team), and Waker Chicken (Korean Fried Chicken). The remaining 2
no-operator brands (Zai Lai's Lor Mee, Tong Fong Fatt Hainanese Boneless Chicken Rice)
were assigned real dish types matching their descriptive names.

## Menu items

32 brands covered, 32 items. 8 new dish types added to `dish-macro-lookup.py`: Mookata,
Mixed Veg Rice, Min Jiang Kueh, Bing Su, Zi Char, Mee Hoon Kway, Crispy Lemongrass Chicken
Nasi Lemak, Chili Egg Fried Rice (Korean Fried Chicken already existed from an earlier
batch). The remaining 24 items reused existing dish types (Economical Rice, Western Food,
Beef Noodle, Roasted Chicken Rice x2, Nasi Lemak, Thunder Tea Rice, Mee Sua, Bimbimbap,
Minced Meat Noodle, Fish Soup, Wanton Mee, Duck Rice, Lor Mee x2, Dim Sum, Mee Goreng,
Curry Chicken, Vegetarian, Cheong Fun, Pad Thai, Nasi Padang, Chicken Rice).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,650 total menu items (1,618 + 32), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 32 target brands still zero-menu, 0 removed brand ids still
  present (Brand or Premises), 1,749 total brands (1,753 − 4 removed), 0 duplicate brand
  ids.
- Zero-menu-item brand count: 1,012 → 976 (32 covered + 4 duplicates removed = 36 fewer).
- Live vs build-mirror `menuItems.ts`, `brands.ts`, `premises.ts`,
  `dish-macro-lookup.py` — all byte-identical diffs.

## What's next

Senja Hawker Centre (20), Fernvale Hawker Centre & Market (19), Parkway Parade (17), Changi
Airport Terminal 3 (15), Hillion Mall (14), and onward down the per-venue audit list, plus
the ~930 single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold. Note:
`premises.ts` already documents (in its own header, predating this session) that it hit
the same TS2590 union-complexity issue as `menuItems.ts` did in Batch Q, and was fixed via
chunking into multiple `PREMISES_N` arrays rather than `@ts-nocheck` — worth keeping both
fix patterns in mind if `brands.ts` hits the same wall in a future batch.
