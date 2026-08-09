"""
Match PlateScreen's hawker/food_court_stall Outlets against real SFA licensed-
establishment data, populating the Outlet.sfa field (see src/types/db.ts).

Run 2026-08-09 against 8 xlsx exports from the SFA Track Records tool
(https://www.sfa.gov.sg/tools-and-resources/track-records), combined into
52,093 unique licensed establishments (deduped by Licence Number). The raw
combined dataset (~17MB) is NOT checked in — re-export from SFA and rerun
combine+decode if you need to redo this.

Result: 32 / 231 hawker/food_court_stall outlets matched (~14%). Coverage is
intentionally conservative — see notes below on why most outlets can't be
matched, and the false-positive bugs found and fixed during development
(kept as comments so the next person doesn't repeat them):

1. "Whole hawker centre" outlets (114 of 231, e.g. "Tiong Bahru Market") map
   to MANY individual stall licences, not one. These get a centre-level
   record: representative premisesAddress + grade='not_applicable' (centres
   aren't graded, only their stalls are), no single licenceNumber.
2. Generic food-court-operator archetypes (27 outlets, e.g. "Koufu Chicken
   Rice Stall") aren't tied to any one physical premises — Koufu alone runs
   50+ locations. Left unmatched entirely; forcing a match would be wrong.
3. Named stalls at 9 real curated hawker centres (Maxwell, Lau Pa Sat, etc.,
   ~90 outlets) get token-overlap dish matching against SFA candidates
   filtered to that centre's address. Two real bugs were found and fixed
   here before trusting results:
     - Stripping "generic" words from a centre name to build a shorter
       search key (e.g. "Market Street Hawker Centre" -> "STREET") over-
       matched thousands of unrelated addresses. Fix: only search the FULL
       centre name, never a stripped fragment.
     - A plain stopword-block-list still let through incidental non-food
       words (e.g. "old" from "(Old Airport Rd)", "little india" from an
       alias meant for GPS matching) causing multiple different dishes to
       all "match" the same random unrelated business. Fix: switched to a
       DISH_VOCAB allowlist — only genuine food/dish words count toward a
       match, and require 2+ overlapping dish words minimum.
   Remaining unmatched here mostly failed the tie-break (multiple stalls at
   the centre share the same one dish keyword) or scored below the
   confidence threshold — left unmatched rather than guessing.
"""

import json, re
from collections import Counter

sfa = json.load(open('/tmp/sfa/combined.json'))
outlets = json.load(open('/tmp/sfa/plate_hawker_outlets.json'))

GRADE_MAP = {
    'A': 'A', 'B': 'B', 'C': 'C', 'New': 'New',
    'Not Under SAFE': 'not_applicable',
    'A (Under Review)': 'A', 'B (Under Review)': 'B', 'New (Under Review)': 'New',
}

CENTRE_KEYWORDS = {
    'Maxwell Food Centre': 'MAXWELL',
    'Lau Pa Sat Festival Market': 'LAU PA SAT',
    'Newton Food Centre': 'NEWTON',
    'Chinatown Complex Food Centre': 'CHINATOWN COMPLEX',
    'Tekka Market': 'TEKKA',
    'Old Airport Road Food Centre': 'OLD AIRPORT',
    'Golden Mile Food Centre': 'GOLDEN MILE',
    'Geylang Serai Market & Food Centre': 'GEYLANG SERAI',
    'Whampoa Makan Place': 'WHAMPOA',
}
GENERIC_ARCHETYPES = {'Koufu', 'Kopitiam', 'NTUC Foodfare', 'Banquet'}

# Generic + location/address noise words that must NEVER count as a dish-match
# token — otherwise e.g. every "(Old Airport Rd)" stall spuriously "matches"
# any random business literally named "Old ...", via the shared word "old".
STOPWORDS = {
    'stall', 'corner', 'the', 'and', 'centre', 'center', 'fc', 'market',
    'food', 'a', 'of', 'street', 'drinks', 'desserts', '&', 'place',
    'maxwell', 'lau', 'pa', 'sat', 'newton', 'tekka', 'old', 'airport', 'road',
    'chinatown', 'complex', 'golden', 'mile', 'geylang', 'serai', 'whampoa',
    'drive', 'makan', 'zhujiao', 'buffalo', 'raffles', 'quay', 'beach',
    'lps', 'oar', 'gmfc', 'gsm', 'cc', 'rd',
}

# Allowlist of genuine Singapore hawker/dish vocabulary. Matching is
# restricted to THIS set (not just "any non-stopword") after finding that
# generic non-food words leaking through from aliases — neighbourhood names
# like "little india", building words like "old" — produced confident-looking
# but wrong matches (e.g. 6 different Tekka dishes all "matching" the same
# random "Little India Hot & Cold Drinks" stall via the shared words "little
# india", which is just the area name, not a dish descriptor).
DISH_VOCAB = {
    'chicken', 'rice', 'laksa', 'wonton', 'mee', 'noodle', 'noodles', 'prawn',
    'char', 'kway', 'teow', 'hokkien', 'carrot', 'cake', 'oyster', 'omelette',
    'orh', 'luak', 'rojak', 'satay', 'sate', 'prata', 'roti', 'briyani',
    'biryani', 'murtabak', 'thosai', 'dosai', 'vadai', 'nasi', 'lemak',
    'popiah', 'duck', 'roast', 'economic', 'economy', 'bak', 'chor', 'curry',
    'fish', 'porridge', 'congee', 'seafood', 'soup', 'kopi', 'teh', 'tarik',
    'dessert', 'desserts', 'cream', 'butter', 'bbq', 'stingray', 'wing',
    'wings', 'chendol', 'cendol', 'hainanese', 'penyet', 'lontong', 'beehoon',
    'claypot', 'chap', 'ban', 'mian', 'kueh', 'ckt', 'bkt', 'padang', 'ayam',
    'goreng', 'lor', 'yong', 'tau', 'foo', 'chwee', 'kway', 'chee', 'cheong',
    'fun', 'satay', 'ngoh', 'hiang', 'otah', 'putu', 'mayam', 'ice', 'kacang',
    'chendol', 'bandung', 'sugarcane', 'soya', 'bean', 'peanut', 'pancake',
    'apom', 'balling',
}

def tokens(s):
    s = re.sub(r'\([^)]*\)', ' ', s)  # strip "(Maxwell FC)" etc
    s = re.sub(r'[^a-zA-Z0-9 ]', ' ', s).lower()
    return {w for w in s.split() if w and w not in STOPWORDS and len(w) > 2}

def dish_tokens(s):
    return tokens(s) & DISH_VOCAB

# Pre-index SFA rows by uppercase address for substring search
for r in sfa:
    r['_addr_u'] = (r.get('Establishment Address') or '').upper()
    r['_biz_u'] = (r.get('Business Name') or '') or ''
    r['_lic_u'] = (r.get('Licensee Name') or '') or ''
    r['_name_tokens'] = dish_tokens(r['_biz_u']) | dish_tokens(r['_lic_u'])

matches = {}
unmatched_reasons = {}

for o in outlets:
    loc = o.get('location')
    name_toks = dish_tokens(o['name'])
    alias_toks = set()
    for a in o.get('aliases', []):
        alias_toks |= dish_tokens(a)
    search_toks = name_toks | alias_toks

    if loc in GENERIC_ARCHETYPES or loc is None and o['name'] in GENERIC_ARCHETYPES:
        unmatched_reasons[o['id']] = 'generic food-court-operator archetype — not tied to one physical premises'
        continue

    if loc and loc in CENTRE_KEYWORDS:
        kw = CENTRE_KEYWORDS[loc]
        candidates = [r for r in sfa if kw in r['_addr_u']]
        if not candidates:
            unmatched_reasons[o['id']] = f'no SFA records found for centre keyword "{kw}"'
            continue
        # score candidates by token overlap with dish name/aliases
        scored = []
        for r in candidates:
            overlap = search_toks & r['_name_tokens']
            if overlap:
                scored.append((len(overlap), r))
        if not scored:
            unmatched_reasons[o['id']] = f'{len(candidates)} stalls at "{kw}" but none matched dish keywords {sorted(search_toks)}'
            continue
        scored.sort(key=lambda x: -x[0])
        best_score = scored[0][0]
        # require at least 2 genuine shared dish/food tokens — a single-word
        # coincidence (e.g. sharing "chicken") is not enough to trust.
        if best_score < 2:
            unmatched_reasons[o['id']] = f'best score only {best_score} among {kw} candidates — too weak, not confident'
            continue
        best = [r for s, r in scored if s == best_score]
        if len(best) > 1:
            unmatched_reasons[o['id']] = f'{len(best)}-way tie at score {best_score} among {kw} candidates — ambiguous'
            continue
        r = best[0]
        matches[o['id']] = {
            'licenceNumber': r.get('Licence Number'),
            'licenseeName': r['_lic_u'] or None,
            'premisesAddress': r.get('Establishment Address'),
            'grade': GRADE_MAP.get(r.get('Grade'), 'not_applicable'),
            'demeritPoints': None,
            'licenceSuspended': False,
            '_matchedBusinessName': r['_biz_u'],
            '_score': best_score,
        }
        continue

    # "whole centre" outlets (location is None, name IS the centre)
    if loc is None:
        # Full-name substring match ONLY — no shortened/stripped variants.
        # (Stripping to e.g. "North Bridge Road" or "Bedok" over-matches every
        # unrelated address on that road/area — precision over recall here.)
        centre_name_u = o['name'].upper().replace(' AND ', ' & ')
        found = [r for r in sfa if centre_name_u in r['_addr_u']]
        if not found:
            # try with '&' normalized back to 'AND' in case source data differs
            alt = centre_name_u.replace(' & ', ' AND ')
            found = [r for r in sfa if alt in r['_addr_u']]
        if not found:
            unmatched_reasons[o['id']] = f'no SFA address match for full centre name "{o["name"]}"'
            continue
        if len(found) > 250:
            unmatched_reasons[o['id']] = f'{len(found)} SFA matches for "{o["name"]}" — too many to be one building, rejecting as unreliable'
            continue
        addr_counter = Counter(r['Establishment Address'] for r in found)
        common_addr = addr_counter.most_common(1)[0][0]
        matches[o['id']] = {
            'licenceNumber': None,
            'licenseeName': None,
            'premisesAddress': common_addr,
            'grade': 'not_applicable',
            'demeritPoints': None,
            'licenceSuspended': False,
            '_stallCount': len(found),
        }
        continue

    unmatched_reasons[o['id']] = f'unrecognized location "{loc}" — no matching strategy'

print(f"Matched: {len(matches)} / {len(outlets)}")
print(f"Unmatched: {len(unmatched_reasons)}")
json.dump(matches, open('/tmp/sfa/matches.json', 'w'), indent=2)
json.dump(unmatched_reasons, open('/tmp/sfa/unmatched.json', 'w'), indent=2)

# print a sample of matches and unmatched reasons for review
print("\n--- sample matches ---")
for k, v in list(matches.items())[:15]:
    print(k, '->', v.get('_matchedBusinessName', f"[{v.get('_stallCount')} stalls]"), '|', v['grade'], '|', v.get('licenceNumber'))

print("\n--- unmatched reason breakdown ---")
reason_types = Counter()
for r in unmatched_reasons.values():
    reason_types[r.split(' — ')[0].split(' at ')[0][:40]] += 1
for reason, count in reason_types.most_common(20):
    print(count, reason)
