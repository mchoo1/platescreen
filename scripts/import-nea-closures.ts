// Imports NEA's quarterly hawker-centre cleaning and works closures into
// data/outlet_closures.json, matched to PlateScreen venues.
//
//   npx tsx scripts/import-nea-closures.ts            # fetch live from data.gov.sg
//   npx tsx scripts/import-nea-closures.ts file.json  # use a saved API response
//
// Source: "Dates of Hawker Centres Closure", NEA, data.gov.sg — Singapore Open
// Data Licence (free for personal and commercial use). Safe to re-run: it
// replaces only rows with sourceId 'nea_hawker_closures' and leaves every
// other closure untouched.

import fs from 'node:fs';
import { loadDatabase, writeTable } from '../src/db/load';
import type { OutletClosure, Venue } from '../src/db/schema';
import { haversineKm } from '../src/lib/geo';

const DATASET = 'd_bda4baa634dd1cc7a6c7cad5f19e2d68';
const SOURCE = 'nea_hawker_closures';

interface NeaRecord { name: string; latitude_hc: string; longitude_hc: string; [k: string]: string }

async function fetchRecords(file?: string): Promise<NeaRecord[]> {
  if (file) return JSON.parse(fs.readFileSync(file, 'utf8')).result.records;
  const res = await fetch(`https://data.gov.sg/api/action/datastore_search?resource_id=${DATASET}&limit=1000`);
  if (!res.ok) throw new Error(`data.gov.sg responded ${res.status}`);
  const body = await res.json();
  if (!body.success) throw new Error('data.gov.sg returned success=false');
  return body.result.records;
}

const STOP = new Set(['food', 'centre', 'center', 'hawker', 'market', 'and', 'blk', 'block', 'ave', 'avenue', 'street', 'st', 'road', 'rd', 'the', 'complex']);
const tokens = (s: string, keepStop = false) => new Set(s.toLowerCase().replace(/['’]/g, '').split(/[^a-z0-9]+/).filter((t) => t && (keepStop || !STOP.has(t))));
/** Jaccard overlap of distinctive name tokens (generic words like "food centre" ignored). */
function jaccard(a: string, b: string, keepStop = false): number {
  const A = tokens(a, keepStop); const B = tokens(b, keepStop);
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  return inter / (A.size + B.size - inter);
}

/** NEA names often read "Street Blk 123 (Common Name)": compare against both parts. */
function nameScore(neaName: string, venueName: string, keepStop = false): number {
  const alt = /\(([^)]+)\)/.exec(neaName)?.[1];
  const main = neaName.replace(/\([^)]*\)/g, ' ');
  return Math.max(jaccard(main, venueName, keepStop), alt ? jaccard(alt, venueName, keepStop) : 0, jaccard(neaName, venueName, keepStop));
}

/** "30/3/2026" → "2026-03-30"; null for NA / TBC / blanks. */
export function parseNeaDate(s: string | undefined): string | null {
  const m = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec((s ?? '').trim());
  if (!m) return null;
  return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`;
}

const numbers = (s: string) => new Set((s.match(/\d+[a-z]?/gi) ?? []).map((n) => n.toLowerCase()));

/**
 * Best NEA record for one venue, or null. Conservative on purpose — a wrong
 * match would show the wrong closure dates:
 *   - name score >= 0.6 (distinctive tokens, see nameScore)
 *   - block numbers, when both names have them, must overlap
 *   - within 2 km (legacy coordinates can be coarse)
 *   - the best score must beat the runner-up clearly (ties are rejected)
 */
function bestNeaFor(v: Venue, records: NeaRecord[]): NeaRecord | null {
  if (v.type !== 'hawker_centre' && v.type !== 'other') return null;
  const vn = numbers(v.name);
  const scored = records
    .map((rec) => {
      const rn = numbers(rec.name);
      if (vn.size && rn.size && ![...vn].some((n) => rn.has(n))) return null;
      const lat = Number(rec.latitude_hc); const lng = Number(rec.longitude_hc);
      if (v.lat != null && v.lng != null && Number.isFinite(lat) && haversineKm(lat, lng, v.lat, v.lng) > 2) return null;
      return { rec, score: nameScore(rec.name, v.name), raw: nameScore(rec.name, v.name, true) };
    })
    .filter((x): x is { rec: NeaRecord; score: number; raw: number } => !!x && x.score >= 0.6)
    .sort((a, b) => b.score - a.score || b.raw - a.raw);
  if (!scored.length) return null;
  if (scored.length > 1 && scored[0].score - scored[1].score < 0.05) {
    // Near-tie on distinctive words ("Redhill Market" vs "Redhill Food Centre"):
    // accept only if the full wording clearly decides it.
    const clear = scored[0].raw >= 0.75 && scored[0].raw - scored[1].raw >= 0.25;
    if (!clear) return null;
  }
  return scored[0].rec;
}

async function main() {
  const records = await fetchRecords(process.argv[2]);
  const db = loadDatabase();
  const venues = db.venues.map((v) => ({ ...v }));
  const closures: OutletClosure[] = db.outlet_closures.filter((c) => c.sourceId !== SOURCE);
  let matched = 0;
  for (const v of venues) {
    const rec = bestNeaFor(v, records);
    if (!rec) continue;
    if (process.env.VERBOSE) console.log(`  ${v.name}  =>  ${rec.name}`);
    matched++;
    v.neaName = rec.name;
    const windows: [string, string, string, OutletClosure['reason']][] = [
      ['q1_cleaningstartdate', 'q1_cleaningenddate', 'remarks_q1', 'cleaning'],
      ['q2_cleaningstartdate', 'q2_cleaningenddate', 'remarks_q2', 'cleaning'],
      ['q3_cleaningstartdate', 'q3_cleaningenddate', 'remarks_q3', 'cleaning'],
      ['q4_cleaningstartdate', 'q4_cleaningenddate', 'remarks_q4', 'cleaning'],
      ['other_works_startdate', 'other_works_enddate', 'remarks_other_works', 'repairs'],
    ];
    for (const [s, e, r, reason] of windows) {
      const start = parseNeaDate(rec[s]); const end = parseNeaDate(rec[e]);
      if (!start || !end) continue;
      const remark = (rec[r] ?? '').trim();
      closures.push({
        id: `nea_${v.id}_${start}_${reason}`, outletId: null, venueId: v.id, startDate: start, endDate: end, reason,
        note: remark && remark.toLowerCase() !== 'nil' ? remark : null, sourceId: SOURCE,
      });
    }
  }
  closures.sort((a, b) => a.id.localeCompare(b.id));
  writeTable('venues', venues);
  writeTable('outlet_closures', closures);
  const sources = db.data_sources.map((s) => (s.id === SOURCE ? { ...s, retrievedAt: new Date().toISOString().slice(0, 10) } : s));
  writeTable('data_sources', sources);
  console.log(`NEA records: ${records.length} · venues matched: ${matched} · closures written: ${closures.filter((c) => c.sourceId === SOURCE).length}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
