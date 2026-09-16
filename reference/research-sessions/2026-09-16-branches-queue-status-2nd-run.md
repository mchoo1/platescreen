# 2026-09-16 (2nd run this date) — Branch queue status check, no new premises

## Summary

This was the second scheduled `platescreen-research-branches` run today (an earlier run this
date already produced commit `b43439e`, "Premises: extend bonchon/grain research notes (no new
premises, browser access still blocked)"). Following Phase 1's deterministic selection rule
(pending entries sorted by priority, first-listed wins), `bonchon` (medium priority) was
selected again as the queue's first-listed pending entry.

## What was tried

**bonchon (medium, pending, unchanged):** Attempted the in-app Browser pane on a neutral control
URL (`google.com`) before touching `bonchon.sg`, per this entry's own established diagnostic
pattern. `preview_start` reported the pane hadn't been granted access; the follow-up
`request_access` call was explicitly declined ("user declined... do not retry"). This is the
same unattended-session permission wall documented across roughly a dozen prior runs since
2026-08-22, with one interactive-session exception on 2026-09-02. No new information — did not
attempt `bonchon.sg` directly since the control URL itself was declined outright. Status and
notes otherwise unchanged; a supplementary note was appended documenting this attempt so a
future run doesn't waste a cycle repeating an identical, now well-documented wall.

**grain (medium, pending, unchanged):** Pivoted here per the established pattern (bonchon
blocked → try the next medium-priority entry). A WebSearch AI summary surfaced what looked like
a new business address ("6 Eu Tong Sen Street #05-21, The Central, Singapore 059817") distinct
from the already-captured Burn Road kitchen. Traced this back to source data before trusting it,
per this project's "never bulk-trust a match" rule: cross-checked GRAIN PTE. LTD. (UEN
201332903E) against opengovsg.com, sgpbusiness.com, recordowl.com, and Tracxn — all four
independently show only the single registered address already captured in `grain_burn_road`
(5 Burn Road #05-01). The Eu Tong Sen Street address could not be corroborated and is treated as
an unconfirmed/likely-erroneous AI-summary artifact, not added. Also found GRAIN HOLDINGS PTE.
LTD. (UEN 201928022K), a separate legal entity registered at the identical Burn Road address —
not a new physical location, not added as a separate premises. Total real premises unchanged at
3. Status kept `pending`.

**nourish_bowl (low, pending, unchanged):** Ran a fresh, differently-angled round of searches
(general restaurant/menu query, a domain-guess query for nourishbowl.sg/.com.sg, an NEA
hawker-stall-specific query) — zero results under the exact name "Nourish Bowl" in Singapore.
Surfaced two more lookalikes and ruled both out: "NOURISH TABLE" (Botanic Gardens — already
known, different name) and "The Nourish Co." (a Singapore catering service — different name,
different business model). This is now an 8th independent research pass (per this entry's own
running count) finding no confirmable current Singapore presence under this exact name; the one
check that could resolve it definitively — a rendered read of `@nourish_bowl`'s Instagram
bio/location — remains blocked on browser access, denied again this run for the same reason as
bonchon. Left `pending` per this entry's standing recommendation for a human decision.

**mccafe:** Not re-picked, per its own note's explicit instruction not to re-pick until a human
resolves the co-location taxonomy question (fold into `mcdonalds` vs. keep as a standalone
Brand) already raised across three prior sessions.

## Net result

Zero new Premises rows added this run. `src/lib/premises.ts` was not touched.
`src/lib/branchQueue.ts` notes were extended for `bonchon`, `grain`, and `nourish_bowl` to record
this run's (negative) findings, so a future run doesn't repeat the same dead ends. All statuses
unchanged (`bonchon`: pending, `grain`: pending, `nourish_bowl`: pending, `mccafe`: pending,
untouched).

## Verification

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox
directory. `npm install` initially failed with `ENOSPC` even though `df -h` showed ~2.9G free —
this affected every npm invocation in the sandbox, including read-only ones like `npm config get
cache`, suggesting an npm-cache-path-specific quota issue in this session's environment rather
than genuine disk exhaustion (plain file writes via `node`/shell worked fine throughout).
Worked around it by pointing npm at a fresh cache directory (`npm install --cache
/tmp/freshcache`), which succeeded (394 packages). `npx tsc --noEmit` still hit the same
ENOSPP-cache issue (npx tries the default cache path regardless of the install-time override);
ran the installed binary directly instead (`./node_modules/.bin/tsc --noEmit`), which completed
with exit code 0 — clean, no type errors.

## Commit

**Could not commit this run.** `git add`/`git commit` repeatedly failed with `fatal: Unable to
create '.git/index.lock': File exists`. Waited (~3 minutes total, several retries) and confirmed
via `stat` that the lock file's mtime never advanced and `git log` HEAD never moved during that
window, which would normally suggest an ordinary stale lock safe to remove per git's own
suggested recovery — but every removal attempt (`rm -f`, then a Python `os.remove`) failed at
the OS level with `EPERM` ("Operation not permitted"), not the "already gone"/"stale" behavior
a truly abandoned lock would show. Since this repo lives on a folder mounted from the host
filesystem, `EPERM` on unlink is consistent with another process — almost certainly a
concurrent `platescreen-research-branches` run or another session working in this same
folder (untracked files from other in-flight work, e.g. `reference/research-sessions/
2026-09-16-mccafe-colocation-22nd-pass.md` and `reference/planning/Comment-Copilot-Digests/
2026-09-16.md`, were visible in `git status` throughout this run) — genuinely holding the lock
on the real filesystem. Forcing removal risked corrupting that other process's in-progress git
operation, so it was deliberately not forced.

**Net effect:** the `branchQueue.ts` edit and this report exist on disk (uncommitted) but were
not committed or pushed this run. A future run (or the user) should check `git status` in the
PlateScreen repo — if the lock has cleared, run `git add src/lib/branchQueue.ts
reference/research-sessions/2026-09-16-branches-queue-status-2nd-run.md && git commit` to land
this run's notes-only change. No premises data was at risk since `premises.ts` was never
touched this run.
