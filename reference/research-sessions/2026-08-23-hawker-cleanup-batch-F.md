# 2026-08-23 (5th pass, Batch F) — Hawker centre generic-name cleanup, 4 venues

Continuation of Batches A-E. This batch: 4 venues, 21 real stalls added, 21 generic rows
removed (net zero change in total counts, since some venues here also had legitimate
already-real entries left untouched, unlike most prior batches).

## Venues completed

- **Kukoh 21 Food Centre** (1 Jalan Kukoh, 161001) — 4 stalls: Midas (self-described as
  Singapore's first baked roti prata & pocket murtabak), Jalan Kukoh Teochew Kueh (heritage
  handmade kueh), Ke Jia Yong Tau Hu, Ri Tao Fu (Teochew pig organ soup). NTUC Foodfare
  Co-Operative Ltd left as-is (a real, known operator, not a bare personal name).
- **Marine Terrace Market & Food Centre** (50A Marine Terrace, 441050) — 6 stalls: Nur
  Rezki, 132 Traditional Teochew Noodles (since 1969), Meng Kee, Hui Huang Roasted Delight,
  Seng Hoe Fish Ball Minced Meat Noodle, Ipoh Style San Lou Hor Fun.
- **Circuit Road Market & Food Centre** (80 Circuit Road, 370080) — 5 stalls: Tian Seng
  Fried Prawn Mee, Teo Kee Fried Oyster, Hup Hup Mee Siam, Three Treasures Roast Duck,
  Victor Veggie. 1 of the original 6 left untouched.
- **Marine Parade Central Market & Food Centre** (84 Marine Parade Central, postal not
  confirmable via OneMap — left null) — 6 stalls: Apollo Fresh Cockle Fried Kway Teow,
  Neptune Hong Kong Dim Sum, Yok Mari Yok, Kun Ji, D'Authentic Nasi Lemak, Ma Bo Lor Mee.

## Flagged, not touched: 85 Fengshan Centre

Applied the same false-positive check as Batch E's Kovan Hougang finding. All 6 of this
venue's flagged entries are company names (Bangkok Street Mookata Pte Ltd, Boss Junior
Group Private Limited, Fortune Food (S) Pte Ltd, Frozt Pte Ltd, J K Kings Prata Pte Ltd,
Wonderful Management Pte Ltd) — 2 of them (Bangkok Street Mookata, J K Kings Prata) are
already reasonably informative trading names. But the tenant profile here (modern mookata/
prata-chain-style company names) doesn't match the well-known "85 Fengshan Food Centre"
covered by food blogs (heritage stalls like Sin Bedok North BBQ Chicken Wing, Chan BBQ),
and the two venues' addresses differ by a few house numbers on the same street (88 vs 85
Bedok North Street 4) — plausibly two different buildings, not the same one. Rather than
risk conflating them, this venue is flagged for dedicated address verification before any
further work, alongside `telok_blangah_market` and `tanglin_halt_market`.

## Still flagged from earlier batches (not touched this batch)

`telok_blangah_market`, `tanglin_halt_market`, `85_fengshan_centre` (new this batch), and
the 4-venue SFA-log-duplication pair issue — see Batch A/B/F docs.

## What this doesn't do yet

Same macro gap as every prior batch — no MenuItem rows added.

## Scale disclosure

Cumulative: 3 (initial) + 11 (A) + 7 (B) + 5 (C) + 5 (D) + 4 (E) + 4 (F) = 39 of 87
originally-affected venues fixed (89 minus Kovan Hougang and 85 Fengshan Centre, both
reclassified as needing dedicated handling rather than a blind swap). 48 venues remain,
plus 7 flagged for dedicated handling.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,711 total brands, 4,643 total premises
(unchanged net totals this batch — 21 removed, 21 added) — 0 duplicate IDs, 0 orphaned
premises, 0 missing lat/lng.
