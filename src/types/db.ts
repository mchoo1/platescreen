import type { DietaryFlag, OutletType, PriceRange } from './index';

// ── Platform: where a food option is actually obtainable ───────────────────
export type Platform = 'dine_in' | 'grab_go' | 'delivery' | 'self_cook';

// ── SFA registration — research anchor for premises with their own licence ──
// Field names mirror data.gov.sg dataset d_227473e811b09731e64725f140b77697
// ("List of NEA Licensed Eating Establishments") so records can be mapped
// directly from that API. Note: that dataset's own "Data from" range lags
// its "Last updated" stamp — treat it as a strong starting reference for
// research, not a live guarantee of current status.
export interface SfaRegistration {
  licenceNumber?: string;      // e.g. "W99288X000"
  licenseeName?: string;       // registered entity, e.g. "REPUBLIC HOTELS & RESORTS LIMITED"
  premisesAddress?: string;    // official registered address
  grade?: 'A' | 'B' | 'C' | 'New' | 'not_applicable';
  // 'not_applicable' — food courts/canteens/coffeeshops aren't individually
  // graded, only the stalls inside them are
  demeritPoints?: number;
  licenceSuspended?: boolean;
}

// ── Restructured 2026-08-20: Brand/Premises split ────────────────────────────
// Previously one Outlet row conflated brand identity (name, cuisine, menu)
// with physical premises (address, coordinates, licence). That collapses
// cleanly for a hawker stall (brand IS the premises) but breaks down for a
// chain (one brand, many premises with independently-issued SFA licences)
// and for groceries (a product catalog, not a dish menu). See
// reference/planning/database-restructure-proposal-2026-08-20.md for the
// full reasoning and the 5-shape taxonomy this schema is built around.

// ── Operator: a food-court/coffeeshop OPERATING company ─────────────────────
// Kopitiam, Koufu, Foodfare, Banquet, etc. Their SFA licence is typically
// held at the Premises level (the whole food-court/coffeeshop building), not
// per internal stall — structurally different from an NEA hawker centre
// where each stall holds its own licence. Generic, unnamed concessions
// inside an Operator's premises are intentionally NOT modeled as their own
// Brand (same "don't fabricate" principle as the hawker-centre cleanup) —
// only named, identifiable chain concessions get their own Brand+Premises.
export interface Operator {
  id: string;
  name: string;
  type: 'food_court_operator' | 'coffeeshop_group';
}

// ── Brand: WHAT it is — one row per menu/identity, not per physical spot ────
export interface Brand {
  id: string;
  name: string;
  emoji: string;
  type: OutletType;          // kept as the existing SFA-licence-aligned taxonomy
  cuisine: string;
  aliases: string[];         // text search + GPS matching
  dietTags: DietaryFlag[];
  priceRange: PriceRange;
  platforms: Platform[];
  operatorId?: string;       // set only for named concessions inside an Operator's premises
}

// ── Premises: WHERE it physically exists — one row per real address ─────────
// Every physical location a Brand can be found at, including every branch
// of a chain (branches are now first-class rows, not a nested array).
export interface Premises {
  id: string;
  brandId: string;            // FK -> Brand.id
  label: string;               // branch/mall name, or the brand's own name if single-location
  locationType: 'hawker_centre' | 'food_court' | 'coffeeshop' | 'mall' | 'standalone_shopfront' | 'mrt_station' | 'residential' | 'other';
  locationContext?: string;    // parent building/centre name — "Maxwell Food Centre", "Jurong Point"
  address?: string;
  postal?: string;
  lat?: number;
  lng?: number;
  sfa?: SfaRegistration;       // set when THIS premises holds its own licence (most premises do)
  source: string;               // provenance of the address/coordinate, e.g. "sfa_licence_match", "official_store_list"
}

// ── MenuItem: WHAT you can screen — one row per cooked dish, FK to Brand ────
// (renamed from FoodOption; a dish belongs to the brand's menu, shared
// across all of that brand's Premises — same assumption FoodOption always made)
export interface MenuItem {
  id: string;
  brandId: string;            // FK -> Brand.id
  name: string;
  emoji: string;
  category: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  compatibleWith: DietaryFlag[];
  confidence: 'verified' | 'estimated' | 'community';
  isPopular?: boolean;
}

// ── GroceryProduct: a packaged SKU — different shape from a cooked dish ─────
// Schema only for now — no rows populated in this restructure. Groceries
// need per-100g macros + package size (not "one dish, one serving") since a
// can of tuna doesn't have a fixed serving the way a plate of chicken rice
// does. Real SKU research is a separate future effort.
export interface GroceryProduct {
  id: string;
  brandId: string;             // FK -> Brand.id (retailer, or a shared 'generic' brand for unbranded ingredients)
  name: string;
  emoji: string;
  category: string;             // "Dairy", "Canned Goods", "Snacks"
  packageSize: number;           // e.g. 500
  packageUnit: 'g' | 'ml' | 'each';
  packagePrice: number;
  caloriesPer100: number;
  proteinPer100: number;
  carbsPer100: number;
  fatPer100: number;
  confidence: 'verified' | 'estimated' | 'community';
}

// ── ResearchQueueEntry: work items for the weekly research task ─────────────
export interface ResearchQueueEntry {
  id: string;
  name: string;
  aliases: string[];
  type: OutletType;
  cuisine: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'researched';
  notes?: string;
  sfaLicenceNo?: string;     // if known ahead of time, disambiguates which premises to research
}

// ── BranchQueueEntry: work items for the premises-backfill research task ────
export interface BranchQueueEntry {
  brandId: string;           // must match an existing Brand.id
  name: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'researched';
  notes?: string;
}
