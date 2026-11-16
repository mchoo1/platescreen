// Meal set page — statically generated per configuration; the builder is interactive.
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { allMealParams, getMeal } from '@/lib/pages';
import { AppHeader } from '@/components/v2/ui';
import { MealBuilder } from '@/components/v2/MealBuilder';

export function generateStaticParams() {
  return allMealParams();
}

export function generateMetadata({ params }: { params: { id: string; configId: string } }): Metadata {
  const m = getMeal(params.id, params.configId);
  if (!m) return { title: 'Not found — PlateScreen' };
  const title = `${m.name} (${m.brand.name}) — Calories by side & drink | PlateScreen`;
  const description = `Build the ${m.name} at ${m.brand.name} Singapore: calories, protein and price for every side and drink choice.`;
  return { title, description, alternates: { canonical: `/brand/${m.brand.id}/meal/${m.id}` }, openGraph: { title, description } };
}

export default function MealPage({ params }: { params: { id: string; configId: string } }) {
  const m = getMeal(params.id, params.configId);
  if (!m) notFound();
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">
        <nav aria-label="Breadcrumb" className="text-sm text-ps-muted">
          <Link href="/" className="text-ps-muted no-underline hover:text-ps-ink">PlateScreen</Link>
          <span className="mx-1.5">/</span>
          <Link href={`/brand/${m.brand.id}`} className="text-ps-muted no-underline hover:text-ps-ink">{m.brand.name}</Link>
        </nav>
        <MealBuilder meal={{
          id: m.id, name: m.name, brandName: m.brand.name, brandId: m.brand.id,
          groups: m.groups, setPrice: m.setPrice,
          setPriceUnconfirmed: m.setPriceSource?.type === 'web_research',
          mainProductId: m.mainProductId,
        }} />
        <section aria-label="Sources" className="text-xs text-ps-muted flex flex-col gap-1">
          <h2 className="m-0 label-caps">Sources</h2>
          <ul className="m-0 pl-4">
            {m.sources.map((s) => <li key={s.id}>{s.name}{s.retrievedAt ? ` · checked ${s.retrievedAt}` : ''}</li>)}
          </ul>
          <p className="m-0">Meal is available after breakfast hours. The set price is McDonald’s own bundle price, never the items added up.</p>
        </section>
      </main>
    </div>
  );
}
