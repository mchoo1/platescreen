# 2026-09-05 — improve-app run: git backlog cleared, dataset-wide integrity sweep, grocery-SKU expansion attempted but declined

**Task:** `platescreen-improve-app` scheduled run (data-quality maintenance, no
application-code changes). This run had full `mcp__workspace__bash` access,
unlike the 2026-09-03 run of this same task (`2026-09-03-improve-app-no-action.md`),
which had none.

## Part 1 — Cleared a stale git lock and committed 4 batches of backlog work

At the start of this run, `.git/index.lock` (0 bytes, mtime 2026-09-04 11:20,
~15h old) was blocking every git command in the live repo, and 5 tracked files
plus 5 new `research-sessions/` reports were sitting uncommitted from the last
several `platescreen-research-restaurants`/`platescreen-research-branches`/
`platescreen-research-grocery` runs. This is the same class of issue ROADMAP.md
item 7 has documented repeatedly (the OneDrive-synced filesystem disallows
`unlink()` on these lock files but allows `rename()`).

**Verification before clearing:** confirmed the lock was 0 bytes and ~15h old,
and `ps aux` showed no git/editor process running in this session's sandbox.
Diffed every uncommitted change against the description in its matching
uncommitted `research-sessions/*.md` report before touching anything — all 5
data-file diffs (`brands.ts`, `menuItems.ts`, `researchQueue.ts`,
`branchQueue.ts`, `dish-macro-lookup.py`) matched their reports exactly, no
surprises.

Renamed the lock out of the way (`mv .git/index.lock .git/index.lock.stale-2026-09-05`)
per the rename-not-delete workaround item 7 already diagnosed, then committed
in 3 logically separate commits (matching the "don't bundle unrelated work"
guidance the 2026-09-05 Golden Rooster report itself left for whoever picked
this up):

1. `71ce9b6` — Grain's Upper Weld Road lead resolved as a clean ACRA negative
   (`branchQueue.ts` + `2026-09-03-branches-grain.md`).
2. `1389a0a` — Golden Rooster (Jurong West Hawker Centre) 7 new MenuItems +
   halal dietTag (`brands.ts`, `menuItems.ts`, `researchQueue.ts`,
   `dish-macro-lookup.py` + its own report).
3. `3f3edff` — 3 consecutive grocery-track no-new-work reports (report-only,
   no data files).

Each subsequent `HEAD.lock` git recreated mid-commit (visible as
`warning: unable to unlink ... Operation not permitted`) was renamed out of
the way before the next command, exactly as item 7's 2026-09-04 diagnosis
predicted — every commit still exited 0 and is real (`git log` confirms all
3, `git status` is clean afterward).

**Not cleaned up:** the `.git/` directory has accumulated dozens of harmless
0-byte renamed lock artifacts from past sessions (`*.lock.bak*`, `*.lock.old*`,
`*.lock.stale*`, `*.lock.tryrename*`, going back to 2026-08-11). These don't
affect git's operation (git only looks for the exact `index.lock`/`HEAD.lock`
names) so left them alone rather than risk a bulk-delete inside `.git/` — a
future session could do a dedicated cleanup pass if desired, but that's
tidiness, not a bug.

## Part 2 — Dataset-wide integrity + outlier sweep (fresh, not reused from 2026-09-04)

The last full duplicate/orphan sweep was 2026-09-04 (`2026-09-04-dataset-wide-duplicate-premises-sweep.md`)
and the last price/calorie outlier check was the 2026-08-31 launch-readiness
review — both before today's +7 Golden Rooster items, so re-ran fresh against
the post-commit state (compiled `brands.ts`/`premises.ts`/`menuItems.ts`/
`groceryProducts.ts`/`operators.ts` to plain JS via `tsc` and inspected
directly, since the mirror's `node_modules` has no ts-node/esbuild):

- **Duplicate ids:** 0 across Brands (1,717), Premises (4,653), MenuItems
  (2,594), GroceryProducts (19).
- **Orphaned `brandId` refs:** 0 across Premises, MenuItems, GroceryProducts.
- **Orphaned `operatorId` refs:** 0 (all Brand `operatorId`s resolve to a real
  Operator).
- **Price outliers** (≤$0 or >$100): 0.
- **Calorie outliers** (≤0 or >2000): 4, all already-confirmed-legitimate
  family-size items from the 2026-08-31 review (`aw_root_beer_zero` at 0 cal
  is a real zero-sugar drink, not an error; the Jollibee 6pc/8pc buckets and
  KK dozen donuts are real shared/multi-serve items) — no new outliers since
  that review.
- **Negative macro values:** 0.
- **Macro-sum sanity** (derived 4p+4c+9f vs stated calories, flagged outside
  40%-250%): 5 items, all false positives from the check's own blind spots
  rather than real errors — `mcd_americano`/`mcd_iced_americano` are near-zero-
  calorie black coffee (division-by-small-number artifact, not a data bug),
  and 3 "Beer" items (`lps_archipelago_beer`, `lps_beer_and_drinks_beer`,
  `bc_scissors_paper_stone_beer`) derive low because alcohol calories (7
  kcal/g) aren't captured by the 4-4-9 protein/carb/fat formula and this
  schema has no alcohol field — a known modeling gap, not a data-entry error,
  and out of scope to fix (would need a schema change).
- **Protein/$ absurd values** (>100g protein per $1): 0.
- **GroceryProduct sanity** (per-100-unit calories/price/package-size bounds):
  0 flagged.

Also re-verified in the mirror: `npx tsc --noEmit` silent, and a full
`npm run build` completed this run (unlike several recent runs that hit the
sandbox's OOM/resource constraint) — all 4,317 static pages generated
(1,717 brand pages + 2,594 item pages + 4 static routes), matching the
Golden Rooster report's own build output exactly. `diff` of the live
`brands.ts`/`premises.ts`/`menuItems.ts`/`groceryProducts.ts` against a fresh
mirror sync taken after this run's commits: byte-identical.

**Net result of Part 2: no data-quality defects found.** This is a real
(negative) finding, not a skipped check — the dataset has grown by several
hundred rows since the last full sweep and remains clean.

## Part 3 — GroceryProduct expansion for Cold Storage/Giant/Sheng Siong/Don Don Donki: attempted, not completed

ROADMAP.md item 10's remainder (real per-SKU grocery research for these 4
chains, `GroceryProduct` currently has 0 rows from any of them) was the next
candidate. Attempted one product (Milo 3-in-1) as a trial:

- Found real, verifiable per-100g macros via OpenFoodFacts (barcode
  9556001217233, "Countries where sold: Singapore", Halal-labelled): 438
  kcal / 10.3g fat / 74g carbs / 9.5g protein / 0.32g salt per 100g, quantity
  "18 x 33g". This part is solid — a real, checkable, structured source, same
  admissibility tier as this project already treats OpenFoodFacts-equivalent
  crowdsourced label databases.
- Could **not** find a matching, admissible price for that exact 18×33g SKU
  at any of the 4 target chains. WebSearch surfaced only: a HardwareZone
  forum post citing "$8.45" at Sheng Siong (a different, unverifiable pack
  size/date, user-generated not official — same inadmissible-source class
  this project has consistently declined elsewhere, e.g. the Bonchon/Grain
  branch-research notes), and a secondary marketing article citing a
  different pack size ("16 x 27g") also at Sheng Siong. Sheng Siong's own
  online store (`shengsiong.com.sg`) didn't surface a fetchable product-page
  URL in this run's searches (`web_fetch`'s provenance restriction only
  allows URLs that literally appeared in a prior search/fetch result, and no
  search this run surfaced one).
- Mixing the OFF entry's package size with a different pack size's price (or
  a forum-sourced price of unknown recency/accuracy) risks exactly the kind
  of avoidable data error CLAUDE.md's "never fabricate" rule and this
  project's `never-fabricate` culture (visible throughout the branch-research
  notes) exists to prevent. **Did not add this or any other GroceryProduct
  row this run** rather than force a low-confidence entry just to have
  completed item 10.

This remains open for whoever picks it up next. A more promising angle than
general WebSearch: try each retailer's own app/site directly with a connected
browser (per the 2026-09-02 interactive-session precedent that unblocked
Bonchon/Dosirak branch research) rather than an unattended WebSearch/web_fetch-
only session — official retailer product pages typically show both the exact
package size and a current price together, avoiding the SKU-mismatch problem
hit here.

## Verification summary

- `npx tsc --noEmit`: silent, exit 0 (both before and after this run's
  commits — no data files were edited this run, so this mainly re-confirms
  the already-committed Golden Rooster batch is clean).
- `npm run build`: succeeded, 4,317 pages, "Compiled successfully".
- Integrity sweep: 0 duplicate ids, 0 orphaned `brandId`/`operatorId` refs,
  0 price outliers, 0 negative macros, 0 protein/$ outliers, 0 GroceryProduct
  issues, across the full current dataset (1,717 brands / 4,653 premises /
  2,594 menu items / 19 grocery products).
- `diff` of live vs. a fresh post-commit mirror sync: byte-identical for all
  touched files.
- Deleted `/tmp/build`, `/tmp/compiled`, `/tmp/*.js`, `/tmp/*.log` (all
  ephemeral, all outside the repo) after verification.

## Not done

- No `GroceryProduct` rows added (Part 3) — sourcing precision issue, not a
  decision to skip; flagged for a future browser-enabled session.
- No application code touched (out of this task's scope by design).
- The `.git/` directory's accumulated harmless stale-lock-artifact files
  (Part 1) were left in place — cosmetic, not a functional issue.

## Next steps for whoever picks this up

- If the git-lock pattern recurs: rename (not `rm`) the stale lock, per the
  now-repeatedly-confirmed workaround; commits succeed despite the
  `warning: unable to unlink` noise as long as `HEAD` moves and `git log`
  shows the new commit.
- Item 10 (grocery SKUs): worth retrying with a connected browser session
  rather than WebSearch/web_fetch alone — see Part 3.
- The remaining open ROADMAP items (3: Vercel Analytics toggle, 6: mobile
  table reflow, 7: git-lock root-cause code fix, 8: Street View escalation)
  are all still out of this task's scope for the reasons the 2026-09-03
  no-action report already gave.
