# Research Session — Four Leaves — 2026-08-22

**Track:** Grocery/grab-and-go/ready-to-eat (`platescreen-research-grocery`)
**Queue entry:** `four_leaves` (type: `grab_go`, priority: `low`) — selected as the first-listed pending entry in this track after `soulgreen`, `coffeesmith`, and `hollin` were confirmed already `researched`.

## Brand

Added `four_leaves` to `src/lib/brands.ts` — Four Leaves, a Singapore bakery chain (Four Leaves Pte Ltd, first outlet 1981, 30+ outlets islandwide as of 2026, also operates sub-brands St Leaven, Epi d'Or, and Country Brot). `dietTags: []` — confirmed via two independent sources not to hold Muis halal certification, so nothing was guessed at brand or item level.

## Source URLs used

- https://islifearecipe.net/mall-restaurant-directory/four-leaves-bedok-mall/ — prices + calorie figures for Hokkaido Dome, An Pan, Tuna Bun, Strawberry Shortcake, Mille Feuille (third-party mall/bakery blog, not an official brand or HPB source — hence `estimated`, not `verified`)
- https://www.lemon8-app.com/@nataniapriska/7505230600467415569 — Garlic Cream Cheese Bread price ($2.40), no calorie data given
- https://bukitpanjangmall.com/shop/four-leaves — cross-check on item names/price distribution, general menu categories
- https://bestfoodwhere.sg/menu/four-leaves — cross-check on menu categories (Mini Buns, Bread & Buns, Signature Cakes, etc.)
- https://thedurianbakery.com.sg/four-leaves/ — whole-cake pricing (15/21/24cm sizes, $30–$86) — these were NOT added as MenuItems (see below)
- Halal status: https://x.com/halalSG/status/296452699283656705 (Muis confirms not certified) cross-checked against islifearecipe.net's own halal note

## MenuItem vs GroceryProduct

All 6 items added as **MenuItem** (0 GroceryProduct). Four Leaves sells individually priced, single-serving baked goods at retail counters — no per-100g packaged SKUs fit the GroceryProduct shape here.

## Items added (6 MenuItems)

| id | name | price | calories | confidence |
|---|---|---|---|---|
| four_leaves_hokkaido_dome | Hokkaido Dome | $2.50 | 220 | estimated |
| four_leaves_an_pan | An Pan (Red Bean Bun) | $2.20 | 210 | estimated |
| four_leaves_tuna_bun | Tuna Bun | $2.80 | 240 | estimated |
| four_leaves_strawberry_shortcake | Strawberry Shortcake (Slice) | $6.00 | 280 | estimated |
| four_leaves_mille_feuille | Mille Feuille | $5.50 | 350 | estimated |
| four_leaves_garlic_cream_cheese_bread | Garlic Cream Cheese Bread | $2.40 | 310 | estimated |

**Confidence breakdown:** 0 verified / 6 estimated / 0 community.

Calories for the first 5 items came from islifearecipe.net's per-item figures; protein/carbs/fat splits are reasoned estimates from typical bakery-item composition (the source gave calories only, not full macros). Garlic Cream Cheese Bread had no calorie figure anywhere in the sources found — fully reasoned estimate from comparable garlic/cream-cheese bakery breads. None qualify as `verified` since no official Four Leaves nutrition PDF, HPB Nutrition Information Centre entry, or Open Food Facts SG-scanned entry exists for this chain.

## Skipped

- Whole cakes (Black Forest Classic, Almond Fruits Top, Mango Tropicana, Original Strawberry Cake, Chocolate Classico, Coco Exotic — $30–$86 across 15/21/24cm sizes): no per-slice calorie/macro basis found, and a whole multi-kg cake doesn't fit MenuItem's one-serving shape.
- Mini bun variants (Little Tuna Bun, Little Almond Cream Cheese, Little Egg Roll, etc.): near-duplicates of standard-size items already covered, or unpriced in available sources.
- Cartoon/custom/special-occasion cakes: no fixed price or macro basis (price "varies based on size and design").

## Data-quality note

`sgeats.net/four-leave-menu-singapore` appeared in web search results as a Four Leaves price-list page but now resolves to an unrelated Indonesian online-gambling redirect (domain likely expired/hijacked). Not used as a source. Flagging in case it resurfaces in a future run's search results.

## Typecheck result

`npx tsc --noEmit` — **PASS** (exit code 0), run from a scratch copy (`node_modules`, `.next`, `out`, `.git`, `reference` excluded, `npm install` run fresh, 394 packages).

Note: during this session, `src/lib/brands.ts` was found to have a pre-existing malformed structure introduced by an in-progress edit (a duplicated closing brace right where this entry needed to be appended) — this was corrected as part of writing the Four Leaves record, and the fix is included in this commit. The repo also showed signs of a concurrent process modifying `src/lib/menuItems.ts` and `src/lib/researchQueue.ts` during this run (uncommitted hawker-stall research from the sibling `platescreen-research-restaurants` track was present in the working tree throughout) — this session's edits were appended after re-reading each file immediately before writing, and the final typecheck confirms the combined result is valid.

## Queue status

`four_leaves` flipped to `status: "researched"` in `src/lib/researchQueue.ts` with a detailed note (see file).
