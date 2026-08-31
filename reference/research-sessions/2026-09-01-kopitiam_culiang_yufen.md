# 2026-09-01 — kopitiam_culiang_yufen (Culiang Yufen By Popular Food, Paya Lebar Quarter)

**Queue entry worked:** `kopitiam` (priority: high) — per that entry's own notes (see
`src/lib/researchQueue.ts`), this queue row's real unit of work is the ~839-brand
Kopitiam-stall MenuItems backlog, not the "Kopitiam" row itself (which correctly has
no Brand of its own). As of the 2026-08-31 (3rd pass) session, 4 of those 839 brands
remained at zero MenuItems: `kopitiam_cheers`, `kopitiam_culiang_yufen`,
`kopitiam_china_food`, `kopitiam_king_grouper`. This run picked up
`kopitiam_culiang_yufen`, the first of the 3 still genuinely open to research
(`kopitiam_cheers` is permanently out of scope — non-food convenience store;
`kopitiam_king_grouper` needs a Brand-merge restructure, not menu research, per the
2026-08-31 2nd-pass note — out of this task's write scope).

## Selection (Phase 1)

Filtered `RESEARCH_QUEUE` for `status: "pending"` and `type` in
restaurant/food_court/hawker/coffeeshop/canteen → 83 matching entries. Sorted by
priority (high → medium → low, original order preserved within a tier) → first entry
is `kopitiam` (high priority). The Brand row for the actual target
(`kopitiam_culiang_yufen`) already existed (added in the 2026-08-22 Kopitiam
stall-sitemap scrape, `notes` on the parent queue entry confirms this), so per Phase 1
step 5 this run's scope was menu-item research only — no new Brand/Premises.

## Research (Phase 2)

Prior sessions (see the `kopitiam` queue entry's UPDATE 2026-08-31 3rd-pass note) had
flagged this brand's only scrape signal as a known self-referential-garbage artifact
(`{"CuLiang YuFen": ["CuLiang YuFen"]}`) and left it for "individual web research."

A fresh web search for `"CuLiang YuFen" Kopitiam Singapore stall` surfaced the chain's
real, full trading name: **"Culiang Yufen By Popular Food"** — a fish/beef rice-noodle
soup concept with foodpanda delivery listings for 4 branches (Kopitiam Square/Sengkang,
Hillion Mall, VivoCity, Cineleisure Orchard), each showing the identical numbered
52-item menu (5 soup flavours × protein choices, plus a rice-set section and one side
dish). This is a real, well-documented, non-fabricated menu — a much stronger source
than the original scrape.

This project's own `kopitiam_culiang_yufen` Premises row is at Paya Lebar Quarter, a
5th branch not itself listed on foodpanda, but the matching item numbering across all 4
checked branch listings confirms the menu and pricing are consistent chain-wide, so the
foodpanda menu is a credible source for this branch too.

Fetched the full menu from
[foodpanda: Culiang Yufen By Popular Food (Kopitiam Square)](https://www.foodpanda.sg/restaurant/u8qd/culiang-yufen-by-popular-food-kopitiam-square).

### Items added (8, all confidence `estimated`)

Picked to span distinct named proteins/formats — the menu's real variation is 5 soup
*flavours* (Signature/Golden/Tomato/Sour&Spicy/Mala) crossed with the same ~8 protein
choices, so flavour-only variants of the same protein were treated as near-duplicates
per this project's >10%-macro-difference rule and skipped; only items differing by
protein or dish format (noodle vs. rice bowl vs. side) were kept.

| id | name | price (SGD) | cal | protein | carbs | fat | diet tags | popular? |
|---|---|---|---|---|---|---|---|---|
| cyf_golden_soup_sliced_fish_noodle | Golden Soup Sliced Fish Rice Noodle | 9.60 | 420 | 27 | 46 | 11 | no_pork, pescatarian | ✓ (foodpanda "Popular") |
| cyf_golden_soup_fat_beef_noodle | Golden Soup Fat Beef Rice Noodle | 10.70 | 480 | 28 | 46 | 19 | no_pork | ✓ |
| cyf_signature_luncheon_meat_noodle | Signature Luncheon Meat Rice Noodle | 8.60 | 470 | 16 | 50 | 21 | (none — ambiguous meat) | |
| cyf_mala_meatball_noodle | Mala Meat Ball Rice Noodle | 8.60 | 490 | 20 | 52 | 22 | (none — meatball skip-list) | |
| cyf_sour_spicy_fat_intestine_noodle | Sour & Spicy Fat Intestine Rice Noodle | 10.70 | 520 | 18 | 45 | 28 | *(no array — pork-organ implied)* | |
| cyf_tomato_prawn_paste_noodle | Tomato Prawn Paste Rice Noodle | 10.70 | 440 | 22 | 48 | 15 | no_pork, pescatarian | |
| cyf_sauerkraut_sliced_fish_rice | Sauerkraut Sliced Fish Soup With Rice | 11.60 | 460 | 30 | 50 | 10 | no_pork, pescatarian | ✓ |
| cyf_glutinous_rice_cake | Glutinous Rice Cake | 5.50 | 230 | 4 | 36 | 8 | (none — filling unconfirmed) | |

**Prices:** taken directly from the foodpanda listing (using the regular/higher price
where a discounted delivery price was also shown).

**Macros:** no official nutrition source exists for this stall or chain, so all 8 are
`estimated` — reasoned/calibrated against this project's own existing entries for
comparable dishes already in `menuItems.ts` / `reference/data/dish-macro-lookup.py`:
`Sliced Fish Soup` / `Fish Soup` (320/28/25/10), `Double Fish Soup` (400/32/25/16),
`Meatball Noodles` (460/22/55/16), `Fishball Noodles` (400/20/55/10) — adjusted up for
the added rice-noodle carb load versus a soup-only dish, and up in fat for the fattier
proteins (fat beef, luncheon meat, fat intestine).

**Diet tags** followed CLAUDE.md §5.1: named-protein items (fish, prawn) got
`no_pork` + `pescatarian`; luncheon meat and meatball were left untagged (ambiguous
protein / meatball is on the explicit no-tag skip-list); fat intestine (implied pork
organ meat) got no `compatibleWith` array at all, matching the categorical-exclusion
pattern used for other pork-implied dishes; the rice cake's filling composition
couldn't be confirmed, so it was also left untagged rather than guessed.
`isPopular` was set only on the 3 items foodpanda's own listing marks "Popular" — a
real signal, not an assumption.

## SFA lookup (Phase 3)

Skipped — the Brand already existed with a Premises row from the 2026-08-22 scrape
(per Phase 1 step 5 / Phase 3's own skip condition).

## Write (Phase 4)

- `src/lib/menuItems.ts` — appended 8 `MenuItem` objects (batch comment header +
  entries) before the closing `];`, `brandId: "kopitiam_culiang_yufen"` on all 8.
- `reference/data/dish-macro-lookup.py` — appended a matching `DISH_DB.update({...})`
  batch block for the 8 new dish names.
- `src/lib/researchQueue.ts` — appended an `UPDATE 2026-09-01` paragraph to the
  `kopitiam` entry's `notes` field documenting this run's findings. **Status left
  `"pending"`** — the entry's real unit of work (the Kopitiam-stall MenuItems backlog)
  isn't finished: `kopitiam_china_food` and `kopitiam_king_grouper` are still
  unresolved (for different reasons, see below), matching the precedent set by every
  prior pass on this entry.

No new Brand or Premises rows were added (brand already existed, per Phase 1 step 5).

## Verify (Phase 5)

Synced `src/` and `reference/` to the `~/build/platescreen` mirror (this repo has no
`node_modules`), then in the mirror:

- `npm install` — succeeded (394 packages, only pre-existing deprecation warnings).
- `npx tsc --noEmit` — **silent / clean**.
- `npm run build` — **succeeded**, all 4,321 static pages generated
  (`/brand/[id]` × 1,747 brands + `/brand/[id]/[itemId]` × 2,568 items + the app shell
  routes).
- Verify script: total menu items 2,552 (2026-08-30 baseline) → 2,568 now (matches the
  expected delta: +8 from the 2026-08-31 3rd-pass `tbsk_*` batch already in the
  baseline gap, +8 from this run). 0 duplicate MenuItem ids. 0 orphaned MenuItems
  (every `brandId` resolves to a real Brand). `kopitiam_culiang_yufen` now has exactly
  8 MenuItems.
- `diff` of the 3 touched files (mirror vs. live) — byte-identical.
- Deleted all temporary verify/audit scripts from `/tmp` after use.

## Status / next steps

3 of the original 839 Kopitiam-operator brands remain at zero MenuItems:

- **`kopitiam_cheers`** — permanently out of scope (non-food convenience-store
  concession, CLAUDE.md §4.3). Never gets a MenuItem.
- **`kopitiam_china_food`** — still just the bare "Cold dishes" scrape category label.
  Two prior individual-web-research attempts (2026-08-23, 2026-08-31 3rd pass) found
  nothing naming this specific stall. This run did not re-attempt the same text search
  a third time with no new angle; a future pass should try Street View / an in-person
  visit, matching the escalation already used for other unresolved SFA-licensee-name
  brands (task #29), rather than repeating the same web search.
- **`kopitiam_king_grouper`** — needs the Brand-merge action recommended in the
  2026-08-31 2nd-pass note (reassign its sole Premises row to
  `kopitiam_king_grouper_fish_soup` as a 6th branch, delete the `kopitiam_king_grouper`
  Brand row) — a Brand-restructure action, out of this task's write scope (this task
  only appends MenuItems to existing Brands).

Did not pick a fallback brand in the same run, per this task's one-outlet-per-run rule.

## Files touched

- `src/lib/menuItems.ts`
- `reference/data/dish-macro-lookup.py`
- `src/lib/researchQueue.ts`
- `reference/research-sessions/2026-09-01-kopitiam_culiang_yufen.md` (this file)
