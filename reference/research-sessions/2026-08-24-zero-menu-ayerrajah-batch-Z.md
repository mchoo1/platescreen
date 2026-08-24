# 2026-08-24 — Zero-menu-item cleanup, Batch Z: Ayer Rajah Food Centre / Market (task #65)

Twenty-sixth batch of the zero-menu-item cleanup, third batch from the fresh per-venue
audit. First non-Kopitiam batch since Changi Village (Batch V) — required individual web
research per stall, and surfaced two brands that shouldn't get a fabricated menu item at
all.

## Selection

15 zero-menu brands across two locationContext labels covering the same general area:
"Ayer Rajah Food Centre" (traditional hawker centre, 503 West Coast Drive) and "Ayer Rajah
Market" (which, on inspection, actually includes several stalls at Timbre+, 73A Ayer Rajah
Crescent — a nearby food-truck/container park). 0 brands here have more than 1 Premises row.

## Sourcing

11 of the 15 brands are real, distinctly-named hawker/food-truck stalls with specific
cuisine tags already recorded (Mee Goreng, Double-Boiled Soup, Noodles, BBQ Stingray, Local
Snacks, Fried Hokkien Prawn Mee, Fishball Noodles, Wanton Noodles, Seafood, Indian Street
Food, Modern Singaporean Skewers & Rice Bowls) — cross-referenced against Daniel Food
Diary's Ayer Rajah Food Centre stall list and Timbre+ coverage (Dancing Crab Shack, Chit
Chaat Chai, and Kush confirmed as real Timbre+ concepts: lobster rolls/shrimp po'boys,
North Indian street food, and mod-Sin skewers/rice bowls by The Quarters, respectively).

2 more brands are real F&B chains recorded under their full corporate/licensee names rather
than a stall name: "Big Bern'S American Grill Xpolis Pte. Ltd." (confirmed via web search as
Big Bern's American Grill, a halal-certified American-comfort-food truck at Timbre+, 73A
Ayer Rajah Crescent — signature Big Bern's Cheese Burger, $12) and "Domino'S Pizza Singapore
Pte. Ltd." (the well-known pizza chain).

## Skipped — not fabricated

2 remaining brands were intentionally left zero-menu rather than given an invented dish,
consistent with the project's never-fabricate principle:

- **Cold Storage Singapore (1983) Pte Ltd** — this is the Cold Storage supermarket chain, a
  grocery retailer, not a food-item vendor. It appears to have been mis-recorded as a
  `type: "hawker"` brand (likely carried over from raw SFA licensee data, the same pattern
  Batch 52's earlier cleanup targeted). No food "dish" legitimately applies here; flagged for
  a future brand-recategorization pass rather than given a fabricated menu item.
- **Fei Siong (F&B) Holdings Pte. Ltd.** — Fei Siong is an operator/holding company that runs
  many distinct sub-concepts (Yong Kee Duck Rice, Xiang Xiang Mixed Vegetable Rice, etc.,
  already covered as separate brands elsewhere per task #48). This entry is recorded
  generically with no indication of which specific sub-concept this particular counter at
  Ayer Rajah Market represents, so no specific dish could be sourced without guessing.

## Menu items

13 of 15 brands covered, 13 items. 10 new dish types added to `dish-macro-lookup.py` (BBQ
Stingray, Fried Hokkien Prawn Mee, Double-Boiled Soup, Local Snacks, Fried Noodles, Lobster
Roll, Chaat, Skewer Rice Bowl, Big Bern's Cheese Burger, Pepperoni Pizza); the remaining 3
items reused existing dish types (Mee Goreng, Fishball Noodles, Wanton Mee).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,797 total menu items (1,784 + 13), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 13 target brands still zero-menu, both intentionally-skipped
  brands confirmed still zero-menu (as expected), 1,749 total brands (unchanged — no
  removals or renames this batch).
- Zero-menu-item brand count: 842 → 829.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: Chomp Chomp Food Centre (12), VivoCity (11), Bagus Food
Hall @ Northpoint City (11), Hougang 105 Hainanese Village Centre (10), AMK Hub (10),
Kopitiam Food Hall @ Jurong Point (10), Tan Tock Seng Hospital (10), Compass One (10),
Tampines Mall (10), Vista Point (10), and onward down the 182-venue list, plus the ~930
single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold, plus the long
tail of true single-outlet stalls with no shared venue leverage. Separately: the 2 skipped
brands (Cold Storage, Fei Siong holdings at this venue) plus the general pattern of
generic-licensee-name brands slipping through into later data (this is the same issue Batch
52 targeted, but not exhaustively — worth a dedicated audit pass at some point).
