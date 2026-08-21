# 2026-08-22 — Branch research session: Bonchon

**Task:** `platescreen-research-branches` (scheduled, unattended)
**Brand:** `bonchon` (Bonchon Korean Fried Chicken)
**Selected because:** first pending, medium-priority entry in `branchQueue.ts` (queue order: bonchon, banquet[low], mccafe[low], dosirak[medium], nourish_bowl[low], superfood_kitchen[low], wendys[low], grain[medium]; gong_cha is `researched`, not pending). Among pending medium-priority entries (bonchon, dosirak, grain), bonchon is listed first.

## Starting state

1 confirmed real premises (`bonchon_p1560`, Bugis+ / 201 Victoria Street, from the 2026-08-20 licensee-matching session). The entry's notes recorded that both licensee-name matching (2026-08-20) and SFA Track Records Business Name matching (2026-08-21) had already been tried and found no further hits, and recommended trying the official store locator next.

## Method attempted this session

**Option A (SFA matching) — not re-attempted.** No newer SFA Track Records xlsx export was found cached in the project or in this run's uploads folder (checked both), so there was nothing new to re-run Business Name matching against. Per the task's own instruction, re-running without new source data would just repeat the 2026-08-21 zero-result search.

**Option B (official store locator) — attempted, blocked.**
- `bonchon.sg/find-us/` is the brand's official locator page. Direct fetch (`web_fetch`) returns an empty body — the page is JS-rendered with no server-side content to parse.
- Claude in Chrome (needed to render JS-heavy pages) was **not connected** in this scheduled/unattended run (`tabs_context_mcp` returned "Claude in Chrome is not connected"). There is no user present in a scheduled run to install/sign in the extension, so this path could not be completed this session.
- Checked for workarounds: no `sitemap.xml`, no per-location static pages on bonchon.sg (only blog posts + standard site pages indexed).
- Read two first-party bonchon.sg blog posts that reference specific outlets:
  - "Top 5 Asian Restaurants in Hillion Mall" — confirms a Bonchon outlet at Hillion Mall (17 Petir Road), no unit number given.
  - "Bonchon Hillion Promotions" — same outlet, but the post is dated 2023 (promo validity "1 Apr 23 – 31 Mar 24"), so current operating status is unconfirmed from this alone.
- Search-engine (WebSearch) crawl snippets of bonchon.sg's own pages also suggest Compass One, Wisma Atria, and PLQ Mall are current outlets (referenced together with specific operating hours, which reads as sourced from the site's own content) — but exact unit addresses for these three were only obtainable from third-party aggregators (hungrycat.sg, foodadvisor.com.sg, burpple.com, lookup.sg). Per this task's rules, third-party aggregator addresses are not an admissible source, so none of these were added.

## Result

**Zero new Premises rows added.** No verified official address data was obtained this session — everything found either lacked a precise, currently-verified address (Hillion Mall) or came only from non-admissible third-party sources (Compass One, Wisma Atria, PLQ Mall). Adding any of these without a verified source would violate the "never fabricate or estimate premises addresses" rule.

`branchQueue.ts`: `bonchon` entry left as `status: "pending"`. Notes field updated with the above findings and a clear resume path for the next run: use Claude in Chrome to render `bonchon.sg/find-us/` directly, then cross-check/confirm exact unit numbers for Hillion Mall, Compass One, Wisma Atria, and PLQ Mall before geocoding via OneMap.

## Verification

Copied the project (excluding `node_modules`, `.next`, `out`, `.git`, `reference`) to a sandbox, ran `npm install` (394 packages) and `npx tsc --noEmit` — passed clean (exit 0). Only change made was the `notes` string in `branchQueue.ts`; no `Premises` schema or chunking concerns apply since `premises.ts` was not touched.

## Outcome

Brand left partial/pending — no data added, only research notes updated so the next run doesn't repeat the same failed static-fetch attempt and instead goes straight to Chrome-rendering the locator page.
