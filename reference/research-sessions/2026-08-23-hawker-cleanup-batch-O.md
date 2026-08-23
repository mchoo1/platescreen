# 2026-08-23 (5th pass, Batch O) — Resolving 4 of the 10 flagged venues

Unlike Batches A-N (routine research-and-swap), this batch tackles venues previously
flagged for dedicated verification because of address or identity ambiguity. Resolved 4
of the 10: `85_fengshan_centre`, `telok_blangah_market`, `tanglin_halt_market`,
`ayer_rajah_food_centre`. 15 real stalls added, 15 generic rows removed, plus address
fixes applied retroactively to the entries left untouched at 3 of these venues (8
premises rows corrected beyond the swap itself).

## 85 Fengshan Centre — resolved, was a block-number typo, not two buildings

Batch F had flagged this as possibly a different venue than the famous "85 Fengshan"
because the stored address (88 Bedok North Street 4, 460088) didn't match. OneMap
confirms 85 Bedok North Street 4 (postal 460085) is "Fengshan Centre" -- exactly matching
the venue key. The stored data was simply using the wrong block number (88 instead of
85). Fixed the address on both the 2 new stalls and the 4 remaining old entries (6 rows
total). Bangkok Street Mookata Pte. Ltd. and J K Kings Prata Pte. Ltd. left as-is
(already informative names, plausible modern-kiosk tenants for this venue's late-night
supper-spot character). Added Shi Wei Da Satay Bee Hoon (Michelin Bib Gourmand 2018) and
Meow Xiang Vegetarian Food. 2 of the remaining 4 flagged entries left unchanged, no
verifiable real name found.

## Telok Blangah Market — resolved via this dataset's own SFA log

The stored address (46 Telok Blangah Drive, "Blangah Court") turned out to be a
residential block, not a hawker centre at all. Rather than guess among the area's three
similarly-named venues (79 Telok Blangah Drive, 11 Telok Blangah Crescent, 36 Telok
Blangah Rise), cross-referenced this dataset's own `sfa-discovery-log.json` for this
venue key: of 55 licensee records, 40 reference "TELOK BLANGAH DRIVE BLK 79" versus only
7 referencing the "46 Telok Blangah Drive" address that got used, plus a handful of
stray addresses (65/77/45 Telok Blangah Drive). This confirms Blk 79 ("Telok Blangah
Food Centre") is correct -- the original restructure picked a minority/wrong address out
of a noisy log. Fixed the address on all 6 rows (2 remaining old entries + 4 new
stalls). Added Seng Huat Noodles Stall (#01-38, prawn mee), Yanan Ban Mian Noodles
(#01-29), Hong Ji Mian Shi Jia (wanton mee), Tiong Bahru Wah Yuen Porridge. Ntuc Foodfare
Co-Operative Ltd left as-is. 1 of the remaining 5 flagged entries left unchanged.

## Tanglin Halt Market — resolved, bare placeholder address

Had only a "Stall No XXX" placeholder, no real street address. Resolved to 48A Tanglin
Halt Road, 148813 via OneMap + web search, and fixed all 6 premises rows (2 remaining
old entries + 4 new stalls). Added Wei Yi Laksa & Prawn Noodle (#01-20), Delicious Duck
Noodles (#01-20), Tanglin Halt Original Peanut Pancake, Jiu Ye. 2 of the 6 flagged
entries left unchanged.

## Ayer Rajah Food Centre — resolved, now operates as Timbre+

Confirmed 73A Ayer Rajah Crescent ("Ayer Rajah Food Centre I") now operates as
**Timbre+**, a container/food-truck gastropark with 35 vendors (21 hawker stalls, 14
restaurant brands), reopened 2016. This is a distinct venue from the famous "Ayer Rajah
Food Centre" at 503 West Coast Drive (the `ayer_rajah_market` key, already done in Batch
G). Big Bern'S American Grill Xpolis Pte. Ltd. was already a recognizable real vendor and
left as-is. Added Fishball Story, Wong Kee Wanton Noodles, Dancing Crab Shack, Chit Chaat
Chai, Kush -- a full 5-for-5 replacement of the remaining flagged entries.

## Still flagged (not touched this batch)

`teck_ghee_square`, `clementi_ave_2_market_cooked_food_centre`, and the 4-venue
SFA-log-duplication pair (`mayflower_market`/`ang_mo_kio_628_market`,
`kaki_bukit_511_market_and_food_centre`/`bedok_north_street_3_blk_538`) — 6 venues
remain in the flagged category, each requiring its own dedicated investigation similar
to this batch's approach (cross-referencing the SFA log, disambiguating similarly-named
venues, or resolving duplicate-data issues).

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 79 (through Batch N) + 4 (O) = 83 of 86 originally-affected venues fully
resolved (fixed or confirmed-and-completed). 6 venues remain in the flagged/dedicated-
handling category.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,723 total brands (unchanged net this
batch — 15 added, 15 removed), 4,655 total premises (unchanged net) — 0 duplicate IDs, 0
orphaned premises, 0 missing lat/lng.
