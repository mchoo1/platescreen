import type { BranchQueueEntry } from '@/types/db';

/**
 * Work queue for the premises-backfill research task (platescreen-research-branches).
 * Each entry is a Brand still missing full real-premises coverage in premises.ts.
 *
 * 2026-08-21 update: SFA's own "Track Records" web tool (xlsx exports covering 52,101
 * licensed establishments, crucially including a Business Name field the earlier
 * data.gov.sg dataset lacked) resolved 39 brands from this queue — including
 * giant/cold_storage, previously excluded as unsafe due to a shared Dairy Farm
 * corporate licensee covering multiple retail banners; Business Name cleanly
 * disambiguates "Giant" vs "Cold Storage" vs "7-Eleven" listings under that same
 * licensee now. Also expanded subway (2->146), sheng_siong (1->90), fairprice
 * (banner-split into fairprice/fairprice_xpress/fairprice_finest using Business Name),
 * and 7eleven/krispy_kreme/boost_juice/saladbox (previously untried). One real data-
 * quality bug was found and fixed in the process: 4 of the original 25 "fairprice"
 * premises were actually Cheers/7-Eleven locations mislabeled under the shared NTUC
 * licensee — removed, along with 11 more at petrol-station addresses that share the
 * same ambiguity and couldn't be confirmed either way. See
 * reference/research-sessions/2026-08-21-sfa-track-records.md for full detail.
 *
 * 2026-08-20 update: this session matched 25 chains + 3 food-court operators
 * (kopitiam/koufu/foodfare) directly against the SFA/data.gov.sg licensed-
 * establishment dataset by exact licensee-name matching (not the unreliable
 * fuzzy search endpoint), geocoded 1,023 of 1,041 real premises via OneMap,
 * and wrote them straight into premises.ts. Those brands are removed from
 * this queue below. See reference/planning/database-restructure-proposal-2026-08-20.md
 * and reference/research-sessions/2026-08-20-brand-premises-restructure.md for
 * the full method and results.
 *
 * Priority is a starting heuristic — the research task should correct it if
 * actual premises count differs once researched.
 */
export const BRANCH_QUEUE: BranchQueueEntry[] = [
  {
    brandId: "bonchon",
    name: "Bonchon",
    priority: "medium",
    status: "pending",
    notes: "Re-checked 2026-08-21 against SFA's richer \"Track Records\" dataset \u2014 zero matches this round (the 1 premises found in the 2026-08-20 session under licensee 'BONCHON SINGAPORE PTE. LTD.' doesn't appear in this dataset's grade buckets, possibly a licence renewal/grade-cycle gap). Still only 1 confirmed real premises total (bonchon_p1560, Bugis+). 2026-08-22: attempted Option B (official store locator, bonchon.sg/find-us/) as this note previously suggested. The find-us page is JS-rendered \u2014 direct fetch returns an empty body, no static HTML content to parse. Claude in Chrome was not connected in this scheduled/unattended run, so the rendered page couldn't be read this session. Confirmed via bonchon.sg's own blog posts (first-party, not aggregator) that an outlet currently exists at Hillion Mall (17 Petir Road) \u2014 'Top 5 Asian Restaurants in Hillion Mall' and 'Bonchon Hillion Promotions' both reference it \u2014 but neither gives the exact unit number, and the promotions post is dated 2023 so current operation is unconfirmed, not verified enough to add as a Premises row. Search-engine crawl snippets of bonchon.sg also suggest Compass One, Wisma Atria, and PLQ Mall are current outlets (referenced with operating hours on-site), but exact addresses for those were only available via third-party aggregators (hungrycat.sg, foodadvisor.com.sg, burpple.com, lookup.sg) \u2014 not an admissible source per this task's rules, so not added. No sitemap.xml or per-location static pages found on bonchon.sg to work around the JS rendering. Added zero new Premises rows this run. Next run: resume with Claude in Chrome (navigate to bonchon.sg/find-us/, read the rendered page) for the authoritative current outlet list, then confirm exact addresses for Hillion Mall/Compass One/Wisma Atria/PLQ Mall and geocode via OneMap. 2026-08-22 (2nd run): Claude in Chrome again not connected (unattended run, zero connected browsers). Re-tried Option A first — no newer SFA Track Records export available (checked project + uploads, none found), so no new businessName variants to try. Re-tried Option B without Chrome: bonchon.sg/find-us/ now returns HTTP 403 (was empty-body before; site's bot-protection appears to have tightened) and robots.txt now explicitly disallows all crawling (\"Disallow: /\"), no sitemap.xml/sitemap_index.xml. Found a new lead via web search — bonchon.sg links to its own ordering platform at bonchon.atlas.kitchen (Atlas Kitchen, a Singapore restaurant POS/ordering SaaS) — tried fetching it and several likely paths (/, /locations, /stores, /outlets, /api/locations, /api/stores, /menu) with a standard browser User-Agent; all return HTTP 500 with body \"Cannot read properties of null (reading 'title')\", indicating the storefront's SSR requires real browser context (cookies/geolocation/etc.) and errors out for non-browser requests — not fetchable via curl/WebFetch either. Atlas Kitchen does have a public Open API (docs.atlas.kitchen) but it's a merchant-authenticated order/menu API, not a public store-locator endpoint, so not usable here. Re-confirmed via web search: outlets referenced as currently operating are PLQ Mall, Compass One, Wisma Atria, and Hillion Mall (consistent with 2026-08-22 1st-run findings) plus possible Yishun Ave 2 and Victoria St/Bugis addresses surfaced by Yelp listings — all still third-party sources, not admissible per this task's rules. No progress possible this run without Claude in Chrome connected. Next run: same as above — needs Claude in Chrome connected to read bonchon.sg/find-us/ (or bonchon.atlas.kitchen's rendered storefront) directly.",
  },
  {
    brandId: "banquet",
    name: "Banquet",
    priority: "low",
    status: "pending",
    notes: "Tried licensee-name guesses 'BANQUET', 'BANQUET FOODCOURT', 'BANQUET FOOD', 'BANQUET CATERING', 'BANQUET F&B' this session \u2014 zero matches for any (unlike kopitiam/koufu/foodfare, which all matched cleanly and now have real Brand+Premises rows \u2014 see brands.ts/premises.ts). Banquet's real registered corporate entity name is unconfirmed; needs either the official source or a different guess. Re-checked 2026-08-21 against SFA's richer \"Track Records\" dataset: 38 businessName hits for 'BANQUET', all confirmed false positives on inspection (hotel banquet/catering service listings \u2014 e.g. 'Raffles Sentosa Singapore' businessName='Banquet', 'Banquet Central Kitchen' at Pullman Hotel \u2014 none is the Banquet foodcourt chain). Still unresolved.",
  },
  {
    brandId: "gong_cha",
    name: "Gong Cha",
    priority: "high",
    status: "researched",
    notes: "RESOLVED 2026-08-22 \u2014 not a data-matching failure after all: Gong Cha shut every single Singapore outlet on 2026-10-02 in a complete franchisee exit (official brand statement at the time; site and social accounts were wiped), and has NOT reopened as of this run's date. This is exactly why 2026-08-20/21's SFA licensee-name and Business Name matching both found zero hits (no outlets = no active SFA licences to match) and why gongcha.com.sg is serving a mismatched/squatted TLS cert (ahmadalbab30.pw) \u2014 re-confirmed still broken this run via curl/openssl, consistent with the domain having lapsed after the brand's exit rather than being a routine hosting glitch. The former outlets are now trading under a different, unrelated brand ('Cai Ca', founded by Gong Cha SG's former franchisee CEO) \u2014 NOT the same brand, do not merge/reuse those premises for gong_cha. A spokesperson said Gong Cha plans to return in 2026 under a new franchisee ('Gong Cha 2.0'), but that has not happened yet as of 2026-08-22. Removed the stale 'gong_cha_p2' legacy_static_coordinate placeholder (\"multiple outlets islandwide\") from premises.ts since it's now confirmed actively misleading, not just unresearched \u2014 zero real premises exist for this brand today. Flipping to 'researched' because zero premises IS complete/accurate coverage of current reality, same as the task's own 'genuinely no physical presence' exception. If a future run sees news of a Gong Cha SG relaunch, re-open this entry (flip back to 'pending') and research the new franchisee's premises fresh \u2014 don't assume the old addresses still apply.",
  },
  {
    brandId: "mccafe",
    name: "McCaf\u00e9",
    priority: "low",
    status: "pending",
    notes: "Usually co-located inside an existing McDonald's \u2014 check whether it needs its own premises list or can reuse mcd's 135 real SFA-sourced premises (premises.ts) before treating as a separate research target. Re-checked 2026-08-21 \u2014 zero standalone 'MCCAFE' businessName hits (confirms it's co-located under McDonald's own licence, not separately registered).",
  },
  {
    brandId: "dosirak",
    name: "Dosirak",
    priority: "medium",
    status: "pending",
    notes: "2026-08-21: SFA Track Records businessName search for exact 'DOSIRAK' found 1 additional real premises (licensee 'P.O. NOSH PRIVATE LIMITED') \u2014 now 2 real premises total (was 1 legacy placeholder). Deliberately did NOT include ~7 'Bibimbap/Dosirak' listings under licensee 'TENG SHENG BROTHERS PTE. LTD.' \u2014 that's a dual-branded combo concept name, unconfirmed whether it's the same Dosirak brand in this database or a different bibimbap concept that happens to share the word. Needs manual confirmation before merging.",
  },
  {
    brandId: "nourish_bowl",
    name: "Nourish Bowl",
    priority: "low",
    status: "pending",
  },
  {
    brandId: "superfood_kitchen",
    name: "Superfood Kitchen",
    priority: "low",
    status: "pending",
  },
  {
    brandId: "wendys",
    name: "Wendy's",
    priority: "low",
    status: "pending",
    notes: "Re-checked 2026-08-21 against SFA's richer \"Track Records\" dataset \u2014 still no real matches. \"Wendy's\" businessName hits are all unrelated small operators (a school canteen stall \"Aunty Wendy\", a home-based \"Wendy's kitchen\", \"Wendy's Snack\") \u2014 none is the Wendy's burger chain, which does not appear to be currently SFA-licensed in Singapore under any matchable name. Needs the official source if/when Wendy's re-enters the SG market.",
  },
  {
    brandId: "grain",
    name: "Grain",
    priority: "medium",
    status: "pending",
    notes: "Re-checked 2026-08-21 against SFA's richer \"Track Records\" dataset (52,101 establishments, includes Business Name field) \u2014 still ALL false positives (Hundred Grains, Grains & Co., Grain Traders, Natural Grain Pte Ltd \u2014 unrelated companies coincidentally containing the word \"grain\"). The Grain meal-brand's real registered SG entity remains unconfirmed; this method cannot resolve it. Needs the official source (grain.com.sg store list), not SFA matching.",
  },
];
