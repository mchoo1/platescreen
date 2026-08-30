# Batch BL: identifying the real stalls behind GENERIC-cuisine brands — 2026-08-29

Task #65. User asked to "identify the actual stalls" behind the remaining
GENERIC-placeholder-name brands (task #65's final long-tail category, after
Batches BB-BK resolved every dish-tagged and kopitiam-operator-matched brand).
This batch attempted exactly that for all 50 remaining GENERIC-cuisine brands
(cuisine field blank or "Local & Hawker").

## Two distinct groups found

### Group 1: kopitiam_-operated brands (36 brands, 33 covered)

These have a blank/generic `cuisine` field, but — unlike every prior batch's
target brands — their own `name` field already names the real dish directly
(e.g. brand name "Curry Rice", "Chendol", "Yong Tao Foo", "Prata Alley"), or
resolves cleanly by looking that exact name up in
`reference/data/kopitiam-stall-dishes.json`. No separate research needed; this
is the same site-scrape source used throughout Batches BF-BK.

3 of the 36 excluded:
- **CuLiang YuFen** — its own scrape entry is self-referential
  (`{"CuLiang YuFen": ["CuLiang YuFen"]}`), meaning the site scrape has no real
  dish data for it either.
- **China Food** — scrape entry is `["Cold dishes"]`, too vague to be a single
  identifiable item.
- **Cheers** — scrape entry is empty (`[]`), confirming this is the Cheers
  convenience-store chain (present inside some Kopitiam foodcourts), not a food
  stall — same treatment as the 5 Koufu food-hall brands excluded in Batch BJ.

### Group 2: non-kopitiam GENERIC brands (13 brands, 0 covered — genuinely unidentifiable)

These are bare SFA-licensee person-names or corporate-entity names with no
descriptive signboard name captured anywhere in the data: Au Jiahao Alex, Chan
Cheow Teck, Chan Kok Hee (Tian Guoxi), Goh Poo Huat, Kwek Ah Heoh, Lee Jim Pong,
Lim Hang Tong, Ngern Jwee Chye, Goh Jee Tee (second record at Mei Chin Road
Market), Lee Kee Yeo @Lee Lian Hong, Ntuc Club, Chong Yo Private Limited.

Each was individually web-searched by name + venue. **None returned a matching
result** — no food blog, review site, delivery-app listing, or hawker-centre
guide names any of these as an actual stall. This confirms what task #29
("Test Google Maps escalation for unnamed hawker stalls") already flagged as
pending: SFA licensee names generally don't appear on public signboards or in
food media, so text search alone cannot identify them. The only remaining path
is direct visual identification — Google Maps Street View or an in-person visit
— which is outside what this research pass can do.

### Confirmed/near-certain duplicates (a data-quality finding, not new coverage gaps)

Cross-checking these against already-covered brands at the same venue confirmed
3 of the 13 are very likely duplicate SFA-licensee-name records for stalls
already covered under their real signboard name — the same issue first flagged
in Batch AY:

- **Teo Kiang Huat** (Eunos Crescent Blk 4A) = **Keng Huat Cold & Hot Dessert**
  (already covered at the same venue) — per the original Batch AY finding.
- **Ngern Jwee Chye** (Tanglin Halt Market) = **Wei Yi Laksa & Prawn Noodle**
  (already covered at the same venue) — per the original Batch AY finding.
- **Goh Jee Tee** at Mei Chin Road Market exists as **two separate brand
  records** with the identical name — one already covered
  (`mei_chin_road_market_goh_jee_tee`), one not
  (`mei_chin_road_market_goh_jee_tee_2`) — almost certainly the same physical
  stall recorded twice.

These 3 are not "missing coverage" in any real sense — the actual stalls behind
them already have menu items under their other brand record. Adding a second,
independent MenuItem under the duplicate id would double-count the same real
stall in search results, which is worse than leaving it as-is. Flagging this
here (again) as a standing data-quality cleanup item for `brands.ts`/`premises.ts`,
separate from the menu-coverage task.

The remaining 2 non-duplicate, unidentified brands (Lim Hang Tong at Tanglin
Halt Market, Lee Kee Yeo @Lee Lian Hong at Mei Chin Road Market) may or may not
also be duplicates of one of their venue's other covered brands, but no
confirming signboard-name match was found for either — left as genuinely
unresolved rather than guessed.

## Results (33 of 49 candidates covered)

Notable dish assignments: Ah Chew Yong Tao Foo / Yong Tao Foo / Cik Lim Yong Tau
Foo → Yong Tau Foo (existing, ×3); Old World Bak Kut Teh & Fried Porridge /
Claypot Bak Kut Teh (already resolved in Batch BK) → Bak Kut Teh; Chinese Mixed
Rice / Hao Wei Rice Garden Mix Veg. / Mix Veg / Chang Cheng Food Paradise (Rice
Garden) → Mixed Vegetable Rice (new dish type, reused across 4 near-identical
"economic rice" stalls); Fried Item / Seabay → Fried Kway Teow; KFC (the actual
chain, operating a concession inside a Kopitiam foodcourt) → Fried Chicken.

## New dish types

- `Chendol` — 🍧, Bakery/Dessert, $2.5, 280 cal, 3g protein.
- `Lotus Root Pork Ribs Soup` — 🍲, Local Hawker, $6.5, 400 cal, 26g protein
  (explicitly pork-named — never a no_pork candidate).
- `Mixed Vegetable Rice` — 🍚, Local Hawker, $3.5, 420 cal, 15g protein (cai fan
  / economic rice style — protein varies by customer's chosen dishes, ambiguous).
- `ABC Soup` — 🍲, Local Hawker, $5.0, 280 cal, 12g protein (traditionally
  contains pork ribs — left untagged).
- `Acai Soft Serve` — 🍨, Bakery/Dessert, $5.5, 220 cal, 4g protein.
- `Ice Cream` — 🍦, Bakery/Dessert, $4.0, 250 cal, 4g protein.
- `Bakso` — 🍲, Indonesian/Malay, $5.5, 380 cal, 22g protein (Indonesian
  meatball soup, traditionally beef-based, halal).
- `Goreng Pisang` — 🍌, Local Hawker, $2.0, 220 cal, 2g protein.
- `Egg Fried Rice` — 🍳, Local Hawker, $4.0, 480 cal, 12g protein.
- `Claypot & Herbal Soup` — 🍲, Local Hawker, $6.5, 380 cal, 28g protein.

## Diet tags (compatibleWith), set at creation time

Tagged: Yong Tau Foo (×3), Fried Chicken, Chwee Kueh (+vegetarian), Bread
(+vegetarian), Roti Prata (+halal+vegetarian), Rojak, Bakso (+halal), Egg Fried
Rice (+vegetarian), Claypot & Herbal Soup, Chendol (+vegetarian), Acai Soft
Serve (+vegetarian), Ice Cream (+vegetarian), Fruit Tea (+vegetarian+vegan),
Goreng Pisang (+vegetarian+vegan) → no_pork.

Left untagged (standing conservative rules): Pepper Rice, Curry Rice, Teochew
Porridge, ABC Soup, Mixed Vegetable Rice (×4), Fried Kway Teow (×2), Hor Fun,
Chee Cheong Fun, Pizza. Bak Kut Teh, Lotus Root Pork Ribs Soup, and Pig Organ
Soup all carry no compatibleWith at all — same categorical exclusion applied to
every explicitly pork/offal-named dish this session.

## Verification

- Item count: 2,519 → 2,552 (+33).
- 0 duplicate ids, 0 orphaned items, all 16 skipped brands (3 excluded +
  13 unidentified) confirmed still zero-menu.
- Zero-menu-brand count: 109 → 76 (−33), total brand count unchanged at 1,749.
- Spot checks: Bak Kut Teh → no compatibleWith (correct).
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +33 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +10 dish types ("Batch BL additions" block).

## Status

The remaining 76 zero-menu brands break down as: corporate entities (~49,
permanently out of scope), the 13 unidentified GENERIC person-name/entity
brands from this batch (3 of which are likely duplicates, not true gaps), 5
excluded food-hall/non-stall brands (Fork & Spoon, 1983 - A Taste of Nanyang,
Cookhouse, Rasapura Masters, Gourmet Paradise, Cheers), and a handful of others
(CuLiang YuFen, China Food) with no findable real dish data. Nothing left in
this pool is resolvable through web search or a bulk lookup — genuine further
progress would require either a site visit / Street View pass on the 13
unidentified brands, or accepting the corporate/duplicate/no-data brands as
permanently out of scope for menu coverage.
