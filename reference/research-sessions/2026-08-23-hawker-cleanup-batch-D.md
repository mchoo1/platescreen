# 2026-08-23 (5th pass, Batch D) — Hawker centre generic-name cleanup, 5 venues

Continuation of Batches A-C. This batch: 5 venues, 23 real stalls added, 24 generic rows
removed.

## Venues completed

- **East Coast Lagoon Food Village** (1220 East Coast Parkway, 468960) — 4 stalls: Geylang
  29 Charcoal Fried Hokkien Mee, Haron Satay 55 (Straits Times "Hawker Master," running
  since 1980), Choon Hiang Char Kway Teow (40+ years), Ah Hwee BBQ Chicken (since 1979).
- **Market Street Hawker Centre** (86 Market Street, CapitaSpring, 048947) — 5 stalls: Ah
  Liang Ipoh Hor Fun, Ming Fa (roots to a 1946 pushcart), Peng Tiong Bahru Wanton Mee, Tian
  Ci Traditional Prawn Noodles, Yummy Nyonya Peranakan. **Address correction found**: the
  original restructure's stored address (138 Market Street, CapitaGreen, 048946) was wrong
  — that's a different, adjacent office tower. The hawker centre is actually in CapitaSpring
  at 86 Market Street, 048947, confirmed via independent web search before geocoding. Also
  worth noting: 4 of the 6 replaced generic entries here were actually real company names
  with legal suffixes (e.g. "Dimbulah Coffee (S) Pte Ltd," a real chain) rather than
  personal names — still replaced with the food-blog trading names for consistency, since a
  legal-entity name with "Pte Ltd" is not what a customer would search for either.
- **Boon Lay Place Market & Food Village** (221A Boon Lay Place, 641221) — 6 stalls: I.
  Mohamed Ismail Food Stall (40+ years), Boon Lay Satay, Boon Lay Power Nasi Lemak
  (reportedly the venue's most famous stall), Ghee Huat, Yao Heng Cooked Food, Kee Hiong
  Food Stall.
- **Havelock Road Cooked Food Centre** (22A Havelock Road, 161022) — 3 stalls: Meng Kee
  Fried Kway Teow (40+ years), Covent Garden Prawn Noodle, Guang Fa Fa Ting Roasted
  Delights.
- **Tanjong Pagar Plaza Market & Food Centre** (`blk_6_tanjong_pagar_plaza_market_and_food_centre`
  in the dataset — 6 Tanjong Pagar Plaza, 081006) — 5 stalls: Ipoh Zai Prawn Noodles, Lucky
  Wanton Noodle, Celebrities Big Prawn Noodle, Soon Heng Food Delights, Yao Japanese Rice
  House.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, and the 4-venue SFA-log-duplication pair
issue (Mayflower/Ang Mo Kio 628, Kaki Bukit 511/Bedok 538) — see Batch A/B docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) = 31 of 89 originally-affected
venues fixed. 58 venues remain, plus the 6 flagged venues needing dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,707 total brands (was 1,708), 4,639
total premises (was 4,640) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
