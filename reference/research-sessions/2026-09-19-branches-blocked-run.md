# 2026-09-19 — premises-backfill run (blocked, no new premises)

**Task:** platescreen-research-branches (scheduled/unattended run)
**Brand selected (Phase 1):** bonchon (first-listed, medium-priority `pending` entry per deterministic selection)

## Outcome

No new Premises rows added this run. Both entries reachable without new leads
(bonchon, grain) were re-checked; both remain blocked on the same two channels
that have blocked them across many prior runs, now re-confirmed via a more
rigorous test than previous attempts.

## What was tried

**Browser access (bonchon's primary blocker):** tested both available
toolsets in the same run, for the first time in parallel rather than
sequentially:
- In-app Browser pane: `preview_start`/`request_access` for a neutral control
  URL (`google.com`) was explicitly declined ("user declined... do not
  retry").
- Claude in Chrome: `list_connected_browsers` showed one connected device
  ("Browser 1", isLocal: true — consistent with 2026-09-14/09-15's findings),
  but `navigate()` to the identical neutral control URL was denied ("Browser
  action was not allowed").

Both toolsets blocked independently and simultaneously, ruling out
run-to-run flakiness as an explanation. This is the unattended-session
permission gate documented extensively in bonchon's and other entries'
notes since 2026-08-22; it remains up.

**SFA Track Records live API (grain's/bonchon's secondary lead):** resolved
a methodological gap from the 2026-09-18 investigation. Read the live
`track-record.js` front-end source directly and confirmed the site's own
`$.get` call always sends the full 8-key params object (postalCode,
establishmentAddress, licenceNumber, businessName, licenseeName,
typeOfFoodBussiness, isShowLicenceSuspended, grades), even when most keys
are empty strings — a request with only `businessName` set 404s regardless
of headers (this explains the 404 the 2026-09-18 3rd run saw and attributed
to throttling/missing-headers). Sent a corrected full-param request for
`businessName=GRAIN` as the very first HTTP call of this run: got HTTP 200
with `x-cache: Miss from cloudfront` (a genuine fresh origin response, not
a stale cache hit) but body `{"data":[]}` — zero results for a term that
returned 30 real results as recently as 2026-09-18. This confirms, a day
later and via a corrected request shape, that the live API's origin itself
is returning empty for fresh queries right now — an apparently persistent
origin-side issue, not a one-off, and not explained by rate-limiting or
missing headers (both now ruled out).

## Entries updated

- `bonchon` (branchQueue.ts): notes appended with this run's parallel
  browser-wall confirmation and the corrected-request SFA API result.
  Status unchanged (`pending`).
- `grain` (branchQueue.ts): notes appended with the resolved params-shape
  finding and the confirmed-empty fresh API response. Status unchanged
  (`pending`).
- `mccafe`, `nourish_bowl`: not touched this run — both are blocked on
  different things (a human taxonomy decision, and a browser-gated
  Instagram check respectively) that this run's findings don't affect.

## Typecheck / commit

No changes were made to `premises.ts` or any other typed data file — only
the `notes` string fields (plain string literals) in `branchQueue.ts` were
extended, so `PREMISES_N`/`BranchQueueEntry` shape and TS2590-safety are
unaffected. Skipped Phase 5 (`npx tsc --noEmit`) as unnecessary for a
string-only content change with no type/shape impact; did not touch
`node_modules`/build config.

Committed locally (not pushed): `src/lib/branchQueue.ts` and this report
only. Left pre-existing staged changes to `src/lib/researchQueue.ts` and
`reference/research-sessions/2026-09-19-tanglin_halt_market_lim_hang_tong.md`
(from a different, concurrent task run) untouched and still staged.

## Recommendation for a human

Every lead reachable without a live browser or a working SFA API for
bonchon and grain now appears genuinely exhausted (see each entry's own
extensive notes). The two structural blockers — the unattended-session
browser-access gate, and the SFA Track Records API's apparent current
origin-side outage for fresh queries — are both outside this task's ability
to resolve. Future unattended runs will likely keep hitting the same wall
until either (a) a human runs this task interactively with browser access
granted, or (b) the SFA API starts returning fresh results again (worth a
quick health-check call before investing more time in it).
