import type { DietaryFlag, OutletType, PriceRange } from './index';

// ── Platform: where a food option is actually obtainable ───────────────────
export type Platform = 'dine_in' | 'grab_go' | 'delivery' | 'self_cook';

// ── SFA registration — research anchor for hawker & food-court-stall outlets ──
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

// ── OutletBranch: one physical premises of a multi-location Outlet ──────────
// Embedded directly on the Outlet that owns it (see Outlet.branches) — there
// is no separate branches table. Only multi-location chains need this
// (McDonald's, KFC, etc., where Outlet.id represents the whole brand and one
// lat/lng can't represent "nearest branch"). Single-location outlets (hawker
// stalls, home_cooked, one-off restaurants) just use Outlet.lat/lng directly.
export interface OutletBranch {
  name: string;                // branch/mall name, e.g. "Jurong Point"
  address: string;             // full official address
  postal?: string;
  lat: number;
  lng: number;
  source: string;              // where this address came from, e.g. brand's official store list
}

// ── Outlet: WHERE you get food — one row per physical store OR brand ────────
export interface Outlet {
  id: string;
  name: string;
  emoji: string;
  type: OutletType;
  cuisine: string;
  location?: string;         // hawker centre / mall / area name — location filter
  aliases: string[];         // text search + GPS matching
  dietTags: DietaryFlag[];
  priceRange: PriceRange;
  platforms: Platform[];
  sfa?: SfaRegistration;     // populated for hawker / food_court_stall outlets
  lat?: number;               // single-location outlets: real coordinate directly on the row
  lng?: number;
  branches?: OutletBranch[];  // multi-location chains: real per-branch coordinates instead of lat/lng
}

// ── FoodOption: WHAT you can screen — one row per dish ──────────────────────
export interface FoodOption {
  id: string;
  outletId: string;          // FK -> Outlet.id
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
  sfaLicenceNo?: string;     // if known ahead of time, disambiguates which branch to research
}

// ── BranchQueueEntry: work items for the branch-backfill research task ──────
export interface BranchQueueEntry {
  outletId: string;          // must match an existing Outlet.id
  name: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'researched';
  notes?: string;
}
