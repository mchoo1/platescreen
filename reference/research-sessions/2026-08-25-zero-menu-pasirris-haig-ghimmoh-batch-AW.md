# 2026-08-25 — Zero-menu-item cleanup, Batch AW: Pasir Ris 527C + Haig Road + Ghim Moh (task #65)

Forty-ninth batch of the zero-menu-item cleanup. Second multi-venue batch — combined all 3
remaining 7-brand-tier venues into one batch to close the tier out in a single pass.

## Selection

Three venues from the re-run audit's 7-brand tier, all with no ambiguous/generic entities to
skip this time:

- **Pasir Ris 527C**: 7 zero-menu brands, all `operatorId: "kopitiam"`.
- **Haig Road Market & Food Centre**: 7 zero-menu brands, `operatorId: undefined`, `type:
  "hawker"`.
- **Ghim Moh Market & Food Centre**: 7 zero-menu brands, same profile.

## Sourcing

Pasir Ris 527C's 7 brands all matched directly in `reference/data/kopitiam-stall-dishes.json`.
Haig Road's and Ghim Moh's 14 brands all had real, specific dish-descriptive cuisine tags — no
external research needed, except one verification: **HJ Waliti HJ Mazuki** (Haig Road) carries
a generic "Malay Cuisine" tag; a web search confirmed it's a 50-year-old Muslim-owned stall
known for Mee Rebus, Mee Siam, and Soto Ayam — assigned Mee Siam to differentiate it from the
neighbouring Afandi Hawa & Family stall (already assigned Mee Rebus).

## Menu items

All 21 brands covered, 21 items. 6 new dish types added to `dish-macro-lookup.py` (Seafood
Fried Rice, Putu Piring, Fish Porridge, Mee Siam, Roasted Meats, Fried Hor Fun); the remaining
15 items reused existing dish types (Economical Rice, Pao Fan, Mala Xiang Guo, Nasi Lemak,
Beef Bulgogi, Laksa, Mee Rebus, Oyster Omelette, Satay, Wanton Mee, Fried Kway Teow, Duck Rice,
Chwee Kueh, Hainanese Chicken Rice, Bread).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 2,030 total menu items (2,009 + 21), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 21 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 617 → 596.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

This closes out the re-run audit's 7-brand tier entirely (Batches AV, AW). Next: the 6-brand
tier — 65 venues, the bulk of the remaining work — to be combined roughly 1-2 venues at a time
into ~10-14 item batches. Then 5-brand (17 venues), 4-brand (17), 3-brand (6), 2-brand (18),
1-brand (30).

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
