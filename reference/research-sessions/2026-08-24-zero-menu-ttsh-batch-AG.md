# 2026-08-24 — Zero-menu-item cleanup, Batch AG: Tan Tock Seng Hospital (task #65)

Thirty-third batch of the zero-menu-item cleanup, tenth batch from the fresh per-venue
audit. Clean, routine 100%-Kopitiam batch.

## Selection

12 unique zero-menu brands across Tan Tock Seng Hospital and Tan Tock Seng Hospital – CHI
locationContext labels, all `operatorId: "kopitiam"`.

## Duplicate check

`kopitiam_kakak_handmade_noodle` and `kopitiam_kakak_handmade_noodles` (singular vs plural)
looked like a possible duplicate at first glance. Checked Premises addresses: the singular
one is at 16 Jalan Tan Tock Seng, #B1-01 (postal 308442, the CHI building), the plural one is
at 11 Jalan Tan Tock Seng #01-13/14/15 (postal 308433, the main hospital building) —
different addresses, different postal codes. Confirmed as 2 genuinely distinct outlets of the
same stall at different TTSH buildings, not a duplicate.

## Sourcing

All 12 brands matched directly in `reference/data/kopitiam-stall-dishes.json`.

## Menu items

All 12 brands covered, 12 items. 4 new dish types added to `dish-macro-lookup.py` (Dry
Handmade Noodle, Signature Pork Trotter with Vinegar, Signature Dry Handmade Noodle, Beef
Roti); the remaining 8 items reused existing dish types (Economical Rice x2 — Universal
Economical Rice and He Jia Bian Fan Porridge both map to the same dish type, a legitimate
reuse pattern established in earlier batches — Ayam Penyet x2, Roasted Chicken Rice, Bread,
Fried Hokkien Mee, Beef Noodle).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,875 total menu items (1,863 + 12), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 12 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 763 → 751.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Compass One (10), Tampines Mall (10), Vista Point (10),
and onward down the 182-venue list, plus the ~930 single/few-outlet Kopitiam concessions
below Batch B's >=4-outlet threshold, plus the long tail of true single-outlet stalls with no
shared venue leverage.
