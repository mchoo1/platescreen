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

// ── Outlet: WHERE you get food ──────────────────────────────────────────────
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
