// Deterministic nutrition logic. Never invents values: missing stays missing.

import type { Database, NutritionProfile, NutritionStatus } from './schema';

const STATUS_RANK: Record<NutritionStatus, number> = {
  verified: 0, operator_provided: 1, estimated: 2, community: 3, needs_review: 4, outdated: 5,
};

/** Current (validTo === null) profiles, best status first. */
export function rankProfiles(profiles: NutritionProfile[]): NutritionProfile[] {
  return profiles.filter((p) => p.validTo == null).sort((a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status]);
}

export interface NutritionIndex {
  byProduct: Map<string, NutritionProfile[]>;
  byConcept: Map<string, NutritionProfile[]>;
}

export function indexNutrition(db: Pick<Database, 'nutrition_profiles'>): NutritionIndex {
  const byProduct = new Map<string, NutritionProfile[]>();
  const byConcept = new Map<string, NutritionProfile[]>();
  for (const p of db.nutrition_profiles) {
    const map = p.subjectType === 'concept' ? byConcept : p.subjectType === 'product' ? byProduct : null;
    if (!map) continue;
    (map.get(p.subjectId) ?? map.set(p.subjectId, []).get(p.subjectId)!).push(p);
  }
  return { byProduct, byConcept };
}

/**
 * The profile to show for a product: its own best current profile, else its
 * food concept's reference profile, else null. A product's own profile always
 * outranks the concept reference — that's how a stall's real data replaces
 * the "typical" estimate.
 */
export function preferredProfile(idx: NutritionIndex, productId: string, conceptId: string | null): NutritionProfile | null {
  const own = rankProfiles(idx.byProduct.get(productId) ?? []);
  if (own.length) return own[0];
  if (conceptId) {
    const ref = rankProfiles(idx.byConcept.get(conceptId) ?? []);
    if (ref.length) return ref[0];
  }
  return null;
}

export const MACROS = ['caloriesKcal', 'proteinG', 'carbohydrateG', 'fatG'] as const;
export type Macro = (typeof MACROS)[number];

export interface ComponentNutrition {
  productId: string;
  quantity: number;
  profile: NutritionProfile | null;
}

export interface CombinedNutrition {
  totals: Record<Macro, number>;   // sum of KNOWN values only
  complete: boolean;               // every component has every macro
  knownComponents: number;
  totalComponents: number;
  missing: string[];               // product ids with no/partial data
  lowestStatus: NutritionStatus | null;
}

/**
 * Sum a set of selected components (a meal configuration, a meal tray).
 * If anything is missing, totals are a LOWER BOUND and complete=false —
 * callers must show "≥" and an incomplete flag (PRD §8.4).
 */
export function combineNutrition(components: ComponentNutrition[]): CombinedNutrition {
  const totals = { caloriesKcal: 0, proteinG: 0, carbohydrateG: 0, fatG: 0 };
  const missing: string[] = [];
  let known = 0;
  let lowest: NutritionStatus | null = null;
  for (const c of components) {
    const p = c.profile;
    const full = !!p && MACROS.every((m) => p[m] != null);
    if (!full) missing.push(c.productId);
    else known++;
    if (p) {
      for (const m of MACROS) {
        const v = p[m];
        if (v != null) totals[m] = round1(totals[m] + v * c.quantity);
      }
      if (lowest == null || STATUS_RANK[p.status] > STATUS_RANK[lowest]) lowest = p.status;
    }
  }
  return { totals, complete: missing.length === 0, knownComponents: known, totalComponents: components.length, missing, lowestStatus: lowest };
}

export interface SelectionError { groupId: string; message: string }

/** Validates a selection against a configuration's group min/max rules. */
export function validateSelection(
  db: Pick<Database, 'configuration_groups' | 'configuration_options'>,
  configurationId: string,
  selectedOptionIds: string[],
): SelectionError[] {
  const errors: SelectionError[] = [];
  const groups = db.configuration_groups.filter((g) => g.configurationId === configurationId);
  for (const g of groups) {
    const n = db.configuration_options.filter((o) => o.groupId === g.id && selectedOptionIds.includes(o.id)).length;
    if (n < g.selectionMin) errors.push({ groupId: g.id, message: `Choose at least ${g.selectionMin} in ${g.name}` });
    if (n > g.selectionMax) errors.push({ groupId: g.id, message: `Choose at most ${g.selectionMax} in ${g.name}` });
  }
  return errors;
}

/** Nutrition for a configuration selection, using each option's product profile. */
export function configurationNutrition(
  db: Pick<Database, 'configuration_options' | 'nutrition_profiles' | 'products'>,
  selectedOptionIds: string[],
): CombinedNutrition {
  const idx = indexNutrition(db);
  const conceptOf = new Map(db.products.map((p) => [p.id, p.conceptId]));
  const comps: ComponentNutrition[] = db.configuration_options
    .filter((o) => selectedOptionIds.includes(o.id))
    .map((o) => ({ productId: o.productId, quantity: o.quantity, profile: preferredProfile(idx, o.productId, conceptOf.get(o.productId) ?? null) }));
  return combineNutrition(comps);
}

export const round1 = (n: number) => Math.round(n * 10) / 10;
