// src/pages/PlayerDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPlayerStats, fetchPlayers } from '../api/balldontlie';
import PlayerStatsChart from '../components/PlayerStatsChart';

export default function PlayerDetail() {
  const { id } = useParams();
  const { data: statsData, isLoading } = useQuery(
    ['playerStats', id],
    () => fetchPlayerStats(id)
  );
  const stats = statsData?.data || [];

  if (isLoading) return <p>Loading stats…</p>;
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
