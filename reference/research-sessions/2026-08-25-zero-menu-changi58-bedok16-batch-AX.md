# 2026-08-25 — Zero-menu-item cleanup, Batch AX: New Upper Changi Rd Blk 58 + Bedok South Rd Blk 16 (task #65)

Fiftieth batch of the zero-menu-item cleanup. First batch of the 6-brand tier (65 venues) —
combined two venues into one ~9-item batch.

## Selection

- **New Upper Changi Road Blk 58**: 6 zero-menu brands, `operatorId: undefined`, `type:
  "hawker"`.
- **Bedok South Road Blk 16**: 6 zero-menu brands, same profile.

## Data pattern found — 3 brands skipped, no fabrication

Three brands carry the generic `cuisine: "Local & Hawker"` tag with no discoverable specific
dish: **Lee Len Tong** (New Upper Changi Rd Blk 58), **Goh Poo Huat**, and **Kwek Ah Heoh**
(both Bedok South Rd Blk 16). Web searches for each turned up nothing specific — no menu,
no dish, no identifiable concept — so all three were **skipped** rather than given a
fabricated dish, per the established never-fabricate principle.

## Sourcing

The remaining 9 brands (5 at New Upper Changi Rd Blk 58, 4 at Bedok South Rd Blk 16) all had
real, specific dish-descriptive cuisine tags, except one: **Warong Jawa** carries a generic
"Malay Cuisine" tag, but a web search confirmed it's a well-known, long-running Nasi Lemak
stall at Bedok South Market & Food Centre — given Nasi Lemak.

## Menu items

9 of 12 brands covered (3 skipped as above), 9 items. **0 new dish types** — every dish
(Wanton Mee, Bak Chor Mee, Laksa, Carrot Cake, Fish Soup, Char Kway Teow, Prawn Noodles, Duck
Rice, Nasi Lemak) already existed in `dish-macro-lookup.py`.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 2,039 total menu items (2,030 + 9), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 9 target brands still zero-menu, all 3 intentionally-skipped
  brands confirmed still zero-menu (as expected), 1,749 total brands (unchanged).
- Zero-menu-item brand count: 596 → 587.
- Live vs build-mirror `menuItems.ts` byte-identical diff (`dish-macro-lookup.py` unchanged
  this batch — 0 new dishes needed).

## What's next

63 more venues remain in the 6-brand tier, to be combined roughly 2 venues at a time (~10-12
items per batch). Then 5-brand (17 venues), 4-brand (17), 3-brand (6), 2-brand (18), 1-brand
(30).

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here, and none will be accepted directly — the user must push from their own machine).
