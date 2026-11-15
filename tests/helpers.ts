import { loadDatabase } from '@/db/load';
import { buildSearchIndex } from '@/lib/search/build';
import type { SearchIndex } from '@/lib/search/types';

let idx: SearchIndex | null = null;
export const db = () => loadDatabase();
export const index = () => (idx ??= buildSearchIndex(loadDatabase(), '2026-11-16T00:00:00Z'));
