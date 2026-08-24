# 2026-08-24 — Zero-menu-item cleanup, Batch U: Parkway Parade (task #65)

Twenty-first batch of the zero-menu-item cleanup, nineteenth long-tail venue batch. Another
clean, routine Kopitiam batch.

## Selection

18 unique zero-menu brands at Parkway Parade, all `operatorId: "kopitiam"`, all real
distinct proper-noun stall names. 0 brands here have more than 1 Premises row.

## Menu items

All 18 brands covered, 18 items, all sourced directly from
`reference/data/kopitiam-stall-dishes.json`. 6 new dish types added to
`dish-macro-lookup.py` (Ayam Panggang, Salted Baked Chicken, Pao Fan, Carrot Cake, Donburi,
Dumplings); the remaining 12 items reused existing dish types (Beef Bulgogi, Mixed Veg
Rice, Pig Organ Soup, Curry Chicken, Ban Mian, Char Kway Teow, Roasted Chicken Rice, Nasi
Padang, Beef Noodle, Steamed Fish, Nasi Briyani, Pasta).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,720 total menu items (1,702 + 18), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 18 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 924 → 906.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Changi Airport Terminal 3 (15), Hillion Mall (14), and onward down the per-venue audit
list, plus the ~930 single/few-outlet Kopitiam concessions below Batch B's >=4-outlet
threshold.
