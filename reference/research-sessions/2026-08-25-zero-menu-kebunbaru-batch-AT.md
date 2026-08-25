# 2026-08-25 — Zero-menu-item cleanup, Batch AT: Kebun Baru Food Centre (task #65)

Forty-sixth batch of the zero-menu-item cleanup, third and final batch of the re-run audit's
8-brand tier. This is also the last single-venue batch — going forward, per user direction,
batches will combine multiple smaller venues to keep item counts per batch reasonable as the
remaining tiers shrink (65 venues at 6 brands, 17 at 5, 17 at 4, 6 at 3, 18 at 2, 30 at 1).

## Selection

8 unique zero-menu brands at Kebun Baru Food Centre, `operatorId: undefined`, `type: "hawker"`,
all real distinct proper-noun stall names with dish-descriptive cuisine tags already in place.

## Sourcing

All 8 brands' dishes were derivable directly from their existing specific `cuisine` field
(Fishball & Meatball Noodle, Claypot Rice, Wanton Noodle, Mian Fen Guo, Chicken Rice, Fishball
Noodle, Sheng Mian, Beef Noodle) — no external research needed, matching the Berseh Food Centre
pattern (Batch AQ).

## Menu items

All 8 brands covered, 8 items. 3 new dish types added to `dish-macro-lookup.py` (Mian Fen Guo,
Boneless Chicken Rice, Sheng Mian); the remaining 5 items reused existing dish types (Fishball
Noodles — reused twice, for both fishball-noodle stalls — Claypot Rice, Wanton Noodle, Beef
Noodle).

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 4/4 static pages.
- Verify script: 1,990 total menu items (1,982 + 8), 0 duplicate ids, 0 orphaned
  items/premises, 0 of the 8 target brands still zero-menu, 1,749 total brands
  (unchanged — no removals this batch).
- Zero-menu-item brand count: 644 → 636.
- Live vs build-mirror `menuItems.ts` and `dish-macro-lookup.py` — byte-identical diffs.

## What's next

Adam Road Food Centre (also originally in the 8-brand tier) still needs to be confirmed at the
start of the next batch, since brand counts shift as batches complete (a brand can have
premises at multiple venues, so clearing it elsewhere can silently resolve it here too). Next
tiers after that: 7-brand (5 venues), 6-brand (65 venues — the bulk of the remaining work),
5-brand (17), 4-brand (17), 3-brand (6), 2-brand (18), 1-brand (30). Starting with the next
batch, per user direction, multiple small venues will be combined into single ~8-10 item
batches rather than one venue per batch, to avoid needing ~150+ more individual checkpoints.

**Note:** as of the last check, the repo's local commits (including all zero-menu-item cleanup
work) remained unpushed to `origin/main` in this sandbox (no GitHub credentials available
here). The user was given the exact `git pull`/`git push` command to run from their own
machine; push confirmation is still pending.
