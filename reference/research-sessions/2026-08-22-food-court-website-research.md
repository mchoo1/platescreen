# 2026-08-22 — Food-court operator website research (follow-up to the operator restructure)

**Trigger:** direct user instruction — "research their websites and add the stores that they have"
— following the earlier restructure that removed Kopitiam/Koufu/Foodfare/Hawkers' Street as fake
single mega-brands.

## What was added

**5 real Koufu Group in-house chains**, each with its own consistent menu and its own
server-rendered outlet-listing page on koufu.com.sg (not a JS map widget, so directly fetchable and
verifiable): `koufu_happy_hawkers` (21 outlets, N/S/E/W Singapore), `koufu_fork_spoon` (3: Ng Teng
Fong General Hospital, Toa Payoh Hub, Woodlands Mart), `koufu_grove` (4: Buangkok Square, Northshore
Plaza 1, Canberra Plaza, SingPost Centre), `koufu_1983_coffee_toast` (1: Changi General Hospital),
`koufu_1983_taste_of_nanyang` (1: SMU). 30 real premises total, every one individually geocoded via
OneMap (postal-code query) rather than left null. These are standalone storefronts under Koufu
Group's own branding, not concessions sharing someone else's food-court floor, so no `operatorId` —
modeled the same way as any other multi-location chain (McDonald's, Subway, etc.).

**2 new Hawkers' Street venues** (Square 2, The Clementi Mall) confirmed via
`hawkersstreet.com.sg/outlets/`, which now lists 9 venues, up from the 8 in the existing SFA-derived
data. Real addresses captured and added to `reference/data/food-court-venues.json`; lat/lng left
`null` pending a geocode pass (not yet done this session — flagged for next time).

## What was investigated but not added, and why

- **Kopitiam's own outlet finder** (kopitiam.biz/our-outlets/): a OneMap-based interactive map with
  no server-rendered list. Checked network requests, inline `<script>` content, and `/wp-json/`
  endpoints — no discoverable data source. Clicking "Load More" and toggling brand-filter checkboxes
  produced no readable DOM text (`document.body.innerText` stayed under 500 characters throughout).
  Bulk extraction wasn't achievable within reasonable effort; would need per-venue interaction, not
  practical at ~100+ outlets.
- **Kopitiam's named F&B concessions** (Ah Bowl Den, Belly Belly Good Cai Fan, Chomp!, Confirm+Chop
  Western Grill, Flint Specialty Grill, Flint Specialty Grill & Bar, Heavenly Wang, Kokoro Izakaya,
  Kokoro Kiosuku, Sedap Kitchen, Xiang Chi Mian) — named and real per FairPrice Group's own site, but
  none appear as filter categories on Kopitiam's outlet finder, so their locations need separate
  per-brand research (own site or social presence), not attempted this pass.
- **R&B Tea, Dough Culture, Nine Fresh** (Koufu's other standalone chains) — all three have JS/SPA
  store-locator pages (rbtea.com.sg, doughculture.com, ninefresh.com) that returned empty on static
  fetch. Not pursued via browser automation this pass given the Kopitiam locator's dead end already
  used significant effort; worth a dedicated pass later.
- **Koufu's "The Kitchen", "The Green Hut", "Rasapura Master"** — guessed URL slugs (following the
  pattern of the brands that did work) 404'd. The correct slugs are presumably linked from
  koufu.com.sg/our-brands/food-halls/ and koufu.com.sg/our-brands/concept-stores/ directly; a future
  pass should follow the actual links rather than guess.
- **elemen and Pang Pang Kopi** — external sites, not checked this pass.
- **NTUC Foodfare** — foodfare.com.sg now positions the business purely as B2B institutional
  catering (childcare, healthcare/eldercare, government, food manufacturing), with no consumer-facing
  outlet locator at all. This is a genuine scope question, not a research gap: are Foodfare's 48
  existing SFA-sourced premises (hospital/SAF-camp/corporate-campus cafeterias) legitimately
  "somewhere the public can walk in and eat," or should Foodfare be treated as out of scope for a
  consumer restaurant-finder? Flagged in `researchQueue.ts`, not decided.
- **Banquet** — still has zero real venue addresses in `food-court-venues.json`; needs its own
  from-scratch SFA/website lookup (Jurong Point, Woodlands Square, VivoCity per third-party operator
  listings, unverified against an official source yet).

## Verification

`npx tsc --noEmit` clean, `npm run build` clean. All 30 new Koufu-family premises geocoded via
OneMap and spot-checked against their source addresses.
