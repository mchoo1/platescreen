# 2026-08-23 (5th pass, Batch N) — Hawker centre generic-name cleanup, 2 venues + address audit

This batch: 2 venues, 7 real stalls added, 7 generic rows removed. It also re-audits the
full dataset against the original heuristic to find what's genuinely left, and fixes an
address bug discovered during that audit.

## Re-audit finding

Re-ran the original generic-name detection heuristic (`type: hawker`, `cuisine: "Local &
Hawker"`, no `operatorId`, name looks like a bare personal/company name) against the
current state of `brands.ts` after Batches A-M. Cross-referencing the results against
every venue worked on so far (including intentionally-left partial coverage and
already-known real chains) narrowed the truly untouched set down to exactly two venues:
`tampines_round_market_and_food_centre` and `toa_payoh_lorong_4_blk_93`. This is fewer
than the "9 remain" estimate in the Batch M doc, because most of that estimate was
double-counting venues that already have intentional partial coverage (a handful of
generic entries deliberately left unreplaced per the never-fabricate rule) rather than
venues needing fresh work.

## Address bug found and fixed: Anchorvale Village Hawker Centre

While re-verifying `anchorvale_village_hawker_centre` (touched in Batch I), found that
**both** the original stored address (57 Anchorvale Road, Sengkang Hockey Stadium,
544964) **and** the address used for Batch I's new stalls (308 Anchorvale Road, Multi
Storey Car Park, 540308) were wrong -- neither is the hawker centre itself, confirmed via
OneMap (57 Anchorvale Road resolves to a hockey stadium; 308 Anchorvale Road resolves to
a car park). A fresh, more specific web search found the actual address: **339
Anchorvale Road, Level 2, 540339**. Fixed all 7 premises rows for this venue (2 pre-
existing real-chain entries + 5 stalls added in Batch I) to the correct address,
postal code, and coordinates. No brand/stall data was wrong, only the location metadata.

## Address correction found: Toa Payoh Lorong 4 Blk 93

The stored address (85 Lorong 4 Toa Payoh #01-368, 310085) named the wrong block --
the venue key itself says "Blk 93." OneMap and web search both confirm the venue is at
**93 Lorong 4 Toa Payoh, 310093** (coordinates were already correct).

## Venues completed

- **Tampines Round Market and Food Centre** (Blk 139 Tampines Street 11, 521139) — 3
  stalls: 137 Lor Mee Prawn Mee (sells out before sunrise), Yummy Sawarak Kolo Mee,
  Yong Huat Chicken Rice. Cold Storage Singapore (1983) Pte Ltd, Kentucky Fried Chicken
  Management Pte Ltd, and Pizza Hut Singapore Pte Ltd left as-is (recognizable real
  chains). This fully resolves all remaining flagged entries at this venue.
- **Toa Payoh Lorong 4 Blk 93** (93 Lorong 4 Toa Payoh, 310093) — 4 stalls: Kuey Chap
  Stall (#01-35, long queues), ABC Popiah, Ping Xiang Wanton Mee (#01-46), 93 Wu Xiang
  Xia Bing (#01-40). Mcdonald'S Restaurants Pte. Ltd. and Pizza Hut Singapore Pte Ltd
  left as-is. This fully resolves all remaining flagged entries at this venue.

Both venues are now fully clean -- no more generic personal/company-name entries left
except recognizable real chains.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre`, `ayer_rajah_food_centre`,
`teck_ghee_square`, `clementi_ave_2_market_cooked_food_centre`, and the 4-venue
SFA-log-duplication pair (`mayflower_market`/`ang_mo_kio_628_market`,
`kaki_bukit_511_market_and_food_centre`/`bedok_north_street_3_blk_538`) — see prior
batch docs for details on each.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) + 5 (G) + 6 (H) +
5 (I) + 6 (J) + 5 (K) + 6 (L) + 5 (M) + 2 (N) = 79 of 86 originally-affected venues fixed.
**This is the last regular batch** -- based on the re-audit, all remaining venues fall
into the 10 flagged-for-dedicated-handling category (address/identity ambiguities that
need individual judgment calls rather than a standard research-and-swap pass) or already
have accepted partial coverage. No further "Batch O" of straightforward venues remains.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,723 total brands (unchanged net this
batch — 7 added, 7 removed), 4,655 total premises (unchanged net) — 0 duplicate IDs, 0
orphaned premises, 0 missing lat/lng.
