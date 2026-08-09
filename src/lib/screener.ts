import { SG_RESTAURANTS, proteinPerDollar, ppdColor } from './sgFoodDb';
import type { SGMenuItem, SGRestaurant, PriceRange, VerifiedSource } from './sgFoodDb';
import type { DietaryFlag, OutletType } from '@/types';
import { RESTAURANT_STATIC_COORDS, haversineKm } from './geo';

/** One flattened, screenable row: a menu item + its parent restaurant context. */
export interface ScreenerRow {
  id: string;
  name: string;
  emoji: string;
  restaurantId: string;
  restaurantName: string;
  restaurantEmoji: string;
  cuisine: string;
  outletType: OutletType;
  priceRange: PriceRange;
  serviceTypes: string[];
  dietTags: DietaryFlag[];
  location: string;         // hawkerLocation / venueName / restaurant name — used for text location search
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  price: number;
  ppd: number;              // protein per dollar
  ppdColor: string;
  category: string;
  compatibleWith: DietaryFlag[];
  confidence: 'verified' | 'estimated' | 'community';
  isPopular: boolean;
  distanceKm: number | null; // filled in when user location is known
}

const CONFIDENCE_RANK: Record<string, number> = { verified: 0, estimated: 1, community: 2 };

/** Flatten every restaurant's menu into one row-per-item dataset. Computed once. */
export function buildScreenerRows(): ScreenerRow[] {
  const rows: ScreenerRow[] = [];
  for (const r of SG_RESTAURANTS as SGRestaurant[]) {
    const coords = RESTAURANT_STATIC_COORDS[r.id];
    for (const item of r.menu) {
      if (item.visibility === 'component_only') continue; // not orderable standalone
      rows.push({
        id: item.id,
        name: item.name,
        emoji: item.emoji,
        restaurantId: r.id,
        restaurantName: r.name,
        restaurantEmoji: r.emoji,
        cuisine: r.cuisine,
        outletType: r.outletType,
        priceRange: r.priceRange,
        serviceTypes: r.serviceTypes,
        dietTags: r.dietTags ?? [],
        location: r.hawkerLocation || r.venueName || r.name,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
        price: item.price,
        ppd: proteinPerDollar(item.protein, item.price),
        ppdColor: ppdColor(proteinPerDollar(item.protein, item.price)),
        category: item.category,
        compatibleWith: item.compatibleWith ?? [],
        confidence: (item.confidence ?? 'estimated') as ScreenerRow['confidence'],
        isPopular: !!item.isPopular,
        distanceKm: coords ? null : null, // populated later once user coords are known
      });
    }
  }
  return rows;
}

/** Attach live distance (km) from a user coordinate to every row that has a known outlet location. */
export function withDistances(rows: ScreenerRow[], userLat: number, userLng: number): ScreenerRow[] {
  return rows.map((row) => {
    const coords = RESTAURANT_STATIC_COORDS[row.restaurantId];
    if (!coords) return row;
    return { ...row, distanceKm: haversineKm(userLat, userLng, coords[0], coords[1]) };
  });
}

export type SortKey =
  | 'name' | 'restaurant' | 'calories' | 'protein' | 'carbs' | 'fat' | 'price' | 'ppd' | 'distance';
export type SortDir = 'asc' | 'desc';

export function sortRows(rows: ScreenerRow[], key: SortKey, dir: SortDir): ScreenerRow[] {
  const sorted = [...rows].sort((a, b) => {
    let av: number | string;
    let bv: number | string;
    switch (key) {
      case 'name': av = a.name; bv = b.name; break;
      case 'restaurant': av = a.restaurantName; bv = b.restaurantName; break;
      case 'distance':
        av = a.distanceKm ?? Number.POSITIVE_INFINITY;
        bv = b.distanceKm ?? Number.POSITIVE_INFINITY;
        break;
      default: av = a[key]; bv = b[key];
    }
    if (typeof av === 'string' || typeof bv === 'string') {
      return String(av).localeCompare(String(bv));
    }
    return av - bv;
  });
  if (dir === 'desc') sorted.reverse();
  return sorted;
}

export interface ScreenerFilters {
  q: string;
  calMin: number | null;
  calMax: number | null;
  protMin: number | null;
  carbMax: number | null;
  priceMax: number | null;
  tags: DietaryFlag[];
  outletTypes: OutletType[];
  verifiedOnly: boolean;
  location: string;
  maxDistanceKm: number | null;
}

export const DEFAULT_FILTERS: ScreenerFilters = {
  q: '',
  calMin: null,
  calMax: null,
  protMin: null,
  carbMax: null,
  priceMax: null,
  tags: [],
  outletTypes: [],
  verifiedOnly: false,
  location: '',
  maxDistanceKm: null,
};

export function applyFilters(rows: ScreenerRow[], f: ScreenerFilters): ScreenerRow[] {
  const q = f.q.trim().toLowerCase();
  const loc = f.location.trim().toLowerCase();
  return rows.filter((row) => {
    if (q && !row.name.toLowerCase().includes(q) && !row.restaurantName.toLowerCase().includes(q)) return false;
    if (f.calMin != null && row.calories < f.calMin) return false;
    if (f.calMax != null && row.calories > f.calMax) return false;
    if (f.protMin != null && row.protein < f.protMin) return false;
    if (f.carbMax != null && row.carbs > f.carbMax) return false;
    if (f.priceMax != null && row.price > f.priceMax) return false;
    if (f.tags.length && !f.tags.every((t) => row.compatibleWith.includes(t))) return false;
    if (f.outletTypes.length && !f.outletTypes.includes(row.outletType)) return false;
    if (f.verifiedOnly && row.confidence !== 'verified') return false;
    if (loc && !row.location.toLowerCase().includes(loc) && !row.restaurantName.toLowerCase().includes(loc)) return false;
    if (f.maxDistanceKm != null && (row.distanceKm == null || row.distanceKm > f.maxDistanceKm)) return false;
    return true;
  });
}

// ── Macro presets ────────────────────────────────────────────────────────────
export interface Preset {
  id: string;
  label: string;
  description: string;
  apply: (f: ScreenerFilters) => ScreenerFilters;
}

export const PRESETS: Preset[] = [
  {
    id: 'cut',
    label: 'Cut',
    description: '≤500 cal, ≥25g protein',
    apply: (f) => ({ ...f, calMax: 500, protMin: 25 }),
  },
  {
    id: 'bulk',
    label: 'Bulk',
    description: '≥600 cal, ≥35g protein',
    apply: (f) => ({ ...f, calMin: 600, protMin: 35 }),
  },
  {
    id: 'budget',
    label: 'Budget',
    description: '≤$5.50',
    apply: (f) => ({ ...f, priceMax: 5.5 }),
  },
  {
    id: 'keto',
    label: 'Keto',
    description: '≤10g carbs',
    apply: (f) => ({ ...f, carbMax: 10 }),
  },
  {
    id: 'high_value',
    label: 'High Value',
    description: 'protein/$ ≥ 5',
    apply: (f) => f, // ppd threshold applied separately (not a base field) — see applyPresetPpd
  },
];

/** High Value preset needs a post-filter step since ppd isn't a raw filter field. */
export function applyPresetPpdFilter(rows: ScreenerRow[], presetId: string | null): ScreenerRow[] {
  if (presetId !== 'high_value') return rows;
  return rows.filter((r) => r.ppd >= 5);
}

export const DIET_TAG_OPTIONS: { value: DietaryFlag; label: string }[] = [
  { value: 'halal', label: 'Halal' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'keto', label: 'Keto' },
  { value: 'high_protein', label: 'High Protein' },
  { value: 'no_pork', label: 'No Pork' },
  { value: 'low_carb', label: 'Low Carb' },
];

export const OUTLET_TYPE_OPTIONS: { value: OutletType; label: string }[] = [
  { value: 'hawker', label: 'Hawker' },
  { value: 'food_court_stall', label: 'Food Court Stall' },
  { value: 'food_court', label: 'Food Court' },
  { value: 'coffeeshop', label: 'Coffeeshop' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'grab_go', label: 'Grab & Go' },
  { value: 'canteen', label: 'Canteen' },
  { value: 'supermarket', label: 'Grocery' },
  { value: 'ready_to_eat', label: 'Ready-to-Eat' },
];
