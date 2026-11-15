# /data — PlateScreen's database (v2)

Since 2026-11-16 this folder is the **source of truth** for all food data.
Each table is one JSON file holding an array of rows, one row per line (so
git diffs stay readable). The shapes are defined in `src/db/schema.ts`.

The app never reads these files in the browser. `npm run build` first runs
`scripts/build-search-index.ts`, which checks every table with
`src/db/validate.ts` (the build **fails** on any integrity error) and writes
`public/data/search-index.json` for the site to load.

## Tables

| Layer | Table | What one row is |
|---|---|---|
| Where | `brands` | A stall / restaurant concept (kept from v1) |
| | `operators` | Food-court operator (Koufu, Kopitiam…) |
| | `venues` | A hawker centre, food court or mall containing outlets |
| | `outlets` | One physical location of a brand (v1 "Premises", same ids) |
| | `outlet_licences` | SFA licence + hygiene grade for an outlet |
| What | `food_concepts` | A standard dish identity shared across stalls |
| | `products` | A dish/drink a brand sells (v1 MenuItem, same ids). Brand-level menu (decision D1) |
| | `variants` | Sizes / portions of a product |
| | `outlet_menu_overrides` | "Not sold at this outlet" exceptions |
| Assembly | `meal_configurations`, `configuration_groups`, `configuration_options` | Set meals and build-your-own (e.g. Big Mac Meal: Main / Side / Drink) |
| Facts | `nutrition_profiles` | Nutrition for a product, variant or concept, with status, basis, assumptions, source |
| | `prices` | Price for a product/variant/configuration/option, brand-wide or per outlet, by channel, dated |
| | `product_diet_tags` | halal / no_pork / vegetarian… = yes or no (no row = unknown) |
| | `allergen_statements` | contains / may_contain / likely_contains / not_listed (no row = unknown) |
| | `dietary_claims` | gluten-free etc. — declarations only |
| | `product_preparation` | Cooking method(s) |
| | `product_attributes` | Spice level, hot/cold |
| | `outlet_hours` | Weekly opening hours per outlet (SGT) |
| | `outlet_closures` | Dated closures for an outlet or a whole venue (e.g. NEA cleaning) |
| | `data_sources` | Where facts came from (every fact row has a `sourceId`) |
| Other | `grocery_products` | Packaged SKUs (per-100 g macros) |

## Rules (enforced by `npm test` and the build)

1. **Unknown is `null` or "no row", never 0.** A 0 means measured zero.
2. **Every fact has a `sourceId`** that exists in `data_sources`. Add a source row first.
3. **Never overwrite a fact.** To correct a price, nutrition value or
   allergen: set `validTo` on the old row and add a new row. History stays.
4. **Estimates are never verified.** `status: 'verified'` needs
   `basis: 'official_published'` or `'operator_declared'`.
5. **Allergen policy (decided 2026-11-15, "likely + confirmed"):**
   inference from a dish name or usual recipe may only ever be
   `status: 'likely_contains'` with `basis: 'dish_inference'` and a `reason`.
   `contains`, `may_contain`, `not_listed` and any gluten-free claim need a
   brand or stall declaration. Unknown is never shown or filtered as safe.
6. **Opening hours belong to outlets**, not brands. A whole-centre closure
   goes in `outlet_closures` with `venueId`.
7. **Ids are permanent.** Product and brand ids are public URLs
   (`/brand/[brandId]/[productId]`). Never rename one; discontinue it
   (`activeStatus: 'discontinued'`) and add a new one instead.
8. **Never fabricate** (CLAUDE.md §5). A dish, price, hour or allergen
   without a checkable source stays out.

## How the v1 data was converted

`scripts/migrate-v1.ts` (run once, 2026-11-16) converted the legacy
`src/lib/{brands,premises,menuItems,operators,groceryProducts}.ts` files.
Do **not** re-run it now — it would overwrite every edit made in /data since.
Highlights:

- 2,704 dishes, 1,728 brands, 4,673 outlets — ids unchanged.
- 259 food concepts: dishes with the same name and identical macros at 2+
  brands now share one "typical for this dish" profile (1,420 dishes).
- Nutrition basis: 56 `official_published` (verified), 259 `concept_reference`,
  155 `shared_template`, 1,067 `stall_estimate`, 6 `community`.
- Cooking style, spice and *likely* allergens inferred from dish names with
  `src/db/rules.ts` (basis `name_rule` / `dish_inference`).
- Prices: one brand-wide in-store price per dish, `lastVerifiedAt: null`
  (v1 never recorded when prices were checked).
- Legacy `gluten_free` / `dairy_free` / `nut_free` / `lactose_free` tags kept
  as `legacy_v1_unverified` diet tags only — **not** turned into claims.

## Recurring imports

- `npm run import:nea` — NEA hawker-centre cleaning closures from
  data.gov.sg (Singapore Open Data Licence). Matches NEA centres to venues
  conservatively (wrong dates are worse than none); re-runnable.

## Checking your edit

```bash
npm test               # integrity + parity + engine tests
npm run build:index    # rebuild public/data/search-index.json
```
