import { describe, expect, it } from 'vitest';
import { applyFilters } from '@/lib/search/filter';
import { DEFAULT_FILTERS } from '@/lib/search/types';
import { index } from './helpers';

const row = (id: string) => index().rows.find((r) => r.id === id)!;
const run = (patch: Partial<typeof DEFAULT_FILTERS>) =>
  applyFilters(index(), { ...DEFAULT_FILTERS, ...patch }, { user: null, now: new Date('2026-11-16T04:00:00Z') });

describe("McDonald's meal sets", () => {
  it('builds 13 Extra Value Meals with 6 combinations each', () => {
    const sets = index().rows.filter((r) => r.kind === 'set' && r.brandId === 'mcd');
    expect(sets).toHaveLength(13);
    for (const s of sets) expect(s.combos).toHaveLength(6);
  });

  it('Big Mac meal default = Big Mac + Fries (M) + Coke Zero (S), official values', () => {
    const r = row('mcd_evm_big_mac');
    const d = r.combos![0];
    expect(d.isDefault).toBe(true);
    expect(d.summary).toBe('French Fries (M) + Coca-Cola Zero Sugar (S)');
    expect([d.kcal, d.protein, d.carbs, d.fat]).toEqual([558 + 384 + 0, 28 + 5, 48 + 46, 28 + 20]);
    expect(d.complete).toBe(true);
    expect(d.price).toBe(9.95);
    expect(r.trust).toBe('verified');
    expect(r.priceNote).toBe('unconfirmed');
  });

  it('corn swap is free (official); other swaps have unknown price', () => {
    const combos = row('mcd_evm_big_mac').combos!;
    const corn = combos.find((c) => c.summary === 'Corn Cup + Coca-Cola Zero Sugar (S)')!;
    expect(corn.price).toBe(9.95);
    expect(corn.kcal).toBe(558 + 100);
    expect(combos.find((c) => c.summary.startsWith('French Fries (L)'))!.price).toBeNull();
  });

  it('shows the default meal when it fits, the best-fitting combination when it does not', () => {
    const fitsDefault = run({ q: 'big mac meal', kcalMax: 1000 }).find((r) => r.row.id === 'mcd_evm_big_mac')!;
    expect(fitsDefault.combo!.isDefault).toBe(true);
    const needsSwap = run({ q: 'big mac meal', kcalMax: 700 }).find((r) => r.row.id === 'mcd_evm_big_mac')!;
    expect(needsSwap.combo!.summary).toBe('Corn Cup + Coca-Cola Zero Sugar (S)');
    expect(needsSwap.view.kcal).toBe(658);
    expect(run({ q: 'big mac meal', kcalMax: 600 }).some((r) => r.row.id === 'mcd_evm_big_mac')).toBe(false);
  });

  it('a price limit skips combinations whose price is unknown', () => {
    const r = run({ q: 'big mac meal', priceMax: 10, kcalMin: 1100 });
    // Only Large fries combos reach 1,100 kcal, and their upsize price is unknown.
    expect(r.some((x) => x.row.id === 'mcd_evm_big_mac')).toBe(false);
  });

  it('meals rank by the shown combination', () => {
    const r = run({ q: 'mcdonalds meal', kcalMax: 700, sort: 'kcal' });
    const kcals = r.map((x) => x.view.kcal!);
    expect([...kcals].sort((a, b) => a - b)).toEqual(kcals);
  });
});

describe('incomplete totals', () => {
  it('can satisfy a minimum but never a maximum', async () => {
    const { pickCombo } = await import('@/lib/search/filter');
    const fake = { kind: 'set', combos: [{ summary: 'x', isDefault: true, kcal: 300, protein: 30, carbs: 10, fat: 5, complete: false, price: 5, ppd: 6 }] } as never;
    expect(pickCombo(fake, { ...DEFAULT_FILTERS, proteinMin: 25 })).not.toBeNull();
    expect(pickCombo(fake, { ...DEFAULT_FILTERS, kcalMax: 900 })).toBeNull();
  });
});
