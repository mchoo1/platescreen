import { describe, expect, it } from 'vitest';
import { applyFilters, allergenBlocks } from '@/lib/search/filter';
import { outletOpenState, sgtClock, combineOpenStates } from '@/lib/search/hours';
import { parseQuery } from '@/lib/search/parse';
import { DEFAULT_FILTERS, type OutletPoint, type SearchRow, type VenueInfo } from '@/lib/search/types';
import { index } from './helpers';

const NOW = new Date('2026-11-16T04:00:00Z'); // Mon 16 Nov 2026, 12:00 SGT

describe('plain-language search', () => {
  it('parses the PRD example sentence into filters', () => {
    const p = parseQuery('I have 650 calories left today, need at least 40g of protein, and have a $12 budget. What can I eat nearby?');
    expect(p.patch).toMatchObject({ kcalMax: 650, proteinMin: 40, priceMax: 12 });
    expect(p.text).toBe('');
    expect(p.nearMe).toBe(true);
  });
  it('picks up diet, allergens, cooking, spice and open now', () => {
    const p = parseQuery('halal not fried no peanuts not spicy steamed open now chicken rice');
    expect(p.patch).toMatchObject({ diet: ['halal'], notFried: true, excludeAllergens: ['peanut'], spice: 'mild', cooking: ['steamed'], openNow: true });
    expect(p.text).toBe('chicken rice');
  });
  it('leaves plain dish names as text', () => {
    expect(parseQuery('mcdonalds big mac').text).toBe('mcdonalds big mac');
  });
  it('the PRD example returns the 10 dishes that fit', () => {
    const r = applyFilters(index(), { ...DEFAULT_FILTERS, kcalMax: 650, proteinMin: 40, priceMax: 12 }, { user: null, now: NOW });
    expect(r).toHaveLength(10);
    expect(r[0].row.ppd! >= r[r.length - 1].row.ppd!).toBe(true);
  });
});

describe('allergen filtering never treats unknown as safe', () => {
  const row = (allergens: SearchRow['allergens']) => ({ allergens } as SearchRow);
  it('likely blocks, unknown passes unless "hide unknown" is on', () => {
    expect(allergenBlocks(row({ peanut: 'likely_contains' }), 'peanut', false)).toBe(true);
    expect(allergenBlocks(row({}), 'peanut', false)).toBe(false);
    expect(allergenBlocks(row({}), 'peanut', true)).toBe(true);
    expect(allergenBlocks(row({ peanut: 'not_listed' }), 'peanut', true)).toBe(false);
  });
  it('excluding peanut removes satay', () => {
    const r = applyFilters(index(), { ...DEFAULT_FILTERS, q: 'satay', excludeAllergens: ['peanut'] }, { user: null, now: NOW });
    expect(r.filter((x) => /satay/i.test(x.row.name))).toEqual([]);
  });
  it('gluten-free (confirmed) shows nothing until a stall declares it', () => {
    expect(applyFilters(index(), { ...DEFAULT_FILTERS, glutenFreeConfirmed: true }, { user: null, now: NOW })).toHaveLength(0);
  });
});

describe('opening hours', () => {
  const venues: VenueInfo[] = [{ id: 'v', name: 'Test Centre', closures: [['2026-11-16', '2026-11-16', 'cleaning']] }];
  const o = (hours: OutletPoint['hours'], venue: number | null = null): OutletPoint => ({ id: 'o', label: '', lat: null, lng: null, venue, area: '', hours });
  const at = (iso: string) => sgtClock(new Date(iso));
  it('unknown hours stay unknown', () => expect(outletOpenState(o(null), venues, at('2026-11-17T04:00:00Z'))).toBe('unknown'));
  it('open and closed by the clock (Tue 12:00 SGT)', () => {
    expect(outletOpenState(o([[2, '10:00', '20:00']]), venues, at('2026-11-17T04:00:00Z'))).toBe('open');
    expect(outletOpenState(o([[2, '13:00', '20:00']]), venues, at('2026-11-17T04:00:00Z'))).toBe('closed');
  });
  it('handles hours that cross midnight', () => {
    // Mon 18:00 → Tue 03:00; Tue 01:00 SGT = Mon 17:00 UTC
    expect(outletOpenState(o([[1, '18:00', '03:00']]), venues, at('2026-11-16T17:00:00Z'))).toBe('open');
  });
  it('a venue cleaning day closes every stall in it', () => {
    expect(outletOpenState(o([[1, '06:00', '22:00']], 0), venues, at('2026-11-16T04:00:00Z'))).toBe('closed_today');
  });
  it('combines outlets: any open wins, then unknown', () => {
    expect(combineOpenStates(['closed', 'open'])).toBe('open');
    expect(combineOpenStates(['closed', 'unknown'])).toBe('unknown');
  });
  it('Maxwell Food Centre is closed on its NEA cleaning day (14 Dec 2026)', () => {
    const cleaning = new Date('2026-12-14T04:00:00Z');
    const base = { ...DEFAULT_FILTERS, q: 'tian tian chicken rice' };
    const tian = (rs: ReturnType<typeof applyFilters>) => rs.filter((r) => r.row.brandId === 'tian_tian_chicken_rice');
    const onCleaningDay = tian(applyFilters(index(), base, { user: null, now: cleaning }));
    expect(onCleaningDay.length).toBe(3);
    expect(onCleaningDay.every((r) => r.open === 'closed_today')).toBe(true);
    expect(tian(applyFilters(index(), { ...base, openNow: true }, { user: null, now: cleaning }))).toHaveLength(0);
    // A normal day: hours aren't known yet, so it stays visible as "unknown" (not "open").
    const normal = tian(applyFilters(index(), { ...base, openNow: true }, { user: null, now: NOW }));
    expect(normal.length).toBe(3);
    expect(normal.every((r) => r.open === 'unknown')).toBe(true);
  });
});
