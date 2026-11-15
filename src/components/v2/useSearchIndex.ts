'use client';

import { useEffect, useState } from 'react';
import type { SearchIndex } from '@/lib/search/types';

let cache: Promise<SearchIndex> | null = null;

/** Loads /data/search-index.json once per page load (built by scripts/build-search-index.ts). */
export function useSearchIndex(): { index: SearchIndex | null; error: string | null } {
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    cache ??= fetch('/data/search-index.json').then((r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    });
    cache.then((d) => alive && setIndex(d)).catch((e) => {
      cache = null;
      if (alive) setError(String(e?.message ?? e));
    });
    return () => { alive = false; };
  }, []);
  return { index, error };
}
