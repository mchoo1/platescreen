# 2026-09-01 — Vegetarian tag backfill: plain coffee/tea beverages

## Why

Flagged as a follow-on opportunity in the prior day's diet-tag coverage
audit and left untouched (that pass stayed scoped to the "named protein
implies no_pork" rule and deliberately didn't introduce a new
category-based inference rule unilaterally): ~44 plain coffee/tea/espresso
beverage items are unambiguously zero-meat and could reasonably carry a
`vegetarian` tag. This session picks that up as its own bounded pass.

## Method

Pulled all untagged `MenuItems` (`compatibleWith` empty) in beverage-shaped
categories (`Beverages`, `Frappuccino`, `Espresso Beverages`) plus a
name-based sweep for coffee/tea/latte/cappuccino/americano/macchiato/flat
white terms in other categories. Manually reviewed every result (44 total)
for anything that wasn't actually a plain drink — one false positive
(`tm_9`, "Trio Roasted Platter", a Chinese roast-meat item that matched the
name regex on an unrelated substring) was caught and excluded.

Every remaining candidate is a standard dairy-based coffee/tea drink
(Kopi, Teh, Coffee, Cafe/Caffè Latte, Cappuccino, Flat White, Americano,
Mocha, Macchiato, Frappuccino variants) with no meat, fish, egg, or
gelatin in the name or concept. Tagged `vegetarian` only — **not**
`vegan`, since most of these (kopi, teh, lattes, frappuccinos) use dairy
(condensed/evaporated/steamed milk), which is compatible with vegetarian
but not vegan.

## Result

| | Count |
|---|---|
| Beverage-category untagged items reviewed | 45 (44 valid + 1 false positive excluded) |
| Tagged `vegetarian` | 44 |

Breakdown: 5 Starbucks Frappuccino variants, 12 Starbucks Espresso
Beverages (lattes/cappuccino/americano/mocha/macchiato), 27 plain
Kopi/Teh/Coffee items from independent kopitiam coffee counters (Wan Gui,
Yong Li, Meeting Point Cafe, Kopi Meow, Wah Kee, 99 Dessert in Cup,
Alsalam Teh Tarik Corner, G K Murthy, Bukit Canberra's Kopi Tan/La Kopi,
The Tarik Drinks, Fei Siong, One Punggol Tuckshop, Le Pantry, Minum Minum).

This matches the ~44 estimate from the prior day's audit almost exactly.

## Verification

- `npx tsc --noEmit`: clean.
- Runtime integrity check (`tsx`): 0 duplicate ids across 2,559
  `MenuItems`, 0 orphaned `brandId` references, all 44 candidates
  confirmed with `vegetarian` in `compatibleWith`, 0 missing.
- Diet-tag coverage: 63.9% (1,634/2,559), up from 62.1% — consistent with
  +44 newly-tagged items, no regressions.
- Total `vegetarian`-tagged items in the dataset: 580.
- Splice script reused the brace-depth object-boundary approach (same as
  the diet-tag and halal audits) — ran clean on the first attempt, fully
  reconciled (44 candidates = 44 replaced + 0 inserted + 0 already-tagged
  + 0 missing).
- Full `npm run build` not run to completion in this sandbox (same
  resource-ceiling pattern as prior data-only changes this week); this
  change touches only one data file with no page/component logic — confirm
  via the next Vercel deploy.

## Not done / left for later

- This closes out both follow-on items flagged by the 2026-09-01 diet-tag
  coverage audit (halal tagging, done same day in a separate commit; this
  vegetarian beverage backfill). ROADMAP.md's remaining open items are
  code-touching or research-capability items (mobile table reflow,
  git-lock root cause, Google Maps/Street View escalation) or awaiting a
  separate human decision (whether "Vegetarian"-branded Indian dishes from
  the halal audit's excluded list should get their own `vegetarian` tag,
  and whether "Nyonya"/Peranakan items deserve dedicated per-item halal
  research) — none of those are in scope for this pass.
