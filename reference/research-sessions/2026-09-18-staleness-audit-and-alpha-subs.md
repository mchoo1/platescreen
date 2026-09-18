# 2026-09-18 — Staleness audit (24 entries) + Alpha Subs / Chang Cheng Food Paradise attempts

**Track:** restaurant / food_court / hawker / coffeeshop / canteen (scheduled task `platescreen-research-restaurants`)

## Context

This run picked up after an earlier same-day pass had already landed real Phase 2 work on
`food_junction_toast_junction` (13 new MenuItems, `tj_1`–`tj_13`; see
`reference/research-sessions/2026-09-18-food_junction_toast_junction.md`) but left it staged,
uncommitted. That work is folded into this run's commit.

Re-confirmed, per the extensive note trails on each entry (dated 2026-08-22 through 2026-09-17),
that the top of the priority-sorted pending queue still has no addressable single-outlet gap:
`kopitiam` (3 unresolved sub-brands: `kopitiam_cheers` non-food/never, `kopitiam_china_food`
needs Street View — browser access denied again this run, `kopitiam_king_grouper` needs a
Brand-merge restructure out of scope), `koufu`/`foodfare` (0 zero-menu backlog under their own
framing), `hawkers_street` (all 27 operatorId-tagged brands already have ≥1 MenuItem).

## Staleness audit (this run's main contribution)

Rather than walk the remaining ~50 pending task #29/corporate-licensee entries one at a time,
cross-referenced every pending entry's Premises row (`{queue-id}_p###`) against its actual
`brandId` and that Brand's real MenuItem count. Found 24 entries whose Premises already
correctly links to an existing, populated chain Brand — `cold_storage` (5 items), `mcd`
(56 items), `pizza_hut` (12 items), `cheers` (6 items), `bengawan_solo` (8 items), `breadtalk`
(6 items) — via the standard shared-chain-Brand pattern (the same pattern already used to
resolve the Bedok North St 1 Blk 216 trio on 2026-08-31). These 24 queue rows were representing
already-complete work under a stale `pending` status; no new Brand or MenuItem was needed or
added. Flipped all 24 to `researched`, each with its own dated note citing the specific Brand
and item count:

- `yuhua_village_market_and_food_centre_cold_storage_singapore_1983_pte_ltd`
- `tampines_round_market_and_food_centre_cold_storage_singapore_1983_pte_ltd`
- `teban_gardens_market_and_food_centre_cold_storage_singapore_1983_pte_ltd`
- `chong_boon_market_and_food_centre_cheers_holdings_2004_pte_ltd`
- `chong_boon_market_and_food_centre_cold_storage_singapore_1983_pte_ltd`
- `cheng_san_market_and_cooked_food_centre_cheers_holdings_2004_pte_ltd`
- `cheng_san_market_and_cooked_food_centre_cold_storage_singapore_1983_pte_ltd`
- `mayflower_market_cold_storage_singapore_1983_pte_ltd`
- `mayflower_market_mcdonald_s_restaurants_pte_ltd`
- `ang_mo_kio_628_market_cold_storage_singapore_1983_pte_ltd`
- `ang_mo_kio_628_market_mcdonald_s_restaurants_pte_ltd`
- `blk_724_ang_mo_kio_market_cold_storage_singapore_1983_pte_ltd`
- `kaki_bukit_511_market_and_food_centre_cold_storage_singapore_1983_pte_ltd`
- `bedok_north_street_3_blk_538_cold_storage_singapore_1983_pte_ltd`
- `clementi_west_street_2_blk_726_cold_storage_singapore_1983_pte_ltd`
- `kovan_hougang_market_and_food_centre_breadtalk_pte_ltd`
- `kovan_hougang_market_and_food_centre_cold_storage_singapore_1983_pte_ltd`
- `hougang_105_hainanese_village_centre_bengawan_solo_pte_ltd`
- `jurong_west_hawker_centre_cold_storage_singapore_1983_pte_ltd`
- `ayer_rajah_market_cold_storage_singapore_1983_pte_ltd`
- `toa_payoh_lorong_4_blk_93_mcdonald_s_restaurants_pte_ltd`
- `toa_payoh_lorong_4_blk_93_pizza_hut_singapore_pte_ltd`
- `one_punggol_hawker_centre_cold_storage_singapore_1983_pte_ltd`
- `punggol_coast_hawker_centre_cold_storage_singapore_1983_pte_ltd`

No `src/lib/brands.ts`, `premises.ts`, or `menuItems.ts` changes were needed for this part —
purely a `researchQueue.ts` status/notes correction, verified by cross-checking every one of the
24 `brandId`s against the live `MENU_ITEMS` array's item counts before flipping status (script-based,
not a guess).

## Single-outlet research attempts (Phase 2, no new data added)

Two candidates were investigated as potential real Phase 2 targets on top of the pre-existing
`food_junction_toast_junction` work:

**`kovan_hougang_market_and_food_centre_alpha_subs_pte_ltd`** ("Alpha Subs Pte. Ltd.") — a
plausible real trading name (sandwich/sub concept), unlike the bare-personal-name task #29
bucket, so worth a genuine attempt. Its SFA `premisesAddress` is actually Heartland Mall (Blk
205), distinct from the Kovan Hougang Market and Food Centre address (Blk 209) on its own
`locationContext` — likely a mall F&B kiosk. Multiple WebSearches (name + Kovan/Heartland
Mall/Singapore/sandwich, site-scoped foodpanda/Burpple/DanielFoodDiary/Eatbook queries) found no
menu, review, or listing — only the bare ACRA/JobStreet corporate registration with no retrievable
business-activity detail (`opengovsg.com` and `jobstreet.com` both returned JS-rendered empty
content via `web_fetch`). The in-app Browser pane was also tried (`sg-hawker-centres.fandom.com`)
and access was declined at the session level — same unattended-session gate documented on every
prior scheduled run. Did not fabricate a menu. Left `pending`.

**`toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd`** ("Chang Cheng Food
Paradise Pte. Ltd.") — considered because "Chang Cheng" is a real, well-documented 160+ shop
Singapore mixed-vegetable-rice/zi-char chain (`changcheng.sg`) that originated at Toa Payoh Blk
126, near this premises. However `sgpbusiness.com`/`opengovsg.com` confirm this specific entity's
(UEN 200903588C) principal SSIC activity is "Food courts, coffee shops and canteens (with mainly
food and beverage income)" — a food-court-*operator* company, not a single dish-stall, the same
container-brand risk already flagged in `CLAUDE.md` §4.3 and on the sibling
`clementi_west_street_2...new_century_food_house_721` entry (2026-09-05 note). Not selected —
assigning a MenuItem here risks misrepresenting an entire multi-stall venue as one dish. Left
`pending`.

## Verification (Phase 5)

Only `researchQueue.ts` was touched by this run's own work (status/notes fields on a plain
untyped literal array — no `Brand`/`Premises`/`MenuItem` schema involved, so no TS2590 exposure).
Verified via `node -e "require(...)"` after stripping the `export` keyword that the file still
parses as valid JS (131 entries total, unchanged from before this run; 83 `researched` / 48
`pending` across the whole queue after this run's 24 flips).

Ran the standard build-mirror verification per Phase 5's mandatory rule. `/sessions` (this
session's home/scratch partition) was already at 100% (`9.8G`/`9.8G` used) before this run
started — the same class of pre-existing infrastructure issue documented on 2026-09-03/08-30 for
the unrelated `mccafe` entry, and the git-lock issue documented on 2026-09-07b/2026-09-17b. A
first attempt to mirror to `/tmp/build/platescreen` (on `/`, which had ~4.1G free) still hit
`ENOSPC` on `npm install` because npm's cache/log directories default to `$HOME/.npm`, and
`$HOME` in this environment is fixed under the full `/sessions` partition regardless of where the
project mirror itself lives. Retried with `HOME=/tmp/home npm_config_cache=/tmp/home/.npm-cache`
(the same workaround the concurrent `food_junction_toast_junction` pass in this session used) —
`npm install` succeeded (394 packages) and `HOME=/tmp/home npx tsc --noEmit` completed silently,
exit 0. Deleted the mirror and `/tmp/home` afterward.

## Files touched

- `src/lib/researchQueue.ts` — 24 entries flipped `pending` → `researched` with dated notes; 2
  entries (`kovan_hougang_market_and_food_centre_alpha_subs_pte_ltd`,
  `toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd`) got a dated
  "investigated, not selected" note but remain `pending`; `kopitiam`'s own note got a one-line
  pointer to this run's findings.
- No `brands.ts` / `premises.ts` / `menuItems.ts` changes from this run (the 13-item
  `food_junction_toast_junction` addition already staged in the working tree predates this run —
  see that entry's own 2026-09-18 session report).

## Status / next steps

- `kovan_hougang_market_and_food_centre_alpha_subs_pte_ltd` needs a rendered-browser visit
  (Heartland Mall's own F&B directory, or Google Maps/Street View) to confirm what this unit
  actually sells — same class of blocker as `kopitiam_china_food`.
- `toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd` and the sibling
  `new_century_food_house_721` entry both need a human/future-pass decision on whether their
  SFA licence covers one internal stall or the whole coffeeshop premises before any MenuItem
  work proceeds.
- The `/sessions` disk-full condition and the recurring `.git/index.lock` issue (see the `mccafe`
  entry's notes) are both standing infrastructure problems outside this task's scope to fix;
  recommend a human clear disk space / stale git-lock artifacts directly.
- Remaining un-audited pending entries in this batch (bare-personal-name task #29 bucket,
  `85_fengshan_centre_*`, `toa_payoh_lorong_8_blk_210_*`, `kovan_hougang_market_and_food_centre_
  {berrylite_parkway,bliss_restaurant,chong_yo_private_limited}`, prata-chain entries, etc.) were
  sample-checked (WebSearch attempts on several) but not exhaustively re-audited this run for the
  shared-chain-Brand staleness pattern — a future pass could usefully repeat this run's
  script-based Premises→Brand→MenuItem-count cross-check across the *entire* queue file, not just
  this batch, since the same staleness likely exists elsewhere.
