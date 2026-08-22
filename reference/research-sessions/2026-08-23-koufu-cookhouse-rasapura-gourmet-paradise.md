# 2026-08-23 (2nd pass) — Koufu's Cookhouse, Rasapura Masters, Gourmet Paradise

**Trigger:** continuation of task #49, following up on the "still not found" line left in every
prior Koufu write-up: The Kitchen, The Green Hut, and Rasapura Master, previously reported as
404s because earlier passes guessed koufu.com.sg URL slugs instead of following real links.

## What was actually found

`koufu.com.sg/our-brands/` links to 5 category pages: food-halls, concept-stores,
cafe-restaurants, shopping-mall, overseas. `food-halls` is the category that matters here — its
own "sub_pages_thumbs" grid links to 6 real brand pages: `koufu` (the flagship format), `cookhouse`,
`rasapura-masters`, `fork-spoon`, `gourmet-paradise`, `happy-hawkers`. Fork & Spoon and Happy
Hawkers were already added in an earlier session. Each of these pages is plain server-rendered
HTML (no JS needed) with a real "Our Outlet" address list.

**The Kitchen and The Green Hut do not appear anywhere in Koufu's current official brand
taxonomy** — checked all 4 non-overseas categories (food-halls, concept-stores,
cafe-restaurants, shopping-mall) for every sub-brand link, none matched either name. Read as a
likely mistaken assumption carried forward from an earlier pass (possibly hearsay or a
discontinued/renamed format) rather than a real, current gap — not pursued further without a
source that actually names them.

## What was added

- **Cookhouse** (`koufu_cookhouse`) — 4 outlets: Novena Square, Changi Airport Terminal 2,
  Waterway Point, White Sands.
- **Rasapura Masters** (`koufu_rasapura_masters`) — 1 outlet: The Shoppes at Marina Bay Sands.
- **Gourmet Paradise** (`koufu_gourmet_paradise`) — 4 outlets: Marina Square, Parc Point, Oasis
  Terraces, Toa Payoh Hub.

All 3 added with the same pattern as the earlier 8 standalone Koufu Group brands (Happy Hawkers,
Fork & Spoon, Grove, both 1983 brands, R&B Tea, Nine Fresh, Dough Culture) — no `operatorId`,
since each is its own named, single-menu format, not a generic unnamed concession sharing someone
else's building. 9 new Premises rows total, all geocoded via OneMap postal lookup.

## What was deliberately NOT added

The flagship **"Koufu"** brand page itself lists 36 real, full-address, geocoded-postal outlets
islandwide ("over 70 existing outlets islandwide" per its own copy, 36 actually listed with
addresses). This is real, verifiable data — but it was not added as a Brand. A "Koufu" food court
building houses many unrelated stalls with different vendors and dishes; treating "Koufu" itself
as one orderable Brand is exactly the generic-mega-brand shape that was already tried and
reverted for Kopitiam, Koufu, Foodfare, and Hawkers' Street in the 2026-08-22c restructure (see
that day's brands.ts header comment). Its 36 addresses are the same kind of "operator venue"
data already captured for Koufu in `reference/data/food-court-venues.json` — nothing new to
preserve there.

**Elemen** (elemengroup.com.sg, a Koufu Group cafe-restaurants sub-brand) was checked and is
genuinely JS-rendered (Squarespace) — its `/locations` and `/findus` pages ship no static address
data in the HTML response. Left unresolved, unlike every other Koufu-hosted page this session,
which all turned out to be server-rendered once the real link was followed instead of a guess.
**Pang Pang Kopi** (pangpangkopi.com.sg) returned HTTP 403 on direct fetch — not pursued further
this pass.

## What this doesn't do yet

Same macro gap as every prior batch: real names and addresses only, no MenuItem rows (no
calories/protein/carbs/fat data was available from these pages, and none was fabricated).

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. Scripted checks: 1,633 total brands (0 duplicate
IDs), 4,562 total premises (0 orphaned), all 9 new premises have real lat/lng.
