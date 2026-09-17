# 2026-09-18 — `platescreen-improve-app` — backlogged automation output reconciled and committed; stale git locks cleared again

## Why

Scheduled `platescreen-improve-app` run. Per this task's own read-first
instructions, read `CLAUDE.md`, `ROADMAP.md`, and the 5 most recent
`research-sessions/` files before picking any new hand-authored
data-quality change. `git status` showed several hours' worth of
already-researched, already-reviewed automation output sitting
uncommitted — 3 modified data files and 6 new session reports/digests, all
dated 2026-09-17 — blocked by the same recurring stale
`.git/index.lock` / `.git/HEAD.lock` pair ROADMAP item 7 has tracked since
2026-08-31, and by the exact same shape of problem the 2026-09-17
`improve-app` run (`188792e`) had already fixed once that same day before
more backlog accumulated behind a fresh lock. Consistent with ROADMAP item
2's standing note ("the pipeline does not fully self-tidy") and the
2026-09-15/17 `improve-app` precedent, this run's job was landing that
backlog rather than forcing a new blind data edit before checking for it.

## What was found

- `git status`: 3 modified data files (`branchQueue.ts`, `menuItems.ts`,
  `researchQueue.ts`) and 6 untracked files (5 research-session reports +
  1 Post-Copilot digest), all dated 2026-09-17.
- `.git/index.lock` and `.git/HEAD.lock`, both timestamped 13:09 the
  previous day — ~13 hours old at the time this run started. `ps aux`
  showed no git process running; `fuser` on both lock paths returned
  nothing (no process holding either).
- `/sessions` (the OneDrive-mounted disk `$HOME` lives on) was 100% full
  (0 bytes free) — the same recurring disk-exhaustion issue documented
  since 2026-09-07, requiring the `/tmp`-mirror + `/tmp`-npm-cache
  workaround from the 2026-09-16 report (root disk `/dev/sda1` had 4.1G
  free).
- Two harmless empty stale-renamed probe files
  (`_probe.txt.stale-20260917`, `reference/research-sessions/
  _probe2.txt.stale-20260917`) left over from the prior day's session,
  untracked and carrying no content.

## Method

1. Read every pending diff and every untracked file in full before
   staging anything, checking each against CLAUDE.md section 5
   (never-fabricate) and 5.1 (diet-tag rules):
   - `menuItems.ts`: exactly 4 new rows (`hg105_10`–`hg105_13`) for the
     existing `hougang_105_..._bachmann_japanese_restaurant_pte_ltd`
     Brand — 3 ramen items + 1 curry rice, sourced from a Bugis Junction
     mall fan-site's photographed menu board (a chain-wide menu, no
     outlet-specific source, matching the established "chain-wide menu"
     precedent), with macros calibrated against this project's own
     existing ramen/curry-rice analogs. Diet tags followed section 5.1
     correctly: Tonkotsu/Cha Shu Ramen left untagged (pork-broth/roast-pork
     named, categorical-exclusion spirit even though not on the literal
     8-name list), Spicy Ramen left untagged (no source on protein base),
     Fried Chicken Curry Rice tagged `["no_pork"]` (named protein is
     chicken). No fabrication — the accompanying report's own sourcing
     trail checks out against the actual diff.
   - `researchQueue.ts`: the same entry's `status` flipped
     `pending → researched` (5 MenuItems now, meets the 3-item minimum),
     plus notes-only text appended recording a sweep of 3 other candidate
     brands (`al_borgo`, `e_p_cafeteria`, `jex`) that were surveyed and
     correctly left unresolved (bare SFA-licensee names, no discoverable
     storefront identity — left at zero MenuItems per the never-guess
     rule, not fabricated).
   - `branchQueue.ts`: notes-only updates across 3 same-day
     `platescreen-research-branches` runs on `bonchon`/`grain`/
     `nourish_bowl` — all reconfirmed blocked (no Browser/Chrome access
     grantable in an unattended session, no new SFA Track Records export),
     plus a new negative finding (`grain_traders` investigated and ruled
     out as an unrelated standalone business, not a `grain.com.sg`
     location). Zero new Premises rows — correctly left unadded per the
     no-fabrication rule.
   - The Post-Copilot digest (2026-09-17): a genuine no-op — recomputed
     live confidence/coverage numbers, found every content theme still
     failed the quality bar or was drafted too recently, and correctly
     drafted nothing.
   - The `mccafe_colocation_research` 26th-pass report: a re-confirmation
     that this entry remains blocked on a human taxonomy decision (already
     resolved empirically since 2026-08-31); this pass deliberately didn't
     re-append another near-duplicate notes paragraph, which is itself a
     small process improvement over the prior 25 passes.
2. Confirmed the two git locks were stale (age + `fuser`, per above) and
   applied the documented rename-not-delete workaround (`mv` to
   `.stale-20260918` suffixes) rather than forcing a delete — succeeded
   cleanly on the first attempt (both files renamed with no error).
3. Set up a build mirror at `/tmp/ps-mirror` (root disk, not the
   100%-full `/sessions` disk) with `npm_config_cache=/tmp/npm-cache`.
   `npm install` succeeded (158 packages).
4. `npx tsc --noEmit` — clean, exit 0. Real `tsc`, not the Node-native
   substitute.
5. Wrote a throwaway `integrity_check.mjs` (Node 22 native TS import,
   deleted after use) checking duplicate ids and orphaned FK references
   across Brands/Premises/MenuItems/GroceryProducts/Brands.operatorId,
   price outliers, and specifically confirming all 4 new `hg105_*` ids
   resolve to the correct brand and the brand's total item count is 5.
6. `diff`'d the live copies of all 3 modified files against the mirror's
   copies — byte-identical on all three.
7. `git add` + `git commit` the reconciled files. Hit the same non-fatal
   `warning: unable to unlink ...tmp_obj_*`/`HEAD.lock` noise documented
   in every prior rename-workaround report (git recreating and discarding
   its own transient lock/tmp-object files mid-command) — both `git add`
   and `git commit` still exited cleanly and the commit is real
   (`2372bbf`).
8. `git fsck`: clean aside from expected dangling objects/commits left
   over from other sessions' earlier aborted commit attempts against the
   same locks (same pattern the 2026-09-06/17 reports document) — `HEAD`
   advanced correctly, working tree clean apart from the two harmless
   stale-renamed probe files.
9. Ran a small stats script (Node 22 native TS import) to refresh the
   diet-tag-coverage and confidence-breakdown numbers for the ROADMAP
   table below, since the new menu items shift them slightly.
10. Deleted the `/tmp/ps-mirror` build mirror and `/tmp/npm-cache`
    afterward.

## Result

| Metric | Before this run | After this run |
|---|---|---|
| Brands | 1,727 | 1,727 (unchanged) |
| Premises | 4,665 (ROADMAP snapshot) / 4,667 live | 4,667 (unchanged by this run — the +2 vs. the ROADMAP snapshot is from other same-day automation landed earlier, not this commit) |
| Menu items | 2,668 | 2,672 (+4, `hg105_10`–`hg105_13`) |
| Grocery products | 19 | 19 (unchanged) |
| Diet-tag coverage | — | 1,732 / 2,672 (64.8%) |
| Confidence breakdown | — | 56 verified / 2,610 estimated / 6 community |
| Duplicate ids (all 4 arrays) / orphaned brandId / orphaned operatorId | — | 0 / 0 / 0 (re-verified) |
| Price outliers | — | 0 |
| Uncommitted automation backlog | 3 data files + 6 docs | 0 (all landed in commit `2372bbf`) |

No new hand-authored data-quality edit was made this pass — as with the
2026-09-15/17 precedent, the entire scope was reconciling and verifying
already-completed, already-reviewed automation output that had a clean
bill of health except for the commit-blocking lock. Browser access (the
one capability that would unblock the standing `bonchon`/`grain`/
`GroceryProduct`-chain-expansion items) was checked and confirmed still
unavailable in this unattended session (`tabs_context` — pane not open,
zero tabs); per this task's scope rules, that item was not force-attempted.

## Verification

- `npx tsc --noEmit` in `/tmp/ps-mirror`: clean, exit 0.
- Runtime integrity check (`integrity_check.mjs`, deleted after use):
  `BRANDS: 1727 rows, 0 duplicate ids`; `PREMISES: 4667 rows, 0 duplicate
  ids`; `MENU_ITEMS: 2672 rows, 0 duplicate ids`; `GROCERY_PRODUCTS: 19
  rows, 0 duplicate ids`; `Orphaned Premises.brandId: 0`; `Orphaned
  MenuItems.brandId: 0`; `Orphaned GroceryProduct.brandId: 0`; `Orphaned
  Brands.operatorId: 0`; `Price outliers (<=0 or >100): 0`; all 4
  `hg105_10`–`hg105_13` ids present exactly once, each resolving to
  `hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd`;
  that brand's total menu-item count confirmed at 5 (expected).
- `diff` of live `branchQueue.ts`/`menuItems.ts`/`researchQueue.ts`
  against the mirror's copies, pre-commit: byte-identical on all three.
- `npm run build` not run this pass — same reasoning as 2026-09-17:
  `tsc --noEmit` is the documented real verification gate, and this pass
  made no new hand-typed edits beyond what it already covers.
- `git fsck`: clean (dangling objects only, no ref corruption, `HEAD`
  correct).
- `git status` after commit: clean except the 2 pre-existing harmless
  stale-renamed probe files (untracked, not committed, no content).

## Not done

- No new hand-authored data-quality change this pass (see Result above).
- Did not delete the 2 empty probe files — `unlink` remains blocked on
  this OneDrive-mounted folder for files it's tracking (same restriction
  documented for `.git/` lock files); they were already renamed by the
  prior session and are left as-is (no content, untracked).
- Did not attempt the `GroceryProduct` chain-expansion item (Cold
  Storage/Giant/Sheng Siong/Don Don Donki) or the `bonchon`/`grain`
  browser-dependent leads — confirmed the in-app Browser pane is still
  not open/grantable in this unattended session (`tabs_context`), same
  blocker as every documented prior automated attempt.
- Did not touch the 2 borderline pork/offal diet-tag cases
  (`lps_fx_organ_porridge`, `ss_roast_pork`) flagged 2026-09-16 for a
  human decision.
- Did not push (per standing rule — commits are local only).

## Commit

Committed locally as `2372bbf`, "Research: land backlogged automation
output (2026-09-17 restaurant/branches/copilot runs)". **Not pushed.**

```bash
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen" && git pull origin main && git push origin main
```
