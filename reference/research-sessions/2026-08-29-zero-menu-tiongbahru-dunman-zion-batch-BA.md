# Batch BA: Tiong Bahru Market + Dunman Food Centre + Zion Riverside Food Centre — 2026-08-29

Task #65, continuing the multi-venue batching approach at the 6-brand tier (re-audit
after Batch AZ: 559 zero-menu brands, 48 venues in the 6-brand tier).

## Venues and results — 18 of 18 brands covered, no skips

Unlike the previous two batches, every brand at all 3 venues already carried a real,
dish-descriptive cuisine tag — no generic "Local & Hawker" placeholders and no
corporate-entity duplicates in this selection, so no web research was needed this
batch; every dish came straight from the brand's own cuisine field.

### Tiong Bahru Market

- Jian Bo Shui Kueh (cuisine: Chwee Kueh) → Chwee Kueh
- Tiong Bahru Fried Kway Teow (cuisine: Fried Kway Teow) → Fried Kway Teow
- Joo Chiat Beef King (cuisine: Beef Noodles) → Beef Noodles
- Lor Mee 178 (cuisine: Lor Mee) → Lor Mee
- Hong Heng Fried Sotong Prawn Mee (cuisine: Fried Prawn Mee) → Prawn Mee
- Tiong Bahru Hainanese Boneless Chicken Rice (cuisine: Hainanese Chicken Rice) →
  Boneless Chicken Rice (used over the generic Hainanese Chicken Rice entry since the
  brand's own name specifies "Boneless")

### Dunman Food Centre

- No Name Hokkien Mee (cuisine: Fried Hokkien Prawn Mee) → Fried Hokkien Prawn Mee
- Say Seng Tau Kwa Pau (cuisine: Tau Kwa Pau) → Tau Kwa Pau (new dish type — a
  beancurd-pocket snack, typically stuffed with vegetables/beansprouts in a sweet
  sauce, not meat-based)
- Dunman Road Char Siew Wan Ton Mee (cuisine: Wanton Mee) → Wanton Mee
- Dunman Duck Rice (cuisine: Braised Duck Rice) → Duck Rice
- Lau Hong Ser Rojak (cuisine: Rojak) → Rojak
- Restaurant Joo Chiat Ah Huat Wanton Mee (cuisine: Wanton Mee) → Wanton Mee

### Zion Riverside Food Centre

- Zhi Wei Xian Zion Road Big Prawn Noodle (cuisine: Big Prawn Noodle) → Prawn Noodles
- No. 18 Zion Road Fried Kway Teow (cuisine: Fried Kway Teow) → Fried Kway Teow
- Peter Goh's Carrot Cake (cuisine: Fried Carrot Cake) → Fried Carrot Cake
- Braised Duck Kway Chap (cuisine: Kway Chap & Braised Duck) → Duck Set Kway Chap
  (an existing dish type combining both halves of the brand's cuisine tag)
- Kang's Wanton Noodle (cuisine: Wanton Noodle) → Wanton Noodle
- Soon Lee's Pig Organ Soup (cuisine: Pig Organ Soup) → Pig Organ Soup

## New dish type

- `Tau Kwa Pau` — 🥟, Local Hawker, $2.0, 220 cal, 8g protein, 25g carbs, 9g fat.

## Diet tags (compatibleWith), set at creation time

Chwee Kueh → no_pork + vegetarian; Beef Noodles → no_pork; Boneless Chicken Rice →
no_pork; Tau Kwa Pau → no_pork + vegetarian (typical filling is vegetable-based, not
meat); Duck Rice → no_pork; Rojak → no_pork. Left untagged (established
conservative rules): Fried Kway Teow (×2), Lor Mee, Prawn Mee, Prawn Noodles, Fried
Hokkien Prawn Mee, Char Siew Wanton Mee (×2, one literally named "Char Siew" —
obviously excluded), Fried Carrot Cake, Duck Set Kway Chap (Kway Chap family is
traditionally pork-offal-based even with duck added), Wanton Noodle, and — notably —
Pig Organ Soup, which isn't merely "left untagged out of caution" but is literally
pork offal and could never qualify for `no_pork` under any reading of the rule.

## Verification

- Item count: 2,069 → 2,087 (+18).
- 0 duplicate ids, 0 orphaned items, all 18 target brands covered (first batch this
  session with zero skips).
- Zero-menu-brand count: 559 → 541 (−18), total brand count unchanged at 1,749.
- Spot checks: Pig Organ Soup → no compatibleWith (correctly not tagged no_pork),
  Tau Kwa Pau → `["no_pork", "vegetarian"]`.
- `npx tsc --noEmit` — silent. `npm run build` — succeeds, 4/4 static pages.
- Live repo and `~/build/platescreen` mirror byte-identical for both changed files.

## Files touched

- `src/lib/menuItems.ts` — +18 items, header comment updated with this batch's entry.
- `reference/data/dish-macro-lookup.py` — +1 dish type ("Batch BA additions" block).
