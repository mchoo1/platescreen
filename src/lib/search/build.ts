// Database → SearchIndex. Pure function, run at build time
// (scripts/build-search-index.ts) and in tests.

import type { Database, NutritionProfile } from '@/db/schema';
import { indexNutrition, preferredProfile } from '@/db/nutrition';
import type { OutletPoint, PendingBrandRow, SearchIndex, SearchRow, Trust, VenueInfo } from './types';
import { normalizeSearchText } from './text';

export function trustOf(p: NutritionProfile | null): Trust | null {
  if (!p) return null;
  if (p.status === 'verified') return 'verified';
  if (p.status === 'operator_provided') return 'operator';
  if (p.status === 'community') return 'community';
  if (p.basis === 'concept_reference' || p.basis === 'shared_template') return 'typical';
  return 'estimate';
}

export const proteinPerDollar = (protein: number | null, price: number | null): number | null =>
  protein == null || !price ? null : Math.round((protein / price) * 10) / 10;

export function buildSearchIndex(db: Database, generatedAt = new Date().toISOString()): SearchIndex {
  const nut = indexNutrition(db);
  const brandById = new Map(db.brands.map((b) => [b.id, b]));
  const conceptById = new Map(db.food_concepts.map((c) => [c.id, c]));

  // Venues + closures
  const venueIdx = new Map<string, number>();
  const venues: VenueInfo[] = db.venues.map((v, i) => {
    venueIdx.set(v.id, i);
    return { id: v.id, name: v.name, closures: [] };
  });
  for (const c of db.outlet_closures) {
    if (c.venueId != null && venueIdx.has(c.venueId)) venues[venueIdx.get(c.venueId)!].closures.push([c.startDate, c.endDate, c.reason]);
  }
  for (const v of venues) v.closures.sort((a, b) => a[0].localeCompare(b[0]));

  // Outlets + hours
  const hoursByOutlet = new Map<string, [number, string, string][]>();
  for (const h of db.outlet_hours) {
    (hoursByOutlet.get(h.outletId) ?? hoursByOutlet.set(h.outletId, []).get(h.outletId)!).push([h.dayOfWeek, h.opens, h.closes]);
  }
  const venueName = new Map(db.venues.map((v) => [v.id, v.name]));
  const outletsByBrand = new Map<string, number[]>();
  const outlets: OutletPoint[] = db.outlets.map((o, i) => {
    (outletsByBrand.get(o.brandId) ?? outletsByBrand.set(o.brandId, []).get(o.brandId)!).push(i);
    return {
      id: o.id, label: o.label, lat: o.lat, lng: o.lng,
      venue: o.venueId != null ? venueIdx.get(o.venueId) ?? null : null,
      area: normalizeSearchText([o.label, o.venueId ? venueName.get(o.venueId) : '', o.address ?? '', o.postal ?? ''].join(' ')),
      hours: hoursByOutlet.get(o.id) ?? null,
    };
  });

  const locationLabel = (brandId: string, fallback: string) => {
    const idxs = outletsByBrand.get(brandId) ?? [];
    if (idxs.length === 0) return '';
    if (idxs.length === 1) {
      const o = db.outlets[idxs[0]];
      return (o.venueId && venueName.get(o.venueId)) || o.label || fallback;
    }
    return `${idxs.length} outlets`;
  };

  // Per-product facts
  const group = <T extends { productId: string }>(rows: T[]) => {
    const m = new Map<string, T[]>();
    for (const r of rows) (m.get(r.productId) ?? m.set(r.productId, []).get(r.productId)!).push(r);
    return m;
  };
  const tags = group(db.product_diet_tags);
  const allergens = group(db.allergen_statements.filter((a) => a.validTo == null));
  const claims = group(db.dietary_claims.filter((c) => c.validTo == null));
  const prep = group(db.product_preparation);
  const attrs = new Map(db.product_attributes.map((a) => [a.productId, a]));
  const priceByProduct = new Map<string, (typeof db.prices)[number]>();
  for (const p of db.prices) {
    if (p.subjectType !== 'product' || p.validTo != null || p.outletId != null || p.channel !== 'in_store') continue;
    if (p.kind !== 'item' && p.kind !== 'set') continue;
    priceByProduct.set(p.subjectId, p);
  }

  const rows: SearchRow[] = [];
  for (const p of db.products) {
    if (p.activeStatus !== 'active') continue;
    const b = brandById.get(p.brandId);
    if (!b) continue;
    const prof = preferredProfile(nut, p.id, p.conceptId);
    const price = priceByProduct.get(p.id) ?? null;
    const concept = p.conceptId ? conceptById.get(p.conceptId) ?? null : null;
    const kcal = prof?.caloriesKcal ?? null; const protein = prof?.proteinG ?? null;
    const carbs = prof?.carbohydrateG ?? null; const fat = prof?.fatG ?? null;
    const diet: SearchRow['diet'] = {};
    for (const t of tags.get(p.id) ?? []) diet[t.tag] = t.value;
    const al: SearchRow['allergens'] = {};
    for (const a of allergens.get(p.id) ?? []) {
      // Declared facts outrank inference for the same allergen.
      const existing = al[a.allergen];
      if (!existing || a.basis !== 'dish_inference') al[a.allergen] = a.status;
    }
    const methods = (prep.get(p.id) ?? []).sort((x, y) => Number(y.isPrimary) - Number(x.isPrimary)).map((x) => x.method);
    rows.push({
      id: p.id, brandId: b.id, name: p.name, emoji: p.emoji, category: p.category,
      brandName: b.name, cuisine: b.cuisine, outletType: b.type, platforms: b.platforms, brandDietTags: b.dietTags,
      location: locationLabel(b.id, b.name),
      conceptName: concept?.name ?? null,
      kcal, protein, carbs, fat,
      complete: kcal != null && protein != null && carbs != null && fat != null,
      nutritionStatus: prof?.status ?? null, nutritionBasis: prof?.basis ?? null, trust: trustOf(prof),
      price: price?.amount ?? null, priceKind: price?.kind ?? null, priceCheckedAt: price?.lastVerifiedAt ?? null,
      ppd: proteinPerDollar(protein, price?.amount ?? null),
      diet, allergens: al,
      glutenFree: (claims.get(p.id) ?? []).some((c) => c.claim === 'gluten_free' || c.claim === 'naturally_gluten_free'),
      cooking: [...new Set(methods)],
      spice: attrs.get(p.id)?.spiceLevel ?? null,
      popular: p.isPopular,
      text: normalizeSearchText([p.name, b.name, b.cuisine, p.category, concept?.name ?? '', ...(b.aliases ?? [])].join(' ')),
    });
  }

  const covered = new Set(rows.map((r) => r.brandId));
  const pending: PendingBrandRow[] = db.brands
    .filter((b) => !covered.has(b.id))
    .map((b) => ({ id: b.id, name: b.name, emoji: b.emoji, cuisine: b.cuisine, outletType: b.type, location: locationLabel(b.id, b.name) }));

  return {
    generatedAt,
    rows, outlets, venues, pending,
    brandOutlets: Object.fromEntries(outletsByBrand),
    stats: {
      dishes: rows.length,
      brands: covered.size,
      outlets: outlets.length,
      verified: rows.filter((r) => r.trust === 'verified' || r.trust === 'operator').length,
      typical: rows.filter((r) => r.trust === 'typical').length,
      estimate: rows.filter((r) => r.trust === 'estimate').length,
      venuesWithClosures: venues.filter((v) => v.closures.length).length,
    },
  };
}
