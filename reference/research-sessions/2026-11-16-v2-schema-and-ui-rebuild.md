# 2026-11-16 — v2 rebuild: new database + redesigned UI

**Requested by:** Ming ("implement changes to the food screener, database
changes as well"), following the PRD v2.0 audit and the approved mockups
(https://claude.ai/artifact/KGK92iQmjVYKmAXirXcvaW). Scope agreed:
foundation + new UI (accounts, food log and the meal builder screen come later).

## What changed

### Database (`/data`, `src/db/`)
- 23 JSON tables replace the 5 legacy TS arrays. Ids unchanged.
- Nutrition now carries status, basis, assumptions and source. 259 food
  concepts created where the same dish name had identical macros at 2+
  brands (1,420 dishes) → shown as **"Typical for this dish"**.
- Basis counts: 56 official_published (verified), 259 concept_reference,
  155 shared_template, 1,067 stall_estimate, 6 community.
- Prices: dated, per channel, brand-wide or per outlet; v1 prices imported
  with `lastVerifiedAt: null`.
- New per Ming's 2026-11-15 requirements:
  - **Allergens**: 2,080 `likely_contains` statements from name rules
    (gluten 800, soy 371, milk 223, fish 212, crustacea 160, egg 120, sesame 87, peanut 73 …). Policy:
    inference = likely only; declarations required for contains / free-from
    / gluten-free. 0 gluten-free claims today (legacy `gluten_free` tags kept
    as unverified diet tags only).
  - **Cooking style**: 1,043 dishes have a method from name rules (soup 273,
    deep-fried 137, stir-fried 136, grilled 126 …); spice level for 190.
  - **Opening hours**: per outlet (`outlet_hours`, empty — no source yet);
    venue closures from NEA's "Dates of Hawker Centres Closure" (data.gov.sg):
    100 of 110 hawker-centre venues matched, 422 closure windows for 2026.
    Matching is deliberately conservative (block numbers must agree, ties
    rejected); unmatched: Ang Mo Kio Central M&FC, Changi Village HC, China
    Square FC, Circuit Road M&FC, Haig Road M&FC, Lau Pa Sat, Market Street HC,
    Marsiling Lane M&FC, Tekka Market, Whampoa Makan Place.
- Meal configurations: schema + `configurationNutrition()` with tests; no
  production rows yet (McDonald's fries/drinks/set prices aren't sourced).

### Search engine (`src/lib/search/`)
- Plain-language parser (regex, $0): calories, protein, carbs, price, diet,
  gluten-free, allergens, not fried, cooking methods, spice, open now, near me.
- Deterministic filters incl. allergens (unknown never "safe"), cooking,
  spice, open now (SGT, crosses midnight, NEA closures), distance, area,
  venue type, platform, verified only, price-checked-within.

### UI
- Dark "Navy & Signal" redesign: Discover (ask box, filter bar, chips,
  cards on mobile / sortable table on desktop, compare up to 3), Filters
  sheet with live count, Compare page, rebuilt dish and brand pages showing
  trust label, assumptions, allergens (likely vs declared vs unknown),
  cooking style, outlets with NEA closure dates and SFA grade.
- Browser now loads ~110 KB JS + a ~400 KB (gzip) search index instead of
  the full 4 MB TS dataset in the bundle.
- Removed: dark-mode toggle (dark-only), Meal Tray (replaced by Compare),
  presets bar (the ask box and filters cover them).

## Verification
- `npx tsc --noEmit`: clean.
- `npm test`: 53/53 — integrity, **v1→v2 parity** (every dish's name, stall,
  price, macros and protein-per-dollar identical; 13 filter combinations
  return identical result sets to the v1 screener), rules, search, hours,
  meal nutrition.
- `npm run build`: 4,439 static pages generated (1,728 brand + 2,704 dish + app pages).
- Screenshots checked at 390 px and 1440 px.

## Next steps
1. Source McDonald's fries / drinks / set prices → first real meal configuration.
2. Chain opening hours from official store locators → `outlet_hours`.
3. Re-check prices (set `lastVerifiedAt`) starting with popular dishes.
4. Re-enable research agents against `/data` (see CLAUDE.md §0).
