// Human labels for active filters — each chip knows how to remove itself.
import { UI_ALLERGENS, UI_COOKING, UI_DIET_TAGS, OUTLET_GROUPS, type Filters } from './types';

export interface FilterChip { id: string; label: string; remove: (f: Filters) => Filters }

export function filterChips(f: Filters): FilterChip[] {
  const c: FilterChip[] = [];
  const add = (id: string, label: string, remove: (f: Filters) => Filters) => c.push({ id, label, remove });
  if (f.priceMax != null) add('price', `≤ $${f.priceMax.toFixed(2)}`, (x) => ({ ...x, priceMax: null }));
  if (f.kcalMax != null) add('kcalMax', `≤ ${f.kcalMax} kcal`, (x) => ({ ...x, kcalMax: null }));
  if (f.kcalMin != null) add('kcalMin', `≥ ${f.kcalMin} kcal`, (x) => ({ ...x, kcalMin: null }));
  if (f.proteinMin != null) add('protein', `≥ ${f.proteinMin} g protein`, (x) => ({ ...x, proteinMin: null }));
  if (f.carbsMax != null) add('carbs', `≤ ${f.carbsMax} g carbs`, (x) => ({ ...x, carbsMax: null }));
  if (f.fatMax != null) add('fat', `≤ ${f.fatMax} g fat`, (x) => ({ ...x, fatMax: null }));
  for (const d of f.diet) add(`diet:${d}`, UI_DIET_TAGS.find((t) => t.value === d)?.label ?? d, (x) => ({ ...x, diet: x.diet.filter((t) => t !== d) }));
  if (f.glutenFreeConfirmed) add('gf', 'Gluten-free (confirmed)', (x) => ({ ...x, glutenFreeConfirmed: false }));
  for (const a of f.excludeAllergens) add(`no:${a}`, `No ${UI_ALLERGENS.find((t) => t.value === a)?.label.toLowerCase() ?? a}`, (x) => ({ ...x, excludeAllergens: x.excludeAllergens.filter((t) => t !== a) }));
  if (f.hideUnknownAllergens) add('no_unknown', 'Hide unknown allergens', (x) => ({ ...x, hideUnknownAllergens: false }));
  if (f.notFried) add('not_fried', 'Not fried', (x) => ({ ...x, notFried: false }));
  for (const m of f.cooking) add(`cook:${m}`, UI_COOKING.find((t) => t.value === m)?.label ?? m, (x) => ({ ...x, cooking: x.cooking.filter((t) => t !== m) }));
  if (f.spice !== 'any') add('spice', f.spice === 'mild' ? 'Not spicy' : 'Spicy', (x) => ({ ...x, spice: 'any' }));
  if (f.openNow) add('open', 'Open now', (x) => ({ ...x, openNow: false }));
  if (f.openAt) add('open_at', `Open at ${f.openAt}`, (x) => ({ ...x, openAt: null }));
  if (f.maxDistanceKm != null) add('dist', `Within ${f.maxDistanceKm < 1 ? `${f.maxDistanceKm * 1000} m` : `${f.maxDistanceKm} km`}`, (x) => ({ ...x, maxDistanceKm: null }));
  if (f.area) add('area', `Near "${f.area}"`, (x) => ({ ...x, area: '' }));
  for (const g of f.outletGroups) add(`where:${g}`, OUTLET_GROUPS.find((o) => o.value === g)?.label ?? g, (x) => ({ ...x, outletGroups: x.outletGroups.filter((t) => t !== g) }));
  if (f.verifiedOnly) add('verified', 'Verified only', (x) => ({ ...x, verifiedOnly: false }));
  if (f.priceCheckedDays != null) add('checked', `Price checked ≤ ${f.priceCheckedDays} days`, (x) => ({ ...x, priceCheckedDays: null }));
  if (f.q) add('q', `"${f.q}"`, (x) => ({ ...x, q: '' }));
  return c;
}
