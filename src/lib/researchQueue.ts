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
    status: "pending",
    notes: "NTUC operator. Food Shop Licence (food court). Use HPB nutrient data."
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
    status: "pending",
    notes: "Food Shop Licence (food court). Use HPB nutrient data for stall dishes."
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
    notes: "2026-08-10 scheduled run: only matching SG business found was 'Soul Green', a single-location fresh fruit/juice shop at Eastpoint Mall (Simei), which closed in 2023 per web search. No menu, pricing, or nutrition data available anywhere online. Left pending per no-fabrication rule — see reference/research-sessions/2026-08-10-soulgreen.md."
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
    status: "pending"
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
