# 2026-09-18 — Food Junction: Toast Junction (fj_2 → tj_1–tj_13)

**Track:** restaurant / food_court / hawker / coffeeshop / canteen (scheduled task `platescreen-research-restaurants`)
**Queue entry:** `food_junction` (medium priority, `food_court`) — status left `pending` (see Status/next steps below)
**Brand:** `food_junction_toast_junction` (already existed, `type: food_court_stall`, `operatorId: food_junction`) — this run only added MenuItems, per Phase 1 step 5 (Brand already exists → skip Brand/Premises/SFA entirely).

## Selection

Filtered `RESEARCH_QUEUE` to `status === 'pending'` and `type` in restaurant/food_court/hawker/coffeeshop/canteen (71 entries). Sorted by priority (high → medium → low), first-listed wins within a tier. The three `high`-priority operator entries (`kopitiam`, `koufu`, `foodfare`) and the `medium`-priority `hawkers_street` entry were each re-confirmed, per their own extensive note trails (dated 2026-08-22 through 2026-09-17), to have no addressable single-outlet gap this run:

- `kopitiam`: 3 unresolved brands remain (`kopitiam_cheers` — non-food concession, never; `kopitiam_china_food` — needs Street View/in-person ID, browser tool denied again this run; `kopitiam_king_grouper` — needs a Brand-merge restructure, outside this task's write scope).
- `koufu` / `foodfare`: 0 Brand rows tagged with their `operatorId` at all — no zero-menu backlog exists under this queue entry's original framing.
- `hawkers_street`: all 27 `operatorId`-tagged Brand rows already have ≥1 MenuItem; its own remaining work is identifying new concessions, not menu research.

Next in file order at `medium` priority is `food_junction` (BreadTalk Group's food-court chain). Of its 4 house-brand concessions, 3 (Go Teppan Go, Ke/Quench, Fireyaki) already had full, multi-item real menus from prior passes (2026-09-02, 2026-09-03, 2026-09-15). Only Toast Junction (`fj_2`, "Coffee & Toast") still carried a single generic placeholder item — a genuine, addressable single-outlet target, so it was picked.

## Research (Phase 2)

- `foodjunction.com/our-brands/` (live fetch): confirms Toast Junction's own "Must Try" list — Kaya Butter Toast, Thick Toast, Asian Delights — and its 6 premises (NEX, Junction 8, Century Square/"The Food Market", Raffles City/"The Food Place", Labrador Tower, Food Junction Jln Girang), matching this project's existing Premises rows for this Brand.
- `foodpanda.sg` — "Toast Junction (Food Junction - Raffles City)" delivery-menu page (live fetch): full priced a-la-carte menu across Toasts, Dim Sum, Asian Delights, and Beverages categories, plus combo/bundle sets (not used — see Skipped below).
- `halalboleh.com/shop/toast-junction`: a dedicated MUIS-certified-halal food directory, confirms Toast Junction is MUIS Halal Certified and lists the same 6 premises this project already has for this Brand — a specific, checkable match, not a generic guess.

### Menu items added (all `confidence: "estimated"` — no official brand-specific nutrition source exists; macros calibrated against this project's own existing analogs for identical dish types)

| id | name | price | cal | protein | carbs | fat | tags | basis |
|---|---|---|---|---|---|---|---|---|
| tj_1 | Kaya Butter Toast (2 Slices) | $4.00 | 300 | 6 | 38 | 13 | vegetarian | `kopikiosk_kaya_butter_toast` |
| tj_2 | French Toast | $2.50 | 320 | 8 | 38 | 16 | vegetarian | `yk_french_toast`/`tb_french_toast` |
| tj_3 | Turkey Ham & Cheese Thick Toast | $3.00 | 320 | 14 | 32 | 15 | halal, no_pork | `tb_kaya_toast_thick` base + typical deli ham/cheese (least-calibrated item, no direct analog) |
| tj_4 | Chee Cheong Fun | $2.70 | 295 | 10 | 48 | 7 | vegetarian | `cc_chee_cheong_fun` (direct match) |
| tj_5 | Chwee Kueh | $2.70 | 320 | 6 | 45 | 12 | — | `bedok_chee_kuek_chwee_kueh` (direct match) |
| tj_6 | Mee Siam | $5.00 | 420 | 16 | 68 | 10 | — | `tb_mee_siam` (direct match, Toast Box = closest existing kopitiam-toast-stall analog) |
| tj_7 | Mee Rebus | $5.00 | 470 | 19 | 62 | 15 | halal, no_pork | avg of `lps_wps_mee_rebus` / `inspirasi_mee_rebus` |
| tj_8 | Curry Chicken With Rice | $7.00 | 550 | 25 | 60 | 22 | halal, no_pork | `curry_mixed_veg_rice_curry_chicken_rice` (direct match) |
| tj_9 | Nonya Laksa | $6.00 | 570 | 24 | 66 | 22 | — | avg of `max_laksa`/`lps_sk_laksa`/`gmfc_laksa` |
| tj_10 | Fried Bee Hoon With Fried Egg & Chicken Wing | $5.50 | 420 | 16 | 55 | 14 | halal, no_pork | `he_li_economical_bee_hoo_fried_bee_hoon` scaled up for added egg+wing |
| tj_11 | Kopi | $2.00 | 130 | 2 | 20 | 4 | vegetarian | `kopikiosk_kopi` (direct match) |
| tj_12 | Teh | $2.00 | 140 | 2 | 23 | 4 | vegetarian | `kopikiosk_teh` (direct match) |
| tj_13 | Milo | $2.30 | 190 | 5 | 33 | 4 | halal | `mcd_milo_hot` (direct match) |

13 items, spanning all 4 of foodpanda's a-la-carte categories for this outlet (Toasts, Dim Sum, Asian Delights, Beverages) and all 3 of the brand's own "Must Try" categories.

### Skipped (deliberately, not fabricated)

- Peanut Butter Toast — near-duplicate of French Toast's sweet-toast slot, no distinguishing macro basis.
- All "Deal Set" A–H and "Family Bundle" A–E combos — multi-item bundles, not single dishes (MenuItem is a one-serving shape).
- Mineral Water, Iced Homemade Barley — plain/unflavoured, no meaningful macro profile.
- Bee Hoon Set B — near-duplicate of Set A (same base dish, squid fillet swapped for chicken wing); kept only Set A.

### Diet tags

Per CLAUDE.md §5.1's conservative rule, `gluten_free`/`dairy_free`/`nut_free`/`lactose_free` were not attempted. `halal` was applied at the item level based on the halalboleh.com MUIS-certification finding (whole-establishment certification, not dish-name inference), stacked with `no_pork` for items naming a specific protein, following this project's own `inspirasi_mee_rebus`/`he_li_fried_bee_hoon` convention. `vegetarian` applied to the meat-free toast/dim-sum/beverage items. Mee Siam, Chwee Kueh, and Nonya Laksa were left untagged, matching their own existing DB analogs (all also untagged) — belacan/dried-shrimp ambiguity in their gravies makes a vegetarian or no_pork call unreliable from the dish name alone.

**Not done (out of this run's scope):** `food_junction_toast_junction`'s Brand-level `dietTags` in `brands.ts` was left unchanged (`[]`) — Phase 1 step 5 restricts this run to MenuItems only since the Brand already existed. Flagging for a future pass to add `"halal"` at the Brand level given the halalboleh.com finding.

## SFA lookup (Phase 3)

Skipped — `type: food_court_stall` inside an existing Premises row (added 2026-08-23), not a new hawker/food_court_stall Brand.

## Verification (Phase 5)

This session's `/sessions` partition was at 100% (pre-existing, same class of issue documented on 2026-09-03/08-30 through 09-17 for the unrelated `mccafe` entry) — rsync'ing the build mirror to `~/build/platescreen` (under `/sessions`) failed with `ENOSPC` before any files were copied. Worked around it this run (unlike 2026-09-03, where the automated check had to be skipped) by mirroring to `/tmp/build/platescreen` instead (on `/`, which had ~4.1G free) and redirecting `HOME`/`npm_config_cache` to `/tmp` so `npm install` didn't try to write under `/sessions/.npm`.

- `npm install` in the mirror: succeeded, 394 packages.
- `npx tsc --noEmit`: silent, exit 0.
- `npm run build`: succeeded — "Generating static pages (4418/4418)", including `/brand/food_junction_toast_junction` and its 13 new `/brand/[id]/[itemId]` pages.
- `diff` live `menuItems.ts`/`researchQueue.ts` against the mirror's copies: byte-identical.
- Manual counts: `menuItems.ts` now has 2685 items (2672 + 13), 0 duplicate ids across the full array, 0 orphaned `brandId`s (every item resolves to a real Brand row, checked against all 4 `BRANDS_N` chunks / 1727 total brands).

## Files touched

- `src/lib/menuItems.ts` — added `tj_1`–`tj_13` (13 MenuItems) + sourcing comment block, at end of file.
- `src/lib/researchQueue.ts` — appended a 2026-09-18 UPDATE note to the `food_junction` entry; `status` left `pending`.

## Status / next steps

Left `pending` — all 4 of Food Junction's house-brand concessions (Go Teppan Go, Toast Junction, Ke/Quench, Fireyaki) now have real, multi-item menus, but the underlying queue entry's own remaining work is unchanged: Food Junction's outlets almost certainly also host other, non-house-brand named concessions not yet identified (no bulk sitemap source exists for Food Junction the way Kopitiam's stall-sitemap scrape resolved that problem there) — that needs per-venue Google Maps/on-site research, not more menu work on the 4 known house brands. Also flagging for a future pass: (1) add `"halal"` to `food_junction_toast_junction`'s Brand-level `dietTags` given the halalboleh.com MUIS-certification finding; (2) the previously-flagged Ke/Quench Premises-location discrepancy (2026-09-02 note: this project's Premises row lists only "Junction 8," but foodjunction.com's own page lists Ke/Quench at NEX/Rivervale Mall/Great World/Century Square instead) is still unresolved and outside this run's scope.
