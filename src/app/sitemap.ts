// Sitemap for the homepage and every brand and dish page (static, built from /data).
import type { MetadataRoute } from 'next';
import { allBrandIds, allDishParams } from '@/lib/pages';

const BASE_URL = 'https://platescreen.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1 },
    ...allBrandIds().map((id) => ({ url: `${BASE_URL}/brand/${id}`, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...allDishParams().map(({ id, itemId }) => ({ url: `${BASE_URL}/brand/${id}/${itemId}`, changeFrequency: 'weekly' as const, priority: 0.6 })),
  ];
}
