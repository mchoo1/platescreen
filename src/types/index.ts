// ── Core taxonomy — shared by Outlet/FoodOption in lib/db.ts ────────────────
// Trimmed to only what PlateScreen actually uses. (Stride-only types like
// UserProfile, FoodLogEntry, ActivityLogEntry, Recommendation, DailySummary
// were removed here — see reference/stride-original/ for the full shape.)

/** Category of food outlet — aligned with SFA food retail licence types */
export type OutletType =
  // ── SFA Food Shop Licence ────────────────────────────────────────────────────
  | 'restaurant'       // sit-down restaurant / caterer (McDonald's, Subway, etc.)
  | 'food_court'       // food court operator entry — Koufu, Kopitiam, Banquet, Foodfare
  | 'coffeeshop'       // traditional kopitiam / coffeeshop operator
  | 'canteen'          // school or office canteen (third-party operated)
  | 'grab_go'          // takeaway kiosk / snack counter (BreadTalk, Old Chang Kee, Gong Cha)
  // ── SFA Food Stall Licence ───────────────────────────────────────────────────
  | 'food_court_stall' // individual stall inside a food court / coffeeshop / canteen
  // ── SFA Hawker Stall (via NEA) ───────────────────────────────────────────────
  | 'hawker'           // individual stall in an NEA-managed hawker centre or market
  // ── SFA Supermarket Licence ──────────────────────────────────────────────────
  | 'supermarket'      // FairPrice, Cold Storage, Giant, Sheng Siong, Don Don Donki
  // ── No SFA Licence required ──────────────────────────────────────────────────
  | 'ready_to_eat'     // convenience store, pre-packed only (7-Eleven, Cheers, FairPrice Xpress)
  | 'home_cooked';     // self-prepared recipes — not a licensed outlet

export type DietaryFlag =
  | 'vegetarian' | 'vegan' | 'gluten_free'
  | 'lactose_free' | 'keto' | 'halal' | 'kosher'
  | 'dairy_free' | 'nut_free' | 'low_carb' | 'high_protein'
  | 'pescatarian' | 'no_pork';

/** General price tier display */
export type PriceRange = '$' | '$$' | '$$$' | '$$$$';
