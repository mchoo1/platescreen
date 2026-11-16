// Deterministic filtering and sorting. The AI/parser only produces a Filters
// object; every match and number is decided here.
//
// Missing-data rules (PRD principle 14):
//   - A nutrient/price filter excludes rows whose value is unknown (can't confirm).
//   - Allergen exclusion hides contains / may_contain / likely_contains, and
//     hides "unknown" only when hideUnknownAllergens is on. Unknown is never "safe".
//   - Open now keeps "hours unknown" rows only when includeHoursUnknown is on.
//   - Cooking/spice: unknown passes (not a safety filter), but never matches a
//     positive choice like "Steamed".

import { FRIED_METHODS } from '@/db/schema';
import { haversineKm } from '@/lib/geo';
import { brandTagAppliesToDish } from '@/db/rules';
import { combineOpenStates, outletOpenState, sgtClock, type OpenState, type SgtClock } from './hours';
import { matchesNormalized, normalizeSearchText } from './text';
import { OUTLET_GROUPS, type Filters, type SearchIndex, type SearchRow, type SetCombo } from './types';

/** The numbers a result is shown and ranked by (a set's chosen combination, or the dish itself). */
export interface ResultView { kcal: number | null; protein: number | null; carbs: number | null; fat: number | null; price: number | null; ppd: number | null; complete: boolean }

export interface ResultRow {
  row: SearchRow;
  view: ResultView;
  combo: SetCombo | null;        // sets: the combination shown (default if it fits, else the best fit)
  distanceKm: number | null;
  nearestOutlet: number | null;
  open: OpenState;
}

const viewOf = (r: SearchRow | SetCombo): ResultView => ({ kcal: r.kcal, protein: r.protein, carbs: r.carbs, fat: r.fat, price: r.price, ppd: r.ppd, complete: r.complete });

/**
 * Nutrient/price limits against possibly-incomplete totals:
 *   - a maximum can only be confirmed when the total is complete;
 *   - a minimum can be confirmed by a lower bound.
 */
function passesNumbers(v: ResultView, f: Filters): boolean {
  const max = (val: number | null, lim: number | null) => lim == null || (val != null && v.complete && val <= lim);
  const min = (val: number | null, lim: number | null) => lim == null || (val != null && val >= lim);
  return max(v.kcal, f.kcalMax) && min(v.kcal, f.kcalMin) && min(v.protein, f.proteinMin)
    && max(v.carbs, f.carbsMax) && max(v.fat, f.fatMax)
    && (f.priceMax == null || (v.price != null && v.price <= f.priceMax));
}

/** For a set: the default meal if it fits, otherwise the cheapest fitting combination (then most protein). */
export function pickCombo(row: SearchRow, f: Filters): SetCombo | null {
  const combos = row.combos ?? [];
  const fits = combos.filter((c) => passesNumbers(viewOf(c), f));
  if (!fits.length) return null;
  if (fits[0].isDefault) return fits[0];
  return [...fits].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity) || (b.protein ?? 0) - (a.protein ?? 0))[0];
}

export interface FilterContext {
  user: { lat: number; lng: number } | null;
  now?: Date;
}

const LIKELY_OR_WORSE = new Set(['contains', 'may_contain', 'likely_contains']);

export function dietMatches(row: SearchRow, tag: string): boolean {
  const own = row.diet[tag as keyof SearchRow['diet']];
  if (own === 'yes') return true;
  if (own === 'no') return false;
  return row.brandDietTags.includes(tag as never) && brandTagAppliesToDish(tag, row.name);
}

export function allergenBlocks(row: SearchRow, allergen: string, hideUnknown: boolean): boolean {
  const s = row.allergens[allergen as keyof SearchRow['allergens']];
  if (s && LIKELY_OR_WORSE.has(s)) return true;
  if (!s && hideUnknown) return true;
  return false;
}

function passesStatic(row: SearchRow, f: Filters, clockDays: number | null): boolean {
  if (!matchesNormalized(f.q, row.text)) return false;
  if (row.kind === 'dish' && !passesNumbers(viewOf(row), f)) return false;
  if (f.diet.length && !f.diet.every((t) => dietMatches(row, t))) return false;
  if (f.glutenFreeConfirmed && !row.glutenFree) return false;
  if (f.excludeAllergens.some((a) => allergenBlocks(row, a, f.hideUnknownAllergens))) return false;
  if (f.notFried && row.cooking.some((m) => FRIED_METHODS.includes(m))) return false;
  if (f.cooking.length && !f.cooking.some((m) => row.cooking.includes(m))) return false;
  if (f.spice === 'mild' && row.spice != null && row.spice >= 1) return false;
  if (f.spice === 'spicy' && (row.spice == null || row.spice < 1)) return false;
  if (f.outletGroups.length) {
    const types = OUTLET_GROUPS.filter((g) => f.outletGroups.includes(g.value)).flatMap((g) => g.types);
    if (!types.includes(row.outletType)) return false;
  }
  if (f.platforms.length && !f.platforms.some((p) => row.platforms.includes(p))) return false;
  if (f.verifiedOnly && row.trust !== 'verified' && row.trust !== 'operator') return false;
  if (f.priceCheckedDays != null) {
    if (!row.priceCheckedAt || clockDays == null) return false;
    const age = clockDays - Math.floor(Date.parse(row.priceCheckedAt) / 86400000);
    if (age > f.priceCheckedDays) return false;
  }
  return true;
}

export function applyFilters(index: SearchIndex, f: Filters, ctx: FilterContext = { user: null }): ResultRow[] {
  const now = ctx.now ?? new Date();
  const clock: SgtClock = sgtClock(now, f.openAt);
  const today = Math.floor(now.getTime() / 86400000);
  const area = normalizeSearchText(f.area);
  const out: ResultRow[] = [];
  for (const row of index.rows) {
    if (!passesStatic(row, f, today)) continue;
    let combo: SetCombo | null = null;
    if (row.kind === 'set') {
      combo = pickCombo(row, f);
      if (!combo) continue;
    }
    const view = combo ? viewOf(combo) : viewOf(row);

    // Outlet-level filters: area, distance, open state — evaluated on the outlets that match.
    const all = index.brandOutlets[row.brandId] ?? [];
    let candidates = all;
    if (area) {
      const brandHit = matchesNormalized(area, normalizeSearchText(row.brandName + ' ' + row.location));
      candidates = candidates.filter((i) => matchesNormalized(area, index.outlets[i].area));
      if (!candidates.length && !brandHit) continue;
      if (!candidates.length) candidates = all;
    }
    let distanceKm: number | null = null;
    let nearest: number | null = null;
    if (ctx.user) {
      for (const i of candidates) {
        const o = index.outlets[i];
        if (o.lat == null || o.lng == null) continue;
        const d = haversineKm(ctx.user.lat, ctx.user.lng, o.lat, o.lng);
        if (distanceKm == null || d < distanceKm) { distanceKm = d; nearest = i; }
      }
    }
    if (f.maxDistanceKm != null) {
      if (!ctx.user || distanceKm == null || distanceKm > f.maxDistanceKm) continue;
      candidates = candidates.filter((i) => {
        const o = index.outlets[i];
        return o.lat != null && o.lng != null && haversineKm(ctx.user!.lat, ctx.user!.lng, o.lat, o.lng) <= f.maxDistanceKm!;
      });
    }
    const open = candidates.length
      ? combineOpenStates(candidates.map((i) => outletOpenState(index.outlets[i], index.venues, clock)))
      : 'unknown';
    if (f.openNow || f.openAt) {
      if (open === 'closed' || open === 'closed_today') continue;
      if (open === 'unknown' && !f.includeHoursUnknown) continue;
    }
    out.push({ row, view, combo, distanceKm, nearestOutlet: nearest, open });
  }
  return sortResults(out, f.sort);
}

const nullsLast = (a: number | null, b: number | null, dir: 1 | -1) => {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return (a - b) * dir;
};

export function sortResults(rows: ResultRow[], sort: Filters['sort']): ResultRow[] {
  const r = [...rows];
  switch (sort) {
    case 'ppd': return r.sort((a, b) => nullsLast(a.view.ppd, b.view.ppd, -1) || a.row.name.localeCompare(b.row.name));
    case 'price': return r.sort((a, b) => nullsLast(a.view.price, b.view.price, 1) || a.row.name.localeCompare(b.row.name));
    case 'kcal': return r.sort((a, b) => nullsLast(a.view.kcal, b.view.kcal, 1) || a.row.name.localeCompare(b.row.name));
    case 'protein': return r.sort((a, b) => nullsLast(a.view.protein, b.view.protein, -1) || a.row.name.localeCompare(b.row.name));
    case 'distance': return r.sort((a, b) => nullsLast(a.distanceKm, b.distanceKm, 1) || a.row.name.localeCompare(b.row.name));
    case 'name': return r.sort((a, b) => a.row.name.localeCompare(b.row.name));
  }
}

/** How many filters differ from defaults (for the "Filters · N" button). */
export function activeFilterCount(f: Filters): number {
  let n = 0;
  for (const k of ['kcalMin', 'kcalMax', 'proteinMin', 'carbsMax', 'fatMax', 'priceMax', 'maxDistanceKm', 'priceCheckedDays'] as const) if (f[k] != null) n++;
  n += f.diet.length + f.excludeAllergens.length + f.cooking.length + f.outletGroups.length + f.platforms.length;
  if (f.glutenFreeConfirmed) n++;
  if (f.hideUnknownAllergens) n++;
  if (f.notFried) n++;
  if (f.spice !== 'any') n++;
  if (f.openNow || f.openAt) n++;
  if (f.area) n++;
  if (f.verifiedOnly) n++;
  return n;
}
