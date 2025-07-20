// src/hooks/usePlayers.js
import { useQuery } from '@tanstack/react-query';
import { fetchPlayers } from '../api/balldontlie';

export function usePlayers(page, search = '') {
  return useQuery({
    queryKey: ['players', page, search],
    queryFn: () => fetchPlayers(page, 25, search),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
  });
}
