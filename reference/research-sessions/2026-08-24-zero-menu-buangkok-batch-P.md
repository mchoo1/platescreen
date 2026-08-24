# 2026-08-24 — Zero-menu-item cleanup, Batch P: Buangkok Hawker Centre (task #65)

Sixteenth batch of the zero-menu-item cleanup, fourteenth long-tail venue batch. Buangkok
had been a repeatedly-blocked venue in earlier sessions (tasks #49/#50/#54 note it as
stuck) — the brands themselves clearly did get resolved to real proper-noun names at some
point since, but were left with 0 menu items.

## Selection

25 unique zero-menu brands at Buangkok Hawker Centre (70 Compassvale Bow, Singapore
544692). None of these 25 brands have an `operatorId` set — unlike Kopitiam/Timbre/Koufu
concessions, these were modeled as independent, venue-specific stalls. 0 brands here have
more than 1 Premises row (checked upfront, per the standing per-venue audit habit).

## Sourcing

No cached stall-dishes JSON exists for this operator-less venue. Sourced individually via
web search: Eatbook's "15 Best Buangkok Hawker Centre Stalls" writeup and SETHLUI's "11
picks for your first visit" guide together covered 17 of the 25 target brands with
specific dish names, prices, and unit numbers. The remaining 8
(`fat_fat_food`, `yi_hong_wok`, `hk_wanton_noodle_roasted_delights`,
`sunbo_express_penyet_bbq`, `uno_eat`, `huang_chao_teochew_noodle_house`, `juice_lab`)
were individually searched and resolved via HungryGoWhere, foodpanda/Grab delivery menus,
Facebook stall-announcement posts, and Fei Siong Group's own brand page.

## Duplicate check

`buangkok_hawker_centre_fat_fat_food` (a Cantonese porridge specialist run by hawker Jim
Chia) was checked against the existing `kopitiam_fat_fat_food_carrot_cake_and_hokkien_mee`
brand, since both share the "Fat Fat Food" name. Confirmed these are unrelated businesses
(different menus — porridge vs. carrot cake/hokkien mee — and "Fat Fat Food" 發發福 is a
common auspicious name for hawker stalls in Singapore, not exclusive to one operator). Not
a duplicate; no removal made.

## Menu items

All 25 brands covered, 25 items. 11 new dish types added to `dish-macro-lookup.py`: Char
Siew Don, Basil Minced Pork Rice, Kebab Rice, Fried Chicken Wing, Egg Fried Rice, Char
Siew Kolo Noodles, Chicken Pho, Teochew Fishball Noodle, Cantonese Porridge, Fish and
Chips, Fresh Fruit Juice. The remaining 14 items reused existing dish types (Char Kway
Teow x2, Lor Mee x2, Chicken Rice, Yong Tau Foo, Peanut Pancake, Kway Chap, Fried Hokkien
Mee, You Tiao, Fish Soup, Wanton Mee, Ayam Penyet Set, Mee Goreng), several with real
sourced prices applied as overrides (Ming Chung White Lor Mee $6.50, Feng Ji Chicken Rice
Combo $5.50, Bai Nian Yong Tau Fu $5.90, Guan Kee Kway Chap set $4, Redhill Hokkien Mee
$6, Soya Bean You Tiao's You Tiao $1.10, Jue Shuang's Signature Lor Mee $5.50, The 11th
Street's Sliced Fish Soup with Minced Meat $9.80, Rizqia's Mee Goreng Combo $10, Penang
Alley's Char Kuay Teow $5.50).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,594 total menu items (1,569 + 25), 0 duplicate ids, 0 orphaned items,
  0 orphaned premises, 0 of the 25 target brands still zero-menu, 1,753 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 1,061 → 1,036.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Alexandra Village Food Centre (24), Bukit Panjang Hawker Centre & Market (23), Senja
Hawker Centre (20), Fernvale Hawker Centre & Market (19), Parkway Parade (17), Changi
Airport Terminal 3 (15), Hillion Mall (14), and onward down the per-venue audit list, plus
the ~930 single/few-outlet Kopitiam concessions below Batch B's >=4-outlet threshold. Worth
noting: operator-less, independently-modeled venues (like this one) need per-stall web
research rather than a cached-JSON shortcut — expect this pattern to recur for other
recently-opened hawker centres.
