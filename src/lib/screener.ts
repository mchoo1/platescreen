import { BRANDS as RAW_BRANDS } from './brands';
import { PREMISES as RAW_PREMISES } from './premises';
import { MENU_ITEMS as RAW_MENU_ITEMS } from './menuItems';
import { GROCERY_PRODUCTS as RAW_GROCERY_PRODUCTS } from './groceryProducts';
import type { Brand, Premises, MenuItem, GroceryProduct, Platform } from '@/types/db';
import type { DietaryFlag, OutletType, PriceRange } from '@/types';
import { haversineKm } from './geo';

// Generated data files are intentionally untyped literals (a large array
// checked against a union-typed interface blows past TS's structural
// comparison complexity limit — TS2590). Cast once at the boundary instead.
const BRANDS = RAW_BRANDS as unknown as Brand[];
const PREMISES = RAW_PREMISES as unknown as Premises[];
const MENU_ITEMS = RAW_MENU_ITEMS as unknown as MenuItem[];
const GROCERY_PRODUCTS = RAW_GROCERY_PRODUCTS as unknown as GroceryProduct[];

// Lookups, once, at module load.
const BRAND_BY_ID = new Map<string, Brand>(BRANDS.map((b) => [b.id, b]));
const PREMISES_BY_BRAND = new Map<string, Premises[]>();
for (const p of PREMISES) {
  const list = PREMISES_BY_BRAND.get(p.brandId) ?? [];
  list.push(p);
  PREMISES_BY_BRAND.set(p.brandId, list);
}

/**
 * Normalize free text for search matching: lowercase, drop apostrophes/smart
 * quotes entirely (so "McDonald's" and "mcdonalds" compare equal — the
 * apostrophe-less spelling is how almost everyone actually types it),
 * collapse remaining punctuation to spaces, and collapse whitespace.
 *
 * Found via a live search-box review: 65 brand names in this dataset carry
 * an apostrophe (McDonald's, Domino's Pizza, Nando's, Dunkin', Carl's Jr.,
 * etc.) and the previous plain `.includes()` match meant searching
 * "mcdonalds" returned zero results for one of the most common fast-food
 * chains in the database. See reference/research-sessions/2026-09-13-
 * search-apostrophe-and-multiword-fix.md.
 */
export function normalizeSearchText(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’‘`]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * True if every whitespace-separated token in `query` appears somewhere
 * across the normalized, combined `fields` — order-independent, so a query
 * like "mcdonalds big mac" matches a row whose name is "Big Mac" at
 * restaurant "McDonald's" even though neither field alone contains the
 * whole query string. An empty/whitespace-only query always matches.
 */
export function matchesQuery(query: string, ...fields: string[]): boolean {
  const q = normalizeSearchText(query);
  if (!q) return true;
  const combined = fields.map(normalizeSearchText).join(' ');
  return q.split(' ').filter(Boolean).every((token) => combined.includes(token));
}

// Explicit-name conflict keywords for the Brand.dietTags OR-in in applyFilters
// below. A brand-level tag (e.g. a bakery certified "halal" overall) must
// never override CLAUDE.md 5.1's categorical-exclusion rule: a dish
// explicitly named for pork/offal (or meat/seafood, for vegetarian/vegan)
// gets no compatibleWith array at all, even at an otherwise-compliant brand
// (found live: BreadTalk is tagged brand-level "halal", but sells a "Pork
// Floss Bun" with compatibleWith: [] — correctly excluded per-dish). These
// patterns only ever narrow the OR-in (never widen it), so an incomplete
// keyword list can under-apply the brand tag but can never mis-apply it.
const PORK_NAME_PATTERN = /\bpork\b|bak kut teh|pig organ|char siu|siu yuk|sio bak|bak kwa|\bham\b|\blard\b|\bbacon\b/i;
const MEAT_SEAFOOD_NAME_PATTERN = /\bpork\b|\bchicken\b|\bbeef\b|\bmutton\b|\blamb\b|\bduck\b|\bfish\b|\bprawn\b|\bshrimp\b|\bcrab\b|\bsquid\b|\boctopus\b|\bbacon\b|\bham\b|\bsausage\b|\bmeat\b|seafood|\begg\b/i;

/** Whether a brand-level dietTag is safe to apply to a specific dish by name (see patterns above). */
function brandTagAppliesToDish(tag: DietaryFlag, dishName: string): boolean {
  if (tag === 'halal' || tag === 'no_pork') return !PORK_NAME_PATTERN.test(dishName);
  if (tag === 'vegetarian' || tag === 'vegan') return !MEAT_SEAFOOD_NAME_PATTERN.test(dishName);
  return true;
}

/** Protein per dollar (g/$), rounded to 1 decimal. Returns 0 if price is 0. */
export function proteinPerDollar(protein: number, price: number): number {
  if (!price) return 0;
  return Math.round((protein / price) * 10) / 10;
}

/** Colour code for protein/$ value. Green ≥6, amber 3–6, red <3. */
export function ppdColor(value: number): string {
  if (value >= 6) return '#1E7F5C';
  if (value >= 3) return '#C98A2E';
  return '#D04E36';
}

/** One flattened, screenable row: a menu item + its parent brand context. */
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
  platforms: Platform[];
  dietTags: DietaryFlag[];
  location: string;         // brand's location label — used for text location search
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
  distanceKm: number | null;       // filled in when user location is known
  nearestBranchName: string | null; // which physical premises distanceKm refers to (multi-premises brands only)
}

/** A brand's display location — its own premises label if single-location, else a generic "multiple" string. */
function brandLocationLabel(brand: Brand): string {
  const prem = PREMISES_BY_BRAND.get(brand.id) ?? [];
  if (prem.length === 0) return brand.name;
  if (prem.length === 1) return prem[0].locationContext || prem[0].label || brand.name;
  return 'Multiple outlets islandwide';
}

/** Join every MenuItem to its Brand into one row-per-item dataset. Computed once. */
export function buildScreenerRows(): ScreenerRow[] {
  const rows: ScreenerRow[] = [];
  for (const item of MENU_ITEMS as MenuItem[]) {
    const b = BRAND_BY_ID.get(item.brandId);
    if (!b) continue; // orphaned menu item — shouldn't happen, skip defensively
    rows.push({
      id: item.id,
      name: item.name,
      emoji: item.emoji,
      restaurantId: b.id,
      restaurantName: b.name,
      restaurantEmoji: b.emoji,
      cuisine: b.cuisine,
      outletType: b.type,
      priceRange: b.priceRange,
      platforms: b.platforms,
      dietTags: b.dietTags ?? [],
      location: brandLocationLabel(b),
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      price: item.price,
      ppd: proteinPerDollar(item.protein, item.price),
      ppdColor: ppdColor(proteinPerDollar(item.protein, item.price)),
      category: item.category,
      compatibleWith: item.compatibleWith ?? [],
      confidence: item.confidence,
      isPopular: !!item.isPopular,
      distanceKm: null, // populated later once user coords are known
      nearestBranchName: null,
    });
  }
  return rows;
}

/**
 * Nearest-premises distance (km) for a brand, or null if we have no location
 * data for it at all. Picks the closest of all its real Premises rows.
 */
export function nearestPremises(brandId: string, userLat: number, userLng: number): { distanceKm: number; branchName: string | null } | null {
  const prem = (PREMISES_BY_BRAND.get(brandId) ?? []).filter((p) => p.lat != null && p.lng != null);
  if (!prem.length) return null;
  let best = prem[0];
  let min = haversineKm(userLat, userLng, best.lat as number, best.lng as number);
  for (const p of prem.slice(1)) {
    const d = haversineKm(userLat, userLng, p.lat as number, p.lng as number);
    if (d < min) { min = d; best = p; }
  }
  return { distanceKm: min, branchName: best.locationContext || best.label || null };
}

/** Attach live distance (km) from a user coordinate to every row that has a known brand location. */
export function withDistances(rows: ScreenerRow[], userLat: number, userLng: number): ScreenerRow[] {
  return rows.map((row) => {
    const nearest = nearestPremises(row.restaurantId, userLat, userLng);
    if (!nearest) return row;
    return { ...row, distanceKm: nearest.distanceKm, nearestBranchName: nearest.branchName };
  });
}

// ── Zero-menu-item brands ─────────────────────────────────────────────────────
// 587 of 1,749 brands (33.6%) have no MenuItem rows yet — real, physical outlets
// that were previously entirely invisible to search because buildScreenerRows()
// only iterates MENU_ITEMS. This surfaces them as a lightweight, macro-free row
// (name/location/distance only) instead of dropping them from the app. See
// reference/research-sessions/2026-08-29-zero-menu-brand-fallback.md.
export interface UncoveredBrandRow {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  outletType: OutletType;
  priceRange: PriceRange;
  platforms: Platform[];
  location: string;
  distanceKm: number | null;
  nearestBranchName: string | null;
}

const COVERED_BRAND_IDS = new Set((MENU_ITEMS as MenuItem[]).map((i) => i.brandId));

/** Every brand with zero MenuItem rows — the long tail buildScreenerRows() can't surface. */
export function buildUncoveredBrandRows(): UncoveredBrandRow[] {
  return BRANDS.filter((b) => !COVERED_BRAND_IDS.has(b.id)).map((b) => ({
    id: b.id,
    name: b.name,
    emoji: b.emoji,
    cuisine: b.cuisine,
    outletType: b.type,
    priceRange: b.priceRange,
    platforms: b.platforms,
    location: brandLocationLabel(b),
    distanceKm: null,
    nearestBranchName: null,
  }));
}

/** Attach live distance (km) from a user coordinate, same as withDistances() but for uncovered rows. */
export function withUncoveredDistances(rows: UncoveredBrandRow[], userLat: number, userLng: number): UncoveredBrandRow[] {
  return rows.map((row) => {
    const nearest = nearestPremises(row.id, userLat, userLng);
    if (!nearest) return row;
    return { ...row, distanceKm: nearest.distanceKm, nearestBranchName: nearest.branchName };
  });
}

// Deliberately no calorie/protein/carb/price/diet-tag fields here — there's no
// MenuItem data to test those against for an uncovered brand. Only the filters
// that describe the physical outlet itself apply.
export interface UncoveredFilters {
  q: string;
  outletTypes: OutletType[];
  platforms: Platform[];
  location: string;
  maxDistanceKm: number | null;
}

export function applyUncoveredFilters(rows: UncoveredBrandRow[], f: UncoveredFilters): UncoveredBrandRow[] {
  return rows.filter((row) => {
    if (!matchesQuery(f.q, row.name)) return false;
    if (f.outletTypes.length && !f.outletTypes.includes(row.outletType)) return false;
    if (f.platforms.length && !f.platforms.every((p) => row.platforms.includes(p))) return false;
    if (!matchesQuery(f.location, row.location, row.name)) return false;
    if (f.maxDistanceKm != null && (row.distanceKm == null || row.distanceKm > f.maxDistanceKm)) return false;
    return true;
  });
}

/** Nearest-first when we have distances, else alphabetical. */
export function sortUncoveredRows(rows: UncoveredBrandRow[]): UncoveredBrandRow[] {
  return [...rows].sort((a, b) => {
    if (a.distanceKm != null && b.distanceKm != null) return a.distanceKm - b.distanceKm;
    if (a.distanceKm != null) return -1;
    if (b.distanceKm != null) return 1;
    return a.name.localeCompare(b.name);
  });
}

// ── Grocery products (packaged SKUs) ────────────────────────────────────────
// 19 rows in groceryProducts.ts (raw ingredients: rice, oats, chicken breast,
// eggs, etc.), previously fully invisible in the UI — the "Grocery" outlet
// filter surfaced ordinary whole-item MenuItem rows (a rotisserie chicken,
// a bento box) instead, since buildScreenerRows() only ever iterates
// MENU_ITEMS. This is a separate, additive surface (a "Pantry" section),
// not a change to that filter. See reference/research-sessions/2026-09-25-
// grocery-product-pantry-ui.md.
export interface GroceryRow {
  id: string;
  name: string;
  emoji: string;
  category: string;
  retailerName: string;
  retailerEmoji: string;
  packageSize: number;
  packageUnit: 'g' | 'ml' | 'each';
  packagePrice: number;
  caloriesPer100: number;
  proteinPer100: number;
  carbsPer100: number;
  fatPer100: number;
  pricePer100: number; // packagePrice normalized to the same 100-unit basis as the macros above
  ppd: number;         // protein per dollar for the whole package (same metric/scale as ScreenerRow.ppd)
  confidence: 'verified' | 'estimated' | 'community';
}

export function buildGroceryRows(): GroceryRow[] {
  return GROCERY_PRODUCTS.map((g) => {
    const b = BRAND_BY_ID.get(g.brandId);
    const pricePer100 = g.packageSize ? Math.round(((g.packagePrice / g.packageSize) * 100) * 100) / 100 : 0;
    const totalProtein = (g.proteinPer100 / 100) * g.packageSize;
    return {
      id: g.id,
      name: g.name,
      emoji: g.emoji,
      category: g.category,
      retailerName: b?.name ?? g.brandId,
      retailerEmoji: b?.emoji ?? '🛒',
      packageSize: g.packageSize,
      packageUnit: g.packageUnit,
      packagePrice: g.packagePrice,
      caloriesPer100: g.caloriesPer100,
      proteinPer100: g.proteinPer100,
      carbsPer100: g.carbsPer100,
      fatPer100: g.fatPer100,
      pricePer100,
      ppd: proteinPerDollar(totalProtein, g.packagePrice),
      confidence: g.confidence,
    };
  });
}

/** Text search across name / category / retailer, reusing the same apostrophe/multi-word-safe matcher as the main screener. */
export function applyGroceryFilters(rows: GroceryRow[], q: string): GroceryRow[] {
  return rows.filter((row) => matchesQuery(q, row.name, row.category, row.retailerName));
}

export type SortKey =
  | 'name' | 'restaurant' | 'location' | 'calories' | 'protein' | 'carbs' | 'fat' | 'price' | 'ppd' | 'distance';
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
  platforms: Platform[];
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
  platforms: [],
  verifiedOnly: false,
  location: '',
  maxDistanceKm: null,
};

export function applyFilters(rows: ScreenerRow[], f: ScreenerFilters): ScreenerRow[] {
  return rows.filter((row) => {
    if (!matchesQuery(f.q, row.name, row.restaurantName)) return false;
    if (f.calMin != null && row.calories < f.calMin) return false;
    if (f.calMax != null && row.calories > f.calMax) return false;
    if (f.protMin != null && row.protein < f.protMin) return false;
    if (f.carbMax != null && row.carbs > f.carbMax) return false;
    if (f.priceMax != null && row.price > f.priceMax) return false;
    // A tag matches if the dish itself is tagged, OR the brand carries that tag
    // overall (Brand.dietTags — e.g. a halal-certified stall) even before every
    // individual dish has been tagged — guarded by brandTagAppliesToDish so a
    // brand-level tag never overrides an explicit per-dish name conflict (e.g.
    // a "Pork Floss Bun" at a brand-level-halal bakery). See
    // reference/research-sessions/2026-09-25-diettags-filter-wiring.md.
    if (
      f.tags.length &&
      !f.tags.every((t) => row.compatibleWith.includes(t) || (row.dietTags.includes(t) && brandTagAppliesToDish(t, row.name)))
    ) return false;
    if (f.outletTypes.length && !f.outletTypes.includes(row.outletType)) return false;
    if (f.platforms.length && !f.platforms.every((p) => row.platforms.includes(p))) return false;
    if (f.verifiedOnly && row.confidence !== 'verified') return false;
    if (!matchesQuery(f.location, row.location, row.restaurantName)) return false;
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

export const PLATFORM_OPTIONS: { value: Platform; label: string; emoji: string }[] = [
  { value: 'dine_in', label: 'Dine-in', emoji: '🍽️' },
  { value: 'grab_go', label: 'Takeaway', emoji: '🥡' },
  { value: 'delivery', label: 'Delivery', emoji: '🛵' },
  { value: 'self_cook', label: 'Ready-to-cook', emoji: '🛒' },
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
  { value: 'home_cooked', label: 'Home Cooked' },
];
