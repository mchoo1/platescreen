import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CompareView } from '@/components/v2/CompareView';

export const metadata: Metadata = { title: 'Compare dishes — PlateScreen', robots: { index: false } };

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="p-6 text-ps-muted">Loading…</div>}>
      <CompareView />
    </Suspense>
  );
}
