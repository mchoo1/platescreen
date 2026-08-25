# 2026-08-25 — Zero-menu-item cleanup, Batch AV: Teban Gardens + Clementi West St 2 Blk 726 (task #65)

Forty-eighth batch of the zero-menu-item cleanup. First multi-venue batch — per user
direction, going forward smaller venues are combined into single ~8-10 item batches instead of
one venue per batch, to keep the remaining tail (628 zero-menu brands, ~155 venues) to a
manageable number of checkpoints.

## Selection

Two venues from the re-run audit's 7-brand tier:

- **Teban Gardens Market and Food Centre**: 7 zero-menu brands, `operatorId: undefined`,
  `type: "hawker"`.
- **Clementi West Street 2 Blk 726**: 7 zero-menu brands, same profile.

## Data pattern found — 3 brands skipped, no fabrication

- **Cold Storage Singapore (1983) Pte Ltd** appears at both venues with the generic `cuisine:
  "Local & Hawker"` tag. As established in earlier batches (Z, AD, AK), Cold Storage is a
  supermarket chain, not a food-dish vendor — **skipped both times**.
- **New Century Food House @ 721 Pte. Ltd.** (Clementi West St 2 Blk 726) also carries the
  generic tag. Web search confirmed it as a real, ACRA-registered "food courts, coffee shops,
  and eating houses" operator — i.e. the multi-stall coffeeshop entity itself, not a specific
  dish vendor. It houses many different stalls with different foods, so no single dish could be
  assigned without fabricating one — **skipped**.

## Sourcing

The remaining 11 brands (6 at Teban Gardens, 5 at Clementi West St 2 Blk 726) all had real,
specific dish-descriptive cuisine tags — no external research needed beyond the Barakath
International check below.

**Barakath International Pte Ltd** (Teban Gardens) also carries the generic `cuisine: "Local &
Hawker"` tag, but a web search found it corresponds to Al Barakath Restaurant, a real halal
Indian-Muslim eatery on Teban Gardens Road — given a real dish (Nasi Briyani) despite the
generic tag, following the established pattern of giving real dishes to confirmed real,
specific chains.

## Menu items

11 of 14 brands covered (3 skipped as above), 11 items. **0 new dish types** — every dish
(Nasi Briyani, Ayam Penyet, Roasted Chicken Rice, Popiah, Fish Soup, Kway Chap, Oyster
Omelette, Duck Rice, Carrot Cake, Porridge) already existed in `dish-macro-lookup.py`.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 2,009 total menu items (1,998 + 11), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 11 target brands still zero-menu, all 3 intentionally-skipped
  brands confirmed still zero-menu (as expected), 1,749 total brands (unchanged).
- Zero-menu-item brand count: 628 → 617.
- Live vs build-mirror `menuItems.ts` byte-identical diff (`dish-macro-lookup.py` unchanged
  this batch — 0 new dishes needed).

## What's next

Remaining 7-brand tier: Pasir Ris 527C, Haig Road Market & Food Centre, Ghim Moh Market & Food
Centre (3 venues) — will be combined into the next multi-venue batch. Then the 6-brand tier
(65 venues, the bulk of the remaining work), 5-brand (17), 4-brand (17), 3-brand (6), 2-brand
(18), 1-brand (30) — all to be combined 2-3 venues at a time to keep batches around 8-10 items.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
