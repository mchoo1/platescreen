# 2026-08-25 — Zero-menu-item cleanup, Batch AU: Adam Road Food Centre (task #65)

Forty-seventh batch of the zero-menu-item cleanup. This closes out the re-run audit's 8-brand
tier entirely (Batches AR-AU). Clean, efficient single-venue batch — kept as one venue since
it already sat at the 8-item target size.

## Selection

8 unique zero-menu brands at Adam Road Food Centre (a well-known Singapore hawker centre),
`operatorId: undefined`, `type: "hawker"`, all real distinct proper-noun stall names with
dish-descriptive cuisine tags already in place.

## Sourcing

All 8 brands' dishes were derivable directly from their existing specific `cuisine` field
(Nasi Lemak, Fried Hokkien Mee, Fishball Noodles, Big Prawn Noodles, Dessert, Mee Rebus, Mee
Soto & Mee Rebus, Chicken Rice) — no external research needed.

## Menu items

All 8 brands covered, 8 items. **0 new dish types** — every dish (Nasi Lemak, Fried Hokkien
Mee, Fishball Noodles, Prawn Noodles, Cheng Tng, Mee Rebus, Mee Soto, Steamed Chicken Rice)
already existed in `dish-macro-lookup.py`.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,998 total menu items (1,990 + 8), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 8 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 636 → 628.
- Live vs build-mirror `menuItems.ts` byte-identical diff (`dish-macro-lookup.py` unchanged
  this batch, already in sync from Batch AT).

## What's next

Re-run audit's 8-brand tier is now fully cleared. Next: the 7-brand tier (Teban Gardens Market
and Food Centre, Clementi West Street 2 Blk 726, Pasir Ris 527C, Haig Road Market & Food
Centre, Ghim Moh Market & Food Centre — 5 venues, 35 brands total), then the 6-brand tier (65
venues — the bulk of the remaining work), then 5-brand (17), 4-brand (17), 3-brand (6),
2-brand (18), 1-brand (30). Per user direction, starting with the next batch, multiple smaller
venues will be combined into single ~8-10 item batches to keep the remaining work to roughly
70-75 batches instead of ~150+ single-venue ones.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
