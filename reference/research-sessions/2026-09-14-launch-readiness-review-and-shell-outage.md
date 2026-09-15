# 2026-09-14 — Launch-readiness review (UI + growth), shell sandbox outage

## Why

Asked to review the app again and start working toward publishing/launch
and getting more users. Partway through, this session's Linux sandbox
(used for `git`, `tsc`, and node scripts) went down and stayed down across
4 retries:

```
RPC error -1: failed to mount .../uploads as uploads: source path ...
is under Plan9 share "c" which is not mounted; create: RPC error -1:
ensure user: user epic-nifty-feynman already exists unexpectedly
A Windows update released September 8 prevents Claude's workspace from
reaching your files. We're tracking this issue. Claude Code is unaffected.
```

This is a platform-level issue (per the error, tied to a Sept 8 Windows
update), not anything specific to this repo. File tools (Read/Write/Edit)
and the in-app browser still work fully — only the Linux shell (git, tsc,
node/tsx scripts) is affected. This review pivoted to what's verifiable
without it: live production checks via the browser and the Vercel API.
**No `git` commands ran this session — the ROADMAP.md update below is a
plain file edit, not committed.**

## Good news: yesterday's search fix is confirmed live

Checked `platescreen.vercel.app` directly (not the local repo) via the
Vercel API: production is currently serving commit `6929636b...` (a
`platescreen-sync-to-stride` automated commit), which is *after*
`91438f5` — this session's last commit from 2026-09-13 (the search fix +
ROADMAP update). That means an automated task (most likely
`platescreen-sync-to-stride`, whose commit is on top) pushed to
`origin/main` since this session last touched git — worth noting since
this interactive session has never had push credentials itself.

Live-tested directly on `platescreen.vercel.app`:
- `mcdonalds` → 56 results (was 0 before the fix). Confirmed via
  `document.querySelectorAll` + simulated input on the real search box.
- Total menu items live: 2,647 (main screener table) + 42 (pending/
  uncovered-brand table) = 2,689 DOM rows — both numbers are internally
  consistent with the homepage stat cards (`ALL_ROWS.length`,
  `ALL_UNCOVERED.length`), not stale. Checked because the two-table split
  initially looked like a stat-vs-reality mismatch; it wasn't.

## Live UI re-review findings

1. **`GroceryProduct` is still not surfaced.** Clicking the "Grocery"
   outlet-type filter returns 31 rows, but they're ordinary `MenuItem`
   rows for whole retail items (Sheng Siong quarter roast chicken,
   FairPrice rotisserie chicken, Giant bento box) — not the dedicated
   `GroceryProduct` schema (per-100g raw ingredients: rice, oats, chicken
   breast). Same finding as 2026-09-02; still open. This is ROADMAP
   priority-list item 2.
2. **Mobile table still has no card reflow.** Measured directly (375px
   viewport): the results table is 2,013px wide inside a 335px-wide
   scroll container — pure horizontal-scroll, no responsive card layout.
   Same finding as 2026-09-02, now measured with hard numbers instead of
   just visual impression. This is ROADMAP priority-list item 3, and
   arguably the single highest-leverage item for "more users," since
   almost anyone arriving from a shared link or a Reddit/social post will
   be on a phone.
3. **`Brand.dietTags` is partially wired now — a real change since the
   2026-09-02 review.** Checked McDonald's brand page live: it renders a
   "halal" badge from `brand.dietTags` (`brand/[id]/page.tsx` lines
   58-66, `brandPages.ts` lines 72/90). So the *display* half of the old
   "dead code" finding has been fixed by some automated task since
   2026-09-02. However, `screener.ts`'s `applyFilters` (checked directly,
   including in this session's own recent edit) still only reads
   `row.compatibleWith` for the diet-tag filter buttons — `dietTags` is
   not consulted there. So a brand tagged `halal` at the brand level
   still won't surface when a user clicks the "Halal" filter unless its
   individual dishes are also tagged. Half-done, not fully closed.
4. **Search fix verified live** (see above) — closes out yesterday's work
   with a real production check, not just the local build-mirror test.

## Growth / "get more users" review

- **Vercel Web Analytics is still OFF**, confirmed via direct API call
  (`web_analytics_not_enabled`) — this has been flagged since
  2026-08-22/31 and is still the single easiest, zero-risk "get more
  users" prerequisite: without it there's no visibility into whether any
  traffic push is working. This needs the account owner to toggle it on
  in the Vercel dashboard (Project → Analytics → Enable) — I don't have
  Vercel login credentials in this session's browser to do it myself, and
  entering credentials on your behalf isn't something I'll do regardless.
- **The two automated growth tasks are both structurally stalled**, per
  their own most recent digests (`Post-Copilot-Digests/2026-09-13.md`,
  `Comment-Copilot-Digests/2026-09-13.md`, both already in the repo from
  yesterday's automated runs):
  - `platescreen-post-copilot`: 4 consecutive no-draft runs. Root cause
    is the same every time — only McDonald's (53 items) plus a handful of
    other brands (62 total) have `verified`/`community` confidence, so
    every planned content angle (protein/$ rankings, hawker-food claims,
    grocery comparisons) fails the "publicly defensible" bar because
    97%+ of the database is `estimated`.
  - `platescreen-comment-copilot`: found zero qualifying Reddit/forum
    threads in 13 search queries, and separately couldn't act even if it
    had (built-in browser blocks reddit.com by policy; Claude in Chrome
    wasn't connected in that run).
  - **Honest takeaway**: the growth automation isn't broken so much as
    correctly refusing to publish unverifiable claims — which is the
    right call for trust, but means it can't be the actual growth engine
    until there's more `verified` data. The durable fix, per both
    digests, is sourcing 2-3 more chains' official nutrition PDFs (KFC
    and Burger King are named as the best next candidates) — not a code
    or prompt change to the growth tasks themselves.
- **Nothing was posted or drafted by me this session either** — no
  Reddit/social action was taken, consistent with the "explicit
  permission required" rule for any public posting, and there was no
  qualifying content to post regardless.

## What was NOT done this session (and why)

- **No code changes.** Mobile card reflow, `GroceryProduct` UI, and
  wiring `dietTags` into `applyFilters` are all real, valuable,
  reasonably-scoped fixes — but with `tsc`/build verification unavailable
  (shell outage), shipping any of them without the ability to check they
  compile and don't regress the screener would violate this project's own
  verification discipline (CLAUDE.md §6). Recommended as the top 3 items
  for the next session where the shell is working.
- **No `git` operations** — this file and the ROADMAP.md update are
  plain file edits, uncommitted. Nothing needs "pushing" from me since,
  per the Vercel deployment check above, `origin/main` is already ahead
  of what I last saw locally (someone/something else pushed). A future
  session should `git pull` before touching git at all, to pick up
  whatever commit(s) landed after `91438f5`.
- **No full database integrity re-scan** (duplicate ids, orphaned
  `brandId`s, price/macro outliers) — needs node/tsx, unavailable this
  session. Substituted with what the live site itself confirms: 2,647
  menu items, 1,682 outlets, 56 verified, 42 pending, all internally
  consistent between the homepage stat cards and the actual rendered
  tables.
- **Did not attempt to enable Vercel Web Analytics** — needs the account
  owner's login; flagged as a direct action item instead.

## Recommended next steps, in priority order

1. **You**: toggle on Vercel Web Analytics (Project → Analytics → Enable)
   — 30 seconds, zero risk, and the prerequisite for knowing if anything
   else here is working.
2. **Next session with a working shell**: mobile table → card reflow.
   Highest UX impact for new/mobile visitors; pure CSS/component work, no
   data risk.
3. **Next session with a working shell**: wire `Brand.dietTags` into
   `applyFilters` as an OR-condition alongside `row.compatibleWith`, so a
   brand-level "halal" tag surfaces the brand's dishes even before every
   individual dish is tagged. Finishes what's already half-done.
4. **Next session with a working shell**: `GroceryProduct` UI — a
   dedicated "Pantry"/grocery section or tab, surfacing the 19 existing
   rows instead of the Grocery filter silently substituting whole-item
   `MenuItem` rows.
5. **Ongoing, not code**: sourcing official nutrition PDFs for 2-3 more
   major chains (KFC, Burger King suggested) is the actual unlock for the
   growth-automation tasks — everything else about their logic is sound
   and correctly conservative.
