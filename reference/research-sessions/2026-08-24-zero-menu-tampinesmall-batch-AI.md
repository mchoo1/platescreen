# 2026-08-24 — Zero-menu-item cleanup, Batch AI: Tampines Mall (task #65)

Thirty-fifth batch of the zero-menu-item cleanup, twelfth batch from the fresh per-venue
audit. Clean, routine 100%-Kopitiam batch.

## Selection

10 unique zero-menu brands at Tampines Mall, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names.

## Sourcing

All 10 brands matched directly in `reference/data/kopitiam-stall-dishes.json`.

## Menu items

All 10 brands covered, 10 items. 4 new dish types added to `dish-macro-lookup.py` (Signature
Biang Biang Noodle, Cumin Beef, Mixed Grill, Trio Roasted Platter); the remaining 6 items
reused existing dish types (Curry Chicken, Yong Tau Foo, Nasi Ambeng Set, Mee Soto, Grilled
Chicken, Char Kway Teow).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,894 total menu items (1,884 + 10), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 10 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 742 → 732.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Vista Point (10), and onward down the 182-venue list,
plus the ~930 single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold,
plus the long tail of true single-outlet stalls with no shared venue leverage.
