# 2026-08-24 — Zero-menu-item cleanup, Batch N: Kopitiam Square (task #65)

Fourteenth batch of the zero-menu-item cleanup, twelfth long-tail venue batch. A clean
venue after Batch M's mess - checked proactively for the new duplicate pattern found
there and confirmed this venue doesn't have it.

## Selection

28 unique zero-menu brands at Kopitiam Square (10 Sengkang Square, Singapore 544829),
all `operatorId: "kopitiam"`, all real distinct proper-noun stall names.

## Duplicate check (per the Batch M lesson)

Two brand names here echo existing brands from other venues -
`kopitiam_texas_lone_star_western` (vs `kopitiam_texas_lone_star`, covered in Batch J) and
`kopitiam_guan_chee_hongkong_roasted_duck` (vs `kopitiam_guan_chee_hk_roast`, covered in
Batch M). Checked premises addresses for both pairs before proceeding: no overlap in
either case (different postal codes entirely) - these are genuinely different real
outlets, not duplicates. No brands removed this batch.

## Menu items

All 28 brands covered, 28 items, all sourced directly from
`reference/data/kopitiam-stall-dishes.json`. 11 new dish types added to
`dish-macro-lookup.py` (North Indian Veg Set, Signature Mixed Beef Noodle with Tendon,
Vegetarian, Pork Bao, Chicken Chop Curry Rice Set, Egg Fried Rice w Pork Cutlet, BBQ Pork
Chop Rice, HK Steamed Golden Pomfret Set, Seafood White Bee Hoon, Oyster Omelette,
Grilled Chicken Chop w Mushroom Cream).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,543 total menu items (1,515 + 28), 0 duplicate ids, 0 orphaned items,
  0 orphaned premises, 0 of the 28 target brands still zero-menu.
- Zero-menu-item brand count: 1,114 → 1,086.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Yishun Park Hawker Centre (25), Buangkok Hawker Centre (25), Alexandra Village Food
Centre (24), Bukit Panjang Hawker Centre & Market (23), Senja Hawker Centre (20),
Fernvale Hawker Centre & Market (19), Parkway Parade (17), Changi Airport Terminal 3
(15), Hillion Mall (14), and onward down the per-venue audit list, plus the ~930
single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold. Worth
continuing to spot-check for the Batch M duplicate pattern (same trading name / concept
recorded under two ids at different venues) whenever a name looks familiar, even though
it turned out clean here.
