# 2026-08-24 — Zero-menu-item cleanup, Batch X: Plaza Singapura (task #65)

Twenty-fourth batch of the zero-menu-item cleanup, first batch after a fresh per-venue
audit. Every venue explicitly named across the "what's next" notes since Batch C had been
exhausted as of Batch W, so this batch began with a fresh audit grouping all remaining
zero-menu brands by `locationContext` and sorting by size to find the next highest-leverage
targets.

## Selection

Fresh audit surfaced 182 distinct venues with >=1 zero-menu brand (869 zero-menu brands
overall). Top target: Plaza Singapura, 15 unique zero-menu brands, all
`operatorId: "kopitiam"`, all real distinct proper-noun stall names. 0 brands here have more
than 1 Premises row.

## Sourcing

All 15 brands matched directly in `reference/data/kopitiam-stall-dishes.json`.

## Menu items

All 15 brands covered, 15 items. 9 new dish types added to `dish-macro-lookup.py` (Fried
Rice, Pepper Rice, Ayam Panggang Set, Mini Buddha Jumps Over The Wall, Double Chili Chicken,
Dumpling Noodle, La Mian, Soya Sauce Chicken Rice, Pickle Sour Slice Meat Pot); the
remaining 6 items reused existing dish types (Nasi Lemak Ayam Taliwang, Sliced Fish Soup,
Beef Noodle, Curry Chicken, Fishball Noodles, Thunder Tea Rice).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,772 total menu items (1,757 + 15), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 15 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 869 → 854.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Fresh audit's top-30 remaining venues by zero-menu brand count: Kopitiam Food Hall @ Jem
(13), Ayer Rajah Food Centre (12), Chomp Chomp Food Centre (12), VivoCity (11), Bagus Food
Hall @ Northpoint City (11), Hougang 105 Hainanese Village Centre (10), AMK Hub (10),
Kopitiam Food Hall @ Jurong Point (10), Tan Tock Seng Hospital (10), Compass One (10),
Tampines Mall (10), Vista Point (10), Bedok North Street 1 Blk 216 (9), Tampines 1 (9),
Changi General Hospital (9), Punggol 639 (9), Jurong West Central 679 (9), West Mall (9),
Berseh Food Centre (9), Pasir Ris 527C (8), Keat Hong Food Centre and Market (8), Bagus @
Pasir Ris Mall (8), Bagus @ Paya Lebar Square (8), Kebun Baru Food Centre (8), Adam Road
Food Centre (8), Teban Gardens Market and Food Centre (7), Clementi West Street 2 Blk 726
(7), Paya Lebar Quarter (7), National University Hospital Main Building (7), and onward down
the full 182-venue list. Plus the ~930 single/few-outlet Kopitiam concessions below Batch
B's >=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared
venue leverage.
