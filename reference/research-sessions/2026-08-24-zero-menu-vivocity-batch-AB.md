# 2026-08-24 — Zero-menu-item cleanup, Batch AB: VivoCity (task #65)

Twenty-eighth batch of the zero-menu-item cleanup, fifth batch from the fresh per-venue
audit. Clean, routine 100%-Kopitiam batch.

## Selection

9 unique zero-menu brands at VivoCity, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names. 0 brands here have more than
1 Premises row.

## Sourcing

All 9 brands matched directly in `reference/data/kopitiam-stall-dishes.json`.

## Menu items

All 9 brands covered, 9 items. 4 new dish types added to `dish-macro-lookup.py` (Tonkotsu
Chashu Ramen, Putian Lor Mee, Roast Duck Rice, Handmade Dumpling); the remaining 5 items
reused existing dish types (Pig Organ Soup, Nasi Sambal Goreng Set, Economical Rice, Bak Kut
Teh, Steamed Fish).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,818 total menu items (1,809 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 817 → 808.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Bagus Food Hall @ Northpoint City (11), Hougang 105
Hainanese Village Centre (10), AMK Hub (10), Kopitiam Food Hall @ Jurong Point (10), Tan Tock
Seng Hospital (10), Compass One (10), Tampines Mall (10), Vista Point (10), and onward down
the 182-venue list, plus the ~930 single/few-outlet Kopitiam concessions below Batch B's
>=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared venue
leverage.
