# 2026-08-24 — Zero-menu-item cleanup, Batch D: Lau Pa Sat (task #65)

Fourth batch of the zero-menu-item cleanup, second long-tail venue batch (see
`2026-08-24-zero-menu-bedok-batch-C.md` for the per-venue audit methodology). Lau Pa Sat
was the second-highest venue by zero-menu stall count (64, after Bedok Interchange's 73).

## Selection

62 unique zero-menu brands at Lau Pa Sat (64 premises rows — 2 brands had duplicate
premises entries: `kopitiam_flint_specialty_grill`, `kopitiam_nasi_campur`). All names
matched `reference/data/kopitiam-stall-dishes.json` exactly.

## Sourcing and gaps

60 of 62 had usable dish lists in the cache. Two anomalies:

- `kopitiam_omega_pork_noodle` and `kopitiam_satay_noodz` had **empty** dish arrays in
  the scrape cache (the stall page existed but no dishes were captured). Both names are
  self-descriptive of a real, single dish, so each was given exactly one item inferred
  directly from its own name (Pork Noodle / Satay Noodles) rather than left uncovered.
  Flagged here explicitly since this is a different, lower-certainty sourcing path than
  every other item in this batch, which came from a real per-dish name in the cache.
- `kopitiam_cheers` — a Cheers convenience-store kiosk, not a food stall. Excluded
  entirely; a `MenuItem` doesn't fit this brand type. Left as a genuine, out-of-scope
  gap rather than an oversight.

61 of 62 brands ended up covered (103 items); `kopitiam_cheers` is the one deliberate
exclusion.

## Dish-macro lookup table extended

Added ~54 new dish types to `reference/data/dish-macro-lookup.py` (now 181 entries)
encountered at this venue: Chilli Crab, Black Pepper Crab, Nasi Briyani, Beef Bulgogi,
Bak Kut Teh, Xiao Long Bao, Naan/Butter Chicken, several satay-stall and western-food
variants, etc. Same estimate-per-dish-type convention as Batch C.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,209 total menu items (1,106 + 103), 0 duplicate ids, 0 orphaned
  items. Only 1 Lau Pa Sat brand remains zero-menu (`kopitiam_cheers`, intentional).
- Zero-menu-item brand count: 1,491 → 1,430.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Continuing down the per-venue list from Batch C: Bukit Canberra Hawker Centre (42),
Punggol Coast Hawker Centre (41), Kampung Admiralty Hawker Centre (38), Ci Yuan Hawker
Centre (37), One Punggol Hawker Centre (35), Kopitiam @ Our Tampines Hub (35).
