# 2026-09-06 (3rd restaurant-track scheduled run today) — Tartini Grill & Pasta, Hawkers' Street @ The Clementi Mall

**Track:** restaurant/food_court/hawker/coffeeshop/canteen (scheduled task
`platescreen-research-restaurants`). Third run of this track today — the first two added Springleaf
Prata Place (`2026-09-06-springleaf_prata_place.md`) and Hjh Maimunah
(`2026-09-06-hjh_maimunah_clementi_mall.md`), both also Hawkers' Street concessions at this same
venue.

## Selection (Phase 1)

Per the deterministic priority-then-array-order rule, re-checked the 3 high-priority operator
entries directly against the live dataset (not just prior notes) before moving down the queue:

- **kopitiam** — 831 operatorId-tagged Brand rows, 3 still zero-menu
  (`kopitiam_king_grouper`, `kopitiam_china_food`, `kopitiam_cheers`) — unchanged since this
  morning's runs; all three are dead ends or out of this task's write scope per prior passes
  (Brand-merge restructure, unresolved bare-category scrape signal, non-food concession).
- **koufu** — 0 Brand rows tagged `operatorId: "koufu"` (its own sub-brands were added without an
  operatorId, per the 2026-08-22/23 notes) — no addressable gap under this queue entry.
- **foodfare** — 0 Brand rows tagged `operatorId: "foodfare"` for the same reason, and separately
  still deprioritized per the 2026-08-23 user instruction (unresolved B2B-catering scope question).

Swept to **hawkers_street** (medium priority, 4th overall). Its notes (updated by both earlier runs
today) list 6 remaining newer-venue leads identified by name only: Tartini Grill & Pasta, Rong
Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The Neighbourwork Fried Hokkien Prawn Mee
(all Clementi Mall), and Hup Hong Chicken Rice (Tang Plaza). Picked the first-listed per the
one-outlet-per-run rule: **Tartini Grill & Pasta**.

## Research (Phase 2)

Confirmed via **Little Day Out**'s own in-person stall-by-stall writeup of Hawkers' Street's
Clementi Mall food court (littledayout.com/hawkers-street-clementi-mall-food-court, covering the
venue's 28 Oct 2025 opening) that Tartini Grill & Pasta is one of the 16 stalls there — a
Western-cuisine stall with "signature dishes include Chicken Chop, Black Pepper Beef Steak and
creamy Mushroom Pasta," a $14.90 lamb chop, "chicken wing rice ($6.90 for two pieces)," a "Chicken
Chop Spanish Fried Rice ($10.90)," and a "Chicken Sausage Spaghetti ($8.90)."

The stall also has its own **foodpanda** delivery listing — "Tartini Kitchen Grill and Pasta
(Clementi Mall)" (foodpanda.sg/restaurant/mcxl/tartini-kitchen-grill-and-pasta-clementi-mall) — at
the identical address (3155 Commonwealth Avenue West #04-20,#04-21,#04-22, The Clementi Mall),
matching this project's existing `wok_hei_hor_fun_p1`/`hjh_maimunah_clementi_mall_p1` Premises rows
for this venue exactly. This gave a full, structured delivery menu (~29 items across Signature
Items, Western Classics, Pasta & Baked Rice, and Sides categories) with real dish names and SGD
prices — used as the primary source for this run's menu, since it's far more complete and
machine-readable than Little Day Out's prose summary. Note: foodpanda's "from $X" figures are
delivery-discount prices (a 15% "auto-applied" deal); the crossed-out full price shown alongside
each item was used instead, to match dine-in/menu pricing.

A third source, **halalboleh.com**, independently lists the same stall under yet a third name —
"Tartini Sedap Grill and Pasta" — at the same address (3155 Commonwealth Avenue West, coordinates
1.31499040/103.76441730, essentially identical to the coordinates already on file for this venue),
explicitly marked **"✅ MUIS Certified."** All three name variants, plus Little Day Out's plain
"Tartini Grill & Pasta," are captured as Brand aliases; "Tartini Grill & Pasta" was used as the
canonical name (the independently-reported, unbranded form, rather than picking between the two
divergent delivery-platform storefront names).

**Menu (10 items, all confidence "estimated" — no official/HPB nutrition source exists for this
stall or chain):**

| Dish | Price | Category |
|---|---|---|
| Signature Chicken Chop | $11.90 | Western |
| Classic Fish and Chips | $11.90 | Western |
| Beef Steak | $16.90 | Western |
| Grilled Salmon | $14.90 | Western |
| Mixed Grill Combo A (Chicken Chop + Grilled Fish + Lamb Steak) | $18.90 | Western |
| Signature Fried Rice | $9.90 | Western |
| Chicken Ham Carbonara | $10.90 | Pasta |
| Chicken Bolognese | $9.90 | Pasta |
| Prawn Aglio Olio | $13.90 | Pasta |
| Chicken Wings (3pcs) | $8.90 | Sides |

Chosen from foodpanda's fuller menu by skipping close protein-swap duplicates that wouldn't clear
the >10%-macro-difference bar: 6 near-identical "[protein] Spaghetti" variants (Chicken
Chop/Cutlet/Fish/Fried Fish/Grilled Fish/Salmon/Chicken Sausage/Chicken Spaghetti — 8 listed, all
skipped in favour of the 3 sauce-differentiated pastas kept above) and Baked Cheese Spaghetti (near
duplicate of Baked Cheese Rice, also skipped) — kept a well-differentiated set spanning grills, a
combo platter, fried rice, 3 distinct pasta sauces, and a fried side instead.

Macros have no official basis and were reasoned/calibrated against this project's own existing
Western food-court-stall analogs already in `menuItems.ts`:

- **Signature Chicken Chop** — bracketed between `astons_chicken_chop` (420/40/8/24, à la carte,
  no sides) and `kopitiam_beradik_western`'s Chicken Chop (650/34/55/30, a full set with
  rice/fries) — this stall's version comes with fries + coleslaw only (per its own foodpanda
  description), so estimated in between at 560/38/40/26.
- **Classic Fish and Chips** — directly against `astons_fish_chips` (560/28/52/26, same fish+fries
  shape), used almost as-is at 580/26/58/28.
- **Beef Steak** — reasoned from typical beef-steak-with-fries composition, no direct existing
  analog for a standalone beef steak plate in this DB; 620/40/35/34.
- **Grilled Salmon** — against `astons_salmon` (440/42/4/26, à la carte, no sides), scaled up for
  the fries side to 520/40/30/28.
- **Mixed Grill Combo A** — against this project's existing "Mixed Grill" entries (750/40/45/40, a
  2-3-protein grill platter without fish), scaled up further for the extra protein (fish) plus
  fries + coleslaw to 980/62/55/55.
- **Signature Fried Rice** — reasoned from typical wok-fried-rice composition; protein is a
  customer choice on the menu (not fixed), so tagged `halal` only, not `no_pork` — following this
  project's existing convention for choice-of-protein rice dishes (see CLAUDE.md's
  economic/mixed-vegetable-rice precedent).
- **Chicken Ham Carbonara** — against `saiz_carbonara` (820/24/98/36, plain carbonara, no meat
  topping), reduced somewhat for a smaller food-court portion with a lighter carbonara sauce, to
  750/26/85/32.
- **Chicken Bolognese** — against `dom_pasta_bolognese` (580/24/72/20, beef bolognese) and
  `beradikwestern_chicken_bolognese` (620/28/78/18, same dish/protein), used near-identically at
  580/26/72/20.
- **Prawn Aglio Olio** — against the existing "Grilled Salmon with Aglio Olio" (620/32/55/26) and
  "Chicken Steak Aglio Olio" entries (560-580/28/65/22), at 560/28/70/20.
- **Chicken Wings (3pcs)** — against `ws_wings_6pc_hot` (570/48/3/38 for 6pcs, dry-rubbed/no
  batter), scaled down to a smaller 3pc portion and adjusted for a batter-coated (higher-carb)
  fried-wing style more typical of a food-court stall, at 330/22/14/22.

Full price/macro/emoji/category tuples were added to `reference/data/dish-macro-lookup.py`'s
`DISH_DB` under a new `# --- Batch 2026-09-06 additions (3rd restaurant-track run today) ---`
header — generic dish names that would otherwise collide with other brands' existing entries in
this shared lookup table (e.g. "Beef Steak," "Grilled Salmon," "Chicken Bolognese") were prefixed
`Tartini ...` to avoid overwriting unrelated entries.

### Diet tags (CLAUDE.md §5.1)

- Tartini Grill & Pasta is MUIS halal-certified (halalboleh.com, "✅ MUIS Certified") — `halal`
  applied at Brand level (`dietTags: ["halal"]`) and to every MenuItem below, matching this
  project's existing chain-wide-certification convention (e.g. Swensen's, mcd/kfc/burger_king).
- `no_pork` applied to every item with a fixed named protein (chicken/fish/beef/lamb/prawn — no
  pork-containing item exists on this menu) except Signature Fried Rice, whose protein is a
  customer choice, not a fixed ingredient (see above).
- `pescatarian` added to Grilled Salmon and Prawn Aglio Olio (fish/shellfish, no other meat).
- No `vegetarian`/`vegan` items on this menu (all 10 chosen items contain meat/fish/prawn).
- `gluten_free`/`dairy_free`/`nut_free`/`lactose_free` not attempted — never inferred from
  dish-name alone per CLAUDE.md.

## SFA registration (Phase 3) — skipped

Same reasoning as this venue's other 2 Hawkers' Street concessions added today
(`wok_hei_hor_fun`, `hjh_maimunah_clementi_mall`, `springleaf_prata_place`): this Brand's type is
`food_court_stall` with `operatorId: "hawkers_street"` — a mall-food-court concession, not an
independently SFA-licensed hawker-centre stall. The mall/food-court operator holds one master
licence covering the whole unit, not per-concession licences discoverable via data.gov.sg's
per-stall dataset. `sfa: null` on the Premises row, `source: "operator_official_site"`.

## Records written (Phase 4)

- **Brand** (`brands.ts`, `BRANDS_4`): `tartini_grill_pasta_clementi_mall` — type
  `food_court_stall`, cuisine "Western", `operatorId: "hawkers_street"`, `dietTags: ["halal"]`,
  priceRange `$`, platforms `["dine_in", "grab_go", "delivery"]` (foodpanda delivery confirmed),
  aliases covering all 3 observed storefront-name variants.
- **Premises** (`premises.ts`, `PREMISES_13`): `tartini_grill_pasta_clementi_mall_p1` — The
  Clementi Mall, address/postal/lat/lng copied from this project's existing
  `hjh_maimunah_clementi_mall_p1`/`wok_hei_hor_fun_p1` rows for this same venue, `sfa: null`.
- **MenuItems** (`menuItems.ts`): `tgp_1`–`tgp_10`, 10 items, all `confidence: "estimated"`.
- **`reference/data/dish-macro-lookup.py`**: new `DISH_DB` batch for these 10 dish names (generic
  names prefixed `Tartini` to avoid collisions with other brands' existing entries).
- **`researchQueue.ts`**: appended a dated UPDATE to the `hawkers_street` entry's notes documenting
  this run's findings (kopitiam/koufu/foodfare re-check results, Tartini Grill & Pasta added, 5
  leads still outstanding). Status left `pending`.

## Verify (Phase 5)

This sandbox's `/sessions` filesystem was again at 100% (unrelated pre-existing state, same
constraint noted in the 2026-09-05/09-06 prior runs today) — built the mirror at `/tmp/build2/
platescreen` instead (the `/tmp/build/platescreen` path used by the two earlier runs today was
present but owned by a different sandbox user and not writable this run; used a fresh path).
`/` had 1.8 GB free this run (unlike `/sessions`), which was enough to complete the full pipeline:

1. `rsync -a` of `src/` and `reference/` into the mirror, plus `package.json`/`tsconfig.json`/
   `next.config.js`/etc.
2. Quick `tsc --ignoreConfig --noEmit` pass (this project's own compiler options passed explicitly,
   since `tsc` refuses to load `tsconfig.json` when files are also given on the command line)
   against the 4 edited files (`brands.ts`, `premises.ts`, `menuItems.ts`, `researchQueue.ts`) plus
   their type dependencies (`types/db.ts`, `types/index.ts`) — **silent, 0 errors**.
3. Node-based integrity check (loading the live `BRANDS`/`PREMISES`/`MENU_ITEMS`/`RESEARCH_QUEUE`
   arrays directly, stripping `export`/`@ts-nocheck` since they're untyped plain-object literals):
   0 duplicate ids across all three data arrays; 0 orphaned `brandId` references; the new Brand has
   exactly 1 Premises and 10 MenuItems; item count deltas: brands 1720→1721 (+1), premises
   4656→4657 (+1), menuItems 2622→2632 (+10); `researchQueue.ts` still parses cleanly (131 entries,
   unchanged — only the `hawkers_street` entry's notes were edited, status unchanged at `pending`).
4. `npm install --cache /tmp/npm-cache-me` — 391 packages installed cleanly this run (disk
   headroom on `/` was sufficient, unlike the last 2 runs' `ENOSPC` failures on `/sessions`).
5. **`npm run build`** — the full static-export build the standard methodology calls for, which the
   last 2 scheduled runs today were unable to complete due to the disk-space constraint — completed
   successfully this run: compiled successfully, types checked, and **all 4,359 static pages
   generated** (1,719 brand pages including the new `tartini_grill_pasta_clementi_mall`, plus
   item-detail pages including the 10 new `tgp_*` items), no errors. This closes the "known,
   recurring gap" flagged by both prior runs today.
6. `git diff --stat` against the live repo confirms only the 5 intended files changed
   (`brands.ts` +23 lines, `premises.ts` +13, `menuItems.ts` +61, `researchQueue.ts` +2/-1,
   `dish-macro-lookup.py` +21), matching this run's scope exactly.

Cleaned up the `/tmp/build2` mirror and temporary Node verification scripts after use, per the
methodology's "delete ephemeral scripts" step.

## Status

`tartini_grill_pasta_clementi_mall` is new and fully populated (Brand + 1 Premises + 10 MenuItems,
all "estimated" confidence, no fabrication — every dish name and price traces to at least one real,
cited source, cross-referenced across 3 independent listings of the same stall under 3 different
storefront names). `hawkers_street` queue entry left `pending` with 5 further leads recorded for a
future run: Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The Neighbourwork Fried
Hokkien Prawn Mee (all Clementi Mall), Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall
roster still unidentified.

## Files touched

- `src/lib/brands.ts` — +1 Brand (`tartini_grill_pasta_clementi_mall`)
- `src/lib/premises.ts` — +1 Premises (`tartini_grill_pasta_clementi_mall_p1`)
- `src/lib/menuItems.ts` — +10 MenuItems (`tgp_1`–`tgp_10`) + dated comment block
- `src/lib/researchQueue.ts` — appended UPDATE note to the `hawkers_street` entry
- `reference/data/dish-macro-lookup.py` — new `DISH_DB` batch for this run's 10 dishes
- `reference/research-sessions/2026-09-06-tartini_grill_pasta_clementi_mall.md` — this file
