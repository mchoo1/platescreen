# 2026-08-23 (5th pass, Batch C) — Hawker centre generic-name cleanup, 5 venues

Continuation of Batches A and B. This batch: 5 venues, 24 real stalls added, 26 generic
rows removed.

## Venues completed

- **Hong Lim Market & Food Centre** (531A Upper Cross Street, 051531) — 5 stalls: Outram
  Park Fried Kway Teow (70+ years), Heng Kee Curry Chicken Bee Hoon, Tai Hwa Pork Noodles
  (Michelin-starred Teochew bak chor mee), Midas Chicken Curry, DDSD.
- **People's Park Food Centre** (32 New Market Road, 050032) — 6 stalls: Yong Xiang Xing
  Dou Fu, Bai Nian Niang Dou Foo, Hong Peng La Mian Xiao Long Bao (Michelin-mentioned),
  Chuan Wei Fang Xiang La Xie, Yi Pin Beef King, Kim Hua Guan Bak Kwa.
- **North Bridge Road Market & Food Centre** (861 North Bridge Road, 198783) — 5 stalls:
  Hua Mei Zhen, Soon Huat Prawn Noodles, Xiao Ling Fried Carrot Cake, Lao Huang Hakka Niang
  Tou Fu, Tian Yi.
- **Albert Centre Market & Food Centre** (270 Queen Street, 180270) — 6 stalls: Guan Kee
  Carrot Cake, Bedok Chwee Kueh, Singapore Famous Rojak (Michelin-recommended), Angel Horse
  Teochew Fish Soup, Pondok Makan Indonesia, Fu Cheng Shi Pin.
- **China Square Food Centre** (`telok_ayer_food_centre` in the dataset — 51 Telok Ayer
  Street, 048441) — only 2 real names confirmed: Hock Go, Tiffin Makan. This ~23-24-stall
  food centre has no comprehensive online directory; search results even conflicted on
  which stall occupies unit #01-11 (one source said "Hock Go," another said "66 Mala"), so
  no unit number was asserted for either. Only 2 of the original 6 generic rows were
  replaced; the other 4 (E P Cafeteria, Fresh Fire, Goh Chai Seng, Jex Pte Ltd) are left
  untouched pending better sourcing.

## Naming-confusion note

`telok_ayer_food_centre` in this dataset is the food centre inside China Square Central,
officially called "China Square Food Centre" — most searches for "Telok Ayer Food Centre"
by that literal name return general Telok-Ayer-neighbourhood dining guides instead, since
that's not really how Singaporeans refer to this specific venue. Searching "China Square
Food Centre" directly was needed to get on-target results.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market` (dedicated verification needed — see Batch B
doc), and the 4-venue SFA-log-duplication pair issue (see Batch A doc).

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) = 26 of 89 originally-affected venues
fixed. 63 venues remain, plus the 2+4 flagged venues above needing dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,708 total brands (was 1,710), 4,640
total premises (was 4,642) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
