// src/hooks/useGames.js
import { useQuery } from '@tanstack/react-query';
import { fetchGames } from '../api/balldontlie';

export function useGames(page = 1, search = '', date = '') {
  return useQuery({
    queryKey: ['games', page, search, date],
    queryFn: () => fetchGames(page, 25, search, date),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
