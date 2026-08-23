# 2026-08-23 (5th pass, Batch G) — Hawker centre generic-name cleanup, 5 venues

Continuation of Batches A-F. This batch: 5 venues, 28 real stalls added, 25 generic rows
removed.

## Naming-confusion note: two "Ayer Rajah" venues

The dataset has two separate venue keys, `ayer_rajah_food_centre` (73A Ayer Rajah
Crescent, 139957 — SFA's own premises_address literally calls it "Ayer Rajah Food Centre
I") and `ayer_rajah_market` (West Coast Drive Blk 503). An initial search for "Ayer Rajah
Food Centre" surfaced the famous, heavily-blogged stalls (N.M. Abdul Rahim Mee Goreng and
others) — but a follow-up check found that famous venue is actually at **503 West Coast
Drive**, i.e. it corresponds to the `ayer_rajah_market` key, not `ayer_rajah_food_centre`.
Separately, 73A Ayer Rajah Crescent turns out to house **Timbre+**, a different F&B
concept entirely. Assigned the researched stalls to `ayer_rajah_market` (the correct
match) and left `ayer_rajah_food_centre` untouched, flagged for dedicated verification of
what's actually at 73A Ayer Rajah Crescent today.

## Venues completed

- **Ayer Rajah Food Centre** (`ayer_rajah_market` in the dataset — 503 West Coast Drive,
  120503) — 6 stalls: N.M. Abdul Rahim (Mee Goreng, 35+ years), Hong Kong Yummy Soup,
  Uncle Noodle, Tokyo BBQ Stingray, Xin Bao Sheng, Wu Ba Ye Fried Hokkien Prawn Mee. Cold
  Storage Singapore (1983) Pte Ltd, Domino's Pizza Singapore Pte Ltd, and Fei Siong F&B
  Holdings Pte Ltd were already recognizable real chains and left as-is.
- **Upper Boon Keng Market & Food Centre** (17 Upper Boon Keng Road, 380017) — 5 stalls:
  Hock Huat, HJH Yang Chek Nasi Rawon & Mee Rebus, Ah Hock Fried Hokkien Mee, Uncle Tan's
  Chicken Rice, Makan Delights.
- **Geylang Bahru Market & Food Centre** (69 Geylang Bahru, 330069) — 6 stalls: Hui Wei
  Chilli Ban Mian (Michelin Bib Gourmand), Hua Ji Carrot Cake, Hong Mei Western Delights,
  Red Stove Fried Prawn Mee, Zainab's Nasi Padang, Al-Amin Prata Corner.
- **Shunfu Mart** (320 Shunfu Road, 570320) — 6 stalls: Mei Zhen Hakka Delicacies (since
  the 1980s), Wak Limah Stall, Lai Heng Fried Kuay Teow & Cooked Food, Quan Ann Prawn Mee,
  Chocolat N' Spice, Heng Heng Bao Bing.
- **Yuhua Market & Hawker Centre** (347 Jurong East Avenue 1, 600347) — 5 stalls: Jing
  Jing Hokkien Mee & Oyster Omelette, Guang Tai Lor Mee, Lai Heng Handmade Teochew Kueh,
  Xing Yun Hainanese Chicken Rice, Hua Xing Bak Kut Teh. Boon Tong Kee Pte Ltd was already
  a recognizable real chicken rice chain and left as-is.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre`, `ayer_rajah_food_centre`
(new this batch), and the 4-venue SFA-log-duplication pair issue — see prior batch docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) + 5 (G) = 44 of 86
originally-affected venues fixed (87 minus `ayer_rajah_food_centre`, newly reclassified as
needing dedicated handling). 42 venues remain, plus 8 flagged for dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,714 total brands (was 1,711), 4,646
total premises (was 4,643) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
