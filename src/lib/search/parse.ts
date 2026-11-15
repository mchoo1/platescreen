// Plain-language query → structured filters. Deterministic regex parsing (no
// AI call, $0): "650 kcal left, need 40g protein, $12, halal, not fried".
// Whatever isn't recognised stays as free text and is matched against dish
// and stall names.

import type { Allergen, CookingMethod } from '@/db/schema';
import type { DietaryFlag } from '@/types';
import type { Filters } from './types';

export interface ParsedChip { key: keyof Filters | `diet:${string}` | `allergen:${string}` | `cooking:${string}`; label: string }
export interface ParsedQuery { patch: Partial<Filters>; chips: ParsedChip[]; text: string; nearMe: boolean }

const num = (s: string) => Number(s.replace(/,/g, ''));

const DIET: [RegExp, DietaryFlag, string][] = [
  [/\bhalal\b/i, 'halal', 'Halal'],
  [/\b(no|without|non)[- ]pork\b|\bpork[- ]free\b/i, 'no_pork', 'No pork'],
  [/\bvegan\b/i, 'vegan', 'Vegan'],
  [/\bvegetarian\b|\bveggie\b/i, 'vegetarian', 'Vegetarian'],
  [/\bpescatarian\b|\bpescetarian\b/i, 'pescatarian', 'Pescatarian'],
];

const ALLERGEN_WORDS: [RegExp, Allergen, string][] = [
  [/\b(no|without|free of|allergic to)\s+peanuts?\b|\bpeanut[- ]free\b|\bpeanut allergy\b/i, 'peanut', 'No peanut'],
  [/\b(no|without)\s+(tree )?nuts?\b|\bnut[- ]free\b|\bnut allergy\b/i, 'tree_nuts', 'No tree nuts'],
  [/\b(no|without)\s+(shellfish|prawns?|shrimps?|crustacea)\b|\bshellfish allergy\b/i, 'crustacea', 'No crustacea'],
  [/\b(no|without)\s+(dairy|milk)\b|\bdairy[- ]free\b|\blactose\b/i, 'milk', 'No milk'],
  [/\b(no|without)\s+eggs?\b|\begg[- ]free\b/i, 'egg', 'No egg'],
  [/\b(no|without)\s+soy\b|\bsoy[- ]free\b/i, 'soy', 'No soy'],
  [/\b(no|without)\s+sesame\b/i, 'sesame', 'No sesame'],
  [/\b(no|without)\s+fish\b/i, 'fish', 'No fish'],
];

const COOKING_WORDS: [RegExp, CookingMethod, string][] = [
  [/\bsteamed\b/i, 'steamed', 'Steamed'],
  [/\bgrilled\b|\bbbq\b/i, 'grilled', 'Grilled'],
  [/\broast(ed)?\b/i, 'roasted', 'Roasted'],
  [/\bsoups?\b/i, 'soup', 'Soup'],
  [/\bbraised\b/i, 'braised', 'Braised'],
  [/\bbaked\b/i, 'baked', 'Baked'],
];

const STOPWORDS = /\b(what|can|i|eat|have|has|left|need|needs|want|looking|for|something|some|a|an|the|with|and|or|under|below|less|than|max|maximum|at|least|min|minimum|more|over|above|within|budget|today|now|me|my|to|of|in|around|about|is|are|any|food|meal|meals|dish|dishes|please|find|show|get|nearby|near|cheap|filling|that|fits|fit|left)\b/gi;

export function parseQuery(input: string): ParsedQuery {
  let s = ` ${input} `;
  const patch: Partial<Filters> = {};
  const chips: ParsedChip[] = [];
  const take = (re: RegExp) => { s = s.replace(re, ' '); };

  // Calories: "650 kcal", "under 500 cal", "at least 600 calories"
  const kcal = /(at least|min(imum)?|over|above|more than|>)?\s*(\d{2,4}(?:,\d{3})?)\s*(k?cal(orie)?s?|kcal)\b/i.exec(s);
  if (kcal) {
    const v = num(kcal[3]);
    if (kcal[1]) { patch.kcalMin = v; chips.push({ key: 'kcalMin', label: `≥ ${v} kcal` }); }
    else { patch.kcalMax = v; chips.push({ key: 'kcalMax', label: `≤ ${v} kcal` }); }
    s = s.replace(kcal[0], ' ');
  }
  // Protein: "40g protein", "40 g of protein", "protein 40g"
  const prot = /(\d{1,3})\s*g(rams?)?\s*(of\s+)?protein\b|\bprotein\s*(\d{1,3})\s*g\b/i.exec(s);
  if (prot) {
    const v = num(prot[1] ?? prot[4]);
    patch.proteinMin = v; chips.push({ key: 'proteinMin', label: `≥ ${v} g protein` });
    s = s.replace(prot[0], ' ');
  }
  // Carbs: "under 50g carbs", "low carb" isn't a number → ignored on purpose
  const carb = /(\d{1,3})\s*g\s*(of\s+)?carb(s|ohydrates?)?\b/i.exec(s);
  if (carb) { const v = num(carb[1]); patch.carbsMax = v; chips.push({ key: 'carbsMax', label: `≤ ${v} g carbs` }); s = s.replace(carb[0], ' '); }
  // Price: "$12", "12 dollars", "S$8.50", "under 10 bucks"
  const price = /(?:s?\$|sgd\s*)(\d{1,3}(?:\.\d{1,2})?)\b|\b(\d{1,3}(?:\.\d{1,2})?)\s*(dollars?|bucks|sgd)\b/i.exec(s);
  if (price) {
    const v = num(price[1] ?? price[2]);
    patch.priceMax = v; chips.push({ key: 'priceMax', label: `≤ $${v.toFixed(2)}` });
    s = s.replace(price[0], ' ');
  }
  // Keto shortcut → carbs ≤ 10 g (same as the v1 "Keto" preset)
  if (/\bketo\b/i.test(s) && patch.carbsMax == null) { patch.carbsMax = 10; chips.push({ key: 'carbsMax', label: '≤ 10 g carbs' }); take(/\bketo\b/gi); }

  for (const [re, tag, label] of DIET) {
    if (re.test(s)) { (patch.diet ??= []).push(tag); chips.push({ key: `diet:${tag}`, label }); s = s.replace(re, ' '); }
  }
  if (/\bgluten[- ]free\b|\bno gluten\b|\bcoeliac\b|\bceliac\b/i.test(s)) {
    patch.glutenFreeConfirmed = true; chips.push({ key: 'glutenFreeConfirmed', label: 'Gluten-free (confirmed)' });
    take(/\bgluten[- ]free\b|\bno gluten\b|\bcoeliac\b|\bceliac\b/gi);
  }
  for (const [re, a, label] of ALLERGEN_WORDS) {
    if (re.test(s)) { (patch.excludeAllergens ??= []).push(a); chips.push({ key: `allergen:${a}`, label }); s = s.replace(re, ' '); }
  }
  if (/\b(not|no|non|without)[- ]?(deep[- ])?fried\b|\bnothing fried\b/i.test(s)) {
    patch.notFried = true; chips.push({ key: 'notFried', label: 'Not fried' });
    take(/\b(not|no|non|without)[- ]?(deep[- ])?fried\b|\bnothing fried\b/gi);
  }
  for (const [re, m, label] of COOKING_WORDS) {
    if (re.test(s)) { (patch.cooking ??= []).push(m); chips.push({ key: `cooking:${m}`, label }); s = s.replace(re, ' '); }
  }
  if (/\b(not|non|no)[- ]?spicy\b|\bmild\b/i.test(s)) { patch.spice = 'mild'; chips.push({ key: 'spice', label: 'Not spicy' }); take(/\b(not|non|no)[- ]?spicy\b|\bmild\b/gi); }
  else if (/\bspicy\b/i.test(s)) { patch.spice = 'spicy'; chips.push({ key: 'spice', label: 'Spicy' }); take(/\bspicy\b/gi); }
  if (/\bopen now\b|\bopen\b/i.test(s)) { patch.openNow = true; chips.push({ key: 'openNow', label: 'Open now' }); take(/\bopen( now)?\b/gi); }
  const nearMe = /\bnear (me|here)\b|\bnearby\b|\baround me\b/i.test(s);
  if (nearMe) take(/\bnear (me|here)\b|\bnearby\b|\baround me\b/gi);

  const text = s.replace(/[,.;!?]/g, ' ').replace(STOPWORDS, ' ').replace(/\b(g|kcal|cal|\$)\b/gi, ' ').replace(/\s+/g, ' ').trim();
  return { patch, chips, text, nearMe };
}
