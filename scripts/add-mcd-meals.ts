// Adds McDonald's Singapore sides, drinks and Extra Value Meals (EVMs) as
// meal configurations. Re-runnable: removes what it added before, then adds.
//
//   npx tsx scripts/add-mcd-meals.ts
//
// Sources (retrieved 2026-11-16):
//   - Nutrition: McDonald's Singapore product pages (official).
//   - Coca-Cola Zero Sugar: no McDonald's SG page; Coca-Cola's own nutrition
//     pages give 0–0.3 kcal per 100 ml in every market checked.
//   - Meal contents: McDonald's SG EVM page — burger + French Fries (M) +
//     Coca-Cola Zero Sugar; "Price may vary with choice of drink or side".
//   - Corn swap at no extra charge: McDonald's SG press release (2019).
//   - Set prices: NOT published by McDonald's. Ming chose (2026-11-16) to
//     store the "from" prices that several menu-listing sites agree on,
//     marked unconfirmed (lastVerifiedAt null, source type web_research).
//     Only prices identical across ≥2 sites are used.

import { loadDatabase, writeTable } from '../src/db/load';
import type * as S from '../src/db/schema';

const TAG = 'mcd_meals_v1';
const SRC_NUTRITION = 'mcd_sg_website_2026_11';
const SRC_COKE = 'coca_cola_brand_nutrition';
const SRC_EVM = 'mcd_sg_evm_page';
const SRC_CORN_SWAP = 'mcd_sg_press_2019_corn_swap';
const SRC_PRICES = 'sg_menu_listing_sites_2025';
const TODAY = '2026-11-16';

const sources: S.DataSource[] = [
  { id: SRC_NUTRITION, name: "McDonald's Singapore product nutrition pages", type: 'official_published', reference: 'https://www.mcdonalds.com.sg/food-menu/french-fries-medium (and sibling item pages)', retrievedAt: TODAY, licensingNotes: 'Facts cited with attribution; values are McDonald\'s published figures' },
  { id: SRC_COKE, name: 'Coca-Cola brand nutrition pages (Coca-Cola Zero Sugar)', type: 'official_published', reference: 'https://www.coca-cola.com/kh/en/brands/coca-cola ; https://www.coca-cola.co.uk/brands/coca-cola-zero-sugar', retrievedAt: TODAY, licensingNotes: null },
  { id: SRC_EVM, name: "McDonald's Singapore Extra Value Meals page", type: 'official_published', reference: 'https://mcdonalds.com.sg/extravaluemeals', retrievedAt: TODAY, licensingNotes: null },
  { id: SRC_CORN_SWAP, name: "McDonald's Singapore press release, 28 Feb 2019 (Corn Cup swaps at no extra charge)", type: 'official_published', reference: 'https://www.mcdonalds.com.sg/mcdonalds-singapore-and-coca-cola-singapore-partner-to-bring-lower-sugar-beverages-to-singaporeans-nationwide', retrievedAt: TODAY, licensingNotes: null },
  { id: SRC_PRICES, name: 'Singapore menu-listing sites (unconfirmed EVM "from" prices)', type: 'web_research', reference: 'sgpmenus.com/mcdonalds-menu-singapore ; sgmenuprice.net/mcdonalds-menu ; sgmenuz.com/mcdonalds-menu ; menussingapore.com/mcdonalds-menu', retrievedAt: TODAY, licensingNotes: 'Third-party listings, undated. Only prices identical on 2+ sites used. Replace with menu-board or app prices when checked.' },
];

// New à la carte components (official McDonald's SG values unless noted).
interface NewProduct { id: string; name: string; emoji: string; kind: S.Product['kind']; category: string; n: [number, number, number, number]; sat?: number; fibre?: number; sodium?: number; source: string; status: S.NutritionStatus; basis: S.NutritionBasis; assumptions: string[] }
const products: NewProduct[] = [
  { id: 'mcd_fries_s', name: 'French Fries (S)', emoji: '🍟', kind: 'side', category: 'Sides', n: [315, 4, 37, 17], sat: 5, fibre: 4, sodium: 193, source: SRC_NUTRITION, status: 'verified', basis: 'official_published', assumptions: [] },
  { id: 'mcd_fries_m', name: 'French Fries (M)', emoji: '🍟', kind: 'side', category: 'Sides', n: [384, 5, 46, 20], sat: 6, fibre: 5, sodium: 236, source: SRC_NUTRITION, status: 'verified', basis: 'official_published', assumptions: [] },
  { id: 'mcd_fries_l', name: 'French Fries (L)', emoji: '🍟', kind: 'side', category: 'Sides', n: [512, 6, 61, 27], sat: 8, fibre: 6, sodium: 314, source: SRC_NUTRITION, status: 'verified', basis: 'official_published', assumptions: [] },
  { id: 'mcd_coke_less_sugar_s', name: 'Coca-Cola Original Taste Less Sugar (S)', emoji: '🥤', kind: 'drink', category: 'Beverages', n: [109, 0, 27, 0], sat: 0, fibre: 0, sodium: 7, source: SRC_NUTRITION, status: 'verified', basis: 'official_published', assumptions: [] },
  { id: 'mcd_coke_zero_s', name: 'Coca-Cola Zero Sugar (S)', emoji: '🥤', kind: 'drink', category: 'Beverages', n: [0, 0, 0, 0], source: SRC_COKE, status: 'verified', basis: 'official_published', assumptions: ['McDonald\'s Singapore doesn\'t publish a page for this drink', 'Coca-Cola publishes 0–0.3 kcal per 100 ml, so a small cup is under 2 kcal'] },
];

// Extra Value Meals: main product id → unconfirmed "from" set price (identical on 2+ listing sites).
const EVMS: [string, string, number][] = [
  ['mcd_big_mac', 'Big Mac', 9.95],
  ['mcd_mcspicy', 'McSpicy', 9.45],
  ['mcd_double_mcspicy', 'Double McSpicy', 10.65],
  ['mcd_quarter_pounder', 'Quarter Pounder with Cheese', 9.95],
  ['mcd_double_quarter_pounder', 'Double Quarter Pounder with Cheese', 11.6],
  ['mcd_buttermilk_crispy', 'Buttermilk Crispy Chicken', 11.05],
  ['mcd_mcchicken', 'McChicken', 7.15],
  ['mcd_filet_o_fish', 'Filet-O-Fish', 7.45],
  ['mcd_double_filet', 'Double Filet-O-Fish', 10.0],
  ['mcd_nuggets_6pc', 'Chicken McNuggets (6pc)', 8.4],
  ['mcd_nuggets_9pc', 'Chicken McNuggets (9pc)', 9.7],
  ['mcd_double_cheeseburger', 'Double Cheeseburger', 7.95],
  ['mcd_mcwings_4pc', 'McWings (4pc)', 8.15],
];

const db = loadDatabase();
const ours = (id: string) => id.startsWith('mcd_evm_') || products.some((p) => p.id === id);
const ourSources = new Set(sources.map((s) => s.id));

// 1 · Remove anything this script added before.
db.data_sources = db.data_sources.filter((s) => !ourSources.has(s.id));
db.products = db.products.filter((p) => !products.some((n) => n.id === p.id));
db.variants = db.variants.filter((v) => !products.some((n) => `${n.id}--default` === v.id));
db.nutrition_profiles = db.nutrition_profiles.filter((n) => !(n.subjectType === 'product' && products.some((p) => p.id === n.subjectId)));
db.meal_configurations = db.meal_configurations.filter((c) => !ours(c.id));
db.configuration_groups = db.configuration_groups.filter((g) => !ours(g.configurationId));
db.configuration_options = db.configuration_options.filter((o) => !o.id.startsWith('mcd_evm_'));
db.prices = db.prices.filter((p) => !(p.sourceId === SRC_PRICES || p.sourceId === SRC_CORN_SWAP || (p.subjectType === 'product' && products.some((n) => n.id === p.subjectId))));
db.product_preparation = db.product_preparation.filter((p) => !products.some((n) => n.id === p.productId));

// 2 · Sources, products, variants, nutrition.
db.data_sources.push(...sources);
for (const p of products) {
  db.products.push({ id: p.id, brandId: 'mcd', conceptId: null, name: p.name, emoji: p.emoji, category: p.category, kind: p.kind, isPopular: false, activeStatus: 'active' });
  db.variants.push({ id: `${p.id}--default`, productId: p.id, name: 'Regular', portionQuantity: 1, portionUnit: 'serving', isDefault: true });
  db.nutrition_profiles.push({
    id: `np_${p.id}`, subjectType: 'product', subjectId: p.id, servingQuantity: 1, servingUnit: 'serving',
    caloriesKcal: p.n[0], proteinG: p.n[1], carbohydrateG: p.n[2], fatG: p.n[3],
    fibreG: p.fibre ?? null, sugarG: null, sodiumMg: p.sodium ?? null, saturatedFatG: p.sat ?? null,
    status: p.status, basis: p.basis, confidence: null, assumptions: p.assumptions, sourceId: p.source, validFrom: TODAY, validTo: null,
  });
  if (p.kind === 'side' && /fries/i.test(p.name)) db.product_preparation.push({ productId: p.id, method: 'deep_fried', isPrimary: true, basis: 'operator_declared', sourceId: SRC_NUTRITION });
}

// 3 · Meal configurations.
const main = new Map(db.products.map((p) => [p.id, p]));
for (const [mainId, label, price] of EVMS) {
  if (!main.has(mainId)) throw new Error(`missing main product ${mainId}`);
  const cfg = `mcd_evm_${mainId.replace(/^mcd_/, '')}`;
  db.meal_configurations.push({ id: cfg, brandId: 'mcd', name: `${label} Extra Value Meal`, type: 'set', officialProfileId: null, activeStatus: 'active' });
  db.configuration_groups.push(
    { id: `${cfg}__main`, configurationId: cfg, name: 'Main', selectionMin: 1, selectionMax: 1, displayOrder: 1 },
    { id: `${cfg}__side`, configurationId: cfg, name: 'Side', selectionMin: 1, selectionMax: 1, displayOrder: 2 },
    { id: `${cfg}__drink`, configurationId: cfg, name: 'Drink', selectionMin: 1, selectionMax: 1, displayOrder: 3 },
  );
  const opt = (id: string, group: string, productId: string, isDefault: boolean) =>
    db.configuration_options.push({ id: `${cfg}__${id}`, groupId: `${cfg}__${group}`, productId, variantId: null, quantity: 1, isDefault });
  opt('main', 'main', mainId, true);
  opt('fries_m', 'side', 'mcd_fries_m', true);
  opt('corn', 'side', 'mcd_corn', false);
  opt('fries_l', 'side', 'mcd_fries_l', false);
  opt('coke_zero_s', 'drink', 'mcd_coke_zero_s', true);
  opt('coke_less_sugar_s', 'drink', 'mcd_coke_less_sugar_s', false);

  db.prices.push({ id: `pr_${cfg}`, subjectType: 'configuration', subjectId: cfg, outletId: null, kind: 'set', channel: 'in_store', amount: price, currency: 'SGD', sourceId: SRC_PRICES, validFrom: null, validTo: null, lastVerifiedAt: null });
  // Corn Cup swap: no extra charge (official). Other swaps/upsizes: price unknown → no row.
  db.prices.push({ id: `pr_${cfg}__corn`, subjectType: 'option', subjectId: `${cfg}__corn`, outletId: null, kind: 'upgrade', channel: 'in_store', amount: 0, currency: 'SGD', sourceId: SRC_CORN_SWAP, validFrom: null, validTo: null, lastVerifiedAt: null });
}

for (const t of ['data_sources', 'products', 'variants', 'nutrition_profiles', 'meal_configurations', 'configuration_groups', 'configuration_options', 'prices', 'product_preparation'] as const) {
  writeTable(t, db[t] as unknown[]);
}
console.log(`${TAG}: ${products.length} components, ${EVMS.length} Extra Value Meals`);
