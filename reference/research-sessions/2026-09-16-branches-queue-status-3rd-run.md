# 2026-09-16 (3rd run this date) — Branch queue status check, no new premises

## Summary

Third scheduled `platescreen-research-branches` run today (earlier runs today produced commit
`b43439e`, "Premises: extend bonchon/grain research notes," plus an uncommitted 2nd-run edit —
see Commit section below). Following Phase 1's deterministic selection rule (pending entries
sorted by priority, first-listed wins), `bonchon` (medium priority) was selected again as the
queue's first-listed pending entry.

## What was tried

**bonchon (medium, pending, unchanged):** Used the in-app Browser pane directly against
`https://bonchon.sg` (not just a neutral control URL, to rule out a control-URL-specific issue).
`preview_start` reported the pane hadn't been granted access to that origin; the follow-up
`request_access` call was explicitly declined ("user declined... do not retry"). Same unattended-
session permission wall documented across roughly a dozen-plus prior runs since 2026-08-22 (one
interactive-session exception on 2026-09-02). Per this entry's own standing guidance, did not
retry and pivoted to the next medium-priority pending entry.

**grain (medium, pending, unchanged):** Tried a new angle — Grain's own LinkedIn company page
plus a fresh cross-reference across sgpbusiness.com, singaporehalaldirectory.com, sg.ltddir.com
(two distinct entries, including a "THE GRAIN PTE. LTD." variant), acaps.sg, recordowl.com, and
sgpgrid.com's "GRAIN INTERNATIONAL PTE. LTD." profile. Every source independently converges on
the single registered address already captured as `grain_burn_road` (5 Burn Road #05-01, Tee
Yih Jia Food Building). LinkedIn confirms Grain also operates in Thailand (not relevant to SG
premises). "THE GRAIN PTE. LTD." and "GRAIN INTERNATIONAL PTE. LTD." read as distinct legal
entities from the confirmed "GRAIN PTE. LTD." (UEN 201332903E) but neither surfaced an
additional address. Total real premises unchanged at 3. Status kept `pending` — every lead
reachable without a browser now appears genuinely exhausted for this brand.

**nourish_bowl (low, pending, unchanged):** Tried a LinkedIn-company-page search as a new angle
— zero results for a Singapore company named "Nourish Bowl" (only unrelated "Nourish
Ingredients," "Nutra Nourish," "Nourish Foods," "Nouri Restaurant" entities). This is now a 9th
independent research pass (per this entry's own running count) finding no confirmable current
Singapore presence under this exact name; the one check that could resolve it definitively — a
rendered read of `@nourish_bowl`'s Instagram bio/location — remains blocked on browser access,
denied again this run for the same reason as bonchon. Left `pending` per this entry's standing
recommendation for a human decision.

**mccafe:** Not re-picked, per its own note's explicit instruction not to re-pick until a human
resolves the co-location taxonomy question already raised across multiple prior sessions.

## Net result

Zero new Premises rows added this run. `src/lib/premises.ts` was not touched. `src/lib/
branchQueue.ts` notes were extended for `bonchon`, `grain`, and `nourish_bowl` to record this
run's (negative) findings, so a future run doesn't repeat the same searches. All statuses
unchanged (`bonchon`/`grain`/`nourish_bowl`: pending, `mccafe`: pending, untouched).

## Verification

Mirrored the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to
`/tmp/ps-mirror` (root filesystem `/dev/sda1`, ~1.8G free at session start — not the full
`/sessions` disk) with `npm_config_cache=/tmp/npm-cache`, per the disk-exhaustion workaround
documented in `reference/research-sessions/2026-09-16-diet-tag-categorical-exclusion-audit-and-
disk-workaround.md`. An initial attempt using the default sandbox path/cache under `/sessions`
hit `ENOSPC` immediately, confirming that workaround is still necessary. `npm install` in
`/tmp/ps-mirror` succeeded (394 packages, ~13s). `npx tsc --noEmit` completed with exit code 0 —
clean, no type errors. Independently confirmed the mirrored file matched the live edit (grep for
this run's added marker text returned exactly 3 matches in the live file, one per edited entry;
`grep -c 'brandId:'` confirmed all 7 queue entries and the file's closing `];` are intact).
Deleted the mirror and npm cache afterward.

## Commit

**Could not commit this run.** `.git/index.lock` is still present (first observed by the 2nd run
today at 06:12 local, `stat` shows its ctime advanced to ~21:10 today, i.e. something touched it
roughly an hour before this run started at 22:13, but content/mtime never changed). `git add`
fails with "Another git process seems to be running in this repository." A direct `rm -f
.git/index.lock` fails with `Operation not permitted` (not "no such file" — a real permission
denial at the OS level, not a race), matching the 2nd run's identical finding. Since this repo
sits on a Windows/OneDrive-mounted folder shared with other concurrent sessions (`git status`
this run shows unstaged changes to `premises.ts` and `researchQueue.ts` and several untracked
files this run did not create — e.g. `2026-09-16-king_of_fried_rice_hws_square_2.md`,
`2026-09-16-mccafe-colocation-23rd-pass.md` — evidence of other in-flight work), forcing lock
removal risked corrupting another process's in-progress git operation, so it was deliberately not
forced, consistent with the 2nd run's decision.

**Net effect:** this run's `branchQueue.ts` edit and this report exist on disk (uncommitted), on
top of the 2nd run's own uncommitted `branchQueue.ts` edit (never separately committed either,
per its report). No premises data was at risk since `premises.ts` was never touched by this run.
A future run (or the user) should check `git status` in the PlateScreen repo — if the lock has
cleared, run `git add src/lib/branchQueue.ts reference/research-sessions/2026-09-16-branches-
queue-status-2nd-run.md reference/research-sessions/2026-09-16-branches-queue-status-3rd-run.md
&& git commit -m "Branches: re-confirm bonchon/grain/nourish_bowl blocked, no new premises
(2026-09-16, 2nd+3rd runs)"` to land both runs' notes-only changes together. Did not run `git
push` (not attempted, and not permitted per this task's rules regardless).
