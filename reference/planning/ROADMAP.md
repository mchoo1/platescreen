# PlateScreen — Roadmap & Current Status

**Last updated:** 2026-09-25. This is the entry point for "what's the state of
this project and what should happen next" — read this before the other files
in this folder, which are point-in-time strategy docs that may have stale
numbers (each is dated; treat the numbers in this file as current).

See `../../CLAUDE.md` for architecture and operating rules, and
`POSITIONING.md` for how to describe the product (introduction, research
value proposition, moat) — this file is about priorities and sequencing,
not how the codebase works or how to talk about it.

---

## Where things stand (2026-09-25)

All 7 scheduled tasks are **paused** as of today (see item 21) — these
numbers won't move again until they're re-enabled or someone does hand
research.

| Metric | Value |
|---|---|
| Total brands | 1,728 (+1 vs. 2026-09-20, from same-day research-track automation before the pause) |
| Total premises | 4,673 (+5 vs. 2026-09-20) |
| Total menu items | 2,704 (+9 vs. 2026-09-20) |
| GroceryProduct rows | 19 — unchanged, but now visible in the UI (see item 21) |
| Menu items with ≥1 diet tag | not re-tallied 2026-09-25 (last confirmed 65.4% on 2026-09-19/20) |
| Confidence breakdown (MenuItems) | not re-tallied 2026-09-25 (last confirmed 56 verified / 2,633 estimated / 6 community on 2026-09-19/20) |
| Premises missing lat/lng | not re-checked 2026-09-25 (last confirmed 0 on 2026-09-05) |
| Duplicate ids / orphaned brandIds | 0 / 0 (brands, premises, menu items, and GroceryProduct) — re-verified 2026-09-25 with a real `tsc --noEmit` (sandbox shell had recovered by this session, unlike 2026-09-20's substitute check) |
| Zero-menu brands | **35**, down from 42 (2026-09-16) — re-audited 2026-09-20; improvement is from other same-day/same-week research-track automation, not this pass's own work |
| Price / calorie / macro-sum outliers | 0 price outliers (≤0 or >$100) and 0 macro-sum outliers (stated calories vs. protein/carbs/fat-derived, ±35%/150kcal tolerance) — both re-verified 2026-09-20 |
| Grocery SKUs populated (dedicated `GroceryProduct` schema) | 19 (2 original + 17 migrated from MenuItem 2026-08-31 — see item 1 below). Still unstarted beyond that as of 2026-09-20 — see item 10; not re-attempted this pass, same standing blockers (Incapsula bot-challenge on `shengsiong.com.sg`, unattended-session Browser pane access declined). |

**2026-09-18 — backlogged automation output (2026-09-17 runs) reconciled, stale git locks cleared
again.** Same shape of issue as the 2026-09-17 pass, recurring within ~13 hours: a `Premises`-track
notes update, a `MenuItem` addition (4 rows for `hougang_105_..._bachmann_japanese_restaurant`), and
6 session reports/digests from same-day restaurant/branches/copilot runs were left uncommitted by a
fresh stale `.git/index.lock`/`.git/HEAD.lock` pair (~13h old, confirmed unheld by any process via
`fuser`). Reviewed every pending diff and report against CLAUDE.md section 5/5.1 (all clean — the 4
new menu items are chain-menu-sourced with correctly-applied diet tags, the branches notes are
negative/no-op findings, no fabrication anywhere), verified via a real `tsc --noEmit` pass + runtime
integrity check in a `/tmp` mirror (root disk — `/sessions` was 100% full again, same recurring
constraint), then cleared the stale locks via the documented rename-not-delete workaround and
committed everything as `2372bbf`. No new hand-authored data-quality change this pass — see
`reference/research-sessions/2026-09-18-improve-app-backlog-reconciliation.md` for full detail.

**2026-09-17 — backlogged automation output reconciled, stale git locks cleared.** Several days'
worth of same-day (2026-09-16) legitimate research-task output — a Premises addition
(`king_of_fried_rice_hws_p4`) and queue-note updates, plus 6 session reports and 1 Comment-Copilot
digest — had been left uncommitted by a recurring stale `.git/index.lock`/`.git/HEAD.lock` pair
(first hit by a same-day branches run at 06:12, confirmed unheld by any process ~25h later).
Reviewed every pending diff and report against CLAUDE.md section 5/5.1 (all clean — one real
Premises addition with verified sourcing, the rest notes-only or no-op reconfirmations), verified
via a real `tsc --noEmit` pass + runtime integrity check, then cleared the stale locks (and a
separately-stale `refs/heads/main.lock`) via the documented rename-not-delete workaround and
committed everything as `188792e`. No new hand-authored data-quality change this pass — see
`reference/research-sessions/2026-09-17-improve-app-backlog-reconciliation.md` for full detail.

Brand/premises/menu-item counts move day-to-day now that the three research
scheduled tasks are running unattended — treat these as "as of last check,"
not a fixed number. Confidence breakdown dipped earlier in the day (73→56
verified) purely as a side effect of the grocery migration (item 1) moving
17 items out of MenuItems, not new data-quality loss.

**⚠️ New standing issue, flagged 2026-09-08: sandbox disk exhaustion, 2nd
consecutive day, blocking all `tsc`/build verification.** The
`platescreen-improve-app` scheduled task's sandbox has hit `/sessions`
100% full (single-digit MB free out of 9.8G) on both 2026-09-07 and
2026-09-08, confirmed with a fresh, near-empty session home directory both
times (so it's not this task's own residue) — `npm install` fails
immediately with `ENOSPC`, meaning `tsc --noEmit` cannot run at all, which
blocks any data-file edit under CLAUDE.md section 6's mandatory
verification step. Likely cause: the size of the user's own mounted
OneDrive folders sharing the same filesystem, not anything PlateScreen's
automation created. This will also block the three research scheduled
tasks' own verification steps if it persists. Needs the user's direct
attention (freeing space in the mounted folders, or a larger sandbox disk
allocation) — no scheduled task can fix this from inside its own sandbox.
See `reference/research-sessions/2026-09-07-improve-app-no-action.md` and
`reference/research-sessions/2026-09-08-improve-app-no-action-disk-
exhausted-2nd-day.md`.
**2026-09-15 reconfirmation + sharper diagnosis:** `/sessions` was still
100% full (23MB free of 9.8G), and this time `mkdir` itself failed with
`ENOSPC` before `npm install` was even attempted — confirmed via `mount`
that `/sessions` (`/dev/sdc`, ext4) is shared across *multiple concurrent
Cowork sessions* (another session's own mount entries were visible
alongside this one), not per-task-sandbox private disk, which is the
likely real cause (other sessions' usage, not PlateScreen automation or
OneDrive folder size). **Tried and ruled out a workaround:** relocated a
build mirror + npm cache to the `outputs` fuse mount instead (`df` showed
62G free there) — config files copied fine, but `npm install` (and even a
plain `du`/`rm -rf` afterward) hung past a 3-minute timeout and had to be
abandoned; a fuse-proxied mount to the host filesystem is far too slow for
npm's thousands-of-small-files workload, so relocating the mirror is not a
viable fix. **Found a partial substitute that *is* viable:** Node 22's
native TypeScript type-stripping can `import` `brands.ts`/`premises.ts`/
`menuItems.ts`/`operators.ts` directly (no `npm install`, no build mirror
needed — Node ≥22.6 strips type annotations at parse time) since these
files are plain literal exports with no runtime dependency on the `.ts`
type files. This gives a real, non-fabricated duplicate-id/orphaned-FK/
diet-tag-coverage/price-outlier check — everything CLAUDE.md §6 calls the
"runtime integrity check" — without `tsc`. It does **not** replace `tsc`
for catching actual type errors (e.g. an invalid enum literal), so it's a
partial substitute, not a full one: safe for reviewing/committing
*already-written* data (this session used it to verify and commit 3 runs'
worth of backlogged automation output — see below), but not a green light
to author *new* hand-typed data changes without real type-checking. See
`reference/research-sessions/2026-09-15-improve-app-disk-exhaustion-and-
automation-reconciliation.md` for the full script and output.
**2026-09-16 — real fix found (not just a substitute):** `/sessions` (`/dev/sdc`) was still 100%
full, but `$HOME` and every previous session's `~/build` mirror live *under* `/sessions` — that's
why `npm install` always failed there. The root filesystem (`/dev/sda1`, mounted at `/`) is a
**separate disk** with its own free space (1.1G at this session's start) that no prior session had
tried. Building the mirror at `/tmp/<name>` instead of `~/build`, and pointing npm's cache at
`/tmp/npm-cache` (npm defaults to `$HOME/.npm`, itself on the full disk, so this redirect is
required even after moving the mirror), let `npm install` complete cleanly and `npx tsc --noEmit`
run for real — a genuine `tsc` pass, not the Node-native-type-stripping substitute. `npm run build`
got all the way through compiling, type-checking, and generating all 4,397 static pages, and only
hit `ENOSPC` at the very last step (copying exported HTML into `out/`, since only ~500M remains
free on `/` after `node_modules`) — a disk-*size* ceiling on the final export copy, not a
build/content problem. **Recommended for every future run of this task and the three research
tasks:** mirror to `/tmp/<name>` and set `npm_config_cache=/tmp/npm-cache`, not `~/build`. Treat
`tsc --noEmit` (which now fully succeeds) as the real verification gate; a `npm run build` that
fails only at the final export-copy step with `ENOSPC` can be treated the same as a build that
doesn't finish in the time budget — not a sign of a real problem. See
`reference/research-sessions/2026-09-16-diet-tag-categorical-exclusion-audit-and-disk-workaround.md`.

**Launch-readiness review completed 2026-08-31** (code + database, requested
directly). Verdict: **the database and the codebase are launch-ready; one
real product-quality bug should be fixed first, and one known UX rough edge
is a judgment call.** Full findings:

- **Confirmed FIXED**: the 2026-08-22 fix that excluded `supermarket`
  outletType from the homepage "Top protein/$ picks" carousel holds — spot-
  checked live, the carousel shows real dishes only.
- **Confirmed STILL PRESENT, and worse than originally scoped — real bug,
  not just a UI nice-to-have**: 17 `MenuItem` rows (category `"Ingredients"`,
  brandId `fairprice`) store **whole-retail-package totals**, not per-serving
  macros — e.g. `ing_jasmine_rice`: 18,000 cal / 350g protein / $12 (a whole
  bag of rice, not a serving). These aren't excluded from the **main
  screener table** (only from the top-picks carousel), so a first-time
  visitor with no filters applied, sorting by the default Protein/$ column,
  sees a bag of rice ranked above every real dish in the database — directly
  undercutting the "real dishes, not confusing numbers" pitch. This is what
  `GroceryProduct` (per-100g + package size) was designed to model correctly;
  these 17 rows were never migrated to it. **Recommended before/shortly
  after launch:** either rescale these 17 items to a realistic single
  serving, or exclude `category: "Ingredients"` from the main table the same
  way `supermarket` is excluded from the carousel, until real
  `GroceryProduct` rows replace them properly.
- **Confirmed STILL PRESENT, cosmetic not broken**: the results table does
  not reflow into a card layout on mobile — it stays a horizontally-
  scrollable table, so a mobile visitor sees item name first and must swipe
  sideways to see calories/protein/price. Data is reachable, just not a
  great first impression on what's likely majority-mobile traffic. Lower
  priority than the ingredients bug above; a product polish item, not a
  launch blocker.
- **Database integrity, checked programmatically**: 0 duplicate ids and 0
  orphaned `brandId` references across all of Brands/Premises/MenuItems, 0
  premises missing coordinates, 0 price outliers (≤0 or >$100). The only
  `calories > 2000` items are legitimate family-size items (Jollibee 8pc
  bucket, KK dozen donuts) — not data errors.
- **Automation review** (first runs since the six scheduled tasks were
  re-enabled 2026-08-30): reviewed every commit and uncommitted change from
  the overnight runs. All of it held to the never-fabricate rule correctly
  — see the McCafe and content-queue entries below. Found and fixed a real
  hygiene issue: legitimate research output (2 Dosirak premises, a
  research-session report, a Post-Copilot digest) was sitting uncommitted,
  and 14 ephemeral `scratch_compute*.ts` debug scripts were left uncommitted
  in the repo root — committed the real work, deleted the scratch files
  (commit `e48d28f`). **Practical implication: someone needs to periodically
  check for and commit/clean up automation output** — it doesn't fully
  self-tidy yet.

The core data-completeness problem flagged in the (now-retired) launch
guide — "4 out of 5 listed places have nothing to screen" — remains
**effectively solved**: menu coverage is 95.8% across dozens of research
batches (full history in `../research-sessions/`).

**Deploy status, checked directly against Vercel on 2026-08-31:** `main` is
pushed and production is live and in sync — the latest deployment
(`dpl_F1E5qdwUq7CU4AErmZRy1wpvgBqw`) is `READY` at commit `b6efd11` (includes
the new SEO pages), build completed in 1 minute with all 4,305 static pages
generated cleanly, auto-deployed via the GitHub integration. No runtime
errors in the last 7 days. Note: an automated research task's own sandbox
hit an OOM crash (`SIGBUS`) trying to run `npm run build` locally on this
same commit and reasoned it was environmental rather than content-related —
**confirmed correct**: Vercel's own build of the identical commit succeeded
without issue, so this was a sandbox resource limit, not a real build
problem. **Web Analytics is confirmed still not enabled** on the
project (`web_analytics_not_enabled` from the API) — flagged as missing in
the 2026-08-22 growth-strategy research over a week ago and still hasn't
been turned on; it's a one-click toggle in the Vercel dashboard (Project →
Analytics tab) and nothing in this repo can turn it on for you.

**Decision made 2026-08-30 — all six re-enabled, per explicit user request
to "make it self run."** All six PlateScreen scheduled tasks are now active:

| Task | What it does | Status |
|---|---|---|
| `platescreen-research-restaurants` | 3x/day — researches restaurants/hawker/food-court menu items from the queue | **Enabled**, next run 2026-08-30 |
| `platescreen-research-grocery` | 3x/day — same, for grab & go / convenience / supermarket | **Enabled**, next run 2026-08-30 |
| `platescreen-research-branches` | 3x/day — backfills real branch locations (Premises) | **Enabled**, next run 2026-08-30 |
| `platescreen-sync-to-stride` | Weekly Sunday — draft-exports new data to Stride's schema for review | **Enabled**, next run 2026-09-06 |
| `platescreen-post-copilot` | Mon/Thu — drafts a real leaderboard post, types it into Reddit, stops before posting | **Enabled**, next run 2026-08-31 |
| `platescreen-comment-copilot` | Wed — finds relevant threads, drafts replies, stops before sending | **Enabled**, next run 2026-09-02 |

**What this does and doesn't make autonomous, stated plainly:** the three
research tasks and the Stride sync run fully unattended — they only write
to this repo and commit locally (never push), so there's nothing for a
human to approve mid-run. The two content tasks draft automatically on
schedule, but **the actual "Post"/"Send" click on Reddit is a hard stop
every single run, by design and by platform/safety rule — not a setting
that can be turned off.** Every run ends with a filled-in draft sitting in
an open browser tab (or the full text in that day's digest under
`Post-Copilot-Digests/`/`Comment-Copilot-Digests/`) waiting for a human
click. "Self-running content creation" means the drafting is unattended;
publishing never will be, on this or any platform's rules. Check
`Post-Copilot-Digests/` and `Comment-Copilot-Digests/` (created on first
run) regularly, or nothing actually reaches Reddit.

Local commits will now accumulate from the research/sync tasks running
unattended — remember to periodically `git pull && git push` (see section 8
of `CLAUDE.md`) so the live site actually reflects what the automation adds.

---

## Active / near-term (in priority order)

1. ~~**Fix the 17 `Ingredients`-category `MenuItem` rows storing
   whole-package totals**~~ — **Done 2026-08-31** (commit `47eb9da`). Chose
   the "migrate to `GroceryProduct`" option rather than rescale-in-place:
   removed all 17 rows from `menuItems.ts` (they no longer appear in the
   screener at all, which is what actually fixes the ranking-pollution bug)
   and added them to `groceryProducts.ts` in the correct shape, reverse-
   deriving each item's real package size from its original totals rather
   than inventing new numbers. `GroceryProduct` total: 2 → 19 rows. Full
   writeup: `reference/research-sessions/2026-08-31-grocery-product-
   migration.md`. Local build couldn't finish in this sandbox (same
   resource constraint as before) — `tsc --noEmit` and a runtime integrity
   check both passed clean; confirm via the next Vercel deploy.
2. ~~**Watch the first few automated runs before trusting the pipeline
   unattended.**~~ — **Done 2026-08-31.** Reviewed every commit + uncommitted
   change from the first overnight runs since re-enabling. Automation held
   the never-fabricate rule correctly throughout (see McCafe/content-queue
   entries above). Found one real gap: legitimate output was sitting
   uncommitted alongside 14 ephemeral debug scripts — committed the former,
   deleted the latter (`e48d28f`). **The pipeline does not fully self-tidy**
   — periodically check for and commit stray automation output; it won't
   reach production otherwise.
3. ~~**Turn on Vercel Web Analytics**~~ — **Done 2026-09-25** (commit
   `44c472c`). Enabled on the free Hobby tier + added the
   `@vercel/analytics` code integration to `layout.tsx` (dashboard
   enablement alone doesn't inject a tracking script). See
   `2026-09-25-vercel-web-analytics-integration.md`. Data won't show until
   this deploys — needs the standing `git pull && git push`.
   No code change, just a dashboard toggle (no API/tool can do this from
   here), and it blocks every data-informed growth decision after it —
   including whether the now-automated content posts are doing anything.
4. ~~**Per-brand/per-dish SEO pages**~~ — **Done and LIVE as of 2026-08-31.**
   `/brand/[id]` (1,747 pages) and `/brand/[id]/[itemId]` (2,552 pages), plus
   `sitemap.ts`/`robots.ts`. Confirmed on Vercel: commit `b6efd11` deployed
   `READY`, build completed in 1 minute, all 4,305 pages generated; spot-
   checked live (`/brand/mcd/mcd_big_mac`, `/sitemap.xml`, `/robots.txt` all
   serving correctly). `ScreenerTable.tsx` links through to them. Vercel
   Analytics (still off, item 3 above) is the only way to later tell whether
   it's driving traffic.
5. ~~**Verify the two still-open UI findings**~~ — **Done 2026-08-31**, see
   the launch-readiness review above: grocery-ingredients issue confirmed
   present and escalated to item 1; mobile table reflow confirmed present,
   kept as lower-priority polish (item 6 below).
6. ~~**Mobile table reflow**~~ — **Done 2026-09-25** (commit `146523e`) —
   see item 21. Card layout below the `md` breakpoint, table unchanged
   above it.
7. **Recurring stale git lock from scheduled tasks — now happened a third
   time, worth investigating rather than just clearing.** `.git/index.lock`/
   `HEAD.lock` found stale at 2026-08-31 ~03:21, 2026-09-01 ~12:10, and again
   2026-09-01 ~20:10 — all three within 1-6 hours old, no process actually
   running, all three safe to clear. Two of the three times (~12:10 and
   ~20:10) line up closely with `platescreen-research-branches`'s 3x/day
   schedule (4am/12pm/8pm), which is a real pattern, not noise — worth
   checking that task's commit step specifically for something that could
   leave a lock behind on a crash/timeout (e.g. a killed process mid-`git
   commit`) rather than continuing to just clear the lock each time it's
   found. Still not urgent — caught and cleared within hours every time so
   far — but the failure mode if unnoticed (every subsequent commit,
   including the user's own manual pushes, silently blocked) is bad enough
   to actually fix the root cause rather than keep treating the symptom.
   **2026-09-02 update (escalating further):** a `platescreen-research-restaurants` run hit both
   `.git/index.lock` and `.git/HEAD.lock` stale simultaneously (~7h old, no process holding
   either) and this time **could not clear them at all** — `rm`/`os.remove` failed with
   `Operation not permitted` on any file inside `.git/` in that run's sandbox, not just the two
   stale locks (confirmed with a throwaway self-created test file). Worked around the index lock
   via `GIT_INDEX_FILE` pointed at a temp path, but the ref-update step still needed
   `HEAD.lock` and failed the same way, so that run's commit was left undone — changes sit
   uncommitted in the working tree instead (see
   `reference/research-sessions/2026-09-02-restaurant-track-run3-bare-licensee-sweep.md`). Repo
   integrity re-checked and unaffected (`HEAD` unmoved, `git fsck` clean). This is a materially
   worse instance than the three above (previously always clearable by the finding session) —
   worth prioritizing the root-cause investigation rather than continuing to treat this as a
   clear-and-continue nuisance; a fix on the user's own machine (deleting the two lock files via
   Windows Explorer, which isn't subject to the Linux sandbox's delete restriction) will unblock
   the next scheduled run in the meantime.
   **2026-09-04 side-finding (not a fix, just a sharper diagnosis):** while committing unrelated
   data work, this run's sandbox hit the same `Operation not permitted` on `.git/index.lock` — but
   found that `mv`/rename of the lock file (to a throwaway name) succeeds even when `rm`/unlink of
   the exact same file fails. Every subsequent `git` command (status/add/commit) then recreated its
   own transient `index.lock` / `HEAD.lock` / `objects/*/tmp_obj_*` files and failed to clean them
   up afterward (visible as `warning: unable to unlink ...` on otherwise-successful commands) —
   git tolerated this as non-fatal for `add`/`commit` (both still exited 0 and the commit is real,
   see item 12's third follow-up), but any command that needs the *old* lock gone first (like a
   fresh `git status` right after a crash) hard-fails until it's renamed out of the way first. This
   suggests the underlying filesystem (likely the OneDrive-sync layer under
   `C:\Users\mchoo\OneDrive\Desktop`) disallows `unlink()` on files it's tracking but allows
   `rename()` — which would explain both why locks accumulate as `.bak`/`.stale`/`.old` files
   instead of disappearing, and a workaround: **rename the stale lock out of the way (not `rm` it)
   immediately before each git command**, rather than deleting it, for any future session that
   needs to unblock a commit here without shell-level filesystem changes. Not implemented as a
   permanent fix (would belong in the scheduled tasks' own commit-step code, out of scope for a
   pure-data-quality task) — just recording the sharper diagnosis for whoever picks up the actual
   fix.
   **2026-09-06 confirmation (rename workaround verified end-to-end):** the
   `platescreen-sync-to-stride` scheduled run hit both `.git/index.lock` and `.git/HEAD.lock`
   stale again (~3h old, `fuser` confirmed no process holding either, `rm` failed with the same
   `Operation not permitted`). Applied the 2026-09-04 diagnosis directly — `mv`'d both lock files
   to `.stale-20260906` suffixed names instead of deleting them — and it worked cleanly: `git add`
   and `git commit` both then succeeded (commit `46de84a`), with only non-fatal
   `warning: unable to unlink ...` noise on the transient lock/tmp_obj files git itself creates
   and discards per-command. Repo integrity re-checked after (`git fsck` clean aside from expected
   dangling objects from the earlier aborted attempt, `HEAD` advanced correctly, working tree
   clean). This is now confirmed as a reliable unblock, not just a diagnosis — worth promoting
   from "recorded for whoever picks up the fix" to an actual first step in any future session's
   commit routine here: check for `.git/{index,HEAD}.lock` before `git add`/`commit`, and `mv`
   (never `rm`) them out of the way if stale, before falling back to anything more invasive.
   **2026-09-08 reconfirmation:** the `platescreen-improve-app` run hit the same stale-lock pair
   again (`.git/index.lock`/`.git/HEAD.lock`, ~5-7h old, `fuser` confirmed no holding process) —
   this time left behind by the 2026-09-07 mccafe-colocation 13th-pass run, whose own commit had
   failed the same way and left a note append + 2 files uncommitted. Applied the rename workaround
   again (`mv` to `.stale-20260908` suffixes) and it worked cleanly; committed the pending output
   (`6ee3de8`) with the same non-fatal `unable to unlink ...tmp_obj_*` warnings as 2026-09-06, no
   fatal errors. Continues to hold up as a reliable unblock.
8. **Decide on task #29** (Google Maps/Street View escalation for the ~12
   remaining SFA-licensee-name brands text search can't identify) — either
   commit to doing it (needs a visual-identification workflow this session
   doesn't have) or explicitly accept those ~12 brands as permanently out of
   scope for menu coverage.
7b. **2026-09-02 update (partial unblock)**: this session had the in-app
   Browser pane actually connected (unlike every automated
   `platescreen-research-branches` run to date, which is unattended and
   has repeatedly hit a "zero connected browsers" wall — see item 7's
   git-lock note for the same class of unattended-session limitation).
   Used it to resolve two stuck `branchQueue.ts` entries: `bonchon`
   (checked all 5 candidate malls' own official directories directly —
   PLQ, Compass One, Wisma Atria, Hillion Mall, Northpoint City — zero
   hits on all 5, directly contradicting an aggregator-sourced "5 active
   locations" claim; real footprint may genuinely just be the 1 confirmed
   Bugis+ outlet) and `dosirak` (Suntec City's B1-172 is "Bibim Deli", not
   Dosirak; 313@Somerset's full-catalog search returns zero for both
   "Dosirak" and "Bibim" — both leads now resolved-negative). No new
   Premises rows added, but both entries went from "blocked, needs a
   browser" to "leads exhausted, browser used." bonchon.sg itself remains
   blocked even with a connected browser (site-specific, not the general
   gate). Full writeup: `reference/research-sessions/2026-09-02-bonchon-
   dosirak-browser-unblock.md`. This suggests item 8's Google Maps/Street
   View escalation (and the branchQueue's other browser-dependent leads)
   may also be workable in a future interactive session — worth trying
   directly rather than assuming it's permanently out of scope.
9. ~~**Diet-tag coverage decision**~~ — **Done 2026-09-01** (commit
   `e4ee1fa`). Classified all 1,234 untagged MenuItems against CLAUDE.md
   5.1's exact rules: 42% were correctly untagged (skip-list or pork/offal-
   named), 40% are genuinely ambiguous and left alone, 18% (216 items) were
   real gaps. Backfilled 211 of those 216 (5 excluded after manual review
   caught a keyword-matching false positive — see the writeup). Coverage:
   51.6% → 60.0%. Full reasoning + a script bug caught and fixed mid-batch:
   `reference/research-sessions/2026-09-01-diet-tag-coverage-audit-and-
   backfill.md`. Flagged two follow-on opportunities *not* done in this
   pass: halal tagging for the Indonesian/Malay + Indian buckets (a
   different, riskier heuristic than "named protein"), and vegetarian
   tagging for ~44 plain coffee/tea beverage items (unambiguous but outside
   this pass's scope) — both need their own human decision before acting.
9b. ~~**Halal tag audit (follow-on from item 9)**~~ — **Done 2026-09-01.**
   Reviewed all 77 untagged `Indonesian/Malay` + `Indian` MenuItems
   individually (conservative, higher bar than the named-protein pass
   above, since a mislabeled halal tag is a religious-compliance claim, not
   just an ingredient guess). Tagged 54 as `['halal', 'no_pork']`: canonical
   Malay/Muslim dishes (Nasi Lemak, Ayam Penyet, Roti Prata, Mee Rebus/Soto,
   Rendang, Nasi Padang, Indian [Muslim] Rojak, etc.) regardless of stall
   name, plus biryani/naan/fusion dishes only where the brand name itself
   carried an explicit Muslim/Malay/Indonesian signal. Left 23 untagged:
   anything "Vegetarian"-branded (Hindu-coded, not halal-inferable),
   South Indian Hindu-tradition dishes (Masala Dosa, Banana Leaf Rice),
   "Nyonya"/Peranakan items (genuinely mixed halal status), Chinese-named
   stalls selling nominally Malay dishes, and generic/fusion items with no
   positive signal either way. Coverage: 60.0% → 62.1%. Full reasoning:
   `reference/research-sessions/2026-09-01-halal-tag-audit-malay-
   indonesian-indian.md`. Still open: whether "Vegetarian"-branded Indian
   items should get a separate `vegetarian` tag, and whether "Nyonya" items
   deserve dedicated per-item research — both flagged as human decisions,
   not acted on.
9c. ~~**Vegetarian tag backfill for beverages (2nd follow-on from item
   9)**~~ — **Done 2026-09-01.** Tagged 44 plain coffee/tea/espresso items
   (Starbucks Frappuccino/Espresso Beverages + independent kopitiam
   Kopi/Teh/Coffee counters) `vegetarian` — dairy-based but zero-meat, not
   tagged `vegan`. Coverage: 62.1% → 63.9%. Full reasoning:
   `reference/research-sessions/2026-09-01-vegetarian-tag-backfill-
   beverages.md`. This closes out both follow-on items the original
   diet-tag audit flagged as needing their own pass.
10. ~~**Grocery SKUs**~~ — **Partially done 2026-08-31.** The 17 FairPrice
    items that used to be misshapen MenuItems are now proper GroceryProduct
    rows (19 total, up from 2) — see item 1. Real per-package research for
    Cold Storage/Giant/Sheng Siong/Don Don Donki, and a UI to actually
    display GroceryProduct data (none exists yet — these 19 rows aren't
    shown anywhere in the app), remain unstarted.
    **2026-09-05 attempt (still unstarted, not for lack of trying):** tried
    adding a first SKU for one of these 4 chains (Milo 3-in-1). Found real,
    admissible per-100g macros via OpenFoodFacts (barcode 9556001217233,
    confirmed sold in Singapore) but could not find an admissible *price* for
    the same exact package size at any of the 4 target chains — WebSearch
    only surfaced a forum post (unverifiable pack size/date) and a different
    pack-size variant, and no retailer's own product page was fetchable
    (`web_fetch`'s provenance restriction blocks constructed URLs). Declined
    to guess/mix mismatched-SKU data rather than force an entry. Flagged as
    likely needing a connected-browser session (per the 2026-09-02 Bonchon/
    Dosirak precedent) to read a retailer's own site directly. See
    `reference/research-sessions/2026-09-05-improve-app-git-backlog-and-
    integrity-sweep.md`.
11. ~~**Vegetarian tag backfill for "Vegetarian"-branded stalls**~~ — **Done
    2026-09-02.** Closes the last open follow-on flagged in the 2026-09-01
    halal audit (whether "Vegetarian"-branded Indian items should get a
    `vegetarian` tag). Extended dataset-wide: 15 items across 11 explicitly
    "Vegetarian"-named stalls tagged `['no_pork', 'vegetarian']` after
    individual manual review. Full reasoning:
    `reference/research-sessions/2026-09-02-vegetarian-tag-backfill-
    branded-stalls.md`. The run that applied this change had its sandbox
    shell become fully unresponsive partway through verification and left
    it uncommitted; a later same-day interactive session (which also fixed
    the recurring stale git-lock issue, see item 7) synced the mirror, ran
    `tsc --noEmit` (clean) and the runtime integrity check (0 duplicate
    ids, 0 orphaned brandIds, all 15 candidates confirmed tagged), and
    committed it. Coverage: 63.9% → 64.5% (1,634 → 1,652 of 2,562
    MenuItems — item count also grew slightly from other same-day research
    task additions).
12. ~~**Duplicate-brand cleanup (SFA-licensee-suffix brands)**~~ — **Done
    2026-09-02.** A live audit found 60 Brand rows whose display name was
    the raw SFA licensee/corporate name (e.g. "Mcdonald'S Restaurants Pte.
    Ltd.", "Cold Storage Singapore (1983) Pte Ltd") rather than a real
    trading name — 32 of these were exact duplicates of a chain that
    already had its own proper Brand row elsewhere (`cold_storage` x16,
    `mcd` x4, `bengawan_solo` x3, `pizza_hut` x2, `dominos` x2, `cheers`
    x2, `breadtalk` x2, `kfc` x1), meaning the same real-world outlet was
    represented twice under two different Brand ids. Merged all 32: their
    single Premises row was repointed to the correct existing Brand id
    (not duplicated), any MenuItems repointed the same way, and the 32
    duplicate Brand rows deleted. Verified 0 duplicate ids and 0 orphaned
    brandIds across Brands/Premises/MenuItems afterward, and confirmed
    each target brand's premises/menuItem counts grew by exactly the
    expected amount. **Follow-up fix same day**: a live UI review caught
    that the merge had created 4 same-brand duplicate-dish groups (e.g.
    McDonald's "Big Mac" appeared twice with conflicting values) where a
    merged item's name collided with the target brand's existing catalog
    — the original merge only checked for duplicate *ids*, not name
    collisions. Removed the 5 redundant lower-confidence rows, keeping the
    better-sourced entry in each group; MenuItems 2,562 → 2,557. See
    `reference/research-sessions/2026-09-02-menu-item-dedup-post-merge.md`.
    **Second follow-up same day**: re-checking for the equivalent bug at
    the *location* level found 28 duplicate Premises rows — 4 more caused
    by this same merge (a merged brand's premises turned out to be the
    same physical outlet as one the target brand already had) plus 24
    **pre-existing, fully byte-identical duplicates** unrelated to this
    merge, dating back to the 2026-08-22 Kopitiam stall-sitemap scrape.
    Removed all 28; Premises 4,683 → 4,655. See
    `reference/research-sessions/2026-09-02-premises-duplicate-cleanup.md`.
    Flagged: the other large batch-scraped brand sets (Koufu, Fei Siong,
    hawker-centre batches) haven't been swept for this same pattern.
    **Third follow-up, 2026-09-04**: ran the same `(brandId, normalized
    address)` duplicate check dataset-wide (a superset of the Koufu/Fei
    Siong/hawker-centre scope flagged above) — those three batches came back
    clean. Found 2 duplicate groups elsewhere, both `subway` (same SFA
    licence number, same address, differing only in coordinate precision and
    a franchise-operator name change over time). Removed the 2
    lower-precision duplicates, kept the higher-precision bulk-geocoded rows.
    Premises 4,655 → 4,653. This closes out the sweep recommendation above.
    See `reference/research-sessions/2026-09-04-dataset-wide-duplicate-
    premises-sweep.md`.
    The remaining ~28 "Pte Ltd"-named Brand rows were reviewed but NOT merged — they don't match any existing brand (likely
    genuine standalone businesses whose corporate name leaked into the
    display name) and are left for a future display-name cleanup pass,
    not a duplicate-merge one. Full reasoning: `reference/research-
    sessions/2026-09-02-duplicate-brand-merge.md`.

13. ~~**Search box: apostrophe-insensitive + multi-word/cross-field
    matching**~~ — **Done 2026-09-13.** Asked to review and improve the
    screener search feature. Found the search box (`filters.q`) and
    location search (`filters.location`) did plain `.includes()` matching,
    which silently failed for any of the 65 brand names (of 1,724) that
    contain an apostrophe — McDonald's, Domino's Pizza, Nando's, Dunkin',
    Carl's Jr., Auntie Anne's, etc. — since typing "mcdonalds" (the
    near-universal no-apostrophe convention) returned 0 results. Also fixed
    a smaller gap: multi-word queries spanning two fields (e.g. "big mac
    mcdonalds") matched nothing because the whole query string was checked
    against each field independently. Added `normalizeSearchText()` +
    `matchesQuery()` to `screener.ts` (strip apostrophes, punctuation ->
    space, token-AND match across any number of fields) and rewired
    `applyFilters`/`applyUncoveredFilters` to use them. Verified: `tsc
    --noEmit` clean, live re-run against current data (2,647 menu-item
    rows) confirms mcdonalds 0->56, dominos 0->13, nandos 0->18, "big mac
    mcdonalds" 0->1 (correct row), plain searches unchanged (chicken rice:
    128, laksa: 28). No data files touched -- pure filter-logic change. See
    `reference/research-sessions/2026-09-13-search-apostrophe-and-
    multiword-fix.md`.

14. **Launch-readiness review + growth review, 2026-09-14 — session hit a
    sandbox shell outage partway through.** (The 3 code findings below —
    mobile reflow, dietTags filter-wiring, GroceryProduct UI — were fixed
    2026-09-25, see item 21.) Confirmed the 2026-09-13
    search fix is live in production (Vercel API showed `origin/main` had
    already moved to a newer automated commit than this session's own
    last local commit — something else pushed in the meantime). Live
    re-checks confirmed 3 standing items are all still open:
    `GroceryProduct` UI (item 2 above), mobile table reflow (item 6,
    re-measured: 2,013px table in a 335px mobile container), and
    `Brand.dietTags` (item 1 above) — which turned out to be **half-fixed
    since 2026-09-02**: some automated task wired it into brand-page
    display (confirmed live: McDonald's page shows a "halal" badge from
    `brand.dietTags`), but it's still not read by `applyFilters` in
    `screener.ts`, so it doesn't affect the Halal/Vegetarian/etc. filter
    buttons yet.
    **Growth check**: Vercel Web Analytics still off (needs the account
    owner to flip it on — no code/build required, just a dashboard
    toggle). Both growth scheduled tasks (`platescreen-post-copilot`,
    `platescreen-comment-copilot`) are correctly stalled, not broken —
    per their own 2026-09-13 digests, 97%+ of the database is `estimated`
    confidence, so every planned content angle fails their own
    "publicly-defensible" bar. The actual unlock is sourcing 2-3 more
    chains' official nutrition data (KFC/Burger King suggested), not a
    prompt or code fix to those tasks.
    **No code shipped this session**: the sandbox's Linux shell (git,
    tsc, node scripts) went down mid-session — a platform-level issue per
    its own error message ("A Windows update released September 8
    prevents Claude's workspace from reaching your files"), confirmed
    dead across 4 identical retries. Shipping the mobile-reflow/
    GroceryProduct-UI/dietTags-filter-wiring fixes without any way to
    verify `tsc`/build would break this project's own verification
    discipline, so they're documented as the next session's top 3 instead
    of attempted blind. This ROADMAP edit and its companion report are
    plain file edits — **not committed**, since git wasn't available
    either. See `reference/research-sessions/2026-09-14-launch-
    readiness-review-and-shell-outage.md` for full detail, including why
    a next session should `git pull` before any git operation (origin
    has moved since this repo's last known local commit).
15. **2026-09-15 — sandbox disk exhaustion reconfirmed (worse than 2026-09-07/08); backlogged
    automation output reviewed and committed instead of forcing new data work.** This session's
    `platescreen-improve-app` run hit `/sessions` 100% full again — this time `mkdir` itself
    failed with `ENOSPC` before `npm install` could even be tried, and `mount` showed `/sessions`
    is shared across multiple concurrent Cowork sessions, a sharper diagnosis than the earlier
    "OneDrive folder size" guess (see the disk-exhaustion callout above for full detail). Tried
    relocating the build mirror to the `outputs` fuse mount (62G free there) as a workaround —
    `npm install` and even plain `du`/`rm -rf` hung past a 3-minute timeout, so a fuse-mounted
    mirror is not viable; **ruled out**, not just untried. Found a partial substitute instead:
    Node 22's native TS type-stripping can `import` `brands.ts`/`premises.ts`/`menuItems.ts`/
    `operators.ts` directly with no `npm install` at all, giving a real (non-fabricated)
    duplicate-id / orphaned-FK / diet-tag-coverage / price-outlier check — everything CLAUDE.md
    section 6 calls the "runtime integrity check" — without `tsc`. Used this to review and verify
    several days' worth of backlogged, already-written automation output sitting uncommitted in
    the working tree (2 new Brands + Premises + 9 MenuItems from `platescreen-research-restaurants`
    covering `the_neighbourwok_fried_hokkien_prawn_mee_clementi_mall` and
    `hup_hong_chicken_rice_tang_plaza`, plus queue-status note updates, a Post-Copilot digest, and
    several research-session reports) — manually read every data diff for section 5 sourcing-rule
    compliance (all sourced: HungryGoWhere/TANGS store directory/foodpanda listings, macros
    calibrated against this project's own existing Chicken Rice calibration values, never
    invented) and ran the lightweight integrity check (0 duplicate ids, 0 orphaned brandIds, 0
    orphaned operatorIds, 0 price outliers across 1,726 brands / 4,662 premises / 2,656 menu
    items — full output in the report below). Committed rather than left stranded, since the
    content itself was sound even though full `tsc`/build verification stayed unavailable.
    **Deliberately did not author any new hand-typed data-quality change this pass** — the
    lightweight check substitutes for the runtime-integrity step but not for real type-checking,
    so authoring new data blind (vs. reviewing/committing already-written data) would risk a
    type-level mistake this check can't catch. Full script, output, and reasoning:
    `reference/research-sessions/2026-09-15-improve-app-disk-exhaustion-and-automation-
    reconciliation.md`.
16. **2026-09-16 — diet-tag categorical-exclusion audit (2 fixes) + real disk-exhaustion fix
    (not just a substitute).** Found that mirroring to `/tmp/<name>` (root disk, separate from the
    100%-full `/sessions` disk that `$HOME`/`~/build` live on) and pointing npm's cache at
    `/tmp/npm-cache` lets `npm install` and a real `npx tsc --noEmit` succeed — the first genuine
    `tsc` pass since 2026-09-08; `npm run build` got through compiling/type-checking/generating all
    4,397 static pages and only hit `ENOSPC` at the final export-copy step (disk-size limit, not a
    content problem). See the disk-exhaustion callout above for the full recommendation to future
    sessions. Used the now-real `tsc` pipeline to audit every MenuItem against CLAUDE.md 5.1's
    pork/offal categorical-exclusion rule (8 named dishes that should carry no `compatibleWith`
    array at all) — found and fixed 2 genuine violations (`lps_fx_herbal_bkt`, `gmfc_bak_kut_teh`,
    both literally named "Bak Kut Teh," both had spurious `lactose_free`/`gluten_free` tags).
    Reviewed 9 other skip-list keyword matches and 39 vegetarian/egg keyword matches and confirmed
    all correct (explicit-protein or ovo-vegetarian conventions, not bugs) — no other changes made.
    Flagged 2 borderline cases (`lps_fx_organ_porridge`, `ss_roast_pork` — pork-named but not an
    exact match to CLAUDE.md 5.1's 8-name list) for a human decision rather than extending the rule
    unilaterally. Coverage: 1,733 → 1,731 tagged MenuItems (65.0%, item count also grew slightly
    from other same-day automation). Full reasoning, verification output, and the disk-workaround
    detail: `reference/research-sessions/2026-09-16-diet-tag-categorical-exclusion-audit-and-
    disk-workaround.md`.

17. ~~**2026-09-17 backlog reconciliation**~~ — **Done 2026-09-17.** Landed several days' worth
    of legitimate same-day (2026-09-16) automation output that a recurring stale git lock had
    blocked from being committed — see the callout above and
    `reference/research-sessions/2026-09-17-improve-app-backlog-reconciliation.md`. No new
    hand-authored data change; this was verification + housekeeping only.

18. ~~**2026-09-18 backlog reconciliation**~~ — **Done 2026-09-18.** Same shape of issue recurred
    within ~13 hours of item 17: a fresh stale git lock pair had blocked a same-day (2026-09-17)
    `MenuItem` addition, a `Premises`-track notes update, and 6 session reports/digests from
    committing. Reviewed and verified all of it (real `tsc --noEmit` + runtime integrity check, 0
    duplicate ids / orphaned refs / price outliers), cleared the locks via the standing
    rename-workaround, and committed as `2372bbf`. Menu items 2,668 → 2,672; diet-tag coverage
    64.9% → 64.8% (denominator shift only, no tag edits). No new hand-authored data change — see
    `reference/research-sessions/2026-09-18-improve-app-backlog-reconciliation.md`. This is now the
    3rd `improve-app` run in a row (2026-09-15, -17, -18) whose entire scope was reconciling
    automation backlog rather than authoring new data — worth a human considering whether the
    underlying git-lock root cause (item 7) should be prioritized over continuing to treat each
    recurrence as a fresh housekeeping pass.

19. ~~**2026-09-19 backlog reconciliation + vegetarian dessert/beverage diet-tag backfill**~~ —
    **Done 2026-09-19.** Two parts: (a) landed a small automation backlog from the same recurring
    stale-git-lock pattern as items 15/17/18 (Bonchon SFA-live-API investigation notes + 2 reports,
    committed `bbce95d`) — new finding: `.git/` has accumulated ~150 zero-byte stale-lock artifact
    files since 2026-08-10 that can't be deleted from any sandbox session (same `unlink`
    restriction as the locks themselves), worth a human clearing directly via Windows Explorer at
    some point; and (b) attempted ROADMAP item 10 (GroceryProduct chain expansion) again — still
    blocked (`web_fetch` hits an Incapsula bot-challenge on `shengsiong.com.sg`, Browser pane access
    declined at session level) — then pivoted to a real diet-tag coverage pass: re-ran the
    2026-09-01 "named protein" heuristic against the current 947-item untagged pool (grown
    substantially since 2026-09-01) and manually excluded all 7 candidates it found (misspelled
    "suasage", a glutinous-rice dish with hidden-pork risk analogous to the Claypot Rice skip-list
    entry, and 3 items at a brand whose own sourcing comment confirms pork-lard broth — exactly the
    kind of false positive manual review exists to catch). Found a cleaner pattern instead: 14
    unambiguous vegetarian desserts/beverages (Cheng Teng, Soya Bean Drink, Chendol, Tang Yuan
    Peanut Soup, Cut Fruits, muffins, You Tiao, Fried Banana) sitting as un-reviewed
    `compatibleWith: []` placeholders across 12 kopitiam/hawker-centre brands, extending the
    already-approved 2026-09-01 beverage-backfill reasoning (item 9c) rather than introducing a new
    policy. Tagged all 14 `["no_pork", "vegetarian"]` (Cut Fruits also got `vegan`), after
    individually excluding adjacent ambiguous items (Curry Puff, Xiao Long Bao and close analogs,
    Carrot Cake variants, Cheong Fun, generic Dumplings/"Dim Sum", generic "Bread"). Also ran a
    fresh macro-sum consistency check (stated calories vs. protein/carbs/fat math) for the first
    time since 2026-09-16 — 0 outliers, dataset clean on that axis. Coverage: 64.9% → 65.4%. Full
    detail: `reference/research-sessions/2026-09-19-improve-app-vegetarian-dessert-backfill.md`.

20. ~~**2026-09-20 backlog reconciliation + fresh integrity re-check**~~ — **Done 2026-09-20.** Same
    recurring shape as items 15/17/18/19: a fresh stale `.git/index.lock`/`.git/next-index-3.lock`
    pair (confirmed stale via `fuser` + process check) had blocked a same-day (2026-09-19)
    `branchQueue.ts` notes update and 2 new research-session reports (bonchon 3rd branches run,
    mccafe 27th grocery-track pass) from committing. Reviewed every diff for section 5/5.1
    compliance (all clean — notes-only, no fabricated data, no new Premises/MenuItem rows), cleared
    the locks via the standing rename-workaround (including one additional collision when `git
    commit` itself couldn't clean up its own transient lock — same class of issue as the 2026-09-04
    finding), and committed as `7bd785e`. Attempted the `/tmp`-mirror real-`tsc` verification
    recommended 2026-09-16, but hit a new variant of the disk-pressure problem: `npm install` made
    real progress (0 → 337 packages) but never finished within this sandbox's ~178s per-command
    execution cap across 3 attempts, consuming `/dev/sda1` free space from 2.0G → 1.4G in the
    process — stopped and freed the space rather than continuing. Fell back to the documented Node
    22 native-TS-type-stripping substitute for a real (non-fabricated) integrity re-check instead: 0
    duplicate ids / 0 orphaned refs / 0 price outliers / 0 macro-sum outliers across all 5 data
    arrays, and a genuine improvement surfaced by re-tallying zero-menu brands for the first time
    since 2026-09-16: 42 → 35 (from other same-day/same-week research-track automation, not this
    pass). No new hand-authored data change this pass, consistent with not having real `tsc`
    available to verify one. Full detail: `reference/research-sessions/2026-09-20-improve-app-
    backlog-reconciliation-and-integrity-check.md`.

21. ~~**2026-09-25 — all 7 scheduled tasks paused; the 3 code-level launch-
    readiness fixes from item 14 landed**~~ — **Done 2026-09-25.** Direct
    request: "stop all scheduled, it is not working, I want to launch it."
    Paused (not deleted) `platescreen-research-restaurants`,
    `-research-grocery`, `-sync-to-stride`, `-research-branches`,
    `-post-copilot`, `-comment-copilot`, `-improve-app` — recoverable via
    `enabled: true` later. Confirmed via the Vercel API this was the right
    call independent of the request: `mccafe_colocation_research` had run
    **28 consecutive scheduled passes** since 2026-08-30 reaching the
    identical "blocked on a human decision" conclusion every time (see
    `2026-09-25-mccafe-colocation-28th-pass.md`) — real waste, not a false
    alarm. Also found and cleared ~228 stray `.git/*.lock.bak-*`/`.stale-*`/
    `.old*` quarantine files accumulated from the project's own rename-not-
    delete stale-lock workaround (76K total — not the disk-exhaustion
    cause, just cleanup debt) and landed 3 backlogged automated-task
    outputs blocked by a stale lock (bonchon branches reconfirmation,
    stride-sync report, mccafe 28th-pass report).
    Then landed the three item-14 code fixes with full `tsc`+build-mirror
    verification (sandbox shell had recovered by this session): **mobile
    card reflow** (`ScreenerTable.tsx` — `hidden md:block`/`md:hidden`
    split, commit `146523e`), **`Brand.dietTags` wired into `applyFilters`**
    (`screener.ts`, commit `f0ec14f` — caught and fixed a real safety bug
    in testing: a naive OR let "BreadTalk / Pork Floss Bun" surface under
    the halal filter before a name-conflict guard was added; see
    `2026-09-25-diettags-filter-wiring.md`), and a **new Pantry section**
    surfacing the 19 `GroceryProduct` rows (`GroceryList.tsx`, commit
    `b743031` — see `2026-09-25-grocery-product-pantry-ui.md`). Item 14's
    4th recommendation (source official nutrition PDFs for 2-3 more
    chains) remains the standing, non-code unlock for the growth-content
    tasks once they're re-enabled.
    **Vercel Web Analytics remains OFF** — confirmed free on this account's
    Hobby plan (50k events/month included, no charge ever on overage, just
    a pause) and offered to enable it; user held off for now ("keep it
    free" — already true either way, but respected the explicit no).
    Local repo was ~30 commits ahead of `origin/main` at the start of this
    session (confirmed via the Vercel deployment API, not assumed) —
    unchanged by this session's own work, since this sandbox has never had
    push credentials; see the standing `git pull && git push` handoff.

## Not started, lower priority

- A public feedback mechanism (even a footer `mailto:` or a linked form) —
  flagged as missing in the retired launch guide; status not re-checked.

## Historical / superseded, moved to archive/ (2026-08-30 restructure)

Since the six scheduled tasks are being redone from scratch anyway (priority
1 above), the old path-dependency that previously forced some dated docs to
stay in place is gone. `reference/planning/` now has clean-named, current
files at its root, with everything superseded moved to `archive/` rather
than deleted:

- `SCHEMA_HISTORY.md` (new) replaces `database-restructure-proposal-2026-08-20.md`
  (**DONE** — the Brand/Premises/MenuItem split it proposed was implemented;
  full original reasoning preserved in `archive/`).
- `GROWTH_STRATEGY.md` (new) replaces `growth-strategy-2026-08-22.md` — same
  strategic reasoning, current numbers instead of the stale "776 brands,
  growing 3x/day."
- `CONTENT_QUEUE.md` (new) replaces `growth-content-ideas.md` — identical
  content queue, just renamed.
- `launch-guide-2026-08-22.md` and `AUTOMATION_PROPOSAL.md` — retired
  entirely (their substance already lives in the sections above), moved to
  `archive/` rather than deleted.
- The 3 old scheduled tasks that referenced the pre-2026-08-30 file paths
  (`platescreen-research-restaurants`, `platescreen-post-copilot`,
  `platescreen-comment-copilot`) had their prompts updated to point at the
  new filenames — see each task's own definition for the current reference.

---

## How to pick this up in a fresh session

1. Read `../../CLAUDE.md` in full (architecture + the "never fabricate" rule
   + diet-tag rules + the batch verification pipeline).
2. Read this file.
3. Skim the 3-5 most recent files in `../research-sessions/` (sorted by
   filename date) for anything-in-flight context this file doesn't capture.
4. Check the in-app Cowork task list for granular in-progress items, and
   `mcp__scheduled-tasks__list_scheduled_tasks` for the six PlateScreen
   automations above — both carry state this file doesn't duplicate.
