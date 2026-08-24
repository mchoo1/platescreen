# 2026-08-24 — Zero-menu-item cleanup, Batch AA: Chomp Chomp Food Centre (task #65)

Twenty-seventh batch of the zero-menu-item cleanup, fourth batch from the fresh per-venue
audit. Non-Kopitiam venue — Chomp Chomp already had 45 stalls covered under task #51, but
the fresh audit surfaced 12 more, distinct zero-menu brands here.

## Selection

12 zero-menu brands at Chomp Chomp Food Centre, all real distinct proper-noun stall names
with specific cuisine tags already recorded (no generic-licensee-name issues this batch). 0
brands have more than 1 Premises row.

## Sourcing

All 12 brands' dishes were derivable directly from their existing `cuisine` field (Fried
Hokkien Mee, Wanton Noodle, Satay Bee Hoon / Hainan Beef Noodle, Fried Carrot Cake, Malay /
Satay, BBQ Seafood / Zi Char, Lok Lok BBQ Skewers, BBQ Chicken Wings & Satay, Oyster Omelette
/ Fried Oyster, Rojak & Popiah, Fried Hokkien Prawn Noodle, BBQ Seafood) — no external web
research needed since these tags were specific enough (unlike the generic "Local & Hawker"
tags seen on the Ayer Rajah licensee-name brands in Batch Z).

## Item prefix note

The natural prefix `cc_` was already used by the earlier Chomp Chomp batch (task #51, 45
stalls). Used `ccfc_` (Chomp Chomp Food Centre) instead, caught via the standard
prefix-uniqueness grep before splicing.

## Menu items

All 12 brands covered, 12 items. 4 new dish types added to `dish-macro-lookup.py` (Satay Bee
Hoon, BBQ Seafood, Lok Lok Skewers, BBQ Chicken Wings); the remaining 8 items reused existing
dish types (Fried Hokkien Mee, Wanton Mee, Carrot Cake, Satay, Fried Oyster, Rojak, Fried
Hokkien Prawn Mee x2 — the two BBQ Seafood stalls, Ang Sar Lee's and Lucy's, both mapped to
the same new "BBQ Seafood" dish type).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,809 total menu items (1,797 + 12), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 12 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 829 → 817.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: VivoCity (11), Bagus Food Hall @ Northpoint City (11),
Hougang 105 Hainanese Village Centre (10), AMK Hub (10), Kopitiam Food Hall @ Jurong Point
(10), Tan Tock Seng Hospital (10), Compass One (10), Tampines Mall (10), Vista Point (10),
and onward down the 182-venue list, plus the ~930 single/few-outlet Kopitiam concessions
below Batch B's >=4-outlet threshold, plus the long tail of true single-outlet stalls with no
shared venue leverage.
