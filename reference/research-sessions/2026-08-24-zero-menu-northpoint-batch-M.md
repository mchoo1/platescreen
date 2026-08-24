# 2026-08-24 — Zero-menu-item cleanup, Batch M: Kopitiam @ Northpoint City (task #65)

Thirteenth batch of the zero-menu-item cleanup, eleventh long-tail venue batch. The most
heavily duplicated single venue found in this whole cleanup effort.

## Selection

39 total premises rows at 930 Yishun Avenue 2, Northpoint #B2-10, Singapore 769098,
resolving to 29 unique zero-menu brands once duplicates were identified.

## A new duplicate pattern

Every prior duplicate found this session (Batches F, J, L) was a raw-SFA-licensee id
duplicating a Kopitiam-scrape id. This venue had a different pattern: the Kopitiam scrape
itself recorded several of its own concessions twice, under two different naming
conventions - once with a plain trading name, once with the venue name appended in
parentheses (e.g. `kopitiam_kopi_kiosk` vs `kopitiam_kopi_kiosk_northpoint_city`).
Verified via matching addresses (all at the single venue address above) before removing
anything.

**8 duplicate brands removed** (all zero-menu, all confirmed via address match against an
existing multi-outlet or already-covered brand):
- `kopitiam_kopi_kiosk_northpoint_city` → dup of `kopitiam_kopi_kiosk` (69-outlet brand,
  already covered).
- `kopitiam_xiang_chi_mian_northpoint_city` → dup of `kopitiam_xiang_chi_mian` (16-outlet
  brand, already covered).
- `kopitiam_pepper_lunch_northpoint_city` → dup of `kopitiam_pepper_lunch_express`
  (already covered).
- `kopitiam_economic_rice_northpoint_city` and `kopitiam_teochew_porridge_and_mixed_veg_
  rice` → both dups of `kopitiam_kakhi_nang` - a genuine **triple** recording of one
  economical-rice/porridge stall (confirmed via all three sharing the exact same real
  dish content: Teochew Porridge / Mixed Veg Rice / Econ Rice).
- `kopitiam_i_sel_fish_northpoint_city` → dup of `kopitiam_i_sel_fish` (kept the shorter
  id, gave it a real item below).
- `kopitiam_hk_roasted_northpoint_city` and `kopitiam_hong_kong` → both dups of
  `kopitiam_guan_chee_hk_roast` (a multi-outlet HK-roast brand, given a real item below).

**3 redundant duplicate Premises rows** removed (same brand, identical row recorded
twice): `kopitiam_herbal_soup_northpoint_city`, `kopitiam_japanese_food_northpoint_city`,
`kopitiam_dao_xiao_mian_northpoint_city`.

## Sourcing for the remaining 21 real brands

All 21 matched `reference/data/kopitiam-stall-dishes.json`. Several of Kopitiam's own
scraped entries label the concession by food category rather than a proper-noun name
(e.g. "Herbal Soup (Northpoint City)", "Japanese Food (Northpoint City)", "Western
Cuisine (Northpoint City)") - used as-is, since this is Kopitiam's own official labeling
of these counters (not a fabricated generic placeholder of the kind cleaned up in earlier
tasks #31/#51/#52, which addressed stale SFA-licensee names, not Kopitiam's own site
content).

## Menu items

21 brands covered, 21 items. 8 new dish types added to `dish-macro-lookup.py` (White
Pepper Fish Maw Pig Stomach Chicken Soup, Chicken Teriyaki & Salmon Teriyaki Bento, Knife
Shaven Noodle Soup, Bimbimbap, Grilled Salmon with Aglio Olio, Beef Rendang Set, Yong Tow
Foo Soup, Sweet & Sour Pork Rice Set); reused two already-existing types that happened to
match exactly (Grilled Fish, Japanese cuisine).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,753 total brands (1,761 − 8 removed), 0 duplicate brand ids, 1,515
  total menu items (1,494 + 21), 0 duplicate item ids, 0 orphaned items/premises, all 8
  removed brand ids confirmed gone, all 3 dup-premises brands confirmed down to 1 row
  each, all 21 target brands confirmed covered.
- Zero-menu-item brand count: 1,143 → 1,114 (21 covered + 8 duplicate brands removed = 29
  fewer zero-menu brands).
- Live vs build-mirror `menuItems.ts`, `brands.ts`, `premises.ts`,
  `dish-macro-lookup.py` — all byte-identical diffs.

## What's next

Given this venue's data quality was unusually messy, it may be worth a dedicated pass
checking other large food-court venues for the same "Kopitiam scrape recorded a
concession twice under two naming conventions" pattern before assuming every remaining
venue is clean. Otherwise, continuing down the per-venue audit list: Kopitiam Square
(28), Yishun Park Hawker Centre (25), Buangkok Hawker Centre (25), Alexandra Village Food
Centre (24), Bukit Panjang Hawker Centre & Market (23), Senja Hawker Centre (20),
Fernvale Hawker Centre & Market (19), Parkway Parade (17), Changi Airport Terminal 3
(15), Hillion Mall (14), plus the ~930 single/few-outlet Kopitiam concessions below Batch
B's >=4-outlet threshold.
