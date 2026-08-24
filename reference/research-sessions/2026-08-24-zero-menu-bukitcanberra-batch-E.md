# 2026-08-24 — Zero-menu-item cleanup, Batch E: Bukit Canberra Hawker Centre (task #65)

Fifth batch of the zero-menu-item cleanup, third long-tail venue batch. Unlike Batches
C and D, Bukit Canberra is operated by Canopy Hawkers Group, not Kopitiam — so there was
no cached dish-name shortcut (`kopitiam-stall-dishes.json` only covers Kopitiam-operated
venues). Every one of the 41 zero-menu stalls here was individually researched via web
search: a real per-stall shortcut doesn't exist for this operator, so this batch took
meaningfully longer per outlet than Batches C/D, as expected going in.

## Selection

All 41 zero-menu brands at Bukit Canberra Hawker Centre (added as real, named brands in
an earlier session — see `2026-08-23-bukit-canberra-yishun-park-hawker-centres.md` — but
never given menu items).

## Sourcing

Searched each stall individually. Sources per stall varied: foodpanda restaurant
listings (menu items + prices), food blog reviews (sethlui.com, eatbook.sg,
danielfooddiary.com, Yahoo Life SG), and the venue's own site (bukitcanberrahc.sg). All
41 dish names and most prices are real and sourced; a few (Fried Hokkien Mee, Claypot
Rice, Nasi Lemak, Sliced Fish Soup, and similar generic-category dishes where no
stall-specific price was found) reused the existing per-dish-type estimate from
`reference/data/dish-macro-lookup.py` rather than a stall-specific price.

Notable finds: Berempah Bros is run by a MasterChef Singapore Season 2 winner; Liu Kou
Shui and Pinky's Kitchen Nakhon Si are both recent additions covered by multiple food
blogs with detailed menus; Scissors Paper Stone turned out to be a beer/drinks stall
(name references the drinking game), not a food stall — given the existing generic
"Beer" lookup entry rather than any specific dish.

Added ~17 new dish types to `reference/data/dish-macro-lookup.py` (now well over 200
entries): Hainanese Bee Hoon, Ayam Berempah, Caramelised Char Siew Don, Shawarma Plate,
Beef Boat Noodle, Chicken Quesadilla, Ayam Merah Rice, and others specific to this
venue's more eclectic stall mix (Thai, Middle Eastern, Mexican-Indian fusion, Korean, in
addition to the usual Chinese/Malay hawker fare).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,252 total menu items (1,209 + 43), 0 duplicate ids, 0 orphaned items,
  0 of the 41 Bukit Canberra target brands still zero-menu.
- Zero-menu-item brand count: 1,430 → 1,389.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Per the user's confirmed direction to continue at this pace, next venues from the
per-venue audit: Punggol Coast Hawker Centre (41), Kampung Admiralty Hawker Centre (38),
Ci Yuan Hawker Centre (37, though this one was flagged in an earlier session as already
partially researched - worth checking overlap first), One Punggol Hawker Centre (35),
Kopitiam @ Our Tampines Hub (35).
