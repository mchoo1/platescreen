// Filters ⇄ URL query string, so every search is a shareable link.
// Also reads the v1 screener's parameter names so old shared links still work.

import type { Allergen, CookingMethod, Platform } from '@/db/schema';
import type { DietaryFlag } from '@/types';
import { DEFAULT_FILTERS, type Filters, type OutletGroup, type SortKey, type SpiceFilter } from './types';

const list = <T extends string>(v: string | null) => (v ? (v.split(',').filter(Boolean) as T[]) : []);
const n = (v: string | null) => (v == null || v === '' || Number.isNaN(Number(v)) ? null : Number(v));

const LEGACY_OUTLET_TO_GROUP: Record<string, OutletGroup> = {
  hawker: 'hawker', food_court_stall: 'hawker', food_court: 'hawker', coffeeshop: 'hawker', canteen: 'hawker',
  restaurant: 'restaurant', grab_go: 'grab_go', ready_to_eat: 'grab_go', supermarket: 'supermarket',
};

export function filtersFromParams(p: URLSearchParams): { filters: Filters; ask: string; compare: string[] } {
  const f: Filters = {
    ...DEFAULT_FILTERS,
    q: p.get('q') ?? '',
    kcalMin: n(p.get('kcal_min') ?? p.get('cal_min')),
    kcalMax: n(p.get('kcal_max') ?? p.get('cal_max')),
    proteinMin: n(p.get('prot_min')),
    carbsMax: n(p.get('carb_max')),
    fatMax: n(p.get('fat_max')),
    priceMax: n(p.get('price_max')),
    diet: list<DietaryFlag>(p.get('diet') ?? p.get('tag')),
    glutenFreeConfirmed: p.get('gf') === '1',
    excludeAllergens: list<Allergen>(p.get('no')),
    hideUnknownAllergens: p.get('no_unknown') === '1',
    cooking: list<CookingMethod>(p.get('cook')),
    notFried: p.get('not_fried') === '1',
    spice: (p.get('spice') as SpiceFilter) || 'any',
    openNow: p.get('open') === '1',
    includeHoursUnknown: p.get('hours_unknown') !== '0',
    openAt: p.get('open_at'),
    maxDistanceKm: n(p.get('dist') ?? p.get('dist_max')),
    area: p.get('area') ?? p.get('loc') ?? '',
    outletGroups: [...new Set([...list<OutletGroup>(p.get('where')), ...list<string>(p.get('outlet')).map((o) => LEGACY_OUTLET_TO_GROUP[o]).filter(Boolean)])] as OutletGroup[],
    platforms: list<Platform>(p.get('platform')),
    verifiedOnly: p.get('verified') === '1',
    priceCheckedDays: n(p.get('checked')),
    sort: ((p.get('sort') === 'calories' ? 'kcal' : p.get('sort')) as SortKey) || 'ppd',
  };
  if (!['ppd', 'price', 'kcal', 'protein', 'distance', 'name'].includes(f.sort)) f.sort = 'ppd';
  return { filters: f, ask: p.get('ask') ?? '', compare: list<string>(p.get('cmp')).slice(0, 3) };
}

export function paramsFromFilters(f: Filters, ask: string, compare: string[]): string {
  const p = new URLSearchParams();
  const set = (k: string, v: string | number | null | boolean) => {
    if (v === null || v === '' || v === false) return;
    p.set(k, v === true ? '1' : String(v));
  };
  set('ask', ask);
  set('q', f.q);
  set('kcal_min', f.kcalMin); set('kcal_max', f.kcalMax); set('prot_min', f.proteinMin);
  set('carb_max', f.carbsMax); set('fat_max', f.fatMax); set('price_max', f.priceMax);
  set('diet', f.diet.join(',')); set('gf', f.glutenFreeConfirmed);
  set('no', f.excludeAllergens.join(',')); set('no_unknown', f.hideUnknownAllergens);
  set('cook', f.cooking.join(',')); set('not_fried', f.notFried);
  if (f.spice !== 'any') set('spice', f.spice);
  set('open', f.openNow); if (!f.includeHoursUnknown) p.set('hours_unknown', '0'); set('open_at', f.openAt);
  set('dist', f.maxDistanceKm); set('area', f.area);
  set('where', f.outletGroups.join(',')); set('platform', f.platforms.join(','));
  set('verified', f.verifiedOnly); set('checked', f.priceCheckedDays);
  if (f.sort !== 'ppd') set('sort', f.sort);
  set('cmp', compare.join(','));
  return p.toString();
}
