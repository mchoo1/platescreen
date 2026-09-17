# 2026-09-18 — Branch queue session report (grain, with bonchon/nourish_bowl side-checks)

## Selection (Phase 1)

Deterministic selection (pending, priority high→medium→low, first-listed wins) landed on
`bonchon` (medium priority, first-listed) again, as it has every run since 2026-08-22.

## bonchon — still blocked, one new data point

Re-confirmed the identical unattended-session browser wall: `mcp__claude-in-chrome__list_connected_browsers`
returned zero devices; the in-app Browser pane's `request_access` for a neutral control URL
(google.com) was declined outright ("user declined... do not retry"). Consistent with essentially
every scheduled run since 2026-08-22 (the sole exception remains the one interactive session on
2026-09-02).

New this run: a plain `curl` to `bonchon.sg` failed to connect at all (`HTTP 000`), a harder block
than the "reachable but empty JS-rendered body" result every prior `web_fetch`-based attempt got —
suggests network/bot-protection-level blocking of non-browser requests to that domain specifically,
not just a client-rendering gap. Per this task's own established precedent (documented extensively
in bonchon's own queue notes across a dozen-plus prior runs), pivoted to `grain` rather than repeat
an identical, information-free attempt.

## Method used: new SFA Track Records live API (see 2026-09-18-sfa-live-api-discovery.md)

This run discovered that SFA's Track Records tool (sfa.gov.sg/tools-and-resources/track-records)
has a directly-callable JSON API (`GET /api/TrackRecord/GetTrackRecord?businessName=...`) reachable
via plain `curl`, with no browser, login, or xlsx export needed — see the dedicated write-up
(`2026-09-18-sfa-live-api-discovery.md`) for the full method, response shape, and an important
throttling caveat discovered the hard way (the endpoint silently returns empty results after ~3-5
calls in quick succession, rather than erroring).

## grain — resolved 3 open items, updated 1 premises row

Within the first few (pre-throttling) calls, `businessName=GRAIN` returned 30 rows: the same
already-documented false positives (Hundred Grains, Grains & Co., Grain Traders, etc.) plus one
true match — `businessName: "Grain Pte Ltd"`, `licenceNumber: "SE16186K000"`,
`licenseeName: "GRAIN PTE. LTD."`, `grades: "A"`, address `5 BURN ROAD #05-01,#06-03,TEE YIH JIA
FOOD BUILDING,Singapore 369972`.

This is the same licence already attached to `grain_burn_road` in `premises.ts` (previously only
confirmed as a Granary→Grain rename via a third-party ACRA mirror, RecordOwl, on 2026-09-01). Today's
query — straight from SFA's own live register — confirms the rename directly, resolves the grade
(previously unreachable due to `web_fetch`'s URL-provenance restriction, blocking every attempt since
2026-09-01), and surfaces a second unit (#06-03) not previously captured.

**Change made:** updated the existing `grain_burn_road` row in `premises.ts` — `sfa.licenseeName`
corrected to `"GRAIN PTE. LTD."` (was `"THE GRANARY PTE. LTD."`), added `sfa.grade: "A"`, extended
`address`/`sfa.premisesAddress` to cover both units, `source` updated to
`"sfa_track_records_live_api"`. Treated as one combined premises spanning two units under one
licence, not a new row — no premises count change (still 3 for grain).

Coverage for grain remains not certified exhaustive (all other leads — Upper Weld Road,
grain.com.sg's own JS content, Grain Traders' distinctness — were already resolved-negative or
exhausted in prior sessions per grain's own notes, and weren't worth re-spending the limited
pre-throttling API window on this run). `branchQueue.ts` status kept `'pending'`.

## nourish_bowl — 12th independent pass, no resolution

`businessName=NOURISH` (5 results, all unrelated soup/catering brands) was queried in the same
early reliable window as grain's query — clean negative, consistent with every prior pass. A
follow-up `businessName="NOURISH BOWL"` exact query also returned zero, but landed at or after the
point where the endpoint's throttling likely started (confirmed afterward via known-good control
queries — MCDONALD, CAFE, RIBBON, even re-querying GRAIN itself — all falsely returning empty), so
that specific result is flagged in `branchQueue.ts` as unconfirmed rather than a clean negative.
This is nonetheless a genuinely new channel checked (SFA licensing, not just web/social search),
distinct from the 11 prior passes' methods. The one check that could resolve this definitively — a
rendered read of `@nourish_bowl`'s Instagram bio/location — remains blocked on browser access.
Status kept `'pending'` per the entry's standing recommendation for a human decision.

## Phase 5 — typecheck

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox
directory, ran `npm install` (redirecting the npm cache off the full `/sessions` volume to
`/tmp/npm-cache` — the default cache location was at 100% disk usage) and `npx tsc --noEmit`.
**Result: PASS, exit code 0, no errors.**

## Files changed

- `src/lib/premises.ts` — `grain_burn_road` row updated (licenseeName, grade, address/premisesAddress,
  source); no rows added or removed.
- `src/lib/branchQueue.ts` — header comment updated with the API discovery note; `bonchon`,
  `grain`, and `nourish_bowl` entries each got a dated 2026-09-18 note appended. No `status` field
  changed (`bonchon` and `nourish_bowl` were already `'pending'`; `grain` stays `'pending'`).
- `reference/research-sessions/2026-09-18-sfa-live-api-discovery.md` — new, documents the API
  method and its throttling limitation for future runs.
- `reference/research-sessions/2026-09-18-branches-grain.md` — this report.

## Commit

Committed locally as a `Premises: extend grain` commit, scoped to only the files listed above
(other staged-but-uncommitted changes from a separate task, found already present in the working
tree at session start — `src/lib/menuItems.ts`, `src/lib/researchQueue.ts`,
`reference/research-sessions/2026-09-18-food_junction_toast_junction.md` — were left untouched, not
part of this run). No `git push` performed, per task rules.
