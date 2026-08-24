# 2026-08-24 — Zero-menu-item cleanup, Batch Y: Kopitiam Food Hall @ Jem (task #65)

Twenty-fifth batch of the zero-menu-item cleanup, second batch from the fresh per-venue
audit. Clean, routine 100%-Kopitiam batch.

## Selection

12 unique zero-menu brands at Kopitiam Food Hall @ Jem, all `operatorId: "kopitiam"`, all
real distinct proper-noun stall names.

## Duplicate check

`kopitiam_ampang_ytf`, `kopitiam_odeon_beef_noodles`, and `kopitiam_don_oyster_bar` each have
2 Premises rows at this venue — confirmed as genuine two-counter presences within the same
food hall, not duplicates.

## Sourcing

All 12 brands matched directly in `reference/data/kopitiam-stall-dishes.json`. Two source
tags were generic cuisine descriptions rather than dish names ("Japanese cuisine" for Don'
Oyster Bar, "Hunan Cuisine" for Xi Xiang) — mapped to specific real dishes fitting the
stall's theme (Oyster Don for the oyster bar; Hunan Fish Head, a well-known Hunan-style
dish common in Singapore zi char stalls, for Xi Xiang) rather than using the generic label
verbatim.

## Menu items

All 12 brands covered, 12 items. 6 new dish types added to `dish-macro-lookup.py` (Oyster
Don, Chicken Hotpot, Korean Soup, Rice Table, Hunan Fish Head, Mini Wok); the remaining 6
items reused existing dish types (Yong Tau Foo, Wanton Mee, Beef Noodle, Roasted Chicken
Rice, Steamed Chicken Rice, Pao Fan).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,784 total menu items (1,772 + 12), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 12 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 854 → 842.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Ayer Rajah Food Centre (12), Chomp Chomp Food Centre
(12), VivoCity (11), Bagus Food Hall @ Northpoint City (11), Hougang 105 Hainanese Village
Centre (10), AMK Hub (10), Kopitiam Food Hall @ Jurong Point (10), Tan Tock Seng Hospital
(10), Compass One (10), Tampines Mall (10), Vista Point (10), and onward down the 182-venue
list, plus the ~930 single/few-outlet Kopitiam concessions below Batch B's >=4-outlet
threshold, plus the long tail of true single-outlet stalls with no shared venue leverage.
