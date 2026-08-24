# 2026-08-24 — Surfaced dine-in/takeaway/delivery in the PlateScreen UI

Task #60, per direct user priority ("work on both, prioritize UI first" — following the
platforms-accuracy audit that found the `platforms` field was real data flowing through
`screener.ts`/`exportToStride.ts` but never rendered or filterable anywhere in the live
PlateScreen web app).

## What was found

`ScreenerRow.platforms` (`dine_in | grab_go | delivery | self_cook`) was already computed
in `buildScreenerRows()` and exported to Stride (`exportToStride.ts:50,94`,
`platformsToServiceTypes()`), but a full search of `ScreenerApp.tsx`, `FilterPanel.tsx`,
and `ScreenerTable.tsx` showed zero references to it — no filter control, no column, no
badge. The only thing a PlateScreen user could see was `outletType` (hawker/restaurant/
etc.), which doesn't tell you whether you can actually sit down, grab it to go, or get it
delivered.

## What was added

**`src/lib/screener.ts`**
- `ScreenerFilters.platforms: Platform[]` (new filter field), added to `DEFAULT_FILTERS`.
- `applyFilters()`: rows must have every selected platform present in their own
  `platforms` array (AND semantics — "dine-in AND delivery" narrows to outlets offering
  both, matching how the existing diet-tag filter behaves).
- `PLATFORM_OPTIONS` constant (value/label/emoji per platform), mirroring the existing
  `DIET_TAG_OPTIONS`/`OUTLET_TYPE_OPTIONS` pattern exactly.

**`src/components/FilterPanel.tsx`**
- New "How you'll get it" filter section with pill toggles (🍽️ Dine-in, 🥡 Takeaway,
  🛵 Delivery, 🛒 Ready-to-cook), placed right after the location/near-me controls and
  before macros — ahead of "Store type," reflecting the user's stated priority that this
  matters more than cuisine/format category.
- "Reset all filters" now also clears `platforms`.

**`src/components/ScreenerApp.tsx`**
- URL state sync: `?platform=dine_in,grab_go` round-trips through `filtersFromParams`/
  `paramsFromState`, so a filtered/shared link preserves the platform selection like every
  other filter.

**`src/components/ScreenerTable.tsx`**
- Small inline emoji badges next to the restaurant name in every row (`PlatformBadges`),
  so a user scanning results sees at a glance whether an item is dine-in-only, takeaway-
  available, delivery-available, etc. — without needing to open a filter to check.

## What this doesn't fix

This is a pure UI/plumbing change — it makes the existing `platforms` data visible and
filterable. It does NOT fix the underlying data-quality problem also found in the same
audit (973 `food_court_stall` brands all defaulted to identical `[dine_in]`, several major
chains missing `delivery`) — that's tracked separately as task #61 and is being worked on
in parallel per the user's "work on both" instruction.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean (4/4 static pages). Build-mirror diff
confirms live and mirror files (`screener.ts`, `FilterPanel.tsx`, `ScreenerApp.tsx`,
`ScreenerTable.tsx`) are byte-identical. No new columns were added to the table (avoids
disrupting the existing `colSpan` empty-state logic) — platform badges render inline in
the existing Restaurant cell instead.
