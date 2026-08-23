# 2026-08-23 (5th pass, Batch M) — Hawker centre generic-name cleanup, 5 venues

Continuation of Batches A-L. This batch: 5 venues, 21 real stalls added, 20 generic rows
removed.

## Address correction found: Clementi West Street 2 Blk 726

The stored address said "727 Clementi West Street 2, 120727" but the venue key itself
says "Blk 726." OneMap confirms the correct block/postal is **726 Clementi West Street
2, 120726** (coordinates were already accurate). This venue is also commonly branded
"West Coast Market Square" by food blogs.

## Identity confirmations (not conflations)

- **Telok Ayer Food Centre** stores its address as 51 Telok Ayer Street, 048441, which is
  also independently and correctly known as **China Square Food Centre** — verified via
  street directory and corporate registration records at the same address. Not a data
  mismatch; just an alternate name for the same venue.
- **Redhill Food Centre** (1001A Jalan Bukit Merah, 159469) was double-checked against a
  separate, similarly-named "85 Redhill Lane" venue that appeared in initial search
  results — confirmed these are two distinct hawker centres and only content specific to
  1001A Jalan Bukit Merah was used.

## Venues completed

- **Clementi West Street 2 Blk 726** (726 Clementi West Street 2, 120726) — 5 stalls:
  Xin Xin Famous Fried Oyster (#01-187), He Ji Braised Duck (#01-162), Slice Fish
  (#01-138, fish soup & fish head bee hoon), Gui Ji (carrot cake), Ming Kee (porridge).
  Cold Storage Singapore (1983) Pte Ltd left as-is. 1 of the 6 flagged entries left
  unchanged.
- **Toa Payoh West Market and Food Court** (128 Lorong 1 Toa Payoh, 310128) — 5 stalls:
  Chey Sua Carrot Cake (Michelin Bib Gourmand-worthy), Come Daily Fried Hokkien Prawn Mee
  (since 1968), Da Cheng Kway Chap, Hong Kong Lung Hwa Roast Duck, Jia Le Man Fen Guo
  (20 years). Chang Cheng Food Paradise Pte. Ltd. left as-is (a real, known coffeeshop
  chain operator).
- **Telok Ayer Food Centre / China Square Food Centre** (51 Telok Ayer Street, 048441) —
  2 stalls: Dian Mixian (Yunnan rice noodles), Biang Biang Xian Famous Foods. Hock Go and
  Tiffin Makan were already real trading names and untouched. 2 of the 4 remaining
  flagged entries left unchanged, no verifiable real name found.
- **Redhill Food Centre** (1001A Jalan Bukit Merah, 159469) — 4 stalls: Bak Kee Teochew
  Satay Bee Hoon (30+ years), Fu Ming Cooked Food (Michelin Bib Gourmand carrot cake
  since 2019), Shi Le Yuan Kway Chap (Michelin-recognized 2017/2019/2023/2024), Jia Xiang
  Mee Siam. "9 Plus Bistro" left as-is (already an informative trading name). This
  completes the venue's cleanup begun in an earlier session (2 of 6 done previously, 4
  done now).
- **Yuhua Village Market and Food Centre** (252 Jurong East Street 24, 600252) — 5
  stalls: Fei Fei Roasted Noodles (longest queue), Heng Heng Cooked Food (Michelin Bib
  Gourmand laksa, 30+ years), Tommy's Wanton Noodle (40+ years), Cai's Hor Fun, Ron Sheng
  Fish Head Beehoon. Cold Storage Singapore (1983) Pte Ltd left as-is.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre`, `ayer_rajah_food_centre`,
`teck_ghee_square`, `clementi_ave_2_market_cooked_food_centre`, and the 4-venue
SFA-log-duplication pair issue — see prior batch docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) + 5 (G) + 6 (H) +
5 (I) + 6 (J) + 5 (K) + 6 (L) + 5 (M) = 77 of 86 originally-affected venues fixed. 9
venues remain, plus 10 flagged for dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,723 total brands (was 1,722), 4,655
total premises (was 4,654) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
