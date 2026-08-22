# 2026-08-22 — Koufu's 3 remaining sub-brands (R&B Tea, Nine Fresh, Dough Culture)

**Trigger:** continuation of the same-day Kopitiam stall scrape, working down the outstanding list
from the earlier Koufu research session — these 3 were previously reported as JS/SPA store locators
with "no server-rendered fallback found."

## What was actually true vs. what was found

The JS map/store-locator widgets on all 3 sites genuinely have no usable client-facing endpoint —
that part of the earlier finding held up. But each site had a different static fallback that a
second, more targeted look turned up:

- **R&B Tea** (rbtea.com.sg, WordPress): the "Stores" custom post type has a dedicated sitemap
  (`wp-sitemap-posts-stores-1.xml`) but the individual post pages are empty shells — the real data
  loads via a plain `admin-ajax.php?action=get_regions_action&country_id=11` call (found via the
  theme's `stores-filter.js`), which returns clean JSON for all 14 outlets (name, address, hours) in
  one request. No pagination, no auth needed.
- **Nine Fresh** (ninefresh.com): an old-style static HTML site — its `locate-us.html` page lists
  every outlet as plain text, no JS or API involved. Care was needed: 3 outlets (White Sands, NTU,
  SMU) are wrapped in HTML comments (`<!-- -->`) and must be excluded — they read as live text if you
  don't strip comments before parsing. 25 active outlets kept.
- **Dough Culture** (doughculture.com, OpenCart): also plain static HTML on its "Locate Us" page.
  The address and operating-hours lines share the exact same CSS class (`black bold`), so a naive
  per-line regex misaligns pairs — had to distinguish by content ("Operation Hours:" prefix) rather
  than position. 18 outlets. Its product catalog page also turned out to be a real, live storefront
  with actual prices (24 fried-snack items, $1.00–$2.80) — captured for reference even though it
  doesn't resolve the macro gap.

## What was added

3 Brand rows (no `operatorId` — same as the earlier 5 Koufu-family additions, these are standalone
storefronts, not concessions inside someone else's food court): `koufu_rb_tea` (bubble tea, 14
premises), `koufu_nine_fresh` (Taiwanese dessert, 25 premises), `koufu_dough_culture` (local fried
snacks, 18 premises). 57 new premises total, every one geocoded via OneMap (one address — Rasapura
Master's Marina Bay Sands unit — had no postal code published, used MBS's standard postal 018956 as
a reasonable substitute since the mall-level location is what matters for a food-finder).

## What this doesn't do yet

Same macro gap as the Kopitiam scrape: real names, addresses, and (for Dough Culture) real dish
names and prices, but no calories/protein/carbs/fat — no MenuItems added. Preserved in
`reference/data/koufu-family-dishes.json` for a future research pass.

## Still not found

The Kitchen, The Green Hut, and Rasapura Master (the food-court-format Koufu brands, not the
standalone chains above) — guessed URL slugs under koufu.com.sg/our-brands/ still 404. Needs the
actual link followed from the Our Brands listing page rather than a guessed pattern.

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. 1,589 total brands (0 duplicates), 4,506 total
premises (0 orphaned), all 57 new premises have real lat/lng.
