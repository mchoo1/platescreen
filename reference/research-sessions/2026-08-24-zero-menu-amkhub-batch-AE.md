# 2026-08-24 — Zero-menu-item cleanup, Batch AE: AMK Hub (task #65)

Thirty-first batch of the zero-menu-item cleanup, eighth batch from the fresh per-venue
audit. Clean, routine 100%-Kopitiam batch.

## Selection

10 unique zero-menu brands at AMK Hub, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names. 0 brands here have more than
1 Premises row.

## Sourcing

All 10 brands matched directly in `reference/data/kopitiam-stall-dishes.json`.

## Menu items

All 10 brands covered, 10 items. 4 new dish types added to `dish-macro-lookup.py` (Chicken
Katsu Curry Rice, Royal Chicken Roti, Ayam Bakar Penyet Set, Dang Gui Roasted Duck Noodle);
the remaining 6 items reused existing dish types (Pad Thai, Saba Fish, Mala Xiang Guo,
Roasted Chicken Rice, Yong Tau Foo, Fried Hokkien Mee).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,848 total menu items (1,838 + 10), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 10 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 788 → 778.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Kopitiam Food Hall @ Jurong Point (10), Tan Tock Seng
Hospital (10), Compass One (10), Tampines Mall (10), Vista Point (10), and onward down the
182-venue list, plus the ~930 single/few-outlet Kopitiam concessions below Batch B's
>=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared venue
leverage.
