# 2026-09-02 — UI and database improvement review

## Scope

Live review of `platescreen.vercel.app` (main screener, a brand detail
page, filter/search controls) plus fresh database queries against the
current `brands.ts`/`premises.ts`/`menuItems.ts`/`groceryProducts.ts`
(1,716 brands / 4,683 premises / 2,557 menu items / 19 grocery SKUs as of
this review). Cross-checked every finding against `ROADMAP.md` before
writing it up, so this only lists things that are new or materially
updated — see that file for the full standing backlog (mobile table
reflow, git-lock root cause, Google Maps/Street View escalation, the
~28-brand display-name cleanup, and the ~46-brand zero-menu long tail all
remain open exactly as previously documented and aren't repeated here).

## Found and fixed during this review

**A regression from the same-day duplicate-brand merge**: the McDonald's
brand page showed "Big Mac" listed twice with conflicting values (558
cal/$6.75 vs 550 cal/$7.20). Traced to 4 duplicate-dish groups created
when merged brands' menu items collided by name with the target brand's
existing catalog — a check the merge's own verification missed (it only
checked for duplicate *ids*). Fixed and verified; full writeup in
`2026-09-02-menu-item-dedup-post-merge.md`.

## New findings — database

1. **`Brand.dietTags` is dead code.** 143 brands carry a manually-set
   `dietTags` field, and `screener.ts` dutifully copies it into every row
   the UI receives (`dietTags: b.dietTags ?? []`) — but neither the
   filter predicate (`screener.ts` line ~282, which only checks
   `row.compatibleWith`) nor `ScreenerTable.tsx` (zero references) ever
   reads it. It's computed and passed through on every single row, for
   no effect. Two honest paths forward: wire it into the diet-tag filter
   buttons as a brand-level OR-condition (a brand tagged `halal` overall
   would surface even for a specific dish that hasn't been individually
   tagged yet — this could meaningfully help the "genuinely ambiguous"
   dishes noted below), or remove the field and the pass-through code if
   it's not worth maintaining two parallel tagging systems.
2. **Diet-tag coverage is heavily concentrated by category** — confirms
   and quantifies what the 2026-09-01 audit called "genuinely ambiguous":
   Mala/Hotpot 6% (2/31), Noodles 23% (79/350), Local Hawker 29%
   (111/387), Korean 37% (14/38), Bakery/Dessert 40% (32/80), Japanese
   44% (15/34) — vs. 90%+ in categories with an unambiguous named protein
   (Chicken Rice/Poultry, Indonesian/Malay, Seafood, Sides, Beverages,
   Rice). These 6 categories are where a future targeted pass (or the
   `Brand.dietTags` fix above) would move the coverage number most.
3. **Confidence mix is 97.2% `estimated`** (2,485/2,557), 2.2% `verified`
   (56), 0.2% `community` (6). Not a bug — the project's own conservative
   labeling is working as intended — but worth naming as the main lever
   on user trust: growing the `verified` count means sourcing more chains'
   official nutrition PDFs, not touching the estimation methodology.
4. **Database integrity is otherwise clean**: 0 negative values, 0
   zero/null prices, 1 zero-calorie item (correctly "Root Beer Zero
   Sugar"), 0 orphaned Premises/MenuItem `brandId`s, all calorie outliers
   above 2,000 are legitimately whole-bucket/whole-dozen items
   (Jollibee Chickenjoy buckets, a Krispy Kreme dozen) rather than errors.

## New findings — UI

1. **Mobile table has no card reflow** (confirmed directly, not just from
   the standing ROADMAP note): the screener's `<table>` sits inside an
   `overflow-auto` div with no responsive breakpoint swapping it for a
   card layout — on a narrow viewport this means horizontal scrolling
   through columns, not a mobile-native list. Already tracked as ROADMAP
   item 6; this review just confirms the exact mechanism (no media-query
   driven layout swap exists in the current component).
2. **`GroceryProduct` remains fully invisible in the UI** (confirmed by
   clicking the "Grocery" filter button live — it returns 32 regular
   single-serving `MenuItem` rows like a whole rotisserie chicken, not the
   19 dedicated `GroceryProduct` SKUs like rice/oats/chicken breast per
   100g). Already tracked as ROADMAP item 10; worth prioritizing now that
   there are 19 real rows sitting unused — even a simple separate
   "Pantry" tab or section would surface real, already-researched data.
3. **The filter/search surface itself is strong** and worth naming
   explicitly since it's easy to only notice gaps: live macro-range
   sliders (calories/protein/carbs/fat), a location/MRT search with
   geolocation, platform filters (dine-in/takeaway/delivery/ready-to-cook),
   7 diet-tag quick filters, 9 outlet-type filters, dark mode, and a
   shareable-link button all work and return correctly filtered results.

## Suggested priority order (for whoever picks this up next)

1. `Brand.dietTags` — either wire it into filtering or remove it. Small,
   self-contained, and directly improves the "ambiguous dish" coverage
   problem without any new research.
2. `GroceryProduct` UI — 19 rows of real data with zero visibility is the
   highest ratio of "already-done work with no user-facing payoff" in the
   dataset right now.
3. Mobile table → card reflow — a UI/CSS task, not a data task; affects
   every mobile visitor on every page load.
4. Continue the diet-tag coverage push into the 6 low-coverage categories
   named above, using the same manual-review-before-apply discipline as
   the 2026-09-01/09-02 audits.
