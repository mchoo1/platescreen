# 2026-08-23 (5th pass, Batch K) — Hawker centre generic-name cleanup, 5 venues

Continuation of Batches A-J. This batch: 5 venues, 27 real stalls added, 24 generic rows
removed.

## Address corrections found (5 venues)

All five venues in this batch had stored addresses that were either wrong or bare
placeholders. Independent OneMap verification found:

- **Bedok North Street 1 Blk 216**: stored address (213 Bedok North Street 1 #01-123,
  460213) named the wrong block — the venue key itself says "216." Corrected to
  **216 Bedok North Street 1, 460216**.
- **Bedok Reservoir Road Blk 630**: bare placeholder resolved to **630 Bedok Reservoir
  Road, 470630** (also known as "Pasar Makan @ Reservoir").
- **Bedok South Road Blk 16**: bare placeholder resolved to **16 Bedok South Road,
  460016**.
- **Circuit Road Blk 79/79A**: bare placeholder resolved to **79 Circuit Road, 370079**.
- **Circuit Road Blk 89**: bare placeholder resolved to **89 Circuit Road, 370089**. This
  is a distinct venue from `80_circuit_road_market_and_food_centre` (done in Batch F) and
  `circuit_road_blk_79_79a` (this batch) despite the shared street name — three separate
  hawker buildings on the same road.

## Venue flagged, not touched: Clementi Ave 2 Market/Cooked Food Centre

`clementi_ave_2_market_cooked_food_centre`'s stored address (126 Clementi Avenue 2,
Caltex Service Station, 129930) is a petrol station, and its 6 flagged "generic" brand
entries are almost all corporate names typical of a petrol-kiosk tenant mix (Chevron
Singapore Pte. Ltd., D''Successo Pte. Ltd., Gateau Pte. Ltd., Jojerie Pte. Ltd., Qeetrade
(Singapore) Pte. Ltd.) rather than hawker-stall licensees — only "Pang Sook Leng" looks
like an actual hawker licensee name. Meanwhile, web search shows the real, well-known
"Clementi Avenue 2 Market & Food Centre" is a separate building at **Blk 353 Clementi
Avenue 2** with different stalls entirely (Aishah Lee Muslim Food, Cheong Fun/Rice
Noodle Stall, All-Time Congee, Ah Meng Delicious Food). Rather than guess whether this is
a data-entry mixup (wrong premises attached to the wrong venue key) or two genuinely
separate SFA-licensed locations, this venue is flagged for dedicated verification.

## Venues completed

- **Bedok North Street 1 Blk 216** (216 Bedok North Street 1, 460216) — 5 stalls: Chris
  Kway Chap (longest queue in the centre), Joo Chiat Chiap Kee (fishball noodles), Sin Ho
  (Har Cheong Gai), Han Kee Fish Soup (since 1979), Ah Li Ipoh Hor Fun Fish Dumpling.
  Bengawan Solo Pte Ltd, Domino'S Pizza Singapore Pte. Ltd., Mcdonald'S Restaurants Pte.
  Ltd., and Ntuc Club left as-is (recognizable real chains/operators). Only 2 of the 6
  flagged entries were true generic personal names; both replaced, with 3 additional real
  stalls added beyond the 1:1 swap since they were confidently sourced.
- **Bedok Reservoir Road Blk 630** (630 Bedok Reservoir Road, 470630) — 6 stalls (full
  1:1 swap): Xiang Ji Chicken Rice (ranked 7th nationwide for hawker chicken rice), Cheng
  Jia, Long Fa Yong Tau Fu (#01-15), Yuan Li Shu Shi, Hup Lee Fried Bee Hoon, Xing Li Shou
  Shi (#01-10).
- **Bedok South Road Blk 16** (16 Bedok South Road, 460016) — 4 stalls: Hill Street Fried
  Kway Teow (Michelin Guide, ~30 min queues), Hawker Delights (#01-199, prawn noodles),
  Koon Kee Duck Rice, Warong Jawa. 2 of the 6 flagged entries left unchanged.
- **Circuit Road Blk 79/79A** (79 Circuit Road, 370079) — 6 stalls (full 1:1 swap): Teo
  Kee Fried Oyster, Do & Me Fried Chicken, Xiang Guan Vegetarian, Qiang Ji Dessert Store,
  Wang Jiao Kitchen, Heng Chicken Rice (#01-17).
- **Circuit Road Blk 89** (89 Circuit Road, 370089) — 6 stalls (full 1:1 swap): U Carrot
  Cake, Shun Shun Lai Laksa, Jia Le Prawn Mee & Lor Mee, CCK 190 Wanton Mee, Chun Tian
  Coffee, Kopi Folks Club.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre`, `ayer_rajah_food_centre`,
`teck_ghee_square`, `clementi_ave_2_market_cooked_food_centre` (new this batch), and the
4-venue SFA-log-duplication pair issue — see prior batch docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) + 5 (G) + 6 (H) +
5 (I) + 6 (J) + 5 (K) = 66 of 86 originally-affected venues fixed. 20 venues remain, plus
10 flagged for dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,722 total brands (was 1,719), 4,654
total premises (was 4,651) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
