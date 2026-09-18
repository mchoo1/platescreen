# Branch backfill session — Bonchon (3rd run, 2026-09-18)

**Brand:** bonchon
**Selected per:** deterministic Phase 1 (first-listed medium-priority `pending` entry)
**Outcome:** No new premises added. Status kept `pending`. New finding recorded, no resolution.

## What was tried

1. **Browser access** — in-app Browser pane `preview_start`/`request_access` for a neutral
   control URL (google.com) was declined before any attempt at bonchon.sg. Identical to
   essentially every unattended run since 2026-08-22 (the sole exception remains the
   2026-09-02 interactive session recorded in the queue).

2. **SFA Track Records live API** (discovered and first used successfully earlier today,
   see `2026-09-18-sfa-live-api-discovery.md` and this date's 2nd bonchon session,
   `2026-09-18-branches-bonchon-sfa-licence-gap.md`) — re-ran with the correct
   `X-Requested-With` / `Referer` / `User-Agent` headers. Result: **every fresh query this
   run returned `{"data":[]}`**, including the very first call of the run (`businessName=GRAIN`,
   with zero prior calls that could have triggered the previously-documented soft-throttle).
   Terms tried: GRAIN, MCDONALD, MCDONALD'S, KFC, STARBUCKS, KOI, SUBWAY, TOAST, BONCHON,
   "BON CHON", licenceNumber=CE12104B000 (Bonchon's own previously-confirmed Bugis+ licence),
   and a nonsense control term (ZZZQQQ123) — all empty.

   Inspected response headers to distinguish "genuinely no data" from a caching/throttling
   artifact: every empty response carried `x-cache: Miss from cloudfront`. The one query that
   *did* return real data, `businessName=CAFE`, carried `x-cache: Hit from cloudfront, age: 94`
   — i.e. it was serving a stale CloudFront edge cache entry from a prior request, not a live
   origin response. Confirmed this is not simply the same throttle behavior documented earlier
   today (which manifests after ~3-5 calls): here the very first fresh call of the run was
   already empty. A cookie-warmed session (fetching the track-records HTML page first) made no
   difference.

   **Conclusion:** the SFA live API origin appears to be returning empty results for all
   fresh (cache-miss) queries at this point in time — a more severe and different failure mode
   than the previously-documented soft-throttle. Not clear whether this is a temporary
   origin-side issue, a defensive measure triggered by the cumulative volume of automated
   querying this queue has done against this endpoint across many prior sessions, or something
   else. This means the live API currently cannot be relied on even for terms never queried
   before, not just terms already exhausted.

3. **bugismall.com.sg/shops** (to re-verify Bonchon's one confirmed real premises, bonchon_p1560,
   at Bugis+ #01-11) — attempted via curl with a browser-like User-Agent. Result: `HTTP 000`,
   connection failure. The domain did not resolve/connect at all this run — unclear whether
   `bugismall.com.sg` was ever the correct official domain for Bugis+ mall; this was not
   independently re-verified. Not investigated further this run.

4. Did not re-attempt facebook.com/bonchonsg via plain curl (already established as
   JS-rendered/empty-body in prior runs, and this run's time was spent on the API
   investigation and domain check instead).

## Net result

- No new Premises rows added.
- `bonchon_p1560` (Bugis+ #01-11) left as-is in `premises.ts` — the aggregator/Facebook
  signals from the 2nd run today remain split and inconclusive, so it was not removed.
- `branchQueue.ts`'s `bonchon` entry notes updated with this run's findings (see inline entry
  dated "2026-09-18 (3rd scheduled/unattended run this date)").
- Status kept `pending`.

## Typecheck

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a
sandbox directory, ran `npm install` (first attempt hit `ENOSPC` on the sandbox's small root
volume via the default npm cache location; resolved by redirecting `--cache` to a `/tmp`
path with free space, then doing a clean reinstall after a corrupted partial install from the
first attempt), then `npx tsc --noEmit`. **Passed with no errors.**

## Recommendation for future runs

- The correct current domain for Bugis+ mall's store directory should be re-verified via
  WebSearch before assuming `bugismall.com.sg` is right or wrong.
- Before spending more automated-run time on the SFA live API for this brand, a future run
  should check whether a *fresh* query (as the very first call, no prior calls this run) still
  returns `x-cache: Miss` with empty data. If so, this specific channel is likely exhausted
  until a human investigates further (e.g., contacting SFA about API access, or confirming
  whether the endpoint is meant for public use at all).
- Browser access remains the single highest-value unblock for this entry, as it has been
  since 2026-08-22.
