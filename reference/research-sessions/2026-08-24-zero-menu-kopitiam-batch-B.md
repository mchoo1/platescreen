# 2026-08-24 — Zero-menu-item cleanup, Batch B: Kopitiam/Hawkers Street concessions (task #64)

Second batch of the zero-menu-item cleanup (task #62 audit: 1,610 of 1,772 brands had no
`MenuItem`s; Batch A covered the 5 Koufu in-house chains — see
`2026-08-24-zero-menu-koufu-batch-A.md`). This batch covers the next-highest-leverage
tier: food-court concessions with 4+ outlets each.

## Selection

Filtered brands where `operatorId` is `kopitiam` or `hawkers_street`, zero `MenuItem`s,
and 4+ premises. 41 brands matched, covering 199 outlets combined.

## Sourcing

**36 Kopitiam brands** — dish names came directly from
`reference/data/kopitiam-stall-dishes.json`, a cache from an earlier session's scrape of
Kopitiam's own stall pages (stall-sitemap.xml, schema.org JSON-LD — see
`2026-08-22-kopitiam-stall-scrape.md`). Matched each target brand's `name` field against
that cache's keys; all 36 had exact matches. Picked 1-3 representative dishes per brand
(the most clearly "signature" ones where a stall listed several near-duplicate name
variants, e.g. "Nasi Lemak Ayam Taliwang" vs "Nasi Lemak Ayam Tailwang" — picked the
canonical spelling, didn't add both as separate items).

**5 Hawkers' Street brands** — no dish data existed in the Kopitiam cache (different
operator), so researched individually via web search:

- `tai_wah_pork_noodle` — Michelin Bib Gourmand bak chor mee stall (High Street Tai Wah
  Pork Noodle at Hong Lim Food Centre). Real prices: $7/$9/$11 for small/medium/large.
- `tai_seng_fish_soup` — Michelin Bib Gourmand fish soup stall. Real prices: Mixed Fish
  Soup $6.30/$8.30/$10.30, Fish Head Soup $6.30.
- `hill_street_hainanese_curry_rice` — well-known SG curry rice chain (multiple sources
  confirm the dish and four-sauce serving style; no single confirmed current price
  found, so the price is an estimate consistent with comparable curry-rice stalls,
  flagged as such below).
- `pangs_hakka_ytf` — Chef Pang's Hakka yong tau foo concept. Real prices from
  misstamchiak.com: Signature Hakka Yong Tau Foo $6.30, Curry Hakka YTF Noodles $6.80.
- `hill_street_coffee_shop` — a beverage/toast-counter concept (cuisine: "Coffeeshop /
  Kopi"), not a single dish like the others. Given generic kopi/toast items following
  the same precedent used for `koufu_happy_hawkers` in Batch A, since neither is a
  single fixed menu.

Macros for all 41 brands are per-dish estimates (`confidence: "estimated"`), same
methodology as Batch A and the rest of this file.

## One price flagged as less certain

`hill_street_hainanese_curry_rice`'s $6.50 price is an estimate based on comparable
curry-rice stalls, not a directly confirmed current menu price (unlike every other item
in this batch, which has a sourced real price). Dish identity and description (four
sauces: braising, curry, chilli, coconut) are confirmed real.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 978 total menu items (914 + 64), 0 duplicate ids, 0 orphaned items, all
  41 target brands confirmed to have at least 1 new item.
- Zero-menu-item brand count: 1,605 → 1,564.
- Live vs build-mirror `menuItems.ts` — byte-identical diff.

## What's next

Task #65 (long tail): ~1,460 single-outlet hawker/food-court stalls with zero menu
items remain (plus the ~930 single/few-outlet Kopitiam concessions not covered by this
batch's 4+-outlet threshold). This is the bulk of the original gap — will need many more
batch sessions, similar in scale to the earlier hawker-centre-by-hawker-centre passes.
