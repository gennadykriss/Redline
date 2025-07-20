// src/hooks/usePlayerStats.js
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerStats } from '../api/balldontlie';

export function usePlayerStats(playerId) {
  return useQuery({
    queryKey: ['playerStats', playerId],
    queryFn: () => fetchPlayerStats(playerId),
    enabled: !!playerId,        // only run when id is truthy
  });
}
