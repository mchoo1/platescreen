# 2026-08-24 — Zero-menu-item cleanup, Batch V: Changi Airport T3 + Changi Village (task #65)

Twenty-second batch of the zero-menu-item cleanup, twentieth long-tail venue batch. Two
related venues fetched and handled together since they share the "Changi" name prefix in
the per-venue audit.

## Selection

22 zero-menu brands across two distinct venues:
- Changi Airport Terminal 3 — 17 brands, all `operatorId: "kopitiam"`.
- Changi Village Blk 2 and 3 — 5 brands, no `operatorId` (independently-modeled stalls).

0 brands at either venue have more than 1 Premises row.

## Sourcing

The 17 Terminal 3 brands all matched directly in
`reference/data/kopitiam-stall-dishes.json`. The 5 Changi Village brands were individually
researched:
- Weng Kee Original Taste Ipoh Hor Fun → Ipoh Hor Fun (existing dish type).
- Guang Xing Original Taste Fish Head Bee Hoon → new "Fish Head Bee Hoon" dish.
- Hjh. Salbiah → Nasi Padang (existing dish type, matches the stall's "Nasi Lemak & Nasi
  Padang" cuisine tag).
- Mei Lin Leng Re Yin Pin → "Commando Dessert" ($2.00), a real, distinctively-named
  28-year-old shaved-ice dessert (longan, red-tea jelly, condensed milk) unique to Changi
  Village — confirmed via web search, not a fabricated placeholder despite the unusual
  name.
- Charlie's Corner → Western Food (existing dish type).

## Menu items

All 22 brands covered, 22 items. 5 new dish types added to `dish-macro-lookup.py`
(Taiwanese Yangchun Noodles, Stir Fry Long Chilli Pepper with Pork Rice, Chicken & Egg
Curry Puff, Fish Head Bee Hoon, Commando Dessert); the remaining 17 items reused existing
dish types (Putian Fried Bee Hoon, Spinach Soup, Char Kway Teow, Nasi Padang x2, Bak Kut
Teh, Yong Tau Foo, Grilled Fish, Economical Rice, Roasted Chicken Rice, Mala Xiang Guo,
Duck Rice, Curry Chicken, Wanton Mee, Fishball Noodles, Ipoh Hor Fun, Western Food).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,742 total menu items (1,720 + 22), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 22 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 906 → 884.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Hillion Mall (14), and onward down the per-venue audit list, plus the ~930 single/few-outlet
Kopitiam concessions below Batch B's >=4-outlet threshold.
