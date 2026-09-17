# 2026-09-18 — SFA Track Records live API discovery

## Context

Every scheduled run since 2026-08-22 that touched `bonchon`, `grain`, or `nourish_bowl` in
`src/lib/branchQueue.ts` hit the same wall: no connected/permitted browser to render a brand's
JS-only store-locator, and no fresh SFA "Track Records" xlsx export (the tool at
sfa.gov.sg/tools-and-resources/track-records, which has the `businessName` field the older
data.gov.sg dataset lacks) sitting in the project or uploads folder to re-search against.

This run found that the Track Records tool's own page is *not* JS-rendered for its shell, and
the AJAX call it makes to populate results is a plain, unauthenticated JSON GET endpoint —
callable directly via `curl` (or `web_fetch`, if the URL is otherwise reachable), no browser,
login, or session cookie required.

## The endpoint

```
GET https://www.sfa.gov.sg/api/TrackRecord/GetTrackRecord
```

Query params (all optional, but at least one non-empty or the tool's own JS refuses to submit —
the API itself does not enforce this, empty params are just ignored):

| param | notes |
|---|---|
| `postalCode` | appears non-functional when used alone — see Limitations |
| `establishmentAddress` | untested alone this run |
| `licenceNumber` | appears non-functional when used alone — see Limitations |
| `businessName` | **the useful one** — case-insensitive substring match, works well |
| `licenseeName` | inconsistent — see Limitations |
| `typeOfFoodBussiness` | untested this run |
| `isShowLicenceSuspended` | `true`/`false` — whether to include suspended licences |
| `grades` | untested this run |

Response shape:

```json
{"data": [
  {
    "refNo": "SE16186K000",
    "applType": "EHFE",
    "establishmentAddress": "5 BURN ROAD #05-01,#06-03,TEE YIH JIA FOOD BUILDING,Singapore 369972",
    "licenceNumber": "SE16186K000",
    "businessName": "Grain Pte Ltd",
    "licenseeName": "GRAIN PTE. LTD.",
    "typeOfFoodBussiness": "Food Caterer",
    "grades": "A"
  },
  ...
]}
```

All matching rows are returned in one response (client-side DataTables pagination only — no
server-side page limit to worry about), so a single call per query term is enough.

A basic User-Agent header (e.g. a standard Chrome UA string) was used throughout; no other
headers, cookies, or Referer proved necessary for the calls that worked.

## What this resolved today

`businessName=GRAIN` (run early in this session, before the rate limit below kicked in) returned
30 rows: the same set of coincidental false-positive matches this queue has documented since
2026-08-21 (Hundred Grains, Grains & Co., Grain Traders, etc.) plus exactly one true match —
`businessName: "Grain Pte Ltd"`, `licenceNumber: "SE16186K000"`, `licenseeName: "GRAIN PTE. LTD."`,
`grades: "A"`, at `5 BURN ROAD #05-01,#06-03,...`. This is the same licence number already in
`premises.ts` as `grain_burn_road`, previously attached under the pre-rename name
`"THE GRANARY PTE. LTD."` (confirmed as a rename via a RecordOwl ACRA mirror on 2026-09-01, not
SFA's own data directly). Today's live query confirms, straight from SFA's current register:

1. The rename is reflected in SFA's own system now, not just a third-party mirror.
2. The grade is **A** — resolves an open item every run since 2026-09-01 tried and failed to reach
   via `web_fetch`'s URL-provenance restriction (see grain's notes in `branchQueue.ts`).
3. A second unit, **#06-03**, exists under the same licence alongside the already-known #05-01 —
   not previously captured.

`premises.ts`'s `grain_burn_road` row was updated accordingly (see `branchQueue.ts`'s grain entry
for the full diff description).

`businessName=NOURISH` (5 results, all unrelated soup/catering brands — no match) and
`businessName=BONCHON` (0 results) were also run in this same early, reliable window and are
consistent with every prior session's findings via the old dataset/xlsx approach.

## Limitations — READ BEFORE REUSING

**Rate limiting / soft throttling.** After roughly 3-5 requests in quick succession, the endpoint
stopped returning real data and started silently returning `{"data": []}` for *everything* —
including sanity-check queries for terms known to have many matches (`MCDONALD`, `CAFE`,
`RIBBON`, and even re-querying `GRAIN` itself, which had just returned 30 real rows minutes
earlier). No error, no HTTP status change (still 200) — just an empty result set indistinguishable
from a genuine zero-match query. This was not resolved by:
- waiting 30 seconds and retrying
- loading the page fresh and reusing its session cookie
- adding a `Referer` header

It's unclear whether this is IP-based, session-based, or time-window-based, or how long it takes
to reset. **Any future run using this endpoint should:**
1. Run the single highest-value / most uncertain query FIRST, before anything else touches the
   endpoint.
2. Immediately follow it with a known-good control query (a term already confirmed to have
   matches, e.g. `GRAIN`) in the same short window, to confirm the endpoint is still returning
   real data before trusting the first query's result.
3. Not chain more than 2-3 businessName/licenseeName lookups per run without re-verifying with a
   control in between.
4. Treat any zero result obtained after several prior calls in the same run as **unconfirmed**,
   not a clean negative — note this explicitly rather than updating a queue entry's status off it.

Because of this, `BON CHON` (two-word variant), `licenseeName=BONCHON`,
`licenseeName="BONCHON SINGAPORE"`, and `businessName="NOURISH BOWL"` (exact) were all queried
this run but landed in or after the point where throttling likely began — their zero results are
recorded in `branchQueue.ts` as directionally consistent with prior findings but not
independently re-confirmed, and are flagged as the first thing a future run should re-try.

**`postalCode` and `licenceNumber` alone don't seem to work.** Querying `licenceNumber=CE13480X000`
and `postalCode=018961` — both known-good values pulled directly from a `businessName=GRAIN`
result in the same run — returned zero rows each. Whether this needs a companion param, different
formatting, or is simply not implemented the way the UI implies, is unresolved. Don't rely on
these two params alone; `businessName` and (with the caveats above) `licenseeName` are the ones
confirmed to work.

**`licenseeName` as a standalone filter was inconsistent.** `licenseeName=GRAIN`,
`licenseeName="GRAIN PTE LTD"`, and `licenseeName="GRAIN PTE. LTD."` (the exact string from a
`businessName` result's own `licenseeName` field, moments earlier) all returned zero — but this
may simply be more throttling rather than a real behavioral difference; not conclusively tested
either way.

**Separately, unrelated to this API:** `bonchon.sg` failed to connect at all via plain curl this
run (`HTTP 000` / connection failure) — a stronger block than the "JS-rendered, empty body" result
every prior `web_fetch`-based attempt got. This suggests network/bot-protection-level blocking of
non-browser requests to that specific domain, not just a client-side-rendering gap — the SFA API
discovery above doesn't help with that domain directly; Bonchon's own site remains reachable only
via a genuinely connected, permitted browser (still blocked in every unattended run to date).

## For future runs

This is very likely the fastest path forward for any queue entry blocked on "no fresh Track
Records export" (`bonchon`, and any future re-opened entry needing a businessName/licenseeName
check) — no more waiting on a human to upload an xlsx. Budget calls carefully per the throttling
notes above: treat this as a scarce resource of ~3-5 trustworthy calls per run, not an unlimited
API.
