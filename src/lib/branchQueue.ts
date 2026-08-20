import type { BranchQueueEntry } from '@/types/db';

/**
 * Work queue for the branch-backfill research task (platescreen-research-branches).
 * Each entry is a multi-location chain currently still relying on ONE lat/lng
 * point on its Outlet record rather than a real Outlet.branches[] array —
 * meaning "near me" distance for it is only ever measured to that one
 * reference point, not the user's actual nearest branch.
 *
 * `mcd` (McDonald's) and `kfc` (partial, 20/73) already have real
 * Outlet.branches data — see their records in outlets.ts — and mcd is the
 * reference example for how to research the rest of this queue: find the
 * brand's official SG store-locator page or downloadable address list,
 * geocode each address via OneMap (see reference/migration-scripts/geocode_branches.py),
 * never estimate.
 *
 * Priority is a starting heuristic (well-known large chains = high, boutique/small
 * chains = low) — the research task should correct it if actual branch count differs
 * once researched (e.g. flip to 'researched' with a note if a chain turns out to be
 * single-location after all, in which case it doesn't need a branches[] array at all —
 * its existing Outlet.lat/lng point is already correct).
 */
export const BRANCH_QUEUE: BranchQueueEntry[] = [
  {
    outletId: "kfc",
    name: "KFC",
    priority: "high",
    status: "pending",
    notes: "20 of 73 branches already captured in outlets.ts's kfc record (branches field) (pages 1-2 of kfc.com.sg/find-kfc's own locator, real data). Resume from page 3 — search \"Singapore\" in the locator's address field, then page through; get_page_text was unreliable past page 2 in one session, screenshots + manual read worked as a fallback. Don't re-geocode the 20 already done.",
  },
  {
    outletId: "bk",
    name: "Burger King",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "subway",
    name: "Subway",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "old_chang_kee",
    name: "Old Chang Kee",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "ya_kun",
    name: "Ya Kun Kaya Toast",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "gong_cha",
    name: "Gong Cha",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "breadtalk",
    name: "BreadTalk",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "7eleven",
    name: "7-Eleven",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "grain",
    name: "Grain",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "stuffd",
    name: "Stuffd",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "aw",
    name: "A&W",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "jollibee",
    name: "Jollibee",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "toast_box",
    name: "Toast Box",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "starbucks_sg",
    name: "Starbucks",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "pizza_hut",
    name: "Pizza Hut",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "shake_shack",
    name: "Shake Shack",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "five_guys",
    name: "Five Guys",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "popeyes",
    name: "Popeyes",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "nandos",
    name: "Nando's",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "dominos",
    name: "Domino's Pizza",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "wingstop",
    name: "Wingstop",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "gyg",
    name: "Guzman y Gomez",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "krispy_kreme",
    name: "Krispy Kreme",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "auntie_annes",
    name: "Auntie Anne's",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "texas_chicken",
    name: "Texas Chicken",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "carl_jr",
    name: "Carl's Jr.",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "mos_burger",
    name: "MOS Burger",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "genki_sushi",
    name: "Genki Sushi",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "coffee_bean",
    name: "The Coffee Bean & Tea Leaf",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "soup_spoon",
    name: "The Soup Spoon",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "daily_cut",
    name: "The Daily Cut",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "yoshinoya",
    name: "Yoshinoya",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "saizeriya",
    name: "Saizeriya",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "mccafe",
    name: "McCafé",
    priority: "low",
    status: "pending",
    notes: "Usually co-located inside an existing McDonald's — check whether it needs its own branch list or can reuse mcd's branches entries (same premises) before treating as a separate research target.",
  },
  {
    outletId: "astons",
    name: "Aston's Specialities",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "liho",
    name: "LiHo",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "koi",
    name: "KOI Thé",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "chagee",
    name: "Chagee",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "mixue",
    name: "Mixue",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "dosirak",
    name: "Dosirak",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "makisan",
    name: "Maki-San",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "project_acai",
    name: "Project Açaí",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "nourish_bowl",
    name: "Nourish Bowl",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "superfood_kitchen",
    name: "Superfood Kitchen",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "boost_juice",
    name: "Boost Juice",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "fairprice_xpress",
    name: "FairPrice Xpress",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "cheers",
    name: "Cheers",
    priority: "high",
    status: "pending",
  },
  {
    outletId: "saladstop",
    name: "SaladStop!",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "saladbox",
    name: "The Salad Box",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "paris_baguette",
    name: "Paris Baguette",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "sushi_express",
    name: "Sushi Express",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "dunkin",
    name: "Dunkin'",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "bonchon",
    name: "Bonchon",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "llaollao",
    name: "Llaollao",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "wendys",
    name: "Wendy's",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "luckin_coffee",
    name: "Luckin Coffee",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "fairprice",
    name: "FairPrice",
    priority: "high",
    status: "pending",
    notes: "Zero location coverage previously — this is a bigger backfill target than most, NTUC FairPrice has 180+ outlets.",
  },
  {
    outletId: "fairprice_finest",
    name: "FairPrice Finest",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "cold_storage",
    name: "Cold Storage",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "giant",
    name: "Giant",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "sheng_siong",
    name: "Sheng Siong",
    priority: "medium",
    status: "pending",
  },
  {
    outletId: "don_don_donki",
    name: "Don Don Donki",
    priority: "low",
    status: "pending",
  },
  {
    outletId: "store_fairprice",
    name: "FairPrice (grocery-ingredients outlet)",
    priority: "low",
    status: "pending",
    notes: "Synthetic PlateScreen grocery-ingredients outlet, distinct id from 'fairprice' — see the naming-collision note in reference/stride-sync-sessions/. May not need its own branch list if it ends up merged with 'fairprice'; check that outcome before researching this separately.",
  },
  {
    outletId: "ichiban_boshi",
    name: "Ichiban Boshi",
    priority: "medium",
    status: "pending",
  },
];
// kopitiam / koufu / foodfare / banquet were removed from this queue —
// they were food_court OPERATOR-brand Outlet rows (not real single premises),
// deleted entirely in the 2026-08-20 outlet cleanup (see reference/migration-scripts
// for the SFA-based hawker-stall restructuring). No outlet by these ids exists
// anymore, so a branch entry for them would be a dangling reference.
