// PlateScreen v2 schema — the canonical shape of every table in /data.
//
// Introduced 2026-11-16 (PRD v2.0 rebuild). Each table is one JSON file in
// /data, one array of rows. The rules that matter most (PRD Part 14):
//   - Missing values are `null`, never 0. A 0 means "measured/declared zero".
//   - Facts (nutrition, prices, allergens, hours) carry a source and a status.
//   - Facts are append-only: a correction closes the old row (validTo) and
//     adds a new one. Rows with validTo === null are the current ones.
//   - Estimates are never presented as verified (see NutritionStatus).
// See data/README.md for how agents should add and correct rows.

import type { DietaryFlag, OutletType, PriceRange } from '@/types';

export type Platform = 'dine_in' | 'grab_go' | 'delivery' | 'self_cook';
export type ISODate = string; // 'YYYY-MM-DD'

// ── Provenance ────────────────────────────────────────────────────────────────
export interface DataSource {
  id: string;
  name: string;
  type: 'legacy_import' | 'official_published' | 'operator_submission' | 'government_open_data' | 'web_research' | 'community' | 'rule_inference';
  reference: string | null;     // URL, file path or description
  retrievedAt: ISODate | null;
  licensingNotes: string | null;
}

// ── 1 · Where ─────────────────────────────────────────────────────────────────
export interface Brand {
  id: string;                    // stable slug — also the /brand/[id] URL
  name: string;
  emoji: string;
  type: OutletType;
  cuisine: string;
  aliases: string[];
  dietTags: DietaryFlag[];       // brand-level tags (e.g. halal-certified stall); see brandTagAppliesToDish
  priceRange: PriceRange;
  platforms: Platform[];
  operatorId: string | null;
}

export interface Operator {
  id: string;
  name: string;
  type: 'food_court_operator' | 'coffeeshop_group';
}

/** A building or centre that contains outlets: a hawker centre, mall, food court. */
export interface Venue {
  id: string;
  name: string;
  type: 'hawker_centre' | 'food_court' | 'mall' | 'other';
  neaName: string | null;        // matched name in NEA's hawker-centre datasets, if any
  lat: number | null;
  lng: number | null;
}

/** One physical location of a brand (legacy "Premises"). */
export interface Outlet {
  id: string;                    // stable, kept from legacy Premises.id
  brandId: string;
  venueId: string | null;
  label: string;
  locationType: 'hawker_centre' | 'food_court' | 'coffeeshop' | 'mall' | 'standalone_shopfront' | 'mrt_station' | 'residential' | 'office' | 'other';
  address: string | null;
  postal: string | null;
  lat: number | null;
  lng: number | null;
  operatingStatus: 'operating' | 'temporarily_closed' | 'closed' | 'unknown';
  sourceId: string;
  legacySource: string | null;   // legacy Premises.source provenance tag
}

export interface OutletLicence {
  outletId: string;
  licenceNumber: string | null;
  licenseeName: string | null;
  premisesAddress: string | null;
  grade: 'A' | 'B' | 'C' | 'New' | 'not_applicable' | null;
  demeritPoints: number | null;
  licenceSuspended: boolean | null;
  sourceId: string;
}

// ── 2 · What ──────────────────────────────────────────────────────────────────
/** A standard dish identity shared across stalls ("Hainanese Chicken Rice"). */
export interface FoodConcept {
  id: string;
  name: string;
  category: string;
  note: string | null;
}

/**
 * A dish or drink a brand sells. Products are brand-level (design decision D1:
 * one menu per brand, outlet differences via outlet_menu_overrides), so a
 * product doubles as that brand's menu item. Kept ids = legacy MenuItem ids.
 */
export interface Product {
  id: string;
  brandId: string;
  conceptId: string | null;
  name: string;
  emoji: string;
  category: string;
  kind: 'dish' | 'drink' | 'side' | 'addon' | 'dessert';
  isPopular: boolean;
  activeStatus: 'active' | 'discontinued';
}

export interface Variant {
  id: string;
  productId: string;
  name: string;                  // "Regular", "Medium", "6 pc"
  portionQuantity: number | null;
  portionUnit: 'serving' | 'g' | 'ml' | 'pc' | null;
  isDefault: boolean;
}

export interface OutletMenuOverride {
  outletId: string;
  productId: string;
  availability: 'unavailable' | 'available';
  sourceId: string;
  validFrom: ISODate | null;
  validTo: ISODate | null;
}

// ── 3 · How it's assembled ───────────────────────────────────────────────────
export interface MealConfiguration {
  id: string;
  brandId: string;
  name: string;
  type: 'set' | 'build' | 'bundle';
  officialProfileId: string | null; // brand-published whole-meal nutrition, kept for comparison
  activeStatus: 'active' | 'discontinued';
}

export interface ConfigurationGroup {
  id: string;
  configurationId: string;
  name: string;
  selectionMin: number;
  selectionMax: number;
  displayOrder: number;
}

export interface ConfigurationOption {
  id: string;
  groupId: string;
  productId: string;
  variantId: string | null;
  quantity: number;
  isDefault: boolean;
}

// ── 4 · Facts (versioned, sourced) ───────────────────────────────────────────
export type NutritionStatus = 'verified' | 'operator_provided' | 'estimated' | 'community' | 'needs_review' | 'outdated';
export type NutritionBasis =
  | 'official_published'   // brand's own nutrition document
  | 'operator_declared'    // stall/brand submitted it to us
  | 'stall_estimate'       // estimated for this specific dish
  | 'concept_reference'    // a standard value for the dish type, shared across stalls
  | 'shared_template'      // legacy value copied across differently-named dishes
  | 'community';

export interface NutritionProfile {
  id: string;
  subjectType: 'product' | 'variant' | 'concept' | 'configuration';
  subjectId: string;
  servingQuantity: number;
  servingUnit: 'serving' | 'g' | 'ml' | 'pc';
  caloriesKcal: number | null;
  proteinG: number | null;
  carbohydrateG: number | null;
  fatG: number | null;
  fibreG: number | null;
  sugarG: number | null;
  sodiumMg: number | null;
  saturatedFatG: number | null;
  status: NutritionStatus;
  basis: NutritionBasis;
  confidence: number | null;     // 0–1
  assumptions: string[];
  sourceId: string;
  validFrom: ISODate | null;
  validTo: ISODate | null;
}

export type PriceKind = 'item' | 'set' | 'upgrade' | 'addon' | 'promo';
export interface Price {
  id: string;
  subjectType: 'product' | 'variant' | 'configuration' | 'option';
  subjectId: string;
  outletId: string | null;       // null = brand-wide default
  kind: PriceKind;
  channel: 'in_store' | 'delivery';
  amount: number | null;
  currency: 'SGD';
  sourceId: string;
  validFrom: ISODate | null;
  validTo: ISODate | null;
  lastVerifiedAt: ISODate | null; // null = never re-checked since import
}

export type TriState = 'yes' | 'no';
export interface ProductDietTag {
  productId: string;
  tag: DietaryFlag;
  value: TriState;               // absent row = unknown
  basis: 'legacy_v1' | 'legacy_v1_unverified' | 'name_rule' | 'operator_declared' | 'certified';
  sourceId: string;
}

// Allergens — groups SFA requires on prepacked labels, plus sesame and molluscs.
export const ALLERGENS = ['gluten', 'crustacea', 'egg', 'fish', 'peanut', 'soy', 'milk', 'tree_nuts', 'sulphites', 'sesame', 'molluscs'] as const;
export type Allergen = (typeof ALLERGENS)[number];

export type AllergenStatus = 'contains' | 'may_contain' | 'likely_contains' | 'not_listed';
export type AllergenBasis = 'official_published' | 'operator_declared' | 'dish_inference';

/**
 * One allergen fact about a product. No row = unknown (the default).
 * Policy (Ming, 2026-11-15, "likely + confirmed"):
 *   - basis dish_inference may ONLY use status likely_contains.
 *   - contains / may_contain / not_listed require official_published or operator_declared.
 */
export interface AllergenStatement {
  productId: string;
  allergen: Allergen;
  status: AllergenStatus;
  basis: AllergenBasis;
  reason: string | null;         // e.g. "soy sauce is usually used"
  sourceId: string;
  validFrom: ISODate | null;
  validTo: ISODate | null;
}

/** Label claims like "gluten-free" — only ever from a brand/stall declaration. */
export interface DietaryClaim {
  productId: string;
  claim: 'gluten_free' | 'naturally_gluten_free' | 'reduced_gluten';
  basis: 'official_published' | 'operator_declared';
  sourceId: string;
  evidence: string | null;
  validFrom: ISODate | null;
  validTo: ISODate | null;
}

export const COOKING_METHODS = ['deep_fried', 'stir_fried', 'fried', 'steamed', 'grilled', 'roasted', 'braised', 'soup', 'baked', 'raw', 'boiled'] as const;
export type CookingMethod = (typeof COOKING_METHODS)[number];
export const FRIED_METHODS: CookingMethod[] = ['deep_fried', 'stir_fried', 'fried'];

export interface ProductPreparation {
  productId: string;
  method: CookingMethod;
  isPrimary: boolean;
  basis: 'name_rule' | 'concept_default' | 'operator_declared';
  sourceId: string;
}

export interface ProductAttributes {
  productId: string;
  spiceLevel: 0 | 1 | 2 | 3 | null; // null = unknown
  served: 'hot' | 'cold' | null;
  basis: 'name_rule' | 'operator_declared';
  sourceId: string;
}

/** Weekly hours for an outlet. dayOfWeek 0 = Sunday. Times are 'HH:MM', SGT. */
export interface OutletHours {
  outletId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  opens: string;
  closes: string;                // may be earlier than opens → crosses midnight
  sourceId: string;
  lastVerifiedAt: ISODate | null;
}

/** A dated closure for an outlet OR a whole venue (e.g. NEA quarterly cleaning). */
export interface OutletClosure {
  id: string;
  outletId: string | null;
  venueId: string | null;
  startDate: ISODate;
  endDate: ISODate;              // inclusive
  reason: 'cleaning' | 'repairs' | 'renovation' | 'festive' | 'rest_day' | 'other';
  note: string | null;
  sourceId: string;
}

export interface GroceryProduct {
  id: string;
  brandId: string;
  name: string;
  emoji: string;
  category: string;
  packageSize: number;
  packageUnit: 'g' | 'ml' | 'each';
  packagePrice: number | null;
  caloriesPer100: number | null;
  proteinPer100: number | null;
  carbsPer100: number | null;
  fatPer100: number | null;
  status: NutritionStatus;
  sourceId: string;
}

/** Every table and its file name in /data. */
export interface Database {
  data_sources: DataSource[];
  brands: Brand[];
  operators: Operator[];
  venues: Venue[];
  outlets: Outlet[];
  outlet_licences: OutletLicence[];
  food_concepts: FoodConcept[];
  products: Product[];
  variants: Variant[];
  outlet_menu_overrides: OutletMenuOverride[];
  meal_configurations: MealConfiguration[];
  configuration_groups: ConfigurationGroup[];
  configuration_options: ConfigurationOption[];
  nutrition_profiles: NutritionProfile[];
  prices: Price[];
  product_diet_tags: ProductDietTag[];
  allergen_statements: AllergenStatement[];
  dietary_claims: DietaryClaim[];
  product_preparation: ProductPreparation[];
  product_attributes: ProductAttributes[];
  outlet_hours: OutletHours[];
  outlet_closures: OutletClosure[];
  grocery_products: GroceryProduct[];
}

export const TABLES: (keyof Database)[] = [
  'data_sources', 'brands', 'operators', 'venues', 'outlets', 'outlet_licences',
  'food_concepts', 'products', 'variants', 'outlet_menu_overrides',
  'meal_configurations', 'configuration_groups', 'configuration_options',
  'nutrition_profiles', 'prices', 'product_diet_tags', 'allergen_statements',
  'dietary_claims', 'product_preparation', 'product_attributes',
  'outlet_hours', 'outlet_closures', 'grocery_products',
];
