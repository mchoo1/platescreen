# 2026-09-19 — Scheduled restaurant-track run: kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd

## Outlet researched
`kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd` (Brand name: "Ntuc Foodfare Co-Operative Ltd", type `hawker`, SFA licence `JK10107004`, Kukoh 21 Food Centre / Jalan Kukoh). Brand row already exists (added in the 2026-08-20 SFA hawker restructuring) — this run's scope was Phase 2 (menu/macro research) only, no new Brand/Premises needed.

## Selection process (Phase 1)
Filtered `RESEARCH_QUEUE` for `status: 'pending'` and `type` in `restaurant`/`food_court`/`hawker`/`coffeeshop`/`canteen` — 39 matching entries (unchanged from earlier today). Sorted by priority (high → medium → low), stable on original array order.

Re-confirmed, before picking a target, that the top of the priority-sorted list has no actionable menu-research work this run, consistent with the established pattern on this queue:
- `kopitiam` (high) — no Brand of its own; its 3 remaining internal sub-brand gaps (`kopitiam_cheers`, `kopitiam_china_food`, `kopitiam_king_grouper`) are all documented as blocked on Street View, a Brand-merge restructure, or a permanent non-food exclusion — none actionable via this run's tooling.
- `koufu` (high) — no `operatorId:'koufu'` zero-menu backlog remains; other leads are 403'd/JS-locked per prior notes.
- `foodfare` (high) — user-deprioritized 2026-08-23, not touched.
- `hawkers_street` (medium) — per the 2026-09-19 morning run's direct check, all 37 `operatorId:'hawkers_street'` Brand rows already have ≥1 MenuItem; remaining work is Premises-only, out of scope.

Swept forward in priority+array order. The next several medium-priority entries (`new_upper_changi_road_blk_58_lee_len_tong`, `bedok_south_road_blk_16_goh_poo_huat`, `bedok_south_road_blk_16_kwek_ah_heoh`, `clementi_ave_3_blk_448_lee_jim_pong`, `tanglin_halt_market_lim_hang_tong`) all already carry documented negative WebSearch results (the last of these, `lim_hang_tong`, from this same queue's earlier run today) placing them in the established "task #29" bare-SFA-licensee-personal-name bucket. `tanglin_halt_market_ngern_jwee_chye` and `eunos_crescent_blk_4a_teo_kiang_huat` are flagged elsewhere in this queue as orphaned (no matching Brand row currently exists) and out of this run's scope. `mei_chin_road_market_goh_jee_tee_2`, `mei_chin_road_market_lee_kee_yeo_lee_lian_hong`, `new_upper_changi_road_blk_208b_au_jiahao_alex`, `new_upper_changi_road_blk_208b_chan_cheow_teck`, and `new_upper_changi_road_blk_208b_chan_kok_hee_tian_guoxi` are already classified in the same task #29 bucket per the 2026-08-31 full-queue sweep (bare personal names), though not all individually re-verified today.

`kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd` was the first entry in priority+array order carrying only the generic "Outlet row already exists" boilerplate with no prior individual research attempt — picked as this run's target.

## Research (Phase 2)
This session's Browser pane was tested first: `request_access` for `google.com` was declined at the tool level (unattended session, no human present to approve) — consistent with the browser-blocking pattern documented on every prior scheduled run against this queue.

Fell back to WebSearch + direct fetch:
- WebSearch: `"Kukoh 21" food centre NTUC Foodfare stall` — returned general venue coverage (Kukoh 21 / Jalan Kukoh Food Centre, 21 cooked-food stalls, built 1969, upgraded 2010) and named several real stalls (Ri Tao Fu Teochew Pig Organ Soup, Jalan Kukoh Teochew Kueh, Teochew Fish Soup stall, The $2.50 Shop) — none is "NTUC Foodfare" or "Foodfare".
- WebSearch: `Kukoh 21 Food Centre stalls list hawker` — named more stalls (Ri Tao Fu #01-11, Midas roti prata #01-16, Ke Jia Yong Tau Hu, CSB Seafood Special Stall) — still no match.
- Direct fetch: `eatshopplay.sg/listing/kukoh-21-food-centre/` — venue-level info only (address, hours, 21 stalls), no per-stall directory.
- WebSearch: `"Foodfare" Jalan Kukoh coffee shop OR canteen` — surfaced a few more named stalls at the venue (Maria Qi Heng Coffee, Coffee Aroma, Al-Mina Indian Food, Bedok 69 Traditional Wanton Noodle, CSB Fish Soup) but explicitly found no result for "Foodfare" at this address.
- Direct fetch: `foodfare.com.sg` — the co-operative's current public site positions it exclusively as a B2B institutional caterer (childcare, healthcare/nursing homes, government/SAF/MHA, F&B retail manufacturing) since 1995. No consumer-facing hawker stall, coffee shop, or canteen concept is mentioned anywhere on the site. This matches this project's own existing `brands.ts` header note from the 2026-08-22 food-court-operator research pass: "NTUC Foodfare's own site now positions it purely as B2B institutional catering... not public food courts."

## Outcome
No credible source names a dish, cuisine, or stall concept trading under "NTUC Foodfare" / "Ntuc Foodfare Co-Operative Ltd" at Kukoh 21 Food Centre. The SFA licence (`JK10107004`) is most plausibly a legacy holding from an earlier era when the co-operative ran public-facing coffee shops/canteens (Foodfare's roots predate its current institutional-catering-only positioning), but nothing discoverable today identifies what is actually sold at this specific unit. This is the same structural problem as the task #29 bare-personal-name bucket — a registered SFA licensee name that never appeared on a public-facing signboard — just for a corporate/institutional entity instead of an individual. Per this project's data-sourcing rules (CLAUDE.md §5) and this task's Phase 2 step 5, did not fabricate a menu.

**No Brand, Premises, or MenuItem records were added or changed.** `researchQueue.ts`'s entry for this id was updated with this run's findings; `status` left `'pending'`.

## SFA registration (Phase 3)
Not applicable — Brand already existed with its SFA data (`sfaLicenceNo: JK10107004`) from the 2026-08-20 restructuring; this task's scope for an already-existing Brand is MenuItems only.

## Verification (Phase 5)
No Brand/Premises/MenuItem data files were touched, so there is nothing to typecheck or build-verify this run. The only file changed is `src/lib/researchQueue.ts` (a single entry's `notes` field) — re-parsed it as a Node module after editing to confirm the file is still syntactically valid (131 entries, same count as before the edit).

## Files touched
- `src/lib/researchQueue.ts` — updated `kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd`'s `notes` field with this run's findings. Status unchanged (`'pending'`).
- `reference/research-sessions/2026-09-19-kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd.md` — this report.

## Status / next steps
`kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd` remains `pending`, needing Street View or an in-person visit to identify what this unit actually sells before any menu research is possible. The sibling entry `telok_blangah_market_ntuc_foodfare_co_operative_ltd` (same corporate licensee, different venue) very likely shares this exact same dead end, but was not individually verified this run — a future pass should confirm rather than assume, since it is technically a different physical unit. A future pass with real browser/OneMap/Street View access is the only currently-known way to unblock this class of entry.
