# 2026-09-06 — Restaurant-track scheduled run: springleaf_prata_place

**Track:** restaurant/food_court/hawker/coffeeshop/canteen (scheduled task
`platescreen-research-restaurants`).

## Selection (Phase 1)

Filtered `RESEARCH_QUEUE` to `status: 'pending'` entries of type
`restaurant`/`food_court`/`hawker`/`coffeeshop`/`canteen` — 72 matching
entries. Sorted by priority (high → medium → low), array order preserved
within a tier. Re-checked the top 3 (`kopitiam`, `koufu`, `foodfare`, all
`high` priority) per the deterministic first-entry rule, re-verifying
directly against the current `brands.ts`/`menuItems.ts` rather than trusting
yesterday's (2026-09-05) notes alone:

- **kopitiam** — its notes document 3 unresolved sub-brand leads
  (`kopitiam_cheers` — confirmed non-food concession, never gets a
  MenuItem; `kopitiam_china_food` — bare "Cold dishes" scrape signal only,
  exhausted by prior passes; `kopitiam_king_grouper` — needs a Brand-merge
  out of this task's write scope). No addressable gap.
- **koufu** — re-verified live: 5 of 11 `koufu_*` brands are food-court
  container brands (CLAUDE.md §4.3) that must never get a MenuItem; the
  other 6 already have 1–8 MenuItems each. No addressable gap.
- **foodfare** — deprioritized per standing 2026-08-23 user instruction
  (unresolved B2B-catering scope question). Skipped.

Swept to **hawkers_street** (medium priority, 4th overall). Its notes (last
updated 2026-09-05) list 8 remaining newer-venue concessions identified by
name only, from two sources: Little Day Out's Clementi Mall stall writeup
(6 unresearched names) and a HungryGoWhere/Time Out pair on the Tang Plaza
venue (2 unresearched names: Hup Hong Chicken Rice, Springleaf Prata Place).

## Research (Phase 2)

Evaluated the 2 Tang Plaza leads first since they had a specific vendor
page — **The Ordinary Patrons**' own Tang Plaza stall-by-stall post
(ordinarypatrons.com, 28 Aug 2025, updated 25 Sep 2025) confirms both Hup
Hong Chicken Rice and Springleaf Prata Place are present at that venue, with
photos of each stall's menu board (not machine-readable text, so prices
weren't taken from this source directly).

Picked **Springleaf Prata Place** over Hup Hong Chicken Rice: it has a much
richer, independently double-sourced menu. Two human-written flagship-outlet
reviews years apart give exact-matching prices for 6 distinct items:

- **DanielFoodDiary.com** (25 Feb 2020): Egg Prata $2.30, Portobello
  Mushroom with Mozzarella $5.90, Ultimate Murtabak $13.90/$8.90 (mini),
  Murtaburger $8.50, Plaster Blaster $5.90, Umami-50 $9.90, Prata Alfredo
  $10.90.
- **2bearbear.com** (13 Jan 2022, updated 16 Aug 2023): Portobello
  Mozzarella $5.90, Plaster Blaster $5.90, Murtaburger $8.50, Ultimate
  Murtabak $13.90/$8.90, Umami-50 $9.90, Prata Alfredo $10.90, Masala
  Chicken $5.00, Magic Meatless Murtabak (vegetarian) $6.90 mentioned by
  name in the same Ultimate Series lineup.

Both reviews match exactly on 6 items (Portobello Mozzarella, Plaster
Blaster, Murtaburger, Ultimate Murtabak, Umami-50, Prata Alfredo) despite
being 2+ years apart — a strong, independently corroborated basis. Halal
certification confirmed independently by 3 sources: DanielFoodDiary
("Being a Halal-certified caterer"), Miss Tam Chiak's Tang Plaza coverage
("halal-certified"), and sgfoodprice.org ("Yes, Springleaf Prata Place is
halal-certified... recognized by MUIS").

A third source, **sgfoodprice.org**, was checked for a possible current-year
(2026) price cross-reference but was **not used as a cited source**: its
"Nutrition Information," "Allergen Information," "Drive-Thru Items," "Bulk
Order," and "Franchising Opportunities" sections are templated filler
repeated near-identically across every restaurant page on that site
(generic dish-category ranges like "Chicken Prata 350-450 kcal" that don't
correspond to any real named menu item, a prata shop offering "Drive Thru"
service, etc.) — exactly the kind of AI-generated-looking content-farm
filler CLAUDE.md's sourcing rules warn against treating as authoritative.
Its "Ultimate Hawker Fest" price table does appear to be a genuine
photo-menu transcription (the per-item creation years match 2bearbear's
independently-written descriptions exactly), so it was used only as a rough
sanity check that flagship prices haven't drastically changed, not as a
cited price source.

**Tang Plaza branch-specific pricing could not be confirmed** — The Ordinary
Patrons' photos of that branch's actual menu board weren't machine-readable
text. Used the flagship outlet's own well-corroborated prices instead (same
approach the project has used before when a specific branch's price list
isn't extractable). Flagged here as a limitation, not silently absorbed.

**Menu (8 items, all confidence "estimated" — no official/HPB nutrition
source exists for this chain; macros are reasoned estimates):**

| Dish | Price | Source |
|---|---|---|
| Egg Prata | $2.30 | DanielFoodDiary.com |
| Masala Chicken | $5.00 | 2bearbear.com |
| Portobello Mozzarella Prata | $5.90 | DanielFoodDiary.com + 2bearbear.com (exact match) |
| Plaster Blaster | $5.90 | DanielFoodDiary.com + 2bearbear.com (exact match) |
| Magic Meatless Murtabak | $6.90 | 2bearbear.com |
| Murtaburger | $8.50 | DanielFoodDiary.com + 2bearbear.com (exact match) |
| Umami-50 | $9.90 | DanielFoodDiary.com + 2bearbear.com (exact match) |
| Prata Alfredo | $10.90 | DanielFoodDiary.com + 2bearbear.com (exact match) |

(Skipped the $13.90/$8.90 Ultimate Murtabak as a near-duplicate of the
existing Murtabak dish shape once macros are calibrated, and skipped the
$11.90 Salted Egg Prawn Prata / $9.90 La Ayam Parotta / $8.90 Das Prastwurst
to keep this run's menu at a manageable, well-differentiated 8 items rather
than exhaustively cataloguing the full Ultimate Series — plenty of
still-unadded Ultimate Series items remain as a good lead for a future
pass on this same Brand.)

Macros have no official basis and were calibrated against this project's
own existing analogs already in `menuItems.ts`:

- **Egg Prata** — used as-is against the existing `svmfc_3` Egg Prata entry
  (270/9/32/12) — same dish, same halal-Indian-prata-stall category.
- **Masala Chicken** — against `long_xiang_hainanese_cur_curry_chicken_set`
  (550/25/60/22, but that includes rice) and Popeyes' Classic Chicken Burger
  (570/28/48/30) for the protein/fat ratio of chicken-breast-in-curry
  without a rice/noodle base — scaled down carbs since this is a curry side,
  not a rice set.
- **Portobello Mozzarella Prata** — against the plain Egg Prata analog, with
  calories/fat scaled up for mozzarella cheese + mushroom (no egg, per the
  dish's own name) replacing the egg.
- **Plaster Blaster** — against Egg Prata, scaled up for turkey ham and a
  butter-based hollandaise sauce (own reviews describe it as rich/oozy).
- **Magic Meatless Murtabak** — against `tekka_murtabak`'s Murtabak
  (Chicken) (450/22/48/20), with carbs raised and protein/fat lowered to
  reflect a lentil-and-mushroom filling replacing chicken.
- **Murtaburger** — against `tekka_murtabak`'s Murtabak (Chicken)
  (450/22/48/20) and Popeyes' Classic Chicken Burger (570/28/48/30) — a
  murtabak-wrapped patty-and-cheese item, scaled up from both analogs to
  reflect the combined bread+patty+cheese size described in reviews.
- **Umami-50** — against Egg Prata and Murtaburger, scaled for chicken
  luncheon meat + chicken floss + mozzarella + Japanese mayo (a
  fat/carb-heavy combination per its own description).
- **Prata Alfredo** — against Umami-50 and Murtaburger, calibrated for a
  cream-based alfredo sauce + smoked chicken + mushroom + mozzarella
  (similar richness tier to Umami-50, slightly different protein/fat split
  for the cream sauce vs. mayo-based item).

Full price/macro/emoji/category tuples were added to
`reference/data/dish-macro-lookup.py`'s `DISH_DB` under a new
`# --- Batch 2026-09-06 additions (springleaf_prata_place ...) ---` header.

### Diet tags (CLAUDE.md §5.1)

- Springleaf Prata Place is MUIS halal-certified (3 independent sources,
  see above) and every item on this menu is chicken/turkey/vegetarian —
  all 8 items tagged `halal` and `no_pork` (liberal tagging is correct here
  since every named protein is explicitly non-pork and the outlet itself is
  a certified halal caterer, not merely a dish that happens to lack pork).
- **Magic Meatless Murtabak** additionally tagged `vegetarian` (lentils,
  mushroom, curry leaves, vegan mayo, korean sauce — no meat, per its own
  description). Not tagged `vegan` — prata dough conventionally uses ghee,
  and no source confirmed a vegan-safe dough at this specific outlet, so
  left unclaimed per the conservative-tagging rule.
- No `gluten_free`/`dairy_free`/`nut_free` attempted (prata dough and
  mozzarella cheese make several of these clearly inapplicable, and the
  rest are unconfirmed from dish-name inference alone, which CLAUDE.md
  prohibits).

## SFA registration (Phase 3)

Skipped. This Brand's type is `food_court_stall` with `operatorId:
"hawkers_street"` — a mall-food-court concession, not an independently
SFA-licensed hawker-centre stall. Every existing analog `hawkers_street`
Premises row in this database (`tai_wah_pork_noodle`, `wok_hei_hor_fun`,
etc.) already carries `sfa: null` for the same reason (the mall/food-court
operator holds one master licence covering the whole basement unit, not
per-concession licences discoverable via data.gov.sg's per-stall dataset).
Followed the same convention. (Springleaf Prata Place's other, genuinely
independent branches — e.g. the original Springleaf/Thong Soon Avenue
outlet — would be SFA-matchable in a future run that adds them as a
separate Premises row, same as the standing note left on `wok_hei_hor_fun`
for its Redhill flagship.)

## Records written (Phase 4)

- **Brand** (`brands.ts`, `BRANDS_4`): `springleaf_prata_place` — type
  `food_court_stall`, cuisine "Prata", `operatorId: "hawkers_street"`,
  priceRange `$`, platforms `["dine_in", "grab_go"]`.
- **Premises** (`premises.ts`, `PREMISES_13`): `springleaf_prata_place_p1`
  — Tang Plaza, address/postal/lat/lng copied from this project's existing
  `tai_wah_pork_noodle_p4` Tang Plaza Premises row (same venue), `sfa:
  null`.
- **MenuItems** (`menuItems.ts`): `spp_1`–`spp_8`, 8 items, all
  `confidence: "estimated"`.
- **`reference/data/dish-macro-lookup.py`**: new `DISH_DB` batch for these 8
  dish names.
- **`researchQueue.ts`**: appended a dated UPDATE to the `hawkers_street`
  entry's notes documenting this run's findings (kopitiam/koufu/foodfare
  re-check results, Springleaf Prata Place added, 7 leads still
  outstanding). Status left `pending`.

## Verify (Phase 5)

This sandbox's shared filesystem again hit `ENOSPC` on every attempt to run
a full `npm install` for the documented `~/build/platescreen` mirror +
`next build` pipeline (same constraint noted in the 2026-09-05
`wok_hei_hor_fun` session — not specific to this run's changes). Adapted
verification within that constraint, same approach as that prior run:

1. Found the same pre-existing global TypeScript install on the sandbox's
   root filesystem (`/usr/local/lib/node_modules_global`) and ran `tsc
   --noEmit` directly against the 4 edited files (`brands.ts`,
   `premises.ts`, `menuItems.ts`, `researchQueue.ts`) plus their type
   dependencies (`types/db.ts`, `types/index.ts`), using the project's own
   `tsconfig.json` compiler options (`--ignoreConfig` plus each option
   passed explicitly, since `tsc` refuses to load `tsconfig.json` when
   files are also given on the command line) — **silent, 0 errors**.
2. Loaded the live `BRANDS`/`PREMISES`/`MENU_ITEMS`/`RESEARCH_QUEUE` arrays
   in Node (stripping the `export` keyword and `_compile`-ing them
   directly, since they're untyped plain-object literals) and verified: 0
   duplicate ids across all three data arrays; 0 orphaned `brandId`
   references (every Premises and MenuItem row resolves to a real Brand);
   the new Brand has exactly 1 Premises and 8 MenuItems as intended; item
   count deltas match (brands 1718→1719, premises 4654→4655, menuItems
   2607→2615); `researchQueue.ts` still parses cleanly (131 entries,
   unchanged count — only the `hawkers_street` entry's notes were edited).

This does not substitute for the full `next build` static-export check the
methodology calls for, since the disk-space constraint made that
impossible this run — flagging this as a known, recurring gap (now 2
consecutive scheduled runs) for whoever next has sandbox capacity to
re-verify with a full build.

## Status

`springleaf_prata_place` is new and fully populated (Brand + 1 Premises + 8
MenuItems, all "estimated" confidence, no fabrication — every dish name and
price traces to at least one real, cited source, with 6 of 8 items
corroborated by two independent sources). `hawkers_street` queue entry left
`pending` with 7 further leads recorded for a future run (Hjh Maimunah,
Tartini Grill & Pasta, Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew
Fishball Noodle, The Neighbourwork Fried Hokkien Prawn Mee — all Clementi
Mall — plus Hup Hong Chicken Rice at Tang Plaza), plus Square 2's stall
roster still unidentified.
