# 2026-09-04 — J K Kings Prata (85 Fengshan Centre)

**Task:** `platescreen-research-restaurants` scheduled run (restaurant/food_court/hawker/coffeeshop/canteen track).

## Target selection

Filtered `RESEARCH_QUEUE` to pending entries of type restaurant/food_court/hawker/coffeeshop/canteen: 75 entries (down from 76 after yesterday's `yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd` run). Sorted by priority (high → medium → low, stable within priority).

Followed the same "no gap at the top, sweep down and categorize" pattern established over the last several scheduled runs rather than mechanically picking position 0, since the top of the list is known-exhausted:

- Positions 0–3 (`kopitiam`, `koufu`, `foodfare`, `hawkers_street`, all high/medium food_court operators): re-confirmed still non-actionable from their own notes — `kopitiam` needs Street View/in-person ID for its last 3 unresolved operator-brands (browser tool access denied in every unattended run so far), `koufu`'s remaining leads are JS-locked sites already exhausted, `foodfare` is deprioritized per direct user instruction (2026-08-23), `hawkers_street`'s 27 stalls already all have ≥1 MenuItem.
- Positions 4–7 (`new_upper_changi_road_blk_58_lee_len_tong`, `bedok_south_road_blk_16_goh_poo_huat`, `bedok_south_road_blk_16_kwek_ah_heoh`, `clementi_ave_3_blk_448_lee_jim_pong`): individually WebSearched in the 2026-09-02 run and confirmed as task #29's bare-SFA-licensee-personal-name bucket (never appeared on any signage, no stall-level directory names them).
- Positions 8–15: same personal-name pattern (`teo_kiang_huat`, `lim_hang_tong`, `ngern_jwee_chye`, `goh_jee_tee_2`, `lee_kee_yeo_lee_lian_hong`, `au_jiahao_alex`, `chan_cheow_teck`, `chan_kok_hee_tian_guoxi`) — `lim_hang_tong` and `chan_kok_hee` are explicitly named in the 2026-09-04 Boon Tong Kee session report as confirmed task #29 bucket members; the rest follow the identical two-part-Chinese-name pattern.
- Position 16 (`kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd`): corporate duplicate of the already-covered `foodfare` operator chain.
- Position 17 (`telok_ayer_food_centre_e_p_cafeteria_pte_ltd`): checked via WebSearch — no results identify "E P Cafeteria" as a real trading name at Telok Ayer Food Centre. Left pending, not selected.
- Position 18 (`..._jex_pte_ltd`): name too abstract/corporate to be confident it's a real signage name; not pursued this run given a stronger candidate was found shortly after.
- Position 19–25, 27–41, 45, 57, 61, 65–67: corporate-legal-entity duplicates of chains already covered elsewhere in `brands.ts` (Cold Storage, McDonald's, Pizza Hut, KFC, NTUC Club/Foodfare, Cheers Holdings, Domino's) — same non-actionable category identified in the 2026-09-02 `gen_korean_bbq` session report.
- Position 26 (`toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd`): WebSearched — "Chang Cheng Food Paradise Pte Ltd" turned out to be a food-court **operator** company (Chang Cheng Holdings, "one-stop F&B solutions", 160+ food shops/30+ coffee places across Singapore), i.e. this SFA licence likely covers an entire multi-stall venue rather than one dish-stall. Assigning MenuItems to it risks the same container-brand misrepresentation flagged in CLAUDE.md §4.3 (Fork & Spoon, etc.) without first confirming whether this specific Premises row represents one stall or the whole food court. Not selected this run; flagged for a future pass with more investigation.
- **Position 43 (`85_fengshan_centre_j_k_kings_prata_pte_ltd`) — selected.** "J K Kings Prata" confirmed via WebSearch as a real, distinctly-named Indian-Muslim prata/roti-canai coffeeshop business (SFA/ACRA company records: J K Kings Prata Pte Ltd, UEN 201225709H, incorporated 2012; OpenRice lists it as an "Indian Coffeeshop" at its Jurong East branch). This is a real trading name, not a bare licensee or generic corporate holding term, and the SFA licence for this Brand (E02200B000, Grade A) was already confirmed during the 2026-08-20 restructuring at its own 85 Fengshan Centre premises.

## Research

Brand `85_fengshan_centre_j_k_kings_prata_pte_ltd` already existed (Phase 1 step 5) with a Premises row (`..._p583`) carrying confirmed SFA data: licence `E02200B000`, licensee "J K KINGS PRATA PTE. LTD.", Grade A, 4 demerit points, at 85 Fengshan Centre. No SFA lookup needed (Phase 3 skipped).

Sources used:
- WebSearch for "J&K King's Prata"/"JK Kings Prata" — confirmed as a real Indian-Muslim prata restaurant/coffeeshop with a (now-closed per Foursquare/Yelp) Jurong East branch at Blk 326 Jurong East Street 31. Same legal entity (J K Kings Prata Pte Ltd) as the 85 Fengshan Centre Brand in this database — the SFA licence confirms the company operates (or has operated) more than one location.
- Foursquare review snippets (via WebSearch, direct fetch of foursquare.com returned no content — JS-rendered) named specific dishes praised by customers: plain prata, cheese prata, prata with fish curry, and fried chicken biryani.
- A follow-up WebSearch on the business's menu category confirmed prata, murtabak, Indian rojak, and biryani as offered dish types.
- No source describes the 85 Fengshan Centre branch's menu individually — only the Jurong East branch has indexed reviews. Per the same same-chain-different-branch approach used for Boon Tong Kee in yesterday's run, the chain-wide/reviewer-confirmed dish set was used rather than leaving the brand at zero MenuItems, since these are standard items any branch of a prata coffeeshop chain would carry (prata varieties, murtabak, biryani, rojak, teh tarik are universal Indian-Muslim coffeeshop staples, not location-specific specials).
- No official nutrition source exists for this chain (small independent operator, no published nutrition data) — all items are confidence `estimated`.

## Menu items added (8, all confidence `estimated`)

| id | name | price | cal | protein | carbs | fat | diet tags | macro basis |
|---|---|---|---|---|---|---|---|---|
| `jkp_plain_prata` | Roti Prata | $1.20 | 200 | 5 | 28 | 8 | halal, no_pork, vegetarian | exact match to this project's established Roti Prata convention (used across dozens of entries, e.g. `bnp2_2`, `t878c_1`) |
| `jkp_egg_prata` | Egg Prata | $2.00 | 270 | 9 | 32 | 12 | halal, no_pork, vegetarian | exact match to established Egg Prata convention (e.g. `kopitiam_salam_indian_muslim_food_corner`, `svmfc_3`) |
| `jkp_cheese_prata` | Cheese Prata | $2.50 | 340 | 11 | 30 | 20 | halal, no_pork, vegetarian | reasoned estimate — no existing convention in this dataset; calibrated as a richer/higher-fat variant of Egg Prata (dish name itself confirmed by Foursquare reviews) |
| `jkp_fish_curry_prata` | Prata with Fish Curry | $3.50 | 380 | 14 | 40 | 16 | halal, no_pork, pescatarian | reasoned estimate — Roti Prata base + a fish-curry gravy portion sized against this project's Curry/Fish Head Curry family (dish name confirmed by reviews) |
| `jkp_murtabak_chicken` | Murtabak (Chicken) | $6.00 | 450 | 22 | 48 | 20 | halal, no_pork | exact match to established Murtabak (Chicken) convention (`tekka_murtabak`, `gsm_murtabak`); added `no_pork` per CLAUDE.md §5.1 (named for chicken) even though those precedent entries only carry `halal` |
| `jkp_chicken_biryani` | Chicken Biryani | $6.00 | 620 | 28 | 78 | 20 | halal, no_pork | exact match to established Chicken Biryani convention (e.g. `kopitiam_al_mokial_indian_muslim`, `kopitiam_kns_indian`); review described it as "fried chicken biryani" |
| `jkp_indian_rojak` | Indian Rojak | $4.00 | 380 | 14 | 48 | 16 | halal, no_pork | exact match to established Indian Rojak convention (`kopitiam_sha_indian_rojak`, `kopitiam_mohamed_ayaan_rojak`) |
| `jkp_teh_tarik` | Teh Tarik | $1.50 | 112 | 4 | 18 | 3 | halal, vegetarian | exact match to established Teh Tarik convention (`tekka_drinks_stall`, `oar_desserts_drinks`, `gsm_desserts_drinks`) |

Two new dish-macro entries (Cheese Prata, Prata with Fish Curry) were appended to `reference/data/dish-macro-lookup.py`'s `DISH_DB` under a `# --- Batch 2026-09-04 additions ---` header, matching the project's standard methodology (CLAUDE.md §6 step 2).

## Verification (Phase 5)

- `/sessions` partition was at 100% disk usage (same pre-existing environment condition noted in yesterday's Boon Tong Kee report) — synced a build mirror to `/tmp/build/platescreen` on the separate `/` partition (3.5G free), with `HOME`/`npm_config_cache` redirected to `/tmp` to keep npm off `/sessions`.
- `npm install`: clean, 394 packages, no errors.
- `node_modules/.bin/tsc --noEmit`: silent, exit 0.
- `npm run build`: succeeded — "Compiled successfully", all 4,310 static pages generated (1,717 brand pages + 2,585 item pages, up from 4,302/1,717/2,577 before this run — wait, this run only added MenuItems, not a new Brand, so the brand-page count is unchanged and only item-page count grew, consistent with the 1,714+1 / 2,584+1 path listings and the pre-existing conventions this batch reused).
- Verify script (Node, parsed `brands.ts`/`premises.ts`/`menuItems.ts` directly): total MenuItems 2,579 → 2,587 (+8, matches expected delta), 0 duplicate ids across all 2,587 items, 0 orphaned items (every `brandId` resolves to a real Brand row), target brand `85_fengshan_centre_j_k_kings_prata_pte_ltd` now has exactly 8 items (was 0), its Brand and single Premises row both confirmed present and untouched.
- `diff` of the live `menuItems.ts`, `researchQueue.ts`, and `reference/data/dish-macro-lookup.py` against the mirror's copies: byte-identical for all three.
- Deleted the build mirror (`/tmp/build`) and all temporary loader scripts after verification — nothing ephemeral left in the repo or `/tmp`.

## Status

`85_fengshan_centre_j_k_kings_prata_pte_ltd` flipped from `pending` to `researched` in `researchQueue.ts`, with a matching `UPDATE 2026-09-04` note on the entry.

## Files touched

- `src/lib/menuItems.ts` — +8 MenuItem rows (`jkp_*`)
- `src/lib/researchQueue.ts` — 1 entry: `status: pending → researched`, `notes` appended
- `reference/data/dish-macro-lookup.py` — +2 `DISH_DB` entries (Cheese Prata, Prata with Fish Curry)

## Next steps / notes for whoever picks this up next

- `telok_ayer_food_centre_e_p_cafeteria_pte_ltd` (position 17) and `..._jex_pte_ltd` (position 18) are still unresolved and worth a closer individual look — "E P Cafeteria" in particular didn't surface anything on a first search but wasn't exhaustively tried.
- `toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd` (position 26) needs investigation into whether its Premises row represents a single stall or the whole Chang Cheng-operated food court before any MenuItems are added — treat as a potential container-brand case (CLAUDE.md §4.3), not a simple macro-research target.
- `food_junction` (position 68, per yesterday's count) remains a recurring de-facto target for "no fresh gap at the top" runs; still sitting behind several never-individually-swept medium-priority entries in array order.
