# 2026-09-25 — Surface GroceryProduct rows: a "Pantry" section

## Why

Flagged in the 2026-09-02 UI/DB review and re-confirmed 2026-09-14: the 19
`GroceryProduct` rows (raw ingredients — rice, oats, chicken breast, eggs,
etc., priced per package with per-100g/ml macros) were fully invisible in
the UI. Clicking the "Grocery" outlet-type filter returned ordinary
whole-item `MenuItem` rows (a Sheng Siong rotisserie chicken, a FairPrice
bento box) instead, since `buildScreenerRows()` only ever iterates
`MENU_ITEMS` — the dedicated schema was populated and completely unused.

## Method

Additive, not a change to the existing "Grocery" outlet-type filter (left
untouched — those are also legitimate real `MenuItem` rows, just a
different kind of grocery-outlet purchase; conflating the two schemas
inside one filter risked more than it fixed). Instead:

- `screener.ts`: added `GroceryRow` (joins `GroceryProduct` to its
  retailer `Brand` for name/emoji) and `buildGroceryRows()`, computing
  `pricePer100` and `ppd` (protein-per-dollar for the whole package, same
  metric/scale as the main screener's `ppd`) from the raw per-100 fields.
  Also `applyGroceryFilters()`, reusing `matchesQuery` (the same
  apostrophe/multi-word-safe matcher from the 2026-09-13 search fix)
  against name/category/retailer.
- New `GroceryList.tsx` component: a card grid (19 items suits cards
  better than a table — no separate mobile treatment needed, unlike the
  main screener). Each card shows the product, retailer, package size/
  price, a protein/$ badge (reusing `ppdBadgeClasses`, the same visual
  language as the main table), and per-100g/ml macros.
- Wired into `ScreenerApp.tsx` as a new "Pantry" section below the
  existing "menu pending" list, filtered by the same search box text
  (`filters.q`) so one search box covers both dishes and pantry items.

## A data-modeling wrinkle caught during testing

`fairprice_eggs_10pk` has `packageUnit: 'each'` but its `caloriesPer100`/
`proteinPer100`/etc. are **per 100 eggs**, not per single egg (7000 cal,
600g protein per "100") — internally consistent with the per-100 naming
convention used for weight/volume units, but "7000 calories per 100 eggs"
reads strangely in a UI built for humans. Added `macroBasis()` in
`GroceryList.tsx` to detect `packageUnit === 'each'` and divide by 100 for
display only (70 cal/egg, 6g protein/egg — checks out against a real
large egg) — the underlying stored data and `ppd` calculation are
untouched, this is purely a display-layer conversion.

## Verification

- `npx tsc --noEmit` in the build mirror: clean.
- Functional check: 19 rows built correctly; spot-checked jasmine rice
  (5kg, $12, 7g protein/100g) → `ppd` = 29.2, matching a manual calc
  ((7/100 × 5000) / 12 = 29.17, rounds to 29.2); eggs display-basis
  conversion confirmed (28 → $0.28/egg, 7000 → 70 cal/egg); search
  "chicken" correctly returns exactly the 2 chicken-breast/thigh rows.
- Live dev-server render check (`next dev`, curled the homepage HTML):
  200 response, no error overlay, "Pantry", "raw ingredients", and
  "Chicken Breast" all present in the rendered output, confirming the
  component tree mounts without a runtime crash.
- No data files touched (`groceryProducts.ts` unread/unwritten) — pure
  additive UI + a new read-only screener function.

## Not done / follow-ups

- Did not touch the existing "Grocery" outlet-type filter's behavior
  (still surfaces whole-item `MenuItem` supermarket rows) — see "Method"
  above for why this was left alone.
- `exportToStride.ts` still has no `GroceryProduct → SGMenuItem`
  conversion (flagged separately by the 2026-09-20 sync report) — this
  Pantry section is PlateScreen-only, doesn't touch Stride sync.
- No dedicated grocery-specific filters (calorie/protein sliders) — with
  only 19 rows, sorted by protein/$ descending and covered by the shared
  search box, a full filter UI wasn't worth the added complexity yet;
  revisit if the grocery dataset grows substantially.
