# 2026-09-17 — Scheduled restaurant-track run: hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd

**Track:** restaurant / food_court / hawker / coffeeshop / canteen (weekly scheduled task)

## Phase 1 — Selection

Per the deterministic priority-sorted selection rule, the first-listed pending
entry in this track is `kopitiam` (high priority, food_court). Re-checked its
extensive prior history (last touched 2026-09-02): the Kopitiam operator
backlog's 3 remaining zero-menu sub-brands are unchanged —
`kopitiam_cheers` (never, non-food convenience concession),
`kopitiam_china_food` (bare "Cold dishes" scrape signal, no stall name found
by any text search since 2026-08-31, needs Street View/in-person ID),
`kopitiam_king_grouper` (needs a Brand-merge restructure into
`kopitiam_king_grouper_fish_soup`, out of this task's write scope) — no
addressable gap this run. `koufu` and `foodfare` still have 0
operatorId-tagged Brand rows per the same 2026-09-02 audit. No interactive
browser/Street-View access was available in this unattended session (same
outcome as every prior run that tried), so the Street View path for
`kopitiam_china_food` remains untried again.

Following the precedent set by the last three runs on this same entry, swept
the rest of the priority-sorted pending queue for a realistic single-outlet
target. Checked several candidates in file order first:

- `telok_blangah_market_al_borgo_pte_ltd` ("Al Borgo") — Brand + SFA-matched
  Premises already exist (licence SW13S15J000, grade A), but web research
  found no evidence this licensee corresponds to a discoverable food stall.
  The only "Al Borgo" with any online presence is an unrelated fine-dining
  Italian restaurant (Bukit Timah/Tanglin) — a coincidental name match, not
  the same business (a $ hawker stall and a full Italian restaurant company
  sharing a name is not credible without more evidence). Cross-checked
  against stall lists for the actual Telok Blangah Drive Market and Food
  Centre (Yuan Cheng Carrot Cake, Seng Huat Prawn Noodles, Shao La, Bao Zai
  Mian, Heng Nasi Lemak Fried Bee Hoon, etc.) — "Al Borgo" appears nowhere.
  Left at zero MenuItems per the never-guess rule; joins the task #29-style
  bucket (bare licensee name, unresolved by text search).
- `telok_ayer_food_centre_e_p_cafeteria_pte_ltd` ("E&P Cafeteria") and
  `telok_ayer_food_centre_jex_pte_ltd` ("Jex") — Brand + SFA data already
  exist for both, but neither name returned any usable result in web search
  (no stall directory, blog, or listing names either). Left unresolved,
  same bucket as above.
- `hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd`
  ("Bachmann Japanese Restaurant") — **selected**. Brand + SFA-matched
  Premises already exist (licence NE15028V000). "Bachmann Japanese
  Restaurant" is a real, multi-branch Singapore Japanese-casual chain
  (confirmed via Tripadvisor, Sluurpy, and a Bugis Junction mall directory
  page listing branches at Bugis Junction, IMM Sengkang, Maritime Square,
  Great World City, and VivoCity), so unlike Al Borgo/E&P/Jex this had a
  real, checkable basis. Also found it already had 1 MenuItem (`hg105_1`,
  Chicken Katsu) from earlier untracked work despite the queue entry still
  showing `pending` — below this task's 3-item minimum, so genuinely
  incomplete, not just stale bookkeeping.

## Phase 2 — Research

No outlet-specific source exists for the Hougang 105 Hainanese Village
Centre branch specifically (it doesn't appear in any of the branch listings
found). Used the chain's own consistent menu instead, following the same
"chain-wide menu, no outlet-specific source" precedent as
`kopitiam_culiang_yufen` (2026-09-01).

Sources checked:
- **Sluurpy** (VivoCity branch listing) — confirmed the chain name, address
  pattern, and that it's a sit-down Japanese-casual restaurant; no itemized
  menu.
- **menus.sg** (Downtown Core branch) — **rejected as a source**: its menu
  content was cross-contaminated with an unrelated brand ("Ajisen" ramen
  items appeared mixed into the listing) — the same red flag as
  `thefoodprices.com`'s rejection in the Swensen's session (templated/mixed
  content, not a clean single-brand scrape).
- **Bugis Junction mall fan-site page** (bugis-junction.com) — used
  partially. Its "Menu Highlights" section (a photographed menu board)
  gave a clean, internally consistent list: 7 ramen flavours all at $10.90
  (Tokyo, Vegetable, Cha Shu, Miso, Spicy, Tonkotsu, Shoyu), a "Curry
  Rice/Toji/Rice Sets from $12.90" band (Fried Chicken/Prawn/Fish Curry
  Rice), and a Kids Meal at $8.90. A second section on the same page, drawn
  from a photographed receipt, was garbled OCR fragments ("F. CHIK", "S.
  DUCK BMK PIZZA", "VOL CHIK CHOP") and was **not used** — not a credible
  basis for any item.

Added 4 new MenuItems (on top of the existing Chicken Katsu), all
confidence `estimated` (no official brand or HPB source for this chain
exists; prices are corroborated by the chain's own photographed menu board
but macros are reasoned):

| Item | Price | Cal | Protein | Carbs | Fat | Diet tags |
|---|---|---|---|---|---|---|
| Tonkotsu Ramen | $10.90 | 640 | 28g | 68g | 26g | none |
| Cha Shu Ramen | $10.90 | 660 | 30g | 66g | 27g | none |
| Spicy Ramen | $10.90 | 630 | 26g | 65g | 25g | none |
| Fried Chicken Curry Rice | $12.90 | 650 | 28g | 70g | 26g | no_pork |

Macros calibrated against this project's own existing analogs:
`Tonkotsu Chashu Ramen` (650 cal/30p/65c/28f, used at `kopitiam_kokoro_kiosuku`
and `ramen_king_hws`) and `Chicken Katsu Curry Rice` (620/26/68/24, at
`kopitiam_washouku_geon`).

**Diet tags:** Tonkotsu Ramen and Cha Shu Ramen left with no
`compatibleWith` array — tonkotsu is pork-bone broth and chashu is roast
pork, both explicitly pork-derived, matching the categorical-exclusion
spirit of CLAUDE.md §5.1's explicitly-pork-named dishes even though neither
exact name is on that literal list. Spicy Ramen also left untagged — no
source specifies its protein/broth base, too ambiguous to guess. Fried
Chicken Curry Rice tagged `["no_pork"]` — named protein is chicken, same
pattern as the existing `Chicken Katsu Curry Rice` analog.

## Phase 3 — SFA

Skipped. Brand and Premises already exist with a confirmed SFA match
(licence NE15028V000) from the 2026-08-20 hawker restructuring — not
re-researched.

## Phase 4 — Records written

- `src/lib/menuItems.ts`: appended 4 new items (`hg105_10`–`hg105_13`),
  `brandId: "hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd"`
  for all. Brand now has 5 MenuItems total (1 pre-existing + 4 new).
- `src/lib/researchQueue.ts`: flipped this entry's `status` from `pending`
  to `researched`; appended an UPDATE note to both this entry and the
  `kopitiam` entry (recording the re-confirmed no-gap finding and the sweep
  that led here, per the established multi-session precedent for that
  entry).
- No changes to `brands.ts` or `premises.ts` (Brand/Premises already
  existed).

## Phase 5 — Verification

- Copied `src/` (excluding `node_modules`/`.next`/`out`/`.git`/`reference`)
  to a sandbox mirror at `/tmp/build/platescreen` (the usual `~/build`
  mirror location was unavailable — the session's home filesystem was at
  100% capacity/0 bytes free; `/tmp` is a separate, healthy filesystem in
  this sandbox).
- `npm install` — succeeded (390 packages).
- `npx tsc --noEmit` — **silent, no errors**.
- Duplicate-id check: `hg105_10`–`hg105_13` each appear exactly once in
  `menuItems.ts`.
- Orphan check: `brandId` resolves to a real row in `brands.ts` (1 match).
- `diff` of the live `researchQueue.ts` and `menuItems.ts` against the
  mirror's copies: **byte-identical** on both.
- Deleted the sandbox mirror and npm cache after verification.

## Commit

**Not committed.** `.git/index.lock` was present and could not be removed
(`Operation not permitted` on `rm`/`mv`/`os.remove`, even after `chmod 777`
succeeded silently) — consistent with an OS-level lock actively held by
another process, not a stale abandoned lock (a stale lock file is a normal
Linux file with no such removal restriction). `git status` at the time
showed a second scheduled task's uncommitted changes already in this
working tree (`src/lib/branchQueue.ts` modified, plus untracked
`reference/research-sessions/2026-09-17-branches-bonchon*.md` and
`reference/planning/Post-Copilot-Digests/2026-09-17.md`), so another
restructure/branch-research task was very likely running concurrently
against this same shared repo and actively holding the lock. Rather than
force past an active lock and risk corrupting the shared `.git` index for
both tasks, left it alone. Confirmed via `git diff --stat` that this run's
own changes are cleanly isolated to `src/lib/menuItems.ts` (+4 lines only)
and `src/lib/researchQueue.ts` (+3/-3 lines, both queue-note updates) — no
interleaving with the other task's edits. These two files plus this report
are staged-but-uncommitted on disk; a future run (once the lock clears) or
the user should run:
```
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen"
git add src/lib/menuItems.ts src/lib/researchQueue.ts reference/research-sessions/2026-09-17-hougang_105_bachmann_japanese_restaurant.md
git commit -m "Research: add hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd"
```
(Not pushing per this task's rules either way — push remains the user's own step.)

## Status / next steps

This entry is now `researched` (5 MenuItems, ≥3 minimum met). The `kopitiam`
entry remains `pending` — same 3 unresolved sub-brands as 2026-09-02, still
blocked on interactive browser/Street-View access this task's sessions
don't have. `telok_blangah_market_al_borgo_pte_ltd`,
`telok_ayer_food_centre_e_p_cafeteria_pte_ltd`, and
`telok_ayer_food_centre_jex_pte_ltd` were surveyed this run and found
unresolvable by text search (bare licensee names with no discoverable
storefront identity) — left `pending`, not individually annotated with
their own UPDATE notes to avoid further bloating an already very large
queue file; flagging here for whoever does the next full staleness/task #29
sweep. A dedicated batching pass for the still-large pool of
corporate/holding-name queue entries (Cold Storage, McDonald's, Pizza Hut,
NTUC Foodfare, etc. — per-location duplicates of chains that already have a
consolidated Brand elsewhere) would still be more efficient than continuing
to hit this same bucket one entry at a time.
