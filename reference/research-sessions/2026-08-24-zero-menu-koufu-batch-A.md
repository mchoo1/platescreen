# 2026-08-24 — Zero-menu-item cleanup, Batch A: Koufu in-house chains (task #63)

Kicks off task #62/#63: of 1,772 brands, 1,610 had zero `MenuItem`s. Full breakdown:

- By type: 629 `hawker`, 970 `food_court_stall`, 8 `restaurant`, 3 `grab_go`.
- 1,460 of the 1,610 are single-outlet stalls; 150 are multi-outlet chains.
- 970 of the 1,610 are food-court concessions (`operatorId` set — kopitiam/hawkers_street).
- Total outlets affected: 2,006 premises across the 1,610 brands.

This is far too large for one pass. Picked the highest-leverage starting point: the 5
brands that are (a) real, (b) run a single consistent menu across every location (unlike
a hawker centre, where every stall differs), and (c) have outsized outlet counts — so one
research pass per brand fixes many outlets at once.

## Brands covered

| Brand | Outlets | Items added |
|---|---|---|
| `koufu_nine_fresh` (Nine Fresh, Taiwanese dessert) | 25 | 8 |
| `koufu_happy_hawkers` (Happy Hawkers, Koufu coffeeshop toast/beverage stalls) | 21 | 7 |
| `koufu_dough_culture` (Dough Culture, fried snacks) | 18 | 8 |
| `koufu_rb_tea` (R&B Tea, bubble tea) | 16 | 7 |
| `koufu_grove` (Grove, vegetarian noodle bowls) | 4 | 5 |

35 menu items total, 84 outlets now have real macro data where they had none.

## Sourcing per brand

- **Dough Culture** — dish names and prices came directly from Koufu's own site
  (already scraped into `reference/data/koufu-family-dishes.json` in an earlier session,
  source: koufu.com.sg). No new research needed for names/prices — just added macros.
- **Nine Fresh** — real dish names and current prices from Nine Fresh's own SG menu
  (menurasa.my, updated Apr 2026), cross-checked against Burpple/Tripadvisor reviews and
  an independent web search summary naming the same signature items (Grass Jelly
  Special, Pearly Bean Curd, etc.).
- **R&B Tea** — real drink names and current prices from R&B Tea's SG menu
  (sgfoodprice.org), cross-checked against an independent web search naming the same
  signature drinks (Brown Sugar Boba Milk with Cheese Brûlée, Peachy Crystal). That same
  page's generic bubble-tea nutrition table was used as the macro estimate basis per
  dish type — note this is an aggregator's generic bubble-tea nutrition table, not R&B
  Tea's own published figures, so still `confidence: "estimated"`, not `"verified"`. The
  same page also carried an obviously fabricated "Drive Thru" menu and "Bulk Order"
  table (R&B Tea has no drive-thru; items like "Crispy Chicken Nuggets" don't match any
  other source) — ignored entirely, not used.
- **Happy Hawkers** — real toast-set and beverage item names and prices from a
  PriceListo listing that aggregates confirmed pricing from an actual Koufu
  toast/beverage stall (updated Dec 2025) — this is the stall type Koufu itself directly
  operates inside its Happy Hawkers coffeeshops (per PriceListo's own description:
  "Beverage and toast set stalls, which are directly managed by Koufu"). Structurally
  different from the other four — Happy Hawkers is a coffeeshop containing many
  independently-run stalls, not a single fixed menu — so only the Koufu-operated
  toast/beverage counter was covered, not the whole coffeeshop's rotating cast of
  tenants.
- **Grove** — real dish names and prices from a published outlet review (sethlui.com),
  consistent with Grove's own brand positioning on koufu.com.sg ("meat-free casual
  dining concept... all dishes specially curated") — every item is vegetarian by
  definition of the concept, so `compatibleWith: ["vegetarian"]` on all 5 items is a
  brand-level fact, not a guess.

All macros are per-dish estimates (`confidence: "estimated"`), following this project's
established convention (800 of the pre-existing 879 menu items were already
`"estimated"` — see original menuItems.ts entries). Dish identity and pricing are real
per the sources above; calorie/protein/carb/fat figures are typical values for that
dish type, the same methodology used for every hawker-stall menu item added earlier in
this project.

## Incidental fix

Found a pre-existing duplicate id bug unrelated to this batch: two different Toast Box
menu items both had `id: "tb_set_a"` (different names/prices/macros — a real data bug,
not a duplicate entry). Renamed the second to `tb_set_a2` while in this file. Confirmed
via `git show HEAD:src/lib/menuItems.ts` that this predates today's changes.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 914 total menu items (879 + 35), 0 duplicate ids (after the incidental
  fix), 0 orphaned items (every new item's `brandId` matches a real brand), each of the
  5 target brands shows exactly the expected item count.
- Zero-menu-item brand count: 1,610 → 1,605.
- Live vs build-mirror `menuItems.ts` — byte-identical diff.

## What's next

Task #64 (Batch B): the ~30 multi-outlet Kopitiam/Hawkers Street concessions (4-16
outlets each) that already have real dish names scraped into
`reference/data/kopitiam-stall-dishes.json` — same treatment, add estimated macros +
reasonable prices per dish.

Task #65 (long tail): the remaining ~1,460 single-outlet stalls. This is the bulk of the
original gap and will need many further batch sessions, similar in scale to the earlier
hawker-centre-by-hawker-centre research passes (Tekka, Maxwell, Lau Pa Sat, etc.).
