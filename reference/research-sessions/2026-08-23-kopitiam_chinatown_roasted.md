# Research session — 2026-08-23 (restaurant/food-court track)

## Selection

Ran Phase 1 selection over `RESEARCH_QUEUE`: filtered to `status: 'pending'` entries with
`type` in {restaurant, food_court, hawker, coffeeshop, canteen}, sorted by priority
(high → medium → low, stable on array order). Top pick was `kopitiam` (priority `high`).

`kopitiam`'s own notes establish (from the 2026-08-22/2026-08-23 sessions) that it is
intentionally not a Brand of its own — it's a pointer to an 838-brand backlog
(`operatorId: 'kopitiam'` rows in `brands.ts` that have Premises but no MenuItems yet,
sourced from a 2026-08-22 sitemap scrape of Kopitiam's stall pages). Following that
established convention, this run picked one sub-brand from that backlog rather than
treating `kopitiam` itself as a new Brand.

Selection rule used: among the 838 `operatorId: 'kopitiam'` brands with zero MenuItems (in
`brands.ts` array order), picked the first one whose scraped dish list
(`reference/data/kopitiam-stall-dishes.json`) has at least 3 entries. The very first
candidate in array order, `kopitiam_putian_street_food`, only had 2 scraped dish names
("Putian Fried Bee Hoon", "Red Wine Chicken Mee Sua") — below the task's 3-item
credibility floor — so it was skipped without adding a half-formed entry, and the next
candidate meeting the floor was used instead:

**Outlet:** Chinatown Roasted (`kopitiam_chinatown_roasted`) — Chinese roast-meats stall,
Kopitiam @ Changi Airport Terminal 3 (existing Premises: 65 Airport Boulevard, #B2-03,
Singapore 819663).

The Brand + Premises rows already existed from the 2026-08-22 scrape/restructure, so per
Phase 1 step 5 this run did **Phase 2 + MenuItems only** — no new Brand/Premises, and
Phase 3 (SFA lookup) skipped entirely (only applies when creating a new hawker/
food-court-stall Brand).

## Phase 2 — Menu research

Scraped dish names for this stall (3 total, from the WordPress sitemap scrape): Char Siew
Rice, Roast Duck Rice, Roasted Chicken Rice. All 3 were used — no items were invented
beyond what was actually scraped from the stall's own page, per the never-fabricate rule.

Searched for an outlet-specific source (official Kopitiam/FairPrice page, HPB Nutrition
Information Centre, press) for this individual airport stall — found general coverage of
Kopitiam @ T3 as a food court but nothing stall-specific for Chinatown Roasted (see
Sources below).

With no outlet-specific source available, macros and prices were calibrated directly off
this project's own existing MenuItems for the identical dish names at other Chinese
roast-meat stalls already in `menuItems.ts` — internally consistent reasoned estimates,
not fabricated from scratch:

| Item | Price | Cal | Protein | Carbs | Fat | Confidence | Calibration analog |
|---|---|---|---|---|---|---|---|
| Char Siew Rice | $4.50 | 660 | 30g | 76g | 20g | estimated | `tian_tian_char_siew`, `cc_char_siew_rice` (identical values) |
| Roast Duck Rice | $6.00 | 688 | 36g | 72g | 24g | estimated | `cc_duck_rice` (macros), `oar_duck_rice` (price + macros) |
| Roasted Chicken Rice | $5.00 | 650 | 36g | 76g | 20g | estimated | `tian_tian_roasted` (identical values) |

All 3 written with `confidence: 'estimated'` — matching the confidence level of every
calibration analog used (none of those are 'verified' either, so this doesn't overstate
certainty relative to the rest of the DB).

## Phase 3 — SFA registration

Skipped. Brand + Premises already existed (from the 2026-08-22 stall scrape), so this
run only added MenuItems — no new hawker/food-court-stall Brand was created that would
require an SFA lookup.

## Phase 4 — Records written

- `src/lib/menuItems.ts` — appended 3 MenuItem objects (`chinatownroasted_char_siew_rice`,
  `chinatownroasted_roast_duck_rice`, `chinatownroasted_roasted_chicken_rice`), all with
  `brandId: "kopitiam_chinatown_roasted"`. No type annotation added; key set matches the
  surrounding convention (optional `compatibleWith`/`isPopular` omitted where not
  applicable, same as existing entries).
- `src/lib/researchQueue.ts` — appended a dated update to the `kopitiam` entry's `notes`
  field describing this run's progress. `status` left `'pending'` (per the established
  convention for this entry — it represents the 838-brand backlog, not a single outlet;
  837 kopitiam-operator brands still have zero MenuItems after this run).
- No changes to `brands.ts` or `premises.ts` (Brand/Premises already existed).

## Phase 5 — Typecheck

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a
sandbox dir, ran `npm install` then `npx tsc --noEmit`. **Passed clean, no errors.**

## Phase 6 — Commit: BLOCKED (environment limitation, needs manual follow-up)

`git add src/lib/menuItems.ts src/lib/researchQueue.ts reference/research-sessions/2026-08-23-kopitiam_chinatown_roasted.md`
succeeded and staged correctly (confirmed via `git status`). `git commit` then failed —
git's object-write finalization needs to unlink/rename temp files inside `.git/objects`,
and every delete/unlink attempt on this OneDrive-mounted project folder fails with
`Operation not permitted` in this sandboxed session (confirmed categorically: the same
failure happens for a throwaway scratch file in an unrelated directory, not just git
internals — this mount does not permit file deletion from this session at all, matching
the documented behavior for `C:\stride-app`). The aborted commit left a stale
`.git/index.lock` that also cannot be removed from this session, which will block any
further git operations in this repo until it's cleared manually.

**The working-tree file changes themselves are all correctly saved and typecheck-clean**
(this is a commit/git-plumbing problem only, not a data-loss problem). To finish this
run's commit, from a normal terminal/Explorer session with full delete permissions:

```
del ".git\index.lock"          (or delete it in File Explorer)
cd "path\to\PlateScreen"
git add src/lib/menuItems.ts src/lib/researchQueue.ts reference/research-sessions/2026-08-23-kopitiam_chinatown_roasted.md
git commit -m "Research: add kopitiam_chinatown_roasted"
```

(Deliberately not staging `pick_tmp.mjs`, `pick2_tmp.mjs`, `pick3_tmp.mjs`,
`pick4_tmp.mjs`, or the unrelated pre-existing `reference/stride-sync-sessions/*` changes
— see note below. Those scratch `.mjs` files can also be deleted manually at the same
time.)

## Note on working-directory scratch files

Four temporary Node scripts (`pick_tmp.mjs`, `pick2_tmp.mjs`, `pick3_tmp.mjs`,
`pick4_tmp.mjs`) were written to the project root during Phase 1 selection to query
`RESEARCH_QUEUE`/`BRANDS`/`MENU_ITEMS`/`PREMISES` via `tsx` (needed relative-import
resolution from inside the project dir). They could not be deleted afterward — the
OneDrive-mounted project folder rejected the delete/rename (`Operation not permitted`)
the same way `C:\stride-app` is documented to. They are harmless empty-of-secrets scratch
scripts, left in place, and were **not** included in this run's commit (`git add` used
explicit paths rather than `-A` to exclude them). A human may want to delete them
directly from Windows Explorer since the sandbox can't.

Also found (pre-existing, not from this run) uncommitted changes to
`reference/stride-sync-sessions/_synced.json` and an untracked
`reference/stride-sync-sessions/2026-08-23.md`, evidently from a different scheduled
task (`platescreen-sync-to-stride`). Left both untouched and out of this commit — not
this task's concern.

## Sources

- [Eating at Transit Terminal 3 Changi Airport](https://kopitiam.com.sg/2026/01/09/eating-at-transit-terminal-3-changi-airport/)
- [New Kopitiam and FairPrice Finest integrated experience lands at Changi Airport Terminal 3](https://nowboarding.changiairport.com/discover-changi/discover-kopitiam-and-fairprice-at-changi-airport-terminal-3.html)
- [KOPITIAM @ T3 — Yelp](https://www.yelp.com/biz/kopitiam-t3-singapore)
