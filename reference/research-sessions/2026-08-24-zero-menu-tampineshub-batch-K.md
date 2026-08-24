# 2026-08-24 — Zero-menu-item cleanup, Batch K: Kopitiam @ Our Tampines Hub (task #65)

Eleventh batch of the zero-menu-item cleanup, ninth long-tail venue batch.

## Selection

34 unique zero-menu brands at Kopitiam @ Our Tampines Hub, all `operatorId: "kopitiam"`
- 100% Kopitiam-operated, no duplicate-brand risk given the operator-mix check now done
routinely since Batches F and J. All 34 names matched
`reference/data/kopitiam-stall-dishes.json` directly - no individual web research needed
for this venue.

## Menu items

34 brands covered (the drinks stall, Minum Minum, given 2 items - Kopi and Teh, per the
established beverage-stall precedent), 35 items total. 12 new dish types added to
`dish-macro-lookup.py` (Beef Noodles and Claypot, Vegetarian Rice, Economical Bee Hoon,
Japanese Curry Rice, Herbal Soup, Chicken Bowl, Mee Siam, Saba Fish, Lobster King Pao
Fan, Rendang Dishes, Indian Punjab, Nasi Padang). Reused existing entries where the cache
dish name matched an already-persisted type under a slightly different name (e.g. Chinatown
Mala Hotpot -> "Mala Xiang Guo", Jian Fa BBQ Seafood -> "Chilli Crab", Hadramawt Kitchen
-> "Nasi Briyani" - all exact matches already in the table from earlier batches).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,468 total menu items (1,433 + 35), 0 duplicate ids, 0 orphaned items,
  0 orphaned premises, 0 of the 34 target brands still zero-menu.
- Zero-menu-item brand count: 1,208 → 1,174.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Anchorvale Village Hawker Centre (32), Kopitiam @ Northpoint City (30), Kopitiam Square
(28), Yishun Park Hawker Centre (25), Buangkok Hawker Centre (25), Alexandra Village Food
Centre (24), Bukit Panjang Hawker Centre & Market (23), Senja Hawker Centre (20),
Fernvale Hawker Centre & Market (19), Parkway Parade (17), Changi Airport Terminal 3
(15), Hillion Mall (14), and onward down the per-venue audit list, plus the ~930
single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold.
