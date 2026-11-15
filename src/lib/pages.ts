// Build-time data access for the static /brand/[id] and /brand/[id]/[itemId]
// pages and the sitemap. Server-only (reads /data through loadDatabase).

import { loadDatabase } from '@/db/load';
import { indexNutrition, preferredProfile } from '@/db/nutrition';
import type {
  AllergenStatement, Brand, DataSource, DietaryClaim, FoodConcept, NutritionProfile, Outlet,
  OutletClosure, OutletHours, OutletLicence, Price, Product, ProductDietTag, ProductPreparation, Venue,
} from '@/db/schema';
import { trustOf, proteinPerDollar } from '@/lib/search/build';
import type { Trust } from '@/lib/search/types';

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

export const allBrandIds = () => ctx().db.brands.map((b) => b.id);
export const allDishParams = () => ctx().db.products.map((p) => ({ id: p.brandId, itemId: p.id }));

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
