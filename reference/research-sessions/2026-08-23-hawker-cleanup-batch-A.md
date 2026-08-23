# 2026-08-23 (5th pass, Batch A) — Hawker centre generic-name cleanup, 11 venues

**Trigger:** continuation of the direct user instruction to identify real named stalls at
hawker centres via Google Maps + the SFA licence database, and to eliminate generic
licensee-name placeholders across all ~103 affected venues (see
reference/research-sessions/2026-08-23-chomp-chomp-berseh-alexandra-village.md for the
method established in the first installment). This is Batch A of the remaining ~86 venues.

## Full-scope audit finding

Before starting this batch, ran a full audit of brands.ts to find every remaining generic
SFA-licensee-name Brand (type "hawker", cuisine "Local & Hawker", no operatorId, display
name matching a personal/company-name pattern rather than a real trading name). Result:
**86 venues, 394 generic Brand+Premises rows** still affected, beyond the 3 already fixed
(Chomp Chomp, Berseh, Alexandra Village).

While auditing, also found 18 leftover duplicate generic entries at 3 venues that had
already been given real replacement data in earlier passes (Ci Yuan Hawker Centre,
Bukit Canberra Hawker Centre, Yishun Park Hawker Centre) — the original generic rows were
never deleted when the real data was added, so they sat alongside it as dead duplicates.
Removed those 18 separately (see the "Remove 18 leftover duplicate..." commit) before
starting this batch's real research.

## Data-quality issue found: duplicated SFA source data across 2 venue-key pairs

The reference/migration-scripts/sfa-discovery-log.json entries for `mayflower_market` /
`ang_mo_kio_628_market`, and for `kaki_bukit_511_market_and_food_centre` /
`bedok_north_street_3_blk_538`, are byte-for-byte identical arrays — an artifact of the
2026-08-20 restructure pipeline, not two real venues sharing stalls. Verified via web
search that all 4 are in fact real, physically distinct places (Ang Mo Kio 628 Market &
Food Centre at Blk 628; Mayflower Market & Food Centre at Blk 162; Kaki Bukit 511 Market &
Food Centre at Blk 511; Bedok 538 Market & Food Centre at Blk 538 — all on/near Ang Mo Kio
Avenue 4 or Bedok North Street 3 respectively). This means the generic Brand rows
currently sitting at 3 of these 4 venue keys carry licensee data that doesn't actually
belong to that physical building. Not resolved in this batch — flagged for a future batch,
since it needs care (do not cross-reference SFA grades using the shared/wrong log data for
these 4 until each is independently re-verified).

## Venues completed this batch (11 of 86)

Real stalls researched via WebSearch synthesis of food-blog sources (sethlui.com,
danielfooddiary.com, eatbook.sg, HawkerPedia, Her World, Women's Weekly), cross-referenced
against reference/migration-scripts/sfa-discovery-log.json by unit number for grade
confirmation where the venue's licensee data matched the blog's unit format. Addresses
independently re-geocoded via OneMap rather than trusting the original restructure's stored
address/postal fields, after finding some were wrong (see below).

- **Tiong Bahru Market** (30 Seng Poh Road, 168898) — 6 stalls: Jian Bo Shui Kueh, Tiong
  Bahru Fried Kway Teow, Joo Chiat Beef King, Lor Mee 178, Hong Heng Fried Sotong Prawn Mee
  (Michelin Bib Gourmand), Tiong Bahru Hainanese Boneless Chicken Rice. Reopened Jul 2025
  after a 3-month renovation — used a Jul 2026 sethlui.com article, post-renovation.
- **Beo Crescent Market** (38A Beo Crescent, 169982) — 5 stalls: Chef Wang Fried Rice, Heng
  Heng Cooked Food, Nan Yuan Teochew Fishball Noodle (running since 1961), Guang Dong Xiang
  Gang Wei Dao, Hai Chew.
- **Dunman Food Centre** (271 Onan Road, 424768) — 6 stalls: No Name Hokkien Mee, Say Seng
  Tau Kwa Pau, Dunman Road Char Siew Wan Ton Mee, Dunman Duck Rice, Lau Hong Ser Rojak
  (~50 years running), Restaurant Joo Chiat Ah Huat Wanton Mee.
- **Zion Riverside Food Centre** (70 Zion Road, 247792) — 6 stalls: Zhi Wei Xian Zion Road
  Big Prawn Noodle (Michelin Bib Gourmand), No. 18 Zion Road Fried Kway Teow (Michelin Bib
  Gourmand 2023), Peter Goh's Carrot Cake, Braised Duck Kway Chap, Kang's Wanton Noodle,
  Soon Lee's Pig Organ Soup.
- **ABC Brickworks Market & Food Centre** (6 Jalan Bukit Merah, 150006) — 6 stalls: Yuan
  Yuan Claypot Rice (charcoal-fired), Ah Er Soup (Michelin), Tiong Bahru Yi Sheng Fried
  Hokkien Mee (Michelin Bib Gourmand), Jason Penang Cuisine, Wow Wow West, Nusa & Tara.
  Reopened Apr 2026 after a revamp.
- **Redhill Market** (79 Redhill Lane, 150079) — 6 stalls: Bak Kee Teochew Satay Bee Hoon,
  Jia Xiang, Rong Ji Traditional Hainanese Chicken Rice, Qing Tian, Shun Li Ah, Fu Ming
  Cooked Food (Michelin Bib Gourmand). Only 1 SFA-licensee row existed for this venue in the
  original restructure, so this expands real coverage rather than doing a 1-for-1 swap.
- **Bendemeer Market and Food Centre** (29 Bendemeer Road, 330029) — 6 stalls: Min Ji Laksa,
  Bendemeer Prawn Noodle, Ah Xiao Teochew Braised Duck, Hai Sheng Carrot Cake, Heng Kee Lor
  Mee, Toa Payoh 93 Soon Kueh.
  - **Pek Kio Market & Food Centre** (41A Cambridge Road, 211041) — 4 stalls: Pin Wei Hong
  Kong Style Chee Cheong Fun, Lai Hiang Pork Rib Prawn Noodles, Sheng Seng Fried Prawn
  Noodles, Wah Kee Big Prawns Noodle (2 of the latter without a confirmed unit number — used
  venue-level address only, no unit fabricated).
- **Kebun Baru Food Centre** (226H Ang Mo Kio Street 22, postal not confirmable via OneMap —
  left null rather than guessed) — 8 stalls: Foo Hing Handmade Fishball & Meatball Noodle,
  A1 House Of Claypot, Hock Kee Wanton Noodle, Seletar Sheng Mian Mian Fen Guo, 226 Boneless
  Chicken Rice, Lim's Fishball Noodle, Teck Kee Cooked Food, Hong Heng.
- **Adam Road Food Centre** (2 Adam Road, 289876) — 8 stalls: Selera Rasa Nasi Lemak, Stall
  22 Hokkien Mee, Adam Fishball Noodles, Adam Road Noo Cheng Big Prawn Noodles, Teck Kee Hot
  & Cold Dessert, Al-Sheik Mee Stall, Amirah & Nur Aniqah Mee Soto & Mee Rebus, Adam Chicken
  Rice.
- **Redhill Food Centre** (1001A Jalan Bukit Merah, 159469 — NOT the same place as Redhill
  Market above, despite the similar name; confirmed via SFA log's own premises_address and
  independent web search) — only 1 stall confirmed: **9 Plus Bistro**, a real cafe/bistro at
  that exact address. This is a small industrial-park canteen with no food-blog coverage, so
  only 2 of the original 6 generic entries (the two "9 Plus" licensees, likely the same
  business under separate F&B/beverage licences) were replaced. The other 4 generic entries
  (Er See Liang, Pang Jee Fong, Siti Azizah Bt Yaakop, Wong Yong Khoon) are **left
  unchanged** — no verifiable real trading name found. This is intentional, consistent with
  the project's "never fabricate" rule: partial improvement is better than inventing names
  for the remainder.

Net this batch: 62 real stalls added, 57 generic Brand+Premises rows removed (6 per venue
for 9 venues that got a full 1-for-1 or better swap, 1 for Redhill Market expanding
coverage, 2 for Redhill Food Centre's partial fix).

## What this doesn't do yet

Same macro gap as every prior batch: real names, units, and (where matched) SFA grades
only — no MenuItem rows.

## Scale disclosure

This batch covers 11 of 86 remaining venues. ~75 venues still have generic
licensee-name placeholder stalls and need the same treatment in future batches, plus the
4-venue SFA-log-duplication issue flagged above needs independent re-verification before
being touched.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,713 total brands (was 1,708), 4,645
total premises (was 4,640) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
