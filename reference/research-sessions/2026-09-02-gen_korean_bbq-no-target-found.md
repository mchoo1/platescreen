# 2026-09-02 — Restaurant-track scheduled run: no addressable single-outlet target found

**Track:** restaurants / food_court / hawker / coffeeshop / canteen
**Outcome:** No Brand/Premises/MenuItems added this run. `researchQueue.ts` notes updated on `gen_korean_bbq` only.

## What happened

This was a second scheduled restaurant-track run today (2026-09-02). An earlier run today
already completed `food_junction_ke_quench` (3 real MenuItems, see
`2026-09-02-food_junction_ke_quench.md`) and bookkeeping-fixed several stale `fei_siong` /
`canopy_hawkers` / `timbre_plus_hawkers` queue entries — that work was already present in the
live files at the start of this run (merged via commit `e31b6ae`), so this run picked up from
the current, already-updated queue state rather than repeating it.

### Step 1 — re-audited the top 4 (deterministically first) high/medium-priority entries

Per Phase 1's deterministic pick rule, `kopitiam` (high priority, first-listed) was the nominal
top pick. Re-audited fresh (not trusting older notes) by parsing `brands.ts` for every Brand with
`operatorId: "kopitiam"` and cross-referencing `menuItems.ts`:

- **kopitiam** — 831 Brand rows tagged `operatorId: "kopitiam"`, only 3 with zero MenuItems:
  `kopitiam_king_grouper` (needs a Brand-merge into `kopitiam_king_grouper_fish_soup`, a
  restructure out of this task's append-only scope), `kopitiam_china_food` (only signal is a bare
  "Cold dishes" category label; Street View/in-person is the only unexhausted lead), and
  `kopitiam_cheers` (a Cheers convenience-store concession, never gets a MenuItem). Tested this
  run's browser access directly rather than assuming: navigation to `google.com` was denied at
  the tool level (an unattended-session permission gate, same outcome as every prior scheduled
  run) — the Street View path remains untried.
- **koufu** — 0 Brand rows tagged `operatorId: "koufu"` with zero MenuItems (0 total tagged, per
  the 2026-08-23 restructure note: Koufu's own sub-brands were added without an operatorId).
- **foodfare** — same, 0 zero-menu `operatorId: "foodfare"` rows.
- **hawkers_street** — all 27 `operatorId: "hawkers_street"` Brand rows have ≥1 MenuItem already.
  Its own remaining work (identifying named concessions at newer venues) needs on-site/Google
  Maps research, not a quick single-outlet macro pass.

None of the 4 had an addressable gap this run.

### Step 2 — swept the remaining 79 pending entries in this track

Classified every pending entry (priority-sorted, deterministic order preserved) against current
`brands.ts`/`menuItems.ts`:

| Category | Count | Notes |
|---|---|---|
| Orphaned (queue `id` has no matching Brand row) | 41 | Includes the 4 operator entries above plus ~37 per-location chain-duplicate ids (Cold Storage, McDonald's, Pizza Hut, KFC, Domino's, Cheers Holdings, NTUC Foodfare/Club, Breadtalk, Bengawan Solo) that were folded into their real consolidated Brand elsewhere — likely via the 2026-09-02 duplicate-brand-merge commit, which removed 32 duplicate Brand rows and would explain why this count (41) is much higher than the 2 recorded on 2026-08-31, before that merge. |
| Corporate-legal-entity-name pattern (`pte ltd` / `co-operative` / `management` / `holdings` / `... restaurants pte`), Brand exists, zero MenuItems | 22 | Per CLAUDE.md §6's known-exclusion list — these need SFA-licence/chain verification before treating as a real gap, not a blind pickup. Not attempted this run. |
| Bare SFA-licensee personal/corporate name, Brand exists, zero MenuItems, no signage-name signal | 12 | The documented "task #29" bucket (Lee Len Tong, Goh Poo Huat, Kwek Ah Heoh, Lee Jim Pong, Lim Hang Tong, Goh Jee Tee, Lee Kee Yeo @Lee Lian Hong, Au Jiahao Alex, Chan Cheow Teck, Chan Kok Hee (Tian Guoxi), Ntuc Club, Chong Yo Private Limited). Spot-checked one (`Chong Yo Private Limited` @ Kovan Hougang Market & Food Centre) via WebSearch — no result names a "Chong Yo" stall, consistent with the established finding that these need Street View/in-person identification, not text search. |
| Pre-existing single generic MenuItem, status still `pending` | 4 | `teban_gardens_..._barakath_international_pte_ltd` (1 item, "Nasi Briyani"), `hougang_105_..._bachmann_japanese_restaurant_pte_ltd` (1 item, "Chicken Katsu"), `one_punggol_hawker_centre_..._haji_karim_prata_palace_pte_ltd` (1 item, "Roti Prata"), `punggol_coast_hawker_centre_..._srisun_prata_..._pte_ltd` (1 item, "Roti Prata"). No dedicated research-session report exists for any of the 4, and each has only 1 item (below this project's usual 3-item minimum for a fresh addition) with a name reasoned from the brand's own corporate name rather than a verified source. Left untouched — flipping these to `researched` or auditing their data quality is a distinct task from this run's single-outlet mandate, flagged here rather than acted on unilaterally. |

None of the above yielded a clean, addressable single-outlet target without either (a) a
restructuring/scope decision beyond this task's append-only mandate, or (b) tooling this run
doesn't have (browser access was denied).

### Step 3 — gen_korean_bbq (low priority, first real type-1 "new chain" entry with no existing Brand)

Investigated as the next viable candidate. Findings:

- The real "Gen Korean BBQ House" chain (`genkoreanbbq.com`) has an official `/locations` page
  listing 20+ outlets — all in the US (Texas, California, Arizona, Nevada, Oregon, Washington,
  Florida, Hawaii, North Carolina). No Singapore location on their own official store list.
- A Burpple "Gen Korean BBQ House" Singapore page exists (`burpple.com/gen-korean-bbq-house`) but
  is unclaimed, with no address, phone, or website filled in, and exactly one review — dated
  **2013** ("Bulgogi. Walang tigil. #korean #food #bbq"). This is far below the credibility bar
  for a current, addressable outlet.
- Two 2026-dated "Best Korean BBQ in Singapore" roundups (sgtop10.com, misslobang.com) were
  checked directly; neither lists a "Gen Korean BBQ" among current Singapore Korean BBQ options.
- A search for recent Singapore-specific news/openings/closures for this name returned nothing.

**Conclusion:** no credible, current basis exists for a real Singapore Brand under this name.
Per this project's never-fabricate rule and the task's Phase 2 §5 instruction, did not add a
Brand/Premises/MenuItems, and — per the same instruction — did not pick a fallback outlet in the
same run. Left `gen_korean_bbq` at `status: "pending"` with notes explaining the finding; flagged
that a future pass should consider whether this queue entry's premise (a real, current SG outlet
worth researching) is itself stale.

## Verification

No Brand/Premises/MenuItems files were touched this run. Only `researchQueue.ts` changed (one
`notes` field added to the `gen_korean_bbq` entry, no `id`/`status` change, no structural change
to the array). Synced to the `~/build/platescreen` mirror and ran `npx tsc --noEmit` — see commit
message for the pass/fail result recorded at commit time.

## Files touched

- `src/lib/researchQueue.ts` — added `notes` to `gen_korean_bbq` (status unchanged, still `pending`)
- `reference/research-sessions/2026-09-02-gen_korean_bbq-no-target-found.md` — this file

## Next steps for a future run

- Re-attempt `kopitiam_china_food` via Street View/in-person once a session has real browser
  access (every scheduled run so far, including this one, has had navigation denied).
- A dedicated pass to verify the 22 corporate-legal-entity-name entries against real SFA
  licence/chain identity (same method as the 2026-08-23/24 duplicate-brand cleanups) would likely
  resolve most of them as either genuine gaps or further duplicates.
- The 4 single-generic-item entries flagged above are worth a small dedicated data-quality audit
  (verify sourcing, expand to ≥3 items or flag for removal) rather than a blind bookkeeping flip.
- Consider whether `gen_korean_bbq` (and similarly thin, unverifiable low-priority queue entries)
  should be removed from the queue rather than re-picked by future runs that will reach the same
  conclusion.
