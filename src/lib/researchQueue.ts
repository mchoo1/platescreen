// Untyped literal export (see ResearchQueueEntry in types/db.ts for the shape) —
// matches the outlets.ts/foodOptions.ts convention: a ~600+ element array
// checked against a union-typed interface blows past TS's structural
// comparison complexity limit (TS2590). Cast at the boundary if consumed
// programmatically; the research task reads this file's contents directly.

/**
 * Work queue for the weekly research task. Two kinds of entries:
 *
 * 1. A known Singapore food outlet/chain not yet added to outlets.ts at all —
 *    the task researches it, adds the Outlet + FoodOption records, flips
 *    status to 'researched'.
 * 2. (Added 2026-08-20, ~590 entries) A real hawker stall whose Outlet row
 *    ALREADY exists — sourced from the SFA/data.gov.sg licensed-establishment
 *    dataset during the outlet cleanup that replaced 114 generic hawker-centre
 *    outlets with real per-stall ones (see reference/migration-scripts/ and
 *    the 2026-08-20 session report). These entries only need FoodOption
 *    (menu/macro) research — no new Outlet — flagged via each entry's `notes`.
 *    This is a large backlog relative to the research task's usual pace; see
 *    the session report for the honest scale disclosure and the ~4,300
 *    further SFA-matched stalls not yet promoted to Outlet rows at all
 *    (archived in reference/migration-scripts/sfa-discovery-log.json for
 *    future expansion).
 *
 * Cross-reference the SFA dataset for hawker/food_court_stall types (see
 * SfaRegistration in types/db.ts) plus official nutrition sources for macros.
 *
 * UPDATE 2026-08-23 (4th pass, direct user request): removed 18 queue entries whose
 * underlying Brand rows no longer exist — those Brands used raw SFA `licensee_name`
 * values (e.g. "Chew Boon Teck") as the display name, which are personal/legal names,
 * not real trading names, and were deleted from brands.ts/premises.ts as zero-value
 * placeholders (Chomp Chomp Food Centre x6, Berseh Food Centre x6, Alexandra Village
 * Food Centre x6). Replaced with 45 real, distinctly-named stalls researched via
 * Google Maps + food-blog sources, cross-checked against
 * reference/migration-scripts/sfa-discovery-log.json — see
 * reference/research-sessions/2026-08-23-chomp-chomp-berseh-alexandra-village.md.
 * These 45 new brands need the same macro-research follow-up as every other batch
 * this project has added (no MenuItems yet, real dish names only) — not queued here
 * individually to avoid repeating the same "one row per stall" scale problem already
 * flagged for the 839-stall Kopitiam backlog; treat as part of that same future
 * batched-macro-research pass. IMPORTANT: this is only 3 of the ~103 hawker centres
 * affected by the generic-licensee-name problem — most still need the same cleanup.
 *
 * UPDATE 2026-08-24 (staleness sweep, direct user request): the generic-licensee-name
 * cleanup referenced above ran to completion across Batches A through V (see
 * reference/research-sessions/2026-08-2*-hawker-cleanup-batch-*.md and
 * -koufu-concept-stores-batch-V.md) — effectively all ~103 affected hawker centres and
 * food-court operators (Kopitiam, Koufu sub-brands, Fei Siong/Ci Yuan, Food Junction,
 * Bukit Canberra, Yishun Park, Buangkok, One Punggol, and the full hawker-centre-by-
 * hawker-centre sweep) are done. Every one of those batches deleted the generic-name
 * Brand row it replaced, which silently orphaned this queue: any type-2 entry (has
 * `sfaLicenceNo`) whose `id` was copy-pasted from a Brand id at creation time is now
 * dangling if that Brand no longer exists. A fresh audit (cross-referencing every
 * `sfaLicenceNo`-tagged, non-`researched` entry's `id` against current brands.ts)
 * found 493 of 572 such entries (86%) had gone stale this way — removed all 493.
 * The 79 remaining `sfaLicenceNo` entries still reference real, currently-existing
 * Brand rows and are still valid macro-research work. The ~50 type-1 entries (new
 * chains/operators/venues, no `sfaLicenceNo`) were untouched — those are expected to
 * predate their own Brand row by design, so a missing-brand check doesn't apply to
 * them. Net: 622 -> 129 entries. Per the same policy as the 2026-08-23 update, the
 * ~500+ real stall names added across Batches A-V were NOT individually re-queued here
 * (same "one row per stall" scale problem) — treat their macro research as part of the
 * same future batched pass as the Kopitiam/Koufu backlog.
 */
export const RESEARCH_QUEUE = [

  {
    id: "coffeesmith",
    name: "Coffeesmith",
    aliases: [
      "coffeesmith"
    ],
    type: "grab_go",
    cuisine: "Coffee",
    priority: "low",
    status: "researched"
  },
  {
    id: "hollin",
    name: "Hollin",
    aliases: [
      "hollin"
    ],
    type: "grab_go",
    cuisine: "Milk Tea",
    priority: "low",
    status: "researched"
  },
  {
    id: "four_leaves",
    name: "Four Leaves",
    aliases: [
      "four leaves"
    ],
    type: "grab_go",
    cuisine: "Bakery",
    priority: "low",
    status: "researched",
    notes: "Researched 2026-08-22: no official SG nutrition PDF or HPB entry found for this bakery chain (Four Leaves Pte Ltd, 30+ outlets, also operates St Leaven/Epi d'Or/Country Brot sub-brands). 6 MenuItems added across Buns/Cakes/Pastries/Bread categories (Hokkaido Dome, An Pan/Red Bean Bun, Tuna Bun, Strawberry Shortcake slice, Mille Feuille, Garlic Cream Cheese Bread) — prices cross-verified across multiple independent sources (islifearecipe.net Bedok Mall guide, Lemon8 review, bukitpanjangmall.com fan-site listing). Calories for the first 5 items sourced from islifearecipe.net (a third-party mall/bakery blog, not an official brand or HPB source); macro splits (protein/carbs/fat) are reasoned estimates from typical bakery-item composition since the source gave calories only. Garlic Cream Cheese Bread had no calorie figure anywhere — fully reasoned estimate from comparable garlic/cream-cheese bakery breads. All 6 items confidence 'estimated' (none qualify as 'verified' — no official brand SG source, HPB data, or Open Food Facts SG-scanned entry exists for this chain). Confirmed via two independent sources (a 2013 halalSG tweet response and thedurianbakery.com.sg/islifearecipe.net) that Four Leaves is NOT Muis halal-certified — dietTags left empty at Brand level and no halal tag applied to any item, per the never-guess rule. Skipped whole-cake SKUs (Black Forest Classic, Almond Fruits Top, etc. — priced $30-$86 by size) since no per-slice calorie/macro basis exists and a whole multi-kg cake doesn't fit MenuItem's one-serving shape; also skipped mini-bun variants and cartoon/custom cakes as near-duplicates or unpriced. No SFA lookup — type is 'grab_go' with existing Premises coverage assumed out of scope for this run (menu/macro research only, no new Premises added). NOTE: found unrelated site-integrity issue during research — sgeats.net/four-leave-menu-singapore, which appeared in search results as a Four Leaves price-list page, now resolves to an unrelated Indonesian gambling redirect (domain likely expired/hijacked); avoided as a source entirely, flagging here in case it resurfaces in a future run's search results."
  },
  {
    id: "bengawan_solo",
    name: "Bengawan Solo",
    aliases: [
      "bengawan solo"
    ],
    type: "grab_go",
    cuisine: "Nyonya Kueh",
    priority: "low",
    status: "researched"
  },
  {
    id: "swensen_s",
    name: "Swensen's",
    aliases: [
      "swensen's",
      "swensens"
    ],
    type: "restaurant",
    cuisine: "Ice Cream / Western",
    priority: "low",
    status: "pending"
  },
  {
    id: "kopitiam",
    name: "Kopitiam",
    aliases: [
      "kopitiam"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "high",
    status: "pending",
    notes: "2026-08-22: Kopitiam is no longer a Brand — it was a single 'brand' row standing in for 48 different physical food-court buildings, each containing many unrelated stalls with completely different food, which never had a real menu and never rendered (buildScreenerRows joins off MenuItems). Restructured per the Operator design in types/db.ts: Kopitiam stays in operators.ts as the operating company; its 48 real SFA-sourced building addresses are preserved in reference/data/food-court-venues.json (operatorId: 'kopitiam') as research anchors. UPDATE 2026-08-22 (2nd pass, same day): the outlet-finder map widget IS genuinely JS-only with no usable endpoint (confirmed again), but its WordPress SEO sitemap (stall-sitemap.xml + stall-sitemap2.xml) lists 1,441 individual stall pages with clean schema.org JSON-LD — scraped all of them directly (see reference/research-sessions/2026-08-22-kopitiam-stall-scrape.md). After dedup + filtering 58 bare cuisine-label placeholders (reference/data/kopitiam-generic-filter.md), added 839 real Brand rows (operatorId: 'kopitiam') + 1,183 geocoded Premises rows to brands.ts/premises.ts. REMAINING WORK (this is now the priority item, not full re-research): none of these 839 brands have MenuItems yet — the scraped data gives real dish NAMES per brand (preserved in reference/data/kopitiam-stall-dishes.json, ~1,861 dish names across 846 name-keys) but never macros, and this project never fabricates calories/protein/carbs/fat. A future pass needs to research real macros (USDA lookup / vision / manual with source citation) for a representative dish or two per brand and add MenuItems — until then these brands are invisible in the calorie/protein screener even though they're now real, addressed, and geocoded. 3 brand-new venues (504 Yishun, 542B Serangoon North, Pasir Ris 735) have no published address yet and were left out entirely (8 brands with no other location: Mr Prata, Fried Chicken, Savoury Seafood, Hao You Ji Roasted Delights, Hao La Wei Mix Rice, Hao Lai Ke Lamian, Tandoori House, Yong Li Coffee Station) — revisit once Kopitiam publishes them. Kopitiam's other named F&B brands from FairPrice Group's corporate site (Bagus/Bagus Food Hall, Kopitiam Corner, Ah Bowl Den, Belly Belly Good Cai Fan, Chomp!, Kokoro Izakaya, Sedap Kitchen) — check whether they're already among the 839 scraped stalls (several matching names did turn up, e.g. Heavenly Wang, Kokoro Kiosuku, Confirm & Chop, Xiang Chi Mian) before doing separate lookups. UPDATE 2026-08-23: this entry's real unit of work is the 839-brand MenuItems backlog described above, not the 'Kopitiam' queue row itself (which correctly has no Brand of its own — adding one would recreate the exact mega-brand pattern this restructure reverted). This run added MenuItems for 1 of the 839 (kopitiam_kopi_kiosk — 6 items: Kaya Toast, Kaya Butter Toast, Kopi, Teh, Ice Kacang, Kaya Butter Set Meal; all confidence 'estimated', reasoned from singaporecalorie.com/HPB-adjacent generic dish data plus this project's existing Ya Kun kopi/toast entries as a calibration analog — see reference/research-sessions/2026-08-23-kopitiam_kopi_kiosk.md). Skipped 'Signature Breakfast Set' from the stall's scraped dish list as a likely near-duplicate of the set meal already added, with no credible way to differentiate the two without fabricating a distinction. Status left 'pending' — 838 kopitiam-operator brands still have zero MenuItems; picking one per run here would take ~2 years at this cadence, so a future session should consider batching multiple stalls per run specifically for this backlog rather than treating it as a single one-outlet-per-run entry. UPDATE 2026-08-23 (2nd pass): added MenuItems for 1 more of the 839 (kopitiam_chinatown_roasted, a Chinese roast-meats stall at the Changi Airport T3 Kopitiam — 3 items: Char Siew Rice, Roast Duck Rice, Roasted Chicken Rice; all confidence 'estimated'). Only 3 dish names were scraped for this stall (below the usual padding room), so rather than inventing extra menu items not confirmed on its page, macros/prices were calibrated directly off this project's own existing entries for the identical dish names at other Chinese roast-meat stalls already in menuItems.ts (tian_tian_chicken_rice, cc_roast_meats_stall, oar_roast_duck_rice — all also 'estimated' confidence for the same dishes), since no outlet-specific source (official page, HPB, or press) exists for this individual airport stall — see reference/research-sessions/2026-08-23-kopitiam_chinatown_roasted.md. No SFA lookup (Brand already existed with a Premises row from the 2026-08-22 scrape). 837 kopitiam-operator brands still have zero MenuItems. UPDATE 2026-08-23 (3rd pass): added MenuItems for 1 more of the 837 (kopitiam_beradik_western, a Western-food stall — Changi T3, Plaza Singapura, Tan Tock Seng Hospital, Bagus Food Hall @ Northpoint, AMK Hub — 6 items: Chicken Chop, Fish & Chips, Chicken Chop Aglio Olio, Crispy Chicken Cutlet With Rice, Grilled Chicken Steak, Chicken Bolognese; all confidence 'estimated'. Scraped dish list also included 'Fish and Chip' (duplicate of 'Fish & Chips', skipped, same dish) and 'Chicken Bolognese'/'Grilled Chicken Steak' kept distinct since composition and macros differ meaningfully from the fried chop/cutlet items. No outlet-specific source exists for this individual hawker-tier Western stall, so macros were calibrated off this project's own astons_chicken_chop (420 cal, 40g protein, 8g carbs, 24g fat, à la carte protein only) and astons_fish_chips (560/28/52/26) entries, scaled up to reflect a hawker 'set' plate that bundles protein with fries/rice/pasta on one plate (unlike Aston's à la carte pricing) and scaled down in price to match this stall's existing '$' priceRange vs Aston's casual-dining tier — see reference/research-sessions/2026-08-23-kopitiam_beradik_western.md. No SFA lookup (Brand already existed with a Premises row from the 2026-08-22 scrape). 836 kopitiam-operator brands still have zero MenuItems. UPDATE 2026-08-31: the backlog has clearly been worked down substantially by other sessions between 2026-08-23 and now without this note trail being kept current (audited today: only 5 of the 839 kopitiam-operator brands still have zero MenuItems, not 836 — this note is being corrected to reflect that, not to claim credit for work done elsewhere). This run added MenuItems for 1 of the 5 (kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd, the Kang Kar Mall branch of Jian Bo Tiong Bahru Shui Kueh — 8 items: Shui Kueh 5pc, Shui Kueh 10pc, Chee Cheong Fun, Steamed Yam Cake, Kueh Lapis, Rice Kueh, Soon Kueh, Siew Mai; all confidence 'estimated'. This brand's scraped dish-name signal was only 1 entry ('Signature Jian Bo Shui Kueh'), below the usual threshold, so rather than relying on the scrape, cross-referenced the Premises label ('Kang Kar Mall') against a web search and confirmed this is a branch of the well-documented Jian Bo Tiong Bahru Shui Kueh chain (Michelin Bib Gourmand hawker, own official site + PriceListo third-party menu aggregation across its other branches) — real dish names and chain-wide prices sourced from PriceListo, macros reasoned/calibrated against this project's own existing Chwee Kueh (320 cal/6p/45c/12f @ 5-6pcs, used directly for the 5pc size and doubled for the 10pc), Chee Cheong Fun, Kueh Lapis, Soon Kueh, and Yam Cake entries elsewhere in menuItems.ts as analogs where a direct match existed, and general dim-sum-portion knowledge for Siew Mai (no existing analog in this DB) — see reference/research-sessions/2026-08-31-kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd.md. No SFA lookup (Brand already existed with a Premises row from the 2026-08-22 scrape). Of the remaining 4: kopitiam_cheers is the known non-food convenience-store concession (CLAUDE.md section 4.3) and should never get a MenuItem; kopitiam_culiang_yufen's only scrape signal is the known self-referential-garbage artifact (CLAUDE.md section 5) and kopitiam_china_food's only scrape signal is the bare category label 'Cold dishes' — both need individual web research, not the scrape, same as this run; kopitiam_king_grouper (Hougang One) has 3 scraped dish names (Fish Soup, Fried Fish Soup, Sliced Fish Soup) but this project's own existing convention treats generic 'Fish Soup' and 'Sliced Fish Soup' as macro-identical (see kgfs_sliced_fish_soup and the several other Fish Soup stalls in menuItems.ts, all 320/28/25/10), so 'Fish Soup' doesn't clear the near-duplicate bar as a distinct 3rd item — left at 2 credible non-duplicate items, below this task's 3-item minimum, so deliberately skipped this run rather than padded; a future pass should do individual web research on 'King Grouper' Hougang One specifically (it may have more items than the scrape captured) before it can be added. Status left 'pending' — 4 kopitiam-operator brands still have zero MenuItems. UPDATE 2026-08-31 (2nd pass): did that individual web research on kopitiam_king_grouper (Hougang One, #01-19) as recommended above — found strong evidence it is not a distinct stall but the same real-world chain as the already-populated kopitiam_king_grouper_fish_soup Brand (which has 5 Premises rows: VivoCity, Tan Tock Seng Hospital, Parkway Parade, West Mall, Kopitiam @ Northpoint City). The chain's own official site (kinggrouperfishsoup.com/services-7) lists exactly one outlet at '1 Hougang Street 91 #01-19 Singapore 538692' — the identical address on kopitiam_king_grouper's sole Premises row — and its menu page (kinggrouperfishsoup.com/menus) states its full published menu (Sliced Grouper Fish Soup $6.50, Sliced Batang Fish Soup $6.50, Sliced Red Grouper Fish Soup $9, Fried Sliced Fish Soup $7, Fish Porridge $7, Seafood Soup $7, Teochew Style Sliced Grouper Fish $13, Teochew Style Sliced Red Grouper Fish $15) is 'served at all locations.' This is brand-chain fragmentation (Kopitiam's own stall-sitemap scrape evidently labelled the Hougang One page with the shorter 'King Grouper' name while other branch pages used 'King Grouper Fish Soup'), not a genuine second stall under CLAUDE.md section 4.2's test — there is no SFA data on either side to distinguish them, and the chain's own site recognizes only one outlet at this address. This task's scope is appending MenuItems to an existing Brand, not merging/restructuring Brand rows, so deliberately did NOT add a second, divergent set of MenuItems to kopitiam_king_grouper — that would let the same real chain appear twice in the screener under two names rather than fixing the split. Recommend a future dedicated cleanup pass (same shape as the 2026-08-24 duplicate-removal batches) reassign kopitiam_king_grouper_p1 (Hougang One) to brandId 'kopitiam_king_grouper_fish_soup' as its 6th Premises row and delete the kopitiam_king_grouper Brand row — the same pattern already used for the McDonald's/Anchorvale Village Hawker Centre case in premises.ts. Not acted on here (outside this task's write scope); flagged for that pass instead. Did not pick a fallback brand in the same run, per this task's one-outlet-per-run rule. Status left 'pending' — kopitiam_cheers (never, non-food), kopitiam_culiang_yufen (garbage scrape signal), and kopitiam_china_food (bare category label) still need individual web research same as before; kopitiam_king_grouper needs the Brand-merge action above, not macro research, once a future pass is authorized to restructure Brand rows. 4 kopitiam-operator brands remain unresolved, none by this run's design. UPDATE 2026-08-31 (3rd pass): this run independently re-derived the same kopitiam_king_grouper candidate as the 2nd pass above and briefly (by mistake) added 2 MenuItems to it before reading this entry's own up-to-date notes — caught the conflict (the module used to enumerate 'kopitiam brands with zero MenuItems' was loaded fresh from the live files each time and was accurate, but an earlier throwaway audit script had cached a stale copy of this queue file's text, so the king_grouper 2nd-pass note above wasn't visible until this file was re-read directly) and reverted the addition before writing anything further; menuItems.ts is unchanged by this pass. Then did the individual web research on kopitiam_china_food recommended above (Blk 450 Clementi Ave 3, #01-271) — found general coverage of that Kopitiam venue (Burpple/FoodAdvisor reviews mention Sambal Stingray, Beef Korean Porridge, Hainanese Curry Rice, and a spicy popcorn-chicken dish at other stalls there) but nothing that names a stall called 'China Food' or describes what it actually sells; still just the bare 'Cold dishes' scrape signal, no credible dish-level basis, so still deliberately left unresearched rather than guessed. Also re-audited koufu/foodfare/hawkers_street (this queue's 3 other 'operator' entries): koufu and foodfare currently have 0 Brand rows tagged operatorId 'koufu'/'foodfare' at all (their own real sub-brands were added without an operatorId per the 2026-08-22/23 notes above, and foodfare is separately user-deprioritized) — no zero-menu backlog remains for either under this queue entry's original framing; hawkers_street's 27 operatorId-tagged Brand rows now all have ≥1 MenuItem (its own remaining work, per its own queue entry, is identifying named concessions at 4 newer venues, not menu research, and is out of this entry's scope). Then swept the rest of this run's priority-sorted pending queue (restaurant/food_court/hawker/coffeeshop/canteen types, ~92 entries) for any other realistic single-outlet target and found none: ~34 entries are per-location duplicates of chains that already have their own consolidated Brand elsewhere (Cold Storage x16, McDonald's x4, Pizza Hut x2, Domino's x2, Bengawan Solo x3, Bee Cheng Hiang x1, NTUC Foodfare x2 — same 'append as Premises to the existing chain Brand, don't research as a new Brand' situation as kopitiam_king_grouper, all individually flagged on their own queue entries this pass), ~11 are bare SFA-licensee personal names (Lee Len Tong, Goh Poo Huat, Kwek Ah Heoh, Lee Jim Pong, Lim Hang Tong, Goh Jee Tee (2nd), Lee Kee Yeo @Lee Lian Hong, Au Jiahao Alex, Chan Cheow Teck, Chan Kok Hee (Tian Guoxi), Chong Yo Private Limited) matching this project's known task #29 bucket (text search can't resolve a name that never appeared on a signboard — needs Street View or an in-person visit, not this run's tooling), 2 are orphaned (queue id has no matching Brand row: eunos_crescent_blk_4a_teo_kiang_huat, tanglin_halt_market_ngern_jwee_chye), and 9 were simply stale — already had real MenuItems from earlier untracked work but still showed status 'pending' (clementi_ave_3_blk_448_lee_guat_hoon, eunos_crescent_blk_4a_tiong_lee_lim, ayer_rajah_food_centre_big_bern_s_american_grill_xpolis_pte_ltd, mei_chin_road_market_goh_jee_tee, pasir_ris_central_hawker_centre_bee_cheng_hiang_concept_pte_ltd, pasir_ris_central_hawker_centre_bengawan_solo_pte_ltd, bedok_north_street_1_blk_216_bengawan_solo_pte_ltd, bedok_north_street_1_blk_216_domino_s_pizza_singapore_pte_ltd, bedok_north_street_1_blk_216_mcdonald_s_restaurants_pte_ltd) — flipped those 9 to 'researched' this run as a verified bookkeeping fix (each individually re-checked against menuItems.ts before flipping; no macro research performed on any of them). Net result: no new MenuItems added this run (the one candidate found, kopitiam_king_grouper, turned out to be already-covered under a sibling Brand name and was correctly left alone per the 2nd pass's reasoning), but 9 stale statuses corrected and this survey's findings recorded on each affected entry for whoever runs a future Brand-merge or Street-View pass. Status left 'pending' on this entry — same 4 kopitiam-operator brands remain unresolved as before, none by this run's design. UPDATE 2026-09-01: resolved kopitiam_culiang_yufen, one of the 4. Its only prior scrape signal was the known self-referential-garbage artifact, but a fresh web search found the chain is well-documented under its full trading name 'Culiang Yufen By Popular Food' — foodpanda listings for 4 other branches (Kopitiam Square/Sengkang, Hillion Mall, VivoCity, Cineleisure) all show the same consistent numbered menu (52 items: 5 soup flavours x protein choices), confirming a real, chain-wide, non-fabricated menu even though this project's own Paya Lebar Quarter premises isn't itself listed on foodpanda. Added 8 MenuItems spanning distinct named proteins/formats (fish noodle, beef noodle, luncheon meat noodle, meatball noodle, fat intestine noodle, prawn paste noodle, fish+rice bowl, rice-cake side) — real dish names + SGD prices from the foodpanda listing, macros reasoned/calibrated against this project's own existing Sliced Fish Soup/Fish Soup/Double Fish Soup/Meatball Noodles/Fishball Noodles entries, all confidence 'estimated' — see reference/research-sessions/2026-09-01-kopitiam_culiang_yufen.md. No SFA lookup (Brand already existed with a Premises row from the 2026-08-22 scrape). Of the remaining 3: kopitiam_cheers is still the known non-food convenience-store concession (never gets a MenuItem); kopitiam_china_food's only signal is still the bare 'Cold dishes' category label — no new information surfaced this pass, still needs a genuinely new lead (e.g. Street View/in-person) rather than another repeat text search; kopitiam_king_grouper still needs the Brand-merge action flagged above (out of this task's write scope), not macro research. Did not pick a fallback brand in the same run. Status left 'pending' — 3 kopitiam-operator brands remain unresolved, 1 (china_food) needing a new research angle, 1 (cheers) permanently out of scope, 1 (king_grouper) needing a restructure pass."
  },
  {
    id: "koufu",
    name: "Koufu",
    aliases: [
      "koufu"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "high",
    status: "pending",
    notes: "2026-08-22: same restructure as Kopitiam (see that entry) — Koufu's 65 real venue addresses are preserved in reference/data/food-court-venues.json (operatorId: 'koufu'). Research named concessions per venue and add each as its own Brand with operatorId: 'koufu', not a rename of this entry. UPDATE 2026-08-22 (later same day): koufu.com.sg/our-brands/ lists Koufu Group's own portfolio directly, and unlike the food-court-format entries (Koufu, Happy Hawkers*, Fork & Spoon*, The Kitchen, Gourmet Paradise, Cookhouse, Rasapura Master), several are single-menu standalone chains with their own outlet-listing subpages that ARE statically fetchable (server-rendered, no JS needed) — added as real Brand+Premises this session, NOT tied to operatorId 'koufu' since they're standalone storefronts, not concessions inside a shared Koufu building: koufu_happy_hawkers (21 outlets — despite the 'Food Hall' label, its own subpage lists single addresses like a normal chain, treated as such), koufu_fork_spoon (3), koufu_grove (4), koufu_1983_coffee_toast (1), koufu_1983_taste_of_nanyang (1). UPDATE 2026-08-22 (3rd pass, same day): got all 3 previously-'JS-locked' sub-brands too, each via a different static fallback (never the JS map widget itself, which is genuinely dead for all three): R&B Tea's admin-ajax.php `get_regions_action` returns clean JSON directly (14 outlets); Nine Fresh and Dough Culture both just list every outlet as plain static HTML text on a 'Locate Us' page, no API needed (25 and 18 outlets respectively). Added koufu_rb_tea, koufu_nine_fresh, koufu_dough_culture — same no-operatorId pattern as the other 5. Same macro gap as Kopitiam applies: real dish names (and for Dough Culture, real prices) captured in reference/data/koufu-family-dishes.json but no MenuItems added yet. UPDATE 2026-08-23: followed the real links from koufu.com.sg/our-brands/food-halls/ instead of guessing slugs. Found the full food-halls sub-brand list: koufu (flagship, 36 addresses islandwide), cookhouse, rasapura-masters, fork-spoon, gourmet-paradise, happy-hawkers. 'The Kitchen' and 'The Green Hut' do not appear anywhere in Koufu's current official brand taxonomy (checked food-halls, concept-stores, cafe-restaurants, shopping-mall categories) — likely a mistaken assumption from an earlier pass rather than a real, current Koufu brand; not pursued further without a source naming them. The flagship 'Koufu' listing itself (36 addresses) was deliberately NOT added as a Brand — it's the same generic-mega-brand shape that was already tried and reverted for Kopitiam/Koufu/Foodfare in the 2026-08-22c restructure (a food court venue housing many unrelated stalls, not one orderable thing). Added Cookhouse (4 outlets: Novena Square, Changi T2, Waterway Point, White Sands), Rasapura Masters (1 outlet: Marina Bay Sands), and Gourmet Paradise (4 outlets: Marina Square, Parc Point, Oasis Terraces, Toa Payoh Hub) as real Brand+Premises, same no-operatorId pattern as the other Koufu Group standalone concepts. Pang Pang Kopi (pangpangkopi.com.sg) returned HTTP 403 on direct fetch. Elemen (elemengroup.com.sg) is a Squarespace JS-rendered site — its /locations page ships no static address data, genuinely JS-locked this time (unlike the Koufu-hosted pages, which all turned out to be server-rendered)."
  },
  {
    id: "foodfare",
    name: "Foodfare",
    aliases: [
      "foodfare",
      "ntuc foodfare"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "high",
    status: "pending",
    notes: "2026-08-22: same restructure as Kopitiam (see that entry). The 8 'representative dishes' added 2026-08-12 (generic HPB/NutriKaki-style estimates not tied to any specific named stall) were exactly the kind of fabrication the project's 'never fabricate' rule targets, and are gone from the current dataset. Foodfare's 48 real venue addresses are preserved in reference/data/food-court-venues.json (operatorId: 'foodfare'). Research named concessions per venue and add each as its own Brand with operatorId: 'foodfare'. UPDATE 2026-08-22 (later same day): visited foodfare.com.sg per user request — IMPORTANT SCOPE FINDING: NTUC Foodfare's own current site positions it purely as a B2B 'Institutional Catering and Food Solutions' business (childcare centres, nursing homes/eldercare, SAF/MHA, F&B manufacturing-as-a-service for other retailers) — no consumer-facing food-court/outlet locator exists on the site at all. FairPrice Group's food-services page confirms this split explicitly: Kopitiam = consumer food courts, NTUC Foodfare = institutional catering, as two separate business lines. This means the 48 existing 'foodfare' Premises rows (hospital/SAF-camp/corporate-campus addresses from SFA licence data, e.g. Orchid Country Club, NUHS Tower Block) may not actually be places a general member of the public can walk into and screen for a meal the way a mall food court is — they're catering-contract kitchens. Needs a human decision, not a guess: (a) keep them as-is since some institutional cafeterias (esp. hospitals) are in practice open to visitors/public, (b) reclassify/deprioritize them as non-public, or (c) drop Foodfare from the public-facing 'find a restaurant' scope entirely and just note it as a B2B business PlateScreen doesn't cover. Not acted on — flagged in reference/research-sessions/2026-08-22-food-court-website-research.md. UPDATE 2026-08-23: checked for the same sitemap/JSON-LD shortcut that worked for Kopitiam/Koufu — foodfare.com.sg's sitemap has exactly one entry (page-sitemap.xml, ~10 static corporate pages: About Us, Institution Catering, Food Manufacturing, etc.), no stall/outlet/store post type at all, confirming there's genuinely no consumer-outlet content on the current site (not just a JS-hidden one). A web search also surfaced an old foodfare.com.sg URL pattern (foodcourt_location_stalls.cfm) proving Foodfare used to run a consumer food-court locator, and found at least one of the 48 existing addresses (Foodfare @ Clifford Centre, 24 Raffles Place) described in reviews as 'permanently closed.' This means the 48 existing Premises rows are likely stale to some unknown degree — some may still be open food courts (just not marketed under the Foodfare name on the current corporate site), others may be closed or reassigned to a different operator. Per user instruction (2026-08-23): deprioritized, not deleted — skip further Foodfare work for now and move to other food-court operators; revisit with per-address verification if this becomes a priority again."
  },
  {
    id: "hawkers_street",
    name: "Hawkers' Street",
    aliases: [
      "hawkers street",
      "hawkers' street"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "medium",
    status: "pending",
    notes: "2026-08-22: Hawkers' Street's fake mega-Brand row (8 premises, 0 menu items) was removed for the same reason as Kopitiam/Koufu/Foodfare — see that entry. Unlike the other 3 operators, Hawkers' Street already has this fixed correctly for 4 of its 8 venues: 27 real named stalls exist as their own Brand rows with operatorId: 'hawkers_street' (e.g. tai_wah_pork_noodle, jason_penang_cuisine at Tampines 1; chef_wei_hk_cheong_fun at ION Orchard) — those needed no change. Remaining work: the other 4 venues (see reference/data/food-court-venues.json, operatorId: 'hawkers_street', concessionsResearched: false) still need their named concessions identified and added the same way. The 27 existing stalls also still need MenuItems researched (0 each currently) before they render. UPDATE 2026-08-22 (later same day): hawkersstreet.com.sg/outlets/ (server-rendered, unlike Kopitiam/Koufu's locators) confirms Hawkers' Street has actually grown to 9 venues, not 8 — added Square 2 and The Clementi Mall (real addresses captured, not yet added to food-court-venues.json — do that before further research). Cross-checked hawkersstreet.com.sg/brands/ (their canonical brand roster): it lists exactly the same 27 stalls already in this database — no confidently-new stall names to add from that page. The outlets page itself shows several additional stall logos at the newer venues (Square 2, Clementi Mall, Tang Plaza, EastPoint Mall) with names like 'Hwa Heng Beef Noodle', '91 Fried Kway Teow', 'Hup Hong Chicken Rice', 'Wok Hei Hor Fun' inferable from image filenames, but the page's own brand-anchor links (#brandXXX) are inconsistently wired (multiple different logos link to the same anchor, a bug on their end) — not trustworthy for id matching, and filename-only inference risks getting a name wrong, so none were added. A future pass should visit each of these venues in person/via Google Maps listing to verify names properly, same escalation method used for the Tekka Market generic-name cleanup."
  },
  {
    id: "banquet",
    name: "Banquet",
    aliases: [
      "banquet"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "low",
    status: "pending",
    notes: "2026-08-22: status corrected from 'researched' to 'pending' — the 9 'representative dishes' this entry claimed to have added 2026-08-13 (generic HPB/NutriKaki-style estimates not tied to any named stall, same fabrication pattern as Foodfare's) are not present in the current brands.ts (Banquet currently has no Brand row at all, i.e. they were already removed in an earlier cleanup). Real work needed: same Operator restructure as Kopitiam/Koufu/Foodfare — find Banquet's real venue addresses (Jurong Point, Woodlands Square, VivoCity per operator listings, not yet SFA-matched or added to food-court-venues.json), then find and add named concessions inside each as their own Brand with operatorId: 'banquet'. Do not add a single 'Banquet' mega-Brand. UPDATE 2026-08-23: web search confirms Banquet is a defunct halal food-court chain (widely reported bankrupt/closed years ago) — several of its former locations (e.g. the VivoCity #B2-39 unit referenced here) are now operating as 'Bagus' / 'Bagus Food Hall', which is a Kopitiam house-brand format already captured as part of the 839-stall Kopitiam scrape (see brands.ts 2026-08-22e/f notes) under venue names like 'Bagus Food Hall @ Northpoint City'. Priority dropped to low — this is very likely fully superseded by the Kopitiam data rather than a real gap; only worth revisiting if a specific still-independent Banquet-branded location turns up."
  },
  {
    id: "ok_convenience",
    name: "OK Convenience",
    aliases: [
      "ok convenience",
      "ok store"
    ],
    type: "ready_to_eat",
    cuisine: "Convenience",
    priority: "low",
    status: "pending",
    notes: "2026-08-31 (scheduled grocery-track run, picked as 2nd of 2 pending entries after mccafe_colocation_research was skipped — see that entry's same-day notes): multiple WebSearches (brand name, 'OK convenience store Singapore', 'OK Convenience Store' + address/opening, okconvenience.sg / Instagram/Facebook presence, HDB heartland minimart context) found zero evidence of a real, currently-operating Singapore business trading as 'OK Convenience' or 'OK Store'. The only 'OK'-branded convenience chain that surfaces is OK Mart / OK Convenience Store, a Taiwan chain (Lai Lai Convenience Store Co., ~750-900+ outlets) with no indication of Singapore expansion. This looks like the same pattern flagged in the 2026-08-23 Chomp Chomp/Berseh/Alexandra Village cleanup — a queue entry that may not correspond to a real trading name in Singapore — rather than a normal 'hasn't been researched yet' gap. Not resolving via fabrication per project rules. Left 'pending'. Recommend a human check whether this entry has a specific real-world source (e.g. was it meant to reference a specific minimart, or was 'OK' a placeholder/typo for another chain) before a future run repeats this same search. No Brand/MenuItem/GroceryProduct files touched. No fallback entry was picked in its place this run (queue's only two pending grab_go/ready_to_eat/supermarket entries — mccafe_colocation_research and this one — are both blocked, one on a same-day-documented human schema decision, this one on unverifiable brand existence). UPDATE 2026-09-01 (scheduled grocery-track run, picked deterministically after mccafe_colocation_research was re-confirmed blocked — see that entry's same-day notes): repeated the core WebSearch ('\"OK Convenience\" store Singapore') one day later as a lightweight re-check rather than a full re-investigation, since the underlying question (does this business exist) is unlikely to change day to day. Same result: no Singapore-specific hits, only OK Mart (Taiwan) and 'OK便利店' (Hong Kong). No new evidence surfaced. Still not resolving via fabrication. Left 'pending' — recommend this entry not be re-attempted by future scheduled runs without new input (e.g. a corrected name from a human) given two independent research passes now agree it doesn't verifiably exist."
  },
  {
    id: "grain",
    name: "Grain",
    aliases: [
      "grain"
    ],
    type: "grab_go",
    cuisine: "Healthy",
    priority: "high",
    status: "researched",
    notes: "Nutrition data in docs/food-data/grab-and-go/grain_sg.json — id already present in outlets.ts as of 2026-08-10 scheduled run; no new record added, status corrected to researched."
  },
  {
    id: "saladbox",
    name: "Saladbox",
    aliases: [
      "saladbox"
    ],
    type: "grab_go",
    cuisine: "Salads",
    priority: "medium",
    status: "researched",
    notes: "Nutrition data in docs/food-data/grab-and-go/saladbox_sg.json — id already present in outlets.ts as of 2026-08-10 scheduled run; no new record added, status corrected to researched."
  },
  {
    id: "soulgreen",
    name: "Soulgreen",
    aliases: [
      "soulgreen",
      "soul green"
    ],
    type: "grab_go",
    cuisine: "Healthy",
    priority: "medium",
    status: "researched",
    notes: "CLOSED OUT 2026-08-21 after FIVE consecutive independent dead ends (2026-08-10, 2026-08-11, 2026-08-12, and two runs on 2026-08-21) all reaching the identical conclusion: the only matching SG business, 'Soul Green' (fresh fruit/juice shop, Eastpoint Mall, Simei), closed in 2023; the only currently-active 'Soulgreen' brand online is an unrelated UAE supplement line (soulgreen.ae). No menu/pricing/nutrition data exists to research. Flipped to status: 'researched' with zero MenuItems (a legitimate terminal state — see PHASE 1 step 5's 'no fixed physical presence' escape hatch in platescreen-research-grocery's task design) specifically to stop this entry from permanently blocking the grocery-track queue: it was the sole medium-priority grab_go/ready_to_eat/supermarket entry, so the scheduled task's deterministic priority-first selection was picking it every single run and wasting the entire day's research cycle on a re-confirmation of the same closed business. If Soulgreen ever reopens or relaunches in Singapore, revert this to 'pending' and re-research from scratch."
  },
  {
    id: "ichiban_boshi",
    name: "Ichiban Boshi",
    aliases: [
      "ichiban boshi",
      "ichiban"
    ],
    type: "restaurant",
    cuisine: "Japanese",
    priority: "medium",
    status: "researched",
    notes: "Researched 2026-08-20: no official SG nutrition PDF/HPB entry found for this full-service Japanese restaurant chain (RE&S group) — HPB's Nutrition Information Centre does not cover it. 10 representative items added across Donburi/Jyu/Udon/Salad/Bento Sides categories (chicken katsu don, chicken teriyaki don, beef teriyaki don, black pepper salmon don, unajyu, salmon sashimi salad, tori karaage, tempura udon, chirashi jyu, edamame), prices sourced from sgmenuprice.net menu listing (Feb 2024, cross-checked against pricelisto.com). Macros are reasoned estimates from close analogs (typical Japanese-restaurant donburi/udon/sashimi nutrition profiles) — confidence 'estimated' for all except edamame ('community', generic single-ingredient value). Outlet confirmed NOT halal-certified per source article, so dietTags left empty rather than guessed; compatibleWith only tags pescatarian/gluten_free/vegan/etc. where confirmable from dish composition (e.g. fish-only dishes, plain edamame). No SFA lookup — type is 'restaurant', not hawker/food_court_stall. Note for human review: unrelated to this entry, spotted that 'saizeriya' (still flagged 'pending' in this queue) already has a matching id present in outlets.ts — looks like a stale queue status from an earlier run, left untouched as out of scope for this task."
  },
  {
    id: "saizeriya",
    name: "Saizeriya",
    aliases: [
      "saizeriya"
    ],
    type: "restaurant",
    cuisine: "Italian / Japanese",
    priority: "medium",
    status: "researched",
    notes: "Researched 2026-08-21: Brand already existed in brands.ts with 9 MenuItems from a prior run — this queue entry's 'pending' status was stale (flagged by the katsu-don session on 2026-08-20, see note on that entry). Confirmed the official SG menu PDF (saizeriya.com.sg/menu, GrandMenu202603S_single.pdf, dated 2026-03) has no nutrition/macro data, only dish names and SGD prices — the old 'nutrition PDF on website' note was inaccurate. Added 4 more MenuItems (Milano Doria, Hamburger, Arugula Chicken Salad, Sautéed Spinach with Bacon) verified against the current official SG menu for names/prices; macros are 'estimated' from the closest available analog — same-chain Japan menu data via kalori.jp (itself partly AI-estimated) — since no Singapore-specific macro source exists. Brought total to 13 items. No SFA lookup — type is 'restaurant', Brand already existed, Phase 3 skipped per instructions."
  },
  {
    id: "gen_korean_bbq",
    name: "Gen Korean BBQ",
    aliases: [
      "gen korean bbq",
      "gen bbq"
    ],
    type: "restaurant",
    cuisine: "Korean BBQ",
    priority: "low",
    status: "pending"
  },
  {
    id: "tgi_fridays",
    name: "TGI Fridays",
    aliases: [
      "tgi fridays",
      "tgif"
    ],
    type: "restaurant",
    cuisine: "Western",
    priority: "low",
    status: "pending"
  },
  {
    id: "eighteen_chefs",
    name: "Eighteen Chefs",
    aliases: [
      "eighteen chefs",
      "18 chefs"
    ],
    type: "restaurant",
    cuisine: "Western",
    priority: "low",
    status: "pending"
  },
  {
    id: "commonwealth_crescent_market_ang_foo_lui",
    name: "Ang Foo Lui",
    aliases: ["ang foo lui"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "CW3079002",
    notes: "Closed out 2026-08-22 after 4 consecutive dead-end automated research runs (2026-08-22 x3, plus earlier) — the SFA licensee is a personal name with no findable menu, reviews, or web presence under 'Ang Foo Lui' or the licence number. Flipping to 'researched' (not 'found data') so this stops permanently blocking the restaurant research queue, matching the fix already applied to 'soulgreen'. Re-open if a future pass finds a lead (e.g. via a Google Maps listing at the exact stall address, which resolved the analogous Tekka Market generic-name problem)."
  },
  {
    id: "new_upper_changi_road_blk_58_lee_len_tong",
    name: "Lee Len Tong",
    aliases: ["lee len tong"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NC101171001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: New Upper Changi Road Blk 58) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "bedok_south_road_blk_16_goh_poo_huat",
    name: "Goh Poo Huat",
    aliases: ["goh poo huat"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "BS20103002",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok South Road Blk 16) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "bedok_south_road_blk_16_kwek_ah_heoh",
    name: "Kwek Ah Heoh",
    aliases: ["kwek ah heoh"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "BS20134003",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok South Road Blk 16) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "clementi_ave_3_blk_448_lee_guat_hoon",
    name: "Lee Guat Hoon",
    aliases: ["lee guat hoon"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "CL30122001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Clementi Ave 3 Blk 448) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 1 MenuItem (Kopi) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality."
  },
  {
    id: "clementi_ave_3_blk_448_lee_jim_pong",
    name: "Lee Jim Pong",
    aliases: ["lee jim pong"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "CL30142001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Clementi Ave 3 Blk 448) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "eunos_crescent_blk_4a_teo_kiang_huat",
    name: "Teo Kiang Huat",
    aliases: ["teo kiang huat"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "EU10123002",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Eunos Crescent Blk 4A) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "eunos_crescent_blk_4a_tiong_lee_lim",
    name: "Tiong Lee Lim",
    aliases: ["tiong lee lim"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "EU10135002",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Eunos Crescent Blk 4A) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 2 MenuItems (Soya Bean Drink, Tau Huay) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality."
  },
  {
    id: "ayer_rajah_food_centre_big_bern_s_american_grill_xpolis_pte_ltd",
    name: "Big Bern'S American Grill Xpolis Pte. Ltd.",
    aliases: ["big bern's american grill xpolis pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "SW16636X000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Ayer Rajah Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 1 MenuItem (Big Bern's Cheese Burger) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality. Also flagging: this Brand's name still carries the raw SFA licensee-entity suffix ('Xpolis Pte. Ltd.') rather than a clean trading name, matching the corporate-name pattern CLAUDE.md section 6 says to check for — worth a rename pass to just 'Big Bern's American Grill', separate from this status fix."
  },
  {
    id: "tanglin_halt_market_lim_hang_tong",
    name: "Lim Hang Tong",
    aliases: ["lim hang tong"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "TTM012001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Tanglin Halt Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "tanglin_halt_market_ngern_jwee_chye",
    name: "Ngern Jwee Chye",
    aliases: ["ngern jwee chye"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "TTM020001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Tanglin Halt Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "mei_chin_road_market_goh_jee_tee",
    name: "Goh Jee Tee",
    aliases: ["goh jee tee"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "MC10223002",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Mei Chin Road Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 1 MenuItem (Chicken Rice) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality. Note there is a separate, still-pending 'mei_chin_road_market_goh_jee_tee_2' entry (a distinct SFA licence/stall at the same market, do not confuse the two)."
  },
  {
    id: "mei_chin_road_market_goh_jee_tee_2",
    name: "Goh Jee Tee",
    aliases: ["goh jee tee"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "MC10222002",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Mei Chin Road Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "mei_chin_road_market_lee_kee_yeo_lee_lian_hong",
    name: "Lee Kee Yeo @Lee Lian Hong",
    aliases: ["lee kee yeo @lee lian hong"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "MC10209001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Mei Chin Road Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "new_upper_changi_road_blk_208b_au_jiahao_alex",
    name: "Au Jiahao, Alex",
    aliases: ["au jiahao, alex"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NUC0152001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: New Upper Changi Road Blk 208B) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "new_upper_changi_road_blk_208b_chan_cheow_teck",
    name: "Chan Cheow Teck",
    aliases: ["chan cheow teck"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NUC0159001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: New Upper Changi Road Blk 208B) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "new_upper_changi_road_blk_208b_chan_kok_hee_tian_guoxi",
    name: "Chan Kok Hee (Tian Guoxi)",
    aliases: ["chan kok hee (tian guoxi)"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NUC0118001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: New Upper Changi Road Blk 208B) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kukoh_21_food_centre_ntuc_foodfare_co_operative_ltd",
    name: "Ntuc Foodfare Co-Operative Ltd",
    aliases: ["ntuc foodfare co-operative ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "JK10107004",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kukoh 21 Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "telok_ayer_food_centre_e_p_cafeteria_pte_ltd",
    name: "E&P Cafeteria Pte. Ltd.",
    aliases: ["e&p cafeteria pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "CE09009X007",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Telok Ayer Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "telok_ayer_food_centre_jex_pte_ltd",
    name: "Jex Pte. Ltd.",
    aliases: ["jex pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "CE09009X004",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Telok Ayer Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "yuhua_village_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "C87179N000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Yuhua Village Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "pasir_ris_central_hawker_centre_bee_cheng_hiang_concept_pte_ltd",
    name: "Bee Cheng Hiang Concept Pte. Ltd.",
    aliases: ["bee cheng hiang concept pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "NE15392J000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Pasir Ris Central Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 1 MenuItem (Sliced Bak Kwa 100g) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality."
  },
  {
    id: "pasir_ris_central_hawker_centre_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    aliases: ["bengawan solo pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "NE15483C000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Pasir Ris Central Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 1 MenuItem (Kueh Lapis) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality. Note there's a real, standalone 'bengawan_solo' chain Brand elsewhere in brands.ts, plus this same per-location duplicate-naming pattern repeats at bedok_north_street_1_blk_216 and hougang_105_hainanese_village_centre — a future Brand-merge pass (same shape as the McDonald's/Anchorvale precedent in premises.ts) should consider consolidating these into the chain Brand as extra Premises rows rather than leaving them as separate single-item Brand rows."
  },
  {
    id: "tampines_round_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S87199A000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Tampines Round Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "tampines_round_market_and_food_centre_kentucky_fried_chicken_management_pte_ltd",
    name: "Kentucky Fried Chicken Management Pte Ltd",
    aliases: ["kentucky fried chicken management pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S84212A000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Tampines Round Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "tampines_round_market_and_food_centre_pizza_hut_singapore_pte_ltd",
    name: "Pizza Hut Singapore Pte Ltd",
    aliases: ["pizza hut singapore pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S94171C000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Tampines Round Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "teban_gardens_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SW05021V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Teban Gardens Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "teban_gardens_market_and_food_centre_barakath_international_pte_ltd",
    name: "Barakath International Pte Ltd",
    aliases: ["barakath international pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "low",
    status: "pending",
    sfaLicenceNo: "SW04164A000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Teban Gardens Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "telok_blangah_market_al_borgo_pte_ltd",
    name: "Al Borgo Pte. Ltd.",
    aliases: ["al borgo pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SW13S15J000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Telok Blangah Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "telok_blangah_market_ntuc_foodfare_co_operative_ltd",
    name: "Ntuc Foodfare Co-Operative Ltd",
    aliases: ["ntuc foodfare co-operative ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "TB20129003",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Telok Blangah Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd",
    name: "Chang Cheng Food Paradise Pte. Ltd.",
    aliases: ["chang cheng food paradise pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S69025P005",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Toa Payoh West Market and Food Court) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "toa_payoh_lorong_4_blk_93_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    aliases: ["mcdonald's restaurants pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "CE04248K000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Toa Payoh Lorong 4 Blk 93) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "toa_payoh_lorong_4_blk_93_pizza_hut_singapore_pte_ltd",
    name: "Pizza Hut Singapore Pte Ltd",
    aliases: ["pizza hut singapore pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "CE11L67N000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Toa Payoh Lorong 4 Blk 93) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kim_keat_palm_market_and_food_centre_chang_lai_pte_ltd",
    name: "Chang Lai Pte. Ltd.",
    aliases: ["chang lai pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S86238C000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kim Keat Palm Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "chong_boon_market_and_food_centre_cheers_holdings_2004_pte_ltd",
    name: "Cheers Holdings (2004) Pte. Ltd.",
    aliases: ["cheers holdings (2004) pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "B01026K000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Chong Boon Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "chong_boon_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S84202V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Chong Boon Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_cheers_holdings_2004_pte_ltd",
    name: "Cheers Holdings (2004) Pte. Ltd.",
    aliases: ["cheers holdings (2004) pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "B01026K000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Cheng San Market and Cooked Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "cheng_san_market_and_cooked_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S84202V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Cheng San Market and Cooked Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "mayflower_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "B00030C000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Mayflower Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "mayflower_market_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    aliases: ["mcdonald's restaurants pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "B81055C000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Mayflower Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "ang_mo_kio_628_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "B00030C000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Ang Mo Kio 628 Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "ang_mo_kio_628_market_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    aliases: ["mcdonald's restaurants pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "B81055C000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Ang Mo Kio 628 Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "blk_724_ang_mo_kio_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "CE06785V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Blk 724 Ang Mo Kio Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "bedok_north_street_1_blk_216_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    aliases: ["bengawan solo pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "SE06081N000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok North Street 1 Blk 216) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 1 MenuItem (Kueh Lapis) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality. Same chain-duplicate pattern flagged on the Pasir Ris Central Bengawan Solo entry applies here too."
  },
  {
    id: "bedok_north_street_1_blk_216_domino_s_pizza_singapore_pte_ltd",
    name: "Domino'S Pizza Singapore Pte. Ltd.",
    aliases: ["domino's pizza singapore pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "SE10859A000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok North Street 1 Blk 216) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 1 MenuItem (Pepperoni Pizza) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality. There's also a standalone 'dominos' chain Brand elsewhere in brands.ts and a second per-location duplicate (ayer_rajah_market_domino_s_pizza_singapore_pte_ltd, still pending) — flagging for the same future Brand-merge pass as the McDonald's/Bengawan Solo entries."
  },
  {
    id: "bedok_north_street_1_blk_216_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    aliases: ["mcdonald's restaurants pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "E87123B000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok North Street 1 Blk 216) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-08-31: status was stale — this Brand already has 1 MenuItem (Big Mac) in menuItems.ts from earlier, untracked work; found during a queue audit this run (see the 'kopitiam' entry's 2026-08-31 update for the audit context). No new research done this run; just correcting status to match reality. This is the exact same duplicate-Brand pattern already identified and partly fixed for 'mcd_anchorvale_village_hawker_centre' (see premises.ts history) — this project's real McDonald's chain Brand is 'mcd'; this row and 2 other per-location McDonald's duplicates still pending (toa_payoh_lorong_4_blk_93_mcdonald_s_restaurants_pte_ltd, mayflower_market_mcdonald_s_restaurants_pte_ltd, ang_mo_kio_628_market_mcdonald_s_restaurants_pte_ltd) should be reassigned as Premises rows under 'mcd' in a future dedicated cleanup pass, not researched as separate Brands."
  },
  {
    id: "bedok_north_street_1_blk_216_ntuc_club",
    name: "Ntuc Club",
    aliases: ["ntuc club"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SE10030J000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok North Street 1 Blk 216) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kaki_bukit_511_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SE10593N000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kaki Bukit 511 Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "bedok_north_street_3_blk_538_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SE10593N000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok North Street 3 Blk 538) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "85_fengshan_centre_bangkok_street_mookata_pte_ltd",
    name: "Bangkok Street Mookata Pte. Ltd.",
    aliases: ["bangkok street mookata pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "E84169N004",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: 85 Fengshan Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "85_fengshan_centre_fortune_food_s_pte_ltd",
    name: "Fortune Food (S) Pte. Ltd.",
    aliases: ["fortune food (s) pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SE13U92X000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: 85 Fengshan Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "85_fengshan_centre_j_k_kings_prata_pte_ltd",
    name: "J K Kings Prata Pte. Ltd.",
    aliases: ["j k kings prata pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "E02200B000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: 85 Fengshan Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "85_fengshan_centre_wonderful_management_pte_ltd",
    name: "Wonderful Management Pte. Ltd.",
    aliases: ["wonderful management pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "E84169N008",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: 85 Fengshan Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "clementi_west_street_2_blk_726_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SW07D90K000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Clementi West Street 2 Blk 726) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "clementi_west_street_2_blk_726_new_century_food_house_721_pte_ltd",
    name: "New Century Food House @ 721 Pte. Ltd.",
    aliases: ["new century food house @ 721 pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "C01040J008",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Clementi West Street 2 Blk 726) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kovan_hougang_market_and_food_centre_alpha_subs_pte_ltd",
    name: "Alpha Subs Pte. Ltd.",
    aliases: ["alpha subs pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE12K25X000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kovan Hougang Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kovan_hougang_market_and_food_centre_berrylite_parkway_pte_ltd",
    name: "Berrylite Parkway Pte. Ltd.",
    aliases: ["berrylite parkway pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S01002P000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kovan Hougang Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kovan_hougang_market_and_food_centre_bliss_restaurant_pte_ltd",
    name: "Bliss Restaurant Pte. Ltd.",
    aliases: ["bliss restaurant pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE05038C000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kovan Hougang Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kovan_hougang_market_and_food_centre_breadtalk_pte_ltd",
    name: "Breadtalk Pte Ltd",
    aliases: ["breadtalk pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE10003L000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kovan Hougang Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kovan_hougang_market_and_food_centre_chong_yo_private_limited",
    name: "Chong Yo Private Limited",
    aliases: ["chong yo private limited"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE05031X000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kovan Hougang Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "kovan_hougang_market_and_food_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "S84022N000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Kovan Hougang Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "hougang_105_hainanese_village_centre_anytime_food_pte_ltd",
    name: "Anytime Food Pte. Ltd.",
    aliases: ["anytime food pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE06194X000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Hougang 105 Hainanese Village Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd",
    name: "Bachmann Japanese Restaurant Pte Ltd",
    aliases: ["bachmann japanese restaurant pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE15028V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Hougang 105 Hainanese Village Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "hougang_105_hainanese_village_centre_bengawan_solo_pte_ltd",
    name: "Bengawan Solo Pte Ltd",
    aliases: ["bengawan solo pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE05145A000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Hougang 105 Hainanese Village Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "hougang_105_hainanese_village_centre_breadtalk_pte_ltd",
    name: "Breadtalk Pte Ltd",
    aliases: ["breadtalk pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE12G58B000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Hougang 105 Hainanese Village Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "jurong_west_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SW04171B000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Jurong West Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "jurong_west_hawker_centre_golden_rooster_pte_ltd",
    name: "Golden Rooster Pte. Ltd.",
    aliases: ["golden rooster pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SW04150L001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Jurong West Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd",
    name: "Boon Tong Kee Pte Ltd",
    aliases: ["boon tong kee pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SW14705V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Yuhua Market and Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "toa_payoh_lorong_8_blk_210_jnr_food_pte_ltd",
    name: "Jnr Food Pte. Ltd.",
    aliases: ["jnr food pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "E75023P005",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Toa Payoh Lorong 8 Blk 210) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "toa_payoh_lorong_8_blk_210_lee_kwang_kee_groups_pte_ltd",
    name: "Lee Kwang Kee Groups Pte. Ltd.",
    aliases: ["lee kwang kee groups pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "E75024N002",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Toa Payoh Lorong 8 Blk 210) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "ayer_rajah_market_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "C97068A000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Ayer Rajah Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "ayer_rajah_market_domino_s_pizza_singapore_pte_ltd",
    name: "Domino'S Pizza Singapore Pte. Ltd.",
    aliases: ["domino's pizza singapore pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "SW11864P000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Ayer Rajah Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "ayer_rajah_market_fei_siong_f_b_holdings_pte_ltd",
    name: "Fei Siong (F&B) Holdings Pte. Ltd.",
    aliases: ["fei siong (f&b) holdings pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "C82227L005",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Ayer Rajah Market) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "anchorvale_village_hawker_centre_commonwealth_retail_concepts_pte_ltd",
    name: "Commonwealth Retail Concepts Pte. Ltd.",
    aliases: ["commonwealth retail concepts pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "CE08M49K000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Anchorvale Village Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "anchorvale_village_hawker_centre_mcdonald_s_restaurants_pte_ltd",
    name: "Mcdonald'S Restaurants Pte. Ltd.",
    aliases: ["mcdonald's restaurants pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "CE09078N000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Anchorvale Village Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "one_punggol_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE11871V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: One Punggol Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "one_punggol_hawker_centre_haji_karim_prata_palace_pte_ltd",
    name: "Haji Karim Prata Palace Pte. Ltd.",
    aliases: ["haji karim prata palace pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "low",
    status: "pending",
    sfaLicenceNo: "NE04163C009",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: One Punggol Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "punggol_coast_hawker_centre_cold_storage_singapore_1983_pte_ltd",
    name: "Cold Storage Singapore (1983) Pte Ltd",
    aliases: ["cold storage singapore (1983) pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "pending",
    sfaLicenceNo: "NE16140N000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Punggol Coast Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "punggol_coast_hawker_centre_srisun_prata_com_food_holding_s_pte_ltd",
    name: "Srisun Prata . Com Food Holding'S Pte. Ltd.",
    aliases: ["srisun prata . com food holding's pte. ltd."],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "low",
    status: "pending",
    sfaLicenceNo: "NE15407E009",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Punggol Coast Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet."
  },
  {
    id: "tai_wah_pork_noodle",
    name: "Tai Wah Pork Noodles",
    aliases: [
      "tai wah pork noodles"
    ],
    type: "food_court_stall",
    cuisine: "Teochew Noodles",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 5 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "tiong_bahru_chicken_rice_hws",
    name: "Tiong Bahru Hainanese Chicken Rice",
    aliases: [
      "tiong bahru hainanese chicken rice"
    ],
    type: "food_court_stall",
    cuisine: "Hainanese Chicken Rice",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 2 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "jason_penang_cuisine",
    name: "Jason Penang Cuisine",
    aliases: [
      "jason penang cuisine"
    ],
    type: "food_court_stall",
    cuisine: "Penang / Malaysian",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 2 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "tai_seng_fish_soup",
    name: "Tai Seng Fish Soup",
    aliases: [
      "tai seng fish soup"
    ],
    type: "food_court_stall",
    cuisine: "Fish Soup",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 4 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "chef_wei_hk_cheong_fun",
    name: "Chef Wei HK Cheong Fun",
    aliases: [
      "chef wei hk cheong fun"
    ],
    type: "food_court_stall",
    cuisine: "Hong Kong / Cheong Fun",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 3 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "king_of_fried_rice_hws",
    name: "King of Fried Rice",
    aliases: [
      "king of fried rice"
    ],
    type: "food_court_stall",
    cuisine: "Fried Rice",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 3 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "hill_street_coffee_shop",
    name: "Hill Street Coffee Shop",
    aliases: [
      "hill street coffee shop"
    ],
    type: "food_court_stall",
    cuisine: "Coffeeshop / Kopi",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 4 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "pangs_hakka_ytf",
    name: "Pang's Hakka Yong Tau Foo",
    aliases: [
      "pang's hakka yong tau foo"
    ],
    type: "food_court_stall",
    cuisine: "Hakka",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 4 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "hill_street_hainanese_curry_rice",
    name: "Hill Street Hainanese Curry Rice",
    aliases: [
      "hill street hainanese curry rice"
    ],
    type: "food_court_stall",
    cuisine: "Hainanese Curry Rice",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 4 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "famous_eunos_bak_chor_mee",
    name: "Famous Eunos Bak Chor Mee",
    aliases: [
      "famous eunos bak chor mee"
    ],
    type: "food_court_stall",
    cuisine: "Bak Chor Mee",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "jiak_song_mee_hoon_kway",
    name: "Jiak Song Mee Hoon Kway",
    aliases: [
      "jiak song mee hoon kway"
    ],
    type: "food_court_stall",
    cuisine: "Mee Hoon Kway",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 3 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "ramen_king_hws",
    name: "Ramen King",
    aliases: [
      "ramen king"
    ],
    type: "food_court_stall",
    cuisine: "Japanese Ramen",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 2 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "beach_road_scissor_cut_curry_rice",
    name: "Beach Road Scissor-Cut Curry Rice",
    aliases: [
      "beach road scissor-cut curry rice"
    ],
    type: "food_court_stall",
    cuisine: "Curry Rice",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 2 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "koungs_wan_tan_mee",
    name: "Koung's Wan Tan Mee",
    aliases: [
      "koung's wan tan mee"
    ],
    type: "food_court_stall",
    cuisine: "Wanton Mee",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 2 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "old_teochew_satay_beehoon",
    name: "Old Teochew Satay Bee Hoon & Mee Siam",
    aliases: [
      "old teochew satay bee hoon & mee siam"
    ],
    type: "food_court_stall",
    cuisine: "Teochew",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 3 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "kaki_makan",
    name: "Kaki Makan",
    aliases: [
      "kaki makan"
    ],
    type: "food_court_stall",
    cuisine: "Halal Local",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "thai_makan_by_thai_dynasty",
    name: "Thai Makan by Thai Dynasty",
    aliases: [
      "thai makan by thai dynasty"
    ],
    type: "food_court_stall",
    cuisine: "Halal Thai",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "raja_wok",
    name: "Raja Wok",
    aliases: [
      "raja wok"
    ],
    type: "food_court_stall",
    cuisine: "Halal Fried Rice",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "waker_chicken",
    name: "Waker Chicken",
    aliases: [
      "waker chicken"
    ],
    type: "food_court_stall",
    cuisine: "Korean Fried Chicken",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "loong_kee_yong_tau_fu",
    name: "Loong Kee Yong Tau Fu",
    aliases: [
      "loong kee yong tau fu"
    ],
    type: "food_court_stall",
    cuisine: "Yong Tau Fu",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 2 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "fei_fei_roasted_noodle",
    name: "Fei Fei Roasted Noodle",
    aliases: [
      "fei fei roasted noodle"
    ],
    type: "food_court_stall",
    cuisine: "Roasted Meats / Noodles",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 3 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "top_1_home_made_noodle",
    name: "Top 1 Home Made Noodle",
    aliases: [
      "top 1 home made noodle"
    ],
    type: "food_court_stall",
    cuisine: "Ban Mian / Noodles",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "nikmat_nasi_lemak_husk",
    name: "Nikmat Nasi Lemak by Husk",
    aliases: [
      "nikmat nasi lemak by husk"
    ],
    type: "food_court_stall",
    cuisine: "Nasi Lemak",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "pondok_indah_nasi_padang",
    name: "Pondok Indah Indonesian Nasi Padang",
    aliases: [
      "pondok indah indonesian nasi padang"
    ],
    type: "food_court_stall",
    cuisine: "Nasi Padang",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "fire_western_n_grill",
    name: "Fire Western 'N' Grill",
    aliases: [
      "fire western 'n' grill"
    ],
    type: "food_court_stall",
    cuisine: "Western",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "nam_sing_hokkien_mee",
    name: "Nam Sing Hokkien Mee",
    aliases: [
      "nam sing hokkien mee"
    ],
    type: "food_court_stall",
    cuisine: "Hokkien Mee",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "garden_street_kway_chap",
    name: "Garden Street Kway Chap",
    aliases: [
      "garden street kway chap"
    ],
    type: "food_court_stall",
    cuisine: "Kway Chap",
    priority: "medium",
    status: "pending",
    notes: "Outlet row already exists (Brand + 1 Premises added from hawkersstreet.com.sg/brands/, 2026-08-21) — only menu items/macros (MenuItem records) are needed. hawkersstreet.com.sg's own brand page has a description and signature-dish mentions that can anchor research, but no prices/macros — verify independently, don't infer macros from the marketing copy alone."
  },
  {
    id: "food_junction",
    name: "Food Junction",
    aliases: [
      "food junction",
      "the food market",
      "the food place"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "medium",
    status: "pending",
    notes: "2026-08-23: new Operator (BreadTalk Group's food-court chain, foodjunction.com) added per user request to cover food-court operators beyond Kopitiam/Koufu/Foodfare/Hawkers' Street. Its /outlets/ page is a plain static list of 8 Singapore venues (Labrador Tower, Century Square [as 'The Food Market'], Great World, Junction 8, Lot One, NEX, Rivervale Mall, Westgate) plus 1 in Malaysia (excluded). Its /our-brands/ page directly names 4 house-brand concessions with their dish highlights AND which specific venues each is at: Go Teppan Go (NEX, Junction 8, Century Square, Raffles City — this last venue isn't on the /outlets/ list at all, a gap in their own site), Toast Junction (NEX, Rivervale Mall, Great World, Century Square), Ke/Quench (Junction 8), Fireyaki (venue tag missing from the source page for this one brand only — confirmed via foodpanda instead: Junction 8). Added all 4 as Brand rows with operatorId: 'food_junction', 10 premises total, real addresses geocoded via OneMap ('Raffles City' used the mall's general address since no specific unit was published). Remaining work: the site's own outlets almost certainly have other, non-house-brand named concessions inside them (same situation as Kopitiam before its stall-sitemap breakthrough) — no equivalent bulk data source found yet for Food Junction; would need per-venue research (Google Maps/on-site) rather than another lucky sitemap. Same macro gap as Kopitiam/Koufu applies — no MenuItems added."
  },
  {
    id: "fei_siong",
    name: "Fei Siong Group",
    aliases: [
      "fei siong",
      "fei siong group",
      "fei siong social enterprise",
      "fsse"
    ],
    type: "food_court",
    cuisine: "Hawker Centre",
    priority: "medium",
    status: "pending",
    notes: "2026-08-23: new Operator added per user request. Fei Siong Group (feisionggroup.com.sg) turns out to also be the operator behind Hawkers' Street (already in this database as its own operator — not merged, since Hawkers' Street already has an established brand identity and 27 correctly-modeled stalls; treat as a sibling operator, not a rename). Fei Siong runs 3 more hawker centres, each with its own dedicated site: Ci Yuan Hawker Centre (ciyuanhawker.com.sg) — real success: its /our-stalls/ page is a plain Elementor-built list of all 38 stalls with unit number, English/Chinese name, cuisine tag, and hours; added 37 as Brand rows with operatorId: 'fei_siong' (dropped one bare 'Hot & Cold Drink Stall' generic per the same no-value-generic rule used for Kopitiam), all at the single Ci Yuan address (51 Hougang Ave 9, Singapore 538776) with per-unit addresses, geocoded once for the building. Woodleigh Village Hawker Centre (woodleighhawker.com.sg) — checked, genuinely nothing to add: the site itself says 'Our stall application period has closed. We will post future stall availability information here' — it hasn't opened yet, not a research gap. Buangkok Hawker Centre (buangkokhawker.com.sg) — returned a consistent HTTP 500 (empty body) across multiple retries with different headers; doesn't look like a WAF block (no challenge page), more likely a real server-side issue on their end — worth a retry in a future session rather than guessing content. Same macro gap as Kopitiam/Koufu applies — no MenuItems added for Ci Yuan's 37 stalls yet."
  },
  {
    id: "bukit_canberra_hawker_centre",
    name: "Bukit Canberra Hawker Centre",
    aliases: [
      "bukit canberra hawker centre",
      "bukit canberra"
    ],
    type: "hawker",
    cuisine: "Hawker Centre",
    priority: "medium",
    status: "pending",
    notes: "2026-08-23: added per direct user request to apply the sitemap-discovery technique to independent NEA hawker centres, not just food-court chains. This venue already existed in premises.ts with 6 generic SFA-sourced stalls; its operator, Canopy Hawkers Group, runs its own site (bukitcanberrahc.sg, WordPress) whose 'portfolio_page' custom-post sitemap lists all 44 stalls as individual pages. Each page's <title> tag carries the real trading name; the URL slug is a stale cuisine-category label from when the post was first created and several no longer match the current tenant (e.g. slug 'porridge' -> title 'Teochew Fish Soup', slug 'indian-rojak' -> title 'Hock Kee Teochew Noodle', slug 'mixed-vegetarian-rice' -> title 'Al-usroh') — cuisine text and dietTags (halal/vegetarian) were derived from the stall's own name/title where the slug conflicted, not blindly trusted from the slug, to avoid mislabeling (especially diet claims). New Operator 'canopy_hawkers' added. 41 real Brand rows (2 'Coming Soon' units excluded), 42 Premises rows (Kopi Tan runs 2 adjacent units, #01-22 and #01-23) — all at 21 Canberra Link, Singapore 756973, geocoded once for the building with per-unit addresses. Same macro gap as every other batch — no MenuItems added yet."
  },
  {
    id: "yishun_park_hawker_centre",
    name: "Yishun Park Hawker Centre",
    aliases: [
      "yishun park hawker centre",
      "yishun park"
    ],
    type: "hawker",
    cuisine: "Hawker Centre",
    priority: "medium",
    status: "pending",
    notes: "2026-08-23: same pass as Bukit Canberra. This venue already existed in premises.ts with 6 generic SFA-sourced stalls; its own site (yishunparkhc.sg, WordPress) has a 'hawkers' custom-post sitemap listing 34 stall pages. Unlike Bukit Canberra, 9 of those slugs cleanly 302-redirect to the homepage instead of serving stale content — read as retired/renamed stalls and excluded rather than guessed (no content-mismatch risk here, WordPress is doing the right thing by redirecting unpublished posts). The remaining 25 pages each have a real trading name plus a 'name / cuisine / #unit' block in the page body (cuisine phrasing here is the operator's own, not slug-derived, so trusted directly — no equivalent mismatch problem as Bukit Canberra). New Operator 'timbre_plus_hawkers' added rather than reusing 'canopy_hawkers': the site's own branding throughout is Timbre+ Hawkers Pte Ltd (nav says 'Timbre App', footer contact is @timbregroup.asia) even though news coverage reports Canopy Hawkers Group taking over operations from Jul 2026 — sourced what the site itself says rather than the reported handover; worth revisiting if/when the site itself updates. 25 real Brand rows, 27 Premises rows (XinLongXing Modern Tze Char spans 3 adjacent units, #01-28/29/30) — all at 51 Yishun Avenue 11, Singapore 768867, geocoded once for the building with per-unit addresses. One Punggol Hawker Centre (onepunggolhc.sg), also ex-Timbre+ with the same sitemap pattern (31 stall slugs), was NOT completed — every individual stall page inconsistently 302-redirects to its homepage regardless of headers/cookies/referer tried (one attempt with a test cookie returned 200 once, but was not reproducible on retry) — flagged for a future attempt, possibly via browser automation instead of raw curl. Same macro gap as every other batch — no MenuItems added yet."
  },
  {
    id: "mccafe_colocation_research",
    name: "McCafe",
    aliases: [
      "mccafe",
      "mc cafe"
    ],
    type: "grab_go",
    cuisine: "Cafe / Coffee",
    priority: "medium",
    status: "pending",
    notes: "2026-08-24 (address-accuracy audit): the `mccafe` Brand already exists with 10 real MenuItems, but its only Premises row (`mccafe_p19`) was a legacy 'Multiple outlets islandwide' placeholder with no real address — removed rather than left misleading, since a single address can't represent a co-located concept. McCafe is real (WebSearch: ~43-46 of McDonald's 136 Singapore outlets have a McCafe corner), but which specific outlets is unconfirmed — needs per-outlet research (McDonald's own site or a McCafe-specific store list) to identify the actual subset before adding real Premises rows. Until then McCafe has 0 premises and won't appear as a location in the app, even though its menu data is real and ready. UPDATE 2026-08-30 (picked deterministically as the top pending grab_go/ready_to_eat/supermarket entry by priority): the 'find the ~43-46 outlet subset' premise this entry was written on turns out to conflict with McDonald's own current official site. www.mcdonalds.com.sg/mccafe (fetched live) states outright 'Available at all restaurants islandwide' directly under its McCafé beverage lineup (Americano/Iced Americano/Latte/Iced Latte/Cappuccino) — no subset language, no per-outlet locator or McCafe filter on their store locator. The ~43-46 figure traces only to third-party aggregator blogs (mcdonaldsmenu.sg-style sites, unaffiliated per their own disclaimer, and older SmartLocal/AllSGPromo pieces) with no verifiable outlet-by-outlet source list, and no two of them agree on a number (one said 'over 50 McCafé outlets' in the same breath as '43 locations'). Attempted the official mcdonalds.com.sg/locate-us page directly via browser to check for a McCafe-specific filter tag per outlet — navigation was blocked/denied at the browser level, could not load it interactively. Given: (a) the brand's own current site claims full islandwide availability, contradicting the queue's founding premise that this is a subset-of-outlets problem, and (b) no credible, individually-verifiable outlet list exists to sample-check against (unlike the SFA Business Name matching that resolved the analogous cold_storage/giant/7eleven ambiguity), adding a hand-picked list of 5-10 outlets sourced from blog mentions ('Bishan Park', 'Bukit Batok', 'Canberra Plaza', etc.) would repeat exactly the kind of unverifiable-source fabrication this project's rules exist to prevent. Per the same 'needs a human decision, not a guess' pattern already used for the Foodfare institutional-catering scope question: NOT resolving this myself. Two real options for a human to pick: (a) treat McCafé as available at all 136 existing `mcdonalds` Brand Premises per the official site's own claim, and either drop the standalone `mccafe` Brand/Premises concept entirely (fold its 10 MenuItems into `mcdonalds` as a beverage category) or copy all 136 `mcdonalds` Premises rows as `mccafe` Premises too; or (b) keep pursuing a true subset if there's reason to distrust the 'islandwide' marketing copy (e.g. it may describe menu/ordering availability via app/kiosk rather than a physical in-store McCafé service corner, which is a real distinction McDonald's has drawn in some markets). No Brand/MenuItem/GroceryProduct/Premises files touched this run. Left 'pending'. Per this run's task design, no fallback entry was picked in its place this run — see session report reference/research-sessions/2026-08-30-mccafe-colocation.md. UPDATE 2026-08-31 (picked deterministically again, top pending grab_go/ready_to_eat/supermarket entry by priority): found the piece that actually explains the 2026-08-30 conflict, via McDonald's SG's own Help Center (custcare.mcdonalds.com.sg), articles 'Will McCafé be removed in McDonald's islandwide?', 'Is McCafé removed from McDonald's islandwide?', and 'Why is the McCafé I visit regularly being removed? Can I still get my McCafé beverages and food items from the main counter?' (article bodies are JS-rendered behind Zendesk and didn't return via direct fetch or in-app browser — mcdonalds.com.sg is nav-blocked for this session same as 2026-08-30 — but a targeted WebSearch surfaced their substance): from 27 March 2026, McDonald's Singapore stopped serving barista-made McCafé beverages islandwide, removing the dedicated McCafé service-counter concept entirely, while select beverages (cited: Premium Roast Coffee, Americano, Latte, Cappuccino, Frappe) continue to be served from the main counter at every restaurant. This resolves the empirical half of the 2026-08-30 conflict: the ~43-46-outlet 'McCafé corner' figure that third-party blogs kept citing wasn't wrong so much as describing a service model this chain retired — there is no longer a physical subset to find, because the barista corners it would have described don't exist anymore anywhere. Re-fetched www.mcdonalds.com.sg/mccafe live today (content dated Aug 2026, current seasonal promo running) and it still states 'Available at all restaurants islandwide' directly under the beverage lineup, consistent with (not contradicted by) the post-counter-removal model. Also note in passing, NOT acted on: the live page's current core lineup is Americano/Iced Americano/Latte/Iced Latte/Cappuccino only — no Mocha or Frappe — while this project's existing 10 mccafe MenuItems include mccafe_mocha, mccafe_frappe_mocha, and mccafe_frappe_caramel; possibly discontinued along with the barista counters (Frappe/Mocha are typically the more prep-heavy, barista-dependent drinks) or possibly just not featured on this particular promo-heavy page — needs its own confirmation before touching menuItems.ts, flagging for a future pass rather than guessing. What's still NOT resolved, and still needs the same human call as 2026-08-30 (this is a schema/modeling decision, not a fact this task can look up): Premises in this project is strictly one-brandId-per-row (src/types/db.ts) with no shared-multiple-brands mechanism, so representing 'mccafe beverages exist everywhere mcdonalds does' still requires a human to pick between (a) copying all ~136 existing `mcdonalds` Premises rows as new `mccafe` Premises rows (large mechanical edit, now better-justified given the confirmed islandwide/main-counter model), or (b) dropping the standalone `mccafe` Brand concept entirely and folding its MenuItems into `mcdonalds` as a beverage category (arguably the more accurate model now that McCafé is confirmed to be a menu line served from the same counter, not a separate corner) — option (b) reads as the better fit given today's finding but changes this project's Brand taxonomy for an existing, populated Brand, which is a bigger call than this research task's normal scope of adding items to an outlet. Not implemented either option this run — no Brand/MenuItem/GroceryProduct/Premises files touched. Left 'pending'. Per the same task-design rule as 2026-08-30, no fallback entry was picked in its place this run — see session report reference/research-sessions/2026-08-31-mccafe-colocation.md. UPDATE 2026-09-01 (scheduled grocery-track run, picked deterministically again as top pending grab_go/ready_to_eat/supermarket entry by priority): confirmed no change — mccafe still has 0 Premises rows in premises.ts, and attempting mcp__workspace__web_fetch on www.mcdonalds.com.sg/mccafe directly failed with an out-of-provenance error (the URL wasn't already surfaced via WebSearch/prior fetch in this session), consistent with the nav-blocking noted on 2026-08-30/31. Did not repeat the full WebSearch investigation since the blocker here was already identified as a taxonomy/schema decision (option a vs b, both above), not a missing fact — re-fetching the same official page would not change that. This is a human decision, not a research gap; not resolving it unilaterally. Left 'pending'. No fallback entry researched in its place this run — instead moved to the queue's only other pending grab_go/ready_to_eat/supermarket entry, ok_convenience, which was also independently re-confirmed blocked today (see that entry's same-day update). Recommend a human make the (a)/(b) taxonomy call above before this entry is picked again — repeated scheduled runs will otherwise keep reaching the same conclusion."
  },
  {
    id: "nourish_bowl_existence_check",
    name: "Nourish Bowl",
    aliases: [
      "nourish bowl",
      "nourishbowl"
    ],
    type: "restaurant",
    cuisine: "Healthy / Bowls",
    priority: "low",
    status: "pending",
    notes: "2026-08-24 (address-accuracy audit): the `nourish_bowl` Brand already exists with 5 real MenuItems, but its only Premises row (`nourish_bowl_p28`) was a legacy 'Multiple outlets islandwide' placeholder — removed since no current address could be verified. Two rounds of WebSearch found zero verifiable current Singapore presence under this exact name (only a differently-named 'Nourish Table' at the Botanic Gardens, and 'Nourish Awesome Bowl' in Kuala Lumpur — neither confirmed to be the same brand as this database's `nourish_bowl`). Needs a dedicated pass to either find a real current address or confirm this brand is defunct/was a naming mix-up, similar to the Wendy's/Superfood Kitchen resolution this same session (both confirmed defunct and removed entirely, including their MenuItems)."
  }
];
