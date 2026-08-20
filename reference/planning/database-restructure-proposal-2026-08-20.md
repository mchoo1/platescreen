# PlateScreen database restructure — proposal

## The core problem

`Outlet` currently conflates two different things: **brand identity** (name, cuisine, menu) and **physical premises** (address, coordinates, licence). That works fine when a business is genuinely 1 brand = 1 place, but Singapore's food/retail landscape has at least five distinct real-world shapes, and forcing all of them through one flat `Outlet` row is what's creating the mess. Concretely, in the live data right now:

- **27 fabricated "food_court_stall" outlets still exist** (`koufu_chicken_rice_stall`, `kopitiam_western_stall`, etc.) — generic placeholder dishes attached to `location: "Koufu"` as a plain string, with no real premises, no SFA data, no real menu. These are the exact same problem as the 114 fake hawker-centre outlets removed last session — they just weren't caught because they're typed `food_court_stall`, not `hawker`. This should have been cleaned up alongside the operator-brand removal and wasn't.
- **`fairprice` and `store_fairprice` are two separate outlets for the same real brand** — one is the "chain" row (0 branches, no coordinates), the other is a "synthetic grocery-ingredients outlet" per `branchQueue.ts`'s own note. That's a naming collision that should be one entity.
- **7 grocery outlets (FairPrice, Cold Storage, Giant, Sheng Siong, Don Don Donki, etc.) have zero location data** and their "menu items" are forced into the same one-dish/one-price/one-macro-set shape as a hawker stall, which doesn't fit packaged groceries (a can of tuna doesn't have "a serving" the way a plate of chicken rice does — it has a package size, a per-100g nutrition panel, and a shelf price).
- **Chain branches live as a nested array on the brand row** (`Outlet.branches`), which is fine for read performance but means a branch can never be queried, CSV-exported, or edited as its own row — you saw this pain firsthand when the branch CSV export needed a manual flatten step.

## The five real shapes in Singapore

| # | Shape | Real-world examples | Licensing reality |
|---|---|---|---|
| 1 | **Standalone single-location restaurant** | A one-shop restaurant, a boutique cafe | One SFA licence, one address, one brand — 1:1 |
| 2 | **Franchise / chain restaurant** | McDonald's, KFC, Ya Kun, Toast Box, Genki Sushi | Each branch usually holds its own SFA licence, but shares one brand identity + largely one menu |
| 3 | **Individually-licensed hawker stall** | Tian Tian Chicken Rice @ Maxwell, any NEA hawker centre stall | Each stall holds its OWN SFA licence directly (confirmed via the SFA dataset work last session) — the "brand" and the "premises" are the same tiny business, just sitting inside a shared building |
| 4 | **Food-court/coffeeshop concession run by an operator** | Kopitiam, Koufu, Foodfare, Banquet, and most HDB coffeeshop stalls | The SFA licence is typically held by the **operator** for the whole food-court premises, not per stall — a "Western Stall" inside a Koufu outlet isn't its own legal entity the way a hawker stall is. This is structurally different from #3 even though both look like "a stall in a shared space." |
| 5 | **Grocery / supermarket / convenience chain** | FairPrice, Cold Storage, Giant, Sheng Siong, 7-Eleven, Cheers | Chain-branch shape like #2, but sells a **product catalog** (packaged SKUs, weight/volume-based), not a dish menu — plus convenience stores also sell some ready-to-eat items that DO fit the dish model (onigiri, hot dogs) |

Five shapes, and the current schema really only has one (#1/#3 collapsed together, #2 bolted on via an embedded array, #4 faked as if it were #3, #5 forced into #1's shape).

## Proposed schema

Split `Outlet` into **Brand** + **Premises**, add a proper **GroceryProduct** type, and add a lightweight **Operator** concept for food-court concessions.

```ts
// ── Brand: WHAT it is — one row per menu/identity, not per physical spot ────
interface Brand {
  id: string;
  name: string;
  emoji: string;
  category: 'restaurant' | 'hawker_stall' | 'grab_go' | 'grocery' | 'convenience' | 'home_cooked';
  cuisine: string;
  aliases: string[];
  dietTags: DietaryFlag[];
  priceRange: PriceRange;
  platforms: Platform[];
  operatorId?: string;   // set only for food-court concessions (see Operator below)
}

// ── Premises: WHERE it physically exists — one row per real address ─────────
interface Premises {
  id: string;
  brandId: string;             // FK -> Brand.id
  label: string;                // "Jurong Point", "Maxwell Food Centre Stall #01", or brandName itself if single-location
  locationType: 'hawker_centre' | 'food_court' | 'coffeeshop' | 'mall' | 'standalone_shopfront' | 'mrt_station' | 'residential';
  locationContext?: string;     // parent building/centre name — "Maxwell Food Centre", "Jurong Point"
  address?: string;
  postal?: string;
  lat?: number;
  lng?: number;
  sfa?: SfaRegistration;        // only when THIS premises holds its own licence (shapes #1, #2, #3)
  source: string;                // provenance of the address/coordinate
}

// ── MenuItem: a cooked dish — FK to Brand (shared menu) ──────────────────────
interface MenuItem {
  id: string;
  brandId: string;              // FK -> Brand.id (dishes belong to the brand, not one branch)
  name: string;
  emoji: string;
  category: string;
  price: number;
  calories: number; protein: number; carbs: number; fat: number;
  compatibleWith: DietaryFlag[];
  confidence: 'verified' | 'estimated' | 'community';
  isPopular?: boolean;
}

// ── GroceryProduct: a packaged SKU — different shape from a cooked dish ─────
interface GroceryProduct {
  id: string;
  brandId: string;               // FK -> Brand.id (the retailer, or 'generic' for unbranded ingredients)
  name: string;
  emoji: string;
  category: string;               // "Dairy", "Canned Goods", "Snacks"
  packageSize: number;             // e.g. 500
  packageUnit: 'g' | 'ml' | 'each';
  packagePrice: number;
  caloriesPer100: number; proteinPer100: number; carbsPer100: number; fatPer100: number;
  confidence: 'verified' | 'estimated' | 'community';
}

// ── Operator: a food-court/coffeeshop OPERATING company ─────────────────────
// Kopitiam, Koufu, Foodfare, Banquet. A Premises of locationType 'food_court'
// with an operatorId set means the SFA licence sits at the Premises level
// (the operator's), not per-Brand. Named concessions inside it (e.g. an
// "Ajisen Ramen" stall inside a Koufu foodcourt) are just Shape #2 chain
// branches that happen to sit inside an operator's Premises — they don't
// need this at all. This entity only matters for the GENERIC, unnamed
// stalls ("Western Stall", "Chicken Rice Stall") that have no real brand
// identity — and honestly, those may be better left unmodeled entirely
// (see recommendation below) rather than represented at all.
interface Operator {
  id: string;
  name: string;
  type: 'food_court_operator' | 'coffeeshop_group';
}
```

## How each shape maps

| Shape | Brand | Premises | Menu model |
|---|---|---|---|
| 1. Standalone restaurant | 1 row | 1 row, `locationType: standalone_shopfront`, own `sfa` | `MenuItem[]` on Brand |
| 2. Franchise chain | 1 row | N rows (one per branch), `locationType: mall/standalone_shopfront`, own `sfa` per branch if known | `MenuItem[]` on Brand (shared across all Premises) |
| 3. Hawker stall | 1 row (brand = the stall itself) | 1 row, `locationType: hawker_centre`, `locationContext` = centre name, own `sfa` — **this is exactly what the 590 new stalls became last session**, just without a separate Premises table (currently squeezed onto the Brand row) | `MenuItem[]` on Brand |
| 4. Operator concession (generic, unnamed) | **Recommend: don't model as Brand/MenuItem at all** — see below | — | — |
| 4b. Operator concession (named chain, e.g. Ajisen Ramen inside a food court) | 1 row, same as shape #2 | 1 row, `locationType: food_court`, `locationContext` = which food court | `MenuItem[]` on Brand |
| 5. Grocery/supermarket chain | 1 row | N rows (branches) | `GroceryProduct[]` on Brand, not `MenuItem[]` |
| 5b. Convenience store chain | 1 row | N rows (branches) | **Both** `MenuItem[]` (hot food, onigiri, sandwiches — items #7-Eleven already has) **and** `GroceryProduct[]` (packaged snacks/drinks) |

### On generic operator concessions (shape #4)

The honest recommendation is to **not fabricate outlets for unnamed food-court stalls at all**. "Chicken Rice Stall" inside a Koufu food court isn't a discoverable, searchable entity the way "Tian Tian Chicken Rice" is — there's no real name, no real macros, no way to verify it, and it was already flagged as fabricated when the 90 real hawker stalls were distinguished from generics. If a specific chain concession inside a food court has a real name (Ajisen Ramen, Astons, etc.), it's shape #2/4b and gets modeled properly with its own Premises. If it's truly generic ("Western Food" stall #14), it doesn't belong in the database until it can be researched as a real thing — same principle already applied to hawker centres. This also means removing the 27 leftover `food_court_stall` outlets flagged above.

## What this fixes

- **Chain branches become real, queryable, CSV-exportable rows** instead of a nested array — no more manual flattening for exports, and each branch can carry its own confidence/source independently (some branches researched, some not).
- **Hawker stalls and operator concessions stop being modeled the same way** — a hawker stall's SFA licence is real per-stall data; a food-court operator's isn't, and pretending otherwise (the 27 fake stalls) produces fabricated-looking real data.
- **Grocery gets a product model that actually fits groceries** — per-100g macros + package size instead of forcing a can of beans into "one dish, one serving, one price."
- **`fairprice`/`store_fairprice` duplication resolves itself** — one Brand row, Premises rows for real branches once researched, `GroceryProduct[]` for its SKUs.
- **Distance/"near me" logic simplifies** — instead of checking `outlet.branches ?? outlet.lat/lng`, it's always "find Premises rows for this Brand, pick nearest" — one code path, not two.

## Migration impact (honest sizing)

- **Low-risk, mechanical**: splitting today's 183 non-hawker outlets into Brand + Premises. The 2 chains with real branch data (mcd, kfc) become 1 Brand + 112/20 Premises rows. The rest become 1 Brand + 1 Premises (using existing `lat`/`lng` where present).
- **Low-risk, mechanical**: the 680 hawker-type outlets (590 new + 90 curated) become 680 Brand+Premises pairs (1:1) — really just splitting one row into two linked rows, no data changes.
- **Needs a decision from you**: what to do with the 27 fake `food_court_stall` outlets — my recommendation is delete them (same treatment as the 114 fake hawker outlets), but flagging before touching since Operator-run food courts might matter to you as a coverage area worth keeping *some* representation of (e.g. "there's a food court here" pin without pretending to know its exact stalls).
- **Needs new research, not just restructuring**: grocery/convenience `GroceryProduct` data doesn't exist yet — moving to the new shape doesn't create SKU-level data, it just gives future research somewhere correct to put it. The 68 grocery/convenience `MenuItem`-shaped entries that are genuinely ready-to-eat items (onigiri, sandwiches, hot dogs) stay as `MenuItem`; anything that's actually a packaged SKU would need re-research under the new shape.
- **Bigger lift**: rewriting `screener.ts`, `ScreenerTable.tsx`, and the CSV export scripts to join Brand+Premises+MenuItem instead of reading one flat `Outlet` — this is a real refactor, not just a data migration, since every "row" in the UI today is actually a MenuItem+Brand join and would become a MenuItem+Brand+Premises join (which Premises? nearest one, same as today's branch logic).

## Recommendation

If this direction looks right, I'd suggest doing it in this order: (1) delete the 27 fake `food_court_stall` outlets now — that's a clear win independent of everything else, (2) split existing data into Brand/Premises/MenuItem per the mapping table above — mechanical, verifiable by row-count, (3) leave `GroceryProduct` as a schema addition with zero rows for now — real SKU research is a separate, larger effort — (4) rewrite `screener.ts`/`ScreenerTable.tsx`/CSV exports last, once the data shape is settled.

Let me know if you want to adjust the shapes (especially the "don't fabricate generic concessions" call) before I implement anything.
