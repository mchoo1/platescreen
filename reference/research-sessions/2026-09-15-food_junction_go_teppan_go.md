# 2026-09-15 — Go Teppan Go (Food Junction house brand)

**Track:** scheduled `platescreen-research-restaurants` run (restaurant/food_court/hawker/
coffeeshop/canteen track).

## Selection

Filtered the pending queue to this track's types (72 relevant pending entries) and sorted by
priority. The three high-priority entries (`kopitiam`, `koufu`, `foodfare`) and the top
medium-priority entry (`hawkers_street`) are all food-court **operator** container entries with
no Brand row of their own — re-checked against their own extensive prior-session notes and
re-confirmed none has an addressable single-outlet gap left this run (kopitiam: only
`kopitiam_king_grouper` [needs a Brand-merge restructure, out of this task's scope],
`kopitiam_china_food` [Street View/in-person is the only unexhausted path, unavailable in this
session], and `kopitiam_cheers` [non-food, never] remain; koufu/foodfare have 0
operator-tagged brands with zero MenuItems; hawkers_street's 27 stalls all have ≥1 MenuItem).

The bulk of the remaining medium-priority `hawker` entries are either bare SFA-licensee personal
names (task #29 — needs Street View/in-person identification, not text search) or raw
corporate-licensee-name duplicates of chains already covered elsewhere under a different Brand id
(Cold Storage, McDonald's, KFC, Pizza Hut, Domino's, Breadtalk, Bengawan Solo, etc.) — these need a
Premises-merge action onto the existing chain Brand, not a new-Brand research pass, per this
project's own documented precedent (see `kopitiam`'s queue notes on `kopitiam_king_grouper`).

Next real single-outlet candidate by priority, `gen_korean_bbq` (low), was re-checked via a fresh
WebSearch this run — still no findable, credibly-sourced Singapore outlet under this name (the
"Best Korean BBQ in Singapore 2026" roundups from middleclass.sg, theurbanlist.com, sgtop10.com,
and misslobang.com don't list it; one auto-generated aggregator page claiming a menu was not
treated as credible on its own). Consistent with the 2026-09-02 finding — left `pending`, not
touched further.

`food_junction` (medium priority, an operator entry with 4 already-added house-brand Brand rows)
was picked instead: its own notes flagged that 2 of its 4 house-brand concessions — Go Teppan Go
(`fj_1`) and Toast Junction (`fj_2`) — still carried only their original single generic MenuItem
each as of the 2026-09-03 run. Selected **Go Teppan Go**.

## Research

- **Official source:** `foodjunction.com/our-brands/` — confirms Go Teppan Go's "Must Try" list
  (Beef Tenderloin Steak, Soy Butter Chicken Chop, Sambal Kicap Chargrilled Squid Deluxe Set) and
  its venues (Nex, Westgate; also The Food Place @ Raffles City per other sources).
- **Menu/price source:** MakanCents (`makancents.com/stall/go-teppan-go`), a Singapore
  food-price-tracking site with photographed prices — 21 items listed for the Raffles City
  branch. The "Soy Butter Chicken Chop With Black Pepper Sauce" item independently confirms the
  official page's "Soy Butter Chicken Chop" Must Try, cross-verifying the source.
- No official nutrition/macro source exists for this teppanyaki concept (not HPB/HCS-listed, not
  packaged retail) — all items confidence `estimated`, macros reasoned/calibrated against this
  project's own existing comparable entries (sibling brand `food_junction_fireyaki`'s teppanyaki
  Western Set, `tartini_grill_pasta_clementi_mall`'s Grilled Salmon/Beef Steak,
  `teck_ghee_square_steakgrill_steak_house`'s Grilled Steak).

## Menu items added (9)

| id | name | price | cal | protein | carbs | fat | tags |
|---|---|---|---|---|---|---|---|
| gtg_1 | Soy Butter Chicken Chop With Black Pepper Sauce | $13.90 | 450 | 38 | 15 | 26 | no_pork |
| gtg_2 | Soy Butter Chicken Chop Deluxe Set | $22.90 | 750 | 42 | 70 | 32 | no_pork |
| gtg_3 | Signature Black Pepper Ribeye Steak | $18.90 | 680 | 42 | 18 | 44 | no_pork |
| gtg_4 | Honey Mustard Salmon Fillet | $15.90 | 540 | 38 | 22 | 30 | no_pork, pescatarian |
| gtg_5 | Miso Chargrilled Squid | $8.90 | 280 | 26 | 10 | 14 | no_pork, pescatarian |
| gtg_6 | Mixed Mushroom Medley | $9.90 | 220 | 8 | 20 | 12 | no_pork, vegetarian |
| gtg_7 | Teppan Vegetables | $2.90 | 90 | 3 | 12 | 4 | no_pork, vegetarian |
| gtg_8 | White Rice | $1.00 | 200 | 4 | 44 | 1 | no_pork, vegetarian |
| gtg_9 | Spring Onions Rolled Omelette | $5.00 | 180 | 10 | 4 | 13 | no_pork, vegetarian |

All confidence `estimated`. Skipped as near-duplicates: Black Pepper Sliced Beef/Chicken (à la
carte, same black-pepper-sauce format as items kept, no >10% distinguishing basis), their Deluxe
Set variants, Miso Chargrilled Salmon (near-dup of the kept Honey Mustard Salmon Fillet). Skipped
as non-dishes: Coca Cola Original/Zero, Bottled Water. Skipped as generic/redundant with kept
sides: Sunny-side Up Egg, Soup Of The Day.

No `halal` tag applied — Go Teppan Go's Brand `dietTags` are empty and no MUIS-certification
source was found specific to this brand (Ke/Quench's own description mentions a halal-certified
version "at selected locations" for itself only).

## SFA lookup

Not applicable — `food_court_stall` inside existing Premises rows already established
2026-08-23 for this Brand, not a new hawker/food_court_stall Brand.

## Verification

The sandbox's shared `/sessions` partition hit `ENOSPC` on every `npm install` attempt this run
(full project install, and even a standalone `typescript`-only install into `/tmp`) — same disk
constraint documented in the 2026-09-03 `food_junction_fireyaki` session. Full `tsc --noEmit` /
`npm run build` verification could not be run. Substituted manual verification:

- Loaded `menuItems.ts` in plain Node (stripping the `// @ts-nocheck` line and the `export`
  keyword) — file parses without error, **2,665 total items, 0 duplicate ids**.
- Confirmed all 9 new `gtg_*` entries present with every required `MenuItem` field
  (`id`/`brandId`/`name`/`emoji`/`category`/`price`/`calories`/`protein`/`carbs`/`fat`/
  `confidence`) and no shape mismatches.
- Confirmed `food_junction_go_teppan_go` already exists as a Brand id in `brands.ts` (pre-existing
  row, untouched by this run).
- Loaded `researchQueue.ts` similarly — parses without error, 131 total entries, `food_junction`
  entry's status/notes updated as intended.

Flagging here, as the 2026-09-03 report did, that a future run with working disk space should
re-run the full `tsc`/build verification on this addition.

## Files touched

- `src/lib/menuItems.ts` — added `gtg_1`–`gtg_9` + sourcing comment block.
- `src/lib/researchQueue.ts` — appended an UPDATE note to the `food_junction` entry; status left
  `pending` (Toast Junction `fj_2` still has only its original 1 generic item, and Food Junction's
  outlets likely still have other non-house-brand concessions not yet identified).

## Status / next steps

`food_junction` left `pending`. Remaining work on this entry: Toast Junction (`fj_2`) still needs
real menu research (same "1 generic item" gap Go Teppan Go had); the operator's outlets almost
certainly have other non-house-brand named concessions not yet identified (needs per-venue
Google Maps/on-site research, no bulk sitemap source found for Food Junction the way Kopitiam's
stall-sitemap worked). `gen_korean_bbq` remains correctly `pending` with no real SG outlet found.
The kopitiam/koufu/foodfare/hawkers_street operator entries remain exhausted under current
(no-browser, text-search-only) research constraints, same as documented in their own notes.
