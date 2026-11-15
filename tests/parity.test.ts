// The v2 database + engine must reproduce what the v1 screener showed.
import { describe, expect, it } from 'vitest';
import * as legacy from '@/lib/screener';
import { applyFilters } from '@/lib/search/filter';
import { DEFAULT_FILTERS, type Filters } from '@/lib/search/types';
import { index } from './helpers';

const legacyRows = legacy.buildScreenerRows();
const ids = (rows: { id: string }[]) => new Set(rows.map((r) => r.id));
const run = (patch: Partial<Filters>) => ids(applyFilters(index(), { ...DEFAULT_FILTERS, ...patch }).map((r) => r.row));
const runLegacy = (patch: Partial<legacy.ScreenerFilters>) => ids(legacy.applyFilters(legacyRows, { ...legacy.DEFAULT_FILTERS, ...patch }));

describe('v1 → v2 parity', () => {
  it('every v1 dish exists with identical name, stall, price and macros', () => {
    const byId = new Map(index().rows.map((r) => [r.id, r]));
    expect(byId.size).toBe(legacyRows.length);
    for (const l of legacyRows) {
      const r = byId.get(l.id)!;
      expect(r, l.id).toBeDefined();
      expect([r.name, r.brandName, r.price, r.kcal, r.protein, r.carbs, r.fat]).toEqual([l.name, l.restaurantName, l.price, l.calories, l.protein, l.carbs, l.fat]);
      expect(r.ppd).toBe(l.ppd);
      const expectedTrust = l.confidence === 'verified' ? 'verified' : l.confidence === 'community' ? 'community' : r.trust;
      expect(r.trust).toBe(expectedTrust);
      if (l.confidence === 'estimated') expect(['typical', 'estimate']).toContain(r.trust);
    }
  });

  const cases: [string, Partial<legacy.ScreenerFilters>, Partial<Filters>][] = [
    ['PRD example 650 kcal / 40 g / $12', { calMax: 650, protMin: 40, priceMax: 12 }, { kcalMax: 650, proteinMin: 40, priceMax: 12 }],
    ['cut preset', { calMax: 500, protMin: 25 }, { kcalMax: 500, proteinMin: 25 }],
    ['bulk preset', { calMin: 600, protMin: 35 }, { kcalMin: 600, proteinMin: 35 }],
    ['keto', { carbMax: 10 }, { carbsMax: 10 }],
    ['budget', { priceMax: 5.5 }, { priceMax: 5.5 }],
    ['halal', { tags: ['halal'] }, { diet: ['halal'] }],
    ['no pork', { tags: ['no_pork'] }, { diet: ['no_pork'] }],
    ['vegetarian', { tags: ['vegetarian'] }, { diet: ['vegetarian'] }],
    ['vegan', { tags: ['vegan'] }, { diet: ['vegan'] }],
    ['halal + 30 g', { tags: ['halal'], protMin: 30 }, { diet: ['halal'], proteinMin: 30 }],
    ['verified only', { verifiedOnly: true }, { verifiedOnly: true }],
    ['restaurants', { outletTypes: ['restaurant'] }, { outletGroups: ['restaurant'] }],
    ['supermarket', { outletTypes: ['supermarket'] }, { outletGroups: ['supermarket'] }],
  ];
  for (const [name, l, n] of cases) {
    it(`same results: ${name}`, () => {
      const a = runLegacy(l); const b = run(n);
      expect([...b].filter((x) => !a.has(x))).toEqual([]);
      expect([...a].filter((x) => !b.has(x))).toEqual([]);
    });
  }

  it('text search finds at least everything v1 found', () => {
    for (const q of ['mcdonalds big mac', 'chicken rice', 'laksa', 'tian tian', 'kopi']) {
      const a = runLegacy({ q }); const b = run({ q });
      expect([...a].filter((x) => !b.has(x)), q).toEqual([]);
    }
  });
});
