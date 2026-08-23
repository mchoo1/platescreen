# 2026-08-23 (5th pass, Batch H) — Hawker centre generic-name cleanup, 6 venues

Continuation of Batches A-G. This batch: 6 venues, 27 real stalls added, 26 generic rows
removed.

## Address corrections found (3 venues)

Independent OneMap + web-search verification found the original 2026-08-20 restructure had
stored the wrong building for three of this batch's venues:

- **Pasir Ris Central Hawker Centre**: stored address pointed to White Sands mall (1 Pasir
  Ris Central Street 3, 518457) — that's a different building. The actual venue is a
  standalone hawker centre at **110 Pasir Ris Central, 519641**.
- **Margaret Drive Hawker Centre**: stored address (310 Margaret Drive, Queenstown Primary
  School, 149303) is a nearby school, not the hawker centre. The actual venue is inside
  SkyResidences @ Dawson at **38A Margaret Drive, 142038**.
- **Jurong West Hawker Centre**: stored address (20 Jurong West Street 61, Frontier Primary
  School, 648200) is a nearby school. The actual venue (JW50 Hawker Heritage) is at
  **50 Jurong West Street 61, 648202**.

Bukit Merah Central Food Centre's stored address (163 Bukit Merah Central, 150163) was
already correct. Bukit Panjang Hawker Centre and Pasir Panjang Food Centre had only a bare
"Stall No XX-XX" placeholder address (no street address) — resolved to **2 Bukit Panjang
Ring Road, 679947** and **121 Pasir Panjang Road, 118543** respectively via OneMap.

## Naming-confusion note: two "Jurong West" hawker venues

Search results for "Jurong West Hawker Centre" surfaced a mix of stalls from two distinct,
separately-branded venues: **505 Jurong West Market & Food Centre** and **Jurong West
Hawker Centre (JW50 Hawker Heritage)**, the latter being this dataset's actual
`jurong_west_hawker_centre` key (confirmed via its own address, 50 Jurong West Street 61).
Only stalls independently confirmed as belonging to JW50 specifically (T Bar, Changi
Village Fried Hokkien Mee, Munchi Pancakes, Nam Wah Heng Fish Head Steamboat) were used;
stalls attributed to the 505 Jurong West venue (37 Porridge, Curry Papa, West's Bros
Western Food, Wen Guang Handmade Fishball Noodle) were not applied here to avoid
conflating the two venues. `505_jurong_west_market_and_food_centre` is not in this
dataset's affected-venue list and was not touched.

## Venues completed

- **Pasir Ris Central Hawker Centre** (110 Pasir Ris Central, 519641) — 5 stalls: Wild
  Olives (Western grill), Prawnaholic (King Prawn Udon), Ayam Penyet, Siap Lah! (Bangkok
  boat noodles), Daburu (Japanese Hamburg). Bee Cheng Hiang Concept Pte. Ltd. and Bengawan
  Solo Pte Ltd left as-is (recognizable real chains). 1 of the 6 flagged entries left
  unchanged, no verifiable real name found.
- **Bukit Panjang Hawker Centre** (2 Bukit Panjang Ring Road, 679947) — 3 stalls: You Xiang
  Teochew Noodles (longest queue in the centre daily), Zai Lai's Lor Mee, Like Pudding. 3 of
  the 6 flagged entries left unchanged — only descriptive dish mentions ("Ban Mian") could
  be found for the others, not an actual stall name.
- **Margaret Drive Hawker Centre** (38A Margaret Drive, 142038) — 4 stalls: Hakka Thunder
  Tea, Tong Kee Chicken Rice, No.1 Western Food, Queenstown Lontong. Cafe Galilee Pte. Ltd.
  left as-is. 2 of the 6 flagged entries left unchanged.
- **Pasir Panjang Food Centre** (121 Pasir Panjang Road, 118543) — 6 stalls (full 1:1 swap):
  Alan Banana Leaves BBQ Seafood, Yusoff Haji Jalal Satay (ex-Satay Club), Ivy's Hainanese
  Herbal Mutton Soup, Ah Heng Curry Chicken Bee Hoon Mee, Lao Liang Pork Porridge, Al Ehsan
  Nasi Padang.
- **Jurong West Hawker Centre** (50 Jurong West Street 61, 648202) — 4 stalls: T Bar (cold
  brew fruit tea), Changi Village Fried Hokkien Mee, Munchi Pancakes (min jiang kueh), Nam
  Wah Heng Fish Head Steamboat. Cold Storage Singapore (1983) Pte Ltd and Golden Rooster
  Pte. Ltd. left as-is. 2 of the 6 flagged entries left unchanged (see venue-confusion note
  above).
- **Bukit Merah Central Food Centre** (163 Bukit Merah Central, 150163) — 5 stalls: Day
  Night Fried Kway Teow (30+ years), Nan Heng Hainanese Boneless Chicken Rice (#02-28,
  grade B via SFA cross-ref), Guan Huat Yong Tau Foo (44-year history), Seng Kee (fish
  soup), Lai Hin Fish Ball Kway Teow Mee (#02-11, grade B via SFA cross-ref). Creme Works
  Private Limited left as-is. 1 of the 6 flagged entries left unchanged.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre`, `ayer_rajah_food_centre`,
and the 4-venue SFA-log-duplication pair issue (Mayflower/Ang Mo Kio 628, Kaki Bukit
511/Bedok 538) — see prior batch docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) + 5 (G) + 6 (H) =
50 of 86 originally-affected venues fixed. 36 venues remain, plus 8 flagged for dedicated
handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,715 total brands (was 1,714), 4,647
total premises (was 4,646) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
