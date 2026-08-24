# 2026-08-24 — Zero-menu-item cleanup, Batch AF: Kopitiam Food Hall @ Jurong Point (task #65)

Thirty-second batch of the zero-menu-item cleanup, ninth batch from the fresh per-venue
audit. Clean, routine 100%-Kopitiam batch.

## Selection

15 unique zero-menu brands at Jurong Point (across Kopitiam Food Hall @ Jurong Point, Bagus
@ Jurong Point, and Jurong Point locationContext labels), all `operatorId: "kopitiam"`. 5
brands have 2 Premises rows here — confirmed as genuine multi-counter presences within the
same food hall, not duplicates.

## Sourcing

All 15 brands matched directly in `reference/data/kopitiam-stall-dishes.json`, including a
few generically-named cache entries ("Japanese", "Curry Items", "Singa Wok" → "Fried items")
which reflect Kopitiam's own stall naming on their site rather than a data-quality issue.

## Menu items

All 15 brands covered, 15 items. 2 new dish types added to `dish-macro-lookup.py` (Salmon
Teriyaki, Sesame Oil Mee Sua with Braised Egg & Chicken); the remaining 13 items reused
existing dish types (Mala Xiang Guo, Wanton Mee, Ayam Panggang Set, Fried Rice, Curry
Chicken, Chicken Hotpot, Sliced Fish Soup, Economical Rice, Carrot Cake, Ayam Bakar Penyet
Set, Fried Banana, Roti Prata, Fish and Chips).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,863 total menu items (1,848 + 15), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 15 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 778 → 763.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Tan Tock Seng Hospital (10), Compass One (10), Tampines
Mall (10), Vista Point (10), and onward down the 182-venue list, plus the ~930
single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold, plus the long
tail of true single-outlet stalls with no shared venue leverage.
