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
    status: "researched",
    notes: "2026-09-01: added Brand (dietTags: ['halal'], MUIS-certified per multiple independent halalboleh.com per-outlet listings) + 8 MenuItems spanning Sandwiches/Burgers/Seafood/Rice/Salads/Sides/Breakfast (Sourdough 49ers Chicken, Classic Ultra Burger, Bagus Impossible(TM) Burger, Fish & Chips, Chicken Baked Rice, Caesar Salad with Breaded Chicken, Spice 'n' Chic, Southern Style Chicken 'n' Waffle). No official SG nutrition source exists (swensens.com.sg's own PDF menu has no macros; not HCS-eligible as a restaurant, not packaged retail) — dish names/prices sourced from singaporerestaurantshub.com's menu-price page, cross-verified against a WebSearch snippet quoting the official swensens-menu.pdf directly (Southern Style Chicken 'n' Waffle $16.90 and the Golden Classics $17.90-18.90 band matched exactly) and against foodpanda outlet listings (Plaza Singapura/Junction 8/Bedok/Compass One) for the Sourdough 49ers Chicken and Bagus Impossible Burger descriptions. Rejected thefoodprices.com as a source — its calorie column was suspiciously uniform (every value a multiple of 50) and several unrelated items shared identical odd price endings, a pattern consistent with fabricated/templated content, not a real scrape. All 8 items are confidence 'estimated' (no verified source), macros reasoned/calibrated against this project's own astons_chicken_chop/astons_fish_chips, kopitiam_beradik_western (Western-casual 'set with fries' scaling), ss_shackburger/ss_double_shackburger, and saiz_caesar_salad entries, plus Impossible Foods' own published per-patty nutrition for the Impossible Burger. No SFA lookup (type is 'restaurant', not hawker/food_court_stall — out of Phase 3's scope). No Premises added: foodpanda confirms real outlets exist (Plaza Singapura, Junction 8, Bedok, Compass One, and more) but this unattended session's browser tool was blocked from interactive per-site approval (same finding as the kopitiam entry's 2026-09-01 notes), so no address could be verified/geocoded without guessing coordinates — flagged for a future pass with browser/OneMap access. See reference/research-sessions/2026-09-01-swensen_s.md."
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
    notes: "2026-08-22: Kopitiam is no longer a Brand — it was a single 'brand' row standing in for 48 different physical food-court buildings, each containing many unrelated stalls with completely different food, which never had a real menu and never rendered (buildScreenerRows joins off MenuItems). Restructured per the Operator design in types/db.ts: Kopitiam stays in operators.ts as the operating company; its 48 real SFA-sourced building addresses are preserved in reference/data/food-court-venues.json (operatorId: 'kopitiam') as research anchors. UPDATE 2026-08-22 (2nd pass, same day): the outlet-finder map widget IS genuinely JS-only with no usable endpoint (confirmed again), but its WordPress SEO sitemap (stall-sitemap.xml + stall-sitemap2.xml) lists 1,441 individual stall pages with clean schema.org JSON-LD — scraped all of them directly (see reference/research-sessions/2026-08-22-kopitiam-stall-scrape.md). After dedup + filtering 58 bare cuisine-label placeholders (reference/data/kopitiam-generic-filter.md), added 839 real Brand rows (operatorId: 'kopitiam') + 1,183 geocoded Premises rows to brands.ts/premises.ts. REMAINING WORK (this is now the priority item, not full re-research): none of these 839 brands have MenuItems yet — the scraped data gives real dish NAMES per brand (preserved in reference/data/kopitiam-stall-dishes.json, ~1,861 dish names across 846 name-keys) but never macros, and this project never fabricates calories/protein/carbs/fat. A future pass needs to research real macros (USDA lookup / vision / manual with source citation) for a representative dish or two per brand and add MenuItems — until then these brands are invisible in the calorie/protein screener even though they're now real, addressed, and geocoded. 3 brand-new venues (504 Yishun, 542B Serangoon North, Pasir Ris 735) have no published address yet and were left out entirely (8 brands with no other location: Mr Prata, Fried Chicken, Savoury Seafood, Hao You Ji Roasted Delights, Hao La Wei Mix Rice, Hao Lai Ke Lamian, Tandoori House, Yong Li Coffee Station) — revisit once Kopitiam publishes them. Kopitiam's other named F&B brands from FairPrice Group's corporate site (Bagus/Bagus Food Hall, Kopitiam Corner, Ah Bowl Den, Belly Belly Good Cai Fan, Chomp!, Kokoro Izakaya, Sedap Kitchen) — check whether they're already among the 839 scraped stalls (several matching names did turn up, e.g. Heavenly Wang, Kokoro Kiosuku, Confirm & Chop, Xiang Chi Mian) before doing separate lookups. UPDATE 2026-08-23: this entry's real unit of work is the 839-brand MenuItems backlog described above, not the 'Kopitiam' queue row itself (which correctly has no Brand of its own — adding one would recreate the exact mega-brand pattern this restructure reverted). This run added MenuItems for 1 of the 839 (kopitiam_kopi_kiosk — 6 items: Kaya Toast, Kaya Butter Toast, Kopi, Teh, Ice Kacang, Kaya Butter Set Meal; all confidence 'estimated', reasoned from singaporecalorie.com/HPB-adjacent generic dish data plus this project's existing Ya Kun kopi/toast entries as a calibration analog — see reference/research-sessions/2026-08-23-kopitiam_kopi_kiosk.md). Skipped 'Signature Breakfast Set' from the stall's scraped dish list as a likely near-duplicate of the set meal already added, with no credible way to differentiate the two without fabricating a distinction. Status left 'pending' — 838 kopitiam-operator brands still have zero MenuItems; picking one per run here would take ~2 years at this cadence, so a future session should consider batching multiple stalls per run specifically for this backlog rather than treating it as a single one-outlet-per-run entry. UPDATE 2026-08-23 (2nd pass): added MenuItems for 1 more of the 839 (kopitiam_chinatown_roasted, a Chinese roast-meats stall at the Changi Airport T3 Kopitiam — 3 items: Char Siew Rice, Roast Duck Rice, Roasted Chicken Rice; all confidence 'estimated'). Only 3 dish names were scraped for this stall (below the usual padding room), so rather than inventing extra menu items not confirmed on its page, macros/prices were calibrated directly off this project's own existing entries for the identical dish names at other Chinese roast-meat stalls already in menuItems.ts (tian_tian_chicken_rice, cc_roast_meats_stall, oar_roast_duck_rice — all also 'estimated' confidence for the same dishes), since no outlet-specific source (official page, HPB, or press) exists for this individual airport stall — see reference/research-sessions/2026-08-23-kopitiam_chinatown_roasted.md. No SFA lookup (Brand already existed with a Premises row from the 2026-08-22 scrape). 837 kopitiam-operator brands still have zero MenuItems. UPDATE 2026-08-23 (3rd pass): added MenuItems for 1 more of the 837 (kopitiam_beradik_western, a Western-food stall — Changi T3, Plaza Singapura, Tan Tock Seng Hospital, Bagus Food Hall @ Northpoint, AMK Hub — 6 items: Chicken Chop, Fish & Chips, Chicken Chop Aglio Olio, Crispy Chicken Cutlet With Rice, Grilled Chicken Steak, Chicken Bolognese; all confidence 'estimated'. Scraped dish list also included 'Fish and Chip' (duplicate of 'Fish & Chips', skipped, same dish) and 'Chicken Bolognese'/'Grilled Chicken Steak' kept distinct since composition and macros differ meaningfully from the fried chop/cutlet items. No outlet-specific source exists for this individual hawker-tier Western stall, so macros were calibrated off this project's own astons_chicken_chop (420 cal, 40g protein, 8g carbs, 24g fat, à la carte protein only) and astons_fish_chips (560/28/52/26) entries, scaled up to reflect a hawker 'set' plate that bundles protein with fries/rice/pasta on one plate (unlike Aston's à la carte pricing) and scaled down in price to match this stall's existing '$' priceRange vs Aston's casual-dining tier — see reference/research-sessions/2026-08-23-kopitiam_beradik_western.md. No SFA lookup (Brand already existed with a Premises row from the 2026-08-22 scrape). 836 kopitiam-operator brands still have zero MenuItems. UPDATE 2026-08-31: the backlog has clearly been worked down substantially by other sessions between 2026-08-23 and now without this note trail being kept current (audited today: only 5 of the 839 kopitiam-operator brands still have zero MenuItems, not 836 — this note is being corrected to reflect that, not to claim credit for work done elsewhere). This run added MenuItems for 1 of the 5 (kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd, the Kang Kar Mall branch of Jian Bo Tiong Bahru Shui Kueh — 8 items: Shui Kueh 5pc, Shui Kueh 10pc, Chee Cheong Fun, Steamed Yam Cake, Kueh Lapis, Rice Kueh, Soon Kueh, Siew Mai; all confidence 'estimated'. This brand's scraped dish-name signal was only 1 entry ('Signature Jian Bo Shui Kueh'), below the usual threshold, so rather than relying on the scrape, cross-referenced the Premises label ('Kang Kar Mall') against a web search and confirmed this is a branch of the well-documented Jian Bo Tiong Bahru Shui Kueh chain (Michelin Bib Gourmand hawker, own official site + PriceListo third-party menu aggregation across its other branches) — real dish names and chain-wide prices sourced from PriceListo, macros reasoned/calibrated against this project's own existing Chwee Kueh (320 cal/6p/45c/12f @ 5-6pcs, used directly for the 5pc size and doubled for the 10pc), Chee Cheong Fun, Kueh Lapis, Soon Kueh, and Yam Cake entries elsewhere in menuItems.ts as analogs where a direct match existed, and general dim-sum-portion knowledge for Siew Mai (no existing analog in this DB) — see reference/research-sessions/2026-08-31-kopitiam_tiong_bahru_tian_bo_shui_kueh_pte_ltd.md. No SFA lookup (Brand already existed with a Premises row from the 2026-08-22 scrape). Of the remaining 4: kopitiam_cheers is the known non-food convenience-store concession (CLAUDE.md section 4.3) and should never get a MenuItem; kopitiam_culiang_yufen's only scrape signal is the known self-referential-garbage artifact (CLAUDE.md section 5) and kopitiam_china_food's only scrape signal is the bare category label 'Cold dishes' — both need individual web research, not the scrape, same as this run; kopitiam_king_grouper (Hougang One) has 3 scraped dish names (Fish Soup, Fried Fish Soup, Sliced Fish Soup) but this project's own existing convention treats generic 'Fish Soup' and 'Sliced Fish Soup' as macro-identical (see kgfs_sliced_fish_soup and the several other Fish Soup stalls in menuItems.ts, all 320/28/25/10), so 'Fish Soup' doesn't clear the near-duplicate bar as a distinct 3rd item — left at 2 credible non-duplicate items, below this task's 3-item minimum, so deliberately skipped this run rather than padded; a future pass should do individual web research on 'King Grouper' Hougang One specifically (it may have more items than the scrape captured) before it can be added. Status left 'pending' — 4 kopitiam-operator brands still have zero MenuItems. UPDATE 2026-08-31 (2nd pass): did that individual web research on kopitiam_king_grouper (Hougang One, #01-19) as recommended above — found strong evidence it is not a distinct stall but the same real-world chain as the already-populated kopitiam_king_grouper_fish_soup Brand (which has 5 Premises rows: VivoCity, Tan Tock Seng Hospital, Parkway Parade, West Mall, Kopitiam @ Northpoint City). The chain's own official site (kinggrouperfishsoup.com/services-7) lists exactly one outlet at '1 Hougang Street 91 #01-19 Singapore 538692' — the identical address on kopitiam_king_grouper's sole Premises row — and its menu page (kinggrouperfishsoup.com/menus) states its full published menu (Sliced Grouper Fish Soup $6.50, Sliced Batang Fish Soup $6.50, Sliced Red Grouper Fish Soup $9, Fried Sliced Fish Soup $7, Fish Porridge $7, Seafood Soup $7, Teochew Style Sliced Grouper Fish $13, Teochew Style Sliced Red Grouper Fish $15) is 'served at all locations.' This is brand-chain fragmentation (Kopitiam's own stall-sitemap scrape evidently labelled the Hougang One page with the shorter 'King Grouper' name while other branch pages used 'King Grouper Fish Soup'), not a genuine second stall under CLAUDE.md section 4.2's test — there is no SFA data on either side to distinguish them, and the chain's own site recognizes only one outlet at this address. This task's scope is appending MenuItems to an existing Brand, not merging/restructuring Brand rows, so deliberately did NOT add a second, divergent set of MenuItems to kopitiam_king_grouper — that would let the same real chain appear twice in the screener under two names rather than fixing the split. Recommend a future dedicated cleanup pass (same shape as the 2026-08-24 duplicate-removal batches) reassign kopitiam_king_grouper_p1 (Hougang One) to brandId 'kopitiam_king_grouper_fish_soup' as its 6th Premises row and delete the kopitiam_king_grouper Brand row — the same pattern already used for the McDonald's/Anchorvale Village Hawker Centre case in premises.ts. Not acted on here (outside this task's write scope); flagged for that pass instead. Did not pick a fallback brand in the same run, per this task's one-outlet-per-run rule. Status left 'pending' — kopitiam_cheers (never, non-food), kopitiam_culiang_yufen (garbage scrape signal), and kopitiam_china_food (bare category label) still need individual web research same as before; kopitiam_king_grouper needs the Brand-merge action above, not macro research, once a future pass is authorized to restructure Brand rows. 4 kopitiam-operator brands remain unresolved, none by this run's design. UPDATE 2026-08-31 (3rd pass): this run independently re-derived the same kopitiam_king_grouper candidate as the 2nd pass above and briefly (by mistake) added 2 MenuItems to it before reading this entry's own up-to-date notes — caught the conflict (the module used to enumerate 'kopitiam brands with zero MenuItems' was loaded fresh from the live files each time and was accurate, but an earlier throwaway audit script had cached a stale copy of this queue file's text, so the king_grouper 2nd-pass note above wasn't visible until this file was re-read directly) and reverted the addition before writing anything further; menuItems.ts is unchanged by this pass. Then did the individual web research on kopitiam_china_food recommended above (Blk 450 Clementi Ave 3, #01-271) — found general coverage of that Kopitiam venue (Burpple/FoodAdvisor reviews mention Sambal Stingray, Beef Korean Porridge, Hainanese Curry Rice, and a spicy popcorn-chicken dish at other stalls there) but nothing that names a stall called 'China Food' or describes what it actually sells; still just the bare 'Cold dishes' scrape signal, no credible dish-level basis, so still deliberately left unresearched rather than guessed. Also re-audited koufu/foodfare/hawkers_street (this queue's 3 other 'operator' entries): koufu and foodfare currently have 0 Brand rows tagged operatorId 'koufu'/'foodfare' at all (their own real sub-brands were added without an operatorId per the 2026-08-22/23 notes above, and foodfare is separately user-deprioritized) — no zero-menu backlog remains for either under this queue entry's original framing; hawkers_street's 27 operatorId-tagged Brand rows now all have ≥1 MenuItem (its own remaining work, per its own queue entry, is identifying named concessions at 4 newer venues, not menu research, and is out of this entry's scope). Then swept the rest of this run's priority-sorted pending queue (restaurant/food_court/hawker/coffeeshop/canteen types, ~92 entries) for any other realistic single-outlet target and found none: ~34 entries are per-location duplicates of chains that already have their own consolidated Brand elsewhere (Cold Storage x16, McDonald's x4, Pizza Hut x2, Domino's x2, Bengawan Solo x3, Bee Cheng Hiang x1, NTUC Foodfare x2 — same 'append as Premises to the existing chain Brand, don't research as a new Brand' situation as kopitiam_king_grouper, all individually flagged on their own queue entries this pass), ~11 are bare SFA-licensee personal names (Lee Len Tong, Goh Poo Huat, Kwek Ah Heoh, Lee Jim Pong, Lim Hang Tong, Goh Jee Tee (2nd), Lee Kee Yeo @Lee Lian Hong, Au Jiahao Alex, Chan Cheow Teck, Chan Kok Hee (Tian Guoxi), Chong Yo Private Limited) matching this project's known task #29 bucket (text search can't resolve a name that never appeared on a signboard — needs Street View or an in-person visit, not this run's tooling), 2 are orphaned (queue id has no matching Brand row: eunos_crescent_blk_4a_teo_kiang_huat, tanglin_halt_market_ngern_jwee_chye), and 9 were simply stale — already had real MenuItems from earlier untracked work but still showed status 'pending' (clementi_ave_3_blk_448_lee_guat_hoon, eunos_crescent_blk_4a_tiong_lee_lim, ayer_rajah_food_centre_big_bern_s_american_grill_xpolis_pte_ltd, mei_chin_road_market_goh_jee_tee, pasir_ris_central_hawker_centre_bee_cheng_hiang_concept_pte_ltd, pasir_ris_central_hawker_centre_bengawan_solo_pte_ltd, bedok_north_street_1_blk_216_bengawan_solo_pte_ltd, bedok_north_street_1_blk_216_domino_s_pizza_singapore_pte_ltd, bedok_north_street_1_blk_216_mcdonald_s_restaurants_pte_ltd) — flipped those 9 to 'researched' this run as a verified bookkeeping fix (each individually re-checked against menuItems.ts before flipping; no macro research performed on any of them). Net result: no new MenuItems added this run (the one candidate found, kopitiam_king_grouper, turned out to be already-covered under a sibling Brand name and was correctly left alone per the 2nd pass's reasoning), but 9 stale statuses corrected and this survey's findings recorded on each affected entry for whoever runs a future Brand-merge or Street-View pass. Status left 'pending' on this entry — same 4 kopitiam-operator brands remain unresolved as before, none by this run's design. UPDATE 2026-09-01: resolved kopitiam_culiang_yufen, one of the 4. Its only prior scrape signal was the known self-referential-garbage artifact, but a fresh web search found the chain is well-documented under its full trading name 'Culiang Yufen By Popular Food' — foodpanda listings for 4 other branches (Kopitiam Square/Sengkang, Hillion Mall, VivoCity, Cineleisure) all show the same consistent numbered menu (52 items: 5 soup flavours x protein choices), confirming a real, chain-wide, non-fabricated menu even though this project's own Paya Lebar Quarter premises isn't itself listed on foodpanda. Added 8 MenuItems spanning distinct named proteins/formats (fish noodle, beef noodle, luncheon meat noodle, meatball noodle, fat intestine noodle, prawn paste noodle, fish+rice bowl, rice-cake side) — real dish names + SGD prices from the foodpanda listing, macros reasoned/calibrated against this project's own existing Sliced Fish Soup/Fish Soup/Double Fish Soup/Meatball Noodles/Fishball Noodles entries, all confidence 'estimated' — see reference/research-sessions/2026-09-01-kopitiam_culiang_yufen.md. No SFA lookup (Brand already existed with a Premises row from the 2026-08-22 scrape). Of the remaining 3: kopitiam_cheers is still the known non-food convenience-store concession (never gets a MenuItem); kopitiam_china_food's only signal is still the bare 'Cold dishes' category label — no new information surfaced this pass, still needs a genuinely new lead (e.g. Street View/in-person) rather than another repeat text search; kopitiam_king_grouper still needs the Brand-merge action flagged above (out of this task's write scope), not macro research. Did not pick a fallback brand in the same run. Status left 'pending' — 3 kopitiam-operator brands remain unresolved, 1 (china_food) needing a new research angle, 1 (cheers) permanently out of scope, 1 (king_grouper) needing a restructure pass. UPDATE 2026-09-01 (2nd pass): attempted a genuinely different angle on kopitiam_china_food per the above — tried in-app browser navigation to Google Maps, Facebook, and FoodAdvisor for visual/listing-based identification, but all three navigations were blocked in this run (the browser tool requires interactive per-site approval that isn't available in this unattended scheduled-task session). Fell back to further targeted WebSearch queries not tried before (exact unit '#01-271', 'China Food' + cai fan/cooked-food synonyms, site:openrice.com for the venue) plus direct fetches of Burpple's full review list for this Kopitiam and a food blog post (paulinmunchies.blogspot.com) about a mala stall at the same venue, both surfaced by search. A Facebook business-page hit literally titled '450 Clementi Ave 3 #01-271 stall 3' looked promising but returned no retrievable content (empty page, likely an unclaimed auto-generated listing) and Facebook navigation was also blocked. None of these sources named a stall called 'China Food' or attributed any dish to it — every dish/stall name turned up (Sambal Stingray, Beef Korean Porridge, Hainanese Curry Rice, a spicy popcorn-chicken dish, Holy Flavour Palace mala, Fish Soup Ramen, 450 Economic Rice Porridge, Johnson Duck, Ayesha's Kitchen Indian Food, Banana Leaf BBQ Seafood, Prawn Noodle Stall, Tim Sum, Congee) belongs to other, separately-named stalls at this same Kopitiam, not to 'China Food.' No new lead surfaced this pass; visual identification via Street View or an in-person visit remains the only unexhausted path. Did not fabricate a menu, and did not pick a fallback brand in the same run — re-confirmed the 2026-08-31 full-queue sweep's conclusion still holds (no other realistic single-outlet target currently exists in this track's pending queue: same ~34 chain-duplicate entries, ~11 bare-licensee-name entries, and 2 orphaned entries as before, none of which are addressable by this task's methodology). Status left 'pending' — same 3 kopitiam-operator brands remain unresolved as before. See reference/research-sessions/2026-09-01-kopitiam-china-food-attempt-2.md. UPDATE 2026-09-02 (scheduled restaurant-track run): picked deterministically again as the first-listed high-priority pending entry of this track. This run's session did have in-app browser tool access (unlike several prior runs), so attempted the Street View/visual-identification path flagged as the only unexhausted lead for kopitiam_china_food — browser navigation to google.com and bing.com was denied/blocked at the tool level in this unattended session (same outcome as prior runs, despite the tool being nominally available), so that path remains untried. Did try one genuinely fresh angle via WebSearch/web_fetch (not a repeat of prior exact queries): fetched Burpple's Kopitiam (450 Clementi) page directly — same result as 2026-09-01's finding, every named dish (Sambal Stingray, Beef Korean Porridge, Hainanese Curry Rice, a popcorn-chicken dish) belongs to other, separately-named stalls at this venue, none attributable to 'China Food'. No new lead surfaced. kopitiam_cheers (never, non-food) and kopitiam_king_grouper (needs a Brand-merge restructure, out of this task's scope) also re-confirmed unchanged. Did not fabricate a menu, did not pick a fallback outlet within the Kopitiam backlog itself. Instead swept the rest of this run's priority-sorted pending queue (per Phase 1's deterministic-order rule, treating this and koufu/foodfare as having no addressable gap this run) and found a real target further down: food_junction_ke_quench (Ke/Quench @ Food Junction) had zero MenuItems despite its parent 'food_junction' operator entry showing partial coverage — researched and added 3 real MenuItems there this run (see that queue entry). Also used this pass to audit and bookkeeping-fix 30 other stale queue entries across the hawkers_street/fei_siong/bukit_canberra_hawker_centre/yishun_park_hawker_centre's tracked Brand backlogs that already had MenuItems in the live dataset but still showed 'pending' (see those entries' own UPDATE notes) — this queue file has accumulated a meaningful amount of this kind of staleness across the operator-Brand backlogs; a future pass might consider a dedicated staleness audit across the full file rather than relying on it surfacing incidentally during single-outlet picks. Status left 'pending' on this entry — same 3 kopitiam-operator brands remain unresolved, browser-based Street View still the only unexhausted path for china_food. UPDATE 2026-09-17 (scheduled restaurant-track run): re-confirmed the 2026-09-02 finding still holds — same 3 kopitiam-operator brands unresolved (kopitiam_cheers never, kopitiam_china_food needs Street View, kopitiam_king_grouper needs a Brand-merge restructure out of this task's scope), and koufu/foodfare still have 0 operatorId-tagged Brand rows per that note. Did not attempt browser-based Street View this run (did not have interactive per-site approval available in this unattended session, consistent with every prior attempt). Swept the rest of the priority-sorted pending queue per the established precedent and did real work on hougang_105_hainanese_village_centre_bachmann_japanese_restaurant_pte_ltd instead (see that entry's own notes) — status left 'pending' on this entry, no change to the 3 unresolved kopitiam-operator brands."
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
    notes: "2026-08-22: Hawkers' Street's fake mega-Brand row (8 premises, 0 menu items) was removed for the same reason as Kopitiam/Koufu/Foodfare — see that entry. Unlike the other 3 operators, Hawkers' Street already has this fixed correctly for 4 of its 8 venues: 27 real named stalls exist as their own Brand rows with operatorId: 'hawkers_street' (e.g. tai_wah_pork_noodle, jason_penang_cuisine at Tampines 1; chef_wei_hk_cheong_fun at ION Orchard) — those needed no change. Remaining work: the other 4 venues (see reference/data/food-court-venues.json, operatorId: 'hawkers_street', concessionsResearched: false) still need their named concessions identified and added the same way. The 27 existing stalls also still need MenuItems researched (0 each currently) before they render. UPDATE 2026-08-22 (later same day): hawkersstreet.com.sg/outlets/ (server-rendered, unlike Kopitiam/Koufu's locators) confirms Hawkers' Street has actually grown to 9 venues, not 8 — added Square 2 and The Clementi Mall (real addresses captured, not yet added to food-court-venues.json — do that before further research). Cross-checked hawkersstreet.com.sg/brands/ (their canonical brand roster): it lists exactly the same 27 stalls already in this database — no confidently-new stall names to add from that page. The outlets page itself shows several additional stall logos at the newer venues (Square 2, Clementi Mall, Tang Plaza, EastPoint Mall) with names like 'Hwa Heng Beef Noodle', '91 Fried Kway Teow', 'Hup Hong Chicken Rice', 'Wok Hei Hor Fun' inferable from image filenames, but the page's own brand-anchor links (#brandXXX) are inconsistently wired (multiple different logos link to the same anchor, a bug on their end) — not trustworthy for id matching, and filename-only inference risks getting a name wrong, so none were added. A future pass should visit each of these venues in person/via Google Maps listing to verify names properly, same escalation method used for the Tekka Market generic-name cleanup. UPDATE 2026-09-05 (restaurant-track scheduled run): confirmed one of 2026-08-22's filename-inferred guesses via real text sources this run — WebSearch (in-app browser navigation was denied at the tool level again this unattended run, same as every prior scheduled run) surfaced Little Day Out's in-person stall writeup of Hawkers' Street's newest venue, The Clementi Mall (opened 28 Oct 2025, littledayout.com/hawkers-street-clementi-mall-food-court), which names and prices all 16 stalls there. 9 of the 16 were already in this database (chef_wei_hk_cheong_fun, tiong_bahru_chicken_rice_hws, jiak_song_mee_hoon_kway, jason_penang_cuisine, koungs_wan_tan_mee, pangs_hakka_ytf, beach_road_scissor_cut_curry_rice, hill_street_coffee_shop, old_teochew_satay_beehoon — confirming this venue overlaps heavily with Tampines 1's existing roster rather than being all-new). Of the 7 genuinely new names (Hjh Maimunah, Tartini Grill & Pasta, Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The Neighbourwork Fried Hokkien Prawn Mee, Wok Hei Hor Fun), researched and added 1 this run per the one-outlet-per-run rule: wok_hei_hor_fun (Michelin Bib Gourmand 2026, flagship at Redhill Food Centre #01-94 — confirmed independently via SETHLUI.com and DanielFoodDiary.com, which also directly corroborates the 2026-08-22 filename guess) — added as a new Brand (operatorId 'hawkers_street', type food_court_stall) with 1 Premises (The Clementi Mall) and 6 MenuItems using this branch's own Little Day Out-sourced prices; see reference/research-sessions/2026-09-05-wok_hei_hor_fun.md. HungryGoWhere and Time Out pieces on Hawkers' Street's Tang Plaza venue (6 Michelin-recognised stalls: Fei Fei Roasted Noodle, Hup Hong Chicken Rice, Loong Kee Yong Tau Fu, Springleaf Prata Place, Tai Seng Fish Soup, Tai Wah Pork Noodle) confirm 4 of those 6 already exist in this database — Hup Hong Chicken Rice and Springleaf Prata Place are new leads for a future run, same as the other 6 unresearched Clementi Mall names above. Square 2 ('eight famed stalls, four Michelin-recognised') was mentioned but no source found yet naming which eight. Status left 'pending' — 8 further newer-venue concessions remain identified-by-name-only (Hjh Maimunah, Tartini Grill & Pasta, Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The Neighbourwork Fried Hokkien Prawn Mee, Hup Hong Chicken Rice, Springleaf Prata Place) plus Square 2's stall list still unknown. UPDATE 2026-09-06 (restaurant-track scheduled run): re-checked kopitiam/koufu/foodfare first per the deterministic top-priority rule — all three still show no addressable gap (kopitiam's 3 remaining sub-brand leads are dead ends or out of write-scope per prior passes; koufu's container brands are correctly menu-less and its 6 orderable sub-brands already have items; foodfare remains deprioritized on the unresolved B2B-scope question). Swept to this entry (medium priority, 4th overall) and researched 1 of the 8 remaining Tang Plaza/Clementi Mall leads per the one-outlet-per-run rule: Springleaf Prata Place (MUIS halal-certified, Michelin Plate since 2019, confirmed at the Tang Plaza venue via HungryGoWhere/Eatbook.sg/Miss Tam Chiak/The Ordinary Patrons coverage of that venue's Aug 2025 opening) — added as a new Brand (operatorId 'hawkers_street', type food_court_stall) with 1 Premises (Tang Plaza) and 8 MenuItems; dish names/prices cross-verified across two independent flagship-outlet reviews (DanielFoodDiary.com 2020, 2bearbear.com 2022/2023); see reference/research-sessions/2026-09-06-springleaf_prata_place.md. 7 further leads remain: Hjh Maimunah, Tartini Grill & Pasta, Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The Neighbourwork Fried Hokkien Prawn Mee (all Clementi Mall), Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall list still unknown. UPDATE 2026-09-06 (2nd restaurant-track scheduled run today): re-checked kopitiam/koufu/foodfare again per the deterministic top-priority rule — no change since this morning's pass (kopitiam's 3 remaining sub-brand leads still dead ends/out-of-scope, koufu still fully covered, foodfare still deprioritized). Researched 1 of the 7 remaining Clementi Mall leads per the one-outlet-per-run rule: Hjh Maimunah (Michelin Bib Gourmand nasi padang chain since 1992, confirmed at this venue via eatbook.sg's Oct 2025 opening coverage and Mothership's 2023 piece, cross-checked against hjmaimunah.com/pages/clementi) — added as a new Brand (operatorId 'hawkers_street', type food_court_stall, id 'hjh_maimunah_clementi_mall') with 1 Premises (The Clementi Mall, same address/coordinates as wok_hei_hor_fun's premises row) and 7 MenuItems. No per-branch menu/pricing exists for this specific stall (Hjh Maimunah publishes one standing menu chain-wide), so dish names and prices were sourced from the chain's well-documented flagship outlets (Jalan Pisang, Joo Chiat) via The Ordinary Patrons and eatbook.sg, same flagship-menu approach used for wok_hei_hor_fun/springleaf_prata_place; see reference/research-sessions/2026-09-06-hjh_maimunah_clementi_mall.md. 6 further leads remain: Tartini Grill & Pasta, Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The Neighbourwork Fried Hokkien Prawn Mee (all Clementi Mall), Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall list still unknown. UPDATE 2026-09-06 (3rd restaurant-track scheduled run today): re-checked kopitiam/koufu/foodfare again per the deterministic top-priority rule (re-verified directly against live brands.ts/menuItems.ts, not just prior notes) — no change since the 2nd run today (kopitiam: 3 of 831 operatorId-tagged brands still zero-menu, same dead-ends/out-of-scope as before; koufu: 0 operatorId-tagged brands, its standalone sub-brands remain fully covered; foodfare: 0 operatorId-tagged brands, still deprioritized). Researched 1 of the 6 remaining leads per the one-outlet-per-run rule, picking the first-listed: Tartini Grill & Pasta (a Western grill-and-pasta stall, confirmed at this venue via Little Day Out's in-person stall writeup; also listed under 2 other storefront-name variants, foodpanda's 'Tartini Kitchen Grill and Pasta' delivery menu and halalboleh.com's 'Tartini Sedap Grill and Pasta,' both at the identical address, halalboleh.com confirming MUIS certification) — added as a new Brand (operatorId 'hawkers_street', type food_court_stall, id 'tartini_grill_pasta_clementi_mall') with 1 Premises (The Clementi Mall, same address/coordinates as this venue's other 2 stalls) and 10 MenuItems sourced from foodpanda's full delivery menu (real dish names + SGD prices), all confidence 'estimated'; see reference/research-sessions/2026-09-06-tartini_grill_pasta_clementi_mall.md. 5 further leads remain: Rong Cheng Rou Gu Cha, Malalah!, Lixin Teochew Fishball Noodle, The Neighbourwork Fried Hokkien Prawn Mee (all Clementi Mall), Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall list still unknown. UPDATE 2026-09-07 (restaurant-track scheduled run): re-checked kopitiam/koufu/foodfare again per the deterministic top-priority rule (re-verified directly against live brands.ts/menuItems.ts) — no change since 2026-09-06 (kopitiam: 3 of 831 operatorId-tagged brands still zero-menu, same dead-ends/out-of-scope as before; koufu: 0 operatorId-tagged brands, standalone sub-brands remain fully covered; foodfare: 0 operatorId-tagged brands, still deprioritized). Researched 1 of the 5 remaining leads per the one-outlet-per-run rule, picking the first-listed: Rong Cheng Rou Gu Cha (heritage Teochew bak kut teh pioneer founded by Lim Hai Chay in 1976, one of 5 Michelin Bib Gourmand names at this venue per greatdeals.com.sg and alvinology.com's Oct/Nov 2025 opening coverage of Hawkers' Street @ The Clementi Mall) — added as a new Brand (operatorId 'hawkers_street', type food_court_stall, id 'rong_cheng_rou_gu_cha_clementi_mall') with 1 Premises (The Clementi Mall, same address/coordinates as this venue's other stalls) and 7 MenuItems. No Clementi-Mall-specific menu/pricing exists for this stall (chain publishes one standing menu), so dish names and prices were sourced from Eatbook.sg's Nov 2021 flagship media-tasting review (Ang Mo Kio relaunch), same flagship-menu approach used for wok_hei_hor_fun/hjh_maimunah/springleaf_prata_place/tartini_grill_pasta_clementi_mall; Bak Kut Teh and Pig Trotters macros reused this project's own existing DISH_DB calibration values verbatim, Dragon Rib Soup/Rice/Mui Choy/Braised Peanuts were reasoned estimates (no analog or official source), all confidence 'estimated'; see reference/research-sessions/2026-09-07-rong_cheng_rou_gu_cha_clementi_mall.md. 4 further leads remain: Malalah!, Lixin Teochew Fishball Noodle, The Neighbourwok Fried Hokkien Prawn Mee (all Clementi Mall — note: alvinology.com/greatdeals.com.sg both render this as 'The Neighbourwok', not 'The Neighbourwork' as earlier notes here spelled it; flagging the correction for whoever researches it next), Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall list still unknown. UPDATE 2026-09-08 (restaurant-track scheduled run): re-checked kopitiam/koufu/foodfare again per the deterministic top-priority rule (re-verified directly against live brands.ts/menuItems.ts) — no change: kopitiam still has exactly 3 zero-menu operatorId-tagged brands (kopitiam_king_grouper, kopitiam_china_food, kopitiam_cheers), same dead-ends/out-of-scope as every prior pass since 2026-08-31; koufu still 0 operatorId-tagged brands with its 6 standalone sub-brands fully covered; foodfare still deprioritized, unchanged. Researched 1 of the 4 remaining leads per the one-outlet-per-run rule, picking the first-listed: Malalah! (per greatdeals.com.sg and alvinology.com's Oct 2025 opening coverage, one of this venue's two 'exclusive first-time collaborations' alongside The Neighbourwok — 'the fiery new-gen mala concept winning hearts with its addictive creations'). Checked this venue's other in-person stall-by-stall coverage (eatbook.sg's own opening piece and sethlui.com's opening piece) for a Malalah-specific menu/pricing — neither names it at all (each covers a different subset of the 16 stalls), and no delivery-platform listing exists yet (alvinology.com's own venue infobox states 'Delivery: Coming soon to major platforms'). Every source describes Malalah as a customizable/build-your-own mala format, not a fixed named-dish menu, the same shape as this project's 6 existing weight-priced mala-format brands (kopitiam_mala_hot_pot, kopitiam_chinatown_mala_hotpot, kopitiam_ri_ri_hong_mala_hot_pot, fei_siong_xiang_guo_shi_dai, alexandra_village_food_centre_ma_la_xiang_guo, canopy_bukit_canberra_add_more_mala_hot_pot), all of which this database represents as a single standardized 'Mala Xiang Guo' MenuItem ($8 / 550cal / 25g protein / 35g carbs / 32g fat) rather than fabricated named variants — reused that same calibrated value here (deliberately not treated as a fresh guess: cross-checked against independent 2026 SG mala-pricing roundups, themoneybees.co and misslobang.com, both putting hawker/food-court mala at ~S$2.20-2.68/100g with a typical 350-500g bowl landing ~S$8-8.80, consistent with this DB's existing $8 figure). Added as a new Brand (operatorId 'hawkers_street', type food_court_stall, id 'malalah_clementi_mall') with 1 Premises (The Clementi Mall, same address/coordinates as this venue's other stalls) and 1 MenuItem ('malalah_mala_xiang_guo', confidence 'estimated'); see reference/research-sessions/2026-09-08-malalah_clementi_mall.md. 3 further leads remain: Lixin Teochew Fishball Noodle, The Neighbourwok Fried Hokkien Prawn Mee (both Clementi Mall), Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall list still unknown. UPDATE 2026-09-08 (restaurant-track scheduled run, 2nd pick this run): re-checked kopitiam/koufu/foodfare a further time per the deterministic top-priority rule — no change from earlier this run. Researched 1 of the 3 remaining leads per the one-outlet-per-run rule, picking the first-listed: Lixin Teochew Fishball Noodle (Michelin-recognised, est. 1968 by founder Lim Lee Seng, per lixinfishball.com's own About page and confirmed at this venue via littledayout.com's in-person 16-stall writeup, singaporepromo.com, and this exact stall's own foodpanda delivery listing — restaurant id 'ogn0', 4.7/5 from 22 ratings). Noted but did not merge with 3 pre-existing, differently-shaped 'Lixin'-named Brand rows already in this database at other venues (lau_pa_sat_bak_chor_mee, lau_pa_sat_lixin_fishball, kopitiam_lixin_fish_ball_noodle — all at Lau Pa Sat, apparently overlapping/duplicative with each other from earlier batches, plus canopy_bukit_canberra_lixin_fish_ball_noodles and kim_keat_palm_market_and_food_centre_lixin_chao_zhou_fishball_noodle at yet other venues): per CLAUDE.md §4.2, same-named stalls at different venues are not automatically the same business, none of the existing 4 records carry an SFA licence match or other identifier confirming common ownership with this Clementi Mall concession, and every other Hawkers' Street Clementi Mall stall added by this task's prior runs (Malalah!, Hjh Maimunah, Tartini, Rong Cheng) was likewise given its own fresh venue-specific Brand id rather than folded into an existing same-named record elsewhere — followed that same established precedent here rather than guessing at a merge. Flagging the pre-existing 3-way Lau Pa Sat overlap for a future database-health-audit pass; not investigated further as out of this task's scope. Added as a new Brand (operatorId 'hawkers_street', type food_court_stall, id 'lixin_teochew_fishball_noodle_clementi_mall') with 1 Premises (The Clementi Mall, same address/coordinates as this venue's other stalls) and 7 MenuItems sourced directly from this stall's own foodpanda menu (real dish names + SGD prices, not a generic estimate) — all confidence 'estimated' since no official calorie/macro source was found; see reference/research-sessions/2026-09-08-lixin_teochew_fishball_noodle_clementi_mall.md. 2 further leads remain: The Neighbourwok Fried Hokkien Prawn Mee (Clementi Mall), Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall list still unknown. UPDATE 2026-09-14 (restaurant-track scheduled run): re-verified kopitiam/koufu/foodfare directly against live brands.ts/menuItems.ts (not just prior notes) per the deterministic top-priority rule — no addressable gap in any of the three: kopitiam still has exactly 3 zero-menu operatorId-tagged brands (kopitiam_king_grouper — needs the Brand-merge restructure flagged in that entry, out of this task's write scope; kopitiam_china_food — bare 'Cold dishes' scrape signal, needs Street View/in-person ID, browser tool unavailable again this run; kopitiam_cheers — permanently out of scope, non-food concession), unchanged since 2026-08-31; koufu still has 0 operatorId-tagged Brand rows (its 6+ standalone sub-brand chains remain separately covered, no operator-container backlog exists); foodfare still has 0 operatorId-tagged Brand rows and remains deprioritized per the 2026-08-23 user instruction (B2B institutional-catering scope finding, unchanged). Fell through to this entry (medium priority, 4th overall) and researched the first-listed of the 2 remaining leads per the one-outlet-per-run rule: The Neighbourwok Fried Hokkien Prawn Mee (Clementi Mall). Per Phase 2's source order, checked greatdeals.com.sg and alvinology.com's Oct/Nov 2025 opening coverage first — both confirm The Neighbourwok is one of this venue's two 'exclusive first-time collaborations' (alongside Malalah!, already added), celebrated for its smoky, wok hei-filled fried Hokkien prawn mee, but neither source itemizes this stall's own menu/pricing. Found the actual Clementi Mall-specific pricing instead in SETHLUI.com's own Oct 2025 opening-day coverage of this venue (sethlui.com/hawkers-street-clementi-singapore-oct-2025) — small Fried Hokkien Prawn Mee S$6.90, Fried Hokkien Big Prawn Mee S$13.90 — cross-verified against a second, independent Clementi-Mall-specific source (Little Day Out's in-person 16-stall writeup, littledayout.com/hawkers-street-clementi-mall-food-court) which additionally confirms a large-size tier at S$9.90, giving 3 real, non-fabricated, branch-specific price points (small/large/big prawn). Added as a new Brand (operatorId 'hawkers_street', type food_court_stall, id 'the_neighbourwok_fried_hokkien_prawn_mee_clementi_mall', name 'The Neighbourwok') with 1 Premises (The Clementi Mall, same address/coordinates as this venue's other stalls) and 3 MenuItems (Fried Hokkien Prawn Mee Small/Large, Fried Hokkien Big Prawn Mee). No calorie/protein/carb/fat source exists for this stall specifically (nor for its Bukit Batok flagship, confirmed via eatbook.sg's and SETHLUI's own dedicated flagship reviews — both are qualitative tasting pieces with zero macro data), so macros were calibrated off this project's own existing 'Fried Hokkien Prawn Mee' calibration value already used across multiple other hawker-centre entries in menuItems.ts (520 cal/20g protein/60g carbs/20g fat @ ~$5.50) — reused verbatim for the Small size, then scaled up proportionally for Large (680/26/78/26) and Big Prawn (780/34/82/30, largest protein jump to reflect the 'big prawn' upgrade being the dish's headline differentiator) — all confidence 'estimated'. Deliberately did NOT add this stall's Satay/Ketupat items (documented at its Bukit Batok flagship via eatbook.sg and SETHLUI's 2024 hokkien-mee-showdown piece, chicken/pork/mutton satay from S$0.70-0.80/stick) — every Clementi-Mall-specific source describes this venue's collaboration stall as being about the fried Hokkien prawn mee specifically, with no source confirming satay is actually sold at this branch, so extending the flagship's secondary menu here would have been a guess rather than a researched fact; left out per the never-fabricate rule rather than padded to a higher item count. This stall is confirmed NOT halal-certified (eatbook.sg's flagship review states this explicitly) — dietTags left empty at Brand level, no halal tag applied. No SFA lookup (food_court_stall inside a mall venue, reused an existing sibling Clementi Mall Premises row per Phase 3's established precedent for this entry). See reference/research-sessions/2026-09-14-the_neighbourwok_fried_hokkien_prawn_mee_clementi_mall.md. 1 further lead remains: Hup Hong Chicken Rice (Tang Plaza) — plus Square 2's stall list still unknown. UPDATE 2026-09-15 (restaurant-track scheduled run): re-verified kopitiam/koufu/foodfare directly against live brands.ts/menuItems.ts per the deterministic top-priority rule — no change (kopitiam: same 3 zero-menu operatorId-tagged brands, all dead-ends/out-of-scope; koufu: 0 operatorId-tagged brands, standalone sub-brands fully covered; foodfare: still deprioritized). Fell through to this entry (medium priority, 4th overall) and researched the last remaining named lead: Hup Hong Chicken Rice (Tang Plaza), a Michelin Guide-listed Hainanese chicken rice stall whose flagship is at Yuhua Village Market & Food Centre — confirmed operating this concession via HungryGoWhere and The Ordinary Patrons' own in-person Tang Plaza stall-by-stall coverage (both list it among the venue's 6 Michelin-recognised names) and TANGS' own store directory page. Added as a new Brand (operatorId 'hawkers_street', type food_court_stall, id 'hup_hong_chicken_rice_tang_plaza') with 1 Premises (Tang Plaza, reusing the exact address/coordinates already established by springleaf_prata_place's Premises row) and 6 MenuItems (Steamed/Roasted/Duo Chicken Rice, Chicken Wing Rice, Chicken Drumstick Rice, Braised Egg), real dish names and this branch's own SGD prices sourced directly from foodpanda's Tang-Plaza-specific delivery listing. No outlet-specific calorie/macro source exists, so the two base rice plates were calibrated against this project's own existing Chicken Rice calibration values already used at tian_tian_chicken_rice/lau_pa_sat_chicken_rice (607/35/74/17 steamed, 650/36/76/20 roasted); Duo averaged between the two; Wing/Drumstick reasoned down from the base values for their bonier cuts; Braised Egg reasoned from standard single soy-braised-egg nutrition. Deliberately skipped the foodpanda listing's other a la carte sides (Chicken Liver, Chicken Gizzard, Oyster Sauce Vegetable, Bean Sprout, Achar, plain Chicken Rice) — no credible macro basis or DB analog found. All items confidence 'estimated'. No SFA lookup (food_court_stall inside a mall venue, same precedent as this entry's other Tang Plaza/Clementi Mall additions). This repo's /sessions filesystem was at 100% (23M free, same ENOSPC condition flagged 2026-09-03) — routed the build mirror through /tmp instead (3.4G free there): npm install --cache /tmp/npm-cache succeeded, tsc --noEmit was silent, next build completed with all 4388 static pages generated. diff confirmed the /tmp mirror and live repo are byte-identical on brands.ts/premises.ts/menuItems.ts/dish-macro-lookup.py; 0 duplicate ids, 0 orphaned premises/menuItems. See reference/research-sessions/2026-09-15-hup_hong_chicken_rice_tang_plaza.md. Status left 'pending' — this was the last previously-known named lead on this entry, but Square 2's stall list ('eight famed stalls, four Michelin-recognised' per its opening coverage) is still unidentified; no source naming its individual stalls has surfaced across any prior pass. A future run should try a fresh angle specifically for Square 2 (its own mall directory, or Street View/in-person ID) rather than repeating the same text searches. UPDATE 2026-09-16 (restaurant-track scheduled run): re-verified kopitiam/koufu/foodfare directly against live brands.ts/menuItems.ts per the deterministic top-priority rule - no addressable gap in any of the three (kopitiam: same 3 zero-menu operatorId-tagged brands, all dead-ends/out-of-scope per every prior pass since 2026-08-31; koufu: 0 operatorId-tagged brands, standalone sub-brands fully covered; foodfare: still deprioritized). Fell through to this entry and took the fresh-angle approach flagged above for Square 2: WebSearch for the venue's own opening coverage (not a repeat of the generic 'stalls' query that failed previously) surfaced Little Day Out's and Eatbook.sg's in-person write-ups of Hawkers' Street Square 2's Sep 2025 opening, both naming its full 9-stall roster - Square 2's stall list is now resolved. The 9 stalls: Hill Street Hainanese Curry Rice, Hakka Yong Tau Foo, Hup Hong Chicken Rice, Tai Seng Fish Soup, 545 Whampoa Prawn Noodles, Jiak Song Mee Hoon Kway, King of Fried Rice, Lixin Teochew Fishball Noodle, Hill Street Coffeeshop. Cross-checked all 9 against live brands.ts: 6 are already-existing zero-menu Brand rows from this operator's original 27-stall batch (tai_seng_fish_soup, king_of_fried_rice_hws, hill_street_coffee_shop, pangs_hakka_ytf, hill_street_hainanese_curry_rice, jiak_song_mee_hoon_kway - Hakka Yong Tau Foo and Jiak Song Mee Hoon Kway both match existing brands by dish identity) - none of these currently have a Premises row at Square 2 specifically (their existing Premises are at the original 4 venues), so Square 2 is a new branch location for each; per CLAUDE.md 4.1's chain model and the kopitiam_king_grouper lesson (prefer adding a Premises row to an existing Brand over fragmenting into a duplicate Brand), these 5 need a Square-2 Premises row added to their EXISTING brandId, not a new Brand - that Premises-only addition (plus, ideally, this venue's own pricing/menu confirmation per brand) is flagged for a future pass, out of this run's one-outlet scope. Hup Hong Chicken Rice at Square 2 is the same real chain already added as hup_hong_chicken_rice_tang_plaza on 2026-09-15 (Michelin flagship at Yuhua) - also a Premises-merge candidate (add a Square 2 Premises row to that existing brandId) rather than a new brand, flagged alongside the 5 above; NOT acted on this run (this task's scope is appending new records, not restructuring existing Brand/Premises rows, same reasoning as the king_grouper case). Lixin Teochew Fishball Noodle at Square 2 needs its own fresh venue-specific research (per this project's own established precedent at lixin_teochew_fishball_noodle_clementi_mall - CLAUDE.md 4.2 same-name-different-venue is not automatically the same business without an SFA or other identifier) - not yet researched, a real remaining lead. Of the 9, only 545 Whampoa Prawn Noodles was both genuinely new (no existing Brand anywhere in the database) and cleanly researchable this run - added as a new Brand (operatorId 'hawkers_street', type food_court_stall, id '545_whampoa_prawn_noodles_square_2') with 1 Premises (Square 2, 10 Sinaran Dr #04-14 to 16, postal 307506 per littledayout.com/eatbook.sg - note this corrects the 307606 postal typo carried in reference/data/food-court-venues.json's older koufu-sourced Square 2 anchor entry, not fixed here as that file is a non-build research anchor, out of this run's scope) and 3 MenuItems (Prawn Noodles, Pig Tail Prawn Noodle, Pork Liver Prawn Noodle) - base Prawn Noodles reused this DB's existing calibration value (500/22/55/18) at this stall's own $6.90 price, the two pork-named variants reasoned from that base plus generic cut-level nutrition data (pig tail: fatty/collagen-rich; pork liver: lean/high-protein), all confidence 'estimated'; see reference/research-sessions/2026-09-16-545_whampoa_prawn_noodles_square_2.md. Status left 'pending' - remaining work on this entry: add Square-2 Premises rows to the 6 existing chain brands identified above (tai_seng_fish_soup, king_of_fried_rice_hws, hill_street_coffee_shop, pangs_hakka_ytf, hill_street_hainanese_curry_rice, jiak_song_mee_hoon_kway, hup_hong_chicken_rice_tang_plaza), research Lixin Teochew Fishball Noodle's own Square 2 concession as a fresh venue-specific Brand, plus this entry's pre-existing Clementi Mall/Tang Plaza MenuItems backlog (none currently outstanding there) and the kopitiam_china_food/kopitiam_king_grouper items noted above. UPDATE 2026-09-16 (2nd restaurant-track scheduled run today): re-verified kopitiam/koufu/foodfare directly against live brands.ts/menuItems.ts per the deterministic top-priority rule - no change (kopitiam: same 3 zero-menu operatorId-tagged brands, all dead-ends/out-of-scope; koufu: 0 operatorId-tagged brands, standalone sub-brands fully covered; foodfare: still deprioritized). Fell through to this entry and picked up the Lixin Teochew Fishball Noodle @ Square 2 lead flagged above as needing 'fresh venue-specific research'. Doing that research changed the conclusion: lixinfishball.com/locations/ (the chain's own official site) lists 'Novena Square 2' - Hawkers' Street, 10 Sinaran Drive #04-14/15/16, Singapore 307506 - as one of its 17 official branches, and foodpanda's separate 'Lixin Teochew Fishball Noodle (Square 2)' delivery listing (restaurant id 'jqan') carries the exact same 7 items at the exact same prices as the existing lixin_teochew_fishball_noodle_clementi_mall Brand's foodpanda-sourced menu (Traditional Fishball Noodle $8.80, Lixin Signature Noodle $11.70, Mushroom Minced Meat Noodle $10.60, Fish Dumpling Soup $8.80, Fishball Soup $6.50, Fishcake $5.20, Sambal Meat Dumplings $7.10) - i.e. one chain-wide standing menu, not a venue-specific one. This is the same shape as the hup_hong_chicken_rice_tang_plaza/6-existing-chain-brand cases flagged above (a real second location of an already-catalogued chain, not a distinct business), not a CLAUDE.md §4.2 same-name-different-venue ambiguity - so, per the kopitiam_king_grouper precedent (prefer a Premises-only addition to the existing Brand over a duplicate Brand when the same chain/menu is confirmed at a new address), added ONE new Premises row (id 'lixin_teochew_fishball_noodle_clementi_mall_p2', label 'Novena Square 2 (Hawkers' Street)', source 'operator_official_site', same lat/lng as this run's 545_whampoa Square 2 premises since it's the same building/unit range) to the EXISTING lixin_teochew_fishball_noodle_clementi_mall Brand. No new Brand and no new MenuItems were added - the existing ltfn_1 through ltfn_7 items now correctly apply at both premises via the standard chain-brand join (screener.ts's PREMISES_BY_BRAND model, same pattern already used for every multi-branch chain in this database). See reference/research-sessions/2026-09-16-lixin_teochew_fishball_noodle_square_2.md. Status left 'pending' - remaining work on this entry: add Square-2 Premises rows to the 6 other existing chain brands identified in the prior update (tai_seng_fish_soup, king_of_fried_rice_hws, hill_street_coffee_shop, pangs_hakka_ytf, hill_street_hainanese_curry_rice, jiak_song_mee_hoon_kway, hup_hong_chicken_rice_tang_plaza), plus the kopitiam_china_food/kopitiam_king_grouper items noted above (unrelated to this entry, tracked on the kopitiam entry itself). UPDATE 2026-09-16 (3rd restaurant-track scheduled run today): re-verified kopitiam/koufu/foodfare directly against live brands.ts/menuItems.ts per the deterministic top-priority rule - no change (kopitiam: 832 operatorId-tagged brands total, same 3 confirmed zero-menu (kopitiam_king_grouper, kopitiam_china_food, kopitiam_cheers), all dead-ends/out-of-scope per every prior pass since 2026-08-31; koufu: 0 operatorId-tagged brands, standalone sub-brands fully covered; foodfare: 0 operatorId-tagged brands, still deprioritized). Fell through to this entry and picked up the Square-2 Premises-merge backlog flagged in the two updates above. Found tai_seng_fish_soup already had its Square 2 Premises row (tai_seng_fish_soup_p4) - resolved without a matching note here, so that lead now drops off the remaining list. Of the 6 others, added a Square 2 Premises row to the first-listed per the one-outlet-per-run rule: king_of_fried_rice_hws (new row id 'king_of_fried_rice_hws_p4', address '10 Sinaran Dr, #04-14/15/16, Square 2, Singapore 307506' / postal 307506, using the corrected postal and lat/lng already established by this run's 545_whampoa_prawn_noodles_square_2 and lixin_teochew_fishball_noodle_clementi_mall_p2 additions, not the older 307606 typo still present on tai_seng_fish_soup_p4). No new Brand and no new MenuItems needed - King of Fried Rice's existing MenuItems apply at the new premises via the standard chain-brand join, same pattern as the lixin Square 2 addition. No SFA lookup (existing Brand, food_court_stall inside a mall venue, same no-SFA-lookup precedent used throughout this entry). Status left 'pending' - remaining work: add Square-2 Premises rows to the 5 other existing chain brands (hill_street_coffee_shop, pangs_hakka_ytf, hill_street_hainanese_curry_rice, jiak_song_mee_hoon_kway, hup_hong_chicken_rice_tang_plaza - verified via live premises.ts none of these 5 yet has a Square 2 row), plus the kopitiam_china_food/kopitiam_king_grouper items (unrelated, tracked on the kopitiam entry itself). Also flagging again: tai_seng_fish_soup_p4's address still carries the old 307606 postal typo noted in the 2026-09-16 (1st run) update - not fixed here since editing a pre-existing record is outside this run's one-outlet/append-only scope, but it's now inconsistent with the corrected postal used on every Square 2 Premises row added since. UPDATE 2026-09-17 (restaurant-track scheduled run): re-verified kopitiam/koufu/foodfare (the 3 higher-priority pending entries) directly against live brands.ts/premises.ts first, per the deterministic priority-order rule — all 3 confirmed unchanged with no addressable gap (kopitiam: same 3 stuck operator-Brand items; koufu: fully covered standalone sub-brands; foodfare: still deprioritized per the 2026-08-23 user instruction). Fell through to this entry. Re-checked the 5 remaining chain brands against live premises.ts (not just this note's prior text) and confirmed none had gained a Square 2 row since 2026-09-16. Picked the first-listed per the one-outlet-per-run rule: hill_street_coffee_shop. Added Premises row hill_street_coffee_shop_p5 (Square 2, address/postal/lat/lng reused verbatim from king_of_fried_rice_hws_p4/545_whampoa_prawn_noodles_square_2_p1/lixin_teochew_fishball_noodle_clementi_mall_p2 — the corrected 307506 postal, not the 307606 typo). No new Brand, no new MenuItems — hill_street_coffee_shop's existing 2 MenuItems apply at the new premises via the standard chain-brand join. No SFA lookup (same no-SFA-lookup precedent used throughout this entry). Status left 'pending' — remaining backlog: Square 2 Premises rows still needed for pangs_hakka_ytf, hill_street_hainanese_curry_rice, jiak_song_mee_hoon_kway, hup_hong_chicken_rice_tang_plaza (4 left), plus the unrelated kopitiam_china_food/kopitiam_king_grouper items tracked on the kopitiam entry itself, plus the still-unfixed tai_seng_fish_soup_p4 307606 postal typo (still out of this run's append-only scope). UPDATE 2026-09-17b (2nd restaurant-track scheduled run today): re-verified kopitiam/koufu/foodfare directly against live brands.ts/premises.ts first, per the deterministic priority-order rule — all 3 confirmed unchanged with no addressable gap (kopitiam: same 3 dead-end zero-menu operatorId-tagged brands; koufu: fully covered standalone sub-brands, no operator-container backlog; foodfare: still deprioritized per the 2026-08-23 user instruction). Fell through to this entry. Re-checked the 4 remaining chain brands against live premises.ts directly (not just this note's prior text) and confirmed none had gained a Square 2 row since the run earlier today. Picked the first-listed per the one-outlet-per-run rule: pangs_hakka_ytf (Pang's Hakka Yong Tau Foo, matched to Square 2's 'Hakka Yong Tau Foo' stall per the 2026-09-16 Little Day Out/Eatbook.sg opening-coverage research already establishing this venue's 9-stall roster). Added Premises row pangs_hakka_ytf_p5 (label/locationContext 'Square 2', address/postal/lat/lng reused verbatim from hill_street_coffee_shop_p5/king_of_fried_rice_hws_p4/545_whampoa_prawn_noodles_square_2_p1/lixin_teochew_fishball_noodle_clementi_mall_p2 — the corrected 307506 postal, not the 307606 typo — 10 Sinaran Dr, #04-14/15/16, Square 2, Singapore 307506, lat 1.320705109568455, lng 103.8441607096606, source 'web_research'). No new Brand, no new MenuItems — pangs_hakka_ytf's existing MenuItems (once researched) will apply at the new premises via the standard chain-brand join; note this Brand itself still has 0 MenuItems (a separate, unrelated gap from this entry's Square-2-Premises backlog — its own macro research remains a future one-outlet pick under this same queue entry's original 27-stall MenuItems backlog, not resolved by this Premises-only addition). No SFA lookup (existing Brand, food_court_stall inside a mall venue, same no-SFA-lookup precedent used throughout this entry). Typecheck: see Phase 5 verification in this run's session report. Status left 'pending' — remaining backlog: Square 2 Premises rows still needed for hill_street_hainanese_curry_rice, jiak_song_mee_hoon_kway, hup_hong_chicken_rice_tang_plaza (3 left), plus pangs_hakka_ytf's own still-zero MenuItems, plus the unrelated kopitiam_china_food/kopitiam_king_grouper items tracked on the kopitiam entry itself, plus the still-unfixed tai_seng_fish_soup_p4 307606 postal typo (still out of this run's append-only scope). See reference/research-sessions/2026-09-17-pangs_hakka_ytf_square_2.md."
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
    status: "researched",
    notes: "2026-08-31 (scheduled grocery-track run, picked as 2nd of 2 pending entries after mccafe_colocation_research was skipped — see that entry's same-day notes): multiple WebSearches (brand name, 'OK convenience store Singapore', 'OK Convenience Store' + address/opening, okconvenience.sg / Instagram/Facebook presence, HDB heartland minimart context) found zero evidence of a real, currently-operating Singapore business trading as 'OK Convenience' or 'OK Store'. The only 'OK'-branded convenience chain that surfaces is OK Mart / OK Convenience Store, a Taiwan chain (Lai Lai Convenience Store Co., ~750-900+ outlets) with no indication of Singapore expansion. This looks like the same pattern flagged in the 2026-08-23 Chomp Chomp/Berseh/Alexandra Village cleanup — a queue entry that may not correspond to a real trading name in Singapore — rather than a normal 'hasn't been researched yet' gap. Not resolving via fabrication per project rules. Left 'pending'. Recommend a human check whether this entry has a specific real-world source (e.g. was it meant to reference a specific minimart, or was 'OK' a placeholder/typo for another chain) before a future run repeats this same search. No Brand/MenuItem/GroceryProduct files touched. No fallback entry was picked in its place this run (queue's only two pending grab_go/ready_to_eat/supermarket entries — mccafe_colocation_research and this one — are both blocked, one on a same-day-documented human schema decision, this one on unverifiable brand existence). UPDATE 2026-09-01 (scheduled grocery-track run, picked deterministically after mccafe_colocation_research was re-confirmed blocked — see that entry's same-day notes): repeated the core WebSearch ('\"OK Convenience\" store Singapore') one day later as a lightweight re-check rather than a full re-investigation, since the underlying question (does this business exist) is unlikely to change day to day. Same result: no Singapore-specific hits, only OK Mart (Taiwan) and 'OK便利店' (Hong Kong). No new evidence surfaced. Still not resolving via fabrication. Left 'pending' — recommend this entry not be re-attempted by future scheduled runs without new input (e.g. a corrected name from a human) given two independent research passes now agree it doesn't verifiably exist. UPDATE 2026-09-02 (scheduled grocery-track run, picked deterministically after mccafe_colocation_research was re-confirmed blocked — see that entry's same-day notes): repeated the core WebSearch ('\"OK Convenience\" store Singapore minimart') as a third, lightweight re-check. Same result: no Singapore-specific hits — only OK Mart (Taiwan, en.wikipedia.org/wiki/OK_Mart) and generic minimart/convenience-store directory pages (thesmartlocal.com, mybestsingapore.com, Yelp, twentyfour.sg, sgpbusiness.com industry listing) with no 'OK Convenience' or 'OK Store' entry among them. No new evidence surfaced across three independent passes now. Still not resolving via fabrication. Left 'pending' — recommend this entry be excluded from automated re-picks entirely (not just deprioritized) until a human supplies a corrected name or confirms the entry should be removed; a fourth scheduled run reaching the same negative would add no new information. UPDATE 2026-09-02 (2nd pass, scheduled grocery-track run): browser tools (mcp__Claude_Browser) were available in this run for the first time — tested directly rather than assumed: navigation to mcdonalds.com.sg (for the sibling mccafe_colocation_research entry) and to a neutral control (google.com) were both denied at the session level, confirming the same unattended-session gate documented on every prior run; the browser path remains closed. Instead tried a genuinely new WebSearch angle not attempted in the three prior passes above (which all searched the trading-name phrase itself) — Singapore company-registry sources (ACRA/Bizfile aggregators sgpbusiness.com and recordowl.com) for a registered entity named 'OK Mart'/'OK Convenience'. This surfaced real UEN registration records, not just marketing/directory pages: THREE separate Singapore sole-proprietorships have been registered under the name 'OK MART' over the years — UEN 53238072W (inc. 29 May 2013, status: Cancelled), UEN 53368223A (inc. 8 Aug 2017, status: Ceased Registration), and UEN 53448765C (inc. 4 Apr 2022, formerly traded as 'BNB HARDWARE' then 'BCS FAMILY MART' before renaming to 'OK MART', registered at 249 Jurong East Street 24 #01-94, SSIC 47102 Mini-marts/Convenience Stores/Provision Shops — status: Cancelled (Non-Renewal), effective per recordowl.com 9 Oct 2025 / per sgpbusiness.com as-of 26 Mar 2026, both agreeing the entity is no longer active). Two further similarly-named entities ('OK 24/7', 'OK & Friends') also show status Cancelled. This resolves the standing question (real business vs. bad queue entry): 'OK Mart' is a real, if very small and informal, Singapore mini-mart trading name — not a fabrication or typo — but every registered instance of it has been cancelled/deregistered, the most recent as of late 2025/early 2026, and none has any online storefront, social presence, or menu/price data (recordowl found zero social media presence for the 2022 entity). Cross-checked against okmart.com.tw (the Taiwan OK Mart chain referenced in prior passes) — the 2022 SG entity's business description mentions okmart.com.tw but its own name-history (renamed from 'BNB HARDWARE'/'BCS FAMILY MART') indicates an unaffiliated local sole-proprietor informally adopting the name, not a genuine Taiwan-chain franchise; no evidence of formal franchise data or macros exists either way. No live 'OK Convenience'/'OK Mart' business currently exists in Singapore to research a menu for — same terminal shape as the 'soulgreen' entry above (real trading name, now closed, no data to add). Flipping status to 'researched' with zero MenuItems/GroceryProducts, per that same precedent, to stop the queue re-picking a permanently closed business every run. No Brand/Premises/MenuItem/GroceryProduct files touched (nothing to add for a defunct entity). If any 'OK Mart'/'OK Convenience' reopens in Singapore under a live UEN, revert this to 'pending' and re-research from scratch."
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
    status: "pending",
    notes: "UPDATE 2026-09-02 (scheduled restaurant-track run): picked deterministically as this run's single-outlet target — kopitiam/koufu/foodfare/hawkers_street (the 4 higher-priority operator entries above) were each re-audited fresh first and re-confirmed to have no addressable single-outlet gap this run (kopitiam: only kopitiam_king_grouper [needs a Brand-merge restructure, out of this task's scope], kopitiam_china_food [Street View/in-person is the only unexhausted path, and this run's browser access was denied at the tool level, same as prior runs — confirmed by testing navigation to google.com, which was also denied], and kopitiam_cheers [non-food, never] remain, all previously exhausted; koufu/foodfare have 0 operatorId-tagged brands with zero MenuItems; hawkers_street's 27 stalls all have ≥1 MenuItem, remaining work there is identifying new concessions, not menu research). Investigated gen_korean_bbq next: the US chain of this exact name (genkoreanbbq.com, 'Gen Korean BBQ House') has an official /locations page listing 20+ outlets, all in the US (TX/CA/AZ/NV/OR/WA/FL/HI/NC) — no Singapore location. A Burpple 'Gen Korean BBQ House' Singapore page exists but is an unclaimed listing with no address, no phone, no website, and exactly one review (dated 2013, just 'Bulgogi. Walang tigil. #korean #food #bbq') — far below this project's evidentiary bar and reads as a long-defunct or never-substantial listing, not a verifiable current outlet. Two 2026-dated 'Best Korean BBQ in Singapore' roundups (sgtop10.com, misslobang.com) were also checked and neither lists a 'Gen Korean BBQ' among current Singapore Korean BBQ restaurants. No credible, current basis found for a real Singapore Brand under this name. Per this task's rule (leave the entry pending and do not fabricate rather than force a match), did NOT add a Brand/Premises/MenuItems and did NOT pick a fallback outlet in the same run. Status left 'pending' — this queue entry's premise (that a 'Gen Korean BBQ' Singapore outlet exists to research) itself may be stale/mistaken; a future pass should reconsider whether it belongs in the queue at all rather than repeating this same search. See reference/research-sessions/2026-09-02-gen_korean_bbq-no-target-found.md for the full sweep notes (kopitiam/koufu/foodfare/hawkers_street re-audit + the 79-entry pending-queue categorization: ~41 orphaned queue ids with no matching Brand row, ~22 corporate-legal-entity-name duplicates of chains already covered elsewhere, ~12 bare SFA-licensee/personal-name entries in the known task #29 bucket, 4 entries with a pre-existing single generic MenuItem of uncertain rigor left untouched pending a dedicated data-quality audit rather than bookkeeping-fixed unilaterally)."
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
    status: "researched",
    notes: "CLOSED OUT 2026-09-03 (scheduled restaurant-track run): WebSearch confirms Singapore never sustained a lasting TGI Fridays presence — 3 outlets total across two eras (Penang Road, opened 1992; Orchard Road and East Coast Road, both opened 2017) all closed within roughly two years of opening. A 2022 plan to open 4 more Singapore restaurants did not result in any current outlet (no evidence found of it materializing). The Yelp listing for the East Coast Rd address is explicitly marked 'CLOSED'. Separately, TGI Fridays Inc. (the US parent) filed for Chapter 11 bankruptcy 2 Nov 2024, affecting the global chain generally, though Singapore had already had zero outlets for years before that. No current, credible menu/pricing/nutrition basis exists for a Singapore location. Not resolving via fabrication per project rules (CLAUDE.md section 5). Flipped to 'researched' with zero MenuItems as a terminal state — same precedent as soulgreen/ok_convenience/ang_foo_lui — to stop this entry from repeatedly re-blocking the restaurant-track queue. If TGI Fridays ever reopens in Singapore, revert this to 'pending' and re-research from scratch. This run's actual research target was eighteen_chefs (see that queue entry and reference/research-sessions/2026-09-03-eighteen_chefs.md) — a real, currently-operating chain found further down this same priority tier."
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
    status: "researched",
    notes: "Researched 2026-09-03 (scheduled restaurant-track run): kopitiam/koufu/foodfare/hawkers_street/food_junction (higher-priority pending operator entries) were not re-audited from scratch this run given exhaustive same-week (2026-09-01/02) confirmation that each has no addressable single-outlet Phase 2 gap (browser-nav denial is a session-level gate, not a daily-changing fact); gen_korean_bbq (checked 2026-09-02) also re-confirmed to have no credible SG basis. tgi_fridays, next in priority+list order, turned out to be a long-defunct brand in Singapore (see that queue entry) and was closed out rather than picked as this run's target. Picked eighteen_chefs next: a real, currently-operating, well-documented homegrown SG Western-food chain (est. 2007, Chef Benny Se Teo) with no existing Brand/MenuItem rows. New Brand added (type restaurant, cuisine Western, dietTags ['halal'] — confirmed via Zabihah/singaporehalaldirectory.com/asiahalaldirectory.com/halalboleh.com plus a founder Facebook post). Added 6 MenuItems spanning Burgers/Pasta(x3)/Sides/Meat (Eighteen Beef Burger, Truffle Cheese Fusilli, Shimeji Mushroom & Asparagus Aglio Olio, Aglio Olio Mushroom Chicken, Salted Egg Fries, Ribeye with 3 Pcs Prawns & 4 Pcs Calamari Rings) — real dish names + SGD prices cross-verified across multiple independent third-party menu aggregators agreeing on identical figures (sgmyfoodie.com, smpfoodies.com, sgpmenus.com, menu-sg.com, sgrestaurantmenu.org, singmenus.org). No official nutrition source exists for this chain, so all 6 items are confidence 'estimated', macros reasoned/calibrated against this project's own ss_shackburger/ss_double_shackburger, saiz_aglio_olio, and wb_chicken_aglio_olio entries (see menuItems.ts comment block for the full calibration reasoning). Skipped Salted Egg Snack Platter (ambiguous multi-item composition, no credible single-dish basis) and Dory Breaded Fish & Chips (dish confirmed to exist but no price found across any source checked) rather than guess. No SFA lookup (type 'restaurant', not hawker/food_court_stall — Phase 3 out of scope). No Premises added — this run's browser pane (mcp__Claude_Browser) denied navigation when tested directly (preview_start to sgpmenus.com came back 'navigation... denied or failed'), same unattended-session gate documented throughout this file's other entries (kopitiam/swensen_s/mccafe), so no address could be verified/geocoded without guessing coordinates; flagged for a future pass with browser/OneMap access. See reference/research-sessions/2026-09-03-eighteen_chefs.md."
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
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: New Upper Changi Road Blk 58) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-02 (3rd restaurant-track scheduled run today): individually WebSearched 'Lee Len Tong' + this venue's address (not previously attempted individually — earlier runs only spot-checked one task #29 bucket member, Chong Yo Private Limited). Results cover the venue generally (The Marketplace @ 58, 48 food stalls) and name several other stalls (Hup Lee Wanton Mee, Original Changi Ten Mile, Old Chai Chee Minced Meat Noodle) but no source names a stall called 'Lee Len Tong'. No stall-level directory found (eatshopplay.sg's listing has venue info only, no per-stall names). Consistent with the established task #29 finding (bare SFA-licensee personal name, never appeared on signage, needs Street View/in-person ID). In-app browser navigation was also tested this run and denied at the tool level (google.com, openstreetmap.org, burpple.com all denied — same unattended-session gate as every prior scheduled run). Did not fabricate a menu. Status left 'pending'."
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
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok South Road Blk 16) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-02 (3rd restaurant-track scheduled run today): individually WebSearched 'Goh Poo Huat' + this venue's address — results cover Blk 16 Bedok South Market and Hawker Centre generally (64 stalls; prawn noodle, congee, nasi lemak, vegetarian stalls named in various food blogs/reviews) but no source names a stall called 'Goh Poo Huat'. Consistent with the task #29 bucket finding (bare SFA-licensee personal name). Browser navigation denied this run (see the 'new_upper_changi_road_blk_58_lee_len_tong' entry's same-run note for detail). Did not fabricate a menu. Status left 'pending'."
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
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Bedok South Road Blk 16) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-02 (3rd restaurant-track scheduled run today): individually WebSearched 'Kwek Ah Heoh' + this venue's address — same venue-level results as the sibling 'goh_poo_huat' entry at this run (Blk 16 Bedok South, 64 stalls), no source names a stall called 'Kwek Ah Heoh'. Consistent with the task #29 bucket finding. Browser navigation denied this run. Did not fabricate a menu. Status left 'pending'."
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
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Clementi Ave 3 Blk 448) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-02 (3rd restaurant-track scheduled run today): individually WebSearched 'Lee Jim Pong' + this venue's address — results cover Clementi 448 Market & Food Centre generally and name several other stalls (Zheng Zhi Wen Ji Pig's Organ Soup, Boon Kee Wanton Mee, Soon Lee Porridge, Chai Ho Satay, Fried Carrot Cake) but no source names a stall called 'Lee Jim Pong'. Consistent with the task #29 bucket finding. Browser navigation denied this run. Did not fabricate a menu. Status left 'pending'."
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
    status: "researched",
    sfaLicenceNo: "SW04164A000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Teban Gardens Market and Food Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-05 (restaurant-track scheduled run): confirmed this Brand trades as \"Al Barakath Restaurant & Catering PTE LTD\" via its own foodpanda delivery-menu listing — the listing's address (Block 39 HDB Teban Gardens, Teban Gardens Rd 39 UNIT N0: 01-332, 600039) is an exact match to this Brand's existing SFA-sourced Premises row (licence SW04164A000, premisesAddress \"39 TEBAN GARDENS ROAD #01-332 SINGAPORE 600039\"), so no separate SFA lookup was needed (Phase 3 skipped per this task's own rule for an already-existing Brand). Added 7 real MenuItems from the outlet's own menu (Briyani Chicken, Briyani Mutton, Egg Onion Prata, Murtabak Ayam, Mutton Set Meal, Fish Set Meal, Plain Thosai 2pcs) — real dish names + current SGD prices from the listing, macros reasoned/calibrated against this project's own existing Roti Prata/Egg Prata, Thosai (Plain), Murtabak (Chicken), and Nasi Briyani (Chicken) entries (no official nutrition source exists for this individual stall), all confidence 'estimated'. Left the pre-existing generic 'Nasi Briyani' item untouched. Brand now has 8 MenuItems total. tsc --noEmit clean in sandbox mirror. Status flipped to 'researched'. See reference/research-sessions/2026-09-05-teban_gardens_barakath_international.md."
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
    status: "researched",
    sfaLicenceNo: "E84169N004",
    notes: "Researched 2026-09-03 (scheduled restaurant-track run): kopitiam/koufu/foodfare/hawkers_street (the 4 highest-priority pending entries) were not re-audited from scratch this run given exhaustive same-week (2026-08-22 through 2026-09-02) confirmation each has no addressable single-outlet Phase 2 gap; re-verified the browser-navigation gate still applies this run too (preview_start to google.com denied). Rather than re-walk ~65 already-categorized medium-priority task #29 bare-SFA-licensee/corporate-duplicate entries one by one, scanned the pending list for any entry whose own `name` field directly names a specific, identifiable dish per CLAUDE.md section 5 rule #2 (rather than a generic corporate/licensee string) — 'Bangkok Street Mookata Pte. Ltd.' is the first such entry in priority+list order ('mookata' is a specific, well-known Thai BBQ-hotpot style, not a generic term). Confirmed via WebSearch this is a real, currently-operating 10-outlet Singapore chain with its own official ordering site (bangkokstreetmookata.com.sg) listing Bedok among its branches (Fengshan is a Bedok subzone) — high-confidence match to this exact SFA licensee name (a distinctive multi-word trade name, not a coincidental substring match). Added 6 MenuItems (Marinated Chicken, Basil Chicken, Marinated Pork Collar, Marinated Pork Belly, Marinated Beef — all site-confirmed 'Small' portion starting prices; A4 Japanese Wagyu Beef, a single-SKU premium item) sourced from the brand's own official product pages. All 6 confidence 'estimated' — no nutrition source exists for raw BBQ/hotpot ingredients; macros reasoned from typical small-portion (~100-120g) raw-to-cooked weights per cut, cross-checked against this DB's existing generic 'Mookata' per-pax dish-lookup entry for scale. Marinated Pork Collar/Belly carry no compatibleWith array (explicitly pork-named, CLAUDE.md 5.1); the other 4 get 'no_pork'. No halal tag (shared pork/non-pork grill, not confirmed halal-certified). Deliberately excluded the multi-pax 'Mookata Set Platter for 2/3-4/5-6/7-8' sharing sets (no credible single-serving basis without guessing division) and several near-duplicate/under-specified a-la-carte items (garlic variants, streaky bacon, pig liver, pork ball, luncheon meat, sirloin beef cube, beef short plate variants). No SFA/Phase-3 work needed or attempted — this Brand's Premises already carries real SFA data from the 2026-08-20 restructure. See reference/research-sessions/2026-09-03-85_fengshan_centre_bangkok_street_mookata_pte_ltd.md."
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
    status: "researched",
    sfaLicenceNo: "E02200B000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: 85 Fengshan Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-04 (scheduled restaurant-track run): confirmed J K Kings Prata Pte Ltd as a real, distinctly-named Indian-Muslim prata/roti-canai coffeeshop chain (SFA/ACRA company records + OpenRice listing for its Jurong East branch). Added 8 MenuItems (Roti Prata, Egg Prata, Cheese Prata, Prata with Fish Curry, Murtabak (Chicken), Chicken Biryani, Indian Rojak, Teh Tarik) — dish names sourced from Foursquare reviews of the chain's Jurong East branch plus a general menu-category web search (same legal entity/chain; no source covers this specific Fengshan branch individually). All confidence 'estimated', no official nutrition source for this chain. See reference/research-sessions/2026-09-04-85_fengshan_centre_j_k_kings_prata_pte_ltd.md. Status flipped to 'researched'."
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
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Clementi West Street 2 Blk 726) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-05 (scheduled restaurant-track run, checked not selected): sgpbusiness.com confirms 'New Century Food House @ 721 Pte. Ltd.' principal activity is SSIC 56122, 'operators of food courts, hawker centres, coffee shops and canteens' — this is a coffeeshop-operator company, not a single dish-stall, so its SFA licence at Clementi West Street 2 Blk 726 likely covers the whole coffeeshop premises rather than one stall. Assigning a MenuItem here risks the same container-brand misrepresentation flagged in CLAUDE.md §4.3 (Fork & Spoon, etc.) without first confirming whether this Premises row is one internal stall or the entire venue. Not selected this run; flagged for a future pass with more investigation (same open question as toa_payoh_west_market_and_food_court_chang_cheng_food_paradise_pte_ltd's 2026-09-04 note)."
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
    status: "researched",
    sfaLicenceNo: "NE15028V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Hougang 105 Hainanese Village Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-17 (scheduled restaurant-track run): this queue's deterministic first pick (kopitiam, high priority) was re-checked and still has no addressable gap — its 3 remaining zero-menu sub-brands (kopitiam_cheers/never, kopitiam_china_food/needs Street View, kopitiam_king_grouper/needs a Brand-merge restructure) are unchanged from the 2026-09-02 note, and koufu/foodfare still have 0 operatorId-tagged Brand rows per that same note. Swept the rest of the priority-sorted pending queue per that established precedent and found this entry already had 1 MenuItem (hg105_1, Chicken Katsu) from earlier untracked work despite showing 'pending' — below the 3-item minimum, so not yet complete. 'Bachmann Japanese Restaurant' is a real, findable Singapore Japanese-casual chain (other branches confirmed at Bugis Junction, IMM Sengkang, Maritime Square, Great World City, VivoCity via Tripadvisor/Sluurpy/a Bugis Junction mall directory page) — no outlet-specific source exists for this Hougang 105 branch, so used the chain's own consistent menu naming/pricing as the basis, same 'chain-wide menu, no outlet-specific source' pattern as kopitiam_culiang_yufen. Added 3 Ramen items (Tonkotsu Ramen, Cha Shu Ramen, Spicy Ramen, all $10.90 — consistent across independent chain listings at Bugis Junction) and 1 rice set (Fried Chicken Curry Rice, $12.90, from the same Bugis Junction listing's 'Curry Rice/Toji/Rice Sets from $12.90' band). Discarded one source (menus.sg) for cross-contaminated content (mixed in an unrelated 'Ajisen' ramen brand's items) and discarded the receipt-OCR section of the Bugis Junction mall fan-site page (garbled fragments like 'F. CHIK', 'S. DUCK BMK PIZZA' — not usable). All 4 new items confidence 'estimated', macros reasoned/calibrated against this project's own existing Tonkotsu Chashu Ramen (650/30/65/28, used at kopitiam_kokoro_kiosuku and ramen_king_hws) and Chicken Katsu Curry Rice (620/26/68/24, at kopitiam_washouku_geon) entries as analogs. Tonkotsu Ramen and Cha Shu Ramen left with no compatibleWith tags (tonkotsu = pork bone broth, chashu = roast pork — both explicitly pork-derived per CLAUDE.md 5.1's categorical-exclusion spirit); Spicy Ramen also left untagged (protein/broth base not specified in any source, too ambiguous to guess); Fried Chicken Curry Rice tagged ['no_pork'] (named protein is chicken). No SFA lookup performed (Brand already existed with real SFA-matched Premises data from the 2026-08-20 restructure). Brand now has 5 MenuItems total; flipping status to 'researched'. See reference/research-sessions/2026-09-17-hougang_105_bachmann_japanese_restaurant.md."
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
    status: "researched",
    sfaLicenceNo: "SW04150L001",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Jurong West Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-05 (scheduled restaurant-track run): kopitiam/koufu/foodfare/hawkers_street (the top 4 higher-priority entries) re-confirmed non-actionable from their own notes, same as every recent run. Swept down the priority-sorted pending queue past the known task #29 bare-personal-name bucket (positions 4-15) and the corporate-legal-entity chain-duplicate entries, sample-checking several 'Pte. Ltd.'-suffixed hawker entries for a real trading name behind the licensee name: 'New Century Food House @ 721 Pte. Ltd.' (Clementi West Street 2 Blk 726) turned out to be a coffeeshop-operator company (SSIC 56122, 'operators of food courts, hawker centres, coffee shops and canteens' per sgpbusiness.com) rather than a single dish-stall, so assigning it a MenuItem would misrepresent an entire multi-stall coffeeshop as one dish concept (CLAUDE.md §4.3) — not selected. 'Golden Rooster Pte. Ltd.' at this entry, however, confirmed via WebSearch/web_fetch as a real, well-documented trading name: a branch of the 34-outlet Tenderfresh Group 'Golden Rooster' fried/BBQ-chicken franchise (tenderfresh.com.sg/goldenrooster; a 2016 TODAY/malaymail.com feature article names it explicitly with a S$9.80 whole-fried-chicken price point; a 2017 Ivan Teh food-blog review of the shared Tenderfresh Classic & Golden Rooster menu gives further named dishes and per-piece wing pricing) — selected. Added 7 MenuItems (Half Fried Chicken with Rice & Salad, Chicken Chop Set, Black Pepper Chicken Chop Rice, Fish & Chips, Chicken Wing Fried Rice, Chicken Wings Fried/BBQ 2pc), all confidence 'estimated', plus Brand dietTags: ['halal'] (confirmed via halalboleh.com's Sims Vista Market and Food Centre directory explicitly listing 'Golden Rooster Western Food' as halal, corroborated by Tenderfresh Group's own site and sibling sub-brand halalboleh.com listings). No SFA lookup needed (Phase 3 skipped — Brand already had SFA data from the 2026-08-20 restructuring). See reference/research-sessions/2026-09-05-jurong_west_hawker_centre_golden_rooster_pte_ltd.md."
  },
  {
    id: "yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd",
    name: "Boon Tong Kee Pte Ltd",
    aliases: ["boon tong kee pte ltd"],
    type: "hawker",
    cuisine: "Local & Hawker",
    priority: "medium",
    status: "researched",
    sfaLicenceNo: "SW14705V000",
    notes: "Outlet row already exists (added in the 2026-08-20 SFA hawker restructuring, location: Yuhua Market and Hawker Centre) — only menu items/macros (FoodOption records) are needed, not a new Outlet. UPDATE 2026-09-04 (scheduled restaurant-track run): picked deterministically as this run's single-outlet target (kopitiam/koufu/foodfare/hawkers_street re-confirmed as having no addressable Phase 2 gap this run, per this same week's exhaustive prior audits on 2026-09-02/03 — not re-walked from scratch; food_junction, the next real target used the last 2 days running, was intentionally set aside this run in favour of a fresh, fully-resolvable entry rather than a third consecutive incremental touch). Boon Tong Kee is a well-documented Singapore Hainanese chicken rice chain (boontongkee.com.sg) with an SFA-confirmed Grade A licence at this premises. Added 7 MenuItems (Steamed Chicken Rice, Roasted Chicken Rice, Chicken Rice with Steamed Minced Pork, Soup of the Day, Sweet & Sour Pork, Braised Bean Curd and Roast Pork with Shrimp Paste, Barley Water) — real dish names cross-checked against the official site's recommended-dishes/chicken-rice pages and a third-party aggregator (sgfoodprice.org) that cites the official menu as its source; that aggregator's own 'nutrition information' table was NOT used (looks templated/formulaic, not real data) — macros are instead reasoned estimates calibrated against this project's own existing Chicken Rice/Roasted Chicken Rice convention (~550/28/65/18, used across dozens of other stalls) and its existing Sweet & Sour Pork Set Meal entry (kopitiam_sin_food_26). Noted in the code comment that the official site's zi-char 'Recommended Dishes' page only names 8 full-service branches and Yuhua is not among them, so only classic chicken-rice items plus a few chain-wide named sides/soup/beverage were added rather than the full zi-char menu, to avoid overclaiming what this specific hawker-centre premises sells. All 7 items confidence 'estimated'. No SFA lookup needed (Brand/Premises already existed with real SFA data). See reference/research-sessions/2026-09-04-yuhua_market_and_hawker_centre_boon_tong_kee_pte_ltd.md."
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    status: "researched",
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
    notes: "2026-08-23: new Operator (BreadTalk Group's food-court chain, foodjunction.com) added per user request to cover food-court operators beyond Kopitiam/Koufu/Foodfare/Hawkers' Street. Its /outlets/ page is a plain static list of 8 Singapore venues (Labrador Tower, Century Square [as 'The Food Market'], Great World, Junction 8, Lot One, NEX, Rivervale Mall, Westgate) plus 1 in Malaysia (excluded). Its /our-brands/ page directly names 4 house-brand concessions with their dish highlights AND which specific venues each is at: Go Teppan Go (NEX, Junction 8, Century Square, Raffles City — this last venue isn't on the /outlets/ list at all, a gap in their own site), Toast Junction (NEX, Rivervale Mall, Great World, Century Square), Ke/Quench (Junction 8), Fireyaki (venue tag missing from the source page for this one brand only — confirmed via foodpanda instead: Junction 8). Added all 4 as Brand rows with operatorId: 'food_junction', 10 premises total, real addresses geocoded via OneMap ('Raffles City' used the mall's general address since no specific unit was published). Remaining work: the site's own outlets almost certainly have other, non-house-brand named concessions inside them (same situation as Kopitiam before its stall-sitemap breakthrough) — no equivalent bulk data source found yet for Food Junction; would need per-venue research (Google Maps/on-site) rather than another lucky sitemap. Same macro gap as Kopitiam/Koufu applies — no MenuItems added. UPDATE 2026-09-02 (scheduled restaurant-track run): picked as this run's single-outlet research target. Of the 4 house-brand concessions, Go Teppan Go/Toast Junction/Fireyaki already had 1 generic MenuItem each from an earlier, less-rigorous pass (fj_1/fj_2/fj_3 — single generic category items like 'Teppanyaki Bento', not tied to specific researched dish names); food_junction_ke_quench (Ke/Quench, Drinks/Dessert, Junction 8 premises) had zero. Researched Ke/Quench via foodjunction.com/our-brands/ (live official page, confirms 4 'Must Try' items: Coco Cloud, Sea Salt Chendol, Kopi Slush, OG Lemon Punch) cross-verified against two independent food blogs (eatbook.sg's 2022-04-07 Food Junction Great World opening piece and girlstyle.com's 2021-11-17 Rivervale Mall piece) which both independently confirm the same 3 items with prices: Coco Cloud $4.50, Sea Salt Chendol $2.20, Kopi Slush $2.80. Added these 3 as MenuItems (fj_4/fj_5/fj_6), all confidence 'estimated' — no official nutrition source exists for this small dessert/drinks concept, macros reasoned/calibrated against this project's own existing Chendol entries (cc_chendol/kopitiam_chendol/etc., ~278-320 cal/3g protein/54-60g carbs/6g fat) for Sea Salt Chendol, its own Raw Coconut Latte entry (200/4/22/9 @ $5.80) scaled up for added coconut ice cream for Coco Cloud, and interpolated between its own hot Kopi entries (85-130 cal) and the McCafe Frappe Mocha/Caramel entries (370-380 cal @ $6.50) for Kopi Slush. Deliberately did NOT add the 4th 'Must Try' item, OG Lemon Punch/100% Punched Lemon Tea: a WebSearch-surfaced Burpple review priced 'OG Lemon Punch [$3.60]' but on fetching the review directly it turned out to be at Food Republic (Suntec City) — a different food-court chain entirely, not Food Junction — so not a verifiable source for this Brand; left out rather than guess a price, per this project's never-fabricate rule. Note also found but not acted on: this project's existing Premises row for food_junction_ke_quench lists only 'Junction 8', but the live official foodjunction.com page lists Ke/Quench's actual locations as NEX/Rivervale Mall/Great World/Century Square (Junction 8 is listed for Toast Junction, not Ke/Quench) — a possible pre-existing Premises data error from the 2026-08-23 add; flagged here for a future pass rather than corrected in this run (out of Phase 2's menu-research scope). Remaining work on this queue entry unchanged: the site's outlets almost certainly have other non-house-brand named concessions not yet identified (needs per-venue Google Maps/on-site research, no bulk sitemap source found); status left 'pending' for that reason. See reference/research-sessions/2026-09-02-food_junction_ke_quench.md. UPDATE 2026-09-03 (scheduled restaurant-track run): picked as this run's single-outlet research target (kopitiam/koufu/foodfare/hawkers_street re-confirmed as having no addressable Phase 2 gap per this same week's exhaustive prior audits, not re-walked from scratch). Of the remaining under-researched house-brand concessions, Fireyaki (fj_3) still had only its 1 original generic item — upgraded it with 3 real, currently-orderable named dishes (Teppanyaki Chicken Chop Western Set $10.70, Teppanyaki Chicken Chop With Spaghetti $12, Teppanyaki Chicken Chop With Garlic Egg Fried Rice $12), sourced from Fireyaki's live foodpanda listing and cross-checked against Fireyaki's own official 'Must Try' list on foodjunction.com/our-brands/ (which independently names the Western Set as a Must Try, confirming the match). Deliberately left out the official page's other 2 Must Try items (Pork Chop with Tomato Spaghetti, Jumbo Fried Fish Fillet Western Set) and a 2022 opening-week article's different item names/prices (Teppan Tenderloin Steak, Soy Glazed Chicken Chop, Ramen Yakisoba Pancake) since none appear on the current live menu — see menuItems.ts's comment block for the full sourcing/calibration reasoning. No SFA lookup (Brand/Premises already existed). Note: this session's build-mirror `npm install` failed with ENOSPC (the sandbox's shared /sessions partition was already at 100% before this run started, not caused by this run's own footprint, which is ~150MB) — `tsc --noEmit` could not be run to completion (even typescript's own lib .d.ts files were truncated mid-install), so Phase 5's automated verification is incomplete this run. Substituted manual verification: re-read the full diff against ~10 neighboring MenuItem entries for exact syntax/field-shape match, ran a Python brace/bracket-balance check across the full modified file, and confirmed via grep that no id collisions exist. Flagged here rather than silently skipped — a future run with working disk space should re-run the full tsc/build verification on this addition. Go Teppan Go (fj_1) and Toast Junction (fj_2) still carry only their original 1 generic item each; the site's outlets almost certainly also have other non-house-brand named concessions not yet identified. Status left 'pending' for those reasons. See reference/research-sessions/2026-09-03-food_junction_fireyaki.md. UPDATE 2026-09-15 (scheduled restaurant-track run): re-confirmed kopitiam/koufu/foodfare/hawkers_street (the 4 higher-priority operator queue entries) have no addressable single-outlet gap this run (same documented state as prior runs); gen_korean_bbq (the next real single-outlet candidate by priority) was re-checked via fresh WebSearch and still has no findable Singapore outlet, consistent with its 2026-09-02 finding, so still correctly left pending rather than fabricated. Picked Go Teppan Go (fj_1) here, the other of the two remaining 1-generic-item house-brand concessions flagged above. Upgraded it from the single generic 'Teppanyaki Bento' to 9 real MenuItems (gtg_1 through gtg_9: Soy Butter Chicken Chop With Black Pepper Sauce + its Deluxe Set, Signature Black Pepper Ribeye Steak, Honey Mustard Salmon Fillet, Miso Chargrilled Squid, Mixed Mushroom Medley, Teppan Vegetables, White Rice, Spring Onions Rolled Omelette), sourced from MakanCents' photographed-price stall listing and cross-verified against foodjunction.com/our-brands/'s own 'Must Try' list for this brand — see menuItems.ts's comment block immediately above the gtg_ entries for the full sourcing/calibration reasoning and reference/research-sessions/2026-09-15-food_junction_go_teppan_go.md. Toast Junction (fj_2) still carries only its original 1 generic item, and the site's outlets almost certainly still have other non-house-brand named concessions not yet identified — status left 'pending' for those reasons, same as before."
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
    status: "researched",
    notes: "UPDATE 2026-09-02 (scheduled restaurant-track run, bookkeeping fix): audited all 37 fei_siong-operatorId Brand rows (Ci Yuan Hawker Centre) against the live menuItems.ts and found every one already has ≥1 MenuItem (this entry's own notes below were stale — the '37 stalls need MenuItems' framing no longer reflects the current dataset, likely covered by untracked work between 2026-08-23 and now, same staleness pattern documented on several other queue entries this session). Flipping to 'researched' as a verified bookkeeping fix, no new MenuItems added by this run's pick logic since this entry itself had no addressable gap left. This run's actual single-outlet research target was food_junction_ke_quench (Ke/Quench @ Food Junction, 3 real MenuItems added — see that queue entry and reference/research-sessions/2026-09-02-food_junction_ke_quench.md). Original notes preserved below for history. 2026-08-23: new Operator added per user request. Fei Siong Group (feisionggroup.com.sg) turns out to also be the operator behind Hawkers' Street (already in this database as its own operator — not merged, since Hawkers' Street already has an established brand identity and 27 correctly-modeled stalls; treat as a sibling operator, not a rename). Fei Siong runs 3 more hawker centres, each with its own dedicated site: Ci Yuan Hawker Centre (ciyuanhawker.com.sg) — real success: its /our-stalls/ page is a plain Elementor-built list of all 38 stalls with unit number, English/Chinese name, cuisine tag, and hours; added 37 as Brand rows with operatorId: 'fei_siong' (dropped one bare 'Hot & Cold Drink Stall' generic per the same no-value-generic rule used for Kopitiam), all at the single Ci Yuan address (51 Hougang Ave 9, Singapore 538776) with per-unit addresses, geocoded once for the building. Woodleigh Village Hawker Centre (woodleighhawker.com.sg) — checked, genuinely nothing to add: the site itself says 'Our stall application period has closed. We will post future stall availability information here' — it hasn't opened yet, not a research gap. Buangkok Hawker Centre (buangkokhawker.com.sg) — returned a consistent HTTP 500 (empty body) across multiple retries with different headers; doesn't look like a WAF block (no challenge page), more likely a real server-side issue on their end — worth a retry in a future session rather than guessing content. Same macro gap as Kopitiam/Koufu applies — no MenuItems added for Ci Yuan's 37 stalls yet."
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
    status: "researched",
    notes: "UPDATE 2026-09-02 (scheduled restaurant-track run, bookkeeping fix): audited all 41 canopy_hawkers-operatorId Brand rows (Bukit Canberra Hawker Centre) against the live menuItems.ts and found every one already has ≥1 MenuItem (this entry's 'no MenuItems added yet' framing was stale, same pattern as fei_siong and yishun_park_hawker_centre this run — see those entries). Flipping to 'researched' as a verified bookkeeping fix; no new MenuItems added here since there was no remaining gap. This run's actual single-outlet research target was food_junction_ke_quench — see that queue entry and reference/research-sessions/2026-09-02-food_junction_ke_quench.md. Original notes preserved below for history. 2026-08-23: added per direct user request to apply the sitemap-discovery technique to independent NEA hawker centres, not just food-court chains. This venue already existed in premises.ts with 6 generic SFA-sourced stalls; its operator, Canopy Hawkers Group, runs its own site (bukitcanberrahc.sg, WordPress) whose 'portfolio_page' custom-post sitemap lists all 44 stalls as individual pages. Each page's <title> tag carries the real trading name; the URL slug is a stale cuisine-category label from when the post was first created and several no longer match the current tenant (e.g. slug 'porridge' -> title 'Teochew Fish Soup', slug 'indian-rojak' -> title 'Hock Kee Teochew Noodle', slug 'mixed-vegetarian-rice' -> title 'Al-usroh') — cuisine text and dietTags (halal/vegetarian) were derived from the stall's own name/title where the slug conflicted, not blindly trusted from the slug, to avoid mislabeling (especially diet claims). New Operator 'canopy_hawkers' added. 41 real Brand rows (2 'Coming Soon' units excluded), 42 Premises rows (Kopi Tan runs 2 adjacent units, #01-22 and #01-23) — all at 21 Canberra Link, Singapore 756973, geocoded once for the building with per-unit addresses. Same macro gap as every other batch — no MenuItems added yet."
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
    status: "researched",
    notes: "UPDATE 2026-09-02 (scheduled restaurant-track run, bookkeeping fix): audited all 25 timbre_plus_hawkers-operatorId Brand rows (Yishun Park Hawker Centre) against the live menuItems.ts and found every one already has ≥1 MenuItem (this entry's 'no MenuItems added yet' framing was stale, same pattern as fei_siong and bukit_canberra_hawker_centre this run — see those entries). One Punggol Hawker Centre, mentioned below as not completed, was not re-attempted this run (out of scope — this entry's own Brand backlog is what's now resolved, the One Punggol redirect issue is a separate, still-open item for a future pass). Flipping to 'researched' as a verified bookkeeping fix. This run's actual single-outlet research target was food_junction_ke_quench — see that queue entry and reference/research-sessions/2026-09-02-food_junction_ke_quench.md. Original notes preserved below for history. 2026-08-23: same pass as Bukit Canberra. This venue already existed in premises.ts with 6 generic SFA-sourced stalls; its own site (yishunparkhc.sg, WordPress) has a 'hawkers' custom-post sitemap listing 34 stall pages. Unlike Bukit Canberra, 9 of those slugs cleanly 302-redirect to the homepage instead of serving stale content — read as retired/renamed stalls and excluded rather than guessed (no content-mismatch risk here, WordPress is doing the right thing by redirecting unpublished posts). The remaining 25 pages each have a real trading name plus a 'name / cuisine / #unit' block in the page body (cuisine phrasing here is the operator's own, not slug-derived, so trusted directly — no equivalent mismatch problem as Bukit Canberra). New Operator 'timbre_plus_hawkers' added rather than reusing 'canopy_hawkers': the site's own branding throughout is Timbre+ Hawkers Pte Ltd (nav says 'Timbre App', footer contact is @timbregroup.asia) even though news coverage reports Canopy Hawkers Group taking over operations from Jul 2026 — sourced what the site itself says rather than the reported handover; worth revisiting if/when the site itself updates. 25 real Brand rows, 27 Premises rows (XinLongXing Modern Tze Char spans 3 adjacent units, #01-28/29/30) — all at 51 Yishun Avenue 11, Singapore 768867, geocoded once for the building with per-unit addresses. One Punggol Hawker Centre (onepunggolhc.sg), also ex-Timbre+ with the same sitemap pattern (31 stall slugs), was NOT completed — every individual stall page inconsistently 302-redirects to its homepage regardless of headers/cookies/referer tried (one attempt with a test cookie returned 200 once, but was not reproducible on retry) — flagged for a future attempt, possibly via browser automation instead of raw curl. Same macro gap as every other batch — no MenuItems added yet."
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
    notes: "2026-08-24 (address-accuracy audit): the `mccafe` Brand already exists with 10 real MenuItems, but its only Premises row (`mccafe_p19`) was a legacy 'Multiple outlets islandwide' placeholder with no real address — removed rather than left misleading, since a single address can't represent a co-located concept. McCafe is real (WebSearch: ~43-46 of McDonald's 136 Singapore outlets have a McCafe corner), but which specific outlets is unconfirmed — needs per-outlet research (McDonald's own site or a McCafe-specific store list) to identify the actual subset before adding real Premises rows. Until then McCafe has 0 premises and won't appear as a location in the app, even though its menu data is real and ready. UPDATE 2026-08-30 (picked deterministically as the top pending grab_go/ready_to_eat/supermarket entry by priority): the 'find the ~43-46 outlet subset' premise this entry was written on turns out to conflict with McDonald's own current official site. www.mcdonalds.com.sg/mccafe (fetched live) states outright 'Available at all restaurants islandwide' directly under its McCafé beverage lineup (Americano/Iced Americano/Latte/Iced Latte/Cappuccino) — no subset language, no per-outlet locator or McCafe filter on their store locator. The ~43-46 figure traces only to third-party aggregator blogs (mcdonaldsmenu.sg-style sites, unaffiliated per their own disclaimer, and older SmartLocal/AllSGPromo pieces) with no verifiable outlet-by-outlet source list, and no two of them agree on a number (one said 'over 50 McCafé outlets' in the same breath as '43 locations'). Attempted the official mcdonalds.com.sg/locate-us page directly via browser to check for a McCafe-specific filter tag per outlet — navigation was blocked/denied at the browser level, could not load it interactively. Given: (a) the brand's own current site claims full islandwide availability, contradicting the queue's founding premise that this is a subset-of-outlets problem, and (b) no credible, individually-verifiable outlet list exists to sample-check against (unlike the SFA Business Name matching that resolved the analogous cold_storage/giant/7eleven ambiguity), adding a hand-picked list of 5-10 outlets sourced from blog mentions ('Bishan Park', 'Bukit Batok', 'Canberra Plaza', etc.) would repeat exactly the kind of unverifiable-source fabrication this project's rules exist to prevent. Per the same 'needs a human decision, not a guess' pattern already used for the Foodfare institutional-catering scope question: NOT resolving this myself. Two real options for a human to pick: (a) treat McCafé as available at all 136 existing `mcdonalds` Brand Premises per the official site's own claim, and either drop the standalone `mccafe` Brand/Premises concept entirely (fold its 10 MenuItems into `mcdonalds` as a beverage category) or copy all 136 `mcdonalds` Premises rows as `mccafe` Premises too; or (b) keep pursuing a true subset if there's reason to distrust the 'islandwide' marketing copy (e.g. it may describe menu/ordering availability via app/kiosk rather than a physical in-store McCafé service corner, which is a real distinction McDonald's has drawn in some markets). No Brand/MenuItem/GroceryProduct/Premises files touched this run. Left 'pending'. Per this run's task design, no fallback entry was picked in its place this run — see session report reference/research-sessions/2026-08-30-mccafe-colocation.md. UPDATE 2026-08-31 (picked deterministically again, top pending grab_go/ready_to_eat/supermarket entry by priority): found the piece that actually explains the 2026-08-30 conflict, via McDonald's SG's own Help Center (custcare.mcdonalds.com.sg), articles 'Will McCafé be removed in McDonald's islandwide?', 'Is McCafé removed from McDonald's islandwide?', and 'Why is the McCafé I visit regularly being removed? Can I still get my McCafé beverages and food items from the main counter?' (article bodies are JS-rendered behind Zendesk and didn't return via direct fetch or in-app browser — mcdonalds.com.sg is nav-blocked for this session same as 2026-08-30 — but a targeted WebSearch surfaced their substance): from 27 March 2026, McDonald's Singapore stopped serving barista-made McCafé beverages islandwide, removing the dedicated McCafé service-counter concept entirely, while select beverages (cited: Premium Roast Coffee, Americano, Latte, Cappuccino, Frappe) continue to be served from the main counter at every restaurant. This resolves the empirical half of the 2026-08-30 conflict: the ~43-46-outlet 'McCafé corner' figure that third-party blogs kept citing wasn't wrong so much as describing a service model this chain retired — there is no longer a physical subset to find, because the barista corners it would have described don't exist anymore anywhere. Re-fetched www.mcdonalds.com.sg/mccafe live today (content dated Aug 2026, current seasonal promo running) and it still states 'Available at all restaurants islandwide' directly under the beverage lineup, consistent with (not contradicted by) the post-counter-removal model. Also note in passing, NOT acted on: the live page's current core lineup is Americano/Iced Americano/Latte/Iced Latte/Cappuccino only — no Mocha or Frappe — while this project's existing 10 mccafe MenuItems include mccafe_mocha, mccafe_frappe_mocha, and mccafe_frappe_caramel; possibly discontinued along with the barista counters (Frappe/Mocha are typically the more prep-heavy, barista-dependent drinks) or possibly just not featured on this particular promo-heavy page — needs its own confirmation before touching menuItems.ts, flagging for a future pass rather than guessing. What's still NOT resolved, and still needs the same human call as 2026-08-30 (this is a schema/modeling decision, not a fact this task can look up): Premises in this project is strictly one-brandId-per-row (src/types/db.ts) with no shared-multiple-brands mechanism, so representing 'mccafe beverages exist everywhere mcdonalds does' still requires a human to pick between (a) copying all ~136 existing `mcdonalds` Premises rows as new `mccafe` Premises rows (large mechanical edit, now better-justified given the confirmed islandwide/main-counter model), or (b) dropping the standalone `mccafe` Brand concept entirely and folding its MenuItems into `mcdonalds` as a beverage category (arguably the more accurate model now that McCafé is confirmed to be a menu line served from the same counter, not a separate corner) — option (b) reads as the better fit given today's finding but changes this project's Brand taxonomy for an existing, populated Brand, which is a bigger call than this research task's normal scope of adding items to an outlet. Not implemented either option this run — no Brand/MenuItem/GroceryProduct/Premises files touched. Left 'pending'. Per the same task-design rule as 2026-08-30, no fallback entry was picked in its place this run — see session report reference/research-sessions/2026-08-31-mccafe-colocation.md. UPDATE 2026-09-01 (scheduled grocery-track run, picked deterministically again as top pending grab_go/ready_to_eat/supermarket entry by priority): confirmed no change — mccafe still has 0 Premises rows in premises.ts, and attempting mcp__workspace__web_fetch on www.mcdonalds.com.sg/mccafe directly failed with an out-of-provenance error (the URL wasn't already surfaced via WebSearch/prior fetch in this session), consistent with the nav-blocking noted on 2026-08-30/31. Did not repeat the full WebSearch investigation since the blocker here was already identified as a taxonomy/schema decision (option a vs b, both above), not a missing fact — re-fetching the same official page would not change that. This is a human decision, not a research gap; not resolving it unilaterally. Left 'pending'. No fallback entry researched in its place this run — instead moved to the queue's only other pending grab_go/ready_to_eat/supermarket entry, ok_convenience, which was also independently re-confirmed blocked today (see that entry's same-day update). Recommend a human make the (a)/(b) taxonomy call above before this entry is picked again — repeated scheduled runs will otherwise keep reaching the same conclusion. UPDATE 2026-09-02 (scheduled grocery-track run, picked deterministically again as top pending grab_go/ready_to_eat/supermarket entry by priority): re-confirmed no change — premises.ts still has 0 rows for brandId 'mccafe'. This unattended session's Browser pane was tested directly (not assumed): navigation to mcdonalds.com.sg/mccafe was denied, and a neutral control URL (google.com) was also denied, confirming the same session-level permission gate seen on every prior scheduled run (contrast with the 2026-09-02 interactive session documented in reference/research-sessions/2026-09-02-bonchon-dosirak-browser-unblock.md, which had real browser access and resolved unrelated branch-queue leads — that access does not carry over to this unattended queue). No new facts would change the blocker regardless: this remains the same (a)/(b) Premises-modeling decision flagged 2026-08-30/31, not a missing fact. Left 'pending'. No fallback entry researched in its place this run — moved to the queue's only other pending grab_go/ready_to_eat/supermarket entry, ok_convenience, also re-confirmed blocked today (see that entry's same-day update). Recommend this entry be excluded from automated picks until a human makes the (a)/(b) call — a 6th consecutive scheduled run reaching an identical conclusion suggests the deterministic-pick rule and this entry's nature (a schema decision, not a research gap) are now working against each other. UPDATE 2026-09-03 (scheduled grocery-track run, picked deterministically as the sole pending grab_go/ready_to_eat/supermarket entry — ok_convenience is now 'researched' as of 2026-09-02, so this is the only remaining candidate in this track, not a fallback pick): re-verified rather than re-investigated. Directly tested this session's Browser pane before doing anything else: navigation to mcdonalds.com.sg/mccafe was denied, and a neutral control (google.com) was also denied — confirming the same session-level gate documented on every prior scheduled run (this is a 7th confirmation, now including one that tested a neutral control first rather than assuming the gate from the target site's failure alone). This session also had no shell/bash tool access at all (unlike prior runs, which at least had WebSearch/web_fetch), so no alternative fact-finding path was available either. No new information changes the underlying blocker: this remains the (a)/(b) Premises-modeling decision flagged 2026-08-30/31 (fold mccafe into mcdonalds as a beverage category vs. copy all ~136 mcdonalds Premises rows as mccafe Premises), not a missing fact a research pass can resolve. No Brand/MenuItem/GroceryProduct/Premises files touched. Left 'pending'. No fallback entry existed to pick in its place this run — per the audit above, every other grab_go/ready_to_eat/supermarket entry in this queue is already 'researched'. Reiterating the standing recommendation: this entry should be excluded from automated re-picks until a human makes the (a)/(b) call; an 7th consecutive identical outcome confirms this is a schema decision, not a research gap, and continuing to re-pick it is no longer productive. UPDATE 2026-09-04 (scheduled grocery-track run, picked deterministically as the sole pending grab_go/ready_to_eat/supermarket entry — every other entry in this track remains 'researched'): re-verified rather than re-investigated. Confirmed via grep that `mccafe` still has 0 rows in premises.ts and the `mccafe` Brand (id \"mccafe\", 10 MenuItems) is unchanged in brands.ts. This run had working `mcp__workspace__bash` access, unlike 2026-09-03, but did not re-run the WebSearch/browser investigation — the empirical question (does McCafé still exist islandwide via main-counter service, no dedicated corners) was already resolved on 2026-08-31 and re-confirming a marketing page again would not supply new information relevant to the actual blocker. The blocker remains the same (a)/(b) Premises-modeling decision flagged 2026-08-30 (copy all ~136 mcdonalds Premises rows as mccafe Premises, vs. fold mccafe's MenuItems into the mcdonalds Brand and drop the standalone Brand) — a taxonomy call on an existing populated Brand, outside this task's scope to make unilaterally. No Brand/MenuItem/GroceryProduct/Premises files touched. Left 'pending'. This is the 8th consecutive scheduled run reaching an identical conclusion. Reiterating the standing recommendation with more force: exclude this entry from automated re-picks entirely until a human makes the (a)/(b) call — continuing to re-pick a schema decision as if it were a research gap has stopped being useful. UPDATE 2026-09-05 (scheduled grocery-track run, picked deterministically as the sole pending grab_go/ready_to_eat/supermarket entry — every other entry in this track remains 'researched'): re-verified rather than re-investigated, per the same discipline as the last several passes. Tested this session's Browser pane directly before doing anything else, same neutral-control method as prior runs: navigation to a neutral control (google.com) was not auto-approved (this unattended session has no human present to grant the access prompt it produced), so the browser path remains closed, consistent with every prior scheduled run. Confirmed via grep that premises.ts still has 0 rows for brandId 'mccafe' and the 'mccafe' Brand (10 MenuItems) is unchanged in brands.ts. Did not re-run the WebSearch investigation — the empirical question (McCafé service model, islandwide main-counter availability, no dedicated corners) was already resolved 2026-08-31 and the blocker has been a schema decision, not a missing fact, for 8 consecutive prior passes. The blocker remains the same (a)/(b) Premises-modeling decision flagged 2026-08-30: copy all ~136 mcdonalds Premises rows as mccafe Premises, vs. fold mccafe's MenuItems into the mcdonalds Brand and drop the standalone Brand. No Brand/MenuItem/GroceryProduct/Premises files touched. Left 'pending'. This is the 9th consecutive scheduled run reaching an identical conclusion. Standing recommendation unchanged: exclude this entry from automated re-picks until a human makes the (a)/(b) call. UPDATE 2026-09-06 (scheduled grocery-track run, picked deterministically as the sole pending grab_go/ready_to_eat/supermarket entry — every other entry in this track remains 'researched'): re-verified rather than re-investigated, same discipline as the last several passes. Confirmed via grep that premises.ts still has 0 rows for brandId 'mccafe' and the 'mccafe' Brand (10 MenuItems) is unchanged in brands.ts; ok_convenience remains 'researched' so this is still the only candidate in the track. Tested this session's Browser pane before doing anything else: navigation to a neutral control (google.com) returned an explicit access-not-yet-granted response rather than loading, and this is an unattended run with no human present to answer the resulting approval prompt, so the browser path remains closed — consistent with every prior scheduled run. Did not re-run the WebSearch investigation; the empirical question (McCafé's islandwide main-counter service model, no dedicated corners) was resolved 2026-08-31 and the blocker has been a schema decision, not a missing fact, for 9 consecutive prior passes. The blocker remains the same (a)/(b) Premises-modeling decision flagged 2026-08-30: copy all ~136 mcdonalds Premises rows as mccafe Premises, vs. fold mccafe's MenuItems into the mcdonalds Brand and drop the standalone Brand. No Brand/MenuItem/GroceryProduct/Premises files touched. Left 'pending'. This is the 10th consecutive scheduled run reaching an identical conclusion — the entire grab_go/ready_to_eat/supermarket queue track is now otherwise fully 'researched', so every future scheduled run will keep re-picking this same entry and re-confirming the same schema blocker until a human makes the (a)/(b) call or removes/reprioritizes this entry. Escalating: recommend the next human session either (1) make the (a)/(b) taxonomy call directly, or (2) mark this entry with a distinct status/note so automated runs stop re-selecting it, since 10 identical outcomes in a row confirms no further scheduled run will add new information. UPDATE 2026-09-07 (scheduled grocery-track run, picked deterministically as the sole pending grab_go/ready_to_eat/supermarket entry): re-verified only, no re-investigation — confirmed via grep that premises.ts still has 0 rows for brandId 'mccafe' and the 'mccafe' Brand (10 MenuItems) is unchanged in brands.ts; the underlying empirical question (McCafé's islandwide main-counter service model, no dedicated corners since 27 Mar 2026) was already resolved 2026-08-31. This is the 11th consecutive scheduled run reaching the same conclusion: the blocker is the (a)/(b) Premises-modeling decision on an existing, populated Brand (flagged 2026-08-30 — copy all ~145 'mcd' Premises rows as 'mccafe' Premises, vs. fold mccafe's MenuItems into 'mcd' and drop the standalone Brand), which is a product/taxonomy call, not a research gap. This task's normal scope (research + append records for one queue entry) does not extend to restructuring or bulk-duplicating data for an already-populated, unrelated Brand, so — consistent with every prior pass, each of which reached the same judgment with equal or greater context — this run is deliberately not making that call unilaterally. No Brand/MenuItem/GroceryProduct/Premises files touched. Left 'pending'. Noting for the record: ResearchQueueEntry's status type only supports 'pending' | 'researched' (src/types/db.ts) with no 'blocked' state, so this task has no schema-supported way to stop future runs from re-selecting this entry — a human should either make the (a)/(b) call, remove/reprioritize this queue entry, or extend the status enum. To avoid further bloating this entry, future scheduled runs should record only a one-line reconfirmation here unless the underlying facts or schema change. UPDATE 2026-09-07b (12th pass, same day as the 05:11 SGT run above): no change — still the sole pending entry in this track, premises.ts/brands.ts/menuItems.ts unchanged for 'mccafe', blocker is still the unresolved (a)/(b) taxonomy call, not a research gap. Left 'pending'. UPDATE 2026-09-07c (13th pass, scheduled grocery-track run): re-verified via grep only — premises.ts still 0 rows for brandId 'mccafe', menuItems.ts still 10, no schema/fact change. Left 'pending'. UPDATE 2026-09-08 (14th pass, scheduled grocery-track run): re-verified via grep only, sole pending entry in track (ok_convenience still 'researched') — premises.ts still 0 rows for brandId 'mccafe', brands.ts 'mccafe' Brand and menuItems.ts's 10 mccafe MenuItems unchanged, no schema/fact change. Blocker remains the (a)/(b) Premises-modeling decision flagged 2026-08-30 — not resolving unilaterally. Left 'pending'. UPDATE 2026-09-13 (15th pass, scheduled grocery-track run): re-verified via grep only, sole pending entry in track (ok_convenience still 'researched') — premises.ts still 0 rows for brandId 'mccafe', brands.ts 'mccafe' Brand and menuItems.ts's 10 mccafe MenuItems unchanged, no schema/fact change. Blocker remains the (a)/(b) Premises-modeling decision flagged 2026-08-30 — not resolving unilaterally. Left 'pending'. UPDATE 2026-09-13b (16th pass, same-day duplicate scheduled grocery-track run): re-verified via grep only, no change since the 15th pass logged earlier today (commit 9c61e03) — premises.ts still 0 rows for brandId 'mccafe', brands.ts 'mccafe' Brand and menuItems.ts's 10 MenuItems unchanged, ok_convenience still 'researched' (sole other in-scope entry). Blocker remains the unresolved (a)/(b) Premises-modeling decision — not resolving unilaterally. Left 'pending'. UPDATE 2026-09-14 (17th pass, scheduled grocery-track run): re-verified via direct grep only (this session's shell/bash tool was unavailable due to an infrastructure issue, same class of limitation as 2026-09-03, though file read/grep tools worked fine) — premises.ts still has 0 rows for brandId 'mccafe', brands.ts still has the 'mccafe' Brand (id confirmed present), and menuItems.ts still has exactly 10 mccafe MenuItems. ok_convenience remains the only other track entry and is still 'researched', so mccafe is still the sole pending grab_go/ready_to_eat/supermarket candidate. No new facts and no schema change since 2026-08-31/2026-08-30 — blocker remains the unresolved (a)/(b) Premises-modeling decision on an existing, populated Brand, which is outside this task's normal per-entry research scope to decide unilaterally. No Brand/MenuItem/GroceryProduct/Premises files touched. Left 'pending'. This session's git commit/typecheck step (Phase 4/5) was also skipped for the same reason — no file changes were made to those tables, so there was nothing to verify or commit; this note-only queue update is the sole edit this run. Reiterating standing recommendation: a human should make the (a)/(b) call or reprioritize/flag this entry so automated runs stop re-selecting it. UPDATE 2026-09-14b (18th pass, same-day duplicate scheduled grocery-track run): re-verified via grep only, no change since the 17th pass logged earlier today — premises.ts still has 0 rows for brandId 'mccafe', brands.ts still has the 'mccafe' Brand (id confirmed present), menuItems.ts still has exactly 10 mccafe MenuItems, and ok_convenience is still 'researched' (sole other in-scope entry, confirmed type 'ready_to_eat'), so mccafe remains the sole pending grab_go/ready_to_eat/supermarket candidate. No new facts, no schema change. Blocker remains the unresolved (a)/(b) Premises-modeling decision flagged 2026-08-30 — outside this task's per-entry research scope to decide unilaterally. No Brand/MenuItem/GroceryProduct/Premises files touched; Phase 4/5 build-check and commit skipped, same reasoning as the 17th pass (nothing to verify or commit).  UPDATE 2026-09-15 (19th pass, scheduled grocery-track run): re-verified via grep only, no change since the 18th pass — premises.ts still has 0 rows for brandId 'mccafe', brands.ts still has the 'mccafe' Brand, menuItems.ts still has exactly 10 mccafe MenuItems, and ok_convenience remains 'researched' (sole other in-scope entry), so mccafe remains the sole pending grab_go/ready_to_eat/supermarket candidate. No new facts, no schema change. Blocker remains the unresolved (a)/(b) Premises-modeling decision flagged 2026-08-30 — outside this task's per-entry research scope to decide unilaterally. No Brand/MenuItem/GroceryProduct/Premises files touched; Phase 4/5 build-check and commit skipped, same reasoning as prior no-op passes (nothing to verify or commit). Left 'pending'. UPDATE 2026-09-15b (20th pass, same-day duplicate scheduled grocery-track run): re-verified via grep only, no change since the 19th pass logged earlier today — premises.ts still has 0 rows for brandId 'mccafe', brands.ts still has the 'mccafe' Brand, menuItems.ts still has exactly 10 mccafe MenuItems, ok_convenience remains 'researched' (sole other in-scope entry), and git working tree is clean (the 19th pass's git-lock recovery has since been committed by other tracks). No new facts, no schema change. Blocker remains the unresolved (a)/(b) Premises-modeling decision flagged 2026-08-30 — outside this task's per-entry research scope to decide unilaterally. No Brand/MenuItem/GroceryProduct/Premises files touched; Phase 4/5 build-check skipped (nothing to verify). Left 'pending'. UPDATE 2026-09-16 (21st pass, scheduled grocery-track run): re-verified via grep only, no change since the 20th pass — premises.ts still 0 rows for brandId 'mccafe', brands.ts 'mccafe' Brand and menuItems.ts's 10 MenuItems unchanged, ok_convenience still 'researched' (sole other in-scope entry), so mccafe remains the sole pending candidate. No new facts, no schema change. Blocker remains the unresolved (a)/(b) Premises-modeling decision — not resolving unilaterally; escalating harder this pass given 21 identical outcomes — flagged directly to the user in this run's chat summary, not just this note field, recommending the (a)/(b) call be made or this entry reprioritized/excluded so future scheduled runs stop re-selecting it. Phase 4/5 skipped (nothing to verify). UPDATE 2026-09-16b (22nd pass, same-day duplicate scheduled grocery-track run): re-verified via grep only, no change since the 21st pass — premises.ts still 0 rows for brandId 'mccafe', brands.ts 'mccafe' Brand and menuItems.ts's 10 MenuItems unchanged, ok_convenience still 'researched' (sole other in-scope entry). No new facts, no schema change. Blocker remains the unresolved (a)/(b) Premises-modeling decision — not resolving unilaterally. 22 consecutive identical outcomes; escalated directly to the user in this run's chat summary as conclusive that no further scheduled pass can resolve this without a human (a)/(b) call or a status-schema change to stop re-selection. See reference/research-sessions/2026-09-16-mccafe-colocation-22nd-pass.md. Phase 4/5 (typecheck/commit) skipped — no Brand/MenuItem/GroceryProduct/Premises data changed. UPDATE 2026-09-16c (23rd pass, scheduled grocery-track run): re-verified via grep only, no change since the 22nd pass — premises.ts still 0 rows for brandId 'mccafe', brands.ts 'mccafe' Brand and menuItems.ts's 10 MenuItems unchanged, ok_convenience still 'researched' (sole other in-scope entry), so mccafe remains the sole pending grab_go/ready_to_eat/supermarket candidate. No new facts, no schema change. Blocker remains the unresolved (a)/(b) Premises-modeling decision flagged 2026-08-30 — not resolving unilaterally. 23 consecutive identical outcomes; escalated to the user directly in this run's chat summary. Recommend this entry be excluded from the grocery-track queue (or the (a)/(b) call made) rather than continuing automated re-picks — no further scheduled pass will add new information. Phase 4/5 (typecheck/commit) skipped — no Brand/MenuItem/GroceryProduct/Premises data changed.UPDATE 2026-09-17 (24th pass, scheduled grocery-track run): re-verified via grep only, no re-investigation — premises.ts still 0 rows for brandId 'mccafe', brands.ts 'mccafe' Brand and menuItems.ts's 10 MenuItems unchanged, ok_convenience still 'researched' (sole other in-scope entry), so mccafe remains the sole pending grab_go/ready_to_eat/supermarket candidate. No new facts, no schema change. Blocker remains the unresolved (a)/(b) Premises-modeling decision flagged 2026-08-30 — not resolving unilaterally. 24 consecutive identical outcomes. No Brand/MenuItem/GroceryProduct/Premises files touched. Phase 4/5 (typecheck/commit for data tables) skipped — no data changed. See reference/research-sessions/2026-09-17-mccafe-colocation-24th-pass.md. UPDATE 2026-09-17b (25th pass, same-day duplicate scheduled grocery-track run): re-verified via grep only, no change — premises.ts still 0 rows for brandId 'mccafe', brands.ts 'mccafe' Brand and menuItems.ts's 10 MenuItems unchanged, ok_convenience still 'researched', so mccafe_colocation_research remains the sole pending grab_go/ready_to_eat/supermarket candidate. No new facts, no schema change; blocker remains the unresolved (a)/(b) Premises-modeling decision — not resolving unilaterally. Separately: found the 24th pass's session report had never been committed (blocked by this repo's recurring .git/index.lock unlink failure, first documented ~2026-08-13, now ~90 renamed lock artifacts accumulated in .git/) even though its researchQueue.ts edit had already reached HEAD via an unrelated commit (601a617). Renamed the stale lock aside and staged the orphaned report, but git recreated a new lock it couldn't clean up afterward, blocking commit again — same symptom as the 23rd/24th passes. Not forcing further per that same discipline; report and this note remain staged/uncommitted for a future pass or a human. Flagging the git-lock issue itself as a distinct, worsening infrastructure problem on the OneDrive-mounted filesystem (separate from the mccafe taxonomy question) — recommend a human clear it directly rather than more automated rename workarounds. 25 consecutive identical mccafe outcomes."
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
    notes: "2026-08-24 (address-accuracy audit): the `nourish_bowl` Brand already exists with 5 real MenuItems, but its only Premises row (`nourish_bowl_p28`) was a legacy 'Multiple outlets islandwide' placeholder — removed since no current address could be verified. Two rounds of WebSearch found zero verifiable current Singapore presence under this exact name (only a differently-named 'Nourish Table' at the Botanic Gardens, and 'Nourish Awesome Bowl' in Kuala Lumpur — neither confirmed to be the same brand as this database's `nourish_bowl`). Needs a dedicated pass to either find a real current address or confirm this brand is defunct/was a naming mix-up, similar to the Wendy's/Superfood Kitchen resolution this same session (both confirmed defunct and removed entirely, including their MenuItems). UPDATE 2026-09-02 (scheduled/unattended platescreen-research-branches run, 4th independent pass overall): re-tried via a new angle, an ACRA/company-register WebSearch for a 'Nourish Bowl' Singapore UEN — found zero matching entity (nearest hits, JS Nourish Pte Ltd / Bowl Of Nutrition Pte Ltd / Nourish Ingredients Pte Ltd / Nourish Bakery, are unrelated businesses by name and industry code). A second general WebSearch for the restaurant itself again found zero SG results under this exact name. Not equivalent to Banquet's confirmed-dissolved-ACRA-entity signal though — this brand could simply trade under a different legal registration name — so still not flipping to defunct unilaterally. See branchQueue.ts's `nourish_bowl` entry (same brand, kept in sync) for the full note. Left 'pending'; the @nourish_bowl Instagram bio/location tag remains the one lead that could resolve this, still unchecked (JS-rendered, needs a rendered/logged-in browser)."
  }
];
