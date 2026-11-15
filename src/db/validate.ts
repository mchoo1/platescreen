// Integrity checks for /data. Run by `npm test` (tests/db.integrity.test.ts)
// and CI. Every agent or hand edit to /data must pass these.

import { ALLERGENS, COOKING_METHODS, type Database } from './schema';

export function validateDatabase(db: Database): string[] {
  const errors: string[] = [];
  const err = (m: string) => { if (errors.length < 200) errors.push(m); };

  const ids = <T extends { id: string }>(table: string, rows: T[]) => {
    const seen = new Set<string>();
    for (const r of rows) {
      if (!r.id) err(`${table}: row without id`);
      if (seen.has(r.id)) err(`${table}: duplicate id ${r.id}`);
      seen.add(r.id);
    }
    return seen;
  };
  const brands = ids('brands', db.brands);
  const operators = ids('operators', db.operators);
  const venues = ids('venues', db.venues);
  const outlets = ids('outlets', db.outlets);
  const concepts = ids('food_concepts', db.food_concepts);
  const products = ids('products', db.products);
  const variants = ids('variants', db.variants);
  const sources = ids('data_sources', db.data_sources);
  const configs = ids('meal_configurations', db.meal_configurations);
  const groups = ids('configuration_groups', db.configuration_groups);
  const options = ids('configuration_options', db.configuration_options);
  ids('nutrition_profiles', db.nutrition_profiles);
  ids('prices', db.prices);
  ids('outlet_closures', db.outlet_closures);
  ids('grocery_products', db.grocery_products);

  const fk = (table: string, field: string, value: string | null, set: Set<string>, nullable = false) => {
    if (value == null) { if (!nullable) err(`${table}.${field} is null`); return; }
    if (!set.has(value)) err(`${table}.${field} → missing ${value}`);
  };
  const src = (table: string, v: string) => fk(table, 'sourceId', v, sources);

  for (const b of db.brands) fk('brands', 'operatorId', b.operatorId, operators, true);
  for (const o of db.outlets) { fk('outlets', 'brandId', o.brandId, brands); fk('outlets', 'venueId', o.venueId, venues, true); src('outlets', o.sourceId); }
  for (const l of db.outlet_licences) { fk('outlet_licences', 'outletId', l.outletId, outlets); src('outlet_licences', l.sourceId); }
  for (const p of db.products) { fk('products', 'brandId', p.brandId, brands); fk('products', 'conceptId', p.conceptId, concepts, true); }
  for (const v of db.variants) fk('variants', 'productId', v.productId, products);
  for (const m of db.outlet_menu_overrides) { fk('outlet_menu_overrides', 'outletId', m.outletId, outlets); fk('outlet_menu_overrides', 'productId', m.productId, products); }
  for (const c of db.meal_configurations) fk('meal_configurations', 'brandId', c.brandId, brands);
  for (const g of db.configuration_groups) {
    fk('configuration_groups', 'configurationId', g.configurationId, configs);
    if (g.selectionMin > g.selectionMax) err(`configuration_groups ${g.id}: min > max`);
  }
  for (const o of db.configuration_options) {
    fk('configuration_options', 'groupId', o.groupId, groups);
    fk('configuration_options', 'productId', o.productId, products);
    fk('configuration_options', 'variantId', o.variantId, variants, true);
  }

  const subjectSet = { product: products, variant: variants, concept: concepts, configuration: configs, option: options } as const;
  for (const n of db.nutrition_profiles) {
    fk('nutrition_profiles', 'subjectId', n.subjectId, subjectSet[n.subjectType]);
    src('nutrition_profiles', n.sourceId);
    for (const k of ['caloriesKcal', 'proteinG', 'carbohydrateG', 'fatG', 'fibreG', 'sugarG', 'sodiumMg', 'saturatedFatG'] as const) {
      const v = n[k];
      if (v !== null && (typeof v !== 'number' || !Number.isFinite(v) || v < 0)) err(`nutrition_profiles ${n.id}.${k} invalid: ${v}`);
    }
    // Estimates may never claim verified status.
    if (n.status === 'verified' && !['official_published', 'operator_declared'].includes(n.basis)) err(`nutrition_profiles ${n.id}: verified status with basis ${n.basis}`);
    // Plausibility: stated kcal vs macro-derived kcal within ±35% or 150 kcal.
    if (n.caloriesKcal != null && n.proteinG != null && n.carbohydrateG != null && n.fatG != null) {
      const derived = 4 * n.proteinG + 4 * n.carbohydrateG + 9 * n.fatG;
      const diff = Math.abs(derived - n.caloriesKcal);
      if (diff > 150 && diff > 0.35 * n.caloriesKcal) err(`nutrition_profiles ${n.id}: kcal ${n.caloriesKcal} vs macros ${derived}`);
    }
  }
  for (const p of db.prices) {
    fk('prices', 'subjectId', p.subjectId, subjectSet[p.subjectType]);
    fk('prices', 'outletId', p.outletId, outlets, true);
    src('prices', p.sourceId);
    if (p.amount !== null && (!(p.amount >= 0) || p.amount > 500)) err(`prices ${p.id}: implausible amount ${p.amount}`);
  }
  for (const t of db.product_diet_tags) { fk('product_diet_tags', 'productId', t.productId, products); src('product_diet_tags', t.sourceId); }
  for (const a of db.allergen_statements) {
    fk('allergen_statements', 'productId', a.productId, products);
    src('allergen_statements', a.sourceId);
    if (!(ALLERGENS as readonly string[]).includes(a.allergen)) err(`allergen_statements: unknown allergen ${a.allergen}`);
    // Policy: inference can only ever say "likely contains".
    if (a.basis === 'dish_inference' && a.status !== 'likely_contains') err(`allergen_statements ${a.productId}/${a.allergen}: inference must be likely_contains, got ${a.status}`);
  }
  for (const c of db.dietary_claims) {
    fk('dietary_claims', 'productId', c.productId, products);
    src('dietary_claims', c.sourceId);
    if (!['official_published', 'operator_declared'].includes(c.basis)) err(`dietary_claims ${c.productId}: claims need a declaration`);
  }
  for (const p of db.product_preparation) {
    fk('product_preparation', 'productId', p.productId, products);
    if (!(COOKING_METHODS as readonly string[]).includes(p.method)) err(`product_preparation: unknown method ${p.method}`);
  }
  for (const a of db.product_attributes) fk('product_attributes', 'productId', a.productId, products);
  const hhmm = /^([01]\d|2[0-3]):[0-5]\d$/;
  for (const h of db.outlet_hours) {
    fk('outlet_hours', 'outletId', h.outletId, outlets);
    if (!hhmm.test(h.opens) || !hhmm.test(h.closes)) err(`outlet_hours ${h.outletId}: bad time ${h.opens}-${h.closes}`);
  }
  for (const c of db.outlet_closures) {
    if (!c.outletId && !c.venueId) err(`outlet_closures ${c.id}: needs outletId or venueId`);
    fk('outlet_closures', 'outletId', c.outletId, outlets, true);
    fk('outlet_closures', 'venueId', c.venueId, venues, true);
    if (c.endDate < c.startDate) err(`outlet_closures ${c.id}: ends before it starts`);
  }
  for (const g of db.grocery_products) fk('grocery_products', 'brandId', g.brandId, brands);
  return errors;
}
