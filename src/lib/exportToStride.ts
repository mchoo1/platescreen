/**
 * FIRST-PASS EXPORT CONVERTER — maps PlateScreen's simplified Outlet/FoodOption
 * back into Stride's full SGRestaurant/SGMenuItem shape (see
 * reference/stride-original/sgFoodDb.ts for the canonical target interfaces).
 *
 * This is a manual mapping target, not a shared type import — Stride's schema
 * isn't part of this project anymore, so keep this in sync by hand if it changes.
 * Default values below are reasonable starting points; review before an actual
 * sync (per the reviewable-diff workflow — nothing here writes to stride-app
 * automatically).
 */
import type { Outlet, FoodOption, Platform } from '@/types/db';

export interface StrideMenuItemDraft {
  id: string;
  name: string;
  emoji: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  category: string;
  compatibleWith: string[];
  isPopular?: boolean;
  confidence: 'verified' | 'estimated' | 'community';
  source: string;          // VerifiedSource in Stride — see confidenceToSource()
  verified: boolean;
}

export interface StrideRestaurantDraft {
  id: string;
  name: string;
  emoji: string;
  cuisine: string;
  serviceTypes: string[];  // Stride's ServiceType: dine_in | grab_go | delivery
  aliases: string[];
  menu: StrideMenuItemDraft[];
  dietTags: string[];
  priceRange: string;
  outletType: string;
  tier: 'full_menu' | 'partial_menu' | 'estimated_menu' | 'place_only';
  hawkerLocation?: string;
  sfaLicenceType?: 'food_shop' | 'food_stall' | 'hawker_stall' | 'supermarket' | 'none';
  sfaLicenceNo?: string;
}

/** self_cook has no Stride equivalent (Stride has no home-cooked outlet concept) — dropped. */
function platformsToServiceTypes(platforms: Platform[]): string[] {
  const mapped = platforms.filter((p): p is Exclude<Platform, 'self_cook'> => p !== 'self_cook');
  return mapped.length ? mapped : ['grab_go'];
}

function confidenceToSource(confidence: FoodOption['confidence']): string {
  if (confidence === 'verified') return 'official_sg';
  if (confidence === 'community') return 'community';
  return 'ai_estimate';
}

function outletTypeToSfaLicenceType(type: Outlet['type']): StrideRestaurantDraft['sfaLicenceType'] {
  switch (type) {
    case 'hawker': return 'hawker_stall';
    case 'food_court_stall': return 'food_stall';
    case 'supermarket': return 'supermarket';
    case 'restaurant': case 'food_court': case 'coffeeshop': case 'canteen': case 'grab_go':
      return 'food_shop';
    default: return 'none';
  }
}

function tierFromItems(items: FoodOption[]): StrideRestaurantDraft['tier'] {
  if (items.every((i) => i.confidence === 'verified')) return 'full_menu';
  if (items.some((i) => i.confidence === 'verified')) return 'partial_menu';
  return 'estimated_menu';
}

/** Convert one Outlet + its FoodOptions into a Stride-shaped restaurant draft. */
export function exportOutletToStride(outlet: Outlet, items: FoodOption[]): StrideRestaurantDraft {
  return {
    id: outlet.id,
    name: outlet.name,
    emoji: outlet.emoji,
    cuisine: outlet.cuisine,
    serviceTypes: platformsToServiceTypes(outlet.platforms),
    aliases: outlet.aliases,
    dietTags: outlet.dietTags,
    priceRange: outlet.priceRange,
    outletType: outlet.type,
    tier: tierFromItems(items),
    hawkerLocation: outlet.location,
    sfaLicenceType: outletTypeToSfaLicenceType(outlet.type),
    sfaLicenceNo: outlet.sfa?.licenceNumber,
    menu: items.map((item) => ({
      id: item.id,
      name: item.name,
      emoji: item.emoji,
      price: item.price,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      category: item.category,
      compatibleWith: item.compatibleWith,
      isPopular: item.isPopular,
      confidence: item.confidence,
      source: confidenceToSource(item.confidence),
      verified: item.confidence === 'verified',
    })),
  };
}

/** Convert the full PlateScreen dataset into Stride-shaped restaurant drafts, grouped by outlet. */
export function exportAllToStride(outlets: Outlet[], foodOptions: FoodOption[]): StrideRestaurantDraft[] {
  const byOutlet = new Map<string, FoodOption[]>();
  for (const item of foodOptions) {
    const list = byOutlet.get(item.outletId) ?? [];
    list.push(item);
    byOutlet.set(item.outletId, list);
  }
  return outlets
    .filter((o) => o.type !== 'home_cooked') // no Stride equivalent — self-cook recipes stay PlateScreen-only
    .map((o) => exportOutletToStride(o, byOutlet.get(o.id) ?? []));
}
