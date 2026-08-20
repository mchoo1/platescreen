# 2026-08-20/21 — Brand/Premises restructure + SFA-sourced premises enhancement

## What changed

1. **`Outlet` split into `Brand` + `Premises`.** A Brand is identity/menu (name, cuisine, aliases, diet tags). A Premises is one real physical location (address, coordinates, licence), FK'd to a Brand. Chain branches are now first-class Premises rows instead of a buried array — queryable, CSV-exportable, independently sourced. `FoodOption` renamed to `MenuItem` (FK to `brandId` instead of `outletId`). A new `GroceryProduct` type exists in the schema (per-100g macros + package size) for future packaged-SKU research — zero rows populated this round. See `reference/planning/database-restructure-proposal-2026-08-20.md` for the full reasoning.

2. **Deleted 27 fabricated `food_court_stall` outlets** (`koufu_chicken_rice_stall`, `kopitiam_western_stall`, etc.) and their 63 attached MenuItems — leftover generic placeholders from before the hawker-centre cleanup that were missed last session because they were typed differently.

3. **Merged `store_fairprice` into `fairprice`** (duplicate rows for the same real retailer) — 17 items carried over, flagged for future conversion to `GroceryProduct` (they're raw ingredients, not ready-to-eat dishes, currently still shaped as MenuItem).

4. **Enhanced Brand+Premises using real SFA licence data.** Bulk-downloaded the full SFA/data.gov.sg licensed-establishment dataset (36,687 records) and matched it against every existing chain by **corporate licensee name** (not the unreliable fuzzy search, and not simple address-text matching — both produced false positives, see below). 25 chains + 3 food-court operators got real, verified premises:

   | Brand | Real premises found | Brand | Real premises found |
   |---|---|---|---|
   | McDonald's | 140 | Domino's Pizza | 22 |
   | Starbucks | 123 | Ya Kun Kaya Toast | 31 |
   | Cheers | 112 | Saizeriya | 15 |
   | BreadTalk | 96 | Texas Chicken | 12 |
   | KFC | 83 | Nando's | 11 |
   | Koufu (operator) | 65 | Yoshinoya | 9 |
   | Pizza Hut | 65 | Paris Baguette | 6 |
   | Foodfare (operator) | 48 | Genki Sushi | 4 |
   | Kopitiam (operator) | 48 | Subway | 2 (partial — see gaps) |
   | Coffee Bean & Tea Leaf | 59 | The Daily Cut | 2 |
   | Burger King | 36 | Sheng Siong | 1 (partial) |
   | FairPrice | 25 | Bonchon | 1 (partial) |
   | The Soup Spoon | 25 | | |

   **Total: 1,041 real premises, 1,023 successfully geocoded (98.3%)** via OneMap. The 18 that couldn't be geocoded are mostly demolished/redeveloped buildings still in the SFA dataset but no longer in OneMap's index (the old Rochor Centre, demolished 2018; the old National Stadium) — left with `lat`/`lng` null rather than guessed.

   **kopitiam/koufu/foodfare are restored as real Brand+Premises** (they were fully deleted last session for having zero real data and fake stalls attached) — now they have genuine licensed food-court locations, still with **zero MenuItems** (no reliable way to know real individual stall names/dishes inside a generic operator-run food court — same "don't fabricate" principle as the hawker-centre cleanup). `banquet` could not be matched under any tested corporate-name variant and stays absent.

## Data quality safeguards (why this took longer than a blind name match)

- **Fuzzy/address-text matching produces false positives.** "GRAIN" matched 18 records, all unrelated companies coincidentally containing the word "grain." "GIANT" matched addresses that were just buildings historically named "Giant Building," unrelated to the supermarket. Switched to strict corporate **licensee-name** matching, which is far more precise.
- **`cold_storage` was deliberately excluded.** Its registered entity, "Cold Storage Singapore (1983) Pte Ltd," also holds licences for Giant hypermarkets, 7-Eleven, and other Dairy Farm banners in Singapore — most of its 397 SFA records give no address-text hint of which banner they actually are (several "Shell Service Station" addresses under this entity are almost certainly 7-Eleven, not Cold Storage). Bulk-attaching all 397 would have risked mislabeling hundreds of premises. Left for the official store-locator method instead — documented in `branchQueue.ts`.
- **OneMap geocoding required careful rate handling.** Concurrent requests (even at just 5-12 workers) saw success rates as low as 16-30%; strictly sequential requests with light spacing recovered to ~90%+. Took multiple slow passes to reach 98.3% coverage.

## Numbers

| | Before this session | After |
|---|---|---|
| Brands (was Outlets) | 773 | 748 |
| Premises (was embedded branches, 2 chains only) | 132 (mcd+kfc partial) | 1,721 (28 chains/operators + every single-location brand) |
| MenuItems (was FoodOptions) | 896 | 833 |
| Premises with real coordinates | 132 | 1,703 |

MenuItems dropped from 896 to 833 (63 removed — the fake food_court_stall placeholders); nothing else was cut. Brands dropped from 773 to 748 net (-27 fake stalls, -1 duplicate fairprice merge, +3 restored operators).

**Honest gaps remaining:** 43 brands still have zero real location data (mostly bubble-tea and smaller chains whose SG operating entity name doesn't match their public brand — a real, documented limitation of licensee-name matching, not a bug). 593 brands have zero MenuItems (590 are the new hawker stalls already queued for research from last session, 3 are the restored food-court operators with no fabricatable menu). Full detail and next steps for each unresolved brand are in `src/lib/branchQueue.ts`'s per-entry notes.

## Verification

- `npx tsc --noEmit` — clean
- `npm run build` — compiled successfully, 4/4 static pages
- 0 orphaned Premises, 0 orphaned MenuItems (all `brandId` FKs resolve)
- 748 unique brand ids, no duplicates

## Files touched

- `src/types/db.ts` — `Brand`, `Premises`, `MenuItem`, `GroceryProduct`, `Operator` added; `Outlet`, `FoodOption`, `OutletBranch` removed
- `src/lib/brands.ts`, `src/lib/premises.ts` (chunked into `PREMISES_1..5` — see file header), `src/lib/menuItems.ts`, `src/lib/operators.ts`, `src/lib/groceryProducts.ts` (new, empty) — replace `outlets.ts`/`foodOptions.ts`/`outletBranches.ts` (deleted)
- `src/lib/screener.ts`, `src/lib/exportToStride.ts` — rewritten for the new schema
- `src/lib/branchQueue.ts` — `outletId` renamed `brandId`; entries updated with this session's SFA findings (what worked, what was tried and failed, what's partial)
- `src/lib/researchQueue.ts` — header comment updated (data itself unchanged)
- Scheduled tasks `platescreen-research-restaurants`, `platescreen-research-grocery`, `platescreen-research-branches`, `platescreen-sync-to-stride` — all four prompts rewritten for Brand/Premises/MenuItem/GroceryProduct

## CSV exports

`PlateScreen_brands_2026-08-21.csv`, `PlateScreen_premises_2026-08-21.csv`, `PlateScreen_menu_items_2026-08-21.csv`, `PlateScreen_operators_2026-08-21.csv` — written to the user's Desktop.
