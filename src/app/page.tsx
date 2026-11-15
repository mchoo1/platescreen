import { Suspense } from 'react';
import { Discover } from '@/components/v2/Discover';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-ps-muted">Loading PlateScreen…</div>}>
      <Discover />
    </Suspense>
  );
}
