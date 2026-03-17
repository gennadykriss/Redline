// src/components/PlayerStatsChart.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function PlayerStatsChart({ stats }) {
  if (!stats || stats.length === 0) {
    return <p className="text-center text-gray-500 py-12">No stats available.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={stats}>
        <XAxis dataKey="season" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="pts" name="Points" />
        <Bar dataKey="ast" name="Assists" />
        <Bar dataKey="reb" name="Rebounds" />
      </BarChart>
    </ResponsiveContainer>
  );
}
