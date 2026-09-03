# 2026-09-04 — Boon Tong Kee (Yuhua Market and Hawker Centre)

**Task:** `platescreen-research-restaurants` scheduled run (restaurant/food_court/hawker/coffeeshop/canteen track).

## Target selection

Filtered `RESEARCH_QUEUE` to pending entries of type restaurant/food_court/hawker/coffeeshop/canteen: 76 entries. Sorted by priority (high → medium → low, stable within priority).

The top 4 (`kopitiam`, `koufu`, `foodfare`, `hawkers_street`, all high priority) were re-confirmed as having no addressable Phase 2 gap this run, consistent with the exhaustive audits already recorded on those entries from the 2026-09-02 and 2026-09-03 scheduled runs (not re-walked from scratch — no new information would have surfaced in two days on SFA/licensee data): `kopitiam_china_food` still needs Street View/in-person identification (browser tool access denied at the tool level in every unattended run so far), `kopitiam_king_grouper` needs a Brand-merge restructure outside this task's write scope, and `kopitiam_cheers` is permanently non-food. `koufu`/`foodfare` have 0 zero-menu operator-tagged brands remaining; `hawkers_street`'s 27 stalls all have ≥1 MenuItem already.

`food_junction` (medium priority) has been the de-facto target for the last two scheduled runs (2026-09-02: Ke/Quench; 2026-09-03: Fireyaki) via the same "no gap at the top, sweep down" pattern recorded on its own queue entry. Since it sits at position 69 in priority-sorted order — after several genuinely fresh, never-individually-researched medium-priority entries — and three consecutive incremental touches to the same multi-brand backlog seemed less valuable than fully resolving a new entry, this run instead picked `yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd` (position 59, medium priority): its Brand already existed (2026-08-20 SFA restructuring batch) with only the generic boilerplate note (no prior individual research attempt), and its underlying entity — Boon Tong Kee — is a well-documented, real Singapore restaurant chain, making it a strong, fully-resolvable candidate.

Immediately preceding entries (positions 9–58) are a mix of the known task #29 bare-SFA-licensee-personal-name bucket (e.g. Lim Hang Tong, Chan Kok Hee) and corporate-legal-entity duplicates of chains already covered elsewhere in `brands.ts` (Cold Storage, McDonald's, Pizza Hut, Domino's, KFC, Bengawan Solo, Breadtalk, NTUC Foodfare/Club, Cheers Holdings) — both categories already characterized as non-actionable by this task's methodology in the 2026-09-02 `gen_korean_bbq` session report. Boon Tong Kee (position 59) is not in either bucket — "Boon Tong Kee Pte Ltd" is the real, registered operating entity of a real, singularly-named, well-documented chain.

## Research

Brand `yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd` already existed with a Premises row (`..._p616`) carrying confirmed SFA data: licence `SW14705V000`, licensee "BOON TONG KEE PTE LTD", Grade A, at Yuhua Market and Hawker Centre. No SFA lookup needed (Phase 3 skipped per Phase 1 step 5).

Sources used:
- `boontongkee.com.sg` (official site) — `/recommended-dishes/`, `/chicken-rice/`, `/delivery-menu/` — real dish names, confirms "Sweet & Sour Pork" and "Braised Beancurd and Roast Pork with Shrimp Paste" verbatim.
- `sgfoodprice.org/boon-tong-kee-singapore-menu/` — a third-party aggregator that cites the official site as its source; used for dish names/prices on the à la carte Rice Sets/Chicken & Meats/Bean Curd & Sides/Soups/Beverages tables. **Its "nutrition information" table was explicitly NOT used** — the figures (round numbers, identical table structure/fields repeated across unrelated restaurant pages on the same site) read as templated/formulaic rather than real published data.

Important finding: the official site's zi-char "Recommended Dishes" filter only covers 8 full-service branches (Ang Mo Kio, Balestier, Bukit Timah, Compass One, River Valley, Smith Street, Star Vista, Whampoa West) — Yuhua Market and Hawker Centre is not among them. To avoid overclaiming what this specific hawker-centre premises sells, the added menu favors the classic chicken-rice items (universal to every Boon Tong Kee location, the reason the chain exists) plus a small set of named sides/soup/beverage confirmed on the official site, rather than the full zi-char catalogue.

Also skipped as out-of-shape for a single MenuItem: multi-pax family sets ("Chicken Rice & Bean Curd Set for 3/4 Pax", "Vegetable Set & Chicken Rice for 3 Pax") and "Signature Half Boiled Chicken" ($23.15, a whole/half-chicken sharing portion) — none fit the "one dish, one serving" shape.

## Menu items added (7, all confidence `estimated`)

| id | name | price | cal | protein | carbs | fat | diet tags |
|---|---|---|---|---|---|---|---|
| `btk_yuhua_steamed_chicken_rice` | Steamed Chicken Rice | $6.50 | 550 | 28 | 65 | 18 | no_pork |
| `btk_yuhua_roasted_chicken_rice` | Roasted Chicken Rice | $7.00 | 570 | 29 | 65 | 21 | no_pork |
| `btk_yuhua_chicken_rice_minced_pork` | Chicken Rice with Steamed Minced Pork | $10.30 | 700 | 38 | 67 | 28 | *(none — explicitly named for pork)* |
| `btk_yuhua_soup_of_the_day` | Soup of the Day | $7.70 | 100 | 9 | 6 | 4 | *(none — generic/ambiguous)* |
| `btk_yuhua_sweet_sour_pork` | Sweet & Sour Pork | $18.00 | 420 | 20 | 30 | 24 | *(none — explicitly named for pork)* |
| `btk_yuhua_braised_beancurd_roast_pork` | Braised Bean Curd and Roast Pork with Shrimp Paste | $18.00 | 360 | 18 | 16 | 24 | *(none — explicitly named for pork)* |
| `btk_yuhua_barley_water` | Barley Water | $4.50 | 120 | 1 | 28 | 0 | vegan, vegetarian, no_pork |

Macros are reasoned estimates, not sourced from sgfoodprice.org's suspect nutrition table. Steamed/Roasted Chicken Rice calibrated against this project's own well-established ~550/28/65/18 convention used across dozens of other stalls in `menuItems.ts` (e.g. `bgk_7`, `avfc_9`, and the many `kopitiam_*` chicken-rice entries). "Chicken Rice with Steamed Minced Pork" = base chicken rice + a minced-pork topping addition. "Sweet & Sour Pork" and the beancurd dish calibrated against the project's existing `kopitiam_sin_food_26` "Sweet & Sour Pork Set Meal" (580/22/60/26, rice-inclusive), scaled down to side-dish-without-rice portions. Prices are the real SGD figures from sgfoodprice.org's menu tables (not the official site's delivery-only bento combo prices, which are explicitly marked "not available over the counter").

Per CLAUDE.md §5.1, "Chicken Rice with Steamed Minced Pork", "Sweet & Sour Pork", and the beancurd/roast-pork dish are explicitly named for pork, so they get no `compatibleWith` array at all (categorical exclusion), matching the project's existing convention for e.g. Pork Chop, Bak Kut Teh.

## Verification (Phase 5)

- Synced a build mirror to `/tmp/build/platescreen` (this session's `/sessions` partition was at 100% disk usage; used `/tmp` on the separate `/` partition, which had headroom, and redirected `npm_config_cache`/`HOME` off `/sessions` to avoid `ENOSPC`).
- First `npm install` silently truncated several packages under the disk-pressure conditions (`ts-interface-checker`, `node-releases`, etc. missing compiled `.js` files) — diagnosed via the build's module-resolution errors, fully resolved with a clean `rm -rf node_modules && npm install` once cache/log dirs were redirected. This was a pre-existing environment issue, unrelated to this run's data edit — confirmed by tsc passing cleanly against the corrupted install already, and by the same failure recurring on unrelated stock modules.
- `npx tsc --noEmit` (via `node_modules/.bin/tsc`): silent, exit 0.
- `npm run build`: succeeded — "Compiled successfully", all 4,302 static pages generated.
- Verify script: total MenuItems 2,579 (2,572 → 2,579, +7 matches expected delta), 0 duplicate ids, 0 orphaned items (every `brandId` resolves to a real Brand row), target brand now has exactly 7 items (was 0).
- `diff` of the live `menuItems.ts`/`researchQueue.ts` against the mirror's copies: byte-identical.
- Deleted all temporary audit/verify scripts (all were under `/tmp`, never touched the repo).

## Status

`yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd` flipped from `pending` to `researched` in `researchQueue.ts`, with a matching `UPDATE 2026-09-04` note on the entry.

## Files touched

- `src/lib/menuItems.ts` — +7 MenuItem rows
- `src/lib/researchQueue.ts` — 1 entry: `status: pending → researched`, `notes` appended
