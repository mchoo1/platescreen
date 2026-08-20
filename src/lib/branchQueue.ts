import type { BranchQueueEntry } from '@/types/db';

/**
 * Work queue for the premises-backfill research task (platescreen-research-branches).
 * Each entry is a Brand still missing full real-premises coverage in premises.ts.
 *
 * 2026-08-20 update: this session matched 25 chains + 3 food-court operators
 * (kopitiam/koufu/foodfare) directly against the SFA/data.gov.sg licensed-
 * establishment dataset by exact licensee-name matching (not the unreliable
 * fuzzy search endpoint), geocoded 1,023 of 1,041 real premises via OneMap,
 * and wrote them straight into premises.ts. Those brands are removed from
 * this queue below. See reference/planning/database-restructure-proposal-2026-08-20.md
 * and reference/research-sessions/2026-08-20-brand-premises-restructure.md for
 * the full method and results, including brands where the guessed corporate
 * licensee name returned ZERO matches (recorded per-entry below so a future
 * run doesn't repeat the same failed guess).
 *
 * Key finding worth flagging up front: SFA licensee names are the REGISTERED
 * CORPORATE ENTITY, which for some brands doesn't literally contain the
 * public storefront brand name at all (Subway's per-outlet franchisee
 * companies, most bubble-tea chains) — for those, this method structurally
 * can't find more coverage; only an official store-locator/address-list
 * source will. And for `cold_storage` specifically, the registered entity
 * ("COLD STORAGE SINGAPORE (1983) PTE LTD") also covers Giant/7-Eleven/other
 * Dairy Farm banners in Singapore, so bulk-matching it is UNSAFE without a
 * banner-disambiguation step this session didn't have a reliable method for
 * — deliberately left unresolved rather than risk mislabeling.
 *
 * Priority is a starting heuristic — the research task should correct it if
 * actual premises count differs once researched.
 */
export const BRANCH_QUEUE: BranchQueueEntry[] = [
  {
    brandId: "subway",
    name: "Subway",
    priority: "high",
    status: "pending",
    notes: "SFA matching found only 2 real premises this session (Subway Harbourfront, Subway @ Tampines West CC) — Subway SG mostly registers each outlet under its own franchisee company name, so licensee-name matching structurally can't find the rest. Subway has 40+ SG outlets; use the official store locator (subway.com.sg) instead.",
  },
  {
    brandId: "sheng_siong",
    name: "Sheng Siong",
    priority: "high",
    status: "pending",
    notes: "SFA matching found only 1 real premises (licensee 'SHENG SIONG SUPERMARKET PTE LTD' — confirmed real, but Sheng Siong has 60+ SG stores). Try the official store locator (shengsiong.com.sg) for full coverage.",
  },
  {
    brandId: "bonchon",
    name: "Bonchon",
    priority: "medium",
    status: "pending",
    notes: "SFA matching found only 1 real premises this session (licensee 'BONCHON SINGAPORE PTE. LTD.' — confirmed real). Try the official store locator for the rest.",
  },
  {
    brandId: "cold_storage",
    name: "Cold Storage",
    priority: "medium",
    status: "pending",
    notes: "IMPORTANT — do not bulk-match on licensee name alone: 'COLD STORAGE SINGAPORE (1983) PTE LTD' is the shared Dairy Farm corporate entity that ALSO holds licences for Giant hypermarkets, 7-Eleven, and other DFI banners in Singapore — most of its ~397 SFA premises records give no address-text hint of which banner they actually are (confirmed via sampling this session; e.g. several 'Shell Service Station' addresses under this same licensee are almost certainly 7-Eleven, not Cold Storage). Deliberately excluded from this session's Brand+Premises enhancement rather than risk mislabeling. Use the official Cold Storage store locator (coldstorage.com.sg) instead — it's unambiguous by construction.",
  },
  {
    brandId: "giant",
    name: "Giant",
    priority: "medium",
    status: "pending",
    notes: "Tried licensee-name guesses 'GCH RETAIL' and 'DAIRY FARM' this session — zero matches for either. Giant's real SG operating entity name is unconfirmed; likely shares Cold Storage's ambiguous corporate umbrella too (see cold_storage's note) — don't retry bulk SFA matching without first confirming the exact registered entity name. Use the official store locator instead.",
  },
  {
    brandId: "7eleven",
    name: "7-Eleven",
    priority: "high",
    status: "pending",
    notes: "Tried licensee-name guesses '7-ELEVEN', 'SEVEN-ELEVEN', 'SEVEN ELEVEN', 'CULINA' this session — zero matches for any. Real registered entity name unconfirmed. Use the official store locator instead.",
  },
  {
    brandId: "fairprice_xpress",
    name: "FairPrice Xpress",
    priority: "medium",
    status: "pending",
    notes: "'fairprice' brand got 25 real premises this session via licensee 'NTUC FAIRPRICE CO-OPERATIVE LTD', but the SFA dataset doesn't distinguish banner/format (supermarket vs Xpress vs Finest) in a reliable, address-parseable way — deliberately did NOT guess which of the 25 are Xpress-format to avoid mislabeling. Needs the official FairPrice store locator, which does label format.",
  },
  {
    brandId: "fairprice_finest",
    name: "FairPrice Finest",
    priority: "low",
    status: "pending",
    notes: "Same banner-ambiguity limitation as fairprice_xpress — see its note.",
  },
  {
    brandId: "banquet",
    name: "Banquet",
    priority: "low",
    status: "pending",
    notes: "Tried licensee-name guesses 'BANQUET', 'BANQUET FOODCOURT', 'BANQUET FOOD', 'BANQUET CATERING', 'BANQUET F&B' this session — zero matches for any (unlike kopitiam/koufu/foodfare, which all matched cleanly and now have real Brand+Premises rows — see brands.ts/premises.ts). Banquet's real registered corporate entity name is unconfirmed; needs either the official source or a different guess.",
  },
  {
    brandId: "old_chang_kee",
    name: "Old Chang Kee",
    priority: "high",
    status: "pending",
    notes: "Tried licensee-name guess 'STROLLAD' this session (a guess, unconfirmed) — zero matches. Real registered entity name unconfirmed despite being a listed company (Old Chang Kee Ltd) — the listed holding company name doesn't necessarily match the SFA-licensed operating subsidiary name.",
  },
  { brandId: "gong_cha", name: "Gong Cha", priority: "high", status: "pending" },
  { brandId: "stuffd", name: "Stuffd", priority: "low", status: "pending" },
  { brandId: "aw", name: "A&W", priority: "medium", status: "pending" },
  { brandId: "jollibee", name: "Jollibee", priority: "high", status: "pending" },
  { brandId: "toast_box", name: "Toast Box", priority: "high", status: "pending" },
  { brandId: "shake_shack", name: "Shake Shack", priority: "medium", status: "pending" },
  { brandId: "five_guys", name: "Five Guys", priority: "medium", status: "pending" },
  { brandId: "popeyes", name: "Popeyes", priority: "medium", status: "pending" },
  { brandId: "wingstop", name: "Wingstop", priority: "medium", status: "pending" },
  { brandId: "gyg", name: "Guzman y Gomez", priority: "medium", status: "pending" },
  { brandId: "krispy_kreme", name: "Krispy Kreme", priority: "medium", status: "pending" },
  {
    brandId: "auntie_annes",
    name: "Auntie Anne's",
    priority: "medium",
    status: "pending",
    notes: "Tried licensee-name guesses 'AUNTIE ANNE' / 'AUNTIE ANNES' this session — zero matches.",
  },
  { brandId: "carl_jr", name: "Carl's Jr.", priority: "medium", status: "pending" },
  { brandId: "mos_burger", name: "MOS Burger", priority: "medium", status: "pending" },
  {
    brandId: "mccafe",
    name: "McCafé",
    priority: "low",
    status: "pending",
    notes: "Usually co-located inside an existing McDonald's — check whether it needs its own premises list or can reuse mcd's 135 real SFA-sourced premises (premises.ts) before treating as a separate research target.",
  },
  { brandId: "astons", name: "Aston's Specialities", priority: "medium", status: "pending" },
  { brandId: "liho", name: "LiHo", priority: "high", status: "pending" },
  { brandId: "koi", name: "KOI Thé", priority: "high", status: "pending" },
  { brandId: "chagee", name: "Chagee", priority: "medium", status: "pending" },
  { brandId: "mixue", name: "Mixue", priority: "high", status: "pending" },
  { brandId: "dosirak", name: "Dosirak", priority: "medium", status: "pending" },
  { brandId: "makisan", name: "Maki-San", priority: "low", status: "pending" },
  { brandId: "project_acai", name: "Project Açaí", priority: "low", status: "pending" },
  { brandId: "nourish_bowl", name: "Nourish Bowl", priority: "low", status: "pending" },
  { brandId: "superfood_kitchen", name: "Superfood Kitchen", priority: "low", status: "pending" },
  { brandId: "boost_juice", name: "Boost Juice", priority: "medium", status: "pending" },
  { brandId: "saladstop", name: "SaladStop!", priority: "low", status: "pending" },
  { brandId: "saladbox", name: "The Salad Box", priority: "low", status: "pending" },
  { brandId: "sushi_express", name: "Sushi Express", priority: "medium", status: "pending" },
  { brandId: "dunkin", name: "Dunkin'", priority: "medium", status: "pending" },
  { brandId: "llaollao", name: "Llaollao", priority: "low", status: "pending" },
  { brandId: "wendys", name: "Wendy's", priority: "low", status: "pending" },
  { brandId: "luckin_coffee", name: "Luckin Coffee", priority: "medium", status: "pending" },
  { brandId: "don_don_donki", name: "Don Don Donki", priority: "low", status: "pending" },
  { brandId: "ichiban_boshi", name: "Ichiban Boshi", priority: "medium", status: "pending" },
  { brandId: "grain", name: "Grain", priority: "medium", status: "pending", notes: "SFA licensee-name search for 'GRAIN' returned 18 hits, ALL confirmed false positives on inspection (Grain Traders Pte Ltd, Grain Wine Oil Pte Ltd, Natural Grain Pte Ltd — unrelated companies coincidentally containing the common word 'grain') — none is the Grain meal-delivery brand. Real registered entity name unconfirmed; needs the official source, not this method." },
];

// Resolved this session via real SFA licence matching (see brands.ts/premises.ts) —
// removed from the queue: mcd, kfc, starbucks_sg, cheers, breadtalk, pizza_hut,
// coffee_bean, bk, soup_spoon, fairprice, dominos, saizeriya, texas_chicken,
// nandos, yoshinoya, paris_baguette, genki_sushi, daily_cut, ya_kun.
//
// kopitiam / koufu / foodfare also resolved and restored as full Brand+Premises
// rows this session (48/64/47 real premises respectively) — no menu items
// attached (still no reliable way to know real individual stall names/dishes
// inside a generic operator-run food court — same "don't fabricate" principle
// as the earlier hawker-centre cleanup). Removed from this queue.
//
// store_fairprice was merged into the 'fairprice' brand this session (same
// real-world retailer, was a duplicate row) — its old queue entry is removed.
