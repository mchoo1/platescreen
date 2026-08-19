# Research session: Ichiban Boshi — 2026-08-20

**Track:** restaurants / food court / hawker / coffeeshop / canteen
**Queue entry selected:** `ichiban_boshi` (priority: medium, first-listed medium-priority pending match in `RESEARCH_QUEUE` — the only higher-priority `pending` restaurant-track entries were `low` priority (`swensen_s`), and `saizeriya`, the other `medium`-priority candidate, is listed after `ichiban_boshi` in the array, so `ichiban_boshi` wins deterministically).

Confirmed `ichiban_boshi` was not already present in `outlets.ts` before starting (it wasn't).

## Outlet

- id: `ichiban_boshi`
- name: Ichiban Boshi
- type: `restaurant`
- cuisine: Japanese
- aliases: `ichiban boshi`, `ichiban`
- `dietTags: []`, `priceRange: "$$"`, `platforms: ["dine_in", "delivery"]`

`dietTags` left empty rather than tagging `halal` — a secondary source (sgmenuprice.net) explicitly states Ichiban Boshi is **not** halal-certified, so no dietary flag applies at the outlet level. `platforms` includes `delivery` based on confirmed Oddle Eats delivery listings for the brand.

## Sources

- [Ichiban Boshi Menu & Prices List Singapore 2026 — sgmenuprice.net](https://sgmenuprice.net/ichiban-boshi-menu/) — menu structure, item names, and SGD prices (fetched 2026-08-20); also the source for the "not halal certified" confirmation.
- [Ichiban Boshi Menu Prices (SG) — PriceListo](https://sg.pricelisto.com/download-ichiban-boshi-sg-menu-pdf) — cross-check source for pricing (page was very large; spot-checked rather than fully parsed).
- [Ichiban Boshi official site](https://www.ichibanboshi.com.sg/menus/) — fetched but returned no usable nutrition data (menu page is JS-rendered/thin on static fetch).
- [Ichiban Boshi delivery — Oddle Eats](https://eats.oddle.me/menus/ichiban-boshi) — confirms delivery platform availability.

No official brand nutrition PDF, no HPB Nutrition Information Centre entry, and no per-dish macro data was found anywhere for this chain — HPB's public dataset is skewed toward fast-food/quick-service chains and doesn't cover full-service Japanese restaurant groups like this one (operated by RE&S). This is a genuine dead end for verified data, not a search shortfall — three distinct source types (brand site, aggregator menu sites, nutrition databases) were checked.

## Items added (10)

Since no outlet-specific macro data exists, all items are reasoned estimates built from well-established nutrition profiles for their dish category (donburi/udon/sashimi/karaage are extremely common Japanese dish archetypes with consistent, well-documented macro ranges across many chains and public nutrition databases) — the same "estimated" methodology already used for the hawker/food-court operator entries in this database, applied here to sit-down Japanese restaurant fare instead.

| Item | Category | Price | kcal | Protein | Carbs | Fat | Confidence |
|---|---|---|---|---|---|---|---|
| Chicken Katsu Don | Donburi | $18.18 | 820 | 32g | 88g | 32g | estimated |
| Chicken Teriyaki Don | Donburi | $14.01 | 650 | 34g | 78g | 16g | estimated |
| Beef Teriyaki Don | Donburi | $16.36 | 700 | 30g | 75g | 22g | estimated |
| Black Pepper Salmon Don | Donburi | $21.07 | 680 | 30g | 68g | 26g | estimated |
| Unajyu (Grilled Eel Rice) | Donburi | $30.48 | 750 | 26g | 95g | 22g | estimated |
| Salmon Sashimi Salad | Salad | $17.54 | 320 | 22g | 14g | 18g | estimated |
| Tori Karaage | Bento Sides | $9.30 | 420 | 22g | 24g | 26g | estimated |
| Tempura Udon | Udon & Soba | $18.71 | 600 | 18g | 82g | 18g | estimated |
| Chirashi Jyu | Jyu | $23.42 | 540 | 34g | 68g | 10g | estimated |
| Edamame | Bento Sides | $5.77 | 120 | 11g | 9g | 5g | community |

Selection spans Donburi (fried/grilled, chicken/beef/salmon/eel variants — kept distinct since preparation method and protein source shift macros by well over 10%), Jyu, Udon, Salad, and Bento Sides, covering the chain's signature categories without near-duplicates.

`compatibleWith` tags: only applied where confirmable directly from dish composition — `pescatarian` on fish/eel/shrimp-based dishes (no meat present), `gluten_free` where the dish is rice/fish-based with no wheat component, and the full vegan/vegetarian/gluten_free/dairy_free/nut_free set on Edamame (a single-ingredient dish: boiled soybean pods + salt). Chicken/beef donburi and karaage carry no diet tags — no basis to claim any.

Edamame is marked `community` (a generic, non-outlet-specific dish value) rather than `estimated`, per the confidence definitions — everything else reflects Ichiban-Boshi-specific menu items even though the macros themselves are inferred.

## Confidence breakdown

- verified: 0
- estimated: 9
- community: 1

## SFA registration

Not attempted — `type: 'restaurant'` is out of scope for SFA lookup per Phase 3 (only `hawker` / `food_court_stall` types apply). `sfa` left unset.

## Build verification

Copied project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to `/tmp/platescreen_check`, ran `npm install`, then `npx tsc --noEmit`.

**Result: PASS** — no type errors (exit code 0, no output). `OUTLETS`/`FOOD_OPTIONS` array exports kept untyped (no annotation added) per the existing TS2590 workaround.

## Queue status

`ichiban_boshi` flipped from `pending` to `researched` in `src/lib/researchQueue.ts`, with a note describing sourcing, methodology, and confidence.

## Notes for human review

- Unrelated to this session's work: spotted that the `saizeriya` queue entry is still flagged `status: 'pending'`, but an outlet with `id: "saizeriya"` already exists in `outlets.ts` (Italian Casual, `$`, dine_in). This looks like a stale queue status left over from an earlier run (similar to the `grain`/`saladbox` "already present" cases noted in earlier sessions), not something introduced here. Left untouched — out of scope for this run, which is scoped to whichever single entry Phase 1's deterministic selection picks. Flagging for a human to correct the `saizeriya` entry's `status` to `researched`.
- Repo state: found stale `.git/HEAD.lock` and `.git/index.lock` files (timestamped Aug 13, matching the known OneDrive-fuse-mount lock issue documented in the 2026-08-13 banquet session report) blocking git operations at the start of this session. Worked around the same way — renamed the lock files aside (`*.stale-<timestamp>`) rather than deleting them, since unlink is blocked on this mount but rename works.
