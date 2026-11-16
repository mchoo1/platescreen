// Database → SearchIndex. Pure function, run at build time
// (scripts/build-search-index.ts) and in tests.

import type { Database, NutritionProfile } from '@/db/schema';
import { combineNutrition, indexNutrition, preferredProfile } from '@/db/nutrition';
import { HIDDEN_OUTLET_TYPES, type SetCombo, type OutletPoint, type PendingBrandRow, type SearchIndex, type SearchRow, type Trust, type VenueInfo } from './types';
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

  const unconfirmedSources = new Set(db.data_sources.filter((x) => x.type === 'web_research' || x.type === 'community').map((x) => x.id));
  const rows: SearchRow[] = [];
  for (const p of db.products) {
    if (p.activeStatus !== 'active') continue;
    const b = brandById.get(p.brandId);
    if (!b || HIDDEN_OUTLET_TYPES.includes(b.type)) continue;
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
      id: p.id, kind: 'dish', priceNote: price && unconfirmedSources.has(price.sourceId) ? 'unconfirmed' : null,
      brandId: b.id, name: p.name, emoji: p.emoji, category: p.category,
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

  // ── Meal sets: one row per configuration, with every combination pre-computed ──
  const productById = new Map(db.products.map((p) => [p.id, p]));
  const rowById = new Map(rows.map((r) => [r.id, r]));
  const optionPrice = new Map<string, number>();
  for (const pr of db.prices) if (pr.subjectType === 'option' && pr.validTo == null && pr.channel === 'in_store' && pr.amount != null) optionPrice.set(pr.subjectId, pr.amount);
  const setPrice = new Map<string, (typeof db.prices)[number]>();
  for (const pr of db.prices) if (pr.subjectType === 'configuration' && pr.validTo == null && pr.channel === 'in_store' && pr.outletId == null) setPrice.set(pr.subjectId, pr);
  for (const cfg of db.meal_configurations) {
    if (cfg.activeStatus !== 'active') continue;
    const b = brandById.get(cfg.brandId);
    if (!b || HIDDEN_OUTLET_TYPES.includes(b.type)) continue;
    const groups = db.configuration_groups.filter((g) => g.configurationId === cfg.id).sort((a, c) => a.displayOrder - c.displayOrder);
    // Pre-computing combinations only works for pick-one groups; others need the builder.
    if (!groups.length || groups.some((g) => g.selectionMin !== 1 || g.selectionMax !== 1)) continue;
    const opts = groups.map((g) => db.configuration_options.filter((o) => o.groupId === g.id).sort((a, c) => Number(c.isDefault) - Number(a.isDefault)));
    if (opts.some((o) => !o.length)) continue;
    let combosRaw: (typeof db.configuration_options)[] = [[]];
    for (const list of opts) combosRaw = combosRaw.flatMap((c) => list.map((o) => [...c, o]));
    const base = setPrice.get(cfg.id) ?? null;
    const statuses: string[] = [];
    const combos: SetCombo[] = combosRaw.map((sel) => {
      const n = combineNutrition(sel.map((o) => {
        const prod = productById.get(o.productId);
        const prof = preferredProfile(nut, o.productId, prod?.conceptId ?? null);
        return { productId: o.productId, quantity: o.quantity, profile: prof };
      }));
      if (n.lowestStatus) statuses.push(n.lowestStatus);
      let price: number | null = base?.amount ?? null;
      for (const o of sel) {
        if (price == null) break;
        if (o.isDefault) continue;
        const delta = optionPrice.get(o.id);
        price = delta == null ? null : Math.round((price + delta) * 100) / 100;
      }
      const known = n.knownComponents > 0 || n.totals.caloriesKcal > 0;
      return {
        summary: sel.slice(1).map((o) => productById.get(o.productId)?.name ?? o.productId).join(' + '),
        isDefault: sel.every((o) => o.isDefault),
        kcal: known ? n.totals.caloriesKcal : null, protein: known ? n.totals.proteinG : null,
        carbs: known ? n.totals.carbohydrateG : null, fat: known ? n.totals.fatG : null,
        complete: n.complete, price, ppd: proteinPerDollar(known ? n.totals.proteinG : null, price),
      };
    });
    const def = combos[0];
    const mainId = opts[0][0].productId;
    const mainRow = rowById.get(mainId);
    const defaultSel = combosRaw[0];
    const al: SearchRow['allergens'] = {};
    const cooking = new Set<string>();
    for (const o of defaultSel) {
      const r = rowById.get(o.productId);
      if (!r) continue;
      for (const [k, v] of Object.entries(r.allergens)) if (!al[k as keyof typeof al]) al[k as keyof typeof al] = v;
      r.cooking.forEach((m) => cooking.add(m));
    }
    const worst = ['outdated', 'needs_review', 'community', 'estimated', 'operator_provided', 'verified'].find((st) => statuses.includes(st)) ?? null;
    rows.push({
      id: cfg.id, kind: 'set', combos,
      priceNote: base && unconfirmedSources.has(base.sourceId) ? 'unconfirmed' : null,
      brandId: b.id, name: cfg.name, emoji: mainRow?.emoji ?? '🍱', category: 'Meals',
      brandName: b.name, cuisine: b.cuisine, outletType: b.type, platforms: b.platforms, brandDietTags: b.dietTags,
      location: locationLabel(b.id, b.name), conceptName: null,
      kcal: def.kcal, protein: def.protein, carbs: def.carbs, fat: def.fat, complete: def.complete,
      nutritionStatus: (worst as SearchRow['nutritionStatus']) ?? null, nutritionBasis: null,
      trust: worst === 'verified' ? 'verified' : worst === 'operator_provided' ? 'operator' : worst === 'community' ? 'community' : worst ? 'estimate' : null,
      price: def.price, priceKind: 'set', priceCheckedAt: base?.lastVerifiedAt ?? null, ppd: def.ppd,
      diet: { ...(mainRow?.diet ?? {}) }, allergens: al, glutenFree: false,
      cooking: [...cooking] as SearchRow['cooking'], spice: mainRow?.spice ?? null, popular: mainRow?.popular ?? false,
      text: normalizeSearchText([cfg.name, 'meal set combo value meal evm', b.name, b.cuisine, ...(b.aliases ?? []), ...combosRaw[0].map((o) => productById.get(o.productId)?.name ?? '')].join(' ')),
    });
  }

  const covered = new Set(rows.map((r) => r.brandId));
  const pending: PendingBrandRow[] = db.brands
    .filter((b) => !covered.has(b.id) && !HIDDEN_OUTLET_TYPES.includes(b.type))
    .map((b) => ({ id: b.id, name: b.name, emoji: b.emoji, cuisine: b.cuisine, outletType: b.type, location: locationLabel(b.id, b.name) }));

  return {
    generatedAt,
    rows, outlets, venues, pending,
    brandOutlets: Object.fromEntries(outletsByBrand),
    stats: {
      dishes: rows.filter((r) => r.kind === 'dish').length,
      sets: rows.filter((r) => r.kind === 'set').length,
      brands: covered.size,
      outlets: outlets.length,
      verified: rows.filter((r) => r.trust === 'verified' || r.trust === 'operator').length,
      typical: rows.filter((r) => r.trust === 'typical').length,
      estimate: rows.filter((r) => r.trust === 'estimate').length,
      venuesWithClosures: venues.filter((v) => v.closures.length).length,
    },
  };
}
