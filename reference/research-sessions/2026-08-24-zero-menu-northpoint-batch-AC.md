# 2026-08-24 — Zero-menu-item cleanup, Batch AC: Northpoint City / Bagus Food Hall (task #65)

Twenty-ninth batch of the zero-menu-item cleanup, sixth batch from the fresh per-venue
audit. Clean, mostly-routine 100%-Kopitiam batch, with one stall requiring individual
research.

## Selection

11 zero-menu brands across Northpoint City's several locationContext labels (Kopitiam @
Northpoint City, Bagus Food Hall @ Northpoint City, Northpoint City Yishun (South Wing),
Northpoint), all `operatorId: "kopitiam"`. 0 brands here have more than 1 Premises row.

## Sourcing

10 of 11 brands matched directly in `reference/data/kopitiam-stall-dishes.json`. The 11th,
Cha Mu Lan X, had an entry in the cache but with an empty dish list — individually
web-researched and confirmed as a real stall: a halal-friendly modern bubble tea brand at
Bagus Food Hall (opened 6 May 2026, #02-101/102/103), described as redefining bubble tea
with a "wellness twist." Mapped to a new "Bubble Tea" dish type.

## Menu items

All 11 brands covered, 11 items. 3 new dish types added to `dish-macro-lookup.py` (Beef Pho,
Rou Jia Mo (Chinese Burger), Bubble Tea); the remaining 8 items reused existing dish types
(Kaya Toast, Steamboat, Chicken Teriyaki & Salmon Teriyaki Bento, Mala Xiang Guo, Nasi
Padang, Ban Mian, Roasted Chicken Rice, Yong Tau Foo).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,829 total menu items (1,818 + 11), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 11 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 808 → 797.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Hougang 105 Hainanese Village Centre (10), AMK Hub (10),
Kopitiam Food Hall @ Jurong Point (10), Tan Tock Seng Hospital (10), Compass One (10),
Tampines Mall (10), Vista Point (10), and onward down the 182-venue list, plus the ~930
single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold, plus the long
tail of true single-outlet stalls with no shared venue leverage.
