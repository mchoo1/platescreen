/**
 * Haversine distance + a static rep-outlet coordinate map, ported verbatim
 * (logic + values) from stride-app's EatPageClient.tsx so "near me" distance
 * sorting matches the main Stride app. One representative point per chain;
 * hawker/food-court stalls use their parent centre's coordinates.
 */

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// One representative coordinate per restaurant/chain id (matches SGRestaurant.id).
export const RESTAURANT_STATIC_COORDS: Record<string, [number, number]> = {
  mcd:                 [1.3006, 103.8368], // Orchard
  kfc:                 [1.3000, 103.8380], // Orchard
  bk:                  [1.2906, 103.8557], // Marina Square
  subway:              [1.3004, 103.8363], // Orchard
  old_chang_kee:       [1.2913, 103.8524], // City Hall
  ya_kun:              [1.2840, 103.8488], // Raffles Place
  gong_cha:            [1.3008, 103.8355], // Orchard
  breadtalk:           [1.3006, 103.8360], // ION Orchard
  '7eleven':           [1.3000, 103.8500], // Central SG
  grain:               [1.2758, 103.8435], // Tanjong Pagar
  stuffd:              [1.3009, 103.8361], // Orchard
  aw:                  [1.2942, 103.8579], // Suntec City
  jollibee:            [1.3003, 103.8445], // Plaza Singapura
  toast_box:           [1.2840, 103.8502], // Raffles Place
  starbucks_sg:        [1.3006, 103.8373], // Orchard
  pizza_hut:           [1.3510, 103.8490], // Bishan
  shake_shack:         [1.3042, 103.8322], // ION Orchard
  five_guys:           [1.3597, 103.9897], // Jewel Changi
  popeyes:             [1.3003, 103.8445], // Plaza Singapura
  nandos:              [1.2635, 103.8222], // VivoCity
  dominos:             [1.3072, 103.7895], // Buona Vista
  wingstop:            [1.3003, 103.8445], // Plaza Singapura
  gyg:                 [1.3009, 103.8361], // Orchard
  krispy_kreme:        [1.3336, 103.7437], // Westgate
  auntie_annes:        [1.2635, 103.8222], // VivoCity
  texas_chicken:       [1.3326, 103.8469], // Toa Payoh
  carl_jr:             [1.3507, 103.8491], // Junction 8
  mos_burger:          [1.3006, 103.8368], // Orchard
  genki_sushi:         [1.3401, 103.7057], // Jurong Point
  coffee_bean:         [1.3007, 103.8370], // Orchard
  soup_spoon:          [1.2800, 103.8540], // Marina Bay
  daily_cut:           [1.2785, 103.8436], // Tanjong Pagar
  yoshinoya:           [1.3005, 103.8370], // Orchard
  saizeriya:           [1.3699, 103.8459], // AMK Hub
  mccafe:              [1.3006, 103.8368], // Orchard (same as mcd)
  astons:              [1.3008, 103.9132], // East Coast
  liho:                [1.3008, 103.8360], // Orchard
  koi:                 [1.3008, 103.8360], // Orchard
  chagee:              [1.3009, 103.8361], // Orchard
  mixue:               [1.3009, 103.8361], // Orchard
  dosirak:             [1.3009, 103.8361], // Orchard
  makisan:             [1.2816, 103.8484], // CBD
  project_acai:        [1.3009, 103.8361], // Orchard
  nourish_bowl:        [1.2816, 103.8484], // CBD
  superfood_kitchen:   [1.2816, 103.8484], // CBD
  boost_juice:         [1.2635, 103.8222], // VivoCity
  fairprice_xpress:    [1.3000, 103.8500], // Central SG
  cheers:              [1.3000, 103.8490], // Central SG
  saladstop:           [1.2816, 103.8484], // CBD
  saladbox:            [1.2816, 103.8484], // CBD
  paris_baguette:      [1.3009, 103.8361], // Orchard
  sushi_express:       [1.3009, 103.8361], // Orchard
  dunkin:              [1.3009, 103.8361], // Orchard
  bonchon:             [1.3597, 103.9897], // Jewel Changi
  llaollao:            [1.3009, 103.8361], // Orchard
  wendys:              [1.3009, 103.8360], // Central SG

  // ── Maxwell Food Centre stalls ──────────────────────────────────────────────
  tian_tian_chicken_rice:     [1.2800, 103.8450],
  maxwell_wonton_mee:         [1.2800, 103.8450],
  maxwell_laksa:              [1.2800, 103.8450],
  maxwell_char_kway_teow:     [1.2800, 103.8450],
  maxwell_popiah:             [1.2800, 103.8450],
  maxwell_carrot_cake:        [1.2800, 103.8450],
  maxwell_oyster_omelette:    [1.2800, 103.8450],
  maxwell_rojak:              [1.2800, 103.8450],
  maxwell_drinks_desserts:    [1.2800, 103.8450],

  // ── Lau Pa Sat Festival Market stalls ──────────────────────────────────────
  lau_pa_sat_satay_street:    [1.2802, 103.8502],
  lau_pa_sat_oyster_omelette: [1.2802, 103.8502],
  lau_pa_sat_seng_kee:        [1.2802, 103.8502],
  lau_pa_sat_lao_fu_zi_ckt:   [1.2802, 103.8502],
  lau_pa_sat_prawn_noodles:   [1.2802, 103.8502],
  lau_pa_sat_bak_chor_mee:    [1.2802, 103.8502],
  lau_pa_sat_chicken_rice:    [1.2802, 103.8502],
  lau_pa_sat_rojak:           [1.2802, 103.8502],
  lau_pa_sat_butter_cream:    [1.2802, 103.8502],
  lau_pa_sat_creme_cone:      [1.2802, 103.8502],
  lau_pa_sat_warong_pak_sapari:[1.2802, 103.8502],
  lau_pa_sat_taliwang:        [1.2802, 103.8502],
  lau_pa_sat_maya_veggie:     [1.2802, 103.8502],
  lau_pa_sat_lixin_fishball:  [1.2802, 103.8502],
  lau_pa_sat_feng_xiang_bkt:  [1.2802, 103.8502],

  // ── Newton Food Centre stalls ───────────────────────────────────────────────
  newton_satay_stall:         [1.3127, 103.8383],
  newton_bbq_seafood:         [1.3127, 103.8383],
  newton_hokkien_mee:         [1.3127, 103.8383],
  newton_prawn_noodles:       [1.3127, 103.8383],
  newton_oyster_omelette:     [1.3127, 103.8383],
  newton_carrot_cake:         [1.3127, 103.8383],
  newton_char_kway_teow:      [1.3127, 103.8383],
  newton_drinks_stall:        [1.3127, 103.8383],

  // ── Chinatown Complex stalls ────────────────────────────────────────────────
  cc_roast_meats_stall:       [1.2826, 103.8441],
  cc_claypot_rice_stall:      [1.2826, 103.8441],
  cc_kway_chap_stall:         [1.2826, 103.8441],
  cc_wonton_mee_stall:        [1.2826, 103.8441],
  cc_ban_mian_stall:          [1.2826, 103.8441],
  cc_bak_chor_mee_stall:      [1.2826, 103.8441],
  cc_char_kway_teow_stall:    [1.2826, 103.8441],
  cc_rice_noodle_rolls:       [1.2826, 103.8441],
  cc_desserts_stall:          [1.2826, 103.8441],
  cc_kopi_stall:              [1.2826, 103.8441],

  // ── Tekka Centre stalls ─────────────────────────────────────────────────────
  tekka_prata_stall:          [1.3065, 103.8509],
  tekka_thosai_stall:         [1.3065, 103.8509],
  tekka_murtabak_stall:       [1.3065, 103.8509],
  tekka_briyani_stall:        [1.3065, 103.8509],
  tekka_nasi_lemak_stall:     [1.3065, 103.8509],
  tekka_mee_goreng_stall:     [1.3065, 103.8509],
  tekka_rojak_stall:          [1.3065, 103.8509],
  tekka_drinks_stall:         [1.3065, 103.8509],

  // ── Old Airport Road Food Centre stalls ────────────────────────────────────
  oar_char_kway_teow:         [1.3149, 103.8896],
  oar_hokkien_mee:            [1.3149, 103.8896],
  oar_prawn_noodles:          [1.3149, 103.8896],
  oar_bak_chor_mee:           [1.3149, 103.8896],
  oar_roast_duck_rice:        [1.3149, 103.8896],
  oar_economic_rice:          [1.3149, 103.8896],
  oar_laksa:                  [1.3149, 103.8896],
  oar_wonton_mee:             [1.3149, 103.8896],
  oar_popiah:                 [1.3149, 103.8896],
  oar_oyster_omelette:        [1.3149, 103.8896],
  oar_desserts_drinks:        [1.3149, 103.8896],

  // ── Golden Mile Food Centre stalls ─────────────────────────────────────────
  gmfc_chicken_rice:          [1.3071, 103.8649],
  gmfc_bak_kut_teh:           [1.3071, 103.8649],
  gmfc_char_kway_teow:        [1.3071, 103.8649],
  gmfc_hokkien_mee:           [1.3071, 103.8649],
  gmfc_laksa:                 [1.3071, 103.8649],
  gmfc_prawn_noodles:         [1.3071, 103.8649],
  gmfc_satay_stall:           [1.3071, 103.8649],
  gmfc_snacks_stall:          [1.3071, 103.8649],
  gmfc_desserts_drinks:       [1.3071, 103.8649],

  // ── Geylang Serai Market stalls ────────────────────────────────────────────
  gsm_nasi_lemak_stall:       [1.3189, 103.8924],
  gsm_briyani_stall:          [1.3189, 103.8924],
  gsm_nasi_padang_stall:      [1.3189, 103.8924],
  gsm_ayam_penyet_stall:      [1.3189, 103.8924],
  gsm_lontong_stall:          [1.3189, 103.8924],
  gsm_murtabak_stall:         [1.3189, 103.8924],
  gsm_mee_stall:              [1.3189, 103.8924],
  gsm_beehoon_stall:          [1.3189, 103.8924],
  gsm_rojak_stall:            [1.3189, 103.8924],
  gsm_desserts_drinks:        [1.3189, 103.8924],

  // ── Whampoa Drive Makan Place stalls ───────────────────────────────────────
  whampoa_chicken_rice:       [1.3177, 103.8563],
  whampoa_economic_rice:      [1.3177, 103.8563],
  whampoa_laksa:              [1.3177, 103.8563],
  whampoa_bak_chor_mee:       [1.3177, 103.8563],
  whampoa_ban_mian:           [1.3177, 103.8563],
  whampoa_wonton_mee:         [1.3177, 103.8563],
  whampoa_char_kway_teow:     [1.3177, 103.8563],
  whampoa_hokkien_mee:        [1.3177, 103.8563],
  whampoa_prata_stall:        [1.3177, 103.8563],
  whampoa_desserts_drinks:    [1.3177, 103.8563],

  // ── Auto-generated hawker centres (NEA data) ───────────────────────────────
  commonwealth_crescent_market:              [1.3041, 103.7966],
  tiong_bahru_market:                        [1.2846, 103.8272],
  dunman_food_centre:                        [1.3161, 103.8896],
  beo_crescent_market:                       [1.2881, 103.8205],
  adam_road_food_centre:                     [1.3262, 103.8106],
  kallang_estate_fresh_market_and_food_centre:[1.3113, 103.8633],
  peoples_park_food_centre:                  [1.2826, 103.8441],
  north_bridge_road_market:                  [1.3005, 103.8600],
  holland_village_market_and_food_centre:    [1.3118, 103.7963],
  chomp_chomp_food_centre:                   [1.3693, 103.8720],
  yuhua_village_market_and_food_centre:      [1.3432, 103.7353],
  jurong_west_street_52_blk_505:             [1.3480, 103.7073],
  '84_marine_parade_central_market_and_food_centre': [1.3037, 103.9103],
  kampung_admiralty_hawker_centre:           [1.4415, 103.8014],
  market_street_hawker_centre:               [1.2826, 103.8493],
  marsiling_mall_hawker_centre:              [1.4318, 103.7776],
  mei_chin_road_market:                      [1.2731, 103.8105],
  pasir_ris_central_hawker_centre:           [1.3729, 103.9494],
  albert_centre:                             [1.3049, 103.8564],
  redhill_food_centre:                       [1.2843, 103.8181],
  taman_jurong_market_and_food_centre:       [1.3356, 103.7205],
  tampines_round_market_and_food_centre:     [1.3459, 103.9412],
  telok_blangah_food_centre:                 [1.2695, 103.8049],
  toa_payoh_vista_market:                    [1.3345, 103.8498],
  blk_6_tanjong_pagar_plaza_market_and_food_centre: [1.2774, 103.8427],
  kim_keat_palm_market_and_food_centre:      [1.3393, 103.8561],
  shunfu_mart:                               [1.3561, 103.8362],
  kebun_baru_market_and_food_centre:         [1.3732, 103.8292],
  teck_ghee_square:                          [1.3680, 103.8533],
  chong_boon_market_and_food_centre:         [1.3686, 103.8542],
  ang_mo_kio_628_market:                     [1.3742, 103.8435],
  bedok_north_street_1_blk_216:              [1.3296, 103.9330],
  '85_fengshan_centre':                      [1.3291, 103.9214],
  bendemeer_market_and_food_centre:          [1.3141, 103.8620],
  boon_lay_place_market_and_food_village:    [1.3456, 103.7040],
  bukit_merah_central_food_centre:           [1.2828, 103.8224],
  alexandra_village_food_centre:             [1.2775, 103.8157],
  pek_kio_market_and_food_centre:            [1.3133, 103.8441],
  bukit_panjang_hawker_centre:               [1.3807, 103.7630],
  changi_village_blk_2_and_3:               [1.3897, 103.9882],
  '80_circuit_road_market_and_food_centre':  [1.3355, 103.8735],
  ci_yuan_hawker_centre:                     [1.3761, 103.8922],
  clementi_ave_2_market_cooked_food_centre:  [1.3131, 103.7637],
  empress_road_market_and_food_centre:       [1.3075, 103.8063],
  blk_69_geylang_bahru_market_and_food_centre:[1.3236, 103.8620],
  ghim_moh_road_blk_20:                      [1.3108, 103.7876],
  haig_road_market_and_cooked_food_centre:   [1.3072, 103.8936],
  havelock_road_cooked_food_centre:          [1.2913, 103.8361],
  hawker_centre_our_tampines_hub:            [1.3544, 103.9385],
  kovan_hougang_market_and_food_centre:      [1.3739, 103.8896],
  hougang_105_hainanese_village_centre:      [1.3705, 103.8823],
  abc_brickworks_market_food_centre:         [1.2806, 103.8189],
  kukoh_21_food_centre:                      [1.2841, 103.8422],
  jurong_west_hawker_centre:                 [1.3480, 103.7073],
  yuhua_market_and_hawker_centre:            [1.3432, 103.7353],
  blk_17_upper_boon_keng_market_and_food_centre:[1.3178, 103.8706],
  ayer_rajah_food_centre:                    [1.3068, 103.7672],
  hong_lim_food_centre_and_market:           [1.2826, 103.8441],
  yishun_park_hawker_centre:                 [1.4271, 103.8362],
  chong_pang_market_and_food_centre:         [1.4362, 103.8386],
  margaret_drive_hawker_centre:              [1.2931, 103.8124],
  anchorvale_village_hawker_centre:          [1.3978, 103.8925],
  one_punggol_hawker_centre:                 [1.4050, 103.9019],
  bukit_canberra_hawker_centre:              [1.4413, 103.8202],
  buangkok_hawker_centre:                    [1.3896, 103.8822],
  bukit_batok_west_hawker_centre:            [1.3497, 103.7524],
  woodleigh_village_hawker_centre:           [1.3333, 103.8648],
  telok_ayer_food_centre:                    [1.2797, 103.8474],
  pasir_panjang_food_centre:                 [1.2860, 103.7947],
  bedok_food_centre:                         [1.3262, 103.9271],
  zion_riverside_food_centre:                [1.2892, 103.8219],
  east_coast_lagoon_food_village:            [1.3073, 103.9200],
  serangoon_garden_market:                   [1.3686, 103.8682],
  tanglin_halt_market:                       [1.3033, 103.7994],
  berseh_food_centre:                        [1.3072, 103.8562],
  senja_hawker_centre:                       [1.3807, 103.7639],
  fernvale_hawker_centre_market:             [1.3939, 103.8771],
  bukit_timah_interim_hawker_centre_and_market:[1.3376, 103.7814],
};

export function getUserLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });
}
