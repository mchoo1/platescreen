// Loads the canonical /data tables from disk. Server/build-time only (uses
// fs) — used by the static pages, the search-index build, scripts and tests.
// The browser never imports this; it fetches /data/search-index.json instead.

import fs from 'node:fs';
import path from 'node:path';
import { TABLES, type Database } from './schema';

export const DATA_DIR = path.join(process.cwd(), 'data');

let cached: Database | null = null;

export function loadDatabase(dir: string = DATA_DIR): Database {
  if (cached && dir === DATA_DIR) return cached;
  const db = {} as Database;
  for (const t of TABLES) {
    const file = path.join(dir, `${t}.json`);
    // A missing table file is treated as empty so new tables can be added incrementally.
    (db as unknown as Record<string, unknown>)[t] = fs.existsSync(file)
      ? JSON.parse(fs.readFileSync(file, 'utf8'))
      : [];
  }
  if (dir === DATA_DIR) cached = db;
  return db;
}

/** Writes tables back as stable, diff-friendly JSON (one row per line). */
export function writeTable(name: keyof Database, rows: unknown[], dir: string = DATA_DIR): void {
  fs.mkdirSync(dir, { recursive: true });
  const body = rows.length ? '[\n' + rows.map((r) => JSON.stringify(r)).join(',\n') + '\n]\n' : '[]\n';
  fs.writeFileSync(path.join(dir, `${name}.json`), body);
}
