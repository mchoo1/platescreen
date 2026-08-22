// Generated 2026-08-20 — food-court/coffeeshop OPERATING companies (see Operator in types/db.ts).
// Reference table only; Kopitiam/Koufu/NTUC Foodfare's own Brand+Premises rows (in brands.ts/
// premises.ts) are what actually renders. Banquet returned no confident SFA licensee match
// this session — left absent rather than guessed; a future pass could retry with a different
// corporate-entity search term. UPDATE 2026-08-23: Banquet has since been confirmed defunct
// (widely reported as bankrupt/closed; its former locations are now largely operated as "Bagus" /
// "Bagus Food Hall" under Kopitiam — see reference/research-sessions/2026-08-23-other-food-court-operators.md)
// so it's intentionally left out rather than added as a dead operator. food_junction added same day
// (BreadTalk Group's food-court chain, 8 SG venues, own named house-brand concessions).
// canopy_hawkers added 2026-08-23 (NEA-appointed hawker centre operator, currently running Bukit
// Canberra Hawker Centre; news reports say it's also taking over Yishun Park Hawker Centre from
// Jul 2026) — this is a standalone NEA hawker centre operator, not a coffeeshop chain, but modeled
// the same way as Kopitiam/Fei Siong since it operates a shared venue housing many
// independently-named stalls. timbre_plus_hawkers also added 2026-08-23 — Yishun Park Hawker
// Centre's own website (yishunparkhc.sg) still identifies itself as Timbre+ Hawkers Pte Ltd
// (Timbre Group branding throughout, footer contact is @timbregroup.asia) despite the Canopy
// Hawkers handover reported in the news — the stall roster was sourced directly from that site,
// so the operator here reflects what the site itself says, not the reported incoming operator;
// see reference/research-sessions/2026-08-23-bukit-canberra-yishun-park-hawker-centres.md.
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
  },
  {
    id: "food_junction",
    name: "Food Junction",
    type: "food_court_operator"
  },
  {
    id: "fei_siong",
    name: "Fei Siong Group",
    type: "food_court_operator"
  },
  {
    id: "canopy_hawkers",
    name: "Canopy Hawkers Group",
    type: "food_court_operator"
  },
  {
    id: "timbre_plus_hawkers",
    name: "Timbre+ Hawkers",
    type: "food_court_operator"
  }
];
