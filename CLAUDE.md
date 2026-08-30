# PlateScreen — Developer & Agent Handoff Guide

> **Last updated:** 2026-08-30
> **For:** Any Cowork session or developer picking up this project cold.
> Read this first, top to bottom, before touching `src/lib/*.ts`. It contains
> operating rules (not just architecture) that earlier sessions learned the
> hard way — skipping them means redoing work or reintroducing bad data.

---

## 1. What Is PlateScreen?

PlateScreen is a **stock-screener-style web app for Singapore food**: search,
filter, and sort real dishes by macros, price, protein-per-dollar, diet tags,
outlet type, and location. No login, no backend, no database — it's a fully
static Next.js export that filters a bundled TypeScript dataset client-side.

**PlateScreen is a completely separate product from Stride** (a different
fitness app at `C:\stride-app`, different repo, different owner-facing
purpose). PlateScreen originated as a fork of Stride's Singapore food
database, but that lineage is historical only — `reference/stride-original/`
and `reference/stride-sync-sessions/` are kept for reference, not an active
sync. Treat the two apps as fully independent; nothing here should assume
Stride's schema, Firebase, or auth model.

**Stack:** Next.js 14 (`output: 'export'` — static site, no server) ·
TypeScript · Tailwind CSS · zero backend, zero env vars.
**Repo:** `https://github.com/mchoo1/platescreen`
**Live:** platescreen.vercel.app (auto-deploys on push to `main`, per the
existing growth-strategy doc — verify current Vercel project settings before
assuming this if it's been a while).

---

## 2. Quick Start

```bash
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen"
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # static export -> ./out
```

No `.env` file, no API keys, no auth — everything ships in the JS bundle.

---

## 3. Folder Map

```
PlateScreen/                       ← repo root (this IS the Next.js app, no nested app/ dir)
│
├── CLAUDE.md                      ← YOU ARE HERE
├── README.md                      ← short, user-facing overview + run instructions
├── package.json / tsconfig.json / tailwind.config.ts / next.config.js
│
├── public/                        ← favicons, PWA icons, manifest
│
├── design/
│   └── logo-concepts/             ← logo/icon source files (SVG + PNG + the original zip)
│
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx               ← the entire app is one route
│   │   └── globals.css
│   ├── components/                ← ScreenerApp, ScreenerTable, FilterPanel, MealTray,
│   │                                 PendingMenuList, PresetBar
│   ├── lib/                       ← THE DATA. See section 4.
│   │   ├── brands.ts              ← WHO/WHAT: 1 row per dish-stall concept (~605 KB)
│   │   ├── premises.ts            ← WHERE: 1 row per physical location (~2.4 MB, the biggest file)
│   │   ├── menuItems.ts           ← THE DISHES: 1 row per screenable item (~800 KB)
│   │   ├── operators.ts           ← Food-court operator metadata (Koufu, Kopitiam, Foodfare...)
│   │   ├── groceryProducts.ts     ← Schema exists, 0 rows populated (see section 4.4)
│   │   ├── researchQueue.ts       ← Backlog of known chains not yet entered
│   │   ├── branchQueue.ts         ← Chain-branch research tracking
│   │   ├── exportToStride.ts      ← One-way draft converter back to Stride's shape (manual, reviewed only — see README)
│   │   ├── screener.ts            ← Joins BRANDS + PREMISES + MENU_ITEMS into screenable rows; casts at the type boundary (see section 4.5)
│   │   ├── geo.ts                 ← Haversine distance + static coordinate helpers
│   │   └── utils.ts
│   └── types/
│       ├── index.ts               ← OutletType, DietaryFlag, PriceRange
│       └── db.ts                  ← Brand, Premises, MenuItem, SfaRegistration, Platform, GroceryProduct
│
└── reference/                     ← NOT part of the build (no imports from src/), all process/history
    ├── planning/                  ← Strategy docs — ROADMAP.md is the entry point (section 7)
    ├── research-sessions/         ← One dated .md per batch of data work, see section 6 (135+ files, append-only)
    ├── data/                      ← dish-macro-lookup.py + scraped source JSON (see section 5)
    ├── migration-scripts/         ← One-off scripts that produced the current schema (historical, don't re-run blindly)
    ├── stride-original/           ← Pre-fork Stride food-db files, reference only, excluded from TS build
    └── stride-sync-sessions/      ← Historical — PlateScreen no longer syncs with Stride
```

---

## 4. Data Model

### 4.1 Three top-level arrays, joined by id

- **`Brand`** (`brands.ts`) — a dish-stall *concept*: id, name, emoji, `type`
  (see `OutletType` in `types/index.ts` — restaurant / food_court / coffeeshop
  / canteen / grab_go / food_court_stall / hawker / supermarket / ready_to_eat
  / home_cooked), cuisine, aliases, dietTags, priceRange, platforms
  (`dine_in`/`grab_go`/`delivery`/`self_cook`), optional `operatorId` (set
  only for concessions inside a food-court operator's premises).
- **`Premises`** (`premises.ts`) — one row per **physical location**,
  `brandId` FK. A chain brand (McDonald's, KFC) has many Premises rows, one
  per branch — branches are first-class rows here, not a nested array.
  Carries `locationType`, `locationContext` (parent venue name, e.g. "Maxwell
  Food Centre"), address, postal, lat/lng, optional `sfa` block (licence
  number, licensee name, grade, demerit points — sourced from data.gov.sg's
  NEA Licensed Eating Establishments dataset), and `source` (provenance:
  `sfa_licence_match` / `web_research` / etc.).
- **`MenuItem`** (`menuItems.ts`, `// @ts-nocheck`) — one row per screenable
  dish, `brandId` FK. name, emoji, category, price, calories, protein, carbs,
  fat, `compatibleWith: DietaryFlag[]`, `confidence: 'verified' | 'estimated'
  | 'community'`, optional `isPopular`.

**One Brand can have zero, one, or many MenuItems** — this is the "zero-menu
brand" gap tracked throughout `reference/research-sessions/`: a Brand can
exist (a real, located stall) with nothing yet screenable. See section 6.

### 4.2 One Brand ≈ one dish concept, not one signboard

A real physical stall that sells two distinct dish types (e.g. a hawker stand
selling both Char Kway Teow and Oyster Omelette under one signboard) is
correctly modeled as **two separate Brand records** at the same Premises
`locationContext`, each with its own MenuItem. Seeing two Brand ids share an
identical signboard name at the same venue is *not* automatically a
duplicate-data bug — check the SFA licence number and stall number on each
Premises record before assuming it's an error (see the 2026-08-30 database
health audit in `research-sessions/` for a worked example of telling these
apart: two records with different licence numbers and adjacent-but-distinct
stall numbers were a real second stall, not a duplicate; two records where
one's address literally decoded to the other's SFA stall number were a
genuine duplicate and were removed).

### 4.3 Food-court "container" brands — never assign these a MenuItem

Some brands have `type: "restaurant"` but `cuisine: "Local Food Hall"` /
"Hawker Food Hall" — these represent an *entire multi-stall venue* under one
brand record (confirmed via web search, e.g. Fork & Spoon's own description
names 4+ distinct internal stalls). Their real internal stalls already exist
as separate Brand records. Assigning a single MenuItem to the container brand
would misrepresent the whole venue as one dish. Known containers: `koufu_
fork_spoon`, `koufu_1983_taste_of_nanyang`, `koufu_cookhouse`, `koufu_
rasapura_masters`, `koufu_gourmet_paradise`, and `kopitiam_cheers` (a
convenience-store chain operating inside some Kopitiam foodcourts, not a food
stall at all — confirmed via an empty dish-scrape entry, see section 5).

### 4.4 `GroceryProduct` — schema exists, unpopulated

Packaged SKUs (a can of tuna, a bag of rice) don't fit the "one dish, one
serving" MenuItem shape — they need per-100g macros + package size. The type
is defined in `types/db.ts` but `groceryProducts.ts` has 0 rows. Some grocery
*ingredients* currently live in `menuItems.ts` under a synthetic `fairprice`
brand with whole-package-weight macros (e.g. `ing_jasmine_rice` = a whole 5kg
bag, ~18,000 kcal) meant to be scaled per-serving by recipe-resolver helpers
— this is intentional, not a bug (confirmed in the 2026-08-30 health audit).
Real per-SKU grocery research is unstarted; see `ROADMAP.md`.

### 4.5 TypeScript gotcha: don't type the big arrays directly

`brands.ts` / `premises.ts` / `menuItems.ts` export their arrays as plain
literals (no `: Brand[]` annotation). Typing the ~2,500-element `MenuItem[]`
array directly hits TS2590 ("union type too complex"). `screener.ts` casts
once at the import boundary (`as unknown as MenuItem[]`, etc.) instead. Keep
this pattern if you regenerate these files — `menuItems.ts` also carries a
top-of-file `// @ts-nocheck` for the same reason.

---

## 5. Data-Sourcing Rules — NEVER FABRICATE

This is the single most important rule in this codebase, established over
many research sessions: **every MenuItem's dish name must trace to a real,
checkable source.** Acceptable sources, in order of how they're normally
found:

1. The Brand's own `cuisine` field, when it already names a specific dish
   (not a broad category like "Western" or "Local & Hawker").
2. The Brand's own `name` field, when it directly names the dish (e.g. a
   brand literally named "Curry Rice" or "Chendol").
3. `reference/data/kopitiam-stall-dishes.json` — a ~846-entry real scrape of
   Kopitiam's own website, keyed by exact stall name. Used for any brand with
   `operatorId: "kopitiam"`. **Known scrape artifacts to watch for:** a few
   entries are self-referential garbage (`{"CuLiang YuFen": ["CuLiang
   YuFen"]}` — no real data), an empty array (`[]`) correctly signals a
   non-food-stall (e.g. Cheers), and a handful of entries look like
   adjacent-stall data bleeding into the wrong key or an OCR-style typo
   (e.g. "Park Chop" read as "Pork Chop") — use judgment, and prefer the
   brand's own name when it conflicts with a suspicious scrape result.
2. Individual web research (WebSearch) for a specific stall name + venue,
   when neither of the above resolves it. If a search returns nothing after
   a genuine attempt, **leave the brand at zero MenuItems** — do not guess.
   (~12 SFA-licensee-name brands remain unresolved this way; see `ROADMAP.md`
   / task #29 — text search cannot find bare person-names that never appear
   on a signboard. The only remaining path is visual identification via
   Google Maps Street View or an in-person visit.)

Never invent a dish name, price, or macro set from "what's typical for this
cuisine" — every prior instance of this being tempting (e.g. a bare "Local &
Hawker" cuisine tag with no real signal at all) is exactly the case where the
brand should stay at zero MenuItems instead.

### 5.1 Diet tags (`compatibleWith`) — conservative, not exhaustive

- `halal` — only for unambiguous Malay/Indonesian/Indian-Muslim dishes.
- `no_pork` — assign liberally based on the dish's own named protein
  (chicken, beef, fish, tofu, egg, vegetable), **except** for a standing
  skip-list of dishes that traditionally may contain pork/lard even though
  not named for it, which are never tagged `no_pork`: Char Kway Teow, Lor
  Mee, Bak Chor Mee, Kway Chap, Wanton Mee/Noodle, Popiah, Fishball Noodles,
  Fried Carrot Cake, Prawn Mee/Noodles, Ban Mian, Mee Pok, Hor Fun, Claypot
  Rice, Roasted Meats, Xiao Long Bao, Ngoh Hiang, Bak Kwa, generic Porridge,
  Pepper Rice, Rosti, Pizza, Mala Xiang Guo, Meatball Noodles, Bibimbap,
  Yunnan Rice Noodles, Biang Biang Noodles, Sarawak Kolo Mee, Banh Mi, Yang
  Zhou Fried Rice, Mee Tai Mak, economic/mixed-vegetable rice (protein
  varies by customer choice), ABC Soup.
- Dishes **explicitly named for pork/offal** (Bak Kut Teh, Pork Congee, Pig
  Organ Soup, Sweet and Sour Pork Rice, Fried Shark Lor Mee, Golden Broth
  Ramen, Pork Chop, Lotus Root Pork Ribs Soup) get **no `compatibleWith`
  array at all** — categorically excluded, not merely skipped out of caution.
- `vegetarian` / `vegan` — only for unambiguous zero-meat items.
- `pescatarian` — fish/seafood-only dishes.
- `gluten_free` / `dairy_free` / `nut_free` / `lactose_free` — **never
  attempted** from dish-name inference alone; too unreliable without a real
  ingredient list. (A few pre-existing tags of these types exist from an
  earlier, less conservative pass — don't extend the pattern.)
- As of 2026-08-30, 52.0% of MenuItems carry ≥1 tag. This is not necessarily
  under-covered — many untagged items are on the skip-list above or are
  genuinely ambiguous. Don't do a blind "increase coverage" pass; a real
  audit would need to separate "legitimately untaggable" from "overlooked"
  first (open item, see `ROADMAP.md`).

---

## 6. Data Work Methodology (the batch pipeline)

Most historical data work follows one repeatable pattern, documented as a
dated `.md` file per batch in `reference/research-sessions/` (135+ files as
of 2026-08-30, oldest from 2026-08-10). **Read the most recent 3-5 files in
that folder before starting new data work** — they carry forward findings
(methodology fixes, scrape quirks, exclusion lists) that aren't all restated
here.

**Standard pipeline, every batch:**

1. **Audit** — write a throwaway TypeScript script (in the build mirror, see
   below) that filters `BRANDS`/`MENU_ITEMS` for the specific gap being
   worked (e.g. "brands with zero menu items whose cuisine field names a real
   dish"). Iterate on the filter; early batches' filters (e.g. "[CLEAN]
   venues only") turned out to hide real coverage — cross-check against
   raw brand lists periodically rather than trusting one filter's framing.
2. **Assign** — resolve each candidate to a real dish per section 5's
   sourcing rules, write a one-off Python splice script that inserts new
   `MenuItem` objects before the closing `];` in `menuItems.ts`, and extend
   `reference/data/dish-macro-lookup.py`'s `DISH_DB` dict with any new dish
   type (a `# --- Batch XX additions ---` comment header + `DISH_DB.update(
   {...})`).
3. **Verify** (mandatory, every batch, no exceptions):
   - Sync a build mirror (this repo has no `node_modules`, so `tsc`/`next
     build` can't run in place): `rsync -a --delete src/ ~/build/platescreen/
     src/` and same for `reference/`.
   - `npx tsc --noEmit` in the mirror — must be silent.
   - `npm run build` in the mirror — must show all pages generating
     successfully.
   - A temporary verify script: total item count matches expected delta, 0
     duplicate ids, 0 orphaned items (every `brandId` resolves to a real
     Brand), the batch's target brands are now covered, diet-tag spot checks
     against section 5.1's rules.
   - `diff` the live file against the mirror's copy — must be byte-identical
     (confirms the mirror and live repo agree).
   - Delete the temporary verify/audit scripts once done — nothing ephemeral
     belongs in the repo or the mirror long-term.
4. **Document** — write `reference/research-sessions/YYYY-MM-DD-<short-
   description>.md` covering: what was targeted, method, results, new dish
   types added, diet tags set, verification output, files touched, and a
   "status/next steps" note for whoever picks this up next.
5. **Commit** — structured message (see section 8), then stop; pushing is
   the user's job (section 8).

**Known exclusions to re-check before treating a brand as "just uncovered":**
corporate/holding-company name patterns (regex roughly `/pte\.?\s*ltd|co-
operative|management|holdings|group|restaurants? pte/i`), the food-court
container brands in section 4.3, and brands already resolved under a
duplicate record (section 4.2).

---

## 7. Current Status (2026-08-30)

| Metric | Value |
|---|---|
| Total brands | 1,747 |
| Total premises | 4,678 |
| Total menu items | 2,552 |
| Brands with ≥1 menu item | 1,673 (95.8%) |
| Zero-menu brands remaining | 74 |
| Menu items with ≥1 diet tag | 1,327 (52.0%) |
| Confidence breakdown | 73 verified / 2,473 estimated / 6 community |
| Premises missing lat/lng | 0 (fully complete) |
| Brands missing a platforms array | 0 (fully complete) |

Of the 74 remaining zero-menu brands: most are corporate/holding entities
permanently out of scope, ~12 are SFA-licensee-name brands that individual
web research couldn't identify (task #29 — needs visual/Street View
identification, not text search), and a few have no findable dish data at
all. See `reference/planning/ROADMAP.md` for the prioritized next-steps list
and `reference/research-sessions/2026-08-30-database-health-audit.md` for
the most recent full data-quality pass.

---

## 8. Git & Deployment

**Remote:** `https://github.com/mchoo1/platescreen` (branch `main`).

**Push discipline:** commits happen locally as work completes; a Cowork
sandbox session has no push credentials and must never be given any —
**always hand the user the full push command to run themselves**, e.g.:

```bash
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen" && git pull origin main && git push origin main
```

**Deploy:** Vercel, auto-deploy on push to `main` (per the growth-strategy
doc — a static export, `output: 'export'` in `next.config.js`, so no env
vars are needed and the default Next.js build just works). Verify current
Vercel project settings if it's been a while since the last deploy — this
hasn't been re-confirmed since the 2026-08-22 growth-strategy writeup.

**Commit message convention:** a one-line summary, then a body explaining
*what changed and why*, plus a verification summary (tsc/build status, item
counts before/after, dup/orphan checks) and a pointer to the matching
`research-sessions/` doc when one exists.

---

## 9. What NOT To Do

- Don't fabricate dish data under any circumstance (section 5).
- Don't assign a MenuItem to a food-court container brand (section 4.3).
- Don't assume two same-named Brand records at one venue are a duplicate
  without checking SFA licence/stall numbers first (section 4.2).
- Don't type `BRANDS`/`PREMISES`/`MENU_ITEMS` directly against their
  interfaces (section 4.5) — you'll hit TS2590.
- Don't run `npm run build` or `tsc` directly in this folder — there's no
  `node_modules` here; use the `~/build/platescreen` mirror (section 6).
- Don't push to `origin/main` from a sandbox session (section 8).
- Don't treat `reference/stride-original/` or `reference/stride-sync-
  sessions/` as live integration points — PlateScreen is fully independent
  of Stride (section 1).
