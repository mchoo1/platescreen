# 2026-08-24 — Zero-menu-item cleanup, Batch L: Anchorvale Village Hawker Centre (task #65)

Twelfth batch of the zero-menu-item cleanup, tenth long-tail venue batch. The messiest
venue so far - a mixed venue with three distinct kinds of data issue layered together.

## Selection

37 total premises at this venue: 26 zero-menu Kopitiam concessions, plus 6 non-Kopitiam
"anchorvale_village_hawker_centre_*" brands, one of which duplicated an existing chain
brand (McDonald's) and four of which duplicated existing Kopitiam concessions.

## Sourcing

25 Kopitiam stalls matched `reference/data/kopitiam-stall-dishes.json` directly. Pin Wei
Hong Kong Style Chee Cheong Fun (Michelin-recommended, per Eatbook/HawkerPedia/Yahoo Life
food guides) was individually researched - given a "Cheong Fun" item, the closest
existing dish type (same dish, different transliteration).

## Three issues found and fixed

1. **4 duplicate Brand+Premises pairs**: `anchorvale_village_hawker_centre_hakka_leipopo`,
   `..._original_simon_road_hokkien_mee`, `..._tai_hao_chi_roasted_delights`, and
   `..._munchi_pancakes` were each a raw-SFA-licensee-derived duplicate of an existing
   multi-outlet Kopitiam brand (`kopitiam_hakka_lei_po_po`,
   `kopitiam_original_simon_road_hokkien_mee`, `kopitiam_tai_hao_chi_roasted_delights`,
   `kopitiam_munchi_pancake`) that already had a Premises row at this exact address (339
   Anchorvale Road, Singapore 540339) among its other outlets. Same pattern as Batches F
   and J. Removed the 4 duplicate Brand+Premises rows; the underlying Kopitiam brands are
   covered with real items in this batch (or, for Munchi Pancake, already had one).

2. **McDonald's modeled as a duplicate zero-menu Brand**: a real McDonald's outlet at
   this address had been recorded as its own Brand
   (`anchorvale_village_hawker_centre_mcdonald_s_restaurants_pte_ltd`) rather than as an
   additional Premises row under the existing `mcd` Brand, which already has a full menu
   and 140 other premises. Removed the duplicate Brand and reassigned its Premises row to
   `mcd` (new id `mcd_anchorvale_village_hawker_centre`) - the location is now correctly
   covered without needing any new menu items.

3. **Unidentifiable corporate licensee left zero-menu**: `Commonwealth Retail Concepts
   Pte. Ltd.` is a real F&B holding company (owns PastaMania, Swissbake, NYC Bagel
   Factory, Baker & Cook, The Soup Spoon, Udders Ice Cream per public company records),
   but no source found could confirm which specific brand of theirs operates at this
   hawker centre address, and none of the food-guide roundups for this venue mention any
   of those brand names. Left zero-menu deliberately rather than guess - same
   never-fabricate principle as the Cold Storage exclusions in Batches F and I.

## Menu items

26 brands covered, 26 items. 9 new dish types added to `dish-macro-lookup.py` (Nasi
Lemak, Fried Banana, Grilled Chicken, Braised Pig Trotter, Curry Chicken, Congee,
Chicken Wing, Indian Rojak, Economic Bee Hoon).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,761 total brands (1,766 − 4 duplicates − 1 McDonald's duplicate), 0
  duplicate brand ids, 1,494 total menu items (1,468 + 26), 0 duplicate item ids, 0
  orphaned items/premises, all 5 removed/reassigned brand ids confirmed handled
  correctly, all 26 target brands confirmed covered, `mcd` confirmed still fully covered
  chain-wide.
- Zero-menu-item brand count: 1,174 → 1,143 (26 covered + 4 duplicate brands removed + 1
  McDonald's duplicate removed = 31 fewer zero-menu brands).
- Live vs build-mirror `menuItems.ts`, `brands.ts`, `premises.ts`,
  `dish-macro-lookup.py` — all byte-identical diffs.

## What's next

Kopitiam @ Northpoint City (30), Kopitiam Square (28), Yishun Park Hawker Centre (25),
Buangkok Hawker Centre (25), Alexandra Village Food Centre (24), Bukit Panjang Hawker
Centre & Market (23), Senja Hawker Centre (20), Fernvale Hawker Centre & Market (19),
Parkway Parade (17), Changi Airport Terminal 3 (15), Hillion Mall (14), and onward down
the per-venue audit list, plus the ~930 single/few-outlet Kopitiam concessions below
Batch B's >=4-outlet threshold. Worth checking whether other already-covered chain
brands (McDonald's, KFC, etc.) have similar "modeled as a duplicate zero-menu Brand
instead of an added Premises row" artifacts elsewhere - this is a new failure mode
distinct from the raw-SFA-vs-Kopitiam-scrape duplicate pattern seen in Batches F and J.
