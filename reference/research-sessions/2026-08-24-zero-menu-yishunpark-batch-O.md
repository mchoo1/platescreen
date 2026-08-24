# 2026-08-24 — Zero-menu-item cleanup, Batch O: Yishun Park Hawker Centre (task #65)

Fifteenth batch of the zero-menu-item cleanup, thirteenth long-tail venue batch. First
non-Kopitiam-operated venue tackled since Batch A — required web research per stall
instead of the `kopitiam-stall-dishes.json` cache.

## Selection

25 unique zero-menu brands at Yishun Park Hawker Centre (51 Yishun Avenue 11, Singapore
768867), all `operatorId: "timbre_plus_hawkers"`, all real distinct proper-noun stall
names.

## Sourcing

No cached stall-dishes JSON exists for this operator, unlike Kopitiam. Sourced from three
places: the official `yishunparkhc.sg/hawker-heroes/` page (gave a category/dish tag for
essentially every stall at the venue — the single most complete source), plus Miss Tam
Chiak and Honeycombers write-ups for dish-level detail beyond the category tags (e.g.
Smokin' Joe's specific Iberico pork/BBQ items, Yew's Noodle's Sarawak specialty, Ah Tan's
har cheong gai signature). A SethLui fetch attempt failed on a tooling limitation (response
too large, dedup cache unusable) but wasn't needed — the official site plus the two food
blogs together covered all 25 stalls.

## Duplicate/anomaly check

Investigated `timbre_yishun_park_xinlongxing_modern_tze_char`, which an earlier audit
flagged as having 3 Premises rows (suspected Batch-M-style duplicate recording). On
inspection, the 3 rows have distinct addresses — `#01-28`, `#01-29`, `#01-30` — i.e. 3
adjacent physical units, not 3 recordings of the same unit. This is consistent with a
large tze-char stall (a food type that typically needs more prep/cooking space) spanning
multiple adjacent units, not a scrape artifact. Left as-is; no `premises.ts` change made
for this brand.

## Menu items

All 25 brands covered, 26 items (Tuck Shop, a beverage counter, given 2 items — Kopi and
Teh — per the established beverage-stall precedent from One Punggol's Batch I). 9 new dish
types added to `dish-macro-lookup.py`: Nasi Ambeng Set, Nasi Kandar, Spinach Soup, Teppan
Donburi, Sarawak Laksa, Grilled Chicken Salad Bowl, Charcoal Grilled Pork Steak, Hotplate
BBQ Stingray, Har Cheong Gai. The remaining 17 items reused existing dish types from prior
batches (Vegetarian, Nasi Briyani, Hakka Thunder Tea Rice, Mee Goreng, Wanton Mee, Minced
Meat Noodle, Herbal Soup, Prawn Mee, Pork Congee, Seafood White Bee Hoon, Pad Thai, Nasi
Lemak, Yong Tau Foo, Fried Hokkien Mee, Peanut Pancake, Kopi, Teh).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,569 total menu items (1,543 + 26), 0 duplicate ids, 0 orphaned items,
  0 orphaned premises, 0 of the 25 target brands still zero-menu, 1,753 total brands
  (unchanged — no removals this batch), Xinlongxing premises confirmed still 3 rows
  (untouched, confirmed legitimate).
- Zero-menu-item brand count: 1,086 → 1,061.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Buangkok Hawker Centre (25), Alexandra Village Food Centre (24), Bukit Panjang Hawker
Centre & Market (23), Senja Hawker Centre (20), Fernvale Hawker Centre & Market (19),
Parkway Parade (17), Changi Airport Terminal 3 (15), Hillion Mall (14), and onward down
the per-venue audit list, plus the ~930 single/few-outlet Kopitiam concessions below Batch
B's >=4-outlet threshold. Worth noting for future non-Kopitiam venues: the
operator-official-site + food-blog combination worked well here and is a reasonable
fallback pattern whenever a venue's operator has no cached stall-dishes JSON.
