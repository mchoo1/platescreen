// Builds public/data/search-index.json from /data. Runs automatically before
// `next build` (see package.json "prebuild") and fails the build if /data
// has integrity errors.
//
//   npx tsx scripts/build-search-index.ts

import fs from 'node:fs';
import path from 'node:path';
import { loadDatabase } from '../src/db/load';
import { validateDatabase } from '../src/db/validate';
import { buildSearchIndex } from '../src/lib/search/build';

const db = loadDatabase();
const errors = validateDatabase(db);
if (errors.length) {
  console.error(`/data has ${errors.length} integrity error(s):\n` + errors.slice(0, 30).join('\n'));
  process.exit(1);
}
const index = buildSearchIndex(db);
const outDir = path.join(process.cwd(), 'public', 'data');
fs.mkdirSync(outDir, { recursive: true });
const file = path.join(outDir, 'search-index.json');
fs.writeFileSync(file, JSON.stringify(index));
console.log(`search-index.json: ${index.rows.length} dishes, ${index.outlets.length} outlets, ${(fs.statSync(file).size / 1024).toFixed(0)} KB`, index.stats);
