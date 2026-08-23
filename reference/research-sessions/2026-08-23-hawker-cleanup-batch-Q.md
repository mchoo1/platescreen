# 2026-08-23 (5th pass, Batch Q) — Final flagged venue: Clementi Ave 2 Market/Cooked Food Centre

Resolves the last remaining flagged venue from the original ~86-89 count, closing out
this cleanup pass entirely.

## The problem

`clementi_ave_2_market_cooked_food_centre` was flagged back in Batch K: its stored
address (126 Clementi Avenue 2, Caltex Service Station, 129930) is a petrol station, and
its 6 "generic" brand entries (Chevron Singapore Pte. Ltd., D'' Successo Pte. Ltd.,
Gateau Pte. Ltd., Jojerie Pte. Ltd., Pang Sook Leng, Qeetrade (Singapore) Pte. Ltd.) each
carried a *different* stored address — 126 Clementi Ave 2 (Caltex station), 354
Clementi Ave 2 (Clementi Ave 2 Shopping Centre #01-233), 328 Clementi Ave 2 #01-190,
352 Clementi Ave 2 (Shopping Centre #01-129), Blk 328 #01-220, and 328 #01-198. None of
these addresses is an actual hawker centre — they're a petrol station and scattered
shopping-centre retail units, confirming this venue key had been populated by mismatched
records rather than genuine hawker/market licensees.

## Resolution

Web search confirms the real, well-known "353 Clementi Avenue 2 Market & Food Centre"
(built 1978, 18 cooked-food stalls + 96 market stalls) is a distinct venue at **Blk 353
Clementi Avenue 2, Singapore 120353** — matching the venue key's name but not its stored
address at all. Cross-referenced against a public stall directory (17 stalls with unit
numbers) plus Burpple reviews to confirm real, currently-trading stalls (not just
directory placeholders). Removed all 6 mismatched entries and replaced them with 6
independently verified real stalls, fixing the venue's address to 353 Clementi Avenue 2,
120353 (lat 1.3141709, lng 103.7707776):

- Aishah Lee Muslim Food (#01-60) — Nasi Lemak, halal
- Jalilah's Corner (#01-69) — Mee Siam, Mee Rebus, weekend Nasi Lemak, fried chicken
- Ah Meng Delicious Food (#01-67) — Prawn Mee, Fried Hokkien Mee, Fried Kway Teow
- Gu Zao Wei Braised Duck Rice Noodle Kway Chap (#01-73)
- Fa Noodle (#01-65) — Wanton Mee, Mee Pok
- Chef Wei HK Cheong Fun — Hong Kong-style Cheong Fun

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 88 (through Batch P) + 1 (Q) = 89 of the original ~86-89 flagged/generic
venues fully resolved. **This closes out the flagged-venue backlog entirely** — no
venues remain in the dedicated-handling category from this cleanup pass.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,721 total brands (unchanged net — 6
added, 6 removed), 4,653 total premises (unchanged net) — 0 duplicate IDs, 0 orphaned
premises, 0 missing lat/lng. Build-mirror diff confirms live and mirror
`brands.ts`/`premises.ts` are byte-identical.
