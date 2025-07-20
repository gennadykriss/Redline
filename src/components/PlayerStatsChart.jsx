// src/components/PlayerStatsChart.jsx
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export default function PlayerStatsChart({ stats }) {
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
