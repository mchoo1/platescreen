# PlateScreen

A stock-screener-style web app for Singapore food: search by macros, price,
protein-per-dollar, diet tags, outlet type, and location. Standalone from the
main Stride app — no login, no Firebase, no backend. All data and filtering
run client-side from a static dataset.

## Data

As of 2026-08-09, PlateScreen runs on its own simplified schema — two
entities instead of Stride's deeply-nested restaurant/menu shape:

- **`Outlet`** (`src/lib/outlets.ts`, 296 records) — WHERE you get food: id,
  name, type, cuisine, location, aliases, dietTags, priceRange, platforms
  (`dine_in` / `grab_go` / `delivery` / `self_cook`), and an optional `sfa`
  registration block (licence number, premises address, SAFE grade) for
  `hawker` / `food_court_stall` outlets, sourced from data.gov.sg's
  [List of NEA Licensed Eating Establishments](https://data.gov.sg/datasets/d_227473e811b09731e64725f140b77697/view).
- **`FoodOption`** (`src/lib/foodOptions.ts`, 1,798 records) — WHAT you can
  screen: one row per dish, linked to its outlet via `outletId`. Includes
  the 1,775 original menu items plus 17 grocery ingredients (grouped under
  a synthetic "FairPrice" outlet) and 6 home-cooked recipes (under a
  synthetic "Home Cooked" outlet, `type: 'home_cooked'`).

Full type definitions: `src/types/db.ts` (Outlet/FoodOption/Platform/
SfaRegistration/ResearchQueueEntry) and `src/types/index.ts` (OutletType,
DietaryFlag, PriceRange).

This schema originated as a duplicate of Stride's SG food database but has
since been **deliberately simplified and decoupled** — Stride-only
mechanics (meal-builder/combo logic, allergens, hygiene-grade-beyond-SAFE-grade,
dayparts, dine-in pricing, nested stall arrays) were dropped. The original
Stride-shaped files are preserved for reference at `reference/stride-original/`
(excluded from the TS build) along with the one-off migration scripts at
`reference/migration-scripts/` that produced the current data.

### Research pipeline

`src/lib/researchQueue.ts` (`RESEARCH_QUEUE`) holds known Singapore chains
not yet entered — work through the highest-priority `'pending'` entries to
add new outlets. For `hawker` / `food_court_stall` types, cross-reference
the data.gov.sg API (`https://data.gov.sg/api/action/datastore_search?resource_id=d_227473e811b09731e64725f140b77697&q=<name>`)
for a base record before researching menu/macro data. This is currently a
manual workflow (ask to have new outlets researched and added) rather than
an automated schedule.

### Sending data to Stride

`src/lib/exportToStride.ts` (`exportAllToStride`) converts PlateScreen's
Outlet/FoodOption records back into Stride's SGRestaurant/SGMenuItem shape
with sensible defaults for the dropped fields (tier, sfaLicenceType, source
provenance, etc.) — a first-pass draft, not a finished 1:1 mapping. Nothing
writes to `C:\stride-app` automatically: any sync is a manual, reviewed step
(generate the draft, diff it against Stride's current data, get approval,
then copy it in), since Stride auto-deploys to production on push to `main`.

`src/lib/geo.ts` ports the haversine distance function and the static
outlet-coordinate map from Stride's `EatPageClient.tsx`, used for the
"near me" GPS filter — this one field (outlet id → lat/lng) is still shared
by reference since it's just static geography, not editorial food data.

`src/lib/screener.ts` joins `OUTLETS` + `FOOD_OPTIONS` into one row per
dish (`ScreenerRow`) and holds filtering/sorting/preset logic. Note:
`outlets.ts`/`foodOptions.ts` export their arrays **without** a type
annotation (plain literals) — typing the ~1,800-element `FOOD_OPTIONS`
array directly against the `FoodOption[]` interface hits TypeScript error
TS2590 ("union type too complex"). `screener.ts` casts once at the import
boundary (`as unknown as FoodOption[]`) instead. Keep this pattern if you
regenerate these files.

## Run locally

```
npm install
npm run dev       # http://localhost:3000
npm run typecheck
npm run build      # static export -> ./out (next.config.js sets output: 'export')
```

## Features

- Sortable screener table: Item, Restaurant, Calories, Protein, Carbs, Fat,
  Price, Protein/$ (colour-coded pill: green ≥6, amber 3–6, red <3)
- Filter panel: calorie/protein/carb/price sliders, dietary-preference
  toggles (halal, vegetarian, vegan, keto, high_protein, no_pork, low_carb),
  outlet-type buttons, verified-only toggle
- One-click macro presets: Cut, Bulk, Budget, Keto, High Value
- All filters encoded in the URL for shareable links (`?cal_max=500&prot_min=25&tag=halal&sort=ppd`)
- Meal builder tray with sticky running totals (cal/protein/carbs/fat/cost)
- Location filter by MRT/area text match, plus GPS "near me" with a distance slider
- Dark mode toggle, top stat cards, and a "top protein/$ picks" strip

## Design

Visual language is modeled on [hdbstats.com](https://www.hdbstats.com/):
white/slate-50 background, rounded-xl cards with soft shadows, pill badges
for status/value indicators, blue primary accent, green/red for
good/bad values, dark mode via a `dark` class toggle on `<html>`.

## Deploy (GitHub + Vercel)

A local git repo is already initialized with one commit. To publish:

```bash
# 1. Create an empty repo on GitHub (via github.com or `gh repo create platescreen --public`)
git remote add origin https://github.com/<your-username>/platescreen.git
git branch -M main
git push -u origin main

# 2. Deploy on Vercel — either:
#    a) vercel.com → New Project → import the GitHub repo (auto-deploys on push to main), or
#    b) Vercel CLI from this folder:
npx vercel        # first run links + deploys a preview
npx vercel --prod # promotes to production
```

No environment variables are needed — this app is fully static (`output: 'export'`
in `next.config.js`), so Vercel's default Next.js build just works.
