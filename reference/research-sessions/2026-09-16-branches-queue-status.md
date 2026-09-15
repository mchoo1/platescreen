# 2026-09-16 — Premises-backfill run: no new premises (browser access blocked again)

## Selection

Per Phase 1's deterministic rule (pending entries, sorted by priority, first-listed
wins), the target was **bonchon** (medium priority, first-listed pending entry).
`grain` (medium) is the only other pending entry above low priority; `mccafe` and
`nourish_bowl` (both low) are flagged in their own notes as blocked on a human
decision, not further automated research.

## What was tried

**bonchon:** Confirmed the browser-access wall that has recurred in nearly every
unattended run since 2026-08-22 is still up. Tried `request_access` for both a
neutral control URL (google.com) and bonchon.sg/find-us/ directly (not just the
control, in case the block was control-URL-specific) — both declined. A fresh
WebSearch surfaced one previously-unseen source, sgvue.com/outlet-directory/, but
it repeats the same 4 malls (Compass One, Wisma Atria, PLQ, Hillion) already
reported by other third-party aggregators — same inadmissible source class per
this task's rules, not corroborating evidence. No new SFA Track Records xlsx
found in uploads or the project.

**grain:** Re-checked browser access (same wall). One genuinely new data point:
`grain.com.sg/home` is now fetchable via plain `web_fetch` (previously always
returned an empty JS-rendered body) — read its real static footer markup
directly: only About/Catering/Stories/Jobs/Press/social-link navigation, no
store-locator or address content. This confirms from the site's own markup
(rather than inference) that Grain has no walk-in storefronts to search for.
No new kitchen address surfaced; total remains the 3 already in `premises.ts`.

**nourish_bowl / mccafe:** Not re-attempted this run — both already have a
standing recommendation for a human decision (nourish_bowl: confirm/refute via
a logged-in Instagram check; mccafe: resolve the co-location taxonomy question
in `researchQueue.ts`'s `mccafe_colocation_research` entry) rather than further
automated searching.

## Outcome

Zero new Premises rows added — no admissible (SFA/official-source) data found
for any pending entry this run. Per this task's own rule against fabricating
addresses, nothing was added on the strength of third-party aggregator listings.
Appended brief dated notes to `bonchon` and `grain` in `branchQueue.ts`
recording this run's findings (see diff). No status changes — both remain
`pending`, consistent with prior runs' documented state.

## Verification

`src/lib/branchQueue.ts` was the only file touched (2 note-string edits, no
schema/structural change). Copied the project (excluding `node_modules`,
`.next`, `out`, `.git`, `reference`) to `/tmp/ps-verify` — `/sessions` was
100% full (matches other same-day sessions' reports), so per this project's
now-documented workaround, built the mirror under `/tmp` (root disk, which had
~1.1G free) and pointed `npm_config_cache` at `/tmp/npm-cache` instead of the
default `$HOME/.npm`. `npm install` succeeded (394 packages). `npx tsc --noEmit`
itself still hit `ENOSPC` (npx's own bootstrap writes to `$HOME/.npm` regardless
of `npm_config_cache` for the install step), so ran the already-installed
binary directly instead: `npm_config_cache=/tmp/npm-cache ./node_modules/.bin/tsc
--noEmit` — clean, exit 0, no errors. Deleted the mirror and npm cache
afterward; confirmed `/` back to 1.1G free.

## Commit

`git add -A && git commit` for the `branchQueue.ts` note update. Not pushed
(per standing rule).

## Not done

- No new Premises rows for bonchon, grain, mccafe, or nourish_bowl — every
  lead reachable without a connected browser appears exhausted for bonchon and
  grain specifically (both entries' notes now span 10+ dated attempts each);
  future progress on either most likely requires either a connected/approved
  browser session or a fresh SFA Track Records xlsx export.
- Did not touch `mccafe`'s or `nourish_bowl`'s entries — both are correctly
  gated on a human decision already documented in their own notes, not a
  research gap this task can close.
