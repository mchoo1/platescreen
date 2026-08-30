// Per-brand SEO page — static export via generateStaticParams(). One of
// these exists for every one of the 1,747 brands, indexable by search
// engines even though the interactive screener itself is a single-page app.
// See reference/planning/GROWTH_STRATEGY.md for why this route exists and
// src/lib/brandPages.ts for the data-access layer it's built on.

import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getAllBrandIds,
  getBrandPageData,
  outletTypeLabel,
  brandLocationSummary,
} from '@/lib/brandPages';
import { fmtMoney, ppdBadgeClasses } from '@/lib/utils';

export function generateStaticParams() {
  return getAllBrandIds().map((id) => ({ id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const data = getBrandPageData(params.id);
  if (!data) return { title: 'Not found — PlateScreen' };
  const { brand, menuItems } = data;
  const location = brandLocationSummary(data.premises);
  const title = `${brand.name} — Calories, Protein & Price in Singapore | PlateScreen`;
  const description = menuItems.length
    ? `${brand.name} nutrition info for ${menuItems.length} real menu item${menuItems.length === 1 ? '' : 's'} in Singapore: calories, protein, carbs, fat, price, and protein-per-dollar. ${location}.`
    : `${brand.name} on PlateScreen — a ${outletTypeLabel(brand.type).toLowerCase()} in Singapore. ${location}. Menu nutrition data coming soon.`;
  return {
    title,
    description,
    alternates: { canonical: `/brand/${brand.id}` },
    openGraph: { title, description },
  };
}

export default function BrandPage({ params }: { params: { id: string } }) {
  const data = getBrandPageData(params.id);
  if (!data) notFound();
  const { brand, premises, menuItems } = data;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-slate-500 mb-4">
        <Link href="/" className="hover:text-blue-600">PlateScreen</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700">{brand.name}</span>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <span>{brand.emoji}</span>
          {brand.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {outletTypeLabel(brand.type)} · {brand.cuisine} · {brand.priceRange}
        </p>
        <p className="mt-1 text-sm text-slate-500">{brandLocationSummary(premises)}</p>
        {brand.dietTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {brand.dietTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-xs font-medium px-2 py-0.5"
              >
                {tag.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        )}
      </header>

      <section className="mb-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-3">
          {menuItems.length > 0 ? `Menu (${menuItems.length} item${menuItems.length === 1 ? '' : 's'})` : 'Menu'}
        </h2>
        {menuItems.length === 0 ? (
          <p className="text-sm text-slate-500">
            No screened menu items for {brand.name} yet — PlateScreen never fabricates
            macros, so this brand is listed for location purposes and will show dishes
            once they're individually researched and verified.
          </p>
        ) : (
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs font-medium text-slate-500">
                  <th className="px-3 py-2">Item</th>
                  <th className="px-3 py-2 text-right">Cal</th>
                  <th className="px-3 py-2 text-right">Protein</th>
                  <th className="px-3 py-2 text-right">Price</th>
                  <th className="px-3 py-2 text-right">Protein/$</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} className="border-t border-slate-100">
                    <td className="px-3 py-2">
                      <Link href={`/brand/${brand.id}/${item.id}`} className="font-medium text-slate-900 hover:text-blue-600">
                        {item.emoji} {item.name}
                      </Link>
                      {item.isPopular && (
                        <span className="ml-1.5 inline-flex items-center rounded-full bg-blue-50 text-blue-700 text-[10px] font-medium px-1.5 py-0.5">
                          Popular
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-right text-slate-700">{item.calories}</td>
                    <td className="px-3 py-2 text-right text-slate-700">{item.protein}g</td>
                    <td className="px-3 py-2 text-right font-medium text-slate-900">{fmtMoney(item.price)}</td>
                    <td className="px-3 py-2 text-right">
                      <span className={`inline-flex items-center rounded-full text-xs font-semibold px-2 py-0.5 ${ppdBadgeClasses(item.ppd)}`}>
                        {item.ppd.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {premises.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Locations ({premises.length})
          </h2>
          <ul className="space-y-2 text-sm">
            {premises.slice(0, 30).map((p) => (
              <li key={p.id} className="text-slate-600">
                <span className="font-medium text-slate-800">{p.locationContext || p.label}</span>
                {p.address && <span className="text-slate-400"> — {p.address}</span>}
              </li>
            ))}
            {premises.length > 30 && (
              <li className="text-slate-400">…and {premises.length - 30} more outlets islandwide.</li>
            )}
          </ul>
        </section>
      )}

      <p className="text-xs text-slate-400 pt-4 border-t border-slate-100">
        Every dish on PlateScreen traces to a real, sourced menu — nothing is
        estimated from "what's typical." <Link href="/" className="text-blue-600 hover:underline">Screen every dish in Singapore →</Link>
      </p>
    </main>
  );
}
