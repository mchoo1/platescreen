# 2026-08-23 (4th pass) — Chomp Chomp / Berseh / Alexandra Village: replacing generic licensee-name stalls

**Trigger:** direct user instruction — "use google maps and SFA license database to identify
stores within these hawker centres, avoid using generic stores / outlets because it adds 0
value to the user."

## The problem

The 2026-08-20 SFA-licensee restructure populated ~103 independent hawker centres with exactly
6 sample stalls each, using the SFA licensed-establishment dataset's `licensee_name` field
directly as the Brand's display name. That field is a personal or company legal name tied to
the food licence (e.g. "Chew Boon Teck", "Ang Foo Lui"), not a real trading/signboard name — it
tells a user nothing about what food is sold. This is the same zero-value problem already fixed
for bare cuisine-category labels ("Chicken Rice", "Fish Soup") in the 2026-08-22a and 2026-08-22e
passes, just a different flavor of it, and the user flagged it directly this time.

## Approach

For each of 3 venues (Chomp Chomp Food Centre, Berseh Food Centre, Alexandra Village Food
Centre), the 6 generic licensee-name Brand+Premises rows were identified and removed, and
replaced with real, distinctly-named stalls researched via:

1. Google Maps place pages (the "Directory" panel lists individual named vendors for large
   hawker centres) — used for whatever could be read via `get_page_text` before hitting a
   click-automation wall (see Blocker below).
2. Food-blog sources (danielfooddiary.com, sethlui.com, eatbook.sg) for full stall rosters,
   fetched via `web_fetch` or, when that returned empty content, Claude-in-Chrome
   `navigate`+`get_page_text`.
3. `reference/migration-scripts/sfa-discovery-log.json` — the full per-venue SFA licensee
   dataset (not just the 6 rows originally promoted to premises.ts) — cross-referenced by unit
   number for grade confirmation wherever a venue's unit-numbering convention matched the blog
   source's format.

## Blocker: Google Maps UI automation

`mcp__claude-in-chrome__computer` screenshot/zoom actions failed consistently in this
environment (`Failed to deserialize params.clip.scale`, `Region exceeds viewport boundaries
(0x0)` — the browser viewport itself reports 0x0). Clicking Google Maps' "View all" directory-
expand button failed silently via every method tried (ref-based click, scroll_to+click, fresh
navigation+find+click, clicking the "Food & Drink" filter instead) — `get_page_text` always
returned the same truncated 4-item preview. This is a hard environment limitation, not a
fixable code issue. Pivoted entirely to WebSearch + web_fetch/get_page_text for food-blog
sources instead, using whatever partial Google Maps directory data had already been retrieved
as one cross-check input.

## Renovation-staleness risk

Hawker centres undergo periodic renovations causing real stall turnover, which can make even a
reputable older food-blog article wrong. Checked for each venue before trusting a source:

- **Chomp Chomp Food Centre**: a Google review confirmed a renovation "end of 2025 till March
  2026" with stalls no longer there afterward. A 2018 eatbook.sg article was checked against the
  live Google Maps directory and only 1 of its 10 stalls (Ah Hock Fried Hokkien Noodles) still
  matched — rejected. Used a mid-2025/updated-Aug-2025 sethlui.com article instead.
- **Berseh Food Centre**: closed for renovation 29 Sep – 28 Dec 2025, reopened after. Used a 7
  Jan 2026 danielfooddiary.com article published after reopening. That article itself marked one
  stall "[Closed] Old Macpherson Minced Meat Noodles" in its own heading — excluded entirely,
  consistent with never including known-closed stalls.
- **Alexandra Village Food Centre**: reopened after renovation around mid-2025. Used a 1 Jul
  2025 danielfooddiary.com article published the same day as reopening, explicitly noting old
  favourites returning.

## What was added

18 generic Brand+Premises rows removed (6 per venue), replaced with 45 real stalls:

- **Chomp Chomp Food Centre** (12 stalls): Ah Hock Fried Hokkien Noodles, Swee Heng Wanton
  Noodle, Ang Sar Lee Satay Bee Hoon, Carrot Cake, The Warung, 忠邦福烧烤海鲜 BBQ Seafood, Wang
  BBQ & Grill, Wang Da Shen Chicken Wing & Satay, Chomp Chomp Fried Oyster, Chomp Chomp Rojak -
  Popiah, Chia Keng Fried Hokkien Prawn Noodle, Lucy BBQ Seafood. SFA grade cross-referenced for
  10 of the 12 (unit-numbering convention matched); 2 left without a grade (no confident SFA
  unit match).
- **Berseh Food Centre** (9 stalls): Fu Zhou Poh Hwa Oyster Cake, Mei Xiang Black and White Fish
  Soup, Northern Thai Tomyam, Kelantan Kway Chap - Pig's Organ Soup, Fu He Delights 福和, Sheng
  Kee Curry Chicken Noodle, Coffee Hut, Special Chilli Yong Tau Foo, Epok Epok Story. No SFA
  grade cross-reference — Berseh's SFA records use flat 3-digit stall numbers, incompatible with
  the floor-prefixed unit format in the source article; `sfa: null` for all 9 rather than
  guessing a match.
- **Alexandra Village Food Centre** (24 stalls): Xiang Jiang Soya Sauce Chicken, Depot Road Zhen
  Shan Mei Laksa, The Old Stall Hokkien Street Famous Prawn Mee, Dover Road Kai Kee Wanton
  Noodles, Zhang Ji Shanghai La Mian Xiao Long Bao, Tong Le Wanton Mee, Hor Fun Premium, Ding
  Sheng 鼎升, Zi Jin Cheng Hainanese Boneless Chicken Rice, The Thunder Tea Story 擂茶物语, Hong
  Kong Yummy Soup 香港靚湯, Ma La Xiang Guo 麻辣香锅, Xiao Gang Western Food, Lye Bo Toss Noodle,
  Pu Tian Delights 莆田美食, Lau Phua Chay Authentic Roasted Delicacies, Tai Liok Claypot Chicken
  Rice, Tiong Bahru Lien Fa Shui Jing Pau, Star Yong Kwang BBQ Seafood, Old Punggol Satay, Mr
  Avocado Exotic Juice, Desserts Pavilion 糖水亭, AJ Delights, Ah B Bakery. All 24 units matched
  real SFA records (grade A or B) — its "BLK 120 Stall No 01-XX" format matched the blog
  source's unit numbers directly.

No new Operator needed — all 3 are independent NEA hawker centres, stalls modeled with
`type: "hawker"` and no `operatorId`, consistent with every other non-concession hawker-centre
stall in this database.

## What this doesn't do yet

Same macro gap as every batch this session: real names, units, and (where matched) SFA grades
only — no MenuItem rows, since no real calorie/protein/carb/fat data was available from any of
these sources and none was fabricated.

## Scale disclosure

**This is only 3 of the ~103 hawker centres affected by the generic-licensee-name problem.**
Roughly 90+ hawker centres still have the same 6-generic-licensee-name placeholder pattern and
need the identical treatment in future passes. This session should be read as the first
installment establishing the method (Google Maps + food-blog cross-referenced against the SFA
discovery log, with explicit renovation-staleness checking), not a complete fix.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. Scripted checks: 1,726 total brands (0
duplicate IDs), 4,658 total premises (0 orphaned, 0 missing lat/lng). Chomp Chomp Food Centre:
12 brands / 12 premises. Berseh Food Centre: 9 brands / 9 premises. Alexandra Village Food
Centre: 24 brands / 24 premises. researchQueue.ts: removed 18 stale entries referencing the
deleted generic Brand ids.
