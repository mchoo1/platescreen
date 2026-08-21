// Generated 2026-08-20 — food-court/coffeeshop OPERATING companies (see Operator in types/db.ts).
// Reference table only; Kopitiam/Koufu/NTUC Foodfare's own Brand+Premises rows (in brands.ts/
// premises.ts) are what actually renders. Banquet returned no confident SFA licensee match
// this session — left absent rather than guessed; a future pass could retry with a different
// corporate-entity search term.

export const OPERATORS = [
  {
    id: "kopitiam",
    name: "Kopitiam",
    type: "food_court_operator"
  },
  {
    id: "koufu",
    name: "Koufu",
    type: "food_court_operator"
  },
  {
    id: "foodfare",
    name: "NTUC Foodfare",
    type: "food_court_operator"
  },
  {
    id: "hawkers_street",
    name: "Hawkers' Street",
    type: "food_court_operator"
  }
];
