# 2026-08-24 — Defunct-chain cleanup, missing-postal backfill, Grain real addresses

Part of the address-accuracy pass (task #58) following the full field-completeness audit.
Covers the 5 legacy "Multiple outlets islandwide" placeholder premises (the non-hawker-
centre subset of the 30 no-address rows) and the 78 missing-postal-only rows.

## The 5 "Multiple outlets islandwide" placeholders

These were pre-Brand/Premises-split relics: a single Premises row per brand standing in
for "this chain exists somewhere in Singapore" with no real location, `address: null`.
Researched each individually before deciding what to do, per the user's direction:

- **Wendy's** — confirmed defunct. Closed all 11 Singapore outlets by 1 May 2015; no
  current SFA licence or storefront exists. Had 8 real MenuItems already researched.
  Per user decision: removed entirely (brand + premises + all 8 menu items) — a defunct
  chain with a "location" is actively misleading in a restaurant-finder.
- **Superfood Kitchen** — confirmed defunct. Last outlet (Raffles City) closed and the
  company entered voluntary liquidation. Had 5 real MenuItems. Removed entirely (brand +
  premises + all 5 menu items), same reasoning as Wendy's.
- **McCafe** — confirmed real: ~43-46 of McDonald's 136 Singapore outlets have a McCafe
  corner, but which specific ones is unconfirmed from this pass's research. Per user
  decision: removed the misleading single-address placeholder (McCafe has 10 real
  MenuItems, kept), added a researchQueue.ts entry (`mccafe_colocation_research`) to
  identify the real co-located outlet subset in a future pass. McCafe currently has 0
  premises and won't appear as a location until that research is done.
- **Nourish Bowl** — two rounds of WebSearch found zero verifiable current Singapore
  presence under this exact name (only a differently-named "Nourish Table" at the Botanic
  Gardens and an unrelated "Nourish Awesome Bowl" in Kuala Lumpur). Per user decision:
  removed the placeholder (5 real MenuItems kept), added a researchQueue.ts entry
  (`nourish_bowl_existence_check`) to confirm or refute the brand's current existence.
- **Grain** — confirmed real with 2 verifiable current addresses found via WebSearch:
  21 Media Circle, Infinite Studios, Singapore 138562 (lat 1.29238424432587, lng
  103.794685834653) and 10 Tampines North Drive 4, JTC Space @ Tampines North #01-05
  (Kitchen 25), Singapore 528553 (lat 1.36531840062334, lng 103.93179253507) — both
  geocoded via OneMap. Replaced the placeholder with these 2 real premises rather than
  removing the brand (its 20 existing MenuItems now have real locations to attach to).

## Hawker-centre-umbrella "no address" rows (25 of the original 30)

The remaining 25 no-address rows were all specific named stalls at hawker centres that
already have other, correctly-addressed premises elsewhere in the file (Lau Pa Sat x9,
Newton Food Centre x1, Chinatown Complex x4, Old Airport Road x2, Golden Mile Food Centre
x1, Geylang Serai Market x3, Whampoa Makan Place x5). Backfilled each with its venue's own
already-verified building-level address + postal (no unit number invented — a WebSearch
pass for unit numbers turned up conflicting results for some stalls, e.g. "Seng Kee" at
Lau Pa Sat listed as both unit 10 and unit 57 across sources, so unit numbers were
deliberately left off rather than guessed, per the never-fabricate rule). This is a
building-level accuracy fix, not a full per-stall unit-number research pass.

## Missing-postal backfill (108 rows total)

- **50 rows**: the postal code was already present in the `address` string itself but
  never extracted into the `postal` field (a mechanical leftover from earlier
  string-formatting). Extracted and backfilled via script — zero risk, no new research.
- **27 rows**: spread across 8 real hawker-centre venues whose address text had no
  embedded postal digits at all (`NEW UPPER CHANGI ROAD BLK 58 Stall No 01-171` style
  addresses). Looked up each venue's real postal via OneMap: New Upper Changi Road Blk 58
  (461058), Bedok South Road Blk 16 (460016), Clementi Ave 3 Blk 448 (120448), Eunos
  Crescent Blk 4A (402004), Mei Chin Road Blk 159 (140159), Blk 208B New Upper Changi Road
  (462208), Kebun Baru Food Centre / 226H Ang Mo Kio Street 22 (568226), 84 Marine Parade
  Central (440084). Existing `lat`/`lng` on these rows were spot-checked against the fresh
  OneMap lookups and matched to within rounding — confirms these rows already had correct
  coordinates, they were just missing the `postal` field.
- **1 row** (`p1` for a Kopitiam-sourced Kebun Baru Food Centre stall etc.) included in the
  27 above under the Kebun Baru group.

Net: 0 premises now missing `postal`, 0 missing `address`, 0 missing `lat`/`lng`.

## What this doesn't cover yet

- McCafe and Nourish Bowl still have 0 premises — flagged in researchQueue.ts for future
  research rather than guessed.
- The 25 hawker-stall address backfills are building-level, not unit-level — a future pass
  could add real unit numbers where confidently verifiable.
- This document covers the "missing data" side of the address-accuracy audit. The
  "wrong/pooled data" side (8 venues sharing incorrect coordinates from a road-level
  licence pooling bug) is documented separately in
  `2026-08-24-address-accuracy-pooling-bug-fixes.md`.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,774 → 1,772 brands (Wendy's,
Superfood Kitchen removed), 4,708 → 4,705 premises (5 removed: Wendy's, Superfood Kitchen,
McCafe placeholder, Nourish Bowl placeholder, old Grain placeholder; 2 added: new Grain
premises), 892 → 879 menu items (13 removed with Wendy's/Superfood Kitchen). 0 duplicate
brand ids, 0 orphaned premises, 0 orphaned menu items, 0 missing lat/lng, 0 missing
address, 0 missing postal (confirmed via a temporary `verifyW.ts` script, deleted after
use). Build-mirror diff confirms live and mirror files are byte-identical.
