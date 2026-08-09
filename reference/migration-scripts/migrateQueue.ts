import { SG_UNRESEARCHED_CHAINS } from '../src/lib/sgFoodDb';
import * as fs from 'fs';

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

const entries = SG_UNRESEARCHED_CHAINS.map((c) => ({
  id: slug(c.name),
  name: c.name,
  aliases: c.aliases,
  type: c.outletType,
  cuisine: c.cuisine,
  priority: c.priority,
  status: 'pending',
  notes: c.notes,
  sfaLicenceNo: undefined,
}));

console.log('Research queue entries:', entries.length);

function ser(x: any): string {
  return JSON.stringify(x, null, 2).replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, '$1:');
}

fs.writeFileSync(
  'src/lib/researchQueue.ts',
  `import type { ResearchQueueEntry } from '@/types/db';

/**
 * Work queue for the weekly research task. Each entry is a known Singapore
 * food outlet/chain not yet added to outlets.ts/foodOptions.ts.
 *
 * Workflow: the scheduled task picks the highest-priority 'pending' entry,
 * researches it (cross-referencing the SFA/data.gov.sg licensed-establishment
 * dataset for hawker/food_court_stall types — see SfaRegistration in
 * types/db.ts — plus official nutrition sources for macros), adds the
 * resulting Outlet + FoodOption records, then flips status to 'researched'.
 */
export const RESEARCH_QUEUE: ResearchQueueEntry[] = ${ser(entries)};
`
);
console.log('Wrote researchQueue.ts');
