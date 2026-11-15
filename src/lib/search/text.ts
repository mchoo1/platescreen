/**
 * Normalize free text for matching: lowercase, drop apostrophes (so
 * "McDonald's" = "mcdonalds"), collapse punctuation and whitespace.
 * Same behaviour as the v1 screener (2026-09-13 apostrophe fix).
 */
export function normalizeSearchText(s: string): string {
  return s
    .toLowerCase()
    .replace(/['’‘`]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Every whitespace token of `query` appears somewhere in the pre-normalized `haystack`. */
export function matchesNormalized(query: string, haystack: string): boolean {
  const q = normalizeSearchText(query);
  if (!q) return true;
  return q.split(' ').every((t) => haystack.includes(t));
}
