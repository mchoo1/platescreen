# Research Session — 2026-08-21 — Saizeriya

**Track:** restaurants / food_court / hawker / coffeeshop / canteen (`platescreen-research-restaurants`)
**Queue entry:** `saizeriya` (type: `restaurant`, priority: `medium`)
**Outcome:** MenuItems-only update to an existing Brand. Queue entry flipped `pending` → `researched`.

## Selection (Phase 1)

595 pending entries matched the restaurant-track types (`restaurant`, `food_court`, `hawker`, `coffeeshop`, `canteen`). No `high`-priority entries were pending. Among `medium`-priority entries, `saizeriya` was first in array order, so it was selected deterministically.

Checked `src/lib/brands.ts` and found `id: "saizeriya"` already present, with 9 existing `MenuItem` rows (all `confidence: "estimated"`) and 14 existing `Premises` rows. The queue entry itself was still marked `pending` — a stale status flagged as an aside by the `chicken_katsu_don`-adjacent session on 2026-08-20 ("looks like a stale queue status from an earlier run, left untouched as out of scope for this task"). Per Phase 1 step 5, since the Brand already existed, this run's scope was Phase 2 + MenuItems only — no new Brand or Premises.

## Research (Phase 2)

- **Official source checked:** [saizeriya.com.sg/menu](https://www.saizeriya.com.sg/menu/) → linked official Grand Menu PDF, `GrandMenu202603S_single.pdf` (dated 2026-03, current as of this session). This PDF has real, current Singapore dish names and SGD nett prices for the full menu (salads, soups, focaccia, appetisers, pizza, pasta, doria/gratin/rice, grill, dessert, wine/drinks) — but **no nutrition/macro data**. The existing queue-entry note ("nutrition PDF on website") was inaccurate; corrected in the queue entry.
- **Macro source:** No HPB Nutrition Information Centre entry exists for Saizeriya. No Singapore-specific macro source was found. Used [kalori.jp](https://kalori.jp/en/shops/saizeriya/products/) — a Japan-focused nutrition database for the same chain (Saizeriya is Japanese-owned; the Singapore menu shares many dishes with the Japan menu) — as the closest available analog. Note kalori.jp's own values are partly AI-estimated from official Saizeriya JP data/product images, so this is a two-hop estimate (analog chain-market + a source that itself estimates some values). All new items marked `confidence: "estimated"` accordingly, never `"verified"`.

### Items added (4)

Matched by name against the current official SG Grand Menu PDF for naming/pricing; macros sourced from kalori.jp's closest-named Japan-menu equivalent.

| Item | SG Price | Calories | Protein | Carbs | Fat | Basis |
|---|---|---|---|---|---|---|
| Milano Doria | $5.90 | 547 | 17g | 76g | 20g | kalori.jp "Milanese Doria" (ミラノ風ドリア) |
| Hamburger (Beef, Demi Sauce) | $6.50 | 540 | 31g | 17g | 39g | kalori.jp "Hamburg Steak" (ハンバーグステーキ) |
| Arugula Chicken Salad | $4.90 | 235 | 27g | 14g | 8g | kalori.jp "Chicken Salad" (チキンのサラダ) |
| Sautéed Spinach with Bacon | $4.90 | 223 | 9g | 9g | 17g | kalori.jp "Sautéed Spinach" (ほうれん草のソテー), bacon component not separately quantified |

Existing 9 items (Margherita Pizza, Pepperoni Pizza, Aglio e Olio Spaghetti, Carbonara, Meat Sauce Spaghetti/Bolognese, Grilled Chicken with Herb, Caesar Salad, Tiramisu, Garlic Bread) were left untouched — no changes to their data, no near-duplicates added. New items were chosen to diversify coverage into rice/doria, grill, and additional salad/side categories not previously represented.

**Total items for Saizeriya after this session: 13** (9 existing + 4 new).

### Skipped candidates

Several other SG-menu items had partial macro matches on kalori.jp but were skipped this session for lower match confidence (e.g., Salmon Salad vs. kalori's "Shrimp Salad" — different protein, not a close enough analog) or because PDF price-to-item mapping was ambiguous due to multi-column layout extraction (e.g., other Doria variants, Chicken Wing). Left for a future session rather than guessing.

### Confidence breakdown (new items)

- `verified`: 0
- `estimated`: 4
- `community`: 0

## SFA registration (Phase 3)

Skipped — `type` is `restaurant`, not `hawker`/`food_court_stall`, and the Brand already existed with no new Premises being added.

## Write (Phase 4)

- `src/lib/menuItems.ts`: appended 4 new `MenuItem` objects (ids `saiz_milano_doria`, `saiz_hamburger`, `saiz_arugula_chicken_salad`, `saiz_sauteed_spinach_bacon`), all `brandId: "saizeriya"`. No type annotation added to the `MENU_ITEMS` export.
- `src/lib/brands.ts`: no changes (Brand already existed).
- `src/lib/premises.ts`: no changes.
- `src/lib/researchQueue.ts`: `saizeriya` entry `status` flipped `pending` → `researched`; `notes` field updated to reflect what was actually done and to correct the inaccurate "nutrition PDF on website" claim.

## Verify (Phase 5)

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox directory, ran `npm install`, then `npx tsc --noEmit`.

**Result: passed, no errors.**

## Notes for future sessions

- The `saizeriya` queue entry's stale `pending` status (despite the Brand/MenuItems already existing) suggests it's worth spot-checking other non-hawker-batch queue entries for the same drift — this appears to be an isolated occurrence flagged once already, but wasn't fixed until this run.
- Several Doria/rice-dish variants and Chicken Wing remain uncovered due to ambiguous PDF price extraction; a future session could resolve this by viewing the PDF's images directly rather than text-extracting it, or contacting Saizeriya SG for an official nutrition sheet.
