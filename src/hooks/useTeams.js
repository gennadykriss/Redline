// src/hooks/useTeams.js
import { useQuery } from '@tanstack/react-query';
import { fetchTeams } from '../api/balldontlie';

export function useTeams() {
  return useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
    staleTime: 1000 * 60 * 60,  // optional: 1 hour
  });
}
