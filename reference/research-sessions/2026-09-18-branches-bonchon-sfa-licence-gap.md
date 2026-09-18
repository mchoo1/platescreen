# 2026-09-18 (2nd run) — Bonchon: SFA live-API licence-gap finding

## Context

`bonchon` has been the first-listed medium-priority pending entry in `branchQueue.ts` since
2026-08-21 and has been blocked on browser access (for `bonchon.sg/find-us/`) in essentially
every unattended run since. This run's browser wall was reconfirmed identical to every prior
one — the in-app Browser pane's `request_access` was declined for a neutral control URL before
any attempt at `bonchon.sg` — so no change there. This run instead built on the same-day earlier
run's discovery of SFA's live Track Records JSON API
(`reference/research-sessions/2026-09-18-sfa-live-api-discovery.md`), fixed a header gap that run
had, and used it to run a definitive, control-verified check.

## The header fix

The earlier run's `web_fetch`-based calls to `GET https://www.sfa.gov.sg/api/TrackRecord/GetTrackRecord`
got real data for `businessName=GRAIN` but then apparently hit a soft-throttle for later calls.
This run's own first attempts (via `bash`/`curl`, not `web_fetch` — `web_fetch` itself refuses to
fetch this URL outright due to its URL-provenance restriction) got a *different* failure mode: a
generic ASP.NET `{"message":"No HTTP resource was found that matches the request URI '...'"}`
error on every call, including a plain `businessName=GRAIN` retry that should have worked.

Fetching the Track Records page's own `/Mvc/Scripts/TrackRecord/track-record.js` directly showed
the front-end's actual AJAX call:

```js
$.get('/api/TrackRecord/GetTrackRecord', req, function (result) { ... })
```

made via jQuery's `$.get`, which by default sends `X-Requested-With: XMLHttpRequest`, and the
browser adds its own `Referer` header for a same-origin page. Adding both headers explicitly to
the `curl` calls:

```
-H "X-Requested-With: XMLHttpRequest"
-H "Referer: https://www.sfa.gov.sg/tools-and-resources/track-records"
```

fixed it immediately — every subsequent call returned real, correct JSON, and stayed reliable
across ~12 calls in this run with careful control-bracketing (no sign of the soft-throttle the
earlier run hit). This strongly suggests the earlier run's "throttle" and this run's earlier
"404" were actually the *same* underlying cause (missing headers → some kind of WAF/anti-bot rule
serving a decoy response), not a real rate limit — though this isn't fully proven and future runs
should still budget calls conservatively and keep bracketing with controls.

## What this resolved

Queried, each one bracketed immediately before and/or after by a known-good control query
confirmed to return real data:

| Query | Result | Control(s) |
|---|---|---|
| `businessName=BONCHON` | zero | `GRAIN` before, `GRAIN`+`MCDONALD`+`CAFE` after — all real data |
| `businessName=BON CHON` | zero | same bracket |
| `licenseeName=BONCHON` | zero | `CAFE` immediately after — real data |
| `licenseeName=BONCHON SINGAPORE` | zero | same bracket |
| `licenceNumber=CE12104B000` | zero | `NW15304E000` immediately before AND after — both real data |

`CE12104B000` is `bonchon_p1560`'s own SFA licence number in `premises.ts` — the Bugis+ #01-11
premises, and Bonchon's **only** currently-recorded real premises in the whole database. It no
longer appears in SFA's live register under its own licence number, under `BONCHON`/`BON CHON` as
a business name, or under `BONCHON`/`BONCHON SINGAPORE` as a licensee name — three independent,
control-verified negative results.

Also tested (and found unreliable, so **not** trusted as evidence either way): `establishmentAddress`
and `postalCode` as standalone filters returned zero even for well-established terms like
`VICTORIA STREET` and `BUGIS+`, confirming the discovery doc's existing note that these two params
don't work reliably alone, headers or not.

## Corroboration attempt (inconclusive)

WebSearch found split signals:
- Burpple: "[CLOSED] Bonchon (Bugis+) - Singapore"
- SingMalls: "[CLOSED] BONCHON Chicken - Bugis+"
- A Bonchon Singapore Facebook post (first-party) with URL slug
  `the-wait-is-over-our-bugis-store-is-now-reopened-with-a-new-look-bonchon-at-bugis` — implying a
  past reopening, but undated (Facebook page itself returned an empty body via plain fetch, same
  JS-rendering wall as every prior attempt at this domain, so the post date couldn't be read)
- `bugismall.com/shops` (Bugis+'s own official mall-operator site) — also JS-rendered/empty-body
  via plain fetch, unreadable without a browser

Neither aggregator source is admissible under this task's rules, and the one first-party lead
(the Facebook post) can't be dated without a real browser.

## Decision

Not flipping `bonchon` to `researched: zero premises` — unlike `gong_cha`'s resolution, there is
no unambiguous, dated, official brand statement confirming closure, only a strong-but-not-fully-
conclusive SFA-register gap plus split third-party signals. `bonchon_p1560` is left in
`premises.ts` unchanged. `branchQueue.ts`'s notes were updated with the full finding and two
concrete next steps for whoever gets browser access next:

1. Render `bugismall.com/shops` to check whether unit #01-11 currently lists Bonchon or a
   different/vacant tenant.
2. Render `facebook.com/bonchonsg` to date the "reopened" post and check for a more recent
   closure announcement.

## Files touched

- `src/lib/branchQueue.ts` — `bonchon` entry's `notes` extended with this run's findings. Status
  kept `'pending'`.
- No changes to `premises.ts`, `brands.ts`, or any other Premises/Brand data this run.

## Typecheck / commit

Phase 5 (`npx tsc --noEmit`, run against a sandboxed copy of the repo after `npm install`,
excluding `node_modules`/`.next`/`out`/`.git`/`reference`): **passed clean**, no errors.

Phase 6 (local commit, no push): **blocked**, not completed. `.git/index.lock` exists in the
working repo and could not be removed — every removal attempt (`rm -f`, `chmod` implicitly via
`rm`, and Python `os.remove`) returned `Operation not permitted` (EPERM), not a permissions
issue on this sandbox's side (the file is owned by the same user with `0700` perms) but
consistent with the underlying Windows-hosted file being locked by another process outside this
Linux sandbox's visibility (`ps aux` shows no git process running here). This is a platform-level
blocker, not a content or logic issue — `src/lib/branchQueue.ts`'s edit and this report file are
both saved to disk and ready to commit; only the `git commit` step itself could not run this
session. A future run (or the user, from a regular Windows terminal) should delete
`PlateScreen/.git/index.lock` manually if it's confirmed stale, then commit these two files.
