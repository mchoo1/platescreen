# 2026-08-24 (Batch U) — Buangkok and One Punggol Hawker Centres

Retries the two food-court-operator-style venues that were blocked earlier this project
(`buangkokhawker.com.sg` returning empty content, `onepunggolhc.sg` individual stall pages
302-redirecting). This batch: 53 real stalls added (25 new venue, 28 existing venue), 2
wrong addresses corrected, 0 removed (both venues previously had zero or only
partial/incorrectly-addressed coverage, not generic placeholder entries to swap out).

## Buangkok Hawker Centre — new venue, built from scratch

`buangkokhawker.com.sg` remains blocked (HTTP 500 / empty content on repeated retries,
including this pass). This venue had **no brand/premises entries at all** prior to this
batch — confirmed via grep across `brands.ts`/`premises.ts` before starting (the only
existing "Buangkok" hits were unrelated addresses: Institute of Mental Health, Buangkok
Link, Buangkok Square, none of which is the hawker centre).

Fell back to secondary sources and cross-referenced two independent write-ups plus the
venue's own address confirmation:
- `eatbook.sg/buangkok-hawker-centre/` — 15 stalls with exact unit numbers (#02-K01
  through #02-K45), published Jan 2025.
- `singaporehawkercentres.com/buangkok-hawker-centre/` — a cuisine-by-cuisine stall
  directory naming 10 further stalls not covered in the eatbook piece (unit numbers not
  given for these).

Both sources agree on the address: **70 Compassvale Bow, Singapore 544692** (within the
Sengkang Grand Mall development, near Buangkok MRT). Geocoded via OneMap: lat
1.38298163203344, lng 103.892721007746.

Added 25 real stalls total. 15 with confirmed unit numbers: Liu Kou Shui (#02-K25), Mae Ai
Thai Food (#02-K26), Penang Alley (#02-K11), Shawarma N Kebab and Sweets (#02-K01), Eng
Kee Chicken Wings (#02-K13), Ming Chung White Lor Mee (#02-K06), Feng Ji Hainanese
Boneless Chicken Rice (#02-K16), Chef Wang Fried Rice (#02-K28), Bai Nian Niang Dou Fu
(#02-K15), Munchi Pancakes (#02-K45), Origanics (#02-K44), Guan Kee Kway Chap (#02-K12),
Petit Saigon (#02-K31), Redhill Fried Hokkien Mee (#02-K14), Soya Bean You Tiao (#02-K43).
10 more without a confirmed unit number (left `null`, per the never-fabricate rule — do
not invent a unit): Huang Chao Teochew Noodle House, Jue Shuang Braised Delights, Fat Fat
Food, Yi Hong Wok, The 11th Street Teochew Fish Soup, HK Wanton Noodle & Roasted Delights,
Sunbo Express Penyet + BBQ, UNO Eat, RIZQIA Muslim Food, Juice Lab.

Both sources describe the centre as having ~35-38 stalls total; 25 verified real names is
solid partial coverage, not exhaustive. The remaining ~10-13 stalls have no name attached
in any source found and were left unresearched rather than guessed.

## One Punggol Hawker Centre — completing prior partial coverage + fixing 2 wrong addresses

`onepunggolhc.sg` previously appeared blocked (individual `/hawkers/{slug}/` pages
302-redirected to the homepage). Retried the homepage itself directly this pass — it now
returns full content, including an embedded "Hawker Heroes" section listing all 31 stalls
with unit numbers.

5 real stalls were already in the dataset from an earlier session (No.25 Minced Meat
Noodles, Kwang Kee Teochew Fish Porridge, Eng Kee, OBBA Jjajang, Lim Bo Rojak), all
correctly addressed at 1 Punggol Drive, Singapore 828629. Cross-referencing against the
homepage's 31-stall list: 3 overlap (Kwang Kee → "Kwang Kee Fish Porridge" #02-19, Eng Kee
→ "Eng Kee Chicken Wing" #02-34, OBBA Jjajang → "OBBA Jjajang" #02-17 — left as-is, already
correct). No.25 Minced Meat Noodles and Lim Bo Rojak don't appear on the current homepage
list (may have closed or simply aren't featured) — left untouched since they were
independently verified in an earlier session.

Added the remaining 28 stalls from the homepage list, all at 1 Punggol Drive, Singapore
828629 with their listed unit numbers: 115 Tai Ho Jiak (#02-28), 75 Ah Balling (#02-13),
Amoy Ban Mian (#02-35), Botak Cantonese Porridge (#02-14), Changi Village Hokkien Mee
(#02-12), Chwee Kueh (#02-20), Cut Fruits (#02-31), Fei Zhuang Yuan (#02-18), Fuyuan Mala
Xiang Guo (#02-27), Guo Qin Noodle (#02-25), Hi Leskmi Whampoa Nasi Lemak (#02-09), Jin
Kimchi (#02-16), Le Yuan Noodles (#02-22), LeiPoPo (#02-26), Munchi Pancakes (#02-36),
POKEQPAN (#02-10), Pot Master (#02-23/24), Punggol Roti Prata (#02-02), Punjabi Dhaba
(#02-07), Rendang Nation (#02-08), Shahith Ar-Raheeq (#02-03), Souperb (#02-29), Tian Tian
Dian Xin (#02-04), Timbre Pizza (#02-05), Tuckshop (#02-32/33), Uncle Penyet (#02-01), Yi
Ru Heng Economic Rice (#02-21), Zi Jia Yong Tau Foo (#02-15).

### Wrong-address bug fixed

Two existing entries — `one_punggol_hawker_centre_cold_storage_singapore_1983_pte_ltd` and
`one_punggol_hawker_centre_haji_karim_prata_palace_pte_ltd` — carried a stored address of
"639 Punggol Drive #01-0X, Singapore 820639", a completely different building from the
real venue. Corrected both to 1 Punggol Drive, Singapore 828629 (lat 1.40852158088602, lng
103.90503420803), matching this venue's other entries. Same "wrong-address" defect pattern
seen repeatedly across this project (schools, libraries, petrol stations, and now a
mismatched Punggol Drive block number), just not one of the SFA-log-pooling-duplicate
cases — these two entries were unique to this venue key, not shared with another.

## An insertion-script bug caught and fixed mid-batch

The standard "insert before the export marker" step initially inserted both new blocks
*after* the closing `];` of `BRANDS_4`/`PREMISES_12` instead of *before* it — i.e. as
bare object literals sitting between the array's closing bracket and the `export const
BRANDS = [...]`/`export const PREMISES = [...]` line, which is invalid TypeScript syntax
(confirmed by ~50 `TS1005`/`TS1128` errors on `npx tsc --noEmit`). Root cause: earlier
batches' export-marker line immediately followed the closing `];` with no blank-line
padding, but this file currently has `];\n\n` before the export line, and the insertion
script matched on the export-line string alone rather than anchoring to the `];`. Fixed by
locating the exact `];\n\n<new content>\nexport const ... = ` wrong-order string and
swapping it to `<new content>];\n\nexport const ... = `. Re-ran `tsc --noEmit` clean after
the fix — this is a caught-and-corrected data-entry-tooling bug, not a shipped defect.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added. Buangkok is not exhaustively
covered (25 of a possible ~35-38 stalls); the remaining stalls have no findable name and
are correctly left as a research gap rather than guessed.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,774 total brands (was 1,721 — net +53),
4,706 total premises (was 4,653 — net +53) — 0 duplicate brand IDs, 0 orphaned premises, 0
missing lat/lng (confirmed via a temporary `verifyU.ts` script, deleted after use).
Build-mirror diff confirms live and mirror `brands.ts`/`premises.ts` are byte-identical.
