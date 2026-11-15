import { describe, expect, it } from 'vitest';
import { validateDatabase } from '@/db/validate';
import { db } from './helpers';

describe('/data integrity', () => {
  it('has no integrity errors', () => {
    expect(validateDatabase(db())).toEqual([]);
  });

  it('kept every legacy record', () => {
    const d = db();
    expect(d.brands).toHaveLength(1728);
    expect(d.outlets).toHaveLength(4673);
    expect(d.products).toHaveLength(2704);
    expect(d.grocery_products).toHaveLength(19);
  });

  it('every product has exactly one current brand-wide in-store price', () => {
    const d = db();
    const counts = new Map<string, number>();
    for (const p of d.prices) if (p.subjectType === 'product' && p.validTo == null && p.outletId == null && p.channel === 'in_store') counts.set(p.subjectId, (counts.get(p.subjectId) ?? 0) + 1);
    for (const prod of d.products) expect(counts.get(prod.id), prod.id).toBe(1);
  });

  it('only declarations can make claims or confirm allergens', () => {
    const d = db();
    expect(d.allergen_statements.filter((a) => a.basis === 'dish_inference' && a.status !== 'likely_contains')).toEqual([]);
    expect(d.dietary_claims.filter((c) => !['official_published', 'operator_declared'].includes(c.basis))).toEqual([]);
  });

  it('never marks an estimate as verified', () => {
    expect(db().nutrition_profiles.filter((n) => n.status === 'verified' && n.basis !== 'official_published' && n.basis !== 'operator_declared')).toEqual([]);
  });
});
