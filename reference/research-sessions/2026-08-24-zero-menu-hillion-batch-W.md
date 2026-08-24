# 2026-08-24 — Zero-menu-item cleanup, Batch W: Hillion Mall (task #65)

Twenty-third batch of the zero-menu-item cleanup, twenty-first long-tail venue batch. A
clean, routine 100%-Kopitiam batch — the last of the venues explicitly named in the
per-venue audit's "what's next" lists.

## Selection

15 unique zero-menu brands at Hillion Mall, all `operatorId: "kopitiam"`, all real distinct
proper-noun stall names.

## Duplicate check

`kopitiam_pepper_lunch_express` has 2 Premises rows at this venue — confirmed as a genuine
two-outlet presence of the already-covered multi-outlet chain, not a duplicate.

## Menu items

All 15 brands covered, 15 items, all sourced directly from
`reference/data/kopitiam-stall-dishes.json`. 3 new dish types added to
`dish-macro-lookup.py` (Chicken Inasal, Double Fish Steamboat, Steamboat); the remaining 12
items reused existing dish types (Teochew Porridge, Saba Fish, Economical Rice, Mala Xiang
Guo, Roasted Chicken Rice, Nasi Lemak x2, Japanese Curry Rice, Nasi Padang, Steamed Fish,
Herbal Soup, Ban Mian).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,757 total menu items (1,742 + 15), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 15 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 884 → 869.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

All venues explicitly named across the "what's next" notes in prior batches (Batches C
through W) have now been covered. Remaining work per task #65: continue down the general
per-venue audit for any smaller venues not yet explicitly named, plus the ~930
single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold, plus the long
tail of true single-outlet stalls with no shared venue leverage. A fresh per-venue audit
pass (grouping remaining zero-menu brands by `locationContext` and sorting by size) would
identify the next highest-leverage targets.
