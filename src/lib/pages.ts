// Build-time data access for the static /brand/[id] and /brand/[id]/[itemId]
// pages and the sitemap. Server-only (reads /data through loadDatabase).

import { loadDatabase } from '@/db/load';
import { indexNutrition, preferredProfile } from '@/db/nutrition';
import type {
  AllergenStatement, Brand, DataSource, DietaryClaim, FoodConcept, NutritionProfile, Outlet,
  OutletClosure, OutletHours, OutletLicence, Price, Product, ProductDietTag, ProductPreparation, Venue,
} from '@/db/schema';
import { trustOf, proteinPerDollar } from '@/lib/search/build';
import { HIDDEN_OUTLET_TYPES, type Trust } from '@/lib/search/types';

function lazy<T>(fn: () => T): () => T {
  let v: T | undefined;
  return () => (v ??= fn());
}

const ctx = lazy(() => {
  const db = loadDatabase();
  const by = <T, K>(rows: T[], key: (r: T) => K) => {
    const m = new Map<K, T[]>();
    for (const r of rows) (m.get(key(r)) ?? m.set(key(r), []).get(key(r))!).push(r);
    return m;
  };
  return {
    db,
    nut: indexNutrition(db),
    brand: new Map(db.brands.map((b) => [b.id, b])),
    product: new Map(db.products.map((p) => [p.id, p])),
    concept: new Map(db.food_concepts.map((c) => [c.id, c])),
    venue: new Map(db.venues.map((v) => [v.id, v])),
    source: new Map(db.data_sources.map((s) => [s.id, s])),
    productsByBrand: by(db.products, (p) => p.brandId),
    outletsByBrand: by(db.outlets, (o) => o.brandId),
    licence: new Map(db.outlet_licences.map((l) => [l.outletId, l])),
    hours: by(db.outlet_hours, (h) => h.outletId),
    venueClosures: by(db.outlet_closures.filter((c) => c.venueId), (c) => c.venueId!),
    outletClosures: by(db.outlet_closures.filter((c) => c.outletId), (c) => c.outletId!),
    prices: by(db.prices.filter((p) => p.subjectType === 'product' && p.validTo == null), (p) => p.subjectId),
    tags: by(db.product_diet_tags, (t) => t.productId),
    allergens: by(db.allergen_statements.filter((a) => a.validTo == null), (a) => a.productId),
    claims: by(db.dietary_claims.filter((c) => c.validTo == null), (c) => c.productId),
    prep: by(db.product_preparation, (p) => p.productId),
    attrs: new Map(db.product_attributes.map((a) => [a.productId, a])),
  };
});

export interface OutletView {
  outlet: Outlet;
  venue: Venue | null;
  licence: OutletLicence | null;
  hours: OutletHours[];
  upcomingClosures: OutletClosure[];
}

export interface DishView {
  brand: Brand;
  product: Product;
  concept: FoodConcept | null;
  profile: NutritionProfile | null;
  profileSource: DataSource | null;
  trust: Trust | null;
  price: Price | null;
  ppd: number | null;
  dietTags: ProductDietTag[];
  allergens: AllergenStatement[];
  claims: DietaryClaim[];
  preparation: ProductPreparation[];
  spiceLevel: number | null;
  outlets: OutletView[];
  outletCount: number;
  otherProducts: Product[];
}

export function buildDate(): string {
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

export function outletViews(brandId: string, limit = 12): { views: OutletView[]; count: number } {
  const c = ctx();
  const today = buildDate();
  const all = c.outletsByBrand.get(brandId) ?? [];
  const views = all.slice(0, limit).map((o) => {
    const venue = o.venueId ? c.venue.get(o.venueId) ?? null : null;
    const closures = [...(venue ? c.venueClosures.get(venue.id) ?? [] : []), ...(c.outletClosures.get(o.id) ?? [])]
      .filter((x) => x.endDate >= today)
      .sort((a, b) => a.startDate.localeCompare(b.startDate));
    return { outlet: o, venue, licence: c.licence.get(o.id) ?? null, hours: c.hours.get(o.id) ?? [], upcomingClosures: closures };
  });
  return { views, count: all.length };
}

export function getDish(brandId: string, productId: string): DishView | null {
  const c = ctx();
  const brand = c.brand.get(brandId);
  const product = c.product.get(productId);
  if (!brand || !product || product.brandId !== brandId) return null;
  const profile = preferredProfile(c.nut, product.id, product.conceptId);
  const price = (c.prices.get(product.id) ?? []).find((p) => p.outletId == null && p.channel === 'in_store') ?? null;
  const { views, count } = outletViews(brandId);
  return {
    brand, product,
    concept: product.conceptId ? c.concept.get(product.conceptId) ?? null : null,
    profile, profileSource: profile ? c.source.get(profile.sourceId) ?? null : null,
    trust: trustOf(profile),
    price, ppd: proteinPerDollar(profile?.proteinG ?? null, price?.amount ?? null),
    dietTags: c.tags.get(product.id) ?? [],
    allergens: c.allergens.get(product.id) ?? [],
    claims: c.claims.get(product.id) ?? [],
    preparation: c.prep.get(product.id) ?? [],
    spiceLevel: c.attrs.get(product.id)?.spiceLevel ?? null,
    outlets: views, outletCount: count,
    otherProducts: (c.productsByBrand.get(brandId) ?? []).filter((p) => p.id !== product.id),
  };
}

export interface BrandView {
  brand: Brand;
  items: { product: Product; profile: NutritionProfile | null; trust: Trust | null; price: number | null; ppd: number | null }[];
  outlets: OutletView[];
  outletCount: number;
}

export function getBrand(brandId: string): BrandView | null {
  const c = ctx();
  const brand = c.brand.get(brandId);
  if (!brand) return null;
  const items = (c.productsByBrand.get(brandId) ?? []).map((product) => {
    const profile = preferredProfile(c.nut, product.id, product.conceptId);
    const price = (c.prices.get(product.id) ?? []).find((p) => p.outletId == null && p.channel === 'in_store')?.amount ?? null;
    return { product, profile, trust: trustOf(profile), price, ppd: proteinPerDollar(profile?.proteinG ?? null, price) };
  });
  const { views, count } = outletViews(brandId, 30);
  return { brand, items, outlets: views, outletCount: count };
}

const visibleBrand = (id: string) => { const b = ctx().brand.get(id); return !!b && !HIDDEN_OUTLET_TYPES.includes(b.type); };
export const allBrandIds = () => ctx().db.brands.filter((b) => visibleBrand(b.id)).map((b) => b.id);
export const allDishParams = () => ctx().db.products.filter((p) => visibleBrand(p.brandId)).map((p) => ({ id: p.brandId, itemId: p.id }));

const OUTLET_TYPE_LABEL: Record<string, string> = {
  restaurant: 'Restaurant', food_court: 'Food court', coffeeshop: 'Coffeeshop', canteen: 'Canteen', grab_go: 'Grab & go',
  food_court_stall: 'Food court stall', hawker: 'Hawker stall', supermarket: 'Supermarket', ready_to_eat: 'Ready-to-eat', home_cooked: 'Home-cooked',
};
export const outletTypeLabel = (t: string) => OUTLET_TYPE_LABEL[t] ?? t;

export const ALLERGEN_LABEL: Record<string, string> = {
  gluten: 'Gluten (wheat)', crustacea: 'Crustacea', egg: 'Egg', fish: 'Fish', peanut: 'Peanut', soy: 'Soy', milk: 'Milk',
  tree_nuts: 'Tree nuts', sulphites: 'Sulphites', sesame: 'Sesame', molluscs: 'Molluscs',
};
export const COOKING_LABEL: Record<string, string> = {
  deep_fried: 'Deep-fried', stir_fried: 'Stir-fried', fried: 'Fried', steamed: 'Steamed / poached', grilled: 'Grilled', roasted: 'Roasted',
  braised: 'Braised', soup: 'Soup', baked: 'Baked', raw: 'Raw / salad', boiled: 'Boiled',
};
export const DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const fmtDate = (iso: string) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// ── Meal sets ────────────────────────────────────────────────────────────────
export interface MealOptionView {
  id: string;
  productId: string;
  name: string;
  isDefault: boolean;
  kcal: number | null; protein: number | null; carbs: number | null; fat: number | null;
  trust: Trust | null;
  priceDelta: number | null;     // null = unknown; defaults are included (0)
}
export interface MealView {
  brand: Brand;
  id: string;
  name: string;
  groups: { id: string; name: string; options: MealOptionView[] }[];
  setPrice: number | null;
  setPriceSource: DataSource | null;
  sources: DataSource[];
  mainProductId: string | null;
}

export function getMeal(brandId: string, configId: string): MealView | null {
  const c = ctx();
  const cfg = c.db.meal_configurations.find((m) => m.id === configId && m.brandId === brandId && m.activeStatus === 'active');
  const brand = c.brand.get(brandId);
  if (!cfg || !brand || HIDDEN_OUTLET_TYPES.includes(brand.type)) return null;
  const groups = c.db.configuration_groups.filter((g) => g.configurationId === cfg.id).sort((a, b) => a.displayOrder - b.displayOrder);
  const optPrice = new Map(c.db.prices.filter((p) => p.subjectType === 'option' && p.validTo == null && p.channel === 'in_store').map((p) => [p.subjectId, p]));
  const usedSources = new Set<string>();
  const views = groups.map((g) => ({
    id: g.id, name: g.name,
    options: c.db.configuration_options.filter((o) => o.groupId === g.id).sort((a, b) => Number(b.isDefault) - Number(a.isDefault)).map((o) => {
      const prod = c.product.get(o.productId);
      const prof = preferredProfile(c.nut, o.productId, prod?.conceptId ?? null);
      if (prof) usedSources.add(prof.sourceId);
      const pr = optPrice.get(o.id);
      if (pr) usedSources.add(pr.sourceId);
      return {
        id: o.id, productId: o.productId, name: prod?.name ?? o.productId, isDefault: o.isDefault,
        kcal: prof?.caloriesKcal ?? null, protein: prof?.proteinG ?? null, carbs: prof?.carbohydrateG ?? null, fat: prof?.fatG ?? null,
        trust: trustOf(prof), priceDelta: o.isDefault ? 0 : pr?.amount ?? null,
      };
    }),
  }));
  const sp = c.db.prices.find((p) => p.subjectType === 'configuration' && p.subjectId === cfg.id && p.validTo == null && p.channel === 'in_store');
  if (sp) usedSources.add(sp.sourceId);
  return {
    brand, id: cfg.id, name: cfg.name, groups: views,
    setPrice: sp?.amount ?? null, setPriceSource: sp ? c.source.get(sp.sourceId) ?? null : null,
    sources: [...usedSources].map((s) => c.source.get(s)).filter((s): s is DataSource => !!s),
    mainProductId: views[0]?.options[0]?.productId ?? null,
  };
}

export const allMealParams = () => ctx().db.meal_configurations
  .filter((m) => m.activeStatus === 'active' && visibleBrand(m.brandId))
  .map((m) => ({ id: m.brandId, configId: m.id }));

/** Meals that include this product as an option (for "Also as a meal" links). */
export function mealsContaining(productId: string): { id: string; name: string }[] {
  const c = ctx();
  const groupIds = new Set(c.db.configuration_options.filter((o) => o.productId === productId).map((o) => o.groupId));
  const cfgIds = new Set(c.db.configuration_groups.filter((g) => groupIds.has(g.id)).map((g) => g.configurationId));
  return c.db.meal_configurations.filter((m) => cfgIds.has(m.id) && m.activeStatus === 'active').map((m) => ({ id: m.id, name: m.name }));
}
