import { useMemo } from 'react';
import { Society } from '@/types/societies';

export function useSocieties(societies: Society[]) {
  return useMemo(() => {
    // Filter out inactive societies and sort by year
    return societies
      .filter(society => !society.inactive)
      .sort((a, b) => a.year - b.year);
  }, [societies]);
}
