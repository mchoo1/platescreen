# 2026-09-02 — Premises backfill: banquet

**Brand:** banquet ("Banquet", the halal foodcourt chain)
**Method:** ACRA/corporate-register cross-check (sgpbusiness.com, an ACRA mirror — same admissible source class as the opengovsg.com/RecordOwl lookups used for `grain`), corroborating an existing but never-actioned finding already recorded in `brands.ts`'s own changelog.

## What happened this run

Phase 1 selected `bonchon` (first-listed medium-priority pending entry, deterministic). Re-checked browser availability first, since bonchon's queue notes record 8+ consecutive runs blocked purely on lack of a connected browser: confirmed the same wall this run too — `mcp__Claude_Browser__navigate` denied even a neutral control URL (google.com), not just bonchon.sg specifically, so no browser was available this session. Per the precedent already established in bonchon's own notes (pivot rather than repeat an identical blocked attempt), moved down the medium-priority list. `dosirak` was fully resolved-negative as of the 2026-09-02 run immediately preceding this one (no new leads without a new SFA export or a browser). `grain`'s only remaining leads also need a browser (grain.com.sg) or a specific data.gov.sg API URL that no WebSearch surfaced in a fetchable form this run. Checked for a new SFA Track Records xlsx export in the project and uploads folder for Option A re-tries against any of the medium-priority entries — none found.

Moved to `banquet` (low priority) instead, since Option A there had already been exhausted (2 rounds of SFA licensee/Business Name matching, 38 false-positive hits, all hotel banquet-service listings) and the task notes explicitly said it "needs the official source." A general web search surfaced a 2013 Coconuts/Straits Times article reporting Banquet's remaining outlets had shut down or been taken over by Kopitiam/NTUC Foodfare/Teck Kee — but also found conflicting-looking third-party aggregator listings (Yelp, Tripadvisor, Zabihah) with recent-looking "Updated" crawl dates for a VivoCity location, which are not admissible as evidence of current operation per this task's rules and don't resolve the question on their own.

Decisive finding: searched for the brand's actual corporate registration (following the same approach that worked for `grain`'s ACRA lookup) and found via sgpbusiness.com (ACRA-register mirror) that **BANQUET HOLDINGS PTE. LTD.** (UEN 199903142M, incorporated 8 Jun 1999, formerly FOOD BOWL PTE LTD, principal activity SSIC 56140 "Stalls Selling Cooked Food And Prepared Drinks" — i.e. the actual foodcourt operator, not an unrelated same-name company) has Operating Status **"Dissolved - Compulsory Winding Up (Insolvency) as on 31 Aug 2017."** Two related same-name entities are also dead: "BANQUET FOOD COURT" (Cancelled - Non-Renewal) and "BANQUET CATERING PTE. LTD." (Struck Off).

This also surfaced that the finding wasn't actually new — `brands.ts`'s own changelog already recorded on 2026-08-23 (`reference/research-sessions/2026-08-23-other-food-court-operators.md`) that Banquet was "confirmed defunct... former locations now largely operated as 'Bagus'/'Bagus Food Hall' under Kopitiam," but `branchQueue.ts` was never updated to match — the same class of staleness bug already fixed once before for the `wendys`/`superfood_kitchen` entries (2026-09-01). This run's ACRA cross-check independently corroborates that 2026-08-23 note with a stronger, dated, government-sourced signal rather than just trusting the stale note as-is.

## Premises count

0 real premises found vs 0 previously in premises.ts (none existed) vs 0 known to exist today — the operating company was dissolved in 2017, 9 years before this run's date. Zero premises IS complete/accurate coverage of current reality, same pattern as `gong_cha`'s 2026-08-22 resolution.

## Typecheck

`npx tsc --noEmit` — clean (exit 0), run against a sandboxed copy of the project (excluding node_modules/.next/out/.git/reference) after `npm install`.

## Status

Flipped `banquet` from `pending` to `researched` in `branchQueue.ts` with full notes on the ACRA finding, the pre-existing-but-unactioned 2026-08-23 note, and why the third-party "still open" aggregator signals were correctly not treated as admissible. No Premises rows added or removed (none existed for this brandId). This completes the `banquet` entry — not a partial result.

If "Bagus"/"Bagus Food Hall" (the reported Kopitiam-operated successor format at former Banquet locations) ever needs its own coverage, that's a fresh research target under a new brandId, not a reason to reopen this entry.
