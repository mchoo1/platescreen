# 2026-08-24 — Zero-menu-item cleanup, Batch C: Bedok Interchange Hawker Centre (task #65)

Third batch of the zero-menu-item cleanup, first batch of the long-tail phase (task #62
audit: 1,610 of 1,772 brands had no `MenuItem`s; Batch A = 5 Koufu chains, Batch B = 41
Kopitiam/Hawkers Street concessions with 4+ outlets — see the two prior session docs).
The long tail (~1,460 single/few-outlet stalls) needs a different approach since there's
no shared multi-outlet leverage — so instead this batch groups by **venue**: which
hawker centres/food courts have the most zero-menu stalls, to maximize outlets covered
per batch even without shared brands.

## Selection

Ran a per-venue audit (grouping zero-menu premises by `locationContext`). Bedok
Interchange Hawker Centre had the single highest count: 73 zero-menu stalls, more than
any other venue (Lau Pa Sat was second at 64; both are Kopitiam-operated).

## Sourcing

All 73 stall names already existed as real, verified brand names (from the earlier
"replace generic hawker placeholder names" pass, tasks #31/#52). Checked
`reference/data/kopitiam-stall-dishes.json` (Kopitiam's own site scrape) and found exact
name matches for all 73 — no new web research needed for dish names.

Built a reusable dish-type macro/price lookup table
(`reference/data/dish-macro-lookup.py`, 106 dish types) covering every distinct dish
name across these 73 stalls, so the same dish type gets the same price/macro estimate
consistently (e.g. every "Fried Carrot Cake" anywhere in this batch uses the same base
figures) instead of being eyeballed individually per occurrence. This is meant to be
reused and extended in future long-tail batches rather than rebuilt each time.

For each stall, picked up to 2 dishes from its real dish list — preferring actual food
items over generic drink listings ("Coffee"/"Kopi"/"Tea"/"Teh") where a stall had both;
pure beverage-only stalls (e.g. Wan Gui Beverages, Yong Li Coffee Station) got 2
representative drinks since that's genuinely all they sell.

128 menu items added across all 73 target brands (1-2 each). Macros are per-dish
estimates (`confidence: "estimated"`), same convention as every other batch.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,106 total menu items (978 + 128), 0 duplicate ids, 0 orphaned items,
  0 of the 73 Bedok Interchange target brands still zero-menu.
- Zero-menu-item brand count: 1,564 → 1,491.
- Live vs build-mirror `menuItems.ts` — byte-identical diff.

## What's next

Per-venue audit showed the next-highest targets: Lau Pa Sat (64 zero-menu stalls, though
this venue already had address work done in an earlier pass — worth checking which of
its brands still need dish scrape matches), Bukit Canberra Hawker Centre (42), Punggol
Coast Hawker Centre (41), Kampung Admiralty Hawker Centre (38), Ci Yuan Hawker Centre
(37), One Punggol Hawker Centre (35), Kopitiam @ Our Tampines Hub (35). Plan is to keep
working down this list venue by venue, reusing the same dish-lookup-table approach where
the Kopitiam dish-name cache has matches, and falling back to individual web research
(as in Batch B) for venues run by other operators.
