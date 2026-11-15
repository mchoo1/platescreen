// Name-based inference rules, applied by scripts/migrate-v1.ts and re-runnable
// for new dishes. Every rule output is labelled as inference in the data
// (basis: 'name_rule' / 'dish_inference') and is always outranked by a
// brand's or stall's own declaration.
//
// Allergen policy (Ming, 2026-11-15): inference can only ever say
// "likely contains". It never says "free from" and never says "gluten-free".

import type { Allergen, CookingMethod } from './schema';

export interface Rule<T> { pattern: RegExp; value: T; reason?: string }

// ── Cooking style ────────────────────────────────────────────────────────────
// Order matters only for picking the primary method (first match wins).
export const COOKING_RULES: Rule<CookingMethod>[] = [
  { pattern: /\b(steamed|poached|chee cheong fun|xiao long bao|siew mai|siu mai|har gow|chwee kueh|idli|putu piring|soon kueh|png kueh)\b/i, value: 'steamed' },
  { pattern: /\b(grill(ed)?|bbq|barbecue|satay|tandoori|panggang|bakar|teriyaki|yakitori|kebab|charcoal|flame[- ]grilled|tikka)\b/i, value: 'grilled' },
  { pattern: /\b(roast(ed)?|char siew|char siu|siu yuk|siew yuk|rotisserie|roast duck|roast pork)\b/i, value: 'roasted' },
  { pattern: /\b(fried rice|fried (noodles?|bee hoon|kway teow|hor fun|mee|hokkien|maggi)|char kway teow|mee goreng|nasi goreng|maggi goreng|kway teow goreng|bee hoon goreng|stir[- ]?fr(y|ied)|wok[- ]?(fried|hei)|hokkien (prawn )?mee|sambal kangkong|fried hokkien)\b/i, value: 'stir_fried' },
  { pattern: /\b(deep[- ]fried|fried chicken|ayam goreng|ayam penyet|nuggets?|tempura|katsu|karaage|fritters?|goreng pisang|cutlet|fries|hash ?brown|spring rolls?|ngoh hiang|prawn crackers?|keropok|you ?tiao|curry puff|samosa|vadai|chicken wings?|mcwings|mccrispy|mcspicy|mcchicken|zinger|fish (and|&) chips|fried fish|fish fillet|filet-o-fish|chicken popcorn|popcorn chicken|crispy chicken)\b/i, value: 'deep_fried' },
  { pattern: /\b(braised|lor|kway chap|pig trotter|stew(ed)?|rendang|adobo|tau yu bak|lor bak)\b/i, value: 'braised' },
  { pattern: /\b(soup|sup|broth|bak kut teh|laksa|tom yum|pho|ramen|soto|mee rebus|ban mian|fish ?ball noodle soup|kway teow soup|porridge|congee|yong tau foo)\b/i, value: 'soup' },
  { pattern: /\b(baked|bake|pizza|lasagn[ae]|gratin|croissant|tart|pie|muffin|cake|egg tart|scones?|bagel)\b/i, value: 'baked' },
  { pattern: /\b(sashimi|poke|salad|ceviche|tartare|rojak|yusheng|yu sheng)\b/i, value: 'raw' },
  { pattern: /\b(boiled|blanched)\b/i, value: 'boiled' },
  // Catch-all "fried" when nothing above pinned the type of frying.
  { pattern: /\b(fried|goreng)\b/i, value: 'fried' },
];

export function inferCooking(name: string): CookingMethod[] {
  const out: CookingMethod[] = [];
  for (const r of COOKING_RULES) {
    if (r.pattern.test(name) && !out.includes(r.value)) out.push(r.value);
  }
  // Generic 'fried' is redundant once a specific frying method matched.
  if (out.includes('fried') && (out.includes('deep_fried') || out.includes('stir_fried'))) {
    return out.filter((m) => m !== 'fried');
  }
  return out;
}

// ── Spice ────────────────────────────────────────────────────────────────────
export function inferSpice(name: string): 0 | 1 | 2 | 3 | null {
  if (/\b(mala|vindaloo|sichuan|szechuan|tom yum|sambal|chilli|chili|spicy|mcspicy|penyet|hot (and|&) sour|bulgogi spicy|tteokbokki)\b/i.test(name)) return 2;
  if (/\b(curry|laksa|rendang|assam|kimchi|green curry|red curry|masala|tikka)\b/i.test(name)) return 1;
  return null; // unknown — never assume "not spicy"
}

// ── Allergens (likely only) ─────────────────────────────────────────────────
// Each rule must name WHY the allergen is likely, so the app can show it.
export const ALLERGEN_RULES: Rule<Allergen>[] = [
  // Gluten (wheat): wheat noodles, breads, batters, pastries, soy sauce dishes
  { pattern: /\b(mee(?! (hoon|siam))|mee hoon kway|ban mian|mee pok|wanton|wonton|ramen|udon|soba|pasta|spaghetti|penne|lasagn[ae]|macaroni|noodle(s)? \(wheat\))\b/i, value: 'gluten', reason: 'wheat noodles or pasta' },
  { pattern: /\b(bread|bun|burger|sandwich|sub|wrap|toast|bagel|croissant|prata|naan|roti|chapati|pizza|baguette|muffin|scones?|mcmuffin|big mac|cheeseburger|hamburger|quarter pounder|mcchicken|filet-o-fish|mcspicy)\b/i, value: 'gluten', reason: 'bread or bun' },
  { pattern: /\b(dumplings?|gyoza|xiao long bao|siew mai|siu mai|bao|pau|curry puff|spring rolls?|samosa|pie|tart|cake|pastry|cookie|biscuit|waffle|pancake|hotcakes?|doughnut|donut|you ?tiao)\b/i, value: 'gluten', reason: 'wheat flour dough or pastry' },
  { pattern: /\b(tempura|katsu|nuggets?|breaded|battered|fried chicken|cutlet|mcwings|mccrispy|karaage|fish (and|&) chips|popcorn chicken|crispy chicken|zinger)\b/i, value: 'gluten', reason: 'flour batter or breadcrumbs' },
  { pattern: /\b((hainanese|steamed|poached|roast(ed)?|white|boneless|soy sauce) chicken rice|^chicken rice|char siew|char siu|soy sauce|teriyaki|kway chap|bak kut teh|lor|braised)\b/i, value: 'gluten', reason: 'soy sauce usually contains wheat' },
  // Soy
  { pattern: /\b(tofu|tau ?kwa|tau ?pok|tau ?hu|tau huay|beancurd|bean curd|soy|soya|tempeh|edamame|miso|yong tau foo)\b/i, value: 'soy', reason: 'soy beans or bean curd' },
  { pattern: /\b((hainanese|steamed|poached|roast(ed)?|white|boneless|soy sauce) chicken rice|^chicken rice|char siew|char siu|teriyaki|kway chap|bak kut teh|lor|braised|fried rice|char kway teow|hor fun|hokkien (prawn )?mee)\b/i, value: 'soy', reason: 'soy sauce is usually used' },
  // Sesame
  { pattern: /\b(sesame|(hainanese|steamed|poached|roast(ed)?|white|boneless|soy sauce) chicken rice|^chicken rice|ma jiang|tahini|hummus)\b/i, value: 'sesame', reason: 'sesame oil or paste is usually used' },
  // Peanut
  { pattern: /\b(peanuts?|satay|rojak|gado[- ]gado|kacang|pecel|kung pao|kung po|ondeh|muah chee|ang ku kueh)\b/i, value: 'peanut', reason: 'peanuts or peanut sauce' },
  // Tree nuts
  { pattern: /\b(almonds?|cashews?|walnuts?|pistachios?|hazelnuts?|macadamias?|pecans?|praline|marzipan|korma)\b/i, value: 'tree_nuts', reason: 'tree nuts in the name' },
  // Crustacea
  { pattern: /\b(prawns?|shrimps?|crabs?|lobsters?|har gow|hae bee|heh bee|chilli crab|crayfish|udang|sambal belacan|belacan|rojak|laksa|hokkien (prawn )?mee|prawn mee|ebi)\b/i, value: 'crustacea', reason: 'prawn, crab or shrimp paste' },
  // Molluscs
  { pattern: /\b(cockles?|clams?|mussels?|oysters?|squid|sotong|octopus|scallops?|lala|abalone|orh luak|oyster omelette)\b/i, value: 'molluscs', reason: 'shellfish or squid' },
  // Fish
  { pattern: /\b(fish|salmon|tuna|cod|mackerel|anchov(y|ies)|ikan|bilis|otah|otak|fishball|fish ball|fish cake|batang|snapper|seabass|sea bass|dory|saba|unagi|tilapia|pomfret|sashimi|filet-o-fish|fish sauce|laksa|sambal belacan)\b/i, value: 'fish', reason: 'fish or fish sauce' },
  // Egg
  { pattern: /\b(eggs?|omelette|omelet|tamago|kaya|egg tart|mayo|mayonnaise|mcmuffin|scrambled|carbonara|fu yong|foo young|chawanmushi|custard|hotcakes?|pancake|waffle)\b/i, value: 'egg', reason: 'egg' },
  // Milk
  { pattern: /\b(cheese|cheesy|milk|latte|cappuccino|mocha|cream|creamy|butter|yogh?urt|lassi|milo|ice cream|sundae|mcflurry|paneer|ghee|teh tarik|kopi(?![- ]?o)|teh(?![- ]?o)|milkshake|frappe|bubble tea|milk tea|custard|carbonara|alfredo|mac (and|&) cheese)\b/i, value: 'milk', reason: 'milk, cream or cheese' },
];

export function inferAllergens(name: string): { allergen: Allergen; reason: string }[] {
  const out: { allergen: Allergen; reason: string }[] = [];
  for (const r of ALLERGEN_RULES) {
    if (r.pattern.test(name) && !out.some((o) => o.allergen === r.value)) {
      out.push({ allergen: r.value, reason: r.reason ?? 'name' });
    }
  }
  return out;
}

// ── Diet name patterns (shared with the search engine's brand-tag guard) ─────
export const PORK_NAME_PATTERN = /\bpork\b|bak kut teh|pig organ|char siu|char siew|siu yuk|sio bak|bak kwa|\bham\b|\blard\b|\bbacon\b/i;
export const MEAT_SEAFOOD_NAME_PATTERN = /\bpork\b|\bchicken\b|\bbeef\b|\bmutton\b|\blamb\b|\bduck\b|\bfish\b|\bprawn\b|\bshrimp\b|\bcrab\b|\bsquid\b|\boctopus\b|\bbacon\b|\bham\b|\bsausage\b|\bmeat\b|seafood|\begg\b/i;

/** Whether a brand-level dietTag is safe to apply to a specific dish by name. */
export function brandTagAppliesToDish(tag: string, dishName: string): boolean {
  if (tag === 'halal' || tag === 'no_pork') return !PORK_NAME_PATTERN.test(dishName);
  if (tag === 'vegetarian' || tag === 'vegan') return !MEAT_SEAFOOD_NAME_PATTERN.test(dishName);
  return true;
}

export function inferKind(name: string, category: string): 'dish' | 'drink' | 'side' | 'addon' | 'dessert' {
  const c = category.toLowerCase();
  if (/beverage|drink|coffee|tea|juice|bubble|smoothie/.test(c)) return 'drink';
  if (/dessert|sweet|ice cream/.test(c)) return 'dessert';
  if (/side|snack/.test(c)) return 'side';
  if (/\b(add[- ]?on|extra)\b/i.test(name)) return 'addon';
  return 'dish';
}
