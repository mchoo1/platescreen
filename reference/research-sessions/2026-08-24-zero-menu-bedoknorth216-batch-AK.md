# 2026-08-24 — Zero-menu-item cleanup, Batch AK: Bedok North Street 1 Blk 216 (task #65)

Thirty-seventh batch of the zero-menu-item cleanup, first batch of a re-run fresh audit
(the original top-30 venue list was fully covered as of Batch AJ). Re-ran the per-venue
audit grouping remaining zero-menu brands by locationContext, sorted by size, to find the
next tier of targets.

## Selection

9 zero-menu brands at Bedok North Street 1 Blk 216 (a small HDB block market and food
centre).

## Data pattern found — flagged, 3 of 4 still given real dishes

4 of the 9 brands (Bengawan Solo Pte Ltd, Domino'S Pizza Singapore Pte. Ltd., Mcdonald'S
Restaurants Pte. Ltd., Ntuc Club) carry the same `cuisine: "Local & Hawker"` generic tag seen
in Batches Z and AD. Unlike the Hougang case, the `address` field here does say 216 Bedok
North Street 1 (matching locationContext) — but a web search found the real Domino's outlet
is actually at neighbouring Blk 218 and the real Bengawan Solo outlet at Blk 213, not 216.
This is the same underlying location-imprecision issue as before, just with SFA data
recording a nearby block's address rather than a different mall entirely.

Despite the imprecision, 3 of the 4 are real, specific, identifiable chains and were given
accurate real dishes: Bengawan Solo (Kueh Lapis), Domino's Pizza (Pepperoni Pizza), McDonald's
(Big Mac). The 4th, **NTUC Club, was skipped** — it is a membership/recreation club
organisation, not a specific food-dish-bearing brand, so no dish could be sourced without
fabricating one (the same reasoning applied to Cold Storage in Batch Z).

## Sourcing

The remaining 5 brands are real, specific hawker stalls with usable cuisine tags: Chris Kway
Chap, Joo Chiat Chiap Kee (Fishball Noodles), Sin Ho (Prawn Paste Chicken & Fish Soup), Han
Kee Fish Soup, Ah Li Ipoh Hor Fun Fish Dumpling.

## Menu items

8 of 9 brands covered, 8 items. 2 new dish types added to `dish-macro-lookup.py` (Big Mac,
Prawn Paste Chicken); the remaining 6 items reused existing dish types (Kueh Lapis, Pepperoni
Pizza, Kway Chap, Fishball Noodles, Sliced Fish Soup, Ipoh Hor Fun).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,912 total menu items (1,904 + 8), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 8 target brands still zero-menu, intentionally-skipped brand
  confirmed still zero-menu (as expected), 1,749 total brands (unchanged).
- Zero-menu-item brand count: 722 → 714.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Re-run audit's next tier (all tied at 9 zero-menu brands): Tampines 1, Changi General
Hospital, Punggol 639, Jurong West Central 679, West Mall, Berseh Food Centre; then the
8-brand tier (Pasir Ris 527C, Keat Hong Food Centre and Market, Bagus @ Pasir Ris Mall, Bagus
@ Paya Lebar Square, Kebun Baru Food Centre, Adam Road Food Centre); 168 total venues remain
with >=1 zero-menu brand. Plus the ~930 single/few-outlet Kopitiam concessions below Batch
B's >=4-outlet threshold, plus the long tail of true single-outlet stalls with no shared
venue leverage. Separately: the recurring "Local & Hawker" generic-cuisine
corporate-name-with-imprecise-address pattern (now seen at Ayer Rajah, Hougang 105, and
here) is worth a dedicated cleanup pass at some point rather than handling case-by-case.
