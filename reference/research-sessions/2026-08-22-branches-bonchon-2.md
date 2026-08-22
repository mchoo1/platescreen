# 2026-08-22 — Branch research session: Bonchon (2nd run, same day)

**Task:** `platescreen-research-branches` (scheduled, unattended)
**Brand:** `bonchon` (Bonchon Korean Fried Chicken)
**Selected because:** deterministic queue order unchanged since the first 2026-08-22 run — `bonchon` is still the first pending, medium-priority entry (`gong_cha` resolved to `researched` earlier today; medium-priority pending order is bonchon, dosirak, grain — bonchon listed first).

## Starting state

Same as the first run today: 1 confirmed real premises (`bonchon_p1560`, Bugis+ / 201 Victoria Street). Notes recorded Option A (SFA matching) exhausted twice (2026-08-20, 2026-08-21) and Option B (official locator) blocked last run because Claude in Chrome wasn't connected.

## Method attempted this session

**Option A (SFA matching) — re-checked, still nothing new.** Searched the project and this run's uploads folder for a newer SFA Track Records xlsx export; none found. No new source data means no point re-running the same Business Name search that already returned zero hits twice.

**Option B (official store locator) — attempted again, still blocked, but with new detail:**
- Claude in Chrome: `list_connected_browsers` returned an empty list — not connected, same as last run. No user present in this unattended run to connect it.
- `bonchon.sg/find-us/`: now returns **HTTP 403 Forbidden** via direct fetch (previously it returned an empty 200 body) — the site's bot-protection appears to have tightened between runs. `robots.txt` now explicitly reads `Disallow: /` for all user agents. No `sitemap.xml` or `sitemap_index.xml`.
- New lead: WebSearch surfaced that bonchon.sg links to its own first-party ordering platform, `bonchon.atlas.kitchen` (built on Atlas, a Singapore restaurant POS/ordering SaaS — confirmed via atlas.kitchen's own marketing site). Tried fetching it directly and several likely paths (`/`, `/locations`, `/stores`, `/outlets`, `/api/locations`, `/api/stores`, `/menu`) with a standard browser User-Agent header. **All return HTTP 500** with body `Cannot read properties of null (reading 'title')` — the storefront's server-side rendering appears to depend on browser context (cookies, geolocation, etc.) that a plain HTTP request doesn't provide, so it errors instead of serving content to non-browser requests.
- Checked whether Atlas Kitchen's public API (`docs.atlas.kitchen`) could help: it's a merchant-authenticated order/menu API (`api.atlas.kitchen/admin/v1`, requires merchant ID + API key), not a public store-locator endpoint — not usable for this purpose even if credentials were available.
- WebSearch again surfaced the same non-admissible signals as last run (PLQ Mall, Compass One, Wisma Atria, Hillion Mall per bonchon.sg content reflected in search snippets; plus Yishun Ave 2 and Victoria St/Bugis addresses via Yelp) — all third-party-sourced or lacking a directly-fetchable first-party page, so none added.

## Result

**Zero new Premises rows added, again.** Both research options are now conclusively exhausted for this run: Option A has no new data source to try, and Option B's two candidate first-party endpoints (the marketing site's locator page and the ordering platform) both actively reject non-browser requests. This is a strict dependency on Claude in Chrome being connected — no fetch-based workaround exists for either endpoint.

`branchQueue.ts`: `bonchon` entry left as `status: "pending"`. Notes field appended (not replaced) with this run's findings, so a future run has the full history: what was tried on 2026-08-20, 2026-08-21, and both 2026-08-22 runs, and exactly why each attempt failed.

## Verification

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox, ran `npm install` (394 packages) and `npx tsc --noEmit` — passed clean (exit 0). Only change made was appending to the `notes` string in `branchQueue.ts`; `premises.ts` was not touched, so no chunking/schema concerns apply.

## Outcome

Brand left partial/pending, unchanged from before this run except for updated research notes. **This entry cannot progress further without Claude in Chrome connected** — recommend either connecting it before the next scheduled run, or manually supplying a newer SFA Track Records export if one becomes available (Option A path). Did not move on to a different queue entry (`dosirak`/`grain`) this run since the task specifies deterministic single-target selection and one brand per run; `bonchon` remains that target until it resolves or a future run's selection logic points elsewhere.
