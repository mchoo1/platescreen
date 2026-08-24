# 2026-08-24 — Zero-menu-item cleanup, Batch AH: Compass One (task #65)

Thirty-fourth batch of the zero-menu-item cleanup, eleventh batch from the fresh per-venue
audit. Clean, routine 100%-Kopitiam batch.

## Selection

9 unique zero-menu brands at Compass One, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names. 0 brands here have more than
1 Premises row.

## Sourcing

All 9 brands matched directly in `reference/data/kopitiam-stall-dishes.json`.

## Menu items

All 9 brands covered, 9 items. 5 new dish types added to `dish-macro-lookup.py` (Claypot
Herbal Bak Kut Teh, Shanghai Pan Fried Bao, Signature Teochew Salted Veg Soup, Teppanyaki
Garlic Chicken, Signature Char Siew Rice with Dumpling); the remaining 4 items reused
existing dish types (Fried Hokkien Mee, Ayam Panggang Set, Putian Lor Mee, Ban Mian).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,884 total menu items (1,875 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 751 → 742.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Tampines Mall (10), Vista Point (10), and onward down the
182-venue list, plus the ~930 single/few-outlet Kopitiam concessions below Batch B's
>=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared venue
leverage.
