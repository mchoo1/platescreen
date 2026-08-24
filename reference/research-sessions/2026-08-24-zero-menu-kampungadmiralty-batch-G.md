# 2026-08-24 — Zero-menu-item cleanup, Batch G: Kampung Admiralty Hawker Centre (task #65)

Seventh batch of the zero-menu-item cleanup, fifth long-tail venue batch. Per the
lesson from Batch F, checked the operator mix first this time before diving in.

## Selection

38 unique zero-menu brands at Kampung Admiralty Hawker Centre, all sharing one address
(Blk 676 Woodlands Drive 71, Singapore 730676). All 38 are `operatorId: "kopitiam"` —
100% Kopitiam-operated, no duplicate-brand risk like Punggol Coast had, and every name
matched `reference/data/kopitiam-stall-dishes.json` directly. No individual web research
needed for this venue.

## Menu items

38 brands covered (one had `["Kopi", "Teh"]` — the drinks-only stall `kopitiam_the_tarik_drinks`
— so 39 items total), 1-2 dishes each from the real per-stall dish cache. 13 new dish
types added to `dish-macro-lookup.py` (Fried Fritters, Herbal Chicken Soup, Chendol,
Army Stew, Mee Sua, Nasi Goreng, Oyster Cake, and others specific to this venue's mix),
plus 2 dish types (`Peanut Pancake`, `Curry Fish head`) that had been used in earlier
batches' inline scripts but never actually saved to the persisted lookup file — fixed
so they're available going forward.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,327 total menu items (1,288 + 39), 0 duplicate ids, 0 orphaned
  items, 0 of the 38 Kampung Admiralty target brands still zero-menu.
- Zero-menu-item brand count: 1,350 → 1,312.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Ci Yuan Hawker Centre (37 — flagged in Batch C/E notes as possibly already partially
researched, worth checking for overlap before starting), One Punggol Hawker Centre (35,
previously blocked by inconsistent redirects per
`2026-08-23-bukit-canberra-yishun-park-hawker-centres.md` — worth retrying), Kopitiam @
Our Tampines Hub (35).
