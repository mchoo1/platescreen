# Zero-menu-brand UI fallback — 2026-08-29

## Why

App review (2026-08-28/29) found `buildScreenerRows()` in `src/lib/screener.ts`
iterates exclusively over `MENU_ITEMS`, so any Brand with zero MenuItem rows is
entirely absent from the app: not in the results table, not searchable by name, not
counted in the "Outlets covered" stat. At the time of the review this was 587 of
1,749 brands (33.6%) — real, physically-existing outlets (confirmed via SFA licence
match and/or Google Maps during the task #65 backfill) that a user searching
PlateScreen would never see, even by exact name, even with every filter cleared.
That directly undercuts the app's stated purpose of helping someone find nearby food
options — a store either has macro data (findable) or doesn't exist to the app at all.

## Fix

Brands with no menu items now surface as a lightweight, separate row type
(`UncoveredBrandRow` in `src/lib/screener.ts`) carrying only what we actually know
about them — name, emoji, cuisine, outlet type, price range, platforms, location
label, and (when the user has shared their location) distance to the nearest
premises. They do **not** get calorie/protein/carb/price/diet-tag fields, because
there's no MenuItem data to populate those with — inventing plausible-looking macros
for a store with a totally unresearched menu would be worse than showing nothing.

New/changed files:

- `src/lib/screener.ts` — added `buildUncoveredBrandRows()`, `withUncoveredDistances()`,
  `UncoveredFilters` + `applyUncoveredFilters()`, `sortUncoveredRows()`. Exported the
  previously-private `nearestPremises()` helper so both the covered and uncovered
  paths share the exact same distance calculation. `applyUncoveredFilters` only
  applies search-text (matched against brand name only), outlet type, platform,
  location text, and max-distance — the subset of `ScreenerFilters` that describes
  the physical outlet rather than a dish.
- `src/components/PendingMenuList.tsx` (new) — renders the filtered/sorted uncovered
  rows as a distinct, clearly-labeled table ("More outlets nearby — menu not yet
  available") below the main results table, each row tagged with an amber "Menu
  pending" badge. Capped at 50 rows rendered at once with a "+N more — narrow your
  search" footer if there are more; returns `null` entirely if there are zero
  uncovered brands in the dataset (defensive, not expected to trigger given the
  current 587).
- `src/components/ScreenerApp.tsx` — computes `ALL_UNCOVERED` once at module load
  (mirroring the existing `ALL_ROWS` pattern), threads it through the same
  `userCoords`/geolocation state so "Near me" and the distance sort apply to both
  lists identically, and renders `<PendingMenuList>` under `<ScreenerTable>` inside
  the existing filter-sidebar layout — so the sidebar's location text, "Near me",
  outlet-type, and platform filters affect both lists at once. Added a fifth stat
  card, "Menu pending", next to the existing four (grid widened from 4 to 5 columns
  on `sm:`) so the true count is visible up front instead of only implied by the
  gap between "Menu items indexed" and some other number.

Deliberately **not** changed: `applyFilters()` / the main `ScreenerFilters` type, the
main `ScreenerTable` columns, or the "Outlets covered" stat's meaning (it still means
"brands with at least one researched menu item" — accurate and useful on its own,
now just paired with an equally visible "Menu pending" count instead of a silent
gap).

## Verification

- `npx tsc --noEmit` — silent.
- `npm run build` — succeeds, 4/4 static pages.
- Data-layer script: total brands 1,749 = covered (1,162, unique `restaurantId`s in
  `buildScreenerRows()`) + uncovered (587, `buildUncoveredBrandRows()`), zero overlap
  between the two id sets, uncovered list responds correctly to a no-op filter (587
  unchanged) and to a text-prefix filter (finds the matching row).
- Rendered a live `next dev` build and confirmed the HTML actually contains the new
  UI: stat cards read `2,039 / 1,162 / 587 / 73 / 2,039` (items indexed / outlets
  covered / menu pending / verified / showing now) and the page includes the "More
  outlets nearby — menu not yet available" section heading.
- Live repo and `~/build/platescreen` mirror confirmed byte-identical for all three
  changed/added files (`screener.ts`, `ScreenerApp.tsx`, `PendingMenuList.tsx`).

## Caveat / follow-up

This makes the 587 outlets discoverable by name/location/type — it does not give
them menu data. Task #65 (the ongoing venue-by-venue dish-sourcing backfill) is what
actually shrinks the 587 number over time; this fix just stops the ones not yet
reached from being invisible in the meantime. As task #65 continues, brands move
from the "Menu pending" list into the real, macro-filterable results automatically —
no further UI change needed, since `buildUncoveredBrandRows()` and
`buildScreenerRows()` both derive from the same live `MENU_ITEMS`/`BRANDS` data.
