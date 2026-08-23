# 2026-08-23 (5th pass, Batch E) — Hawker centre generic-name cleanup, 4 venues

Continuation of Batches A-D. This batch: 4 venues, 21 real stalls added, 17 generic rows
removed.

## Finding: not every "generic-looking" audit hit is actually generic

While researching Kovan Hougang Market & Food Centre and Hougang 105 Hainanese Village
Centre, found that the original full-scope audit (the person/company-name heuristic used
to find the 89 affected venues in the first place) produced some false positives: several
of the "generic" entries at these two venues are actually **Breadtalk Pte Ltd**, **Bengawan
Solo Pte Ltd**, and **Cold Storage Singapore (1983) Pte Ltd** — real, nationally recognized
chains, just displayed with their legal "Pte Ltd" suffix intact. A user would recognize
"BreadTalk" or "Bengawan Solo" immediately; that's meaningfully different from a bare
personal name like "Chan Lai Ee" that tells a user nothing. These are cosmetic (could
strip the legal suffix in a future polish pass) rather than the "zero value" problem the
user flagged.

Because of this:

- **Kovan Hougang Market & Food Centre was skipped entirely this batch** — on inspection,
  all 6 of its flagged entries are recognizable company names (Alpha Subs, Berrylite
  Parkway, Bliss Restaurant, BreadTalk, Chong Yo Private Limited, Cold Storage Singapore
  (1983)), not the generic-licensee-name problem. No real research needed here; flagging
  as already-acceptable rather than touching it.
- **Hougang 105 Hainanese Village Centre**: only 2 of its 6 flagged entries were true
  generic personal names (Ang Hwee Cheng, Casey Tan Kar Huat) — those 2 were replaced.
  Bengawan Solo Pte Ltd and BreadTalk Pte Ltd were left as-is (already recognizable).
  Anytime Food Pte Ltd and Bachmann Japanese Restaurant Pte Ltd were also left as-is (they
  at least name a food category, unlike a bare personal name) — added 6 more real stalls on
  top (He He, Jiu Ji Shu Shi, Lorong Ah Soo Lor Mee, Yong Seng Teochew Fishball Mee, Xian
  Ting Vegetarian, Tian Tian Nasi Lemak) to expand real coverage beyond the 1:1 swap.

## Venues completed

- **Serangoon Garden Market & Food Centre** (49A Serangoon Garden Way, 555945) — 5 stalls:
  Zuzu Kebab, Hock Kee Fried Oyster, Seng Kee Bak Chor Mee (36+ years), Aliff Nasi Lemak,
  Serangoon Garden Bakery & Confectionery (running since the 1970s). 1 of the original 6
  generic entries left untouched (no 6th real name confidently sourced).
- **Hougang 105 Hainanese Village Centre** (105 Hougang Avenue 1, 530105) — 6 stalls (see
  finding above for why only 2 of the original 6 were removed).
- **Sims Vista Market & Food Centre** (49 Sims Place, 380049) — 5 stalls: Tai Dong Teochew
  Duck Rice (30+ years), Hollywood Duck Rice, Al Salam Indian Muslim Stall, Hock Heng, Fang
  Kee. 1 of the original 6 left untouched.
- **Taman Jurong Market & Food Centre** (3 Yung Sheng Road, 618499) — 5 stalls: Ang Moh Zi
  Char, 58 Minced Meat Noodle (since 1973), Ng Kee Teochew Fish Ball Kuay Teow Mee, Leng
  Huat Fishball Noodle and Laksa, ButterNut (pizza). 1 of the original 6 left untouched.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, and the 4-venue SFA-log-duplication pair
issue — see Batch A/B docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) = 35 of 88 originally-
affected venues fixed (89 minus 1, since Kovan Hougang was reclassified as not actually
needing this fix). 53 venues remain, plus the 6 flagged venues needing dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,711 total brands (was 1,707), 4,643
total premises (was 4,639) — 0 duplicate IDs, 0 orphaned premises, 0 missing lat/lng.
