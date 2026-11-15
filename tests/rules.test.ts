import { describe, expect, it } from 'vitest';
import { inferAllergens, inferCooking, inferSpice } from '@/db/rules';

const allergens = (n: string) => inferAllergens(n).map((a) => a.allergen).sort();

describe('cooking style rules', () => {
  it.each([
    ['Steamed Chicken Rice', 'steamed'],
    ['Roasted Chicken Rice', 'roasted'],
    ['Yang Zhou Fried Rice', 'stir_fried'],
    ['Char Kway Teow', 'stir_fried'],
    ['Fried Chicken Wing', 'deep_fried'],
    ['Chicken Satay (10 sticks)', 'grilled'],
    ['Sliced Fish Soup', 'soup'],
    ['Braised Duck Rice', 'braised'],
  ])('%s → %s', (name, method) => {
    expect(inferCooking(name)[0]).toBe(method);
  });
  it('unknown stays unknown', () => expect(inferCooking('Nasi Lemak')).toEqual([]));
  it('generic "fried" only when nothing more specific matched', () => {
    expect(inferCooking('Fried Fish Soup')).not.toContain('fried');
    expect(inferCooking('Fried Bee Hoon')).toEqual(['stir_fried']);
  });
});

describe('spice rules', () => {
  it('spicy, mild-ish and unknown', () => {
    expect(inferSpice('Mala Xiang Guo')).toBe(2);
    expect(inferSpice('Curry Chicken Noodles')).toBe(1);
    expect(inferSpice('Steamed Chicken Rice')).toBeNull();
  });
});

describe('likely-allergen rules', () => {
  it('Hainanese-style chicken rice: soy sauce + sesame oil', () => {
    expect(allergens('Steamed Chicken Rice')).toEqual(['gluten', 'sesame', 'soy']);
  });
  it('does not apply Hainanese assumptions to other "chicken rice" dishes', () => {
    expect(allergens('Spicy Chicken Rice Set')).toEqual([]);
  });
  it('satay → peanut; prawn mee → crustacea + gluten', () => {
    expect(allergens('Chicken Satay')).toContain('peanut');
    expect(allergens('Prawn Mee')).toEqual(['crustacea', 'gluten']);
  });
  it('rice noodles are not wheat', () => {
    expect(allergens('Mee Siam')).not.toContain('gluten');
    expect(allergens('Fried Bee Hoon')).not.toContain('gluten');
  });
  it('black coffee has no milk, kopi does', () => {
    expect(allergens('Kopi-O')).not.toContain('milk');
    expect(allergens('Kopi')).toContain('milk');
  });
});
