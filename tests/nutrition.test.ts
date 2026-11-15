import { describe, expect, it } from 'vitest';
import { combineNutrition, configurationNutrition, validateSelection } from '@/db/nutrition';
import type { Database, NutritionProfile } from '@/db/schema';

const prof = (id: string, kcal: number | null, p: number | null, c: number | null, f: number | null, status: NutritionProfile['status'] = 'verified'): NutritionProfile => ({
  id: `np_${id}`, subjectType: 'product', subjectId: id, servingQuantity: 1, servingUnit: 'serving',
  caloriesKcal: kcal, proteinG: p, carbohydrateG: c, fatG: f, fibreG: null, sugarG: null, sodiumMg: null, saturatedFatG: null,
  status, basis: status === 'verified' ? 'official_published' : 'stall_estimate', confidence: null, assumptions: [], sourceId: 't', validFrom: null, validTo: null,
});

// Fixture modelled on the PRD's Big Mac Meal. Big Mac values = PlateScreen's verified row;
// fries and drink deliberately have NO nutrition (they aren't in the database).
const fixture: Pick<Database, 'configuration_groups' | 'configuration_options' | 'nutrition_profiles' | 'products'> = {
  products: [
    { id: 'big_mac', brandId: 'mcd', conceptId: null, name: 'Big Mac', emoji: '', category: '', kind: 'dish', isPopular: false, activeStatus: 'active' },
    { id: 'fries_m', brandId: 'mcd', conceptId: null, name: 'Fries (M)', emoji: '', category: '', kind: 'side', isPopular: false, activeStatus: 'active' },
    { id: 'corn', brandId: 'mcd', conceptId: null, name: 'Corn Cup', emoji: '', category: '', kind: 'side', isPopular: false, activeStatus: 'active' },
    { id: 'drink_m', brandId: 'mcd', conceptId: null, name: 'Soft drink (M)', emoji: '', category: '', kind: 'drink', isPopular: false, activeStatus: 'active' },
  ],
  nutrition_profiles: [prof('big_mac', 558, 28, 48, 28), prof('corn', 100, 4, 18, 1)],
  configuration_groups: [
    { id: 'g_main', configurationId: 'bm_meal', name: 'Main', selectionMin: 1, selectionMax: 1, displayOrder: 1 },
    { id: 'g_side', configurationId: 'bm_meal', name: 'Side', selectionMin: 1, selectionMax: 1, displayOrder: 2 },
    { id: 'g_drink', configurationId: 'bm_meal', name: 'Drink', selectionMin: 1, selectionMax: 1, displayOrder: 3 },
  ],
  configuration_options: [
    { id: 'o_bm', groupId: 'g_main', productId: 'big_mac', variantId: null, quantity: 1, isDefault: true },
    { id: 'o_fries', groupId: 'g_side', productId: 'fries_m', variantId: null, quantity: 1, isDefault: true },
    { id: 'o_corn', groupId: 'g_side', productId: 'corn', variantId: null, quantity: 1, isDefault: false },
    { id: 'o_drink', groupId: 'g_drink', productId: 'drink_m', variantId: null, quantity: 1, isDefault: true },
  ],
};

describe('meal nutrition', () => {
  it('missing components make the total an incomplete lower bound, never zero-filled', () => {
    const r = configurationNutrition(fixture, ['o_bm', 'o_fries', 'o_drink']);
    expect(r.complete).toBe(false);
    expect(r.totals.caloriesKcal).toBe(558);
    expect(r.knownComponents).toBe(1);
    expect(r.totalComponents).toBe(3);
    expect(r.missing.sort()).toEqual(['drink_m', 'fries_m']);
  });

  it('substitution recomputes from the selected components', () => {
    const r = configurationNutrition(fixture, ['o_bm', 'o_corn', 'o_drink']);
    expect(r.totals).toEqual({ caloriesKcal: 658, proteinG: 32, carbohydrateG: 66, fatG: 29 });
    expect(r.knownComponents).toBe(2);
    expect(r.complete).toBe(false);
  });

  it('is complete only when every component has every macro', () => {
    const r = combineNutrition([{ productId: 'a', quantity: 2, profile: prof('a', 100, 10, 10, 2, 'estimated') }]);
    expect(r).toMatchObject({ complete: true, totals: { caloriesKcal: 200, proteinG: 20 }, lowestStatus: 'estimated' });
    const partial = combineNutrition([{ productId: 'b', quantity: 1, profile: prof('b', 100, null, 10, 2) }]);
    expect(partial.complete).toBe(false);
  });

  it('enforces group min/max', () => {
    expect(validateSelection(fixture, 'bm_meal', ['o_bm', 'o_fries', 'o_drink'])).toEqual([]);
    expect(validateSelection(fixture, 'bm_meal', ['o_bm', 'o_fries', 'o_corn', 'o_drink']).map((e) => e.groupId)).toEqual(['g_side']);
    expect(validateSelection(fixture, 'bm_meal', ['o_bm']).map((e) => e.groupId)).toEqual(['g_side', 'g_drink']);
  });
});
