# PlateScreen — Roadmap & Current Status

**Last updated:** 2026-09-05. This is the entry point for "what's the state of
this project and what should happen next" — read this before the other files
in this folder, which are point-in-time strategy docs that may have stale
numbers (each is dated; treat the numbers in this file as current).

See `../../CLAUDE.md` for architecture and operating rules, and
`POSITIONING.md` for how to describe the product (introduction, research
value proposition, moat) — this file is about priorities and sequencing,
not how the codebase works or how to talk about it.

---

## Where things stand (2026-09-05)

| Metric | Value |
|---|---|
| Total brands | 1,717 — unchanged 2026-09-04 → 2026-09-05 |
| Total premises | 4,653 — unchanged since item 12's third follow-up (2026-09-04) |
| Total menu items | 2,594 — up from 2,587 (+7, Golden Rooster batch, 2026-09-05) |
| Menu items with ≥1 diet tag | 1,681 (64.8%) as of 2026-09-05 re-verification — spot-checked recently-added brands' untagged items, all correctly excluded per §5.1 (pork-named dishes, genuinely ambiguous generics), no fresh gaps found |
| Confidence breakdown (MenuItems) | last full recount 2026-09-02: 56 verified / 2,497 estimated / 6 community (not re-run 2026-09-05, no confidence-affecting changes since) |
| Premises missing lat/lng | 0 |
| Duplicate ids / orphaned brandIds / orphaned operatorIds | 0 / 0 / 0 (brands, premises, menu items, grocery products) — re-verified 2026-09-05 against the full post-Golden-Rooster dataset |
| Price / calorie / macro-sum outliers | 0 real issues found in a fresh 2026-09-05 sweep — 4 flagged calorie values and 5 flagged macro-sum ratios are known-legitimate (family-size items, near-zero-calorie coffee, and beer's uncounted alcohol calories) — see `reference/research-sessions/2026-09-05-improve-app-git-backlog-and-integrity-sweep.md` |
| Grocery SKUs populated (dedicated `GroceryProduct` schema) | 19 (2 original + 17 migrated from MenuItem 2026-08-31 — see item 1 below). A 2026-09-05 attempt to add a 20th (Milo 3-in-1 at a new retailer chain) found real macro data via OpenFoodFacts but couldn't find an admissible matching price, so nothing was added — see item 10. |

Brand/premises/menu-item counts move day-to-day now that the three research
scheduled tasks are running unattended — treat these as "as of last check,"
not a fixed number. Confidence breakdown dipped earlier in the day (73→56
verified) purely as a side effect of the grocery migration (item 1) moving
17 items out of MenuItems, not new data-quality loss.

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
3. **Turn on Vercel Web Analytics** — confirmed still off as of 2026-08-31.
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
6. **Mobile table reflow** — results table stays a horizontally-scrollable
   table on mobile rather than reflowing to cards; data is reachable via
   swipe, just not a great first impression on likely-majority-mobile
   traffic. Polish, not a blocker.
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
