# Branch premises backfill — Dosirak (2026-08-31)

**Brand researched:** Dosirak (`brandId: "dosirak"`)
**Priority:** medium · **Status before run:** pending · **Status after run:** pending (partial coverage)

## Method

1. **Resolved the standing ambiguity first.** The queue entry had deliberately excluded ~7 "Bibimbap/Dosirak" SFA listings under licensee `TENG SHENG BROTHERS PTE. LTD.` from the 2026-08-21 Track Records session, flagged as "unconfirmed whether it's the same Dosirak brand or a different bibimbap concept." Web search (SETHLUI, DanielFoodDiary, a CapitaLand mall directory listing, halalboleh.com) confirmed "Bibimbap/Dosirak" and "Dosirak" are the same brand — a halal-certified bibimbap concept founded 2014, with some outlets trading as "Teng Sheng Bibimbap & Dosirak." Not a distinct concept.
2. **No cached SFA Track Records xlsx** (the richer 52,101-row, Business-Name-field export used in the 2026-08-21 session) was available in the project or uploads this run, so Option A fell back to the data.gov.sg licensed-establishment dataset (`d_227473e811b09731e64725f140b77697`) queried via exact `filters={"licensee_name":"..."}` (not the unreliable fuzzy `q=`).
3. Exact match on `TENG SHENG BROTHERS PTE LTD` returned exactly 2 records — a smaller/different snapshot than the Track Records export (which apparently had ~7 under a slightly different licensee-name spelling with periods). Both sampled and verified:
   - `50 PASIR PANJANG ROAD #03-51 MAPLETREE BUSINESS CITY SINGAPORE 117384` (licence SW16583K000, grade na)
   - `604 SEMBAWANG ROAD #02-24 SEMBAWANG SHOPPING CENTRE SINGAPORE 758459` (licence NW08506V000, grade A)
4. The Sembawang Shopping Centre address independently matches a Dosirak location surfaced by web search (halalboleh.com), corroborating the licensee match. Mapletree Business City isn't mentioned in any web source found, but shares the identical distinctive (non-generic) licensee entity, so it was trusted per the same reasoning applied to other single-licensee brand matches in this project.
5. Tried `datastore_search_sql` to search all 4 remaining known mall addresses (313@Somerset, Suntec City, Bukit Panjang Plaza, Anchorvale/Compassvale) in one query — endpoint returned a 404 (appears deprecated/removed on data.gov.sg). Not usable this run.
6. Geocoded both new addresses via OneMap (`elastic/search`), sequential requests, both succeeded on first try (postal codes 117384, 758459).

## Result

- **Premises added:** 2 (`dosirak_p29`, `dosirak_p30`), appended to a new `PREMISES_13` chunk in `premises.ts` (the prior `PREMISES_12` chunk had grown to ~1,100 entries, well past the ~400 guideline, so new records went in a fresh chunk rather than extending it further).
- **Total Dosirak premises now:** 4 (`dosirak_p27` OUE Downtown, `dosirak_p28` DUO Galleria, `dosirak_p29` Mapletree Business City, `dosirak_p30` Sembawang Shopping Centre).
- **Geocoding:** 2/2 succeeded.
- **Known gap vs. total real locations:** web search surfaced 313@Somerset, Suntec City, Bukit Panjang Plaza, and an Anchorvale/Compassvale outlet as additional current/recent Dosirak locations. None matched under the `TENG SHENG BROTHERS PTE LTD` or `P.O. NOSH PRIVATE LIMITED` exact-licensee searches — likely each held under yet other per-outlet corporate entities, consistent with the pattern already seen across `dosirak_p27` (P.O. Nosh) vs `dosirak_p28` (K Royce Pte Ltd). Coverage is therefore still **partial**; status left as `pending` rather than `researched`.
- **Typecheck:** `npx tsc --noEmit` passed with no errors (verified in a sandbox copy, excluding `node_modules`/`.next`/`out`/`.git`/`reference`).

## Next steps (recorded in `branchQueue.ts` notes)

- If a fresh SFA Track Records xlsx (or equivalent Business-Name-field export) becomes available, re-run `DOSIRAK`/`BIBIMBAP` businessName search against it first — that's the fastest path to the remaining 4 locations.
- Otherwise, try Option B (an official Dosirak store list/social page) specifically for 313@Somerset, Suntec City, Bukit Panjang Plaza, and the Anchorvale/Compassvale outlet.

## Other queue entries checked but not advanced this run

- **bonchon** (medium priority, listed before dosirak): blocked on needing a JS-rendered store locator read. Tried the built-in browser pane (`mcp__Claude_Browser__navigate`) as a possible substitute for Claude in Chrome — navigation was denied/unavailable in this unattended context (no user present to approve), and `list_connected_browsers` confirmed zero Chrome extension instances connected either. No progress possible; left as-is, no new notes added since the situation is identical to the prior two runs.

## Phase 6 — Commit: BLOCKED (environment limitation, needs manual follow-up)

`git add -A -- src/lib/premises.ts src/lib/branchQueue.ts reference/research-sessions/2026-08-31-branches-dosirak.md` failed immediately with `fatal: Unable to create '.git/index.lock': File exists` — a **pre-existing** stale lock (not created by this run) that this session cannot remove: `rm`, `mv`, and `chmod`+`rm` on `.git/index.lock` all fail with `Operation not permitted`, consistent with the documented OneDrive-FUSE-mount limitation recorded in the 2026-08-23 session report (`reference/research-sessions/2026-08-23-kopitiam_chinatown_roasted.md`) — this sandbox cannot delete/rename/unlink files on this mount, which is exactly what git's lock cleanup and object-finalization needs. All edits described above (premises.ts, branchQueue.ts, this report) are correctly written to disk and typecheck-clean; **none of it is committed**. A human needs to, from a regular Windows session (not this sandbox):

```
del ".git\index.lock"          (or delete it in File Explorer)
cd "C:\Users\mchoo\OneDrive\Desktop\PlateScreen"
git add src/lib/premises.ts src/lib/branchQueue.ts reference/research-sessions/2026-08-31-branches-dosirak.md
git commit -m "Premises: extend dosirak (Teng Sheng Brothers Pte Ltd, 2 new)"
```

This stale lock will also block any *other* git operation in this repo (including a future scheduled run) until cleared — worth flagging to the user directly, not just leaving buried in this file.
