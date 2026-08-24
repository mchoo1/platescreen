# 2026-08-24 — Address-accuracy pass: 8 more SFA-log-duplication/pooling venues fixed

Continuation of Task #57 (audit all premises for address/lat-lng accuracy). A fresh
automated audit surfaced 8 more venues still carrying the same road-level pooling defect
first documented in Batch P and revisited in Batch R: the 2026-08-20 SFA-licensee
restructure sometimes pooled licence records from an entire road into one venue key, so
a venue's premises rows end up scattered across block numbers on the same street — none
of which is the venue's own real address. This is a pure address-correction pass (no
brand/stall renames or removals), unlike the generic-name cleanup batches.

Method for each venue: confirm the real single address via the OneMap Search API
(`elastic/search`, ignoring the harmless "Authentication token missing" warning — the
`results` array is still authoritative) and cross-check with a web search for recent
closure/reopening/renovation news, then rewrite only the `address`/`postal`/`lat`/`lng`
fields on every affected row to the venue's own correct address, leaving `id`, `brandId`,
`label`, the nested `sfa` block (including its own stale `premisesAddress` string), and
`source` untouched.

## Findings and fixes

1. **Teban Gardens Market and Food Centre** — 7 rows split across "38 Teban Gardens
   Road" (postal 600038) and "39 Teban Gardens Road" (postal 600039). Neither is real.
   OneMap confirms the actual address is **37A Teban Gardens Road, 601037** — confirmed
   currently operating (28 food stalls, 52 market stalls, since 1976, per Streetdirectory
   and SETHLUI coverage). Lat/lng was coincidentally already correct (1.320831093414238,
   103.7427481191047) since both wrong blocks are on the same road segment; only the
   address/postal text was wrong. Fixed all 7 rows.

2. **Kovan Hougang Market and Food Centre** — 6 rows spread across Blk 205, 207, and 210
   Hougang Street 21. OneMap confirms the real address is **209 Hougang Street 21,
   530209** (next to Heartland Mall Kovan, 2 min walk from Kovan MRT — confirmed
   operating, 65 cooked-food stalls, built 1983). This is the one case in this batch
   where lat/lng was also genuinely wrong (pooled at 1.3739/103.8896, a road-level
   centroid) — corrected to 1.35908384091048/103.886055368064. Fixed all 6 rows.

3. **Toa Payoh West Market and Food Court** — 6 rows split across "126 Lorong 1 Toa
   Payoh" (1 SFA-sourced row) and "128 Lorong 1 Toa Payoh" (5 web-research rows).
   OneMap confirms the real address is **127 Lorong 1 Toa Payoh, 310127** — confirmed
   operating, historic two-storey market/food centre since 1969, underwent a 60-day
   refresh in mid-2025 (flooring/tables/lighting) but did not close permanently.
   Lat/lng was already correct on both sub-groups. Fixed all 6 rows.

4. **Bedok North Street 1 Blk 216** — 4 SFA-sourced rows (Bengawan Solo, Domino's,
   McDonald's, NTUC Club) addressed at 213 / 218 / 445 Bedok North Street 1, none
   matching the venue's own claimed Blk 216. OneMap confirms **216 Bedok North Street 1,
   460216** ("Market & Hawker Centre (Blk 216 Bedok North Street 1)", also known
   locally as Pasar 216 — confirmed operating, 82 food stalls). The venue's 5
   web-research rows already carried this correct address/coordinate; only the 4
   SFA-sourced rows were wrong. Fixed those 4.

5. **Toa Payoh Lorong 4 Blk 93** — 2 SFA-sourced rows (McDonald's at Blk 600, Pizza Hut
   at Blk 85), neither matching the venue's claimed Blk 93. OneMap confirms **93 Lorong
   4 Toa Payoh, 310093** ("Market & Hawker Centre (Blk 93 Toa Payoh Lorong 4)" —
   confirmed operating since 1967, 28 cooked-food stalls). The 4 web-research rows
   already carried the correct address and coordinate; fixed the 2 SFA-sourced rows.

6. **Clementi West Street 2 Blk 726** — 2 SFA-sourced rows (Cold Storage at Blk 727,
   New Century Food House at Blk 721), neither matching the venue's claimed Blk 726.
   OneMap confirms **726 Clementi West Street 2, 120726** ("Market & Hawker Centre
   (Blk 726 Clementi West Street 2)", also known as West Coast Market Square —
   confirmed operating, built 1980, 60 cooked-food stalls). The 5 web-research rows
   already carried the correct address/coordinate; fixed the 2 SFA-sourced rows.

7. **Toa Payoh Lorong 8 Blk 210** — 2 SFA-sourced rows (JNR Food at Blk 211, Lee Kwang
   Kee Groups at Blk 212), neither matching the venue's claimed Blk 210. OneMap confirms
   **210 Lorong 8 Toa Payoh, 310210** (confirmed operating, built 1974, 80 cooked-food
   stalls, known for beef soup and Teochew porridge stalls). The 4 web-research rows
   already carried the correct address/coordinate; fixed the 2 SFA-sourced rows.

8. **Yuhua cross-venue coordinate collision** — `yuhua_village_market_and_food_centre`
   and `yuhua_market_and_hawker_centre` are two distinct, real, currently-operating
   hawker centres (the latter reopened mid-2024 after an Apr–Jul closure for repairs,
   per Mothership) but their single SFA-sourced rows (Cold Storage at "Blk 252 Jurong
   East Street 24" and Boon Tong Kee at "350 Jurong East Avenue 1") shared byte-identical
   pooled coordinates (1.3432, 103.7353) despite the two venues' different addresses.
   Geocoded each independently via OneMap:
   - **Yuhua Village Market and Food Centre**: **254 Jurong East Street 24, 600254**
     → 1.34348818520494, 103.73773841183
   - **Yuhua Market and Hawker Centre**: **347 Jurong East Avenue 1, 600347**
     → 1.34531253284138, 103.731579765339 (OneMap returned no postal for this search
     term; 600347 confirmed instead via Streetdirectory and matches the venue's own
     existing web-research rows already in the file)

   The two venues now have distinct, independently-verified coordinate pairs. Each
   venue's other (web-research-sourced) rows were already correctly addressed/geocoded
   and untouched.

## Scope note

31 rows fixed in total across the 8 groups (7 + 6 + 6 + 4 + 2 + 2 + 2 + 2). No brand,
stall, or venue was renamed or removed — this batch only rewrote `address`/`postal`/
`lat`/`lng` on the affected rows, per the standing rule that this class of fix is
address-only and must not touch stall-naming cleanup, which is tracked separately.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added. Task #58 (30 no-address +
78 missing-postal premises) and the rest of #57's broader audit remain open.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean (4/4 static pages). 4,705 total premises
— unchanged before/after this pass (only address/postal/lat/lng fields were rewritten on
existing rows, 0 rows added or removed). A standalone tsx verification script confirmed:
0 rows across the 8 groups still carrying the old wrong pooled addresses/coordinates, and
the Yuhua pair now holds two distinct lat/lng pairs. Verification script deleted after
running. Build-mirror diff confirms live and mirror `premises.ts` are byte-identical.
