# 2026-08-21b — platescreen-research-branches: Gong Cha (blocked, security anomaly)

## Selection

`src/lib/branchQueue.ts` filtered to `status === 'pending'`, sorted by priority
(high → medium → low), first-listed within tier. **Gong Cha** (`gong_cha`) is the
only `high`-priority entry in the queue (the other 8 — bonchon, banquet, mccafe,
dosirak, nourish_bowl, superfood_kitchen, wendys, grain — are `medium`/`low`), so
it was selected deterministically.

## What was already known (from the entry's `notes`)

Gong Cha had already been checked twice and failed both times:
- 2026-08-20 licensee-name matching against the data.gov.sg dataset — no resolution
  (not in the 25-chain resolved list from that session).
- 2026-08-21 (earlier same-day session) — zero `businessName` hits for "GONG CHA"
  against the full 52,101-row SFA Track Records export. Consistent with most
  bubble-tea chains registering each outlet under its own franchisee shell company
  with no shared identifiable string.

No cached/newer SFA Track Records xlsx export was found in the project or in the
session's uploads folder to re-run (the only xlsx files present, `LicensedFoodEstablishmentsSearch*.xlsx`
in `uploads/`, are dated 2026-08-09 — older than the 2026-08-21 Track Records session
that already superseded them, not a new export). So Option A (SFA matching) was
correctly already exhausted; this session went straight to Option B per the queue notes.

## Option B — official store locator (gongcha.com.sg)

Attempted to reach Gong Cha SG's official store locator (`gongcha.com.sg/outlets`,
`/store-locator`, homepage). Result: **blocked by a security anomaly, not a data
problem.**

- Chrome (via the browser tool) returned a hard **"Privacy error"** interstitial on
  every page of the domain — did not proceed past it.
- Independently confirmed via `curl -v` / `openssl s_client` from the sandbox: the
  TLS certificate currently served by `www.gongcha.com.sg` (103.7.9.22) is a
  Let's Encrypt cert issued for **`ahmadalbab30.pw`**, not `gongcha.com.sg`:
  ```
  subject: CN=ahmadalbab30.pw
  subjectAltName does not match www.gongcha.com.sg
  SSL: no alternative certificate subject name matches target host name 'www.gongcha.com.sg'
  ```
- This is not a routine expired-certificate situation (the cert itself is currently
  valid, Aug–Nov 2026 — it's simply for the wrong domain). It's consistent with the
  domain having lapsed and been re-pointed/squatted, DNS being redirected, or a
  shared-hosting misconfiguration serving the wrong vhost's certificate.
- A plain-text `web_fetch` of the bare homepage earlier in the session had returned
  what looked like genuine Gong Cha marketing copy — but given the cert mismatch
  confirmed afterward, that content should **not** be treated as verified/authoritative;
  it may not have gone through the same certificate validation path. No data from
  that fetch was used.
- Did not bypass the browser security warning. Did not attempt any workaround
  (e.g., `-k`/insecure fetch) to pull data through the broken TLS — per the
  project's "never fabricate/never trust unverified sources" rule, an
  unauthenticatable channel to the domain is treated as no source at all.

## Outcome

- **No premises added or changed for `gong_cha` this session.**
- `branchQueue.ts` entry left at `status: "pending"`, `priority: "high"` (unchanged —
  full/complete coverage was not obtained, so per the task's own rule the entry
  cannot flip to `researched`).
- Notes field extended with the full finding above (verbatim technical detail) so a
  future run doesn't retry gongcha.com.sg blind — it should first check whether the
  cert issue has been confirmed resolved, or find a different official source
  entirely (Gong Cha's mobile app, an official social/help-center page, etc.).
- No other queue entries were touched — per "one brand per run," this session did
  not fall through to the next-priority entry after Gong Cha's research hit a dead
  end; it stopped and reported instead.

## Typecheck

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`)
into a sandbox, `npm install`, `npx tsc --noEmit` — **clean, no errors.** (Only a
prose `notes` string in `branchQueue.ts` changed this session; no `Premises` or
`Brand` records were touched.)

## Recommendation for a human

The `ahmadalbab30.pw` certificate mismatch on `gongcha.com.sg` is worth a manual,
out-of-band check (e.g., confirm the domain's registration/expiry status directly,
or check Gong Cha SG's official social channels for whether they've announced a
site issue) — this could be a real security incident (domain hijack / expired
domain picked up by an unrelated party) worth flagging to Gong Cha SG or at minimum
avoiding until resolved.
