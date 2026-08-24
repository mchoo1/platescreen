# 2026-08-24 — Zero-menu-item cleanup, Batch S: Senja Hawker Centre (task #65)

Nineteenth batch of the zero-menu-item cleanup, seventeenth long-tail venue batch. A clean,
routine batch after Bukit Panjang's mess.

## Selection

27 unique zero-menu brands across Senja Hawker Centre and Senja 628 (two locationContext
labels, same operator), all `operatorId: "kopitiam"`, all real distinct proper-noun stall
names.

## Duplicate check

`kopitiam_kopi_kiosk` has 2 Premises rows at this venue (Senja Hawker Centre + Senja 628).
Checked and confirmed this is the same already-covered 69-outlet chain with two genuine
outlets here, not a duplicate-recording artifact — no action needed.

## Menu items

All 27 brands covered, 27 items, all sourced directly from
`reference/data/kopitiam-stall-dishes.json`. 4 new dish types added to
`dish-macro-lookup.py` (Bak Chor Mee, Pig Trotters, Tandoori Chicken, Curry Fish Head); the
remaining 23 items reused existing dish types (Roasted Chicken Rice, Yong Tau Foo x2, Prawn
Mee, Ban Mian, Fried Hokkien Mee, Duck Rice x2, Claypot Rice, Western Food, Hotplate BBQ
Stingray, Olive Fried Rice, Bimbimbap, Ayam Penyet Set, Indian Rojak, Kebab Rice, Dim Sum,
Economical Rice x2, Fish Soup, Steamed Fish, Chwee Kueh, Econ Bee Hoon).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,677 total menu items (1,650 + 27), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 27 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 976 → 949.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Fernvale Hawker Centre & Market (19), Parkway Parade (17), Changi Airport Terminal 3 (15),
Hillion Mall (14), and onward down the per-venue audit list, plus the ~930 single/few-outlet
Kopitiam concessions below Batch B's >=4-outlet threshold.
