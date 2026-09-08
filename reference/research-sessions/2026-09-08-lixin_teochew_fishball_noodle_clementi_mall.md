# 2026-09-08 (restaurant-track scheduled run, 2nd pick this run) — Lixin Teochew Fishball Noodle, Hawkers' Street @ The Clementi Mall

**Track:** restaurant/food_court/hawker/coffeeshop/canteen (scheduled task
`platescreen-research-restaurants`). This is a second pick within the same
day — an earlier run today already researched `malalah_clementi_mall` (see
`2026-09-08-malalah_clementi_mall.md`) and updated the `hawkers_street`
queue notes to leave 3 further leads for a future run.

## Selection (Phase 1)

Re-checked the 3 high-priority operator entries directly against the live
dataset (not just prior notes), per the deterministic rule:

- **kopitiam** — still exactly 3 zero-menu operatorId-tagged brands
  (`kopitiam_king_grouper`, `kopitiam_china_food`, `kopitiam_cheers`) —
  unchanged, same dead-ends/out-of-scope as every prior pass.
- **koufu** — still 0 Brand rows tagged `operatorId: "koufu"`; its 6
  standalone sub-brands remain fully covered.
- **foodfare** — still 0 Brand rows tagged `operatorId: "foodfare"`, still
  deprioritized per the 2026-08-23 user instruction.

Swept to **hawkers_street** (medium priority, 4th overall). Its notes
tracked 3 remaining leads after this morning's Malalah! run: Lixin Teochew
Fishball Noodle, The Neighbourwok Fried Hokkien Prawn Mee (both Clementi
Mall), Hup Hong Chicken Rice (Tang Plaza). Picked the first-listed per the
one-outlet-per-run rule: **Lixin Teochew Fishball Noodle**.

Checked `src/lib/brands.ts` directly for any existing Brand with this exact
id before starting — none existed under a Clementi Mall-specific id. Found
**4 pre-existing, differently-shaped `Lixin`-named Brand rows at other
venues** (`lau_pa_sat_bak_chor_mee` and `lau_pa_sat_lixin_fishball`, both at
Lau Pa Sat — themselves apparently overlapping/duplicative with each other
from earlier batches — plus `kopitiam_lixin_fish_ball_noodle` also at Lau Pa
Sat, and `canopy_bukit_canberra_lixin_fish_ball_noodles` and
`kim_keat_palm_market_and_food_centre_lixin_chao_zhou_fishball_noodle` at
yet other venues). Per CLAUDE.md §4.2, a shared name across venues is not
automatically the same business — none of these 4 records carry an SFA
licence match or any other identifier confirming common ownership with the
Clementi Mall stall, and this project's own precedent for every other
Hawkers' Street Clementi Mall concession added by this task (Malalah!, Hjh
Maimunah, Tartini, Rong Cheng) was a fresh, venue-specific Brand id rather
than a merge into an existing same-named record elsewhere. Followed that
same precedent here. The pre-existing 3-way overlap at Lau Pa Sat is flagged
in the queue notes for a future database-health-audit pass — not
investigated further, out of this task's scope.

## Research (Phase 2)

Confirmed via multiple independent sources that this is a real, currently
operating stall at this exact venue:

- **littledayout.com**'s in-person 16-stall opening writeup of Hawkers'
  Street @ The Clementi Mall names Lixin Teochew Fishball Noodle as one of
  the venue's Michelin-recognised stalls.
- **singaporepromo.com** ("Clementi Mall's New Food Court Has 5 Famous
  Stalls—LiXin, Hjh Maimunah And More") independently names it as one of the
  venue's headline stalls.
- **lixinfishball.com** (the brand's own official site) confirms the chain's
  history: founded 1968 by Lim Lee Seng at Bendemeer Road, moved to Toa
  Payoh in 1987, expanded to ION Orchard's Food Opera in 2009, and "ten more
  outlets in air-conditioned food courts and standalone shops" since —
  establishing this as a real, established multi-outlet Singapore heritage
  chain, not a one-off.
- **foodpanda.sg** (restaurant id `ogn0`, "Lixin Teochew Fishball Noodle
  (Hawkers' Street @ The Clementi Mall)") is a live, currently-operating
  delivery listing for this exact stall at this exact address, 4.7/5 from 22
  ratings — this is the primary menu/pricing source used below.

### Menu (real, stall-specific — not a generic estimate)

All 7 item names and prices are taken verbatim from this stall's own
foodpanda listing. No official calorie/macro figures were found published by
the brand or on HPB, so all macros are reasoned estimates, anchored on this
project's own existing "Teochew Fishball Noodle" DISH_DB calibration (a
basic $4.50 hawker portion = 400 cal / 20g protein / 55g carbs / 10g fat),
scaled per item for this stall's larger, higher-priced ($6.50–$11.70)
food-court/delivery portions and each item's specific composition (noodle
vs. soup-only, added minced meat/mushroom/dumplings):

| Item | Price | Confidence |
|---|---|---|
| Traditional Fishball Noodle | $8.80 | estimated |
| Lixin Signature Noodle | $11.70 | estimated |
| Mushroom Minced Meat Noodle | $10.60 | estimated |
| Fish Dumpling Soup | $8.80 | estimated |
| Fishball Soup | $6.50 | estimated |
| Fishcake | $5.20 | estimated |
| Sambal Meat Dumplings | $7.10 | estimated |

Two near-duplicate items on the foodpanda menu were deliberately skipped:
"Sambal Mushroom Meat Dumpling Noodle" (a sauce variant of Mushroom Minced
Meat Noodle, not a macro-distinct dish) and "Handmade Meatball Soup" /
"Handmade Meat Dumpling Soup" (near-duplicates of Fish Dumpling Soup at the
same price point) — kept the set to 7 representative, macro-distinct items
per CLAUDE.md §2 guidance.

### Diet tags (CLAUDE.md §5.1)

No `compatibleWith` array was assigned on any item:

- "Fishball Noodles" is on the standing no_pork skip-list (may traditionally
  carry pork lard/broth despite the dish name) — confirmed directly here by
  the brand's own site, which describes the noodles as served "topped with
  crispy lard and homemade chilli sauce."
- The brand's own site also confirms the fish dumpling's skin "wraps a
  juicy, fragrant pork filling" — this is a known pork ingredient, so
  Fish Dumpling Soup and Sambal Meat Dumplings get **no diet tag at all**
  (categorically excluded per §5.1), not a false-safe omission.
- `dietTags: []` at the Brand level — no MUIS halal certification found or
  claimed anywhere for this brand.
- `gluten_free`/`dairy_free`/`nut_free`/`lactose_free` not attempted, per
  standing project rule.

This matches the established pattern for every other "Fishball Noodles"
MenuItem already in this database (25+ existing instances checked directly
— none carry a `compatibleWith` array).

## SFA registration (Phase 3) — skipped

Same reasoning as this venue's other 5 Hawkers' Street concessions
(`wok_hei_hor_fun`, `hjh_maimunah_clementi_mall`, `springleaf_prata_place`,
`tartini_grill_pasta_clementi_mall`, `rong_cheng_rou_gu_cha_clementi_mall`,
`malalah_clementi_mall`): this Brand's type is `food_court_stall` with
`operatorId: "hawkers_street"` — a mall-food-court concession, not an
independently SFA-licensed hawker-centre stall. The mall/food-court operator
holds one master licence covering the whole unit, not per-concession
licences discoverable via data.gov.sg's per-stall dataset. `sfa: null` on
the Premises row.

## Records written (Phase 4)

- **Brand** (`brands.ts`, `BRANDS_4`): `lixin_teochew_fishball_noodle_clementi_mall`
  — type `food_court_stall`, cuisine "Fishball Noodles", `operatorId:
  "hawkers_street"`, `dietTags: []`, priceRange `$`, platforms
  `["dine_in", "grab_go", "delivery"]` (delivery confirmed live via this
  stall's own foodpanda listing).
- **Premises** (`premises.ts`, `PREMISES_13`):
  `lixin_teochew_fishball_noodle_clementi_mall_p1` — The Clementi Mall,
  address/postal/lat/lng copied from this project's existing Clementi Mall
  Premises rows for this same venue, `sfa: null`, `source: "web_research"`.
- **MenuItem** (`menuItems.ts`): 7 items (`ltfn_1`–`ltfn_7`), all confidence
  `"estimated"`, real venue-specific prices from foodpanda, reasoned macros.
- **`reference/data/dish-macro-lookup.py`**: added a dated `Batch
  2026-09-08` block with the 7 new dish-type entries (suffixed `(Lixin)`
  where a same-named generic entry already existed, to avoid colliding with
  the pre-existing "Fishball Soup"/"Fishcake"-style generic keys).
- **`researchQueue.ts`**: appended a dated UPDATE to the `hawkers_street`
  entry's notes documenting this run's findings (kopitiam/koufu/foodfare
  re-check results, the Lau Pa Sat duplicate-name flag, Lixin added, 2 leads
  still outstanding). Status left `pending`.

## Verify (Phase 5)

This sandbox's `/sessions` filesystem was still at 100% full this run
(pre-existing condition, unrelated to this run's edits — same as the past 3
days' reports) — built the mirror at `/tmp/ps-build/platescreen` instead
(`/` had 3.4G free):

1. `rsync -a` of the whole repo (excluding `node_modules`, `.next`, `out`,
   `.git`, `reference`) into the mirror.
2. `npm install --cache /tmp/npm-cache` — 394 packages installed cleanly.
3. `npx tsc --noEmit` — **silent, 0 errors**.
4. `npm run build` — **compiled successfully**, types checked, and **all
   4,377 static pages generated** (brand pages including the new
   `lixin_teochew_fishball_noodle_clementi_mall`, plus item-detail pages
   including the 7 new `ltfn_*` items), no errors.
5. Node-based integrity check (loading the live `BRANDS`/`PREMISES`/
   `MENU_ITEMS` arrays directly from the mirror, stripping
   `export`/`@ts-nocheck` since they're untyped plain-object literals): 0
   duplicate brand ids, 0 duplicate menu-item ids, 0 duplicate premises ids,
   0 orphaned `brandId` references across all premises and menu items; item
   count deltas: brands 1723→1724 (+1), menuItems 2640→2647 (+7), premises
   4659→4660 (+1); the new Brand resolves to exactly 1 Premises and 7
   MenuItems with the expected fields.
6. `diff` of all touched TS files (`brands.ts`, `premises.ts`,
   `menuItems.ts`, `researchQueue.ts`) between the live repo and the mirror
   — **byte-identical** on every file. `dish-macro-lookup.py` was excluded
   from the TS mirror (not part of the Next.js build); verified separately
   with `python3 -m ast` syntax check — parses cleanly.

Deleted the temporary Node verification scripts and the `/tmp/ps-build`
mirror after use, per the methodology's "delete ephemeral scripts" step.

## Git housekeeping

`.git/HEAD.lock` and `.git/index.lock` were present at session start (mtime
prior day, ~5h+ old). `fuser` on both returned no holding process and
`ps aux | grep git` showed nothing running — confirmed stale before
touching. Cleared via the established rename-not-delete workaround:
`mv .git/HEAD.lock .git/HEAD.lock.stale-20260908b` (and same for
`index.lock`). `git status` was clean before this run's edits.

## Status

`lixin_teochew_fishball_noodle_clementi_mall` is new and fully populated
(Brand + 1 Premises + 7 MenuItems, all confidence "estimated", real
stall-specific prices, no fabricated dish names). `hawkers_street` queue
entry left `pending` with 2 further leads recorded for a future run: The
Neighbourwok Fried Hokkien Prawn Mee (Clementi Mall), Hup Hong Chicken Rice
(Tang Plaza) — plus Square 2's stall roster still unidentified. A pre-existing
3-way duplicate/overlap among "Lixin"-named Brand rows at Lau Pa Sat was
flagged for a future database-health-audit pass but not fixed here (out of
scope for this task).

## Files touched

- `src/lib/brands.ts` — +1 Brand (`lixin_teochew_fishball_noodle_clementi_mall`)
- `src/lib/premises.ts` — +1 Premises (`lixin_teochew_fishball_noodle_clementi_mall_p1`)
- `src/lib/menuItems.ts` — +7 MenuItems (`ltfn_1`–`ltfn_7`) + dated comment block
- `reference/data/dish-macro-lookup.py` — +7 dish-type entries, dated comment block
- `src/lib/researchQueue.ts` — appended UPDATE note to the `hawkers_street` entry
- `reference/research-sessions/2026-09-08-lixin_teochew_fishball_noodle_clementi_mall.md` — this file
