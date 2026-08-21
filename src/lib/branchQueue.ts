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
    notes: "Re-checked 2026-08-21 against SFA's richer \"Track Records\" dataset \u2014 zero matches this round (the 1 premises found in the 2026-08-20 session under licensee 'BONCHON SINGAPORE PTE. LTD.' doesn't appear in this dataset's grade buckets, possibly a licence renewal/grade-cycle gap). Still only 1 confirmed real premises total. Try the official store locator for full coverage.",
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
    status: "pending",
    notes: "Re-checked 2026-08-21 against SFA's richer \"Track Records\" dataset (52,101 establishments) \u2014 zero businessName matches for 'GONG CHA'. Like most bubble-tea chains, Gong Cha SG likely registers each outlet under its own franchisee company name with no shared identifiable string. Needs the official store locator (gongcha.com.sg). SECURITY BLOCKER found 2026-08-21b: attempted the official store locator (gongcha.com.sg/outlets) via browser \u2014 Chrome returned a hard 'Privacy error' (cert mismatch) on every page of the site. Confirmed independently via curl/openssl: www.gongcha.com.sg (103.7.9.22) is currently serving a Let's Encrypt certificate issued for 'ahmadalbab30.pw', NOT gongcha.com.sg \u2014 'SSL: no alternative certificate subject name matches target host name'. This is not a normal expired-cert situation; it looks like the domain/host may be compromised, expired-and-squatted, or misconfigured on shared hosting. Did NOT bypass the browser's security warning and did NOT trust any content pulled from this domain this session (including an earlier plain-text web_fetch of the homepage that returned what looked like real marketing copy \u2014 that fetch path may not validate certs the same way, so its content should not be treated as authoritative either while this persists). No premises added. Needs either: (a) a human to verify out-of-band whether gongcha.com.sg is genuinely compromised/expired, or (b) a different official source (e.g. Gong Cha's official app, or a verified official social/help-center page) once the domain issue is understood. Do not retry this exact domain automatically until the cert issue is confirmed resolved.",
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
