# PlateScreen

A stock-screener-style web app for Singapore food: search by macros, price,
protein-per-dollar, diet tags, outlet type, and location. Standalone from the
main Stride app — no login, no Firebase, no backend. All data and filtering
run client-side from a static dataset.

## Data

`src/lib/sgFoodDb.ts`, `sgHawkerPlaces.ts`, `sgHawkerCentresAuto.ts`, and
`sgFoodCourtPlaces.ts` hold PlateScreen's own food database — 1,775 menu
items across 294 outlets (chains, hawker stalls, food courts). `src/types/index.ts`
holds the shared type definitions.

This dataset was duplicated from the Stride app's SG food database on
2026-08-09 as a one-time starting point, but is now **maintained
independently and exclusively for PlateScreen**. Edit these files directly
to add or update items — changes here do not sync back to Stride, and
future changes in Stride's database will not flow into PlateScreen.

`src/lib/geo.ts` ports the haversine distance function and the static
outlet-coordinate map from Stride's `EatPageClient.tsx`, used for the
"near me" GPS filter.

`src/lib/screener.ts` is PlateScreen-specific: flattens restaurants into
one row per menu item, and holds filtering/sorting/preset logic.

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
