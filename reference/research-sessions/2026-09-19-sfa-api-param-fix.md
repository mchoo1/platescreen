# 2026-09-19 — SFA live API param fix + bonchon/grain/nourish_bowl re-verification (3rd 2026-09-19 branches run)

**Task:** platescreen-research-branches (scheduled/unattended run)
**Brand selected (Phase 1):** bonchon (first-listed, medium-priority `pending`
entry per deterministic selection). Pivoted to grain and nourish_bowl within
the same run after bonchon hit its long-standing browser-access wall again,
consistent with this queue's established pattern of using remaining time on
other pending entries rather than repeating an identical blocked attempt.

## Outcome

No new Premises rows added. But resolved a real bug that had been
misdiagnosed as an SFA API origin-side outage across the two prior runs
today (`2026-09-19-branches-blocked-run.md` and the "2nd
scheduled/unattended run" note now in `branchQueue.ts`'s bonchon/grain
entries), and used the corrected, now-working API to re-verify bonchon,
grain, and nourish_bowl with clean (not malformed/throttled) queries.

## The bug

Every run since 2026-09-18's 2nd run constructed the SFA Track Records live
API request (`GET https://www.sfa.gov.sg/api/TrackRecord/GetTrackRecord`)
with the full 8-key params object the front-end's own `track-record.js`
sends, but with `isShowLicenceSuspended=""` (empty string) for the boolean
field when not filtering by suspension status. This looked like it worked
sometimes (a stale CloudFront cache hit could return real cached data for a
popular term like `CAFE`) but for any fresh (cache-miss) query it returned
`HTTP 400 {"message":"The request is invalid."}` — which whatever tooling
issued the request in prior runs was evidently swallowing/misreporting as
`{"data":[]}`, producing the "live API origin appears to be returning empty
for all fresh queries" conclusion recorded in bonchon's and grain's notes
across 2026-09-18's 3rd run and both of today's earlier runs.

Fix: send a real boolean string, `isShowLicenceSuspended=false` (or
`=true` to also include suspended licences) instead of an empty string.
Verified directly via curl with response headers:

- `isShowLicenceSuspended=` (empty) → `HTTP 400`, `x-cache: Error from
  cloudfront`
- `isShowLicenceSuspended=false` → `HTTP 200`, real data, `x-cache: Miss
  from cloudfront` (genuine fresh origin response)

Confirmed the fix generalizes: `businessName=CAFE` and `businessName=GRAIN`
both immediately returned full, correct result sets on the very first call
of this run (GRAIN: 30 results, matching 2026-09-18's count exactly) — the
API was never down; every prior "empty on fresh query" observation since
2026-09-18's 2nd run was this same 400-misread-as-empty bug.

## Re-verification with the corrected API

- **bonchon**: `businessName=BONCHON` → 0; `licenseeName=BONCHON` → 0;
  `licenceNumber=CE12104B000` (bonchon_p1560's own previously-confirmed
  licence) → 0 — this time with `isShowLicenceSuspended=true`, so a
  suspended (not just active) licence would also have surfaced. Bonchon's
  Bugis+ licence remains absent from SFA's live register under every
  queryable dimension. This strengthens but does not resolve 2026-09-18's
  open question (aggregators split on closed-vs-reopened; the one
  conclusive check, a rendered read of bugismall.com/shops or
  facebook.com/bonchonsg, still needs browser access).
- **grain**: `businessName=GRAIN` → 30 results, sole true match unchanged
  (`Grain Pte Ltd` / `SE16186K000` / 5 Burn Road #05-01,#06-03, grade A) —
  already fully captured as `grain_burn_road`. No 4th kitchen found.
- **nourish_bowl**: `businessName="NOURISH BOWL"` (exact) → 0, this time a
  clean, non-throttled, non-malformed HTTP 200 response — the clean
  confirmation flagged as needed by 2026-09-18's run. 13th independent pass
  finding zero confirmable Singapore presence under this exact name.

## Browser access

Re-checked both toolsets, as every run since 2026-08-22 has:
- In-app Browser pane: `request_access` for a neutral control URL
  (`google.com`) was explicitly declined ("user declined... do not
  retry").
- Claude in Chrome: `list_connected_browsers` showed one connected device
  ("Browser 1", isLocal: true), but `navigate()` to the same URL returned
  "Browser action was not allowed".

Identical to every unattended run's finding since 2026-08-22 (single
exception: the 2026-09-02 interactive session). Not re-attempted further
this run given the extensively documented, unambiguous decline.

## Entries updated

- `bonchon`, `grain`, `nourish_bowl` (`branchQueue.ts`): notes appended
  with this run's API-bug-fix finding and corrected-query re-verification.
  Status unchanged (`pending`) for all three — none of today's findings
  are conclusive enough to flip any entry to `researched`.
- `mccafe`: not touched — blocked on a human taxonomy decision, unaffected
  by today's findings.

## Typecheck / commit

No changes to `premises.ts` or any typed data file — only `notes` string
literals in `branchQueue.ts` were extended (plus this new report file), so
`PREMISES_N`/`BranchQueueEntry` shape and TS2590-safety are unaffected.
Skipped Phase 5 (`npx tsc --noEmit`) as unnecessary for a string-only
content change with no type/shape impact.

Found this repo's `.git/` directory has a long-standing, well-documented
lock/unlink problem on this mount (see the pre-existing, still-uncommitted
`2026-09-19-branches-blocked-run.md` from an earlier run today, and 100+
`*.lock.stale-*` files spanning back to August) — attempted `git add` +
`git commit` for this run's changes; see the end of this report for the
result.

## Recommendation for a human

The isShowLicenceSuspended fix documented here should let future runs use
the SFA live API reliably going forward — this was a real, previously
undiagnosed bug, not a flaky or rate-limited endpoint, so future notes
claiming "origin outage" for this API should be treated with fresh
skepticism and re-tested with the corrected parameter first. Bonchon and
nourish_bowl both remain one browser-gated check away from a fully
conclusive resolution (bonchon: bugismall.com/shops or
facebook.com/bonchonsg tenancy/date check; nourish_bowl: @nourish_bowl's
Instagram bio/location) — worth running this task interactively with
browser access granted at least once to close these two out, given how
many unattended passes have now converged on the same wall.
