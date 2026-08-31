# 2026-08-31 (2nd pass) — kopitiam_king_grouper research

**Track:** restaurants/food_court/hawker/coffeeshop/canteen (`platescreen-research-restaurants`)
**Queue entry:** `kopitiam` (id unchanged — this run's actual unit of work is one of the 839-brand Kopitiam-operator MenuItems backlog, per that entry's own notes)
**Outlet targeted:** `kopitiam_king_grouper` (Hougang One, #01-19) — the specific zero-menu brand called out by the prior (2026-08-31, 1st pass) update as needing individual web research before it could be added.

## What was targeted

Per the 2026-08-31 (1st pass) note on the `kopitiam` queue entry, 4 kopitiam-operator brands remained at zero MenuItems: `kopitiam_cheers` (known non-food concession, permanently out of scope), `kopitiam_culiang_yufen` (garbage scrape signal), `kopitiam_china_food` (bare category label), and `kopitiam_king_grouper` (Hougang One — 3 scraped dish names, but 2 credible non-duplicate items, below the 3-item minimum; flagged for individual web research since it might have more items than the scrape captured).

This run picked `kopitiam_king_grouper` and did that individual web research.

## Method and finding

Searched for "King Grouper" Hougang One and found it is a real, documented Singapore chain — **King Grouper Fish Soup** (official site: kinggrouperfishsoup.com, own Wix-built menu and locations pages, 27 outlets islandwide, also covered on foodpanda and Facebook).

Fetched the official **Location** page (kinggrouperfishsoup.com/services-7): it lists exactly **one** outlet at "1 Hougang Street 91 #01-19 Singapore 538692" — the identical address already on `kopitiam_king_grouper`'s sole Premises row (`kopitiam_king_grouper_p1`).

Cross-checked this project's existing `kopitiam_king_grouper_fish_soup` Brand (already populated, 2 MenuItems, confidence `estimated`): it has 5 Premises rows — VivoCity, Tan Tock Seng Hospital, Parkway Parade, West Mall, Kopitiam @ Northpoint City. **None of them is Hougang One.**

Fetched the official **Menu** page (kinggrouperfishsoup.com/menus), explicitly "served at all locations":

| Dish | Price |
|---|---|
| Sliced Grouper Fish Soup | $6.50 |
| Sliced Batang Fish Soup | $6.50 |
| Sliced Red Grouper Fish Soup | $9 |
| Fried Sliced Fish Soup | $7 |
| Fish Porridge | $7 |
| Seafood Soup | $7 |
| Teochew Style Sliced Grouper Fish | $13 |
| Teochew Style Sliced Red Grouper Fish | $15 |

## Conclusion: brand-chain fragmentation, not a distinct stall

`kopitiam_king_grouper` and `kopitiam_king_grouper_fish_soup` are the same real-world chain (King Grouper Fish Soup) modeled as two separate Brand ids — most likely because Kopitiam's own stall-sitemap scrape (the source of both brands' Premises, `source: "operator_official_site"`) labelled the Hougang One page with the shorter "King Grouper" name while other branch pages used the full "King Grouper Fish Soup" name. There is no SFA data on either Premises row to apply CLAUDE.md section 4.2's usual duplicate test (different licence/stall numbers = real second stall); the chain's own official site independently confirms only one outlet exists at this address.

**Did not add MenuItems to `kopitiam_king_grouper`.** Doing so would have given the same real chain a second, divergent menu under a second name at a location the chain itself only lists once — compounding the fragmentation rather than fixing it. This task's authorized scope (Phase 4: append MenuItems to an existing Brand) doesn't cover merging or deleting Brand/Premises rows, so no restructuring was attempted either.

**Recommendation for a future dedicated pass** (same shape as the 2026-08-24 duplicate-removal batches): reassign `kopitiam_king_grouper_p1` to `brandId: "kopitiam_king_grouper_fish_soup"` as its 6th Premises row (e.g. renumber to `kopitiam_king_grouper_fish_soup_p6`) and delete the `kopitiam_king_grouper` Brand row — the same pattern already used for the McDonald's/Anchorvale Village Hawker Centre reassignment recorded in `premises.ts`.

Per this task's one-outlet-per-run rule, did not pick a fallback brand in the same run after this finding.

## Files touched

- `src/lib/researchQueue.ts` — appended an "UPDATE 2026-08-31 (2nd pass)" note to the `kopitiam` entry documenting this finding and recommendation. `status` left `"pending"` (unchanged) — no MenuItems were written, so the backlog-completion condition for flipping status doesn't apply, and the entry represents ongoing backlog work regardless.
- No changes to `brands.ts`, `premises.ts`, or `menuItems.ts`.

## Verification

- Synced a build mirror (`src/` only, excluding `reference/`, `node_modules`, `.next`, `out`, `.git`) to a sandbox working directory, `npm install`, `npx tsc --noEmit` — **silent (0 errors)**.
- `diff` of the live `researchQueue.ts` against the mirror's copy — **byte-identical**.
- Confirmed via a throwaway Node script that `researchQueue.ts`'s literal still parses correctly after the edit (131 entries, `kopitiam` entry status `"pending"`).

## Status / next steps

- `kopitiam_cheers`, `kopitiam_culiang_yufen`, `kopitiam_china_food` still need individual web research (unchanged from the prior pass).
- `kopitiam_king_grouper` needs the Brand-merge action above, not further macro research, once a future pass is authorized to restructure Brand/Premises rows.
- 4 kopitiam-operator brands remain unresolved; none resolved by this run, by design (a fabricated or duplicated menu would have been worse than leaving it pending).
