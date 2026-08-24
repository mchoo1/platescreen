# 2026-08-24 — Zero-menu-item cleanup, Batch AJ: Vista Point (task #65)

Thirty-sixth batch of the zero-menu-item cleanup, thirteenth batch from the fresh per-venue
audit. Clean, routine 100%-Kopitiam batch. This closes out the fresh audit's original top-30
venue list (Plaza Singapura through Vista Point).

## Selection

10 unique zero-menu brands at Vista Point, all `operatorId: "kopitiam"`, `type:
"food_court_stall"`, all real distinct proper-noun stall names.

## Sourcing

All 10 brands matched directly in `reference/data/kopitiam-stall-dishes.json`.

## Menu items

All 10 brands covered, 10 items. 1 new dish type added to `dish-macro-lookup.py` (Nonya
Kueh); the remaining 9 items reused existing dish types (Nasi Lemak, Roasted Chicken Rice,
Yong Tau Foo, Steamed Chicken Rice, Western Food, Zi Char, Nasi Padang, Herbal Soup, Rojak).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,904 total menu items (1,894 + 10), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 10 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 732 → 722.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

The fresh audit's original top-30 venue list (Plaza Singapura through Vista Point) is now
fully covered. Remaining work per task #65: the rest of the 182-venue list beyond the top 30
(venues with progressively fewer zero-menu brands, roughly 6-1 each), plus the ~930
single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold, plus the long
tail of true single-outlet stalls with no shared venue leverage. A fresh audit re-run at this
point would likely be useful to re-rank the next batch of venues, since several smaller
venues may have shifted in the ranking as this batch of larger ones was cleared.
