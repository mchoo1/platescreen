# 2026-08-31 — Migrate 17 FairPrice "Ingredients" from MenuItem to GroceryProduct

## Why

Found during the 2026-08-31 launch-readiness review: 17 `MenuItem` rows
(`category: "Ingredients"`, `brandId: "fairprice"`) stored **whole-retail-
package totals**, not per-serving/per-dish macros — e.g. `ing_jasmine_rice`
was `calories: 18000, protein: 350, price: 12` (a whole 5kg bag of rice, not
a plate of rice). Because `MenuItem` is "one row = one screenable dish," and
the main screener table sorts by protein-per-dollar by default, a bag of dry
rice legitimately out-ranked every real cooked dish in the database — a
first-time visitor's unfiltered view of the app was topped by grocery
ingredients, not meals. The 2026-08-22 fix (`9ABJGJWrVG4XUMcBSPnYQ5qSAH43`)
had already excluded `outletType: 'supermarket'` from the homepage's curated
"Top protein/$ picks" carousel, but that exclusion never applied to the main
table these 17 rows still lived in.

`src/lib/groceryProducts.ts`'s own header comment already flagged this
exact fix as pending: "fairprice's 17 'raw ingredient' items... are flagged
... as a future conversion candidate for this table — not converted yet."
This session does that conversion.

## What changed

- **Removed** all 17 `Ingredients`-category rows from `src/lib/menuItems.ts`
  (ids `ing_chicken_breast`, `ing_chicken_thigh`, `ing_eggs_10`,
  `ing_canned_tuna`, `ing_silken_tofu`, `ing_greek_yogurt`,
  `ing_jasmine_rice`, `ing_brown_rice`, `ing_rolled_oats`,
  `ing_sweet_potato`, `ing_canned_chickpeas`, `ing_banana`,
  `ing_baby_spinach`, `ing_broccoli`, `ing_whole_milk`,
  `ing_light_soy_sauce`, `ing_sesame_oil`). They no longer appear in the
  food screener at all — `GroceryProduct` has no UI consumer yet (nothing in
  `screener.ts`/`ScreenerApp.tsx` reads `GROCERY_PRODUCTS`), so removing
  these rows is what actually fixes the ranking-pollution bug.
- **Added** 17 new rows to `src/lib/groceryProducts.ts` in the proper
  `GroceryProduct` shape (`packageSize`/`packageUnit`/`packagePrice` +
  `caloriesPer100`/`proteinPer100`/`carbsPer100`/`fatPer100`).

## Method — no macro data invented

Each `MenuItem`'s original totals were **real, sourced numbers** (that part
was never wrong) — the bug was the container (whole-package totals stored as
if they were one dish), not the numbers themselves. So the fix is
reshaping, not re-researching: for each item, found the round real-world
retail package size (a 500g pack, a 1L carton, a dozen eggs, a 190ml
bottle, etc.) whose resulting per-100g/ml/each figures land on real,
recognizable nutrition values for that food, then set that as
`packageSize`/`packagePrice`/`packageUnit` and divided the original totals
by it to get `caloriesPer100` etc.

Example: `ing_jasmine_rice` (18,000 cal / 350g protein / 4,000g carbs / 25g
fat / $12 total) ÷ 5,000g package = 360 cal, 7g protein, 80g carbs, 0.5g fat
per 100g — all consistent with real jasmine rice nutrition and a real 5kg
FairPrice bag price. The tight fit between the derived per-100g figures and
real-world nutrition values across all 17 items (chicken breast → matches
raw chicken breast almost exactly at a 500g pack; sesame oil → matches pure
oil's ~900 cal/100ml at a 190ml bottle; a banana → matches a single ~118g
banana almost exactly) is itself evidence these totals were originally
computed the same way in reverse (real per-100g data × an assumed package
size), which is why this reconstruction is confident rather than guessed.

**Confidence downgraded from `verified` to `estimated`** on all 17 migrated
rows: the per-100g macro values are grounded in real nutrition data, but the
exact package size is this session's reconstruction, not a re-read label —
overclaiming `verified` here would be dishonest per the project's own
conservative-confidence norms.

Two items (`fairprice_canned_tuna` and `fairprice_canned_chickpeas`) used a
drained-weight package size rather than raw retail package weight, since
that's the edible-portion basis their original totals appear to be computed
on — noted in case of future double-checking against an actual label.

## Verification

- `npx tsc --noEmit`: clean.
- Runtime integrity check (`tsx`, evaluating the real exported arrays): 0
  duplicate ids and 0 orphaned `brandId` references in both `MENU_ITEMS`
  (2,551 rows) and `GROCERY_PRODUCTS` (19 rows, up from 2); 0 remaining
  `category: "Ingredients"` rows in `MENU_ITEMS`; 0 remaining `ing_`-prefixed
  ids anywhere in the codebase.
- Confirmed `fairprice` brand still has 7 legitimate single-serving
  `MenuItem`s (Rotisserie Chicken, sushi, bento box, salad, sandwich,
  onigiri) — the migration only touched the 17 whole-package rows, nothing
  else under that brand.
- **Full `npm run build` (static export) could not be completed in this
  sandbox** — it reliably reached ~75% of static page generation
  (3,228/4,304 pages) within this session's per-command time budget and was
  killed before finishing, three attempts in a row. Same class of issue
  CLAUDE.md and an earlier automated run (2026-08-31, `kopitiam_tiong_bahru_
  tian_bo_shui_kueh_pte_ltd` batch) already documented as a sandbox resource
  constraint (~2.8GB RAM) rather than a content problem — the Vercel
  deployment of `b6efd11` (the immediately preceding commit, same page
  count within 17) built cleanly on Vercel's own infrastructure in 1 minute
  with 0 errors, which is the actual authoritative signal for a static-export
  project. This change touches only two pure-data files (no page/component
  logic), so the risk profile is materially lower than the SEO-pages
  feature that already cleared a full Vercel build. **Recommend confirming
  via the next real Vercel deploy** (i.e. after `git push`) rather than
  treating the local timeout as a blocker.

## Not done / left for later

- `GroceryProduct` has no rendering UI yet — these 19 rows exist in the
  data layer but aren't shown anywhere in the app. Building that UI (a
  "Grocery" tab or similar) is separate future work, tracked in
  `ROADMAP.md`.
- Real per-package research for other grocery chains (Cold Storage, Giant,
  Sheng Siong, Don Don Donki) is still unstarted — this session only
  migrated FairPrice's existing 17 items into the correct shape, it didn't
  add new grocery coverage.
