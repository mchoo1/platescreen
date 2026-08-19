import type { ResearchQueueEntry } from '@/types/db';

/**
 * Work queue for the weekly research task. Each entry is a known Singapore
 * food outlet/chain not yet added to outlets.ts/foodOptions.ts.
 *
 * Workflow: the scheduled task picks the highest-priority 'pending' entry,
 * researches it (cross-referencing the SFA/data.gov.sg licensed-establishment
 * dataset for hawker/food_court_stall types — see SfaRegistration in
 * types/db.ts — plus official nutrition sources for macros), adds the
 * resulting Outlet + FoodOption records, then flips status to 'researched'.
 */
export const RESEARCH_QUEUE: ResearchQueueEntry[] = [
  {
    id: "coffeesmith",
    name: "Coffeesmith",
    aliases: [
      "coffeesmith"
    ],
    type: "grab_go",
    cuisine: "Coffee",
    priority: "low",
    status: "pending"
  },
  {
    id: "hollin",
    name: "Hollin",
    aliases: [
      "hollin"
    ],
    type: "grab_go",
    cuisine: "Milk Tea",
    priority: "low",
    status: "pending"
  },
  {
    id: "four_leaves",
    name: "Four Leaves",
    aliases: [
      "four leaves"
    ],
    type: "grab_go",
    cuisine: "Bakery",
    priority: "low",
    status: "pending"
  },
  {
    id: "bengawan_solo",
    name: "Bengawan Solo",
    aliases: [
      "bengawan solo"
    ],
    type: "grab_go",
    cuisine: "Nyonya Kueh",
    priority: "low",
    status: "pending"
  },
  {
    id: "swensen_s",
    name: "Swensen's",
    aliases: [
      "swensen's",
      "swensens"
    ],
    type: "restaurant",
    cuisine: "Ice Cream / Western",
    priority: "low",
    status: "pending"
  },
  {
    id: "kopitiam",
    name: "Kopitiam",
    aliases: [
      "kopitiam"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "high",
    status: "researched",
    notes: "Food Shop Licence (food court). Use HPB nutrient data for stall dishes."
  },
  {
    id: "koufu",
    name: "Koufu",
    aliases: [
      "koufu"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "high",
    status: "researched",
    notes: "Food Shop Licence (food court). Use HPB nutrient data for stall dishes."
  },
  {
    id: "foodfare",
    name: "Foodfare",
    aliases: [
      "foodfare",
      "ntuc foodfare"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "high",
    status: "researched",
    notes: "NTUC operator. Food Shop Licence (food court). Use HPB nutrient data. Researched 2026-08-12: 8 representative food-court dishes added (economy rice, chicken rice, laksa, mee siam, wonton noodle, carrot cake, curry chicken rice, tau huay), confidence 'estimated' from generic HPB/NutriKaki-style hawker dish nutrient estimation — same methodology as sibling operators Kopitiam/Koufu. No SFA lookup (operator brand, not tied to one premises)."
  },
  {
    id: "banquet",
    name: "Banquet",
    aliases: [
      "banquet"
    ],
    type: "food_court",
    cuisine: "Food Court",
    priority: "high",
    status: "researched",
    notes: "Food Shop Licence (food court). Use HPB nutrient data for stall dishes. Researched 2026-08-13: 9 representative dishes added (chicken rice, nasi lemak, mee rebus, chicken briyani, yong tau foo, chicken shawarma wrap, roti prata, ayam penyet, rojak), confidence 'estimated' via generic HPB/NutriKaki-style hawker dish nutrient estimation — same methodology as sibling operators Kopitiam/Koufu/Foodfare. Banquet is documented (Zabihah, operator listings) as an all-halal-certified food court chain (Jurong Point, Woodlands Square, VivoCity), so dietTags: ['halal'] set at outlet level and every dish tagged halal + no_pork — a step beyond the other operator entries, justified by that outlet-wide certification fact rather than guessed. No SFA lookup (operator brand, not tied to one premises)."
  },
  {
    id: "ok_convenience",
    name: "OK Convenience",
    aliases: [
      "ok convenience",
      "ok store"
    ],
    type: "ready_to_eat",
    cuisine: "Convenience",
    priority: "low",
    status: "pending"
  },
  {
    id: "grain",
    name: "Grain",
    aliases: [
      "grain"
    ],
    type: "grab_go",
    cuisine: "Healthy",
    priority: "high",
    status: "researched",
    notes: "Nutrition data in docs/food-data/grab-and-go/grain_sg.json — id already present in outlets.ts as of 2026-08-10 scheduled run; no new record added, status corrected to researched."
  },
  {
    id: "saladbox",
    name: "Saladbox",
    aliases: [
      "saladbox"
    ],
    type: "grab_go",
    cuisine: "Salads",
    priority: "medium",
    status: "researched",
    notes: "Nutrition data in docs/food-data/grab-and-go/saladbox_sg.json — id already present in outlets.ts as of 2026-08-10 scheduled run; no new record added, status corrected to researched."
  },
  {
    id: "soulgreen",
    name: "Soulgreen",
    aliases: [
      "soulgreen",
      "soul green"
    ],
    type: "grab_go",
    cuisine: "Healthy",
    priority: "medium",
    status: "pending",
    notes: "Re-checked 2026-08-12 (third consecutive dead end — same result as 2026-08-10 and 2026-08-11 runs): only matching SG business is 'Soul Green', a single-location fresh fruit/juice shop at Eastpoint Mall (Simei), closed since 2023. A 'Soulgreen' brand exists but is UAE-based (soulgreen.ae, a supplement product line), unrelated to SG. No menu, pricing, or nutrition data available anywhere online across three independent search passes. Left pending per no-fabrication rule — see reference/research-sessions/2026-08-12-soulgreen.md. Strongly recommend human review to remove or replace this queue entry — further automated re-attempts are very unlikely to yield new data."
  },
  {
    id: "ichiban_boshi",
    name: "Ichiban Boshi",
    aliases: [
      "ichiban boshi",
      "ichiban"
    ],
    type: "restaurant",
    cuisine: "Japanese",
    priority: "medium",
    status: "researched",
    notes: "Researched 2026-08-20: no official SG nutrition PDF/HPB entry found for this full-service Japanese restaurant chain (RE&S group) — HPB's Nutrition Information Centre does not cover it. 10 representative items added across Donburi/Jyu/Udon/Salad/Bento Sides categories (chicken katsu don, chicken teriyaki don, beef teriyaki don, black pepper salmon don, unajyu, salmon sashimi salad, tori karaage, tempura udon, chirashi jyu, edamame), prices sourced from sgmenuprice.net menu listing (Feb 2024, cross-checked against pricelisto.com). Macros are reasoned estimates from close analogs (typical Japanese-restaurant donburi/udon/sashimi nutrition profiles) — confidence 'estimated' for all except edamame ('community', generic single-ingredient value). Outlet confirmed NOT halal-certified per source article, so dietTags left empty rather than guessed; compatibleWith only tags pescatarian/gluten_free/vegan/etc. where confirmable from dish composition (e.g. fish-only dishes, plain edamame). No SFA lookup — type is 'restaurant', not hawker/food_court_stall. Note for human review: unrelated to this entry, spotted that 'saizeriya' (still flagged 'pending' in this queue) already has a matching id present in outlets.ts — looks like a stale queue status from an earlier run, left untouched as out of scope for this task."
  },
  {
    id: "saizeriya",
    name: "Saizeriya",
    aliases: [
      "saizeriya"
    ],
    type: "restaurant",
    cuisine: "Italian / Japanese",
    priority: "medium",
    status: "pending",
    notes: "Japanese-Italian chain, nutrition PDF on website"
  },
  {
    id: "gen_korean_bbq",
    name: "Gen Korean BBQ",
    aliases: [
      "gen korean bbq",
      "gen bbq"
    ],
    type: "restaurant",
    cuisine: "Korean BBQ",
    priority: "low",
    status: "pending"
  },
  {
    id: "tgi_fridays",
    name: "TGI Fridays",
    aliases: [
      "tgi fridays",
      "tgif"
    ],
    type: "restaurant",
    cuisine: "Western",
    priority: "low",
    status: "pending"
  },
  {
    id: "eighteen_chefs",
    name: "Eighteen Chefs",
    aliases: [
      "eighteen chefs",
      "18 chefs"
    ],
    type: "restaurant",
    cuisine: "Western",
    priority: "low",
    status: "pending"
  }
];
