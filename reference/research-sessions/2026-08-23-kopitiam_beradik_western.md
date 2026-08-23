# Research session — 2026-08-23 — kopitiam_beradik_western

## Track
Restaurants/food court/hawker/coffeeshop/canteen (`platescreen-research-restaurants`).

## Queue entry selected
`kopitiam` (priority: high, first pending entry in this track after deterministic
priority sort). Per this entry's accumulated notes, the "Kopitiam" queue row does not
correspond to a Brand of its own — Kopitiam was restructured on 2026-08-22 from a
single mega-Brand into an Operator with 839 individually named concession Brands
(`operatorId: 'kopitiam'`), none of which had MenuItems yet. Per the established
pattern from the two prior passes on this entry (2026-08-23 1st/2nd pass:
`kopitiam_kopi_kiosk`, `kopitiam_chinatown_roasted`), this run's real unit of work is
picking one more of those 839 brands and researching its menu — not creating a new
"Kopitiam" Brand (which would recreate exactly the mega-brand pattern the restructure
reverted).

## Selection method
1. Loaded `BRANDS` and filtered to `operatorId === 'kopitiam'` → 839 brands.
2. Loaded `MENU_ITEMS`, collected the set of `brandId`s that already have at least one
   item → 163 distinct brands covered.
3. Subtracted: 837 kopitiam-operator brands still had zero MenuItems (matches the
   count stated in the queue entry's notes from the prior pass).
4. Cross-referenced each against `reference/data/kopitiam-stall-dishes.json` (scraped
   dish names keyed by brand name, from the 2026-08-22 sitemap scrape) and kept only
   candidates with ≥4 scraped dish names, to have enough raw material for 3+ credible,
   non-duplicate items.
5. Picked **Beradik Western** (`kopitiam_beradik_western`) — a Western-food kopitiam
   concession stall — because its scraped dish list mapped cleanly onto real, macro-
   distinguishable dishes and this project already has a directly relevant calibration
   analog (Aston's Specialities) for Western hawker/casual fare.

## Outlet
**Beradik Western** (`kopitiam_beradik_western`) — Brand + Premises rows already
existed (2026-08-22 scrape): 5 locations — Changi Airport T3, Plaza Singapura, Tan
Tock Seng Hospital, Bagus Food Hall @ Northpoint City, AMK Hub. `priceRange: "$"`,
`type: "food_court_stall"`, `operatorId: "kopitiam"`. No changes made to Brand/Premises
this run.

## Menu items added (6, all `confidence: "estimated"`)

| Item | Price | Cal | Protein | Carbs | Fat |
|---|---|---|---|---|---|
| Chicken Chop | $6.50 | 650 | 34g | 55g | 30g |
| Fish & Chips | $6.80 | 680 | 26g | 60g | 32g |
| Chicken Chop Aglio Olio | $7.50 | 720 | 36g | 70g | 28g |
| Crispy Chicken Cutlet With Rice | $6.00 | 700 | 32g | 75g | 26g |
| Grilled Chicken Steak | $7.00 | 480 | 42g | 30g | 18g |
| Chicken Bolognese | $6.50 | 620 | 28g | 78g | 18g |

**Basis / confidence reasoning:** No outlet-specific official source exists for this
individual hawker-tier stall (not a chain with its own nutrition page, no HPB entry).
Macros were calibrated off this project's own existing `astons_chicken_chop` (420 cal /
40g protein / 8g carbs / 24g fat, à la carte protein-only) and `astons_fish_chips`
(560 / 28 / 52 / 26, à la carte) entries — the closest analog already in the database
for Singapore Western/hawker-casual fried chicken and fish dishes — then adjusted:
- Scaled **up** in calories/carbs to reflect that a hawker-stall "set" bundles the
  protein with a starch side (fries, rice, or pasta) on one plate, unlike Aston's
  separately-priced à la carte sides.
- Scaled **down** in price to match this stall's existing `priceRange: "$"` (budget
  food-court concession) vs. Aston's `Western Casual` sit-down tier.
- Grilled Chicken Steak kept leaner (lower fat/calories) than the fried items, since
  it's grilled rather than battered/fried — a real, non-arbitrary distinction in
  Singapore hawker Western-stall menus.
- Chicken Chop Aglio Olio and Chicken Bolognese both use pasta instead of fries, so
  carbs/calories were pushed higher relative to the base Chicken Chop, consistent with
  swapping a starch side.

**Skipped near-duplicates:** the scraped dish list included both "Fish & Chips" and
"Fish and Chip" (same dish, spelling variant) — only one item was added.

## SFA registration
Not attempted — Phase 3 is skipped for this run per the SKILL.md, since the Brand
already existed with a Premises row from the 2026-08-22 scrape (real SFA-adjacent data
was not part of that scrape for Kopitiam concessions; Kopitiam premises are typically
licensed at the food-court-building level, not per internal stall, per the Operator
model in `types/db.ts`).

## Typecheck
`npx tsc --noEmit` run against a sandboxed copy of the project (excluding
`node_modules`, `.next`, `out`, `.git`, `reference`) after `npm install` — **passed
with no errors**.

## Queue status
Left `pending` — 836 of the 839 kopitiam-operator brands still have zero MenuItems.
Updated the `kopitiam` queue entry's `notes` field in `researchQueue.ts` with this
run's summary, per the established pattern.
