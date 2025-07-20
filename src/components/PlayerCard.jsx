// src/components/PlayerCard.jsx
import React from 'react'

export default function PlayerCard({ player }) {
  // NBA headshot URL (fallback to local if missing)
  const imgUrl = `https://cdn.nba.com/headshots/nba/latest/260x190/${player.id}.png`

  // Map of labels → values to display
  const stats = [
    ['Position',    player.position],
    ['Height',      player.height],
    ['Weight',      player.weight],
    ['Jersey #',    player.jersey_number],
    ['College',     player.college],
    ['Country',     player.country],
    ['Draft Year',  player.draft_year],
    ['Draft Round', player.draft_round],
    ['Draft Pick',  player.draft_number],
    ['Team',        player.team.full_name],
  ]

  return (
    <div className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:border-red-500 border-2 border-transparent transition-all">
      {/* Headshot */}
      <img
        src={imgUrl}
        alt={`${player.first_name} ${player.last_name}`}
        className="w-full h-40 object-cover"
        onError={e => {
          e.currentTarget.onerror = null
          e.currentTarget.src = '/fallback.png'
        }}
      />

      {/* Body */}
      <div className="p-4 space-y-2">
        {/* Name */}
        <h3 className="text-xl font-bold">
          {player.first_name} {player.last_name}
        </h3>

        {/* Stats list */}
        <ul className="text-sm space-y-1">
          {stats.map(([label, value]) => (
            <li key={label} className="flex justify-between">
              <span className="font-medium text-gray-700">{label}</span>
              <span className="text-gray-900">{value ?? '—'}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
