// Shapes shared by the search-index builder (build time) and the browser.
// The browser loads one SearchIndex from /data/search-index.json.

import type { DietaryFlag, OutletType } from '@/types';
import type { Allergen, AllergenStatus, CookingMethod, NutritionBasis, NutritionStatus, Platform, PriceKind } from '@/db/schema';

export type Trust = 'verified' | 'operator' | 'typical' | 'estimate' | 'community';

/** One way of ordering a meal set (a choice per group), with its totals. */
export interface SetCombo {
  summary: string;               // "French Fries (M) + Coca-Cola Zero Sugar (S)"
  isDefault: boolean;
  kcal: number | null;           // sum of known components (a lower bound if !complete)
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  complete: boolean;
  price: number | null;          // set price + upgrade charges; null if any charge unknown
  ppd: number | null;
}

export interface SearchRow {
  id: string;
  kind: 'dish' | 'set';
  combos?: SetCombo[];           // sets only; combos[0] is the default meal
  priceNote: 'unconfirmed' | null; // price from unconfirmed listings (not just undated)
  brandId: string;
  name: string;
  emoji: string;
  category: string;
  brandName: string;
  cuisine: string;
  outletType: OutletType;
  platforms: Platform[];
  brandDietTags: DietaryFlag[];
  location: string;              // one venue/label, or "N outlets"
  conceptName: string | null;
  kcal: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  complete: boolean;             // all four macros known
  nutritionStatus: NutritionStatus | null;
  nutritionBasis: NutritionBasis | null;
  trust: Trust | null;           // null = no nutrition at all
  price: number | null;
  priceKind: PriceKind | null;
  priceCheckedAt: string | null; // ISO date of last verification, null = never
  ppd: number | null;            // protein per dollar
  diet: Partial<Record<DietaryFlag, 'yes' | 'no'>>;
  allergens: Partial<Record<Allergen, AllergenStatus>>; // absent = unknown
  glutenFree: boolean;           // brand/stall-declared claim only
  cooking: CookingMethod[];      // [] = unknown
  spice: number | null;          // null = unknown
  popular: boolean;
  text: string;                  // normalized search text
}

export interface OutletPoint {
  id: string;
  label: string;
  lat: number | null;
  lng: number | null;
  venue: number | null;          // index into SearchIndex.venues
  area: string;                  // normalized label + venue + address + postal
  hours: [number, string, string][] | null; // [dayOfWeek, opens, closes]; null = unknown
}

export interface VenueInfo {
  id: string;
  name: string;
  closures: [string, string, string][]; // [startDate, endDate, reason]
}

export interface PendingBrandRow {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  outletType: OutletType;
  location: string;
}

export interface SearchIndex {
  generatedAt: string;
  rows: SearchRow[];
  outlets: OutletPoint[];
  venues: VenueInfo[];
  pending: PendingBrandRow[];
  brandOutlets: Record<string, number[]>; // brandId → indices into outlets
  stats: { dishes: number; sets: number; brands: number; outlets: number; verified: number; typical: number; estimate: number; venuesWithClosures: number };
}

export type OutletGroup = 'hawker' | 'restaurant' | 'grab_go' | 'supermarket';
export type SortKey = 'ppd' | 'price' | 'kcal' | 'protein' | 'distance' | 'name';
export type SpiceFilter = 'any' | 'mild' | 'spicy';

export const UI_DIET_TAGS: { value: DietaryFlag; label: string }[] = [
  { value: 'halal', label: 'Halal' },
  { value: 'no_pork', label: 'No pork' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'pescatarian', label: 'Pescatarian' },
];

export const UI_ALLERGENS: { value: Allergen; label: string }[] = [
  { value: 'gluten', label: 'Gluten' },
  { value: 'peanut', label: 'Peanut' },
  { value: 'tree_nuts', label: 'Tree nuts' },
  { value: 'crustacea', label: 'Crustacea' },
  { value: 'molluscs', label: 'Molluscs' },
  { value: 'fish', label: 'Fish' },
  { value: 'egg', label: 'Egg' },
  { value: 'milk', label: 'Milk' },
  { value: 'soy', label: 'Soy' },
  { value: 'sesame', label: 'Sesame' },
  { value: 'sulphites', label: 'Sulphites' },
];

export const UI_COOKING: { value: CookingMethod; label: string }[] = [
  { value: 'steamed', label: 'Steamed' },
  { value: 'grilled', label: 'Grilled' },
  { value: 'roasted', label: 'Roasted' },
  { value: 'soup', label: 'Soup' },
  { value: 'stir_fried', label: 'Stir-fried' },
  { value: 'braised', label: 'Braised' },
  { value: 'baked', label: 'Baked' },
  { value: 'raw', label: 'Raw / salad' },
];

export const OUTLET_GROUPS: { value: OutletGroup; label: string; types: OutletType[] }[] = [
  { value: 'hawker', label: 'Hawker & food court', types: ['hawker', 'food_court_stall', 'food_court', 'coffeeshop', 'canteen'] },
  { value: 'restaurant', label: 'Restaurants & chains', types: ['restaurant'] },
  { value: 'grab_go', label: 'Grab & go / takeaway shops', types: ['grab_go', 'ready_to_eat'] },
  { value: 'supermarket', label: 'Supermarket', types: ['supermarket'] },
];

/**
 * Outlet types left out of search, the sitemap and static pages for now
 * (Ming, 2026-11-16: "remove home cooked food in the search"). The data stays
 * in /data; delete the type from this list to bring it back.
 */
export const HIDDEN_OUTLET_TYPES: OutletType[] = ['home_cooked'];

export interface Filters {
  q: string;
  kcalMin: number | null;
  kcalMax: number | null;
  proteinMin: number | null;
  carbsMax: number | null;
  fatMax: number | null;
  priceMax: number | null;
  diet: DietaryFlag[];
  glutenFreeConfirmed: boolean;
  excludeAllergens: Allergen[];
  hideUnknownAllergens: boolean;
  cooking: CookingMethod[];
  notFried: boolean;
  spice: SpiceFilter;
  openNow: boolean;
  includeHoursUnknown: boolean;
  openAt: string | null;         // 'HH:MM' today, SGT
  maxDistanceKm: number | null;
  area: string;
  outletGroups: OutletGroup[];
  platforms: Platform[];
  verifiedOnly: boolean;
  priceCheckedDays: number | null;
  sort: SortKey;
}

export const DEFAULT_FILTERS: Filters = {
  q: '',
  kcalMin: null, kcalMax: null, proteinMin: null, carbsMax: null, fatMax: null, priceMax: null,
  diet: [], glutenFreeConfirmed: false,
  excludeAllergens: [], hideUnknownAllergens: false,
  cooking: [], notFried: false, spice: 'any',
  openNow: false, includeHoursUnknown: true, openAt: null,
  maxDistanceKm: null, area: '',
  outletGroups: [], platforms: [],
  verifiedOnly: false, priceCheckedDays: null,
  sort: 'ppd',
};
