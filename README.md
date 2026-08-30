# PlateScreen

Most meals in Singapore come from a hawker stall, food court, or coffeeshop
with no nutrition label — tracking macros or keeping a diet while eating out
usually means guessing. **PlateScreen removes the guesswork:** a
stock-screener-style web app for Singapore food — search real dishes by
macros, price, protein-per-dollar, diet tags, outlet type, and location.
Standalone from the main Stride app — no login, no Firebase, no backend. All
data and filtering run client-side from a static dataset.

**For architecture, data-sourcing rules, and the batch-work methodology, see
`CLAUDE.md`. For the fuller introduction/value-proposition/moat framing, see
`reference/planning/POSITIONING.md`. This file is just a quick overview and
run instructions.**

## Data

Three entities, joined by id (full field-level detail in `CLAUDE.md` section
4 and `src/types/db.ts`):

- **`Brand`** (`src/lib/brands.ts`, 1,747 records) — a dish-stall concept:
  id, name, type, cuisine, aliases, dietTags, priceRange, platforms.
- **`Premises`** (`src/lib/premises.ts`, 4,678 records) — WHERE a Brand
  physically exists: one row per real location, including every branch of a
  chain, with address/postal/lat-lng and an optional SFA licence block
  sourced from data.gov.sg's
  [List of NEA Licensed Eating Establishments](https://data.gov.sg/datasets/d_227473e811b09731e64725f140b77697/view).
- **`MenuItem`** (`src/lib/menuItems.ts`, 2,552 records) — WHAT you can
  screen: one row per dish, linked to its Brand. 95.8% of Brands have at
  least one MenuItem as of 2026-08-30.

`src/lib/screener.ts` joins all three into one row per dish (`ScreenerRow`)
and holds filtering/sorting/preset logic.

### Research pipeline

`src/lib/researchQueue.ts` (`RESEARCH_QUEUE`) holds known Singapore chains
not yet entered. New data work follows the never-fabricate sourcing rules and
verification pipeline in `CLAUDE.md` sections 5-6 — every dish must trace to
a real source (the brand's own name/cuisine field, a site scrape, or
individual web research), never invented from "what's typical."

### Relationship to Stride

This schema originated as a fork of Stride's Singapore food database but has
since been **deliberately simplified and decoupled** — Stride-only mechanics
(meal-builder/combo logic, allergens, dayparts, nested stall arrays) were
dropped. PlateScreen and Stride are fully independent apps now; the original
Stride-shaped files are preserved for reference at `reference/stride-original/`
(excluded from the TS build), and `reference/stride-sync-sessions/` documents
the historical (no longer active) sync.

`src/lib/exportToStride.ts` remains as a one-way draft converter back to
Stride's shape, for if a manual, reviewed sync is ever wanted again — nothing
runs automatically.

## Run locally

```
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build       # static export -> ./out (next.config.js sets output: 'export')
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

Logo/icon source files: `design/logo-concepts/`.

## Deploy

Repo: `https://github.com/mchoo1/platescreen` (branch `main`). Live on
Vercel, auto-deploying on push to `main` — no environment variables needed
since the app is fully static (`output: 'export'` in `next.config.js`).

```bash
git push origin main
```

See `CLAUDE.md` section 8 for the push-credential rule when working with a
Cowork sandbox session (it can't push directly — commands get handed back to
you to run).

## Project docs

- `CLAUDE.md` — architecture, data-sourcing rules, batch-work methodology.
- `reference/planning/ROADMAP.md` — current status and next priorities.
- `reference/planning/AUTOMATION_PROPOSAL.md` — options for running
  maintenance/growth/marketing tasks on a schedule.
- `reference/research-sessions/` — dated log of every data-work batch.
