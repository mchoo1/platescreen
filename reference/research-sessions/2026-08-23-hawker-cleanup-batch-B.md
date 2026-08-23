# 2026-08-23 (5th pass, Batch B) — Hawker centre generic-name cleanup, 7 venues

Continuation of Batch A (see that doc for full methodology). This batch: 7 venues, 39 real
stalls added, 42 generic rows removed.

## Venues completed

- **Telok Blangah Crescent Food Centre** (79 Telok Blangah Drive, 100079) — 6 stalls: Song
  Heng Fish Ball Noodle, Kassim Stall, Tiong Bahru Wah Yuen Porridge, Noordima Malay Food
  Stall, Yuan Cheng Carrot Cake, Sjun Ji Wanton Noodles. Note: this is the block-79 venue —
  see "skipped" section below for the naming confusion with the adjacent "Telok Blangah
  Market" venue key.
- **Telok Blangah Rise Market & Food Centre** (36 Telok Blangah Rise, 090036) — 4 stalls:
  SG Soya Sauce Chicken Rice, Hai Yan Teochew Fried Kway Teow Mee, JC Teochew Braised Duck,
  Sin Kee Hwa Coffee Stall.
- **Haig Road Market & Food Centre** (14 Haig Road, 430014) — 7 stalls: Traditional Haig
  Road Putu Piring (Michelin Guide, Netflix Street Food Asia), Afandi Hawa & Family, HJ
  Waliti HJ Mazuki (50+ years), T.G Fish Porridge, Soon Lee Cooked Food, Warong Sudi Mampir,
  Zhenguang Wantan Noodles (50+ years, relocated from Hin Hollywood Canteen).
- **Empress Road Market & Food Centre** (7 Empress Road, 260007) — 4 stalls: Ah Wing's
  Wanton Mee, Farrer Road Chicken Rice, Meng Kee, Somerset Fishball Noodle.
- **Ghim Moh Market & Food Centre** (20 Ghim Moh Road, 270020) — 7 stalls: Guan Kee Fried
  Kway Teow (Michelin Bib Gourmand, running since 1969), Chuan Kee Boneless Braised Duck
  (Michelin Bib Gourmand), Ghim Moh Chwee Kueh (Michelin Guide 2019), Jiu Jiang Shao La,
  Thiam Kee 1977 Hainanese Chicken Rice, The Headless Baker, Teck Hin Fried Hor Fun.
- **Holland Drive Market & Food Centre** (44 Holland Drive, 270044) — 6 stalls: New Lucky
  Claypot Rice (Michelin Bib Gourmand), Lao Chen Ji, Leong Wee Roasted Delight, Shima's
  Kitchen, Yap Kee Wanton Egg Noodles, Cheng Heng Kway Chap and Braised Duck Rice.
- **Commonwealth Crescent Market & Food Centre** (31 Commonwealth Crescent, 149644) — 5
  stalls: Henry's Chicken Rice, Foong Kee Traditional Charcoal Roast, Huang Da Fu, ASiP
  Fresh Cold Press Juice, Salai by Meatdrop. 2 other candidates from the same search (a
  "Carrot Cake stall" and a "Porridge stall") were bare dish-name descriptions with no real
  trading name findable — excluded rather than used as-is, since that would just be
  swapping one kind of generic label for another.

## Skipped this batch (flagged for dedicated future verification)

- **`telok_blangah_market`** — its SFA log data (55 entries) turns out to be a superset that
  includes essentially all of `telok_blangah_food_centre`'s Blk 79 stalls (11 of its 12
  found here are identical, same licence data) *plus* additional stalls from 3 other nearby
  blocks on Telok Blangah Drive (46, 65, 77, 45). This looks like "Telok Blangah Market" is
  a wider administrative SFA grouping spanning multiple blocks, not a single physical
  building distinct from the Food Centre. Assigning real stall names here risks getting the
  block wrong. Left untouched pending a per-licence-number check against each specific
  block's own real tenants.
- **`tanglin_halt_market`** — found that the well-known "Tanglin Halt Food Centre" (the one
  covered by food blogs, several explicitly titled "before they're demolished") **closed on
  31 July 2022**, with stall owners relocated to Margaret Drive Food Centre / Margaret
  Market. Whether the current `tanglin_halt_market` venue key refers to a still-operating
  separate wet-market building or the demolished food centre is unclear from search results
  alone. Rather than risk adding stale data for a venue that may no longer exist, left
  untouched — needs individual verification (e.g. confirming current operating status)
  before any research is added.

## Data point carried over

The SFA-log-duplication issue found in Batch A (mayflower_market/ang_mo_kio_628_market,
kaki_bukit_511/bedok_north_street_3_blk_538) still needs a dedicated fix — not addressed
this batch.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative progress: 3 (initial) + 11 (Batch A) + 7 (Batch B) = 21 of 89 originally-affected
venues fixed (89 = 86 found in the full audit + the 3 initial ones already done before the
audit). 68 venues remain, plus 2 flagged for dedicated individual verification
(telok_blangah_market, tanglin_halt_market) and 4 flagged for the SFA-log-duplication fix.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,710 total brands (was 1,713), 4,642
total premises (was 4,645) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
