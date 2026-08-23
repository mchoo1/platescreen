# 2026-08-23 (5th pass, Batch I) — Hawker centre generic-name cleanup, 5 venues

Continuation of Batches A-H. This batch: 5 venues, 28 real stalls added, 26 generic rows
removed.

## Naming-confusion note: "Bedok Food Centre" = "Bedok Corner Food Centre"

Initial search results for "Bedok Food Centre" surfaced content for a completely different
venue (Kaki Bukit / "511 Bedok"), since several food blogs use "Bedok 511" loosely. A
follow-up targeted search confirmed the actual `bedok_food_centre` venue (1 Bedok Road,
469572) is informally branded "**Bedok Corner Food Centre**" by most food blogs — same
address, same venue, just a colloquial name. Used SETHLUI's Bedok Corner stall guide
(with unit numbers) for this venue's real names.

## Address correction found: Chong Pang Market & Food Centre

The stored address (585 Yishun Ring Road, Northbrooks Secondary School, 768692) was wrong
— that's a nearby school. The actual venue is at **104 Yishun Ring Road, 760104** (the
complex spans blocks 104-105), confirmed via web search and OneMap.

## Venue flagged, not touched: Teck Ghee Square

`teck_ghee_square`'s stored address is 408 Ang Mo Kio Avenue 10, 560408, but essentially
all food-blog coverage under the "Teck Ghee Square" name actually describes a separately
addressed venue, "409 AMK Market & Food Centre" (409 Ang Mo Kio Avenue 10). Rather than
risk misattributing 409's famous stalls (Hup Seng Huat, Shi Xian Laksa, Long Kee Fried
Carrot Cake, Eng Kee Bak Kut Teh) to the Blk 408 venue, this is flagged for dedicated
address/identity verification before any further work, alongside the other flagged venues.

## Venues completed

- **Bedok Food Centre / Bedok Corner Food Centre** (1 Bedok Road, 469572) — 6 stalls:
  Bedok Corner Hokkien Fried Squid Prawn Mee (#01-29, halal, ~50 years), Yang's Epok-Epok
  (#01-04), LaksaMana (#01-19), Persian Tandoor (#01-18, since 1990), Bamboo Nasi Rendang
  (#01-01), Noi Kassim Barbeque (#01-27).
- **Anchorvale Village Hawker Centre** (308 Anchorvale Road, 540308) — 5 stalls: Pin Wei
  Hong Kong Style Chee Cheong Fun (Michelin-selected), Hakka Leipopo, Original Simon Road
  Hokkien Mee (since the 1960s), Tai Hao Chi Roasted Delights, Munchi Pancakes. Mcdonald'S
  Restaurants Pte. Ltd. left as-is (recognizable real chain). 1 of the 6 flagged entries
  left unchanged.
- **Chong Pang Market and Food Centre** (104 Yishun Ring Road, 760104) — 6 stalls: Chuan
  Kee Boneless Duck Rice (#01-159, most popular stall), Ji De Lai Hainanese Chicken Rice
  (Michelin Bib Gourmand), Xiang Xiang Fishball Noodles (since 1982, Michelin Bib Gourmand),
  Old Chong Pang Wu Xiang Xia Bing, Ah Chuan Fried Oyster Omelette, Chong Pang Nasi Lemak.
- **Teban Gardens Market and Food Centre** (38 Teban Gardens Road, 600038) — 5 stalls:
  Salbiah Malay Stall, Poh Poh Roasted Chicken Rice, Ah Boy Popiah, Tian Wai Tian Fish Soup,
  Tan Hock Seng Cooked Food. Cold Storage Singapore (1983) Pte Ltd left as-is. 1 of the 6
  flagged entries left unchanged.
- **Toa Payoh Vista Market** (95 Lorong 4 Toa Payoh, Blk 74, 310095) — 6 stalls: Rahmath
  Cheese Prata (longest queue in the market), Uncle Kun's Delicacies (Scallop Glutinous
  Rice), Hua Fong Kee Roasted Duck, 127 Lor 1 Fish Porridge, Hai Nan Xing Zhou Beef Noodles
  (Michelin Bib Gourmand), Old Long House Popiah. Note: this is a distinct venue from the
  separately-tracked `toa_payoh_lorong_4_blk_93` (a different block on the same road, not
  yet addressed).

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre`, `ayer_rajah_food_centre`,
`teck_ghee_square` (new this batch), and the 4-venue SFA-log-duplication pair issue — see
prior batch docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) + 5 (G) + 6 (H) +
5 (I) = 55 of 86 originally-affected venues fixed. 31 venues remain, plus 9 flagged for
dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,717 total brands (was 1,715), 4,649
total premises (was 4,647) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
