# 2026-08-24 — Zero-menu-item cleanup, Batch AD: Hougang 105 Hainanese Village Centre (task #65)

Thirtieth batch of the zero-menu-item cleanup, seventh batch from the fresh per-venue audit.
Surfaced a real location-labeling data bug alongside the usual menu-item gaps.

## Selection

10 zero-menu brands at Hougang 105 Hainanese Village Centre. 0 brands here have more than 1
Premises row.

## Data bug found — flagged, not fixed this batch

4 of the 10 brands (Anytime Food Pte. Ltd., Bachmann Japanese Restaurant Pte Ltd, Bengawan
Solo Pte Ltd, BreadTalk Pte Ltd) carry a generic `cuisine: "Local & Hawker"` tag, the same
signature as the mis-recorded brands found in Batch Z. Checking their Premises `address`
field confirmed a real bug: all 4 point to **Hougang Mall, 90 Hougang Avenue 10** (postal
538766) — not the Hainanese Village Centre's actual address at 105 Hougang Avenue 1 (postal
530105) — even though their `locationContext` says "Hougang 105 Hainanese Village Centre".
These are real businesses genuinely operating at Hougang Mall, just mislabeled under the
wrong venue name in this dataset. Not fixed in this batch (out of scope — a
locationContext/venue-mapping correction, not a menu-item gap) but flagged here for a future
data-integrity pass; worth checking whether other "Local & Hawker" generic-cuisine brands
elsewhere have the same mislabeling.

## Sourcing

Of the 4 mislabeled brands, 3 are real, specific, well-known chains and were given accurate
real dishes despite the location confusion: Bachmann Japanese Restaurant (a real multi-outlet
Japanese restaurant chain — Bugis, Tampines, Sengkang, Orchard, and per SFA data, Hougang
Mall — confirmed via web search, known for ramen, katsu, and sushi/sashimi), Bengawan Solo
(the well-known Singapore kueh/cake bakery chain), and BreadTalk (the well-known bakery
chain, famous for its pork floss bun). The 4th, **Anytime Food Pte. Ltd., was skipped** — its
ACRA registration shows only a generic "cafes" principal activity with no discoverable
specific brand or concept, so no dish could be sourced without fabricating one.

The remaining 6 brands are real, correctly-located stalls (confirmed via
`kopitiam.com.sg`'s own Hainanese Village Centre review and, for Jiu Ji Shu Shi
specifically, a Tidbits Mag writeup confirming its address as Blk 105 Hougang Ave 1 #02-31 —
the correct venue): He He (Min Jiang Kueh), Jiu Ji Shu Shi (a Chinese-named stall actually
known for Malay dishes — Mee Rebus, Mee Siam, Lontong — confirmed via web search), Lorong Ah
Soo Lor Mee, Yong Seng Teochew Fishball Mee, Xian Ting Vegetarian, Tian Tian Nasi Lemak.

## Menu items

9 of 10 brands covered, 9 items. 3 new dish types added to `dish-macro-lookup.py` (Chicken
Katsu, Pork Floss Bun, Vegetarian Wanton Mee); the remaining 6 items reused existing dish
types (Kueh Lapis, Min Jiang Kueh, Mee Rebus, Lor Mee, Fishball Noodles, Nasi Lemak).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,838 total menu items (1,829 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, intentionally-skipped brand
  confirmed still zero-menu (as expected), 1,749 total brands (unchanged).
- Zero-menu-item brand count: 797 → 788.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the fresh audit's top-30 list: AMK Hub (10), Kopitiam Food Hall @ Jurong Point (10), Tan
Tock Seng Hospital (10), Compass One (10), Tampines Mall (10), Vista Point (10), and onward
down the 182-venue list, plus the ~930 single/few-outlet Kopitiam concessions below Batch B's
>=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared venue
leverage. Separately: the flagged Hougang Mall/Hainanese Village Centre location-labeling bug
and the skipped Anytime Food Pte. Ltd. brand, plus general awareness that "Local & Hawker"
generic-cuisine brands may carry similar location mismatches elsewhere and warrant a
dedicated audit pass.
