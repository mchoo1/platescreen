// Static sitemap for the new /brand/[id] and /brand/[id]/[itemId] SEO pages,
// plus the homepage. Fully static — computed at build time, same as every
// other route here (next.config.js sets output: 'export'). See
// reference/planning/GROWTH_STRATEGY.md for why these routes exist.

import type { MetadataRoute } from 'next';
import { getAllBrandIds, getAllBrandItemParams } from '@/lib/brandPages';

const BASE_URL = 'https://platescreen.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const brandUrls: MetadataRoute.Sitemap = getAllBrandIds().map((id) => ({
    url: `${BASE_URL}/brand/${id}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const dishUrls: MetadataRoute.Sitemap = getAllBrandItemParams().map(({ id, itemId }) => ({
    url: `${BASE_URL}/brand/${id}/${itemId}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  return [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1 },
    ...brandUrls,
    ...dishUrls,
  ];
}
