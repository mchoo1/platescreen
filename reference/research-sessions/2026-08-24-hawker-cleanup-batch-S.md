# 2026-08-24 (6th pass, Batch S) — 5 more venues from the newly-discovered 24-venue list

Continuation of Batch R's broader re-audit. This batch: 5 venues, 6 real stalls added, 6
generic "Stall No" placeholder entries removed. All five venues already had a partial
set of real stalls added in an earlier research session (correct addresses, real names)
but were left with 1-2 leftover generic entries that the 5th-pass heuristic missed
because they lacked the "Local & Hawker" cuisine tag or still carried `Stall No`
placeholder addresses with `postal: null`.

## Venues completed

- **East Coast Lagoon Food Village** (1220 East Coast Parkway, 468960) — replaced 2
  "Stall No 008"/"Stall No 057" placeholder entries (Goh Boon Heng, Isnin Bin Salim) with
  East Coast Lagoon Fishball Noodle (#01-08) and Lagoon Famous Carrot Cake (#01-40).
- **Serangoon Garden Market & Food Centre** (49A Serangoon Garden Way, 555945) —
  replaced 1 placeholder (Chin Hon Yin, "Stall No 025") with Bossi Ban Mian (#01-18).
- **Sims Vista Market & Food Centre** (49 Sims Place, 380049) — replaced 1 placeholder
  (Lim Swee Hiok) with Green Chili Chicken Rice (#01-09).
- **Kukoh 21 Food Centre** (1 Jalan Kukoh, 161001) — replaced 1 placeholder (Kang Soh
  Chye, "Stall No 01-09") with Bedok 69 Traditional Wanton Noodle (#01-15). Ntuc Foodfare
  Co-Operative Ltd left as-is (real operator, already correctly addressed).
- **Marsiling Lane Market & Food Centre (Blk 20/21)** (20 Marsiling Lane, 730020) —
  replaced 1 placeholder (Eng Siak Yong, "Stall No 01-36") with Azizah Aziz Caferia
  (#01-03, teh tarik & Malay breakfast).

No address corrections were needed this batch — all five venues already had correct
addresses from the earlier research session; only the coordinates already used by that
venue's existing real-stall entries were reused for consistency.

## Still to do (from Batch R's 24-venue list)

Bukit Merah Central Food Centre, 80 Circuit Road Market, Havelock Road Cooked Food
Centre, Blk 6 Tanjong Pagar Plaza, Changi Village Blk 2 and 3, Blk 17 Upper Boon Keng,
Jurong West Street 52 Blk 505, Margaret Drive Hawker Centre, Taman Jurong Market.
(Clementi Ave 3 Blk 448, Eunos Crescent Blk 4A, Tanglin Halt Market, Mei Chin Road
Market, New Upper Changi Road Blk 208B/58, Bedok South Road Blk 16 were checked and
confirmed to be intentional, already-documented "no verifiable real name found"
leftovers from Batches K/L/O — not re-attempted since no new information changes that
finding.)

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,721 total brands (unchanged net — 6
added, 6 removed), 4,653 total premises (unchanged net) — 0 duplicate IDs, 0 orphaned
premises, 0 missing lat/lng. Build-mirror diff confirms live and mirror
`brands.ts`/`premises.ts` are byte-identical.
