# 2026-08-24 (6th pass, Batch T) — Final 9 venues from the 24-venue list

Closes out the 24-venue list surfaced by Batch R's broader re-audit. This batch: 9
venues, 13 real stalls added, 13 generic entries removed. Two venues
(`jurong_west_street_52_blk_505`, `margaret_drive_hawker_centre`) had wrong stored
addresses (pointing to a primary school and a mix of a community library / secondary
school respectively) that were corrected as part of the swap; the remaining seven
venues already had correct addresses, just format-placeholder "Stall No" entries.

## Address corrections found (2 venues)

- **Jurong West Street 52 Blk 505**: stored address was "6 Jurong West Street 52,
  Rulang Primary School" — the venue's real stalls were already correctly addressed at
  505 Jurong West Street 52, 640505, confirming the 2 generic entries alone carried the
  wrong (school) address. Corrected on removal/replacement.
- **Margaret Drive Hawker Centre**: stored addresses were "53 Margaret Drive, Queenstown
  Community Library" and "2A Margaret Drive, Queensway Secondary School" — neither is
  the actual hawker centre at 38A Margaret Drive, 142038 (already used by this venue's
  other real stalls). Corrected on removal/replacement.

## Venues completed

- **Bukit Merah Central Food Centre** (163 Bukit Merah Central, 150163) — Heng Chai
  Chicken Rice (#02-44), replacing "Creme Works Private Limited".
- **Block 80 Circuit Road Market & Food Centre** (80 Circuit Road, 370080) — Tuck Bee
  (#02-02, fishball noodles) — confirmed at the exact same unit number as the removed
  generic entry ("Low Hua Boon", Stall No 02-02).
- **Havelock Road Cooked Food Centre** (22A Havelock Road, 161022) — 86 Indian
  Vegetarian (#01-21), You Yi Jia La Mian Xiao Long Bao (#01-22), Guang Fa Laksa
  (#01-08), replacing 3 generic entries.
- **Tanjong Pagar Plaza Market & Food Centre** (6 Tanjong Pagar Plaza, 081006) —
  Traditional Hakka Rice (#02-21, thunder tea rice), replacing "Chen Kin Fatt".
- **Changi Village Hawker Centre** (2 Changi Village Road, 500002) — Kun Kee Fried
  Oyster (#01-47), replacing "Eng Kow Muay".
- **Upper Boon Keng Market & Food Centre** (17 Upper Boon Keng Road, 380017) — Rotitiam
  (#01-16, hawker bakery), replacing "Kok Fu Chuen".
- **505 Jurong West Market & Food Centre** (505 Jurong West Street 52, 640505) — 37
  Porridge (#01-37), Traditional Hakka Lui Cha (#01-12), replacing 2 generic entries
  and fixing the address.
- **Margaret Drive Hawker Centre** (38A Margaret Drive, 142038) — Yu Mi Xiang (#01-29,
  fish soup), Xin's TzeChar (#01-31), replacing "Cafe Galilee Pte. Ltd." and "Goh Hin
  Chiang" and fixing both addresses.
- **Taman Jurong Market & Food Centre** (3 Yung Sheng Road, 618499) — Feng Zhen Lor Mee
  (#03-146), replacing "Chan Chee Chung".

## Scale disclosure

This closes the 24-venue list from Batch R (4 resolved in R, 5 in S, 9 here in T = 18
directly resolved; the remaining 6 — Clementi Ave 3 Blk 448, Eunos Crescent Blk 4A,
Tanglin Halt Market, Mei Chin Road Market, New Upper Changi Road Blk 208B/58, Bedok
South Road Blk 16 — were checked in Batch S and confirmed to be intentional
already-documented "no verifiable real name found" leftovers, not fresh gaps). No
venues remain outstanding from this 6th-pass re-audit.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,721 total brands (unchanged net — 13
added, 13 removed), 4,653 total premises (unchanged net) — 0 duplicate IDs, 0 orphaned
premises, 0 missing lat/lng. Build-mirror diff confirms live and mirror
`brands.ts`/`premises.ts` are byte-identical.
