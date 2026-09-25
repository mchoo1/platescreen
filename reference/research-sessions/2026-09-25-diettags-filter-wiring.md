# 2026-09-25 — Wire Brand.dietTags into applyFilters (with a safety guard)

## Why

Flagged in the 2026-09-02 UI/DB review and re-confirmed 2026-09-14:
`Brand.dietTags` (143 brands, e.g. a bakery certified "halal" overall) was
computed onto every `ScreenerRow` but never read by `applyFilters` — only
`row.compatibleWith` (the per-dish tag) affected the Halal/Vegetarian/etc.
filter buttons. So a brand-level tag had no effect on what the filters
actually returned, even though it displayed on the brand's own page (a
separate fix landed by automation between 2026-09-02 and 2026-09-14).

## Method, and a safety bug caught during testing

First pass: added a simple OR — a tag matches if `row.compatibleWith`
includes it OR `row.dietTags` (the brand-level tag) includes it. Verified
this raised halal 679→727, vegetarian 645→675, vegan 125→129, with no
change to keto/high_protein/no_pork/low_carb (no brand currently carries
those as brand-level tags).

**Testing caught a real problem before shipping**: among the 48 newly
surfaced halal-filter rows was `BreadTalk / Pork Floss Bun`. BreadTalk
carries `dietTags: ["halal"]` at the brand level, but this specific item
(`compatibleWith: []`) is correctly, deliberately untagged per CLAUDE.md
5.1's categorical-exclusion rule — a dish explicitly named for pork/offal
gets no `compatibleWith` array at all, full stop, regardless of the
brand's overall certification. A naive brand-level OR silently overrode
that per-dish exclusion, which would have shown a pork item to someone
filtering for halal — a real, food-safety-adjacent regression, not a
cosmetic one.

**Fix**: added `brandTagAppliesToDish(tag, dishName)` — a conservative
keyword guard that blocks the brand-level OR (never the dish's own
`compatibleWith`, which is untouched) when the dish name explicitly names
a disqualifying ingredient:
- `halal` / `no_pork`: blocks on `pork`, `bak kut teh`, `pig organ`,
  `char siu`, `siu yuk`, `sio bak`, `bak kwa`, `ham`, `lard`, `bacon`.
- `vegetarian` / `vegan`: blocks on common meat/seafood/egg keywords
  (chicken, beef, pork, mutton, lamb, duck, fish, prawn, shrimp, crab,
  squid, octopus, bacon, ham, sausage, meat, seafood, egg).

This can only ever narrow the OR-in (under-apply a brand tag to an
ambiguous-by-name dish), never widen it — so an incomplete keyword list
is a missed positive, never a false one. It does not touch or restrict
the existing `compatibleWith` path at all.

## Result (after the guard)

| Tag | Before (compatibleWith only) | After (with guarded brand-tag OR) |
|---|---|---|
| halal | 679 | 725 |
| vegetarian | 645 | 662 |
| vegan | 125 | 129 |
| keto / high_protein / no_pork / low_carb | unchanged | unchanged (no brand uses these as brand-level tags) |

(Vegetarian's net gain dropped from the first pass's unguarded +30 to a
guarded +17 — the difference is dishes the guard correctly excludes, e.g.
brand-halal/vegetarian chains that also sell a named-meat item.)

## Verification

- `npx tsc --noEmit` in the build mirror: clean.
- **Safety check (the one that matters most)**: scanned all 53 pork-named
  dishes database-wide — 0 leak into the halal or no_pork filter results.
  Scanned all 797 meat/seafood-named dishes — the only 3 that appear in
  vegetarian/vegan results were independently confirmed to already carry
  `compatibleWith: ['vegetarian'/'vegan']` directly (legitimate mock-meat
  items: Impossible Ground Beef Hamburg, Veg Butter Chicken, a "Veg Meat"
  set) — pre-existing correct tags, unrelated to and unaffected by this
  change, not new leaks.
- Confirmed the positive case still works: 46 brand-halal-tagged dishes
  with no name conflict are newly surfaced (e.g. A&W Mozza Burger Combo —
  A&W SG is halal-certified, and "Mozza Burger" has no disqualifying
  keyword).
- Regression check: `no_pork AND halal` combined-tag count (425) computed
  correctly, confirming the multi-tag `every()` AND-logic still works
  alongside the new per-tag OR.
- No data files touched — pure filter-logic change in `screener.ts`.

## Not done / follow-ups

- The keyword lists are deliberately small and explicit, matching
  CLAUDE.md 5.1's own categorical-exclusion examples — not an attempt at
  exhaustive ingredient classification. If a future brand-level tag on a
  currently-unused flag (`keto`, `low_carb`, etc.) starts being used,
  `brandTagAppliesToDish` should be extended with a matching guard before
  that tag can safely use the same OR path.
- `UncoveredFilters` (the zero-menu-item brand list) intentionally has no
  diet-tag filter at all (no menu data to test against), so this change
  doesn't touch it.
