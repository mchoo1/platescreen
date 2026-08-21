# Research session — 2026-08-22 — Coffeesmith

**Track:** grab_go / ready_to_eat / supermarket (`platescreen-research-grocery`)
**Queue selection:** 5 pending entries matched this track (coffeesmith, hollin, four_leaves, bengawan_solo, ok_convenience), all `priority: "low"`. No `supermarket`-type pending entries existed. Sorted by priority (all tied at low) → first-listed array order wins → **Coffeesmith**. Confirmed `coffeesmith` did not already exist in `brands.ts`/`menuItems.ts`/`groceryProducts.ts`/`premises.ts` before starting.

## Brand researched

**Coffeesmith** — Korean-origin artisan cafe chain (est. 2008, Garosu, South Korea) with Singapore locations at Orchard Gateway, Northpoint City, Suntec City, Westgate, and Chijmes. Added as a `grab_go` Brand (cuisine: "Cafe", priceRange: "$$", platforms: dine_in + grab_go, dietTags: [] — no halal/vegetarian certification found).

## Sources used

- [coffeesmith.com.sg](http://www.coffeesmith.com.sg/) — official site. Home page loaded (confirms brand story, franchise info) but the menu.html page did not return item content via fetch (likely JS-rendered) — could not pull official prices/macros directly.
- [sgrestaurantmenu.org/coffeesmith-singapore-menu](https://sgrestaurantmenu.org/coffeesmith-singapore-menu/) — third-party SG menu-price aggregator. Used **only for the price list**, cross-checked against the category structure independently confirmed via search snippets from the official site (Espresso, Coffee, Tea, Tea Latte, Frappe, Ade, Bakery, Croissant, Cakes categories all matched known Coffeesmith SG menu structure). **Did not use this site's "Nutrition Information" table** — it is generic/fabricated (references items like "Bagels," "Muffins," and "Nitro Cold Brew" that don't appear anywhere in Coffeesmith's actual menu, and the site itself carries unrelated spam content e.g. online-gambling posts, which further undermines its credibility as a nutrition source).
- General knowledge search confirming SG outlet locations (FoodAdvisor, Tripadvisor, MyFoodStory).

## MenuItem vs GroceryProduct

All 12 items added as **MenuItem** (0 GroceryProduct) — Coffeesmith is a cafe with prepared drinks/food at fixed servings and prices, not a packaged-SKU retailer, so GroceryProduct didn't apply here.

## Items added (12)

| Item | Category | Price | Confidence |
|---|---|---|---|
| Espresso | Espresso | $4.95 | estimated |
| Cafe Americano | Coffee | $5.50 | estimated |
| Cafe Latte | Coffee | $7.15 | estimated |
| Cafe Cappuccino | Coffee | $7.15 | estimated |
| Cafe Mocha | Coffee | $7.70 | estimated |
| Iced Cafe Caramel Macchiato | Coffee | $8.80 | estimated |
| Croissant | Bakery | $5.00 | estimated |
| Ham & Cheese Croissant | Croissant | $12.00 | estimated |
| Smith Waffle | Bakery | $12.00 | estimated |
| Injeolmi Toast | Injeolmi Toast | $8.70 | estimated |
| Chocolate Truffle Cake | Cakes | $9.35 | estimated |
| Strawberry Ade | Smith Ade | $6.60 | estimated |

**Confidence breakdown:** 12 estimated, 0 verified, 0 community.

**Basis for "estimated" macros:** no verified nutrition panel exists for Coffeesmith specifically (brand does not publish one, and no Open Food Facts / HPB entry exists for a boutique cafe chain like this). Macros were reasoned from well-documented standard nutritional profiles for equivalently-sized/composed items at comparable cafes (e.g. a 12oz whole-milk latte ≈190kcal/10g protein/15g carb/7g fat is a widely consistent figure across major coffee chains; a standard butter croissant ≈230kcal is likewise a stable reference point). Prices are third-party-sourced (not officially confirmed) but internally consistent with Coffeesmith's known menu category structure, so also bucketed as "estimated" rather than "verified."

Skipped from this batch: Bingsu and Hand Made Yogurt items (confirmed as menu categories on the official site but no item-level pricing was found in the available sources, so left out per the "no credible basis, leave it out" rule rather than guessing blind).

## Typecheck result

`npx tsc --noEmit` in a sandboxed copy (excl. `node_modules`, `.next`, `out`, `.git`, `reference`) after `npm install` — **passed clean, no errors.**

## Files changed

- `src/lib/brands.ts` — added `coffeesmith` Brand
- `src/lib/menuItems.ts` — added 12 MenuItems (`coffeesmith_*`)
- `src/lib/researchQueue.ts` — flipped `coffeesmith` entry `status` to `"researched"`

No changes to `premises.ts` — location/branch backfill is out of scope for this research track (handled separately by the premises-backfill queue per `BranchQueueEntry` in `types/db.ts`). Known SG locations for a future premises pass: Orchard Gateway, Northpoint City, Suntec City, Westgate, Chijmes.
