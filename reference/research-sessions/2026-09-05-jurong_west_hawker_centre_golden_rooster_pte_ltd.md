# 2026-09-05 — Golden Rooster (Jurong West Hawker Centre)

**Task:** `platescreen-research-restaurants` scheduled run (restaurant/food_court/hawker/coffeeshop/canteen track).

## Target selection

Filtered `RESEARCH_QUEUE` to pending entries of type restaurant/food_court/hawker/coffeeshop/canteen: 74 entries (down from 75 after this morning's `85_fengshan_centre_j_k_kings_prata_pte_ltd` run). Sorted by priority (high → medium → low, stable within priority).

Followed the same "no gap at the top, sweep down and categorize" pattern established over the last several scheduled runs:

- Positions 0–3 (`kopitiam`, `koufu`, `foodfare`, `hawkers_street` — high/medium food_court operators): re-confirmed still non-actionable from their own notes, same as every run this week — `kopitiam` needs Street View/in-person ID for its last 3 unresolved operator-brands (browser access not available in this unattended session either), `koufu`'s remaining leads are already-exhausted JS-locked sites, `foodfare` is deprioritized per direct user instruction, `hawkers_street`'s 27 stalls already all have ≥1 MenuItem.
- Positions 4–15 (bare SFA-licensee personal-name entries — `lee_len_tong`, `goh_poo_huat`, `kwek_ah_heoh`, `lee_jim_pong`, `teo_kiang_huat`, `lim_hang_tong`, `ngern_jwee_chye`, `goh_jee_tee_2`, `lee_kee_yeo_lee_lian_hong`, `au_jiahao_alex`, `chan_cheow_teck`, `chan_kok_hee_tian_guoxi`): previously confirmed task #29 bucket members (personal/legal names that never appeared on any signage) — not re-searched this run, no new evidence would change this.
- Position 16 (`kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd`): corporate duplicate of the already-covered `foodfare` chain.
- Positions 17–18, 19–41 (various): corporate-legal-entity duplicates of chains already covered elsewhere (Cold Storage, McDonald's, KFC, Pizza Hut, Domino's, NTUC Club/Foodfare, Cheers Holdings) — same non-actionable category identified in prior sessions' reports.
- Position ~26 (`toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd`): re-confirmed still flagged from 2026-09-04's run as a likely food-court-operator entity, not a single stall — not selected.
- Position ~45 (`clementi_west_street_2_blk_726_new_century_food_house_721_pte_ltd`): investigated fresh this run. WebSearch found "New Century Food House" is a real, well-documented coffeeshop at 721/726 Clementi West Street 2 (Zomato/Foursquare/sgpbusiness.com listings). However, `sgpbusiness.com`'s corporate profile for "NEW CENTURY FOOD HOUSE @ 721 PTE. LTD." (UEN 201600701W) states its principal activity as SSIC 56122 — "Operators Of Food Courts, Hawker Centres, Coffee Shops And Canteens (With Mainly Food And Beverage Income)" — i.e. this is a coffeeshop-*operator* company, not a single dish-stall's licensee. Assigning a MenuItem to it risks the same container-brand misrepresentation flagged in CLAUDE.md §4.3 (Fork & Spoon, etc.), since the SFA licence likely covers the whole coffeeshop premises, not one internal stall. Not selected — flagged on that queue entry for a future pass to determine whether this Premises row represents one internal stall or the entire venue.
- **Position ~46 (`jurong_west_hawker_centre_golden_rooster_pte_ltd`) — selected.** "Golden Rooster Pte. Ltd." confirmed via WebSearch/web_fetch as a real, well-documented Singapore trading name: a branch of the Tenderfresh Group's 34-outlet "Golden Rooster" heartland-coffeeshop fried/BBQ-chicken franchise, not a bare licensee or generic corporate term.

## Research

Brand `jurong_west_hawker_centre_golden_rooster_pte_ltd` already existed (Phase 1 step 5) with a Premises row (`..._p612`) carrying confirmed SFA data: licence `SW04150L001`, licensee "GOLDEN ROOSTER PTE. LTD.", Grade A, at 638A Jurong West Street 61 #01-22 Pioneer Mall. No SFA lookup needed (Phase 3 skipped).

Sources used:
- `tenderfresh.com.sg/goldenrooster` — Tenderfresh Group's own site confirms Golden Rooster as one of its brands ("fried, BBQ & roasted chicken... uniquely Singapore"), with outlet addresses (Elias Mall, Yishun) but no static menu/price list (delivery-menu link is JS-rendered/blocked from this session).
- A 2016 TODAY/malaymail.com feature ("Seven Singapore places to get your fried chicken fix") names "Golden Rooster by Tenderfresh" explicitly as a 34-outlet heartland-coffeeshop franchise and gives a S$9.80 whole-fried-chicken-with-fries price point.
- A WebSearch summary of Golden Rooster reviews/Wanderlog/OpenRice snippets gave further named dishes and coffeeshop-tier prices: half chicken with rice and salad (~S$5.30), a chicken chop set (S$5.80), Chicken Wing Fried Rice, Black Pepper Chicken Chop Rice, and Fish & Chips as menu items; also confirmed multiple branches (Clementi Ave 3, Jurong West Street 61, Bishan, Ang Mo Kio, Hougang/Kovan, Bedok).
- A 2017 Ivan Teh food-blog review (`ivanteh-runningman.blogspot.com`) titled "Halal-Certified Heartland Franchise" reviewing the shared Tenderfresh Classic & Golden Rooster menu — confirmed per-piece wing pricing (Chicken Wings Fried/BBQ, S$1.40/piece) and named dishes, though its whole/half specialty-chicken-plate prices (e.g. S$18.90) reflect the pricier standalone "Tenderfresh Classic" mall-dining format rather than the cheaper coffeeshop-stall format this specific Brand represents (this Brand's existing `priceRange` is `"$"`).
- `halalboleh.com`'s Sims Vista Market and Food Centre directory explicitly lists "Golden Rooster Western Food" as halal-prepared; corroborated by Tenderfresh Group's own site (`tenderfresh.com.sg/news/categories/halal`) and multiple halalboleh.com listings for sibling Tenderfresh sub-brands (Tenderfresh Classic, Tenderfresh Xpress, Tenderbest) confirming group-wide MUIS certification — set Brand `dietTags: ["halal"]`.
- No source describes this specific Jurong West / Pioneer Mall branch's menu individually — per the same same-chain-different-branch approach used for Boon Tong Kee (2026-09-04) and J K Kings Prata (2026-09-05 morning run), the chain-wide/reviewer-confirmed dish set is used, since fried/BBQ chicken plates and a la carte wings are core, universal Golden Rooster items at every branch, not location-specific specials.
- No official brand nutrition source exists for this small franchise — all items are confidence `estimated`.

One candidate item, "Whole Fried Chicken with Fries" (S$9.80, the most concretely-sourced price point), was deliberately **not** added as a MenuItem — like this project's established whole-cake-SKU exclusion (CLAUDE.md §5), a whole shared chicken doesn't fit MenuItem's one-serving shape and no reliable per-serving split exists.

## Brand changes

- `dietTags`: `[]` → `["halal"]`
- `cuisine`: `"Local & Hawker"` → `"Fried & BBQ Chicken (Western)"` (generic placeholder replaced now that a real cuisine focus is confirmed)
- `emoji`: 🍜 → 🍗
- `aliases`: added `"golden rooster"` (short form, alongside the existing full corporate-name alias)

## Menu items added (7, all confidence `estimated`)

| id | name | price | cal | protein | carbs | fat | diet tags | macro basis |
|---|---|---|---|---|---|---|---|---|
| `goldenrooster_half_fried_chicken_rice` | Half Fried Chicken with Rice & Salad | $5.30 | 780 | 40 | 68 | 38 | halal, no_pork | reasoned estimate — this project's existing `lps_roast_chicken_rice` (650/36/74/20) as a chicken+rice baseline, adjusted up for frying (vs. roasting) and a larger bone-in half-chicken portion vs. a quarter-chicken-rice serving |
| `goldenrooster_chicken_chop_set` | Chicken Chop Set | $5.80 | 650 | 35 | 55 | 30 | halal, no_pork | exact match to this project's existing generic "Chicken Chop" convention in `dish-macro-lookup.py` (650/35/55/30 @ $6.5), essentially identical to the existing `beradikwestern_chicken_chop` hawker-tier entry |
| `goldenrooster_black_pepper_chicken_chop_rice` | Black Pepper Chicken Chop Rice | $6.50 | 630 | 33 | 58 | 32 | halal, no_pork | reasoned estimate — Chicken Chop convention adjusted for a black-pepper-sauce preparation (similar protein/carbs, more fat/sodium from the sauce); added to `dish-macro-lookup.py` as a new dish type |
| `goldenrooster_fish_chips` | Fish & Chips | $6.80 | 680 | 26 | 60 | 32 | halal, pescatarian | exact match to this project's existing `beradikwestern_fish_and_chips` hawker-tier convention; added to `dish-macro-lookup.py` as a new dish type (no prior DISH_DB entry existed despite several menuItems.ts brands already using this exact figure set) |
| `goldenrooster_chicken_wing_fried_rice` | Chicken Wing Fried Rice | $5.50 | 600 | 22 | 70 | 24 | halal, no_pork | calibrated off this project's existing `kopitiam_wok_qi_fried_rice` "Prawn Paste Chicken Cutlet Fried Rice" entry (620/24/70/26 @ $5.5) — same shape (fried rice + a fried-chicken-family topping) |
| `goldenrooster_wings_fried_2pc` | Chicken Wings (Fried, 2 pc) | $2.80 | 360 | 28 | 16 | 22 | halal, no_pork | doubles this project's existing single "Chicken Wing" convention (180/14/8/11 @ $1.6/pc in `dish-macro-lookup.py`); price matches the blog-confirmed $1.40/piece rate |
| `goldenrooster_wings_bbq_2pc` | Chicken Wings (BBQ, 2 pc) | $2.80 | 320 | 28 | 22 | 16 | halal, no_pork | same base as the fried-wing convention, adjusted for a glaze profile (less frying fat, more sugar/carb from the BBQ glaze) — kept distinct from the fried version per this project's precedent of distinguishing fried vs. BBQ/glazed preparations of the same cut |

Three new dish-macro entries (Half Fried Chicken with Rice & Salad, Black Pepper Chicken Chop Rice, Fish & Chips) were appended to `reference/data/dish-macro-lookup.py`'s `DISH_DB` under a `# --- Batch 2026-09-05 additions ---` header. The other two items reused exact existing DISH_DB conventions ("Chicken Chop", "Chicken Wing") without needing new entries.

## Verification (Phase 5)

- `/sessions` partition was at 100% disk usage (same pre-existing environment condition noted in the last several session reports) — synced a build mirror to `/tmp/build/platescreen` on the separate `/` partition, with `HOME`/`npm_config_cache` redirected to `/tmp`.
- `npm install --no-audit --no-fund --prefer-offline`: completed ("up to date"), no errors. (Note: this sandbox's per-tool-call execution window is capped well below what a cold `npm install` needs; two earlier attempts without `--prefer-offline`/`--no-audit`/`--no-fund` did not finish within the window even though most packages were already cached — the flag combination avoiding the network audit/fund round-trips let it complete.)
- `node_modules/.bin/tsc --noEmit`: silent, exit 0.
- `npm run build`: succeeded — "Compiled successfully", all 4,317 static pages generated (1,717 brand pages + 2,594 item pages + 4 static routes, up from 4,310/1,717/2,587 before this run, consistent with +7 items and 0 new brands).
- Verify script (compiled `brands.ts`/`menuItems.ts` to plain JS via `tsc` and inspected directly, since the mirror's `node_modules` had no ts-node/esbuild available): total MenuItems 2,587 → 2,594 (+7, matches expected delta), 0 duplicate ids across all 2,594 items, 0 orphaned items (every `brandId` resolves to a real Brand row, checked against all 1,717 brands), target brand `jurong_west_hawker_centre_golden_rooster_pte_ltd` confirmed to have exactly the 7 new items and its edited `dietTags`/`cuisine`/`emoji`/`aliases` fields, brand count unchanged at 1,717.
- `diff` of the live `brands.ts`, `menuItems.ts`, `researchQueue.ts`, and `reference/data/dish-macro-lookup.py` against the mirror's copies: byte-identical for all four.
- Deleted the build mirror (`/tmp/build`) and all temporary compile/verify output (`/tmp/tscout*`, npm logs) after verification — nothing ephemeral left in the repo or `/tmp`.

## Status

`jurong_west_hawker_centre_golden_rooster_pte_ltd` flipped from `pending` to `researched` in `researchQueue.ts`, with a matching `UPDATE 2026-09-05` note on the entry. `clementi_west_street_2_blk_726_new_century_food_house_721_pte_ltd` was left `pending` with a new note flagging the coffeeshop-operator finding for a future pass, per this task's one-outlet-per-run rule (not treated as a fallback pick — it was investigated and explicitly rejected before Golden Rooster was found and selected).

## Commit — NOT completed (blocked)

`.git/index.lock` in the live repo was present and non-empty-directory-listed with an mtime of 2026-09-04 11:20 (this morning's `85_fengshan_centre_j_k_kings_prata_pte_ltd` run) at the start of this run's commit step, with no matching `git`/editor process visible in `ps aux`, suggesting a stale lock from that earlier session. However, `rm` on the lock file failed with `Operation not permitted` on three separate attempts (including after a 15s wait) despite the file being owned by this same user/uid with normal `rwx------` permissions — behavior inconsistent with a simple stale-lock-on-a-local-filesystem scenario, and more consistent with something on the underlying (OneDrive-synced, Windows-hosted) filesystem still holding the file open — possibly a genuinely concurrent process. Per this task's safety posture, did **not** force through the lock (e.g. no permission/attribute changes attempted) — forcibly clearing another process's git lock risks corrupting a concurrent commit.

**Net effect:** all data changes described above (brands.ts, menuItems.ts, researchQueue.ts, dish-macro-lookup.py, and this report) are written and verified on disk, but **not yet committed to git**. `git status` at end of run shows them as modified/untracked working-tree changes, alongside other unrelated in-progress changes from sibling tracks (`branchQueue.ts` modified, plus a few other tracks' uncommitted research-session `.md` files) that this run did not touch and did not stage. A future run (or the user) should verify the lock has cleared, then `git add` and commit this run's specific files (this report + the 4 files listed above) without bundling in unrelated concurrent work.
