// One-off, re-runnable migration: legacy src/lib/*.ts arrays → /data tables.
//
//   npx tsx scripts/migrate-v1.ts
//
// Non-destructive: reads the legacy files, never edits them. Re-running
// regenerates the derived tables from scratch, so run it BEFORE any hand or
// agent edits land in /data — after that, /data is the source of truth and
// this script should not be re-run (see data/README.md).
//
// What it derives beyond a 1:1 copy:
//   - venues: from Premises.locationContext (one record per centre/mall)
//   - food concepts: dishes with the same name AND identical macros at 2+
//     brands share one concept-level nutrition profile ("typical for this dish")
//   - nutrition basis: verified → official_published; shared macros under
//     different names → shared_template; otherwise stall_estimate
//   - cooking style, spice, likely allergens: name rules in src/db/rules.ts
//   - diet tags: legacy compatibleWith → 'yes'; pork/meat names → explicit 'no'

import { BRANDS as RAW_BRANDS } from '../src/lib/brands';
import { PREMISES as RAW_PREMISES } from '../src/lib/premises';
import { MENU_ITEMS as RAW_MENU_ITEMS } from '../src/lib/menuItems';
import { OPERATORS as RAW_OPERATORS } from '../src/lib/operators';
import { GROCERY_PRODUCTS as RAW_GROCERY } from '../src/lib/groceryProducts';
import type * as L from '../src/types/db';
import type * as S from '../src/db/schema';
import { writeTable } from '../src/db/load';
import {
  inferAllergens, inferCooking, inferSpice, inferKind,
  PORK_NAME_PATTERN, MEAT_SEAFOOD_NAME_PATTERN,
} from '../src/db/rules';

const BRANDS = RAW_BRANDS as unknown as L.Brand[];
const PREMISES = RAW_PREMISES as unknown as L.Premises[];
const ITEMS = RAW_MENU_ITEMS as unknown as L.MenuItem[];
const OPERATORS = RAW_OPERATORS as unknown as L.Operator[];
const GROCERY = RAW_GROCERY as unknown as L.GroceryProduct[];

const LEGACY = 'legacy_v1';
const RULES = 'name_rule_v1';
const SFA = 'sfa_licensed_eating_establishments';

const slug = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 60);
const norm = (s: string) => s.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const macroKey = (m: L.MenuItem) => [m.calories, m.protein, m.carbs, m.fat].join('/');

// ── Sources ──────────────────────────────────────────────────────────────────
const dataSources: S.DataSource[] = [
  { id: LEGACY, name: 'PlateScreen legacy dataset (v1)', type: 'legacy_import', reference: 'src/lib/{brands,premises,menuItems,operators,groceryProducts}.ts @ 9dd3a9b', retrievedAt: '2026-11-16', licensingNotes: 'Compiled by PlateScreen research sessions; per-batch provenance in reference/research-sessions/.' },
  { id: RULES, name: 'PlateScreen name-based inference rules (v1)', type: 'rule_inference', reference: 'src/db/rules.ts', retrievedAt: '2026-11-16', licensingNotes: null },
  { id: SFA, name: 'NEA/SFA Licensed Eating Establishments', type: 'government_open_data', reference: 'https://data.gov.sg/datasets/d_227473e811b09731e64725f140b77697/view', retrievedAt: null, licensingNotes: 'Singapore Open Data Licence' },
  { id: 'nea_hawker_closures', name: 'NEA Dates of Hawker Centres Closure', type: 'government_open_data', reference: 'https://data.gov.sg/datasets/d_bda4baa634dd1cc7a6c7cad5f19e2d68/view', retrievedAt: null, licensingNotes: 'Singapore Open Data Licence — free for personal or commercial use' },
];

// ── Brands / operators ──────────────────────────────────────────────────────
const brands: S.Brand[] = BRANDS.map((b) => ({
  id: b.id, name: b.name, emoji: b.emoji, type: b.type, cuisine: b.cuisine,
  aliases: b.aliases ?? [], dietTags: b.dietTags ?? [], priceRange: b.priceRange,
  platforms: b.platforms ?? [], operatorId: b.operatorId ?? null,
}));
const operators: S.Operator[] = OPERATORS.map((o) => ({ id: o.id, name: o.name, type: o.type }));

// ── Venues + outlets ─────────────────────────────────────────────────────────
const venueGroups = new Map<string, L.Premises[]>();
for (const p of PREMISES) {
  if (!p.locationContext) continue;
  const list = venueGroups.get(p.locationContext) ?? [];
  list.push(p);
  venueGroups.set(p.locationContext, list);
}
const venueIdByName = new Map<string, string>();
const venues: S.Venue[] = [];
for (const [name, list] of [...venueGroups.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  let id = 'v_' + slug(name);
  let n = 2;
  while (venues.some((v) => v.id === id)) id = `v_${slug(name)}_${n++}`;
  venueIdByName.set(name, id);
  const counts = new Map<string, number>();
  for (const p of list) counts.set(p.locationType, (counts.get(p.locationType) ?? 0) + 1);
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const type: S.Venue['type'] = top === 'hawker_centre' ? 'hawker_centre' : top === 'food_court' ? 'food_court' : top === 'mall' ? 'mall' : 'other';
  const geo = list.filter((p) => p.lat != null && p.lng != null);
  venues.push({
    id, name, type, neaName: null,
    lat: geo.length ? +(geo.reduce((s, p) => s + (p.lat as number), 0) / geo.length).toFixed(6) : null,
    lng: geo.length ? +(geo.reduce((s, p) => s + (p.lng as number), 0) / geo.length).toFixed(6) : null,
  });
}

const outlets: S.Outlet[] = [];
const outletLicences: S.OutletLicence[] = [];
for (const p of PREMISES) {
  outlets.push({
    id: p.id, brandId: p.brandId,
    venueId: p.locationContext ? venueIdByName.get(p.locationContext) ?? null : null,
    label: p.label, locationType: p.locationType as S.Outlet['locationType'],
    address: p.address ?? null, postal: p.postal ?? null,
    lat: p.lat ?? null, lng: p.lng ?? null,
    operatingStatus: 'unknown', sourceId: LEGACY, legacySource: p.source ?? null,
  });
  if (p.sfa) {
    outletLicences.push({
      outletId: p.id,
      licenceNumber: p.sfa.licenceNumber ?? null,
      licenseeName: p.sfa.licenseeName ?? null,
      premisesAddress: p.sfa.premisesAddress ?? null,
      grade: p.sfa.grade ?? null,
      demeritPoints: p.sfa.demeritPoints ?? null,
      licenceSuspended: p.sfa.licenceSuspended ?? null,
      sourceId: SFA,
    });
  }
}

// ── Concepts + nutrition ─────────────────────────────────────────────────────
// A concept = same normalized name + identical macros at 2+ distinct brands.
const byNameMacro = new Map<string, L.MenuItem[]>();
const byMacro = new Map<string, L.MenuItem[]>();
for (const m of ITEMS) {
  if (m.confidence !== 'estimated') continue;
  const k = norm(m.name) + '|' + macroKey(m);
  (byNameMacro.get(k) ?? byNameMacro.set(k, []).get(k)!).push(m);
  const mk = macroKey(m);
  (byMacro.get(mk) ?? byMacro.set(mk, []).get(mk)!).push(m);
}
const foodConcepts: S.FoodConcept[] = [];
const conceptIdByItem = new Map<string, string>();
const nutritionProfiles: S.NutritionProfile[] = [];

const profile = (subjectType: S.NutritionProfile['subjectType'], subjectId: string, m: L.MenuItem, status: S.NutritionStatus, basis: S.NutritionBasis, assumptions: string[]): S.NutritionProfile => ({
  id: `np_${subjectId}`,
  subjectType, subjectId,
  servingQuantity: 1, servingUnit: 'serving',
  caloriesKcal: m.calories ?? null, proteinG: m.protein ?? null, carbohydrateG: m.carbs ?? null, fatG: m.fat ?? null,
  fibreG: null, sugarG: null, sodiumMg: null, saturatedFatG: null,
  status, basis, confidence: null, assumptions, sourceId: LEGACY, validFrom: null, validTo: null,
});

for (const [, group] of [...byNameMacro.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  const brandIds = new Set(group.map((m) => m.brandId));
  if (brandIds.size < 2) continue;
  // Most common display spelling becomes the concept name.
  const names = new Map<string, number>();
  for (const m of group) names.set(m.name, (names.get(m.name) ?? 0) + 1);
  const name = [...names.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
  let id = 'c_' + slug(name);
  let n = 2;
  while (foodConcepts.some((c) => c.id === id)) id = `c_${slug(name)}_${n++}`;
  foodConcepts.push({ id, name, category: group[0].category, note: `Shared standard estimate used at ${brandIds.size} brands` });
  nutritionProfiles.push(profile('concept', id, group[0], 'estimated', 'concept_reference', [
    'Standard estimate for this dish type in Singapore',
    'Not measured at any specific stall',
  ]));
  for (const m of group) conceptIdByItem.set(m.id, id);
}

const products: S.Product[] = [];
const variants: S.Variant[] = [];
const prices: S.Price[] = [];
const dietTags: S.ProductDietTag[] = [];
const allergenStatements: S.AllergenStatement[] = [];
const preparation: S.ProductPreparation[] = [];
const attributes: S.ProductAttributes[] = [];
const LEGACY_UNVERIFIED_TAGS = new Set(['gluten_free', 'dairy_free', 'nut_free', 'lactose_free']);

for (const m of ITEMS) {
  const conceptId = conceptIdByItem.get(m.id) ?? null;
  products.push({
    id: m.id, brandId: m.brandId, conceptId, name: m.name, emoji: m.emoji, category: m.category,
    kind: inferKind(m.name, m.category), isPopular: !!m.isPopular, activeStatus: 'active',
  });
  variants.push({ id: `${m.id}--default`, productId: m.id, name: 'Regular', portionQuantity: 1, portionUnit: 'serving', isDefault: true });

  if (!conceptId) {
    if (m.confidence === 'verified') {
      nutritionProfiles.push(profile('product', m.id, m, 'verified', 'official_published', ['Marked verified in the legacy dataset; original document not recorded per item']));
    } else if (m.confidence === 'community') {
      nutritionProfiles.push(profile('product', m.id, m, 'community', 'community', []));
    } else {
      const shared = (byMacro.get(macroKey(m))?.length ?? 0) > 1;
      nutritionProfiles.push(profile('product', m.id, m, 'estimated', shared ? 'shared_template' : 'stall_estimate',
        shared ? ['Same values are used for other dishes; treat as a rough estimate'] : []));
    }
  }

  prices.push({
    id: `pr_${m.id}`, subjectType: 'product', subjectId: m.id, outletId: null,
    kind: /\b(set|meal|combo|bundle)\b/i.test(m.name) ? 'set' : 'item',
    channel: 'in_store', amount: typeof m.price === 'number' ? m.price : null, currency: 'SGD',
    sourceId: LEGACY, validFrom: null, validTo: null, lastVerifiedAt: null,
  });

  const yes = new Set(m.compatibleWith ?? []);
  for (const t of yes) {
    dietTags.push({ productId: m.id, tag: t, value: 'yes', basis: LEGACY_UNVERIFIED_TAGS.has(t) ? 'legacy_v1_unverified' : 'legacy_v1', sourceId: LEGACY });
  }
  if (PORK_NAME_PATTERN.test(m.name)) {
    for (const t of ['halal', 'no_pork'] as const) if (!yes.has(t)) dietTags.push({ productId: m.id, tag: t, value: 'no', basis: 'name_rule', sourceId: RULES });
  }
  if (MEAT_SEAFOOD_NAME_PATTERN.test(m.name)) {
    for (const t of ['vegetarian', 'vegan'] as const) if (!yes.has(t)) dietTags.push({ productId: m.id, tag: t, value: 'no', basis: 'name_rule', sourceId: RULES });
  }

  for (const a of inferAllergens(m.name)) {
    allergenStatements.push({ productId: m.id, allergen: a.allergen, status: 'likely_contains', basis: 'dish_inference', reason: a.reason, sourceId: RULES, validFrom: null, validTo: null });
  }
  inferCooking(m.name).forEach((method, i) => preparation.push({ productId: m.id, method, isPrimary: i === 0, basis: 'name_rule', sourceId: RULES }));
  const spice = inferSpice(m.name);
  if (spice != null) attributes.push({ productId: m.id, spiceLevel: spice, served: null, basis: 'name_rule', sourceId: RULES });
}

const grocery: S.GroceryProduct[] = GROCERY.map((g) => ({
  id: g.id, brandId: g.brandId, name: g.name, emoji: g.emoji, category: g.category,
  packageSize: g.packageSize, packageUnit: g.packageUnit, packagePrice: g.packagePrice ?? null,
  caloriesPer100: g.caloriesPer100 ?? null, proteinPer100: g.proteinPer100 ?? null,
  carbsPer100: g.carbsPer100 ?? null, fatPer100: g.fatPer100 ?? null,
  status: g.confidence === 'verified' ? 'verified' : g.confidence === 'community' ? 'community' : 'estimated',
  sourceId: LEGACY,
}));

const out: Partial<S.Database> = {
  data_sources: dataSources, brands, operators, venues, outlets, outlet_licences: outletLicences,
  food_concepts: foodConcepts, products, variants, outlet_menu_overrides: [],
  meal_configurations: [], configuration_groups: [], configuration_options: [],
  nutrition_profiles: nutritionProfiles, prices, product_diet_tags: dietTags,
  allergen_statements: allergenStatements, dietary_claims: [],
  product_preparation: preparation, product_attributes: attributes,
  outlet_hours: [], outlet_closures: [], grocery_products: grocery,
};
for (const [t, rows] of Object.entries(out)) writeTable(t as keyof S.Database, rows as unknown[]);

const basisCount = nutritionProfiles.reduce<Record<string, number>>((o, p) => ((o[p.basis] = (o[p.basis] ?? 0) + 1), o), {});
console.log(JSON.stringify({
  brands: brands.length, venues: venues.length, outlets: outlets.length, licences: outletLicences.length,
  products: products.length, concepts: foodConcepts.length, productsOnConcepts: conceptIdByItem.size,
  nutritionProfiles: nutritionProfiles.length, basisCount, prices: prices.length,
  dietTags: dietTags.length, allergenStatements: allergenStatements.length,
  productsWithCooking: new Set(preparation.map((p) => p.productId)).size,
  productsWithSpice: attributes.length, grocery: grocery.length,
}, null, 2));
