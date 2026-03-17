// src/pages/PlayerDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerStats } from '../api/balldontlie';
import PlayerStatsChart from '../components/PlayerStatsChart';

export default function PlayerDetail() {
  const { id } = useParams();
  const { data: statsData, isLoading, error } = useQuery({
    queryKey: ['playerStats', id],
    queryFn: () => fetchPlayerStats(id),
    enabled: !!id,
  });
  const stats = statsData?.data || [];

  if (isLoading) return <p>Loading stats…</p>;
  if (error) return <p className="text-center mt-8 text-red-500">Error loading stats: {error.message}</p>;
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Season Averages</h1>
      <PlayerStatsChart stats={stats.map(s => ({
        season: s.season.toString(),
        pts: s.pts,
        ast: s.ast,
        reb: s.reb
      }))} />
    </div>
  );
}
