// Generated 2026-08-20 — see reference/planning/database-restructure-proposal-2026-08-20.md
// and reference/migration-scripts/ for the restructure this replaced (Outlet -> Brand+Premises).
// Untyped literal export (see Brand in types/db.ts) — screener.ts casts once at the boundary,
// matching the outlets.ts/foodOptions.ts convention (avoids TS2590 on a large array literal).
// 2026-08-22a: renamed 56 generic dish-type-placeholder brands to real, verified stall names.
// 2026-08-22b: removed 36 fully-empty Brand stubs.
// 2026-08-22c: removed 4 food-court OPERATOR mega-brands (kopitiam/koufu/foodfare/hawkers_street),
// preserved as reference/data/food-court-venues.json (see that commit).
// 2026-08-22d: researched Kopitiam/Koufu/Foodfare/Hawkers' Street's own official websites per user
// request to add their real stores. Added 5 real standalone Koufu Group in-house F&B chains, each
// with its own consistent single menu across all locations (found via koufu.com.sg/our-brands/ —
// NOT concessions inside a shared food-court building, so no operatorId; these are their own
// storefronts): Happy Hawkers (21 outlets), Fork & Spoon (3), Grove (4), 1983 - Coffee & Toast (1),
// 1983 - A Taste of Nanyang (1) — 30 real, address-verified premises total, all geocoded via OneMap.
// Kopitiam's own outlet finder was reported this pass as JS-locked with no discoverable data source —
// superseded the same day, see 2026-08-22e below. Koufu's remaining sub-brands (R&B Tea, Dough
// Culture, Nine Fresh, The Kitchen, The Green Hut, Rasapura Master) are still unresolved JS/SPA
// widgets (see reference/research-sessions/2026-08-22-food-court-website-research.md). NTUC
// Foodfare's own site now positions it purely as B2B institutional catering (childcare/healthcare/
// government), not public food courts — flagged as a scope question rather than acted on.
// 2026-08-22e: found Kopitiam's real data source — not the map widget (which is genuinely JS-only)
// but a WordPress SEO sitemap (stall-sitemap.xml / stall-sitemap2.xml) listing 1,441 individual
// stall detail pages, each with clean schema.org JSON-LD (name, dishes, full address+postal, phone,
// hours, parent venue). Scraped all 1,441 via direct fetch (no browser needed — the block hit
// earlier was Cloudflare on the /wp-admin/admin-ajax.php map endpoint specifically, not on these
// public content pages). Deduplicated by stall name across venues, then filtered out 58 bare
// cuisine/dish-category labels ("Chicken Rice", "Fish Soup", "Mala Xiang Guo", etc. — Kopitiam's own
// placeholder naming for unbranded stalls, same non-value the generic-name audit flagged) — see
// reference/data/kopitiam-generic-filter.md for the exact blocklist. Net: 839 real, distinctly-named
// Kopitiam concessions (Heavenly Wang, HJH Maimunah, Ann Chin Popiah, Confirm & Chop, Kokoro Kiosuku,
// Kopi Kiosk, and hundreds more) across ~90 venues, 1,183 premises, every one geocoded via OneMap
// postal lookup. operatorId: "kopitiam" on all of them. 3 brand-new venues (504 Yishun, 542B
// Serangoon North, Pasir Ris 735) have no address published on Kopitiam's site yet — their stalls
// (8 brands, listed in researchQueue.ts) were left out entirely rather than guessed.
// IMPORTANT GAP: these 839 brands have real names/addresses but NO MenuItems yet — the scraped data
// only gives dish *names* (schema.org servesCuisine), never calories/protein/carbs/fat, and this
// project never fabricates macros. Real dish names are preserved in
// reference/data/kopitiam-stall-dishes.json for a future macro-research pass. Until MenuItems are
// added, these brands are invisible in the calorie/protein screener (buildScreenerRows() joins off
// MENU_ITEMS) even though they now exist for location/map purposes — flagged as a single queued item
// in researchQueue.ts rather than 839 separate entries.
// 2026-08-22f: found Koufu's 3 remaining standalone sub-brands the same way — not through their
// JS/SPA "store locator" widgets (still genuinely dead ends), but through other static data sources
// on each site. R&B Tea (rbtea.com.sg, WordPress) exposes a "stores" custom-post-type sitemap
// (wp-sitemap-posts-stores-1.xml) whose individual pages are empty, but its store-locator page loads
// data from a plain `get_regions_action` admin-ajax.php call that returns full JSON (name, address,
// hours) for all 14 outlets directly — no scraping of rendered HTML needed. Nine Fresh
// (ninefresh.com, plain static HTML) and Dough Culture (doughculture.com, OpenCart) both just list
// every outlet as plain text on a "Locate Us" page — no JS, no API, just careful HTML-comment-aware
// parsing (Nine Fresh's page has 3 outlets deliberately commented out — White Sands, NTU, SMU — that
// must NOT be included; Dough Culture's address and hours share the same CSS class, easy to
// mis-pair if you don't scope by outlet block). Added `koufu_rb_tea` (14 premises), `koufu_nine_fresh`
// (25 premises), `koufu_dough_culture` (18 premises) — 57 more geocoded premises, no operatorId
// (standalone Koufu Group storefronts, same as the earlier 5). Dough Culture's product page is a
// real storefront with real prices — captured in reference/data/koufu-family-dishes.json (24 items,
// no macros, same gap as Kopitiam) for a future research pass. The Kitchen / The Green Hut /
// Rasapura Master still need their real koufu.com.sg URLs (guessed slugs 404'd) — not attempted here.
// 2026-08-23: expanded beyond Kopitiam/Koufu/Foodfare/Hawkers' Street per user request to cover
// other major SG food-court/hawker-centre operators. Added new Operator `food_junction` (BreadTalk
// Group's food-court chain - 4 named house-brand concessions found on its own "Our Brands" page:
// Go Teppan Go, Toast Junction, Ke/Quench, Fireyaki - 10 premises across its Singapore venues,
// Fireyaki's specific venue confirmed via foodpanda since the source page's own venue tag was
// missing for that one brand). Added new Operator `fei_siong` (Fei Siong Group, which also turns
// out to be the operator behind Hawkers' Street) - found real per-stall data for one of its 3
// hawker-centre sub-sites: Ci Yuan Hawker Centre (ciyuanhawker.com.sg) has a plain "Our Stalls" page
// with 38 real named stalls (unit, name, cuisine, hours) - 37 added after dropping one bare "Hot &
// Cold Drink Stall" generic. Woodleigh Village Hawker Centre's site confirms it hasn't opened yet
// ("stall application period has closed... will post future stall availability") - correctly
// nothing to add, not a research gap. Buangkok Hawker Centre's site (buangkokhawker.com.sg) returned
// a consistent HTTP 500 across retries - not a WAF block, likely a real outage on their end - revisit
// later. Banquet (the old halal food-court chain) was confirmed defunct/absorbed into Kopitiam's
// "Bagus" format - see reference/research-sessions/2026-08-23-other-food-court-operators.md.
// 2026-08-23 (2nd pass): went back to Koufu's remaining sub-brands by following real links from
// koufu.com.sg/our-brands/food-halls/ instead of guessing URL slugs. Confirmed The Kitchen / The
// Green Hut do not exist anywhere in Koufu's current official brand taxonomy (checked all 4
// categories: food-halls, concept-stores, cafe-restaurants, shopping-mall) - not added, likely a
// mistaken assumption from an earlier pass. Found and added 3 more real standalone Koufu Group
// food-hall concepts, each server-rendered with a real "Our Outlet" address list, same no-operatorId
// pattern as the earlier 8: koufu_cookhouse (4 outlets), koufu_rasapura_masters (1 outlet, Marina Bay
// Sands), koufu_gourmet_paradise (4 outlets) - 9 more geocoded premises. Deliberately did NOT add the
// flagship "Koufu" brand itself (36 addresses found on its own /our-brands/food-halls/koufu/ page) -
// that's the same generic food-court-venue-as-mega-brand shape already tried and reverted for
// Kopitiam/Koufu/Foodfare in the 2026-08-22c restructure (one venue, many unrelated stalls inside,
// not one orderable thing) - the addresses are real but adding them as a Brand would repeat a known
// mistake. Elemen (elemengroup.com.sg) is genuinely JS-rendered (Squarespace) with no static address
// data on its /locations page - left unresolved.
// 2026-08-23 (3rd pass): applied the same sitemap-discovery technique to independent NEA hawker
// centres, per direct user request ("do the same for hawker centers in singapore"). Most of the
// ~114 NEA hawker centres have no dedicated website (already covered generically via the 2026-08-20
// SFA-licensee restructure, 6 real stall names each), but newer NEA "Hawker Centre 3.0" venues run
// by a private operator often DO have one. Found and added 2: Bukit Canberra Hawker Centre (run by
// Canopy Hawkers Group, new Operator `canopy_hawkers`) - its WordPress "portfolio_page" custom-post
// sitemap lists 44 stall pages; each page's <title> holds the real trading name (the URL slug is a
// stale cuisine-category label assigned when the post was first created and often no longer matches
// the current tenant - e.g. slug "porridge" is now "Teochew Fish Soup" - so cuisine text was derived
// from the stall's own name wherever the slug conflicted with it, not blindly trusted). 41 real
// named brands (2 "Coming Soon" units excluded), 42 premises (Kopi Tan runs 2 adjacent units).
// Yishun Park Hawker Centre (yishunparkhc.sg) - own "hawkers" custom-post sitemap lists 34 stall
// pages; 9 of those slugs now 302-redirect to the homepage (cleanly, unlike Bukit Canberra's stale-
// but-still-live pages) - read as retired/renamed stalls and excluded rather than guessed. 25 real
// named brands from the remaining pages, 27 premises (XinLongXing Modern Tze Char spans 3 adjacent
// units). New Operator `timbre_plus_hawkers` - the site's own branding is Timbre+ Hawkers Pte Ltd
// throughout, even though press coverage reports Canopy Hawkers Group taking over operations from
// Jul 2026; the operator here reflects what the source site says, not the reported handover (see
// reference/research-sessions/2026-08-23-bukit-canberra-yishun-park-hawker-centres.md). One Punggol
// Hawker Centre (onepunggolhc.sg, also ex-Timbre+) has the same sitemap pattern (31 stall slugs) but
// every individual stall page 302-redirects to the homepage inconsistently regardless of headers/
// cookies tried - blocked, not attempted further this pass. Buangkok Hawker Centre retried again,
// still HTTP 500. Pasir Ris Central, Anchorvale Village, Jurong West, Bukit Panjang, Margaret Drive,
// and Market Street hawker centres have no dedicated website found (checked common domain patterns).
// 2026-08-23 (4th pass): direct user instruction to use Google Maps + the SFA licence database to
// find real named stalls, and to stop using generic placeholder entries since they "add 0 value."
// This surfaced a real problem in the existing data: the 2026-08-20 SFA-licensee restructure had
// populated ~103 independent hawker centres with exactly 6 sample stalls each, using the SFA
// dataset's raw `licensee_name` field (a personal/legal name, e.g. "Chew Boon Teck") directly as
// the Brand's display name - these are licence-holder names, not real trading/signboard names, and
// tell a user nothing about what food is sold (the same zero-value problem already fixed for bare
// cuisine-category labels in the 2026-08-22a/2026-08-22e passes, just a different flavor of it).
// Live Google Maps UI automation (screenshot/zoom/click on the "Directory" panel) was blocked by a
// hard environment limitation (browser viewport reporting 0x0, breaking every click/zoom action) -
// pivoted to WebSearch + food-blog sources (danielfooddiary.com, sethlui.com, eatbook.sg) for real
// stall rosters, cross-referenced against reference/migration-scripts/sfa-discovery-log.json (the
// full per-venue SFA licensee dataset, not just the 6 promoted to premises.ts) for grade
// confirmation wherever the venue's unit-numbering convention allowed a match. Discovered and
// worked around a renovation-staleness risk: hawker centres undergo periodic renovations causing
// real stall turnover, so a source's publish date was always checked against known closure/reopen
// history before trusting it (Chomp Chomp: 2018 eatbook.sg article rejected after confirming only
// 1/10 of its stalls still matched the live Google Maps directory post a "late 2025 - Mar 2026"
// renovation, used a mid/late-2025 sethlui.com article instead; Berseh: used a 7 Jan 2026
// danielfooddiary.com article published after its Sep-Dec 2025 renovation closure, explicitly
// excluding a stall the article itself marked "[Closed]"; Alexandra Village: used a 1 Jul 2025
// danielfooddiary.com article published the same day as its post-renovation reopening).
// First installment of this cleanup: removed all 18 generic licensee-name Brand+Premises entries
// across 3 venues (Chomp Chomp Food Centre, Berseh Food Centre, Alexandra Village Food Centre) and
// replaced them with 45 real, distinctly-named stalls (12 + 9 + 24) with real unit numbers - SFA
// grade cross-referenced for Chomp Chomp and all 24 Alexandra Village stalls (unit format matched),
// Berseh left with sfa: null (its SFA records use flat 3-digit stall numbers incompatible with the
// blog sources' floor-prefixed units, no reliable cross-match possible). IMPORTANT SCOPE NOTE: this
// is only 3 of the ~103 venues affected by the generic-licensee-name problem - roughly 90+ hawker
// centres still have the same zero-value placeholder entries and need the same treatment in future
// passes. See reference/research-sessions/2026-08-23-chomp-chomp-berseh-alexandra-village.md.
// 2026-08-23/24 (5th-6th pass, Batches A-T): completed the generic-licensee-name cleanup across the
// entire ~103-venue backlog flagged above, in ~20 batches (see reference/research-sessions/
// 2026-08-2[3-4]-hawker-cleanup-batch-*.md for full per-batch detail). Found and fixed 3 instances of
// a recurring "SFA-log-duplication" bug where two physically distinct hawker centres shared byte-
// identical generic brand lists and addresses because the original 2026-08-20 restructure had pooled
// licensee records from an entire road/area into both venue keys (Mayflower Market/Ang Mo Kio 628
// Market; Kaki Bukit 511/Bedok North St 3 Blk 538; Chong Boon Market/Cheng San Market) - resolved by
// independently verifying each real venue's own address and giving each fresh, venue-specific stalls.
// Also found and fixed numerous cases where the stored address pointed to the wrong building entirely
// (schools, libraries, petrol stations, Shell/Caltex stations) rather than the actual hawker centre.
// Batches R-T additionally caught 24 more affected venues that the original narrower heuristic
// (`cuisine: "Local & Hawker"`, no operatorId) had missed because they lacked that exact cuisine tag
// or still carried "Stall No" placeholder addresses. Net across the full cleanup: 1,721 total brands
// by the end of Batch T (some venues have real names alone, since only the subset of generic entries
// with a confirmed real name was ever replaced - the never-fabricate rule was applied consistently,
// leaving a handful of "no verifiable real name found" leftovers documented as intentional in the
// Batch S/T session docs, not fresh gaps).
// 2026-08-24 (Batch U): retried the 2 previously-blocked "Hawker Centre 3.0" venues. Buangkok Hawker
// Centre (buangkokhawker.com.sg) remains down (HTTP 500) - built as a brand-new venue from secondary
// sources instead (eatbook.sg + singaporehawkercentres.com), 25 real stalls, 70 Compassvale Bow,
// Singapore 544692. One Punggol Hawker Centre (onepunggolhc.sg) - the homepage itself (not the
// individual stall pages, which still redirect) now serves a complete 31-stall "Hawker Heroes" list;
// added 28 new stalls and fixed a wrong-address bug on 2 existing entries (Cold Storage, Haji Karim
// Prata Palace had been stored at an unrelated "639 Punggol Drive" address). 1,721 -> 1,774 brands.
// 2026-08-24 (Batch V): resolved the last-remaining Koufu sub-brands (R&B Tea, Dough Culture, Nine
// Fresh, The Kitchen, The Green Hut, Rasapura Master - flagged unresolved in 2026-08-22f above).
// koufu.com.sg turned out to have grown dedicated server-rendered outlet pages for each since that
// pass. Cross-checking against the existing data found Dough Culture and Nine Fresh were already
// 100% covered (added in an undocumented earlier session, source: operator_official_site); only R&B
// Tea had 2 genuinely new outlets (NTU North Spine Plaza, Tampines MRT) not previously captured - added,
// no new Brand ids (all 3 already existed as `type: "grab_go"` stubs, initially miscreated as
// duplicates and corrected mid-batch - see the Batch V session doc). The Kitchen and The Green Hut
// reconfirmed absent from Koufu's current brand taxonomy - not real, not a gap. 1,774 brands
// (unchanged), +2 premises.
// 2026-08-24 (defunct chains): removed Wendy's and Superfood Kitchen entirely (brand + premises +
// menu items) per user direction - both confirmed defunct in Singapore despite having real,
// previously-researched menu data on file. 1,774 -> 1,772 brands.
// 2026-08-24 (platforms data defaults, task #61): two DISTINCT categories of edit, kept separate
// on purpose so neither is mistaken for the other:
//   (1) DOCUMENTED DEFAULT, not individually verified - added "grab_go" to the `platforms` array
//       of 1,531 brands (973 food_court_stall + 558 hawker) whose platforms was exactly
//       ["dine_in"]. Applied as a reasoned structural default per explicit user approval: Singapore
//       hawker/food-court stalls near-universally allow takeaway ("da bao"). This was NOT
//       researched per-stall like the rest of this file's data - it's a bulk cultural-default
//       fill, and should never be read as equivalent to a sourced fact.
//   (2) INDIVIDUALLY VERIFIED named-chain fix - confirmed via web search that McDonald's, KFC,
//       and Subway all deliver in Singapore via GrabFood/foodpanda/Deliveroo (added "delivery" to
//       mcd, kfc, subway, each already had grab_go); confirmed Saizeriya offers both takeaway and
//       GrabFood delivery (added both "grab_go" and "delivery" - was dine_in only). kopitiam_kfc
//       (the food-court concession, type: food_court_stall) picked up "grab_go" automatically via
//       (1) above and was left at [dine_in, grab_go] - its own delivery availability was not
//       independently verified, so "delivery" was deliberately NOT added there.
// 1,772 brands (unchanged), 0 premises changed.
// 2026-08-24 (task #65, Batch F): removed 5 duplicate brands discovered while covering Punggol
// Coast Hawker Centre's zero-menu stalls - each was the same real stall at the same address
// (84 Punggol Way #02-55), recorded twice: once from raw SFA-licensee data (generic id/name,
// e.g. "punggol_coast_hawker_centre_singapore_fried_hokkien_mee") and once from the Kopitiam
// site scrape (cleaner id/name, e.g. "kopitiam_singapore_fried_hokkien_mee"). Kept the
// Kopitiam-scrape version in each pair; the 5 removed had 0 MenuItems and no unique data.
// 1,772 -> 1,767 brands. See reference/research-sessions/2026-08-24-zero-menu-punggolcoast-batch-F.md.
// 2026-08-24 (task #65, Batch J): removed 1 more duplicate brand, same pattern as Batch F,
// discovered while covering Pasir Ris Central Hawker Centre's zero-menu stalls:
// "pasir_ris_central_hawker_centre_wild_olives" (raw SFA-licensee-derived) was the same real
// stall, same address/postal (110 Pasir Ris Central, Singapore 519641), as
// "kopitiam_wild_olives" (Kopitiam site scrape). Both had 0 MenuItems. Kept the Kopitiam-scrape
// version, which is covered with a real menu item in this batch. 1,767 -> 1,766 brands. See
// reference/research-sessions/2026-08-24-zero-menu-pasirriscentral-batch-J.md.

export const BRANDS_1 = [
  {
    id: "mcd",
    name: "McDonald's",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "mcdonald",
      "mcdonalds",
      "mcdonald's",
      "mcd",
      "mac"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "kfc",
    name: "KFC",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "kfc",
      "kentucky fried chicken",
      "kentucky"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "bk",
    name: "Burger King",
    emoji: "👑",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "burger king",
      "burgerking",
      "bk",
      "burger king sg"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "subway",
    name: "Subway",
    emoji: "🥖",
    type: "restaurant",
    cuisine: "Sandwiches",
    aliases: [
      "subway"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "old_chang_kee",
    name: "Old Chang Kee",
    emoji: "🥟",
    type: "grab_go",
    cuisine: "Local Snacks",
    aliases: [
      "old chang kee",
      "ock",
      "old chang"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ya_kun",
    name: "Ya Kun Kaya Toast",
    emoji: "🍞",
    type: "restaurant",
    cuisine: "Local Cafe",
    aliases: [
      "ya kun",
      "yakun",
      "ya kun kaya"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "breadtalk",
    name: "BreadTalk",
    emoji: "🥐",
    type: "grab_go",
    cuisine: "Bakery",
    aliases: [
      "breadtalk",
      "bread talk"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "gong_cha",
    name: "Gong Cha",
    emoji: "🧋",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "gong cha",
      "gongcha",
      "gong-cha"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "7eleven",
    name: "7-Eleven",
    emoji: "🏪",
    type: "ready_to_eat",
    cuisine: "Convenience Store",
    aliases: [
      "7-eleven",
      "7 eleven",
      "7eleven",
      "seven eleven"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "grain",
    name: "Grain",
    emoji: "🥘",
    type: "restaurant",
    cuisine: "Healthy Meals",
    aliases: [
      "grain",
      "grain sg",
      "grain.com.sg"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "stuffd",
    name: "Stuffd",
    emoji: "🌯",
    type: "restaurant",
    cuisine: "Kebabs & Wraps",
    aliases: [
      "stuffd",
      "stuffd sg"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "aw",
    name: "A&W",
    emoji: "🍟",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "a&w",
      "a and w",
      "aw",
      "aw restaurants",
      "a&w restaurants"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jollibee",
    name: "Jollibee",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "jollibee",
      "jolly bee",
      "jb"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "toast_box",
    name: "Toast Box",
    emoji: "🍞",
    type: "restaurant",
    cuisine: "Kopitiam",
    aliases: [
      "toast box",
      "toastbox",
      "toast box sg"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "starbucks_sg",
    name: "Starbucks",
    emoji: "☕",
    type: "grab_go",
    cuisine: "Cafe",
    aliases: [
      "starbucks",
      "sbux",
      "starbucks singapore",
      "starbucks sg"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "popeyes",
    name: "Popeyes",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "popeyes",
      "popeyes louisiana kitchen",
      "popeyes sg"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "nandos",
    name: "Nando's",
    emoji: "🔥",
    type: "restaurant",
    cuisine: "Portuguese / Grilled Chicken",
    aliases: [
      "nandos",
      "nando's",
      "nandos peri peri",
      "nando's peri-peri"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "pizza_hut",
    name: "Pizza Hut",
    emoji: "🍕",
    type: "restaurant",
    cuisine: "Pizza",
    aliases: [
      "pizza hut",
      "pizzahut",
      "pizza hut sg"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "delivery",
      "grab_go"
    ]
  },
  {
    id: "dominos",
    name: "Domino's Pizza",
    emoji: "🍕",
    type: "grab_go",
    cuisine: "Pizza",
    aliases: [
      "dominos",
      "domino's",
      "domino's pizza",
      "dominos pizza"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "delivery",
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "wingstop",
    name: "Wingstop",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Wings",
    aliases: [
      "wingstop",
      "wing stop"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "gyg",
    name: "Guzman y Gomez",
    emoji: "🌯",
    type: "restaurant",
    cuisine: "Mexican",
    aliases: [
      "guzman y gomez",
      "gyg",
      "guzman",
      "guzman gomez"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "shake_shack",
    name: "Shake Shack",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Burgers",
    aliases: [
      "shake shack",
      "shakeshack",
      "shack"
    ],
    dietTags: [],
    priceRange: "$$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "five_guys",
    name: "Five Guys",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Burgers",
    aliases: [
      "five guys",
      "fiveguys"
    ],
    dietTags: [],
    priceRange: "$$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "krispy_kreme",
    name: "Krispy Kreme",
    emoji: "🍩",
    type: "grab_go",
    cuisine: "Doughnuts",
    aliases: [
      "krispy kreme",
      "krispykreme",
      "kk doughnuts"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "grab_go",
      "dine_in",
      "delivery"
    ]
  },
  {
    id: "dunkin",
    name: "Dunkin'",
    emoji: "🍩",
    type: "grab_go",
    cuisine: "Doughnuts & Coffee",
    aliases: [
      "dunkin",
      "dunkin donuts",
      "dunkin' donuts",
      "dd"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "grab_go",
      "dine_in",
      "delivery"
    ]
  },
  {
    id: "auntie_annes",
    name: "Auntie Anne's",
    emoji: "🥨",
    type: "grab_go",
    cuisine: "Pretzels",
    aliases: [
      "auntie anne's",
      "auntie annes",
      "auntie anne",
      "aunty annes"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "texas_chicken",
    name: "Texas Chicken",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "texas chicken",
      "texas fried chicken",
      "texas chicken sg"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "carl_jr",
    name: "Carl's Jr.",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Fast Food",
    aliases: [
      "carl's jr",
      "carls jr",
      "carl jr",
      "hardees"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "mos_burger",
    name: "MOS Burger",
    emoji: "🍔",
    type: "restaurant",
    cuisine: "Japanese Fast Food",
    aliases: [
      "mos burger",
      "mos",
      "mossburger"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "yoshinoya",
    name: "Yoshinoya",
    emoji: "🍱",
    type: "restaurant",
    cuisine: "Japanese Fast Food",
    aliases: [
      "yoshinoya",
      "yoshinoya beef bowl",
      "yoshi"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "saizeriya",
    name: "Saizeriya",
    emoji: "🍝",
    type: "restaurant",
    cuisine: "Italian Casual",
    aliases: [
      "saizeriya",
      "saizeria"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "genki_sushi",
    name: "Genki Sushi",
    emoji: "🍣",
    type: "restaurant",
    cuisine: "Japanese / Sushi",
    aliases: [
      "genki sushi",
      "genki",
      "genkisushi"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "delivery"
    ]
  },
  {
    id: "mccafe",
    name: "McCafé",
    emoji: "☕",
    type: "grab_go",
    cuisine: "Café / Coffee",
    aliases: [
      "mccafe",
      "mc cafe",
      "mcdonald's cafe"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "coffee_bean",
    name: "The Coffee Bean & Tea Leaf",
    emoji: "☕",
    type: "restaurant",
    cuisine: "Café / Coffee",
    aliases: [
      "coffee bean",
      "cbtl",
      "the coffee bean",
      "coffee bean tea leaf"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "astons",
    name: "Aston's Specialities",
    emoji: "🥩",
    type: "restaurant",
    cuisine: "Western Casual",
    aliases: [
      "astons",
      "aston's",
      "aston specialities",
      "astons specialities"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "soup_spoon",
    name: "The Soup Spoon",
    emoji: "🥣",
    type: "restaurant",
    cuisine: "Healthy / Soups",
    aliases: [
      "soup spoon",
      "the soup spoon",
      "soupspoon"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "daily_cut",
    name: "The Daily Cut",
    emoji: "🥗",
    type: "restaurant",
    cuisine: "Healthy / Bowls",
    aliases: [
      "daily cut",
      "the daily cut",
      "tdc"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "project_acai",
    name: "Project Açaí",
    emoji: "🫐",
    type: "grab_go",
    cuisine: "Healthy / Açaí",
    aliases: [
      "project acai",
      "project açaí",
      "projectacai"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "liho",
    name: "LiHo",
    emoji: "🧋",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "liho",
      "li ho",
      "liho tea"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koi",
    name: "KOI Thé",
    emoji: "🧋",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "koi",
      "koi the",
      "koi cafe",
      "koi thé"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chagee",
    name: "Chagee",
    emoji: "🍵",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "chagee",
      "霸王茶姬",
      "cha gee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mixue",
    name: "Mixue",
    emoji: "🍦",
    type: "grab_go",
    cuisine: "Bubble Tea / Ice Cream",
    aliases: [
      "mixue",
      "mix xue",
      "蜜雪冰城"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dosirak",
    name: "Dosirak",
    emoji: "🍱",
    type: "restaurant",
    cuisine: "Korean",
    aliases: [
      "dosirak",
      "도시락"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "makisan",
    name: "Maki-San",
    emoji: "🌯",
    type: "grab_go",
    cuisine: "Japanese / Sushi Rolls",
    aliases: [
      "maki san",
      "makisan",
      "maki-san"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "nourish_bowl",
    name: "Nourish Bowl",
    emoji: "🥗",
    type: "restaurant",
    cuisine: "Healthy / Bowls",
    aliases: [
      "nourish bowl",
      "nourishbowl",
      "nourish"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  
  {
    id: "boost_juice",
    name: "Boost Juice",
    emoji: "🥤",
    type: "grab_go",
    cuisine: "Juice Bar",
    aliases: [
      "boost",
      "boost juice",
      "boost juice bar",
      "boost juice bars"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "cheers",
    name: "Cheers",
    emoji: "🏪",
    type: "ready_to_eat",
    cuisine: "Convenience Store",
    aliases: [
      "cheers",
      "cheers convenience",
      "cheers store"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "fairprice_xpress",
    name: "FairPrice Xpress",
    emoji: "🏪",
    type: "ready_to_eat",
    cuisine: "Convenience Store",
    aliases: [
      "fairprice xpress",
      "fp xpress",
      "fpx",
      "ntuc xpress",
      "fairprice express"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "saladstop",
    name: "SaladStop!",
    emoji: "🥗",
    type: "grab_go",
    cuisine: "Salads & Grain Bowls",
    aliases: [
      "saladstop",
      "salad stop",
      "saladstop!"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "gluten_free"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "paris_baguette",
    name: "Paris Baguette",
    emoji: "🥐",
    type: "grab_go",
    cuisine: "French Bakery & Café",
    aliases: [
      "paris baguette",
      "parisbaguette",
      "pb"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "sushi_express",
    name: "Sushi Express",
    emoji: "🍣",
    type: "restaurant",
    cuisine: "Japanese (Kaiten)",
    aliases: [
      "sushi express",
      "sushiexpress"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "saladbox",
    name: "The Salad Box",
    emoji: "🥗",
    type: "grab_go",
    cuisine: "Healthy Salads",
    aliases: [
      "salad box",
      "saladbox",
      "the salad box",
      "thesaladbox"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "fairprice",
    name: "FairPrice",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "fairprice",
      "ntuc fairprice",
      "ntuc",
      "fair price",
      "fp"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "fairprice_finest",
    name: "FairPrice Finest",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "fairprice finest",
      "ntuc finest",
      "fp finest"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "cold_storage",
    name: "Cold Storage",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "cold storage",
      "cs fresh",
      "cold storage supermarket"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "giant",
    name: "Giant",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "giant",
      "giant supermarket",
      "giant hypermart",
      "giant hyper"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "sheng_siong",
    name: "Sheng Siong",
    emoji: "🛒",
    type: "supermarket",
    cuisine: "Supermarket",
    aliases: [
      "sheng siong",
      "shengsiong",
      "sheng siong supermarket"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "don_don_donki",
    name: "Don Don Donki",
    emoji: "🐧",
    type: "supermarket",
    cuisine: "Japanese Supermarket",
    aliases: [
      "don don donki",
      "donki",
      "don quijote",
      "ppih",
      "dqe"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "tian_tian_chicken_rice",
    name: "Tian Tian Hainanese Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "tian tian",
      "tian tian chicken rice",
      "maxwell chicken rice"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_wonton_mee",
    name: "Fu Ji Fuzhou Fish Ball Wanton Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "maxwell wonton mee",
      "wonton mee maxwell",
      "fu ji fuzhou fish ball wanton noodles"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_laksa",
    name: "Sungei Road Laksa",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell laksa",
      "sungei road laksa"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_char_kway_teow",
    name: "Marina South Delicious Food",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell char kway teow",
      "maxwell ckt",
      "marina south delicious food"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_popiah",
    name: "Rojak, Popiah & Cockle",
    emoji: "🌯",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell popiah",
      "rojak, popiah & cockle"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_carrot_cake",
    name: "Carrot Cake Stall (Maxwell FC)",
    emoji: "🍳",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell carrot cake"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_oyster_omelette",
    name: "Marina South Delicious Food",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell oyster omelette",
      "maxwell orh luak",
      "marina south delicious food"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_rojak",
    name: "Rojak, Popiah & Cockle",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell rojak",
      "rojak, popiah & cockle"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "maxwell_drinks_desserts",
    name: "Lao Ban Soya Beancurd",
    emoji: "☕",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "maxwell kopi",
      "maxwell drinks",
      "maxwell tau huay",
      "lao ban soya beancurd"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_satay_street",
    name: "Best Satay 7 & 8",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "lau pa sat satay",
      "satay street",
      "lps satay",
      "best satay 7 & 8"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_oyster_omelette",
    name: "Golden Shoe Hokkien Mee",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "lau pa sat oyster omelette",
      "lps orh luak",
      "golden shoe hokkien mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_seng_kee",
    name: "Seng Kee Local Delights",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "lau pa sat hokkien mee",
      "lps hokkien",
      "seng kee lau pa sat",
      "lps seng kee",
      "lau pa sat seng kee local delights"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_lao_fu_zi_ckt",
    name: "Lao Fu Zi Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "lau pa sat char kway teow",
      "lps ckt",
      "lao fu zi lau pa sat",
      "lao fu zi fried kway teow",
      "lps lao fu zi",
      "lao fu zi ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_prawn_noodles",
    name: "Seng Kee Local Delights",
    emoji: "🦐",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "lau pa sat prawn noodles",
      "lps prawn mee",
      "seng kee local delights"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_bak_chor_mee",
    name: "LiXin Teochew Fishball Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "lau pa sat bak chor mee",
      "lps bcm",
      "lixin teochew fishball noodles"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_chicken_rice",
    name: "Ipoh Hainanese Chicken Rice Halal",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "lau pa sat chicken rice",
      "lps chicken rice",
      "ipoh hainanese chicken rice",
      "ipoh chicken rice halal",
      "lau pa sat ipoh chicken rice"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_rojak",
    name: "Sister's Rojak",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "lau pa sat rojak",
      "lps rojak",
      "sister's rojak"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_butter_cream",
    name: "Butter & Cream",
    emoji: "🥐",
    type: "hawker",
    cuisine: "Bakery",
    aliases: [
      "lau pa sat butter cream",
      "lps butter cream",
      "butter and cream lau pa sat",
      "lps bakery",
      "lps desserts",
      "butter cream bakery lau pa sat"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_creme_cone",
    name: "Creme & Cone",
    emoji: "🍦",
    type: "hawker",
    cuisine: "Desserts",
    aliases: [
      "lau pa sat gelato",
      "lps gelato",
      "creme and cone lau pa sat",
      "lps ice cream",
      "lau pa sat creme cone"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_warong_pak_sapari",
    name: "Warong Pak Sapari",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "lau pa sat mee soto",
      "lps mee soto",
      "warong pak sapari lau pa sat",
      "lps pak sapari",
      "pak sapari lau pa sat",
      "lau pa sat mee rebus"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_taliwang",
    name: "Nasi Lemak Ayam Taliwang",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "lau pa sat nasi lemak",
      "lps nasi lemak",
      "ayam taliwang lau pa sat",
      "lps taliwang",
      "lau pa sat ayam taliwang",
      "taliwang lau pa sat"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_maya_veggie",
    name: "Maya Indian Veggie Delight",
    emoji: "🫕",
    type: "hawker",
    cuisine: "Indian Vegetarian",
    aliases: [
      "lau pa sat vegetarian",
      "lps vegetarian",
      "maya veggie lau pa sat",
      "maya indian lau pa sat",
      "lps maya",
      "lau pa sat indian veggie"
    ],
    dietTags: [
      "vegetarian",
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_lixin_fishball",
    name: "LiXin Teochew Fishball Noodles",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "lau pa sat fishball noodles",
      "lps fishball",
      "lixin lau pa sat",
      "li xin fishball",
      "lixin teochew lau pa sat",
      "lps lixin"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "lau_pa_sat_feng_xiang_bkt",
    name: "Feng Xiang Bak Kut Teh",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Chinese",
    aliases: [
      "lau pa sat bak kut teh",
      "lps bkt",
      "feng xiang lau pa sat",
      "lps feng xiang",
      "lau pa sat bkt",
      "feng xiang bkt lau pa sat"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_satay_stall",
    name: "TKR Satay",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "newton satay",
      "newton food centre satay",
      "tkr satay"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_bbq_seafood",
    name: "Alliance Seafood",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Seafood",
    aliases: [
      "newton bbq",
      "newton stingray",
      "newton seafood",
      "newton bbq wings",
      "alliance seafood"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_hokkien_mee",
    name: "Newton Old Signboard 25",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "newton hokkien mee",
      "newton fc hokkien",
      "newton old signboard 25"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_prawn_noodles",
    name: "Newton Tian Xiang Big Prawn Noodle",
    emoji: "🦐",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "newton prawn noodles",
      "newton prawn mee",
      "newton tian xiang big prawn noodle"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_oyster_omelette",
    name: "Hai Yan BBQ Seafood",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "newton oyster omelette",
      "newton orh luak",
      "hai yan bbq seafood"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_carrot_cake",
    name: "Heng Carrot Cake",
    emoji: "🍳",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "newton carrot cake",
      "heng carrot cake"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_char_kway_teow",
    name: "Char Kway Teow (Newton FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "newton char kway teow",
      "newton ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "newton_drinks_stall",
    name: "88 San Ren Cold & Hot Dessert",
    emoji: "☕",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "newton kopi",
      "newton drinks",
      "88 san ren cold & hot dessert"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_roast_meats_stall",
    name: "Hawker Chan (Liao Fan Hong Kong Soya Sauce Chicken Rice & Noodle)",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "chinatown roast duck",
      "chinatown complex roast",
      "cc roast meats",
      "hawker chan (liao fan hong kong soya sauce chicken rice & noodle)"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_claypot_rice_stall",
    name: "Lian He Ben Ji Claypot Rice",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "chinatown claypot rice",
      "cc claypot",
      "lian he ben ji claypot rice"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_kway_chap_stall",
    name: "Jin Ji Teochew Braised Duck & Kway Chap",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown kway chap",
      "cc kway chap",
      "jin ji teochew braised duck & kway chap"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_wonton_mee_stall",
    name: "Zhong Guo La Mian Xiao Long Bao",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown wonton mee",
      "cc wonton mee",
      "zhong guo la mian xiao long bao"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_ban_mian_stall",
    name: "Ban Mian (Chinatown Complex)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown ban mian",
      "cc ban mian"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_bak_chor_mee_stall",
    name: "Bak Chor Mee (Chinatown Complex)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown bak chor mee",
      "cc bcm"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_char_kway_teow_stall",
    name: "Char Kway Teow (Chinatown Complex)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "chinatown char kway teow",
      "cc ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_rice_noodle_rolls",
    name: "Chee Cheong Fun & Popiah (Chinatown)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Snacks",
    aliases: [
      "chinatown chee cheong fun",
      "chinatown popiah",
      "cc ccf"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_desserts_stall",
    name: "Desserts (Chinatown Complex)",
    emoji: "🍧",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "chinatown ice kachang",
      "chinatown desserts",
      "cc chendol"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cc_kopi_stall",
    name: "The 1950's Coffee",
    emoji: "☕",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "chinatown complex kopi",
      "cc kopi",
      "the 1950's coffee"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_prata_stall",
    name: "Syed Mee & Prata Place",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka prata",
      "tekka roti prata",
      "little india prata",
      "syed mee & prata place"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_thosai_stall",
    name: "Zam Zam Muslim Food",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka thosai",
      "tekka vadai",
      "little india thosai",
      "zam zam muslim food"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_murtabak_stall",
    name: "Allauddin's (Prata & Murtabak Stall)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka murtabak",
      "little india murtabak",
      "allauddin's (prata & murtabak stall)"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_briyani_stall",
    name: "Allauddin's Briyani",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka briyani",
      "tekka nasi briyani",
      "little india briyani",
      "allauddin's briyani"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_nasi_lemak_stall",
    name: "Siti Rodiah Nasi Padang",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "tekka nasi lemak",
      "tekka lontong",
      "little india nasi lemak",
      "siti rodiah nasi padang"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_mee_goreng_stall",
    name: "Mee Goreng (Tekka Market)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "tekka mee goreng",
      "little india mee goreng"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_rojak_stall",
    name: "Temasek Indian Rojak",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "tekka rojak",
      "temasek indian rojak"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_drinks_stall",
    name: "Generation Coffee",
    emoji: "🍵",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "tekka teh tarik",
      "tekka drinks",
      "little india drinks",
      "generation coffee"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_char_kway_teow",
    name: "Lao Fu Zi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road char kway teow",
      "oar ckt",
      "lao fu zi"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_hokkien_mee",
    name: "Nam Sing Hokkien Fried Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road hokkien mee",
      "oar hokkien",
      "nam sing hokkien fried mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_prawn_noodles",
    name: "Albert Street Prawn Noodles",
    emoji: "🦐",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road prawn noodles",
      "oar prawn mee",
      "albert street prawn noodles"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_bak_chor_mee",
    name: "Minced Pork Bros",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road bak chor mee",
      "oar bcm",
      "minced pork bros"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_roast_duck_rice",
    name: "Roast Paradise",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "old airport road roast duck",
      "oar duck rice",
      "roast paradise"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_economic_rice",
    name: "Soon Kee Curry Rice",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "old airport road economy rice",
      "oar economic rice",
      "soon kee curry rice"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_laksa",
    name: "Laksa (Old Airport Rd)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road laksa",
      "oar laksa"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_wonton_mee",
    name: "Hua Kee Hougang Famous Wanton Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "old airport road wonton mee",
      "oar wonton",
      "hua kee hougang famous wanton mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_popiah",
    name: "Hock Guan Popiah Rojak",
    emoji: "🌯",
    type: "hawker",
    cuisine: "Snacks",
    aliases: [
      "old airport road popiah",
      "oar popiah",
      "hock guan popiah rojak"
    ],
    dietTags: [
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_oyster_omelette",
    name: "Famous Old Airport Fried Oyster",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "old airport road oyster omelette",
      "oar orh luak",
      "famous old airport fried oyster"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "oar_desserts_drinks",
    name: "Desserts & Drinks (Old Airport Rd)",
    emoji: "🍧",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "old airport road ice kachang",
      "oar drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_chicken_rice",
    name: "Chicken Rice (Golden Mile FC)",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "golden mile chicken rice",
      "gmfc chicken rice"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_bak_kut_teh",
    name: "Bak Kut Teh (Golden Mile FC)",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "golden mile bak kut teh",
      "gmfc bkt"
    ],
    dietTags: [
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_char_kway_teow",
    name: "Char Kway Teow (Golden Mile FC)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "golden mile char kway teow",
      "gmfc ckt"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_hokkien_mee",
    name: "Shiok Hokkien Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "golden mile hokkien mee",
      "gmfc hokkien",
      "shiok hokkien mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_laksa",
    name: "Chung Cheng Chilli Prawn Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "golden mile laksa",
      "gmfc laksa",
      "chung cheng chilli prawn noodles"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_prawn_noodles",
    name: "Hainan Fried Hokkien Prawn Mee",
    emoji: "🦐",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "golden mile prawn noodles",
      "gmfc prawn mee",
      "hainan fried hokkien prawn mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_satay_stall",
    name: "Charlie's Peranakan Food",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "golden mile satay",
      "gmfc satay",
      "charlie's peranakan food"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_snacks_stall",
    name: "Oyster Boy",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "golden mile oyster cake",
      "golden mile carrot cake",
      "gmfc snacks",
      "oyster boy"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gmfc_desserts_drinks",
    name: "Desserts & Drinks (Golden Mile FC)",
    emoji: "🫙",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "golden mile peanut soup",
      "golden mile kopi",
      "gmfc drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_nasi_lemak_stall",
    name: "Nasi Lemak (Geylang Serai)",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai nasi lemak",
      "gsm nasi lemak"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_briyani_stall",
    name: "Geylang Briyani Stall",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Indian/Malay",
    aliases: [
      "geylang serai briyani",
      "gsm briyani",
      "geylang briyani stall"
    ],
    dietTags: [
      "halal",
      "gluten_free",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_nasi_padang_stall",
    name: "Sinar Pagi Nasi Padang",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai nasi padang",
      "gsm nasi padang",
      "sinar pagi nasi padang"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_ayam_penyet_stall",
    name: "Warung Solo",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai ayam penyet",
      "gsm ayam penyet",
      "warung solo"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_lontong_stall",
    name: "Warong Solo",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai lontong",
      "gsm lontong",
      "warong solo"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_murtabak_stall",
    name: "Murtabak (Geylang Serai)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian/Malay",
    aliases: [
      "geylang serai murtabak",
      "gsm murtabak"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_mee_stall",
    name: "Pak Din Mee Soto & Mee Rebus",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai mee goreng",
      "gsm mee goreng",
      "geylang serai mee siam",
      "pak din mee soto & mee rebus"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_beehoon_stall",
    name: "Economy Beehoon (Geylang Serai)",
    emoji: "🍝",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai beehoon",
      "gsm beehoon"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_rojak_stall",
    name: "Rojak & Mee Siam",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "geylang serai rojak",
      "gsm rojak",
      "rojak & mee siam"
    ],
    dietTags: [
      "vegetarian",
      "vegan",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "gsm_desserts_drinks",
    name: "Desserts & Drinks (Geylang Serai)",
    emoji: "🍮",
    type: "hawker",
    cuisine: "Malay",
    aliases: [
      "geylang serai bubur hitam",
      "gsm teh tarik",
      "gsm drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_chicken_rice",
    name: "Loy Kee Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "whampoa chicken rice",
      "whampoa makan chicken rice",
      "loy kee chicken rice"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_economic_rice",
    name: "Economic Rice (Whampoa)",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "whampoa economy rice",
      "whampoa economic rice"
    ],
    dietTags: [
      "halal",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_laksa",
    name: "Laksa (Whampoa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa laksa",
      "whampoa makan laksa"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_bak_chor_mee",
    name: "Teochew Kway Tiao Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa bak chor mee",
      "whampoa bcm",
      "teochew kway tiao mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_ban_mian",
    name: "China Whampoa Home Made Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa ban mian",
      "china whampoa home made noodles"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_wonton_mee",
    name: "Wonton Mee (Whampoa)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa wonton mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_char_kway_teow",
    name: "Chuan Kee Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa char kway teow",
      "whampoa ckt",
      "chuan kee fried kway teow"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_hokkien_mee",
    name: "Singapore Fried Hokkien Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "whampoa hokkien mee",
      "singapore fried hokkien mee"
    ],
    dietTags: [
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_prata_stall",
    name: "Roti Prata (Whampoa)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian",
    aliases: [
      "whampoa prata",
      "whampoa roti prata"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "whampoa_desserts_drinks",
    name: "Desserts & Drinks (Whampoa)",
    emoji: "☕",
    type: "hawker",
    cuisine: "Hawker",
    aliases: [
      "whampoa kopi",
      "whampoa tau huay",
      "whampoa drinks"
    ],
    dietTags: [
      "halal",
      "vegetarian",
      "lactose_free"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "luckin_coffee",
    name: "Luckin Coffee",
    emoji: "☕",
    type: "grab_go",
    cuisine: "Coffee",
    aliases: [
      "luckin",
      "luckin coffee",
      "luckincoffee"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "bonchon",
    name: "Bonchon",
    emoji: "🍗",
    type: "restaurant",
    cuisine: "Korean Fried Chicken",
    aliases: [
      "bonchon",
      "bon chon"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "llaollao",
    name: "Llaollao",
    emoji: "🍦",
    type: "grab_go",
    cuisine: "Frozen Yogurt",
    aliases: [
      "llaollao",
      "llao llao",
      "llao"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "grab_go"
    ]
  },
  
  {
    id: "home_cooked",
    name: "Home Cooked",
    emoji: "🍳",
    type: "home_cooked",
    cuisine: "Home Cooking",
    aliases: [
      "home cooked",
      "homemade",
      "self cook"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "self_cook"
    ]
  },
  {
    id: "ichiban_boshi",
    name: "Ichiban Boshi",
    emoji: "🍣",
    type: "restaurant",
    cuisine: "Japanese",
    aliases: [
      "ichiban boshi",
      "ichiban"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "delivery"
    ]
  },
            {
    id: "new_upper_changi_road_blk_58_lee_len_tong",
    name: "Lee Len Tong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee len tong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
                                {
    id: "bedok_south_road_blk_16_goh_poo_huat",
    name: "Goh Poo Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh poo huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_kwek_ah_heoh",
    name: "Kwek Ah Heoh",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kwek ah heoh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
        
  
  
                      {
    id: "clementi_ave_3_blk_448_lee_guat_hoon",
    name: "Lee Guat Hoon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee guat hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_lee_jim_pong",
    name: "Lee Jim Pong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee jim pong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
          {
    id: "eunos_crescent_blk_4a_teo_kiang_huat",
    name: "Teo Kiang Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "teo kiang huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_tiong_lee_lim",
    name: "Tiong Lee Lim",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "tiong lee lim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "ayer_rajah_food_centre_big_bern_s_american_grill_xpolis_pte_ltd",
    name: "Big Bern'S American Grill Xpolis Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "big bern's american grill xpolis pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
                                  
  
  
          {
    id: "tanglin_halt_market_lim_hang_tong",
    name: "Lim Hang Tong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lim hang tong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_ngern_jwee_chye",
    name: "Ngern Jwee Chye",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ngern jwee chye"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "mei_chin_road_market_goh_jee_tee",
    name: "Goh Jee Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh jee tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_goh_jee_tee_2",
    name: "Goh Jee Tee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "goh jee tee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "mei_chin_road_market_lee_kee_yeo_lee_lian_hong",
    name: "Lee Kee Yeo @Lee Lian Hong",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee kee yeo @lee lian hong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
        {
    id: "new_upper_changi_road_blk_208b_au_jiahao_alex",
    name: "Au Jiahao, Alex",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "au jiahao, alex"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_chan_cheow_teck",
    name: "Chan Cheow Teck",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan cheow teck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_chan_kok_hee_tian_guoxi",
    name: "Chan Kok Hee (Tian Guoxi)",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chan kok hee (tian guoxi)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
              
];

export const BRANDS_2 = [
  
  
  
  
  {
    id: "kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd",
    name: "Ntuc Foodfare Co-Operative Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ntuc foodfare co-operative ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
  {
    id: "telok_ayer_food_centre_e_p_cafeteria_pte_ltd",
    name: "E&P Cafeteria Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "e&p cafeteria pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "telok_ayer_food_centre_jex_pte_ltd",
    name: "Jex Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jex pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
            
  
            
              
  {
    id: "yuhua_village_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
                    
  
        {
    id: "pasir_ris_central_hawker_centre_bee_cheng_hiang_concept_pte_ltd",
    name: "Bee Cheng Hiang Concept Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bee cheng hiang concept pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "pasir_ris_central_hawker_centre_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bengawan solo pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "tampines_round_market_and_food_centre_kentucky_fried_chicken_management_pte_ltd",
    name: "Kentucky Fried Chicken Management Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "kentucky fried chicken management pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "tampines_round_market_and_food_centre_pizza_hut_singapore_pte_ltd",
    name: "Pizza Hut Singapore Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pizza hut singapore pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "teban_gardens_market_and_food_centre_barakath_international_pte_ltd",
    name: "Barakath International Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "barakath international pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
        {
    id: "telok_blangah_market_al_borgo_pte_ltd",
    name: "Al Borgo Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "al borgo pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "telok_blangah_market_ntuc_foodfare_co_operative_ltd",
    name: "Ntuc Foodfare Co-Operative Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ntuc foodfare co-operative ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
                {
    id: "toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd",
    name: "Chang Cheng Food Paradise Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang cheng food paradise pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
          {
    id: "toa_payoh_lorong_4_blk_93_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_pizza_hut_singapore_pte_ltd",
    name: "Pizza Hut Singapore Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "pizza hut singapore pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "kim_keat_palm_market_and_food_centre_chang_lai_pte_ltd",
    name: "Chang Lai Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chang lai pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
          
  
  {
    id: "chong_boon_market_and_food_centre_cheers_holdings_2004_pte_ltd",
    name: "Cheers Holdings (2004) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheers holdings (2004) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
  {
    id: "chong_boon_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
  
  
  {
    id: "cheng_san_market_and_cooked_food_centre_cheers_holdings_2004_pte_ltd",
    name: "Cheers Holdings (2004) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cheers holdings (2004) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
  {
    id: "cheng_san_market_and_cooked_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
    {
    id: "mayflower_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "mayflower_market_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "ang_mo_kio_628_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "ang_mo_kio_628_market_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    
  
  
  
  
  {
    id: "blk_724_ang_mo_kio_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bengawan solo pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_domino_s_pizza_singapore_pte_ltd",
    name: "Domino'S Pizza Singapore Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "domino's pizza singapore pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "bedok_north_street_1_blk_216_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_ntuc_club",
    name: "Ntuc Club",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "ntuc club"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "kaki_bukit_511_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
            {
    id: "bedok_north_street_3_blk_538_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
          {
    id: "85_fengshan_centre_bangkok_street_mookata_pte_ltd",
    name: "Bangkok Street Mookata Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bangkok street mookata pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "85_fengshan_centre_fortune_food_s_pte_ltd",
    name: "Fortune Food (S) Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fortune food (s) pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "85_fengshan_centre_j_k_kings_prata_pte_ltd",
    name: "J K Kings Prata Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "j k kings prata pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_wonderful_management_pte_ltd",
    name: "Wonderful Management Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "wonderful management pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
  
  
  
  
  
  {
    id: "clementi_west_street_2_blk_726_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "clementi_west_street_2_blk_726_new_century_food_house_721_pte_ltd",
    name: "New Century Food House @ 721 Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "new century food house @ 721 pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
        {
    id: "kovan_hougang_market_and_food_centre_alpha_subs_pte_ltd",
    name: "Alpha Subs Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "alpha subs pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_berrylite_parkway_pte_ltd",
    name: "Berrylite Parkway Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "berrylite parkway pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_bliss_restaurant_pte_ltd",
    name: "Bliss Restaurant Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bliss restaurant pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_breadtalk_pte_ltd",
    name: "Breadtalk Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "breadtalk pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_chong_yo_private_limited",
    name: "Chong Yo Private Limited",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "chong yo private limited"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kovan_hougang_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_anytime_food_pte_ltd",
    name: "Anytime Food Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "anytime food pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd",
    name: "Bachmann Japanese Restaurant Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bachmann japanese restaurant pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "bengawan solo pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_breadtalk_pte_ltd",
    name: "Breadtalk Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "breadtalk pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "jurong_west_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_golden_rooster_pte_ltd",
    name: "Golden Rooster Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "golden rooster pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd",
    name: "Boon Tong Kee Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "boon tong kee pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "toa_payoh_lorong_8_blk_210_jnr_food_pte_ltd",
    name: "Jnr Food Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "jnr food pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
      {
    id: "toa_payoh_lorong_8_blk_210_lee_kwang_kee_groups_pte_ltd",
    name: "Lee Kwang Kee Groups Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "lee kwang kee groups pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_domino_s_pizza_singapore_pte_ltd",
    name: "Domino'S Pizza Singapore Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "domino's pizza singapore pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_fei_siong_f_b_holdings_pte_ltd",
    name: "Fei Siong (F&B) Holdings Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "fei siong (f&b) holdings pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    
        
    {
    id: "anchorvale_village_hawker_centre_commonwealth_retail_concepts_pte_ltd",
    name: "Commonwealth Retail Concepts Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "commonwealth retail concepts pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "mcdonald's restaurants pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
            {
    id: "one_punggol_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "one_punggol_hawker_centre_haji_karim_prata_palace_pte_ltd",
    name: "Haji Karim Prata Palace Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "haji karim prata palace pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
    {
    id: "punggol_coast_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "cold storage singapore (1983) pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
          {
    id: "punggol_coast_hawker_centre_srisun_prata_com_food_holding_s_pte_ltd",
    name: "Srisun Prata . Com Food Holding'S Pte. Ltd.",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Local & Hawker",
    aliases: [
      "srisun prata . com food holding's pte. ltd."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
              {
    id: "tai_wah_pork_noodle",
    name: "Tai Wah Pork Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Teochew Noodles",
    aliases: [
      "tai wah pork noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "tiong_bahru_chicken_rice_hws",
    name: "Tiong Bahru Hainanese Chicken Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "tiong bahru hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "jason_penang_cuisine",
    name: "Jason Penang Cuisine",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Penang / Malaysian",
    aliases: [
      "jason penang cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "tai_seng_fish_soup",
    name: "Tai Seng Fish Soup",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Fish Soup",
    aliases: [
      "tai seng fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "chef_wei_hk_cheong_fun",
    name: "Chef Wei HK Cheong Fun",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hong Kong / Cheong Fun",
    aliases: [
      "chef wei hk cheong fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "king_of_fried_rice_hws",
    name: "King of Fried Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Fried Rice",
    aliases: [
      "king of fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "hill_street_coffee_shop",
    name: "Hill Street Coffee Shop",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Coffeeshop / Kopi",
    aliases: [
      "hill street coffee shop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "pangs_hakka_ytf",
    name: "Pang's Hakka Yong Tau Foo",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hakka",
    aliases: [
      "pang's hakka yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "hill_street_hainanese_curry_rice",
    name: "Hill Street Hainanese Curry Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hainanese Curry Rice",
    aliases: [
      "hill street hainanese curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "famous_eunos_bak_chor_mee",
    name: "Famous Eunos Bak Chor Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Bak Chor Mee",
    aliases: [
      "famous eunos bak chor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "jiak_song_mee_hoon_kway",
    name: "Jiak Song Mee Hoon Kway",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Mee Hoon Kway",
    aliases: [
      "jiak song mee hoon kway"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "ramen_king_hws",
    name: "Ramen King",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Japanese Ramen",
    aliases: [
      "ramen king"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "beach_road_scissor_cut_curry_rice",
    name: "Beach Road Scissor-Cut Curry Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Curry Rice",
    aliases: [
      "beach road scissor-cut curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "koungs_wan_tan_mee",
    name: "Koung's Wan Tan Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Wanton Mee",
    aliases: [
      "koung's wan tan mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "old_teochew_satay_beehoon",
    name: "Old Teochew Satay Bee Hoon & Mee Siam",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Teochew",
    aliases: [
      "old teochew satay bee hoon & mee siam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "kaki_makan",
    name: "Kaki Makan",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Halal Local",
    aliases: [
      "kaki makan"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "thai_makan_by_thai_dynasty",
    name: "Thai Makan by Thai Dynasty",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Halal Thai",
    aliases: [
      "thai makan by thai dynasty"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "raja_wok",
    name: "Raja Wok",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Halal Fried Rice",
    aliases: [
      "raja wok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "waker_chicken",
    name: "Waker Chicken",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Korean Fried Chicken",
    aliases: [
      "waker chicken"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "loong_kee_yong_tau_fu",
    name: "Loong Kee Yong Tau Fu",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Yong Tau Fu",
    aliases: [
      "loong kee yong tau fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "fei_fei_roasted_noodle",
    name: "Fei Fei Roasted Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Roasted Meats / Noodles",
    aliases: [
      "fei fei roasted noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "top_1_home_made_noodle",
    name: "Top 1 Home Made Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Ban Mian / Noodles",
    aliases: [
      "top 1 home made noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "nikmat_nasi_lemak_husk",
    name: "Nikmat Nasi Lemak by Husk",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Nasi Lemak",
    aliases: [
      "nikmat nasi lemak by husk"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "pondok_indah_nasi_padang",
    name: "Pondok Indah Indonesian Nasi Padang",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Nasi Padang",
    aliases: [
      "pondok indah indonesian nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "fire_western_n_grill",
    name: "Fire Western 'N' Grill",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "fire western 'n' grill"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "nam_sing_hokkien_mee",
    name: "Nam Sing Hokkien Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Hokkien Mee",
    aliases: [
      "nam sing hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "garden_street_kway_chap",
    name: "Garden Street Kway Chap",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Kway Chap",
    aliases: [
      "garden street kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "hawkers_street"
  },
  {
    id: "coffeesmith",
    name: "Coffeesmith",
    emoji: "☕",
    type: "grab_go",
    cuisine: "Cafe",
    aliases: [
      "coffeesmith",
      "coffee smith"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hollin",
    name: "Hollin",
    emoji: "🧋",
    type: "grab_go",
    cuisine: "Milk Tea",
    aliases: [
      "hollin"
    ],
    dietTags: [
      "halal",
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "four_leaves",
    name: "Four Leaves",
    emoji: "🍞",
    type: "grab_go",
    cuisine: "Bakery",
    aliases: [
      "four leaves",
      "four leaves bakery"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "tekka_jom_makan_prata",
    name: "Jom Makan (Prata Saga Sambal Berlada)",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian Muslim",
    aliases: [
      "jom makan",
      "prata saga sambal berlada",
      "tekka jom makan"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tekka_ar_rahman_cafe",
    name: "Ar-Rahman Cafe & Royal Prata",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Indian Muslim",
    aliases: [
      "ar-rahman cafe",
      "ar rahman cafe",
      "royal prata",
      "tekka ar rahman"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koufu_happy_hawkers",
    name: "Happy Hawkers",
    emoji: "🍚",
    type: "restaurant",
    cuisine: "Local Coffeeshop",
    aliases: [
      "happy hawkers"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koufu_fork_spoon",
    name: "Fork & Spoon",
    emoji: "🍜",
    type: "restaurant",
    cuisine: "Local (No Pork, No Lard)",
    aliases: [
      "fork and spoon",
      "fork & spoon"
    ],
    dietTags: [
      "no_pork"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koufu_grove",
    name: "Grove",
    emoji: "🥗",
    type: "restaurant",
    cuisine: "Vegetarian",
    aliases: [
      "grove"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koufu_1983_coffee_toast",
    name: "1983 - Coffee & Toast",
    emoji: "☕",
    type: "restaurant",
    cuisine: "Local Coffeeshop",
    aliases: [
      "1983 coffee and toast",
      "1983 coffee & toast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koufu_1983_taste_of_nanyang",
    name: "1983 - A Taste of Nanyang",
    emoji: "☕",
    type: "restaurant",
    cuisine: "Local Coffeeshop",
    aliases: [
      "1983 a taste of nanyang",
      "1983 taste of nanyang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bengawan_solo",
    name: "Bengawan Solo",
    emoji: "🍰",
    type: "grab_go",
    cuisine: "Nyonya Kueh",
    aliases: [
      "bengawan solo"
    ],
    dietTags: [],
    priceRange: "$$",
    platforms: [
      "grab_go",
      "delivery"
    ]
  },
  {
    id: "kopitiam_kopi_kiosk",
    name: "Kopi Kiosk",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "kopi kiosk"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_putian_street_food",
    name: "Putian Street Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "putian street food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chinatown_roasted",
    name: "Chinatown Roasted",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chinatown roasted"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_haus_spinach_fish_soup",
    name: "Haus Spinach Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "haus spinach fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pak_lum_local_delight",
    name: "Pak Lum Local Delight",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "pak lum local delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_saayah_sayang_nasi_padang",
    name: "Saayah Sayang Nasi Padang",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "saayah sayang nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_beradik_western",
    name: "Beradik Western",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "beradik western"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kim_dae_bak",
    name: "Kim Dae Bak",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "kim dae bak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ayam_penyet",
    name: "Ayam Penyet",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "ayam penyet"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lao_fan_ji_claypot_and_bak_kut_teh",
    name: "Lao Fan Ji Claypot & Bak Kut Teh",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lao fan ji claypot & bak kut teh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ampang_yong_tao_fu_and_beef_noodle",
    name: "Ampang Yong Tao Fu & Beef Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ampang yong tao fu & beef noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yu_ni_xiang_yu_grilled_fish",
    name: "Yu Ni Xiang Yu Grilled Fish",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "yu ni xiang yu grilled fish"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_jia_mixed_veggie_rice",
    name: "He Jia Mixed Veggie Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "he jia mixed veggie rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_taiwan_street_food",
    name: "Taiwan Street Food",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Taiwanese",
    aliases: [
      "taiwan street food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_qiu_lian_ban_mian",
    name: "Qiu Lian Ban Mian",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "qiu lian ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cinta_chicken_rice",
    name: "Cinta Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "cinta chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_monster_chili_mala_hot_pot",
    name: "Monster Chili Mala Hot Pot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "monster chili mala hot pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_braised_duck_and_kay_chap",
    name: "Braised Duck & Kay Chap",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "braised duck & kay chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_egg_thai",
    name: "Egg Thai",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "egg thai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kubis_korean_food",
    name: "Kubis Korean Food",
    emoji: "🇰🇷",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "kubis korean food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_universal_economical_rice",
    name: "Universal Economical Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "universal economical rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_home_wok",
    name: "Home Wok",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "home wok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_heritage_tanglin_puff",
    name: "Heritage Tanglin Puff",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "heritage tanglin puff"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bear_baby_spicy_fragrant_pot",
    name: "Bear Baby Spicy Fragrant Pot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "bear baby spicy fragrant pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_kong_delights",
    name: "Hong Kong Delights",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "hong kong delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cik_lim_ytf",
    name: "Cik Lim YTF",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "cik lim ytf"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kakhi_nang",
    name: "Kakhi Nang",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "kakhi nang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chinatown_roasted_delight",
    name: "Chinatown Roasted Delight",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chinatown roasted delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_washouku_geon",
    name: "Washouku Geon",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "washouku geon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kakak_handmade_noodle",
    name: "Kakak Handmade Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "kakak handmade noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_soon_lee_fish_soup",
    name: "Soon Lee Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "soon lee fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_majulah_penyet_and_bakar",
    name: "Majulah Penyet & Bakar",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "majulah penyet & bakar"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_new_hokkien_mee",
    name: "New HOKKIEN MEE",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "new hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seabay_mini_wok",
    name: "Seabay Mini Wok",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "seabay mini wok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cinta_hainanese_chicken_rice",
    name: "Cinta Hainanese Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "cinta hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_chew_yong_tao_foo",
    name: "Ah Chew Yong Tao Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ah chew yong tao foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lau_di_fang_scissors_cut_curry_rice",
    name: "Lau Di Fang Scissors-Cut Curry Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "lau di fang scissors-cut curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xiang_chi_mian",
    name: "Xiang Chi Mian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "xiang chi mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_western_boy",
    name: "Western Boy",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "western boy"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pin_wei_chee_cheong_fun",
    name: "Pin Wei Chee Cheong Fun",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "pin wei chee cheong fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kallang_airport_wanton_mee",
    name: "Kallang Airport Wanton Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "kallang airport wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_dae_bak",
    name: "King Dae Bak",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "king dae bak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pepper_kitchen",
    name: "Pepper Kitchen",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "pepper kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pepper_lunch",
    name: "Pepper Lunch",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "pepper lunch"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_riverside_indonesia_bbq",
    name: "Riverside Indonesia BBQ",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "riverside indonesia bbq"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mala_hot_pot",
    name: "Mala Hot Pot",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "mala hot pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ayam_taliwang_nasi_lemak",
    name: "Ayam Taliwang Nasi Lemak",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "ayam taliwang nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_er_herbal_soup",
    name: "Ah Er Herbal Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ah er herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_origina_fish_soup",
    name: "Origina Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "origina fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_royal_rojak",
    name: "Royal Rojak",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "royal rojak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_teohchew_cuisine",
    name: "Teohchew Cuisine",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "teohchew cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kokoro_kiosuku",
    name: "Kokoro Kiosuku",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "kokoro kiosuku"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_homewok",
    name: "Homewok",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "homewok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  }
];

export const BRANDS_3 = [
  {
    id: "kopitiam_putien",
    name: "Putien",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "putien"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_flint_specialty_grill",
    name: "Flint Specialty Grill",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "flint specialty grill"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hjh_maimunah",
    name: "HJH Maimunah",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hjh maimunah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_grouper_fish_soup",
    name: "King Grouper Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "king grouper fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_eco_rice",
    name: "Eco Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "eco rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ampang_ytf",
    name: "Ampang YTF",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ampang ytf"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fitra_chicken_rice",
    name: "Fitra Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "fitra chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bu_tang_wang_pepper_soup",
    name: "Bu Tang Wang Pepper Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "bu tang wang pepper soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chinatown_hk_roast",
    name: "Chinatown HK Roast",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chinatown hk roast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ann_chin_popiah",
    name: "Ann Chin Popiah",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ann chin popiah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pepper_lunch_express",
    name: "Pepper Lunch Express",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "pepper lunch express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kallang_airport_wanton_noodle",
    name: "Kallang Airport Wanton Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "kallang airport wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bread_junction",
    name: "Bread Junction",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "bread junction"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_jia_bian_fan_porridge",
    name: "He Jia Bian Fan Porridge",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "he jia bian fan porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kakak_handmade_noodles",
    name: "Kakak Handmade Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "kakak handmade noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pak_lum_local_delights",
    name: "Pak Lum Local Delights",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "pak lum local delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_y_and_h_ayam_penyet",
    name: "Y&H Ayam Penyet",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "y&h ayam penyet"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wah_zai_ampang_yong_tau_foo_and_tangkak_beef_noodle",
    name: "Wah Zai Ampang Yong Tau Foo & Tangkak Beef Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "wah zai ampang yong tau foo & tangkak beef noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_majulah_nasi_padang",
    name: "Majulah Nasi Padang",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "majulah nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ha_lou_hokkien_mee",
    name: "Ha Lou Hokkien Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ha lou hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_dae_bak_korean",
    name: "King Dae Bak Korean",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "king dae bak korean"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_what_the_fish",
    name: "What The Fish",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "what the fish"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bkt_and_claypot_rice",
    name: "BKT & Claypot Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "bkt & claypot rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_riverside_bbq",
    name: "Riverside BBQ",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "riverside bbq"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wen_xiang_yuan",
    name: "Wen Xiang Yuan",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "wen xiang yuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_jia_mixed_veg_rice",
    name: "He Jia Mixed Veg Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "he jia mixed veg rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_putian_food",
    name: "Putian Food",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "putian food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_teow_chew_cuisine",
    name: "Teow Chew Cuisine",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "teow chew cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dan_lao",
    name: "Dan Lao",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "dan lao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_express_teppanyaki",
    name: "Express Teppanyaki",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "express teppanyaki"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pig_s_organ_soup",
    name: "Pig’s Organ Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "pig’s organ soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_na_na_homemade_curry",
    name: "Na Na Homemade Curry",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "na na homemade curry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_ma_chi_mian",
    name: "Ah Ma Chi Mian",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ah ma chi mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bali_bali_indonesian_bbq",
    name: "Bali Bali Indonesian BBQ",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "bali bali indonesian bbq"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_guan_chee_hk_roast",
    name: "Guan Chee HK Roast",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "guan chee hk roast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lam_s_noodle_and_chicken",
    name: "Lam’s Noodle & Chicken",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "lam’s noodle & chicken"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lobster_king_pao_fan",
    name: "Lobster King Pao Fan",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lobster king pao fan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mian_mian_ju_dao",
    name: "Mian Mian Ju Dao",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "mian mian ju dao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seabay_wok_delight",
    name: "Seabay Wok Delight",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "seabay wok delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_old_hup_kee",
    name: "Old Hup Kee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "old hup kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fitra_hainanese_chicken_rice",
    name: "Fitra Hainanese Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "fitra hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hjh_maimunah_mini",
    name: "HJH Maimunah Mini",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "hjh maimunah mini"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_donburi_oyster_beer",
    name: "Donburi. Oyster. Beer",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "donburi. oyster. beer"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xi_de_li",
    name: "Xi De Li",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "xi de li"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dapur_dapur_pisang",
    name: "Dapur Dapur Pisang",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "dapur dapur pisang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hk_chun_kee",
    name: "HK Chun Kee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "hk chun kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ho_chiak_north",
    name: "Ho Chiak North",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ho chiak north"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shuang_xing",
    name: "Shuang Xing",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "shuang xing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ak_sait_restaurant",
    name: "Ak Sait Restaurant",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "ak sait restaurant"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kimly_dim_sum",
    name: "Kimly Dim Sum",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "kimly dim sum"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ming_xiang_food",
    name: "Ming Xiang Food",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ming xiang food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mini_wok",
    name: "Mini Wok",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "mini wok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ri_ri_hong_mala_hot_pot",
    name: "Ri Ri Hong Mala Hot Pot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "ri ri hong mala hot pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kimly_mixed_rice",
    name: "Kimly Mixed Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "kimly mixed rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seafood_king_pao_fan",
    name: "Seafood King Pao Fan",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "seafood king pao fan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ju_bao_xuan_mala_hotpot",
    name: "Ju Bao Xuan Mala Hotpot",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "ju bao xuan mala hotpot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nks_indian_muslim_food",
    name: "NKS Indian Muslim Food",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "nks indian muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_heavenly_wang",
    name: "Heavenly Wang",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "heavenly wang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_econ_bee_hoon",
    name: "Econ Bee Hoon",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "econ bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_liang_ji",
    name: "Liang Ji",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "liang ji"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_popular_food",
    name: "Popular Food",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "popular food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_new_hk_roast",
    name: "New HK Roast",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "new hk roast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_master_crab",
    name: "Master Crab",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "master crab"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lao_huo_tang",
    name: "Lao Huo Tang",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "lao huo tang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_confirm_chop",
    name: "Confirm + Chop",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "confirm + chop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chang_cheng",
    name: "Chang Cheng",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "chang cheng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xiao_mei_pork_noodle",
    name: "Xiao Mei Pork Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "xiao mei pork noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_just_greens",
    name: "Just Greens",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "just greens"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tian_tian_fa_hainanese_chicken_rice",
    name: "Tian Tian Fa Hainanese Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "tian tian fa hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yb_fried_bee_hoon",
    name: "YB Fried Bee Hoon",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "yb fried bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tai_pai_tong_seafood",
    name: "Tai Pai Tong Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "tai pai tong seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_culiang_yufen",
    name: "CuLiang YuFen",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "culiang yufen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_divine_chicken_pot",
    name: "Divine Chicken Pot",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "divine chicken pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_singhk",
    name: "SingHK",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "singhk"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chicken_rice_and_beef_noodles",
    name: "Chicken Rice & Beef Noodles",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chicken rice & beef noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yong_feng_ji_chicken_rice",
    name: "Yong Feng Ji Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "yong feng ji chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ubi_le_sheng_yong_tou_fu",
    name: "Ubi Le Sheng Yong Tou Fu",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ubi le sheng yong tou fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_maxwell",
    name: "老面檔街 Maxwell",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "老面檔街 maxwell"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_97_nasi_lemak",
    name: "97 Nasi Lemak",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "97 nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_china_wampoa_home_made_noodle",
    name: "China Wampoa Home Made Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "china wampoa home made noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wok_26",
    name: "@Wok 26",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "@wok 26"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_heng_gi_goose_and_duck_rice",
    name: "Heng Gi Goose and Duck Rice",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "heng gi goose and duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_heng_heng_noodle_house",
    name: "Heng Heng Noodle House",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "heng heng noodle house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shi_nian",
    name: "Shi Nian",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "shi nian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_di_claypot",
    name: "Ah Di Claypot",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ah di claypot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_amk_711_hainan_western",
    name: "Amk 711 Hainan Western",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "amk 711 hainan western"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tai_hao_chi_roasted_delights",
    name: "Tai Hao Chi Roasted Delights",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "tai hao chi roasted delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_day_night_herbal_soup",
    name: "Day Night Herbal Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "day night herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jiaocai_seafood",
    name: "Jiaocai Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "jiaocai seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xuan_yuan_su_shi",
    name: "Xuan Yuan Su Shi",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "xuan yuan su shi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_fa_japanese_and_korean_cuisine",
    name: "Hong Fa Japanese & Korean Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "hong fa japanese & korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_project_penyek",
    name: "Project Penyek",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "project penyek"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_spicy_pot",
    name: "Spicy Pot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "spicy pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mohamed_ayaan_rojak",
    name: "Mohamed Ayaan Rojak",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "mohamed ayaan rojak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_arabica_kebab",
    name: "Arabica Kebab",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "arabica kebab"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_d_ranum_nasi_padang",
    name: "D’Ranum Nasi Padang",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "d’ranum nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ntp_western_and_grill",
    name: "NTP Western & Grill",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "ntp western & grill"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yi_ding_hao_eating_house",
    name: "Yi Ding Hao Eating House",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "yi ding hao eating house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_pin_mixed_veg_rice",
    name: "Hong Pin Mixed Veg Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hong pin mixed veg rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hainan_beef_noodle_and_claypot",
    name: "Hainan Beef Noodle & Claypot",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hainan beef noodle & claypot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wonder_chicken_kitchen",
    name: "Wonder Chicken Kitchen",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "wonder chicken kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tian_tian_nasi_lemak",
    name: "Tian Tian Nasi Lemak",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "tian tian nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_green_tea_rice",
    name: "Green Tea Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "green tea rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chye_lye_ah_ma_mee_sua",
    name: "Chye Lye Ah Ma Mee Sua",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "chye lye ah ma mee sua"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kickstart_pancake",
    name: "Kickstart Pancake",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "kickstart pancake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_like_pudding_hot_and_cold_dessert",
    name: "Like Pudding Hot & Cold Dessert",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "like pudding hot & cold dessert"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_korean_japanese_cuisine",
    name: "Korean . Japanese Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "korean . japanese cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_you_xiang_teochew_noodles",
    name: "You Xiang Teochew Noodles",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "you xiang teochew noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_169_may_fish_soup",
    name: "169 May Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "169 may fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yew_lee_wanton_noodle",
    name: "Yew Lee Wanton Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "yew lee wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yu_kee_braised_duck",
    name: "Yu Kee Braised Duck",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "yu kee braised duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chye_lye_bp_lor_mee_and_prawn_mee",
    name: "Chye Lye BP Lor Mee/ Prawn Mee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "chye lye bp lor mee/ prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yuan_ji_handmade_pau_tim_sum",
    name: "Yuan Ji Handmade Pau Tim Sum",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "yuan ji handmade pau tim sum"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_abang_teh_tarik",
    name: "Abang Teh Tarik",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "abang teh tarik"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kashmir_indian_muslim_food",
    name: "Kashmir Indian Muslim Food",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "kashmir indian muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dapur_seri_nasi_ayam",
    name: "Dapur Seri Nasi Ayam",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "dapur seri nasi ayam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_saamsudeen",
    name: "Saamsudeen",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "saamsudeen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hainan_hometown_curry",
    name: "Hainan Hometown Curry",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "hainan hometown curry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shi_song_vegetarian",
    name: "Shi Song Vegetarian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "shi song vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jing_wang_handmade_dim_sum",
    name: "Jing Wang Handmade Dim Sum",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "jing wang handmade dim sum"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_danlao_scrambled_egg_rice",
    name: "Danlao Scrambled Egg Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "danlao scrambled egg rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chang_cheng_rice_garden",
    name: "Chang Cheng (Rice Garden)",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "chang cheng (rice garden)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yu_wei_ju_quan",
    name: "Yu Wei Ju Quan",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "yu wei ju quan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_munchi_pancakes",
    name: "Munchi Pancakes",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "munchi pancakes"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_steam_fish",
    name: "Steam Fish",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "steam fish"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_a_and_m_zaika_indian_muslim_food",
    name: "A & M Zaika Indian Muslim Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "a & m zaika indian muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_telur_thai",
    name: "Telur Thai",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "telur thai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xin_hai_feast",
    name: "Xin Hai Feast",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "xin hai feast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xi_an_cuisine",
    name: "Xi An Cuisine",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "xi an cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_na_na_curry",
    name: "Na Na Curry",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "na na curry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_gao_ji_yong_tau_foo",
    name: "Gao Ji Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "gao ji yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hjh_maimunah_nasi_padang",
    name: "HJH Maimunah Nasi Padang",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "hjh maimunah nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hjh_maimunah_malay_snack",
    name: "HJH Maimunah Malay Snack",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hjh maimunah malay snack"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_riverside_indonesian_grill",
    name: "Riverside Indonesian Grill",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "riverside indonesian grill"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_delibowl_rice_express",
    name: "Delibowl Rice Express",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "delibowl rice express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_taiwan_dessert_and_milk_tea",
    name: "Taiwan Dessert & Milk Tea",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Taiwanese",
    aliases: [
      "taiwan dessert & milk tea"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_western",
    name: "Western",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "western"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_roasted",
    name: "Roasted",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "roasted"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_soup_and_cheong_fun",
    name: "Soup & Cheong Fun",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "soup & cheong fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fishball_noodle",
    name: "Fishball Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_super_nasi_lemak_club",
    name: "Super Nasi Lemak Club",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "super nasi lemak club"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seng_heng_atas_roasted_delights_chinatown",
    name: "Seng Heng Atas Roasted Delights Chinatown",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "seng heng atas roasted delights chinatown"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_emogi_yong_tau_foo",
    name: "Emogi Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "emogi yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jom_chicken_rice",
    name: "JOM Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "jom chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_rindu_rasa_western",
    name: "Rindu Rasa Western",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "rindu rasa western"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_jia_huan_and_rice_garden",
    name: "He Jia Huan / Rice Garden",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "he jia huan / rice garden"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_d_laila_cuisine",
    name: "D Laila Cuisine",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "d laila cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jia_wei_lao_huo_bao_tang",
    name: "Jia Wei Lao Huo Bao Tang",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "jia wei lao huo bao tang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ain_popiah_basah",
    name: "Ain Popiah Basah",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ain popiah basah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_548_nonya_kueh",
    name: "548 Nonya Kueh",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "548 nonya kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_rayeesa_s_malay_kitchen",
    name: "Rayeesa’s Malay Kitchen",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "rayeesa’s malay kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chicken_rice_and_ytf",
    name: "Chicken Rice/YTF",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "chicken rice/ytf"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_grouper",
    name: "King Grouper",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "king grouper"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_master_tang",
    name: "Master Tang",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "master tang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_teochew",
    name: "Teochew",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "teochew"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_japanese",
    name: "Japanese",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "japanese"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_japanese_and_korean_cuisine",
    name: "Japanese & Korean Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "japanese & korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chendol",
    name: "Chendol",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "chendol"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lau_huo_tang",
    name: "Lau Huo Tang",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lau huo tang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_roasted_deligths",
    name: "Roasted Deligths",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "roasted deligths"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mama_putien",
    name: "Mama Putien",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "mama putien"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_munchi_pancake",
    name: "Munchi Pancake",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "munchi pancake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wanton_noodles",
    name: "Wanton Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "wanton noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd",
    name: "Tiong Bahru Tian Bo Shui Kueh Pte Ltd",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "tiong bahru tian bo shui kueh pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seafood",
    name: "Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_herbal_soup_northpoint_city",
    name: "Herbal Soup (Northpoint City)",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "herbal soup (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_japanese_food_northpoint_city",
    name: "Japanese Food (Northpoint City)",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "japanese food (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dao_xiao_mian_northpoint_city",
    name: "Dao Xiao Mian (Northpoint City)",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "dao xiao mian (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_i_sel_fish_northpoint_city",
    name: "I Sel Fish (Northpoint City)",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "i sel fish (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yong_tao_foo_northpoint_city",
    name: "Yong Tao Foo (Northpoint City)",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "yong tao foo (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_thai_cuisine_northpoint_city",
    name: "Thai Cuisine (Northpoint City)",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "thai cuisine (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chicken_rice_northpoint_city",
    name: "Chicken Rice (Northpoint City)",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chicken rice (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fried_item_northpoint_city",
    name: "Fried Item (Northpoint City)",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "fried item (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_korean_food_northpoint_city",
    name: "Korean Food (Northpoint City)",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "korean food (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_economic_rice_northpoint_city",
    name: "Economic Rice (Northpoint City)",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "economic rice (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xiang_chi_mian_northpoint_city",
    name: "Xiang Chi Mian (Northpoint City)",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "xiang chi mian (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kopi_kiosk_northpoint_city",
    name: "Kopi Kiosk (Northpoint City)",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "kopi kiosk (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_rice_garden",
    name: "Rice Garden",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "rice garden"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mings_kitchen",
    name: "Mings Kitchen",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "mings kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_g_western",
    name: "G Western",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "g western"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mr_prata",
    name: "Mr. Prata",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "mr. prata"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jue_shi_lor_mee",
    name: "Jue Shi Lor Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "jue shi lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_roasted_item_and_herbal_soup",
    name: "Roasted Item and Herbal Soup",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "roasted item and herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jin_kimchi_express",
    name: "Jin Kimchi Express",
    emoji: "🇰🇷",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jin kimchi express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seabay_delight",
    name: "Seabay Delight",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "seabay delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_indian_muslim_food",
    name: "Indian Muslim Food",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "indian muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xing_long_fish_soup",
    name: "Xing Long Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "xing long fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tenderbest",
    name: "Tenderbest",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "tenderbest"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pepper_lunch_northpoint_city",
    name: "Pepper Lunch (Northpoint City)",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "pepper lunch (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mini_wok_northpoint_city",
    name: "Mini Wok (Northpoint City)",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "mini wok (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hk_roasted_northpoint_city",
    name: "HK Roasted (Northpoint City)",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "hk roasted (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_indian_vegetarian_northpoint_city",
    name: "Indian Vegetarian (Northpoint City)",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "indian vegetarian (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hainan_beef_noodles_and_claypot",
    name: "Hainan Beef Noodles & Claypot",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hainan beef noodles & claypot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_minum_minum_cold_and_hot_beverage_coffee_and_tea",
    name: "Minum Minum (Cold/Hot Beverage . Coffee/Tea)",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "minum minum (cold/hot beverage . coffee/tea)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dessert",
    name: "Dessert",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "dessert"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_just_greens_vegetarian",
    name: "Just Greens vegetarian",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "just greens vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_lim_curry_puff",
    name: "Hong Lim Curry Puff",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "hong lim curry puff"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_maxwell_hainanase_chicken_rice",
    name: "Maxwell Hainanase Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "maxwell hainanase chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pang_pang_wanton_noodles",
    name: "Pang Pang Wanton Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "pang pang wanton noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yong_seng_heng_prawn_noodles",
    name: "Yong Seng Heng Prawn Noodles",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "yong seng heng prawn noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_i_m_thai_kitchen_premiumthai_mookata",
    name: "I’m Thai Kitchen (Premiumthai Mookata)",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "i’m thai kitchen (premiumthai mookata)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ofanz_rojak_popiah",
    name: "Ofanz (Rojak Popiah)",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ofanz (rojak popiah)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_gong_homemade_ban_mian",
    name: "Ah Gong Homemade Ban Mian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ah gong homemade ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_fat_braised_duck_kway_chap",
    name: "Ah Fat Braised Duck . Kway Chap",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "ah fat braised duck . kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jia_le_yong_tau_foo",
    name: "Jia Le Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jia le yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_juma_econ_bee_hoon",
    name: "Ah Juma Econ Bee Hoon",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "ah juma econ bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ka_ka_japanese_curry_house",
    name: "Ka KA Japanese Curry House",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "ka ka japanese curry house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chinatown_mala_hotpot",
    name: "Chinatown Mala Hotpot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "chinatown mala hotpot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hk_roasted_delight",
    name: "Hk Roasted Delight",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "hk roasted delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ban_mian_and_fish_soup",
    name: "Ban Mian/fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ban mian/fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yong_tau_foo_and_mala",
    name: "Yong Tau foo/Mala",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "yong tau foo/mala"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_day_and_night_herbal_soup",
    name: "Day & Night Herbal Soup",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "day & night herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_rv_pancakes",
    name: "RV Pancakes",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "rv pancakes"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_western_cuisine_northpoint_city",
    name: "Western Cuisine (Northpoint City)",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "western cuisine (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fish_soup_northpoint_city",
    name: "Fish Soup (Northpoint City)",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "fish soup (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_banana_leaf_briyani_northpoint_city",
    name: "Banana Leaf Briyani (Northpoint City)",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "banana leaf briyani (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nasi_padang_northpoint_city",
    name: "Nasi Padang (Northpoint City)",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "nasi padang (northpoint city)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ming_fa_fishball",
    name: "Ming Fa Fishball",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ming fa fishball"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_like_pudding",
    name: "Like Pudding",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "like pudding"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mengji_noodle_house",
    name: "MengJi Noodle House",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "mengji noodle house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pao_fan",
    name: "Pao Fan",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "pao fan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_gong_fu_yuan",
    name: "Gong Fu Yuan",
    emoji: "🥦",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "gong fu yuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_p_and_j_western_food",
    name: "P&J Western Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "p&j western food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_greentea_rice",
    name: "GreenTea Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "greentea rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pig_s_organ_soup_bak_kut_teh",
    name: "Pig’s Organ Soup Bak Kut Teh",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "pig’s organ soup bak kut teh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ippon_fusion_bowl",
    name: "Ippon Fusion Bowl",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "ippon fusion bowl"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_a1_economic_beehoon_nasi_lemak",
    name: "A1 Economic Beehoon. Nasi Lemak",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "a1 economic beehoon. nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_zhi_rong_korean_cuisine",
    name: "He Zhi Rong Korean Cuisine",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "he zhi rong korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_social_bite",
    name: "Social Bite",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "social bite"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mang_cheng_xiang_curry_rice",
    name: "Mang Cheng Xiang Curry Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "mang cheng xiang curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fat_fat_food_carrot_cake_and_hokkien_mee",
    name: "Fat Fat Food Carrot Cake & Hokkien Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "fat fat food carrot cake & hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_man_na_la",
    name: "Man Na La",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "man na la"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_botak_cantonese_porridge",
    name: "Botak Cantonese Porridge",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Taiwanese",
    aliases: [
      "botak cantonese porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lobster_pao_fan",
    name: "Lobster Pao Fan",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lobster pao fan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_best_zaika",
    name: "Best Zaika",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "best zaika"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jian_fa_bbq_seafood",
    name: "Jian Fa BBQ Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "jian fa bbq seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mommy_rendang",
    name: "Mommy Rendang",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "mommy rendang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_my_happy_belly",
    name: "My Happy Belly",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "my happy belly"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_soon_kee_roasted_delights",
    name: "Soon Kee Roasted Delights",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "soon kee roasted delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hj_salim",
    name: "HJ Salim",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "hj salim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mr_islamic_power_rojak",
    name: "Mr. Islamic Power Rojak",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "mr. islamic power rojak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_san_yi_xuan",
    name: "San Yi Xuan",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "san yi xuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_ma_mee_sua",
    name: "Ah Ma Mee Sua",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ah ma mee sua"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yuan_he_mee_jian_keuh",
    name: "Yuan He Mee Jian Keuh",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "yuan he mee jian keuh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_snek_ku_di_lorong_fatimah",
    name: "Snek Ku Di Lorong Fatimah",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "snek ku di lorong fatimah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_traditional_lor_mee_prawn_noodle_laksa",
    name: "Traditional Lor Mee Prawn Noodle Laksa",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "traditional lor mee prawn noodle laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_cheng_kee_carrot_cake",
    name: "Hao Cheng Kee Carrot cake",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "hao cheng kee carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xi_wang_bak_kut_teh",
    name: "Xi Wang Bak Kut Teh",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "xi wang bak kut teh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ming_fa_fishball_noodle",
    name: "Ming Fa Fishball Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ming fa fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yu_kee_braised_duck_kway_chap",
    name: "Yu Kee Braised Duck . Kway Chap",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "yu kee braised duck . kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xian_fu_fish_soup",
    name: "Xian Fu Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "xian fu fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fusion_nasi_briyani_chinese_rice",
    name: "Fusion Nasi Briyani Chinese Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "fusion nasi briyani chinese rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_the_western_house",
    name: "The Western House",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "the western house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_long_ding_seafood",
    name: "Long Ding Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "long ding seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mr_sehu_food_palace",
    name: "Mr. Sehu Food Palace",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "mr. sehu food palace"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chinese_cuisine_sichuan",
    name: "Chinese Cuisine Sichuan",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "chinese cuisine sichuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_bang_nasi_goreng",
    name: "Ah Bang Nasi Goreng",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ah bang nasi goreng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_my_kampung",
    name: "My Kampung",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "my kampung"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_old_time",
    name: "Old Time",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "old time"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_santapan_nadika",
    name: "Santapan Nadika",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "santapan nadika"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_delicious_dim_sum",
    name: "Delicious Dim Sum",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "delicious dim sum"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_le_rong_rojak_and_popiah_and_porridge",
    name: "He Le Rong Rojak & Popiah & Porridge",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "he le rong rojak & popiah & porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kz_bakery",
    name: "KZ Bakery",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "kz bakery"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fruiteria",
    name: "Fruiteria",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "fruiteria"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_the_tarik_drinks",
    name: "The Tarik. Drinks",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "the tarik. drinks"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ban_mian_and_congee",
    name: "Ban Mian & Congee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ban mian & congee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_malay_cuisine",
    name: "Malay Cuisine",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "malay cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_swee_heng_bakery",
    name: "Swee Heng Bakery",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "swee heng bakery"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ding_jian_hk_style_charcoal_roasted",
    name: "Ding Jian HK Style Charcoal Roasted",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "ding jian hk style charcoal roasted"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_orh_kee_noodles_express",
    name: "ORH-KEE Noodles Express",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "orh-kee noodles express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ban_mian_and_spinach",
    name: "Ban Mian & Spinach",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ban mian & spinach"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_braised_duck_and_noodle",
    name: "Braised Duck & Noodle",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "braised duck & noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_head_chefz_western_food",
    name: "Head Chefz Western Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "head chefz western food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chinese_mixed_rice",
    name: "Chinese Mixed Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "chinese mixed rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_japanese_and_korean",
    name: "Japanese & Korean",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "japanese & korean"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_px_chicken_rice",
    name: "PX Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "px chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_amiba_mixed_rice",
    name: "Amiba Mixed Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "amiba mixed rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bake_inc",
    name: "Bake Inc",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "bake inc"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_filipino_cuisine",
    name: "Filipino Cuisine",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "filipino cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_crowded_salad_bowl",
    name: "Crowded Salad Bowl",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "crowded salad bowl"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_monster_chili_nasi_lemak",
    name: "Monster Chili Nasi Lemak",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "monster chili nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ban_mian_and_fish_soup_2",
    name: "Ban Mian & Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ban mian & fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_malay_kueh",
    name: "Malay Kueh",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "malay kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_wei_rice_garden_mix_veg",
    name: "Hao Wei Rice Garden Mix Veg.",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hao wei rice garden mix veg."
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_claypot_bak_kut_teh",
    name: "Claypot Bak Kut Teh",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "claypot bak kut teh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_thailand_food",
    name: "Thailand Food",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "thailand food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tek_tek",
    name: "Tek Tek",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "tek tek"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_roasted_delights",
    name: "Roasted Delights",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "roasted delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tenderfresh_western_cuisine",
    name: "Tenderfresh Western Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "tenderfresh western cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_omar",
    name: "King Omar",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "king omar"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_qin_tang",
    name: "Qin Tang",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "qin tang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bai_sheng_noodle",
    name: "Bai Sheng Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "bai sheng noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jin_kimchi",
    name: "Jin Kimchi",
    emoji: "🇰🇷",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jin kimchi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_thai_food",
    name: "Thai Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "thai food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_takeway_kueh",
    name: "Takeway Kueh",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "takeway kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_ji_traditional_roaster",
    name: "Hao Ji Traditional Roaster",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "hao ji traditional roaster"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_korean",
    name: "Korean",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "korean"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mala_fu_wei",
    name: "Mala Fu Wei",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "mala fu wei"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wkj_wanton_mee",
    name: "WKJ Wanton Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "wkj wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_jia_ban_mian",
    name: "Hao Jia Ban Mian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hao jia ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_indo_bbq",
    name: "Indo BBQ",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "indo bbq"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_singa_wok",
    name: "Singa Wok",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "singa wok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_curry_items",
    name: "Curry Items",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "curry items"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ji_gong_bao",
    name: "Ji Gong Bao",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "ji gong bao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cu_liang_yu_fen",
    name: "Cu Liang Yu Fen",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "cu liang yu fen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yuen_kee_dumpling",
    name: "Yuen Kee Dumpling",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "yuen kee dumpling"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_teochew_lao",
    name: "Teochew Lao",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "teochew lao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_of_grouper",
    name: "King of Grouper",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "king of grouper"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_jia_mixed_rice",
    name: "He Jia Mixed Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "he jia mixed rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_odeon_beef_noodles",
    name: "Odeon Beef Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "odeon beef noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_don_oyster_bar",
    name: "Don’ Oyster Bar",
    emoji: "🍱",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "don’ oyster bar"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seng_heng_roasted_delight",
    name: "Seng Heng Roasted Delight",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "seng heng roasted delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_le_le_chicken_rice",
    name: "Le Le Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "le le chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tracy_s_sarawak_kolo_mee",
    name: "Tracy’s Sarawak Kolo Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "tracy’s sarawak kolo mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fish_soup_ban_mian",
    name: "Fish Soup Ban Mian",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "fish soup ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lao_cheng_du_steamboat",
    name: "Lao Cheng Du Steamboat",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "lao cheng du steamboat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ampang_yong_tau_foo_and_wen_xiang_yuan",
    name: "Ampang Yong Tau Foo/Wen Xiang Yuan",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ampang yong tau foo/wen xiang yuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lao_fan_ji",
    name: "Lao Fan Ji",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lao fan ji"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jubilee_s_hainanese_chicken_rice",
    name: "Jubilee’s Hainanese Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "jubilee’s hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sunbo_express_penyet_bbq",
    name: "Sunbo Express Penyet + Bbq",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "sunbo express penyet + bbq"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kim_dae_bak_korean_cuisine",
    name: "Kim Dae Bak Korean Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "kim dae bak korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xiao_la_jiao_mala_hot_pot",
    name: "Xiao La Jiao Mala Hot Pot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "xiao la jiao mala hot pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_wei_mixed_rice",
    name: "Hao Wei Mixed Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hao wei mixed rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_korean_and_japanese",
    name: "Korean & Japanese",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "korean & japanese"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fishball_noodles_and_homemade_curry",
    name: "Fishball Noodles & Homemade Curry",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "fishball noodles & homemade curry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kawan_bowl",
    name: "Kawan Bowl",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "kawan bowl"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mala_and_seafood",
    name: "Mala & Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "mala & seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_western_grill_and_japanese_fusion",
    name: "Western Grill & Japanese Fusion",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "western grill & japanese fusion"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nene_chicken",
    name: "Nene Chicken",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "nene chicken"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_heyya_duck_rice",
    name: "Heyya Duck Rice",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "heyya duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_claypot_king",
    name: "Claypot King",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "claypot king"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_taliwang_nasi_lemak",
    name: "Taliwang Nasi Lemak",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "taliwang nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fishin_with_u",
    name: "Fishin with u",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "fishin with u"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_qiu_lim_hakka_yong_tau_foo",
    name: "Qiu Lim Hakka Yong Tau Foo",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "qiu lim hakka yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wang_wang_roasted",
    name: "Wang Wang Roasted",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "wang wang roasted"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_kong_street_old_chun_kee",
    name: "Hong Kong Street Old Chun Kee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "hong kong street old chun kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yummy_pancake",
    name: "Yummy Pancake",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "yummy pancake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mala_tang",
    name: "Mala Tang",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "mala tang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_steam_fish_and_soup",
    name: "Steam Fish & Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "steam fish & soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_old_world_bak_kut_teh_and_fried_porridge",
    name: "Old World Bak Kut Teh & Fried Porridge",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "old world bak kut teh & fried porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cui_liang_yu_fen",
    name: "Cui Liang Yu Fen",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "cui liang yu fen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kfc",
    name: "KFC",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "kfc"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tanglin_halt_ban_mian_and_fish_soup",
    name: "Tanglin Halt Ban Mian & Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "tanglin halt ban mian & fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seafood_zhi_char",
    name: "Seafood Zhi Char",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "seafood zhi char"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_green_garden_vegetarian",
    name: "Green Garden Vegetarian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "green garden vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_beuaty_nutritious_soup",
    name: "Beuaty Nutritious Soup",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "beuaty nutritious soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_thumbupz_roasted_and_soup",
    name: "THUMBUPZ Roasted & Soup",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "thumbupz roasted & soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mr_foods_indian_cuisine",
    name: "MR Foods Indian Cuisine",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "mr foods indian cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_carrot_cake",
    name: "Carrot Cake",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_snack",
    name: "Snack",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "snack"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sh_indian_cuisine",
    name: "SH Indian Cuisine",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "sh indian cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_texas_lone_star",
    name: "Texas Lone Star",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "texas lone star"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_coffee_break",
    name: "Coffee Break",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "coffee break"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mama_mee",
    name: "Mama Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "mama mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cantonese_seafood",
    name: "Cantonese Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "cantonese seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_beauty_nutritious_soup",
    name: "Beauty Nutritious Soup",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "beauty nutritious soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tian_fu_yuan",
    name: "Tian Fu Yuan",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "tian fu yuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ban_heng_teochew_porridge",
    name: "Ban Heng Teochew Porridge",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ban heng teochew porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kueh_kueh",
    name: "Kueh Kueh",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "kueh kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jiesen_yang_tau_foo",
    name: "Jiesen Yang Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jiesen yang tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_economy_bee_hoon",
    name: "Economy Bee Hoon",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "economy bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_johnson_duck",
    name: "Johnson Duck",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "johnson duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_china_food",
    name: "China Food",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "china food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_wai_mixed_rice",
    name: "Hao Wai Mixed Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hao wai mixed rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_curry_rice",
    name: "Curry Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jocob_soup",
    name: "Jocob Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jocob soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_uncle_mee_hoon_kueh",
    name: "Uncle Mee Hoon Kueh",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "uncle mee hoon kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kueh",
    name: "Kueh",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ban_mian_fish_soup",
    name: "Ban Mian Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ban mian fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_prata_alley",
    name: "Prata Alley",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "prata alley"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_thai_makan",
    name: "Thai Makan",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "thai makan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_indian_food",
    name: "Indian Food",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "indian food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fishball_noodles",
    name: "Fishball Noodles",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "fishball noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wok_delight",
    name: "Wok Delight",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "wok delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_local_delights",
    name: "Local Delights",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "local delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_new_korean_cuisine",
    name: "New Korean Cuisine",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "new korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ms_inasal_filipino_cuisine",
    name: "Ms Inasal Filipino Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "ms inasal filipino cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_halim_s_fish_soup",
    name: "Halim’s Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "halim’s fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_wei_econ_rice",
    name: "Hao Wei Econ Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hao wei econ rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_monster_chili_mala",
    name: "Monster Chili Mala",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "monster chili mala"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nasi_lemak_ayam_taliwang",
    name: "Nasi Lemak Ayam Taliwang",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "nasi lemak ayam taliwang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_indian_stall",
    name: "Indian Stall",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "indian stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mala_claypot",
    name: "Mala Claypot",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "mala claypot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ju_bao_xuan_mala",
    name: "Ju Bao Xuan Mala",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "ju bao xuan mala"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_huat_seafood",
    name: "Huat Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "huat seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mexican_and_chinese_cuisine",
    name: "Mexican/Chinese Cuisine",
    emoji: "🍱",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "mexican/chinese cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_259_prawn_noodle",
    name: "259 Prawn Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "259 prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_delhi_express_indian_cuisine",
    name: "Delhi Express Indian Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "delhi express indian cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sing_hk",
    name: "Sing HK",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "sing hk"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tender_fresh",
    name: "Tender Fresh",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "tender fresh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_qiu_lian_ban_mee",
    name: "Qiu Lian Ban Mee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "qiu lian ban mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_thunder_tea_rice",
    name: "Thunder Tea Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "thunder tea rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_golden_shoe_hokkien_mee",
    name: "Golden Shoe Hokkien Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "golden shoe hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_al_mokial_indian_muslim",
    name: "Al Mokial Indian Muslim",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "al mokial indian muslim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_beehoon_and_nasi_lemak",
    name: "Beehoon & Nasi Lemak",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "beehoon & nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mix_veg",
    name: "Mix Veg",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "mix veg"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ming_xiang",
    name: "Ming Xiang",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "ming xiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kns_indian",
    name: "KNS Indian",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "kns indian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_maru_japanese",
    name: "Maru Japanese",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "maru japanese"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_butter_and_cream",
    name: "Butter & Cream",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "butter & cream"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  }
];

export const BRANDS_4 = [
  {
    id: "kopitiam_fu_xiao_fish_soup",
    name: "Fu Xiao Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "fu xiao fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ming_yen_halal_chicken_rice",
    name: "Ming Yen Halal Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "ming yen halal chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fragrance_chicken_rice",
    name: "Fragrance Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "fragrance chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_biryani_point",
    name: "Biryani Point",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "biryani point"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_city_satay",
    name: "City Satay",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "city satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dim_sum_and_bak_kwa",
    name: "Dim Sum & Bak Kwa",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "dim sum & bak kwa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_indian_and_chinese_vegetarian",
    name: "Indian & Chinese Vegetarian",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "indian & chinese vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_best_satay",
    name: "Best Satay",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "best satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_china_cuisine",
    name: "China Cuisine",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "china cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_archipelago",
    name: "Archipelago",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "archipelago"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_spinach_soup",
    name: "Spinach Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "spinach soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_kong_street",
    name: "Hong Kong Street",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "hong kong street"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_warong_pak_sapari",
    name: "Warong Pak Sapari",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "warong pak sapari"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_partea_express",
    name: "Partea Express",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "partea express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shanghai_fried_xiao_long_bao",
    name: "Shanghai Fried Xiao Long Bao",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "shanghai fried xiao long bao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ming_yen_bbq_seafood",
    name: "Ming Yen Bbq Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "ming yen bbq seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bbq_chicken_wings",
    name: "Bbq Chicken Wings",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "bbq chicken wings"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_captain_satay",
    name: "Captain Satay",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "captain satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_beer_and_drinks",
    name: "Beer And Drinks",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "beer and drinks"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_power_satay",
    name: "Power Satay",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "power satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_teh_tarik",
    name: "Teh Tarik",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "teh tarik"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_geylang_serai_satay",
    name: "Geylang Serai Satay",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "geylang serai satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_satay_14",
    name: "Satay 14",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "satay 14"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_satay_19",
    name: "Satay 19",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "satay 19"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ban_mee",
    name: "Ban Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ban mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pancakes",
    name: "Pancakes",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "pancakes"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_soup",
    name: "Soup",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_al_rahim_sarbat_stall",
    name: "Al-Rahim Sarbat Stall",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "al-rahim sarbat stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_uncle_penyet",
    name: "Uncle Penyet",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "uncle penyet"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_selera_timur",
    name: "Selera Timur",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "selera timur"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mingfa_fishball_noodles",
    name: "Mingfa Fishball Noodles",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "mingfa fishball noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_uncle_lee_s_wanton_noodle",
    name: "Uncle Lee’s Wanton Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "uncle lee’s wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ar_rahmaan",
    name: "Ar-Rahmaan",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "ar-rahmaan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yon_ho_hainanese_cuisine",
    name: "Yon Ho Hainanese cuisine",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "yon ho hainanese cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xiang_rui_gourmet_congee",
    name: "Xiang Rui Gourmet Congee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "xiang rui gourmet congee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_uncle_lee_s_lor_mee",
    name: "Uncle Lee’s Lor mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "uncle lee’s lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_gourmet_mixed_rice",
    name: "Gourmet Mixed Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "gourmet mixed rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wang_xiang_kitchen",
    name: "WANG XIANG KITCHEN",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "wang xiang kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_uncle_jim_fresh_fruit_juice",
    name: "Uncle Jim Fresh Fruit juice",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "uncle jim fresh fruit juice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jun_yuan_house_of_fish",
    name: "Jun Yuan House Of Fish",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "jun yuan house of fish"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hakka_yong_tau_foo",
    name: "Hakka Yong Tau Foo",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hakka yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_feng_feng_boneless_chicken_rice",
    name: "Feng Feng Boneless Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "feng feng boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_wei_mala_hot_pot",
    name: "Hao Wei Mala Hot Pot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "hao wei mala hot pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_supreme_gourmet",
    name: "Supreme Gourmet",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "supreme gourmet"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_e_food_fun",
    name: "E Food Fun",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "e food fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_uncle_wong",
    name: "Uncle Wong",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "uncle wong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_le_pantry",
    name: "Le Pantry",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "le pantry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_yi_herbal_soup",
    name: "AH YI HERBAL SOUP",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ah yi herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_divine_bites",
    name: "Divine Bites",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "divine bites"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_flying_dragon_noodles",
    name: "Flying Dragon Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "flying dragon noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wild_olives",
    name: "Wild Olives",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "wild olives"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_simful_nasi_lemak",
    name: "Simful Nasi Lemak",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "simful nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kin_khao_yang_thai_food",
    name: "Kin Khao Yang Thai Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "kin khao yang thai food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nyonya_pok_pok_kay",
    name: "Nyonya Pok Pok Kay",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "nyonya pok pok kay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wan_gui_beverages",
    name: "Wan Gui Beverages",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "wan gui beverages"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yu_yi_teochew_fish_soup",
    name: "Yu Yi Teochew Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "yu yi teochew fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tiong_fong_fatt_hainanese_boneless_chicken_rice",
    name: "Tiong Fong Fatt Hainanese Boneless Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "tiong fong fatt hainanese boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_su_yuan_vegetarian",
    name: "Su Yuan Vegetarian",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "su yuan vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xin_kee_signature_curry_house",
    name: "Xin Kee Signature Curry House",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "xin kee signature curry house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ping_xiang_chicken_rice",
    name: "Ping Xiang Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "ping xiang chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_curry_mixed_veg_rice",
    name: "Curry Mixed Veg Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "curry mixed veg rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mei_xiang_prawn_noodle_lor_mee",
    name: "Mei Xiang Prawn Noodle Lor Mee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "mei xiang prawn noodle lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yong_li_coffee_station",
    name: "Yong Li Coffee Station",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "yong li coffee station"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shun_heng_pig_trotter_rice",
    name: "Shun Heng Pig Trotter Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "shun heng pig trotter rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pontian_wanton_noodles",
    name: "Pontian Wanton Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "pontian wanton noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bedok_prawn_noodle",
    name: "Bedok Prawn Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "bedok prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_renqi",
    name: "Renqi",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "renqi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_freshly_roast_on_site",
    name: "Freshly Roast On Site",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "freshly roast on site"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_meeting_point_cafe",
    name: "Meeting Point Cafe",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "meeting point cafe"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bedok_chee_kuek",
    name: "Bedok Chee Kuek",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "bedok chee kuek"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_happy_dessert",
    name: "Happy Dessert",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "happy dessert"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fatt_soon_kuek",
    name: "Fatt Soon Kuek",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "fatt soon kuek"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yang_sen_tung_dan",
    name: "Yang Sen Tung Dan",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "yang sen tung dan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_new_world_mutton_soup",
    name: "New World Mutton Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "new world mutton soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_poh_kee_traditional_wanton_noodle",
    name: "Poh Kee Traditional Wanton Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "poh kee traditional wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pearl_rice_porridge",
    name: "Pearl Rice Porridge",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "pearl rice porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shan_dong_dong_ji_la_mian_xiao_long_bao",
    name: "Shan Dong Dong Ji La Mian Xiao Long Bao",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "shan dong dong ji la mian xiao long bao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sin_food_26",
    name: "Sin Food 26",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "sin food 26"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_katong_liu_kee_fried_oyster",
    name: "Katong Liu Kee Fried Oyster",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "katong liu kee fried oyster"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yu_kee_duck_rice",
    name: "Yu Kee Duck Rice",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "yu kee duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_li_economical_bee_hoon_and_nasi_lemak",
    name: "He Li Economical Bee Hoon & Nasi Lemak",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "he li economical bee hoon & nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xue_hua_fei_hot_and_cold_drinks",
    name: "Xue Hua Fei Hot & Cold Drinks",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "xue hua fei hot & cold drinks"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_long_xiang_hainanese_curry_rice",
    name: "Long Xiang Hainanese Curry Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "long xiang hainanese curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kopi_meow",
    name: "Kopi Meow",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "kopi meow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yong_hua_delights",
    name: "Yong Hua Delights",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "yong hua delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_feng_fried_rice",
    name: "Feng Fried Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "feng fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_min_hui_nasi_lemak",
    name: "Min Hui Nasi Lemak",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "min hui nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_song_zhou_fried_carrot_cake",
    name: "Song Zhou Fried Carrot Cake",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "song zhou fried carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dan_shi_fu_herbal_soup",
    name: "Dan Shi Fu Herbal Soup",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "dan shi fu herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bedok_pau_dim_sum",
    name: "Bedok Pau Dim Sum",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "bedok pau dim sum"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pin_wei_dessert",
    name: "Pin Wei Dessert",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "pin wei dessert"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_g_meal",
    name: "G Meal",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "g meal"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_quan_wei",
    name: "Quan Wei",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "quan wei"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_teochew_fish_porridge_da_pai_dang",
    name: "Teochew Fish Porridge Da Pai Dang",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "teochew fish porridge da pai dang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_quan_ji_teochew_mee",
    name: "Quan Ji Teochew Mee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "quan ji teochew mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wah_kee_coffee_shop",
    name: "Wah Kee Coffee Shop",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "wah kee coffee shop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_zhong_xin_ban_mian",
    name: "Zhong Xin Ban Mian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "zhong xin ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jimmy_people_s_park_fried_kway_teow",
    name: "Jimmy People’s Park Fried Kway Teow",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jimmy people’s park fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bai_nian_yong_tau_foo",
    name: "Bai Nian Yong Tau Foo",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "bai nian yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_zai_vegetarian_food",
    name: "Zai Vegetarian Food",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "zai vegetarian food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_gim_chew_fried_hokkien_noodle",
    name: "Gim Chew Fried Hokkien Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "gim chew fried hokkien noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ma_la_xiang_guo",
    name: "Ma La Xiang Guo",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "ma la xiang guo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tea_cafe",
    name: "Tea Cafe",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "tea cafe"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shun_xing_braised_duck_rice_noodle_kway_chap",
    name: "Shun Xing Braised Duck Rice Noodle Kway Chap",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "shun xing braised duck rice noodle kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lao_jie_spinach_soup",
    name: "Lao Jie Spinach Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "lao jie spinach soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jit_sing_satay",
    name: "Jit Sing Satay",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jit sing satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ali_shan",
    name: "Ali Shan",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ali shan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_guan_heng_cafe",
    name: "Guan Heng Cafe",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "guan heng cafe"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bedok_western_food",
    name: "Bedok Western Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "bedok western food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fu_cheng_homemade_spring_roll",
    name: "Fu Cheng Homemade Spring Roll",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "fu cheng homemade spring roll"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hock_hai_hong_lim_curry_chicken_noodle",
    name: "Hock Hai (Hong Lim) Curry Chicken Noodle",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hock hai (hong lim) curry chicken noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fruits_and_juice_bedok",
    name: "Fruits & Juice @ Bedok",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "fruits & juice @ bedok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lee_kee",
    name: "Lee Kee",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lee kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_99_dessert_in_cup",
    name: "99 Dessert in Cup",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "99 dessert in cup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_alsalam_teh_tarik_corner",
    name: "Alsalam Teh Tarik Corner",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "alsalam teh tarik corner"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_inspirasi",
    name: "Inspirasi",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "inspirasi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_g_k_murthy",
    name: "G K Murthy",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "g k murthy"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jefri",
    name: "Jefri",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "jefri"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wak_din",
    name: "Wak Din",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "wak din"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_merah_delimah_stall",
    name: "Merah Delimah Stall",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "merah delimah stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_salam_indian_muslim_food_corner",
    name: "Salam Indian Muslim Food Corner",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "salam indian muslim food corner"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ban_mian_fish_soup_porridge",
    name: "Ban Mian, Fish Soup, Porridge",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ban mian, fish soup, porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_man_tian",
    name: "Hong Man Tian",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "hong man tian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_econ_bee_hoon_nasi_lemak",
    name: "Econ Bee Hoon, Nasi Lemak",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "econ bee hoon, nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_drink_counter",
    name: "Drink Counter",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "drink counter"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chang_cheng_mixed_rice",
    name: "Chang Cheng Mixed Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "chang cheng mixed rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king",
    name: "煲仔 KING",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "煲仔 king"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_huay_kwang_thai_wanton_mee_ubi",
    name: "Huay Kwang Thai Wanton Mee @Ubi",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "huay kwang thai wanton mee @ubi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_japanese_and_korean_cusine",
    name: "Japanese & Korean Cusine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "japanese & korean cusine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sj_sickander_ammal_muslim_food",
    name: "SJ Sickander Ammal Muslim Food",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "sj sickander ammal muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yummy_delights",
    name: "Yummy Delights",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "yummy delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mama_fish_soup",
    name: "Mama Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "mama fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_deen_mee_combo_house",
    name: "Deen Mee Combo House",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "deen mee combo house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hee_hee_hee_steamed_fish_and_seafood",
    name: "Hee Hee Hee Steamed Fish & Seafood",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "hee hee hee steamed fish & seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_south_buona_vista_braised_duck",
    name: "South Buona Vista Braised Duck",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "south buona vista braised duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_you_fu_ban_mian_and_pao_fan",
    name: "You Fu Ban Mian / Pao Fan",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "you fu ban mian / pao fan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hock_hai_curry_chicken_noodle",
    name: "Hock Hai Curry Chicken Noodle",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hock hai curry chicken noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_monster_chili_mala_hotpot",
    name: "Monster Chili Mala Hotpot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "monster chili mala hotpot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kebabs_corner",
    name: "Kebabs Corner",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "kebabs corner"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hakka_leipopo",
    name: "Hakka Leipopo",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hakka leipopo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_12_roasted",
    name: "12 Roasted",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "12 roasted"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_swee_traditional_prawn_noodle",
    name: "Swee Traditional Prawn Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "swee traditional prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ubi_le_sheng_yong_tau_fu",
    name: "Ubi Le Sheng Yong Tau Fu",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ubi le sheng yong tau fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chicky_papa",
    name: "Chicky Papa",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "chicky papa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_old_nyonya",
    name: "Old Nyonya",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "old nyonya"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tidjai_thai_food",
    name: "Tidjai Thai Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "tidjai thai food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dosa_delight",
    name: "Dosa Delight",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "dosa delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_what_the_puff",
    name: "What The Puff!",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "what the puff!"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jin_deng_pig_s_organ_soup",
    name: "Jin Deng Pig’s Organ Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jin deng pig’s organ soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jade_s_chicken",
    name: "Jade’s Chicken",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "jade’s chicken"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_grab_n_go",
    name: "Grab N Go",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "grab n go"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_singapore_fried_hokkien_mee",
    name: "Singapore Fried Hokkien Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "singapore fried hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_75_ah_balling_peanut_soup",
    name: "75 Ah Balling Peanut Soup",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "75 ah balling peanut soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_black_and_white_rojak_and_popiah",
    name: "Black & White Rojak and Popiah",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "black & white rojak and popiah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_one_soy",
    name: "One Soy",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "one soy"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_feng_xiang_bak_kut_teh",
    name: "Feng Xiang Bak Kut Teh",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "feng xiang bak kut teh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_178_yi_qi_fa_econ_bee_hoon",
    name: "178 Yi Qi Fa Econ Bee Hoon",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "178 yi qi fa econ bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seng_hiang_bak_chor_mee",
    name: "Seng Hiang Bak Chor Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "seng hiang bak chor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_zheng_ji_yong_tau_foo",
    name: "Zheng Ji Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "zheng ji yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fin_and_feathers_thams_up",
    name: "Fin & Feathers Thams Up",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "fin & feathers thams up"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_whitley_road_big_prawn_noodle",
    name: "Whitley Road Big Prawn Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "whitley road big prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_al_hyzin_mee_delights_mutton_soup",
    name: "Al-Hyzin Mee Delights Mutton Soup",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "al-hyzin mee delights mutton soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xin_xin_claypot_rice",
    name: "Xin Xin Claypot Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "xin xin claypot rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hock_hai_curry_chicken_noodles",
    name: "Hock Hai Curry Chicken Noodles",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hock hai curry chicken noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_muhammad_danish_prata_paradise",
    name: "Muhammad Danish Prata Paradise",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "muhammad danish prata paradise"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_san_yi_xuan_mala_hotpot_grilled_fish",
    name: "San Yi Xuan Mala Hotpot Grilled Fish",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "san yi xuan mala hotpot grilled fish"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tong_fong_fatt_hainanese_boneless_chicken_rice",
    name: "Tong Fong Fatt Hainanese Boneless Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "tong fong fatt hainanese boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_amoy_st_lor_mee",
    name: "Amoy St Lor Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "amoy st lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_er_soup",
    name: "Ah Er Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ah er soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_guan_chee_hongkong_roasted_duck",
    name: "Guan Chee Hongkong Roasted Duck",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "guan chee hongkong roasted duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mala_version_2_by_xiao_man_niu",
    name: "Mala Version 2 By Xiao Man Niu",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "mala version 2 by xiao man niu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_su_man_yuan_vegetarian",
    name: "Su Man Yuan Vegetarian",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "su man yuan vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kim_dae_bak_myeong_dong_street_food",
    name: "Kim Dae Bak Myeong-Dong Street Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "kim dae bak myeong-dong street food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_indian_vegetarian_green_leaf_cuisine",
    name: "Indian Vegetarian Green Leaf Cuisine",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "indian vegetarian green leaf cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seng_kee_mixed_veg_rice_and_economic_bee_hoon",
    name: "Seng Kee Mixed Veg Rice & Economic Bee Hoon",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "seng kee mixed veg rice & economic bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_taiwan_cuisine_by_formosa_delights",
    name: "Taiwan Cuisine by Formosa Delights",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Taiwanese",
    aliases: [
      "taiwan cuisine by formosa delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yummy_delights_nasi_lemak_and_econ_bee_hoon",
    name: "Yummy Delights Nasi Lemak & Econ Bee Hoon",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "yummy delights nasi lemak & econ bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chen_wanton_noodles",
    name: "Chen Wanton Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "chen wanton noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hwa_heng_beef_noodle",
    name: "Hwa Heng Beef Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hwa heng beef noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lee_wei_hainanese_chicken_rice_and_congee",
    name: "Lee Wei Hainanese Chicken Rice & Congee",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "lee wei hainanese chicken rice & congee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_guang_yuan_vegetarian",
    name: "Guang Yuan Vegetarian",
    emoji: "🥦",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "guang yuan vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lion_city_dim_sum",
    name: "Lion City Dim Sum",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "lion city dim sum"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_old_bugis_kway_chap_since_1973",
    name: "Old Bugis Kway Chap Since 1973",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "old bugis kway chap since 1973"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_roadside_stall_malaysia_curry_rice",
    name: "Roadside Stall Malaysia Curry Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "roadside stall malaysia curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_house_of_mookata_and_tidjai_thai_food",
    name: "House of Mookata/ TIDJAI Thai Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "house of mookata/ tidjai thai food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ngan_lee_amaranth_leaf_soup",
    name: "Ngan Lee Amaranth Leaf Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ngan lee amaranth leaf soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ieat_miniwok",
    name: "IEAT Miniwok",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ieat miniwok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_of_fried_rice",
    name: "King Of Fried Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "king of fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xi_xiang_taste_of_hunan",
    name: "Xi Xiang Taste Of Hunan",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "xi xiang taste of hunan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jia_xiang_wei_braised_chicken_rice",
    name: "Jia Xiang Wei Braised Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "jia xiang wei braised chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_vietsea_food_connection",
    name: "Vietsea Food Connection",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "vietsea food connection"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_small_bites_indian_cuisine",
    name: "Small Bites Indian Cuisine",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "small bites indian cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_freshly_steamed_and_served",
    name: "Freshly Steamed And Served",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "freshly steamed and served"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seafood_zi_char_sea_cube",
    name: "Seafood Zi Char Sea Cube",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "seafood zi char sea cube"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_thai_khanom_banana",
    name: "Thai Khanom Banana",
    emoji: "🇹🇭",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "thai khanom banana"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fort_canning_prawn_noodle",
    name: "Fort Canning Prawn Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "fort canning prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hakka_lei_po_po",
    name: "Hakka Lei Po Po",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hakka lei po po"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_original_simon_road_hokkien_mee",
    name: "Original Simon Road Hokkien Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "original simon road hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_uncle_louis_famous_chicken_rice",
    name: "Uncle Louis Famous Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "uncle louis famous chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_briyani_grill",
    name: "Briyani Grill",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "briyani grill"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jin_deng_pig_s_organ_soup_braised_pig_s_trotter",
    name: "Jin Deng Pig’s Organ Soup . Braised Pig’s Trotter",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jin deng pig’s organ soup . braised pig’s trotter"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hainan_beef_noodle_and_claypot_rice",
    name: "Hainan Beef Noodle & Claypot Rice",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hainan beef noodle & claypot rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lim_kee_yong_tau_foo",
    name: "Lim Kee Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lim kee yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_you_fu_ban_mian_and_ramen",
    name: "You Fu Ban Mian & Ramen",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "you fu ban mian & ramen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ah_tan_wings",
    name: "Ah Tan WIngs",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "ah tan wings"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nanyang_curry",
    name: "Nanyang Curry",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "nanyang curry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yuan_ting_congee",
    name: "Yuan Ting Congee",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "yuan ting congee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_eng_kee_chicken_wings",
    name: "Eng Kee Chicken Wings",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "eng kee chicken wings"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_arshad_khan_indian_muslim_food",
    name: "Arshad Khan Indian Muslim Food",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "arshad khan indian muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ding_wang_bak_kut_teh",
    name: "Ding Wang Bak Kut Teh",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ding wang bak kut teh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_old_street_braised_duck_kway_chup",
    name: "Old Street Braised Duck Kway Chup",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "old street braised duck kway chup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nakoko",
    name: "Nakoko",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "nakoko"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sha_indian_rojak",
    name: "Sha Indian Rojak",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "sha indian rojak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_creme_and_cone",
    name: "Creme and Cone",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "creme and cone"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ai_ihshan_mee_combo_house_and_mutton_soup",
    name: "Ai ihshan Mee Combo House & Mutton Soup",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ai ihshan mee combo house & mutton soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bao_tang_zhi_dao",
    name: "Bao Tang Zhi Dao",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "bao tang zhi dao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ming_kitchen",
    name: "Ming Kitchen",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ming kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chang_cheng_food_paradise_rice_garden",
    name: "Chang Cheng Food Paradise (Rice Garden)",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "chang cheng food paradise (rice garden)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fatty_bom_bom",
    name: "Fatty Bom Bom",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "fatty bom bom"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fu_wei_chicken_rice",
    name: "Fu Wei Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "fu wei chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kowloon_roasted_delight",
    name: "Kowloon Roasted Delight",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "kowloon roasted delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yes_japanese_korean_cuisine",
    name: "Yes! Japanese Korean Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "yes! japanese korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sofnade",
    name: "Sofnade",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Taiwanese",
    aliases: [
      "sofnade"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hook_coffee",
    name: "Hook Coffee",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "hook coffee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bak_kut_teh",
    name: "Bak Kut Teh",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "bak kut teh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_comfirm_chop",
    name: "Comfirm + Chop",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "comfirm + chop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seng_heng_roasted_delights",
    name: "Seng Heng Roasted Delights",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "seng heng roasted delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_banmian",
    name: "Banmian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "banmian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_abang_991_nasi_padang",
    name: "Abang 991 Nasi Padang",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "abang 991 nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_house_of_lemang",
    name: "House of Lemang",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "house of lemang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_crave",
    name: "Crave",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "crave"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_toyomi_japanese_express",
    name: "Toyomi Japanese Express",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "toyomi japanese express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_majulah",
    name: "Majulah",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "majulah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shabu_days",
    name: "Shabu Days",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "shabu days"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_uncle_john_s_makan_place",
    name: "Uncle John’s Makan Place",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "uncle john’s makan place"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bara_penyet",
    name: "Bara Penyet",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "bara penyet"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_new_jia_wei",
    name: "New Jia Wei",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "new jia wei"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_traditional_snack",
    name: "Traditional Snack",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "traditional snack"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sai_kitchen",
    name: "Sai Kitchen",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "sai kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xin_mei_ban_mian_and_congee",
    name: "Xin Mei Ban Mian/Congee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "xin mei ban mian/congee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ampang_yong_tau_foo",
    name: "Ampang Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ampang yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_western_beradik",
    name: "Western Beradik",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "western beradik"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yong_tao_foo",
    name: "Yong Tao Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "yong tao foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_korean_and_japanese_food",
    name: "Korean & Japanese Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "korean & japanese food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_monster_western",
    name: "Monster Western",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "monster western"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wok_qi_fried_rice",
    name: "Wok Qi Fried Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "wok qi fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_halim_fish_soup",
    name: "Halim Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "halim fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_omu_curry_rice_and_donburi",
    name: "Omu Curry Rice & Donburi",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "omu curry rice & donburi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_haus_ban_mian",
    name: "Haus Ban Mian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "haus ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_le_korean_cuisine",
    name: "Hong Le Korean Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "hong le korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cintaan_chicken_rice",
    name: "Cintaan Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "cintaan chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_monster_chilli",
    name: "Monster Chilli",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "monster chilli"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kawan_bowl_scrambled_egg",
    name: "Kawan Bowl Scrambled Egg",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "kawan bowl scrambled egg"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_flips_and_dips",
    name: "Flips & Dips",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "flips & dips"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_banana_fritters_and_snacks",
    name: "Banana Fritters & Snacks",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "banana fritters & snacks"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pepper_plus_rice",
    name: "Pepper Plus Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "pepper plus rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pak_lum_malaysian_cuisine",
    name: "Pak Lum Malaysian Cuisine",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "pak lum malaysian cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jj_chicken_rice",
    name: "JJ Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "jj chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_monster_chilli_mala_hot_pot",
    name: "Monster Chilli Mala Hot Pot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "monster chilli mala hot pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_penyet_king",
    name: "Penyet King",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "penyet king"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tornado_egg_curry_rice_and_donburi",
    name: "Tornado Egg Curry Rice & Donburi",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "tornado egg curry rice & donburi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_handmade_noodle",
    name: "Handmade Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "handmade noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_haji_karim_indian_muslim_food",
    name: "Haji Karim Indian  Muslim Food",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "haji karim indian  muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_le_japanese_and_korean",
    name: "Hong Le Japanese & Korean",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "hong le japanese & korean"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_the_kiosk",
    name: "The Kiosk",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "the kiosk"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cafe_lodge",
    name: "Cafe Lodge",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "cafe lodge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fried_item",
    name: "Fried Item",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "fried item"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_steam_fish_delight",
    name: "Steam Fish Delight",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "steam fish delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fat_baby_rotisserie_and_western_cuisine",
    name: "Fat Baby Rotisserie & Western Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "fat baby rotisserie & western cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_makan_west_hot",
    name: "Makan West Hot",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "makan west hot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pho_vietnam",
    name: "Pho Vietnam",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Vietnamese",
    aliases: [
      "pho vietnam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ahjuma_korean_and_japanese_cuisine",
    name: "Ahjuma Korean/Japanese Cuisine",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "ahjuma korean/japanese cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_monster_chilli_mala_xiang_guo",
    name: "Monster Chilli Mala Xiang Guo",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "monster chilli mala xiang guo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sedap_kitchen",
    name: "Sedap Kitchen",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "sedap kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jia_pa_pa_ban_mian",
    name: "Jia Pa Pa Ban Mian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "jia pa pa ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_tang_tea_house",
    name: "Tang Tea House",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "tang tea house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_krispi",
    name: "Krispi",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "krispi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ani_yong_tau_foo",
    name: "ANI Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "ani yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xiang_lian_korean_and_japanese",
    name: "Xiang Lian Korean and Japanese",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "xiang lian korean and japanese"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_makan_west",
    name: "Makan West",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "makan west"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_al_ameen",
    name: "Al Ameen",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "al ameen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ba_xian_vegetarian",
    name: "Ba Xian Vegetarian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ba xian vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_a_po",
    name: "A-Po",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "a-po"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kubis",
    name: "Kubis",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "kubis"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_i_sel_fish",
    name: "I Sel-Fish",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "i sel-fish"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_koo_kee",
    name: "Koo Kee",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "koo kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jj_food",
    name: "JJ Food",
    emoji: "🍱",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "jj food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nasi_campur",
    name: "Nasi Campur",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "nasi campur"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cik_lim_yong_tau_foo",
    name: "Cik Lim Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "cik lim yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_soup_lodge",
    name: "Soup Lodge",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "soup lodge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_kong",
    name: "Hong Kong",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "hong kong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cha_mu_lan_x",
    name: "Cha Mu Lan X",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "cha mu lan x"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chef_lup_roasted_delight",
    name: "Chef Lup Roasted Delight",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chef lup roasted delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_moon_chay",
    name: "Moon Chay",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "moon chay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_satay_noodz",
    name: "Satay Noodz",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "satay noodz"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_omega_pork_noodle",
    name: "Omega Pork Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "omega pork noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_turkish_lezzet",
    name: "Turkish Lezzet",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "turkish lezzet"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_gerry_express",
    name: "Gerry Express",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "gerry express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_gold_xiang_curry_puff",
    name: "Gold Xiang Curry Puff",
    emoji: "🥮",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "gold xiang curry puff"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_warisan_satay",
    name: "Warisan Satay",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "warisan satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_heyya_braised_duck_and_kway_chap",
    name: "Heyya Braised Duck and Kway Chap",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "heyya braised duck and kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_vietsea_banh_mi_express_kopitiam_square",
    name: "Vietsea Banh Mi Express (Kopitiam Square)",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "vietsea banh mi express (kopitiam square)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sengkang_square_oyster_omelette",
    name: "Sengkang Square Oyster Omelette",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "sengkang square oyster omelette"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nur_tandoor_and_briyani",
    name: "Nur Tandoor & Briyani",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "nur tandoor & briyani"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_old_street_braised_duck",
    name: "Old Street Braised Duck",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "old street braised duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_penyet_kartini",
    name: "Penyet Kartini",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "penyet kartini"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_texas_lone_star_western",
    name: "Texas Lone Star (western)",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "texas lone star (western)"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bedok_one_hokkien_prawn_mee",
    name: "Bedok One Hokkien Prawn Mee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "bedok one hokkien prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_steven_fried_rice",
    name: "Steven Fried Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "steven fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_umi_s_spices",
    name: "Umi’s Spices",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "umi’s spices"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_foo_hing_laksa_yong_tau_foo",
    name: "Foo Hing Laksa Yong Tau Foo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "foo hing laksa yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_zhao_zhou_fish_porridge_daipadang",
    name: "Zhao Zhou Fish Porridge Daipadang",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "zhao zhou fish porridge daipadang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_bedok_chwee_kuek",
    name: "Bedok Chwee Kuek",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "bedok chwee kuek"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_indo_6_express",
    name: "Indo 6 Express",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "indo 6 express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_saudagar_penyek",
    name: "Saudagar Penyek",
    emoji: "🇮🇩",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "saudagar penyek"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_dapur_abang",
    name: "Dapur Abang",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "dapur abang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_krispi_roti",
    name: "Krispi Roti",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "krispi roti"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_local_snack",
    name: "Local Snack",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "local snack"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hk_style_steamed_fish_and_braised_meat",
    name: "HK Style Steamed Fish & Braised Meat",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "hk style steamed fish & braised meat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_dae_bak_korean_and_japanese",
    name: "King Dae Bak Korean & Japanese",
    emoji: "🇰🇷",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "king dae bak korean & japanese"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_panini_and_pizza",
    name: "Panini & Pizza",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "panini & pizza"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jingdong_roti",
    name: "JingDong Roti",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "jingdong roti"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chicky_fun_chicken_rice",
    name: "Chicky Fun Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chicky fun chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pak_wee_chicken_rice",
    name: "Pak Wee Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Indonesian/Malay",
    aliases: [
      "pak wee chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_a_bowl_of_noodle",
    name: "A Bowl of Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "a bowl of noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_beautea",
    name: "Beautea",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "beautea"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_beradik_by_western_boy",
    name: "Beradik by Western Boy",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "beradik by western boy"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_yuen_kee",
    name: "Yuen Kee",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "yuen kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chinatown_hk_roasted",
    name: "Chinatown HK Roasted",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chinatown hk roasted"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_singa_mini_wok",
    name: "Singa Mini Wok",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "singa mini wok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hadramawt_kitchen",
    name: "Hadramawt Kitchen",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "hadramawt kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hai_ge_ji_beef_noodle",
    name: "Hai Ge Ji Beef Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hai ge ji beef noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_belly_belly_good_cai_fan",
    name: "Belly Belly Good Cai Fan",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "belly belly good cai fan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hong_hu_la_mian",
    name: "Hong Hu La Mian",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "hong hu la mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nanyang_san_bao",
    name: "Nanyang San Bao",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "nanyang san bao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sing_hi_fry",
    name: "Sing Hi Fry",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "sing hi fry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_new_hong_kong_roast",
    name: "New Hong Kong Roast",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "new hong kong roast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_mini_hot_pot",
    name: "Mini Hot Pot",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "mini hot pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lei_popo",
    name: "Lei PoPo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lei popo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kong_wan_roast",
    name: "Kong Wan Roast",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "kong wan roast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_sheng_tang_chinese_beef_roti",
    name: "Sheng Tang Chinese Beef Roti",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "sheng tang chinese beef roti"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_blanco_court_beef_noodle",
    name: "Blanco Court Beef Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "blanco court beef noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fuzhou_yan_dumpling_and_jian_bo",
    name: "Fuzhou Yan Dumpling & Jian Bo",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "fuzhou yan dumpling & jian bo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_steam_house",
    name: "Steam House",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "steam house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_briyani_express",
    name: "Briyani Express",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "briyani express"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_shang_ke_pte_ltd",
    name: "Shang Ke Pte Ltd",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "shang ke pte ltd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nj_indian_classic_cuisine",
    name: "NJ Indian Classic Cuisine",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "nj indian classic cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_he_jia_food",
    name: "He Jia Food",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "he jia food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_the_bait_kitchen",
    name: "The Bait Kitchen",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "the bait kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_dae_bak_korean_cuisine",
    name: "King Dae Bak Korean Cuisine",
    emoji: "🇰🇷",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "king dae bak korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_butter_and_cream_bakery",
    name: "Butter & Cream Bakery",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "butter & cream bakery"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_cheers",
    name: "Cheers",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "cheers"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_satay_one",
    name: "Satay One",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "satay one"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nana_currry",
    name: "Nana Currry",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "nana currry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lao_fu_zi_fried_kway_teow",
    name: "Lao Fu Zi Fried Kway Teow",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lao fu zi fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_delhi_kitchen_indian_vegetarian_cuisine",
    name: "Delhi Kitchen Indian Vegetarian Cuisine",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "delhi kitchen indian vegetarian cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_putian_heng_hwa_cuisine",
    name: "Putian Heng Hwa Cuisine",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "putian heng hwa cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_ampang_yong_tau_foo_and_odeon_beef_noodle",
    name: "Ampang Yong Tau Foo & Odeon Beef Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "ampang yong tau foo & odeon beef noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_zai_lai_teochew_porridge",
    name: "Hao Zai Lai Teochew Porridge",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hao zai lai teochew porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_jiao_tai_yuan",
    name: "Jiao Tai Yuan",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "jiao tai yuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_pu_tian_xing_hua_food",
    name: "Pu Tian (Xing Hua) Food",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "pu tian (xing hua) food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chinatown_dangui_duck",
    name: "Chinatown Dangui Duck",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "chinatown dangui duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fu_zhou_oyster_cake",
    name: "Fu Zhou Oyster Cake",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Bakery/Dessert",
    aliases: [
      "fu zhou oyster cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_nana_curry",
    name: "Nana Curry",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "nana curry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_beef_roti",
    name: "Beef Roti",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice/Poultry",
    aliases: [
      "beef roti"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_claypot_and_herbal_soup",
    name: "Claypot & Herbal Soup",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "claypot & herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_chicken_pot_king",
    name: "Chicken Pot King",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Mala/Hotpot",
    aliases: [
      "chicken pot king"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_damok",
    name: "Damok",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Korean",
    aliases: [
      "damok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_this_and_that",
    name: "This & That",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "this & that"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_king_of_pao_fan",
    name: "King of Pao Fan",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "king of pao fan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kokoro_izakaya",
    name: "Kokoro Izakaya",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Japanese",
    aliases: [
      "kokoro izakaya"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_xi_xiang",
    name: "Xi Xiang",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "xi xiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kinaroy_thai_cuisine",
    name: "Kinaroy Thai Cuisine",
    emoji: "🇹🇭",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "kinaroy thai cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hao_jia_ji",
    name: "Hao Jia Ji",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "hao jia ji"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lao_fan_ji_bak_kut_teh_and_claypot",
    name: "Lao Fan Ji Bak Kut Teh & Claypot",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "lao fan ji bak kut teh & claypot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_fish_ball_noodles",
    name: "Fish Ball Noodles",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "fish ball noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_teochew_porridge_and_mixed_veg_rice",
    name: "Teochew Porridge & Mixed Veg Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "teochew porridge & mixed veg rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kallang_wanton_noodle",
    name: "Kallang Wanton Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "kallang wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_wah_kee_fishball_noodle",
    name: "Wah Kee Fishball Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "wah kee fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_hello_fish",
    name: "Hello Fish",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Seafood",
    aliases: [
      "hello fish"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_seabay",
    name: "Seabay",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker",
    aliases: [
      "seabay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_taibah",
    name: "Taibah",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian",
    aliases: [
      "taibah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_char_meat",
    name: "Char Meat",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Chinese Roast",
    aliases: [
      "char meat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_kuchina_kiosko",
    name: "Kuchina Kiosko",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western",
    aliases: [
      "kuchina kiosko"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_thai_lamoon_signature",
    name: "Thai Lamoon Signature",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Thai",
    aliases: [
      "thai lamoon signature"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "kopitiam_lixin_fish_ball_noodle",
    name: "Lixin Fish Ball Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Noodles",
    aliases: [
      "lixin fish ball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "kopitiam"
  },
  {
    id: "koufu_rb_tea",
    name: "R&B Tea",
    emoji: "🧋",
    type: "grab_go",
    cuisine: "Bubble Tea",
    aliases: [
      "r&b tea",
      "rnb tea"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koufu_nine_fresh",
    name: "Nine Fresh",
    emoji: "🍧",
    type: "grab_go",
    cuisine: "Taiwanese Dessert",
    aliases: [
      "nine fresh",
      "nine fresh desserts"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koufu_dough_culture",
    name: "Dough Culture",
    emoji: "🥟",
    type: "grab_go",
    cuisine: "Local Fried Snacks",
    aliases: [
      "dough culture"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "grab_go"
    ]
  },
  {
    id: "food_junction_go_teppan_go",
    name: "Go Teppan Go",
    emoji: "🍳",
    type: "food_court_stall",
    cuisine: "Teppanyaki",
    aliases: [
      "go teppan go"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "food_junction"
  },
  {
    id: "food_junction_toast_junction",
    name: "Toast Junction",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffeeshop Fare",
    aliases: [
      "toast junction"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "food_junction"
  },
  {
    id: "food_junction_ke_quench",
    name: "Ke/Quench",
    emoji: "🥤",
    type: "food_court_stall",
    cuisine: "Drinks/Dessert",
    aliases: [
      "ke/quench"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "food_junction"
  },
  {
    id: "food_junction_fireyaki",
    name: "Fireyaki",
    emoji: "🍳",
    type: "food_court_stall",
    cuisine: "Teppanyaki",
    aliases: [
      "fireyaki"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "food_junction"
  },
  {
    id: "fei_siong_mei_shi_quan",
    name: "Mei Shi Quan",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Fried Kway Teow / Carrot Cake",
    aliases: [
      "mei shi quan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_ah_koon_authentic_hainanese_chicken_rice",
    name: "Ah Koon Authentic Hainanese Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice",
    aliases: [
      "ah koon authentic hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_hk_wanton_noodle",
    name: "HK Wanton Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Wanton Noodle",
    aliases: [
      "hk wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_teochew_handmade_fishball_noodle",
    name: "Teochew Handmade Fishball Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Fishball Noodle",
    aliases: [
      "teochew handmade fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_yi_mee_hoon_kueh",
    name: "Yi Mee Hoon Kueh",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Handmade Noodle",
    aliases: [
      "yi mee hoon kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_nam_kee_pau",
    name: "Nam Kee Pau",
    emoji: "🥟",
    type: "food_court_stall",
    cuisine: "Traditional Handmade Pau",
    aliases: [
      "nam kee pau"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_yi_wang_herbal_soup",
    name: "Yi Wang Herbal Soup",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Herbal Soup / Steam Rice",
    aliases: [
      "yi wang herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_chang_cheng",
    name: "Chang Cheng",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Mixed Veg Rice",
    aliases: [
      "chang cheng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_yew_kee_duck_rice",
    name: "Yew Kee Duck Rice",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Braised Duck Rice",
    aliases: [
      "yew kee duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_jue_dai_lor_mee",
    name: "Jue Dai Lor Mee",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Lor Mee",
    aliases: [
      "jue dai lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_indo_rampai",
    name: "Indo Rampai",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indonesian Cuisine / Indian Fusion",
    aliases: [
      "indo rampai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_teochew_fish_soup_fish_porridge",
    name: "Teochew Fish Soup Fish Porridge",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Fish Soup / Fish Porridge",
    aliases: [
      "teochew fish soup fish porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_changi_village_fried_hokkien_mee",
    name: "Changi Village Fried Hokkien Mee",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Fried Prawn Mee",
    aliases: [
      "changi village fried hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_unnamed",
    name: "文冬口茶餐室",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Ipoh Buntong Tea House Yong Tau Foo",
    aliases: [
      "文冬口茶餐室"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_jade_s_kitchen",
    name: "Jade's Kitchen",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Korean Fried Chicken",
    aliases: [
      "jade's kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_soya_bean_you_tiao",
    name: "Soya Bean You Tiao",
    emoji: "🥯",
    type: "food_court_stall",
    cuisine: "You Tiao / Soya Bean",
    aliases: [
      "soya bean you tiao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_xing_zai_mushroom_minced_meat_noodle",
    name: "Xing Zai Mushroom Minced Meat Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Minced Meat Noodle",
    aliases: [
      "xing zai mushroom minced meat noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_yong_hk_roasted_meat",
    name: "Yong HK Roasted Meat",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Roast Duck / Pork / Char Siew",
    aliases: [
      "yong hk roasted meat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_hong_kong_chef_s_kitchen",
    name: "Hong Kong Chef's Kitchen",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Zi Char",
    aliases: [
      "hong kong chef's kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_kismet_dessert",
    name: "Kismet Dessert",
    emoji: "🍧",
    type: "food_court_stall",
    cuisine: "Cendol / Ice Kacang / Tau Suan",
    aliases: [
      "kismet dessert"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_xiang_guo_shi_dai",
    name: "Xiang Guo Shi Dai",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Mala / Grilled Fish",
    aliases: [
      "xiang guo shi dai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_next_western_station",
    name: "Next Western Station",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western cuisine",
    aliases: [
      "next western station"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_hainanese_curry_rice",
    name: "Hainanese Curry Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Curry Rice",
    aliases: [
      "hainanese curry rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_traditional_prawn_noodle",
    name: "Traditional Prawn Noodle",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Prawn Noodle / Pork Ribs Noodle",
    aliases: [
      "traditional prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_hong_kong_cheong_fun_sha_tin_chicken_porridge",
    name: "Hong Kong Cheong Fun Sha Tin Chicken Porridge",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chee Cheong Fun / Porridge",
    aliases: [
      "hong kong cheong fun sha tin chicken porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_leo_satay",
    name: "Leo Satay",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Satay",
    aliases: [
      "leo satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_culture_juicing",
    name: "Culture Juicing",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Cut Fruits / Fruit Juice",
    aliases: [
      "culture juicing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_shu_shi_piao_xiang_vegetarian",
    name: "Shu Shi Piao Xiang Vegetarian",
    emoji: "🥦",
    type: "food_court_stall",
    cuisine: "Vegetarian Food",
    aliases: [
      "shu shi piao xiang vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_traditional_coffee_and_toast",
    name: "Traditional Coffee & Toast",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Coffee / Tea / Toast Bread",
    aliases: [
      "traditional coffee & toast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_kitchen_work",
    name: "Kitchen@Work",
    emoji: "🍱",
    type: "food_court_stall",
    cuisine: "Japanese Cuisine",
    aliases: [
      "kitchen@work"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_alishan_nasi_lemak",
    name: "Alishan Nasi Lemak",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Nasi Lemak",
    aliases: [
      "alishan nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_shu_xiang_kitchen",
    name: "Shu Xiang Kitchen",
    emoji: "🥟",
    type: "food_court_stall",
    cuisine: "Xiao Long Bao / Fried Dumpling",
    aliases: [
      "shu xiang kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_ipoh_cuisine",
    name: "Ipoh Cuisine",
    emoji: "🥟",
    type: "food_court_stall",
    cuisine: "Dim Sum",
    aliases: [
      "ipoh cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_munchies_pancake",
    name: "Munchies Pancake",
    emoji: "🍧",
    type: "food_court_stall",
    cuisine: "Pancake",
    aliases: [
      "munchies pancake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_nasi_lemak_ayam_taliwang",
    name: "Nasi Lemak Ayam Taliwang",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Fried Chicken Nasi Lemak",
    aliases: [
      "nasi lemak ayam taliwang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_daun_pisang",
    name: "Daun Pisang",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Nasi Padang",
    aliases: [
      "daun pisang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "fei_siong_dharsha_indian_food",
    name: "Dharsha Indian Food",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Roti Prata / Mee Goreng",
    aliases: [
      "dharsha indian food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "fei_siong"
  },
  {
    id: "koufu_cookhouse",
    name: "Cookhouse",
    emoji: "🍛",
    type: "restaurant",
    cuisine: "Local Food Hall",
    aliases: [
      "cookhouse"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "koufu_rasapura_masters",
    name: "Rasapura Masters",
    emoji: "🍢",
    type: "restaurant",
    cuisine: "Hawker Food Hall",
    aliases: [
      "rasapura masters",
      "rasapura master"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in"
    ]
  },
  {
    id: "koufu_gourmet_paradise",
    name: "Gourmet Paradise",
    emoji: "🍲",
    type: "restaurant",
    cuisine: "Local Food Hall",
    aliases: [
      "gourmet paradise"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "canopy_bukit_canberra_haha_family",
    name: "Haha Family",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Hainan / Harbin Cuisine",
    aliases: [
      "haha family"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_shi_nian",
    name: "Shi Nian",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Thai Mookata",
    aliases: [
      "shi nian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_changi_village_fried_hokkien_mee",
    name: "Changi Village Fried Hokkien Mee",
    emoji: "🍳",
    type: "food_court_stall",
    cuisine: "Fried Hokkien Mee & Carrot Cake",
    aliases: [
      "changi village fried hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_the_cheeky_chick",
    name: "The Cheeky Chick",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Local Hawker Food",
    aliases: [
      "the cheeky chick"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_lao_guang_ji_claypot_rice",
    name: "Lao Guang Ji Claypot Rice",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Claypot Rice",
    aliases: [
      "lao guang ji claypot rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_pangkor_island_nasi_lemak",
    name: "Pangkor Island Nasi Lemak",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Nyonya Nasi Lemak",
    aliases: [
      "pangkor island nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_xin_fa_melaka_bbq_seafood",
    name: "Xin Fa Melaka BBQ Seafood",
    emoji: "🦐",
    type: "food_court_stall",
    cuisine: "Melaka BBQ Seafood",
    aliases: [
      "xin fa melaka bbq seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_king_grouper_fish_soup",
    name: "King Grouper Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Fish Soup",
    aliases: [
      "king grouper fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_hock_gooi",
    name: "Hock Gooi",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Hainanese Curry Rice",
    aliases: [
      "hock gooi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_zhen_de_bbq_le",
    name: "Zhen De BBQ Le",
    emoji: "🍢",
    type: "food_court_stall",
    cuisine: "Satay & BBQ Chicken Wings",
    aliases: [
      "zhen de bbq le"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_kopi_tan",
    name: "Kopi Tan",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Hot & Cold Beverages",
    aliases: [
      "kopi tan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_lau_pa_sat_congee",
    name: "Lau Pa Sat Congee",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Congee",
    aliases: [
      "lau pa sat congee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_berempah_bros",
    name: "Berempah Bros",
    emoji: "🍤",
    type: "food_court_stall",
    cuisine: "Berempah (Fried Snacks)",
    aliases: [
      "berempah bros"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_twenty6_gusto_house",
    name: "Twenty6 Gusto House",
    emoji: "🍝",
    type: "food_court_stall",
    cuisine: "Western Food (Meats & Pasta)",
    aliases: [
      "twenty6 gusto house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_hock_kee_teochew_noodle",
    name: "Hock Kee Teochew Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Teochew Noodles",
    aliases: [
      "hock kee teochew noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_liu_kou_shui",
    name: "Liu Kou Shui",
    emoji: "🍱",
    type: "food_court_stall",
    cuisine: "Fusion Donburi",
    aliases: [
      "liu kou shui"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_pinky_s_kitchen_nakhon_si",
    name: "Pinky's Kitchen Nakhon Si",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Thai Food",
    aliases: [
      "pinky's kitchen nakhon si"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_lixin_fish_ball_noodles",
    name: "Lixin Fish Ball Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Fish Ball Noodles",
    aliases: [
      "lixin fish ball noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_arabest_halal",
    name: "Arabest (Halal)",
    emoji: "🥙",
    type: "food_court_stall",
    cuisine: "Middle Eastern Food",
    aliases: [
      "arabest (halal)"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_mr_ab_prata_and_mee_goreng",
    name: "Mr. AB Prata & Mee Goreng",
    emoji: "🫓",
    type: "food_court_stall",
    cuisine: "Indian Food (Prata & Mee Goreng)",
    aliases: [
      "mr. ab prata & mee goreng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_teochew_fish_soup",
    name: "Teochew Fish Soup",
    emoji: "🐟",
    type: "food_court_stall",
    cuisine: "Fish Soup",
    aliases: [
      "teochew fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_zhong_guo_la_mian_xiao_long_bao",
    name: "Zhong Guo La Mian Xiao Long Bao",
    emoji: "🥟",
    type: "food_court_stall",
    cuisine: "China Cuisine (La Mian & Xiao Long Bao)",
    aliases: [
      "zhong guo la mian xiao long bao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_ah_heng_char_kway_teow",
    name: "AH Heng Char Kway Teow",
    emoji: "🍳",
    type: "food_court_stall",
    cuisine: "Fried Kway Teow",
    aliases: [
      "ah heng char kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_xing_yu_korean_cuisine",
    name: "Xing Yu Korean Cuisine",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Korean Cuisine",
    aliases: [
      "xing yu korean cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_maxwell_chicken_rice",
    name: "Maxwell Chicken Rice",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Chicken Rice",
    aliases: [
      "maxwell chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_golden_boat",
    name: "Golden Boat",
    emoji: "🥪",
    type: "food_court_stall",
    cuisine: "Roti John",
    aliases: [
      "golden boat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_jia_le_yong_tau_foo",
    name: "Jia Le Yong Tau Foo",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Yong Tau Foo",
    aliases: [
      "jia le yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_2112_snack_delight",
    name: "2112 Snack Delight",
    emoji: "🥨",
    type: "food_court_stall",
    cuisine: "You Tiao & Snacks",
    aliases: [
      "2112 snack delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_la_kopi",
    name: "La Kopi",
    emoji: "☕",
    type: "food_court_stall",
    cuisine: "Hot & Cold Beverages",
    aliases: [
      "la kopi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_le_man_seafood",
    name: "Le Man Seafood",
    emoji: "🦞",
    type: "food_court_stall",
    cuisine: "Zi Char / Seafood",
    aliases: [
      "le man seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_le_man_econ_bee_hoon",
    name: "Le Man Econ Bee Hoon",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Economic Bee Hoon",
    aliases: [
      "le man econ bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_yew_kee_duck_rice",
    name: "Yew Kee Duck Rice",
    emoji: "🦆",
    type: "food_court_stall",
    cuisine: "Braised Duck Rice",
    aliases: [
      "yew kee duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_snack_that_food_up",
    name: "Snack That Food Up",
    emoji: "🌮",
    type: "food_court_stall",
    cuisine: "Mexican-Indian Fusion",
    aliases: [
      "snack that food up"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_muffin_homme",
    name: "Muffin Homme",
    emoji: "🧁",
    type: "food_court_stall",
    cuisine: "Pastries & Bakery",
    aliases: [
      "muffin homme"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_add_more_mala_hot_pot",
    name: "Add More Mala Hot Pot",
    emoji: "🌶️",
    type: "food_court_stall",
    cuisine: "Mala Hot Pot",
    aliases: [
      "add more mala hot pot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_tanjong_rhu_wanton_noodle",
    name: "Tanjong Rhu Wanton Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Wanton Noodles",
    aliases: [
      "tanjong rhu wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_day_night_herbal_soup",
    name: "Day Night Herbal Soup",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Double-Boiled Herbal Soup",
    aliases: [
      "day night herbal soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_al_usroh",
    name: "Al-usroh",
    emoji: "🍽️",
    type: "food_court_stall",
    cuisine: "Local Hawker Food",
    aliases: [
      "al-usroh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_scissors_paper_stone",
    name: "Scissors Paper Stone",
    emoji: "🍺",
    type: "food_court_stall",
    cuisine: "Hot & Cold Beverages / Draught Beer",
    aliases: [
      "scissors paper stone"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_tong_xin_vegetarian",
    name: "Tong Xin Vegetarian",
    emoji: "🥬",
    type: "food_court_stall",
    cuisine: "Vegetarian Noodles & Rice",
    aliases: [
      "tong xin vegetarian"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "canopy_bukit_canberra_danlao_scrambled_egg_rice",
    name: "Danlao Scrambled Egg Rice",
    emoji: "🍳",
    type: "food_court_stall",
    cuisine: "Scrambled Egg Rice",
    aliases: [
      "danlao scrambled egg rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "canopy_hawkers"
  },
  {
    id: "timbre_yishun_park_kak_nur_and_meera",
    name: "Kak Nur & Meera",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Malay Cuisine",
    aliases: [
      "kak nur & meera"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_mingsu_vegetarian",
    name: "Mingsu Vegetarian",
    emoji: "🥬",
    type: "food_court_stall",
    cuisine: "Vegetarian",
    aliases: [
      "mingsu vegetarian"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_bismi_briyani",
    name: "Bismi Briyani",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Briyani",
    aliases: [
      "bismi briyani"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_shahstri_kitchenette",
    name: "Shahstri Kitchenette",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Indian Nasi Kandar",
    aliases: [
      "shahstri kitchenette"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_ah_lock_hakka_tofu_bowl",
    name: "Ah Lock Hakka Tofu Bowl",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Hakka Tofu Rice Bowls",
    aliases: [
      "ah lock hakka tofu bowl"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_sj_from_eunos",
    name: "SJ From Eunos",
    emoji: "🫓",
    type: "food_court_stall",
    cuisine: "Roti Prata & Indian Rojak, Mee Goreng",
    aliases: [
      "sj from eunos"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_68_spinach_soup_and_fried_rice",
    name: "68 Spinach Soup & Fried Rice",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Spinach Soup & Yong Tau Foo",
    aliases: [
      "68 spinach soup & fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_one_mouth_noodles",
    name: "One Mouth Noodles 一口面",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Handmade Wanton Noodles",
    aliases: [
      "one mouth noodles 一口面"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_da_san_yuan",
    name: "Da San Yuan 大三圆",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Fishball Minced Meat Noodle & Laksa",
    aliases: [
      "da san yuan 大三圆"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_japanese_teppan_donburi",
    name: "Japanese Teppan Donburi",
    emoji: "🍱",
    type: "food_court_stall",
    cuisine: "Japanese Fusion",
    aliases: [
      "japanese teppan donburi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_yew_s_noodle",
    name: "Yew's Noodle",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Malaysian Noodles",
    aliases: [
      "yew's noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_salad_and_cream",
    name: "Salad & Cream",
    emoji: "🥗",
    type: "food_court_stall",
    cuisine: "Salad",
    aliases: [
      "salad & cream"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_lao_fu_jia",
    name: "Lao Fu Jia",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Soup",
    aliases: [
      "lao fu jia"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_jj_prawn_noodles",
    name: "JJ Prawn Noodles",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Prawn Noodles",
    aliases: [
      "jj prawn noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_li_fang_congee",
    name: "Li Fang Congee",
    emoji: "🍚",
    type: "food_court_stall",
    cuisine: "Congee",
    aliases: [
      "li fang congee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_xinlongxing_modern_tze_char",
    name: "XinLongXing Modern Tze Char",
    emoji: "🦞",
    type: "food_court_stall",
    cuisine: "Modern Tze Char, Live Seafood Tze Char",
    aliases: [
      "xinlongxing modern tze char"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_phawo_thai_food",
    name: "Phawo Thai Food",
    emoji: "🍜",
    type: "food_court_stall",
    cuisine: "Thai Food",
    aliases: [
      "phawo thai food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_taliwang",
    name: "Taliwang",
    emoji: "🍛",
    type: "food_court_stall",
    cuisine: "Nasi Lemak",
    aliases: [
      "taliwang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_smokin_joe",
    name: "Smokin' Joe",
    emoji: "🍖",
    type: "food_court_stall",
    cuisine: "Western BBQ",
    aliases: [
      "smokin' joe"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_yong_tau_foo",
    name: "Yong Tau Foo",
    emoji: "🍲",
    type: "food_court_stall",
    cuisine: "Yong Tau Foo",
    aliases: [
      "yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_jiao_cai_hotplate_bbq",
    name: "Jiao Cai Hotplate BBQ",
    emoji: "🦐",
    type: "food_court_stall",
    cuisine: "Hotplate BBQ Seafood",
    aliases: [
      "jiao cai hotplate bbq"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_ah_tan_crispy_chicken_har_cheong_gai",
    name: "Ah Tan Crispy Chicken Har Cheong Gai",
    emoji: "🍗",
    type: "food_court_stall",
    cuisine: "Har Cheong Gai",
    aliases: [
      "ah tan crispy chicken har cheong gai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_hua_hua_cooking_and_eating",
    name: "Hua Hua Cooking & Eating",
    emoji: "🍳",
    type: "food_court_stall",
    cuisine: "Hokkien Mee & Char Kway Teow",
    aliases: [
      "hua hua cooking & eating"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_munchi",
    name: "Munchi",
    emoji: "🥞",
    type: "food_court_stall",
    cuisine: "Pancakes",
    aliases: [
      "munchi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "timbre_yishun_park_tuck_shop",
    name: "Tuck Shop",
    emoji: "🥤",
    type: "food_court_stall",
    cuisine: "Drinks Stall",
    aliases: [
      "tuck shop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ],
    operatorId: "timbre_plus_hawkers"
  },
  {
    id: "chomp_chomp_food_centre_ah_hock_fried_hokkien_noodles",
    name: "Ah Hock Fried Hokkien Noodles",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Mee",
    aliases: [
      "ah hock fried hokkien noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_swee_heng_wanton_noodle",
    name: "Swee Heng Wanton Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodle",
    aliases: [
      "swee heng wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_ang_sar_lee_satay_bee_hoon",
    name: "Ang Sar Lee Satay Bee Hoon",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay Bee Hoon / Hainan Beef Noodle",
    aliases: [
      "ang sar lee satay bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_carrot_cake",
    name: "Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake (Chai Tow Kway)",
    aliases: [
      "carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_the_warung",
    name: "The Warung",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Malay / Satay",
    aliases: [
      "the warung"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_bbq_seafood",
    name: "(忠邦) 福烧烤海鲜 BBQ Seafood",
    emoji: "🦞",
    type: "hawker",
    cuisine: "BBQ Seafood / Zi Char",
    aliases: [
      "忠邦 福烧烤海鲜 bbq seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_wang_bbq_and_grill",
    name: "Wang BBQ & Grill",
    emoji: "🍡",
    type: "hawker",
    cuisine: "Lok Lok BBQ Skewers",
    aliases: [
      "wang bbq & grill"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_wang_da_shen_chicken_wing_and_satay",
    name: "Wang Da Shen Chicken Wing & Satay",
    emoji: "🍗",
    type: "hawker",
    cuisine: "BBQ Chicken Wings & Satay",
    aliases: [
      "wang da shen chicken wing & satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_chomp_chomp_fried_oyster",
    name: "Chomp Chomp Fried Oyster",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Oyster Omelette / Fried Oyster",
    aliases: [
      "chomp chomp fried oyster"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_chomp_chomp_rojak_popiah",
    name: "Chomp Chomp Rojak - Popiah",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Rojak & Popiah",
    aliases: [
      "chomp chomp rojak - popiah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_chia_keng_fried_hokkien_prawn_noodle",
    name: "Chia Keng Fried Hokkien Prawn Noodle",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Prawn Noodle",
    aliases: [
      "chia keng fried hokkien prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chomp_chomp_food_centre_lucy_bbq_seafood",
    name: "Lucy BBQ Seafood",
    emoji: "🦐",
    type: "hawker",
    cuisine: "BBQ Seafood",
    aliases: [
      "lucy bbq seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_fu_zhou_poh_hwa_oyster_cake",
    name: "Fu Zhou Poh Hwa Oyster Cake",
    emoji: "🥮",
    type: "hawker",
    cuisine: "Fuzhou Oyster Cake",
    aliases: [
      "fu zhou poh hwa oyster cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_mei_xiang_black_and_white_fish_soup",
    name: "Mei Xiang Black and White Fish Soup",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "mei xiang black and white fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_northern_thai_tomyam",
    name: "Northern Thai Tomyam",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Thai Tom Yum",
    aliases: [
      "northern thai tomyam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_kelantan_kway_chap_pig_s_organ_soup",
    name: "Kelantan Kway Chap - Pig's Organ Soup",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Kway Chap / Pig's Organ Soup",
    aliases: [
      "kelantan kway chap - pig's organ soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_fu_he_delights",
    name: "Fu He Delights 福和",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Turtle Soup & Claypot Rice",
    aliases: [
      "fu he delights 福和"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_sheng_kee_curry_chicken_noodle",
    name: "Sheng Kee Curry Chicken Noodle",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Curry Chicken Noodle",
    aliases: [
      "sheng kee curry chicken noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_coffee_hut",
    name: "Coffee Hut",
    emoji: "☕",
    type: "hawker",
    cuisine: "Kopi & Toast",
    aliases: [
      "coffee hut"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_special_chilli_yong_tau_foo",
    name: "Special Chilli Yong Tau Foo",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "special chilli yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "berseh_food_centre_epok_epok_story",
    name: "Epok Epok Story",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Malay Curry Puffs (Epok Epok)",
    aliases: [
      "epok epok story"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_xiang_jiang_soya_sauce_chicken",
    name: "Xiang Jiang Soya Sauce Chicken",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Soya Sauce Chicken Rice / Noodles",
    aliases: [
      "xiang jiang soya sauce chicken"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_depot_road_zhen_shan_mei_laksa",
    name: "Depot Road Zhen Shan Mei Laksa",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Claypot Laksa",
    aliases: [
      "depot road zhen shan mei laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_the_old_stall_hokkien_street_famous_prawn_mee",
    name: "The Old Stall Hokkien Street Famous Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Mee (Hae Mee)",
    aliases: [
      "the old stall hokkien street famous prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_dover_road_kai_kee_wanton_noodles",
    name: "Dover Road Kai Kee Wanton Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodles",
    aliases: [
      "dover road kai kee wanton noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_zhang_ji_shanghai_la_mian_xiao_long_bao",
    name: "Zhang Ji Shanghai La Mian Xiao Long Bao",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Shanghai La Mian & Xiao Long Bao",
    aliases: [
      "zhang ji shanghai la mian xiao long bao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_tong_le_wanton_mee",
    name: "Tong Le Wanton Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "tong le wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_hor_fun_premium",
    name: "Hor Fun Premium",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Hor Fun",
    aliases: [
      "hor fun premium"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_ding_sheng",
    name: "Ding Sheng 鼎升",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Hor Fun & Rice Dishes",
    aliases: [
      "ding sheng 鼎升"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_zi_jin_cheng_hainanese_boneless_chicken_rice",
    name: "Zi Jin Cheng Hainanese Boneless Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "zi jin cheng hainanese boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_the_thunder_tea_story",
    name: "The Thunder Tea Story 擂茶物语",
    emoji: "🍵",
    type: "hawker",
    cuisine: "Thunder Tea Rice (Lei Cha)",
    aliases: [
      "the thunder tea story 擂茶物语"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_hong_kong_yummy_soup",
    name: "Hong Kong Yummy Soup 香港靚湯",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Double-Boiled Soup",
    aliases: [
      "hong kong yummy soup 香港靚湯"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_ma_la_xiang_guo",
    name: "Ma La Xiang Guo 麻辣香锅",
    emoji: "🌶️",
    type: "hawker",
    cuisine: "Mala Xiang Guo",
    aliases: [
      "ma la xiang guo 麻辣香锅"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_xiao_gang_western_food",
    name: "Xiao Gang Western Food",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Western Food",
    aliases: [
      "xiao gang western food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_lye_bo_toss_noodle",
    name: "Lye Bo Toss Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Honey Glazed BBQ Pork Noodle",
    aliases: [
      "lye bo toss noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_pu_tian_delights",
    name: "Pu Tian Delights 莆田美食",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Putian Cuisine",
    aliases: [
      "pu tian delights 莆田美食"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_lau_phua_chay_authentic_roasted_delicacies",
    name: "Lau Phua Chay Authentic Roasted Delicacies",
    emoji: "🍖",
    type: "hawker",
    cuisine: "Teochew Roast Meats",
    aliases: [
      "lau phua chay authentic roasted delicacies"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_tai_liok_claypot_chicken_rice",
    name: "Tai Liok Claypot Chicken Rice",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Claypot Chicken Rice",
    aliases: [
      "tai liok claypot chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_tiong_bahru_lien_fa_shui_jing_pau",
    name: "Tiong Bahru Lien Fa Shui Jing Pau",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Teochew Crystal Dumplings",
    aliases: [
      "tiong bahru lien fa shui jing pau"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_star_yong_kwang_bbq_seafood",
    name: "Star Yong Kwang BBQ Seafood",
    emoji: "🦞",
    type: "hawker",
    cuisine: "BBQ Seafood / Sambal Stingray",
    aliases: [
      "star yong kwang bbq seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_old_punggol_satay",
    name: "Old Punggol Satay",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "old punggol satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_mr_avocado_exotic_juice",
    name: "Mr Avocado Exotic Juice",
    emoji: "🥑",
    type: "hawker",
    cuisine: "Fruit Juice",
    aliases: [
      "mr avocado exotic juice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_desserts_pavilion",
    name: "Desserts Pavilion 糖水亭",
    emoji: "🍮",
    type: "hawker",
    cuisine: "Chinese Dessert Soup",
    aliases: [
      "desserts pavilion 糖水亭"
    ],
    dietTags: [
      "vegetarian"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_aj_delights",
    name: "AJ Delights",
    emoji: "🧁",
    type: "hawker",
    cuisine: "Muffins & Bakes",
    aliases: [
      "aj delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "alexandra_village_food_centre_ah_b_bakery",
    name: "Ah B Bakery",
    emoji: "🥐",
    type: "hawker",
    cuisine: "Halal Bakery",
    aliases: [
      "ah b bakery"
    ],
    dietTags: [
      "halal"
    ],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_jian_bo_shui_kueh",
    name: "Jian Bo Shui Kueh",
    emoji: "🍥",
    type: "hawker",
    cuisine: "Chwee Kueh",
    aliases: [
      "jian bo shui kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_tiong_bahru_fried_kway_teow",
    name: "Tiong Bahru Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "tiong bahru fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_joo_chiat_beef_king",
    name: "Joo Chiat Beef King",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Beef Noodles",
    aliases: [
      "joo chiat beef king"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_lor_mee_178",
    name: "Lor Mee 178",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee",
    aliases: [
      "lor mee 178"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_hong_heng_fried_sotong_prawn_mee",
    name: "Hong Heng Fried Sotong Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Prawn Mee",
    aliases: [
      "hong heng fried sotong prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tiong_bahru_market_tiong_bahru_hainanese_boneless_chicken_rice",
    name: "Tiong Bahru Hainanese Boneless Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "tiong bahru hainanese boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_chef_wang_fried_rice",
    name: "Chef Wang Fried Rice",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Fried Rice",
    aliases: [
      "chef wang fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_heng_heng_cooked_food",
    name: "Heng Heng Cooked Food",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "heng heng cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_nan_yuan_teochew_fishball_noodle",
    name: "Nan Yuan Teochew Fishball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodles",
    aliases: [
      "nan yuan teochew fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_guang_dong_xiang_gang_wei_dao",
    name: "Guang Dong Xiang Gang Wei Dao",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Cantonese Claypot Rice",
    aliases: [
      "guang dong xiang gang wei dao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "beo_crescent_market_hai_chew",
    name: "Hai Chew",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "hai chew"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_no_name_hokkien_mee",
    name: "No Name Hokkien Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Prawn Mee",
    aliases: [
      "no name hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_say_seng_tau_kwa_pau",
    name: "Say Seng Tau Kwa Pau",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Tau Kwa Pau",
    aliases: [
      "say seng tau kwa pau"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_dunman_road_char_siew_wan_ton_mee",
    name: "Dunman Road Char Siew Wan Ton Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "dunman road char siew wan ton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_dunman_duck_rice",
    name: "Dunman Duck Rice",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck Rice",
    aliases: [
      "dunman duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_lau_hong_ser_rojak",
    name: "Lau Hong Ser Rojak",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Rojak",
    aliases: [
      "lau hong ser rojak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "dunman_food_centre_restaurant_joo_chiat_ah_huat_wanton_mee",
    name: "Restaurant Joo Chiat Ah Huat Wanton Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "restaurant joo chiat ah huat wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_zhi_wei_xian_zion_road_big_prawn_noodle",
    name: "Zhi Wei Xian Zion Road Big Prawn Noodle",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Big Prawn Noodle",
    aliases: [
      "zhi wei xian zion road big prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_no_18_zion_road_fried_kway_teow",
    name: "No. 18 Zion Road Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "no. 18 zion road fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_peter_gohs_carrot_cake",
    name: "Peter Goh's Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "peter goh's carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_braised_duck_kway_chap",
    name: "Braised Duck Kway Chap",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Kway Chap & Braised Duck",
    aliases: [
      "braised duck kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_kangs_wanton_noodle",
    name: "Kang's Wanton Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodle",
    aliases: [
      "kang's wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "zion_riverside_food_centre_soon_lees_pig_organ_soup",
    name: "Soon Lee's Pig Organ Soup",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Pig Organ Soup",
    aliases: [
      "soon lee's pig organ soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_yuan_yuan_claypot_rice",
    name: "Yuan Yuan Claypot Rice",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Charcoal Claypot Rice",
    aliases: [
      "yuan yuan claypot rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_ah_er_soup",
    name: "Ah Er Soup",
    emoji: "🍵",
    type: "hawker",
    cuisine: "Chinese Herbal Soup",
    aliases: [
      "ah er soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_tiong_bahru_yi_sheng_fried_hokkien_mee",
    name: "Tiong Bahru Yi Sheng Fried Hokkien Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Mee",
    aliases: [
      "tiong bahru yi sheng fried hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_jason_penang_cuisine",
    name: "Jason Penang Cuisine",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Penang Assam Laksa",
    aliases: [
      "jason penang cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_wow_wow_west",
    name: "Wow Wow West",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Western Food",
    aliases: [
      "wow wow west"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "abc_brickworks_market_food_centre_nusa_and_tara",
    name: "Nusa & Tara",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay Classics",
    aliases: [
      "nusa & tara"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_market_bak_kee_teochew_satay_bee_hoon",
    name: "Bak Kee Teochew Satay Bee Hoon",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay Bee Hoon",
    aliases: [
      "bak kee teochew satay bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_market_jia_xiang",
    name: "Jia Xiang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Siam & Lontong",
    aliases: [
      "jia xiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_market_rong_ji_traditional_hainanese_chicken_rice",
    name: "Rong Ji Traditional Hainanese Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "rong ji traditional hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_market_qing_tian",
    name: "Qing Tian",
    emoji: "🍮",
    type: "hawker",
    cuisine: "Tau Suan & Mango Milk Ice",
    aliases: [
      "qing tian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_market_shun_li_ah",
    name: "Shun Li Ah",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee",
    aliases: [
      "shun li ah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_market_fu_ming_cooked_food",
    name: "Fu Ming Cooked Food",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "fu ming cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_min_ji_laksa",
    name: "Min Ji Laksa",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Laksa",
    aliases: [
      "min ji laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_bendemeer_prawn_noodle",
    name: "Bendemeer Prawn Noodle",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Noodle",
    aliases: [
      "bendemeer prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_ah_xiao_teochew_braised_duck",
    name: "Ah Xiao Teochew Braised Duck",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck Rice",
    aliases: [
      "ah xiao teochew braised duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_hai_sheng_carrot_cake",
    name: "Hai Sheng Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "hai sheng carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_heng_kee_lor_mee",
    name: "Heng Kee Lor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee",
    aliases: [
      "heng kee lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bendemeer_market_and_food_centre_toa_payoh_93_soon_kueh",
    name: "Toa Payoh 93 Soon Kueh",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Soon Kueh",
    aliases: [
      "toa payoh 93 soon kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_pin_wei_hong_kong_style_chee_cheong_fun",
    name: "Pin Wei Hong Kong Style Chee Cheong Fun",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Chee Cheong Fun",
    aliases: [
      "pin wei hong kong style chee cheong fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_lai_hiang_pork_rib_prawn_noodles",
    name: "Lai Hiang Pork Rib Prawn Noodles",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Pork Rib Prawn Noodles",
    aliases: [
      "lai hiang pork rib prawn noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_sheng_seng_fried_prawn_noodles",
    name: "Sheng Seng Fried Prawn Noodles",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Prawn Noodles",
    aliases: [
      "sheng seng fried prawn noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pek_kio_market_and_food_centre_wah_kee_big_prawns_noodle",
    name: "Wah Kee Big Prawns Noodle",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Big Prawn Noodle",
    aliases: [
      "wah kee big prawns noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_foo_hing_handmade_fishball_and_meatball_noodle",
    name: "Foo Hing Handmade Fishball & Meatball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball & Meatball Noodle",
    aliases: [
      "foo hing handmade fishball & meatball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_a1_house_of_claypot",
    name: "A1 House Of Claypot",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Claypot Rice",
    aliases: [
      "a1 house of claypot"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_hock_kee_wanton_noodle",
    name: "Hock Kee Wanton Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodle",
    aliases: [
      "hock kee wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_seletar_sheng_mian_mian_fen_guo",
    name: "Seletar Sheng Mian Mian Fen Guo",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Mian Fen Guo",
    aliases: [
      "seletar sheng mian mian fen guo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_226_boneless_chicken_rice",
    name: "226 Boneless Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "226 boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_lims_fishball_noodle",
    name: "Lim's Fishball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodle",
    aliases: [
      "lim's fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_teck_kee_cooked_food",
    name: "Teck Kee Cooked Food",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Sheng Mian",
    aliases: [
      "teck kee cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kebun_baru_food_centre_hong_heng",
    name: "Hong Heng",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Beef Noodle",
    aliases: [
      "hong heng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_selera_rasa_nasi_lemak",
    name: "Selera Rasa Nasi Lemak",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "selera rasa nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_stall_22_hokkien_mee",
    name: "Stall 22 Hokkien Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Mee",
    aliases: [
      "stall 22 hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_adam_fishball_noodles",
    name: "Adam Fishball Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodles",
    aliases: [
      "adam fishball noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_adam_road_noo_cheng_big_prawn_noodles",
    name: "Adam Road Noo Cheng Big Prawn Noodles",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Big Prawn Noodles",
    aliases: [
      "adam road noo cheng big prawn noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_teck_kee_hot_and_cold_dessert",
    name: "Teck Kee Hot & Cold Dessert",
    emoji: "🍧",
    type: "hawker",
    cuisine: "Dessert",
    aliases: [
      "teck kee hot & cold dessert"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_al_sheik_mee_stall",
    name: "Al-Sheik Mee Stall",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Rebus",
    aliases: [
      "al-sheik mee stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_amirah_and_nur_aniqah_mee_soto_and_mee_rebus",
    name: "Amirah & Nur Aniqah Mee Soto & Mee Rebus",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Soto & Mee Rebus",
    aliases: [
      "amirah & nur aniqah mee soto & mee rebus"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "adam_road_food_centre_adam_chicken_rice",
    name: "Adam Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "adam chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_9_plus_bistro",
    name: "9 Plus Bistro",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Western / Bistro Food",
    aliases: [
      "9 plus bistro"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_song_heng_fish_ball_noodle",
    name: "Song Heng Fish Ball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodle",
    aliases: [
      "song heng fish ball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_kassim_stall",
    name: "Kassim Stall",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay Cuisine",
    aliases: [
      "kassim stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_tiong_bahru_wah_yuen_porridge",
    name: "Tiong Bahru Wah Yuen Porridge",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Porridge",
    aliases: [
      "tiong bahru wah yuen porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_noordima_malay_food_stall",
    name: "Noordima Malay Food Stall",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "noordima malay food stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_yuan_cheng_carrot_cake",
    name: "Yuan Cheng Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "yuan cheng carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_food_centre_sjun_ji_wanton_noodles",
    name: "Sjun Ji Wanton Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodles",
    aliases: [
      "sjun ji wanton noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_sg_soya_sauce_chicken_rice",
    name: "SG Soya Sauce Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Soya Sauce Chicken Rice",
    aliases: [
      "sg soya sauce chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_hai_yan_teochew_fried_kway_teow_mee",
    name: "Hai Yan Teochew Fried Kway Teow Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "hai yan teochew fried kway teow mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_jc_teochew_braised_duck",
    name: "JC Teochew Braised Duck",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck Rice",
    aliases: [
      "jc teochew braised duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_rise_market_sin_kee_hwa_coffee_stall",
    name: "Sin Kee Hwa Coffee Stall",
    emoji: "☕",
    type: "hawker",
    cuisine: "Coffee & Toast",
    aliases: [
      "sin kee hwa coffee stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_traditional_haig_road_putu_piring",
    name: "Traditional Haig Road Putu Piring",
    emoji: "🍡",
    type: "hawker",
    cuisine: "Putu Piring",
    aliases: [
      "traditional haig road putu piring"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_afandi_hawa_and_family",
    name: "Afandi Hawa & Family",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Rebus",
    aliases: [
      "afandi hawa & family"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_hj_waliti_hj_mazuki",
    name: "HJ Waliti HJ Mazuki",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay Cuisine",
    aliases: [
      "hj waliti hj mazuki"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_tg_fish_porridge",
    name: "T.G Fish Porridge",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Porridge",
    aliases: [
      "t.g fish porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_soon_lee_cooked_food",
    name: "Soon Lee Cooked Food",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Fried Oyster Omelette",
    aliases: [
      "soon lee cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_warong_sudi_mampir",
    name: "Warong Sudi Mampir",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "warong sudi mampir"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "haig_road_market_and_cooked_food_centre_zhenguang_wantan_noodles",
    name: "Zhenguang Wantan Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wantan Noodles",
    aliases: [
      "zhenguang wantan noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_ah_wings_wanton_mee",
    name: "Ah Wing's Wanton Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "ah wing's wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_farrer_road_chicken_rice",
    name: "Farrer Road Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "farrer road chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_meng_kee",
    name: "Meng Kee",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Local Snacks",
    aliases: [
      "meng kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "empress_road_market_and_food_centre_somerset_fishball_noodle",
    name: "Somerset Fishball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodle",
    aliases: [
      "somerset fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_guan_kee_fried_kway_teow",
    name: "Guan Kee Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "guan kee fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_chuan_kee_boneless_braised_duck",
    name: "Chuan Kee Boneless Braised Duck",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck Rice",
    aliases: [
      "chuan kee boneless braised duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_ghim_moh_chwee_kueh",
    name: "Ghim Moh Chwee Kueh",
    emoji: "🍥",
    type: "hawker",
    cuisine: "Chwee Kueh",
    aliases: [
      "ghim moh chwee kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_jiu_jiang_shao_la",
    name: "Jiu Jiang Shao La",
    emoji: "🍖",
    type: "hawker",
    cuisine: "Roasted Meats",
    aliases: [
      "jiu jiang shao la"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_thiam_kee_1977_hainanese_chicken_rice",
    name: "Thiam Kee 1977 Hainanese Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "thiam kee 1977 hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_the_headless_baker",
    name: "The Headless Baker",
    emoji: "🍞",
    type: "hawker",
    cuisine: "Bakery",
    aliases: [
      "the headless baker"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ghim_moh_road_blk_20_teck_hin_fried_hor_fun",
    name: "Teck Hin Fried Hor Fun",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Fried Hor Fun",
    aliases: [
      "teck hin fried hor fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_new_lucky_claypot_rice",
    name: "New Lucky Claypot Rice",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Claypot Rice",
    aliases: [
      "new lucky claypot rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_lao_chen_ji",
    name: "Lao Chen Ji",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles & Yong Tau Foo",
    aliases: [
      "lao chen ji"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_leong_wee_roasted_delight",
    name: "Leong Wee Roasted Delight",
    emoji: "🍖",
    type: "hawker",
    cuisine: "Roasted Meats",
    aliases: [
      "leong wee roasted delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_shimas_kitchen",
    name: "Shima's Kitchen",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Padang",
    aliases: [
      "shima's kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_yap_kee_wanton_egg_noodles",
    name: "Yap Kee Wanton Egg Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Egg Noodles",
    aliases: [
      "yap kee wanton egg noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "holland_drive_market_and_food_centre_cheng_heng_kway_chap_and_braised_duck_rice",
    name: "Cheng Heng Kway Chap and Braised Duck Rice",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Kway Chap & Braised Duck",
    aliases: [
      "cheng heng kway chap and braised duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_henrys_chicken_rice",
    name: "Henry's Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "henry's chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_foong_kee_traditional_charcoal_roast",
    name: "Foong Kee Traditional Charcoal Roast",
    emoji: "🍖",
    type: "hawker",
    cuisine: "Charcoal Roast Meats",
    aliases: [
      "foong kee traditional charcoal roast"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_huang_da_fu",
    name: "Huang Da Fu",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Local Snacks",
    aliases: [
      "huang da fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_asip_fresh_cold_press_juice",
    name: "ASiP Fresh Cold Press Juice",
    emoji: "🧃",
    type: "hawker",
    cuisine: "Cold Press Juice",
    aliases: [
      "asip fresh cold press juice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "commonwealth_crescent_market_salai_by_meatdrop",
    name: "Salai by Meatdrop",
    emoji: "🍖",
    type: "hawker",
    cuisine: "Grilled Meats",
    aliases: [
      "salai by meatdrop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_outram_park_fried_kway_teow",
    name: "Outram Park Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "outram park fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_heng_kee_curry_chicken_bee_hoon",
    name: "Heng Kee Curry Chicken Bee Hoon",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Curry Chicken Bee Hoon",
    aliases: [
      "heng kee curry chicken bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_tai_hwa_pork_noodles",
    name: "Tai Hwa Pork Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Bak Chor Mee",
    aliases: [
      "tai hwa pork noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_midas_chicken_curry",
    name: "Midas Chicken Curry",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Chicken Curry & Prata",
    aliases: [
      "midas chicken curry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hong_lim_food_centre_and_market_ddsd",
    name: "DDSD",
    emoji: "🍮",
    type: "hawker",
    cuisine: "Beancurd Desserts",
    aliases: [
      "ddsd"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_hock_go",
    name: "Hock Go",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Char Kway Teow",
    aliases: [
      "hock go"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_tiffin_makan",
    name: "Tiffin Makan",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Grilled Beef Donburi & Korean Fried Chicken",
    aliases: [
      "tiffin makan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_yong_xiang_xing_dou_fu",
    name: "Yong Xiang Xing Dou Fu",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "yong xiang xing dou fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_bai_nian_niang_dou_foo",
    name: "Bai Nian Niang Dou Foo",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "bai nian niang dou foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_hong_peng_la_mian_xiao_long_bao",
    name: "Hong Peng La Mian Xiao Long Bao",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Hand-Pulled Noodles & Xiao Long Bao",
    aliases: [
      "hong peng la mian xiao long bao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_chuan_wei_fang_xiang_la_xie",
    name: "Chuan Wei Fang Xiang La Xie",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Sichuan Grilled Fish",
    aliases: [
      "chuan wei fang xiang la xie"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_yi_pin_beef_king",
    name: "Yi Pin Beef King",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Beef Noodles",
    aliases: [
      "yi pin beef king"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "peoples_park_food_centre_kim_hua_guan_bak_kwa",
    name: "Kim Hua Guan Bak Kwa",
    emoji: "🥩",
    type: "hawker",
    cuisine: "Bak Kwa",
    aliases: [
      "kim hua guan bak kwa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_hua_mei_zhen",
    name: "Hua Mei Zhen",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Wok Hei Fried Rice",
    aliases: [
      "hua mei zhen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_soon_huat_prawn_noodles",
    name: "Soon Huat Prawn Noodles",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Noodles",
    aliases: [
      "soon huat prawn noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_xiao_ling_fried_carrot_cake",
    name: "Xiao Ling Fried Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "xiao ling fried carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_lao_huang_hakka_niang_tou_fu",
    name: "Lao Huang Hakka Niang Tou Fu",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "lao huang hakka niang tou fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "north_bridge_road_market_tian_yi",
    name: "Tian Yi",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Rice & Noodles",
    aliases: [
      "tian yi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_guan_kee_carrot_cake",
    name: "Guan Kee Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "guan kee carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_bedok_chwee_kueh",
    name: "Bedok Chwee Kueh",
    emoji: "🍥",
    type: "hawker",
    cuisine: "Chwee Kueh",
    aliases: [
      "bedok chwee kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_singapore_famous_rojak",
    name: "Singapore Famous Rojak",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Rojak",
    aliases: [
      "singapore famous rojak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_angel_horse_teochew_fish_soup",
    name: "Angel Horse Teochew Fish Soup",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "angel horse teochew fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_pondok_makan_indonesia",
    name: "Pondok Makan Indonesia",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Indonesian Cuisine",
    aliases: [
      "pondok makan indonesia"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "albert_centre_fu_cheng_shi_pin",
    name: "Fu Cheng Shi Pin",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Popiah & Kueh Pie Ti",
    aliases: [
      "fu cheng shi pin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_geylang_29_charcoal_fried_hokkien_mee",
    name: "Geylang 29 Charcoal Fried Hokkien Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Mee",
    aliases: [
      "geylang 29 charcoal fried hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_haron_satay_55",
    name: "Haron Satay 55",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "haron satay 55"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_choon_hiang_char_kway_teow",
    name: "Choon Hiang Char Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Char Kway Teow",
    aliases: [
      "choon hiang char kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_ah_hwee_bbq_chicken",
    name: "Ah Hwee BBQ Chicken",
    emoji: "🍗",
    type: "hawker",
    cuisine: "BBQ Chicken Wings",
    aliases: [
      "ah hwee bbq chicken"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_ah_liang_ipoh_hor_fun",
    name: "Ah Liang Ipoh Hor Fun",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Ipoh Hor Fun",
    aliases: [
      "ah liang ipoh hor fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_ming_fa",
    name: "Ming Fa",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodles",
    aliases: [
      "ming fa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_peng_tiong_bahru_wanton_mee",
    name: "Peng Tiong Bahru Wanton Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "peng tiong bahru wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_tian_ci_traditional_prawn_noodles",
    name: "Tian Ci Traditional Prawn Noodles",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Noodles",
    aliases: [
      "tian ci traditional prawn noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "market_street_hawker_centre_yummy_nyonya_peranakan",
    name: "Yummy Nyonya Peranakan",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Peranakan Cuisine",
    aliases: [
      "yummy nyonya peranakan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_i_mohamed_ismail_food_stall",
    name: "I. Mohamed Ismail Food Stall",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Prata & Curry",
    aliases: [
      "i. mohamed ismail food stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_boon_lay_satay",
    name: "Boon Lay Satay",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "boon lay satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_boon_lay_power_nasi_lemak",
    name: "Boon Lay Power Nasi Lemak",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "boon lay power nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_ghee_huat",
    name: "Ghee Huat",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Oyster Omelette",
    aliases: [
      "ghee huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_yao_heng_cooked_food",
    name: "Yao Heng Cooked Food",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay Bee Hoon",
    aliases: [
      "yao heng cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "boon_lay_place_market_and_food_village_kee_hiong_food_stall",
    name: "Kee Hiong Food Stall",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Zi Char",
    aliases: [
      "kee hiong food stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_meng_kee_fried_kway_teow",
    name: "Meng Kee Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "meng kee fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_covent_garden_prawn_noodle",
    name: "Covent Garden Prawn Noodle",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Noodle & Kway Chap",
    aliases: [
      "covent garden prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_guang_fa_fa_ting_roasted_delights",
    name: "Guang Fa Fa Ting Roasted Delights",
    emoji: "🍖",
    type: "hawker",
    cuisine: "Char Siew Roasted Meats",
    aliases: [
      "guang fa fa ting roasted delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_ipoh_zai_prawn_noodles",
    name: "Ipoh Zai Prawn Noodles",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Noodles",
    aliases: [
      "ipoh zai prawn noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_lucky_wanton_noodle",
    name: "Lucky Wanton Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodle",
    aliases: [
      "lucky wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_celebrities_big_prawn_noodle",
    name: "Celebrities Big Prawn Noodle",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Big Prawn Noodle",
    aliases: [
      "celebrities big prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_soon_heng_food_delights",
    name: "Soon Heng Food Delights",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Local Delights",
    aliases: [
      "soon heng food delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_yao_japanese_rice_house",
    name: "Yao Japanese Rice House",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Japanese Rice Dishes",
    aliases: [
      "yao japanese rice house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_zuzu_kebab",
    name: "Zuzu Kebab",
    emoji: "🌯",
    type: "hawker",
    cuisine: "Kebab & Pig's Organ Soup",
    aliases: [
      "zuzu kebab"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_hock_kee_fried_oyster",
    name: "Hock Kee Fried Oyster",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Fried Oyster",
    aliases: [
      "hock kee fried oyster"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_seng_kee_bak_chor_mee",
    name: "Seng Kee Bak Chor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Bak Chor Mee",
    aliases: [
      "seng kee bak chor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_aliff_nasi_lemak",
    name: "Aliff Nasi Lemak",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "aliff nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_serangoon_garden_bakery_and_confectionery",
    name: "Serangoon Garden Bakery & Confectionery",
    emoji: "🍞",
    type: "hawker",
    cuisine: "Bakery",
    aliases: [
      "serangoon garden bakery & confectionery"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_he_he",
    name: "He He",
    emoji: "🥞",
    type: "hawker",
    cuisine: "Min Jiang Kueh",
    aliases: [
      "he he"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_jiu_ji_shu_shi",
    name: "Jiu Ji Shu Shi",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay Cuisine",
    aliases: [
      "jiu ji shu shi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_lorong_ah_soo_lor_mee",
    name: "Lorong Ah Soo Lor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee",
    aliases: [
      "lorong ah soo lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_yong_seng_teochew_fishball_mee",
    name: "Yong Seng Teochew Fishball Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Mee",
    aliases: [
      "yong seng teochew fishball mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_xian_ting_vegetarian",
    name: "Xian Ting Vegetarian",
    emoji: "🥬",
    type: "hawker",
    cuisine: "Vegetarian Wanton Mee",
    aliases: [
      "xian ting vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "hougang_105_hainanese_village_centre_tian_tian_nasi_lemak",
    name: "Tian Tian Nasi Lemak",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "tian tian nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_tai_dong_teochew_duck_rice",
    name: "Tai Dong Teochew Duck Rice",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck Rice",
    aliases: [
      "tai dong teochew duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_hollywood_duck_rice",
    name: "Hollywood Duck Rice",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Duck Rice",
    aliases: [
      "hollywood duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_al_salam_indian_muslim_stall",
    name: "Al Salam Indian Muslim Stall",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Egg Prata",
    aliases: [
      "al salam indian muslim stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_hock_heng",
    name: "Hock Heng",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish & Seafood Soup",
    aliases: [
      "hock heng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_fang_kee",
    name: "Fang Kee",
    emoji: "🍡",
    type: "hawker",
    cuisine: "Kueh",
    aliases: [
      "fang kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_ang_moh_zi_char",
    name: "Ang Moh Zi Char",
    emoji: "🥔",
    type: "hawker",
    cuisine: "Rosti",
    aliases: [
      "ang moh zi char"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_58_minced_meat_noodle",
    name: "58 Minced Meat Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Bak Chor Mee",
    aliases: [
      "58 minced meat noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_ng_kee_teochew_fish_ball_kuay_teow_mee",
    name: "Ng Kee Teochew Fish Ball Kuay Teow Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Kway Teow Mee",
    aliases: [
      "ng kee teochew fish ball kuay teow mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_leng_huat_fishball_noodle_and_laksa",
    name: "Leng Huat Fishball Noodle and Laksa",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodle & Laksa",
    aliases: [
      "leng huat fishball noodle and laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_butternut",
    name: "ButterNut",
    emoji: "🍕",
    type: "hawker",
    cuisine: "Pizza",
    aliases: [
      "butternut"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_midas",
    name: "Midas",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Roti Prata & Murtabak Puffs",
    aliases: [
      "midas"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_jalan_kukoh_teochew_kueh",
    name: "Jalan Kukoh Teochew Kueh",
    emoji: "🍡",
    type: "hawker",
    cuisine: "Teochew Kueh",
    aliases: [
      "jalan kukoh teochew kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_ke_jia_yong_tau_hu",
    name: "Ke Jia Yong Tau Hu",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "ke jia yong tau hu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_ri_tao_fu",
    name: "Ri Tao Fu",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Teochew Pig Organ Soup",
    aliases: [
      "ri tao fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_nur_rezki",
    name: "Nur Rezki",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Siam",
    aliases: [
      "nur rezki"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_132_traditional_teochew_noodles",
    name: "132 Traditional Teochew Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Pok Fishball Noodle",
    aliases: [
      "132 traditional teochew noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_meng_kee",
    name: "Meng Kee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodles",
    aliases: [
      "meng kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_hui_huang_roasted_delight",
    name: "Hui Huang Roasted Delight",
    emoji: "🍖",
    type: "hawker",
    cuisine: "Roasted Meats",
    aliases: [
      "hui huang roasted delight"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_seng_hoe_fish_ball_minced_meat_noodle",
    name: "Seng Hoe Fish Ball Minced Meat Noodle",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Mee Pok & Sliced Fish Soup",
    aliases: [
      "seng hoe fish ball minced meat noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marine_terrace_blk_50a_50a_marine_terrace_ipoh_style_san_lou_hor_fun",
    name: "Ipoh Style San Lou Hor Fun",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Hor Fun",
    aliases: [
      "ipoh style san lou hor fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_tian_seng_fried_prawn_mee",
    name: "Tian Seng Fried Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Prawn Mee",
    aliases: [
      "tian seng fried prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_teo_kee_fried_oyster",
    name: "Teo Kee Fried Oyster",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Fried Oyster",
    aliases: [
      "teo kee fried oyster"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_hup_hup_mee_siam",
    name: "Hup Hup Mee Siam",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Siam",
    aliases: [
      "hup hup mee siam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_three_treasures_roast_duck",
    name: "Three Treasures Roast Duck",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Roasted Duck Rice",
    aliases: [
      "three treasures roast duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_victor_veggie",
    name: "Victor Veggie",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Mock-Meat Satay",
    aliases: [
      "victor veggie"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_apollo_fresh_cockle_fried_kway_teow",
    name: "Apollo Fresh Cockle Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "apollo fresh cockle fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_neptune_hong_kong_dim_sum",
    name: "Neptune Hong Kong Dim Sum",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Dim Sum",
    aliases: [
      "neptune hong kong dim sum"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_yok_mari_yok",
    name: "Yok Mari Yok",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Padang & Mee Rebus",
    aliases: [
      "yok mari yok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_kun_ji",
    name: "Kun Ji",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Roasted & Braised Duck",
    aliases: [
      "kun ji"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_dauthentic_nasi_lemak",
    name: "D'Authentic Nasi Lemak",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "d'authentic nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "84_marine_parade_central_market_and_food_centre_ma_bo_lor_mee",
    name: "Ma Bo Lor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee",
    aliases: [
      "ma bo lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_nm_abdul_rahim",
    name: "N.M. Abdul Rahim",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Mee Goreng",
    aliases: [
      "n.m. abdul rahim"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_hong_kong_yummy_soup",
    name: "Hong Kong Yummy Soup",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Double-Boiled Soup",
    aliases: [
      "hong kong yummy soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_uncle_noodle",
    name: "Uncle Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles",
    aliases: [
      "uncle noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_tokyo_bbq_stingray",
    name: "Tokyo BBQ Stingray",
    emoji: "🐟",
    type: "hawker",
    cuisine: "BBQ Stingray",
    aliases: [
      "tokyo bbq stingray"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_xin_bao_sheng",
    name: "Xin Bao Sheng",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Local Snacks",
    aliases: [
      "xin bao sheng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_market_wu_ba_ye_fried_hokkien_prawn_mee",
    name: "Wu Ba Ye Fried Hokkien Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Prawn Mee",
    aliases: [
      "wu ba ye fried hokkien prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_hock_huat",
    name: "Hock Huat",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "hock huat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_hjh_yang_chek_nasi_rawon_and_mee_rebus",
    name: "HJH Yang Chek Nasi Rawon & Mee Rebus",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Rawon & Mee Rebus",
    aliases: [
      "hjh yang chek nasi rawon & mee rebus"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_ah_hock_fried_hokkien_mee",
    name: "Ah Hock Fried Hokkien Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Mee",
    aliases: [
      "ah hock fried hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_uncle_tans_chicken_rice",
    name: "Uncle Tan's Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "uncle tan's chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_makan_delights",
    name: "Makan Delights",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "makan delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_hui_wei_chilli_ban_mian",
    name: "Hui Wei Chilli Ban Mian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Chilli Ban Mian",
    aliases: [
      "hui wei chilli ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_hua_ji_carrot_cake",
    name: "Hua Ji Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "hua ji carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_hong_mei_western_delights",
    name: "Hong Mei Western Delights",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Western Food",
    aliases: [
      "hong mei western delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_red_stove_fried_prawn_mee",
    name: "Red Stove Fried Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Prawn Mee",
    aliases: [
      "red stove fried prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_zainabs_nasi_padang",
    name: "Zainab's Nasi Padang",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Padang",
    aliases: [
      "zainab's nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_69_geylang_bahru_market_and_food_centre_al_amin_prata_corner",
    name: "Al-Amin Prata Corner",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Prata",
    aliases: [
      "al-amin prata corner"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_mei_zhen_hakka_delicacies",
    name: "Mei Zhen Hakka Delicacies",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Hakka Cuisine",
    aliases: [
      "mei zhen hakka delicacies"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_wak_limah_stall",
    name: "Wak Limah Stall",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay Cuisine",
    aliases: [
      "wak limah stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_lai_heng_fried_kuay_teow_and_cooked_food",
    name: "Lai Heng Fried Kuay Teow & Cooked Food",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "lai heng fried kuay teow & cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_quan_ann_prawn_mee",
    name: "Quan Ann Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Mee",
    aliases: [
      "quan ann prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_chocolat_n_spice",
    name: "Chocolat N' Spice",
    emoji: "🧁",
    type: "hawker",
    cuisine: "Muffins",
    aliases: [
      "chocolat n' spice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "shunfu_mart_heng_heng_bao_bing",
    name: "Heng Heng Bao Bing",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Popiah",
    aliases: [
      "heng heng bao bing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_jing_jing_hokkien_mee_and_oyster_omelette",
    name: "Jing Jing Hokkien Mee & Oyster Omelette",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Hokkien Mee & Oyster Omelette",
    aliases: [
      "jing jing hokkien mee & oyster omelette"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_guang_tai_lor_mee",
    name: "Guang Tai Lor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee",
    aliases: [
      "guang tai lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_lai_heng_handmade_teochew_kueh",
    name: "Lai Heng Handmade Teochew Kueh",
    emoji: "🍡",
    type: "hawker",
    cuisine: "Teochew Kueh",
    aliases: [
      "lai heng handmade teochew kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_xing_yun_hainanese_chicken_rice",
    name: "Xing Yun Hainanese Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "xing yun hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_market_and_hawker_centre_hua_xing_bak_kut_teh",
    name: "Hua Xing Bak Kut Teh",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Bak Kut Teh",
    aliases: [
      "hua xing bak kut teh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_prawnaholic",
    name: "Prawnaholic",
    emoji: "🍜",
    type: "hawker",
    cuisine: "King Prawn Udon",
    aliases: [
      "prawnaholic"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_ayam_penyet",
    name: "Ayam Penyet",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Fried Chicken",
    aliases: [
      "ayam penyet"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_siap_lah",
    name: "Siap Lah!",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Boat Noodles",
    aliases: [
      "siap lah!"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_ris_central_hawker_centre_daburu",
    name: "Daburu",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Japanese Hamburg",
    aliases: [
      "daburu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_you_xiang_teochew_noodles",
    name: "You Xiang Teochew Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Teochew Fishball Noodles",
    aliases: [
      "you xiang teochew noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_zai_lais_lor_mee",
    name: "Zai Lai's Lor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee",
    aliases: [
      "zai lai's lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_like_pudding",
    name: "Like Pudding",
    emoji: "🍮",
    type: "hawker",
    cuisine: "Pudding",
    aliases: [
      "like pudding"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_hakka_thunder_tea",
    name: "Hakka Thunder Tea",
    emoji: "🍵",
    type: "hawker",
    cuisine: "Hakka Thunder Tea Rice",
    aliases: [
      "hakka thunder tea"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_tong_kee_chicken_rice",
    name: "Tong Kee Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "tong kee chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_no_1_western_food",
    name: "No.1 Western Food",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Western Food",
    aliases: [
      "no.1 western food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_queenstown_lontong",
    name: "Queenstown Lontong",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Lontong",
    aliases: [
      "queenstown lontong"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_alan_banana_leaves_bbq_seafood",
    name: "Alan Banana Leaves BBQ Seafood",
    emoji: "🦐",
    type: "hawker",
    cuisine: "BBQ Stingray & Cereal Prawns",
    aliases: [
      "alan banana leaves bbq seafood"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_yusoff_haji_jalal_satay",
    name: "Yusoff Haji Jalal Satay",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "yusoff haji jalal satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_ivys_hainanese_herbal_mutton_soup",
    name: "Ivy's Hainanese Herbal Mutton Soup",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Herbal Mutton Soup",
    aliases: [
      "ivy's hainanese herbal mutton soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_ah_heng_curry_chicken_bee_hoon_mee",
    name: "Ah Heng Curry Chicken Bee Hoon Mee",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Curry Chicken Bee Hoon Mee",
    aliases: [
      "ah heng curry chicken bee hoon mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_lao_liang_pork_porridge",
    name: "Lao Liang Pork Porridge",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Pork Porridge",
    aliases: [
      "lao liang pork porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "pasir_panjang_food_centre_al_ehsan_nasi_padang",
    name: "Al Ehsan Nasi Padang",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Padang",
    aliases: [
      "al ehsan nasi padang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_t_bar",
    name: "T Bar",
    emoji: "🧋",
    type: "hawker",
    cuisine: "Cold Brew Fruit Tea",
    aliases: [
      "t bar"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_changi_village_fried_hokkien_mee",
    name: "Changi Village Fried Hokkien Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Mee",
    aliases: [
      "changi village fried hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_munchi_pancakes",
    name: "Munchi Pancakes",
    emoji: "🥞",
    type: "hawker",
    cuisine: "Min Jiang Kueh",
    aliases: [
      "munchi pancakes"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_hawker_centre_nam_wah_heng_fish_head_steamboat",
    name: "Nam Wah Heng Fish Head Steamboat",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Fish Head Steamboat",
    aliases: [
      "nam wah heng fish head steamboat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_day_night_fried_kway_teow",
    name: "Day Night Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Kway Teow",
    aliases: [
      "day night fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_nan_heng_hainanese_boneless_chicken_rice",
    name: "Nan Heng Hainanese Boneless Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "nan heng hainanese boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_guan_huat_yong_tau_foo",
    name: "Guan Huat Yong Tau Foo",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "guan huat yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_seng_kee",
    name: "Seng Kee",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "seng kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_lai_hin_fish_ball_kway_teow_mee",
    name: "Lai Hin Fish Ball Kway Teow Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fish Ball Kway Teow Mee",
    aliases: [
      "lai hin fish ball kway teow mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_bedok_corner_hokkien_fried_squid_prawn_mee",
    name: "Bedok Corner Hokkien Fried Squid Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Hokkien Fried Prawn Mee",
    aliases: [
      "bedok corner hokkien fried squid prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_yangs_epok_epok",
    name: "Yang's Epok-Epok",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Curry Puffs",
    aliases: [
      "yang's epok-epok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_laksamana",
    name: "LaksaMana",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Laksa",
    aliases: [
      "laksamana"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_persian_tandoor",
    name: "Persian Tandoor",
    emoji: "🫓",
    type: "hawker",
    cuisine: "North Indian Tandoor",
    aliases: [
      "persian tandoor"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_bamboo_nasi_rendang",
    name: "Bamboo Nasi Rendang",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Rendang",
    aliases: [
      "bamboo nasi rendang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_food_centre_noi_kassim_barbeque",
    name: "Noi Kassim Barbeque",
    emoji: "🐟",
    type: "hawker",
    cuisine: "BBQ Stingray",
    aliases: [
      "noi kassim barbeque"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_pin_wei_hong_kong_style_chee_cheong_fun",
    name: "Pin Wei Hong Kong Style Chee Cheong Fun",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Chee Cheong Fun",
    aliases: [
      "pin wei hong kong style chee cheong fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_hakka_leipopo",
    name: "Hakka Leipopo",
    emoji: "🍵",
    type: "hawker",
    cuisine: "Hakka Thunder Tea Rice & Yong Tau Foo",
    aliases: [
      "hakka leipopo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_original_simon_road_hokkien_mee",
    name: "Original Simon Road Hokkien Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Hokkien Mee",
    aliases: [
      "original simon road hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_tai_hao_chi_roasted_delights",
    name: "Tai Hao Chi Roasted Delights",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Roasted Duck & Char Siew",
    aliases: [
      "tai hao chi roasted delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "anchorvale_village_hawker_centre_munchi_pancakes",
    name: "Munchi Pancakes",
    emoji: "🥞",
    type: "hawker",
    cuisine: "Min Jiang Kueh",
    aliases: [
      "munchi pancakes"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_chuan_kee_boneless_duck_rice",
    name: "Chuan Kee Boneless Duck Rice",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck Rice",
    aliases: [
      "chuan kee boneless duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_ji_de_lai_hainanese_chicken_rice",
    name: "Ji De Lai Hainanese Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "ji de lai hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_xiang_xiang_fishball_noodles",
    name: "Xiang Xiang Fishball Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodles",
    aliases: [
      "xiang xiang fishball noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_old_chong_pang_wu_xiang_xia_bing",
    name: "Old Chong Pang Wu Xiang Xia Bing",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Ngoh Hiang",
    aliases: [
      "old chong pang wu xiang xia bing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_ah_chuan_fried_oyster_omelette",
    name: "Ah Chuan Fried Oyster Omelette",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Fried Oyster Omelette",
    aliases: [
      "ah chuan fried oyster omelette"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_pang_market_and_food_centre_chong_pang_nasi_lemak",
    name: "Chong Pang Nasi Lemak",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "chong pang nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_salbiah_malay_stall",
    name: "Salbiah Malay Stall",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Nasi Ayam Penyet",
    aliases: [
      "salbiah malay stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_poh_poh_roasted_chicken_rice",
    name: "Poh Poh Roasted Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Roasted Chicken Rice",
    aliases: [
      "poh poh roasted chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_ah_boy_popiah",
    name: "Ah Boy Popiah",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Popiah",
    aliases: [
      "ah boy popiah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_tian_wai_tian_fish_soup",
    name: "Tian Wai Tian Fish Soup",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "tian wai tian fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teban_gardens_market_and_food_centre_tan_hock_seng_cooked_food",
    name: "Tan Hock Seng Cooked Food",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck & Kway Chap",
    aliases: [
      "tan hock seng cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_rahmath_cheese_prata",
    name: "Rahmath Cheese Prata",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Cheese Prata",
    aliases: [
      "rahmath cheese prata"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_uncle_kuns_delicacies",
    name: "Uncle Kun's Delicacies",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Scallop Glutinous Rice",
    aliases: [
      "uncle kun's delicacies"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_hua_fong_kee_roasted_duck",
    name: "Hua Fong Kee Roasted Duck",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Chinese BBQ Pork & Roasted Duck",
    aliases: [
      "hua fong kee roasted duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_127_lor_1_fish_porridge",
    name: "127 Lor 1 Fish Porridge",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Fish Porridge & Fish Soup",
    aliases: [
      "127 lor 1 fish porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_hai_nan_xing_zhou_beef_noodles",
    name: "Hai Nan Xing Zhou Beef Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Beef Noodles",
    aliases: [
      "hai nan xing zhou beef noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_vista_market_old_long_house_popiah",
    name: "Old Long House Popiah",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Popiah",
    aliases: [
      "old long house popiah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_lixin_chao_zhou_fishball_noodle",
    name: "LiXin Chao Zhou Fishball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Teochew Fishball Noodle",
    aliases: [
      "lixin chao zhou fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_hai_nan_xing_zhou_beef_noodle",
    name: "Hai Nan Xing Zhou Beef Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Beef Noodles",
    aliases: [
      "hai nan xing zhou beef noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_min_kee_tanjong_rhu_wanton_noodle",
    name: "Min Kee Tanjong Rhu Wanton Noodle",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Noodle",
    aliases: [
      "min kee tanjong rhu wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_old_long_house_popiah",
    name: "Old Long House Popiah",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Popiah",
    aliases: [
      "old long house popiah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kim_keat_palm_market_and_food_centre_ah_chuan_fried_oyster_omelette",
    name: "Ah Chuan Fried Oyster Omelette",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Fried Oyster Omelette & Carrot Cake",
    aliases: [
      "ah chuan fried oyster omelette"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_no_25_minced_meat_noodles",
    name: "No.25 Minced Meat Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Minced Meat Noodles",
    aliases: [
      "no.25 minced meat noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_kwang_kee_teochew_fish_porridge",
    name: "Kwang Kee Teochew Fish Porridge",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Fish Porridge",
    aliases: [
      "kwang kee teochew fish porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_eng_kee",
    name: "Eng Kee",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Fried Chicken Wings",
    aliases: [
      "eng kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_obba_jjajang",
    name: "OBBA Jjajang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Korean Jajangmyeon",
    aliases: [
      "obba jjajang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_lim_bo_rojak",
    name: "Lim Bo Rojak",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Penang-Style Rojak",
    aliases: [
      "lim bo rojak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  
  
  
  
  
  {
    id: "marsiling_lane_blk_20_21_soon_xing_coffee",
    name: "Soon Xing Coffee",
    emoji: "☕",
    type: "hawker",
    cuisine: "Traditional Coffee",
    aliases: [
      "soon xing coffee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_joy_junction",
    name: "Joy Junction",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodles",
    aliases: [
      "joy junction"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_chin_heng",
    name: "Chin Heng",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Laksa",
    aliases: [
      "chin heng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_selera_menanti_traditional_malay_cuisine",
    name: "Selera Menanti Traditional Malay Cuisine",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay Cuisine",
    aliases: [
      "selera menanti traditional malay cuisine"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_yap_kee_hainanese_chicken_rice",
    name: "Yap Kee Hainanese Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "yap kee hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_jian_bo_shui_kueh",
    name: "Jian Bo Shui Kueh",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Teochew Chwee Kueh",
    aliases: [
      "jian bo shui kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_soh_kee_cooked_food",
    name: "Soh Kee Cooked Food",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Cantonese Porridge",
    aliases: [
      "soh kee cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_wen_guang_handmade_fishball_noodle",
    name: "Wen Guang Handmade Fishball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Handmade Fishball Noodle",
    aliases: [
      "wen guang handmade fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_du_du_shou_shi",
    name: "Du Du Shou Shi",
    emoji: "🍡",
    type: "hawker",
    cuisine: "Tutu Kueh",
    aliases: [
      "du du shou shi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_seletar_sheng_mian_mee_hoon_kway",
    name: "Seletar Sheng Mian & Mee Hoon Kway",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Hoon Kway",
    aliases: [
      "seletar sheng mian & mee hoon kway"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_guan_kee_kway_chap",
    name: "Guan Kee Kway Chap",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Kway Chap",
    aliases: [
      "guan kee kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_hai_kee_noodle",
    name: "Hai Kee Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodle",
    aliases: [
      "hai kee noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_8_blk_210_hong_seng_lor_mee_laksa",
    name: "Hong Seng Lor Mee & Laksa",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee & Laksa",
    aliases: [
      "hong seng lor mee & laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_chris_kway_chap",
    name: "Chris Kway Chap",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Kway Chap",
    aliases: [
      "chris kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_joo_chiat_chiap_kee",
    name: "Joo Chiat Chiap Kee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodles",
    aliases: [
      "joo chiat chiap kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_sin_ho",
    name: "Sin Ho",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Prawn Paste Chicken & Fish Soup",
    aliases: [
      "sin ho"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_han_kee_fish_soup",
    name: "Han Kee Fish Soup",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "han kee fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_1_blk_216_ah_li_ipoh_hor_fun_fish_dumpling",
    name: "Ah Li Ipoh Hor Fun Fish Dumpling",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Ipoh Hor Fun & Dumplings",
    aliases: [
      "ah li ipoh hor fun fish dumpling"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_xiang_ji_chicken_rice",
    name: "Xiang Ji Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "xiang ji chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_cheng_jia",
    name: "Cheng Jia",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Roasted Chicken Rice",
    aliases: [
      "cheng jia"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_long_fa_yong_tau_fu",
    name: "Long Fa Yong Tau Fu",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo & Fishball Mee Pok",
    aliases: [
      "long fa yong tau fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_yuan_li_shu_shi",
    name: "Yuan Li Shu Shi",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Minced Meat Mushroom Noodle",
    aliases: [
      "yuan li shu shi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_hup_lee_fried_bee_hoon",
    name: "Hup Lee Fried Bee Hoon",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fried Bee Hoon",
    aliases: [
      "hup lee fried bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_reservoir_road_blk_630_xing_li_shou_shi",
    name: "Xing Li Shou Shi",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Black Carrot Cake",
    aliases: [
      "xing li shou shi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_hill_street_fried_kway_teow",
    name: "Hill Street Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Char Kway Teow",
    aliases: [
      "hill street fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_hawker_delights",
    name: "Hawker Delights",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Noodles",
    aliases: [
      "hawker delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_koon_kee_duck_rice",
    name: "Koon Kee Duck Rice",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck & Char Siew",
    aliases: [
      "koon kee duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_south_road_blk_16_warong_jawa",
    name: "Warong Jawa",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay Cuisine",
    aliases: [
      "warong jawa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_teo_kee_fried_oyster",
    name: "Teo Kee Fried Oyster",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Fried Oyster Omelette",
    aliases: [
      "teo kee fried oyster"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_do_me_fried_chicken",
    name: "Do & Me Fried Chicken",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Fried Chicken",
    aliases: [
      "do & me fried chicken"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_xiang_guan_vegetarian",
    name: "Xiang Guan Vegetarian",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Vegetarian",
    aliases: [
      "xiang guan vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_qiang_ji_dessert_store",
    name: "Qiang Ji Dessert Store",
    emoji: "🍧",
    type: "hawker",
    cuisine: "Dessert",
    aliases: [
      "qiang ji dessert store"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_wang_jiao_kitchen",
    name: "Wang Jiao Kitchen",
    emoji: "🍳",
    type: "hawker",
    cuisine: "Zi Char",
    aliases: [
      "wang jiao kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_79_79a_heng_chicken_rice",
    name: "Heng Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "heng chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_u_carrot_cake",
    name: "U Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "u carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_shun_shun_lai_laksa",
    name: "Shun Shun Lai Laksa",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Laksa",
    aliases: [
      "shun shun lai laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_jia_le_prawn_mee_lor_mee",
    name: "Jia Le Prawn Mee & Lor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Prawn Mee & Lor Mee",
    aliases: [
      "jia le prawn mee & lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_cck_190_wanton_mee",
    name: "CCK 190 Wanton Mee",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "cck 190 wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_chun_tian_coffee",
    name: "Chun Tian Coffee",
    emoji: "☕",
    type: "hawker",
    cuisine: "Coffee & Drinks",
    aliases: [
      "chun tian coffee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "circuit_road_blk_89_kopi_folks_club",
    name: "Kopi Folks Club",
    emoji: "☕",
    type: "hawker",
    cuisine: "Local Coffee",
    aliases: [
      "kopi folks club"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_fen_xiang_fried_kway_teow",
    name: "Fen Xiang Fried Kway Teow",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Char Kway Teow",
    aliases: [
      "fen xiang fried kway teow"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_eng_kee_hainanese_chicken_rice_porridge",
    name: "Eng Kee Hainanese Chicken Rice & Porridge",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "eng kee hainanese chicken rice & porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_chao_yang_fish_ball_noodle",
    name: "Chao Yang Fish Ball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Teochew Fish Ball Noodle",
    aliases: [
      "chao yang fish ball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "eunos_crescent_blk_4a_keng_huat_cold_hot_dessert",
    name: "Keng Huat Cold & Hot Dessert",
    emoji: "🍧",
    type: "hawker",
    cuisine: "Cheng Tng",
    aliases: [
      "keng huat cold & hot dessert"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_ma_la_xiang_guo",
    name: "Ma La Xiang Guo",
    emoji: "🌶️",
    type: "hawker",
    cuisine: "Mala Xiang Guo",
    aliases: [
      "ma la xiang guo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_fatt_soon_kueh",
    name: "Fatt Soon Kueh",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Bamboo Shoot Kueh",
    aliases: [
      "fatt soon kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_208b_jimmy_peoples_park",
    name: "Jimmy People's Park",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Char Kway Teow",
    aliases: [
      "jimmy people's park"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_hup_lee_wanton_mee",
    name: "Hup Lee Wanton Mee",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "hup lee wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_old_chai_chee_minced_meat_noodle",
    name: "Old Chai Chee Minced Meat Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Bak Chor Mee",
    aliases: [
      "old chai chee minced meat noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_amys_laksa",
    name: "Amy's Laksa",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Laksa",
    aliases: [
      "amy's laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_original_changi_ten_mile",
    name: "Original Changi Ten Mile",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Groundnut Porridge & Fried Carrot Cake",
    aliases: [
      "original changi ten mile"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "new_upper_changi_road_blk_58_hawker_delights",
    name: "Hawker Delights",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "hawker delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_shi_hui_yuan_hor_fun_specialty",
    name: "Shi Hui Yuan Hor Fun Specialty",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Ipoh Hor Fun",
    aliases: [
      "shi hui yuan hor fun specialty"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_xin_lu_teochew_fishball_noodle",
    name: "Xin Lu Teochew Fishball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Teochew Fishball Noodle",
    aliases: [
      "xin lu teochew fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mei_chin_road_market_hup_kee_teochew_fishball_noodles",
    name: "Hup Kee Teochew Fishball Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Teochew Fishball Noodle",
    aliases: [
      "hup kee teochew fishball noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_weng_kee_original_taste_ipoh_hor_fun",
    name: "Weng Kee Original Taste Ipoh Hor Fun",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Ipoh Hor Fun & Crispy Chicken Cutlet",
    aliases: [
      "weng kee original taste ipoh hor fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_guang_xing_original_taste_fish_head_bee_hoon",
    name: "Guang Xing Original Taste Fish Head Bee Hoon",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Head Bee Hoon",
    aliases: [
      "guang xing original taste fish head bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_hjh_salbiah",
    name: "Hjh. Salbiah",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak & Nasi Padang",
    aliases: [
      "hjh. salbiah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_mei_lin_leng_re_yin_pin",
    name: "Mei Lin Leng Re Yin Pin",
    emoji: "🍧",
    type: "hawker",
    cuisine: "Commando Dessert",
    aliases: [
      "mei lin leng re yin pin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_charlies_corner",
    name: "Charlie's Corner",
    emoji: "🍔",
    type: "hawker",
    cuisine: "Western Food",
    aliases: [
      "charlie's corner"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_song_fish_soup",
    name: "Song Fish Soup",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Teochew Fish Porridge",
    aliases: [
      "song fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_chai_ho_satay",
    name: "Chai Ho Satay",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay",
    aliases: [
      "chai ho satay"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_boon_kee_wanton_mee",
    name: "Boon Kee Wanton Mee",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "boon kee wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_3_blk_448_soon_huat_cooked_food",
    name: "Soon Huat Cooked Food",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Sesame Oil Chicken",
    aliases: [
      "soon huat cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_xin_xin_famous_fried_oyster",
    name: "Xin Xin Famous Fried Oyster",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Fried Oyster Omelette",
    aliases: [
      "xin xin famous fried oyster"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_he_ji_braised_duck",
    name: "He Ji Braised Duck",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck Rice",
    aliases: [
      "he ji braised duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_slice_fish",
    name: "Slice Fish",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup & Fish Head Bee Hoon",
    aliases: [
      "slice fish"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_gui_ji",
    name: "Gui Ji",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "gui ji"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_west_street_2_blk_726_ming_kee",
    name: "Ming Kee",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Porridge",
    aliases: [
      "ming kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_chey_sua_carrot_cake",
    name: "Chey Sua Carrot Cake",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "chey sua carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_come_daily_fried_hokkien_prawn_mee",
    name: "Come Daily Fried Hokkien Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Prawn Mee",
    aliases: [
      "come daily fried hokkien prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_da_cheng_kway_chap",
    name: "Da Cheng Kway Chap",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Kway Chap",
    aliases: [
      "da cheng kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_hong_kong_lung_hwa_roast_duck",
    name: "Hong Kong Lung Hwa Roast Duck",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Roast Duck",
    aliases: [
      "hong kong lung hwa roast duck"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_west_market_and_food_court_jia_le_man_fen_guo",
    name: "Jia Le Man Fen Guo",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Fish Soup, Porridge & Mee Hoon Kueh",
    aliases: [
      "jia le man fen guo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_dian_mixian",
    name: "Dian Mixian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Yunnan Rice Noodles",
    aliases: [
      "dian mixian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_ayer_food_centre_biang_biang_xian_famous_foods",
    name: "Biang Biang Xian Famous Foods",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Biang Biang Noodles",
    aliases: [
      "biang biang xian famous foods"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_bak_kee_teochew_satay_bee_hoon",
    name: "Bak Kee Teochew Satay Bee Hoon",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay Bee Hoon",
    aliases: [
      "bak kee teochew satay bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_fu_ming_cooked_food",
    name: "Fu Ming Cooked Food",
    emoji: "🥕",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "fu ming cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_shi_le_yuan_kway_chap",
    name: "Shi Le Yuan Kway Chap",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Kway Chap",
    aliases: [
      "shi le yuan kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "redhill_food_centre_jia_xiang_mee_siam",
    name: "Jia Xiang Mee Siam",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Mee Siam",
    aliases: [
      "jia xiang mee siam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_fei_fei_roasted_noodles",
    name: "Fei Fei Roasted Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Roasted Meats & Noodles",
    aliases: [
      "fei fei roasted noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_heng_heng_cooked_food",
    name: "Heng Heng Cooked Food",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Laksa",
    aliases: [
      "heng heng cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_tommys_wanton_noodle",
    name: "Tommy's Wanton Noodle",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Mee & Roasted Meats",
    aliases: [
      "tommy's wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_cais_hor_fun",
    name: "Cai's Hor Fun",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hor Fun",
    aliases: [
      "cai's hor fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "yuhua_village_market_and_food_centre_ron_sheng_fish_head_beehoon",
    name: "Ron Sheng Fish Head Beehoon",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Head Bee Hoon",
    aliases: [
      "ron sheng fish head beehoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_137_lor_mee_prawn_mee",
    name: "137 Lor Mee Prawn Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee & Prawn Mee",
    aliases: [
      "137 lor mee prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_yummy_sawarak_kolo_mee",
    name: "Yummy Sawarak Kolo Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Sarawak Kolo Mee",
    aliases: [
      "yummy sawarak kolo mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tampines_round_market_and_food_centre_yong_huat_chicken_rice",
    name: "Yong Huat Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Kampung Chicken Rice",
    aliases: [
      "yong huat chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_kuey_chap_stall",
    name: "Kuey Chap Stall",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Kway Chap",
    aliases: [
      "kuey chap stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_abc_popiah",
    name: "ABC Popiah",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Popiah",
    aliases: [
      "abc popiah"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_ping_xiang_wanton_mee",
    name: "Ping Xiang Wanton Mee",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "ping xiang wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "toa_payoh_lorong_4_blk_93_93_wu_xiang_xia_bing",
    name: "93 Wu Xiang Xia Bing",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Ngoh Hiang",
    aliases: [
      "93 wu xiang xia bing"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_shi_wei_da_satay_bee_hoon",
    name: "Shi Wei Da Satay Bee Hoon",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay Bee Hoon",
    aliases: [
      "shi wei da satay bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "85_fengshan_centre_meow_xiang_vegetarian_food",
    name: "Meow Xiang Vegetarian Food",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Vegetarian White Bee Hoon",
    aliases: [
      "meow xiang vegetarian food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_seng_huat_noodles_stall",
    name: "Seng Huat Noodles Stall",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Mee",
    aliases: [
      "seng huat noodles stall"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_yanan_ban_mian_noodles",
    name: "Yanan Ban Mian Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Ban Mian",
    aliases: [
      "yanan ban mian noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_hong_ji_mian_shi_jia",
    name: "Hong Ji Mian Shi Jia",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "hong ji mian shi jia"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "telok_blangah_market_tiong_bahru_wah_yuen_porridge",
    name: "Tiong Bahru Wah Yuen Porridge",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Porridge",
    aliases: [
      "tiong bahru wah yuen porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_wei_yi_laksa_prawn_noodle",
    name: "Wei Yi Laksa & Prawn Noodle",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Laksa & Prawn Noodle",
    aliases: [
      "wei yi laksa & prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_delicious_duck_noodles",
    name: "Delicious Duck Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Duck Noodles",
    aliases: [
      "delicious duck noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_tanglin_halt_original_peanut_pancake",
    name: "Tanglin Halt Original Peanut Pancake",
    emoji: "🥞",
    type: "hawker",
    cuisine: "Peanut Pancake",
    aliases: [
      "tanglin halt original peanut pancake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "tanglin_halt_market_jiu_ye",
    name: "Jiu Ye",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Local Snacks",
    aliases: [
      "jiu ye"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_fishball_story",
    name: "Fishball Story",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodles",
    aliases: [
      "fishball story"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_wong_kee_wanton_noodles",
    name: "Wong Kee Wanton Noodles",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Noodles",
    aliases: [
      "wong kee wanton noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_dancing_crab_shack",
    name: "Dancing Crab Shack",
    emoji: "🦀",
    type: "hawker",
    cuisine: "Seafood",
    aliases: [
      "dancing crab shack"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_chit_chaat_chai",
    name: "Chit Chaat Chai",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Indian Street Food",
    aliases: [
      "chit chaat chai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ayer_rajah_food_centre_kush",
    name: "Kush",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Modern Singaporean Skewers & Rice Bowls",
    aliases: [
      "kush"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_barakath_nachiyar",
    name: "Barakath Nachiyar",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Prata & Fish Curry",
    aliases: [
      "barakath nachiyar"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_ho_ji_fried_hokkien_prawn_noodle",
    name: "Ho Ji Fried Hokkien Prawn Noodle",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Prawn Mee",
    aliases: [
      "ho ji fried hokkien prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_pin_xiang_yuan_mushroom_minced_meat_noodle",
    name: "Pin Xiang Yuan Mushroom & Minced Meat Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Bak Chor Mee",
    aliases: [
      "pin xiang yuan mushroom & minced meat noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "mayflower_market_ang_mo_kio_453_wanton_mee",
    name: "Ang Mo Kio 453 Wanton Mee",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "ang mo kio 453 wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_ho_bee_roasted_food",
    name: "Ho Bee Roasted Food",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Char Siew, Sio Bak & Roast Duck",
    aliases: [
      "ho bee roasted food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_rosnahs_family_kitchen",
    name: "Rosnah's Family Kitchen",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay Cuisine",
    aliases: [
      "rosnah's family kitchen"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_sumo_fried_hokkien_prawn_mee",
    name: "Sumo Fried Hokkien Prawn Mee",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Fried Hokkien Prawn Mee",
    aliases: [
      "sumo fried hokkien prawn mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "ang_mo_kio_628_market_nasi_lemak_67",
    name: "Nasi Lemak@67",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "nasi lemak@67"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_seng_kee",
    name: "Seng Kee",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Black Chicken Herbal Soup & Kidney Mee Sua",
    aliases: [
      "seng kee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_chong_pang_satay_bbq_chicken_wings",
    name: "Chong Pang Satay & BBQ Chicken Wings",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Satay & BBQ Chicken Wings",
    aliases: [
      "chong pang satay & bbq chicken wings"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_tongs_rojak",
    name: "Tongs Rojak",
    emoji: "🥗",
    type: "hawker",
    cuisine: "Rojak",
    aliases: [
      "tongs rojak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_ah_kiat_wanton_mee",
    name: "Ah Kiat Wanton Mee",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Wanton Mee",
    aliases: [
      "ah kiat wanton mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_yung_sheng_chicken_rice",
    name: "Yung Sheng Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "yung sheng chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_ding_dang_guai",
    name: "Ding Dang Guai",
    emoji: "🍢",
    type: "hawker",
    cuisine: "Local Snacks",
    aliases: [
      "ding dang guai"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bedok_north_street_3_blk_538_bedok_ah_koon_fish_soup",
    name: "Bedok Ah Koon Fish Soup",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "bedok ah koon fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teck_ghee_square_steakgrill_steak_house",
    name: "Steakgrill Steak House",
    emoji: "🥩",
    type: "hawker",
    cuisine: "Grilled Steak & Western Food",
    aliases: [
      "steakgrill steak house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "teck_ghee_square_jie_mei_yong_tau_foo",
    name: "Jie Mei Yong Tau Foo",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo & Laksa",
    aliases: [
      "jie mei yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_aishah_lee_muslim_food",
    name: "Aishah Lee Muslim Food",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Malay & Muslim / Nasi Lemak",
    aliases: [
      "aishah lee muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_jalilahs_corner",
    name: "Jalilah's Corner",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Malay & Muslim / Mee Siam & Mee Rebus",
    aliases: [
      "jalilah's corner"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_ah_meng_delicious_food",
    name: "Ah Meng Delicious Food",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Prawn Mee & Fried Hokkien Mee",
    aliases: [
      "ah meng delicious food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_gu_zao_wei_braised_duck_rice_noodle_kway_chap",
    name: "Gu Zao Wei Braised Duck Rice Noodle Kway Chap",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Braised Duck Rice & Kway Chap",
    aliases: [
      "gu zao wei braised duck rice noodle kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_fa_noodle",
    name: "Fa Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Mee & Mee Pok",
    aliases: [
      "fa noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "clementi_ave_2_market_cooked_food_centre_chef_wei_hk_cheong_fun",
    name: "Chef Wei HK Cheong Fun",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Hong Kong Style Cheong Fun",
    aliases: [
      "chef wei hk cheong fun"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_yong_xin",
    name: "Yong Xin",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Noodles / Mee Kia & Mee Pok",
    aliases: [
      "yong xin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_ang_mo_kio_loh_mee_laksa",
    name: "Ang Mo Kio Loh Mee Laksa",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee & Laksa",
    aliases: [
      "ang mo kio loh mee laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_bin_fen_economic_bee_hoon",
    name: "Bin Fen Economic Bee Hoon",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Economic Bee Hoon & Nasi Lemak",
    aliases: [
      "bin fen economic bee hoon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "chong_boon_market_and_food_centre_cai_ji_fried_fish_soup",
    name: "Cai Ji Fried Fish Soup",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fried Fish Soup",
    aliases: [
      "cai ji fried fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_tian_yi_vegetarian_food",
    name: "Tian Yi Vegetarian Food",
    emoji: "🥬",
    type: "hawker",
    cuisine: "Vegetarian / Bee Hoon & Kway Chap",
    aliases: [
      "tian yi vegetarian food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_mei_ji_niang_dou_foo",
    name: "Mei Ji Niang Dou Foo",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "mei ji niang dou foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_shui_guo",
    name: "Shui Guo",
    emoji: "🍘",
    type: "hawker",
    cuisine: "Chwee Kueh",
    aliases: [
      "shui guo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_xiang_kee_yu_yuan_mian_tang",
    name: "Xiang Kee Yu Yuan Mian Tang",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodles",
    aliases: [
      "xiang kee yu yuan mian tang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_xi_xiang_feng",
    name: "Xi Xiang Feng",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "xi xiang feng"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_lim_hai_sheng_cooked_food",
    name: "Lim Hai Sheng Cooked Food",
    emoji: "🍘",
    type: "hawker",
    cuisine: "White Carrot Cake",
    aliases: [
      "lim hai sheng cooked food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_hup_hup_minced_meat_noodle",
    name: "Hup Hup Minced Meat Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Minced Meat Noodle",
    aliases: [
      "hup hup minced meat noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_fried_hokkien_prawn_noodle",
    name: "Fried Hokkien Prawn Noodle",
    emoji: "🍤",
    type: "hawker",
    cuisine: "Hokkien Prawn Noodle",
    aliases: [
      "fried hokkien prawn noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_724_ang_mo_kio_market_seng_bee_hainanese_chicken_rice",
    name: "Seng Bee Hainanese Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "seng bee hainanese chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_hai_nan_hometown_curry",
    name: "Hai Nan Hometown Curry",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Curry Rice & Curry Chicken",
    aliases: [
      "hai nan hometown curry"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_tong_fong_fatt_hainanese_boneless_chicken_rice",
    name: "Tong Fong Fatt Hainanese Boneless Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "tong fong fatt hainanese boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_panjang_hawker_centre_yu_kee_duck_rice",
    name: "Yu Kee Duck Rice",
    emoji: "🦆",
    type: "hawker",
    cuisine: "Duck Rice & Duck Noodle",
    aliases: [
      "yu kee duck rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_east_coast_lagoon_fishball_noodle",
    name: "East Coast Lagoon Fishball Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodle",
    aliases: [
      "east coast lagoon fishball noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "east_coast_lagoon_food_village_lagoon_famous_carrot_cake",
    name: "Lagoon Famous Carrot Cake",
    emoji: "🍘",
    type: "hawker",
    cuisine: "Fried Carrot Cake",
    aliases: [
      "lagoon famous carrot cake"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "serangoon_garden_market_bossi_ban_mian",
    name: "Bossi Ban Mian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Ban Mian",
    aliases: [
      "bossi ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "sims_vista_market_and_food_centre_green_chili_chicken_rice",
    name: "Green Chili Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "green chili chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "kukoh_21_food_centre_bedok_69_traditional_wanton_noodle",
    name: "Bedok 69 Traditional Wanton Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodle",
    aliases: [
      "bedok 69 traditional wanton noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "marsiling_lane_blk_20_21_azizah_aziz_caferia",
    name: "Azizah Aziz Caferia",
    emoji: "🍵",
    type: "hawker",
    cuisine: "Teh Tarik & Malay Breakfast",
    aliases: [
      "azizah aziz caferia"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "bukit_merah_central_food_centre_heng_chai_chicken_rice",
    name: "Heng Chai Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Hainanese Chicken Rice",
    aliases: [
      "heng chai chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "80_circuit_road_market_and_food_centre_tuck_bee",
    name: "Tuck Bee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Fishball Noodle",
    aliases: [
      "tuck bee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_86_indian_vegetarian",
    name: "86 Indian Vegetarian",
    emoji: "🥬",
    type: "hawker",
    cuisine: "Indian Vegetarian",
    aliases: [
      "86 indian vegetarian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_you_yi_jia_la_mian_xiao_long_bao",
    name: "You Yi Jia La Mian Xiao Long Bao",
    emoji: "🥟",
    type: "hawker",
    cuisine: "La Mian & Xiao Long Bao",
    aliases: [
      "you yi jia la mian xiao long bao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "havelock_road_cooked_food_centre_guang_fa_laksa",
    name: "Guang Fa Laksa",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Laksa",
    aliases: [
      "guang fa laksa"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_6_tanjong_pagar_plaza_market_and_food_centre_traditional_hakka_rice",
    name: "Traditional Hakka Rice",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Hakka Thunder Tea Rice",
    aliases: [
      "traditional hakka rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "changi_village_blk_2_and_3_kun_kee_fried_oyster",
    name: "Kun Kee Fried Oyster",
    emoji: "🦪",
    type: "hawker",
    cuisine: "Fried Oyster",
    aliases: [
      "kun kee fried oyster"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "blk_17_upper_boon_keng_market_and_food_centre_rotitiam",
    name: "Rotitiam",
    emoji: "🥐",
    type: "hawker",
    cuisine: "Hawker Bakery / Buns",
    aliases: [
      "rotitiam"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_37_porridge",
    name: "37 Porridge",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Porridge",
    aliases: [
      "37 porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "jurong_west_street_52_blk_505_traditional_hakka_lui_cha",
    name: "Traditional Hakka Lui Cha",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Hakka Thunder Tea Rice",
    aliases: [
      "traditional hakka lui cha"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_yu_mi_xiang",
    name: "Yu Mi Xiang",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup & Seafood Pao Fan",
    aliases: [
      "yu mi xiang"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "margaret_drive_hawker_centre_xins_tzechar",
    name: "Xin's TzeChar",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Zi Char",
    aliases: [
      "xin\'s tzechar"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "taman_jurong_market_and_food_centre_feng_zhen_lor_mee",
    name: "Feng Zhen Lor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Lor Mee",
    aliases: [
      "feng zhen lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_115_tai_ho_jiak",
    name: "115 Tai Ho Jiak",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Local Delights",
    aliases: [
      "115 tai ho jiak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_75_ah_balling",
    name: "75 Ah Balling",
    emoji: "🍡",
    type: "hawker",
    cuisine: "Tang Yuan",
    aliases: [
      "75 ah balling"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_amoy_ban_mian",
    name: "Amoy Ban Mian",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Ban Mian",
    aliases: [
      "amoy ban mian"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_botak_cantonese_porridge",
    name: "Botak Cantonese Porridge",
    emoji: "🥣",
    type: "hawker",
    cuisine: "Porridge",
    aliases: [
      "botak cantonese porridge"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_changi_village_hokkien_mee",
    name: "Changi Village Hokkien Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hokkien Mee",
    aliases: [
      "changi village hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_chwee_kueh",
    name: "Chwee Kueh",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Chwee Kueh",
    aliases: [
      "chwee kueh"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_cut_fruits",
    name: "Cut Fruits",
    emoji: "🍉",
    type: "hawker",
    cuisine: "Fresh Fruits",
    aliases: [
      "cut fruits"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_fei_zhuang_yuan",
    name: "Fei Zhuang Yuan",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Herbal Bak Kut Teh",
    aliases: [
      "fei zhuang yuan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_fuyuan_mala_xiang_guo",
    name: "Fuyuan Mala Xiang Guo",
    emoji: "🌶️",
    type: "hawker",
    cuisine: "Mala Xiang Guo",
    aliases: [
      "fuyuan mala xiang guo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_guo_qin_noodle",
    name: "Guo Qin Noodle",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodle",
    aliases: [
      "guo qin noodle"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_hi_leskmi_whampoa_nasi_lemak",
    name: "Hi Leskmi Whampoa Nasi Lemak",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Lemak",
    aliases: [
      "hi leskmi whampoa nasi lemak"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_jin_kimchi",
    name: "Jin Kimchi",
    emoji: "🇰🇷",
    type: "hawker",
    cuisine: "Korean",
    aliases: [
      "jin kimchi"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_le_yuan_noodles",
    name: "Le Yuan Noodles",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Chinese Noodles",
    aliases: [
      "le yuan noodles"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_leipopo",
    name: "LeiPoPo",
    emoji: "🥘",
    type: "hawker",
    cuisine: "Chinese",
    aliases: [
      "leipopo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_munchi_pancakes",
    name: "Munchi Pancakes",
    emoji: "🥞",
    type: "hawker",
    cuisine: "Pancakes",
    aliases: [
      "munchi pancakes"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_pokeqpan",
    name: "POKEQPAN",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Japanese Teppanyaki Bento",
    aliases: [
      "pokeqpan"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_pot_master",
    name: "Pot Master",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Claypot Rice",
    aliases: [
      "pot master"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_punggol_roti_prata",
    name: "Punggol Roti Prata",
    emoji: "🫓",
    type: "hawker",
    cuisine: "Prata & Indian Rojak",
    aliases: [
      "punggol roti prata"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_punjabi_dhaba",
    name: "Punjabi Dhaba",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Punjabi Food",
    aliases: [
      "punjabi dhaba"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_rendang_nation",
    name: "Rendang Nation",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Nasi Padang",
    aliases: [
      "rendang nation"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_shahith_ar_raheeq",
    name: "Shahith Ar-Raheeq",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Indian Muslim Food",
    aliases: [
      "shahith ar-raheeq"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_souperb",
    name: "Souperb",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Tonic Soup",
    aliases: [
      "souperb"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_tian_tian_dian_xin",
    name: "Tian Tian Dian Xin",
    emoji: "🥟",
    type: "hawker",
    cuisine: "Dimsum",
    aliases: [
      "tian tian dian xin"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_timbre_pizza",
    name: "Timbre Pizza",
    emoji: "🍕",
    type: "hawker",
    cuisine: "Pizza",
    aliases: [
      "timbre pizza"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_tuckshop",
    name: "Tuckshop",
    emoji: "🥤",
    type: "hawker",
    cuisine: "Beverages",
    aliases: [
      "tuckshop"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_uncle_penyet",
    name: "Uncle Penyet",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Ayam Penyet",
    aliases: [
      "uncle penyet"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_yi_ru_heng_economic_rice",
    name: "Yi Ru Heng Economic Rice",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Economic Rice",
    aliases: [
      "yi ru heng economic rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "one_punggol_hawker_centre_zi_jia_yong_tau_foo",
    name: "Zi Jia Yong Tau Foo",
    emoji: "🥘",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "zi jia yong tau foo"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_liu_kou_shui",
    name: "Liu Kou Shui",
    emoji: "🍱",
    type: "hawker",
    cuisine: "Japanese Fusion Bowls",
    aliases: [
      "liu kou shui"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_mae_ai_thai_food",
    name: "Mae Ai Thai Food",
    emoji: "🇹🇭",
    type: "hawker",
    cuisine: "Thai",
    aliases: [
      "mae ai thai food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_penang_alley",
    name: "Penang Alley",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Penang-Style CKT",
    aliases: [
      "penang alley"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_shawarma_n_kebab_and_sweets",
    name: "Shawarma N Kebab and Sweets",
    emoji: "🥙",
    type: "hawker",
    cuisine: "Turkish Halal",
    aliases: [
      "shawarma n kebab and sweets"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_eng_kee_chicken_wings",
    name: "Eng Kee Chicken Wings",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Fried Chicken Wings",
    aliases: [
      "eng kee chicken wings"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_ming_chung_white_lor_mee",
    name: "Ming Chung White Lor Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Putian Lor Mee",
    aliases: [
      "ming chung white lor mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_feng_ji_hainanese_boneless_chicken_rice",
    name: "Feng Ji Hainanese Boneless Chicken Rice",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Chicken Rice",
    aliases: [
      "feng ji hainanese boneless chicken rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_chef_wang_fried_rice",
    name: "Chef Wang Fried Rice",
    emoji: "🍚",
    type: "hawker",
    cuisine: "Fried Rice",
    aliases: [
      "chef wang fried rice"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_bai_nian_niang_dou_fu",
    name: "Bai Nian Niang Dou Fu",
    emoji: "🥘",
    type: "hawker",
    cuisine: "Yong Tau Foo",
    aliases: [
      "bai nian niang dou fu"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_munchi_pancakes",
    name: "Munchi Pancakes",
    emoji: "🥞",
    type: "hawker",
    cuisine: "Pancakes",
    aliases: [
      "munchi pancakes"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_origanics",
    name: "Origanics",
    emoji: "🥬",
    type: "hawker",
    cuisine: "Vegetarian",
    aliases: [
      "origanics"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_guan_kee_kway_chap",
    name: "Guan Kee Kway Chap",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Kway Chap",
    aliases: [
      "guan kee kway chap"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_petit_saigon",
    name: "Petit Saigon",
    emoji: "🇻🇳",
    type: "hawker",
    cuisine: "Vietnamese",
    aliases: [
      "petit saigon"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_redhill_fried_hokkien_mee",
    name: "Redhill Fried Hokkien Mee",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Hokkien Mee",
    aliases: [
      "redhill fried hokkien mee"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_soya_bean_you_tiao",
    name: "Soya Bean You Tiao",
    emoji: "🥤",
    type: "hawker",
    cuisine: "Soya Bean & You Tiao",
    aliases: [
      "soya bean you tiao"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_huang_chao_teochew_noodle_house",
    name: "Huang Chao Teochew Noodle House",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Teochew Noodles",
    aliases: [
      "huang chao teochew noodle house"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_jue_shuang_braised_delights",
    name: "Jue Shuang Braised Delights",
    emoji: "🍲",
    type: "hawker",
    cuisine: "Braised Delights",
    aliases: [
      "jue shuang braised delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_fat_fat_food",
    name: "Fat Fat Food",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Local",
    aliases: [
      "fat fat food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_yi_hong_wok",
    name: "Yi Hong Wok",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Local",
    aliases: [
      "yi hong wok"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_the_11th_street_teochew_fish_soup",
    name: "The 11th Street Teochew Fish Soup",
    emoji: "🐟",
    type: "hawker",
    cuisine: "Fish Soup",
    aliases: [
      "the 11th street teochew fish soup"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_hk_wanton_noodle_roasted_delights",
    name: "HK Wanton Noodle & Roasted Delights",
    emoji: "🍜",
    type: "hawker",
    cuisine: "Wanton Noodle & Roast",
    aliases: [
      "hk wanton noodle & roasted delights"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_sunbo_express_penyet_bbq",
    name: "Sunbo Express Penyet + BBQ",
    emoji: "🍗",
    type: "hawker",
    cuisine: "Ayam Penyet & BBQ",
    aliases: [
      "sunbo express penyet + bbq"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_uno_eat",
    name: "UNO Eat",
    emoji: "🍽️",
    type: "hawker",
    cuisine: "Local",
    aliases: [
      "uno eat"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_rizqia_muslim_food",
    name: "RIZQIA Muslim Food",
    emoji: "🍛",
    type: "hawker",
    cuisine: "Muslim Food",
    aliases: [
      "rizqia muslim food"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
  {
    id: "buangkok_hawker_centre_juice_lab",
    name: "Juice Lab",
    emoji: "🥤",
    type: "hawker",
    cuisine: "Fresh Juices",
    aliases: [
      "juice lab"
    ],
    dietTags: [],
    priceRange: "$",
    platforms: [
      "dine_in",
      "grab_go"
    ]
  },
];

export const BRANDS = [...BRANDS_1, ...BRANDS_2, ...BRANDS_3, ...BRANDS_4];