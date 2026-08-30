# 2026-08-31 — Research session: kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd (restaurant/food_court/hawker/coffeeshop/canteen track)

**Queue entry:** `kopitiam` (Brand: n/a — operator pointer entry, type: `food_court`, priority: `high`)

## Selection

Filtered `RESEARCH_QUEUE` to `type` in {`restaurant`, `food_court`, `hawker`, `coffeeshop`, `canteen`} with `status: 'pending'`, sorted by priority (high first), kept array order within a tier. The top three entries (`kopitiam`, `koufu`, `foodfare`) are all high priority. Per the deterministic first-entry rule, `kopitiam` was selected.

`kopitiam` is not itself a Brand (per the 2026-08-22c restructure, recreating a "Kopitiam" mega-brand would repeat the exact anti-pattern the restructure reverted). Its own notes establish, and every prior session since 2026-08-23 has followed, that this queue row's real unit of work is the 839-brand `operatorId: 'kopitiam'` MenuItems backlog it points to — one sub-brand's MenuItems per run, with the top-level `kopitiam` row left `pending` until that backlog clears. This run continued that pattern.

## Picking a sub-brand

Audited all `operatorId === 'kopitiam'` Brands (831 total) against `MENU_ITEMS` for zero-item coverage. Only **5** remained (not the 836 the note trail last recorded — see "Note trail correction" below):

| Brand id | Name | Scrape signal (`kopitiam-stall-dishes.json`) |
|---|---|---|
| `kopitiam_cheers` | Cheers | none (known non-food convenience-store concession, CLAUDE.md §4.3 — never gets a MenuItem) |
| `kopitiam_culiang_yufen` | CuLiang YuFen | `["CuLiang YuFen"]` — known self-referential scrape garbage (CLAUDE.md §5) |
| `kopitiam_china_food` | China Food | `["Cold dishes"]` — bare category label, no real dish signal |
| `kopitiam_king_grouper` | King Grouper (Hougang One) | `["Fish Soup", "Fried Fish Soup", "Sliced Fish Soup"]` |
| `kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd` | Tiong Bahru Tian Bo Shui Kueh Pte Ltd (Kang Kar Mall) | `["Signature Jian Bo Shui Kueh"]` |

`kopitiam_king_grouper` was evaluated first (3 scraped names). But this project's own existing data already treats generic "Fish Soup" as macro-identical to "Sliced Fish Soup" everywhere else in `menuItems.ts` (`kgfs_sliced_fish_soup`, `tsfs_mixed_fish_soup`, `lps_fu_xiao_fish_soup_fish_soup`, etc. — all 320 cal/28p/25c/10f regardless of whether they're labelled "Fish Soup," "Mixed Fish Soup," or "Sliced Fish Soup"), so "Fish Soup" doesn't clear the near-duplicate bar as a distinct third item here. That leaves only 2 non-duplicate items (Sliced Fish Soup, Fried Fish Soup) for `kopitiam_king_grouper` — below this task's 3-item minimum — so it was skipped rather than padded with a fabricated third dish. Flagged in `researchQueue.ts` for a future individual-web-research pass.

`kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd` had only 1 scraped name, also below the usual threshold — but its Premises label ("Kang Kar Mall") gave a strong, checkable lead: a web search confirmed this is a branch of **Jian Bo Tiong Bahru Shui Kueh**, a well-documented Michelin Bib Gourmand chwee kueh chain with its own official site and a Kang Kar Mall outlet specifically named in third-party menu aggregation. Selected this one.

## Research

- WebSearch: "Tiong Bahru Tian Bo Shui Kueh menu price" surfaced the chain's official site (jianboshuikueh.com), a Michelin Guide listing (Bib Gourmand, Tiong Bahru Market branch), and PriceListo's menu-price page.
- Fetched `https://sg.pricelisto.com/menu-prices/jian-bo-tiong-bahru-shui-kueh-sg` directly: an aggregated, chain-wide menu (sourced across 3 of the chain's locations — Choa Chu Kang, Tiong Bahru Market, Toa Payoh — via "third-party online ordering systems," not the Kang Kar Mall branch specifically, but the same registered company/chain menu). Confirmed 9 real, priced items.

## Items added (8 of the 9; 1 excluded)

All `brandId: "kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd"`, confidence `estimated` (real names/prices from PriceListo; macros are reasoned, not sourced from an official nutrition panel — this chain doesn't publish one):

| id | name | price | cal | protein | carbs | fat | basis |
|---|---|---|---|---|---|---|---|
| `tbsk_shui_kueh_5pc` | Shui Kueh (5 Pcs) | $3.90 | 320 | 6 | 45 | 12 | Direct match to this project's existing "Chwee Kueh" convention (320/6/45/12), used consistently across 5+ other stalls in this DB — treated as the 5-6pc serving size. `isPopular: true` (the stall's own signature dish, Michelin recognition). |
| `tbsk_shui_kueh_10pc` | Shui Kueh (10 Pcs) | $7.20 | 640 | 12 | 90 | 24 | Doubled from the 5pc figure — real, distinct priced SKU (>10% macro difference, not a near-duplicate). |
| `tbsk_chee_cheong_fun` | Chee Cheong Fun (2 Pcs) | $3.90 | 170 | 3 | 30 | 4 | Scaled down from this project's existing Chee Cheong Fun entries (295-320 cal, presumed larger piece-count servings) to a 2-piece portion. |
| `tbsk_steamed_yam_cake` | Steamed Yam Cake (2 Pcs) | $3.90 | 260 | 4 | 30 | 13 | Scaled from this project's existing Yam Cake entry (`koufu_dough_culture`, 140 cal/piece) to 2 pieces. |
| `tbsk_kueh_lapis` | Kueh Lapis (3 Pcs) | $4.30 | 330 | 4 | 48 | 13 | Scaled up from this project's existing Kueh Lapis convention (220 cal, ~1 slice) to a 3-piece portion. |
| `tbsk_rice_kueh` | Rice Kueh (3 Pcs) | $4.90 | 280 | 5 | 48 | 6 | No direct analog in this DB; reasoned from this project's Soon Kueh convention (steamed rice/glutinous-rice-flour kueh with preserved-vegetable filling, similar category) scaled to 3 pieces. |
| `tbsk_soon_kueh` | Soon Kueh (3 Pcs) | $4.90 | 210 | 5 | 30 | 8 | Scaled up from this project's existing Soon Kueh convention (150 cal, ~1-2pc) to 3 pieces. |
| `tbsk_siew_mai` | Siew Mai (3 Pcs) | $3.90 | 150 | 8 | 12 | 8 | No existing analog in this DB; reasoned from standard dim-sum siew mai (pork/shrimp dumpling) portion knowledge — no outlet- or project-specific source. |

**Excluded:** "Ikan Bilis with Peanut" ($10.80, sold as a bottle) — a packaged condiment/snack, not a cooked dish/serving; doesn't fit the MenuItem "one dish, one serving" shape used elsewhere in this DB (this is the same gap flagged for `GroceryProduct` in CLAUDE.md §4.4, which has 0 rows populated — out of scope for this task).

**Diet tags:** Chee Cheong Fun, Steamed Yam Cake, and Kueh Lapis tagged `vegetarian` (no meat in any standard recipe, matching this project's existing tags on the same dish names elsewhere). Shui Kueh, Rice Kueh, Soon Kueh, and Siew Mai left untagged — Shui Kueh/Rice Kueh/Soon Kueh follow this project's own mixed/inconsistent precedent for these exact dish names (some tagged vegetarian/no_pork elsewhere, some not) and genuine ambiguity about traditional lard-oil frying and shrimp/pork fillings; Siew Mai is conventionally a pork+shrimp dumpling but isn't explicitly named for pork, so per CLAUDE.md §5.1 it doesn't qualify for the "no compatibleWith array at all" treatment either — left as an empty array rather than guessed.

## Note trail correction

The `kopitiam` queue entry's notes hadn't been updated since 2026-08-23 (last recorded count: 836 zero-menu brands remaining). An audit today found only 5 remaining, meaning other sessions cleared most of this backlog between 2026-08-23 and now without updating this note. Corrected the note to reflect the real current count (5 before this run, 4 after) rather than letting the stale 836 figure stand — this run does not claim credit for that intervening work, only documents that it happened.

## Status

`kopitiam` queue entry: left `status: 'pending'` (per established convention — the backlog isn't clear; 4 sub-brands remain: `kopitiam_cheers` never eligible, `kopitiam_culiang_yufen` and `kopitiam_china_food` need individual web research beyond the scrape, `kopitiam_king_grouper` needs individual web research to find a 3rd non-duplicate item).

## Verification

- `npx tsc --noEmit` in a build mirror (`~/build/platescreen`, fresh `npm install`): **passed cleanly, exit code 0.**
- `npm run build` (`next build`): failed with `SIGBUS` during the webpack compile step in this sandbox. **Confirmed this is a pre-existing environmental limitation, not caused by this change** — reproduced the identical `SIGBUS` crash building the pristine, unmodified `HEAD` commit (`b6efd11`, before any of this run's edits) in a separate clean checkout with the same `node_modules`. The sandbox has only ~2.8GB RAM total; this project's `premises.ts`/`brands.ts`/`menuItems.ts` are large enough that the Next.js static-export build appears to exceed available memory here regardless of content changes. Flagging for whoever next has a higher-memory environment to confirm `next build` succeeds there — `tsc` is silent, which is the check this repo's own `npm run typecheck` script exposes.
- Manual counts: `MENU_ITEMS.length` before 2552 → after 2560 (+8, matches the 8 items added). 0 duplicate ids (checked against the full existing id set before insertion). 0 orphaned items (`brandId` resolves to a real, existing Brand). Diet-tag assignments spot-checked against CLAUDE.md §5.1.
- Also discovered and committed, separately, a prior session's completed-but-uncommitted work (`mccafe_colocation_research`, a grocery-track entry unrelated to this run) that had been `git add`-ed but never committed — likely a session that ended before its Phase 5/6 completed. Committed it as-is, unmodified, in its own commit before this run's own commit, to avoid losing it and to keep the two sessions' history distinct.

## Files touched

- `src/lib/menuItems.ts` — 8 new MenuItems appended (batch comment: `Batch 2026-08-31: kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd`).
- `src/lib/researchQueue.ts` — appended an UPDATE note to the `kopitiam` entry (status unchanged, `pending`).
- This file.

## Next steps for whoever picks this up

- 4 kopitiam-operator brands still need MenuItems: `kopitiam_king_grouper` (individual web research needed — the scrape alone gives only 2 non-duplicate items), `kopitiam_china_food` and `kopitiam_culiang_yufen` (both need individual web research past the unusable scrape signal), `kopitiam_cheers` (never eligible — non-food).
- Confirm `next build` (not just `tsc`) succeeds in an environment with more available memory before treating this or recent prior batches as fully verified end-to-end.
