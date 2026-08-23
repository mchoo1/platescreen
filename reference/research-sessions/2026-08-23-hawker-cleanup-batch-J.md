# 2026-08-23 (5th pass, Batch J) — Hawker centre generic-name cleanup, 6 venues

Continuation of Batches A-I. This batch: 6 venues, 28 real stalls added, 26 generic rows
removed.

## Address corrections found (4 venues)

Independent OneMap + web-search verification found the original 2026-08-20 restructure
had stored the wrong building for four of this batch's venues:

- **Kim Keat Palm Market and Food Centre**: stored address (16 Lorong 7 Toa Payoh, Pei
  Chun Public School, 319320) is a nearby school. The actual venue is at **22 Lorong 7
  Toa Payoh, 310022**.
- **One Punggol Hawker Centre**: stored address (70 Punggol Drive, Waterway Primary
  School, 828802) is a nearby school. The actual venue is at **1 Punggol Drive, 828629**.
- **Punggol Coast Hawker Centre**: stored address (266C Punggol Way #01-376, Punggol
  Emerald, 823266) does not match this brand-new (opened 25 Jul 2025) hawker centre. The
  actual venue is at **84 Punggol Way, #02-55, 829911**.
- **Toa Payoh Lorong 8 Blk 210**: stored address (233 Lorong 8 Toa Payoh #01-256, 310233)
  names a different block than the venue key itself claims. The actual venue, confirmed
  by both web search and OneMap, is at **210 Lorong 8 Toa Payoh, 310210**.

Marsiling Lane Blk 20/21 and Jurong West Street 52 Blk 505 had only bare "Stall No XX-XX"
or wrong-school placeholder addresses — resolved to **20 Marsiling Lane, 730020** and
**505 Jurong West Street 52, 640505** respectively via OneMap.

## Venues completed

- **Kim Keat Palm Market and Food Centre** (22 Lorong 7 Toa Payoh, 310022) — 5 stalls:
  LiXin Chao Zhou Fishball Noodle (Michelin Guide 2022), Hai Nan Xing Zhou Beef Noodle
  (Michelin Bib Gourmand), Min Kee Tanjong Rhu Wanton Noodle, Old Long House Popiah (since
  the 1930s), Ah Chuan Fried Oyster Omelette. 1 of the 6 flagged entries (Chang Lai Pte.
  Ltd.) left unchanged, no verifiable real name found.
- **One Punggol Hawker Centre** (1 Punggol Drive, 828629) — 5 stalls: No.25 Minced Meat
  Noodles, Kwang Kee Teochew Fish Porridge (Michelin Bib Gourmand), Eng Kee (fried chicken
  wings), OBBA Jjajang (Korean), Lim Bo Rojak (40+ year recipe). Cold Storage Singapore
  (1983) Pte Ltd left as-is. 1 of the 6 flagged entries left unchanged.
- **Punggol Coast Hawker Centre** (84 Punggol Way, #02-55, 829911) — 5 stalls: Singapore
  Fried Hokkien Mee (Michelin Bib Gourmand), Hock Hai (Hong Lim) Curry Chicken (Michelin
  Selected), South Buona Vista Braised Duck (50-year history), Huay Kwang Thai Wanton Mee,
  S.J Sickander Ammal Muslim Foods. Cold Storage Singapore (1983) Pte Ltd left as-is. 1 of
  the 6 flagged entries left unchanged.
- **Marsiling Lane Blk 20/21** (20 Marsiling Lane, 730020) — 5 stalls: Soon Xing Coffee
  (#01-08), Joy Junction (#01-30), Chin Heng (#01-86, laksa), Selera Menanti Traditional
  Malay Cuisine (#01-120), Yap Kee Hainanese Chicken Rice (#01-21). 1 of the 6 flagged
  entries left unchanged.
- **Jurong West Street 52 Blk 505** (505 Jurong West Street 52, 640505) — 4 stalls: Jian
  Bo Shui Kueh (Michelin Bib Gourmand, Teochew chwee kueh), Soh Kee Cooked Food (Michelin
  Bib Gourmand), Wen Guang Handmade Fishball Noodle, Du Du Shou Shi (Michelin Bib
  Gourmand, tutu kueh, 50+ years). Distinct venue from `jurong_west_hawker_centre`
  (JW50, done in Batch H) despite similar street name. 2 of the 6 flagged entries left
  unchanged.
- **Toa Payoh Lorong 8 Blk 210** (210 Lorong 8 Toa Payoh, 310210) — 4 stalls: Seletar
  Sheng Mian & Mee Hoon Kway (#01-05), Guan Kee Kway Chap, Hai Kee Noodle (#01-59), Hong
  Seng Lor Mee & Laksa (#01-54). 2 of the 6 flagged entries left unchanged.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre`, `ayer_rajah_food_centre`,
`teck_ghee_square`, and the 4-venue SFA-log-duplication pair issue — see prior batch docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) + 5 (G) + 6 (H) +
5 (I) + 6 (J) = 61 of 86 originally-affected venues fixed. 25 venues remain, plus 9
flagged for dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,719 total brands (was 1,717), 4,651
total premises (was 4,649) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
