# 2026-08-23 (5th pass, Batch L) — Hawker centre generic-name cleanup, 6 venues

Continuation of Batches A-K. This batch: 6 venues, 24 real stalls added, 24 generic rows
removed (net zero change in total counts).

## Identity confirmation: "Mei Chin Road Market" = "Mei Ling Market & Food Centre"

The dataset's `mei_chin_road_market` venue key stores an address of "Mei Chin Road Blk
159." OneMap confirms 159 Mei Chin Road resolves to exactly one building — **Mei Ling
Market and Food Centre** — with matching postal code (140159) and coordinates to what
was already stored. This is not a conflation risk; it's the same physical venue known by
two names, and all food-blog coverage of "Mei Ling Market & Food Centre" applies directly.

## Address corrections found (4 venues)

- **Eunos Crescent Blk 4A**: bare placeholder resolved to **4A Eunos Crescent, 402004**
  (lat/lng already correct).
- **New Upper Changi Road Blk 208B**: bare placeholder resolved to **208B New Upper
  Changi Road, 462208** — also known as **Bedok Interchange Hawker Centre**.
- **New Upper Changi Road Blk 58**: bare placeholder resolved to **58 New Upper Changi
  Road, 461058** — also known as **The Marketplace @ 58**.
- **Changi Village Blk 2 and 3** and **Clementi Ave 3 Blk 448**: placeholders resolved to
  **2 Changi Village Road, 500002** and **448 Clementi Avenue 3, 120448** respectively
  (lat/lng already correct in both cases).

## Venues completed

- **Eunos Crescent Blk 4A** (4A Eunos Crescent, 402004) — 4 stalls: Fen Xiang Fried Kway
  Teow (#01-21, 30+ years, most well-known stall), Eng Kee Hainanese Chicken Rice &
  Porridge (#01-34), Chao Yang Fish Ball Noodle (#01-24, usually sold out by 10:30am),
  Keng Huat Cold & Hot Dessert.
- **New Upper Changi Road Blk 208B / Bedok Interchange Hawker Centre** (208B New Upper
  Changi Road, 462208) — 3 stalls: Ma La Xiang Guo (#01-19), Fatt Soon Kueh (#01-58),
  Jimmy People's Park (#01-47, Char Kway Teow).
- **New Upper Changi Road Blk 58 / The Marketplace @ 58** (58 New Upper Changi Road,
  461058) — 5 stalls: Hup Lee Wanton Mee (#01-171), Old Chai Chee Minced Meat Noodle
  (#01-155), Amy's Laksa (#01-176), Original Changi Ten Mile (#01-153, groundnut porridge
  & carrot cake), Hawker Delights (#01-161, fish soup).
- **Mei Chin Road Market / Mei Ling Market & Food Centre** (159 Mei Chin Road, 140159) —
  3 stalls: Shi Hui Yuan Hor Fun Specialty (Michelin Bib Gourmand, since 1969), Xin Lu
  Teochew Fishball Noodle (50+ years), Hup Kee Teochew Fishball Noodles (Michelin Guide).
- **Changi Village Blk 2 and 3** (2 Changi Village Road, 500002) — 5 stalls: Weng Kee
  Original Taste Ipoh Hor Fun (since 1976), Guang Xing Original Taste Fish Head Bee Hoon
  (since 1988), Hjh. Salbiah (Nasi Lemak & Nasi Padang), Mei Lin Leng Re Yin Pin
  (Commando Dessert), Charlie's Corner (Western food, since 1979).
- **Clementi Ave 3 Blk 448** (448 Clementi Avenue 3, 120448) — 4 stalls: Song Fish Soup
  (Michelin Bib Gourmand 2024), Chai Ho Satay (queue stretches across the block), Boon
  Kee Wanton Mee, Soon Huat Cooked Food (sesame oil chicken).

All six venues had exactly enough confirmed real names to match or exceed the flagged
generic count, so no partial-coverage gaps this batch.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre`, `ayer_rajah_food_centre`,
`teck_ghee_square`, `clementi_ave_2_market_cooked_food_centre`, and the 4-venue
SFA-log-duplication pair issue — see prior batch docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) + 5 (G) + 6 (H) +
5 (I) + 6 (J) + 5 (K) + 6 (L) = 72 of 86 originally-affected venues fixed. 14 venues
remain, plus 10 flagged for dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,722 total brands (unchanged net this
batch), 4,654 total premises (unchanged net) — 0 duplicate IDs, 0 orphaned premises, 0
missing lat/lng.
